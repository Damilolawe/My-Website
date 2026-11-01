-- Source-control reconciliation with the verified live Awe Concepts review workflow.
-- Forward-only migration: owner personally reviews, customer accepts exact version.
-- Existing production database is unchanged by this GitHub commit.
alter table public.awe_orders drop constraint if exists awe_orders_status_check;
alter table public.awe_orders add constraint awe_orders_status_check
 check (status in ('received','payment_verified','generating','awaiting_review',
 'customer_review','revisions_required','approved','publishing','published',
 'delivered','generation_failed','publication_failed'));

CREATE OR REPLACE FUNCTION public.awe_customer_approve(p_order uuid, p_version uuid, p_actor uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare o public.awe_orders; preapproved public.awe_events; studio_owner uuid;
begin
 select * into o from public.awe_orders where id=p_order for update;
 if o.id is null or o.user_id is distinct from p_actor then raise exception 'Order not found'; end if;
 if o.payment<>'paid' or o.status<>'customer_review' or o.draft_version is distinct from p_version then
  raise exception 'Review the current studio-approved draft';
 end if;
 if not exists(select 1 from public.awe_versions where order_id=p_order and id=p_version) then
  raise exception 'Version not found';
 end if;
 select * into preapproved from public.awe_events
 where order_id=p_order and kind='owner_preapproved' and details->>'version'=p_version::text
 order by created_at desc,id desc limit 1;
 if preapproved.id is null or exists(
  select 1 from public.awe_revisions where order_id=p_order and created_at>=preapproved.created_at
 ) then raise exception 'Studio review required after the latest change'; end if;
 select user_id into studio_owner from public.awe_owner order by user_id limit 1;
 if studio_owner is null then raise exception 'Studio owner is not configured'; end if;
 insert into public.awe_events(order_id,actor,kind,details)
 values(p_order,p_actor,'customer_approved',jsonb_build_object('version',p_version));
 insert into public.awe_approvals(order_id,version_id,actor) values(p_order,p_version,studio_owner);
 insert into public.awe_events(order_id,actor,kind,details)
 values(p_order,studio_owner,'approved',jsonb_build_object('version',p_version,'method','owner_preapproved')),
       (p_order,p_actor,'publishing',jsonb_build_object('version',p_version,'method','customer_acceptance'));
 update public.awe_orders set public_version=p_version,status='published',version=version+1,updated_at=now()
 where id=p_order;
 insert into public.awe_events(order_id,actor,kind,details)
 values(p_order,p_actor,'published',jsonb_build_object('version',p_version,'method','automatic_after_both_approvals'));
 insert into public.awe_jobs(order_id,kind,version_id) values(p_order,'deliver',p_version);
 return true;
end $function$;

CREATE OR REPLACE FUNCTION public.awe_customer_revision(p_order uuid, p_version uuid, p_actor uuid, p_message text)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare o public.awe_orders; tier text; allowed integer; used integer;
begin
 select * into o from public.awe_orders where id=p_order for update;
 if o.id is null or o.user_id is distinct from p_actor then raise exception 'Order not found'; end if;
 if o.payment<>'paid' or o.draft_version is distinct from p_version or
    o.status not in ('customer_review','published','delivered') then
  raise exception 'Current website is not available for revision';
 end if;
 if length(btrim(coalesce(p_message,'')))<5 or length(p_message)>4000 then raise exception 'Describe the changes requested'; end if;
 tier:=coalesce(nullif(o.package_snapshot->>'tier',''),
     case when (o.package_snapshot->>'amount') ~ '^[0-9]+$' and
                    (o.package_snapshot->>'amount')::integer>=25000 then 'premium'
          when (o.package_snapshot->>'amount') ~ '^[0-9]+$' and
                    (o.package_snapshot->>'amount')::integer>=15000 then 'signature'
          else 'starter' end);
 allowed:=case tier when 'premium' then null when 'signature' then 3 else 1 end;
 select count(*) into used from public.awe_revisions where order_id=p_order;
 if allowed is not null and used>=allowed then raise exception 'Package revision limit reached'; end if;
 insert into public.awe_revisions(id,order_id,message) values(gen_random_uuid(),p_order,left(btrim(p_message),4000));
 update public.awe_orders set status='revisions_required',version=version+1,updated_at=now() where id=p_order;
 insert into public.awe_events(order_id,actor,kind,details)
 values(p_order,p_actor,'customer_revision_requested',jsonb_build_object('version',p_version));
 insert into public.awe_jobs(order_id,kind,version_id) values(p_order,'notify_owner_revision',p_version);
end $function$;

CREATE OR REPLACE FUNCTION public.awe_customer_revision_usage(p_actor uuid)
 RETURNS TABLE(order_id uuid, used bigint)
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
 select o.id, count(r.id)::bigint from public.awe_orders o
 left join public.awe_revisions r on r.order_id=o.id
 where o.user_id=p_actor
 group by o.id
$function$;

CREATE OR REPLACE FUNCTION public.awe_owner_release(p_order uuid, p_expected integer, p_version uuid, p_actor uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare o public.awe_orders;
begin
 if not exists(select 1 from public.awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 select * into o from public.awe_orders where id=p_order for update;
 if o.id is null or o.version<>p_expected or o.draft_version is distinct from p_version then
   raise exception 'Conflict: review the latest draft';
 end if;
 if o.payment<>'paid' or o.status<>'awaiting_review' then raise exception 'Draft is not ready for studio release'; end if;
 if not exists(select 1 from public.awe_versions where id=p_version and order_id=p_order) then raise exception 'Version not found'; end if;
 if not exists(select 1 from public.awe_events where order_id=p_order
    and kind='draft_saved' and actor=p_actor and details->>'version'=p_version::text)
    then raise exception 'Save a personally reviewed studio version before releasing it'; end if;
 insert into public.awe_events(order_id,actor,kind,details) values
  (p_order,p_actor,'owner_preapproved',jsonb_build_object('version',p_version));
 update public.awe_orders set status='customer_review',version=version+1,updated_at=now() where id=p_order;
 insert into public.awe_jobs(order_id,kind,version_id) values(p_order,'notify_review',p_version);
end $function$;


revoke all on function public.awe_owner_release(uuid,integer,uuid,uuid),
 public.awe_customer_approve(uuid,uuid,uuid),
 public.awe_customer_revision(uuid,uuid,uuid,text),
 public.awe_customer_revision_usage(uuid) from public,anon,authenticated;
grant execute on function public.awe_owner_release(uuid,integer,uuid,uuid),
 public.awe_customer_approve(uuid,uuid,uuid),
 public.awe_customer_revision(uuid,uuid,uuid,text),
 public.awe_customer_revision_usage(uuid) to service_role;

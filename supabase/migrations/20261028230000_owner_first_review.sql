-- Owner-first review: paid drafts are private until a studio owner explicitly releases the exact version.
-- Only one reviewed version can be automatically published, and only by the matching customer.
alter table public.awe_orders drop constraint awe_orders_status_check;
alter table public.awe_orders add constraint awe_orders_status_check
check(status in ('received','payment_verified','generating','awaiting_review','customer_review','revisions_required','approved','publishing','published','delivered','generation_failed','publication_failed'));

create function public.awe_owner_release(p_order uuid,p_expected integer,p_version uuid,p_actor uuid)
returns void language plpgsql security invoker set search_path=public as $$
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
end $$;
revoke all on function public.awe_owner_release(uuid,integer,uuid,uuid) from public,anon,authenticated;
grant execute on function public.awe_owner_release(uuid,integer,uuid,uuid) to service_role;

-- A change request revokes review eligibility until a new version is saved and studio-reviewed.
create function public.awe_customer_revision(p_order uuid,p_version uuid,p_actor uuid,p_message text)
returns void language plpgsql security invoker set search_path=public as $$
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
end $$;
revoke all on function public.awe_customer_revision(uuid,uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.awe_customer_revision(uuid,uuid,uuid,text) to service_role;

-- Customer's acceptance of an owner-reviewed, unchanged version atomically publishes and enqueues delivery.
-- This replaces the old record-only customer approval RPC; no second owner click is needed.
create or replace function public.awe_customer_approve(p_order uuid,p_version uuid,p_actor uuid)
returns boolean language plpgsql security invoker set search_path=public as $$
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
end $$;
revoke all on function public.awe_customer_approve(uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.awe_customer_approve(uuid,uuid,uuid) to service_role;

-- Legacy owner-publish RPC must not bypass the new owner-first/customer-last protocol.
create or replace function public.awe_publish(p_order uuid,p_expected integer,p_version uuid,p_actor uuid)
returns void language plpgsql security invoker set search_path=public as $$
begin
 raise exception 'Owner review must precede customer acceptance. Use the release-for-review action.';
end $$;
revoke all on function public.awe_publish(uuid,integer,uuid,uuid) from public,anon,authenticated;
grant execute on function public.awe_publish(uuid,integer,uuid,uuid) to service_role;

-- Per-customer revision usage, available only through the authenticated API.
create function public.awe_customer_revision_usage(p_actor uuid)
returns table(order_id uuid, used bigint) language sql security invoker set search_path=public as $$
 select o.id, count(r.id)::bigint from public.awe_orders o
 left join public.awe_revisions r on r.order_id=o.id
 where o.user_id=p_actor
 group by o.id
$$;
revoke all on function public.awe_customer_revision_usage(uuid) from public,anon,authenticated;
grant execute on function public.awe_customer_revision_usage(uuid) to service_role;

-- Update future package terms, rotating termsVersion to require fresh agreement.
update public.awe_packages set data=jsonb_set(jsonb_set(data,'{revisions}',
  to_jsonb(case data->>'tier'
    when 'signature' then '3 included revision requests; major scope additions require a separate quote.'
    when 'premium' then 'Unlimited revision requests within the agreed project scope.'
    else '1 included revision request; major scope additions require a separate quote.' end)),
  '{termsVersion}',to_jsonb(gen_random_uuid()::text))
where coalesce(data->>'testOnly','false')<>'true'
  and data->>'tier' in ('starter','signature','premium');

-- Notify the owner when a paid automated first draft is saved, without
-- making the generation transaction depend on external email delivery.
create function public.awe_queue_studio_notice() returns trigger
language plpgsql security invoker set search_path=public as $$
begin
 if new.kind='draft_saved' and new.actor is null then
   insert into public.awe_jobs(order_id,kind,version_id)
   values(new.order_id,'notify_owner_draft',(new.details->>'version')::uuid);
 end if;
 return new;
end $$;
revoke all on function public.awe_queue_studio_notice() from public,anon,authenticated;
grant execute on function public.awe_queue_studio_notice() to service_role;
create trigger awe_initial_draft_studio_notice
after insert on public.awe_events for each row
when (new.kind='draft_saved' and new.actor is null)
execute function public.awe_queue_studio_notice();

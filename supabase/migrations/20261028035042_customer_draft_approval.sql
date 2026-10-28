-- Customer sign-off is version-specific; a revision always requires fresh approval.
create or replace function public.awe_customer_approve(p_order uuid,p_version uuid,p_actor uuid)
returns boolean language plpgsql security invoker set search_path=public as $$
declare o awe_orders;
begin
 select * into o from awe_orders where id=p_order for update;
 if not found or o.user_id is distinct from p_actor then raise exception 'Order not found'; end if;
 if o.payment<>'paid' or o.draft_version is distinct from p_version
   or not exists(select 1 from awe_versions where id=p_version and order_id=p_order) then
  raise exception 'Review the current paid draft';
 end if;
 if exists(select 1 from awe_events where order_id=p_order and kind='customer_approved'
   and actor=p_actor and details->>'version'=p_version::text
   and created_at>=coalesce((select max(created_at) from awe_revisions where order_id=p_order),'-infinity'::timestamptz)) then return false; end if;
 insert into awe_events(order_id,actor,kind,details)
 values(p_order,p_actor,'customer_approved',jsonb_build_object('version',p_version));
 return true;
end $$;
revoke all on function public.awe_customer_approve(uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.awe_customer_approve(uuid,uuid,uuid) to service_role;

create or replace function public.awe_publish(p_order uuid,p_expected integer,p_version uuid,p_actor uuid) returns void language plpgsql security invoker set search_path=public as $$
declare o awe_orders;
begin
 if not exists(select 1 from awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 select * into o from awe_orders where id=p_order for update;
 if o.id is null or o.version<>p_expected or o.draft_version is distinct from p_version then raise exception 'Conflict: review latest version'; end if;
 if o.payment<>'paid' or o.status not in ('awaiting_review','revisions_required') then raise exception 'Not ready'; end if;
 if not exists(select 1 from awe_versions where id=p_version and order_id=p_order) then raise exception 'Missing version'; end if;
 if not exists(select 1 from awe_events where order_id=p_order and kind='customer_approved' and actor=o.user_id and details->>'version'=p_version::text and created_at>=coalesce((select max(created_at) from awe_revisions where order_id=p_order),'-infinity'::timestamptz)) then raise exception 'Customer approval required for current draft'; end if;
 insert into awe_approvals(order_id,version_id,actor) values(p_order,p_version,p_actor);
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'approved',jsonb_build_object('version',p_version)),(p_order,p_actor,'publishing',jsonb_build_object('version',p_version));
 update awe_orders set public_version=p_version,status='published',version=version+1,updated_at=now() where id=p_order;
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'published',jsonb_build_object('version',p_version));
 insert into awe_jobs(order_id,kind,version_id) values(p_order,'deliver',p_version);
end $$;

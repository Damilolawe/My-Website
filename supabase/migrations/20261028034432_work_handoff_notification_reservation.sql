-- Reserve the provider's idempotency window durably before sending any email.
-- A lost provider response must never cause a resend after its key expires.
create or replace function public.awe_reserve_work_handoff(p_order uuid, p_version uuid)
returns text language plpgsql security invoker set search_path=public as $$
declare o awe_orders; started timestamptz;
begin
 select * into o from awe_orders where id=p_order for update;
 if not found or o.payment<>'paid' or o.draft_version is distinct from p_version then
  raise exception 'Verified current paid draft required';
 end if;
 if o.package_snapshot#>>'{aiProcessingConsent,granted}' is distinct from 'true'
    or o.package_snapshot#>>'{aiProcessingConsent,policy}' is distinct from 'chatgpt-work-v1' then
  raise exception 'Customer AI processing consent required';
 end if;
 if not exists(select 1 from awe_versions where id=p_version and order_id=p_order) then
  raise exception 'Private version missing';
 end if;
 if exists(select 1 from awe_events where order_id=p_order
   and kind='work_handoff_email_accepted' and details->>'version'=p_version::text) then
  return 'accepted';
 end if;
 select min(created_at) into started from awe_events where order_id=p_order
   and kind='work_handoff_email_started' and details->>'version'=p_version::text;
 if started is null then
  insert into awe_events(order_id,kind,details) values(p_order,'work_handoff_email_started',jsonb_build_object('version',p_version));
 elsif started <= now()-interval '20 hours' then
  return 'manual-review';
 end if;
 return 'send';
end $$;
revoke all on function public.awe_reserve_work_handoff(uuid,uuid) from public,anon,authenticated;
grant execute on function public.awe_reserve_work_handoff(uuid,uuid) to service_role;

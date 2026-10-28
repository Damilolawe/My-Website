-- Owner-only processing ledger, distinct from email-notification deduplication.
create table public.awe_work_runs(
 order_id uuid not null references public.awe_orders(id),
 version_id uuid not null references public.awe_versions(id),
 run_id uuid not null unique,
 actor uuid not null,
 state text not null default 'claimed' check(state in ('claimed','completed','failed')),
 result jsonb,
 failure text,
 created_at timestamptz not null default now(),
 finished_at timestamptz,
 primary key(order_id,version_id)
);
alter table public.awe_work_runs enable row level security;
revoke all on public.awe_work_runs from public,anon,authenticated;
grant select,insert,update on public.awe_work_runs to service_role;

create function public.awe_work_claim(p_order uuid,p_version uuid,p_run uuid,p_actor uuid)
returns jsonb language plpgsql security invoker set search_path=public as $$
declare o awe_orders; r awe_work_runs;
begin
 if p_actor is distinct from '220ddd21-710f-4dea-bc24-e34c8ba9cef8'::uuid
   or not exists(select 1 from awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 if p_run is null then raise exception 'Run reference required'; end if;
 select * into o from awe_orders where id=p_order for update;
 if not found or o.payment<>'paid' or o.draft_version is distinct from p_version
   or not exists(select 1 from awe_versions where id=p_version and order_id=p_order) then
  raise exception 'Current paid private draft required';
 end if;
 if o.package_snapshot#>>'{aiProcessingConsent,granted}' is distinct from 'true'
   or o.package_snapshot#>>'{aiProcessingConsent,policy}' is distinct from 'chatgpt-work-v1' then
  raise exception 'Customer AI processing consent required';
 end if;
 select * into r from awe_work_runs where order_id=p_order and version_id=p_version;
 if found then
  return jsonb_build_object('state',r.state,'acquired',false,'sameRun',r.run_id=p_run,'result',r.result);
 end if;
 insert into awe_work_runs(order_id,version_id,run_id,actor) values(p_order,p_version,p_run,p_actor);
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'work_processing_claimed',jsonb_build_object('version',p_version,'run',p_run));
 return jsonb_build_object('state','claimed','acquired',true,'sameRun',true,'result',null);
end $$;

create function public.awe_work_finish(p_order uuid,p_version uuid,p_run uuid,p_actor uuid,p_result jsonb,p_failure text default null)
returns jsonb language plpgsql security invoker set search_path=public as $$
declare o awe_orders; r awe_work_runs; next_state text;
begin
 if p_actor is distinct from '220ddd21-710f-4dea-bc24-e34c8ba9cef8'::uuid
   or not exists(select 1 from awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 select * into o from awe_orders where id=p_order for update;
 select * into r from awe_work_runs where order_id=p_order and version_id=p_version for update;
 if not found or r.run_id is distinct from p_run or r.actor is distinct from p_actor then raise exception 'Matching processing claim required'; end if;
 if r.state<>'claimed' then return jsonb_build_object('state',r.state,'result',r.result); end if;
 if p_failure is not null then
  if length(trim(p_failure))<1 or length(p_failure)>500 then raise exception 'Invalid failure note'; end if;
  next_state:='failed';
 else
  if o.payment<>'paid' or o.draft_version is distinct from p_version then raise exception 'Draft changed; stop and reconcile'; end if;
  if o.package_snapshot#>>'{aiProcessingConsent,granted}' is distinct from 'true'
    or o.package_snapshot#>>'{aiProcessingConsent,policy}' is distinct from 'chatgpt-work-v1' then raise exception 'Customer AI processing consent required'; end if;
  if p_result is null or jsonb_typeof(p_result)<>'object'
    or p_result->>'provider' is distinct from 'chatgpt-library'
    or p_result->>'fileId' is null or (p_result->>'fileId')!~'^libfile_[A-Za-z0-9_-]{1,128}$'
    or p_result->>'sha256' is null or (p_result->>'sha256')!~'^[a-f0-9]{64}$'
    or p_result - array['provider','fileId','sha256'] <> '{}'::jsonb then
   raise exception 'Private result file reference and SHA-256 required';
  end if;
  next_state:='completed';
 end if;
 update awe_work_runs set state=next_state,result=case when next_state='completed' then p_result else null end,
  failure=case when next_state='failed' then p_failure else null end,finished_at=now()
 where order_id=p_order and version_id=p_version;
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'work_processing_'||next_state,jsonb_build_object('version',p_version,'run',p_run));
 return jsonb_build_object('state',next_state,'result',case when next_state='completed' then p_result else null end);
end $$;
revoke all on function public.awe_work_claim(uuid,uuid,uuid,uuid),public.awe_work_finish(uuid,uuid,uuid,uuid,jsonb,text) from public,anon,authenticated;
grant execute on function public.awe_work_claim(uuid,uuid,uuid,uuid),public.awe_work_finish(uuid,uuid,uuid,uuid,jsonb,text) to service_role;

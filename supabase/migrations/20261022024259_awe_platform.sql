-- Dedicated AWE project only. All browser database access is denied; API authorizes users.
create table public.awe_owner(user_id uuid primary key);
create table public.awe_packages(id text primary key, data jsonb not null);
create table public.awe_templates(id text primary key, enabled boolean not null default true, label text not null);
create table public.awe_orders(
 id uuid primary key, user_id uuid not null, email text not null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 version integer not null default 0, slug text unique not null,
 status text not null default 'received', payment text not null default 'unpaid',
 package_snapshot jsonb not null, input jsonb not null,
 stripe_session text unique, payment_intent text, draft_version uuid, public_version uuid,
 delivery_error text, checkout_at timestamptz,
 check(status in ('received','payment_verified','generating','awaiting_review','revisions_required','approved','publishing','published','delivered','generation_failed','publication_failed'))
);
create index awe_orders_owner_idx on public.awe_orders(user_id,created_at desc);
create table public.awe_assets(id uuid primary key,order_id uuid not null references public.awe_orders(id),path text unique not null,mime text not null,name text not null,size integer not null,public_allowed boolean not null default false,created_at timestamptz default now());
create table public.awe_versions(id uuid primary key,order_id uuid not null references public.awe_orders(id),input jsonb not null,html text not null,asset_ids jsonb not null default '[]',created_at timestamptz not null default now());
create table public.awe_approvals(id bigint generated always as identity primary key,order_id uuid not null references public.awe_orders(id),version_id uuid not null references public.awe_versions(id),actor uuid not null,created_at timestamptz not null default now());
create table public.awe_events(id bigint generated always as identity primary key,order_id uuid references public.awe_orders(id),actor uuid,kind text not null,details jsonb not null default '{}',created_at timestamptz not null default now());
create table public.awe_payments(event_id text primary key,order_id uuid not null references public.awe_orders(id),amount integer not null,currency text not null,kind text not null,created_at timestamptz not null default now());
create table public.awe_revisions(id uuid primary key,order_id uuid not null references public.awe_orders(id),message text not null,created_at timestamptz not null default now());
create table public.awe_briefs(id uuid primary key,user_id uuid not null,email text not null,content jsonb not null,created_at timestamptz not null default now());
create table public.awe_deliveries(id uuid primary key,order_id uuid not null references public.awe_orders(id),version_id uuid not null references public.awe_versions(id),provider_id text,created_at timestamptz not null default now(),unique(order_id,version_id));
create table public.awe_jobs(id bigint generated always as identity primary key,order_id uuid not null references public.awe_orders(id),kind text not null,version_id uuid,attempts integer not null default 0,available_at timestamptz not null default now(),lease uuid,done boolean not null default false,error text);
create index awe_jobs_pending on public.awe_jobs(available_at) where not done;
-- A service-role-only RPC makes payment recording and enqueue atomic and replay safe.
create function public.awe_payment(p_event text,p_order uuid,p_session text,p_intent text,p_amount integer,p_currency text,p_kind text) returns boolean language plpgsql security invoker set search_path=public as $$
declare o awe_orders;
begin
 select * into o from awe_orders where id=p_order for update;
 if not found or o.stripe_session is distinct from p_session then raise exception 'Unknown checkout'; end if;
 if exists(select 1 from awe_payments where event_id=p_event) then return false; end if;
 if p_amount<>(o.package_snapshot->>'amount')::integer or p_currency<>o.package_snapshot->>'currency' then raise exception 'Payment mismatch'; end if;
 insert into awe_payments values(p_event,p_order,p_amount,p_currency,p_kind,now());
 if p_kind='paid' and o.payment='unpaid' then
  update awe_orders set payment='paid',payment_intent=p_intent,status='payment_verified',version=version+1 where id=p_order;
  insert into awe_jobs(order_id,kind) values(p_order,'generate');
 elsif p_kind in ('refunded','partially_refunded') then update awe_orders set payment=p_kind,version=version+1 where id=p_order;
 elsif p_kind='failed' and o.payment='unpaid' then insert into awe_events(order_id,kind) values(p_order,'payment_failed');
 end if;
 insert into awe_events(order_id,kind,details) values(p_order,'payment_'||p_kind,jsonb_build_object('event',p_event));
 return true;
end $$;
create function public.awe_claim() returns setof public.awe_jobs language plpgsql security invoker set search_path=public as $$
begin
 return query update awe_jobs set lease=gen_random_uuid(),attempts=attempts+1,available_at=now()+interval '5 minutes'
 where id=(select id from awe_jobs where not done and available_at<=now() and attempts<5 order by id for update skip locked limit 1) returning *;
end $$;
-- Compare-and-swap revision prevents simultaneous editor updates from overwriting one another.
create function public.awe_save_draft(p_order uuid,p_expected integer,p_id uuid,p_input jsonb,p_html text,p_assets jsonb,p_actor uuid) returns void language plpgsql security invoker set search_path=public as $$
declare o awe_orders;
begin
 select * into o from awe_orders where id=p_order for update;
 if o.id is null or o.version<>p_expected then raise exception 'Conflict: reload order'; end if;
 if o.payment<>'paid' then raise exception 'Payment required'; end if;
 if p_actor is null then
  if o.status not in ('payment_verified','generating','generation_failed') or o.draft_version is not null then raise exception 'Generation not allowed'; end if;
 elsif not exists(select 1 from awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 insert into awe_versions(id,order_id,input,html,asset_ids) values(p_id,p_order,p_input,p_html,p_assets);
 update awe_orders set draft_version=p_id,input=p_input,status='awaiting_review',version=version+1,updated_at=now() where id=p_order;
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'draft_saved',jsonb_build_object('version',p_id));
end $$;
-- Public pointer and immutable approval record commit together. Jobs can never call this without owner identity.
create function public.awe_publish(p_order uuid,p_expected integer,p_version uuid,p_actor uuid) returns void language plpgsql security invoker set search_path=public as $$
declare o awe_orders;
begin
 if not exists(select 1 from awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 select * into o from awe_orders where id=p_order for update;
 if o.id is null or o.version<>p_expected or o.draft_version is distinct from p_version then raise exception 'Conflict: review latest version'; end if;
 if o.payment<>'paid' or o.status not in ('awaiting_review','revisions_required') then raise exception 'Not ready'; end if;
 if not exists(select 1 from awe_versions where id=p_version and order_id=p_order) then raise exception 'Missing version'; end if;
 insert into awe_approvals(order_id,version_id,actor) values(p_order,p_version,p_actor);
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'approved',jsonb_build_object('version',p_version)),(p_order,p_actor,'publishing',jsonb_build_object('version',p_version));
 update awe_orders set public_version=p_version,status='published',version=version+1,updated_at=now() where id=p_order;
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'published',jsonb_build_object('version',p_version));
 insert into awe_jobs(order_id,kind,version_id) values(p_order,'deliver',p_version);
end $$;
create function public.awe_reject(p_order uuid,p_expected integer,p_actor uuid,p_note text) returns void language plpgsql security invoker set search_path=public as $$
begin
 if not exists(select 1 from awe_owner where user_id=p_actor) then raise exception 'Owner required'; end if;
 update awe_orders set status='revisions_required',version=version+1 where id=p_order and version=p_expected and payment='paid';
 if not found then raise exception 'Conflict'; end if;
 insert into awe_events(order_id,actor,kind,details) values(p_order,p_actor,'rejected',jsonb_build_object('note',left(p_note,2000)));
end $$;
-- No client grants or permissive policies. All operations pass the server's ownership/owner gates.
do $$ declare t text; begin
 foreach t in array array['awe_owner','awe_packages','awe_templates','awe_orders','awe_assets','awe_versions','awe_approvals','awe_events','awe_payments','awe_revisions','awe_briefs','awe_deliveries','awe_jobs'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('revoke all on public.%I from anon, authenticated',t);
 execute format('grant all on public.%I to service_role',t);
 end loop;
end $$;
revoke execute on function public.awe_payment(text,uuid,text,text,integer,text,text), public.awe_claim(), public.awe_save_draft(uuid,integer,uuid,jsonb,text,jsonb,uuid), public.awe_publish(uuid,integer,uuid,uuid), public.awe_reject(uuid,integer,uuid,text) from public,anon,authenticated;
grant execute on function public.awe_payment(text,uuid,text,text,integer,text,text), public.awe_claim(), public.awe_save_draft(uuid,integer,uuid,jsonb,text,jsonb,uuid), public.awe_publish(uuid,integer,uuid,uuid), public.awe_reject(uuid,integer,uuid,text) to service_role;
grant usage,select on all sequences in schema public to service_role;
insert into public.awe_packages values('express','{"name":"AWE Express","enabled":false,"amount":null,"currency":"usd","features":[],"hosting":"","ownership":"","revisions":"","delivery":"awe-hosted","termsVersion":""}');
insert into public.awe_templates values ('index',true,'The Index'),('folio',true,'Folio No. 01'),('still',true,'Still Studio'),('afterhours',true,'After Hours'),('signal',true,'Signal / Noise'),('daylight',true,'Daylight');
-- Private bucket; no browser policies, including for authenticated customers.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('awe-private','awe-private',false,4194304,array['image/jpeg','image/png','image/webp','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document']) on conflict(id) do nothing;

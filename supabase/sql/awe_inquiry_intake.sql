-- AWE / DIGITAL: public inquiry intake, stored privately.
-- Apply through Supabase's reviewed migration mechanism, not browser credentials.
-- Authenticated and anonymous visitors have no direct Data API table privileges.
create table if not exists public.awe_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  project text not null check (project in (
    'Student / résumé portfolio',
    'Actor or creative portfolio',
    'Small business website',
    'Custom web project',
    'General inquiry'
  )),
  message text not null check (char_length(message) between 10 and 3000),
  rate_fingerprint text not null check (rate_fingerprint ~ '^[a-f0-9]{64}$'),
  status text not null default 'new' check (status in ('new','contacted','archived'))
);
alter table public.awe_inquiries enable row level security;
revoke all on public.awe_inquiries from public, anon, authenticated;
grant select, insert, update, delete on public.awe_inquiries to service_role;
create index if not exists awe_inquiries_status_created_idx on public.awe_inquiries(status, created_at desc);
create index if not exists awe_inquiries_rate_idx on public.awe_inquiries(rate_fingerprint, created_at desc);

-- Transaction-level advisory lock prevents parallel requests from bypassing
-- the hourly rate allowance for a shared originating fingerprint.
create or replace function public.awe_submit_inquiry(
  p_name text, p_email text, p_project text, p_message text, p_fingerprint text
) returns uuid
language plpgsql security invoker set search_path = ''
as $$
declare v_id uuid;
begin
  if p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid submission fingerprint' using errcode='22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_fingerprint,0));
  if (select count(*) from public.awe_inquiries
      where rate_fingerprint=p_fingerprint and created_at>pg_catalog.now()-interval '1 hour') >= 3 then
    raise exception 'rate_limited' using errcode='P0001';
  end if;
  insert into public.awe_inquiries (name,email,project,message,rate_fingerprint)
    values (p_name,p_email,p_project,p_message,p_fingerprint)
    returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.awe_submit_inquiry(text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.awe_submit_inquiry(text,text,text,text,text) to service_role;

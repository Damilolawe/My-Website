-- Atomically enqueue one customer confirmation when a Stripe-verified order becomes paid.
-- Existing paid orders are deliberately not backfilled: no surprise historical emails.
create table if not exists public.awe_order_confirmations (
  order_id uuid primary key references public.awe_orders(id),
  state text not null check (state in ('sending','accepted')),
  reserved_at timestamptz not null default now(),
  accepted_at timestamptz,
  provider_id text
);
alter table public.awe_order_confirmations enable row level security;
revoke all on public.awe_order_confirmations from public, anon, authenticated;
grant select,insert,update on public.awe_order_confirmations to service_role;

create or replace function public.awe_reserve_order_confirmation(p_order uuid)
returns text language plpgsql security invoker set search_path=public as $$
declare current_payment text; old_row public.awe_order_confirmations;
begin
  select payment into current_payment from public.awe_orders where id=p_order;
  if current_payment is distinct from 'paid' then raise exception 'Verified paid order required'; end if;
  select * into old_row from public.awe_order_confirmations where order_id=p_order for update;
  if not found then
    insert into public.awe_order_confirmations(order_id,state) values(p_order,'sending');
    return 'send';
  end if;
  if old_row.state='accepted' then return 'accepted'; end if;
  -- Resend's idempotency window is 24 hours. Never automatically re-send
  -- an ambiguous acceptance after the safe 20-hour reconciliation cutoff.
  if old_row.reserved_at < now() - interval '20 hours' then return 'reconcile'; end if;
  return 'send';
end $$;
revoke all on function public.awe_reserve_order_confirmation(uuid) from public,anon,authenticated;
grant execute on function public.awe_reserve_order_confirmation(uuid) to service_role;

create unique index if not exists awe_jobs_order_confirmation_once
  on public.awe_jobs(order_id) where kind='order_confirmation';

create or replace function public.awe_enqueue_order_confirmation()
returns trigger language plpgsql security invoker set search_path=public as $$
begin
  if new.payment='paid' and old.payment is distinct from 'paid' then
    insert into public.awe_jobs(order_id,kind)
      values(new.id,'order_confirmation') on conflict do nothing;
  end if;
  return new;
end $$;
drop trigger if exists awe_order_payment_confirmed on public.awe_orders;
create trigger awe_order_payment_confirmed
  after update of payment on public.awe_orders
  for each row execute function public.awe_enqueue_order_confirmation();
revoke all on function public.awe_enqueue_order_confirmation() from public,anon,authenticated;

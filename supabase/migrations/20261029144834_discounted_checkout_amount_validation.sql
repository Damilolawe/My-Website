-- Allow a verified Stripe Checkout promotion to lower the actual amount charged.
-- The signed Checkout webhook verifies immutable subtotal and Stripe discount totals first.
-- Keep the receipt ledger's amount as the amount actually paid (zero for 100% off).
create or replace function public.awe_payment(p_event text,p_order uuid,p_session text,p_intent text,p_amount integer,p_currency text,p_kind text)
returns boolean language plpgsql security invoker set search_path=public as $$
declare o awe_orders;
begin
 select * into o from awe_orders where id=p_order for update;
 if not found or o.stripe_session is distinct from p_session then raise exception 'Unknown checkout'; end if;
 if exists(select 1 from awe_payments where event_id=p_event) then return false; end if;
 if p_kind is null or p_kind not in ('paid','failed','refunded','partially_refunded') then raise exception 'Invalid payment event'; end if;
 if p_amount is null or p_currency is null or p_amount < 0 or p_amount > (o.package_snapshot->>'amount')::integer or p_currency <> o.package_snapshot->>'currency' then raise exception 'Payment mismatch'; end if;
 insert into awe_payments values(p_event,p_order,p_amount,p_currency,p_kind,now());
 if p_kind='paid' and o.payment='unpaid' then
  update awe_orders set payment='paid',payment_intent=p_intent,status='payment_verified',version=version+1 where id=p_order;
  insert into awe_jobs(order_id,kind) values(p_order,'generate');
 elsif p_kind in ('refunded','partially_refunded') and o.payment<>'refunded' then
  update awe_orders set payment=p_kind,version=version+1 where id=p_order;
 elsif p_kind='failed' and o.payment='unpaid' then insert into awe_events(order_id,kind) values(p_order,'payment_failed');
 end if;
 insert into awe_events(order_id,kind,details) values(p_order,'payment_'||p_kind,jsonb_build_object('event',p_event));
 return true;
end $$;

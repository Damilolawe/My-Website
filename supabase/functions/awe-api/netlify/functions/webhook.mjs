import { stripe, env, rpc, rows, json } from "../../platform/backend.mjs";
export default async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  // Verify each environment with its own signing secret, including
  // refunds/delayed events after new live checkouts are closed.
  let event;
  try {
    const raw = await req.text();
    if (raw.length > 262144) return json({ error: "Too large" }, 413);
    const signature = req.headers.get("stripe-signature");
    for (const [mode, secret] of [
      ["live", env().STRIPE_LIVE_WEBHOOK_SECRET],
      ["test", env().STRIPE_WEBHOOK_SECRET],
    ]) {
      if (typeof secret !== "string" || !secret.startsWith("whsec_")) continue;
      try {
        const verified = await stripe(mode).webhooks.constructEventAsync(raw, signature, secret);
        if (verified.livemode !== (mode === "live"))
          return json({ error: "Payment mode mismatch" }, 400);
        event = verified;
        break;
      } catch { /* Signature did not match this payment environment. */ }
    }
    if (!event) return json({ error: "Invalid webhook signature" }, 400);
  } catch {
    return json({ error: "Invalid webhook request" }, 400);
  }
  try {
    const x = event.data.object;
    let o, kind, session, amount, currency, intent;
    if (
      [
        "checkout.session.completed",
        "checkout.session.async_payment_succeeded",
        "checkout.session.async_payment_failed",
        "checkout.session.expired",
      ].includes(event.type)
    ) {
      if (x.mode !== "payment") return json({ received: true });
      session = x.id;
      o = (await rows("awe_orders", `stripe_session=eq.${session}`))[0];
      if (!o) return json({ error: "Checkout not recorded yet" }, 503);
      if (x.client_reference_id !== o.id)
        return json({ error: "Reference mismatch" }, 400);
      kind =
        x.payment_status === "paid"
          ? "paid"
          : [
                "checkout.session.async_payment_failed",
                "checkout.session.expired",
              ].includes(event.type)
            ? "failed"
            : null;
      amount = x.amount_total;
      currency = x.currency;
      intent = x.payment_intent;
    } else if (event.type === "charge.refunded") {
      o = (
        await rows("awe_orders", `payment_intent=eq.${x.payment_intent}`)
      )[0];
      if (!o) return json({ received: true });
      kind = x.refunded ? "refunded" : "partially_refunded";
      session = o.stripe_session;
      amount = x.amount;
      currency = x.currency;
      intent = x.payment_intent;
    }
    if (o && kind)
      await rpc("awe_payment", {
        p_event: event.id,
        p_order: o.id,
        p_session: session,
        p_intent: intent,
        p_amount: amount,
        p_currency: currency,
        p_kind: kind,
      });
    return json({ received: true });
  } catch {
    return json({ error: "Processing failed; retry required" }, 503);
  }
};


import {env, fail, insert, patch, rows, rpc} from "./backend.mjs";

// Send only after the signed Stripe webhook has committed a paid order.
// The database reservation + provider key protect duplicate webhook/job retries.
const SUPPORT_EMAIL = "contact@aweconcepts.com";
const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, (c) =>
  ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
export function confirmationMessage(order, payment, siteOrigin) {
  const pkg = order.package_snapshot || {};
  const amount = Number(payment.amount);
  if (!Number.isSafeInteger(amount) || amount < 0 ||
      !/^[a-z]{3}$/i.test(payment.currency || ""))
    fail("Verified payment details are unavailable.", 503);
  const total = new Intl.NumberFormat("en-US", {
    style: "currency", currency: payment.currency.toUpperCase()
  }).format(amount / 100);
  const name = String(pkg.name || pkg.tier || "Website package").trim().slice(0, 100);
  const revisions = String(pkg.revisions || "See your package details").trim().slice(0, 240);
  const accountUrl = new URL("/account.html", siteOrigin).toString();
  if (!/^https:\/\//.test(accountUrl)) fail("Secure account URL is not configured.", 503);
  const subject = "Awe Concepts | Order confirmed";
  const text = [
    "AWE CONCEPTS — ORDER CONFIRMED", "",
    "Thanks for your order! Your payment has been verified and your website order is confirmed.",
    "We will review your project details and keep you updated as your website moves through production.", "",
    "Order reference: " + order.id,
    "Package: " + name,
    "Amount charged: " + total,
    "Included revisions: " + revisions, "",
    "View your order: " + accountUrl,
    "Questions? Reply to this email or write to " + SUPPORT_EMAIL + ".", "",
    "This email confirms your purchase, not that your website has been completed.",
    "AWE CONCEPTS"
  ].join("\n");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;background:#0d0d10;color:#f3f2f0;font-family:Arial,Helvetica,sans-serif"><div style="max-width:590px;margin:0 auto;padding:40px 24px 48px"><div style="font-weight:700;letter-spacing:3px;font-size:14px">AWE CONCEPTS</div><div style="height:1px;background:#4a4948;margin:28px 0 36px"></div><p style="color:#d9c3a7;font-size:12px;letter-spacing:2px;text-transform:uppercase">Purchase confirmed</p><h1 style="font-size:36px;line-height:1.12;letter-spacing:-1px;margin:10px 0 20px">Your order is in.</h1><p style="color:#cecdd0;font-size:16px;line-height:1.7">Thanks for choosing Awe Concepts. Your payment is verified, and we have received your website order. We will review your project details and keep you updated as your website moves through production.</p><div style="background:#1b1b1e;border:1px solid #45434a;border-radius:12px;padding:24px;margin:32px 0"><p style="margin:0 0 16px;color:#d9c3a7;font-size:12px;letter-spacing:1.5px;text-transform:uppercase">Order summary</p><p style="margin:0 0 12px;line-height:1.5"><strong>Package</strong><br>${escapeHtml(name)}</p><p style="margin:0 0 12px;line-height:1.5"><strong>Amount charged</strong><br>${escapeHtml(total)}</p><p style="margin:0 0 12px;line-height:1.5"><strong>Included revisions</strong><br>${escapeHtml(revisions)}</p><p style="margin:0;line-height:1.5;overflow-wrap:anywhere"><strong>Order reference</strong><br>${escapeHtml(order.id)}</p></div><a href="${escapeHtml(accountUrl)}" style="display:inline-block;background:#e8dac8;color:#161518;text-decoration:none;border-radius:7px;padding:16px 23px;font-size:15px;font-weight:700">View your order</a><p style="color:#b6b4b9;font-size:14px;line-height:1.7;margin-top:34px">Need help? Contact <a href="mailto:${SUPPORT_EMAIL}" style="color:#e8dac8">${SUPPORT_EMAIL}</a>.<br>This confirms your order, not final website delivery.</p><div style="height:1px;background:#4a4948;margin:32px 0 16px"></div><p style="font-size:12px;color:#939198">AWE CONCEPTS · Website design made personal</p></div></body></html>`;
  return {subject, text, html};
}

export async function sendOrderConfirmation(order) {
  // Do not send confirmations for unpaid, failed, refunded or draft-only orders.
  if (!order || order.payment !== "paid" || !order.stripe_session) return false;
  const payments = await rows("awe_payments",
    `order_id=eq.${order.id}&kind=eq.paid&order=created_at.asc&limit=1`);
  const payment = payments[0];
  if (!payment) fail("Verified payment record is missing.", 503);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email || ""))
    fail("Customer email is missing.", 503);
  if (!env().RESEND_API_KEY || !env().EMAIL_FROM || !env().SITE_ORIGIN)
    fail("Confirmation email service is not configured.", 503);
  const message = confirmationMessage(order, payment, env().SITE_ORIGIN);
  const reservation = await rpc("awe_reserve_order_confirmation", {p_order: order.id});
  if (reservation === "accepted") return false;
  if (reservation !== "send")
    fail("Order confirmation requires owner reconciliation before retry.", 409);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env().RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `order-confirmation/${order.id}`,
    },
    body: JSON.stringify({
      from: env().EMAIL_FROM, reply_to: SUPPORT_EMAIL,
      to: [order.email], ...message,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) fail("Order confirmation email was not accepted.", 502);
  const sent = await response.json();
  if (typeof sent.id !== "string" || !sent.id)
    fail("Confirmation email provider did not acknowledge acceptance.", 502);
  const recorded = await patch("awe_order_confirmations",
    `order_id=eq.${order.id}&state=eq.sending`,
    {state:"accepted",provider_id:sent.id,accepted_at:new Date().toISOString()});
  if (!recorded.length) fail("Order confirmation acceptance could not be recorded.", 503);
  await insert("awe_events", {
    order_id: order.id, kind:"order_confirmation_email_accepted",
    details:{provider_id:sent.id},
  });
  return true;
}

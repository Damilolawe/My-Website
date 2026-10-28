import { env, fail, insert, rows } from "./backend.mjs";

export const WORK_HANDOFF_SUBJECT = "AWE WORK HANDOFF | DRAFT READY";
export const WORK_HANDOFF_RECIPIENT = "contact@aweconcepts.com";

// Keep client material and credentials out of the Gmail trigger. Work must
// authenticate as the verified studio owner before it can see the draft.
export function workHandoffMessage(order, version, siteOrigin) {
  if (!/^[a-f0-9-]{36}$/i.test(order.id) || !/^[a-f0-9-]{36}$/i.test(version))
    throw Error("Invalid private draft reference.");
  const url = new URL("/admin.html", siteOrigin);
  url.searchParams.set("order", order.id);
  return [
    "AWE CONCEPTS / VERIFIED PURCHASE / PRIVATE DRAFT READY",
    "",
    "Order reference: " + order.id,
    "Draft version: " + version,
    "Owner-only review: " + url.toString(),
    "",
    "Start the Awe Concepts design review in ChatGPT Work.",
    "Use the verified owner's access and approved website materials only.",
    "If the private draft is inaccessible, stop and request an authorized",
    "export of the draft; do not guess content or use public sample pages.",
    "Preserve the client's chosen template identity, edit private drafts only,",
    "check desktop and mobile, and never publish without owner approval.",
    "",
    "This notification intentionally contains no client documents, photos,",
    "payment details, credentials, or public access tokens.",
  ].join("\n");
}

export async function sendWorkHandoff(order, version) {
  if (env().AWE_WORK_HANDOFF_ENABLED !== "true") return false;
  if (order.payment !== "paid" || !version) return false;
  // Never send client order metadata to a different (including personal) inbox.
  const recipient = WORK_HANDOFF_RECIPIENT;
  if (env().AWE_WORK_HANDOFF_EMAIL &&
      env().AWE_WORK_HANDOFF_EMAIL.trim().toLowerCase() !== recipient)
    fail("Work handoff recipient must be the Awe Concepts business mailbox.", 503);
  const from = env().EMAIL_FROM;
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) ||
      !env().RESEND_API_KEY || !from || !env().SITE_ORIGIN)
    fail("Owner Work handoff email is not configured.", 503);
  const existing = await rows("awe_events",
    `order_id=eq.${order.id}&kind=eq.work_handoff_email_accepted&limit=100`);
  if (existing.some(e => e.details?.version === version)) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env().RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `work-handoff/${order.id}/${version}`,
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: WORK_HANDOFF_SUBJECT,
      text: workHandoffMessage(order, version, env().SITE_ORIGIN),
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) fail("Owner Work handoff notification failed.", 502);
  const result = await response.json();
  await insert("awe_events", {
    order_id: order.id,
    kind: "work_handoff_email_accepted",
    details: {version, provider_id: result.id},
  });
  return true;
}

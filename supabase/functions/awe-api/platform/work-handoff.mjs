import { env, fail, insert, rpc, stripe } from "./backend.mjs";

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

export async function sendWorkHandoff(order, version, {sandboxVerified = false} = {}) {
  if (env().AWE_WORK_HANDOFF_ENABLED !== "true" &&
      !(sandboxVerified === true && order.package_snapshot?.testOnly === true)) return false;
  if (order.payment !== "paid" || !version) return false;
  if (order.package_snapshot?.aiProcessingConsent?.granted !== true ||
      order.package_snapshot.aiProcessingConsent.policy !== "chatgpt-work-v1") return false;
  // Never send client order metadata to a different (including personal) inbox.
  const recipient = WORK_HANDOFF_RECIPIENT;
  if (env().AWE_WORK_HANDOFF_EMAIL &&
      env().AWE_WORK_HANDOFF_EMAIL.trim().toLowerCase() !== recipient)
    fail("Work handoff recipient must be the Awe Concepts business mailbox.", 503);
  const from = env().AWE_WORK_HANDOFF_FROM || env().EMAIL_FROM;
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) ||
      !env().RESEND_API_KEY || !from || !env().SITE_ORIGIN)
    fail("Owner Work handoff email is not configured.", 503);
  const reservation = await rpc("awe_reserve_work_handoff", {p_order: order.id, p_version: version});
  if (reservation === "accepted") return false;
  if (reservation !== "send") fail("Work notification requires owner reconciliation before retrying.", 409);
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
  if (typeof result.id !== "string" || !result.id) fail("Notification provider did not confirm acceptance.", 502);
  await insert("awe_events", {
    order_id: order.id,
    kind: "work_handoff_email_accepted",
    details: {version, provider_id: result.id},
  });
  return true;
}

// One-off owner-queued acceptance jobs may exercise the email trigger without
// opening production handoff globally. A real paid SANDBOX session is required.
export async function sendSandboxWorkHandoff(order, version) {
  if (order.package_snapshot?.testOnly !== true || order.payment !== "paid" ||
      !version || order.draft_version !== version || !order.stripe_session)
    fail("A current paid sandbox draft is required.", 403);
  const session = await stripe("test").checkout.sessions.retrieve(order.stripe_session);
  if (session.livemode !== false || session.mode !== "payment" ||
      session.payment_status !== "paid" || session.client_reference_id !== order.id ||
      session.amount_total !== order.package_snapshot.amount ||
      session.currency !== order.package_snapshot.currency)
    fail("Sandbox payment verification failed.", 403);
  return sendWorkHandoff(order, version, {sandboxVerified:true});
}

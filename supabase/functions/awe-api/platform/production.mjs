import { rows, rpc, patch, insert, id, env, fail } from "./backend.mjs";
import { renderSite } from "../shared/render.mjs";
import { validate } from "../shared/model.mjs";
import { premiumStudyIds } from "../shared/premium-art-direction-35.mjs";
import { verifyPublication } from "./verify-publication.mjs";
import {allowedApprovedPageNames} from "../shared/approved-pages.mjs";
import { sendWorkHandoff, sendSandboxWorkHandoff } from "./work-handoff.mjs";
export async function saveDraft(order, input, actor = null) {
  const data = validate(input);
  const assets = await rows("awe_assets", `order_id=eq.${order.id}`);
  for (const photo of data.content.photoIds)
    if (
      !assets.some(
        (a) =>
          a.id === photo && a.mime.startsWith("image/") && a.public_allowed,
      )
    )
      fail("Only explicitly selected portfolio images may appear publicly.");
  const html = renderSite(data);
  const maxLength = premiumStudyIds.includes(data.template) ? 256000 : 200000;
  if (
    html.length > maxLength ||
    !/<h1(?:\s|>)/i.test(html) ||
    !html.includes("viewport")
  )
    fail("Generated page failed validation.");
  const version = id();
  await rpc("awe_save_draft", {
    p_order: order.id,
    p_expected: order.version,
    p_id: version,
    p_input: data,
    p_html: html,
    p_assets: data.content.photoIds,
    p_actor: actor,
  });
  return version;
}
export async function runJobs(limit = 3) {
  let count = 0;
  while (count++ < limit) {
    const job = (await rpc("awe_claim"))[0];
    if (!job) break;
    try {
      const o = (await rows("awe_orders", `id=eq.${job.order_id}`))[0];
      if (job.kind === "generate") {
        if (o.draft_version) {
          // Replayed generation must not regenerate or republish the draft.
          // If its separate owner notification failed, retry just that step.
          await sendWorkHandoff(o, o.draft_version);
        } else {
          await patch("awe_orders", `id=eq.${o.id}&version=eq.${o.version}`, {
            status: "generating",
          });
          const draftVersion = await saveDraft(o, o.input);
          // Paid draft exists before any external notification. No AI work
          // happens here, and no publication is performed automatically.
          await sendWorkHandoff(o, draftVersion);
        }
      } else if (job.kind === "work_acceptance") {
        await sendSandboxWorkHandoff(o, job.version_id);
      } else if (job.kind === "deliver") {
        await deliver(o, job.version_id);
      }
      await patch("awe_jobs", `id=eq.${job.id}&lease=eq.${job.lease}`, {
        done: true,
        error: null,
      });
    } catch (e) {
      await patch("awe_jobs", `id=eq.${job.id}&lease=eq.${job.lease}`, {
        error: "Operation failed; inspect provider setup and retry.",
        available_at: new Date(Date.now() + 600000).toISOString(),
      });
      if (job.kind === "generate")
        await patch(
          "awe_orders",
          `id=eq.${job.order_id}&draft_version=is.null`,
          { status: "generation_failed" },
        );
      else if (job.kind === "deliver")
        await patch("awe_orders", `id=eq.${job.order_id}`, {
          delivery_error: "Delivery pending; owner attention required.",
        });
      console.error("Job failed", job.id, e.status || 500);
    }
  }
}
async function deliver(o, version) {
  if (o.public_version !== version) return;
  const approval = await rows(
    "awe_approvals",
    `order_id=eq.${o.id}&version_id=eq.${version}`,
  );
  if (!approval.length) fail("Approval required.");
  if (
    (
      await rows(
        "awe_deliveries",
        `order_id=eq.${o.id}&version_id=eq.${version}`,
      )
    ).length
  )
    return;
  const url = `${env().SITE_ORIGIN}/sites/${o.slug}`;
  const v = (await rows("awe_versions", `id=eq.${version}`))[0];
  if (!v || v.order_id !== o.id) fail("Approved website version is missing.");
  await verifyPublication({
    siteUrl: url,
    publicApiUrl: `${env().SUPABASE_URL.replace(new RegExp("/+$"), "")}/functions/v1/awe-api/public/${o.slug}`,
    version,
    assets: v.asset_ids,
    requiredPages: o.package_snapshot?.delivery === "awe-multipage"
      ? allowedApprovedPageNames(v.input?.template).slice(1) : [],
  });
  if (!env().RESEND_API_KEY || !env().EMAIL_FROM)
    fail("Delivery email is not configured.", 503);
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env().RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `delivery/${o.id}/${version}`,
    },
    body: JSON.stringify({
      from: env().EMAIL_FROM,
      to: [o.email],
      subject: "Your AWE CONCEPTS website is ready",
      text: `Your website has been reviewed and is ready to share.\n\n${url}\n\nHosting: ${o.package_snapshot.hosting}\nOwnership: ${o.package_snapshot.ownership}\nRevisions: ${o.package_snapshot.revisions}\n\nShare the link on your résumé and profiles. Sign in at ${env().SITE_ORIGIN}/account.html to request changes.\n\nAWE CONCEPTS`,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!result.ok) fail("Email delivery failed.", 502);
  const sent = await result.json();
  await insert("awe_deliveries", {
    id: id(),
    order_id: o.id,
    version_id: version,
    provider_id: sent.id,
  });
  await patch("awe_orders", `id=eq.${o.id}&public_version=eq.${version}`, {
    status: "delivered",
    delivery_error: null,
  });
  await insert("awe_events", {
    order_id: o.id,
    kind: "email_accepted",
    details: { version, provider_id: sent.id },
  });
}


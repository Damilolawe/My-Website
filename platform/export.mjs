import { zipSync, strToU8 } from "fflate";
import { rows, sb, fail } from "./backend.mjs";
import {renderApprovedDesignPages,allowedApprovedPageNames} from "../shared/approved-pages.mjs";

const EXT = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"]]);

export async function exportApproved(o) {
  if (!o.public_version) fail("Website files are available after approval.", 403);
  const approval = await rows("awe_approvals",
    `order_id=eq.${o.id}&version_id=eq.${o.public_version}&limit=1`);
  if (!approval.length) fail("Approval required.", 403);
  const v = (await rows("awe_versions",
    `id=eq.${o.public_version}&order_id=eq.${o.id}&limit=1`))[0];
  if (!v || typeof v.html !== "string" || !Array.isArray(v.asset_ids))
    fail("The approved website version could not be found.", 404);

  const pages=allowedApprovedPageNames(v.input?.template).length===5
    ? renderApprovedDesignPages(v.input)
    : {"index.html":v.html};
  const files = {};
  let total = 0;
  for (const aid of v.asset_ids) {
    const asset = (await rows("awe_assets",
      `id=eq.${aid}&order_id=eq.${o.id}&public_allowed=eq.true&limit=1`))[0];
    const extension = EXT.get(asset?.mime);
    if (!extension) fail("Approved image unavailable.", 409);
    const response = await sb(`/storage/v1/object/awe-private/${asset.path}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    total += bytes.length;
    if (!bytes.length || total > 3_500_000)
      fail("Website files exceed the secure download limit. Request a transfer from the studio.", 413);
    const destination = `assets/${aid}.${extension}`;
    files[destination] = bytes;
    for(const name of Object.keys(pages))pages[name]=pages[name].replaceAll(`src="/api/assets/${aid}"`,
      `src="${destination}"`);
  }
  for(const [name,html] of Object.entries(pages)) {
    if(html.includes('src="/api/assets/'))fail("Unresolved private asset reference.",409);
    files[name]=strToU8(html);
  }
  files["README.txt"] = strToU8(
    `Your approved Awe Concepts website.\n\nOpen index.html to preview it locally.\n\nUpload all HTML pages and the assets folder to a static website host.\nHosting: ${o.package_snapshot.hosting}\nOwnership: ${o.package_snapshot.ownership}\nRevisions: ${o.package_snapshot.revisions}\n`
  );
  return new Response(zipSync(files, { level: 1 }), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${o.slug}.zip"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/**
 * Owner-only editing handoff. Unlike exportApproved, this deliberately uses
 * the latest PRIVATE version and never requires or changes public approval.
 * The caller must first pass the existing studio-owner identity gate.
 */
export async function exportPrivateDraft(o) {
  if (o.payment !== "paid" || !o.draft_version)
    fail("A verified paid private draft is required.", 403);
  if (o.package_snapshot?.aiProcessingConsent?.granted !== true ||
      o.package_snapshot.aiProcessingConsent.policy !== "chatgpt-work-v1")
    fail("Customer consent for ChatGPT Work processing is required.", 403);
  const v = (await rows("awe_versions",
    "id=eq." + o.draft_version + "&order_id=eq." + o.id + "&limit=1"))[0];
  if (!v || typeof v.html !== "string" || !Array.isArray(v.asset_ids))
    fail("The private website draft could not be found.", 404);
  const pages = allowedApprovedPageNames(v.input?.template).length === 5
    ? renderApprovedDesignPages(v.input) : {"index.html": v.html};
  const files = {};
  let total = 0;
  for (const aid of v.asset_ids) {
    const asset = (await rows("awe_assets",
      "id=eq." + aid + "&order_id=eq." + o.id +
      "&public_allowed=eq.true&limit=1"))[0];
    const extension = EXT.get(asset?.mime);
    if (!extension) fail("Selected client image unavailable.", 409);
    const response = await sb("/storage/v1/object/awe-private/" + asset.path);
    const bytes = new Uint8Array(await response.arrayBuffer());
    total += bytes.length;
    if (!bytes.length || total > 3_500_000)
      fail("Private draft exceeds the secure download limit.", 413);
    const filePath = "assets/" + aid + "." + extension;
    files[filePath] = bytes;
    for (const name of Object.keys(pages))
      pages[name] = pages[name].replaceAll(
        'src="/api/assets/' + aid + '"', 'src="' + filePath + '"');
  }
  for (const [name, html] of Object.entries(pages)) {
    if (html.includes('src="/api/assets/'))
      fail("Private asset could not be packaged safely.", 409);
    files[name] = strToU8(html);
  }
  files["awe-design-input.json"] = strToU8(JSON.stringify({
    format: "awe-private-design-handoff-v1",
    orderId: o.id,
    privateVersion: v.id,
    templateId: v.input?.template,
    designInput: v.input,
  }, null, 2));
  files["CHATGPT-WORK-INSTRUCTIONS.txt"] = strToU8([
    "AWE CONCEPTS — PRIVATE OWNER DESIGN HANDOFF",
    "",
    "Use ONLY the client's supplied content and approved images in this ZIP.",
    "Preserve the chosen template's identity and make responsive improvements.",
    "Do not invent biographies, experience, quotes, reviews, or business claims.",
    "Inspect every page, maintain relative local image paths, and verify mobile.",
    "Return revised website files for separate owner review.",
    "Never publish automatically or upload this ZIP to a public repository.",
    "Do not include third-party trackers or external scripts.",
    "",
    "Order reference: " + o.id,
    "Private version: " + v.id,
  ].join("\n"));
  return new Response(zipSync(files, {level: 1}), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="awe-private-' + o.id + '.zip"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

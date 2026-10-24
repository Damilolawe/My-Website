import { zipSync, strToU8 } from "fflate";
import { rows, sb, fail } from "./backend.mjs";
import {renderApprovedRunwayPages} from "../shared/runway-customer-pages.mjs";

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

  const pages=v.input?.template==="runwaymulti"
    ? renderApprovedRunwayPages(v.input)
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

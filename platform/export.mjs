import { zipSync, strToU8 } from "fflate";
import { rows, sb, fail } from "./backend.mjs";
export async function exportApproved(o) {
  if (!o.public_version)
    fail("Website files are available after approval.", 403);
  const approval = await rows(
    "awe_approvals",
    `order_id=eq.${o.id}&version_id=eq.${o.public_version}`,
  );
  if (!approval.length) fail("Approval required.", 403);
  const v = (
    await rows("awe_versions", `id=eq.${o.public_version}&order_id=eq.${o.id}`)
  )[0];
  const files = {
    "index.html": strToU8(
      v.asset_ids.reduce(
        (html, aid) =>
          html.replaceAll('src="/api/assets/' + aid, 'src="assets/' + aid + ".webp"),
        v.html,
      ),
    ),
    "README.txt": strToU8(
      `Your reviewed AWE / DIGITAL website.\nUpload index.html and the assets folder to a static web host.\nOwnership: ${o.package_snapshot.ownership}\nHosting: ${o.package_snapshot.hosting}\nRevisions: ${o.package_snapshot.revisions}\n`,
    ),
  };
  let total = 0;
  for (const aid of v.asset_ids) {
    const a = (
      await rows(
        "awe_assets",
        `id=eq.${aid}&order_id=eq.${o.id}&public_allowed=eq.true`,
      )
    )[0];
    if (!a?.mime.startsWith("image/")) fail("Approved image unavailable.", 409);
    const r = await sb(`/storage/v1/object/awe-private/${a.path}`, {
      headers: { "Content-Type": a.mime },
    });
    const bytes = new Uint8Array(await r.arrayBuffer());
    total += bytes.length;
    if (total > 3500000)
      fail(
        "This package is too large for online download. Request a file transfer from the studio.",
        413,
      );
    files["assets/" + aid + ".webp"] = bytes;
  }
  return new Response(zipSync(files, { level: 1 }), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${o.slug}.zip"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

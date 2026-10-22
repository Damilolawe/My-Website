import { rows, sb, uuid } from "../../platform/backend.mjs";
export default async function (req) {
  try {
    if (!["GET", "HEAD"].includes(req.method))
      return new Response("Method not allowed", { status: 405 });
    const p = new URL(req.url).pathname
      .replace(/^\/\.netlify\/functions\/site/, "/sites")
      .split("/")
      .filter(Boolean);
    const slug = p[1];
    if (!/^[a-z0-9-]{3,90}$/.test(slug || ""))
      return new Response("Not found", { status: 404 });
    const o = (
      await rows(
        "awe_orders",
        `slug=eq.${slug}&public_version=not.is.null&select=id,public_version`,
      )
    )[0];
    if (!o)
      return new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    const v = (
      await rows(
        "awe_versions",
        `id=eq.${o.public_version}&order_id=eq.${o.id}`,
      )
    )[0];
    const approved = await rows(
      "awe_approvals",
      `order_id=eq.${o.id}&version_id=eq.${v.id}&limit=1`,
    );
    if (!approved.length) return new Response("Not found", { status: 404 });
    let data, mime;
    if (p[2] === "assets" && p[3]) {
      const aid = uuid(p[3]);
      if (!v.asset_ids.includes(aid))
        return new Response("Not found", { status: 404 });
      const a = (
        await rows(
          "awe_assets",
          `id=eq.${aid}&order_id=eq.${o.id}&public_allowed=eq.true`,
        )
      )[0];
      if (!a || !a.mime.startsWith("image/"))
        return new Response("Not found", { status: 404 });
      const r = await sb(`/storage/v1/object/awe-private/${a.path}`, {
        headers: { "Content-Type": a.mime },
      });
      data = await r.arrayBuffer();
      mime = a.mime;
    } else if (p.length === 2) {
      data = v.html.replaceAll('src="/api/assets/', `src="/sites/${slug}/assets/`);
      mime = "text/html; charset=utf-8";
    } else return new Response("Not found", { status: 404 });
    return new Response(req.method === "HEAD" ? null : data, {
      headers: {
        "Content-Type": mime,
        "X-AWE-Version": v.id,
        "Cache-Control": "public, max-age=0, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch {
    return new Response("Site unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}


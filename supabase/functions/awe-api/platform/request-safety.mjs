import { env, fail } from "./backend.mjs";

// A cap applies even when Content-Length is omitted or deliberately falsified.
// This protects Edge Function memory and all downstream parsers/decoders.
export const MAX_REQUEST_BYTES = 4_500_000;
export async function bounded(req, limit = MAX_REQUEST_BYTES) {
  const rawLength = req.headers.get("content-length");
  if (rawLength !== null && (!/^\d+$/.test(rawLength) || Number(rawLength) > limit))
    fail("Request too large or invalid length.", 413);
  if (!req.body) return req;
  const reader = req.body.getReader();
  let total = 0;
  const parts = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel();
      fail("Request too large.", 413);
    }
    parts.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    bytes.set(part, offset);
    offset += part.byteLength;
  }
  return new Request(req.url, { method: req.method, headers: req.headers, body: bytes });
}

// Explicit origin allowlisting; browser requests never receive wildcard CORS.
// CORS is not authentication — every private route still verifies the bearer
// token and authorizes the specific resource.
export function cors(req, res) {
  const headers = new Headers(res.headers);
  const settings = env();
  const allowed = new Set([settings.SITE_ORIGIN, ...(settings.ALLOWED_ORIGINS || "")
    .split(",").map(x => x.trim()).filter(Boolean)].filter(Boolean));
  const incomingOrigin = req.headers.get("origin");
  if (incomingOrigin && allowed.has(incomingOrigin)) {
    headers.set("Access-Control-Allow-Origin", incomingOrigin);
  } else {
    headers.delete("Access-Control-Allow-Origin");
  }
  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Headers", "authorization, apikey, content-type, x-client-info");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
  headers.set("Access-Control-Expose-Headers", "X-AWE-Version, Content-Disposition");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(res.body, { status: res.status, headers });
}

/**
 * Only public, fictional template documents can enter a preview.
 *
 * Netlify's site-wide X-Frame-Options: DENY / CSP frame-ancestors 'none'
 * correctly prevent direct URL framing. We fetch the public static HTML
 * on the SAME origin and assign it to a sandboxed iframe via srcdoc.
 * This bypasses a navigation to a frame-blocked URL while preserving
 * those important response headers and disabling all scripts in previews.
 */
export const TEMPLATE_IDS = Object.freeze([
  "index", "folio", "still", "afterhours", "signal", "daylight",
]);

export function previewMessage(message) {
  const text = String(message).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  return '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Template preview</title></head>' +
    '<body style="background:#14161a;color:#f5f7f0;display:grid;place-items:center;' +
    'min-height:90vh;margin:0;font:16px/1.6 system-ui,sans-serif;padding:24px;text-align:center">' +
    '<p>' + text + '</p></body></html>';
}

export async function fetchPublicTemplate(id, { still = false, signal } = {}) {
  // Never use input data as URLs, and never fetch customer content.
  if (!TEMPLATE_IDS.includes(id)) throw new Error("Unknown template.");
  const path = "/templates/" + id + (still ? "--still" : "") + ".html";
  const response = await fetch(path, {
    signal, credentials: "same-origin", mode: "same-origin",
    headers: { Accept: "text/html" },
  });
  if (!response.ok) throw new Error("Preview is unavailable (HTTP " + response.status + ").");
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("text/html"))
    throw new Error("Preview returned an unexpected document type.");
  const markup = await response.text();
  if (markup.length > 300000 ||
      !/^\s*<!doctype html>/i.test(markup) ||
      !markup.includes("FICTIONAL TEMPLATE DEMO"))
    throw new Error("Preview did not return a valid public sample.");
  return markup;
}

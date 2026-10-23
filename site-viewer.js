// Public site shell for Firebase Hosting Classic (Spark tier).
// Never request customer drafts here: this API returns approved versions only.
const API = "https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api/public/";
const frame = document.getElementById("approved-site");
const status = document.getElementById("viewer-status");
const message = document.getElementById("viewer-message");
const match = /^\/sites\/([a-z0-9-]{3,90})\/?$/.exec(location.pathname);
function unavailable() {
  status.querySelector("h1").textContent = "This website isn't published";
  message.textContent = "The address may be incorrect, or the studio owner has not approved this website yet.";
  frame.hidden = true;
  status.hidden = false;
}
async function loadApprovedWebsite() {
  if (!match) return unavailable();
  try {
    const response = await fetch(API + match[1], {
      method: "GET", cache: "no-store", credentials: "omit",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) return unavailable();
    const data = await response.json();
    if (!data || typeof data.html !== "string" || data.html.length > 200000 ||
        !/^<!doctype html>/i.test(data.html.slice(0,100)) ||
        !/^[0-9a-f-]{36}$/i.test(data.version || "")) return unavailable();
    frame.addEventListener("load", () => {
      status.hidden = true;
      frame.hidden = false;
    }, { once: true });
    // Customer HTML stays isolated: NO allow-scripts or allow-same-origin.
    frame.srcdoc = data.html;
  } catch {
    unavailable();
  }
}
loadApprovedWebsite();

import { randomUUID } from "node:crypto";
import Stripe from "stripe";
export const env = () => {
  const e = typeof Deno !== "undefined" ? Deno.env.toObject() : process.env;
  return { ...e, SUPABASE_PUBLISHABLE_KEY: e.SUPABASE_PUBLISHABLE_KEY || e.SUPABASE_ANON_KEY,
    SITE_ORIGIN: e.SITE_ORIGIN || "https://aweconcepts.com" };
};
// Pin the single studio-owner identity, never just an email or user-editable
// metadata. Membership in the service-only owner table remains mandatory.
const STUDIO_OWNER_USER_ID = "220ddd21-710f-4dea-bc24-e34c8ba9cef8";
const STUDIO_OWNER_EMAIL = "contact@aweconcepts.com";
export async function isOwner(u) {
  if (!u?.email_confirmed_at ||
      u.id !== STUDIO_OWNER_USER_ID ||
      u.email?.trim().toLowerCase() !== STUDIO_OWNER_EMAIL) return false;
  return (await rows("awe_owner", `user_id=eq.${uuid(u.id)}&limit=1`)).length === 1;
}
export function fail(message, status = 400) {
  throw Object.assign(new Error(message), { status });
}
export function ready() {
  return !!(
    env().SUPABASE_URL &&
    env().SUPABASE_SERVICE_ROLE_KEY &&
    env().SUPABASE_PUBLISHABLE_KEY
  );
}
export async function sb(path, options = {}) {
  if (!ready()) fail("Account services are not configured yet.", 503);
  const r = await fetch(env().SUPABASE_URL + path, {
    ...options,
    headers: {
      apikey: env().SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env().SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) {
    console.error("Backend operation failed", r.status, path.split("?")[0]);
    fail(
      "The operation could not be completed. Refresh and try again.",
      r.status === 409 ? 409 : 502,
    );
  }
  return r.status === 204
    ? null
    : (r.headers.get("content-type") || "").includes("json")
      ? r.json()
      : r;
}
export const rows = (table, q = "") => sb(`/rest/v1/${table}?${q}`);
export const insert = (table, data) =>
  sb(`/rest/v1/${table}`, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(data),
  });
export const patch = (table, q, data) =>
  sb(`/rest/v1/${table}?${q}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(data),
  });
export const rpc = (name, data = {}) =>
  sb(`/rest/v1/rpc/${name}`, { method: "POST", body: JSON.stringify(data) });
export const id = () => randomUUID();
export function uuid(value) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value || "",
    )
  )
    fail("Invalid reference.");
  return value;
}
export async function user(req) {
  const token = req.headers.get("authorization")?.match(/^Bearer ([^\s]+)$/i)?.[1] || (req.headers.get("cookie") || "")
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith("__Host-awe="))
    ?.slice(11);
  if (!token) fail("Sign in to continue.", 401);
  const r = await fetch(env().SUPABASE_URL + "/auth/v1/user", {
    headers: {
      apikey: env().SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) fail("Your session expired. Sign in again.", 401);
  const u = await r.json();
  if (!u.email_confirmed_at) fail("Verify your email first.", 403);
  return u;
}
export async function owned(orderId, u, owner = false) {
  const o = (await rows("awe_orders", `id=eq.${uuid(orderId)}`))[0];
  if (!o || (!owner && o.user_id !== u.id)) fail("Order not found.", 404);
  return o;
}
// CORS and request validation MUST use the same production origin set.
// The custom hostname and Firebase transition host remain valid together.
// Only exact HTTPS origins are permitted; no wildcards or opaque origins.
export function allowedOrigins() {
  const defaults = ["https://aweconcepts.com", "https://www.aweconcepts.com", "https://awe-digital.web.app"];
  const configured = [env().SITE_ORIGIN, ...(env().ALLOWED_ORIGINS || "").split(",")];
  const origins = new Set(defaults);
  for (const value of configured) {
    const candidate = String(value || "").trim().replace(/\/$/, "");
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (url.protocol === "https:" && url.origin === candidate &&
          !url.username && !url.password && url.port === "")
        origins.add(candidate);
    } catch { /* Ignore malformed optional configuration. */ }
  }
  return origins;
}
export function originAllowed(req) {
  return allowedOrigins().has(req.headers.get("origin"));
}
export function origin(req) {
  if (!originAllowed(req)) fail("Request origin rejected.", 403);
}
// Live checkout is opt-in; connected Stripe alone never opens public ordering.
// Server-only key validation: standard (sk_) and least-privilege restricted (rk_)
// Stripe keys work equally for Checkout; the key mode must match the payment mode.
function validStripeKey(key, mode) {
  if (typeof key !== "string") return false;
  return mode === "live"
    ? (key.startsWith("sk_live_") || key.startsWith("rk_live_"))
    : (key.startsWith("sk_test_") || key.startsWith("rk_test_"));
}
export function liveCheckoutConfigured() {
  const settings = env();
  return settings.LIVE_CHECKOUT_ENABLED === "true" &&
    settings.ORDERS_ENABLED === "true" &&
    validStripeKey(settings.STRIPE_LIVE_SECRET_KEY, "live") &&
    settings.STRIPE_LIVE_WEBHOOK_SECRET?.startsWith("whsec_") === true;
}
export function stripe(mode = "test") {
  if (mode !== "live" && mode !== "test") fail("Unknown payment mode.", 400);
  const settings = env();
  const live = mode === "live";
  const key = live ? settings.STRIPE_LIVE_SECRET_KEY : settings.STRIPE_SECRET_KEY;
  if (!validStripeKey(key, mode))
    fail(live ? "Live checkout is not configured." : "Test checkout is not configured.", 503);
  return new Stripe(key, { maxNetworkRetries: 2, timeout: 15000 });
}
export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}
export async function body(req, max = 65536) {
  const b = await req.text();
  if (Buffer.byteLength(b) > max) fail("Request too large.", 413);
  try {
    return JSON.parse(b);
  } catch {
    fail("Invalid request.");
  }
}
export function cookie(token, seconds = 3600) {
  return `__Host-awe=${token}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${Math.min(seconds, 3600)}`;
}


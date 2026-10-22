import { randomUUID } from "node:crypto";
import Stripe from "stripe";
export const env = () => {
  const e = typeof Deno !== "undefined" ? Deno.env.toObject() : process.env;
  return { ...e, SUPABASE_PUBLISHABLE_KEY: e.SUPABASE_PUBLISHABLE_KEY || e.SUPABASE_ANON_KEY,
    SITE_ORIGIN: e.SITE_ORIGIN || "https://awe-digital.web.app" };
};
export async function isOwner(u) {
  if (!u?.email_confirmed_at) return false;
  if (env().OWNER_USER_ID) return u.id === env().OWNER_USER_ID;
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
export function origin(req) {
  if (![env().SITE_ORIGIN, "https://aweconcepts.com", "https://www.aweconcepts.com", "https://awe-digital.web.app", ...(env().ALLOWED_ORIGINS || "").split(",").filter(Boolean)].includes(req.headers.get("origin")))
    fail("Request origin rejected.", 403);
}
export function stripe() {
  if (!env().STRIPE_SECRET_KEY?.startsWith("sk_test_"))
    fail("Test checkout is not configured.", 503);
  return new Stripe(env().STRIPE_SECRET_KEY, {
    maxNetworkRetries: 2,
    timeout: 15000,
  });
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


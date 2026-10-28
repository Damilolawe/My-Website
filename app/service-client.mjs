import { AWE_SUPABASE_URL, AWE_SUPABASE_PUBLISHABLE_KEY, AWE_EDGE_FUNCTION } from "./service-config.mjs";
import { prepareImageUpload } from "./image-upload.mjs";

const STORAGE_KEY = "awe:auth-session:v1";
const PUBLIC_ROUTES = new Set(["catalog", "health"]);
const SESSION_SKEW_MS = 60_000;
function fail(message) { throw Error(message); }
function messageFor(data, status) {
  if (status === 429) return "Too many attempts. Please try again later.";
  if (status >= 500) return "The service is temporarily unavailable. Please try again.";
  return String(data?.error_description || data?.msg || data?.error || data?.message || "Please try again.").slice(0, 240);
}
export function createAweClient({
  url = AWE_SUPABASE_URL,
  publishableKey = AWE_SUPABASE_PUBLISHABLE_KEY,
  functionName = AWE_EDGE_FUNCTION,
  getStorage = () => window.sessionStorage,
  fetcher = (...args) => fetch(...args),
  now = () => Date.now(),
} = {}) {
  if (!/^https:\/\/[a-z0-9.-]+\.supabase\.co$/i.test(url))
    throw Error("Invalid Supabase project URL.");
  if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(publishableKey))
    throw Error("AWE Supabase publishable key is missing.");
  if (!/^[a-z0-9-]+$/.test(functionName)) throw Error("Invalid API name.");

  let inMemory = null;
  let inflightRefresh = null;
  const store = () => { try { return getStorage(); } catch { return null; } };
  function clear() {
    inMemory = null;
    try { store()?.removeItem(STORAGE_KEY); } catch {}
  }
  function session() {
    if (inMemory) return inMemory;
    try {
      const raw = store()?.getItem(STORAGE_KEY);
      if (!raw) return null;
      const value = JSON.parse(raw);
      if (typeof value?.access_token !== "string" ||
          typeof value?.refresh_token !== "string" ||
          !Number.isFinite(value?.expires_at)) return null;
      inMemory = value;
      return inMemory;
    } catch { return null; }
  }
  function save(data) {
    if (typeof data?.access_token !== "string" || !data.access_token ||
        typeof data?.refresh_token !== "string" || !data.refresh_token ||
        !Number.isFinite(data?.expires_in) || data.expires_in <= 0)
      fail("Sign-in confirmation did not return a valid session.");
    inMemory = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: now() + data.expires_in * 1000,
    };
    try { store()?.setItem(STORAGE_KEY, JSON.stringify(inMemory)); } catch {}
  }
  async function request(urlPath, payload, accessToken) {
    const headers = { "apikey": publishableKey, "Content-Type": "application/json" };
    if (accessToken) headers.Authorization = "Bearer " + accessToken;
    let response;
    try {
      response = await fetcher(url + urlPath, {
        method: payload === undefined ? "GET" : "POST",
        headers,
        body: payload === undefined ? undefined : JSON.stringify(payload),
        // Do not transmit cookies to cross-origin APIs. Auth uses scoped bearer JWTs.
        credentials: "omit",
      });
    } catch {
      fail("Couldn't reach the account service. Check your connection and try again.");
    }
    const isJson = (response.headers.get("content-type") || "").includes("application/json");
    const value = isJson ? await response.json().catch(() => null) : null;
    if (!response.ok) {
      const error = Error(messageFor(value, response.status));
      error.status = response.status;
      throw error;
    }
    if (!isJson) fail("The account service returned an unexpected response.");
    return value;
  }
  async function refresh() {
    const current = session();
    if (!current?.refresh_token) return null;
    if (!inflightRefresh) {
      inflightRefresh = (async () => {
        try {
          const result = await request("/auth/v1/token?grant_type=refresh_token",
            { refresh_token: current.refresh_token });
          save(result);
          return inMemory.access_token;
        } catch (error) {
          clear();
          throw error;
        } finally {
          inflightRefresh = null;
        }
      })();
    }
    return inflightRefresh;
  }
  async function accessToken() {
    const current = session();
    if (!current) return null;
    if (current.expires_at - now() > SESSION_SKEW_MS) return current.access_token;
    return refresh();
  }
  async function beginEmailSignIn(email) {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      fail("Enter a valid email address.");
    await request("/auth/v1/otp", { email: email.trim(), create_user: true });
    return { ok: true };
  }
  async function verifyEmailCode(email, token) {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      fail("Enter a valid email address.");
    if (typeof token !== "string" || !/^(?:\d{6}|\d{8})$/.test(token.trim()))
      fail("Enter the six- or eight-digit code from your email.");
    const result = await request("/auth/v1/verify",
      { email: email.trim(), token: token.trim(), type: "email" });
    if (!result?.user?.email_confirmed_at) fail("Verify your email before continuing.");
    save(result);
    return { ok: true };
  }
  async function logout() {
    const current = session();
    clear();
    if (current?.access_token) {
      // Best effort remote session revocation; local sign-out must always succeed.
      try { await request("/auth/v1/logout", {}, current.access_token); } catch {}
    }
    return { ok: true };
  }
  async function api(route, payload) {
    // Preserve the original application API shape while migrating to Supabase.
    if (route === "auth/start") return beginEmailSignIn(payload?.email);
    if (route === "auth/verify") return verifyEmailCode(payload?.email, payload?.token);
    if (route === "auth/logout") return logout();
    const previewPage = /^(?:orders|admin\/orders)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/preview\?page=(?:index|research|work|features|studio|journal|contact)\.html$/i.test(route);
    if ((!/^[a-z0-9][a-z0-9/_-]{0,180}$/i.test(route) && !previewPage) || route.includes("//"))
      fail("Invalid API route.");
    const token = await accessToken();
    if (!token && !PUBLIC_ROUTES.has(route)) {
      const error = Error("Sign in to continue.");
      error.status = 401;
      throw error;
    }
    if (payload instanceof FormData && route.endsWith("/upload"))
      await prepareImageUpload(payload);
    const uri = "/functions/v1/" + functionName + "/" + route;
    let response;
    try {
      response = await fetcher(url + uri, {
        method: payload === undefined ? "GET" : "POST",
        headers: {
          apikey: publishableKey,
          ...(token ? { Authorization: "Bearer " + token } : {}),
          ...(payload instanceof FormData ? {} : { "Content-Type": "application/json" }),
        },
        body: payload === undefined ? undefined :
          payload instanceof FormData ? payload : JSON.stringify(payload),
        credentials: "omit",
      });
    } catch {
      fail("Couldn't connect to the studio service. Check your network and try again.");
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json"))
      fail("Studio API is not configured correctly. Please contact the studio.");
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 401) clear();
      const error = Error(messageFor(data, response.status));
      error.status = response.status;
      throw error;
    }
    return data;
  }
  async function download(route) {
    // Do not grant arbitrary binary access. These routes are authenticated
    // and individually authorized again by the Supabase Edge server.
    const uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    const permitted = new RegExp("^(?:orders/" + uuid + "/export|admin/orders/" +
      uuid + "/(?:export|handoff-export)|assets/" + uuid + ")$", "i");
    if (!permitted.test(route)) fail("Invalid download route.");
    const token = await accessToken();
    if (!token) {
      const error = Error("Sign in to download your files.");
      error.status = 401;
      throw error;
    }
    const response = await fetcher(url + "/functions/v1/" + functionName + "/" + route, {
      method: "GET",
      headers: { apikey: publishableKey, Authorization: "Bearer " + token },
      credentials: "omit",
      cache: "no-store"
    });
    if (!response.ok) {
      if (response.status === 401) clear();
      let errorData;
      if ((response.headers.get("content-type") || "").includes("application/json"))
        errorData = await response.json().catch(() => null);
      const error = Error(messageFor(errorData, response.status));
      error.status = response.status;
      throw error;
    }
    const mime = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    const allowed = new Set(["application/zip", "image/jpeg", "image/png", "image/webp",
      "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
    if (!allowed.has(mime)) fail("The studio returned an unexpected file type.");
    const declared = Number(response.headers.get("content-length") || 0);
    const maxBytes = 8_000_000;
    if (declared > maxBytes) fail("The download is too large. Request a file transfer from the studio.");
    const blob = await response.blob();
    if (!blob.size || blob.size > maxBytes) fail("The download is empty or too large.");
    const matches = /^.*?filename="([a-zA-Z0-9._-]{1,120})"/i.exec(
      response.headers.get("content-disposition") || "");
    const extensions = {"application/zip":"zip","image/jpeg":"jpg","image/png":"png",
      "image/webp":"webp","application/pdf":"pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":"docx"};
    const basename = route.split("/").filter(Boolean).at(-1) === "export" ?
      route.split("/").at(-2) : route.split("/").at(-1);
    const filename = matches?.[1] || (basename + "." + extensions[mime]);
    return { blob, filename, mime };
  }
  return { api, download, beginEmailSignIn, verifyEmailCode, logout, session, clear, accessToken };
}
export const aweClient = createAweClient();

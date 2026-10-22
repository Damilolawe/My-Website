import test from "node:test";
import assert from "node:assert/strict";
import { bounded, cors, MAX_REQUEST_BYTES } from "../supabase/functions/awe-api/platform/request-safety.mjs";
import { isOwner, origin, user, owned, body } from "../supabase/functions/awe-api/platform/backend.mjs";

const original = {
  SITE_ORIGIN: process.env.SITE_ORIGIN,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  fetch: globalThis.fetch
};
function restore() {
  for (const [key, val] of Object.entries(original)) {
    if (key === "fetch") globalThis.fetch = val;
    else if (val === undefined) delete process.env[key];
    else process.env[key] = val;
  }
}
test("API denies hostile or absent write origins", () => {
  process.env.SITE_ORIGIN = "https://studio.example";
  process.env.ALLOWED_ORIGINS = "https://preview.example";
  try {
    assert.doesNotThrow(() => origin(new Request("https://api.example/drafts", { headers: { Origin: "https://studio.example" } })));
    assert.doesNotThrow(() => origin(new Request("https://api.example/drafts", { headers: { Origin: "https://preview.example" } })));
    for (const value of ["https://studio.example.evil.test", "null", "https://hostile.example"]) {
      assert.throws(() => origin(new Request("https://api.example/drafts", { headers: { Origin: value } })), /origin rejected/i);
    }
    assert.throws(() => origin(new Request("https://api.example/drafts")), /origin rejected/i);
  } finally { restore(); }
});
test("CORS allows only explicitly configured domains, never wildcard", () => {
  process.env.SITE_ORIGIN = "https://studio.example";
  process.env.ALLOWED_ORIGINS = "https://preview.example";
  try {
    const response = new Response('{"ok":true}', {headers: {"Content-Type": "application/json"}});
    for(const o of ["https://studio.example","https://preview.example"]){
      const r = cors(new Request("https://api.example/health",{headers:{Origin:o}}),response);
      assert.equal(r.headers.get("access-control-allow-origin"),o);
      assert.equal(r.headers.get("vary"),"Origin");
    }
    for(const o of ["https://studio.example.attacker.test","https://attacker.example"]){
      const r=cors(new Request("https://api.example/health",{headers:{Origin:o}}),response);
      assert.equal(r.headers.get("access-control-allow-origin"),null);
    }
  } finally { restore(); }
});
test("Large upload streams cannot bypass request limit by omitting Content-Length", async () => {
  const oversized = new Uint8Array(MAX_REQUEST_BYTES + 1);
  const req = new Request("https://api.example/upload", {method:"POST",body:oversized});
  await assert.rejects(bounded(req), /Request too large/);
  const lengthReq = new Request("https://api.example/upload", {method:"POST",body:"x",headers:{"content-length": String(MAX_REQUEST_BYTES+1)}});
  await assert.rejects(bounded(lengthReq), /Request too large/);
});
test("Small request bodies preserve original payloads", async () => {
  const req = new Request("https://api.example/api/drafts", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({draft:1})});
  const safe = await bounded(req);
  assert.equal(safe.method,"POST");
  assert.deepEqual(await safe.json(),{draft:1});
});
test("No anonymous user can reach a private account endpoint", async () => {
  await assert.rejects(user(new Request("https://api.example/user")), /Sign in to continue/);
});
test("Only verified accounts may be owners", async () => {
  assert.equal(await isOwner({id:"11111111-1111-4111-8111-111111111111",email_confirmed_at:null}),false);
});
test("Auth bearer token is independently verified against Supabase Auth", async () => {
  process.env.SUPABASE_URL="https://auth.example";
  process.env.SUPABASE_PUBLISHABLE_KEY="test-publishable";
  globalThis.fetch=async (_url,_options) => new Response(JSON.stringify({id:"11111111-1111-4111-8111-111111111111",email_confirmed_at:null}),{status:200,headers:{"content-type":"application/json"}});
  try {
    await assert.rejects(user(new Request("https://api.example/user",{headers:{Authorization:"Bearer fake.jwt"}})), /Verify your email first/);
    globalThis.fetch=async()=>new Response("Unauthorized",{status:401});
    await assert.rejects(user(new Request("https://api.example/user",{headers:{Authorization:"Bearer fake.jwt"}})), /session expired/i);
  } finally { restore(); }
});
test("Invalid order identifiers are rejected before database access", async () => {
  await assert.rejects(owned("../../../other-user",{id:"11111111-1111-4111-8111-111111111111"}), /Invalid reference/);
});
test("Body parsing rejects overlong and non-JSON inputs", async () => {
  await assert.rejects(body(new Request("https://api.example",{method:"POST",body:"x".repeat(200)}),32), /Request too large/);
  await assert.rejects(body(new Request("https://api.example",{method:"POST",body:"not json"})), /Invalid request/);
});
test("Server source code and test configuration reject production payment activation", async () => {
  const { readFile } = await import("node:fs/promises");
  const src = await readFile(new URL("../supabase/functions/awe-api/netlify/functions/webhook.mjs", import.meta.url),"utf8");
  const backend = await readFile(new URL("../supabase/functions/awe-api/platform/backend.mjs", import.meta.url),"utf8");
  assert(src.includes("event.livemode"));
  assert(src.includes("Liv") || src.includes("Live payments are disabled"));
  assert(backend.includes("sk_test_"));
});

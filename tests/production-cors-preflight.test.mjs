import test from "node:test";
import assert from "node:assert/strict";
import edge from "../supabase/functions/awe-api/platform/edge-router.mjs";
import { allowedOrigins } from "../supabase/functions/awe-api/platform/backend.mjs";

const API="https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api";
const allowed=[
  "https://aweconcepts.com",
  "https://www.aweconcepts.com",
  "https://awe-digital.web.app"
];
const preflight=(route,origin)=>new Request(API+"/"+route,{
  method:"OPTIONS",
  headers:{
    Origin:origin,
    "Access-Control-Request-Method":"GET",
    "Access-Control-Request-Headers":"apikey,authorization,x-client-info,content-type"
  }
});
test("Single origin policy covers both Firebase hostnames and production domain",()=>{
  for(const entry of allowed)assert(allowedOrigins().has(entry),entry);
  assert(!allowedOrigins().has("https://evil.example"));
  assert(!allowedOrigins().has("null"));
});
test("Preflight succeeds on production for /me and /catalog before any login",async()=>{
  for(const origin of allowed)for(const route of ["me","catalog","admin/overview"]) {
    const res=await edge(preflight(route,origin));
    assert.equal(res.status,204,origin+"/"+route);
    assert.equal(res.headers.get("access-control-allow-origin"),origin);
    assert.match(res.headers.get("access-control-allow-headers"),/authorization/);
    assert.match(res.headers.get("access-control-allow-headers"),/apikey/);
    assert.match(res.headers.get("access-control-allow-methods"),/OPTIONS/);
    assert.match(res.headers.get("vary"),/Origin/);
  }
});
test("Disallowed, opaque and lookalike origins cannot pass preflight",async()=>{
  for(const origin of ["https://attacker.example","null","https://aweconcepts.com.evil.example","http://aweconcepts.com"]) {
    const res=await edge(preflight("me",origin));
    assert.equal(res.status,403,origin);
    assert.equal(res.headers.get("access-control-allow-origin"),null);
  }
});
test("Protected routes still require a user session after successful preflight",async()=>{
  const r=await edge(new Request(API+"/me",{headers:{Origin:allowed[0]}}));
  assert.equal(r.status,401);
  assert.equal(r.headers.get("access-control-allow-origin"),allowed[0]);
  const owner=await edge(new Request(API+"/admin/overview",{headers:{Origin:allowed[0]}}));
  assert.equal(owner.status,401);
});

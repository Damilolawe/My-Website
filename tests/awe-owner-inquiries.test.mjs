import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const repoPath=(p)=>new URL("../"+p,import.meta.url);
test("owner inbox API requires verified owner identity before querying private leads",async()=>{
  const src=await readFile(repoPath("supabase/functions/awe-api/platform/edge-router.mjs"),"utf8");
  const guarded=src.slice(src.indexOf("if(p[0]==='admin'&&p[1]==='inquiries')"),src.indexOf("const response=await legacyApi"));
  assert(guarded.includes("await isOwner(u)"));
  assert(guarded.indexOf("await isOwner(u)")<guarded.indexOf("rows('awe_inquiries'"));
  assert(guarded.includes("req.method==='GET'"));
  assert(guarded.includes("req.method==='POST'"));
  assert(guarded.includes("select=id,created_at,name,email,project,message,status"));
  assert(guarded.includes("limit=100"));
});
test("changing the status of a lead requires UUID and valid enumeration",async()=>{
  const src=await readFile(repoPath("supabase/functions/awe-api/platform/edge-router.mjs"),"utf8");
  const guarded=src.slice(src.indexOf("if(p[0]==='admin'&&p[1]==='inquiries')"),src.indexOf("const response=await legacyApi"));
  assert(guarded.includes("^[a-f0-9]{8}"));
  assert(guarded.includes("'new','contacted','archived'"));
  assert(guarded.includes("body(req,2048)"));
  assert(guarded.includes("inquiry_status_updated"));
  assert(guarded.includes("await patch('awe_inquiries'"));
});
test("owner dashboard uses authenticated API and escapes all user text",async()=>{
  const src=await readFile(repoPath("app/admin.mjs"),"utf8");
  assert(src.includes('api("admin/inquiries")'));
  assert(src.includes("esc(q.message)"));
  assert(src.includes("esc(q.email)"));
  assert(src.includes("esc(q.name)"));
  assert(src.includes("esc(q.project)"));
  assert(src.includes('api(`admin/inquiries/${control.dataset.inquiry}`'));
  assert(src.includes("frame.srcdoc = html"));
  assert(src.includes('sandbox=""'));
  assert(!src.includes('src="/api/admin/orders/'));
});
test("Stripe live gate and owner authorization remain enforced in Edge snapshot",async()=>{
  const backend=await readFile(repoPath("supabase/functions/awe-api/platform/backend.mjs"),"utf8");
  const legacy=await readFile(repoPath("supabase/functions/awe-api/netlify/functions/api.mjs"),"utf8");
  assert(backend.includes("await rows(\"awe_owner\""));
  assert(backend.includes("return false"));
  assert(legacy.includes("const admin = await isOwner(u)"));
  assert(legacy.includes("!liveCheckoutConfigured()"));
  assert(backend.includes("STRIPE_LIVE_SECRET_KEY"));
  assert(backend.includes("sk_test_"));
});

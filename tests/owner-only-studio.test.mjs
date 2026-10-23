import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = p => readFile(new URL("../"+p,import.meta.url),"utf8");

test("Dedicated studio OTP always uses the owner's mailbox",async()=>{
  const source=await read("app/admin.mjs");
  assert(source.includes('const OWNER_EMAIL = "contact@aweconcepts.com"'));
  assert(source.includes('api("auth/start", { email: OWNER_EMAIL })'));
  assert(source.includes('api("auth/verify", { email: OWNER_EMAIL, token:'));
  assert(!source.includes('authForm(app, load)'));
  assert(source.includes('form.elements.token.disabled = false'));
  assert(source.includes('aweClient.session()'));
  assert(source.includes('!me.admin'));
  assert(source.includes('me.email?.toLowerCase() !== OWNER_EMAIL'));
  assert(source.includes('id="owner-switch"'));
  assert(source.includes('id="studio-retry"'));
});
test("Edge owner check requires both exact verified identity and table grant",async()=>{
  const source=await read("supabase/functions/awe-api/platform/backend.mjs");
  assert(source.includes('STUDIO_OWNER_USER_ID = "220ddd21-710f-4dea-bc24-e34c8ba9cef8"'));
  assert(source.includes('STUDIO_OWNER_EMAIL = "contact@aweconcepts.com"'));
  assert(source.includes("u.id !== STUDIO_OWNER_USER_ID"));
  assert(source.includes("u.email?.trim().toLowerCase() !== STUDIO_OWNER_EMAIL"));
  assert(source.includes('!u?.email_confirmed_at'));
  assert(source.includes('rows("awe_owner"'));
  assert(!source.includes("if (env().OWNER_USER_ID) return"));
  const router=await read("supabase/functions/awe-api/platform/edge-router.mjs");
  assert(router.includes("if(!(await isOwner(u)))fail('Owner access required.',403)"));
});
test("Paid orders cannot be published before owner's explicit approval",async()=>{
  const schema=await read("supabase/migrations/20261022024259_awe_platform.sql");
  const payment=schema.slice(schema.indexOf("create function public.awe_payment("),schema.indexOf("create function public.awe_claim()"));
  const publish=schema.slice(schema.indexOf("create function public.awe_publish("),schema.indexOf("create function public.awe_reject("));
  assert(payment.includes("status='payment_verified'"));
  assert(payment.includes("insert into awe_jobs(order_id,kind) values(p_order,'generate')"));
  assert(!payment.includes("public_version=p_version"));
  assert(!payment.includes("insert into awe_approvals"));
  assert(publish.includes("not exists(select 1 from awe_owner where user_id=p_actor)"));
  assert(publish.includes("o.payment<>'paid'"));
  assert(publish.includes("o.status not in ('awaiting_review','revisions_required')"));
  assert(publish.includes("insert into awe_approvals(order_id,version_id,actor)"));
  const source=await read("supabase/functions/awe-api/netlify/functions/site.mjs");
  assert(source.includes("public_version=not.is.null"));
  assert(source.includes('"awe_approvals"'));
  const api=await read("supabase/functions/awe-api/netlify/functions/api.mjs");
  assert(api.includes('if (b.confirm !== o.id)'));
  assert(api.includes('await rpc("awe_publish"'));
});

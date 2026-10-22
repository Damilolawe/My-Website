import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=(path)=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("Review screen provides free saved design action even with checkout disabled",async()=>{
  const src=await read("app/order.mjs");
  assert(src.includes('id="save-draft"'));
  assert(src.includes('$("#save-draft").onclick = saveDraft'));
  assert(src.includes("!catalog.ordersEnabled || !p"),"Paid checkout must stay gated independently");
  assert(src.includes("Selected photo and document files remain on your device"),"Must disclose files are not uploaded for saved designs");
});
test("Saving designs requires sign-in and calls the protected draft API, never Stripe",async()=>{
  const src=await read("app/order.mjs");
  const segment=src.slice(src.indexOf("async function saveDraft()"),src.indexOf("async function restoreDraft()"));
  assert(segment.includes('await api("me")'));
  assert(segment.includes("authForm($(\"#sign-in\"), saveDraft)"));
  assert(segment.includes('api("drafts",{input})'));
  assert(segment.includes('api(`drafts/${draftId}`,{input,version:draftVersion})'));
  assert(!segment.includes("checkout.stripe.com"));
  assert(!segment.includes("location.assign"));
});
test("Only the owning account can resume a saved draft",async()=>{
  const client=await read("app/order.mjs");
  const server=await read("supabase/functions/awe-api/platform/edge-router.mjs");
  assert(client.includes('await api(`drafts/${candidate}`)'));
  assert(client.includes("input=normalize(saved.input)"));
  assert(client.includes("authForm(app,restoreDraft)"));
  assert(client.includes("isUuid(candidate)"));
  assert(server.includes("const o=await owned(p[1],u)"));
  assert(server.includes("b.version!==o.version"));
  assert(server.includes("o.payment!=='unpaid'"));
});
test("Customer account dashboard offers a resumable link only for saved designs",async()=>{
  const account=await read("app/account.mjs");
  assert(account.includes("o.package?.name === \"Draft project\""));
  assert(account.includes("/order.html?draft="));
  assert(account.includes("encodeURIComponent(o.id)"));
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read = path => readFile(new URL("../"+path,import.meta.url),"utf8");

test("Homepage and order wizard disclose Starter 1, Signature 3, Premium unlimited revisions", async()=>{
 const [home,wizard,contact]=await Promise.all([read("index.html"),read("app/order.mjs"),read("contact.html")]);
 for(const wording of ["1 included revision","3 included revisions","Unlimited revisions"]){
   assert(home.includes(wording),"Homepage missing "+wording);
   assert(wizard.includes(wording),"Order wizard missing "+wording);
 }
 assert.match(contact,/Starter.*1 revision/);
 assert.match(contact,/Signature.*3 revisions/);
 assert.match(contact,/Premium.*unlimited revisions/i);
});

test("Customer account tracks remaining revisions and hides the exhausted request form",async()=>{
 const [account,model]=await Promise.all([read("app/account.mjs"),read("supabase/functions/awe-api/shared/model.mjs")]);
 assert(account.includes("revisions_remaining"));
 assert(account.includes("o.revisions_remaining !== 0"));
 assert(account.includes("Unlimited revisions included"));
 for(const key of ["revision_limit:","revisions_used:","revisions_remaining:"]){
   assert(model.includes(key),"Missing revision usage field "+key);
 }
});

test("Server-side revision gates enforce tier counts and owner-only released drafts",async()=>{
 const [sql,router,api]=await Promise.all([
  read("supabase/migrations/20261028230000_owner_first_review.sql"),
  read("supabase/functions/awe-api/platform/edge-router.mjs"),
  read("supabase/functions/awe-api/netlify/functions/api.mjs")
 ]);
 assert(sql.includes("when 'signature' then 3"));
 assert(sql.includes("when 'premium' then null"));
 assert(sql.includes("else 1 end"));
 assert(sql.includes("if allowed is not null and used>=allowed then raise exception"));
 assert(sql.includes("kind='draft_saved' and actor=p_actor"));
 assert(router.includes("The studio has not released this version for customer review."));
 assert(api.includes('rpc("awe_owner_release"'));
 assert(api.includes('rpc("awe_customer_revision"'));
 assert(api.includes('rpc("awe_customer_approve"'));
});

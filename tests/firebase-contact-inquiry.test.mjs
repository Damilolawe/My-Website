import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateInquiry} from "../supabase/functions/awe-inquiry/validate.mjs";

const example={name:"Alex Johnson",email:"Alex@Example.test",project:"Student / résumé portfolio",message:"I need a portfolio for my graduation work."};

test("Inquiry validation accepts normal website consultation data and canonicalizes email",()=>{
  const v=validateInquiry(example);
  assert.equal(v.name,"Alex Johnson");
  assert.equal(v.email,"alex@example.test");
  assert.deepEqual(Object.keys(v).sort(),["email","message","name","project"]);
});
test("Inquiry validation rejects invalid and unexpectedly large submissions",()=>{
  const candidates=[
    {...example,name:""}, {...example,name:"x".repeat(101)},
    {...example,email:"x@"},{...example,email:"x".repeat(260)+"@example.test"},
    {...example,project:"<script>alert(1)</script>"},
    {...example,message:"too short"},{...example,message:"x".repeat(3001)},
    null,[],{...example,message:{}}
  ];
  for(const input of candidates) assert.throws(()=>validateInquiry(input),undefined,JSON.stringify(input)?.slice(0,50));
});
test("Firebase inquiries require a real Edge storage acknowledgment, not a static POST",async()=>{
  const src=await readFile(new URL("../contact.js",import.meta.url),"utf8");
  const html=await readFile(new URL("../contact.html",import.meta.url),"utf8");
  assert(src.includes("/functions/v1/awe-inquiry"));
  assert(src.includes('data?.ok !== true'));
  assert(src.includes('typeof data?.reference !== "string"'));
  assert(!src.includes("fetch('/',"));
  assert(!html.includes("data-netlify"));
  assert(html.includes('type="module"'));
});
test("Inquiry API requires an exact Firebase origin and does not allow wildcard CORS",async()=>{
  const src=await readFile(new URL("../supabase/functions/awe-inquiry/index.ts",import.meta.url),"utf8");
  assert(src.includes('https://awe-digital.web.app'));
  assert(src.includes("origin !== SITE_ORIGIN"));
  assert(src.includes("AWE_INQUIRY_RATE_SALT"));
  assert(src.includes("rateFingerprint(req"));
  assert(!src.includes('"Access-Control-Allow-Origin":"*"'));
  assert(src.includes("MAX_BODY_BYTES = 12_000"));
});
test("Inquiries remain private and service-only in database",async()=>{
  const src=await readFile(new URL("../supabase/sql/awe_inquiry_intake.sql",import.meta.url),"utf8");
  assert(src.includes("enable row level security"));
  assert(src.includes("from public, anon, authenticated"));
  assert(src.includes("to service_role"));
  assert(src.includes("security invoker"));
  assert(src.includes("pg_advisory_xact_lock"));
  assert(src.includes("rate_limited"));
  assert(!src.includes("to authenticated\nusing (true)"));
});

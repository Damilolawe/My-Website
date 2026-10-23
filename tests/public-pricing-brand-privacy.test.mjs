import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read = path => readFile(new URL("../"+path, import.meta.url), "utf8");
test("Public inquiry rates do not activate checkout",async()=>{
 const home=await read("index.html"), order=await read("order.html"), contact=await read("contact.html");
 for(const price of ["$75","$150","$250+"]) {
  assert(home.includes(price),"Homepage missing "+price);
  assert(contact.includes(price),"Contact page missing "+price);
 }
 assert(home.includes('id="pricing"') && home.includes('href="#pricing"'));
 assert(home.includes('href="/contact.html"'));
 assert(order.includes("Online checkout remains closed"));
 assert((await read("app/order.mjs")).includes('!catalog.ordersEnabled || !p'));
});
test("Public content uses studio identity instead of owner biography",async()=>{
 for(const path of ["index.html","order.html","account.html","admin.html","contact.html","app/account.mjs","platform/production.mjs","supabase/functions/awe-api/platform/production.mjs"]) {
  const source=await read(path);
  assert.doesNotMatch(source,/Damilola Awe|\bDami\b|github\.com\/Damilolawe|software engineering graduate student/i,path);
 }
 assert((await read("index.html")).includes("Awe Concepts creates"));
 assert((await read("config.js")).includes("contact@aweconcepts.com"));
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read = path => readFile(new URL("../"+path, import.meta.url), "utf8");
test("Public inquiry rates do not activate checkout",async()=>{
 const home=await read("index.html"), order=await read("order.html"), contact=await read("contact.html");
 for(const price of ["$75","$150"]) {
  assert(home.includes(price),"Homepage missing "+price);
  assert(contact.includes(price),"Contact page missing "+price);
 }
 assert(home.includes('id="pricing"') && home.includes('href="#pricing"'));
 assert(home.includes('class="pricing-price pricing-custom">Custom Quote</p>'),"Premium custom quote not shown");
 assert(contact.includes("Premium / AWE Custom projects are quoted individually"));
 assert(!home.includes("$250+")&&!contact.includes("$250+"),"Old premium starting price still advertised");
 assert(home.includes('href="/contact.html"'));
 assert(order.includes("unconfigured tiers are inquiry-only"));
 assert(!order.includes("Online checkout remains closed"));
 const checkout=await read("app/order.mjs");
 assert(checkout.includes("const checkoutAvailable = Boolean(catalog.ordersEnabled && p && packageAllowsTemplate(p, input.template))"),"Checkout requires enabled orders, a configured package and an eligible template");
 assert(checkout.includes('$("#next").disabled = !checkoutAvailable || !consentBox.checked'),"Agreement must be accepted before checkout can continue");
});
test("Public content uses studio identity instead of owner biography",async()=>{
 for(const path of ["index.html","order.html","account.html","admin.html","contact.html","app/account.mjs","platform/production.mjs","supabase/functions/awe-api/platform/production.mjs"]) {
  const source=await read(path);
  assert.doesNotMatch(source,/Damilola Awe|\bDami\b|github\.com\/Damilolawe|software engineering graduate student/i,path);
 }
 assert((await read("index.html")).includes("Awe Concepts creates"));
 assert((await read("config.js")).includes("contact@aweconcepts.com"));
});
test("privacy disclosure matches current inquiry and account transport",async()=>{
 const privacy=await read("privacy.html");
 const client=await read("app/service-client.mjs");
 const guide=await read("docs/FIREBASE_SETUP.md");
 assert(client.includes("window.sessionStorage"));
 assert(client.includes('credentials: "omit"'));
 assert(privacy.includes("homepage brief and public contact form"));
 assert(privacy.includes("access token and refresh token"));
 assert(privacy.includes("session storage"));
 assert(!privacy.includes("secure session cookie supports sign-in"));
 assert(guide.includes("awe-digital"));
 assert(!guide.includes("Create a project"));
});

test("Required checkout agreement and handoff authorization remain connected",async()=>{
 const checkout=await read("app/order.mjs");
 const server=await read("supabase/functions/awe-api/platform/work-handoff.mjs");
 const agreement=checkout.match(/<label class="checkout-consent-label"><input type="checkbox" id="consent" required[\s\S]*?<\/label>/)?.[0] || "";
 assert.ok(agreement,"The required purchase agreement must remain present");
 assert.match(agreement,/href="\/privacy\.html"/,"Checkout must link to the privacy policy");
 assert.doesNotMatch(checkout,/id="ai-consent"|\$\("#ai-consent"\)/,"No dangling optional checkbox references");
 assert.equal(checkout.split('aiConsent: $("#consent")?.checked === true').length-1,2,
   "Fresh and resumed checkouts must use the required agreement");
 assert.match(server,/aiProcessingConsent\?\.granted !== true/,"Backend must continue checking recorded authorization");
});

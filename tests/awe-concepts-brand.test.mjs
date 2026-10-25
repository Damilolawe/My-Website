import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = path => readFile(new URL("../" + path, import.meta.url), "utf8");
test("Awe Concepts appears across public pages without old studio name", async () => {
  for (const path of ["index.html","account.html","admin.html","order.html","contact.html","privacy.html","why-awe.html","404.html","inquiry-received.html"]) {
    const content = await source(path);
    assert.match(content, /AWE CONCEPTS/i, path);
    assert.doesNotMatch(content, /AWE\s*\/\s*DIGITAL/i, path);
  }
});
test("Public contact email is correct and does not expose private SMTP material", async () => {
  const config = await source("config.js");
  assert.match(config, /contact@aweconcepts\.com/);
  assert.doesNotMatch(config, /STRIPE_SECRET_KEY|SMTP_PASSWORD|SUPABASE_SERVICE_ROLE_KEY/);
  const privacy = await source("privacy.html");
  assert.match(privacy, /mailto:contact@aweconcepts\.com/);
});
test("New domain and legacy origin are both supported by versioned API source", async () => {
  const inquiry = await source("supabase/functions/awe-inquiry/index.ts");
  assert(inquiry.includes("SITE_ORIGINS.has(origin)"));
  assert(inquiry.includes("https://aweconcepts.com"));
  assert(inquiry.includes("https://www.aweconcepts.com"));
  assert(inquiry.includes("https://awe-digital.web.app"));
  assert(inquiry.includes('"Access-Control-Allow-Origin":requestOrigin'));
  const api = await source("supabase/functions/awe-api/platform/edge-router.mjs");
  const auth = await source("supabase/functions/awe-api/platform/backend.mjs");
  assert(api.includes("originAllowed(req)"),"API CORS must use shared server origin policy");
  assert(auth.includes("https://aweconcepts.com"));
  assert(auth.includes("https://awe-digital.web.app"));
  assert(auth.includes("export function allowedOrigins()"));
});
test("Node package metadata and server delivery messages are branded",async()=>{
  const pkg = JSON.parse(await source("package.json"));
  const lock = JSON.parse(await source("package-lock.json"));
  assert.equal(pkg.name,"awe-concepts");
  assert.equal(lock.name,"awe-concepts");
  assert.equal(lock.packages[""].name,"awe-concepts");
  const production=await source("supabase/functions/awe-api/platform/production.mjs");
  assert(production.includes("Your AWE CONCEPTS website is ready"));
});

test("AWE Express remains the offer under Awe Concepts branding", async () => {
  const home = await source("index.html");
  const order = await source("order.html");
  const account = await source("account.html");
  assert.match(home, /AWE Express/);
  assert.match(order, /AWE Express/);
  assert.match(account, /AWE Express/);
  assert.doesNotMatch(home + order + account, /Awe Concepts Express/i);
  for (const [page, logo, label] of [
    [order, "awe-express-dark.svg", "AWE Express"],
    [account, "awe-concepts-dark.svg", "Awe Concepts"],
    [await source("admin.html"), "awe-concepts-dark.svg", "Awe Concepts"],
  ]) {
    assert.match(page, /class="wordmark"[^>]*><img[^>]*src="\/assets\/brand\//);
    assert(page.includes('src="/assets/brand/' + logo + '"'));
    assert(page.includes('alt="' + label + '"'));
    assert.match(await source("assets/brand/"+logo), /fill="#F1EFE8"/i, "Dark headers need readable light lettering");
    assert(!page.includes('AWE <i>/</i> DIGITAL'));
  }
  const mark = await source("assets/brand/aw-symbol.svg");
  const favicon = await source("favicon.svg");
  assert.match(mark, /<path[^>]*fill="#D1FA57"/);
  assert.match(favicon, /Awe Concepts/);
  assert.match(favicon, /#D1FA57/);
});

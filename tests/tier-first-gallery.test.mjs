import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates } from "../shared/model.mjs";
import { tiers, minimumTier, tierLevel, packageTier, templateFitsTier, packageAllowsTemplate } from "../shared/tiers.mjs";

test("all 40 available design directions have a defined minimum access tier", () => {
  assert.equal(templates.length, 40);
  assert.deepEqual(tiers.map(t => t.id), ["starter","signature","premium"]);
  const ids = templates.map(t => t.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const {id} of templates) {
    assert(minimumTier(id), "Unassigned template: " + id);
    assert(tierLevel(minimumTier(id)) >= 0);
  }
  assert(templates.some(t => minimumTier(t.id) === "starter"));
  assert(templates.some(t => minimumTier(t.id) === "signature"));
  assert.equal(templates.filter(t => minimumTier(t.id) === "starter").length,20);
  assert.equal(templates.filter(t => minimumTier(t.id) === "signature").length,20);
});

test("higher tiers include lower-tier templates and reject unaffordable choices", () => {
  for (const {id} of templates) {
    const base = tierLevel(minimumTier(id));
    for (const tier of tiers) assert.equal(templateFitsTier(id, tier.id), tierLevel(tier.id) >= base);
  }
  assert.equal(templateFitsTier("arcade", "starter"), false);
  assert.equal(templateFitsTier("arcade", "signature"), true);
  assert.equal(templateFitsTier("arcade", "premium"), true);
  assert.equal(templateFitsTier("unknown", "premium"), false);
});

test("package tier comes from explicit metadata or existing USD price; QA checkout is scoped", () => {
  assert.equal(packageTier({tier:"premium",amount:7500,currency:"usd"}), "premium");
  assert.equal(packageTier({amount:7500,currency:"usd"}), "starter");
  assert.equal(packageTier({amount:15000,currency:"usd"}), "signature");
  assert.equal(packageTier({amount:25000,currency:"usd"}), "premium");
  assert.equal(packageTier({amount:15000,currency:"eur"}), null);
  assert.equal(packageAllowsTemplate({tier:"starter"},"arcade"), false);
  assert.equal(packageAllowsTemplate({tier:"premium"},"arcade"), true);
  assert.equal(packageAllowsTemplate({testOnly:true,amount:100,currency:"usd"},"arcade"), true);
});

test("public experience starts with tiers and purpose becomes a gallery filter", async () => {
  const code = await readFile(new URL("../app/order.mjs", import.meta.url), "utf8");
  assert(code.includes('"Choose your tier"'));
  assert(code.includes('"Explore templates"'));
  assert(code.includes('data-tier='));
  assert(code.includes('data-purpose='));
  assert(code.includes('data-switch-tier='));
  assert(code.includes('purposeFilter = "All"'));
  assert(code.includes('templateFitsTier(t.id, selectedTier)'));
  assert(code.includes('const p = selectedPackage()'));
  assert(code.includes('What will you use your website for?'));
  assert(!code.includes('data-type='));
  const css = await readFile(new URL("../app/app.css", import.meta.url), "utf8");
  assert(css.includes('.tier-choice'));
  assert(css.includes('var(--acid)'));
});

test("both production API entry points enforce tier policy for orders and draft preparation", async () => {
  for(const path of [
    "../netlify/functions/api.mjs",
    "../supabase/functions/awe-api/netlify/functions/api.mjs",
    "../supabase/functions/awe-api/platform/edge-router.mjs",
  ]) {
    const code = await readFile(new URL(path, import.meta.url),"utf8");
    assert(code.includes("packageAllowsTemplate"),path);
    assert(code.includes(path.includes("edge-router") ? "packageAllowsTemplate(v,data.template)" : "packageAllowsTemplate(p, data.template)"), "Missing actual order guard: " + path);
    if (!path.includes("edge-router")) assert(code.includes("packageAllowsTemplate(p, o.input?.template)"), "Final Stripe checkout must recheck eligibility: " + path);
  }
  const a = await readFile(new URL("../shared/tiers.mjs", import.meta.url),"utf8");
  const b = await readFile(new URL("../supabase/functions/awe-api/shared/tiers.mjs", import.meta.url),"utf8");
  assert.equal(a,b);
});

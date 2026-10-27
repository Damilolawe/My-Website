import test from "node:test";
import assert from "node:assert/strict";
import {money} from "../app/common.mjs";
import {tiers} from "../shared/tiers.mjs";
import {readFile} from "node:fs/promises";

const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("whole-dollar package amounts omit .00 without concealing nonzero cents",()=>{
 assert.equal(money({amount:7500,currency:"usd"}),"$75");
 assert.equal(money({amount:15000,currency:"usd"}),"$150");
 assert.equal(money({amount:7525,currency:"usd"}),"$75.25");
 assert.equal(money({amount:0,currency:"usd"}),"Pricing to be announced");
});

test("Premium offers custom quoting instead of advertising a fixed or starting price",async()=>{
 const [home,contact,order,account,front,server,css,packageCss]=await Promise.all([
  read("index.html"),read("contact.html"),read("app/order.mjs"),read("app/account.mjs"),
  read("shared/tiers.mjs"),read("supabase/functions/awe-api/shared/tiers.mjs"),
  read("styles.css"),read("app/app.css")
 ]);
 assert.equal(front,server,"Browser and publisher tier metadata differ");
 assert.equal(tiers.find(t=>t.id==="premium").inquiry,"Custom Quote");
 assert.deepEqual(tiers.slice(0,2).map(t=>t.inquiry),["$75","$150"]);
 assert(home.includes('<p class="pricing-price pricing-custom">Custom Quote</p>'));
 assert(!home.includes("$250+")&&!contact.includes("$250+"));
 assert(home.includes('href="/account.html?custom=1"'));
 assert(order.includes('t.id === "premium" ? "Custom Quote" : packageForTier ? money(packageForTier) : t.inquiry'),
  "A backend package must not turn Premium into a publicly priced product");
 assert(order.includes('if (tier === "premium") { window.location.assign(AWE_CUSTOM_URL); return; }'));
 assert(order.includes('AWE_CUSTOM_URL="/account.html?custom=1"'));
 assert(account.includes('name="budget" maxlength="300"'),"Optional custom-project budget missing");
 assert(account.includes('name="idea" maxlength="5000" required'),"Custom-project requirements missing");
 assert(css.includes(".pricing-price.pricing-custom"));
 assert(packageCss.includes('.tier-choice[data-tier="premium"] .tier-choice-price'));
});

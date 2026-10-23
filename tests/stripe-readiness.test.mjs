import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const source=(p)=>readFile(new URL("../"+p,import.meta.url),"utf8");

test("Payment readiness is owner-only and never returns payment secrets",async()=>{
 const api=await source("supabase/functions/awe-api/platform/edge-router.mjs");
 const start=api.indexOf("if(path==='admin/checkout-readiness'");
 const end=api.indexOf("if(p[0]==='admin'&&p[1]==='payments'",start);
 assert(start>0 && end>start,"Status endpoint must precede admin payments endpoint");
 const block=api.slice(start,end);
 assert(block.indexOf("await isOwner(u)")<block.indexOf("rows('awe_packages')"));
 assert(block.includes("serverTestKeyPresent"));
 assert(block.includes("webhookSigningSecretPresent"));
 assert(block.includes("liveCheckoutConfigured()"));
 assert(block.includes("liveSecretKeyPresent"));
 assert(block.includes("liveWebhookSigningSecretPresent"));
 assert(block.includes("externalWebhookVerified:false"));
 assert(block.includes("livePaymentsAllowed:liveCheckoutConfigured() && enabledPackages.length>0"));
 assert(!block.includes("STRIPE_SECRET_KEY:"));
 assert(!block.includes("STRIPE_WEBHOOK_SECRET:"));
 assert(!block.includes("return json(settings)"));
});
test("Dashboard labels live flags as setup indicators, not independently verified checkout",async()=>{
 const app=await source("app/admin.mjs");
 assert(app.includes('api("admin/checkout-readiness")'));
 assert(app.includes("Live checkout requires production credentials"));
 assert(app.includes("Not yet independently verified"));
 assert(app.includes("verify Stripe delivery"));
 assert(!app.includes('checkoutReadiness?.stripeSecret'));
});
test("Webhook requires independent verified signatures for both payment environments",async()=>{
 const hook=await source("supabase/functions/awe-api/netlify/functions/webhook.mjs");
 assert(hook.includes("constructEventAsync("));
 assert(hook.includes('req.headers.get("stripe-signature")'));
 assert(hook.includes("verified.livemode"));
 assert(hook.includes("STRIPE_LIVE_WEBHOOK_SECRET"));
 assert(hook.includes("STRIPE_WEBHOOK_SECRET"));
 assert(hook.includes("Payment mode mismatch"));
 assert(hook.includes("awe_payment"));
});
test("Checkout never uses browser-supplied price and validates selected environment credentials",async()=>{
 const legacy=await source("supabase/functions/awe-api/netlify/functions/api.mjs");
 const backend=await source("supabase/functions/awe-api/platform/backend.mjs");
 assert(backend.includes("sk_test_"));
 assert(backend.includes("sk_live_"));
 assert(backend.includes("LIVE_CHECKOUT_ENABLED"));
 assert(legacy.includes("unit_amount: p.amount"));
 assert(legacy.includes("const p = o.package_snapshot"));
 assert(legacy.includes("!liveCheckoutConfigured()"));
 const checkout = legacy.slice(legacy.indexOf('if (action === "checkout")'),legacy.indexOf('if (action === "revision")'));
 assert(checkout.includes("!liveCheckoutConfigured() && !qaAllowed"),"Closed live ordering permits only the narrowly assigned sandbox test");
 assert(checkout.includes('sandboxOrderAllowed(o.package_snapshot, u, o.id, env())'));
 assert(checkout.includes('o.package_snapshot?.testOnly === true && !qaAllowed'));
 assert(checkout.indexOf('const stripeClient = stripe(qaAllowed ? "test" : "live");') < checkout.indexOf('checkout_at: new Date()'),"Stripe config must be checked before the project is locked");
 assert(checkout.includes('stripeClient.checkout.sessions.create('));
});

test("Owner checkout readiness queries the actual payment event key",async()=>{
 const api=await source("supabase/functions/awe-api/platform/edge-router.mjs");
 const schema=await source("supabase/migrations/20261022024259_awe_platform.sql");
 const start=api.indexOf("if(path==='admin/checkout-readiness'");
 const end=api.indexOf("if(p[0]==='admin'&&p[1]==='payments'",start);
 assert(start>=0&&end>start);
 const readiness=api.slice(start,end);
 assert(readiness.includes("rows('awe_payments','select=event_id&limit=1')"));
 assert(!readiness.includes("rows('awe_payments','select=id&limit=1')"));
 assert(schema.includes("create table public.awe_payments("));
 assert(schema.includes("event_id text primary key"));
 assert(readiness.includes("recordedPaymentExists:priorPayments.length>0"));
});


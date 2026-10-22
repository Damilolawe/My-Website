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
 assert(block.includes("ORDERS_ENABLED"));
 assert(block.includes("externalWebhookVerified:false"));
 assert(block.includes("livePaymentsAllowed:false"));
 assert(!block.includes("STRIPE_SECRET_KEY:"));
 assert(!block.includes("STRIPE_WEBHOOK_SECRET:"));
 assert(!block.includes("return json(settings)"));
});
test("Dashboard labels sandbox flags as setup indicators, not verified checkout",async()=>{
 const app=await source("app/admin.mjs");
 assert(app.includes('api("admin/checkout-readiness")'));
 assert(app.includes("a real Stripe sandbox transaction and signed webhook event must succeed"));
 assert(app.includes("Not yet independently verified"));
 assert(app.includes("Live payments remain disabled"));
 assert(!app.includes('checkoutReadiness?.stripeSecret'));
});
test("Webhook validates signatures and refuses live charge events",async()=>{
 const hook=await source("supabase/functions/awe-api/netlify/functions/webhook.mjs");
 assert(hook.includes("constructEventAsync("));
 assert(hook.includes('req.headers.get("stripe-signature")'));
 assert(hook.includes("event.livemode"));
 assert(hook.includes("Live payments are disabled"));
 assert(hook.includes("awe_payment"));
});
test("Checkout never uses browser-supplied price and requires test credentials",async()=>{
 const legacy=await source("supabase/functions/awe-api/netlify/functions/api.mjs");
 const backend=await source("supabase/functions/awe-api/platform/backend.mjs");
 assert(backend.includes('startsWith("sk_test_")'));
 assert(legacy.includes("unit_amount: p.amount"));
 assert(legacy.includes("const p = o.package_snapshot"));
 assert(legacy.includes('env().ORDERS_ENABLED !== "true"'));
 const checkout = legacy.slice(legacy.indexOf('if (action === "checkout")'),legacy.indexOf('if (action === "revision")'));
 assert(checkout.includes('if (env().ORDERS_ENABLED !== "true")'),"Disabling orders must also block already-created unpaid orders");
 assert(checkout.indexOf('const stripeClient = stripe();') < checkout.indexOf('checkout_at: new Date()'),"Stripe config must be checked before the project is locked");
 assert(checkout.includes('stripeClient.checkout.sessions.create('));
});

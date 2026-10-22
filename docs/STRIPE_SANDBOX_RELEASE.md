# AWE CONCEPTS — Stripe sandbox integration release plan

Last reviewed October 22, 2026. This is a **test-only integration**. Never add live keys, enable live payments, or assume checkout works because a Stripe account exists.

## Current verified state

- Stripe **test sandbox account** has been opened and its dashboard reviewed.
- No webhook destination or test checkout charge has yet been created.
- AWE CONCEPTS is deployed via **Firebase Hosting Classic on Spark**.
- Dedicated backend: Supabase project `hxxplkirfsewqsxodngv`, Edge Function `awe-api`.
- Existing API handler includes a Stripe-hosted one-time Checkout session, signed webhook handler, payment persistence/replay protection and refund recognition.
- Stripe's API secret and webhook signing secret have **not been verified in Supabase**. The database has zero verified payment records and no enabled pricing packages.
- The dashboard's owner-only `admin/checkout-readiness` endpoint checks only **presence and type** of server-side configuration, not whether Stripe actually processes payments. It never returns keys.

## Exact account setup (do only through signed-in dashboards)

1. In Stripe's sandbox, open **Developers > API keys**. Use the sandbox **secret** key, whose prefix is `sk_test_`. Do NOT provide the key in chat, public frontend code, GitHub secrets for unrelated projects, or screenshots.
2. In the dedicated AWE Supabase project, go to **Edge Functions > Secrets**. Set `STRIPE_SECRET_KEY` to the sandbox secret key. This is a server-only function secret, not a Firebase environment variable. A plain publishable Stripe key is **not** sufficient to create Checkout sessions. See https://supabase.com/docs/guides/functions/secrets.
3. In Stripe **Workbench > Webhooks**, create a **test/sandbox** destination with this full HTTPS target:

   `https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api/stripe-webhook`

   This must be the Supabase Edge API's dedicated `stripe-webhook` route, **not** `Awe Concepts.web.app/api/` or a Netlify endpoint.
4. Select the event types already supported by the code: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, and `charge.refunded`. Do not register unrelated events without code review.
5. Copy the **webhook destination's signing secret**, prefix `whsec_`, *inside the dashboards*, into Supabase Edge Functions Secrets as `STRIPE_WEBHOOK_SECRET`. This secret is **different from** the Stripe API key.
6. Keep `ORDERS_ENABLED` absent or `false`. Even though the test credentials may be configured, enabling new orders without a verified user, package, and signed webhook is premature.
7. Complete Supabase Auth email OTP verification and enroll the **actual verified owner account UUID** in `awe_owner`. Do not infer owner access from an email string.
8. Use the owner dashboard's **Stripe test checkout readiness** section to inspect booleans and the count of enabled packages. It will never reveal actual secrets. The Stripe *external webhook verified* indicator remains unknown until a real Stripe event is received.
9. Decide Awe Concepts Express's actual price, included deliverables, hosting period, domain rules, ownership, revision limits, refund/chargeback terms and terms version. Record terms in `awe_packages`. Do **not** invent numbers for the business owner.
10. Complete a **single sandbox-only** checkout using a verified test user, a legitimately priced enabled test package, and Stripe's official **test card** supplied by Stripe. No live card details should be entered. Validate successful and failed/canceled flows.
11. In Stripe Workbench, confirm request logs, Checkout Session, event deliveries, and correct signed webhook delivery/HTTP success. Check in Supabase that the paid order references match Stripe session ID, amount and currency; `awe_payments` has exactly one recognized event record; replaying the same event makes no duplicate payment or work queue.
12. Verify order post-payment generation, owner-only review, revision, approval, public site route, approved asset serving, and delivery email independently. Note: the Firebase customer-site publishing path is **not fully production-ready** as of this document; do not accept paid orders based only on Stripe success.

## Test-mode security invariants

- Server code rejects any `STRIPE_SECRET_KEY` not beginning with `sk_test_`. Webhook rejects `livemode=true`.
- Do not add Stripe secret keys to `app/service-config.mjs`, Firebase static assets, client-side `config.js`, test fixtures, or the Git repository.
- Stripe webhook endpoint intentionally has no Supabase JWT requirement; it instead verifies the raw request's Stripe signature. Other owner/account endpoints still validate Supabase Auth and per-resource authorization.
- Each Checkout Session uses the **server-snapshotted** price, not a browser-supplied amount.
- A successful redirect to `account.html?order=...` is **not** proof of payment. The signed webhook and verified database record are authoritative.
- Stripe account availability is not proof of domain approval, verified checkout, invoice generation, file publishing, deliverability or production business readiness.

## Known recovery limitation

An order's checkout payload is reserved before contacting Stripe. If the Stripe network request fails *after* reservation, the project may remain locked until reconciled. The gateway now preflights the Stripe test client and orders-enabled switch to avoid locking orders for missing credentials; additional recovery logic should be reviewed before paid public launch. Repeated idempotent Stripe requests must not create duplicate charges.

## Launch gate

Keep live payments off until one complete sandbox order proceeds through: verified customer login → configured package and terms → Stripe Checkout → signed webhook → one atomic payment record → private generated draft → verified owner approval → published customer site → delivery.

## Useful references

- https://docs.stripe.com/webhooks
- https://docs.stripe.com/payments/checkout
- https://supabase.com/docs/guides/functions/secrets
- https://supabase.com/docs/guides/functions/auth

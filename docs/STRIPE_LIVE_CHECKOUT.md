# Awe Concepts — live checkout activation (October 23, 2026)

Production: https://aweconcepts.com, Firebase Hosting Classic with Supabase Edge Function `awe-api` on project `hxxplkirfsewqsxodngv`.
Live Stripe account: `acct_1UTSTmLjf8dgin7t` (charges and payouts enabled).
A separate **live** snapshot webhook destination was registered in Stripe for:
`https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api/stripe-webhook`.
Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
`checkout.session.async_payment_failed`, `checkout.session.expired`, `charge.refunded`.

## Secrets (dashboard only — never Git, static assets, ChatGPT, or screenshots)

Supabase Dashboard → project `hxxplkirfsewqsxodngv` → Edge Functions → Secrets:
- `STRIPE_LIVE_SECRET_KEY`: ideally a restricted key beginning `rk_live_` with **Checkout Sessions: Write** and unrelated permissions **None**. A standard `sk_live_` key also works but has broader access.
- `STRIPE_LIVE_WEBHOOK_SECRET`: signing secret beginning `whsec_` for the *new live* Stripe destination.
- Preserve existing sandbox `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` unchanged.
- Leave `LIVE_CHECKOUT_ENABLED=false` and `ORDERS_ENABLED=false` until all checks pass.

## Required business decisions before enabling any customer payment

The public `express` package is currently **disabled**, has a saved amount of 7500 cents ($75), and has empty hosting, ownership, revisions and termsVersion. The checkout requires all of them. The historical $1 synthetic QA package is also disabled; never enable it for customers.

Confirm package scope, number of pages, exact deliverables, revisions policy, website rights, domain transfer and customer-owned hosting instructions, launch timeframe, cancellations/refunds and any applicable tax policy. Advertised starting prices: $75 one-page, $150 multi-page, more demanding projects $250+. Do not automatically treat the current single-page generator as a multi-page deliverable.

Use owner dashboard → Packages & availability to configure valid server-owned USD amounts (7500 for $75; 15000 for $150) *only after* matching package terms and capabilities are correct. Keep quote-only custom jobs out of fixed-price checkout.

## Release gate

1. Verify GitHub branch's CI (build, check, full tests). Merge only after review.
2. Deploy the exact versioned Supabase `awe-api` function bundle, preserving its JWT setting of `false` (webhook signature verification protects the webhook route).
3. Deploy static client assets from `main` via Firebase Hosting GitHub Action and verify the actual production version.
4. Configure both live secrets in Supabase dashboards (no credentials in front-end or repo). Leave ordering closed.
5. Verify live and test webhook signature handling, server-side price snapshots, payment replay safety and admin/checkout-readiness. Confirm enabled packages have valid terms.
6. Set `LIVE_CHECKOUT_ENABLED=true` and `ORDERS_ENABLED=true` **only after** verified publication, owner approval and client delivery workflow.
7. Verify production checkout Session creation with no real charge; then make a specifically authorized low-value real purchase and verify webhook, order status, publishing, delivery. Refund if appropriate. Do not assume a redirect or a live-key present means end-to-end success.

**Fail-closed behavior:** A live Stripe account connection alone does not enable public payment collection. Existing test keys remain separate; live event handling stays available for refunds and delayed payment outcomes even when new orders are switched off.

# AWE CONCEPTS — platform and launch guide

> **Historical implementation record (October 22, 2026).** The Netlify setup steps, six-template count, cookie session description, missing-Supabase claim and untested-Stripe claim below are superseded. For the current Firebase Hosting and Supabase architecture, read [README.md](../README.md), [FIREBASE_SETUP.md](FIREBASE_SETUP.md) and the source. Do not use this document to configure production or infer current checkout readiness.

Updated October 22, 2026. This is a working implementation with local verification, not a claim that paid commerce is live.

## What is finished in code

- Preserved the cinematic homepage, GSAP motion, Three.js artwork with software fallback, five case studies, three interactive demos, design lab and downloadable brief.
- Added AWE Express and Awe Concepts Custom service paths.
- Six original template directions: The Index, Folio No. 01, Still Studio, After Hours, Signal / Noise and Daylight. They share a safe renderer, with typography, compositions, framing, spacing and responsive variations.
- Five-step Express flow: purpose, template, style, content/materials, review. Stripe supplies the separate checkout step; the account page supplies confirmation/status.
- Generic live configurator with colors, fonts, light/dark appearance, split/stacked layouts, navigation, motion and section choices. Customer text is never fed into this generic preview.
- Email-code authentication with server-validated sessions, HttpOnly/Secure/SameSite cookie, owner identity checks, private materials, and cross-customer authorization.
- Signed Stripe snapshot webhook handling, amount/currency/session matching, duplicate protection, delayed payment handling and refund status tracking. Card checkout only. Live keys/events are rejected by code.
- Durable generation and delivery queue with leases, five attempts, owner retry controls and failure visibility.
- Actual HTML/CSS generation using customer-provided content, approved photos and design choices. No paid AI dependency or invented résumé content.
- Owner dashboard for orders, gross verified revenue by currency, customer counts, briefs, jobs, packages, template availability, edits, photo replacement, review, rejection, approval, version restore and audit history.
- Shared `/sites/<slug>` hosting. No new Netlify project or build per customer. Public routes serve the exact saved approved HTML, not a newly rendered version of the current template code.
- Owner-approved version replacement; revision requests leave the current version live. Previous versions can be restored to a private draft and separately approved.
- Public page/image verification followed by transactional email submission. Provider acceptance is recorded; inbox delivery is not claimed.
- Approved HTML/assets ZIP export for the owner; customer download only when their snapshotted package includes it. Online exports are capped at 3.5 MB of image payload to fit server response constraints; larger transfers need owner handling.

## Current account blockers

1. **Netlify:** Google sign-in reached the account chooser. Automatic approval review then denied the next authentication action because of a ChatGPT usage limit, not a website credential rejection. No project import, environment configuration or deployment was verified.
2. **Supabase:** the connected free organization has two active projects, ResidenceOS and Cirvo, and an inactive ResidenceOS preview. There is no dedicated AWE project. Neither existing product was changed. The free allowance is two active projects; creating another requires an owner decision about capacity or a paid plan. No paid upgrade or pause was performed.
3. **Stripe:** no test account credentials or webhook secret are configured. Local tests use Stripe’s signature helper and simulated events, not a real Checkout purchase.
4. **Email:** no sending domain, Resend credentials or Supabase SMTP are configured. No real delivery email was sent.
5. **Business decisions:** package prices, hosting duration, ownership, revision policies, support contact and retention/deletion rules are unset. They must come from the owner. Packages are disabled and orders are closed.

## Setup in order

### 1. Publish the studio brochure and design explorer

In Netlify, import the GitHub repository `Damilolawe/My-Website`. Use `main`, build `npm run build`, output `dist`, functions `netlify/functions`, Node 22. `netlify.toml` supplies these settings, API/tenant rewrites and Sharp packaging. Do not select a paid plan. No domain purchase is necessary for the assigned Netlify URL.

Verify homepage, six `/templates/*.html` pages, three `/demos/*.html` pages, `/order.html`, `/account.html`, `/privacy.html`, missing-page 404 behavior, and response security headers. With no backend configured, the design explorer works, accounts show an unavailable message when used, and checkout remains closed. A deploy must actually succeed before calling the site live.

### 2. Allocate a dedicated Supabase project

Resolve the active-project limit without changing ResidenceOS/Cirvo unless separately authorized. Then apply `supabase/migrations/20261022024259_awe_platform.sql` **only to the new AWE project**. The migration was created using the Supabase CLI and tested in local PostgreSQL through PGlite. Hosted Supabase migration/advisors have not run.

The migration creates all `awe_*` tables, private storage and service-only SQL functions. RLS is enabled on every table. Browser `anon` and `authenticated` roles have no grants or permissive policies. Requests go through the server, which verifies the user and owner/order access. Service credentials stay in Netlify Functions.

Configure Supabase Email OTP with custom SMTP. The default Supabase mail service is restricted to organization members and is unsuitable for real customers. Use the email template token `{{ .Token }}` so customers receive a code that the sign-in form can verify. Configure your verified sending domain/SMTP provider and appropriate authentication rate limits. The current app uses one-hour sessions and asks users to sign in again when a session expires; it does not store refresh tokens.

Sign in as Dami, obtain the verified auth user UUID from Supabase Authentication, then set that exact UUID in both `OWNER_USER_ID` and `awe_owner`. Example SQL, replacing the placeholder with the actual authenticated UUID:

```sql
insert into public.awe_owner(user_id) values ('OWNER_AUTH_USER_UUID');
```

Only this identity should be present. No authorization decision uses user-editable metadata. Never use an email typed into a form as proof of ownership.

### 3. Configure Netlify server variables

| Variable | Meaning |
| --- | --- |
| `SUPABASE_URL` | Dedicated AWE project HTTPS URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only database/storage key |
| `SUPABASE_PUBLISHABLE_KEY` | Auth API project key |
| `OWNER_USER_ID` | Dami’s verified Supabase auth UUID |
| `SITE_ORIGIN` | Exact production origin, e.g. the assigned HTTPS Netlify hostname, no trailing slash |
| `STRIPE_SECRET_KEY` | Test secret beginning `sk_test_` |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for this test webhook endpoint |
| `RESEND_API_KEY` | Sending key for the verified domain |
| `EMAIL_FROM` | Verified sender address/name |
| `PUBLIC_CONTACT_EMAIL` | Business support email chosen by the owner |
| `ORDERS_ENABLED` | Keep `false` until ready for a controlled test; never treat this flag as permission for live charges |

Keep secrets scoped to production functions. Do not expose production data to public pull-request previews. For backend staging, use a separate nonproduction database and test credentials. No environment values belong in GitHub source or static browser code.

### 4. Configure Stripe test mode

Create a **snapshot** webhook destination at `https://YOUR_SITE/.netlify/functions/webhook` for:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`
- `charge.refunded`

Register the API version appropriate to the installed Stripe SDK and inspect actual event payloads during the sandbox run. The code checks raw-body signatures before processing, rejects live events, and only queues production when payment status is `paid`. It matches session, order reference, amount and currency to the server snapshot. Returning from Checkout is never proof of payment.

The server creates hosted Checkout Sessions with one-time card payments, a server-owned price, and an idempotency key derived from the order. Customer submissions cannot set the amount. Refunds initiated in Stripe are tracked by signed webhook; the app does not initiate refunds. Full/partial refund status blocks further automatic generation/approval. It does not automatically remove an already-published site—owner handling and policy are required.

Use test fixtures only. Live activation requires an explicit owner instruction, removal/change of the hard test-key guard, and a separate verified release. Merely supplying a live key currently fails closed.

### 5. Define packages and policies

Open `/admin.html` as the verified owner. Add or edit packages, price in minor currency units, supported currency (`usd`, `eur`, `gbp`, `cad`, `aud`), included features, hosting terms, ownership and revision policy. Enable file downloads only where included. Enabling a package requires a valid price and complete terms. Each save creates a new terms version; existing orders retain their original snapshot.

Choose a public support email and retention/deletion rules, then update the public privacy page. Publish real tax/refund/cancellation requirements appropriate to your business before accepting live customers. None of these policies have been invented by the implementation.

## Customer walkthrough

1. Explore AWE Express and choose the website purpose.
2. Explore the six fictional template demos and select a direction.
3. Customize colors, typography, appearance, layout, navigation, motion and sections. The preview always uses fictional content.
4. Enter a public name/headline, biography, education, experience, skills, projects/services, optional public email and HTTPS links. Select up to twelve files, each at most 4 MB. Photos are explicitly intended for publication after owner review; documents remain private.
5. Review the selected package, itemized amount, hosting/ownership/revision terms and materials. Accept the terms and verify the account email.
6. Uploads are saved privately, then Checkout opens. The order reference exists before payment so retries and failed payment sessions can be reconciled.
7. After a verified payment, the account shows professional progress labels. No draft link, production logs or internal notes are returned.
8. After approval and publication, the live link appears. A delivery job verifies the page and each selected image before sending the email. File download appears only for eligible packages.
9. Send revision requests through the account. These appear in the owner dashboard and never mutate the published site automatically.

The initial form keeps unsent details only in memory; reloading loses that unsent work. Upload/checkout retries in the same tab reuse the order and upload progress. An expired/closed Checkout currently requires owner assistance; there is no automatic new paid session for that order.

## Owner walkthrough

- **Overview:** filter orders by name/email/status/reference; inspect current counts, failed jobs and gross purchase totals. Lists currently cap at the latest 500 orders and 100 briefs/jobs, which is clearly labeled. Revenue excludes refunded orders and processor fees; this is not an accounting ledger.
- **Review:** open an order. Private HTML and original materials require server-side owner authorization. Preview at desktop, tablet and mobile widths. Preview documents are sandboxed and uncached.
- **Edit:** change text, links, selected sections, template, colors, typography, navigation and motion. Upload replacement images, confirm rights, then select them in the editor. Save/regenerate creates a new immutable private version.
- **Reject:** record notes and set Revisions Required. The current public version stays live.
- **Approve & Publish:** the confirmation names the customer and warns that it publishes the saved version. SQL checks owner identity, exact draft UUID, expected order revision and payment status. Approval, audit entries, public pointer and delivery enqueue commit together. Concurrent stale editor/approval requests are rejected.
- **Recover:** restore an older version as a new private draft; review and approve again. Retry failed generation/delivery jobs after fixing provider setup. The worker runs every ten minutes and claims three jobs per run, with leases and five attempts. The owner can run queued jobs manually.
- **Delivery:** “Delivered” currently means the email provider accepted the message. It does not prove inbox arrival. Inspect provider logs for bounces. Resend idempotency reduces retry duplication, but exactly-once delivery across a long provider/database outage is not guaranteed; check provider records before manually retrying old uncertain sends.

## Architecture and privacy boundary

The public bundle contains no customer records or service credentials. A Netlify Function validates the Supabase user through the Auth API on each protected request. Account users can read only their own sanitized order summary and submit their own revisions. The owner UUID is checked both in the API and by privileged publication SQL.

Private tables include orders and immutable package snapshots, input/customization JSON, payment events, assets, HTML versions, approvals, audit events, briefs, revisions, delivery records and durable jobs. Customer identity comes from Supabase Auth plus the order’s verified user UUID/email. There is no separately editable customer role field.

Uploads live in `awe-private`, a private bucket with no direct browser policies. Images are decoded, bounded to 20 megapixels, resized to at most 1800×1800, re-encoded as WebP and stripped of embedded metadata. PDFs/DOCX receive type/signature checks and are downloadable only through the owner gate as attachments. This is not malware scanning; documents must be treated as untrusted. No résumé parsing is implemented.

Only explicitly selected image IDs recorded in an approved immutable version can be fetched through that tenant’s public asset route. Public routes validate both the public-version pointer and a matching approval record. Unapproved routes return 404; guessing a slug or asset ID does not bypass approval. Private preview/material responses are `no-store`. Public responses revalidate rather than keeping stale versions in long-lived caches.

Payment verification queues generation only. Generation creates HTML and a private version only. Validation does not publish. Publication is a separate owner action. Approved/Publishing are transaction audit stages; the public pointer changes atomically to Published, so visitors never see a partial intermediate upload.

## Delivery arrangements

- **AWE-hosted:** implemented at shared `/sites/<slug>` paths. Duration and maintenance must be defined per package; free quotas are finite.
- **Website files:** approved ZIP download is implemented, with package eligibility and a conservative response-size cap. This is a portable static HTML/CSS/image package, not a transfer of the studio backend or hosting account.
- **Customer-owned domain:** not automated yet. A future verified hostname-to-tenant mapping and Netlify domain/TLS setup are required. Do not sell automated domain connection as available. No domain has been bought or connected.

## Extending templates

Add a definition to `shared/model.mjs`, a renderer layout/style in `shared/render.mjs`, a database template row, and fixture/visual tests. The owner can enable/disable existing templates; the dashboard does not accept arbitrary HTML/JavaScript or provide a full drag-and-drop template authoring tool. Section edits currently regenerate the whole small deterministic page; no AI rewriting or individual background section jobs are implemented.

## Costs and capacity estimates

These estimates use public provider pricing checked October 22, 2026. They are a planning model, not a quote or observed production usage. Sources:

- Netlify: https://www.netlify.com/pricing/ and https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- Supabase: https://supabase.com/pricing and https://supabase.com/docs/guides/platform/billing-on-supabase
- Resend: https://resend.com/pricing
- Stripe: https://stripe.com/payments/checkout and https://stripe.com/pricing

Assumptions: 100 monthly visits per customer site; 1 MB delivered per visit; three server requests per visit averaging 250 ms at 1 GB; 20 MB retained materials per customer; two studio production deploys/month; approximately 51 Netlify credits/month for studio traffic, deploys and idle scheduling. Tenant publication changes data and does not trigger a new Netlify deploy. Routine generation uses no paid AI.

Netlify’s model is 20 credits/GB bandwidth, 2 credits/10,000 requests, 10 credits/GB-hour compute and 15 credits per production deploy. Free includes 300 monthly credits; Personal $9 includes 1,000; Pro starts at $20 with 3,000. Based on the assumptions, each customer adds approximately 2.27 credits/month.

| Hosted sites | Monthly tenant traffic | Retained files | Estimated Netlify credits | Modelled Netlify plan | Supabase capacity implication |
| --- | --- | --- | --- | --- | --- |
| 10 | 1 GB | 0.2 GB | 74 | Free, $0 | Fits a free AWE project if a slot exists |
| 50 | 5 GB | 1 GB | 165 | Free, $0 | At free storage/uncached egress limits, no headroom |
| 100 | 10 GB | 2 GB | 278 | Free, $0 with very little traffic headroom | Pro or storage/traffic redesign likely needed |
| 500 | 50 GB | 10 GB | 1,186 | Pro starting $20 | Pro starting $25 may cover assumed storage/egress |

Supabase Free lists 500 MB database, 1 GB files, 5 GB uncached plus 5 GB cached egress and two active projects. Free projects may pause after inactivity. This implementation proxies private-bucket images through the server; do not assume all its storage traffic qualifies for cached egress. Images cross both Supabase and Netlify, so both providers meter traffic. At 500 sites, the illustrated recurring hosting floor is roughly $45/month before additional projects, domains, email overages and payments. Higher visits or heavier photos can change this materially.

**Your current account has no spare free active-project slot.** The $0 Supabase examples are conditional capacity illustrations, not an available third free project. An organization upgrade with multiple active projects can add per-project compute beyond the included allowance; review the account quote before approving anything.

Resend Free lists 3,000 emails/month and 100/day. At three emails per new customer (for example sign-in/confirmation/delivery), 10/50/100/500 new customers imply 30/150/300/1,500 emails, before repeat sign-ins and revisions. Daily bursts can exceed the free daily limit even below the monthly allowance. Supabase SMTP and delivery emails share provider allowances if configured through the same account.

For a US domestic-card illustration, Stripe’s standard published rate is 2.9% + $0.30. With N purchases at owner-chosen price P, processing is approximately `N × (0.029P + 0.30)`. At a purely illustrative $100 order, fees for 10/50/100/500 purchases are $32/$160/$320/$1,600. **$100 is not a configured or recommended package price.** International cards, currency conversion, disputes, taxes and optional services can differ. Existing hosted websites incur no new Stripe purchase fee just for remaining hosted.

The assigned Netlify subdomain adds no domain registration fee. A custom studio or customer domain requires an actual registrar quote and recurring renewal; no fixed domain price is assumed. Monitor bandwidth/storage and set explicit customer hosting terms. Free allowances are finite, can pause service, and are not unlimited hosting promises.

## Verification and release gates

Local tests use PGlite’s real PostgreSQL engine and simulated Supabase HTTP/storage, Stripe signed events and email-provider responses. They cover denial of anonymous/customer database access, IDOR, private asset access, invalid uploads, payment mismatch/replay, delayed payment, generation, owner edits, stale revisions, explicit publication, immutable version history, job leases, email failure/retry, revision isolation and refund publication blocking. Stripe signature tests use the installed official SDK. No provider sandbox or real inbox success is claimed.

The static check validates 15 built HTML pages for local paths/fragments, duplicate IDs, language/title/h1, and authored JS syntax. Browser inspection verified the template gallery, selection, live sample style changes, content entry, summary and disabled checkout. The original homepage/demos had been tested in the previous release. Full device accessibility, GPU WebGL, hosted Netlify routing/native Sharp, actual OTP delivery, Stripe Checkout/webhook delivery and real transactional email remain launch gates.

Known remaining work: live service configuration; full connected sandbox E2E; customer custom domains; owner-defined retention/deletion/support/refund policy; production malware scanning or document-handling policy; resumable orders across devices; richer multi-page/business templates and per-project structured project cards; pagination beyond current dashboard limits; verified email bounce tracking; general abuse/load testing and operational backups. No claim of complete production readiness is made until these are reviewed and the connected sandbox workflow passes.

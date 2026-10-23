# Awe Concepts — staged business and domain migration

## Identity
- Public brand: **Awe Concepts** (the owner's surname is pronounced “Ah-way”).
- Primary domain (owned): **aweconcepts.com**; preferred canonical URL after TLS validation: `https://aweconcepts.com/`.
- General contact: **contact@aweconcepts.com** via Google Workspace.
- Current existing Firebase Hosting Classic site: `https://awe-digital.web.app`, retained until the domain and authentication transition are tested.
- Existing repository: `Damilolawe/My-Website`; Firebase, Supabase (`hxxplkirfsewqsxodngv`) and Stripe sandbox (`acct_1UTP5yPuITKnGF9J`) are **reused**.

## Scope / safety
This repository changes customer-visible wording, official studio email references, package naming, and prepares CORS allowlists for the old Firebase domain and the two new web origins. It does **not** change live SMTP/Stripe secrets, owner enrollment, Firebase project ID, Supabase project ref, tables (`awe_*`), function slugs (`awe-api`, `awe-inquiry`), Stripe webhook URL, or trigger a live payment.

These internal `awe_*` identifiers are technical APIs and stable IDs, **not** the public business name; renaming them would require a separate coordinated migration.

## Phase 1 — Deploy rebranded code on the current hosting address
1. Merge the branding PR after build, tests and source review; ensure the existing Firebase deploy workflow succeeds.
2. Confirm pages `/`, `/contact.html`, `/account.html`, `/admin.html`, `/order.html`, template demos, and privacy show Awe Concepts.
3. Verify `contact@aweconcepts.com` is shown for direct contact and the existing contact form still submits.
4. The Edge Function origin changes in GitHub require a separately verified Supabase Edge deployment after comparing live revisions; a GitHub merge alone does not redeploy Edge Functions.

## Phase 2 — Add the registered domain to **Firebase Hosting Classic**, not Firebase App Hosting
1. In the **existing** Firebase Hosting site's dashboard, choose **Add custom domain** for `aweconcepts.com` (and configure `www.aweconcepts.com` redirect if desired).
2. Copy the **exact** TXT and web A/AAAA/CNAME values shown by Firebase into the domain registrar DNS. Do not guess or substitute generic IPs.
3. Preserve all Google Workspace **MX**, SPF, DKIM and DMARC **TXT** records. The mail configuration is a separate Work Mode task. DNS TXT verification and MX records can coexist with web A/CNAME records.
4. Wait for Firebase's domain status **Connected** and valid HTTPS certificate. Verify the root domain and www redirect. Keep the existing `awe-digital.web.app` hostname available for rollback/legacy links.

## Phase 3 — Cut over authentication and API origins
1. Supabase **Authentication > URL Configuration**: add both new HTTPS site origins to allowed redirect URLs; after confirming the new domain works, set the primary Site URL to `https://aweconcepts.com`. Preserve the old production hostname during transition.
2. Deploy reviewed new versions of both `awe-inquiry` and `awe-api`, ensuring CORS allows the verified old host and new root/www hosts and denies arbitrary origins.
3. After DNS + functions + auth pass, set `SITE_ORIGIN=https://aweconcepts.com` in the **existing** Supabase Edge Function secrets/config as applicable; set `PUBLIC_CONTACT_EMAIL=contact@aweconcepts.com` and `EMAIL_FROM` only when email sender configuration has been verified. Do not replace Stripe/Supabase secrets.
4. Verify a real OTP login, logout, owner access, inquiries, draft save/resume, CORS preflight and secure private API from `aweconcepts.com` using a browser.

## Phase 4 — SEO, provider labels and customer operations
1. Set SEO canonical and Open Graph `og:url` to `https://aweconcepts.com` **only after** TLS and website availability are verified. Update any future marketing previews/graphics that still show the retired brand.
2. Optionally rename the **display name** of the existing Supabase project to `Awe Concepts` in Project Settings; keep its ID unchanged.
3. Optionally rename the **display name** of the existing Firebase project to `Awe Concepts` in Firebase Project settings; keep its project ID/site ID unchanged.
4. Update the existing Stripe **sandbox's customer-facing business/statement/branding names** only via authorized sandbox settings; retain `acct_1UTP5yPuITKnGF9J` and the existing webhook. Leave live mode untouched.
5. Renaming the GitHub repository is optional; existing private repo and CI/CD references should not be invalidated. If renamed, first update integrations, remote URLs and deployment GitHub App access.
6. Keep the existing (disabled) AWE Express package named **AWE Express** in `public.awe_packages`. Do not change prices, enabled status, or past order snapshots.

## Release gate
`ORDERS_ENABLED=false` until paid sandbox checkout, signed webhook, verified owner, approved site publication and email delivery all pass on the new host. No actual customer charges or paid upgrades as part of rebranding.

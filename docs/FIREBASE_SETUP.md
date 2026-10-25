# Awe Concepts production hosting

The existing Firebase project is `awe-digital`. Firebase Hosting Classic serves the public site at `https://aweconcepts.com` and `https://awe-digital.web.app`. Supabase project `hxxplkirfsewqsxodngv` runs authentication, private storage and the API. Do not create replacement projects or move this site to another host.

## Deployment

The [Firebase Hosting workflow](../.github/workflows/firebase-hosting.yml) runs on pushes to `main`, manual dispatch and its scheduled approved-site refresh. It uses Node 22, `npm ci`, `npm run build`, `npm run check` and `npm test`. It then materializes only owner-approved customer sites, audits `dist/`, checks production Supabase preflight responses and deploys `dist/` with `FirebaseExtended/action-hosting-deploy`.

The workflow requires the GitHub Actions variable `FIREBASE_PROJECT_ID=awe-digital` and secret `FIREBASE_SERVICE_ACCOUNT`. Keep the service account JSON and all Supabase and Stripe secrets out of source and browser assets. The Hosting configuration is in [firebase.json](../firebase.json); only `dist/` is public.

A green local build does not establish a successful release. After each merge, verify the Firebase workflow is successful for the intended full commit SHA, including the final deploy step. Then check both production hostnames, the homepage inquiry path, critical account routes, mobile layouts, console and network errors. GitHub Actions smoke checks prove the Supabase preflight for configured origins; they do not prove the browser experience on the deployed site.

## Current boundaries

- The homepage and contact page send public inquiries through the `awe-inquiry` Supabase Edge Function. Successful submissions require a database acknowledgment.
- Signed-in accounts, private drafts, owner operations and publishing use the `awe-api` Supabase Edge Function. Keep private records and service credentials out of Firebase assets.
- Public Starter and Signature packages are enabled, and the deployed API currently reports live checkout configured. A past scoped Stripe test payment reached delivery, but that QA package expired. Fresh end-to-end test-mode verification for both tiers remains outstanding.
- AWE Express samples are fictional demonstrations. Customer publication uses the saved, approved version and authorized assets. The Signature catalog contains RunwayML and source-guided five-page designs; verify the selected bundle's five pages, approved export, and publication before claiming delivery readiness.

## Recovery

If a deployment fails, inspect the failed GitHub Actions step and its logs. Do not rerun the deploy alone after a build, materialization, audit or preflight failure. Repair the cause on a feature branch, run the checks, then merge a reviewed change. Keep the last successful Hosting release available until a replacement passes verification.

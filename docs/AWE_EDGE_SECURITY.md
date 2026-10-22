# AWE / DIGITAL — Versioned Supabase Edge API snapshot

This folder captures the actual *awe-api* Edge Function source from the dedicated AWE / DIGITAL Supabase project (as inspected October 22, 2026). It is now versioned rather than existing only as a dashboard deployment. **The code in this branch is not deployed**, and it must not be treated as production-ready until the separate Firebase/Work session completes, the current Edge Function source is compared, and the changes are deployed by the authorized pipeline.

## What is covered

- AWE Express authenticated customer endpoints, draft creation/saving, preview rendering, asset access and owner-admin delegation.
- Existing test-only Stripe webhook verification and authorization.
- An isolated `platform/request-safety.mjs` for streaming request-size enforcement (including missing Content-Length) and strict CORS allowlisting.
- Automated tests in `tests/awe-edge-backend.test.mjs` for origin checks, CORS, oversize requests, Auth verification, owner gating, invalid ownership identifiers and payment-mode guards.

## Explicit operational blockers

The AWE database was inspected read-only and held **no registered Auth users, no owner entry, no orders, no versions or assets, and no enabled paid packages** at the time of inspection. Therefore there is no user account with which to verify authenticated operations. Do not initialize an owner from an email string alone or enable checkout automatically.

The source files include a legacy Netlify endpoint adapter and credentials supplied at runtime by Supabase secrets. **No keys are checked in**. A payment remains test-mode-only. For a release: compare this folder to the most recent deployed source, configure the legitimate Firebase origin, run tests, verify test users and production permissions, and deploy Edge Function only after existing Work-session changes are reconciled.

## RLS

All fourteen AWE `public.awe_*` tables currently have RLS enabled with zero client-access policies, appropriate for the service-controlled model *if* privileged operations always apply per-resource authorization. This is not permission to give a browser the service-role key. Supabase advisory `rls_enabled_no_policy` is informational in this architecture; do not add blanket open policies to hide that warning. See https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy.

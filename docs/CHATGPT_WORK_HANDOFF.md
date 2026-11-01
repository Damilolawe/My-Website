# ChatGPT Work handoff

The currently enabled daily task `6ae2397e471881919d799e4632f52725` checks the authorized `contact@aweconcepts.com` inbox at 10 AM Eastern for the exact subject `AWE WORK HANDOFF | DRAFT READY`. It is a scheduled inbox check, not a verified event-driven trigger. The earlier event-driven task `6ae154d18b9881918260bef0e438ea0e` has no verified autonomous execution; do not assume it handles orders.

## Implemented boundary

Verified Stripe payment queues a private draft. The worker sends its metadata-only notification only when `AWE_WORK_HANDOFF_ENABLED=true` and the immutable package snapshot records explicit `chatgpt-work-v1` customer authorization. The required checkout agreement now clearly identifies private AI-assisted processing by OpenAI ChatGPT Work, with no second optional checkbox. Both fresh and resumed checkout requests set `aiConsent` from the checked required agreement; the API records it as `aiProcessingConsent`. Orders without recorded authorization are still excluded and are not retroactively opted in.

The notification contains only order/version references and the authenticated owner dashboard URL. Customer content, images, credentials and public preview tokens are excluded. The destination is fixed to the business mailbox; another configured recipient is rejected.

`awe_reserve_work_handoff` locks the order and confirms the current paid draft, its existence, and consent. It reserves the provider idempotency window before email is attempted. Accepted versions are skipped permanently. An ambiguous send older than 20 hours requires owner reconciliation; it must not be resent automatically after the provider's 24-hour idempotency window. This reservation deduplicates notifications, not Work's own edits.

The owner's `admin/orders/:order/handoff-export` route exports the paid, consented private version as a ZIP with relative image paths and a structured design brief. Client download authorization now permits this specific owner route. The API still verifies the pinned owner identity and server-only owner membership. No public ZIP endpoint exists.

## External verification still required

The current daily task is enabled and scoped to the verified business Gmail inbox with the exact-subject filter; its recorded last run is still null as of October 28, 2026. No completed production run is verified. Email receipt alone cannot establish successful Work execution.

Work needs a separately authenticated owner session or a private ZIP explicitly supplied by the owner. The connected Gmail account does not grant owner-dashboard access. A complete authorized private-data → manual Work refinement → private result round trip has now passed on the synthetic sandbox fixture; autonomous event-trigger execution remains unverified. There is no arbitrary AI HTML importer. A durable owner-only claim/completion protocol is now implemented and live; see RELEASE_2026-10-28.md. The saved task correctly stops if those prerequisites are unavailable; do not enable autonomous processing on the strength of the notification dedupe alone.

The supported fallback is an owner-authorized private ZIP, a separate private revised ZIP returned by Work, and manual owner review/application. Never publish customer files or put them in a public repository. Preserve the original version. Owner approval is mandatory, and publication also requires customer approval of the exact saved version.

## Release

The notification-reservation, refund-ordering and processing-ledger migrations are already applied; do not apply them again. Only `20261028035042_customer_draft_approval.sql` remains pending. Apply it together with the matching API and customer/owner static interfaces through the existing Firebase project/domain release when the accepted limitation clears. Keep production handoff disabled until event activation, authorized private file access and a recorded autonomous refinement/return round trip are verified. See RELEASE_2026-10-28.md for the migration version mapping.

Do not modify or retry GitHub Actions, enable billing, change hosting, or publish to an alternative domain. Local validation substitutes for unavailable CI execution; it does not make changes live.


## Processing ledger and sandbox acceptance

`awe_work_runs` is a private RLS-enabled, service-only ledger keyed by order and immutable draft version. `work-claim` returns `acquired=true` only for the first run; all duplicates are skipped, including completed/failed runs. `work-finish` requires the matching run and verified owner, current paid draft and current AI consent. Successful results contain only a private ChatGPT Library file ID and actual ZIP SHA-256. These records never replace a draft or publish a website.

A failed or abandoned claim cannot be automatically taken over. Reconcile it as the owner before retrying; do not delete or reassign live claims in an automated task.

The owner queue supports a one-off `work_acceptance` job for an existing paid test-only fixture. It independently retrieves the Stripe **sandbox** Checkout Session and verifies its mode, paid state, order reference, amount and currency before allowing the metadata-only notification with production handoff disabled. This does not initiate payment or enable ordinary customer handoff. Consent and durable notification reservation still apply.

Live backend version 92 contains the independently released checkout guard, consented private export, processing endpoints, durable notification path, acceptance worker and approved multipage delivery-verification repair. The full customer approval/static release remains coordinated and pending. See the follow-up release record for applied versus pending migrations.


## Acceptance outcome

The live owner sign-in, sandbox payment re-verification, notification delivery to the business inbox, authorized manual draft retrieval/refinement, private ZIP result, completion ledger and duplicate skip all passed. Inbox delivery did not produce a recorded autonomous task run in the available task history. The saved Gmail predicate accepts verified INBOX deliveries even when self-addressing also assigns SENT; it still rejects outgoing-only messages and nonmatching subjects. See RELEASE_2026-10-28.md for the bounded attempts and limitations. Do not keep generating test emails or claim autonomous success without a real recorded result.

## Required studio credit (effective November 2026)

Every new AI-produced or AI-refined website design draft and private exported HTML/ZIP must include a small footer signature: the authentic Awe Concepts logo, the text **Designed by Awe Concepts**, and a clickable link to https://aweconcepts.com/. Use `applyAweDesignCredit()` in the shared renderer; in other standalone code reproduce the same accessible signature without external image dependencies. Add it before owner/customer approval. Never secretly modify an approved immutable customer version to add branding, never skip payment or publication gates, and never expose customer data publicly.

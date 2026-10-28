# ChatGPT Work handoff

The existing event-driven task `6ae154d18b9881918260bef0e438ea0e` is enabled. Preserve it; do not create a recurring replacement. The connected Gmail identity was verified as `contact@aweconcepts.com`. The exact subject is `AWE WORK HANDOFF | DRAFT READY`.

## Implemented boundary

Verified Stripe payment queues a private draft. The worker sends its metadata-only notification only when `AWE_WORK_HANDOFF_ENABLED=true` and the immutable package snapshot records explicit `chatgpt-work-v1` customer consent. Checkout offers this choice separately, unchecked by default. Customers can purchase without opting in. Existing orders without recorded consent are excluded.

The notification contains only order/version references and the authenticated owner dashboard URL. Customer content, images, credentials and public preview tokens are excluded. The destination is fixed to the business mailbox; another configured recipient is rejected.

`awe_reserve_work_handoff` locks the order and confirms the current paid draft, its existence, and consent. It reserves the provider idempotency window before email is attempted. Accepted versions are skipped permanently. An ambiguous send older than 20 hours requires owner reconciliation; it must not be resent automatically after the provider's 24-hour idempotency window. This reservation deduplicates notifications, not Work's own edits.

The owner's `admin/orders/:order/handoff-export` route exports the paid, consented private version as a ZIP with relative image paths and a structured design brief. Client download authorization now permits this specific owner route. The API still verifies the pinned owner identity and server-only owner membership. No public ZIP endpoint exists.

## External verification still required

The automation lookup confirms an enabled unscheduled task and its saved instructions. It does not expose the structured Gmail trigger account/filter binding. There is no recorded production run. Email receipt alone cannot establish successful Work execution.

Work needs a separately authenticated owner session or a private ZIP explicitly supplied by the owner. The connected Gmail account does not grant owner-dashboard access. A complete authenticated export → Work refinement → private result has not been exercised. There is no arbitrary AI HTML importer or durable atomic claim/completion API for Work edits. The saved task correctly stops if those prerequisites are unavailable; do not enable autonomous processing on the strength of the notification dedupe alone.

The supported fallback is an owner-authorized private ZIP, a separate private revised ZIP returned by Work, and manual owner review/application. Never publish customer files or put them in a public repository. Preserve the original version. Owner approval is mandatory, and publication also requires customer approval of the exact saved version.

## Release

Apply the three readiness migrations, deploy the existing Supabase `awe-api` source, and deploy the static build to the existing Firebase project/domain when the accepted deployment limitation clears. Keep handoff disabled until account/filter binding, consent, private file access, duplicate handling and one sandbox round trip are verified.

Do not modify or retry GitHub Actions, enable billing, change hosting, or publish to an alternative domain. Local validation substitutes for unavailable CI execution; it does not make changes live.

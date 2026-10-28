# Awe Concepts release verification

Verified against main `c552afa644824695ef7e105990f8af5124855782` on October 27 EDT / October 28 UTC, 2026. The accepted GitHub Actions deployment limitation is excluded from the score.

## Readiness: 90% (9 of 10 defined release gates)

1. Package pricing and terms: $75 Starter, $150 Signature, Custom Quote in source. Live public homepage still shows the older $250+ text.
2. Checkout integrity: final payload cannot change the reserved template or select a disabled design. Both API handlers reject forged Starter→Signature and same-tier substitutions before writes or Stripe calls.
3. Stripe verification: enabled live webhook covers completion, asynchronous success/failure, expiration and refunds. Live charge history is empty. The connected sandbox contains a completed, paid $1 test checkout. No financial transaction was initiated during this work.
4. Payment recovery/refunds: signed-webhook replay and delayed-payment tests pass. Full refunds cannot be downgraded by late partial-refund events; invalid/null payment inputs fail closed.
5. Authentication/data isolation: OTP login, refresh, logout, own-order access, owner checks, uploads and denial paths pass regression tests. All 15 live private tables have RLS and no browser SELECT grants; privileged RPCs deny anon/authenticated execution. No public policies were added. Dependency audit reports zero vulnerabilities.
6. Owner controls: private preview/export, bounded page-query routing, immutable versions, exact-order confirmation and owner-only publication are covered by tests. Asynchronous export errors are returned as normal API errors.
7. Customer lifecycle: PostgreSQL-backed simulated workflow covers payment → generation → private review → revision → customer sign-off → owner approval → publication → verified delivery and downloads. Customer approval is bound to a draft UUID; revising invalidates the prior sign-off.
8. Catalog/build: 116 currently enabled templates; complete static build and validation of 939 pages pass. Local thumbnail generation used an isolated Chromium runtime after the default browser download failed.
9. Browser/visual QA: 380 template renders across desktop/mobile plus Brianna mouse/keyboard reveal pass. All Signature chapter pages are checked on mobile. Four real overflow cases were repaired by constraining teaser artwork to its card width. Local image loading checks were adjusted to load lazy images before evaluating them. Representative screenshots were inspected; this is not a complete WCAG audit or testing every interactive state.
10. Autonomous Work round trip: NOT verified. The business Gmail identity and enabled event-driven task are confirmed, but trigger binding, owner-authenticated private asset access, durable task-edit claiming and a completed refinement/return run are not established. See CHATGPT_WORK_HANDOFF.md. Do not count email receipt as completion.

## Validation

- 560 Node tests passing, including real PostgreSQL via PGlite and controlled Stripe/email/storage simulations.
- Static validation: 939 pages; local links/fragments, unique IDs, titles, language, H1 and authored JS syntax.
- Browser validation: 116 templates, 381 final checks, zero failures; corrected five-template retest: 27 checks, zero failures.
- Dependency audit: zero reported vulnerabilities.
- Live read-only checks: catalog/health 200; unauthenticated orders, owner overview and private handoff export 401; live checkout configured. No successful live payment is claimed.
- No real customer content was exported or publicly exposed. No live charge/refund/purchase, billing change, hosting migration or Actions retry occurred.

## Release steps

Run the existing deployment process after the accepted limitation clears. Apply these migrations in order, then deploy the Edge API and static Firebase build as a coordinated release:

- 20261028034432_work_handoff_notification_reservation.sql
- 20261028034908_payment_refund_event_ordering.sql
- 20261028035042_customer_draft_approval.sql

The customer-approval migration changes the publication gate: do not deploy it without the accompanying API and customer dashboard. Existing published versions remain available; a new or revised version requires customer sign-off.

Do not automatically enable Work handoff. The existing owner-authorized private ZIP workflow is the fallback until its missing access/processing prerequisites are verified. Leaked-password protection remains disabled in the live advisor; this app uses email OTP, and Supabase documents that the protection requires Pro or above. No paid upgrade was made.

**Customer launch:** the staged engineering changes pass the listed checks. Current production should not be certified safe for new purchases until the checkout integrity repair is released and verified. Autonomous Work fulfillment is not launch-certified. Human owner review remains required.

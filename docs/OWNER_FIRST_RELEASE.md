# Awe Concepts — Owner-first website review release

This is a coordinated release. **Do not deploy the new SQL or frontend independently of the corresponding awe-api backend.**

## Implemented
- A paid/generated website remains owner-only until the owner personally improves and releases its exact saved version.
- The owner must save an edited, personally reviewed version before releasing it. A raw automated draft cannot be sent directly.
- Owner releases via **Approve & send to customer** in `/admin`.
- Customer receives an email invitation to the private preview in `/account`, with a shared project progress timeline.
- The customer can request a revision (Starter 1 / Signature 3 / Premium unlimited) or approve that exact unchanged version.
- Customer approval after matching studio preapproval atomically publishes the version and queues delivery; the owner never has to return to publish.
- The owner receives durable notifications for new paid drafts and revision requests, and the admin dashboard groups orders by next action.
- Customer account shows revisions remaining. Server controls revision counts; a forged request cannot exceed them.

## Pre-release verification
1. Run `npm ci`, `npm run build`, `npm run check`, and `npm test` against this branch.
2. Validate an actual Starter and Signature order in Stripe sandbox only, including verified webhook processing. Do not use real payment credentials for QA.
3. Verify a newly paid draft is inaccessible to the customer (API and UI) until the studio releases it, and stays inaccessible after a new owner edit.
4. Test wrong-user, stale-version, duplicate, and post-revision customer approvals. Verify exactly one delivery job per accepted version.
5. Verify first-draft and revision owner notifications, review invitation email, and public delivery email. Distinguish email-provider acceptance from customer inbox delivery.
6. Test Starter: 1 allowed revision and 2nd denied, Signature: 3 allowed and 4th denied, Premium: more than 3 allowed. Ensure the remaining counter updates after each round.
7. Check mobile and desktop client and admin dashboards.

## Release sequencing
- Ensure the published Firebase site and API v93 remain operational before beginning.
- Deploy the **matching updated Supabase `awe-api` bundle and the SQL migration** `supabase/migrations/20261028230000_owner_first_review.sql` as one controlled backend release.
- Deploy Firebase Hosting from the **same tested Git commit**.
- Confirm owner-first gates, checkout availability, reviewer email, and owner dashboard immediately after the coordinated release.
- If any step fails, do not manually publish a customer version or bypass an approval check; preserve the old public site and investigate.

## Compatibility
Existing published websites retain their current `public_version`. Their live link must remain unchanged until another exact version is jointly approved.
Legacy test-mode fixture orders must not trigger real charges or customer messages.
Existing customer orders keep their package snapshots and original pricing. The revision-count rule uses the saved package tier.
New packages have a server-defined revision policy; new customer checkout requires the refreshed package terms version.

## Known scope
Premium/AWE Custom is a separately quoted brief; unlimited revisions apply within the agreed project scope when a Premium order exists.
ChatGPT Work-based autonomous AI refinement remains a separate verification item.

# Awe Concepts current operations

This page supersedes historical Netlify deployment instructions. The current architecture is Firebase Hosting Classic (`awe-digital`) for public static files and Supabase Edge Functions (`hxxplkirfsewqsxodngv`) for the authenticated API. Do not create another hosting project.

## Release and recovery

- Public changes deploy through `.github/workflows/firebase-hosting.yml`. A successful build alone is not a release. Check the Actions deployment result and both hostnames' `/release.json` commit, then the production browser QA results.
- Edge Function changes require a separate deployment of `supabase/functions/awe-api`, retaining its existing JWT setting and application-level authorization. Compare the deployed function files with the intended source. Firebase deployment does not deploy Edge Functions.
- To reverse a public-code regression, revert the relevant GitHub commit and let the existing Firebase workflow rebuild. Verify the release marker and affected route. Avoid rebuilding from an unrelated branch or changing hosting providers.
- To reverse a published customer content change, restore the earlier immutable version as a private draft in the studio, review it, and explicitly approve it again. Do not edit public version records directly.
- Database restore and storage recovery are separate from code rollback. A provider backup/PITR entitlement, recent backup, and successful restore rehearsal have not been verified. Do not claim tested disaster recovery until that evidence exists.

## Payment and fulfillment

1. Compare the customer order with its immutable package snapshot; never infer payment from the checkout return URL.
2. Use Stripe test mode for verification. Correlate Checkout Session, payment intent, webhook event, database payment, and order IDs. Do not create a live charge for QA.
3. A valid payment queues a private generated draft. Review customer materials, image rights, all pages, and mobile layout. Customer private previews and revision requests do not publish the site.
4. Customer requests appear in the owner's order view. Save revised work as a new private draft. Included revision scope comes from the purchased package; do not change it during fulfillment.
5. Approve the exact saved version only after review. Publication queues delivery. Firebase's existing scheduled deployment materializes owner-approved static sites; the public viewer also resolves approved versions.
6. If generation or delivery fails, inspect the order's jobs and provider logs. Correct the underlying problem and use the existing owner retry controls. Check uncertain provider sends before retrying. A delivery row means provider acceptance, not confirmed inbox arrival.
7. Investigate an expired or old locked checkout before any replacement purchase. Do not clear a reservation or mark an order paid by hand. Compare the actual Stripe Session and payment first.

## Customer-owned hosting handoff

Use the account's approved website download. The customer keeps a complete backup, opens hosting and domain accounts in their own name, uploads the complete static folder without renaming assets, tests the hosting preview, and follows that host's domain/DNS instructions. They manage renewals and ongoing services under the purchased terms. This is a static-file handoff, not an automated transfer of Firebase/Supabase accounts. Do not promise integrations, mail delivery, a CMS, or ongoing maintenance that are not in the agreed package.

## Verification boundaries

The automated HTTP/Postgres suite uses simulated external services. Public production browser QA does not sign in, create orders, or send inquiries. Historical test-mode payment records are distinct from a fresh authenticated acceptance run. Retain separate proof for customer and owner UI, declines, checkout abandonment/expiry, webhook retries, actual inbox delivery, external hosting handoff, and recovery rehearsal.

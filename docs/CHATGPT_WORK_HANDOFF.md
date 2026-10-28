# AWE CONCEPTS — ChatGPT Work handoff

This is an **opt-in owner workflow**, not a public AI endpoint or an OpenAI API integration. No AI API charges are introduced.

## Architecture

1. A signed Stripe webhook records a verified paid order.
2. The existing durable generation job creates an immutable private website draft.
3. When `AWE_WORK_HANDOFF_ENABLED=true`, the same job sends a metadata-only notification **only to `contact@aweconcepts.com`** via the existing Resend account.
4. In ChatGPT **Work**, create an event-triggered task for **new Gmail messages** whose subject is exactly `AWE WORK HANDOFF | DRAFT READY`, and optionally filter for your verified Resend sender.
5. The Work task reads the order reference and opens the private owner page. It must obtain an **authorized studio owner session** to access client materials. Gmail alone does **not** grant access to private drafts.
6. The owner can download the draft from its order as a ZIP containing the editable HTML pages, selected approved images, structured design input and editing instructions. Share this only in an approved Work task or conversation.
7. Work returns revisions as a separate artifact. A secure importer for arbitrary AI-edited HTML/JS is **not implemented**; the owner must review and apply changes using the existing Studio editor or an independently validated future importer. Publication always remains an explicit owner action.

## Production configuration

Deploy the source changes first. The feature is **disabled by default**.

In the existing Supabase Edge Function's private environment settings, configure:

- `AWE_WORK_HANDOFF_ENABLED=true` when you have confirmed the correct recipient and trigger.
- `AWE_WORK_HANDOFF_EMAIL=contact@aweconcepts.com` (optional compatibility setting). Any other value is rejected to prevent accidental delivery to a personal mailbox. The destination is fixed to the business address in code.
- `EMAIL_FROM`, `RESEND_API_KEY`, and `SITE_ORIGIN` must already be correctly set for normal fulfillment.
- Optional: `AWE_WORK_HANDOFF_FROM` can be set to a **verified sender** on your Resend domain, ideally distinct from the recipient mailbox. A message sent from `contact@aweconcepts.com` to itself may not behave like a normal incoming email trigger; verify this with a real message.

The Work event-triggered task is already enabled in ChatGPT and restricted by its saved instructions to `contact@aweconcepts.com`. A repository commit cannot grant it access to the owner dashboard.

Suggested task prompt:

> Only when a new email from my verified Awe Concepts delivery sender has the exact subject `AWE WORK HANDOFF | DRAFT READY`: parse the order ID and open the owner-only order link. Never process unpaid or unverified orders. Use only owner-authorized files. If authentication or editable files are unavailable, report the blocker and ask me for the private draft ZIP. Once you have the authorized ZIP, faithfully personalize the chosen template using the customer's approved materials, avoid fabricated claims, preserve template design identity, check desktop and mobile, and return the revised ZIP for owner review. Never publish, send customer emails, change payment details, or expose private documents.

## Safety and limitations

- Notification sends **only order ID, draft UUID and owner-only admin link**. It contains no customer files, preview tokens or credentials.
- Resend's idempotency key and the recorded `work_handoff_email_accepted` event reduce duplicate notifications. Retries can still be needed if a provider is down; the original generation job remains pending until notification succeeds or exhausts attempts.
- The owner-only download route verifies the authenticated owner before exporting a paid private draft.
- The ZIP is not automatically uploaded into Work. Work may require owner login, user approval or a manual file handoff, and plan usage limits still apply.
- Never place raw client documents in an open/public GitHub repository or expose a draft over an unauthenticated URL. Confirm your customer terms and privacy disclosures cover any third-party AI processing before sharing client materials.
- Release gate: test verified Stripe payment → generation → notification in sandbox, then confirm the Gmail trigger runs, and verify a full owner-only export and manual Work edit. No automated client publication should occur.

## Manual deployment checklist (do not skip)

1. Review this pull request and run the GitHub Actions `verify` job, including `npm ci`, `npm run build`, `npm run check`, and `npm test`. Investigate any failures; do not treat failing unrelated Cloudflare or Netlify checks as proof the Firebase/Supabase release passed or failed.
2. Merge the approved PR into `main` only after its relevant checks pass. Deploy the **static Firebase site** from `main` using the existing approved manual deployment process. The owner dashboard UI changes alone do not enable handoff.
3. Deploy the updated `awe-api` **Supabase Edge Function** from the merged `main` source. This is essential: the payment worker and authenticated private ZIP route run in the Edge Function, not just Firebase Hosting. Do not expose any Supabase service-role key in browser files.
4. In the Supabase Edge Function's server-side secrets, confirm `RESEND_API_KEY`, `EMAIL_FROM`, `SITE_ORIGIN=https://aweconcepts.com`. Set `AWE_WORK_HANDOFF_EMAIL=contact@aweconcepts.com` (optional) and `AWE_WORK_HANDOFF_FROM` if using a verified notification alias. Only then set `AWE_WORK_HANDOFF_ENABLED=true`.
5. Use an **authorized sandbox order and verified Stripe test webhook** to generate a new private draft. Confirm the business inbox receives the exact subject `AWE WORK HANDOFF | DRAFT READY` **once**, and that Work actually starts. Do not send an artificial subject-matching email with a fake order ID to the live trigger.
6. Log into `https://aweconcepts.com/admin.html` as the owner, open the sandbox order, and confirm **Download private draft for ChatGPT Work** produces a ZIP with all expected pages and approved images. Verify that unauthenticated users and unpaid orders cannot access the export.
7. Work must still authenticate as the owner or request the authorized ZIP. Automatic AI-edited ZIP **reimport is not implemented**. Treat any Work result as a separate private revision and review it manually; do not publish without approval.

**Rollback:** Set `AWE_WORK_HANDOFF_ENABLED=false` in the Edge Function secrets and redeploy/restart as required by the provider. The Work task can be paused separately. Disabling the handoff does not affect existing Stripe verification or customer-approved publishing.

### Manual CLI deployment (after local tests pass)

Run in a terminal with the repository checked out and authenticated access to the **existing** Firebase and Supabase projects. If the feature branch has not been merged, check out `feature/chatgpt-work-handoff-2026-10-26` explicitly. The commands below do not create new projects.

```bash
npm ci
npm run build
npm run check
npm test

# Deploy the server first. Stripe webhooks require the existing JWT bypass
# configuration; do not silently change that setting during deployment.
npx supabase functions deploy awe-api --project-ref hxxplkirfsewqsxodngv --no-verify-jwt

# Deploy only the public static build, never the repository root.
npx firebase-tools deploy --only hosting --project awe-digital
```

**Stop if any command fails.** In particular, do not deploy after a failed test. The existing GitHub Actions runs are currently failing before any useful job steps/logs are available; run the above tests in a local terminal or Cloud Shell and inspect the real error output before deploying. The Work email trigger is enabled, but the backend handoff remains disabled until `AWE_WORK_HANDOFF_ENABLED=true` is explicitly set.

The two deployment commands update production services; review their effects and confirm the project identifiers before running them. To keep the business inbox isolated, use a verified Resend sender different from `contact@aweconcepts.com` when possible.

# AWE CONCEPTS — ChatGPT Work handoff

This is an **opt-in owner workflow**, not a public AI endpoint or an OpenAI API integration. No AI API charges are introduced.

## Architecture

1. A signed Stripe webhook records a verified paid order.
2. The existing durable generation job creates an immutable private website draft.
3. When `AWE_WORK_HANDOFF_ENABLED=true`, the same job sends a metadata-only notification to `AWE_WORK_HANDOFF_EMAIL` via the existing Resend account.
4. In ChatGPT **Work**, create an event-triggered task for **new Gmail messages** whose subject is exactly `AWE WORK HANDOFF | DRAFT READY`, and optionally filter for your verified Resend sender.
5. The Work task reads the order reference and opens the private owner page. It must obtain an **authorized studio owner session** to access client materials. Gmail alone does **not** grant access to private drafts.
6. The owner can download the draft from its order as a ZIP containing the editable HTML pages, selected approved images, structured design input and editing instructions. Share this only in an approved Work task or conversation.
7. Work returns revisions as a separate artifact. A secure importer for arbitrary AI-edited HTML/JS is **not implemented**; the owner must review and apply changes using the existing Studio editor or an independently validated future importer. Publication always remains an explicit owner action.

## Production configuration

Deploy the source changes first. The feature is **disabled by default**.

In the existing Supabase Edge Function's private environment settings, configure:

- `AWE_WORK_HANDOFF_ENABLED=true` when you have confirmed the correct recipient and trigger.
- `AWE_WORK_HANDOFF_EMAIL`: the Gmail mailbox connected to your ChatGPT Work event-triggered task.
- `EMAIL_FROM`, `RESEND_API_KEY`, and `SITE_ORIGIN` must already be correctly set for normal fulfillment.

Configure your Work task in Work on web or mobile. A repository commit cannot create the Work task or grant it access to the owner dashboard.

Suggested task prompt:

> Only when a new email from my verified Awe Concepts delivery sender has the exact subject `AWE WORK HANDOFF | DRAFT READY`: parse the order ID and open the owner-only order link. Never process unpaid or unverified orders. Use only owner-authorized files. If authentication or editable files are unavailable, report the blocker and ask me for the private draft ZIP. Once you have the authorized ZIP, faithfully personalize the chosen template using the customer's approved materials, avoid fabricated claims, preserve template design identity, check desktop and mobile, and return the revised ZIP for owner review. Never publish, send customer emails, change payment details, or expose private documents.

## Safety and limitations

- Notification sends **only order ID, draft UUID and owner-only admin link**. It contains no customer files, preview tokens or credentials.
- Resend's idempotency key and the recorded `work_handoff_email_accepted` event reduce duplicate notifications. Retries can still be needed if a provider is down; the original generation job remains pending until notification succeeds or exhausts attempts.
- The owner-only download route verifies the authenticated owner before exporting a paid private draft.
- The ZIP is not automatically uploaded into Work. Work may require owner login, user approval or a manual file handoff, and plan usage limits still apply.
- Never place raw client documents in an open/public GitHub repository or expose a draft over an unauthenticated URL. Confirm your customer terms and privacy disclosures cover any third-party AI processing before sharing client materials.
- Release gate: test verified Stripe payment → generation → notification in sandbox, then confirm the Gmail trigger runs, and verify a full owner-only export and manual Work edit. No automated client publication should occur.

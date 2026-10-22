# AWE / DIGITAL — Firebase Hosting Classic (free Spark plan)

This setup deploys **only the public front-end**. Netlify Functions are not portable to Firebase Hosting Spark and are deliberately **not deployed or silently replaced**. API-backed account operations, order submission, private drafts, uploaded files, payments, published customer sites, Stripe webhooks and scheduled jobs remain unavailable until those server routes are explicitly migrated and tested in Supabase Edge Functions (or a separately approved server).

## Step 1 — Create the project, no billing

1. Visit https://console.firebase.google.com/ with your Google account.
2. **Create a project**. Use a name such as AWE DIGITAL; the generated *project ID* must be unique.
3. Stay on **Spark (Free)**. Do **not** choose App Hosting or enable Blaze / Cloud Billing.
4. Open **Build > Hosting** and select **Get started** (Hosting Classic). Do not initialize a replacement website in a new repository.
5. Copy the exact Firebase **project ID** (not the display name). It identifies your temporary URLs `https://PROJECT_ID.web.app` and `https://PROJECT_ID.firebaseapp.com`.

## Step 2 — Connect automatic deployments from GitHub

### Browser-only setup for the existing awe-digital project

No ChatGPT desktop app or Firebase plugin is required. Open https://shell.cloud.google.com/ in your own browser and sign in with the Google account that owns `awe-digital`. Cloud Shell itself is free. Do not start a paid trial, attach billing, or upgrade the Firebase Spark plan.

Install GitHub CLI if needed, then authenticate directly with GitHub:

```bash
command -v gh >/dev/null || (sudo apt-get update && sudo apt-get install -y gh)
gh auth login --hostname github.com --git-protocol https --web
```

Follow the GitHub CLI browser authorization instructions using `Damilolawe`. Keep any sign-in code in that official GitHub flow, never in chat. Then download and run the repository's setup script:

```bash
gh api -H 'Accept: application/vnd.github.raw+json' \
  'repos/Damilolawe/My-Website/contents/scripts/setup-firebase-cloud-shell.sh?ref=main' \
  > /tmp/awe-firebase-setup.sh && bash /tmp/awe-firebase-setup.sh
```

Review `scripts/setup-firebase-cloud-shell.sh` before running. It verifies your repository access, enables the IAM and Hosting APIs, provisions the Classic Hosting site if missing, and creates the dedicated `github-hosting@awe-digital.iam.gserviceaccount.com` service account. The only project roles it grants are Hosting Admin and API Keys Viewer, as needed by the existing live deployment action. It does not grant Authentication Admin, Cloud Run roles, project Editor, or Owner.

The script sends the JSON key directly to GitHub's encrypted `FIREBASE_SERVICE_ACCOUNT` secret and deletes its local temporary copy. If upload fails, it attempts to revoke the unused key. An existing secret is retained on reruns. It sets `FIREBASE_PROJECT_ID=awe-digital` and dispatches the existing workflow on `main`. No application files or backend configuration are changed. GitHub Actions uses your existing account allowance; no paid service or spending limit is enabled.

`SETUP COMPLETE` means the workflow was requested, not that the website was deployed. Inspect the build, checks, and actual deployment step before claiming success. If permission, organization policy, or free quota blocks setup, stop and report the error; do not enable billing or weaken policy.

GitHub repository: https://github.com/Damilolawe/My-Website

This repository includes `firebase.json` pointing to the output from `npm run build`, and `.github/workflows/firebase-hosting.yml` which builds, runs checks and deploys on new commits to `main` once configured.

### Required GitHub repository variable

Under **Settings > Secrets and variables > Actions > Variables**, add a **repository variable**:

- Name: `FIREBASE_PROJECT_ID`
- Value: the exact project ID from the Firebase console.

### Required GitHub Actions secret

Create a **dedicated deployment service account** for Firebase Hosting in the matching Google Cloud project. Follow the official Firebase Hosting GitHub integration documentation for the permissions needed by the `FirebaseExtended/action-hosting-deploy` action: https://firebase.google.com/docs/hosting/github-integration and https://github.com/FirebaseExtended/action-hosting-deploy/blob/main/docs/service-account.md. Use the minimum permissions needed; do not reuse an account admin key for app traffic.

Save the entire service account JSON key in **GitHub > Settings > Secrets and variables > Actions > Secrets**, as:

- Name: `FIREBASE_SERVICE_ACCOUNT`
- Value: **entire service-account JSON**. Enter directly into GitHub's secret editor, **never** in ChatGPT, git, `firebase.json`, `config.js`, commit messages or the public website.

The workflow fails explicitly until both values exist. Older runs could show green with the notice 'Firebase deployment has NOT run'; those runs did **not** publish the site.

Then use **GitHub > Actions > Firebase Hosting (AWE / DIGITAL) > Run workflow** and inspect the deploy step. The site should appear at `https://PROJECT_ID.web.app`. Subsequent merges into `main` deploy automatically after passing build and tests.

Alternative: use **Firebase CLI** `firebase init hosting:github` from a cloned repository after creating the Firebase project. The Firebase CLI can create and securely upload the GitHub service account secret automatically. If choosing the CLI, review its generated workflow to avoid duplicate production deployments with this repository's existing workflow.

## Step 3 — Confirm the static site

Verify these pages in a real browser and on mobile:

- `/` — agency homepage and unobstructed showcase
- `/why-awe.html` — the expanded comparison walkthrough
- `/order.html` — the Express configurator's **preview** steps (ordering deliberately unavailable without backend)
- `/templates/actor/playbill.html`
- `/templates/student/terminal.html`
- `/templates/business/bloom.html`

Use only `dist/` as the deploy root. The 20 designs and public fictional previews are static; none of the private Netlify Functions should be copied into the public directory. Firebase static Hosting does not evaluate the old Netlify `_headers` file, so the important security headers are explicitly reproduced in `firebase.json`. Frame restrictions remain in place; sandboxed `srcdoc` preview logic is preserved.

## Step 4 — Backend migration (separate release)

Before accepting customers or handling private records, migrate the current Netlify server endpoints:

- `/api/*` — authenticated customer session, order, upload, owner admin, drafts, resume previews and payment operations
- `/sites/*` — publication routes with verified approvals and public asset allowlisting
- `netlify/functions/webhook.mjs` — validated Stripe test-mode webhook, idempotent payment events
- `netlify/functions/worker.mjs` — scheduled processing and private job dispatch

Maintain origin checks, authorization, private asset boundaries, disabled live charges and version approvals. Use Supabase Edge Functions or a separately approved backend. A static Firebase deploy **alone does not make checkout, customer login, or private publishing functional**. Do not open orders until the migrated backend passes end-to-end tests.

## Free-tier operational boundaries

Firebase Hosting Classic Spark has no per-production-deploy credit like Netlify, but still has storage/transfer allowances; use Firebase's current pricing page for exact limits. GitHub Actions minutes have their own quotas. Stay on Spark to avoid accidental Firebase billing; if usage caps are reached, service can become unavailable until reset.

To manage automatic deployments without unnecessary builds, keep all work on feature branches and merge reviewed changes into `main` only when ready for production.


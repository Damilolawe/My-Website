# Temporary automatic Firebase releases: Cloudflare Pages (through Nov 1, 2026)

## What this does

Cloudflare Pages Git integration supplies the build machine while Firebase Hosting Classic remains the **only** customer-facing host (`aweconcepts.com`, `awe-digital.web.app`). Cloudflare hosts a noindex redirect stub. Nothing changes in DNS, checkout, Supabase, or the Firebase billing plan.

Cloudflare Pages free plan currently allows 500 builds/month, subject to its applicable terms and 20-minute build timeout. This uses no GitHub Actions minutes. It intentionally deploys only reviewed commits on `main`; feature/PR branches do not touch Firebase.

## One-time account setup

1. In Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git, sign in/authorize GitHub and select **only** `Damilolawe/My-Website`. Create a *new* Pages project named `awe-firebase-temporary-builder` (or similar). Do **not** change DNS, domains, registrar, or Firebase.
2. Set production branch: `main`. Choose no framework preset. Root directory: repository root. **Build command:** `bash scripts/deploy-via-cloudflare-pages.sh`. **Build output directory:** `cloudflare-deploy-stub`.
3. Set Node build environment variable `NODE_VERSION=22`. Under Pages project Settings > Builds & deployments, turn **preview branch builds OFF** to conserve the free quota.
4. Create a narrowly scoped Firebase Hosting deploy service account in Google Cloud project `awe-digital` (see below). Store its JSON key securely in the **Cloudflare Pages project build environment** as encrypted variable `AWE_FIREBASE_SERVICE_ACCOUNT_JSON`. Never put it in GitHub commits, chat, Pages public files, screenshots, or logs.
5. Add the non-secret Pages project build variable `AWE_CF_FIREBASE_ENABLED=true` to **production** only. Verify that encrypted secrets are available to your Pages build command before allowing a production build.
6. Trigger one production deployment from Cloudflare Pages and inspect build output. Confirm the complete source commit SHA matches `https://aweconcepts.com/release.json` and `https://awe-digital.web.app/release.json`. Only call automation operational after successful verification.

### Create a least-privilege service account

Use **Google Cloud Shell** signed into the Google account that owns `awe-digital`. These are one-time commands; the service-account key must remain private:

```bash
PROJECT=awe-digital
SA=cf-temp-hosting-deployer
gcloud config set project "$PROJECT"
gcloud iam service-accounts create "$SA" --project "$PROJECT" --display-name="Temporary Cloudflare to Firebase Hosting deployer"
ACCOUNT="$SA@$PROJECT.iam.gserviceaccount.com"
gcloud projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:$ACCOUNT" --role="roles/firebasehosting.admin"
gcloud projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:$ACCOUNT" --role="roles/serviceusage.apiKeysViewer"
gcloud iam service-accounts keys create ~/cf-temp-firebase-key.json --iam-account "$ACCOUNT" --project "$PROJECT"
```

From Cloud Shell, securely transfer the JSON key into the Cloudflare project's encrypted build variable. **Do not paste the key into chat, a command argument, or a source file**, and delete the downloaded/temporary copy after Cloudflare confirms the variable is saved. If your organization prohibits service-account JSON keys, stop and configure short-lived workload identity instead.

## Security and verification

- Only Cloudflare Pages `main` builds with the expected 40-character SHA and explicit opt-in can publish.
- Builds run `npm ci`, `npm run build`, `npm run check`, `npm test`, approved-site materialization, safety audit, and production CORS smoke tests before Firebase deploy.
- An ephemeral service account JSON is written as a 0600 temporary file in the isolated build container and deleted on exit.
- `firebase-tools` version is pinned. The same `dist/` site is deployed to the **existing** Firebase Hosting project; no new Firebase project or Blaze plan.
- Failures must not be bypassed by skipping checks. Keep last known good live version if a subsequent run fails.
- Cloudflare automatically publishes a separate static redirect placeholder to its own `.pages.dev` hostname. Do not attach `aweconcepts.com` to it.

## After GitHub minutes reset (November 1)

1. Check that the original `.github/workflows/firebase-hosting.yml` can deploy successfully again; the GitHub workflow still requires valid repository variable `FIREBASE_PROJECT_ID=awe-digital` and secret `FIREBASE_SERVICE_ACCOUNT`.
2. **Before** allowing GitHub pushes to deploy, turn `AWE_CF_FIREBASE_ENABLED` off in Cloudflare Pages (or disable its production branch builds) to prevent duplicate/racing deployments.
3. Delete the temporary Cloudflare Pages project and revoke/delete the temporary Google Cloud service-account key/account. Review Cloudflare environment variables to make sure the key no longer exists.
4. The temporary GitHub script/docs can be removed in a separate cleanup PR.

### Known external setup dependency

The Cloudflare account and Firebase key cannot be configured from source-code commits alone. The script is **prepared**, not active, until the owner completes the one-time Cloudflare Git integration and encrypted credential setup and a live release is verified.
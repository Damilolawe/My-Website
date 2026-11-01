# Awe Concepts branded public previews

Public domain (after Firebase and DNS are connected): **https://preview.aweconcepts.com/**
Kappo Sono concept: **https://preview.aweconcepts.com/kappo-sono/**
Otaku Haven independent concept: **https://preview.aweconcepts.com/otaku-haven/**

These URLs are **not active until the separate Firebase Hosting site, custom domain and DNS records are confirmed**.

## Independent Firebase site — no replacement of production

- Firebase project: `awe-digital` (existing).
- Default live hosting: `awe-digital` → `https://aweconcepts.com` (leave unchanged).
- Dedicated second Hosting site ID: `awe-concepts-previews`.
- GitHub Action deploy target: `previews`, rooted at `branded-previews/`.
- Firebase action: `.github/workflows/branded-previews.yml`; deploys **only** target `previews` with `channelId: live`.
- The script `node scripts/build-branded-previews.mjs` writes the allowlisted site to `branded-previews/public`.

## One-time setup

1. Ensure GitHub repo variable `FIREBASE_PROJECT_ID` equals `awe-digital`, and its encrypted `FIREBASE_SERVICE_ACCOUNT` secret is present with **Firebase Hosting Admin** permissions. Never place its JSON in a commit.
2. Trigger **Branded Awe Concepts public previews** in GitHub Actions (or merge a change to the watched files). The workflow checks for the secondary site and creates `awe-concepts-previews` if missing. It does not modify the production Hosting site.
3. From [Firebase Hosting](https://console.firebase.google.com/project/awe-digital/hosting), select the new secondary site and choose **Add custom domain** → `preview.aweconcepts.com`. Do **not** choose redirect.
4. At the DNS host for `aweconcepts.com`, add **exactly** the TXT verification and A/AAAA/CNAME records displayed by Firebase for the *preview* subdomain. Host is generally `preview`, but follow your DNS provider's formatting; do not change apex or existing `www` records. Keep any ownership TXT record Firebase requires. Never copy guessed DNS addresses from this README.
5. Wait until Firebase reports the domain **Connected**, HTTPS is ready and `https://preview.aweconcepts.com/kappo-sono/` loads with a styled header, working logo, menu, gallery and visit page. Firebase's automatic certificate provisioning can take up to 24 hours.

## Protect customer work

This is intentionally a **public example** host, not a secure client review portal. `noindex`, `robots.txt` and disabling indexing are **not authentication**. Never copy paid client draft websites, account records, contact details or unapproved designs into `branded-previews/public`. For private customer previews use the existing authenticated client dashboard or a separately secured authenticated solution.

## Deployment maintenance

Otaku Haven's public concept has a conspicuous independence disclosure and links to the real app. Obtain the brand owner's approval before commercial publication or reuse of official assets.

- Only files on the allowlist in `scripts/build-branded-previews.mjs` are published.
- To add a public concept, obtain permission and add it to the explicit allowlist, with a suitable business-consent disclosure and automated tests.
- Never replace `firebase.json` in the repository root with this site's `branded-previews/firebase.json`.
- Do not point `preview.aweconcepts.com` at `aweconcepts.com` using a redirect. Connect it to the **secondary** Firebase site.
- If GitHub Actions fails, use its first error step to distinguish missing GitHub secrets, a Hosting site-create permissions failure, or the deployment process.

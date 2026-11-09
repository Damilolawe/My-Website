# CLAUDE.md — Awe Concepts Preview Websites

Permanent project instructions for Claude Code sessions in this repo. Read this first,
then `PROJECT_PROGRESS.md` and `SITE_STATUS.json`, then reconcile against the actual repo.

## 1. Identity & objective
Awe Concepts builds premium, **independent, unofficial** website *concepts* for prospective
small-business clients (NYC / Long Island), to showcase what a custom site could look like.
Each preview is a design study — not operated by or endorsed by the featured business.

**Current assignment:** redesign/refine **19 existing** previews + build personalized sites for
**up to 52 new prospects** (target 71), subject to verification. See `PROJECT_PROGRESS.md`.

## 2. Repository & hosting
- Repo: `Damilolawe/My-Website`. Default branch `main`. Active work branch: `claude/zen-shannon-fudw2d`.
- Live preview host: **https://preview.aweconcepts.com** = Firebase Hosting site `awe-concepts-previews`
  (project `awe-digital`, target `previews`, entryPoint `branded-previews/`).
- Deploy workflow: `.github/workflows/branded-previews.yml` (push to `main`, or `workflow_dispatch`).
  It builds → runs tests → prunes to the allowlist → deploys to channel `live`. Needs repo secret
  `FIREBASE_SERVICE_ACCOUNT` + var `FIREBASE_PROJECT_ID=awe-digital` (already configured).
- **Do not** modify production `aweconcepts.com`, Stripe, or Supabase. Do not deploy just to save a checkpoint.

## 3. Architecture
- Each preview lives in `preview/<slug>/` — typically `index.html` + `styles.css` (+ optional own `site.js`, `assets/`).
- Build (all source sites): `node scripts/build-branded-previews.mjs` → writes `branded-previews/public/`
  (gitignored). Sites are listed in the `batchOneSlugs` array + the "recovered" set in that script.
- Publish restriction (what actually goes live): `node scripts/publish-selected-previews.mjs` prunes
  `branded-previews/public/` to **exactly** the allowlist `qa/active-previews-allowlist.json`.
  Archived sources stay in GitHub but are pruned from live Hosting, index, sitemap and manifest.
- Isolated single-site build + QA (preferred while iterating — does NOT rebuild all sites):
  `node scripts/build-one-preview.mjs <slug>` → `artifacts/one/<slug>/public/<slug>/`.
- Shared behaviour: sites without their own `preview/<slug>/site.js` use `preview/prospect-shared/site.js`
  (handles `[data-menu]`/`[data-nav]` mobile menu via `.open`, and `[data-reveal]`→`.seen` scroll reveal
  with a `navigator.webdriver` + reduced-motion fallback so content shows without scripting). Prefer this
  shared script; a bespoke IntersectionObserver-only `site.js` hides below-fold content in static captures.

## 4. Non-negotiable build/design rules
- **Verified content only. Never fabricate** menus, prices, hours, addresses, staff bios, histories or testimonials.
- Doctype `<!doctype html>` at the very start; include `</head>` and `</body>` (the Awe credit is injected there).
- `index.html` must reference `./styles.css` and `./site.js` (relative). **No inline `<script>`** (preview CSP blocks it).
- **No emoji / arrows / dingbats / variation selectors** in html/css/js (ranges U+1F000–1FAFF, U+2190–21FF,
  U+2600–27BF, U+FE0E/FE0F, U+200D). Use SVG or CSS shapes. Enforced by `scripts/validate-preview-icons.mjs`.
- **Images:** only CSP-allowed origins. The live preview CSP (`branded-previews/firebase.json` `img-src`) allows
  `images.unsplash.com`, `images.pexels.com`, `images.squarespace-cdn.com`, `static.wixstatic.com`,
  `cdn-s.acuityscheduling.com`, `*.cdninstagram.com`, `*.fbcdn.net`, `data:`, `self`. **Prefer `images.unsplash.com`.**
  Verify any new image returns HTTP 200 and actually depicts its subject before use (render a contact sheet).
  No competitors' photos/logos. No broken images or placeholder captions.
- **Links:** never link to the business's own/original website or to a competitor as a substitute. Instagram,
  Google/Apple Maps and `tel:` are fine. `scripts/preview-link-policy.mjs` / build-one flags original-site links.
- Keep the **"Designed by Awe Concepts"** footer (auto-added by `shared/brand-credit.mjs`) linking to aweconcepts.com.
- Previews must read as independent/unofficial concepts (meta `robots: noindex,nofollow`).
- **Distinctiveness:** each site needs a genuinely different *compositional archetype* (navigation, hero
  structure, section rhythm, motion) — not just different fonts/colors on one template. Google Fonts load from
  `fonts.googleapis.com` / `fonts.gstatic.com` (CSP-allowed).

## 5. QA (required before marking a site done)
- Build the site, then capture **real browser screenshots** at desktop **1440×900** and mobile **390×844**,
  and **visually inspect** them. Check: 0 horizontal overflow, all images load (watch for empty `src`/lazy
  placeholders that are intentional, e.g. a lightbox `#lb-image`), 0 console errors, no overlap/clipping,
  correct branding, working nav/links, reduced-motion respected.
- Chromium + Playwright are preinstalled; `require('/opt/node-tools/node_modules/playwright')` works. A reusable
  screenshot harness (serve a root, scroll to trigger reveals, screenshot both viewports, report overflow/broken
  images/console errors) is the practical approach. Sites using absolute asset paths (e.g. `/mesa-bar/styles.css`)
  must be QA'd from a full build output (`QA_ROOT=branded-previews/public`), not `build-one`.
- CI test suite (run before pushing): `node --test --test-concurrency=1 tests/active-previews-allowlist.test.mjs
  tests/branded-previews.test.mjs tests/preview-image-csp.test.mjs tests/preview-no-pictographs.test.mjs
  tests/preview-original-link-policy.test.mjs tests/large-scale-batch-one.test.mjs` (+ the per-site tests the
  workflow runs). `tests/branded-previews.test.mjs` asserts the build output matches an **exact** file list, so a
  **new** slug must be added to `batchOneSlugs` in BOTH `scripts/build-branded-previews.mjs` AND that test.

## 6. Publishing a new verified prospect
1. Verify the business is real, has **no independent website**, and has enough public detail to build without
   fabrication. Record the source. If unverifiable or it already has a site → do not publish; log the reason.
2. Create `preview/<slug>/index.html` + `styles.css` (verified content only).
3. Add `<slug>` to `batchOneSlugs` in `scripts/build-branded-previews.mjs` **and** `tests/branded-previews.test.mjs`.
4. Add an entry to `qa/active-previews-allowlist.json` (group `new-prospect`, with `verification`).
5. Add `preview/<slug>/**` to the path triggers in `.github/workflows/branded-previews.yml`.
6. Full build + publish locally, run the CI tests, QA the site, commit, then deploy via the workflow and verify live.

## 7. Progress tracking & session recovery (mandatory)
- Sources of truth: **`PROJECT_PROGRESS.md`** (narrative + next steps), **`SITE_STATUS.json`** (per-site machine
  record), and the detailed `qa/71-target-production-progress.json`.
- **Update them at every meaningful checkpoint** (research, build, QA, repair, deploy) — not only at the end.
  Never mark anything complete without verification evidence. Commit + push checkpoints to the work branch.
- **On starting any session / after compaction:** (1) read CLAUDE.md, PROJECT_PROGRESS.md, SITE_STATUS.json;
  (2) `git log --oneline -15` and `git status`; (3) reconcile saved progress vs. the real repo + live manifest
  (`curl -s https://preview.aweconcepts.com/preview-manifest.json`); (4) identify the last verified checkpoint;
  (5) **resume the outstanding task — do not restart or redo completed work.**

## 8. Useful commands
```bash
node scripts/build-one-preview.mjs <slug>          # isolated build of one site
node scripts/build-branded-previews.mjs            # build all source sites -> branded-previews/public
node scripts/publish-selected-previews.mjs         # prune public output to the allowlist (22 active)
curl -s https://preview.aweconcepts.com/preview-manifest.json   # inspect live deployment
gh api -X POST repos/Damilolawe/My-Website/actions/workflows/branded-previews.yml/dispatches -f ref=<branch>  # run deploy
```
Git: develop on `claude/zen-shannon-fudw2d`; commit with clear messages; push with `-u origin <branch>`; never
force-push or overwrite unrelated work; never commit secrets. Do not push to `main` without explicit permission.

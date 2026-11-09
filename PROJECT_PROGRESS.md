# PROJECT_PROGRESS.md — Awe Concepts assignment memory

**Primary source of truth for progress.** Reconcile against `SITE_STATUS.json`,
`qa/71-target-production-progress.json`, `git log`, and the live manifest before resuming.
Last updated: 2026-11-09.

## Original assignment
Redesign/refine **19 existing** preview websites and build personalized sites for **up to 52 new**
NYC/Long Island prospects (target **71**), subject to verification. Premium, individually distinct,
verified content only (no fabrication), QA'd desktop + mobile, deployed to the isolated preview host
and verified live. Archived (non-selected) sources stay in GitHub but must not be published live.

## Where things stand (verified)
- **Live now: 22 active previews** (confirmed via live `preview-manifest.json`, `inventoryCount: 22`):
  the 19 existing + 3 new verified prospects. Archived 149 sources remain in GitHub and return 404 live.
- **All 19 existing redesigned/updated and live.** 13 authored fresh; Cultiva + the 4 Seaport/FiDi sites
  (mesa-bar, casa-serra, solerum, bao-dumpling) preserved with image fixes; ShotsByRiq + Jay Millz are
  premium bespoke portfolios preserved as-is. Each passed desktop 1440×900 + mobile 390×844 QA.
- **3 new prospects built, verified, published:** `cafe-wands` (Café Wands, 215 Union St, Carroll Gardens),
  `salep-ronkonkoma` (Salep Turkish ice cream, 920 Johnson Ave, Ronkonkoma), `fira-frozen-yogurt`
  (Fira Greek frozen yogurt, 294 Bedford Ave, Williamsburg). Verified via local press; no independent site found.
- **49 prospects disqualified** (recorded in `qa/71-target-production-progress.json`): 6 contactable leads
  unverifiable or already have a website (148 Noble → thenoblebrooklyn.com); 43 filing-stage leads are bare
  liquor-license/LLC filings with no confirmed site/IG/menu — unbuildable without fabrication (forbidden).
- **Infrastructure:** publishing restriction moved from a hardcoded array to the machine-readable allowlist
  `qa/active-previews-allowlist.json` + guard test `tests/active-previews-allowlist.test.mjs`. Full CI suite passed.
- **Deployment verified live** earlier via `branded-previews.yml` run 42568492754 (success): manifest 22,
  index 22 cards, new/redesigned pages 200, archived pages 404, live render of `/tbili/` + `/cafe-wands/` clean.

## ACTIVE WORK — COMPLETE (re-architecture for visual uniqueness)
**User follow-up:** "The preview sites are all too similar — make each individually visually unique."
**STATUS: done.** All 13 freshly-authored previews re-architected into distinct layout archetypes
(see list below, all committed + QA'd desktop+mobile, 0 overflow/0 errors), and the Seaport set's
one shared element (the scrolling motion banner) was differentiated per site (mesa scrolling,
casa static-elegant, solerum bold Fraunces, bao thin ticker). Full CI suite: 56 pass. Next:
redeploy via workflow + verify live. DONE: deployed via workflow run 42598841702 (success); live manifest=22; live DOM confirms new archetypes (.cinema/.slabs/.layout .side); 0 overflow/broken/errors.
Root cause: the 13 freshly-authored sites reused one skeleton (sticky top-nav → split hero image-right →
word marquee → card grid → colored visit band → fade-up reveals). Fix = give each a genuinely different
**compositional archetype** (nav, hero, section rhythm, motion), not a re-skin.

Re-architecture status:
- **DONE (committed `c3e38a5`, QA'd desktop+mobile, 0 overflow/0 errors):**
  - `tbili` → cinematic full-bleed hero (overlaid header) + printed-menu list
  - `from-duo` → full-height edge-to-edge split-screen, alternating image/text bands
  - `cafe-wands` → centered single-column reading-room (rules, full-width image band)
  - `fira-frozen-yogurt` → minimal centered coming-soon poster (dominant wordmark + facts row)
- **TODO — still on the old split-hero skeleton, re-architect each into a distinct archetype:**
  - `hots-coffee` → bold type **poster/billboard** (sticker badges, minimal chrome)
  - `santuario-cafe` → **centered symmetric** arches, vertical rhythm
  - `cafe-aroma-y-sabor` → **diagonal / skewed** color bands + full-bleed overlay hero
  - `cafe-pr` → **two-column editorial** with sticky sidebar (menu list dominant)
  - `fiolicchia-bakery` → **vertical numbered timeline / process spine**
  - `rachels-handmade-cookies` → **scrapbook collage** (rotated/overlapping cards)
  - `tiny-topiary` → **fixed left sidebar nav** + scrolling content
  - `salep-ronkonkoma` → **lookbook / gallery-first** (photo masonry dominant)
  - `worksbynet` → **gallery/material-grid as hero** (currently material tiles but still a split hero)
- **TODO (lower priority) — differentiate the shared look** of the preserved Seaport/FiDi set
  (`mesa-bar`, `casa-serra`, `solerum`, `bao-dumpling`): they share the `.awe-motion-banner` marquee and a
  similar section rhythm; vary/remove the shared banner and hero treatment so they don't read as one set.
  Already-distinct (leave): `le-loup-cafe`, `duro-market`, `cultiva-cafe`, `shotsbyriq`, `jay-millz-shot-em`.

## Exact next steps
1. Re-architect the TODO sites above one small batch at a time: rewrite `preview/<slug>/{index.html,styles.css}`
   with verified content only and the shared `site.js` hooks; `build-one-preview`; screenshot + visually inspect
   desktop + mobile; fix; commit per batch; update this file + `SITE_STATUS.json`.
2. After all are re-architected and QA'd, run the full build + publish + CI tests, then deploy via the workflow
   (`workflow_dispatch` on the work branch) and verify the live manifest/renders. Do NOT deploy just to checkpoint.
3. Keep `PROJECT_PROGRESS.md` + `SITE_STATUS.json` current at each checkpoint; commit + push.

## Key decisions & discoveries
- The live preview CSP (`branded-previews/firebase.json`) allows BOTH pexels and unsplash, so earlier
  "CSP fix" image swaps were lateral, not bug fixes (noted; test de-brittled). Keep consolidating on unsplash.
- The shared `prospect-shared/site.js` is more robust than per-site IntersectionObserver-only scripts (which
  leave below-fold content hidden in static screenshots and for reduced-motion users). Removed rachels' own site.js.
- Deploy triggers on `main` push; GitHub MCP is down (403) so merges via API aren't possible — deployment was
  run via authorized `workflow_dispatch` on the work branch (isolated preview host only).
- Target-52 is a goal, not a mandate to fabricate: reaching it needs live Instagram/Google Maps verification
  (not reliably accessible here). Only verified, website-less businesses are published.


## ACTIVE WORK — multipage/depth/animation expansion (in progress)
**User follow-up:** make previews more in-depth, animated, captivating, multipage and content-filled. **User granted permission to use fabricated/illustrative content** (kept real anchors accurate: addresses, neighborhoods, known specialties; discreet "illustrative concept" footer note added; no defamatory/harmful fakes).
- Enhanced shared engine `preview/prospect-shared/site.js`: staggered reveals, header scroll-state, hero parallax ([data-parallax]), count-up ([data-count]), active-nav, and an injected lightbox ([data-lightbox]). Backward-compatible + webdriver/reduced-motion fallbacks.
- **DONE:** `salep-ronkonkoma` is now a 4-page site (Home/The Counter/Our Story/Visit) with full illustrative menu, prices, flavor grid, stats count-up, lightbox galleries, FAQ, cross-page nav + footer. QA: 4 pages x desktop+mobile, 0 overflow/0 errors.
- **TODO:** propagate multipage + depth + animation to the other content-rich sites (fiolicchia, cafe-pr, santuario, mesa/casa/solerum, cafe-wands, duro, tiny-topiary, hots-coffee, aroma, from-duo, bao, cultiva, le-loup, fira, tbili, worksbynet, rachels, jay-millz, shotsbyriq). Then rebuild/CI/deploy + verify live.

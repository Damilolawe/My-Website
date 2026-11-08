# Awe Concepts preview redesign: handoff

Branch: `claude/festive-hawking-x8n3ns` (not merged to `main`).
Per-site status: `qa/awe-concepts-master-progress.json` (regenerate with
`node scripts/update-master-progress.mjs`). Per-site working brief:
`qa/REDESIGN-SITE-BRIEF.md`.

## Inventory

168 preview sites, all published on https://preview.aweconcepts.com/<slug>/:

- 156 "prospect" sites built by copying `preview/<slug>/` (list:
  `batchOneSlugs` in `scripts/build-branded-previews.mjs`).
- 12 sites with their own build steps: kappo-sono, otaku-haven, shotsbyriq,
  jay-millz-shot-em, pace-sbdc, susukino, bao-dumpling, mesa-bar, casa-serra,
  solerum, jj-deli, chong.

`preview/<slug>/` is the authoritative source. `branded-previews/public/` is
build output (git-ignored); never edit it.

## Deployment (how it works, and the current blocker)

`.github/workflows/branded-previews.yml` deploys `branded-previews/` to the
Firebase Hosting target `previews` (site `awe-concepts-previews`, project
`awe-digital`, channel `live`) **only on push to `main`** (or manual dispatch).
It never touches the production site.

From this cloud session: no Firebase credentials are available, GitHub's MCP
server could not connect, and pushes are limited to the working branch. So the
redesigns on this branch are **not live** until the owner merges the branch to
`main` (or runs the workflow on it). After deploying, re-run QA against the
live host (see below) and mark sites `deployed`.

## Commands

```
npm ci
NODE_USE_ENV_PROXY=1 node scripts/build-branded-previews.mjs     # full build (proxy env needed in cloud sessions)
node --test --test-concurrency=1 tests/branded-previews.test.mjs tests/preview-image-csp.test.mjs tests/kappo-sono-preview.test.mjs tests/otaku-haven-preview.test.mjs tests/preview-no-pictographs.test.mjs tests/susukino-preview.test.mjs tests/bao-dumpling-preview.test.mjs tests/mesa-bar-preview.test.mjs tests/casa-serra-preview.test.mjs tests/solerum-preview.test.mjs tests/jj-deli-preview.test.mjs tests/chong-preview.test.mjs tests/large-scale-batch-one.test.mjs tests/preview-original-link-policy.test.mjs
node scripts/qa-portfolio.mjs [slug ...]                        # browser QA of the full build
QA_HOME_ONLY=1 node scripts/qa-portfolio.mjs                     # homepages only
node scripts/build-one-preview.mjs <slug>                        # isolated one-site build
QA_ROOT=artifacts/one/<slug>/public node scripts/qa-portfolio.mjs <slug>
python3 scripts/qa-contact-sheet.py shots <date> out.jpg [slugs] # side-by-side review
python3 scripts/qa-contact-sheet.py images out.jpg <urls>        # check photo subjects
node scripts/update-master-progress.mjs
```

Screenshots: `artifacts/portfolio-qa/<date>/<slug>/` (git-ignored; regenerate
with the QA script). Automated results: `qa/portfolio-qa/results.json`.

The cloud environment `my-website` allows the image CDNs, Google Fonts,
preview.aweconcepts.com and awe-concepts-previews.web.app. Node's fetch needs
`NODE_USE_ENV_PROXY=1` there.

## Work plan

`qa/redesign-groups.json` splits all 168 sites into groups of up to four
similar businesses. Each group is handed to one agent with the brief.
A site is done only when its `preview/<slug>/site-record.json` says
`visually-verified` and the coordinator has reviewed its screenshots.

## Done so far

See the "Progress log" section below and the master progress file.

## Known blockers / open issues

- Deployment: see above.
- Susukino: its Instagram photo links have expired, so the live page shows one
  interior photo six times. Needs non-expiring imagery.
- Unsplash search and photo pages are behind a bot check from this
  environment; photos are found via web search (Pexels IDs), the repo's existing
  Unsplash pool, and visual verification of each candidate.

## Progress log

- 2026-11-08: QA/build infrastructure committed; baseline homepage QA of all
  168 sites recorded; shared fixes (mobile menu script, duplicate footer credit,
  favicon, manifest JSON, filler pages removed, press links preserved).
- 2026-11-08: Wave 1 started: groups 0 (pilot: kora-bakery, route-66-smokehouse, barchino), 1, 2, 3.

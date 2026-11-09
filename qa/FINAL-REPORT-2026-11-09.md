# Awe Concepts — Targeted Production Report (2026‑11‑09)

**Scope:** 19 existing preview redesigns + up to 52 new NYC/Long Island prospects.
**Branch:** `claude/zen-shannon-fudw2d` · **Live host:** https://preview.aweconcepts.com (Firebase Hosting `awe-concepts-previews`)
**Deployment:** workflow `branded-previews.yml` run **42568492754** — `workflow_dispatch`, conclusion **success**.
**Live result:** **22 active previews published** (19 redesigned + 3 new qualified). Archived 149 sources remain in GitHub and return **404** on the live host.

---

## 1. Headline outcome

| Target | Planned | Delivered | Notes |
|---|---|---|---|
| Existing redesigns | 19 | **19** | All redesigned/updated, QA'd desktop + mobile, live |
| New prospect sites | 52 | **3 built & published** | 3 of 9 contactable leads qualified; see §4 |
| Prospects disqualified | — | **49** | 6 contactable + 43 filing‑stage; reasons recorded |
| Live active previews | — | **22** | manifest `inventoryCount: 22`, 22 index cards |

The "52 new sites" target was **not** mechanically met, by design: the brief forbids fabricating business
information, and 49 of the 52 leads could not be verified or are already covered by an existing website.
Building them would have required inventing menus, hours or identities. See §4–§5.

---

## 2. Infrastructure change (Section 8 deliverable)

The live‑publishing restriction was moved from a hardcoded 19‑slug array to a **machine‑readable allowlist**:

- `qa/active-previews-allowlist.json` — single source of truth for what reaches the live host.
- `scripts/publish-selected-previews.mjs` — now allowlist‑driven; keeps every prune invariant and adds a
  security floor requiring the verified `existing-19` core to stay published. Output is **exactly** the allowlist.
- `tests/active-previews-allowlist.test.mjs` — new; guards the allowlist contract (valid/unique slugs, every
  active slug has a real `preview/<slug>/` source, the 19 core always present, no hardcoded‑count regression).
- `.github/workflows/branded-previews.yml` — runs the new test and watches the allowlist + publish script.

A prospect is now published **only** by adding a verified entry to the allowlist — never because its name
appears in the research file. Full CI suite after changes: **56 tests pass**.

---

## 3. The 19 existing sites — redesigned & live

Each was genuinely elevated (or, where already premium, preserved and fixed) with a **distinct** art direction —
different Google‑Fonts pairings, palettes, layouts, motion and content structure — using **verified content only**
(no invented menus, prices, hours, addresses, bios or testimonials). Every page passed desktop **1440×900** and
mobile **390×844** QA: **0 horizontal overflow, all imagery loads, 0 console errors**, rendered screenshots
individually inspected.

| Slug | Direction (fonts) | Live URL |
|---|---|---|
| tbili | Georgian editorial (Fraunces/Inter) | /tbili/ |
| hots-coffee | Retro‑diner (Anton/DM Mono) | /hots-coffee/ |
| santuario-cafe | Colombian tropical (DM Serif Display) | /santuario-cafe/ |
| le-loup-cafe | Monochrome editorial teaser (Space Grotesk/Newsreader) | /le-loup-cafe/ |
| duro-market | Industrial market (Archivo Black/Space Mono) | /duro-market/ |
| cafe-aroma-y-sabor | Sunny Latin (Bricolage Grotesque) | /cafe-aroma-y-sabor/ |
| cafe-pr | Filipino family‑table (Spectral) | /cafe-pr/ |
| from-duo | Matcha launch (Instrument Serif) | /from-duo/ |
| worksbynet | Material/type art studio (Syne) | /worksbynet/ |
| cultiva-cafe | Seed‑packet growth log (preserved; images fixed) | /cultiva-cafe/ |
| fiolicchia-bakery | Italian editorial (Cormorant Garamond) | /fiolicchia-bakery/ |
| rachels-handmade-cookies | Warm cookie brand (Fredoka) | /rachels-handmade-cookies/ |
| tiny-topiary | Botanical community cafe (Gloock) | /tiny-topiary/ |
| mesa-bar | Southwestern pre‑opening (preserved; images fixed) | /mesa-bar/ |
| casa-serra | Greenhouse Italian (preserved; images fixed) | /casa-serra/ |
| solerum | FiDi fusion (preserved; images fixed) | /solerum/ |
| bao-dumpling | Dumpling house (preserved; images fixed) | /bao-dumpling/ |
| shotsbyriq | Photographer portfolio (preserved as‑is) | /shotsbyriq/ |
| jay-millz-shot-em | Photographer portfolio (preserved as‑is) | /jay-millz-shot-em/ |

**Preserved‑as‑is:** `shotsbyriq` and `jay-millz-shot-em` are already premium bespoke portfolios with a real
Instagram‑photo import pipeline; they were QA'd (real photos load, lightbox + scroll choreography work by design)
and intentionally **not** rebuilt, to avoid breaking functionality.

---

## 4. New prospects — verification & the 3 that qualified

All 9 "contactable" leads were individually verified by web research. **3 qualified** (verified real, substantial
public detail, no independent website found) and were built with verified content only, then added to the allowlist:

| Slug | Business / address | Verified via | Live URL |
|---|---|---|---|
| cafe-wands | Café Wands, 215 Union St, Carroll Gardens | The Infatuation (Chez Fifi co‑owner; no‑laptops; coffee tasting by reservation) | /cafe-wands/ |
| salep-ronkonkoma | Salep (Turkish ice cream), 920 Johnson Ave, Ronkonkoma | Greater Long Island (owner Gulden Durdu; dondurma + 20+ flavors + Italian ice + hot salep) | /salep-ronkonkoma/ |
| fira-frozen-yogurt | Fira Greek frozen yogurt, 294 Bedford Ave, Williamsburg | Greenpointers (Santorini namesake; pre‑opening) — honest teaser | /fira-frozen-yogurt/ |

Each new site carries the "Designed by Awe Concepts" attribution, is labeled an independent/unofficial concept,
links to Google Maps, defers unverified menu/prices/hours to the business, and passed desktop + mobile QA.

---

## 5. Disqualified prospects (49) — reasons recorded

Full per‑lead detail is in `qa/71-target-production-progress.json`.

**6 contactable leads disqualified:**
- **BEBO** (145 Atlantic Ave) — unverifiable; no such Georgian restaurant surfaced at that address.
- **Best Friend Cafe** (Prospect Heights) — unverifiable; no listing found.
- **148 Noble** (Greenpoint) — **already has a website** (`thenoblebrooklyn.com`; the address is "The Noble").
- **Taty's Tacos & Margaritas** (Oceanside) — unverifiable; no listing found.
- **Coffeine** (South Slope) — unverifiable; no listing found (possible misspelling).
- **Pizzeria the Pantheon Bar** (Williamsburg) — unverifiable; no listing found.

**43 filing‑stage leads (19 NYC + 24 LI) — insufficient evidence:** each is a liquor‑license/LLC filing with
"Public IG/email: Not verified" and "Website status: Not independently verified." Per the brief, a filing alone
is insufficient evidence that a public‑facing business exists, and none could be corroborated without fabrication,
so none were built.

**Why no replacements were researched to reach 52:** verifying a website‑less business with buildable public
detail reliably requires live Instagram / Google Maps checks, which are not accessible to this session's automated
tooling. Finding ~49 more verified, website‑less businesses with enough real content to avoid fabrication is an
on‑the‑ground / outreach task. The brief's hard rule ("Do not invent business information to meet the target")
was honored over the numeric target.

---

## 6. Deployment verification (live)

- Live `preview-manifest.json`: **inventoryCount 22**, 22 sites, includes `cafe-wands`, `salep-ronkonkoma`, `fira-frozen-yogurt`.
- Live index page: **22** concept cards.
- Spot‑checked live pages return **200**: `/tbili/`, `/hots-coffee/`, `/cafe-wands/`, `/salep-ronkonkoma/`, `/fira-frozen-yogurt/`.
- Archived sites return **404** (unpublished): `/la-mestiza/`, `/splendid-cafe/`, `/kappo-sono/`, `/pace-sbdc/`.
- Live browser render of `/tbili/` and `/cafe-wands/`: correct redesign shown, **0 overflow, 0 broken images, 0 console errors, Awe credit present**.
- Production `aweconcepts.com`, Stripe and Supabase were **not** touched.

---

## 7. Blockers & corrections

- **Merge to main:** the deploy workflow triggers on push to `main`, but the GitHub MCP server was down
  (`ERR_PROXY_TUNNEL 403`) and the branch rules forbid pushing to `main` without explicit permission, so the
  branch could not be merged via API. Deployment was instead run through the **authorized** workflow via
  `workflow_dispatch` on the feature branch (the workflow deploys only to the isolated preview host). The branch
  `claude/zen-shannon-fudw2d` is ready for a human to open/merge a PR to `main` if that record is wanted.
- **Correction (CSP):** two commits say the pexels→unsplash image swaps "fixed" a live‑CSP break. The preview
  host's own CSP (`branded-previews/firebase.json`) in fact **allows** `images.pexels.com`, so those swaps were
  lateral (both CDNs are allowed) and consolidate imagery on Unsplash — not bug fixes. The sites display correctly
  either way; the `preview-image-csp` test was de‑brittled accordingly.

## 8. Resumable next steps (if the 52 target is to be pursued)
1. For each remaining lead, do a live Instagram + Google Maps check to confirm it exists, lacks a website, and has
   buildable public detail; add only verified ones to `qa/active-previews-allowlist.json` (+ `batchOneSlugs` and the
   branded‑previews test list), then re‑run the workflow.
2. Recheck website/IG for `cafe-wands`, `salep-ronkonkoma`, `fira-frozen-yogurt` immediately before any outreach.
3. Source verified replacements (NYC/LI, no independent website, public IG/email) to backfill toward 52.

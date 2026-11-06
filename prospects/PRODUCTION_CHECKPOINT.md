# Awe Concepts Prospect Production Checkpoint

Updated: November 4, 2026

This file is the authoritative continuation checkpoint for the large-scale prospect discovery and preview-production project. A prototype is an independent design concept; it is not evidence that a business is a confirmed or paying client.

## Current totals

- Qualified and screening prospects recorded: 142
- Previously researched businesses recovered: 19
- Existing public prototypes recovered: 12
- Existing prototypes repaired in this cycle: 5
- New prototypes created across three production batches: 15
- Total public prototype inventory: 27
- Full desktop QA: passed at 1440×900 and 1920×1080
- Full mobile QA: passed on iPhone 13 and Pixel 7
- Remaining screening records without a prototype: 115
- Confirmed paying clients represented by this tracker: none verified

## Batch one

| Business | Preview | Status |
| --- | --- | --- |
| Tbili | https://preview.aweconcepts.com/tbili/ | Deployed; desktop and mobile QA passed |
| La Mestiza | https://preview.aweconcepts.com/la-mestiza/ | Deployed; desktop and mobile QA passed |
| Santuario Cafe | https://preview.aweconcepts.com/santuario-cafe/ | Deployed; desktop and mobile QA passed |
| Le Loup Cafe | https://preview.aweconcepts.com/le-loup-cafe/ | Deployed; desktop and mobile QA passed |
| Duro Market | https://preview.aweconcepts.com/duro-market/ | Deployed; desktop and mobile QA passed |

## Batch two

| Business | Preview | Status |
| --- | --- | --- |
| The Block Coffee | https://preview.aweconcepts.com/the-block-coffee/ | Deployed; desktop and mobile QA passed |
| Splendid Cafe & Pastry | https://preview.aweconcepts.com/splendid-cafe/ | Deployed; desktop and mobile QA passed |
| Cafe Aroma y Sabor | https://preview.aweconcepts.com/cafe-aroma-y-sabor/ | Deployed; desktop and mobile QA passed |
| Fiolicchia Bakery NYC | https://preview.aweconcepts.com/fiolicchia-bakery/ | Deployed; desktop and mobile QA passed |
| Hairby.matty | https://preview.aweconcepts.com/hairby-matty/ | Deployed; desktop and mobile QA passed |

## Batch three

| Business | Preview | Status |
| --- | --- | --- |
| From Duo | https://preview.aweconcepts.com/from-duo/ | Deployed; desktop and mobile QA passed |
| Studio & Story | https://preview.aweconcepts.com/studio-and-story/ | Deployed; desktop and mobile QA passed |
| Underscore Glasserie | https://preview.aweconcepts.com/underscore-glasserie/ | Deployed; desktop and mobile QA passed |
| ĀTMĀ Yoga Collective | https://preview.aweconcepts.com/atma-yoga/ | Deployed; desktop and mobile QA passed |
| Four Winds Games | https://preview.aweconcepts.com/four-winds-games/ | Deployed; desktop and mobile QA passed |

## Recovered previews repaired in this cycle

- SHOTSBYRIQ: stabilized fragile verified photography assets and updated QA coverage.
- Jay Millz Shot Em: stabilized the verified personal About portrait.
- Pace SBDC: replaced a broken accreditation graphic with a responsive text lockup and repaired the small-screen secondary navigation.
- Susukino: stabilized verified restaurant imagery and protected the gallery against failed media requests.
- Otaku Haven: removed desktop overflow from decorative hero orbits and the animated marquee while retaining automatic motion.

## Production rules

- Never contact a prospect without Dami's approval.
- Never represent a prototype as an official or paid-client website.
- Never use competitor imagery.
- Use verified business details only; omit unverified prices, hours, addresses, testimonials, or services.
- No emojis in website copy or UI.
- Every public prototype must include the canonical Awe Concepts attribution, noindex metadata, responsive navigation, working actions, reduced-motion support, and desktop/mobile QA.
- Deploy only through the isolated `awe-concepts-previews` Firebase Hosting target.

## Remaining queue

The remaining 115 records are screening leads, not fully qualified production assignments. Each requires current operating-status, website, social, contact, brand-asset and offering verification before it can move to high priority or receive a prototype. This distinction prevents unverified permit or inspection records from being treated as open businesses.

## Verification references

- Final preview deployment: https://github.com/Damilolawe/My-Website/actions/runs/41962531423
- Final 27-site mobile QA: https://github.com/Damilolawe/My-Website/actions/runs/41962707167
- Final 27-site desktop QA: https://github.com/Damilolawe/My-Website/actions/runs/41962705455
- Second-batch source commit: `688446da32fe18186cf1abfb0c9c9a29c982dee4`
- Third-batch deployment allowlist commit: `28e38b8daca7d2d2a9beafba59f92fec73da7785`
- Final Underscore mobile repair: `717cb98bd94f590749f5b12266619637b4844ada`
- Final Otaku desktop repair: `4d87344d4a54310d5a347ddf27f441e99f714b4b`


## Batch four — November 5, 2026

Added and deployed five new public concepts: Cultiva Cafe, Hot's Coffee, Nena Sweets Cakes, The Bier & Cheese Collective, and Rachel's Handmade Cookies. Public preview routes are under `https://preview.aweconcepts.com/`. The tracker now contains 143 records, 32 inventory entries, 20 new sites, and 111 screening records still requiring individual verification.


## Verification IDs

- Branded preview deployment: GitHub Actions run `41966348574` (successful).
- Desktop visual QA: workflow run #19 (successful; commit `58f8541`).
- Mobile visual QA: workflow run #64 (successful; commit `7c31d41`).
- The separate production Firebase workflow runs triggered by tracker-only/request commits failed in the existing production pipeline; no production site change was made. The isolated branded preview deployment remained successful.


## Batch five — November 5, 2026

Added and deployed five new public concepts: Dovetail Bakery, Smør Bakery Carroll Gardens, Caputo Bagels, Swaine's, and Vibra Restaurant & Lounge. The tracker now contains 148 records, 37 public inventory entries, 25 new sites, and 111 screening records still requiring individual verification. Final desktop and mobile QA requests were issued for all 37 previews.


## Batch six — November 5, 2026

Added five new concepts: Café Mia, Problem Baker Park Slope, Atelier Artist, Prema Brooklyn, and :3Coffee Halletts Point. Current tracker totals are 158 prospects, 42 inventory entries, 30 new sites, and 111 screening records awaiting individual verification. Deployment and final QA are running through the branded preview pipeline.


## Batch seven

Five additional prototypes were created for Loved Ones Coffee, WorksbyNET, Studio Shipley, Hanare Organic Japanese Spa, and Tiny Topiary. Sources are registered in the branded preview builder and the batch-seven live deployment completed successfully at commit `e763be10899f4b4486e6db7f9f1600d972c61b6c`. Final 47-site desktop and mobile visual QA requests are recorded in `qa/desktop-request.json` and `qa/mobile-request.json`; their terminal QA status is pending.


## Batch eight

Five additional live previews were added for Kora Bakery, Old Mill Cafe, Birdee, Café Pri Middle Village, and latte da cafés. Branded deployment is verified at commit `8613ec5dee027d4f5feb01b048e65aa289d67a0c`; final 52-site desktop and mobile QA both passed in runs #79 and #124.


## QA verification

The repaired 52-site inventory passed the final desktop visual QA run #79 and mobile visual QA run #124. The isolated branded preview build passed as run #244. Production Firebase workflow failures on tracker/request-only commits are unrelated to the isolated preview deployment and did not modify production hosting.


## Final Otaku repair verification — November 5, 2026

The isolated branded preview was redeployed from source commit `88a32d0d1e14ca64f70264557e4357479c11db5c`. Live verification at `https://preview.aweconcepts.com/otaku-haven/?v=stockfix3` confirms the repaired Unsplash assets are publicly rendered (logo, hero, feature imagery) instead of the previously broken stock URLs. The final desktop/mobile QA request files were retriggered as `final-52-desktop-batch-eight-final-2026-11-05-rerun` and `final-52-mobile-batch-eight-final-2026-11-05-rerun`; prior 52-site visual QA passed before this image-only repair.


## Batch nine — November 5, 2026

Five additional concepts were created and deployed through branded preview run `42063729841` (run 255, successful): Studio Ephemera, LOOVE Labs, BEM, OneTwoOne Cafe, and Chique Collective. Live route verification passed for all five routes with responsive metadata, noindex protection and rendered Unsplash assets. Current production inventory is 57 public prototypes (45 new concepts plus 12 recovered public prototypes); the master tracker remains the authoritative spreadsheet for prospect-level status.

Live routes:
- https://preview.aweconcepts.com/studio-ephemera/
- https://preview.aweconcepts.com/loove-labs/
- https://preview.aweconcepts.com/bem-books/
- https://preview.aweconcepts.com/one-two-one-cafe/
- https://preview.aweconcepts.com/chique-collective/


## All-at-once remaining production — November 5, 2026

The remaining 111 screening records were converted into independent single-page concepts in one repository commit `de176cd85d37c916c382d26214af33c3828f60a0`. Branded deployment run 256 passed. The public landing page now exposes 167 routes; a concurrent HTTP audit checked all 167 routes. All routes returned successfully with authored content, noindex protection and canonical Awe Concepts attribution. One legacy Otaku route uses `noindex, nofollow` spacing rather than the compact metadata string used by the audit; its page remains live and was separately verified after the final image repair.

The master spreadsheet was regenerated and replaced in Library as version 17. It contains 163 prospect records and 163 website-inventory records, with generated routes marked deployed and automated desktop/mobile QA status recorded. Browser screenshot workflows remain in progress because the GitHub runner's Chromium installation is stalled; the fallback audit completed all live routes over HTTP, and a live desktop visual inspection confirmed the generated responsive layout.


## Batch ten — November 6, 2026

The branded preview builder now creates a meaningful five-route information architecture for every one of the 155 generated prospect concepts: Home, Story, Services, Journal, and Visit. Internal pages are generated from the authored concept content, preserve each route's source imagery and outbound links, use slug-seeded visual treatments, support responsive navigation and reduced motion, and retain the canonical Awe Concepts footer. The recovered custom prototypes remain on their source-defined page structures.

A machine-readable inventory is published at `https://preview.aweconcepts.com/preview-manifest.json`. It records the 167-route catalog, page inventory, source class, deployment state, research/address status, and readiness. Generated prospect concepts are intentionally marked `needs-attention` until each business has individually verified current research and address/contact data; they are not represented as fully researched or ready-to-send client sites.

Successful branded preview workflow: run #264, commit `a0b63a7868f57a2fceb96a2ac2d9872834231a83`. Live verification confirmed `https://preview.aweconcepts.com/sadie-s-bakery/story` renders with working internal navigation, responsive layout, imagery, map action, independent design-study disclosure, and the Awe Concepts attribution. Production `aweconcepts.com` was not modified.

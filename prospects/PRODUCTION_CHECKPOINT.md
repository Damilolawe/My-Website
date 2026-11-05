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
- Desktop visual QA: run `419666?` (successful run shown as Desktop preview visual QA #19; commit `58f8541`).
- Mobile visual QA: run `419666?` (successful run shown as Mobile preview visual QA #64; commit `7c31d41`).
- The separate production Firebase workflow runs triggered by tracker-only/request commits failed in the existing production pipeline; no production site change was made. The isolated branded preview deployment remained successful.

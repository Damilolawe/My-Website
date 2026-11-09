# Awe Concepts Template Library Revamp Progress

## Project Overview
- **Total Templates**: 116
- **Starter Templates** (single-page, $75): 78
- **Signature Templates** (multipage, $150): 38
- **Branch**: claude/relaxed-hawking-f4bi2q

## Architecture Summary
Templates are rendered through multiple pipelines:
1. **Core 7** (index, folio, still, afterhours, signal, daylight, liquidmetal) — `premium.mjs` with per-template CSS
2. **Catalog 15** (atlas through arcade) — `premium.mjs` with premium art direction
3. **Refero 5** (nightgrid, couture, signaldeck, obsidian, highlighter) — `md-rebuild.mjs`
4. **FreeDesignMD 10** (acidchrome through risograph) — `free-designmd-render.mjs`
5. **VoltAgent Trio** (nike, clay, ferrari) — `voltagent-trio.mjs`
6. **RunwayML** (runwayml single, runwaymulti multipage) — `runwayml.mjs` / `runway-multipage-preview.mjs`
7. **Zip Designs 74** (md-* templates) — `zip-design-render.mjs` with architectural variations
   - 3 flagships: velocity (bugatti), fieldnotes (mintlify), pixelquest (nintendo-2001)

Build: `scripts/build.mjs` generates static HTML to `dist/templates/`
Gallery: `showcase.js` renders template browser in order page
Thumbnails: `assets/catalog-thumbnails/{id}.webp`

## Template Inventory

### Core Templates (Phase 1 Priority)
| ID | Name | Tier | Status |
|---|---|---|---|
| index | The Index | starter | Pending |
| folio | Folio No. 01 | starter | Pending |
| still | Still Studio | starter | Pending |
| afterhours | After Hours | starter | Pending |
| signal | Signal / Noise | starter | Pending |
| daylight | Daylight | starter | Pending |
| liquidmetal | Liquid Metal | starter | Pending |

### Catalog 15 Templates
| ID | Name | Tier | Status |
|---|---|---|---|
| atlas | Atlas / Grid | starter | Pending |
| terminal | Terminal 01 | starter | Pending |
| orbit | Orbit 360 | starter | Pending |
| playbill | The Playbill | starter | Pending |
| monologue | Monologue | starter | Pending |
| portraiture | Portraiture | starter | Pending |
| contactsheet | Contact Sheet | starter | Pending |
| atelier | Maison Atelier | starter | Pending |
| museum | Museum Notes | starter | Pending |
| brutalist | Brutalist Press | starter | Pending |
| nocturne | Nocturne | starter | Pending |
| foundry | The Foundry | starter | Pending |
| bloom | Bloom House | starter | Pending |
| ledger | Ledger & Co. | starter | Pending |
| arcade | Arcade Night | starter | Pending |

### Refero Originals
| ID | Name | Tier | Status |
|---|---|---|---|
| nightgrid | Night Grid | starter | Pending |
| couture | Couture Notes | starter | Pending |
| signaldeck | Signal Deck | starter | Pending |
| obsidian | Obsidian Film | starter | Pending |
| highlighter | Highlighter | starter | Pending |

### FreeDesignMD Templates
| ID | Name | Tier | Status |
|---|---|---|---|
| acidchrome | Acid Chrome | starter | Pending |
| voidstage | Voidstage | starter | Pending |
| studiomargaux | Studio Margaux | starter | Pending |
| neomemphis | Neo-Memphis | starter | Pending |
| monobrutalist | Mono Brutalist | starter | Pending |
| vestigefolio | Vestige Folio | starter | Pending |
| botanicalpress | Botanical Press | starter | Pending |
| limepress | Limepress Fintech | starter | Pending |
| gazettebroadside | Gazette Broadside | starter | Pending |
| risograph | Risograph Press | starter | Pending |

### VoltAgent + Runway
| ID | Name | Tier | Status |
|---|---|---|---|
| runwayml | Cinematic | starter | Pending |
| runwaymulti | Cinematic Pages | signature | Pending |
| nike | Athletic | starter | Pending |
| clay | Sculpt | starter | Pending |
| ferrari | Motorsport | starter | Pending |

### Zip Design Studies (74 templates — 36 Starter, 38 Signature)
Tracked separately due to volume. All currently: Pending.

## Phase Tracking

### Phase 1 — Discovery and Audit
- [x] Repository structure mapped
- [x] Template catalog enumerated (116 total)
- [x] Rendering pipelines identified (7 distinct systems)
- [x] Build process understood
- [x] Gallery/showcase system understood
- [ ] Individual template audit started
- [ ] Defect catalog created

### Phase 2 — Creative Direction
- [ ] Visual differentiation matrix reviewed
- [ ] Per-template creative directions assigned
- [ ] Cross-template uniqueness verified

### Phase 3 — Implementation
- [ ] Core 7 templates redesigned
- [ ] Catalog 15 templates improved
- [ ] Refero originals enhanced
- [ ] FreeDesignMD templates polished
- [ ] VoltAgent/Runway templates refined
- [ ] Zip design studies differentiated

### Phase 4 — Visual QA
- [ ] Desktop screenshots captured
- [ ] Mobile screenshots captured
- [ ] Defects identified and fixed
- [ ] Console errors resolved

### Phase 5 — Catalog Integration
- [ ] Thumbnails regenerated
- [ ] Gallery display verified
- [ ] Template metadata updated
- [ ] Preview links confirmed

### Phase 6 — Deployment
- [ ] Build passes
- [ ] Deployment successful
- [ ] Live verification complete

## Commits
(Updated as work progresses)

## Next Steps
Begin with Core 7 templates — these are the most visible and use the primary rendering pipeline.

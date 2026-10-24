# Exact uploaded DESIGN.md source of truth

The 18 original user-provided markdown documents live **unchanged** at `design-sources/refero/<slug>/DESIGN.md` in this **private repository**. These files are the specification. **Do not paraphrase, rewrite, simplify, overwrite, or replace them with newly generated markdown.**

The real documents describe a brand's visual design system: colors, typography, scales, spacing, surfaces, hierarchy, layout, component examples, Do's and Don'ts, imagery direction, and agent guidance. They do not contain a complete runnable website. A site derived from a DESIGN.md must implement the stated requirements; merely adding color tokens or an inspired hero does **not** establish visual fidelity.

## Direct file-to-template associations

| Customer-facing template | Unchanged source file |
|---|---|
| Folio No. 01 | [kinfolk DESIGN.md](../../design-sources/refero/kinfolk/DESIGN.md) |
| Still Studio | [apple DESIGN.md](../../design-sources/refero/apple/DESIGN.md) |
| After Hours | [a24 DESIGN.md](../../design-sources/refero/a24/DESIGN.md) |
| Signal / Noise | [spotify DESIGN.md](../../design-sources/refero/spotify/DESIGN.md) |
| Orbit 360 | [linear DESIGN.md](../../design-sources/refero/linear/DESIGN.md) |
| The Playbill | [dice DESIGN.md](../../design-sources/refero/dice/DESIGN.md) |
| Monologue | [letterboxd DESIGN.md](../../design-sources/refero/letterboxd/DESIGN.md) |
| Portraiture | [vsco DESIGN.md](../../design-sources/refero/vsco/DESIGN.md) |
| Contact Sheet | [cosmos DESIGN.md](../../design-sources/refero/cosmos/DESIGN.md) |
| The Foundry | [teenage-engineering DESIGN.md](../../design-sources/refero/teenage-engineering/DESIGN.md) |
| Museum Notes | [figma DESIGN.md](../../design-sources/refero/figma/DESIGN.md) |
| Brutalist Press | [enter-gmbh DESIGN.md](../../design-sources/refero/enter-gmbh/DESIGN.md) |
| Nocturne | [ferrari DESIGN.md](../../design-sources/refero/ferrari/DESIGN.md) |
| Night Grid | [warp DESIGN.md](../../design-sources/refero/warp/DESIGN.md) |
| Couture Notes | [adam-lippes DESIGN.md](../../design-sources/refero/adam-lippes/DESIGN.md) |
| Signal Deck | [raycast DESIGN.md](../../design-sources/refero/raycast/DESIGN.md) |
| Obsidian Film | [oryzo-ai DESIGN.md](../../design-sources/refero/oryzo-ai/DESIGN.md) |
| Highlighter | [ramp DESIGN.md](../../design-sources/refero/ramp/DESIGN.md) |

## Current implementation status

- **Exact original source storage — complete.** All 18 Git blob SHA-1 values match the original uploaded files, byte-for-byte, guarded by automated tests.
- **Source CSS Quick Start variables — wired in.** The original CSS block (verbatim, not hand-transcribed) is embedded in corresponding demo/customer page styles through `shared/exact-design-css.mjs`. This is only *one section* of each source.
- **Complete per-template visual fidelity — NOT certified.** The earlier generic renderer still contains interpretation and reusable sections. It has NOT been shown to match every layout, image directive, component and Do/Don't specification. Future work should rebuild these independently and compare full-page desktop/mobile screenshot evidence.
- **Licensing — source documents private.** Do not place these unmodified files, proprietary fonts, logos, source imagery, or copyrighted brand material in publicly hosted `dist/`. Use only original client-authorized assets and the font substitutes that the spec permits.

## Mandatory engineering contract for each template

1. Read **the complete unchanged source markdown**, including all listed components, imagery and Agent Prompt Guide, before changing code. Don't rely on a summarized brief.
2. Build the entire site layout with meaningful customer data, not only its hero colors. Give each template its own navigation, sections, imagery behavior, composition and relevant interaction.
3. Honor each design system's exact quantitative color/spacing/typographic/radius tokens where feasible, with permission-appropriate font substitutes. If a markdown example is invalid or internally conflicting, record the conflict without changing the source file.
4. Preserve user customization, accessible contrast, semantic content, working nav/links, mobile responsiveness, reduced-motion and safe publication without executing customer scripts.
5. Compare rendered results against the actual original spec's listed components and explicit Do's/Don'ts, at 320, 375, 768 and desktop. Record evidence and discrepancies for every one of the 18.
6. Do not call a template finished until the user-approved version passes functional and visual QA. Do not present a partial token import as a completed design rebuild.

**Important:** As of this source-import change, the original files are preserved and source CSS is connected, but the complete visual rebuild remains outstanding.

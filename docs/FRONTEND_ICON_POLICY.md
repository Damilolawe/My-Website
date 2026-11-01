# Awe Concepts — Frontend Icon & Typography Policy

Apply to all future Awe Concepts pages, templates, client previews and design projects.

1. Never use emoji or emoji-prone Unicode characters as interface icons, including the diagonal up/right arrow U+2197. Some browsers (notably iOS) turn these into bright platform-colored emoji.
2. Use consistent SVG icons or CSS-drawn shapes that inherit currentColor, with aria-hidden for purely decorative icons. Kappo Sono uses the CSS-only `.icon-external` icon.
3. Give icon-only buttons a meaningful accessible name; keep button labels legible.
4. Avoid arbitrary whitespace or excessive letter spacing inside Japanese wordmarks. The Kappo Sono wordmark is 割烹園 with no internal space.
5. When Japanese numerals 一, 二, 三 look like decorative strokes, use unambiguous numbered labels, such as `01 / ONE`.
6. Menu descriptions are complete text: include consistent final punctuation.
7. For all new frontends, include automated tests detecting emoji-presentation characters and the U+2197 family. Kappo Sono checks live in `tests/kappo-sono-preview.test.mjs`; they run in its preview workflow and the full production suite.

This establishes the rule going forward; existing legacy templates have not all been audited.

## Required Awe Concepts signature for new sites

Every website Awe Concepts creates from now on must have a tasteful, accessible footer credit reading **Designed by Awe Concepts**, accompanied by the actual studio logo and a working link to **https://aweconcepts.com/**. Use an inline SVG, not an emoji or remote asset. Place the small mark after the client's footer without covering their content; retain accessible focus styling and mobile sizing. Treat this as a business-wide default for Starter, Signature, Premium/Custom, template previews and standalone proposals.

Implementation: `shared/brand-credit.mjs`, which supplies the idempotent `applyAweDesignCredit()` helper. All customer templates add the credit before the owner/customer reviews, including approved multi-page template rendering. Standalone pages (Kappo Sono) embed the same design mark. Regression tests: `tests/awe-brand-credit.test.mjs`.

**Existing approved customer websites are immutable:** do not retroactively replace or rewrite their approved versions. Add the credit during their next authorized design revision, with fresh approval. New custom HTML/ZIP projects outside this renderer must include the same mark and link.

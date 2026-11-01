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

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { auditPreviewGlyphs, detectDecorativeGlyphs } from "../scripts/validate-preview-icons.mjs";

test("every standalone website preview uses SVG/CSS instead of platform emoji or Unicode arrow icons", async () => {
  assert.deepEqual(await auditPreviewGlyphs("preview"), []);
});

test("preview icon guard detects emoji, stars, dingbats, variation selectors and text arrows", () => {
  for (const bad of ["\u{1F525}", "\u{1F338}", "\u{2728}", "\u{2733}", "\u{2197}", "\u{2192}", "\u{FE0F}"]) {
    assert.ok(detectDecorativeGlyphs("before " + bad + " after").length >= 1, "Uncaught pictograph or symbol");
  }
  assert.deepEqual(detectDecorativeGlyphs("一期一会 — Japanese design, Zai’s story. 01 / 04"), []);
});

test("Otaku Haven website uses inline authored vector arrows, not glyph stand-ins", async () => {
  const html = await readFile("preview/otaku-haven/index.html", "utf8");
  const css = await readFile("preview/otaku-haven/styles.css", "utf8");
  assert.ok((html.match(/class="ui-arrow-up-right"/g) || []).length >= 15);
  assert.ok((html.match(/class="ui-rank-arrow"/g) || []).length === 2);
  assert.match(html, /<svg class="ui-arrow-up-right"/);
  assert.match(css, /\.tiny-cross:before/);
  assert.match(css, /\.tiny-cross:after/);
});

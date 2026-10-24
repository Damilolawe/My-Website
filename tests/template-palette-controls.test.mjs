import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates, sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { paletteCSS, directionPaletteCSS, paletteTokens, paletteInline } from "../shared/theme-palette.mjs";

const file = p => readFile(new URL("../" + p, import.meta.url), "utf8");
const palette = (id, primary, secondary) => {
  const sample = sampleForTemplate(id);
  return renderSite({ ...sample, design: { ...sample.design, primary, secondary } }, { sample: true });
};

test("the entire 20-template catalog maps the chosen colors to its major hero, navigation and footer", () => {
  assert.equal(templates.length, 26);
  for (const { id } of templates) {
    const pink = palette(id, "#ff0077", "#1d53d7");
    const green = palette(id, "#20bb42", "#efad34");
    assert.notEqual(pink, green, id + " ignored the selected colors");
    if(id==="arcade") {
      assert(pink.includes("--arcade-volt:#ff0077;--arcade-lift:#1d53d7"));
      assert(green.includes("--arcade-volt:#20bb42;--arcade-lift:#efad34"));
      assert(pink.includes("background:var(--arcade-lift)"));
      assert(pink.includes("background:var(--arcade-volt)"));
      continue;
    }
    assert(pink.includes("--accent:#ff0077;--secondary:#1d53d7"), id + " missed the chosen colors");
    assert(green.includes("--accent:#20bb42;--secondary:#efad34"), id + " retained the previous colors");
    const activeCSS=(directionPaletteCSS.includes("body." + id + " ") ? directionPaletteCSS : paletteCSS);
    for (const cssSelector of [".hero", ".shell-header", ".shell-footer", ".service-card"]) {
      assert(activeCSS.includes("body." + id + " " + cssSelector + "{"), id + " lacks palette override for " + cssSelector);
    }
    assert(pink.includes("body." + id + " .shell-header{"), id + " should include scoped color overrides");
    assert(pink.indexOf("body." + id + " .shell-header{") >= pink.indexOf(".shell-header"), id + " should apply user colors after preset CSS");
    assert(!pink.includes("<script"), "A customer site must remain script-free");
  }
});

test("light and dark picked colors receive legible contrasting type", () => {
  assert.equal(paletteTokens("#ffffff", "#ffffff")["on-secondary"], "#10131b");
  assert.equal(paletteTokens("#000000", "#000000")["on-secondary"], "#ffffff");
  assert.equal(paletteTokens("#101010", "#fafafa")["palette-on-secondary-strong"], "#10131b");
  assert.notEqual(paletteInline("#ff0000","#110000"),paletteInline("#0000ff","#eeeeee"));
  assert.throws(() => paletteTokens("red", "#ffffff"), TypeError);
  assert.throws(() => paletteTokens("#ffffff", "url(https://example.com)"), TypeError);
});

test("the primary picker changes major visual accents and the secondary picker changes large surfaces", () => {
  for (const id of ["atlas","orbit","brutalist","terminal","playbill","bloom","ledger","index","afterhours"]) {
    const html = palette(id, "#a30be0", "#10a0a0");
    assert(html.includes("--accent:#a30be0"),id);
    assert(html.includes("--secondary:#10a0a0"),id);
    assert(html.includes("--palette-primary-soft:"),id);
    assert(html.includes("--palette-secondary-strong:"),id);
    assert(html.includes("--on-secondary:"),id);
  }
  assert.match(paletteCSS, /body\.brutalist \.hero\{background:var\(--accent\)/);
  assert.match(paletteCSS, /body\.playbill \.hero\{background:var\(--secondary\)/);
  assert.match(paletteCSS, /body\.ledger \.ledger-card\{background:var\(--accent\)/);
  assert.match(paletteCSS, /body\.atlas \.shell-atlas\{background:var\(--accent\)/);
});

test("customer preview passes the live picker selections into the exact production template renderer", async () => {
  const code = await file("app/order.mjs");
  assert(code.includes('name="primary" type="color"'));
  assert(code.includes('name="secondary" type="color"'));
  assert(code.includes('$("#design").oninput = update'));
  assert(code.includes('design: input.design'));
  assert(code.includes("Primary changes accents, buttons and selected hero highlights"));
  const production = await file("supabase/functions/awe-api/shared/premium.mjs");
  const edge = await file("supabase/functions/awe-api/shared/theme-palette.mjs");
  assert(production.includes("paletteInline(accent,second,dark)"));
  assert(production.includes("+ shellCSS + paletteCSS +"));
  assert.equal(edge,await file("shared/theme-palette.mjs"),"Production Edge and browser must use identical palette logic");
});

test("palette overrides never escape their active template", () => {
  for (const { id } of templates.filter(t=>t.id!=="arcade")) {
    const activeCSS=directionPaletteCSS.includes("body." + id + " ")?directionPaletteCSS:paletteCSS;
    assert(activeCSS.includes("body." + id + " .hero .hero-copy h1,body." + id + " .hero .hero-label,body." + id + " .hero .hero-intro"));
  }
  assert(!paletteCSS.includes(",.hero .hero-label"));
  assert(!paletteCSS.includes(",.hero .hero-intro"));
});


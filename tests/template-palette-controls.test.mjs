import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates, sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { paletteCSS, paletteTokens, paletteInline } from "../shared/theme-palette.mjs";

const file = p => readFile(new URL("../" + p, import.meta.url), "utf8");
const palette = (id, primary, secondary) => {
  const sample = sampleForTemplate(id);
  return renderSite({ ...sample, design: { ...sample.design, primary, secondary } }, { sample: true });
};

test("the entire 20-template catalog maps the chosen colors to its major hero, navigation and footer", () => {
  assert.equal(templates.length, 20);
  for (const { id } of templates) {
    const pink = palette(id, "#ff0077", "#1d53d7");
    const green = palette(id, "#20bb42", "#efad34");
    assert.notEqual(pink, green, id + " ignored the selected colors");
    assert(pink.includes("--accent:#ff0077;--secondary:#1d53d7"), id + " missed the chosen colors");
    assert(green.includes("--accent:#20bb42;--secondary:#efad34"), id + " retained the previous colors");
    for (const cssSelector of [".hero", ".shell-header", ".shell-footer", ".service-card"]) {
      assert(paletteCSS.includes("body." + id + " " + cssSelector + "{"), id + " lacks palette override for " + cssSelector);
    }
    assert(pink.indexOf(paletteCSS) > pink.indexOf(".shell-header"), id + " should apply user colors after preset CSS");
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
  assert(code.includes("Your primary color updates the hero"));
  const production = await file("supabase/functions/awe-api/shared/premium.mjs");
  const edge = await file("supabase/functions/awe-api/shared/theme-palette.mjs");
  assert(production.includes("paletteInline(accent,second,dark)"));
  assert(production.includes("+ shellCSS + paletteCSS +"));
  assert.equal(edge,await file("shared/theme-palette.mjs"),"Production Edge and browser must use identical palette logic");
});

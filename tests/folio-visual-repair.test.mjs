import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {sampleForTemplate} from "../shared/model.mjs";

const css = await readFile(new URL("../shared/folio-visual-fixes.mjs",import.meta.url),"utf8");

test("Folio editorial repairs only target the Folio body and preserve native page architecture",()=>{
  assert.match(css,/FOLIO — October 2026 visual QA/);
  assert.match(css,/body\.folio #work \.editorial-spreads\{display:grid;grid-template-columns:repeat\(12,minmax\(0,1fr\)\)/);
  assert.match(css,/@media\(max-width:850px\)/);
  assert.match(css,/@media\(max-width:650px\)/);
  assert.match(css,/body\.folio #work \.case-spread .case-image/);
  assert.match(css,/body\.folio \.folio-spread figcaption/);
  assert.match(css,/body\.folio \.mdsf-folio \.mdsf-columns/);
  assert.match(css,/body\.folio \.md-folio-hero h1/);
});

test("Folio public preview uses distinct editorial copy rather than the same layout-spec caption for each plate",()=>{
  const folio=sampleForTemplate("folio");
  assert.equal(folio.content.name,"Folio No. 01");
  assert.equal(folio.content.cards.length,3);
  assert.equal(new Set(folio.content.cards.map(c=>c.description)).size,3);
  assert.ok(!folio.content.cards.some(c=>/five-column|magazine cover|reading rhythm/i.test(c.description)));
  assert.ok(!folio.content.bio.includes("five-column"));
  assert.equal(folio.design.sections.includes("work"),true);
});

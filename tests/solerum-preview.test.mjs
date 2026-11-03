import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../preview/solerum/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const css = await readFile(new URL("styles.css", root), "utf8");
const js = await readFile(new URL("site.js", root), "utf8");

test("Solerum concept is factual, safe and independently labeled", () => {
  assert.match(html, /NOT THE OFFICIAL SOLERUM WEBSITE/i);
  assert.match(html, /noindex,nofollow/);
  assert.match(html, /2 Gold Street/);
  assert.match(html, /Hawaii, the Caribbean and Asia/);
  assert.match(html, /Eoin Foyle and Darren Shore/);
  assert.match(html, /final opening date, hours and menu have not been announced/i);
  assert.match(html, /aweconcepts\.com/);
  assert.doesNotMatch(html, /<form|testimonial|award/i);
  assert.doesNotMatch(html, /[😀-🙏]/u);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(js, /prefers-reduced-motion/);
});

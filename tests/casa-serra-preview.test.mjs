import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../preview/casa-serra/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const css = await readFile(new URL("styles.css", root), "utf8");
const js = await readFile(new URL("site.js", root), "utf8");

test("Casa Serra concept is factual, safe and independently labeled", () => {
  assert.match(html, /NOT THE OFFICIAL CASA SERRA WEBSITE/i);
  assert.match(html, /noindex,nofollow/);
  assert.match(html, /227 Front Street/);
  assert.match(html, /Expected winter 2026/);
  assert.match(html, /Final date and hours not yet announced/);
  assert.match(html, /aweconcepts\.com/);
  assert.doesNotMatch(html, /<form|testimonial|award/i);
  assert.doesNotMatch(html, /[😀-🙏]/u);
  assert.match(css, /@media\(max-width:850px\)/);
  assert.match(css, /@media\(max-width:520px\)/);
  assert.match(js, /prefers-reduced-motion/);
});

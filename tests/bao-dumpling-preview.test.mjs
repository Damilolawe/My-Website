import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = name => readFile(`branded-previews/public/bao-dumpling/${name}`, "utf8");

test("Bao Dumpling concept is accurate, safe and independently labeled", async () => {
  const [html, css, js] = await Promise.all([read("index.html"), read("styles.css"), read("site.js")]);
  assert.match(html, /Unofficial design concept by Awe Concepts/i);
  assert.match(html, /not the official Bao Dumpling website/i);
  assert.match(html, /noindex,nofollow/i);
  assert.match(html, /40 Gold Street/);
  assert.match(html, /October 1, 2026/);
  assert.match(html, /11:00 AM–10:00 PM/);
  assert.match(html, /baodumpling\.official/);
  assert.match(html, /Spicy Kung Pao Chicken/);
  assert.match(html, /Orange Beef/);
  assert.match(html,/data-awe-design-credit="v1"/);
  assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
  assert.doesNotMatch(html, /<form\b/i);
  assert.doesNotMatch(html, /[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF]/u);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, "Section IDs must be unique");
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const href = match[1];
    assert.ok(href, "No empty links");
    if (href.startsWith("#")) assert.ok(ids.includes(href.slice(1)), `Broken local anchor ${href}`);
    if (match[0].includes('target="_blank"')) assert.match(match[0], /rel="noopener noreferrer"/);
  }
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.doesNotMatch(css, /overflow-x:\s*(?:scroll|auto)/);
  assert.doesNotMatch(css, /letter-spacing:\s*(?:\.2[5-9]|\.[3-9]|[1-9])em/);
  assert.match(js, /IntersectionObserver/);
  assert.doesNotMatch(js, /setInterval|setTimeout/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = async path => readFile(new URL("../" + path, import.meta.url), "utf8");

test("main homepage banner has two identical, seamless content copies", async () => {
  const html = await source("index.html");
  const start = html.indexOf('<div class="ticker-wrap"');
  assert.ok(start !== -1, "Missing main homepage ticker");
  const end = html.indexOf("</div>\n    </div>", start);
  assert.ok(end > start, "Missing ticker wrapper closing tags");
  const banner = html.slice(start, end);
  const copies = [...banner.matchAll(/<span>([\s\S]*?)<\/span>/g)].map(m => m[1]);
  assert.equal(copies.length, 2, "Seamless marquee requires exactly two equal halves");
  assert.equal(copies[0], copies[1], "The loop must re-enter with the same exact content");
  assert.match(copies[0], /PORTFOLIOS WITH PRESENCE/);
  assert.match(copies[0], /BUSINESSES WITH PERSONALITY/);
});

test("main homepage ticker stays animated even with desktop reduced-motion settings", async () => {
  const css = await source("studio.css");
  const override = css.slice(css.lastIndexOf("/* AWE-HOME-TICKER-2026-11-03"));
  assert.ok(override.startsWith("/* AWE-HOME-TICKER-2026-11-03"), "The ticker-specific override must be last");
  assert.match(override, /\.ticker-track\s*\{[^}]*animation:awe-home-ticker-loop 28s linear infinite !important/);
  assert.match(override, /@keyframes awe-home-ticker-loop\s*\{[\s\S]*?translate3d\(-50%,0,0\)/);
  assert.match(override, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?\.ticker-track\s*\{[^}]*animation-duration:42s !important/);
  assert.match(override, /animation-iteration-count:infinite !important/);
  assert.match(override, /animation-play-state:running !important/);
  assert.match(override, /\.ticker-track>span\s*\{[^}]*flex:0 0 auto/);
});

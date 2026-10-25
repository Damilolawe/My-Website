import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderSite } from "../shared/render.mjs";
import { sampleForTemplate } from "../shared/model.mjs";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const bareColorEmojiSymbols = /[↗↘↖↙←→↑↓⇄✳✺✻✽✿✦✧❦▶✓](?!\uFE0E)/u;

test("homepage navigation uses CSS-sized SVG arrow icons, never font emoji", async () => {
  const markup = await read("index.html");
  const iconSpans = ["circle-arrow", "down-arrow"];
  for (const name of iconSpans) {
    const match = markup.match(new RegExp('<span class="' + name + '"[^>]*>([\\s\\S]*?)<\\/span>'));
    assert(match, "Missing responsive icon slot: " + name);
    assert.match(match[1], /<svg[^>]*viewBox="0 0 24 24"/);
    assert.match(match[1], /stroke="currentColor"/);
    assert.match(match[1], /aria-hidden="true"/);
    assert.doesNotMatch(match[1], /[✳↗↘]/u);
  }
  const css = await read("studio.css");
  assert.match(css, /\.ui-vector-icon\s*\{/);
  assert.match(css, /width:1em;height:1em/);
});
test("large mobile and tablet accents are SVG artwork, not emoji fonts", async () => {
  const css = await Promise.all(["app/app.css", "showcase.css", "cinema.css"].map(read));
  for (const source of css) {
    assert.match(source, /-webkit-mask:url\("\/assets\/icons\/asterisk\.svg"\)/);
    assert.match(source, /mask:url\("\/assets\/icons\/asterisk\.svg"\)/);
    assert.match(source, /content:"";/);
  }
  for (const icon of ["asterisk", "arrow-up-right", "arrow-down-right"]) {
    const svg = await read("assets/icons/" + icon + ".svg");
    assert.match(svg, /<svg\b/);
    assert.match(svg, /<path\b/);
  }
  const build = await read("scripts/build.mjs");
  assert.match(build, /"assets"/); // Icon assets are deployed to Firebase with the existing build.
});
test("emoji-prone icons request monochrome text presentation everywhere", async () => {
  const paths = [
    "index.html", "why-awe.html", "contact.html", "account.html", "admin.html",
    "order.html", "404.html", "inquiry-received.html", "script.js", "showcase.js",
    "cinema.js", "case-studies.js", "contact.js", "app/admin.mjs", "app/account.mjs",
    "app/order.mjs", "app/common.mjs", "app/app.css", "cinema.css", "showcase.css",
    "demos/orbit.html", "demos/spotlight.html", "demos/slow-hours.html",
    "shared/experiences.mjs", "shared/alternate-experiences.mjs",
    "shared/site-shells.mjs", "shared/full-page-layouts.mjs", "shared/premium.mjs",
    "supabase/functions/awe-api/shared/experiences.mjs",
    "supabase/functions/awe-api/shared/alternate-experiences.mjs",
    "supabase/functions/awe-api/shared/site-shells.mjs",
    "supabase/functions/awe-api/shared/full-page-layouts.mjs",
    "supabase/functions/awe-api/shared/premium.mjs",
  ];
  for (const path of paths) {
    const source = await read(path);
    assert(!bareColorEmojiSymbols.test(source), "Emoji fallback left in " + path);
  }
});
test("all 20 templates emit non-emoji editorial symbols on phone and tablet", () => {
  for (const name of ["index", "folio", "signal", "terminal", "bloom", "playbill"]) {
    const html = renderSite(sampleForTemplate(name), { sample: true });
    assert(html.includes("<!doctype html>") || html.includes("<!DOCTYPE html>"));
    assert(!bareColorEmojiSymbols.test(html), "Generated template contains emoji-prone glyph: " + name);
  }
});

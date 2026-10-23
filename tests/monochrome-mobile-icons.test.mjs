import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { templates, sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";

const root = path => new URL("../" + path, import.meta.url);
const read = path => readFile(root(path), "utf8");
const glyphWithoutTextPresentation = /[↗↘↖↙←→↑↓⇄✳✺✻✽✿✦✧❦▶✓](?!\uFE0E)/u;

test("navigation uses real scalable SVG arrows, not emoji-capable character glyphs", async () => {
  const html = await read("index.html");
  assert.equal((html.match(/class="ui-vector-icon"/g) || []).length, 3);
  assert.match(html, /class="nav-spark"[^>]*><svg class="ui-vector-icon"/);
  assert.match(html, /class="circle-arrow"[^>]*><svg class="ui-vector-icon"/);
  assert.match(html, /class="down-arrow"[^>]*><svg class="ui-vector-icon"/);
  assert.match(html, /<svg[^>]+aria-hidden="true"[^>]+focusable="false"/);
  assert.match(await read("studio.css"), /\.ui-vector-icon\{display:block;/);
});

test("large decorative icons are SVG masks on mobile and tablet, not font glyphs", async () => {
  const app = await read("app/app.css");
  const cinema = await read("cinema.css");
  const showcase = await read("showcase.css");
  for (const sheet of [app, cinema, showcase]) {
    assert(sheet.includes('/assets/icons/asterisk.svg'), "Missing vector asterisk asset");
    assert(sheet.includes('-webkit-mask:'), "Safari/iOS WebKit mask missing");
    assert(sheet.includes('mask:'), "Standard CSS mask missing");
  }
  for (const path of [
    "assets/icons/asterisk.svg",
    "assets/icons/arrow-up-right.svg",
    "assets/icons/arrow-down-right.svg",
  ]) {
    const svg = await read(path);
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(svg, /<path/);
  }
});

test("UI labels request monochrome text glyphs across screen sizes", async () => {
  for (const path of [
    "index.html", "why-awe.html", "contact.html", "account.html",
    "admin.html", "order.html", "404.html", "inquiry-received.html",
    "script.js", "showcase.js", "case-studies.js", "cinema.js",
    "contact.js", "app/admin.mjs", "app/account.mjs", "app/order.mjs",
    "app/common.mjs", "demos/orbit.html", "demos/spotlight.html",
    "demos/slow-hours.html",
  ]) {
    const body = await read(path);
    assert(!glyphWithoutTextPresentation.test(body), path + " has emoji-capable UI symbols");
  }
});

test("all twenty generated website designs request monochrome icon rendering", () => {
  for (const template of templates) {
    const html = renderSite(sampleForTemplate(template.id), { sample: true });
    assert(!glyphWithoutTextPresentation.test(html), template.id + " rendered unqualified emoji-capable symbols");
  }
});

test("Firebase build contains vector artwork and synchronized branded UI", async () => {
  for (const path of [
    "dist/assets/icons/asterisk.svg",
    "dist/assets/icons/arrow-up-right.svg",
    "dist/assets/icons/arrow-down-right.svg",
  ]) {
    assert((await stat(root(path))).size > 90, path + " is missing from public build");
  }
  const home = await read("dist/index.html");
  assert.match(home, /AWE CONCEPTS/);
  assert.match(home, /class="ui-vector-icon"/);
});

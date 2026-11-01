import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const read = (name) => readFile("preview/otaku-haven/" + name, "utf8");

test("Otaku Haven concept is brand-accurate, clearly unofficial and safe to share", async () => {
  const html = await read("index.html");
  assert.match(html, /Independent website concept by/);
  assert.match(html, /not an official Otaku Haven website/);
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /anime social/i);
  for (const phrase of ["SHONEN SHOWDOWN", "COSPLAY CHRONICLES", "OTAKU BAZAAR", "ZAI", "Timothy", "Andrea"]) {
    assert.ok(html.toUpperCase().includes(phrase.toUpperCase()), "Missing verified brand feature: " + phrase);
  }
  assert.doesNotMatch(html, /[\u{1F300}-\u{1FAFF}]/u);
});

test("every official store and community CTA leads to a verified destination", async () => {
  const html = await read("index.html");
  for (const link of [
    "https://apps.apple.com/us/app/otaku-haven-anime-social/id6800352193",
    "https://play.google.com/store/apps/details?id=com.otakuhavenapp.app",
    "https://discord.gg/3n2NF3hKq",
    "https://www.instagram.com/otakuhaveninc/",
    "https://otakuhavenapp.com/",
    "https://linktr.ee/OtakuHaveninc",
    "https://aweconcepts.com/"
  ]) assert.ok(html.includes(link), "Missing official outbound link: " + link);
  assert.match(html, /class="logo-lockup" href="\.\/"/);
  assert.match(html, /href="\.\/styles\.css"/);
  assert.match(html, /src="\.\/site\.js"/);
  for (const anchor of ["universe", "experience", "ranks", "story", "download"]) {
    assert.match(html, new RegExp('id="' + anchor + '"'));
    assert.match(html, new RegExp('href="#' + anchor + '"'));
  }
  assert.match(html, /Designed by/);
});

test("interaction is responsive, accessible and respects reduced motion", async () => {
  const html = await read("index.html");
  const js = await read("site.js");
  const css = await read("styles.css");
  assert.equal((html.match(/class="feature-tab(?: active)?"/g) || []).length, 4);
  assert.match(html, /aria-controls="primary-nav"/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /aria-selected/);
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media\(max-width:510px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.ok(css.includes(".logo-mark"));
  assert.doesNotMatch(html, /awe-digital\.web\.app/);
});

test("all three standalone Otaku Haven files are in the public preview build", async () => {
  const build = await readFile("scripts/build-branded-previews.mjs", "utf8");
  assert.match(build, /publicOtaku/);
  for (const filename of ["index.html", "site.js", "styles.css"]) {
    assert.ok((await stat("branded-previews/public/otaku-haven/" + filename)).size > 1000);
  }
  const config = JSON.parse(await readFile("branded-previews/firebase.json", "utf8"));
  assert.equal(config.hosting.target, "previews");
  const csp = config.hosting.headers.flatMap((h) => h.headers).find((h) => h.key === "Content-Security-Policy");
  assert.match(csp.value, /https:\/\/otakuhavenapp.com/);
});

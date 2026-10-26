import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = relative => readFile(new URL("../" + relative, import.meta.url), "utf8");

test("Express gallery gets an uncramped layout with all five row elements", async () => {
  const [html, css, showcase] = await Promise.all([
    read("app/order.mjs"), read("app/express-gallery.css"), read("showcase.js"),
  ]);
  assert.match(html, /step === 1 \? "is-gallery" : ""/);
  assert.match(css, /\.wizard\.is-gallery\s*\{/);
  assert.match(css, /\.wizard\.is-gallery\s*>\s*\.steps\s*\{/);
  assert.match(css, /\.express-gallery \.worlds-choice\s*\{[\s\S]*?grid-template-columns:\s*23px minmax\(100px, 128px\) 10px minmax\(0, 1fr\) 17px;/);
  assert.match(css, /\.worlds-choice-thumb\s*\{/);
  assert.match(css, /@media\(max-width: 700px\)/);
  assert.match(showcase, /button\.append\(count,thumb,swatch,copy,symbol\)/);
  assert.match(showcase, /mini\.dataset\.src="\/templates\/"/);
});

test("Checkout requires visible consent and keeps reasons next to Continue", async () => {
  const [page, css] = await Promise.all([read("app/order.mjs"), read("app/app.css")]);
  assert.match(page, /id="consent" required aria-describedby="consent-help"/);
  assert.match(page, /const checkoutAvailable = Boolean\(catalog\.ordersEnabled && p && packageAllowsTemplate/);
  assert.match(page, /disabled = !checkoutAvailable \|\| !consentBox\.checked/);
  assert.match(page, /consentBox\.addEventListener\("change", updateAgreement\)/);
  assert.match(page, /id="checkout-feedback"/);
  assert.match(page, /localFeedback\.textContent = e\?\.message/);
  assert.match(page, /if \(error\?\.status !== 401\) throw error/);
  assert.match(page, /await checkout\(\);/);
  assert.match(css, /\.checkout-consent-label input/);
  assert.match(css, /\.actions \.checkout-feedback/);
});

test("Homepage navigation is centered independently of other header elements", async () => {
  const css = await read("styles.css");
  assert.match(css, /@media \(min-width: 901px\)/);
  assert.match(css, /\.site-header \.desktop-nav\s*\{[\s\S]*?left:\s*50%;[\s\S]*?transform:\s*translateX\(-50%\)/);
});

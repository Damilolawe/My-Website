import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates, sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";

test("All fictional template previews tell crawlers not to index them", () => {
  for (const template of templates) {
    const html = renderSite(sampleForTemplate(template.id), { sample: true });
    assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive">/);
    assert.match(html, /FICTIONAL TEMPLATE DEMO/);
    assert(html.indexOf('name="robots"') < html.indexOf("</head>"));
  }
});

test("Approved real customer sites are not marked fictional or noindexed", () => {
  for (const template of templates) {
    const html = renderSite(sampleForTemplate(template.id));
    assert(!html.includes('name="robots" content="noindex'), template.id);
    assert(!html.includes("FICTIONAL TEMPLATE DEMO"), template.id);
  }
});

test("Private interfaces, error page are not promoted as organic search results", async () => {
  for (const pathname of ["admin.html", "account.html", "404.html"]) {
    const html = await readFile(new URL("../" + pathname, import.meta.url), "utf8");
    assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive">/, pathname);
  }
});

test("Public agency pages expose clear social sharing text and document descriptions", async () => {
  for (const pathname of ["index.html", "why-awe.html", "order.html"]) {
    const html = await readFile(new URL("../" + pathname, import.meta.url), "utf8");
    assert.match(html, /<title>[^<]+<\/title>/, pathname);
    assert.match(html, /<meta name="description" content="[^"]+">/, pathname);
    assert.match(html, /<meta property="og:title" content="[^"]+">/, pathname);
    assert.match(html, /<meta property="og:description" content="[^"]+">/, pathname);
    assert.match(html, /<meta name="twitter:card" content="summary">/, pathname);
  }
});

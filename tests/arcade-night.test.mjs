import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";

test("Arcade Night has its own esports broadcast composition and six honest previews", () => {
  for (const purpose of ["Creative portfolio", "Professional portfolio", "Actor / model", "Student résumé", "Personal brand", "Small business"]) {
    const html = renderSite(sampleForTemplate("arcade", purpose), { sample: true });
    assert.match(html, /data-architecture="esports-broadcast"/);
    assert.match(html, /class="arcade-hero-signal"/);
    assert.match(html, /class="arcade-program"/);
    assert.match(html, /Big Shoulders Display/);
    assert.match(html, /JetBrains Mono/);
    assert.match(html, /FICTIONAL TEMPLATE DEMO/);
    assert.match(html, /contact-setup-note/);
    assert.match(html, /class="arcade-actions architect-contact-links"/);
    assert.doesNotMatch(html, /<script|images\.unsplash\.com|href="mailto:hello@example.com"/);
  }
});

test("Arcade Night preserves customer content, safe links, section order, and major color controls", () => {
  const config = sampleForTemplate("arcade");
  config.design = { ...config.design, primary: "#ff0077", secondary: "#1d53d7", sections: ["contact", "work", "about"] };
  config.content = { ...config.content, name: "Team <script>bad()</script>", publicEmail: "team@example.org",
    cards: [{ title: "Real event", description: "A real customer project", url: "javascript:alert(1)" }] };
  const html = renderSite(config);
  assert(html.includes("Team &lt;script&gt;bad()&lt;/script&gt;"));
  assert(!html.includes("<script>bad()") && !html.includes("javascript:alert"));
  assert(html.includes('href="mailto:team@example.org"'));
  assert(html.indexOf('id="contact"') < html.indexOf('id="work"'));
  assert(html.includes("--arcade-volt:#ff0077;--arcade-lift:#1d53d7"));
  assert(html.includes("background:var(--arcade-lift)"));
  assert(html.includes("background:var(--arcade-volt)"));
  assert(html.includes(".shell-header{background:color-mix(in srgb,var(--arcade-lift)"));
  assert(html.includes(".arcade-match{border:") && html.includes("background:color-mix(in srgb,var(--arcade-lift)"));
});

test("Arcade Night renderer is identical in static and Edge bundles", async () => {
  const front = await readFile(new URL("../shared/arcade-night.mjs", import.meta.url), "utf8");
  const edge = await readFile(new URL("../supabase/functions/awe-api/shared/arcade-night.mjs", import.meta.url), "utf8");
  assert.equal(front, edge);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sampleForTemplate, templates } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";

const chapters = {
  atelier: "atelier-edition-stage",
  signal: "signal-broadcast-grid",
  orbit: "orbit-console-grid",
  afterhours: "afterhours-sequence-main",
};

test("four reference-led chapters have independent structure and working destinations", () => {
  for (const [id, signature] of Object.entries(chapters)) {
    const html = renderSite(sampleForTemplate(id), { sample: true });
    assert.match(html, new RegExp('class="signature signature-' + id + '"'), id);
    assert(html.includes(signature), id + " lacks its signature composition");
    assert(html.includes('href="#work"'), id + " has no working path to the work");
    assert(html.includes('id="work"'), id + " has no destination");
    assert(!html.includes("<script"), id + " cannot inject executable code");
    if (["orbit", "afterhours"].includes(id)) {
      assert.match(html, /<details><summary>/, id + " lacks native keyboard-operable disclosure");
    }
  }
  for (const { id } of templates.filter(t => !chapters[t.id])) {
    assert(!renderSite(sampleForTemplate(id), { sample: true }).includes('class="signature signature-'), id);
  }
});

test("chapters use sanitized customer copy and do not inject sample imagery or fictional results", () => {
  const config = sampleForTemplate("orbit");
  const html = renderSite({
    ...config,
    content: { ...config.content, name: "Studio <script>bad()</script>", headline: "Invent & explore" },
  });
  assert(html.includes("Studio &lt;script&gt;bad()&lt;/script&gt;"));
  assert(!html.includes("<script>"));
  assert(html.includes("DESIGN STUDY"));
  assert(!html.includes("40.7128"));
  assert(!html.includes("images.unsplash.com"));
});

test("server renderer copies match public renderer copies", async () => {
  for (const path of ["creative-signatures.mjs", "premium.mjs"]) {
    const publicCopy = await readFile(new URL("../shared/" + path, import.meta.url), "utf8");
    const serverCopy = await readFile(new URL("../supabase/functions/awe-api/shared/" + path, import.meta.url), "utf8");
    assert.equal(publicCopy, serverCopy, path);
  }
});

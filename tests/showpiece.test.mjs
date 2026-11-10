import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { templates, sampleForTemplate, normalize, esc } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { renderApprovedDesignPages, allowedApprovedPageNames } from "../shared/approved-pages.mjs";
import { showpieceDesigns } from "../shared/showpiece/index.mjs";
import { SHOWPIECE_ENGINE, isShowpieceMultipage } from "../shared/showpiece-site.mjs";

const customer = (id, content = {}, design = {}) => {
  const s = sampleForTemplate(id);
  return normalize({ ...s, template: id, content: { ...s.content, publicEmail: "", ...content }, design: { ...s.design, ...design } });
};

test("every catalog template has its own showpiece design with a unique root class", () => {
  assert.equal(Object.keys(showpieceDesigns).length, templates.length);
  for (const t of templates) assert(showpieceDesigns[t.id], t.id);
  const roots = Object.values(showpieceDesigns).map((d) => d.root);
  assert.equal(new Set(roots).size, roots.length);
});

test("demos are labelled and script-free; customer pages carry no demo banner or demo copy", () => {
  for (const t of templates) {
    const d = showpieceDesigns[t.id];
    const demo = renderSite(sampleForTemplate(t.id), { sample: true });
    assert(demo.includes("FICTIONAL TEMPLATE DEMO"), t.id);
    assert(!/<script\b/i.test(demo), t.id);
    const site = renderSite(customer(t.id, { name: "QA <Name> & Co" }));
    assert(!site.includes("FICTIONAL TEMPLATE DEMO"), t.id);
    assert(site.includes(esc("QA <Name> & Co")) && !site.includes("<Name>"), t.id);
    if (d.demo.headline !== sampleForTemplate(t.id).content.headline) assert(!site.includes(esc(d.demo.headline)), t.id + " leaks the demo headline");
    assert(!/<script\b/i.test(site), t.id);
  }
});

test("no email means no contact panel, contact link or placeholder; a real email is clickable", () => {
  for (const t of templates) {
    const html = renderSite(customer(t.id));
    assert(!html.includes('id="contact"') && !html.includes('href="#contact"'), t.id);
    assert(!html.includes("Contact details will be added"), t.id);
  }
  const html = renderSite(customer("md-zapier", { publicEmail: "hello@client-example.org" }));
  assert(html.includes('href="mailto:hello@client-example.org"'));
});

test("customer extras are escaped and only HTTPS links survive", () => {
  const html = renderSite(customer("index", {
    testimonials: [{ quote: "<img src=x onerror=evil()>", attribution: "Ana" }],
    links: ["https://example.org/me", "javascript:evil()"],
    cards: [{ title: "Project", description: "D", url: "https://example.org/p" }],
  }));
  assert(html.includes("&lt;img src=x onerror=evil()&gt;"));
  assert(html.includes('href="https://example.org/me"') && html.includes('href="https://example.org/p"'));
  assert(!html.includes("javascript:"));
});

test("customer section choices and order are respected", () => {
  const html = renderSite(customer("md-zapier", {}, { sections: ["services", "work", "contact"] }));
  assert(html.indexOf('id="services"') < html.indexOf('id="work"'));
  const noWork = renderSite(customer("md-zapier", {}, { sections: ["services", "contact"] }));
  assert(!noWork.includes('id="work"'));
});

test("a customer's main colour recolours the accent only on their site", () => {
  const recoloured = renderSite(customer("md-zapier", {}, { primary: "#123456" }));
  assert(recoloured.includes("--orange:#123456"));
  assert(!renderSite(sampleForTemplate("md-zapier"), { sample: true }).includes("#123456"));
  const fixed = renderSite(customer("monobrutalist", {}, { primary: "#123456" }));
  assert(!fixed.includes("#123456"), "fixed palettes stay fixed");
});

test("motion-free pages apply the reduced-motion artwork", () => {
  const still = renderSite(customer("daylight", {}, { animation: "none" }));
  assert(still.includes('class="motion-none"'));
  assert(still.includes("svg path{stroke-dashoffset:0!important}"));
});

test("five-page versions saved before the new engine keep their original design", () => {
  for (const t of templates.filter((x) => isShowpieceMultipage(x.id))) {
    const input = customer(t.id);
    const legacy = renderApprovedDesignPages(input);
    const current = renderApprovedDesignPages({ ...input, engine: SHOWPIECE_ENGINE });
    assert.deepEqual(Object.keys(current).sort(), [...allowedApprovedPageNames(t.id)].sort(), t.id);
    for (const html of Object.values(legacy)) assert(!html.includes('data-awe-engine="showpiece"'), t.id);
    for (const html of Object.values(current)) {
      assert(html.includes('data-awe-engine="showpiece"'), t.id);
      assert(html.includes('data-awe-design-credit="v1"'), t.id);
      assert(!/<script\b/i.test(html), t.id);
    }
  }
});

test("showpiece files are mirrored byte-for-byte to the edge function", async () => {
  const files = ["showpiece-site.mjs", "showpiece/index.mjs", "showpiece/kit.mjs", "showpiece/accents.mjs",
    ...(await readdir(new URL("../shared/showpiece/designs/", import.meta.url))).map((f) => "showpiece/designs/" + f)];
  for (const f of files) {
    const [a, b] = await Promise.all([
      readFile(new URL("../shared/" + f, import.meta.url), "utf8"),
      readFile(new URL("../supabase/functions/awe-api/shared/" + f, import.meta.url), "utf8"),
    ]);
    assert.equal(a, b, f);
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { findOriginalSiteLinks } from "../scripts/preview-link-policy.mjs";

test("no published preview links back to a business's original website", async () => {
  const root = "branded-previews/public";
  let pages = 0;
  async function walk(folder) {
    for (const item of await readdir(folder, { withFileTypes: true })) {
      const path = folder + "/" + item.name;
      if (item.isDirectory()) await walk(path);
      else if (path.endsWith(".html")) {
        pages++;
        const html = await readFile(path, "utf8");
        assert.deepEqual(findOriginalSiteLinks(html), [], path + " contains a forbidden outgoing original-website link");
      }
    }
  }
  await walk(root);
  assert.ok(pages >= 220, "Expected all public site and subpage HTML to be checked");
});

test("generated preview concepts are upgraded with distinctive editorial details and responsive styles", async () => {
  const sites = JSON.parse(await readFile("qa/111-prospect-revamp.json", "utf8")).sites;
  let upgraded = 0;
  for (const site of sites) {
    const html = await readFile("branded-previews/public/" + site.slug + "/index.html", "utf8");
    if (!html.includes("awe-distinctive-direction-2026")) continue;
    assert.match(html, /data-awe-v2="2026-11-08"/, site.slug + " lacks new art direction");
    assert.match(html, /class="awe-v2-panel" id="details"/, site.slug + " lacks expanded editorial details");
    assert.match(html, /@media\(max-width:760px\)/, site.slug + " lacks mobile composition");
    upgraded++;
  }
  // Sites leave the shared editorial panel as they receive individual redesigns.
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("preview CSP allows every remote image source used by business previews", async () => {
  const config = JSON.parse(await readFile("branded-previews/firebase.json", "utf8"));
  const policy = config.hosting.headers
    .flatMap(rule => rule.headers)
    .find(header => header.key.toLowerCase() === "content-security-policy")?.value;
  assert.ok(policy, "Preview Hosting must declare its own CSP");
  const imageDirective = policy.match(/(?:^|;)\s*img-src\s+([^;]+)/)?.[1];
  assert.ok(imageDirective, "Preview CSP must set img-src");
  const sources = new Set(imageDirective.split(/\s+/));
  let stockPhotoCount = 0;
  for (const slug of ["bao-dumpling", "mesa-bar", "casa-serra", "solerum", "jj-deli", "chong"]) {
    const html = await readFile(`preview/${slug}/index.html`, "utf8");
    for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/g)) {
      const src = match[1];
      if (!/^https?:\/\//.test(src)) continue; // First-party assets are covered by 'self'.
      const url = new URL(src);
      assert.equal(url.protocol, "https:", `${slug}: insecure photo source ${src}`);
      assert.ok(sources.has(url.origin), `${slug}: CSP blocks image origin ${url.origin}`);
      if (url.hostname === "images.pexels.com") stockPhotoCount++;
    }
  }
  assert.equal(stockPhotoCount, 9, "The nine verified, licensed stock photos must remain displayable");
});

test("business preview photos display without stock-photo overlay labels", async () => {
  const sites = ["bao-dumpling", "mesa-bar", "casa-serra", "solerum", "jj-deli", "chong"];
  for (const site of sites) {
    const html = await readFile(`preview/${site}/index.html`, "utf8");
    assert.doesNotMatch(html, /illustrative stock photograph(?:y)?/i, `${site}: do not display stock photo label`);
    assert.doesNotMatch(html, /<(?:figcaption|span)\\b[^>]*>\\s*illustrative stock photograph/i,
      `${site}: image overlay labels must not reappear`);
    assert.match(html, /aweconcepts\\.com|Awe Concepts/i, `${site}: preserve Awe Concepts attribution`);
  }
});

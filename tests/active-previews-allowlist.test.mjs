import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

// The live Firebase Hosting output is pruned to a machine-readable allowlist
// (qa/active-previews-allowlist.json) by scripts/publish-selected-previews.mjs.
// These tests guard that contract so the publishing restriction cannot be
// silently weakened and so an unverified prospect cannot be published merely by
// appearing in prospect research.

const EXISTING_19 = [
  "shotsbyriq","jay-millz-shot-em","bao-dumpling","mesa-bar","casa-serra",
  "solerum","tbili","santuario-cafe","le-loup-cafe","duro-market",
  "cafe-aroma-y-sabor","fiolicchia-bakery","from-duo","cultiva-cafe","hots-coffee",
  "rachels-handmade-cookies","worksbynet","tiny-topiary","cafe-pr"
];

const loadAllowlist = async () =>
  JSON.parse(await readFile("qa/active-previews-allowlist.json", "utf8"));

test("allowlist is well-formed with unique, valid slugs and display names", async () => {
  const a = await loadAllowlist();
  assert.ok(Array.isArray(a.active) && a.active.length > 0, "active must be a non-empty array");
  const slugs = a.active.map(e => e.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate slugs in allowlist");
  for (const e of a.active) {
    assert.match(e.slug, /^[a-z0-9-]+$/, "invalid slug: " + e.slug);
    assert.ok(typeof e.name === "string" && e.name.trim(), "missing name for " + e.slug);
    assert.ok(typeof e.group === "string" && e.group.trim(), "missing group for " + e.slug);
  }
});

test("every active allowlist slug has a real source directory (no phantom publishes)", async () => {
  const a = await loadAllowlist();
  for (const e of a.active) {
    const s = await stat("preview/" + e.slug).catch(() => null);
    assert.ok(s && s.isDirectory(), "active slug has no preview/ source: " + e.slug);
  }
});

test("the verified existing-19 core is always present on the allowlist", async () => {
  const a = await loadAllowlist();
  const slugs = new Set(a.active.map(e => e.slug));
  for (const slug of EXISTING_19) assert.ok(slugs.has(slug), "core site dropped from allowlist: " + slug);
  const core = a.active.filter(e => e.group === a.requiredCoreGroup);
  assert.ok(core.length >= 19, "requiredCoreGroup must retain >= 19 sites, found " + core.length);
});

test("publish script is driven by the allowlist, not a hardcoded site array", async () => {
  const src = await readFile("scripts/publish-selected-previews.mjs", "utf8");
  assert.match(src, /active-previews-allowlist\.json/, "publish script must read the allowlist file");
  assert.doesNotMatch(src, /assert\.equal\(allowed\.size,19\)/, "hardcoded 19-count regression");
});

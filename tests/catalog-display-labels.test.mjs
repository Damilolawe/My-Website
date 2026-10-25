import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates } from "../shared/model.mjs";

test("current authored catalog labels override older API labels in the order gallery", async () => {
  const source = await readFile(new URL("../app/order.mjs", import.meta.url), "utf8");
  // The API may still publish old demo titles while a static deployment introduces
  // approved generic labels. Authored display data must take final precedence.
  assert.match(
    source,
    /const galleryTemplates=templates\.map\(t=>\(\{\s*\.\.\.\(catalog\.templates\|\|\[\]\)\.find\(remote=>remote\.id===t\.id\),\s*\.\.\.t\s*\}\)\);/,
  );
  for (const [id, name] of [
    ["runwayml", "Cinematic"],
    ["runwaymulti", "Cinematic Pages"],
    ["clay", "Sculpt"],
    ["nike", "Athletic"],
    ["ferrari", "Motorsport"],
  ]) {
    const authored = templates.find(t => t.id === id);
    assert.equal(authored?.name, name, id);
    const staleApi = { id, name: "Old demo name", style: "Old style" };
    const display = { ...staleApi, ...authored };
    assert.equal(display.name, name, id + " must not revert to stale API label");
    assert.equal(display.style, authored.style, id + " should retain authored art direction");
  }
});

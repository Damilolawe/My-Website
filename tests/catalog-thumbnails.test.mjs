import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import sharp from "sharp";
import { templates } from "../shared/model.mjs";

test("built catalog contains a nonblank optimized screenshot for every published template", async () => {
  const root = new URL("../dist/assets/catalog-thumbnails/", import.meta.url);
  const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));
  assert.equal(Object.keys(manifest.hashes).length, templates.length);
  for (const template of templates) {
    const path = new URL(`${template.id}.webp`, root);
    const [file, info] = await Promise.all([readFile(path), stat(path)]);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.format, "webp", template.id);
    assert.equal(metadata.width, 640, template.id);
    assert.ok(metadata.height >= 400 && metadata.height <= 900, template.id + " screenshot dimensions");
    assert.ok(info.size > 2500 && info.size < 500_000, template.id + " screenshot file size");
  }
});

test("thumbnail generation screenshots the current still-render inventory and caches source hashes", async () => {
  const source = await readFile(new URL("../scripts/generate-template-thumbnails.mjs", import.meta.url), "utf8");
  const build = await readFile(new URL("../scripts/build.mjs", import.meta.url), "utf8");
  const velocity = await readFile(new URL("../shared/zip-flagship-velocity.mjs", import.meta.url), "utf8");
  assert.match(source, /import \{ templates \} from "\.\.\/shared\/model\.mjs"/);
  assert.match(source, /home\.html/);
  assert.match(source, /page\.screenshot/);
  assert.match(source, /createHash\("sha256"\)/);
  assert.match(build, /generateTemplateThumbnails\(\)/);
  assert.match(velocity, /\.fv-hero-fallback\{position:absolute;inset:0;z-index:0\}/);
});

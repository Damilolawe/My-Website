import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

test("Google favicon and legacy icon use the approved AWE brand mark", async () => {
  const html = await readFile("index.html", "utf8");
  assert.match(html, /<link rel="icon" type="image\/png" sizes="192x192" href="\/favicon\.png">/);
  assert.match(html, /<link rel="icon" type="image\/x-icon" sizes="48x48" href="\/favicon\.ico">/);
  const svg = await readFile("favicon.svg");
  const png = await readFile("dist/favicon.png");
  const pngInfo = await sharp(png).metadata();
  assert.equal(pngInfo.width, 192);
  assert.equal(pngInfo.height, 192);
  assert.deepEqual(png, await sharp(svg).resize(192, 192).png().toBuffer());
  const ico = await readFile("dist/favicon.ico");
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 1);
  assert.equal(ico[6], 48);
  assert.equal(ico[7], 48);
  assert.equal(ico.readUInt32LE(18), 22);
  const icoPng = ico.subarray(22);
  assert.equal(ico.readUInt32LE(14), icoPng.length);
  assert.deepEqual(icoPng, await sharp(svg).resize(48, 48).png().toBuffer());
  assert.notDeepEqual(ico, await readFile("favicon.ico"), "Old AW icon must not reach public Hosting");
});

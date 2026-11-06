import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test("House of Amrut is a researched Indian single malt speakeasy, not a generic restaurant", async () => {
  const index = await readFile("preview/house-of-amrut/index.html", "utf8");
  const css = await readFile("preview/house-of-amrut/styles.css", "utf8");
  assert.match(index, /Indian Single Malt/i);
  assert.match(index, /136 Newark Avenue/);
  assert.match(index, /Sati Sharma/);
  assert.doesNotMatch(index, /photo-1546069901|generic front door|Find your place at the house/i);
  assert.match(css, /\.hero-photo/);
  assert.match(css, /\.inner-hero/);
  assert.match(css, /prefers-reduced-motion/);
});

test("House of Amrut has four independent researched pages in the deployment output", async () => {
  for (const kind of ["story", "services", "journal", "visit"]) {
    const name = `preview/house-of-amrut/${kind}.html`;
    const authored = await readFile(name, "utf8");
    const published = await readFile(`branded-previews/public/house-of-amrut/${kind}.html`, "utf8");
    assert.match(authored, /House of Amrut/i);
    assert.match(published, /class="inner-hero"/);
    assert.match(published, /data-awe-design-credit="v1"/);
    assert.doesNotMatch(published, /This independent design concept is shaped around the character of the business/i);
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const slugs = ["tbili", "la-mestiza", "santuario-cafe", "le-loup-cafe", "duro-market", "the-block-coffee", "splendid-cafe", "cafe-aroma-y-sabor", "fiolicchia-bakery", "hairby-matty", "from-duo", "studio-and-story", "underscore-glasserie", "atma-yoga", "four-winds-games", "cultiva-cafe", "hots-coffee", "nena-sweets-cakes", "bier-cheese", "rachels-handmade-cookies", "dovetail-bakery", "smor-carroll-gardens", "caputo-bagels", "swaines-bk", "vibra-bronx"];

test("large-scale prospect batches are complete public concepts", async () => {
  for (const slug of slugs) {
    const source = await readFile(`preview/${slug}/index.html`, "utf8");
    const css = await readFile(`preview/${slug}/styles.css`, "utf8");
    const output = await readFile(`branded-previews/public/${slug}/index.html`, "utf8");
    assert.match(source, /Independent [^<]{0,60}concept/i);
    assert.match(source, /<meta name="viewport"/i);
    assert.match(source, /<meta name="robots" content="noindex,nofollow">/i);
    assert.match(css, /prefers-reduced-motion/);
    assert.doesNotMatch(source, /Illustrative stock photography|Lorem ipsum|placeholder/i);
    assert.match(output, /awe-design-credit/);
    assert.match(output, /https:\/\/aweconcepts\.com/);
    assert.match(output, /styles\.css\?v=motion-20261102/);
    assert.match(output, /site\.js\?v=motion-20261102/);
  }
});


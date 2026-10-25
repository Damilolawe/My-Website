import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");

test("impact statement keeps its three text lines separated at laptop widths", async () => {
  const [markup, css, script] = await Promise.all([
    read("index.html"), read("awe-relaunch.css"), read("awe-relaunch.js")
  ]);
  assert.match(markup, /id="awe-impact-title"><span>YOUR WORLD\.<\/span><span>YOUR RULES\.<\/span><em>Nothing ordinary\.<\/em>/);
  assert.match(css, /\.awe-impact-statement h2\{[^}]*clamp\(64px,9\.6vw,168px\)\/1\.03/);
  assert.match(css, /\.awe-impact-statement h2 em\{[^}]*\/1\.13 Georgia[^}]*margin-top:clamp\(18px,2\.8vw,40px\)/);
  assert.match(css, /@media\(min-width:801px\) and \(max-width:1200px\)/);
  assert.match(css, /@media\(max-width:800px\)/);
  const start = script.indexOf('if(document.querySelector(".awe-impact-statement h2 span")');
  const end = script.indexOf('if(document.querySelector(".impact-bottom>*")', start);
  assert(start >= 0 && end > start);
  const motion = script.slice(start, end);
  assert.doesNotMatch(motion, /\by\s*:\s*110|rotation:/, "Headline must not slide into the italic tagline");
  assert.match(motion, /opacity:0/);
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Homepage actor showreel balances letter spacing, word spacing and line height",async()=>{
 const [html,css]=await Promise.all([read("index.html"),read("awe-relaunch.css")]);
 assert(html.includes('<em>A STORY.</em>'));
 assert.match(css,/\.reel-actor-copy strong\{[^}]*letter-spacing:-\.12em/);
 assert.match(css,/\.reel-actor-copy strong em\{[^}]*letter-spacing:0;word-spacing:\.18em/);
 assert.match(css,/\.reel-actor-copy strong\{[^}]*\/\.98 system-ui/);
  assert.match(css,/\.reel-actor-copy strong em\{[^}]*\/1\.12 Georgia/);
  assert(!css.includes("word-spacing:.18em"));
});

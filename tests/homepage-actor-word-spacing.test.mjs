import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Homepage actor showreel gives A and STORY. normal glyph tracking and extra word spacing",async()=>{
 const [html,css]=await Promise.all([read("index.html"),read("awe-relaunch.css")]);
 assert(html.includes('<em>A STORY.</em>'));
 assert.match(css,/\.reel-actor-copy strong\{[^}]*letter-spacing:-\.12em/);
 assert.match(css,/\.reel-actor-copy strong em\{[^}]*letter-spacing:0;word-spacing:\.18em/);
 assert(!css.includes('.reel-actor-copy strong em{font:italic 400 1em Georgia,serif;color:#f7ceae}'));
});

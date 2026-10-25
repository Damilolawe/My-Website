import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");

test("Homepage actor showreel uses readable display tracking and natural A STORY. word spacing",async()=>{
 const [html,css]=await Promise.all([read("index.html"),read("awe-relaunch.css")]);
 assert(html.includes("<em>A STORY.</em>"));
 assert.match(css,/\.reel-actor-copy strong\{[^}]*\/\.98 system-ui;letter-spacing:-\.035em;word-spacing:\.015em/);
 assert.match(css,/\.reel-actor-copy strong em\{[^}]*\/1\.12 Georgia,serif;[^}]*letter-spacing:-\.035em;word-spacing:normal/);
 assert.doesNotMatch(css,/\.reel-actor-copy strong\{[^}]*letter-spacing:-\.12em/);
 assert.doesNotMatch(css,/\.reel-actor-copy strong em\{[^}]*word-spacing:\.18em/);
});

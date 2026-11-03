import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=name=>readFile(`branded-previews/public/mesa-bar/${name}`,"utf8");
test("Mesa Bar concept is factual, safe and distinctly designed",async()=>{
 const [html,css,js]=await Promise.all([read("index.html"),read("styles.css"),read("site.js")]);
 assert.match(html,/Independent pre-opening design concept by Awe Concepts/i);
 assert.match(html,/Not the official Mesa Bar website/i);
 assert.match(html,/noindex,nofollow/);
 assert.match(html,/220 Front Street/);
 assert.match(html,/Expected in 2026/);
 for(const fact of ["Levent Cakir","Spaghetti Western","vinyl","wine tastings"])assert.ok(html.includes(fact),`Missing ${fact}`);
 assert.match(html,/data-awe-design-credit="v1"/);
 assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
 assert.doesNotMatch(html,/<form\b/i);
 assert.doesNotMatch(html,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF]/u);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);
 for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)){
  if(match[1].startsWith("#"))assert.ok(ids.includes(match[1].slice(1)),`Broken ${match[1]}`);
  if(match[0].includes('target="_blank"'))assert.match(match[0],/rel="noopener noreferrer"/);
 }
 assert.match(css,/--clay:#b84e32/);
 assert.match(css,/@media\(max-width:680px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(js,/setTimeout|setInterval/);
});

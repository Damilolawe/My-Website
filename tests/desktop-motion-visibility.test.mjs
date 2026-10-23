import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Studio has always-on desktop motion and no dead or hidden pause controls",async()=>{
 const [script,html,css]=await Promise.all(["script.js","index.html","hero-layout-fix.css"].map(read));
 assert(script.includes("const paused=false"));
 assert(script.includes("function startReveals()"));
 assert(script.includes("document.querySelectorAll('.reveal').forEach"));
 assert(!script.includes("localStorage.getItem('awe-motion')"));
 assert(!script.includes("reduce.matches"));
 assert(!html.includes('id="motion-toggle"'));
 assert(!html.includes('id="motion-resume"'));
 assert(css.includes(".awe-motion-on.motion-ready .reveal.in-view"));
});
test("Always-on desktop hero, 3D and gallery ignore reduced-motion gating",async()=>{
 const [reel,three,cinema,gallery]=await Promise.all(["awe-relaunch.js","sculpture.js","cinema.js","showcase.js"].map(read));
 assert(!reel.includes("reduced.matches"));
 assert(!three.includes("(prefers-reduced-motion: reduce)"));
 assert(cinema.includes('"(max-width:900px), (pointer:coarse)"'));
 assert(gallery.includes("const still=false"));
});
test("Client-facing UX includes an honest inquiry journey and preserves public links",async()=>{
 const [html,style,build]=await Promise.all(["index.html","studio-reimagined.css","scripts/build.mjs"].map(read));
 assert(html.includes('id="approach"'));
 assert(html.includes("Nothing goes live without approval"));
 assert(html.includes('class="worlds-contact-link" href="/contact.html"'));
 assert(style.includes(".journey-grid"));
 assert(style.includes("@media(max-width:680px)"));
 assert(build.includes('"studio-reimagined.css"'));
});
test("Audit issues 001-006 have targeted source fixes",async()=>{
 const [style,edge,dialog,app,gallery]=await Promise.all(["shared/collection-edition.mjs","supabase/functions/awe-api/shared/collection-edition.mjs","case-studies.js","app/app.css","showcase.css"].map(read));
 assert.equal(style,edge);
 assert(style.includes("body.daylight .daylight-tab{pointer-events:none!important"));
 assert(style.includes("word-break:normal!important"));
 assert(style.includes("body.signal .shell-signal"));
 assert(dialog.includes("AWE CONCEPTS — PROJECT FILE"));
 assert(!dialog.includes("AWE / DIGITAL"));
 assert(app.includes(".skip-link:focus-visible"));
 assert(gallery.includes(".worlds-device-actions{position:relative;z-index:5}"));
});
test("Browser QA checks desktop motion, OS reduced-motion override and iPhone stability",async()=>{
 const qa=await read("scripts/browser-qa.mjs");
 for(const word of ["DESKTOP_MOTION_START","DESKTOP_REVEAL","DESKTOP_MOTION_REDUCED_OS","SCROLL_STABILITY","AUDIT_DAYLIGHT_CONTACT"])
  assert(qa.includes(word),word);
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Desktop entrances use fail-open IntersectionObserver and persistently paused visitors get a clear recovery control",async()=>{
 const [main,markup,css]=await Promise.all(["script.js","index.html","hero-layout-fix.css"].map(read));
 assert(main.includes("function syncReveals()"));
 assert(main.includes("revealObserver=new IntersectionObserver"));
 assert(main.includes("$('.reveal').forEach"),"Must iterate the NodeList, not the first element");
 assert.doesNotMatch(main,/(^|[^$])\\$\\('\\.reveal'\\)\\.forEach/m,"Cannot call forEach on a single Element");
 assert(main.includes("document.documentElement.classList.toggle('motion-ready',active)"));
 assert(markup.includes('id="motion-resume"'));
 assert(main.includes("resumeButton?.addEventListener('click'"));
 assert(css.includes(".motion-resume-banner[hidden]"));
 assert(css.includes("html.motion-ready:not(.motion-paused) .reveal.in-view"));
 assert(!main.includes("gsap.from(el,{y:35"),"Reveal must not fight with CSS observer motion");
});
test("Re-enabling motion re-arms GSAP editorial animations",async()=>{
 const source=await read("awe-relaunch.js");
 assert(source.includes("context?.revert();context=null"));
 assert(source.includes("document.addEventListener('awe:motion',startMotion)"));
 assert(source.includes("window.gsap.context"));
});
test("Template desktop sample photography animates visibly but customer/reduced/none choices remain protected",async()=>{
 const front=await read("shared/collection-edition.mjs");
 const edge=await read("supabase/functions/awe-api/shared/collection-edition.mjs");
 assert.equal(front,edge);
 assert(front.includes("awe-edition-camera"));
 assert(front.includes("body.motion-expressive .site-architecture .hero-media .study-shot::before"));
 assert(front.includes("@media(prefers-reduced-motion:reduce)"));
 assert(front.includes("body.motion-none .site-architecture .study-shot::before"));
 const html=renderSite(sampleForTemplate("afterhours"),{sample:true});
 assert(html.includes("awe-edition-camera"));
 assert(!renderSite(sampleForTemplate("afterhours")).includes('class="study-shot '));
});
test("Production browser QA checks real motion and recovery, not just static screenshots",async()=>{
 const qa=await read("scripts/browser-qa.mjs");
 for(const term of ["DESKTOP_MOTION_START","DESKTOP_REVEAL","DESKTOP_MOTION_RESUME","hero carousel did not advance"])
  assert(qa.includes(term),term);
 assert(qa.includes("iPhone-390 scroll stability"));
 assert(qa.includes('page.on("pageerror"'),"Desktop smoke must catch startup exceptions");
});

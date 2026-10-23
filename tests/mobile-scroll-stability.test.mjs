import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("Home never reloads on WebGL recovery and mobile skips decorative GPU rendering",async()=>{
 const code=await read("sculpture.js");
 assert(!code.includes("location.reload()"),"WebGL recovery must not reload the page");
 assert(code.includes("mobileOrReduced"));
 assert(code.includes("(pointer: coarse)"));
 assert(code.includes("webglcontextrestored"));
});
test("Mobile avoids automatic carousel churn and scroll-triggered animation refresh",async()=>{
 const [main,hero,transform]=await Promise.all(["script.js","awe-relaunch.js","cinema.js"].map(read));
 assert(main.includes("if(compactTouch.matches||!window.gsap||!window.ScrollTrigger)return;"));
 assert(hero.includes("!compactTouch.matches;"));
 assert(hero.includes("if(compactTouch.matches)return;"));
 assert(transform.includes("(pointer:coarse)"));
});
test("Mobile gallery preview is deferred until gallery approaches",async()=>{
 const source=await read("showcase.js");
 assert(source.includes("const deferPreview=matchMedia"));
 assert(source.includes("if(!previewReady)return;"));
 assert(source.includes('rootMargin:"450px 0px"'));
 assert(source.includes("previewReady=true;choose(selected)"));
});
test("Live browser QA checks motion-enabled touch scrolling beyond one carousel cycle",async()=>{
 const qa=await read("scripts/browser-qa.mjs");
 assert(qa.includes('reducedMotion:"no-preference"'));
 assert(qa.includes("await page.waitForTimeout(8300)"));
 assert(qa.includes("mainNavigations!==1"));
 assert(qa.includes("SCROLL_STABILITY"));
});

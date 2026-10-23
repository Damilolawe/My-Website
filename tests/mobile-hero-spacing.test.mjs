import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
test("Mobile hero reserves actual height for carousel and its controls",async()=>{
 const css=await read("hero-layout-fix.css");
 assert(css.includes(".hero-art .awe-hero-showreel"));
 assert(css.includes("position:relative!important"));
 assert(css.includes("aspect-ratio:auto!important"));
 assert(css.includes(".hero-art .showreel-controls"));
 assert(css.includes(".hero-footer.page-width"));
});
test("Production mobile QA measures the physical gap, not only horizontal overflow",async()=>{
 const qa=await read("scripts/browser-qa.mjs");
 assert(qa.includes("MOBILE_HERO_CLEARANCE"));
 assert(qa.includes("footerTop-heroFit.controlsBottom<20"));
 assert(qa.includes("heroFit.controlsBottom>heroFit.artBottom+1"));
});

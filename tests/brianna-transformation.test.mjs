import test from "node:test";
import assert from "node:assert/strict";
import {readFile, stat} from "node:fs/promises";
import sharp from "sharp";

const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
const assets=[
 {name:"before",path:"brianna-before.webp",text:"Original"},
 {name:"after",path:"brianna-after.webp",text:"Redesign"},
];

test("real Brianna transformation replaces the repetitive services rows, preserving the offer and pricing",async()=>{
 const html=await read("index.html");
 assert(html.includes('id="brianna-transformation"'));
 assert(html.includes('data-bld-showcase data-active="after"'));
 assert(!html.includes('class="services-list"'));
 assert(!html.includes('class="service-row reveal"'));
 assert(html.includes('class="service-options"'),"The AWE Express and Custom offer cards stay");
 assert(html.includes('id="pricing"') && html.includes('id="contact"'));
 assert(!html.includes('id="bld-range"'),"The second comparison slider must be removed");
 assert(!html.includes('data-bld-compare'),"Old duplicate slider implementation must not return");
});

test("Brianna's user-approved screenshots are permanently shipped in the repository and in the Firebase build",async()=>{
 const html=await read("index.html");
 for(const {name,path} of assets){
   const sourceFile=new URL("../assets/case-studies/"+path,import.meta.url);
   const builtFile=new URL("../dist/assets/case-studies/"+path,import.meta.url);
   const [sourceStat,builtStat]=await Promise.all([stat(sourceFile),stat(builtFile)]);
   assert(sourceStat.size>20_000,path+" should contain a real optimized screenshot");
   assert.equal(builtStat.size,sourceStat.size,path+" must be copied unmodified to Firebase output");
   const info=await sharp(await readFile(sourceFile)).metadata();
   assert.equal(info.format,"webp");
   assert(info.width>=1500&&info.height>=700,path+" must remain sharp in the enlargement viewer");
   assert(html.includes('data-bld-shot="'+name+'" src="/assets/case-studies/'+path+'"'),
     path+" screenshot must be displayed in the cinema gallery");
 }
 const build=await read("scripts/build.mjs");
 assert(build.includes('"assets"'),"Build must copy case study images");
 const deploy=await read("scripts/deploy-verified-cloud-shell.sh");
 assert(!deploy.includes("node scripts/capture-brianna-sites.mjs"),
  "Cloud Shell must not recapture or overwrite user-provided screenshots");
});

test("real before-and-after cinema has focus switching, image enlargement and accessible keyboard controls",async()=>{
 const [html,js,css]=await Promise.all(["index.html","brianna-case.js","brianna-case.css"].map(read));
 for(const side of ["before","after"]){
   assert(html.includes('data-bld-panel="'+side+'"'),side+" browser frame missing");
   assert(html.includes('data-bld-focus="'+side+'"'),side+" foreground control missing");
   assert(html.includes('data-bld-open="'+side+'"'),side+" image enlargement control missing");
   assert(html.includes('data-bld-modal="'+side+'"'),side+" viewer switch missing");
 }
 assert(html.includes('data-bld-lightbox')&&html.includes('data-bld-lightbox-image'));
 assert(html.includes('data-bld-close'));
 assert.equal((html.match(/data-bld-open="/g)||[]).length,4,"Both screenshots and both footer actions must open the full-size viewer");
 assert(js.includes('viewer.showModal()'),"Enlarge must open a native modal");
 assert(js.includes('viewer.close()'),"Modal must be closable");
 assert(js.includes('focusButtons.find('),"Arrow navigation should move focus");
 assert(js.includes('event.key !== "ArrowLeft"')&&js.includes('event.key !== "ArrowRight"'),"Both arrow keys should be handled");
 assert(js.includes('setAttribute("aria-pressed"'),"Selected states should be accessible");
 assert(css.includes('@media(max-width:700px)'),"Phone layout missing");
 assert(css.includes('@media(prefers-reduced-motion:reduce)'),"Reduced motion guard missing");
 assert(css.includes('.bld-window-before')&&css.includes('.bld-window-after'),"Browser frames must remain distinct");
 assert(css.includes("#d1fa57")&&css.includes("#111316"),"Use the AWE homepage palette");
 assert(!js.includes('range.addEventListener'),"Do not reintroduce a second slider");
});

test("external original and Wix redesign links work without exposing editor sessions",async()=>{
 const html=await read("index.html");
 const original="https://www.briannalucilledemmings.com/";
 const redesign="https://damilolawe03.wixstudio.com/website?rc=test-site";
 assert(html.includes('href="'+original+'"'),"Actual original website link missing");
 assert(html.includes('href="'+redesign+'"'),"Actual redesign preview link missing");
 assert(!html.includes('editorSessionId=')&&!html.includes('metaSiteId='),"Never publish private Wix editor information");
 assert(html.includes('data-bld-capture-fallback'),"Missing-asset fallback must retain real-site links");
 assert(html.includes("These are actual screenshots"),"Screenshots should not be mislabeled as mockups");
 assert(!html.includes("These visuals are illustrative"));
 const client=await read("brianna-case.js");
 assert(client.includes('results.every(Boolean)'),"Only show the gallery when both image assets load");
});

test("built homepage includes the two screenshot assets instead of broken placeholders",async()=>{
 const built=await read("dist/index.html");
 const build=await read("scripts/build.mjs");
 assert(build.includes("const briannaCapturesReady"));
 assert(build.includes("data-capture-pending="),"Future partial asset loss must fall back safely");
 for(const {path} of assets){
   const url="/assets/case-studies/"+path;
   assert(built.includes('src="'+url+'"'),path+" must be a real loaded image after build");
   assert(!built.includes('data-capture-pending="'+url+'"'),path+" must not be marked missing");
 }
 assert(built.includes('data-bld-lightbox')&&built.includes('data-bld-showcase'));
});

test("homepage navigation stays Templates and Client Login, not the previous Express header CTA",async()=>{
 const html=await read("index.html");
 assert(html.includes('<a href="/order.html" class="nav-link">Templates ↗︎</a>'));
 assert(html.includes('<a href="/order.html">TEMPLATES <span>03 ↗︎</span></a>'));
 assert(html.includes('class="header-cta magnetic" href="/account.html" aria-label="Log in to your Awe Concepts client account"'));
 assert(html.includes('<span>CLIENT LOGIN</span>'));
 assert(html.includes('<a href="/account.html">CLIENT LOGIN <span>05 ↗︎</span></a>'));
 assert(html.includes('AWE Express.'),"The product name should remain in the offering");
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
test("Brianna interactive comparison replaces four static services rows, not the service offerings",async()=>{
 const html=await read("index.html");
 assert(html.includes('id="brianna-transformation"'));
 assert(html.includes('data-bld-compare'));
 assert(!html.includes('<div class="services-list">'));
 assert(!html.includes('class="service-row reveal"'));
 assert(html.includes('class="service-options"'),"Keep AWE Express and AWE Custom cards");
 assert(html.includes('id="pricing"'),"Existing pricing must remain");
 assert(html.includes('id="contact"'),"Existing contact section must remain");
 assert(html.includes('id="bld-range"'));
 for(const view of ["before","split","after"]){
  assert(html.includes('data-bld-view="'+view+'"'),"Missing "+view+" button");
 }
});
test("Correct public Wix test-site link is used instead of private editor session URL",async()=>{
 const html=await read("index.html");
 assert(html.includes('href="https://www.briannalucilledemmings.com/"'),"Original public website missing");
 assert(html.includes('href="https://damilolawe03.wixstudio.com/website?rc=test-site"'),"Exact Wix Studio test-site preview missing");
 assert(!html.includes("editorSessionId="),"Never publish Wix editor session identifiers");
 assert(!html.includes("metaSiteId="),"Never publish private Wix editor metadata");
 for(const label of ["ORIGINAL WEBSITE","WIX REDESIGN","OPEN ORIGINAL SITE","OPEN REDESIGN SITE"]){
  assert(html.includes(label),label);
 }
});
test("only authentic Brianna screenshots may appear in the interactive slider",async()=>{
 const html=await read("index.html");
 const js=await read("brianna-case.js");
 const capture=await read("scripts/capture-brianna-sites.mjs");
 const deploy=await read("scripts/deploy-verified-cloud-shell.sh");
 assert(!html.includes('bld-website bld-website-before'),"Original site must not be a simulated CSS mockup");
 assert(!html.includes('bld-website bld-website-after'),"Redesign must not be a simulated CSS mockup");
 assert(html.includes('data-bld-shot="before" src="/assets/case-studies/brianna-before.webp"'));
 assert(html.includes('data-bld-shot="after" src="/assets/case-studies/brianna-after.webp"'));
 assert(html.includes('data-bld-capture-fallback'),"Links must remain accessible if one capture fails");
 assert(html.includes('class="bld-viewport" style="--bld-split:52%" hidden'),"No uncaptured images may display by default");
 assert(js.includes("results.every(Boolean)"),"Comparison only opens when both captures are valid");
 assert(js.includes("fallback.hidden = false"),"Missing image must restore actual website links");
 assert(capture.includes("https://www.briannalucilledemmings.com/"));
 assert(capture.includes("https://damilolawe03.wixstudio.com/website?rc=test-site"));
 assert(capture.includes("writeOnce:true"),"Original image should never be overwritten by a later site update");
 assert(capture.includes("newPage(")&&capture.includes("page.screenshot("),"Capture must use real browser rendering");
 assert(deploy.includes("node scripts/capture-brianna-sites.mjs"),"Existing Cloud Shell deployment must capture first");
 assert(deploy.indexOf("node scripts/capture-brianna-sites.mjs")<deploy.indexOf("npm run build"),"Capture before building distributable images");
});

test("Mobile, accessible and keyboard-operable slider assets ship with static build",async()=>{
 const [html,css,js,build]=await Promise.all(["index.html","brianna-case.css","brianna-case.js","scripts/build.mjs"].map(read));
 for(const asset of ["brianna-case.css","brianna-case.js"]){
  assert(html.includes('"/'+asset+'"'),asset+" not linked");
  assert(build.includes('"'+asset+'"'),asset+" not copied to dist");
 }
 assert(css.includes("@media(max-width:700px)"),"Phone layout required");
 assert(css.includes("prefers-reduced-motion:reduce"),"Reduced motion support required");
 assert(css.includes("touch-action:pan-y"),"Vertical scrolling must still work");
 assert(html.includes('type="range"'),"Native keyboard/touch slider required");
 assert(js.includes('range.addEventListener("input"'),"Slider must respond to input");
 assert(js.includes("setAttribute(\"aria-pressed\""),"Buttons must reflect selected state");
 assert(js.includes('setAttribute("aria-valuetext"'),"Accessible value must track slider");
});

test("homepage navigation uses Templates and sends client login to the existing account page",async()=>{
 const html=await read("index.html");
 assert(html.includes('<a href="/order.html" class="nav-link">Templates ↗︎</a>'),
  "Desktop nav should be labeled Templates");
 assert(html.includes('<a href="/order.html">TEMPLATES <span>03 ↗︎</span></a>'),
  "Mobile nav should be labeled Templates");
 assert(html.includes('class="header-cta magnetic" href="/account.html" aria-label="Log in to your Awe Concepts client account"'),
  "The top-right action should open the real customer account login");
 assert(html.includes('<span>CLIENT LOGIN</span>'));
 assert(html.includes('<a href="/account.html">CLIENT LOGIN <span>05 ↗︎</span></a>'),
  "Mobile users need a visible client login option because the header CTA is hidden");
 assert(!html.includes('class="header-cta magnetic" href="#contact"'),
  "Old Start A Project header button must not return");
 assert(html.includes('AWE Express.'),"The service offering should retain its recognizable product name");
});

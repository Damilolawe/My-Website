import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {freeDesignTemplates} from "../shared/free-designmd.mjs";

const bentoIds=["md-bmw-m","md-coinbase","md-framer","md-mercury","md-notion","md-posthog","md-supabase"];
const overhangIds=["md-cohere","md-minimax","md-pinterest","md-zapier"];

test("seven Bento Signature landing pages constrain their existing artwork within the teaser",()=>{
 assert.equal(bentoIds.length,7);
 for(const id of bentoIds){
  const html=renderZipDesign(sampleForTemplate(id),{sample:true},"home");
  assert(html.includes('class="study-home-teaser"'),id+" needs the edited Home teaser");
  assert(html.includes('arch-work-bento'),id+" must preserve the bento identity");
  assert(html.includes('arch-work-bento .study-home-teaser .study-teaser-grid>.card:first-child .artbox'),id+" missing bounded visual");
  assert(html.includes('height:auto;aspect-ratio:1.4;overflow:hidden'),id+" inherited bento height still stretches art");
  assert(!html.includes("<script"),id+" client rendering must stay script-free");
 }
});
test("long-heading study sources keep their own typography but apply scoped safety",()=>{
 for(const id of overhangIds){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes("body.site.source-md-"+id.slice(3)),id+" source identity lost");
  assert(html.includes("overflow-x:clip"),id+" needs to prevent decorative sideways scrolling");
 }
 for(const id of ["md-cohere","md-zapier"]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes("body.site.source-"+id+" .arch-hero .arch-copy h1"),id+" still needs measured headline width");
 }
});
test("all ten FreeDesignMD templates contain bounded, usable native mobile menus",()=>{
 assert.equal(freeDesignTemplates.length,10);
 for(const t of freeDesignTemplates){
  const html=renderSite(sampleForTemplate(t.id),{sample:true});
  assert(html.includes('class="fd-mobile-menu"'),t.id+" mobile menu missing");
  assert(html.includes('aria-label="Mobile section navigation"'),t.id+" menu links missing");
  assert(html.includes('width:min(315px,calc(100vw - 36px))'),t.id+" floating menu can cross screen edge");
  assert(html.includes('body.fd-site .fd-header .fd-mobile-menu nav'),t.id+" missing anchored menu bounds");
 }
});
test("editorial display leading is fixed only on affected templates",()=>{
 for(const [id,selector] of [
  ["still","body.still h2"],["afterhours","body.afterhours h2"],["signal","body.signal h2"],
  ["brutalist","body.brutalist h2"],["portraiture","body.portraiture h2"],
  ["gazettebroadside","body.fd-gazettebroadside h2"],
  ["monobrutalist","body.fd-monobrutalist h2"]
 ]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes(selector+"{line-height:1."),id+" still risks touching editorial lines");
 }
});
test("preview and publishing renderers have identical repaired CSS",async()=>{
 for(const name of ["zip-design-render.mjs","free-designmd-render.mjs","typography-guard.mjs"]){
  const [frontend,backend]=await Promise.all([
   readFile(new URL("../shared/"+name,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+name,import.meta.url),"utf8")
  ]);
  assert.equal(frontend,backend,name+" server/preview visual mismatch");
 }
});

test("Fieldnotes mobile navigation contains wrapped links inside the viewport",()=>{
 for(const chapter of ["home","work","studio"]){
  const html=renderZipDesign(sampleForTemplate("md-mintlify"),{sample:true},chapter);
  assert(html.includes("body.site.fg-fieldnotes .fn-nav{width:100%;min-width:0;max-width:100%"),chapter+" needs bounded mobile navigation");
  assert(html.includes("body.site.fg-fieldnotes .fn-header{width:100%;min-width:0;max-width:100%"),chapter+" needs bounded mobile header");
 }
});

test("Binance and VoltAgent headlines no longer use oversized two-column display widths",()=>{
 for(const [id,size] of [["md-binance","3.6vw"],["md-voltagent","4.65vw"]]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes("body.site.source-"+id+" .arch-hero .arch-copy h1"),id+" requires explicit responsive art/text constraints");
  assert(html.includes(size),id+" lacked the screenshot-verified sizing adjustment");
 }
});

test("Retest regression: Fieldnotes uses shrinkable content grid tracks at 390px",()=>{
 for(const chapter of ["home","work","studio"]){
  const html=renderZipDesign(sampleForTemplate("md-mintlify"),{sample:true},chapter);
  assert(html.includes("body.site.fg-fieldnotes .fn-playbook{grid-template-columns:minmax(0,1fr)"),chapter+" still has intrinsic column overflow");
  assert(html.includes("body.site.fg-fieldnotes .fn-steps>.fn-step{grid-template-columns:35px minmax(0,1fr)"),chapter+" step grid still overhangs");
  assert(html.includes("body.site.fg-fieldnotes .fn-chapter h2{max-width:100%;overflow-wrap:break-word"),chapter+" heading is still unsafely wide");
 }
});
test("Retest regression: Minimax decorative hero is contained at wide screen widths",()=>{
 const html=renderZipDesign(sampleForTemplate("md-minimax"),{sample:true},"home");
 assert(html.includes("body.site.source-md-minimax main{min-width:0;max-width:100%;overflow-x:clip}"));
 assert(html.includes("body.site.source-md-minimax .arch-hero{min-width:0;max-width:100%;overflow:clip}"));
});

test("Fieldnotes Studio display text fits the mobile grid without breaking words",()=>{
 for(const chapter of ["home","work","studio"]){
  const html=renderZipDesign(sampleForTemplate("md-mintlify"),{sample:true},chapter);
  assert(html.includes("body.site.fg-fieldnotes .fn-paper-feature{"),chapter+" missing constrained 1fr paper-feature layout");
  assert(html.includes("grid-template-columns:minmax(0,1fr);min-width:0;width:100%;max-width:100%"),chapter+" paper-feature track still has intrinsic 379px min");
  assert(html.includes("font-size:clamp(32px,9.5vw,42px)"),chapter+" Studio display type remains too wide for a 390px phone");
  assert(html.includes("overflow-wrap:normal;text-wrap:balance"),chapter+" must preserve the long word unbroken");
 }
});
test("Minimax must fit the entire headline, not mask it using page overflow clipping",()=>{
 const html=renderZipDesign(sampleForTemplate("md-minimax"),{sample:true},"home");
 assert(html.includes("body.site.source-md-minimax .arch-hero .arch-copy h1{"));
 assert(html.includes("font-size:clamp(42px,4.9vw,82px)!important"));
});
test("Catalog browser scanner detects rendered text clipping, not only scroll overflow",async()=>{
 const audit=await readFile(new URL("../scripts/qa-catalog-visual.mjs",import.meta.url),"utf8");
 assert(audit.includes("document.createRange()"),"Need text ink rectangle measurement");
 assert(audit.includes('issues.push("H1 visible glyphs clipped'),"Clipped headlines must fail acceptance");
});

test("Fieldnotes mobile header uses accessible disclosure instead of two rows of links",()=>{
 for(const page of ["home","work","features","studio","contact"]){
  const html=renderZipDesign(sampleForTemplate("md-mintlify"),{sample:true},page);
  assert(html.includes('class="fn-mobile-menu"'),page+" mobile toggle missing");
  assert(html.includes('aria-label="Mobile navigation"'),page+" mobile nav label missing");
  assert(html.includes('body.site.fg-fieldnotes .fn-header>.fn-nav{display:none}'),page+" old menu still visible");
  assert(html.includes('width:min(310px,calc(100vw - 40px))'),page+" menu can overflow");
  for(const target of ["home","work","features","studio","contact"])
   assert(html.includes('href="/templates/md-mintlify/'+target+'.html"'),page+" missing link "+target);
  assert(html.includes('href="/templates/md-mintlify/'+page+'.html" aria-current="page"'),page+" active page missing");
 }
});

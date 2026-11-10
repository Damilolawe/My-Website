import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {freeDesignTemplates} from "../shared/free-designmd.mjs";
import {SOURCE_ARCHITECTURES,sourceNativeScene,sourceNativeCSS} from "../shared/free-designmd-native.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderLegacySite as renderSite} from "../shared/render.mjs";
test("Ten MD guides now produce ten independent source-native page chapters",()=>{
 assert.equal(SOURCE_ARCHITECTURES.length,10);
 assert.equal(new Set(SOURCE_ARCHITECTURES).size,10);
 const sections=new Set();
 for(const d of freeDesignTemplates){
  const html=renderSite(sampleForTemplate(d.id),{sample:true});
  assert(html.includes('class="fd-native fd-native-'+d.id+'"'),d.id+" missing authored scene");
  assert(html.includes('data-architecture="'),d.id+" missing original architecture");
  assert(html.includes('href="#work"'),d.id+" missing genuine work destination");
  assert(!html.includes('href="#contact"'),d.id+" links to empty contact");
  assert(html.includes("prefers-reduced-motion:reduce"),d.id+" missing motion control");
  assert(html.includes(d.colors.neutral),d.id+" missing primary source canvas");
  assert(!html.includes("<script"),d.id+" executable code in static preview");
  sections.add(html.match(/<section class="fd-native fd-native-[^"]+"[^>]*>([\s\S]*?)<\/section>/)?.[1]);
 }
 assert.equal(sections.size,10,"Distinct source files must not render identical scenes");
 assert(sourceNativeCSS.includes("fd-n-gazette-articles"));
 assert(sourceNativeCSS.includes("fd-n-void-ring"));
 assert(sourceNativeCSS.includes("fd-n-lime-graph"));
});
test("MD source scene is safe for real client content, not just gallery previews",()=>{
 const id="acidchrome";
 const v=sampleForTemplate(id);
 const config={...v,content:{...v.content,headline:"<script>alert(0)</script>",cards:[{title:"<img onerror=alert(1)>",description:"Safe",url:"javascript:evil()"}]}};
 const html=renderSite(config);
 assert(html.includes("&lt;script&gt;alert(0)&lt;/script&gt;"));
 assert(html.includes("&lt;img onerror=alert(1)&gt;"));
 assert(!html.includes("<script"));
 assert(!html.includes("javascript:evil()"));
 assert(html.includes('class="fd-native fd-native-acidchrome"'));
});
test("Browser and Supabase source-native renderers are byte-identical",async()=>{
 for(const filename of ["free-designmd-native.mjs","free-designmd-render.mjs"]){
 const [front,server]=await Promise.all([
 readFile(new URL("../shared/"+filename,import.meta.url),"utf8"),
 readFile(new URL("../supabase/functions/awe-api/shared/"+filename,import.meta.url),"utf8")]);
 assert.equal(front,server);
 }
});
test("Gallery and mobile QA use canonical source designs, not applicant-specific examples",async()=>{
 const [show,home,order,qa]=await Promise.all([
 "showcase.js","index.html","app/order.mjs","scripts/browser-qa.mjs"
 ].map(path=>readFile(new URL("../"+path,import.meta.url),"utf8")));
 assert(!home.includes('id="world-purpose"'));
 assert(!show.includes("recommendedFor"));
 assert(!show.includes("const select=root.querySelector"));
 assert(show.includes("fetchPublicTemplate(id,{still,signal:controller.signal})"));
 assert(!order.includes("FILTER BY WEBSITE TYPE"));
 assert(!order.includes("data-purpose"));
 assert(qa.includes('origin+"/templates/"+id+".html"'));
 assert(qa.includes(".fd-hero h1, .rw-hero h1"));
 assert(qa.includes(".rw-menu:visible:not([open])"));
});

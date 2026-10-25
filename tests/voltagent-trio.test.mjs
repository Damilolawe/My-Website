import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {minimumTier,templateFitsTier} from "../shared/tiers.mjs";
const ids=["nike","clay","ferrari"];
test("Nike, Clay, Ferrari are three distinct appended Signature editions",()=>{
 assert.deepEqual(templates.slice(0,42).slice(-3).map(t=>t.id),ids);
 assert.equal(new Set(templates.map(t=>t.id)).size,templates.length);
 for(const id of ids){
  assert.equal(templates.filter(t=>t.id===id).length,1);
  assert.equal(minimumTier(id),"signature");
  assert.equal(templateFitsTier(id,"starter"),false);
  assert.equal(templateFitsTier(id,"signature"),true);
 }
 assert(templates.some(t=>t.id==="nocturne"),"Do not overwrite existing Ferrari-inspired Nocturne");
});
test("Preserve full original source markdown without truncation or simplification",async()=>{
 const minimum={nike:35000,clay:25000,ferrari:24000};
 for(const id of ids){
  const md=await readFile(new URL("../design-sources/voltagent/"+id+"/DESIGN.md",import.meta.url),"utf8");
  assert(md.length>=minimum[id],id+" original source incomplete");
  for(const heading of ["## Overview","## Typography","## Layout","## Components","## Responsive Behavior"])
   assert(md.includes(heading),id+" missing "+heading);
 }
});
test("All three have individually composed, source-faithful, mobile-adaptive experiences",()=>{
 const unique=new Set();
 for(const id of ids){
  const demos=["Student résumé","Small business","Actor / model","Creative portfolio"].map(type=>renderSite(sampleForTemplate(id,type),{sample:true}));
  assert(demos.every(html=>html===demos[0]),id+" must remain an organic design; no resume or business rewrites");
  const html=demos[0];
  assert(html.startsWith("<!doctype html>"));
  assert(html.includes("FICTIONAL TEMPLATE DEMO"));
  assert(html.includes('id="hero-title"'));
  assert(html.includes('id="work"'));
  assert(html.includes('id="contact"'));
  assert(html.includes('nav aria-label="Section navigation"'));
  assert(html.includes("trio-menu"));
  assert(html.includes("@media(max-width:760px)")||html.includes("@media(max-width:780px)"));
  assert(html.includes("prefers-reduced-motion:reduce"));
  assert(html.includes("motion-expressive"));
  assert(!html.includes("<script"));
  assert(html.includes("images.unsplash.com/")||id==="clay");
  unique.add(html.match(/class="trio-site trio-([\w-]+)/)?.[1]);
 }
 assert.equal(unique.size,3);
 assert(renderSite(sampleForTemplate("nike"),{sample:true}).includes("nike-grid"));
 assert(renderSite(sampleForTemplate("clay"),{sample:true}).includes("clay-world"));
 assert(renderSite(sampleForTemplate("ferrari"),{sample:true}).includes("ferrari-specs"));
});
test("Real customer versions contain only approved asset references, escape content and never load demo stock",()=>{
 for(const id of ids){
  const v=sampleForTemplate(id);
  const photo="11111111-1111-4111-8111-111111111111";
  const input={...v,content:{...v.content,name:"<script>x</script>",headline:"<img onerror=evil()>",cards:[{title:"<b>example</b>",description:"safe",url:"javascript:evil()"}],photoIds:[photo]}};
  const html=renderSite(input);
  assert(html.includes("&lt;script&gt;x&lt;/script&gt;"),id);
  assert(html.includes("&lt;img onerror=evil()&gt;"),id);
  assert(html.includes("&lt;b&gt;example&lt;/b&gt;"),id);
  assert(!html.includes("<script"),id);
  assert(!html.includes("javascript:evil()"),id);
  assert(!html.includes("images.unsplash.com"),id);
  assert(!html.includes("FICTIONAL TEMPLATE DEMO"),id);
  if(id!=="clay")assert(html.includes("/api/assets/"+photo),id);
 }
});
test("Production edge and Firebase renderers are byte identical",async()=>{
 for(const name of ["model.mjs","premium.mjs","tiers.mjs","voltagent-trio.mjs","voltagent-trio-styles.mjs"]){
 const [front,edge]=await Promise.all([
  readFile(new URL("../shared/"+name,import.meta.url),"utf8"),
  readFile(new URL("../supabase/functions/awe-api/shared/"+name,import.meta.url),"utf8")
 ]);
 assert.equal(front,edge,name);
 }
 for(const id of ids){
  const html=await readFile(new URL("../dist/templates/"+id+".html",import.meta.url),"utf8");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"));
  assert(html.includes("trio-"+id));
 }
});

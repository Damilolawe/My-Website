import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {zipDesigns,zipPages} from "../shared/zip-design-catalog.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {renderSite} from "../shared/render.mjs";
import {templatePageCount} from "../shared/tiers.mjs";

test("all 116 catalog entries retain their actual tier page count",()=>{
 assert.equal(templates.length,116);
 for(const t of templates)assert([1,5].includes(templatePageCount(t.id)),t.id);
});
test("35 non-flagship Signature source studies have different Home and Work compositions",()=>{
 const rest=zipDesigns.filter(t=>t.multipage&&!["md-bugatti","md-mintlify","md-nintendo-2001"].includes(t.id));
 assert.equal(rest.length,35);
 for(const t of rest){
  const v=sampleForTemplate(t.id);
  const home=renderZipDesign(v,{sample:true},"home");
  const work=renderZipDesign(v,{sample:true},"work");
  assert(home.includes('class="study-home-teaser"'),t.id+" missing separate Home");
  assert(home.includes('class="cards study-teaser-grid"'),t.id+" featured sample missing");
  assert(!home.includes('class="section" id="work"'),t.id+" Home repeats Work");
  assert(work.includes('class="section" id="work"'),t.id+" Work is incomplete");
  assert(!work.includes('study-home-teaser'),t.id+" repeats Home");
  for(const chapter of zipPages){
   const html=renderZipDesign(v,{sample:true},chapter);
   assert(html.includes('class="design-mobile"'),t.id+"/"+chapter+" menu missing");
   assert(html.includes('href="/templates/'+t.id+'/'+chapter+'.html" aria-current="page"'),t.id+"/"+chapter+" active link wrong");
   assert(!html.includes("<script"),t.id+" scripts not permitted");
  }
 }
});
test("37 Starter studies keep a single page with working anchor navigation",()=>{
 for(const t of zipDesigns.filter(t=>!t.multipage)){
  const html=renderSite(sampleForTemplate(t.id),{sample:true});
  assert(html.includes('class="design-mobile"'),t.id+" menu missing");
  for(const id of ["main","work","features","studio","contact"])
   assert(html.includes('id="'+id+'"'),t.id+" missing section "+id);
  assert(!html.includes('href="/templates/'+t.id+'/work.html"'),t.id+" accidentally multipage");
 }
});
test("legacy and FreeDesignMD templates preserve identity while gaining small-screen menus",()=>{
 let free=0,legacy=0;
 const protectedIds=new Set(["liquidmetal","folio","runwayml","runwaymulti","nike","clay","ferrari","arcade"]);
 for(const t of templates.filter(t=>!t.id.startsWith("md-")&&!protectedIds.has(t.id))){
  const html=renderSite(sampleForTemplate(t.id),{sample:true});
  if(html.includes('class="fd-header"')){
   assert(html.includes('class="fd-mobile-menu"'),t.id+" menu missing");
   free++;
  }else{
   assert(html.includes('class="shell-mobile-menu"'),t.id+" legacy menu missing");
   legacy++;
  }
  assert(html.includes('aria-label="Mobile section navigation"'),t.id+" links missing");
 }
 assert(free>=10);assert(legacy>=15);
});
test("client-safe renderer changes remain synchronized between preview and server",async()=>{
 for(const name of ["zip-design-render.mjs","site-shells.mjs","premium.mjs","free-designmd-render.mjs"]){
  const [a,b]=await Promise.all(["../shared/","../supabase/functions/awe-api/shared/"].map(root=>readFile(new URL(root+name,import.meta.url),"utf8")));
  assert.equal(a,b,name+" drift");
 }
});

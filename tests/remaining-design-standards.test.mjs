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
  // CSS for both page families is embedded in every preview. Only compare
  // actual rendered document sections, not selector names inside <style>.
  const mainBody=(html,chapter)=>{
   const start=html.indexOf('<main id="main">');
   const end=html.indexOf('</main>',start);
   assert(start!==-1&&end>start,t.id+"/"+chapter+" main region missing");
   return html.slice(start,end);
  };
  const homeMarkup=mainBody(home,"home");
  const workMarkup=mainBody(work,"work");
  assert(homeMarkup.includes('class="study-home-teaser"'),t.id+" missing separate Home");
  assert(homeMarkup.includes('class="cards study-teaser-grid"'),t.id+" featured sample missing");
  assert(!homeMarkup.includes('class="section" id="work"'),t.id+" Home repeats Work");
  assert(workMarkup.includes('class="section" id="work"'),t.id+" Work is incomplete");
  assert(!workMarkup.includes('class="study-home-teaser"'),t.id+" repeats Home");
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
  if(t.id==="md-nintendo-2001")assert(html.includes('aria-label="')&&html.includes("pq-"),"PixelQuest must keep its flagship navigation");
  else assert(html.includes('class="design-mobile"'),t.id+" menu missing");
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

test("Signature content inspection ignores shared stylesheet class names",()=>{
 const v=sampleForTemplate("md-airbnb");
 const home=renderZipDesign(v,{sample:true},"home");
 const work=renderZipDesign(v,{sample:true},"work");
 assert(work.includes(".study-home-teaser"),"Shared CSS intentionally defines the Home teaser on every chapter");
 const getMain=html=>html.split('<main id="main">')[1]?.split("</main>")[0];
 assert(getMain(home)?.includes('class="study-home-teaser"'));
 assert(!getMain(work)?.includes('class="study-home-teaser"'));
 assert(getMain(work)?.includes('class="section" id="work"'));
});

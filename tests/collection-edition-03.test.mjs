import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {sampleArtwork} from "../shared/photographic-direction.mjs";
import {experienceInterlude} from "../shared/experiences.mjs";
import {directionFor} from "../shared/refero-originals.mjs";
import {freeDesignFor} from "../shared/free-designmd.mjs";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Twenty designs use editorial transitions rather than one shared ticker",()=>{
 const marks=new Set();
 for(const t of templates.filter(t=>t.id!=="arcade"&&t.id!=="liquidmetal"&&t.id!=="runwayml"&&t.id!=="runwaymulti"&&!["nike","clay","ferrari"].includes(t.id)&&!directionFor(t.id)&&!freeDesignFor(t.id))){
   const d=sampleForTemplate(t.id);
   const bridge=experienceInterlude(t.id,d.content);
   assert(bridge.includes('studio-index--'+t.id),t.id);
   assert(!bridge.includes('MAKE WITH INTENTION'),t.id);
   assert(!bridge.includes('animation:'),t.id);
   assert(!bridge.includes('<script'),t.id);
   marks.add(bridge.match(/<strong>(.*?)<\/strong>/)?.[1]);
   const html=renderSite(d,{sample:true});
   if(t.id==='folio') assert(html.includes('class="fe-strip"'),'Folio editorial transition missing');
    else assert(html.includes('studio-index--'+t.id),t.id+" missing transition");
 }
 assert.equal(marks.size,20,"Each design needs its own authored message");
});
test("Fictional work photo sequences change with project index",()=>{
 for(const t of templates.filter(t=>t.id!=="arcade"&&t.id!=="liquidmetal"&&t.id!=="runwayml"&&t.id!=="runwaymulti"&&!["nike","clay","ferrari"].includes(t.id)&&!directionFor(t.id)&&!freeDesignFor(t.id))){
  const a=sampleArtwork(t.id,"work",0),b=sampleArtwork(t.id,"work",1),c=sampleArtwork(t.id,"work",2);
  assert.notEqual(a.match(/photo-[0-9]+-[a-z0-9]+/)?.[0],b.match(/photo-[0-9]+-[a-z0-9]+/)?.[0],t.id+" first two duplicate");
  assert.notEqual(b.match(/photo-[0-9]+-[a-z0-9]+/)?.[0],c.match(/photo-[0-9]+-[a-z0-9]+/)?.[0],t.id+" second and third duplicate");
 }
});
test("Real customer HTML contains no fictional remote photography or executable scripts",()=>{
 for(const t of templates){
  const html=renderSite(sampleForTemplate(t.id));
  assert(!html.includes('study-shot--hero'),t.id);
  assert(!html.includes('class="study-shot '),t.id);
  assert(!html.includes('images.unsplash.com/photo-'),t.id);
  assert(!html.includes('<script'),t.id);
 }
});
test("Edition CSS and shared renderers exactly match the Edge source bundle",async()=>{
 for(const path of ["collection-edition.mjs","experiences.mjs","photographic-direction.mjs","premium.mjs"]){
  const [front,server]=await Promise.all([load("shared/"+path),load("supabase/functions/awe-api/shared/"+path)]);
  assert.equal(front,server,path+" front/server divergence");
 }
 const stylesheet=await load("shared/collection-edition.mjs");
 assert(stylesheet.includes("prefers-reduced-motion:reduce"));
 assert(stylesheet.includes("body.atelier"));
 assert(stylesheet.includes("body.afterhours"));
 assert(stylesheet.includes("body.folio"));
});


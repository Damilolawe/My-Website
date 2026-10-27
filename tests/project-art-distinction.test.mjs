import test from "node:test";
import assert from "node:assert/strict";
import {zipDesigns,zipPages} from "../shared/zip-design-catalog.mjs";
import {sampleForTemplate,templates} from "../shared/model.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {studyArtCategory,studyProjectArt,studyProjectArtCSS} from "../shared/zip-project-art.mjs";
import {templatePageCount} from "../shared/tiers.mjs";
import {readFile} from "node:fs/promises";

const flagships=new Set(["md-bugatti","md-mintlify","md-nintendo-2001"]);
const others=zipDesigns.filter(t=>!flagships.has(t.id));
const scenes=html=>[...html.matchAll(/data-scene="([^"]+)"/g)].map(match=>match[1]);
const insideMain=html=>html.split('<main id="main">')[1]?.split("</main>")[0]??"";

test("all 71 shared-source designs have three visually different work concepts",()=>{
 assert.equal(others.length,71);
 for(const t of others){
  const data=sampleForTemplate(t.id);
  const work=renderZipDesign(data,{sample:true},t.multipage?"work":"home");
  const gallery=scenes(insideMain(work));
  assert.equal(gallery.length,3,t.id+" must have exactly 3 work concepts");
  assert.equal(new Set(gallery).size,3,t.id+" repeats project composition across gallery");
  assert(!insideMain(work).includes("PERFORMANCE / OVERVIEW"),t.id+" still shows cloned finance placeholder");
  assert(!insideMain(work).includes("+24.8%"),t.id+" still shows cloned finance percentage");
  assert(work.includes("PROJECT 01 / DESIGN STUDY"),t.id+" loses project identity");
  assert(work.includes("data-art-source="),t.id+" loses source-specific artwork attribution");
  assert(!work.includes("<script"),t.id+" introduced executable scripts");
 }
});

test("Signature Home uses a distinct fourth scene rather than repeating Work page art",()=>{
 let count=0;
 for(const t of others.filter(t=>t.multipage)){
  const v=sampleForTemplate(t.id);
  const home=renderZipDesign(v,{sample:true},"home");
  const work=renderZipDesign(v,{sample:true},"work");
  const homeArt=scenes(insideMain(home)),workArt=scenes(insideMain(work));
  assert.equal(homeArt.length,1,t.id+" homepage must have exactly one focus scene");
  assert.equal(workArt.length,3,t.id+" work gallery must have three scenes");
  assert(!workArt.includes(homeArt[0]),t.id+" homepage repeats Work art");
  assert(home.includes("FEATURED / CONCEPT STUDY"),t.id+" missing source-specific preview");
  for(const page of zipPages) {
   const html=renderZipDesign(v,{sample:true},page);
   assert(html.includes('href="/templates/'+t.id+'/contact.html"'),t.id+"/"+page+" navigation broke");
  }
  count++;
 }
 assert.equal(count,35);
});

test("gallery imagery follows category and independent visual grammar instead of generic studio",()=>{
 const expected={
  "md-coinbase":"fintech","md-mercury":"fintech","md-framer":"product",
  "md-posthog":"code","md-bmw-m":"auto","md-airbnb":"commerce",
  "md-theverge":"editorial","md-notion":"product"
 };
 for(const [id,category] of Object.entries(expected)){
  const t=zipDesigns.find(t=>t.id===id);
  assert(t,id+" missing from catalog");
  assert.equal(studyArtCategory(t.source),category);
  const sample=sampleForTemplate(id);
  const html=renderZipDesign(sample,{sample:true},t.multipage?"work":"home");
  assert(html.includes("type-"+category),id+" wrongly receives the generic studio type");
  assert(scenes(insideMain(html)).every(s=>s.startsWith(category+"-")),id+" artwork category mismatch");
 }
 assert(studyProjectArtCSS.includes("@media(max-width:650px)"));
 assert(studyProjectArtCSS.includes("prefers-reduced-motion:reduce"));
});

test("Starter/Signature page counts, original flagship renderers, and client artwork overrides stay intact",()=>{
 assert.equal(templates.length,116);
 for(const t of templates)assert([1,5].includes(templatePageCount(t.id)));
 for(const id of flagships){
  const t=zipDesigns.find(d=>d.id===id),v=sampleForTemplate(id);
  const html=renderZipDesign(v,{sample:true},"home");
  assert(!html.includes("data-scene="),id+" flagship was overwritten");
 }
 const t=zipDesigns.find(t=>t.id==="md-coinbase");
 const v=sampleForTemplate(t.id);
 const client={...v,content:{...v.content,photoIds:["asset-one","asset-two","asset-three"]}};
 const work=renderZipDesign(client,{assetBase:"/api/assets/",assetSuffix:""},"work");
 assert(work.includes('src="/api/assets/asset-one"'));
 assert(work.includes('src="/api/assets/asset-two"'));
 assert(work.includes('src="/api/assets/asset-three"'));
 assert.equal(scenes(insideMain(work)).length,0,"Client-supplied photos should take precedence");
});

test("preview and Supabase source-art renderers are exactly mirrored",async()=>{
 for(const path of ["zip-project-art.mjs","zip-design-render.mjs"]){
  const [front,edge]=await Promise.all([
   readFile(new URL("../shared/"+path,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+path,import.meta.url),"utf8")
  ]);
  assert.equal(front,edge,path+" server drift");
 }
});

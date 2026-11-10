import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate,types} from "../shared/model.mjs";
import {renderLegacySite as renderSite} from "../shared/render.mjs";
import {uploadedDesigns} from "../shared/uploaded-designs.mjs";
import {authoredScene,authoredBeat} from "../shared/md-art-direction.mjs";
import {artDirectionCSS} from "../shared/md-art-styles.mjs";
const read=x=>readFile(new URL("../"+x,import.meta.url),"utf8");
test("Every original uploaded Markdown design now has its own authored scene and chapter",()=>{
 assert.equal(uploadedDesigns.length,18);
 const scenes=new Set(),chapters=new Set(),classes=new Set();
 for(const dir of uploadedDesigns){
  const value=sampleForTemplate(dir.id);
  const scene=authoredScene(value,"");
  const chapter=authoredBeat(value);
  assert(scene.includes("art-scene-"+dir.id),dir.id+" missing dedicated visual stage");
  assert(chapter.includes("md-edition-"+dir.id),dir.id+" missing dedicated chapter");
  assert(artDirectionCSS.includes("body."+dir.id+" .md-edition-break") || artDirectionCSS.includes(".md-edition-"+dir.id),dir.id+" missing tailored CSS");
  assert(!scene.includes('class="md-art"'),dir.id+" regressed to generic tilted-ring sculpture");
  assert(!scene.includes("<script"),dir.id+" unauthorized active content");
  scenes.add(scene);
  chapters.add(chapter);
  classes.add(scene.match(/art-scene-[a-z]+/)[0]);
 }
 assert.equal(scenes.size,18,"18 different designs should never share identical scenes");
 assert.equal(chapters.size,18,"18 independent chapter briefs are required");
 assert.equal(classes.size,18,"Individual design classes required");
});
test("Source-based builds render distinct compositions in every published purpose and remain accessible",()=>{
 for(const d of uploadedDesigns){
  for(const purpose of types){
   const html=renderSite(sampleForTemplate(d.id,purpose),{sample:true});
   if(d.id==='folio') {
       assert(html.includes('class="fe-hero'),'Folio redesigned hero missing');
       assert(html.includes('class="fe-project fe-feature"'),'Folio selected work missing');
     } else {
       assert(html.includes('art-scene-'+d.id),d.id+' new hero absent');
   assert(!html.includes('<aside class="md-edition-break'),d.id+' generic design-description panel remains');
     }
   assert(html.includes("FICTIONAL TEMPLATE DEMO"));
   assert(html.includes("prefers-reduced-motion"));
   assert(html.includes('aria-label="Section navigation"'));
   if(d.id==="folio") assert(html.includes('href="#contact"'));
   else assert(!html.includes('href="#contact"'),d.id+' advertises contact without an address');
   assert(html.includes('id="work"'));
   assert(!html.includes("<script"),d.id+" active scripts");
   assert(!html.includes('href="javascript:'),d.id+" dangerous link");
   assert(html.length<250000,d.id+" HTML exceeds compact delivery budget");
  }
 }
});
test("Customer images replace demo imagery and markup cannot execute user content",()=>{
 for(const d of uploadedDesigns){
  const input=sampleForTemplate(d.id);
  const image="11111111-1111-4111-8111-111111111111";
  const html=renderSite({...input,content:{...input.content,headline:"<svg onload=alert(1)>",photoIds:[image],publicEmail:""}});
  assert(html.includes("/api/assets/"+image),d.id+" failed to show approved image");
  assert(!html.includes("images.unsplash.com"),d.id+" leaked fictional photo");
  assert(html.includes("&lt;svg onload=alert(1)&gt;"),d.id+" unsafe title");
  assert(!html.includes("<script"),d.id);
  assert(!html.includes("FICTIONAL TEMPLATE DEMO"),d.id);
 }
});
test("Edge and Firebase use byte-identical MD art direction, styles, and integration",async()=>{
 for(const p of ["md-art-direction.mjs","md-art-styles.mjs","md-rebuild.mjs","premium.mjs"]){
  assert.equal(await read("shared/"+p),await read("supabase/functions/awe-api/shared/"+p),p+" parity broken");
 }
});

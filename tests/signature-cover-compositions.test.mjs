import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {zipDesigns} from "../shared/zip-design-catalog.mjs";
import {architectureFor} from "../shared/zip-architecture.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
const protectedIds=new Set(["md-bugatti","md-mintlify","md-nintendo-2001"]);
test("Signature covers honor nine source art-direction families with safe mobile fallback",()=>{
 const t=zipDesigns.filter(t=>t.multipage&&!protectedIds.has(t.id));
 assert.equal(t.length,35);
 const families=new Set(t.map(x=>architectureFor(x).work));
 assert(families.size>=8);
 const representative=new Map();
 for(const entry of t){
  const a=architectureFor(entry);
  if(!representative.has(a.work))representative.set(a.work,entry);
  const html=renderZipDesign(sampleForTemplate(entry.id),{sample:true},"home");
  assert(html.includes('class="study-home-teaser"'),entry.id+" missing Home cover");
  assert(html.includes('class="study-teaser-grid"')===false || html.includes('class="cards study-teaser-grid"'),entry.id+" bad scene class");
  assert(html.includes('arch-work-'+a.work),entry.id+" lost source layout identity");
  assert(html.includes('data-scene='),entry.id+" lost independent cover art");
 }
 for(const family of families){
  const html=renderZipDesign(sampleForTemplate(representative.get(family).id),{sample:true},"home");
  assert(html.includes('body.site.arch-work-'+family+' .study-home-teaser{'),family+" lacks tailored cover");
 }
 const html=renderZipDesign(sampleForTemplate(t[0].id),{sample:true},"home");
 assert(html.includes('@media(max-width:900px)'),"Responsive fallback missing");
});
test("shared Signature renderer and server publishing copy remain byte-identical",async()=>{
 const [a,b]=await Promise.all([
 readFile(new URL("../shared/zip-design-render.mjs",import.meta.url),"utf8"),
 readFile(new URL("../supabase/functions/awe-api/shared/zip-design-render.mjs",import.meta.url),"utf8")]);
 assert.equal(a,b);
});

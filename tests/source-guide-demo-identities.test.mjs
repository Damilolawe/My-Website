import test from "node:test";
import assert from "node:assert/strict";
import {zipDesigns,demoBrandNames} from "../shared/zip-design-catalog.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {readFile} from "node:fs/promises";

test("all 74 source-guided designs have an individual fictional demo brand",()=>{
 assert.equal(zipDesigns.length,74);
 assert.equal(Object.keys(demoBrandNames).length,74);
 const allNames=new Set();
 for(const t of zipDesigns){
  const sample=sampleForTemplate(t.id);
  const name=sample.content.name;
  assert(name&&typeof name==="string",t.id+" missing brand");
  assert(!/^STUDIO \d+$/i.test(name),t.id+" still has a numbered placeholder");
  assert(!/CREATIVE PRACTICE \/ EDITION \d+/.test(sample.content.heroLabel),t.id+" eyebrow remains generic");
  assert(!allNames.has(name),t.id+" duplicates another brand");
  allNames.add(name);
  assert(!name.includes("<"),t.id+" demo brand must be safe text");
  const html=renderZipDesign(sample,{sample:true},"home");
  const escapedName=name.replaceAll("&","&amp;");
  assert(html.includes(escapedName),t.id+" rendered demo brand missing or incorrectly escaped");
  assert(!html.includes("STUDIO "+String(t.sourceIndex+1).padStart(2,"0")),t.id+" old numbered brand remains");
 }
 assert.equal(allNames.size,74);
});
test("Signature scenes use the same fictional identity across all five pages",()=>{
 for(const id of ["md-coinbase","md-supabase","md-airbnb","md-bmw-m","md-cursor"]){
  const sample=sampleForTemplate(id),name=sample.content.name;
  for(const chapter of ["home","work","features","studio","contact"]){
   const html=renderZipDesign(sample,{sample:true},chapter);
   assert(html.includes(name),id+"/"+chapter+" lost its own brand");
   assert(html.includes("FICTIONAL TEMPLATE DEMO"),id+"/"+chapter+" disclaimer removed");
  }
 }
});
test("the sample catalog and publishing renderer remain identical",async()=>{
 const [front,edge]=await Promise.all([
 readFile(new URL("../shared/zip-design-catalog.mjs",import.meta.url),"utf8"),
 readFile(new URL("../supabase/functions/awe-api/shared/zip-design-catalog.mjs",import.meta.url),"utf8")
 ]);
 assert.equal(front,edge);
});

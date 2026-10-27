import test from "node:test";
import assert from "node:assert/strict";
import {studyCopy,studyCardTitles} from "../shared/zip-guide-copy.mjs";
import {zipDesigns} from "../shared/zip-design-catalog.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {readFile} from "node:fs/promises";

test("all 74 source guides produce specific, non-repetitive client-facing narratives",()=>{
 const descriptions=new Set(),titleSets=new Set();
 assert.equal(zipDesigns.length,74);
 for(const t of zipDesigns){
  const v=sampleForTemplate(t.id);
  assert(studyCopy[t.source],t.id+" source copy missing");
  assert(!v.content.bio.startsWith("A fictional creative studio exploring"),t.id+" generic studio placeholder remains");
  assert(!v.content.cards.some(c=>c.description.startsWith("A fictional project exploring")),t.id+" generic project copy remains");
  assert.equal(v.content.cards.length,3,t.id+" needs 3 projects");
  assert.equal(new Set(v.content.cards.map(c=>c.description)).size,3,t.id+" project descriptions repeat");
  assert.equal(new Set(v.content.cards.map(c=>c.title)).size,3,t.id+" project titles repeat");
  for(const card of v.content.cards){
   assert(card.title.length<70,t.id+" overly long project heading");
   descriptions.add(card.description);
  }
  titleSets.add(v.content.cards.map(c=>c.title).join("|"));
 }
 assert.equal(descriptions.size,74*3,"Different demos should not have cloned descriptions");
 assert(titleSets.size>=65,"Too many gallery cards share the same headings");
});
test("copy generator and publishing renderer stay in sync",async()=>{
 for(const path of ["zip-guide-copy.mjs","zip-design-catalog.mjs"]){
  const [a,b]=await Promise.all([
   readFile(new URL("../shared/"+path,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+path,import.meta.url),"utf8")
  ]);
  assert.equal(a,b);
 }
});
test("all five Signature routes retain their source-specific copy and safe branding",()=>{
 const sample=sampleForTemplate("md-supabase");
 for(const chapter of ["home","work","features","studio","contact"]){
  const html=renderZipDesign(sample,{sample:true},chapter);
  assert(html.includes(sample.content.name));
  assert(html.includes(sample.content.bio));
  assert(html.includes("FICTIONAL TEMPLATE DEMO"));
 }
});

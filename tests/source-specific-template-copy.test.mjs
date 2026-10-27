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
test("all five Signature routes retain the correct source-specific content and safe branding",()=>{
 const sample=sampleForTemplate("md-supabase");
 const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,c=>({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
 }[c]));
 const pages=new Set();
 const expected=[
  ["home", "study-home-teaser"],
  ["work", 'class="section" id="work"'],
  ["features", "Explore the methods behind the work."],
  ["studio", 'class="section study-studio"'],
  ["contact", 'class="contact study-contact"']
 ];
 for(const [chapter,sectionMarker] of expected){
  const html=renderZipDesign(sample,{sample:true},chapter);
  const start=html.indexOf('<main id="main">');
  const end=html.indexOf("</main>",start);
  assert(start>=0&&end>start,chapter+" main content missing");
  const markup=html.slice(start,end);
  assert(html.includes('class="site page-'+chapter+' '),chapter+" route identity missing");
  assert(html.includes(escapeHTML(sample.content.name)),chapter+" brand missing or unescaped");
  assert(markup.includes(sectionMarker),chapter+" unique chapter content missing");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"),chapter+" sample disclosure missing");
  if(chapter==="home"||chapter==="studio")
   assert(markup.includes(escapeHTML(sample.content.bio)),chapter+" source narrative missing");
  if(chapter==="work"){
   for(const card of sample.content.cards){
    assert(markup.includes(escapeHTML(card.title)),chapter+" project title missing");
    assert(markup.includes(escapeHTML(card.description)),chapter+" project copy missing");
   }
  }
  if(chapter==="contact")
   assert(markup.includes("Start a conversation."),chapter+" inquiry copy missing");
  pages.add(markup);
 }
 assert.equal(pages.size,5,"Signature chapters must have distinct page compositions");
});

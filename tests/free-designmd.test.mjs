import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {freeDesignTemplates} from "../shared/free-designmd.mjs";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {minimumTier,templateFitsTier} from "../shared/tiers.mjs";
const ids=["acidchrome","voidstage","studiomargaux","neomemphis","monobrutalist","vestigefolio","botanicalpress","limepress","gazettebroadside","risograph"];
test("Ten original DESIGN.md files are preserved and appended without disturbing older entries",async()=>{
 assert.deepEqual(templates.slice(-12,-2).map(t=>t.id),ids); // Existing ten stay in sequence; RunwayML is appended last.
 assert.deepEqual(freeDesignTemplates.map(t=>t.id),ids);
 for(const d of freeDesignTemplates){
  const raw=await readFile(new URL("../"+d.sourcePath,import.meta.url),"utf8");
  assert(raw.endsWith("\n"),d.id+" source missing original final newline");
  assert(raw.includes("## AI Build Instructions"));
  assert(raw.includes("## Pro tokens"));
  assert(raw.includes("name: "+JSON.stringify(d.name))||raw.includes("name: "+d.name));
  assert.equal(minimumTier(d.id),"signature");
  assert.equal(templateFitsTier(d.id,"starter"),false);
  assert.equal(templateFitsTier(d.id,"signature"),true);
 }
});
test("Ten independent, safe, mobile-adaptive premium designs render in all six purposes",()=>{
 const architectures=new Set();
 for(const id of ids){
  for(const purpose of ["Student résumé","Professional portfolio","Actor / model","Creative portfolio","Personal brand","Small business"]){
   const input=sampleForTemplate(id,purpose),html=renderSite(input,{sample:true});
   assert(html.startsWith("<!doctype html>"),id);
   assert(html.includes("FICTIONAL TEMPLATE DEMO"),id);
   assert(html.includes('id="main"'),id);
   assert(html.includes('href="#contact"'),id);
   assert(html.includes("@media(max-width:600px)"),id+" missing responsive styles");
   assert(html.includes("prefers-reduced-motion:reduce"),id+" missing accessible motion fallback");
   assert(!html.includes("<script"),id);
   assert(!html.includes("images.unsplash.com"),id);
   assert(html.length<180000,id);
   if(purpose==="Creative portfolio")architectures.add(html.match(/data-architecture="([^"]+)"/)?.[1]);
  }
 }
 assert.equal(architectures.size,10);
});
test("New customer designs safely escape content and display authorized media",()=>{
 for(const id of ids){
  const v=sampleForTemplate(id),asset="11111111-1111-4111-8111-111111111111";
  const html=renderSite({...v,content:{...v.content,headline:"<script>alert(1)</script>",photoIds:[asset],cards:[{title:"<img onerror=alert(2)>",description:"Example",url:"javascript:alert(1)"}]}});
  assert(html.includes("&lt;script&gt;alert(1)&lt;/script&gt;"),id);
  assert(!html.includes("<script"),id);
  assert(!html.includes("javascript:"),id);
  assert(html.includes("&lt;img onerror=alert(2)&gt;"),id);
  assert(html.includes("/api/assets/"+asset),id);
 }
});
test("Browser and edge source keep identical template logic",async()=>{
 for(const p of ["model.mjs","premium.mjs","tiers.mjs","free-designmd.mjs","free-designmd-render.mjs"]){
  const [browser,server]=await Promise.all([readFile(new URL("../shared/"+p,import.meta.url),"utf8"),readFile(new URL("../supabase/functions/awe-api/shared/"+p,import.meta.url),"utf8")]);
  assert.equal(browser,server,p+" mismatch");
 }
});

import test from "node:test";
import assert from "node:assert/strict";
import {sampleForTemplate} from "../shared/model.mjs";
import {zipDesigns} from "../shared/zip-design-catalog.mjs";
import {renderApprovedDesignPages,allowedApprovedPageNames,STUDY_PAGES} from "../shared/approved-pages.mjs";
import {renderSite} from "../shared/render.mjs";
import {packageAllowsTemplate} from "../shared/tiers.mjs";
const starter={id:"express",tier:"starter",delivery:"awe-hosted",pageCount:1,currency:"usd",amount:7500};
const signature={id:"signature-multipage",tier:"signature",delivery:"awe-multipage",pageCount:5,currency:"usd",amount:15000};
test("37 Starter single-page and 37 Signature five-page designs qualify only for their packages",()=>{
 assert.equal(zipDesigns.filter(t=>t.multipage).length,37);
 assert.equal(zipDesigns.filter(t=>!t.multipage).length,37);
 for(const t of zipDesigns){
  assert.equal(packageAllowsTemplate(starter,t.id),!t.multipage,t.id+" Starter");
  assert.equal(packageAllowsTemplate(signature,t.id),t.multipage,t.id+" Signature");
 }
 assert.equal(packageAllowsTemplate(starter,"runwaymulti"),false);
 assert.equal(packageAllowsTemplate(signature,"runwaymulti"),true);
});
test("All 37 Signature studies render five truly distinct customer pages with correct relative links",()=>{
 for(const t of zipDesigns.filter(t=>t.multipage)){
  const original=sampleForTemplate(t.id);
  const input={...original,content:{...original.content,name:"Aurora Studio",headline:"Make tomorrow visible.",bio:"Unique customer narrative, never a demo."}};
  const pages=renderApprovedDesignPages(input);
  assert.deepEqual(Object.keys(pages),STUDY_PAGES);
  assert.deepEqual(allowedApprovedPageNames(t.id),STUDY_PAGES);
  assert.equal(new Set(Object.values(pages)).size,5,t.id);
  for(const [page,html] of Object.entries(pages)){
   assert(html.startsWith("<!doctype html>"),t.id+"/"+page);
   assert(html.includes("Aurora Studio"),t.id+"/"+page);
   assert(!html.includes("FICTIONAL TEMPLATE DEMO"),t.id+"/"+page);
   assert(!html.includes("/templates/"+t.id+"/"),t.id+"/"+page+" must not link to the store");
   for(const name of STUDY_PAGES)assert(html.includes('href="./'+name+'"'),t.id+"/"+page+" nav "+name);
   assert(html.includes('name="viewport"'),t.id+"/"+page);
   assert(html.includes("<h1"),t.id+"/"+page);
   assert(!html.includes("<script"),t.id+"/"+page);
  }
 }
});
test("The 37 Starter studies render personalized standalone one-page customer sites",()=>{
 for(const t of zipDesigns.filter(t=>!t.multipage)){
  const demo=sampleForTemplate(t.id);
  const html=renderSite({...demo,content:{...demo.content,name:"Real Customer Studio"}});
  assert(html.includes("Real Customer Studio"));
  assert(html.includes('href="#contact"'));
  assert.deepEqual(allowedApprovedPageNames(t.id),["index.html"]);
 }
});
test("Admin and public server routes use the same immutable multipage delivery module",async()=>{
 const {readFile}=await import("node:fs/promises");
 const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
 for(const p of ["supabase/functions/awe-api/platform/edge-router.mjs","supabase/functions/awe-api/platform/export.mjs","supabase/functions/awe-api/netlify/functions/api.mjs"]){
  const s=await read(p);
  assert(s.includes("renderApprovedDesignPages"),p);
 }
 const material=await read("scripts/materialize-approved-sites.mjs");
 assert(material.includes('"features.html"'));
 assert(material.includes('"contact.html"'));
});

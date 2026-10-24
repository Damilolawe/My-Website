import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {uploadedDesigns} from "../shared/uploaded-designs.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {mdSourceFeature,mdSourceFeatureCSS} from "../shared/md-source-feature.mjs";
const parseFeature=html=>html.match(/<section class="md-source-feature mdsf-[^"]+"[\s\S]*?<\/section>/)?.[0];
test("all 18 preserved Refero DESIGN.md systems have a distinctive source-native editorial feature",()=>{
 const patterns=new Set();
 assert.equal(uploadedDesigns.length,18);
 for(const ref of uploadedDesigns){
  const sample=sampleForTemplate(ref.id);
  const html=renderSite(sample,{sample:true});
  const feature=parseFeature(html);
  assert(feature,ref.id+" missing source-native feature");
  assert(feature.includes("mdsf-"+ref.id),ref.id+" wrong identity");
  assert(feature.includes("aria-label"),ref.id+" missing composition description");
  assert(html.includes(ref.layout),ref.id+" lost original site structure");
  assert(html.includes("prefers-reduced-motion"),ref.id+" missing reduced-motion styles");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"),ref.id+" lost demo disclosure");
  assert(!html.includes("<script"),ref.id+" introduced executable code");
  assert(html.length<240000,ref.id+" page exceeded preview size budget");
  patterns.add(feature.replaceAll(/[A-Za-z0-9]+/g,"").length+"-"+feature.match(/mdsf-[a-z-]+/g)?.join("|"));
 }
 assert.equal(patterns.size,18,"Every original MD guide must produce its own composition");
});
test("source scenes render safe customer-specific text and never introduce sample photos",()=>{
 const v=sampleForTemplate("nightgrid");
 const injected={...v,content:{...v.content,name:"<script>bad</script>",headline:"<img onerror=evil()>",cards:[{title:"<svg onload=evil()>",description:"Actual project",url:"javascript:evil()"}]}};
 const html=renderSite(injected);
 assert(html.includes("&lt;script&gt;bad&lt;/script&gt;"));
 assert(html.includes("&lt;img onerror=evil()&gt;"));
 assert(html.includes("&lt;svg onload=evil()&gt;"));
 assert(!html.includes("<script"));
 assert(!html.includes("javascript:evil()"));
 assert(!html.includes("images.unsplash.com"));
 assert(html.includes("mdsf-nightgrid"));
});
test("browser and Supabase use identical native-guide feature implementations",async()=>{
 for(const name of ["md-source-feature.mjs","premium.mjs"]){
  const [front,edge]=await Promise.all([
   readFile(new URL("../shared/"+name,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+name,import.meta.url),"utf8")
  ]);
  assert.equal(front,edge,name);
 }
 assert(mdSourceFeatureCSS.includes(".mdsf-folio .mdsf-columns"));
 assert(mdSourceFeatureCSS.includes(".mdsf-nightgrid .mdsf-terminals"));
 assert(mdSourceFeatureCSS.includes("@media(max-width:640px)"));
});
test("new original-guide feature does not affect unrelated template architecture",()=>{
 for(const id of ["runwayml","runwaymulti","liquidmetal","acidchrome"]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(!html.includes('class="md-source-feature'),id);
 }
});

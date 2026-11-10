import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {uploadedDesigns} from "../shared/uploaded-designs.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderLegacySite as renderSite,compactInlineStyles} from "../shared/render.mjs";
import {mdSourceFeature,mdSourceFeatureCSS} from "../shared/md-source-feature.mjs";
import {exactGuideCSSFor} from "../shared/exact-design-css.mjs";
const parseFeature=html=>html.match(/<section class="md-source-feature mdsf-[^"]+"[\s\S]*?<\/section>/)?.[0];
test("all 18 preserved Refero DESIGN.md systems have a distinctive source-native editorial feature",()=>{
 const patterns=new Set();
 assert.equal(uploadedDesigns.length,18);
 for(const ref of uploadedDesigns){
  const sample=sampleForTemplate(ref.id);
  const html=renderSite(sample,{sample:true});
  const feature=ref.id==='folio'?html.match(/<section class="fe-section fe-wrap" id="work"[\s\S]*?<\/section>/)?.[0]:parseFeature(html);
  assert(feature,ref.id+" missing source-native feature");
  if(ref.id==='folio') assert(feature.includes('fe-project'),'Folio new projects missing');
   else assert(feature.includes('mdsf-'+ref.id),ref.id+' wrong identity');
  if(ref.id!=='folio')assert(feature.includes('aria-label'),ref.id+' missing composition description');
  if(ref.id==='folio') assert(html.includes('folio-editorial'),'Folio redesign missing');
   else assert(html.includes(ref.layout),ref.id+' lost original site structure');
  assert(html.includes("prefers-reduced-motion"),ref.id+" missing reduced-motion styles");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"),ref.id+" lost demo disclosure");
  assert(!html.includes("<script"),ref.id+" introduced executable code");
  assert(html.length<240000,ref.id+" page exceeded preview size budget ("+html.length+" characters; limit 240000)");
  patterns.add(ref.id==='folio'?'folio-editorial':feature.replaceAll(/[A-Za-z0-9]+/g,'').length+'-'+feature.match(/mdsf-[a-z-]+/g)?.join('|'));
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

test("CSS compaction preserves design selectors, custom properties and quoted content",()=>{
 const original='<style media="all">/* editorial note */ body .hero > h1 { content: "WORDS / NEXT ACT"; padding: calc(100% - 12px); color: var(--ink); } @media (max-width:600px) { .hero h1 { line-height: 1.12; } } </style>';
 const compact=compactInlineStyles(original);
 assert(compact.startsWith('<style media="all">'));
 assert(compact.includes('body .hero > h1'),"descendant selector changed");
 assert(compact.includes('"WORDS / NEXT ACT"'),"quoted CSS strings changed");
 assert(compact.includes('calc(100% - 12px)'),"calc() spacing changed");
 assert(compact.includes('var(--ink)'),"variables changed");
 assert(compact.includes('@media (max-width:600px)'),"responsive rules changed");
 assert(!compact.includes('editorial note'),"CSS comments not removed");
 assert(compact.length<original.length,"CSS did not get smaller");
 assert.equal(compactInlineStyles('<div>No inline CSS</div>'),'<div>No inline CSS</div>');
});

test("compact previews preserve original Quick Start guides and visual-QA evidence without raising budgets",()=>{
 for(const id of ["afterhours","orbit"]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes(exactGuideCSSFor(id)),id+" lost byte-for-byte DESIGN.md guide CSS during compaction");
  assert(html.length<240000,id+" still exceeds 240000-character preview budget: "+html.length);
  assert(html.includes("FICTIONAL TEMPLATE DEMO"),id+" lost template sample disclaimer");
  assert(html.includes("Secondary visual QA"),id+" removed original visual correction block marker");
  assert(html.includes("prefers-reduced-motion"),id+" lost motion-accessibility CSS");
  assert(html.includes('class="md-source-feature'),id+" lost source artwork");
 }
});
test("CSS compaction protects designated verbatim guides without changing other styles",()=>{
 const guide=[":root {","  --source-tone: #fff;","}",""].join("\n");
 const input='<style>/* remove */ .hello { color: red; }\\n'+guide+'</style>';
 const output=compactInlineStyles(input,{preserve:[guide]});
 assert(output.includes(guide),"Original source-guide block was edited");
 assert(output.length<input.length,"Non-source CSS did not compact");
 assert(!output.includes("remove"),"Unprotected comments were not compressed");
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {minimumTier,templateFitsTier} from "../shared/tiers.mjs";
test("Liquid Metal source remains available, original and private",async()=>{
 const s=await readFile(new URL("../design-sources/liquid-metal/DESIGN.md",import.meta.url),"utf8");
 assert(s.includes('name: "Liquid Metal"'));
 assert(s.includes("## AI Build Instructions"));
 assert(s.includes("## Pro tokens"));
 assert.equal(templates.filter(x=>x.id==="liquidmetal").length,1);
 assert.equal(minimumTier("liquidmetal"),"starter");
 assert.equal(templateFitsTier("liquidmetal","starter"),true);
 assert.equal(templateFitsTier("liquidmetal","signature"),false);
});
test("Liquid Metal has a standalone, source-faithful glass rendering without sampled proprietary media",()=>{
 for(const purpose of ["Student résumé","Professional portfolio","Actor / model","Creative portfolio","Personal brand","Small business"]){
  const input=sampleForTemplate("liquidmetal",purpose);
  const html=renderSite(input,{sample:true});
  assert(html.startsWith("<!doctype html>"));
  assert(html.includes('class="hero hero-variant liquidmetal-hero'));
  assert(html.includes('data-architecture="metal-machined-glass"'));
  assert(html.includes("backdrop-filter:blur(64px) saturate(115%)"));
  assert(html.includes("background:var(--lm-metal)"));
  assert(html.includes('rgba(232, 234, 238, 0.22)'));
  assert(html.includes("Inter:wght@400;500;600;700"));
  assert(html.includes("prefers-reduced-motion:reduce"));
  assert(html.includes('href="#work"'),"Missing working section navigation");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"));
  assert(!html.includes("<script"));
  assert(!html.includes("images.unsplash.com"));
  assert(!html.includes("linear-gradient(135deg,#ff"));
  assert(html.includes("Credits &amp; on-screen work") || purpose!=="Actor / model");
  assert(html.length<180000);
 }
});
test("Liquid Metal customer documents escape content, preserve approved media, and have no sample assets",()=>{
 const demo=sampleForTemplate("liquidmetal");
 const safe="11111111-1111-4111-8111-111111111111";
 const html=renderSite({...demo,content:{...demo.content,headline:"<script>alert(4)</script>",publicEmail:"",photoIds:[safe],cards:[{title:"<img onerror=alert(1)>",description:"A real project",url:"javascript:alert(2)"}]}});
 assert(html.includes("&lt;script&gt;alert(4)&lt;/script&gt;"));
 assert(!html.includes("<script>"));
 assert(html.includes("&lt;img onerror=alert(1)&gt;"));
 assert(!html.includes("javascript:"));
 assert(html.includes("/api/assets/"+safe));
 assert(!html.includes("FICTIONAL TEMPLATE DEMO"));
});
test("Liquid Metal browser and server renderers are identical",async()=>{
 for(const filename of ["liquid-metal.mjs","liquid-metal-style.mjs","model.mjs","premium.mjs","tiers.mjs"]){
  const [a,b]=await Promise.all([
    readFile(new URL("../shared/"+filename,import.meta.url),"utf8"),
    readFile(new URL("../supabase/functions/awe-api/shared/"+filename,import.meta.url),"utf8")
  ]);
  assert.equal(a,b,filename+" edge rendering differs");
 }
});

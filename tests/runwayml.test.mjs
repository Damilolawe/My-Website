import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {minimumTier,templateFitsTier} from "../shared/tiers.mjs";
const purposes=["Student résumé","Professional portfolio","Actor / model","Creative portfolio","Personal brand","Small business"];
test("RunwayML source is preserved and template registered once",async()=>{
 const src=await readFile(new URL("../design-sources/voltagent/runwayml/DESIGN.md",import.meta.url),"utf8");
 assert(src.includes("Design System Inspired by Runway"));
 assert(src.includes("Cinematic Hero"));
 assert.equal(templates.filter(t=>t.id==="runwayml").length,1);
 assert.equal(templates.slice(0,42).at(-5).id,"runwayml");
 assert.equal(minimumTier("runwayml"),"starter");
 assert(templateFitsTier("runwayml","starter"));
 assert(templateFitsTier("runwayml","signature"));
});
test("RunwayML does not change demo identity or layout with category",()=>{
 const samples=purposes.map(p=>sampleForTemplate("runwayml",p));
 const htmls=samples.map(s=>renderSite(s,{sample:true}));
 assert(htmls.every(h=>h===htmls[0]),"Every purpose should show the same exact editorial template");
 const html=htmls[0];
 for (const token of ["rw-hero","rw-stills","rw-article-grid","rw-light","rw-manifesto","rw-menu","prefers-reduced-motion:reduce","FICTIONAL TEMPLATE DEMO","href=\"#journal\"","href=\"#studio\""])assert(html.includes(token),token);
 assert(html.startsWith("<!doctype html>"));
 assert(html.includes("images.unsplash.com/"));
 assert(!html.includes("<script"));
 assert(!html.includes("Résumé"));
 assert(html.length<150000);
});
test("Published RunwayML pages use approved customer photos and escape private content",()=>{
 const id="11111111-1111-4111-8111-111111111111";
 const sample=sampleForTemplate("runwayml");
 const html=renderSite({...sample,content:{...sample.content,name:"<script>danger</script>",headline:"<img onerror=alert(1)>",photoIds:[id],cards:[{title:"<b>hello</b>",description:"Working",url:"javascript:alert(1)"}],publicEmail:""}});
 assert(html.includes("&lt;script&gt;danger&lt;/script&gt;"));
 assert(html.includes("&lt;img onerror=alert(1)&gt;"));
 assert(html.includes("&lt;b&gt;hello&lt;/b&gt;"));
 assert(html.includes("/api/assets/"+id));
 assert(!html.includes("<script"));
 assert(!html.includes("javascript:"));
 assert(!html.includes("images.unsplash.com"));
 assert(!html.includes("FICTIONAL TEMPLATE DEMO"));
});
test("RunwayML browser and server source renderers match",async()=>{
 for (const p of ["runwayml.mjs","model.mjs","premium.mjs","tiers.mjs"]){
  const [a,b]=await Promise.all([
    readFile(new URL("../shared/"+p,import.meta.url),"utf8"),
    readFile(new URL("../supabase/functions/awe-api/shared/"+p,import.meta.url),"utf8")
  ]);
  assert.equal(a,b,p);
 }
});

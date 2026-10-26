import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {architectureMap,architectureFor,architectureSignature,architecturalCSS} from "../shared/zip-architecture.mjs";
import {zipDesigns,zipPages} from "../shared/zip-design-catalog.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";

test("all 74 study designs have distinct source-authored layout compositions",()=>{
 assert.equal(zipDesigns.length,74);
 assert.equal(Object.keys(architectureMap).length,74);
 const signatures=new Set(),heroFamilies=new Set(),galleryTypes=new Set(),navTypes=new Set(),flows=new Set();
 for(const t of zipDesigns){
  const a=architectureFor(t);
  assert(a,t.id+" missing independent architecture");
  assert.equal(a.id,t.source);
  const signature=architectureSignature(t);
  assert(!signatures.has(signature),t.id+" duplicates another architecture");
  signatures.add(signature);
  heroFamilies.add(a.hero);galleryTypes.add(a.work);navTypes.add(a.nav);flows.add(a.flow);
 }
 assert.equal(signatures.size,74);
 assert(heroFamilies.size>=17,"Hero structures still repeat too much");
 assert(galleryTypes.size>=9,"Project sections still repeat too much");
 assert(navTypes.size>=6,"Navigation systems still repeat too much");
 assert(flows.size>=4,"All pages still follow the same reading flow");
 assert(architecturalCSS.includes("@media(max-width:640px)"),"Mobile composition fallback missing");
 assert(architecturalCSS.includes("prefers-reduced-motion:reduce"),"Reduced motion fallback missing");
});

test("new studies render source-specific hero and gallery architecture without changing AWE Express contracts",()=>{
 const starterOrders=new Set(),signatureHtml=new Set();
 for(const t of zipDesigns){
  const v=sampleForTemplate(t.id),a=architectureFor(t);
  const html=renderSite(v,{sample:true});
  assert(html.includes('class="site page-home arch-hero-'+a.hero),t.id+" broken preview body classes");
  assert(html.includes('data-architecture="'+t.source+'"'),t.id+" missing semantic architecture");
  assert(html.includes('arch-work-'+a.work),t.id+" missing project gallery variant");
  assert(html.includes('arch-nav-'+a.nav),t.id+" missing nav variant");
  assert(html.includes('class="design-nav"')||(["md-bugatti","md-mintlify","md-nintendo-2001"].includes(t.id)&&html.includes('<nav ')),t.id+" missing navigation structure");
  assert(/class="[^"]*\bcards\b[^"]*"/.test(html)||(t.id==="md-bugatti"&&html.includes('class="fv-cases"')),t.id+" missing customizable project collection");
  assert(html.includes('id="hero-title"'),t.id+" missing accessible page title");
  assert(html.includes('PROJECT 01 /'),t.id+" lost project-specific artwork");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"),t.id+" lost sample disclosure");
  assert(!html.includes("<script"),t.id+" introduced executable code");
  assert(html.includes(architecturalCSS.slice(0,60))||(["md-bugatti","md-mintlify","md-nintendo-2001"].includes(t.id)&&html.includes("prefers-reduced-motion:reduce")),t.id+" missing accessible architecture CSS");
  const heroHtml=html.match(/<section class="hero hero-variant[\s\S]*?<\/section>/)?.[0];
  assert(heroHtml?.includes('arch-hero-'+a.hero)||(["md-mintlify","md-nintendo-2001"].includes(t.id)&&heroHtml?.includes('data-architecture="'+t.source+'"'))||(t.id==="md-bugatti"&&html.includes('class="fv-hero" data-architecture="'+t.source+'"')),t.id+" no unique flagship hero markup");
  if(!t.multipage){
   const pos=["work","features","studio"].map(x=>html.indexOf('id="'+x+'"'));
   assert(pos.every(x=>x>=0),t.id+" starter content missing");
   starterOrders.add(pos.map((x,i)=>[x,["work","features","studio"][i]]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join("/"));
  }else signatureHtml.add(a.hero);
 }
 assert(starterOrders.size>=4,"Starter section sequencing remains identical");
 assert(signatureHtml.size>=12,"Signature opening hero designs remain repetitive");
});

test("Signature chapter links and customer-owned media survive the architecture redesign",()=>{
 for(const t of zipDesigns.filter(x=>x.multipage)){
  const sample=sampleForTemplate(t.id);
  for(const page of zipPages){
   const html=renderZipDesign(sample,{sample:true},page);
   assert(html.includes('class="site page-'+page+' '),t.id+"/"+page+" body identity changed");
   assert(html.includes('href="/templates/'+t.id+'/home.html"'),t.id+"/"+page+" home link missing");
   assert(html.includes('href="/templates/'+t.id+'/contact.html"'),t.id+"/"+page+" contact link missing");
   assert(html.includes('aria-current="page"'),t.id+"/"+page+" current page not announced");
   assert(html.includes('<main id="main">'),t.id+"/"+page+" main region missing");
   assert(html.includes('id="hero-title"'),t.id+"/"+page+" heading missing");
   assert(!html.includes("<script"),t.id+"/"+page+" unsafe HTML");
  }
 }
 const value=sampleForTemplate("md-framer");
 const withMedia={...value,content:{...value.content,headline:"Customer <Headline>",name:"Local Agency",
 photoIds:["11111111-1111-4111-8111-111111111111"],cards:[{title:"First <Project>",description:"Visible description"}]}};
 const output=renderSite(withMedia,{sample:false,assetBase:"/client-assets/"});
 assert(output.includes("/client-assets/11111111-1111-4111-8111-111111111111"),"Customer image did not render");
 assert(output.includes("&lt;Headline&gt;"),"Customer headline was not escaped");
 assert(output.includes("&lt;Project&gt;"),"Customer card was not escaped");
 assert(!output.includes("Customer <Headline>")&&!output.includes("<script"));
});

test("source architecture and renderer stay identical on frontend and Supabase",async()=>{
 for(const name of ["zip-architecture.mjs","zip-design-render.mjs"]){
  const [frontend,server]=await Promise.all([
   readFile(new URL("../shared/"+name,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+name,import.meta.url),"utf8")
  ]);
  assert.equal(frontend,server,name+" drift between preview and publishing");
 }
 for(const id of ["folio","liquidmetal","afterhours","runwayml","runwaymulti","nike","clay","ferrari"]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(!html.includes("data-architecture=\"md-"),id+" unrelated template architecture was modified");
 }
});

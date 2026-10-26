import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";

const flagships=[
 ["md-bugatti","fg-velocity","fv-hero","fv-engineering","fv-cases"],
 ["md-mintlify","fg-fieldnotes","fn-product-stage","study-chapter study-docs","fn-playbook"],
 ["md-nintendo-2001","fg-pixelquest","pq-console","pq-quest","pq-games"]
];

test("Flagship sites use three genuinely independent architectures with complete bespoke sections",()=>{
 const layouts=new Set();
 for(const [id,cls,hero,interaction,work] of flagships){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes(cls),id+" not using its dedicated renderer");
  assert(html.includes(hero),id+" missing flagship scene");
  assert(html.includes(interaction),id+" missing characteristic experience");
  assert(html.includes(work),id+" missing dedicated project architecture");
  assert(html.includes('id="hero-title"'),id+" lost main heading");
  assert(html.includes('id="work"'),id+" lost project anchors");
  assert(html.includes('id="features"'),id+" lost interaction or details anchor");
  assert(html.includes('id="studio"'),id+" lost brand-story anchor");
  assert(html.includes('id="contact"'),id+" lost inquiry anchor");
  assert(html.includes('PROJECT 01 /'),id+" lost customer projects");
  assert(!html.includes("<script"),id+" cannot ship inline scripts");
  assert(html.includes("prefers-reduced-motion:reduce"),id+" lost reduced-motion support");
  assert(html.includes("@media(max-width:550px)"),id+" lost small-device safeguard");
  layouts.add([hero,interaction,work].join("/"));
 }
 assert.equal(layouts.size,3);
});

test("Flagship output and previews request monochrome text glyph rendering",async()=>{
 const unqualified=/[↗↘↖↙←→↑↓⇄✳✺✻✽✿✦✧❦▶✓★](?!\uFE0E)/u;
 for(const [id] of flagships){
  assert(!unqualified.test(renderSite(sampleForTemplate(id),{sample:true})),id+" has emoji-capable glyphs");
 }
 for(const file of ["velocity.html","fieldnotes.html","pixelquest.html"]){
  const html=await readFile(new URL("../previews/flagships/"+file,import.meta.url),"utf8");
  assert(!unqualified.test(html),file+" has emoji-capable glyphs");
 }
});

test("Automotive Signature website has five meaningful, independently composed pages",()=>{
 const value=sampleForTemplate("md-bugatti");
 const html=new Map(["home","work","features","studio","contact"].map(page=>[page,renderZipDesign(value,{sample:true},page)]));
 assert.equal(new Set(html.values()).size,5);
 for(const [page,markup] of html){
  assert(markup.includes('class="site page-'+page+' '),page+" page identity mismatch");
  assert(markup.includes('href="/templates/md-bugatti/contact.html"'),page+" links lost");
  assert(markup.includes('aria-current="page"'),page+" current-page indicator lost");
 }
 assert(html.get("home").includes("fv-hero-photo"));
 assert(html.get("work").includes("fv-collection"));
 assert(html.get("features").includes("fv-specs"));
 assert(html.get("studio").includes("fv-manifesto"));
 assert(html.get("contact").includes("fv-contact"));
});

test("Documentation Signature website has its own navigable reference experience",()=>{
 const v=sampleForTemplate("md-mintlify");
 const docs=renderZipDesign(v,{sample:true},"features");
 assert(docs.includes('class="study-chapter study-docs')||docs.includes("study-chapter study-docs"));
 for(const id of ["study-start","study-setup","study-reference"])assert(docs.includes('id="'+id+'"'));
 assert(docs.includes('aria-label="Fictional code snippet"'));
 assert(docs.includes("fn-desk-sidenav"));
 assert(docs.includes("fn-desk-toc"));
 assert(!docs.includes("study-chapter study-price"));
 const home=renderZipDesign(v,{sample:true},"home");
 assert(home.includes("fn-app-window"));
 assert(home.includes("fn-floating-note"));
 assert(home.includes("fn-steps cards")||home.includes("cards fn-steps"));
 assert.notEqual(home,docs);
});

test("Retro game selector is real HTML/CSS interaction, not a static placeholder",()=>{
 const html=renderSite(sampleForTemplate("md-nintendo-2001"),{sample:true});
 for(const p of ["pq-meadow","pq-city","pq-cave"]){
  assert(html.includes('id="'+p+'"'));
  assert(html.includes('for="'+p+'"'));
 }
 assert(html.includes(".pq-quest:has(#pq-city:checked)"));
 assert(html.includes(".pq-quest:has(#pq-cave:checked)"));
 assert(html.includes("pq-console"));
 assert(html.includes("pq-screen"));
 assert(!html.includes("<script"));
});

test("Three flagships preserve safe customizable content and authorized media",()=>{
 const ids=flagships.map(x=>x[0]),photo="11111111-1111-4111-8111-111111111111";
 for(const id of ids){
  const sample=sampleForTemplate(id);
  const edited={...sample,design:{...sample.design,primary:"#11aa99",secondary:"#e9e1dc"},
   content:{...sample.content,name:"Customer <unsafe>",headline:"A headline with <markup>",
    bio:"Real customer content",photoIds:[photo],
    cards:[{title:"Project <a>",description:"Customer work",url:""}]}};
  const output=renderSite(edited,{sample:false,assetBase:"/client-assets/"});
  assert(output.includes("Customer &lt;unsafe&gt;"),id);
  assert(output.includes("A headline with &lt;markup&gt;"),id);
  assert(output.includes("&lt;a&gt;"),id);
  assert(output.includes("/client-assets/"+photo),id+" customer media was not used");
  assert(output.includes("#11aa99"),id+" customer color field was discarded");
  assert(!output.includes("<script"),id);
 }
});

test("Automotive editorial accepts three independent client portfolio images",()=>{
 const sample=sampleForTemplate("md-bugatti");
 const ids=["11111111-1111-4111-8111-111111111111","22222222-2222-4222-8222-222222222222","33333333-3333-4333-8333-333333333333"];
 const value={...sample,content:{...sample.content,photoIds:ids}};
 const output=renderSite(value,{sample:false,assetBase:"/client-assets/"});
 for(const id of ids)assert(output.includes("/client-assets/"+id),"Missing customer project art: "+id);
});

test("Velocity's stock photography appears only in fictional demos, never customer-published HTML",()=>{
 const value=sampleForTemplate("md-bugatti");
 const edited={...value,content:{...value.content,photoIds:[]}};
 const customer=renderSite(edited,{sample:false});
 assert(!customer.includes("images.unsplash.com/photo-"),"Customer HTML leaked fictional remote imagery");
 assert(customer.includes("guide-bugatti"),"Authored source artwork missing from customer fallback");
 assert(!customer.includes("<script"),"Customer HTML gained an executable script");
 const demo=renderSite(edited,{sample:true});
 assert(demo.includes("images.unsplash.com/photo-"),"Preview should retain its cinematic fictional demo photography");
});

test("New flagship source remains identical in browser and Supabase publication renderer",async()=>{
 const paths=["zip-design-render.mjs","zip-flagship-utils.mjs","zip-flagship-velocity.mjs",
  "zip-flagship-fieldnotes.mjs","zip-flagship-pixelquest.mjs"];
 for(const name of paths){
  const [frontend,edge]=await Promise.all([
   readFile(new URL("../shared/"+name,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+name,import.meta.url),"utf8")
  ]);
  assert.equal(frontend,edge,name+" drift");
 }
 const unaffected=renderSite(sampleForTemplate("md-airbnb"),{sample:true});
 assert(!unaffected.includes("fg-velocity")&&!unaffected.includes("fg-fieldnotes")&&!unaffected.includes("fg-pixelquest"));
});

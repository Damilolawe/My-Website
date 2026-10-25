import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {zipDesigns,zipPages,zipDesignFor} from "../shared/zip-design-catalog.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {minimumTier,packageAllowsTemplate} from "../shared/tiers.mjs";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");

test("74 appended source-guided directions preserve original collection and split exactly 37/37",()=>{
 assert.equal(templates.length,116);
 assert.equal(zipDesigns.length,74);
 assert.deepEqual(templates.slice(-74).map(t=>t.id),zipDesigns.map(t=>t.id));
 assert.equal(new Set(templates.map(t=>t.id)).size,116);
 assert.equal(new Set(templates.map(t=>t.name)).size,116);
 assert.equal(zipDesigns.filter(t=>t.multipage).length,37);
 assert.equal(zipDesigns.filter(t=>!t.multipage).length,37);
 const known=new Set(["apple","ferrari","figma","linear.app","spotify","warp","raycast","nike","clay","runwayml"]);
 for(const t of zipDesigns){assert(!known.has(t.source),t.source+" should be omitted");
  assert.equal(minimumTier(t.id),t.multipage?"signature":"starter");
  assert.equal(packageAllowsTemplate({tier:"signature",delivery:"awe-multipage",pageCount:5},t.id),false,"Do not take payment before complete multipage fulfillment is verified");
  assert.equal(packageAllowsTemplate({tier:"signature",delivery:"awe-hosted",pageCount:1},t.id),false,"Backend does not yet fulfill any newly authored study");
 }
});
test("Every appended sample renders a safe responsive customer-editable preview",()=>{
 for(const t of zipDesigns){
  const v=sampleForTemplate(t.id),html=renderSite(v,{sample:true});
  assert.equal(v.template,t.id);
  assert.match(html,/FICTIONAL TEMPLATE DEMO/);
  assert.match(html,/<h1 id="hero-title">/);
  assert.match(html,/<meta name="viewport"/);
  assert.match(html,/@media\(max-width:550px\)/);
  assert.match(html,/@media\(prefers-reduced-motion:reduce\)/);
  assert(!html.includes("<script"));
  assert(html.includes(t.bg),t.id);
  assert(html.includes(t.color),t.id);
  assert(html.includes(v.content.name),t.id);
 }
});
test("New five-page previews contain five distinct linked and semantic pages",async()=>{
 for(const t of zipDesigns.filter(t=>t.multipage)){
  const v=sampleForTemplate(t.id),pages=[];
  for(const page of zipPages){
   const output=await read("dist/templates/"+t.id+"/"+page+".html");
   assert(output.includes("/templates/"+t.id+"/home.html"),t.id+"/"+page+": missing main nav");
   assert(output.includes("/templates/"+t.id+"/contact.html"),t.id+"/"+page+": missing contact nav");
   assert(output.includes('aria-current="page"'),t.id+"/"+page);
   assert(output.includes('<main id="main">'),t.id+"/"+page);
   assert(output.includes('id="hero-title"'),t.id+"/"+page);
   assert(!output.includes("<script"),t.id+"/"+page);
   assert.equal(output,renderZipDesign(v,{sample:true},page),t.id+"/"+page);
   pages.push(output);
  }
  assert.equal(new Set(pages).size,5,t.id+": page content must differ");
 }
});
test("Changing customer text and colors affects the rendered website without altering other designs",()=>{
 const t=zipDesignFor("md-framer");
 assert(t);
 const sample=sampleForTemplate(t.id);
 const edited={...sample,design:{...sample.design,primary:"#18aacc",secondary:"#282c2f"},
   content:{...sample.content,name:"Original Brand",headline:"Original Headline",bio:"A real customer brand statement"}};
 const html=renderSite(edited,{sample:false});
 for(const needle of ["Original Brand","Original Headline","A real customer brand statement","#18aacc","#282c2f"])assert(html.includes(needle),needle);
 assert(!html.includes('FICTIONAL TEMPLATE DEMO'));
 assert(!renderSite(sampleForTemplate("index"),{sample:true}).includes("Original Brand"));
});

test("New draft designs remain visible even while server catalog has legacy entries",async()=>{
 const [client,gallery]=await Promise.all([read("app/order.mjs"),read("showcase.js")]);
 assert(client.includes("const galleryTemplates=templates.map("));
 assert(client.includes("const offered = galleryTemplates"));
 assert(client.includes("galleryTemplates.find(t => t.id === id)"));
 assert(gallery.includes('"/templates/"+id+"/home.html"'));
});

test("New studies expose purchase restrictions visibly in the gallery",async()=>{
 const client=await read("app/order.mjs");
 assert(client.includes("express-study-status"));
 assert(client.includes("This is a preview-only design study."));
 assert(client.includes("notice.hidden=!zipDesignFor(id)"));
});

test("Source-guide visual groups render distinct artwork, not one repeated generic abstract image",()=>{
 const reps=[["md-bugatti","guide-bugatti"],["md-aljazeera","art-editorial"],["md-coinbase","art-fintech"],["md-claude","guide-claude"],["md-framer","guide-framer"],["md-airbnb","guide-airbnb"],["md-oura","art-studio"]];
 const seen=new Set();
 for(const [id,signature] of reps){const html=renderSite(sampleForTemplate(id),{sample:true});assert(html.includes(signature),id+" artwork differs");seen.add(signature);}
 assert.equal(seen.size,7);
});

test("New design variants do not inflate hosting with unused legacy purpose URLs",async()=>{
 const build=await read("scripts/build.mjs");
 assert(build.includes("if (zipDesignFor(t.id)) continue;"));
 for(const t of zipDesigns){
  assert((await read("dist/templates/"+t.id+".html")).includes("FICTIONAL TEMPLATE DEMO"));
 }
});

test("New study editor preserves the authored palette and supports uploaded hero media",async()=>{
 const [client,source]=await Promise.all([read("app/order.mjs"),read("shared/zip-design-render.mjs")]);
 assert(client.includes("zipDesignFor(id)?.surface"));
 assert(source.includes("content.photoIds?.[0]&&!options.sample"));
 const sample=sampleForTemplate("md-framer");
 const photoId="a1234567-b123-4123-8123-123456789abc";
 const updated={...sample,content:{...sample.content,photoIds:[photoId]}};
 const rendered=renderSite(updated,{sample:false,assetBase:"/client-assets/"});
 assert(rendered.includes("/client-assets/"+photoId));
 assert(!renderSite(updated,{sample:true}).includes("/client-assets/"+photoId));
});

test("Five-page Signature demos can switch pages safely in the AWE Express sandbox",async()=>{
 const [g,p,style]=await Promise.all([read("showcase.js"),read("shared/preview.mjs"),read("app/express-gallery.css")]);
 assert(g.includes('pageBar.className="worlds-page-list"'));
 assert(g.includes('pageBar.setAttribute("aria-label","Preview website pages")'));
 assert(g.includes('currentPage=part;choose(selected)'));
 assert(g.includes('fetchPublicStudyPage(id,currentPage'));
 assert(p.includes("zipDesignFor(id)?.multipage||!zipPages.includes(page)"));
 assert(p.includes('const path="/templates/"+id+"/"+page+".html"'));
 assert(style.includes(".worlds-page-list button[aria-pressed=\"true\"]"));
});

test("Starter and Signature ZIP designs appear exclusively in their chosen tier while legacy eligibility remains unchanged",async()=>{
 const client=await read("app/order.mjs");
 assert(client.includes("zipDesignFor(t.id).tier === selectedTier"));
 assert(client.includes("!zipDesignFor(t.id) ||"));
});

test("Signature design studies display the page names specified in their source guides",async()=>{
 const {zipChapterLabels}=await import("../shared/zip-design-catalog.mjs");
 assert.deepEqual(zipChapterLabels("framer"),["Home","Work","Pricing","Studio","Contact"]);
 assert.deepEqual(zipChapterLabels("ibm"),["Home","Collection","Documentation","Studio","Contact"]);
 assert.deepEqual(zipChapterLabels("airbnb"),["Home","Explore","Features","Studio","Contact"]);
 const framer=renderZipDesign(sampleForTemplate("md-framer"),{sample:true},"features");
 assert(framer.includes('href="/templates/md-framer/features.html" aria-current="page">Pricing</a>'));
 assert(framer.includes("<h1 id=\"hero-title\">Pricing by design.</h1>"));
 const ibm=renderZipDesign(sampleForTemplate("md-ibm"),{sample:true},"features");
 assert(ibm.includes('href="/templates/md-ibm/features.html" aria-current="page">Documentation</a>'));
});

test("Six design source guides have distinct per-reference layouts, typography and artwork",async()=>{
 const {sourceGuideCSS,sourceGuideScene}=await import("../shared/zip-guide-fidelity.mjs");
 for(const id of ["md-bugatti","md-airbnb","md-claude","md-framer","md-nintendo-2001","md-shopify"]){
   const meta=zipDesignFor(id),html=renderSite(sampleForTemplate(id),{sample:true});
   assert(meta&&sourceGuideCSS(id).length>400,id);
   assert(sourceGuideScene(meta,0)?.includes("guide-scene"),id);
   assert(html.includes("source-"+id),id);
   assert(html.includes("guide-scene"),id);
   assert(html.includes(sourceGuideCSS(id).slice(0,35)),id);
 }
 const retro=renderSite(sampleForTemplate("md-nintendo-2001"),{sample:true});
 const luxury=renderSite(sampleForTemplate("md-bugatti"),{sample:true});
 assert(retro.includes("max-width:830px"));
 assert(luxury.includes("letter-spacing:.42em"));
});

test("Six source-specific designs show original fictional demo narratives rather than repeating Studio XX",()=>{
 const expected=[["md-bugatti","ATELIER VELOCITY"],["md-airbnb","HOMEBY"],["md-claude","KINSHIP INTELLIGENCE"],["md-framer","FORM STUDIO"],["md-nintendo-2001","PIXELQUEST 2001"],["md-shopify","VERDANT SUPPLY"]];
 for(const [id,name] of expected){const value=sampleForTemplate(id);const html=renderSite(value,{sample:true});assert.equal(value.content.name,name);assert(html.includes(name));assert(value.content.cards.length>=3);assert(value.content.bio.toLowerCase().includes("fictional"));}
});

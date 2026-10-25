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
 const reps=[["md-bugatti","art-auto"],["md-aljazeera","art-editorial"],["md-coinbase","art-fintech"],["md-claude","art-code"],["md-framer","art-product"],["md-airbnb","art-commerce"],["md-oura","art-studio"]];
 const seen=new Set();
 for(const [id,signature] of reps){const html=renderSite(sampleForTemplate(id),{sample:true});assert(html.includes(signature),id+" artwork differs");seen.add(signature);}
 assert.equal(seen.size,7);
});

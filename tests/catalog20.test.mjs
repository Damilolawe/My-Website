import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {templates,types,typeSlugs,sampleForTemplate,recommendedFor,normalize} from "../shared/model.mjs";
import {renderLegacySite as renderSite} from "../shared/render.mjs";
import {freeDesignFor} from "../shared/free-designmd.mjs";
import {TEMPLATE_IDS,fetchPublicTemplate} from "../shared/preview.mjs";

test("116 templates have unique identities and appropriately grouped design descriptions",()=>{
  assert.equal(templates.length,116);
  assert.equal(TEMPLATE_IDS.length,templates.length);
  assert.equal(new Set(templates.map(x=>x.id)).size,templates.length);
  assert.equal(new Set(templates.map(x=>x.name)).size,templates.length);
  const authored=templates.filter(x=>!x.id.startsWith("md-"));
  const sourceStudies=templates.filter(x=>x.id.startsWith("md-"));
  assert.equal(authored.length,42,"Preserve all independently art-directed original templates");
  assert.equal(sourceStudies.length,74,"Preserve all source-guided design studies");
  assert.equal(new Set(authored.map(x=>x.style)).size,authored.length,
    "Original templates must retain distinct authored design descriptions");
  const neutralCategories=new Set([
    "Automotive editorial","Editorial publishing","Financial interface",
    "Developer experience","Product design","Digital commerce","Creative portfolio"
  ]);
  for(const study of sourceStudies){
    assert(neutralCategories.has(study.style),study.id+" must use a neutral public category");
  }
  assert.equal(new Set(sourceStudies.map(x=>x.style)).size,neutralCategories.size,
    "Every neutral design category should be represented");
  const markup=templates.map(t=>renderSite(sampleForTemplate(t.id),{sample:true}));
  const uniqueMarkers=markup.map((html,t)=>{
    const marker=templates[t].id==="folio"?["folio","folio-editorial"]:templates[t].id==="md-bugatti"?html.match(/<section class="fv-hero" data-architecture="([\w-]+)"/):["nike","clay","ferrari"].includes(templates[t].id) ? ["trio-hero",templates[t].id] : ["runwayml","runwaymulti"].includes(templates[t].id) ? ["rw-hero",templates[t].id] : freeDesignFor(templates[t].id)?html.match(/<section class="fd-hero" data-architecture="([\w-]+)"/):html.match(/<section class="hero hero-variant (?:md-hero md-)?([\w-]+)(?:\s|")/);
    assert(marker,templates[t].id+" missing distinct hero");
    assert(html.includes('<h1 id="hero-title">') || (["runwayml","runwaymulti"].includes(templates[t].id) && html.includes('id="rw-h1"')),"Accessible main headline missing");
    assert(html.includes("FICTIONAL TEMPLATE DEMO"),"No customer information belongs in sample");
    assert(html.includes('prefers-reduced-motion'),"Missing reduced motion");
    assert(!html.includes("<script"),"Approved static customer sites must be script-free");
    return marker[1];
  });
  assert.equal(new Set(uniqueMarkers).size,116,"Every template must have an individual hero signature");
  assert.equal(new Set(markup).size,116,"The output must not be a set of identical skins");
});
test("every design supports six purpose-matched previews with an accurate narrative",()=>{
  assert.equal(types.length,6);
  assert.equal(new Set(Object.values(typeSlugs)).size,6);
  for(const type of types){
    assert(templates.some(t=>recommendedFor(t,type)),"No recommended design for "+type);
    for(const template of templates){
      if(template.id.startsWith("md-")){const demo=sampleForTemplate(template.id);assert(demo.content.cards.length>=3);assert(renderSite(demo,{sample:true}).includes("FICTIONAL TEMPLATE DEMO"));continue;}
      const demo=sampleForTemplate(template.id,type);
      if(["runwayml","runwaymulti"].includes(template.id)) { assert.equal(demo.type,"Creative portfolio"); assert(renderSite(demo,{sample:true}).includes('id="rw-h1"')); continue; } // Fixed editorial study across categories.
      if(["nike","clay","ferrari"].includes(template.id)){assert.equal(demo.type,"Creative portfolio");assert(renderSite(demo,{sample:true}).includes('id="hero-title"'));continue;}
      assert.equal(demo.type,type);
      assert.equal(demo.template,template.id);
      assert(!demo.content.publicEmail,"Never invent client contact information");
      assert.deepEqual(demo.content.testimonials,[],"Never present fake endorsements");
      assert(demo.content.cards.some(card=>card.title),"Purpose-aware projects missing");
      assert(demo.content.bio.toLowerCase().includes("fictional")||demo.content.bio.toLowerCase().includes("imagined"),"Clearly fictional biography required");
      const html=renderSite(demo,{sample:true});
      assert(html.includes('<h1 id="hero-title">'));
      if(!["arcade","folio"].includes(template.id) && !freeDesignFor(template.id) && type==="Actor / model") assert(html.includes("Credits &amp; on-screen work"));
      if(!["arcade","folio"].includes(template.id) && !freeDesignFor(template.id) && type==="Small business") assert(html.includes("What we offer"));
      if(!["arcade","folio"].includes(template.id) && !freeDesignFor(template.id) && type==="Student résumé") assert(html.includes("Projects &amp; experiments"));
    }
  }
});
test("static build preserves legacy purpose aliases and adds canonical demos for the new studies",async()=>{
  for(const t of templates.slice(0,42)){
    for(const type of types){
      const root="dist/templates/"+typeSlugs[type]+"/"+t.id;
      for(const suffix of [".html","--still.html"]){
        const path=root+suffix;
        const file=await readFile(path,"utf8");
        assert(file.includes("FICTIONAL TEMPLATE DEMO"),path+" is not a public fictional example");
        assert(file.includes("motion-"+(suffix===".html"?"expressive":"none")),path+" has wrong motion mode");
      }
    }
  }
  assert((await stat("dist/templates/atlas.html")).size>1000);
});
test("allowed static preview paths never accept arbitrary user-controlled URL segments",async()=>{
  const original=globalThis.fetch;
  try{
    globalThis.fetch=async (url)=>{
      assert.equal(url,"/templates/playbill.html");
      return new Response(renderSite(sampleForTemplate("playbill","Actor / model"),{sample:true}),
        {headers:{"Content-Type":"text/html; charset=utf-8"}});
    };
    const content=await fetchPublicTemplate("playbill",{type:"Actor / model"});
    assert(content.includes("Credits &amp; on-screen work"));
    await assert.rejects(fetchPublicTemplate("../../../admin",{type:"Actor / model"}),/Unknown template/);
  }finally{globalThis.fetch=original;}
});
test("AWE Express gallery exposes all forty-two authored designs at eligible tiers",async()=>{
 const [home,show,order,build]=await Promise.all(["index.html","showcase.js","app/order.mjs","scripts/build.mjs"].map(x=>readFile(x,"utf8")));
 assert(!home.includes('id="express-showcase"'));
 assert(home.includes('id="transformation-slider"'));
 assert(show.includes("items.map"));
 assert(!show.includes("recommendedFor"));
 assert(order.includes("mountExpressGallery"));
 assert(order.includes("items:offered,initial:active.id"));
 assert(order.includes("templatesForTier(selectedTier)"));
 assert(order.includes("setTemplate(id)"));
 assert(build.includes("for (const type of types)"));
 assert(!order.includes("catalog.templates.map"));
});

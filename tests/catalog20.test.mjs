import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {templates,types,typeSlugs,sampleForTemplate,recommendedFor,normalize} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {freeDesignFor} from "../shared/free-designmd.mjs";
import {TEMPLATE_IDS,fetchPublicTemplate} from "../shared/preview.mjs";

test("collection contains exactly forty unique art-directed templates",()=>{
  assert.equal(templates.length,37);
  assert.equal(TEMPLATE_IDS.length,37);
  assert.equal(new Set(templates.map(x=>x.id)).size,37);
  assert.equal(new Set(templates.map(x=>x.name)).size,37);
  assert.equal(new Set(templates.map(x=>x.style)).size,37);
  const markup=templates.map(t=>renderSite(sampleForTemplate(t.id),{sample:true}));
  const uniqueMarkers=markup.map((html,t)=>{
    const marker=freeDesignFor(templates[t].id)?html.match(/<section class="fd-hero" data-architecture="([\w-]+)"/):html.match(/<section class="hero hero-variant (?:md-hero md-)?([\w-]+)(?:\s|")/);
    assert(marker,templates[t].id+" missing distinct hero");
    assert(html.includes('<h1 id="hero-title">'),"Accessible main headline missing");
    assert(html.includes("FICTIONAL TEMPLATE DEMO"),"No customer information belongs in sample");
    assert(html.includes('prefers-reduced-motion'),"Missing reduced motion");
    assert(!html.includes("<script"),"Approved static customer sites must be script-free");
    return marker[1];
  });
  assert.equal(new Set(uniqueMarkers).size,37,"Every template must have an individual hero signature");
  assert.equal(new Set(markup).size,37,"The output must not be a set of identical skins");
});
test("every design supports six purpose-matched previews with an accurate narrative",()=>{
  assert.equal(types.length,6);
  assert.equal(new Set(Object.values(typeSlugs)).size,6);
  for(const type of types){
    assert(templates.some(t=>recommendedFor(t,type)),"No recommended design for "+type);
    for(const template of templates){
      const demo=sampleForTemplate(template.id,type);
      assert.equal(demo.type,type);
      assert.equal(demo.template,template.id);
      assert(!demo.content.publicEmail,"Never invent client contact information");
      assert.deepEqual(demo.content.testimonials,[],"Never present fake endorsements");
      assert(demo.content.cards.some(card=>card.title),"Purpose-aware projects missing");
      assert(demo.content.bio.toLowerCase().includes("fictional")||demo.content.bio.toLowerCase().includes("imagined"),"Clearly fictional biography required");
      const html=renderSite(demo,{sample:true});
      assert(html.includes('<h1 id="hero-title">'));
      if(template.id!=="arcade" && !freeDesignFor(template.id) && type==="Actor / model") assert(html.includes("Credits &amp; on-screen work"));
      if(template.id!=="arcade" && !freeDesignFor(template.id) && type==="Small business") assert(html.includes("What we offer"));
      if(template.id!=="arcade" && !freeDesignFor(template.id) && type==="Student résumé") assert(html.includes("Projects &amp; experiments"));
    }
  }
});
test("static build includes all twenty demos for each purpose and motion-free variants",async()=>{
  for(const t of templates){
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
      assert.equal(url,"/templates/actor/playbill.html");
      return new Response(renderSite(sampleForTemplate("playbill","Actor / model"),{sample:true}),
        {headers:{"Content-Type":"text/html; charset=utf-8"}});
    };
    const content=await fetchPublicTemplate("playbill",{type:"Actor / model"});
    assert(content.includes("Credits &amp; on-screen work"));
    await assert.rejects(fetchPublicTemplate("../../../admin",{type:"Actor / model"}),/Unknown template/);
  }finally{globalThis.fetch=original;}
});
test("homepage controls and order builder expose all twenty without old six-item catalogs",async()=>{
  const [home,show,order,build]=await Promise.all(
    ["index.html","showcase.js","app/order.mjs","scripts/build.mjs"].map(x=>readFile(x,"utf8")));
  assert(home.includes("DESIGN WITHOUT"));
  assert(home.includes('id="world-purpose"'));
  assert(home.includes('id="transformation-slider"'));
  assert(show.includes("templates.map"));
  assert(show.includes("recommendedFor"));
  assert(order.includes("offered.map"));
  assert(order.includes("fetchPublicTemplate(id,{type:input.type"));
  assert(order.includes("loadTemplate(input.template)"));
  assert(order.includes("templateFitsTier(t.id, selectedTier)"));
  assert(order.includes("const syncFrameSize="));
  assert(build.includes("for (const type of types)"));
  assert(!order.includes("catalog.templates.map"));
});


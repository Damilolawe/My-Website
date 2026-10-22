import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates, sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";

test("every customer template has a distinct, semantic hero composition and fictional demo identity",()=>{
  const expected=["index-hero","folio-hero","still-hero","afterhours-hero","signal-hero","daylight-hero"];
  const headlines=new Set();
  templates.slice(0,6).forEach((t,i)=>{
    const demo=sampleForTemplate(t.id);
    const html=renderSite(demo,{sample:true});
    assert.match(html,/<!doctype html>/i);
    assert(html.includes('class="hero hero-variant '+expected[i]+'"'));
    assert(html.includes('<h1 id="hero-title">'));
    assert(html.includes('FICTIONAL TEMPLATE DEMO'));
    assert(html.includes('viewport'));
    assert(html.includes('prefers-reduced-motion'));
    assert(html.includes('motion-expressive'));
    assert(html.includes('experience-interlude'));
    assert(!html.includes('src="https://'));
    assert(!html.includes('<script'));
    headlines.add(demo.content.headline);
  });
  assert.equal(headlines.size,6,"Each sample concept should tell a different fictional story.");
});
test("customer motion controls do not require scripts or unauthorized publication",()=>{
  const base=sampleForTemplate("afterhours");
  for(const mode of ["none","subtle","expressive"]){
    const html=renderSite({...base,design:{...base.design,animation:mode}});
    assert(html.includes('motion-'+mode));
    assert(html.includes(".motion-none *"));
    assert(html.includes("@media(prefers-reduced-motion:reduce)"));
    assert(!html.includes("<script"));
  }
});
test("rich content remains properly escaped inside cinematic hero variations",()=>{
  const demo=sampleForTemplate("signal");
  const html=renderSite({...demo,content:{...demo.content,name:"<img src=x>",headline:"<script>alert(1)</script>",heroLabel:"<svg onload=x>" }});
  assert(html.includes("&lt;script&gt;"));
  assert(html.includes("&lt;svg"));
  assert(html.includes("&lt;img"));
  assert(!html.includes("<script>alert"));
  assert(!html.includes('onload=x>'));
});
test("homepage and ordering preview theater stay sample-only and keyboard accessible",async()=>{
  const home=await readFile("index.html","utf8"),builder=await readFile("app/order.mjs","utf8"),stage=await readFile("showcase.js","utf8");
  const build=await readFile("scripts/build.mjs","utf8");
  assert(home.includes('id="express-showcase"'));
  assert(home.includes('id="worlds-frame"'));
  assert(home.includes('aria-pressed="true"'));
  assert(home.includes('sandbox=""'));
  assert(builder.includes('sampleForTemplate'));
  assert(builder.includes('id="theater-frame"'));
  assert(builder.includes('sandbox=""'));
  assert(stage.includes("ArrowRight"));
  assert(stage.includes('data-world'));
  assert(build.includes('"showcase.css"')&&build.includes('"showcase.js"'));
});

test("motion-free demo variants and contrast tokens are generated safely",async()=>{
  const builder=await readFile("scripts/build.mjs","utf8");
  const stage=await readFile("showcase.js","utf8");
  assert(builder.includes("--still.html"));
  assert(stage.includes("AWE_MOTION_PAUSED"));
  assert(stage.includes('document.addEventListener("awe:motion"'));
  const index=sampleForTemplate("index");
  const light=renderSite({...index,design:{...index.design,primary:"#eeeeee"}});
  const dark=renderSite({...index,design:{...index.design,primary:"#113377"}});
  assert(light.includes("--on-accent:#10120d"));
  assert(dark.includes("--on-accent:#ffffff"));
});

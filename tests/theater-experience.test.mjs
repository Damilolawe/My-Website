import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,types,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
test("All 20 demos have distinct fictional identities in every purpose",()=>{
  for(const purpose of types){
    const names=new Set(),headlines=new Set();
    for(const t of templates.filter(x=>x.id!=="runwayml"&&x.id!=="runwaymulti"&&!["nike","clay","ferrari"].includes(x.id))){
      const sample=sampleForTemplate(t.id,purpose);
      assert.equal(sample.type,purpose);
      assert(!names.has(sample.content.name),t.id+" repeated a public identity");
      assert(!headlines.has(sample.content.headline),t.id+" repeated a hero statement");
      names.add(sample.content.name);
      headlines.add(sample.content.headline);
      assert(renderSite(sample,{sample:true}).includes('FICTIONAL TEMPLATE DEMO'));
    }
    assert.equal(names.size,37);
    assert.equal(headlines.size,37);
  }
});
test("AWE Express uses the relocated homepage gallery, keeps real responsive previews and tier-scoped selection",async()=>{
  const [js,css,html,gallery,home]=await Promise.all([read("app/order.mjs"),read("showcase.css"),read("order.html"),read("showcase.js"),read("index.html")]);
  assert(js.includes('mountExpressGallery(el.querySelector("#express-showcase")'));
  assert(js.includes('items:offered,initial:active.id'));
  assert(js.includes('onSelect:id=>{if(offered.some(t=>t.id===id))setTemplate(id);'));
  assert(gallery.includes('export function mountExpressGallery'));
  assert(gallery.includes('frame.style.width="1280px"'));
  assert(gallery.includes('frame.srcdoc=html'));
  assert(gallery.includes('async function choose(id,notify=false)'));
  assert(css.includes('.worlds-screen.is-mobile .worlds-view iframe'));
  assert(html.includes('/showcase.css'));
  assert(html.includes('/app/express-gallery.css'));
  assert(!js.includes('THE LIVE TEMPLATE THEATER'));
  assert(!home.includes('id="express-showcase"'));
});
test("Layout changes address the actual chapter markup rather than only dead card selectors",async()=>{
  const [layout,exemplar]=await Promise.all([read("shared/full-page-layouts.mjs"),read("shared/exemplar-redesign.mjs")]);
  assert(exemplar.includes('.folio .editorial-spreads .case-spread'));
  assert(exemplar.includes('.signal .poster-wall .case-poster'));
  assert(exemplar.includes('.ledger .business-briefs .case-report'));
  assert(layout.includes('class="report-media"'));
});


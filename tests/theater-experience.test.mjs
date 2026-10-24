import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,types,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
test("All 20 demos have distinct fictional identities in every purpose",()=>{
  for(const purpose of types){
    const names=new Set(),headlines=new Set();
    for(const t of templates){
      const sample=sampleForTemplate(t.id,purpose);
      assert.equal(sample.type,purpose);
      assert(!names.has(sample.content.name),t.id+" repeated a public identity");
      assert(!headlines.has(sample.content.headline),t.id+" repeated a hero statement");
      names.add(sample.content.name);
      headlines.add(sample.content.headline);
      assert(renderSite(sample,{sample:true}).includes('FICTIONAL TEMPLATE DEMO'));
    }
    assert.equal(names.size,26);
    assert.equal(headlines.size,26);
  }
});
test("Gallery theater maintains accurate device rendering and in-place template switching",async()=>{
  const [js,css,html]=await Promise.all([read("app/order.mjs"),read("app/theater-reimagined.css"),read("order.html")]);
  assert(js.includes('frame.style.width="1280px"'));
  assert(js.includes('frame.style.transform="scale("+scale+")"'));
  assert(js.includes('frame.srcdoc=html'));
  assert(js.includes('theater.dataset.active=id'));
  assert(js.includes('loadTemplate(id)'));
  assert(js.includes('window.addEventListener("resize",syncFrameSize'));
  assert(css.includes('.experience-theater.is-mobile .theater-canvas iframe'));
  assert(html.includes('/app/theater-reimagined.css'));
});
test("Layout changes address the actual chapter markup rather than only dead card selectors",async()=>{
  const [layout,exemplar]=await Promise.all([read("shared/full-page-layouts.mjs"),read("shared/exemplar-redesign.mjs")]);
  assert(exemplar.includes('.folio .editorial-spreads .case-spread'));
  assert(exemplar.includes('.signal .poster-wall .case-poster'));
  assert(exemplar.includes('.ledger .business-briefs .case-report'));
  assert(layout.includes('class="report-media"'));
});


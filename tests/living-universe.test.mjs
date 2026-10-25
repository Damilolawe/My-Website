import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read = path => readFile(new URL("../"+path, import.meta.url),"utf8");
const choices=[
  ["runwayml","CINEMATIC","starter"],
  ["liquidmetal","LIQUID METAL","starter"],
  ["clay","SCULPT","starter"],
  ["nike","ATHLETIC","starter"],
];

test("the hero includes four different authentic AWE Express sites",async()=>{
  const [home,universe]=await Promise.all([read("index.html"),read("universe.js")]);
  assert(home.includes('id="awe-universe"'));
  assert(home.includes('id="universe-dialog"'));
  assert(home.includes('id="universe-live-frame"'));
  assert(home.includes('id="universe-field"'));
  assert(home.includes('href="/order.html">AWE EXPRESS'));
  const {templateFitsTier}=await import("../shared/tiers.mjs");
  for(const [id,label,tier] of choices){
    assert.equal(templateFitsTier(id,tier),true,`${id} hero CTA tier must match order gallery eligibility`);
    assert(home.includes('data-template="'+id+'"'),id+" is present");
    assert(home.includes('data-open-universe="'+id+'"'));
    assert(home.includes(label));
    assert(universe.includes('["'+id+'",{name:"'+label+'",tier:"'+tier+'"}]'));
  }
  assert.equal((home.match(/class="universe-card universe-card--/g)||[]).length,4);
});
test("previews stay script-disabled, sandboxed and same origin",async()=>{
  const [home,source,config]=await Promise.all([
    read("index.html"),read("universe.js"),read("firebase.json")
  ]);
  assert.match(home,/id="universe-live-frame"[^>]+sandbox=""/);
  assert(!/<iframe[^>]+src="\/templates\//.test(home));
  assert(source.includes('fetchPublicTemplate(id'));
  assert(source.includes('target.srcdoc=html'));
  assert(source.includes('allowed.has(id)'));
  assert(!source.includes('target.src ='));
  const headers=JSON.parse(config).hosting.headers[0].headers;
  assert(headers.some(h=>h.key==="X-Frame-Options"&&h.value==="DENY"));
  assert(headers.some(h=>h.key==="Content-Security-Policy"&&h.value.includes("frame-ancestors 'none'")));
});
test("hero interactions offer accessible modal, mobile swiping and motion preferences",async()=>{
  const [source,css]=await Promise.all([read("universe.js"),read("universe.css")]);
  for(const required of ['dialog.showModal()','dialog.addEventListener("cancel"','activeCard?.querySelector(".universe-open")','setDevice("desktop")','(prefers-reduced-motion: reduce)','IntersectionObserver','ResizeObserver']){
    assert(source.includes(required)||css.includes(required),required);
  }
  assert(css.includes("scroll-snap-type:x mandatory"));
  assert(css.includes("@media(max-width:960px)"));
  assert(css.includes("body.universe-dialog-open"));
  assert(css.includes(".universe-open:focus-visible"));
  const build=await read("scripts/build.mjs");
  assert(build.includes('"universe.js"'));
  assert(build.includes('"universe.css"'));
  const order=await read("app/order.mjs");
  assert(order.includes('requestedTemplate'));
  assert(order.includes('templatesForTier(selectedTier).some'));
  assert(order.includes('setTemplate(requestedTemplate)'));
});

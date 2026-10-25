import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {fetchPublicTemplate,previewMessage,TEMPLATE_IDS} from "../shared/preview.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";

test("relocated Express gallery previews remain sandboxed srcdoc with strict anti-framing protections",async()=>{
 const [headers,homepage,showcase,order,orderPage]=await Promise.all(["_headers","index.html","showcase.js","app/order.mjs","order.html"].map(x=>readFile(x,"utf8")));
 assert(headers.includes("X-Frame-Options: DENY"));
 assert(headers.includes("frame-ancestors 'none'"));
 assert(!homepage.includes('type="module" src="showcase.js"'));
 assert(!homepage.includes('id="worlds-frame"'));
 assert(orderPage.includes('src="/app/order.mjs"'));
 assert(order.includes('id="worlds-frame"'));
 assert(order.includes('sandbox=""'));
 assert(!/<iframe[^>]+id="worlds-frame"[^>]+src=/.test(order));
 assert(showcase.includes("frame.srcdoc=html"));
 assert(showcase.includes("export function mountExpressGallery"));
 assert(!showcase.includes('frame.src="/templates/"'));
});
test("preview fetch only allows six public demo paths, not customer drafts",async()=>{
  assert.equal(TEMPLATE_IDS.length,42);
  const original=globalThis.fetch;
  const sample=renderSite(sampleForTemplate("folio"),{sample:true});
  try{
    globalThis.fetch=async (url,opts)=>{
      assert.equal(url,"/templates/folio.html");
      assert.equal(opts.mode,"same-origin");
      assert.equal(opts.credentials,"same-origin");
      return new Response(sample,{headers:{"Content-Type":"text/html; charset=utf-8"}});
    };
    assert.equal(await fetchPublicTemplate("folio"),sample);
    await assert.rejects(fetchPublicTemplate("../../admin"),/Unknown template/);
    await assert.rejects(fetchPublicTemplate("https://example.com"),/Unknown template/);
  }finally{globalThis.fetch=original;}
});
test("preview rejects errors and unrecognized HTML rather than embedding arbitrary responses",async()=>{
  const original=globalThis.fetch;
  try{
    globalThis.fetch=async()=>new Response("<!doctype html><h1>Not a demo</h1>",{headers:{"Content-Type":"text/html"}});
    await assert.rejects(fetchPublicTemplate("index"),/valid public sample/);
    globalThis.fetch=async()=>new Response("Missing",{status:404,headers:{"Content-Type":"text/html"}});
    await assert.rejects(fetchPublicTemplate("index"),/HTTP 404/);
    globalThis.fetch=async()=>new Response("{}".trim(),{headers:{"Content-Type":"application/json"}});
    await assert.rejects(fetchPublicTemplate("index"),/unexpected document type/);
  }finally{globalThis.fetch=original;}
  assert(previewMessage("<danger>").includes("&lt;danger&gt;"));
});


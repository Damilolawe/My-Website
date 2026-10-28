import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {verifyPublication} from "../platform/verify-publication.mjs";

const origin="https://aweconcepts.com/sites/sample-site";
const publicApiUrl="https://api.example.test/public/sample-site";
const version="11111111-2222-4333-8444-555555555555";
const pages=["research.html","work.html","studio.html","journal.html"];
const doc=page=>'<!doctype html><html><head><meta name="awe-approved-version" content="'+version+'"></head><body><h1>'+page+'</h1></body></html>';

test("five-page fulfillment requires every static HTML document, not merely a working homepage",async()=>{
  const requests=[];
  const fetcher=async(url)=>{
    requests.push(url);
    if(url===origin)return new Response(doc("Home"),{status:200,headers:{"content-type":"text/html"}});
    if(url===publicApiUrl)return Response.json({version});
    if(pages.some(name=>url===origin+"/"+name))return new Response(doc(url.slice(origin.length+1)),{status:200});
    throw Error("Unexpected fetch "+url);
  };
  const ok=await verifyPublication({siteUrl:origin,publicApiUrl,version,requiredPages:pages,fetcher});
  assert.equal(ok.mode,"static");
  for(const p of pages)assert(requests.includes(origin+"/"+p));
  await assert.rejects(
    ()=>verifyPublication({siteUrl:origin,publicApiUrl,version,requiredPages:pages,
      fetcher:async(url)=>url===origin+"/journal.html"?new Response("not found",{status:404}):fetcher(url)}),
    /awaiting deployment/
  );
  await assert.rejects(
    ()=>verifyPublication({siteUrl:origin,publicApiUrl,version,requiredPages:pages,
      fetcher:async(url)=>url===origin+"/work.html"?new Response(doc("Work").replace("awe-approved-version","unapproved-version")):fetcher(url)}),
    /verification failed/
  );
});

test("owner UI reviews private multi-page versions and commercial checkout never uses a one-page template",async()=>{
  const [owner,client,api,worker,tiers]=await Promise.all([
    readFile(new URL("../app/admin.mjs",import.meta.url),"utf8"),
    readFile(new URL("../app/order.mjs",import.meta.url),"utf8"),
    readFile(new URL("../supabase/functions/awe-api/netlify/functions/api.mjs",import.meta.url),"utf8"),
    readFile(new URL("../supabase/functions/awe-api/platform/production.mjs",import.meta.url),"utf8"),
    readFile(new URL("../supabase/functions/awe-api/shared/tiers.mjs",import.meta.url),"utf8")
  ]);
  assert(owner.includes("data-preview-page"),"Owner can inspect each page before approval");
  assert(api.includes("renderApprovedDesignPages(v.input)[requestedPage]"));
  assert(worker.includes('requiredPages: o.package_snapshot?.delivery === "awe-multipage"'));
  assert(client.includes("packageAllowsTemplate(p, input.template)"));
  assert(tiers.includes('pkg.pageCount === 5 && pages === 5'));
});


test("Starter shows only single-page templates, Signature only five-page designs, Premium routes to AWE Custom",async()=>{
 const {templateFitsTier,packageAllowsTemplate,templatePageCount}=await import("../shared/tiers.mjs");
 const {templates}=await import("../shared/model.mjs");
 const pages=templates.map(t=>({id:t.id,count:templatePageCount(t.id)}));
 assert.equal(pages.length,116);
 assert.equal(pages.filter(x=>x.count===1).length,78);
 assert.equal(pages.filter(x=>x.count===5).length,38);
 for(const t of pages){
  assert.equal(templateFitsTier(t.id,"starter"),t.count===1,t.id);
  assert.equal(templateFitsTier(t.id,"signature"),t.count===5,t.id);
  assert.equal(templateFitsTier(t.id,"premium"),false,t.id);
 }
 const starter={tier:"starter",delivery:"awe-hosted",pageCount:1};
 const signature={tier:"signature",delivery:"awe-multipage",pageCount:5};
 for(const t of pages){
  assert.equal(packageAllowsTemplate(starter,t.id),t.count===1,t.id);
  assert.equal(packageAllowsTemplate(signature,t.id),t.count===5,t.id);
 }
 const [client,account,home]=await Promise.all(["app/order.mjs","app/account.mjs","index.html"].map(p=>readFile(new URL("../"+p,import.meta.url),"utf8")));
 assert(client.includes('const templatesForTier=tier=>galleryTemplates.filter(t=>templateFitsTier(t.id,tier))'));
 assert(client.includes('window.location.assign(AWE_CUSTOM_URL)'));
 assert(client.includes('AWE_CUSTOM_URL="/account.html?custom=1"'));
 assert(account.includes('get("custom")==="1"'));
 assert(home.includes('/order.html?tier=starter'));
 assert(home.includes('/order.html?tier=signature'));
});

for(const [name,path] of [["legacy","../platform/verify-publication.mjs"],["edge","../supabase/functions/awe-api/platform/verify-publication.mjs"]]) {
 test(`${name}: direct five-page delivery verifies every version header and rejects contradictory static markers`,async()=>{
  const {verifyPublication:verify}=await import(path);
  let stalePage=false,unsafePage=false;
  const fetcher=async url=>{
   const subpage=pages.some(p=>url===origin+"/"+p);
   assert(url===origin||subpage,url);
   const body='<!doctype html><html><head></head><body><h1>Approved page</h1></body></html>';
   return new Response(stalePage&&subpage?doc("Stale header with current marker"):unsafePage&&subpage?body.replace('</body>','<script>alert(1)</script></body>'):body,{headers:{'x-awe-version':stalePage&&subpage?'11111111-2222-4333-8444-555555555556':version}});
  };
  assert.equal((await verify({siteUrl:origin,publicApiUrl,version,requiredPages:pages,fetcher})).mode,'direct');
  stalePage=true;
  await assert.rejects(verify({siteUrl:origin,publicApiUrl,version,requiredPages:pages,fetcher}),/verification failed/);
  stalePage=false;unsafePage=true;
  await assert.rejects(verify({siteUrl:origin,publicApiUrl,version,requiredPages:pages,fetcher}),/verification failed/);
 });
}

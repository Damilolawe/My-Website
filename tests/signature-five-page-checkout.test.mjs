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
  assert(tiers.includes('templateId === "runwaymulti"'));
});

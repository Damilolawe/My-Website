import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { verifyPublication } from "../platform/verify-publication.mjs";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const SITE = "https://awe-digital.web.app/sites/project-example";
const API = "https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api/public/project-example";
const VERSION = "11111111-2222-4333-8444-555555555555";
const ASSET = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

test("Firebase serves an approved-site viewer without deploying private API functions", async () => {
  const cfg = JSON.parse(await read("firebase.json"));
  assert.deepEqual(cfg.hosting.rewrites, [{source:"/sites/**",destination:"/site-viewer.html"}]);
  assert.equal(cfg.hosting.public, "dist");
  assert(!JSON.stringify(cfg.hosting.rewrites).includes("/api"));
  const csp = cfg.hosting.headers[0].headers.find(x=>x.key==="Content-Security-Policy").value;
  assert(csp.includes("img-src 'self' data: blob: https://hxxplkirfsewqsxodngv.supabase.co"));
  assert(csp.includes("script-src 'self'"));
  const html = await read("dist/site-viewer.html");
  assert(html.includes('data-awe-public-viewer="v1"'));
  assert(html.includes('sandbox="allow-popups allow-popups-to-escape-sandbox"'));
  assert(!html.includes("allow-same-origin"));
  assert(!html.includes("allow-scripts"));
  assert((await stat(new URL("../dist/site-viewer.js",import.meta.url))).size > 500);
});

test("public client requests only approved content, never the owner draft API", async()=>{
  const js = await read("dist/site-viewer.js");
  assert(js.includes("awe-api/public/"));
  assert(js.includes('credentials: "omit"'));
  assert(js.includes('cache: "no-store"'));
  assert(js.includes("frame.srcdoc = data.html"));
  assert(js.includes("if (!response.ok) return unavailable()"));
  assert(!js.includes("orders/preview"));
  assert(!js.includes("awe-api/drafts"));
  assert(js.includes('data.version'));
});

test("legacy direct HTML publication remains verifiable for existing server tests", async()=>{
  let count = 0;
  const fetcher = async(url,opts) => {
    count++;
    if(url===SITE) return new Response("<!doctype html><h1>Approved</h1>",{headers:{"X-AWE-Version":VERSION}});
    if(url===SITE+"/assets/"+ASSET) {
      assert.equal(opts.method,"HEAD");
      return new Response(null,{status:200});
    }
    throw Error("Unexpected request: "+url);
  };
  assert.deepEqual(await verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,assets:[ASSET],fetcher}),{url:SITE,version:VERSION,mode:"direct"});
  assert.equal(count,2);
});

test("Firebase Spark viewer verifies its exact approved version and public assets", async()=>{
  const seen=[];
  const fetcher = async(url,opts) => {
    seen.push([url,opts.method]);
    if(url===SITE) return new Response('<body data-awe-public-viewer="v1"></body>');
    if(url===API) return Response.json({version:VERSION,html:"<!doctype html><html><body>Approved</body></html>"});
    if(url===API+"/assets/"+ASSET) return new Response(null,{status:200,headers:{"X-AWE-Version":VERSION}});
    throw Error("Unexpected url "+url);
  };
  const result=await verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,assets:[ASSET],fetcher});
  assert.equal(result.version,VERSION);
  assert.deepEqual(seen.map(x=>x[0]),[SITE,API,API+"/assets/"+ASSET]);
});

test("unauthorized or stale publication cannot pass the delivery gate", async()=>{
  const badVersion=async url=>url===SITE?new Response('<body data-awe-public-viewer="v1"></body>'):Response.json({version:"stale",html:"<!doctype html><html></html>"});
  await assert.rejects(()=>verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,fetcher:badVersion}),/version/i);
  const nonexistent=async()=>new Response("Not found",{status:404});
  await assert.rejects(()=>verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,fetcher:nonexistent}),/reachable/i);
  const unapproved=async url=>url===SITE?new Response('<body data-awe-public-viewer="v1"></body>'):new Response("Not found",{status:404});
  await assert.rejects(()=>verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,fetcher:unapproved}),/not publicly approved/i);
});

test("API public endpoint remains approval gated and delivers only selected assets",async()=>{
 const router = await read("supabase/functions/awe-api/platform/edge-router.mjs");
 const site = await read("supabase/functions/awe-api/netlify/functions/site.mjs");
 assert(router.includes("if(path.startsWith('public/'))"));
 assert(site.includes("public_version=not.is.null"));
 assert(site.includes('"awe_approvals"'));
 assert(site.includes("v.asset_ids.includes(aid)"));
 assert(site.includes("public_allowed=eq.true"));
 const production = await read("supabase/functions/awe-api/platform/production.mjs");
 assert(production.includes("verifyPublication({"));
 assert(production.includes("awe-api/public/"));
});

test("standalone static customer website verifies local images and current approval",async()=>{
 const html='<!doctype html><html><head><meta name="awe-approved-version" content="'+VERSION+'"></head><body><h1>Ready</h1><img src="assets/'+ASSET+'.png"></body></html>';
 const seen=[];
 const fetcher=async(url,opts)=>{
   seen.push([url,opts.method]);
   if(url===SITE)return new Response(html);
   if(url===SITE+"/assets/"+ASSET+".png")return new Response(null,{status:200});
   if(url===API)return Response.json({version:VERSION,html});
   throw Error("Unexpected resource "+url);
 };
 const result=await verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,assets:[ASSET],fetcher});
 assert.deepEqual(result,{url:SITE,version:VERSION,mode:"static"});
 assert.deepEqual(seen.map(x=>x[0]),[SITE,SITE+"/assets/"+ASSET+".png",API]);
});
test("unapproved or stale static HTML can never pass version verification",async()=>{
 const old='<html><head><meta name="awe-approved-version" content="00000000-0000-4000-8000-000000000000"></head><body><h1>Stale</h1></body></html>';
 const fetcher=async()=>new Response(old);
 await assert.rejects(()=>verifyPublication({siteUrl:SITE,publicApiUrl:API,version:VERSION,fetcher}),/approved viewer or static page/);
});

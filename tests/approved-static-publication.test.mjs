import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { approvedSiteManifest } from "../supabase/functions/awe-api/platform/public-manifest.mjs";
import { materializeApprovedSites, DEFAULT_API } from "../scripts/materialize-approved-sites.mjs";

const OID="11111111-2222-4333-8444-555555555555";
const VID="99999999-aaaa-4bbb-8ccc-dddddddddddd";
const IMG="abababab-bbbb-4ccc-8ddd-eeeeeeeeeeee";
const slug="studio-portfolio-11223344";
const site={slug,version:VID,assets:[IMG]};
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>My portfolio</title></head><body><h1>My portfolio</h1><img src="'+DEFAULT_API+'/'+slug+'/assets/'+IMG+'" alt="Portfolio image"></body></html>';
const fakeSource = (approved=true, assetMime="image/png") => {
 const requests=[];
 const fetcher=async (url,options={})=>{
   requests.push(url);
   assert.equal(options.credentials,"omit");
   if(url===DEFAULT_API+"/manifest")return Response.json({sites:approved?[site]:[]});
   if(url===DEFAULT_API+"/"+slug)return Response.json({html,version:VID});
   if(url===DEFAULT_API+"/"+slug+"/assets/"+IMG)return new Response(new Uint8Array([137,80,78,71]),{headers:{"content-type":assetMime}});
   throw Error("Unexpected public URL "+url);
 };
 return {fetcher,requests};
};
async function scratch(fn) {
 const dir=await mkdtemp(path.join(tmpdir(),"awe-static-"));
 try{return await fn(dir);}finally{await rm(dir,{recursive:true,force:true});}
}
test("Manifest includes only actively published versions with matching owner approvals",async()=>{
 const touched=[];
 const lookup=async(table,query)=>{
   touched.push([table,query]);
   if(table==="awe_orders")return [{id:OID,slug,public_version:VID}];
   if(table==="awe_approvals")return [{version_id:VID}];
   if(table==="awe_versions")return [{id:VID,asset_ids:[IMG]}];
   throw Error("Unexpected table");
 };
 assert.deepEqual(await approvedSiteManifest(lookup),{sites:[site]});
 assert(touched.some(([table,q])=>table==="awe_orders"&&q.includes("public_version=not.is.null")));
 assert(touched.some(([table,q])=>table==="awe_approvals"&&q.includes("version_id=eq."+VID)));
 assert(!touched.some(([table])=>table==="awe_assets"),"Private asset metadata must not leak");
 const denied=async table=>table==="awe_orders"?[{id:OID,slug,public_version:VID}]:[];
 assert.deepEqual(await approvedSiteManifest(denied),{sites:[]});
});
test("GitHub build creates full standalone HTML and real local images, not an iframe",async()=>{
 await scratch(async dir=>{
   const {fetcher,requests}=fakeSource();
   const summary=await materializeApprovedSites({outDir:dir,fetcher});
   assert.deepEqual(summary.sites,[slug]);
   const page=await readFile(path.join(dir,"sites",slug,"index.html"),"utf8");
   assert.match(page,/<h1>My portfolio<\/h1>/);
   assert(page.includes('src="assets/'+IMG+'.png"'));
   assert(page.includes('<meta name="awe-approved-version" content="'+VID+'">'));
   assert(page.includes('<link rel="canonical" href="https://awe-digital.web.app/sites/'+slug+'/">'));
   assert(!page.includes("<iframe"));
   assert(!page.includes(DEFAULT_API));
   const photo=await readFile(path.join(dir,"sites",slug,"assets",IMG+".png"));
   assert.deepEqual([...photo],[137,80,78,71]);
   const sitemap=await readFile(path.join(dir,"sitemap.xml"),"utf8");
   assert(sitemap.includes("https://awe-digital.web.app/sites/"+slug+"/"));
   assert(sitemap.includes("https://awe-digital.web.app/order.html"));
   assert((await readFile(path.join(dir,"robots.txt"),"utf8")).includes("Sitemap:"));
   assert.deepEqual(requests,[
     DEFAULT_API+"/manifest",
     DEFAULT_API+"/"+slug,
     DEFAULT_API+"/"+slug+"/assets/"+IMG
   ]);
 });
});
test("No approved published sites creates no customer pages or private previews",async()=>{
 await scratch(async dir=>{
   const {fetcher,requests}=fakeSource(false);
   assert.equal((await materializeApprovedSites({outDir:dir,fetcher})).published,0);
   assert.equal(requests.length,1);
   await stat(path.join(dir,"sites"));
   const sitemap=await readFile(path.join(dir,"sitemap.xml"),"utf8");
   assert(!sitemap.includes("/sites/"));
 });
});
test("Wrong public version and dangerous HTML abort release without deleting prior files",async()=>{
 await scratch(async dir=>{
   const {fetcher}=fakeSource();
   await materializeApprovedSites({outDir:dir,fetcher});
   const siteDir=path.join(dir,"sites",slug,"index.html");
   const before=await readFile(siteDir,"utf8");
   const wrong=async (url,opts)=>{
     if(url===DEFAULT_API+"/"+slug)return Response.json({html,version:OID});
     return fetcher(url,opts);
   };
   await assert.rejects(()=>materializeApprovedSites({outDir:dir,fetcher:wrong}),/version changed/);
   assert.equal(await readFile(siteDir,"utf8"),before);
   const scriptInjection=async (url,opts)=>{
     if(url===DEFAULT_API+"/"+slug)return Response.json({html:html.replace("</body>","<script>alert(1)</script></body>"),version:VID});
     return fetcher(url,opts);
   };
   await assert.rejects(()=>materializeApprovedSites({outDir:dir,fetcher:scriptInjection}),/executable HTML/);
   assert.equal(await readFile(siteDir,"utf8"),before);
 });
});
test("Unapproved assets or unexpected MIME cannot be served as a static website",async()=>{
 await scratch(async dir=>{
   const {fetcher}=fakeSource(true,"application/octet-stream");
   await assert.rejects(()=>materializeApprovedSites({outDir:dir,fetcher}),/unapproved image type/);
   const noImage=async(url,opts)=>url.endsWith("/assets/"+IMG)?
     new Response("Not found",{status:404}):fetcher(url,opts);
   await assert.rejects(()=>materializeApprovedSites({outDir:dir,fetcher:noImage}),/public endpoint unavailable/);
 });
});
test("Reject malicious slugs, duplicate pages and unexpected production origin",async()=>{
 await scratch(async dir=>{
   const {fetcher}=fakeSource();
   const invalid=async(url,opts)=>url.endsWith("/manifest")?
     Response.json({sites:[{...site,slug:"../admin"}]}):fetcher(url,opts);
   await assert.rejects(()=>materializeApprovedSites({outDir:dir,fetcher:invalid}),/invalid approved site entry/);
   const duplicates=async(url,opts)=>url.endsWith("/manifest")?
     Response.json({sites:[site,site]}):fetcher(url,opts);
   await assert.rejects(()=>materializeApprovedSites({outDir:dir,fetcher:duplicates}),/duplicate customer slug/);
   await assert.rejects(()=>materializeApprovedSites({
     outDir:dir,fetcher,siteOrigin:"https://malicious.example"
   }),/unverified canonical origin/);
 });
});
test("Firebase priority keeps existing static pages ahead of the fallback viewer",async()=>{
 const cfg=JSON.parse(await readFile(new URL("../firebase.json",import.meta.url),"utf8"));
 assert.deepEqual(cfg.hosting.rewrites,[{source:"/sites/**",destination:"/site-viewer.html"}]);
 const workflow=await readFile(new URL("../.github/workflows/firebase-hosting.yml",import.meta.url),"utf8");
 assert(workflow.includes("node scripts/materialize-approved-sites.mjs"));
 // Automatic deploys are triggered by code pushes, and an owner can dispatch manually.
 // A recurring timer is not required for static Hosting publication.
 assert(workflow.includes("branches: [main]"));
 assert(workflow.includes("workflow_dispatch:"));
 assert(workflow.indexOf("node scripts/materialize-approved-sites.mjs") <
   workflow.indexOf("Deploy only static assets"));
 assert(workflow.includes("AWE_SITE_ORIGIN"));
 const api=await readFile(new URL("../supabase/functions/awe-api/platform/edge-router.mjs",import.meta.url),"utf8");
 assert(api.includes("approvedSiteManifest(rows)"));
 assert(api.indexOf("path==='public/manifest'")<api.indexOf("path.startsWith('public/')"));
});

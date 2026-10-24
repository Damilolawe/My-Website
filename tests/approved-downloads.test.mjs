import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createAweClient } from "../app/service-client.mjs";

const TOKEN={user:{email_confirmed_at:"2026-10-22T00:00:00Z"},
 access_token:"verified-access",refresh_token:"verified-refresh",expires_in:3600};
const UUID="11111111-2222-4333-8444-555555555555";
const reply=(body,status=200,headers={})=>new Response(body,{status,headers});
const newClient=(fetcher)=>{
 const memory=new Map();
 return createAweClient({getStorage:()=>({
   getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),
   removeItem:k=>memory.delete(k)
 }),fetcher,now:()=>1000});
};

test("authenticated customer ZIP download uses bearer JWT without cookies or /api/",async()=>{
 const calls=[];
 const client=newClient(async(url,options)=>{
   calls.push({url,options});
   if(url.endsWith("/auth/v1/verify"))
     return reply(JSON.stringify(TOKEN),200,{"Content-Type":"application/json"});
   return reply(new Uint8Array([80,75,3,4,0,1]),200,{
     "Content-Type":"application/zip",
     "Content-Disposition":'attachment; filename="customer-site.zip"',
     "Content-Length":"6"
   });
 });
 await client.verifyEmailCode("customer@example.test","123456");
 const result=await client.download("orders/"+UUID+"/export");
 assert.equal(result.filename,"customer-site.zip");
 assert.equal(result.mime,"application/zip");
 assert.equal(result.blob.size,6);
 assert.match(calls[1].url,/\/functions\/v1\/awe-api\/orders\/[^/]+\/export$/);
 assert(!calls[1].url.includes("/api/orders"));
 assert.equal(calls[1].options.headers.Authorization,"Bearer verified-access");
 assert.equal(calls[1].options.credentials,"omit");
 assert.equal(calls[1].options.method,"GET");
 assert.equal(calls[1].options.cache,"no-store");
});

test("owner can download approved ZIP and customer materials using protected Edge routes",async()=>{
 let requests=0;
 const client=newClient(async(url,opts)=>{
   if(url.endsWith("/auth/v1/verify"))
     return reply(JSON.stringify(TOKEN),200,{"Content-Type":"application/json"});
   requests++;
   assert.equal(opts.headers.Authorization,"Bearer verified-access");
   return url.endsWith("/export")?
     reply(new Uint8Array([80,75,3,4]),200,{"Content-Type":"application/zip"}):
     reply(new Uint8Array([255,216,255,217]),200,{"Content-Type":"image/jpeg"});
 });
 await client.verifyEmailCode("owner@example.test","123456");
 assert.equal((await client.download("admin/orders/"+UUID+"/export")).mime,"application/zip");
 assert.equal((await client.download("assets/"+UUID)).filename,UUID+".jpg");
 assert.equal(requests,2);
});

test("download does not expose unauthenticated or unexpected destinations",async()=>{
 let count=0;
 const client=newClient(async()=>{count++;return reply("anything")});
 await assert.rejects(client.download("orders/"+UUID+"/export"),/Sign in to download/);
 await assert.rejects(client.download("../admin"),/Invalid download route/);
 await assert.rejects(client.download("admin/overview"),/Invalid download route/);
 await assert.rejects(client.download("public/my-site"),/Invalid download route/);
 assert.equal(count,0);
});

test("download rejects backend errors, oversize files and unexpected file types",async()=>{
 const scenarios=[
  {response:reply(JSON.stringify({error:"Owner access required."}),403,{"Content-Type":"application/json"}),err:/Owner access required/},
  {response:reply("text",200,{"Content-Type":"text/html"}),err:/unexpected file type/},
  {response:reply(new Uint8Array([1]),200,{"Content-Type":"application/zip","Content-Length":"9000000"}),err:/too large/},
  {response:reply(new Uint8Array(),200,{"Content-Type":"application/zip"}),err:/empty or too large/}
 ];
 for(const {response,err} of scenarios){
   const client=newClient(async(url)=>
     url.endsWith("/auth/v1/verify")?
       reply(JSON.stringify(TOKEN),200,{"Content-Type":"application/json"}):response.clone());
   await client.verifyEmailCode("customer@example.test","123456");
   await assert.rejects(client.download("orders/"+UUID+"/export"),err);
 }
});

test("account and studio pages never navigate to legacy unauthenticated /api exports",async()=>{
 const account=await readFile(new URL("../app/account.mjs",import.meta.url),"utf8");
 const admin=await readFile(new URL("../app/admin.mjs",import.meta.url),"utf8");
 const helper=await readFile(new URL("../app/downloads.mjs",import.meta.url),"utf8");
 assert(account.includes("data-download-order"));
 assert(admin.includes("data-approved-download"));
 assert(admin.includes("data-asset-download"));
 assert(!account.includes('href="/api/orders/'));
 assert(!admin.includes('href="/api/admin/orders/'));
 assert(!admin.includes('href="/api/assets/'));
 assert(helper.includes("client.download(route)"));
 assert(helper.includes("URL.createObjectURL(blob)"));
 assert(helper.includes("URL.revokeObjectURL(objectUrl)"));
});

test("studio-approved ZIP export references actual JPEG/PNG/WebP asset extensions",async()=>{
 const legacy=await readFile(new URL("../platform/export.mjs",import.meta.url),"utf8");
 const edge=await readFile(new URL("../supabase/functions/awe-api/platform/export.mjs",import.meta.url),"utf8");
 assert.equal(legacy,edge);
 assert(edge.includes('["image/jpeg", "jpg"]'));
 assert(edge.includes('["image/png", "png"]'));
 assert(edge.includes('["image/webp", "webp"]'));
 assert(!edge.includes('assets/" + aid + ".webp"'));
 assert(edge.includes("html.includes('src=\"/api/assets/')"));
 assert(edge.includes("awe_approvals"));
 assert(edge.includes("o.public_version"));
 assert(edge.includes("public_allowed=eq.true"));
 assert(edge.includes("Awe Concepts website"));
});

import test from "node:test";
import assert from "node:assert/strict";
import {studyPageFromLink,fetchPublicStudyPage} from "../shared/preview.mjs";
import {zipPages} from "../shared/zip-design-catalog.mjs";

const origin="https://aweconcepts.com";

test("in-frame site navigation resolves only to its own five Signature chapters",()=>{
 for(const id of ["md-coinbase","md-supabase","md-airbnb","md-mintlify"]){
  for(const page of zipPages){
   assert.equal(studyPageFromLink(id,"/templates/"+id+"/"+page+".html",origin),page);
   assert.equal(studyPageFromLink(id,"/templates/"+id+"/"+page+".html#main",origin),page);
  }
 }
});

test("private, external, unknown and cross-template links cannot change preview chapters",()=>{
 const blocked=[
  "/admin.html","/account.html","/sites/private",
  "/templates/md-airbnb/work.html","/templates/md-coinbase/hacked.html",
  "/templates/md-coinbase/work.html?admin=1",
  "https://evil.example/templates/md-coinbase/work.html",
  "//evil.example/templates/md-coinbase/work.html",
  "javascript:alert(1)","#work","about:srcdoc#work",
  "./work.html","/templates/../../admin.html"
 ];
 for(const href of blocked){
  assert.equal(studyPageFromLink("md-coinbase",href,origin),null,href);
 }
 assert.equal(studyPageFromLink("md-kraken","/templates/md-kraken/work.html",origin),null);
 assert.equal(studyPageFromLink("not-real","/templates/not-real/home.html",origin),null);
});

test("Signature previews only fetch validated public static pages",async()=>{
 const original=globalThis.fetch;
 let requests=0;
 globalThis.fetch=async(path,options)=>{
  requests++;
  assert.equal(path,"/templates/md-coinbase/studio.html");
  assert.equal(options.credentials,"same-origin");
  return new Response('<!doctype html><html><body>FICTIONAL TEMPLATE DEMO Studio</body></html>',{headers:{"content-type":"text/html"}});
 };
 try{
  assert((await fetchPublicStudyPage("md-coinbase","studio")).includes("Studio"));
  await assert.rejects(fetchPublicStudyPage("md-coinbase","../admin"),/Unsupported study preview page/);
  await assert.rejects(fetchPublicStudyPage("md-kraken","work"),/Unsupported study preview page/);
  assert.equal(requests,1);
 }finally {globalThis.fetch=original;}
});

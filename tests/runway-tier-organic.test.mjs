import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {minimumTier,packageAllowsTemplate,templateFitsTier} from "../shared/tiers.mjs";
import {renderLegacySite as renderSite,renderSite as renderCurrentSite} from "../shared/render.mjs";
import {fetchPublicTemplate} from "../shared/preview.mjs";

test("RunwayML single and multi have separate Starter and Signature identities",()=>{
  assert.equal(templates.find(t=>t.id==="runwayml")?.name,"Cinematic");
  assert.equal(templates.find(t=>t.id==="runwaymulti")?.name,"Cinematic Pages");
  assert.equal(minimumTier("runwayml"),"starter");
  assert.equal(minimumTier("runwaymulti"),"signature");
  assert(templateFitsTier("runwayml","starter"));
  assert(!templateFitsTier("runwaymulti","starter"));
  assert(templateFitsTier("runwaymulti","signature"));
  assert.equal(packageAllowsTemplate({tier:"signature"},"runwaymulti"),false,
    "Do not charge customers for unavailable multi-page publishing");
  const fivePage = {tier:"signature",delivery:"awe-multipage",pageCount:5};
  assert.equal(packageAllowsTemplate(fivePage,"runwaymulti"),true);
  assert.equal(packageAllowsTemplate(fivePage,"folio"),false,"A five-page checkout must not produce a one-page site");
  assert.equal(packageAllowsTemplate({tier:"signature",delivery:"awe-multipage",pageCount:1},"runwaymulti"),false);
  assert.equal(packageAllowsTemplate({tier:"starter",delivery:"awe-hosted",pageCount:1},"runwaymulti"),false);
  assert.equal(packageAllowsTemplate({tier:"starter"},"runwayml"),true);
});
test("Signature multipage gallery points to all five documents; original remains unchanged",async()=>{
 const [original,multi]=await Promise.all([
   readFile("dist/templates/runwayml.html","utf8"),
   readFile("dist/templates/runwaymulti.html","utf8")
 ]);
 const expected=renderCurrentSite(sampleForTemplate("runwayml"),{sample:true});
 assert.equal(original,expected);
 // The catalog's five-page RunwayML preview links its own showpiece pages.
 for(const path of ["work.html","features.html","studio.html"])
   assert(multi.includes("/templates/runwaymulti/"+path),path);
 for(const page of ["home","work","features","studio","contact"])
   assert((await readFile("dist/templates/runwaymulti/"+page+".html","utf8")).includes('data-awe-engine="showpiece"'),page);
 for(const file of ["index.html","research.html","work.html","studio.html","journal.html"]){
   const html=await readFile("dist/experiments/runwayml-multipage/"+file,"utf8");
   assert(html.includes("rw-hero"));
   assert(html.includes('prefers-reduced-motion:reduce'));
   assert(!html.includes("<script"));
 }
});
test("Canonical template previews do not switch content or architecture by applicant/business purpose",async()=>{
 const original=globalThis.fetch;
 try{
   for(const type of ["Student résumé","Small business","Actor / model"]){
     globalThis.fetch=async(url)=>{
       assert.equal(url,"/templates/runwayml.html");
       return new Response(renderSite(sampleForTemplate("runwayml"),{sample:true}),{
         headers:{"content-type":"text/html"}
       });
     };
     const html=await fetchPublicTemplate("runwayml",{type});
     assert(html.includes("Everything begins with a vision."));
   }
 }finally{globalThis.fetch=original;}
});
test("Runway stock photography is featured in the experiment without blank placeholders",async()=>{
 const html=await readFile("dist/experiments/runwayml-multipage/work.html","utf8");
 const imgs=[...html.matchAll(/<img src="([^"]+)"/g)].map(m=>m[1]);
 assert(imgs.length>=4);
 assert(imgs.every(x=>x.startsWith("/assets/runway-stock/")||x.startsWith("https://images.unsplash.com/")));
 assert(!html.includes('class="rw-picture rw-empty'));
});

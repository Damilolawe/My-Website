import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Cinematic demo uses a licensed portrait source, with an elegant readable film masthead",async()=>{
 const [photo,style,edgePhoto,edgeStyle]=await Promise.all([
  read("shared/photographic-direction.mjs"),
  read("shared/collection-edition.mjs"),
  read("supabase/functions/awe-api/shared/photographic-direction.mjs"),
  read("supabase/functions/awe-api/shared/collection-edition.mjs")
 ]);
 assert.equal(photo,edgePhoto);assert.equal(style,edgeStyle);
 assert(photo.includes("photo-1759503076789-f35229bf5123"));
 assert(photo.includes("Rizky Sabriansyah"));
 assert(style.includes("body.afterhours .shell-afterhours"));
 assert(style.includes("body.afterhours .cinema-perforation{display:none}"));
 assert(style.includes("body.folio .folio-picture .hero-media::after{content:none!important}"));
 assert(style.includes("body.atelier .shell-atelier"));
});
test("Demo banner is subdued and is never added to customer HTML",async()=>{
 const style=await read("shared/collection-edition.mjs");
 assert(style.includes(".demo-banner"));
 assert(style.includes("background:#151914!important"));
 for(const id of ["folio","afterhours","atelier"]){
  const data=sampleForTemplate(id);
  assert(renderSite(data,{sample:true}).includes("FICTIONAL TEMPLATE DEMO"));
  assert(!renderSite(data).includes('class="demo-banner"'));
 }
});
test("Browser QA protects narrow-screen headers and first-fold layout",async()=>{
 const qa=await read("scripts/browser-qa.mjs");
 assert(qa.includes("Mobile After Hours: header consumes"));
 assert(qa.includes("Mobile Atelier: header is too tall"));
 assert(qa.includes("Mobile Folio: compact editorial masthead too tall"));
});

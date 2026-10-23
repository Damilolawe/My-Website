import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {sampleArtwork,illustrationArtwork} from "../shared/photographic-direction.mjs";

test("All twenty fictional template demos use a photography-forward composition",()=>{
 for(const t of templates){
  const html=renderSite(sampleForTemplate(t.id),{sample:true});
  assert(html.includes('study-shot--'+t.id),t.id+" missing photography");
  assert(html.includes("images.unsplash.com/photo-"),t.id+" missing photography source");
  assert(html.includes("FICTIONAL TEMPLATE DEMO"),t.id+" not labeled fictional");
  assert(html.includes("PHOTO STUDY / "),t.id+" missing image credit");
  assert(!html.includes("<script"),t.id+" includes executable script");
 }
});
test("Customer sites have no third party photo loading or stock imagery",()=>{
 for(const t of templates){
  const html=renderSite(sampleForTemplate(t.id));
  assert(!html.includes("images.unsplash.com"),t.id+" leaked sample photography");
  assert(!html.includes('<div class="study-shot '),t.id+" leaked sample elements");
  assert(html.includes('class="editorial-illustration editorial-illustration--'+t.id),t.id+" missing stand-alone branded artwork");
 }
});
test("Customer images replace all sample and illustrative hero media",()=>{
 const id="11111111-1111-4111-8111-111111111111";
 const demo=sampleForTemplate("afterhours");
 const html=renderSite({...demo,content:{...demo.content,photoIds:[id]}},{sample:true});
 assert(html.includes("/api/assets/"+id));
 assert(!html.includes('study-shot--hero'));
 assert(!html.includes('<div class="editorial-illustration editorial-illustration--afterhours'));
});
test("Static demo image sources are allowlisted and the production renderer matches",async()=>{
 const official=await readFile(new URL("../shared/photographic-direction.mjs",import.meta.url),"utf8");
 const server=await readFile(new URL("../supabase/functions/awe-api/shared/photographic-direction.mjs",import.meta.url),"utf8");
 assert.equal(official,server);
 assert(!official.includes("unsplash.com/plus"));
 for(const id of ["afterhours","folio","atelier"]) {
  assert(sampleArtwork(id).includes('study-shot--'+id));
  assert(illustrationArtwork(id).includes('editorial-illustration--'+id));
 }
 const headers=await readFile(new URL("../_headers",import.meta.url),"utf8");
 assert(headers.includes("img-src 'self' data: https://images.unsplash.com"));
});

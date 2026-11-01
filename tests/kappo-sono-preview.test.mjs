import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const root="preview/kappo-sono/";
const get=async file=>readFile(root+file,"utf8");
test("Kappo Sono proposal is self-contained five-page navigation and accessible viewer",async()=>{
 const pages=["index.html","menu.html","story.html","gallery.html","visit.html"];
 const contents=await Promise.all(pages.map(get));
 for(let i=0;i<pages.length;i++){
  const html=contents[i];
  for(const link of pages)assert.ok(html.includes('href="'+link+'"'),pages[i]+" missing "+link);
  assert.ok(html.includes('content="noindex,nofollow"'),pages[i]);
  assert.ok(html.includes('src="site.js"'),pages[i]);
  assert.ok(html.includes('href="styles.css"'),pages[i]);
  assert.ok(html.includes('https://www.kapposono.com/'),pages[i]);
 }
 const gallery=contents[3];
 assert.ok(gallery.includes('aria-modal="true"'));
 assert.ok(gallery.includes('data-gallery-filter="savory"'));
 assert.ok((gallery.match(/class="gallery-tile/g)||[]).length>=10);
});
test("Kappo Sono site labels historical menu and photography honestly",async()=>{
 const menu=await get("menu.html");
 assert.equal((menu.match(/class="course reveal"/g)||[]).length,13);
 assert.match(menu,/July 2024/);
 assert.match(menu,/not.*confirmed menu/);
 assert.match(menu,/luxuryexperience\.com/);
 for(const page of ["index.html","story.html","gallery.html","visit.html"]){
   const html=await get(page);
   assert.ok(html.includes("images.squarespace-cdn.com"),page+" should feature genuine restaurant imagery");
   assert.ok(!html.includes("images.unsplash.com"),page+" must not use generic stock");
 }
 const firebase=JSON.parse(await readFile("firebase.json","utf8"));
 const csp=firebase.hosting.headers.find(h=>h.source==="**").headers.find(h=>h.key==="Content-Security-Policy").value;
 assert.ok(csp.includes("https://images.squarespace-cdn.com"));
 assert.ok((await readFile("scripts/build.mjs","utf8")).includes('"preview"'));
});

test("Kappo Sono interface icons never fall back to iOS emoji",async()=>{
 const pages=["index.html","menu.html","story.html","gallery.html","visit.html"];
 for(const page of pages){
  const html=await get(page);
  assert.doesNotMatch(html,/[\u2196-\u2199\uFE0F]|\p{Emoji_Presentation}/u,page+" must not contain emoji-presented UI symbols");
  assert.doesNotMatch(html,/割烹\s+園/u,page+" must keep the Japanese wordmark unbroken");
  assert.ok(html.includes('class="icon-external"')||html.includes('class="arrow icon-external"'),page+" must use styled icons");
 }
 const css=await get("styles.css");
 assert.match(css,/\.icon-external::before/);
 assert.match(css,/\.icon-external::after/);
 const home=await get("index.html");
 for(const label of ["01 / ONE","02 / TWO","03 / THREE"])assert.ok(home.includes(label),"Missing clear numbered feature label: "+label);
 for(const old of ["一 — ONE","二 — TWO","三 — THREE"])assert.ok(!home.includes(old),"Remove ambiguous horizontal-stroke numerals");
});
test("all 13 archival course descriptions end with punctuation",async()=>{
 const html=await get("menu.html");
 const descriptions=[...html.matchAll(/<article class="course reveal">[\s\S]*?<div><p>([^<]+)<\/p><\/div><\/article>/g)].map(m=>m[1].trim());
 assert.equal(descriptions.length,13);
 descriptions.forEach((description,i)=>assert.match(description,/[.!?。]$/,"Course "+(i+1)+" is missing punctuation"));
});

test("Audit: booking disclosures prevent redirecting to a former venue without warning",async()=>{
 const pages=["index.html","menu.html","story.html","gallery.html","visit.html"];
 for(const page of pages){
  const h=await get(page);
  assert.match(h,/<a class="nav-cta" href="visit.html">Visit & reservations<\/a>/);
  assert.ok(!h.includes('>Reservations through Resy'));
  assert.match(h,/aria-label="Mobile navigation"/);
 }
 const visit=await get("visit.html");
 assert.match(visit,/former 39 East 13th Street location/);
 assert.match(visit,/Verify the new venue/);
 assert.match(visit,/role="note"/);
 assert.match(visit,/View existing Resy listing/);
});
test("Audit: gallery announces filter results, labels modal, and supports touch navigation",async()=>{
 const gallery=await get("gallery.html");
 const script=await get("site.js");
 assert.match(gallery,/class="gallery-count" role="status" aria-live="polite"/);
 assert.match(gallery,/aria-describedby="lightbox-caption"/);
 assert.match(script,/touchstart/);
 assert.match(script,/touchend/);
 assert.match(script,/const n=tiles.filter/);
});
test("Audit: all restaurant photographs support responsive image loading",async()=>{
 for(const page of ["index.html","menu.html","story.html","gallery.html"]){
  const html=await get(page);
  const images=[...html.matchAll(/<img\b[^>]*src="https:\/\/images\.squarespace-cdn\.com[^>]*>/g)];
  assert.ok(images.length>0,page+": no photos");
  for(const image of images){
   assert.match(image[0],/srcset="/,page+": image must have responsive source sizes");
   assert.match(image[0],/decoding="async"/,page+": image decode should not block paint");
  }
 }
});

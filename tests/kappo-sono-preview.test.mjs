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

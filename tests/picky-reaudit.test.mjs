import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {templates,sampleForTemplate} from "../shared/model.mjs";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
test("Twenty audience previews have distinctive fictional bio and selected work",()=>{
 const descriptions=new Set(),projects=new Set();
 for(const t of templates){
  const sample=sampleForTemplate(t.id,"Creative portfolio");
  descriptions.add(sample.content.bio);
  projects.add(sample.content.cards[0]?.title);
 }
 assert.equal(descriptions.size,20);
 assert.equal(projects.size,20);
});
test("Every fictional contact section explains that contact must be configured",()=>{
 for(const t of templates){
  const html=renderSite(sampleForTemplate(t.id,"Creative portfolio"),{sample:true});
  assert(html.includes("contact-setup-note"),t.id+" has no contact setup guidance");
  assert(html.includes("add your own email or contact link"),t.id+" is missing contact instructions");
  assert(!html.includes("mailto:undefined"),t.id);
 }
});
test("Published contact with a chosen email emits a usable mailto link",()=>{
 const sample=sampleForTemplate("afterhours","Actor / model");
 sample.content.publicEmail="artist@example.com";
 const html=renderSite(sample);
 assert(html.includes('href="mailto:artist@example.com"'));
 assert(!html.includes("Fictional portfolio demonstration"));
});
test("Mobile template gallery and order preview have branded loading and generous frames",async()=>{
 const [index,home,styles,order,app]=await Promise.all(["index.html","showcase.js","showcase.css","app/order.mjs","app/app.css"].map(read));
 assert(index.includes('id="worlds-loading"'));
 assert(home.includes("frame.onload=()=>"));
 assert(home.includes('frame.style.height="1280px"'));
 assert(styles.includes("height:880px!important"));
 assert(styles.includes("#express-showcase .worlds-accent{display:none!important}"));
 assert(order.includes('class="theater-loading"'));
 assert(order.includes('frame.style.height="1280px"'));
 assert(app.includes("height:880px!important"));
});
test("Deep-section mobile CSS is mirrored in the backend renderer",async()=>{
 const [css,edge]=await Promise.all(["shared/collection-edition.mjs","supabase/functions/awe-api/shared/collection-edition.mjs"].map(read));
 assert.equal(css,edge);
 for(const text of ["@media(max-width:420px)","body.afterhours .afterhours-words h1","max-width:100%!important","body.afterhours .afterhours-screen::before"])
  assert(css.includes(text),text);
});
test("Business identity and colors are honestly presented without touching checkout",async()=>{
 const [order,app]=await Promise.all(["app/order.mjs","app/app.css"].map(read));
 assert(order.includes("Photo imagery itself stays the same"));
 assert(app.includes(".app-header{background:#0c1210"));
 assert(!order.includes("Your primary color updates the hero, main accents, and buttons."));
});
test("Production QA directly tests 320, 345, 360, 375 pixel mobile preview geometry",async()=>{
 const qa=await read("scripts/browser-qa.mjs");
 for(const marker of ["PICKY_AUDIT_MOBILE_TEMPLATE_GEOMETRY","PICKY_AUDIT_GALLERY","320,345,375","contact section has no action/explanation"])
  assert(qa.includes(marker),marker);
});

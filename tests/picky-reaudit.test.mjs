import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate,templates,types} from "../shared/model.mjs";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("No fictional template promises empty contact; a real configured email stays clickable",()=>{
 for(const purpose of types)for(const t of templates){
  const cfg=sampleForTemplate(t.id,purpose);
  const html=renderSite(cfg,{sample:true});
  assert(html.includes('id="contact"'),t.id+"/"+purpose+" missing contact");
  assert(html.includes('contact-setup-note'),t.id+"/"+purpose+" missing setup instruction");
  assert(!html.includes('href="mailto:hello@example.com"'),"Fake contact link leaked");
 }
 const input=sampleForTemplate("afterhours","Creative portfolio");
 input.content.publicEmail="hello@client-example.org";
 const html=renderSite(input);
 assert(html.includes("mailto:hello@client-example.org"));
 assert(!html.includes('<p class="contact-setup-note">'));
 assert(!html.includes('This website has not published a contact method yet.'));

});
test("Twenty architectures use distinct fictional work and biography, regardless of shared purpose",()=>{
 const rows=templates.map(t=>sampleForTemplate(t.id,"Creative portfolio").content);
 assert.equal(new Set(rows.map(x=>x.bio)).size,21);
 assert.equal(new Set(rows.map(x=>x.cards[0].title)).size,21);
 assert.equal(new Set(rows.map(x=>x.cards[1].title)).size,21);
});
test("Preview geometry and async transitions have explicit regression guards",async()=>{
 const [gallery,builder,galleryCss,builderCss,qa]=await Promise.all([
 "showcase.js","app/order.mjs","showcase.css","app/app.css","scripts/browser-qa.mjs"].map(read));
 assert(gallery.includes("loading.hidden=true"));
 assert(gallery.includes("1280px"));
 assert(galleryCss.includes("height:880px!important"));
 assert(builder.includes("frame.style.height=\"1280px\""));
 assert(builderCss.includes("theater-loading"));
 assert(qa.includes("AUDIT_THEATER_DESKTOP"));
 assert(qa.includes("NARROW_TEMPLATE"));
 assert(qa.includes("geometry.heading.right>width+1"),"Narrow-title assertion must catch even small 320px clipping");
});
test("Photo hero palette changes large surfaces and copy is accurate",async()=>{
 const [css,builder]=await Promise.all(["shared/collection-edition.mjs","app/order.mjs"].map(read));
 assert(css.includes("body.afterhours .afterhours-screen::before"));
 assert(css.includes("color-mix(in srgb,var(--accent) 32%"));
 assert(builder.includes("Photo imagery itself stays the same"));
});

test("320px After Hours final-edge type preserves cinematic words without clipping",async()=>{
 const css=await read("shared/collection-edition.mjs");
 assert(css.includes("320px final-edge typography"));
 assert(css.includes("font-size:35px!important;letter-spacing:-.045em!important"));
 assert.equal(css,await read("supabase/functions/awe-api/shared/collection-edition.mjs"));
});


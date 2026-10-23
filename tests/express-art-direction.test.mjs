import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {expressArtDirectionCSS} from "../shared/express-art-direction.mjs";

test("all twenty complete pages receive original, identity-specific interior art direction",()=>{
 assert.equal(templates.length,20);
 const contacts=new Set();
 for(const {id} of templates){
  const demo=sampleForTemplate(id);
  const html=renderSite({...demo,design:{...demo.design,sections:["about","work","services","contact"]},content:{...demo.content,bio:demo.content.bio||"Fictional biography.",services:demo.content.services?.length?demo.content.services:[{title:"Sample studio service",description:"Fictional service for layout demonstration.",url:""}]}},{sample:true});
  assert(html.includes('contact-'+id),id+" lacks contact composition");
  assert(html.includes('story-'+id),id+" lacks biography composition");
  assert(html.includes('services-'+id),id+" lacks services composition");
  assert(html.includes('chapter-edge'),id+" lacks original chapter markers");
  assert(expressArtDirectionCSS.includes("body."+id+" "),id+" lacks interior art direction");
  const match=html.match(/<div class="architect-contact contact-[^"]+"[^>]*>[\s\S]*?<p>(.*?)<\/p>/);
  assert(match,id+" contact text missing");
  contacts.add(match[1]);
  assert(html.includes("FICTIONAL TEMPLATE DEMO"));
  assert(!html.includes("<script"),"Public samples must stay script-free");
 }
 assert.equal(contacts.size,20,"Contact copy remains generic across templates");
});
test("production Edge renderer has same art direction CSS as local renderer",async()=>{
 const edge=await readFile(new URL("../supabase/functions/awe-api/shared/express-art-direction.mjs",import.meta.url),"utf8");
 const local=await readFile(new URL("../shared/express-art-direction.mjs",import.meta.url),"utf8");
 assert.equal(edge,local);
 for(const path of ["shared/premium.mjs","supabase/functions/awe-api/shared/premium.mjs"]){
  const text=await readFile(new URL("../"+path,import.meta.url),"utf8");
  assert(text.includes("collectionEditionCSS + expressArtDirectionCSS"));
 }
});
test("known October 23 audit repairs are scoped and reduced motion is supported",()=>{
 assert(expressArtDirectionCSS.includes("body.daylight .shell-daylight .daylight-tab{pointer-events:none!important"));
 assert(expressArtDirectionCSS.includes("body.signal .signal-tape{transform:none!important"));
 assert(expressArtDirectionCSS.includes("body.afterhours .afterhours-words h1"));
 assert(expressArtDirectionCSS.includes("@media(prefers-reduced-motion:reduce)"));
});
test("customer content stays escaped and customization tokens stay live",()=>{
 const customer={...sampleForTemplate("ledger"),content:{...sampleForTemplate("ledger").content,name:"CUSTOMER <NAME>",headline:"LONG TEST HEADLINE",
  bio:"<img src=x onerror=alert(9)>",services:[{title:"Client service",description:"Our actual offer",url:""}],
  publicEmail:"",links:[]},design:{primary:"#123456",secondary:"#fdd7a1",sections:["about","services","contact"]}};
 const html=renderSite(customer);
 assert(html.includes("CUSTOMER &lt;NAME&gt;"));
 assert(html.includes("&lt;img src=x onerror=alert(9)&gt;"));
 assert(!html.includes("<script"));
 assert(html.includes("--accent:#123456;--secondary:#fdd7a1"));
 assert(html.includes("Client service"));
 assert(!html.includes("href=\"mailto:"));
});

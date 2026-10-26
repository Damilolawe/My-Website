import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {zipDesigns,zipPages} from "../shared/zip-design-catalog.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";

test("all 74 study demos use different artwork for projects and avoid the duplicated approach gallery",()=>{
 assert.equal(zipDesigns.length,74);
 for(const template of zipDesigns){
  const v=sampleForTemplate(template.id);
  const html=renderSite(v,{sample:true});
  assert(html.includes('PROJECT 01 /'),template.id+" missing independent card artwork");
  assert(!html.includes('<h2>Made to be seen.</h2>'),template.id+" duplicated gallery title");
  assert(!html.includes('<h2>Artfully considered.</h2>'),template.id+" duplicated approach");
  if(!template.multipage){
   assert(html.includes('class="section study-approach"'),template.id+" missing differentiated editorial approach");
   assert.equal((html.match(/class="cards"/g)||[]).length,1,template.id+" repeats the same gallery");
  }
 }
});

test("Signature study chapters have distinct page identity, stable links and responsive CSS",()=>{
 for(const t of zipDesigns.filter(x=>x.multipage)){
  const v=sampleForTemplate(t.id);
  for(const page of zipPages){
   const html=renderZipDesign(v,{sample:true},page);
   assert(html.includes('class="site page-'+page+' '),t.id+" "+page+" page missing distinct layout");
   assert(html.includes('class="hero hero-variant'),t.id+" "+page+" missing hero");
   assert(html.includes('href="/templates/'+t.id+'/contact.html"'),t.id+" "+page+" contact link changed");
   assert(html.includes('.site.page-work .hero'),t.id+" "+page+" missing scoped secondary-page styles");
   assert(html.includes('prefers-reduced-motion:reduce'),t.id+" "+page+" lost motion accessibility");
  }
 }
});

test("QA repairs preserve native renderers and match Supabase server mirrors",async()=>{
 for(const name of ["zip-design-render.mjs","zip-guide-fidelity-more.mjs","voltagent-trio-styles.mjs","typography-guard.mjs"]){
  const [browser,edge]=await Promise.all([
   readFile(new URL("../shared/"+name,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+name,import.meta.url),"utf8")
  ]);
  assert.equal(browser,edge,name+" renderer drift");
 }
 const fieldnotes=renderSite(sampleForTemplate("md-mintlify"),{sample:true});
 assert(fieldnotes.includes("mintlify-window aside"),"Fieldnotes mock navigation fallback missing");
 assert(fieldnotes.includes("grid-template-columns:minmax(0,1fr)"),"Fieldnotes mobile stacking rule missing");
 const sculpt=renderSite(sampleForTemplate("clay"),{sample:true});
 assert(sculpt.includes(".clay-hero-copy{container-type:inline-size;min-width:0}"),"Sculpt fit rule missing");
 for(const id of ["afterhours","nocturne","botanicalpress"]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(html.includes("Secondary visual QA"),id+" scoped visual repair not in rendered output");
 }
 for(const id of ["liquidmetal","runwayml","runwaymulti","nike","ferrari"]){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  assert(!html.includes("Secondary visual QA"),id+" protected identity was changed");
 }
});

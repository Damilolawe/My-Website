import test from "node:test";
import assert from "node:assert/strict";
import { sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { renderZipDesign } from "../shared/zip-design-render.mjs";
import { readFile } from "node:fs/promises";

const parts=["home","work","features","studio","contact"];
const sample=()=>sampleForTemplate("md-bugatti");
const markup=(v,page,options={sample:true})=>{
 const html=renderZipDesign(v,options,page);
 const body=html.split('<main id="main">')[1]?.split("</main>")[0];
 assert(body,"Velocity "+page+" missing page body");
 return {html,body};
};

test("Velocity Home is a teaser, not an identical copy of the complete Work gallery",()=>{
 const home=markup(sample(),"home").body,work=markup(sample(),"work").body;
 assert(home.includes('class="fv-home-preview"'));
 assert(home.includes('fv-home-engineer'));
 assert(!home.includes('fv-model-story-'));
 assert(work.includes('fv-model-stories'));
 for(const id of [1,2,3])assert(work.includes('fv-model-story-'+id));
 assert(!work.includes('fv-home-preview'));
 assert(home.includes("PROJECT 01 /"));
 assert(work.includes("PROJECT 01 /"));
});

test("Engineering page uses authored annotated schematic and accessible native disclosures",()=>{
 const {body,html}=markup(sample(),"features");
 assert(body.includes('class="fv-chassis-map"'));
 assert(body.includes('role="img"'));
 for(const label of ["AERO FORM","CHASSIS","SUSPENSION"])assert(body.includes(label));
 assert(body.includes('<details class="fv-spec"'));
 assert(body.includes('NOT TO SCALE'));
 assert(!body.includes('class="guide-scene guide-bugatti"'));
 assert(!html.includes("<script"));
});

test("Demo inquiry is interactive but does not pretend to submit data",()=>{
 const demo=markup(sample(),"contact").body;
 assert(demo.includes('<details class="fv-demo-enquiry"'));
 assert(demo.includes("<select"));
 assert(demo.includes("does not collect or submit"));
 assert(!demo.includes("<form"));
 const v=sample();
 const client={...v,content:{...v.content,publicEmail:"hello@example.org"}};
 const html=markup(client,"contact",{sample:false}).body;
 assert(html.includes("mailto:hello@example.org"));
 assert(!html.includes('<details class="fv-demo-enquiry"'));
});

test("Five Velocity pages retain navigation, mobile legibility rules and client-safe imagery",async()=>{
 const v=sample(),ids=["11111111-1111-4111-8111-111111111111","22222222-2222-4222-8222-222222222222","33333333-3333-4333-8333-333333333333"];
 const client={...v,content:{...v.content,name:"Studio <Unsafe>",headline:"Title <markup>",photoIds:ids,publicEmail:"hello@example.org"}};
 for(const page of parts){
  const {body,html}=markup(client,page,{sample:false,assetBase:"/client-assets/"});
  assert(html.includes("Studio &lt;Unsafe&gt;"),page+" custom name");
  assert(!html.includes("images.unsplash.com"),page+" fictional remote imagery leaked");
  assert(!html.includes("<script"),page+" executable script added");
  assert(html.includes('href="/templates/md-bugatti/contact.html"'),page+" contact navigation");
  assert(html.includes("fv-header--"+(page==="home"?"hero":"solid")),page+" header contrast mode");
  assert(html.includes("@media(max-width:650px)"),page+" mobile CSS");
  assert(html.includes("prefers-reduced-motion:reduce"),page+" motion CSS");
  if(["home","work"].includes(page))assert(body.includes("/client-assets/"+ids[0])||body.includes("/client-assets/"+ids[1]),page+" customer media missing");
 }
 const frontend=await readFile(new URL("../shared/zip-flagship-velocity.mjs",import.meta.url),"utf8");
 const backend=await readFile(new URL("../supabase/functions/awe-api/shared/zip-flagship-velocity.mjs",import.meta.url),"utf8");
 assert.equal(frontend,backend,"Velocity frontend/backend renderer drift");
});

test("Velocity has usable desktop and mobile menus on every route",()=>{
 const site=sample();
 const routes=["home","work","features","studio","contact"];
 const labels=["Atelier","Models","Engineering","Design","Concierge"];
 for(const page of parts){
  const html=renderZipDesign(site,{sample:true},page);
  const desktop=html.match(/<nav class="fv-nav" aria-label="Desktop navigation">([\s\S]*?)<\/nav>/)?.[1];
  const mobile=html.match(/<nav class="fv-menu-panel" aria-label="Mobile navigation">([\s\S]*?)<\/nav>/)?.[1];
  assert(desktop&&mobile,page+" needs both navigations");
  for(const [i,route] of routes.entries()){
   const href="/templates/md-bugatti/"+route+".html";
   for(const [menu,markup] of [["desktop",desktop],["mobile",mobile]]){
    assert(markup.includes('href="'+href+'"'),page+" "+menu+" missing "+route);
    assert(markup.includes(">"+labels[i]+"</a>"),page+" "+menu+" missing "+labels[i]);
    assert.equal(markup.includes('href="'+href+'" aria-current="page"'),page===route,page+" "+menu+" wrong active link "+route);
   }
  }
  assert(html.includes('<details class="fv-mobile-menu"><summary>'),page+" missing native menu toggle");
  assert(html.includes('class="fv-menu-word fv-menu-word--open">Close'),page+" missing Close label");
  assert(html.includes('.fv-nav{display:flex;justify-content:center;flex-wrap:nowrap;white-space:nowrap'),page+" desktop links still wrap");
  assert(html.includes('.fv-menu-panel a{display:flex;align-items:center;min-height:48px'),page+" mobile tap target is too small");
  assert(html.includes('.fv-header-label,.fv-nav{display:none}.fv-brand'),page+" mobile desktop navigation still showing");
  assert(!html.includes('overflow-x:auto;overscroll-behavior-x:contain;white-space:nowrap'),page+" old scrolling navigation remains");
  assert(!html.includes("<script"),page+" introduced executable script");
  const approved=renderZipDesign(site,{sample:false,customerPages:true},page);
  assert(approved.includes('href="./index.html"'),page+" approved home route is missing");
  assert(approved.includes('href="./contact.html"'),page+" approved contact route is missing");
  assert(!approved.includes('/templates/md-bugatti/'),page+" approved routes need relative links");
 }
});

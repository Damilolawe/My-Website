import test from "node:test";
import assert from "node:assert/strict";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderApprovedDesignPages,allowedApprovedPageNames} from "../shared/approved-pages.mjs";
import {zipDesignFor} from "../shared/zip-design-catalog.mjs";

const changed=source=>({
 ...source,design:{...source.design,primary:"#03ff00",secondary:"#0308f7"}
});
const tokens=['--awe-primary:#03ff00','--awe-secondary:#0308f7',
 '--awe-on-primary:#101216','data-awe-customer-colors="v1"'];

test("Every enabled design family receives semantic brand colors across preview and matching CTA styles",async t=>{
 assert(templates.length>=100,"Unexpectedly small template collection");
 for(const theme of templates){
  await t.test(theme.id,()=>{
   const initial=sampleForTemplate(theme.id);
   assert(initial,"Missing sample "+theme.id);
   const original=renderSite(initial,{sample:true});
   assert(!original.includes("data-awe-customer-colors="),"Original, untouched template must be unchanged: "+theme.id);
   const branded=renderSite(changed(initial),{sample:true});
   for(const token of tokens)assert(branded.includes(token),theme.id+" missing "+token);
   assert(branded.includes("--awe-surface:"),theme.id+" missing chosen secondary surface color");
   assert(branded.includes("background-color:var(--awe-surface)!important"),theme.id+" missing major background recoloring");
   assert(branded.includes("background:var(--awe-primary)!important"),theme.id+" missing matching CTA recoloring");
   assert(branded.indexOf("data-awe-customer-colors") > branded.indexOf("<style"),
     theme.id+" color CSS must follow source styles");
   assert(branded.includes("<h1"),theme.id+" design content lost");
  });
 }
});

test("Signature customer deliverables reuse chosen colors across all five independent pages",()=>{
 for(const theme of templates.filter(x=>zipDesignFor(x.id)?.multipage).slice(0,3).concat(
   templates.filter(x=>x.id==="runwaymulti"))){
   const input=changed(sampleForTemplate(theme.id));
   const pages=renderApprovedDesignPages(input);
   assert.equal(Object.keys(pages).length,5,theme.id);
   for(const name of allowedApprovedPageNames(theme.id)){
     for(const token of tokens)assert(pages[name].includes(token),theme.id+"/"+name+" missing "+token);
   }
 }
});

test("Default source designs are not recolored, and invalid design colors cannot inject style content",()=>{
 const input=sampleForTemplate("clay");
 assert(!renderSite(input,{sample:true}).includes("data-awe-customer-colors"));
 const output=renderSite({...input,design:{...input.design,primary:"red;};body{display:none",secondary:"#0308f7"}},{sample:true});
 assert(!output.includes("red;};body{display:none"),"Unsafe CSS value must not be passed into published HTML");
});

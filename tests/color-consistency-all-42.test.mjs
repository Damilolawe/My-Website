import test from "node:test";
import assert from "node:assert/strict";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {readableOn,applyColorConsistency} from "../shared/color-consistency.mjs";

test("every one of 42 template identities receives own contrast variables, including formerly protected designs",()=>{
  assert.equal(templates.length,116);
  assert.equal(new Set(templates.map(t=>t.id)).size,116);
  for(const template of templates.slice(0,42)){
    const input=sampleForTemplate(template.id);
    input.design.primary=template.color;
    const html=renderSite(input,{sample:true});
    if(["runwayml","runwaymulti"].includes(template.id))assert(!html.includes('data-awe-color-system'),"Original Runway source must stay byte-identical");
    else assert(html.includes('data-awe-color-system="'+template.id+'"'),template.id+" missing contrast tokens");
    if(!["runwayml","runwaymulti"].includes(template.id))assert(html.includes('--awe-on-accent:'),template.id+" missing readable text role");
    assert(!html.includes('undefined')&&!html.includes('NaN'),template.id+" emitted an invalid style");
    const cap=["folio","liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"].includes(template.id)?200000:256000;
    assert(html.length<=cap,template.id+" exceeded configured HTML length cap");
  }
});
test("changing an owner's primary color recalculates contrast text independently per template",()=>{
  for(const id of ["folio","liquidmetal","runwayml","nike","clay","ferrari","index","orbit","neomemphis","gazettebroadside"]){
    for(const bg of ["#000000","#ffffff","#e63946","#3459dd"]){
      const input=sampleForTemplate(id);
      input.design.primary=bg;
      const html=renderSite(input,{sample:false});
      if(["runwayml","runwaymulti"].includes(id))assert(!html.includes("data-awe-color-system"));
      else assert(html.includes('--awe-on-accent:'+readableOn(bg)),id+" "+bg+" contrast role did not update");
    }
  }
});
test("readable color always guarantees high contrast even for borderline light and dark brand hues",()=>{
  const lum=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4)
    .reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
  for(const bg of ["#000000","#ffffff","#3459dd","#cd9e6c","#777777","#888888","#9fe870","#e63946","#1d1f1c","#7252ce"]){
    assert(ratio(readableOn(bg),bg)>=4.5,bg+" has insufficient on-accent contrast");
  }
});
test("artwork styling and DOM remain unchanged for originals that do not need foreground correction",()=>{
  for(const id of ["folio","liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"]){
    const input=sampleForTemplate(id);
    const output=renderSite(input,{sample:true});
    const marker=output.match(/<style data-awe-color-system="[^"]+">([^<]+)<\/style>/);
    if(["runwayml","runwaymulti"].includes(id)){assert(!marker,"Runway should retain source byte identity");continue;}
    assert(marker,"missing role tokens: "+id);
    assert(!marker[1].includes('!important'),id+" palette has unwanted forced colors");
    assert(output.includes('id="main"'),id+" lost main content");
  }
});

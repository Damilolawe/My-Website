import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

function miniatureFunctions(source){
 const start=source.indexOf("function miniTheme(");
 const end=source.indexOf("export function mountExpressGallery(");
 assert(start>=0&&end>start,"Miniature rendering helpers must exist independently of the gallery");
 const document={
  createElement(tag){
   return {
    tagName:tag,children:[],className:"",attributes:{},style:{
     values:{},
     setProperty(key,value){this.values[key]=value;}
    },
    appendChild(child){this.children.push(child);},
    setAttribute(key,value){this.attributes[key]=value;}
   };
  }
 };
 return new Function("document",source.slice(start,end)+";return {miniTheme,miniatureSite};")(document);
}

test("all miniature thumbnails render visible structural artwork without any iframe",async()=>{
 const js=await read("showcase.js");
 const {miniatureSite}=miniatureFunctions(js);
 for(const item of [
  {id:"md-bugatti",name:"Velocity",style:"Automotive cinema",color:"#c4b08e"},
  {id:"md-mintlify",name:"Fieldnotes",style:"Developer documentation",color:"#27ae87"},
  {id:"md-nintendo-2001",name:"PixelQuest",style:"Retro game portal",color:"#ff528c"},
  {id:"folio",name:"Folio",style:"Elegant editorial",color:"#a33f2d"},
  {id:"afterhours",name:"After Hours",style:"Dark cinematic",color:"#b4acff"},
  {id:"daylight",name:"Daylight",style:"Playful contemporary",color:"#7252ce"},
  {id:"still",name:"Still Studio",style:"Minimal",color:"#52604c"},
  {id:"test-default",name:"New Website",style:"Unknown concept",color:"#89d1ea"},
  {id:"test-invalid",name:"Example",style:"Unknown",color:"red;display:none"}
 ]){
  const miniature=miniatureSite(item);
  assert.equal(miniature.tagName,"span");
  assert(miniature.className.startsWith("worlds-mini worlds-mini--"),item.id);
  assert(miniature.children.length>0,item.id+" blank thumbnail");
  assert(miniature.children[0].children.length>=4,item.id+" missing sections");
  assert(miniature.children[0].children.some(x=>x.className==="worlds-mini-hero"),item.id);
  assert(!JSON.stringify(miniature).includes('"tagName":"iframe"'),item.id+" uses blocked iframe");
  assert(/^#[0-9a-fA-F]{6}$/.test(miniature.style.values["--mini-accent"]),item.id+" color not sanitized");
  assert(!JSON.stringify(miniature).includes(item.name),item.id+" repeats the template name in artwork");
 }
 assert.doesNotMatch(js,/thumb\.append\(mini\)|mini\.dataset\.src/);
});

test("miniature identities have art direction variety, mobile stability and reduced motion",async()=>{
 const [js,css,firebase]=await Promise.all([read("showcase.js"),read("showcase.css"),read("firebase.json")]);
 const {miniTheme}=miniatureFunctions(js);
 const sample=[
  {id:"md-bugatti",name:"Velocity",style:"Automotive"},
  {id:"md-mintlify",name:"Fieldnotes",style:"Documentation"},
  {id:"md-nintendo-2001",name:"PixelQuest",style:"Retro gaming"},
  {id:"folio",name:"Folio",style:"Editorial"},
  {id:"afterhours",name:"After Hours",style:"Dark cinematic"},
  {id:"bloom",name:"Bloom House",style:"Organic"},
  {id:"ledger",name:"Ledger Co",style:"Fintech"},
  {id:"clay",name:"Sculpt",style:"Architecture"},
  {id:"store",name:"Storefront",style:"Commerce"},
  {id:"minimal",name:"Still",style:"Minimal"}
 ];
 assert(new Set(sample.map(miniTheme)).size>=9,"Different industries collapsed into one miniature skeleton");
 for(const item of sample)assert(css.includes(".worlds-mini--"+miniTheme(item)),item.id+" has no scene styles");
 assert(css.includes("@media(max-width:720px)"));
 assert(css.includes("@media(prefers-reduced-motion:reduce)"));
 assert(css.includes("worlds-choice:hover .worlds-mini-page"));
 assert(!css.includes(".worlds-choice-thumb iframe"));
 const config=JSON.parse(firebase);
 const headers=config.hosting.headers.find(x=>x.source==="**").headers;
 assert(headers.some(x=>x.key==="X-Frame-Options"&&x.value==="DENY"),"Regression assumes hosting blocks iframe thumbnails");
 assert(headers.some(x=>x.key==="Content-Security-Policy"&&x.value.includes("frame-ancestors 'none'")));
});

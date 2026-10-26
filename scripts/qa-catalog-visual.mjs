#!/usr/bin/env node
// Catalog-wide, browser-rendered design acceptance for non-flagship public demos.
// Captures real pixels and measured geometry. Never loads private customer content.
import {chromium} from "playwright";
import {mkdir,writeFile} from "node:fs/promises";
import {templates} from "../shared/model.mjs";
import {zipDesignFor} from "../shared/zip-design-catalog.mjs";

const origin=(process.env.AWE_VISUAL_BASE||"http://127.0.0.1:8765").replace(/\/$/,"");
const screenshots="catalog-visual-artifacts";
const flagship=new Set(["md-bugatti","md-mintlify","md-nintendo-2001"]);
const catalog=templates.filter(t=>!flagship.has(t.id));
const sizes=[["phone",390,844],["tablet",768,1024],["desktop",1440,900],["wide",1920,1080]];
const faults=[],warnings=[],measurements=[];
await mkdir(screenshots,{recursive:true});
const browser=await chromium.launch({headless:true});
const safe=id=>id.replace(/[^a-z0-9-]/gi,"-");
let snapCount=0;
const startPage=t=>t.id==="runwaymulti"?"/experiments/runwayml-multipage/":
 zipDesignFor(t.id)?.multipage?"/templates/"+t.id+"/home.html":"/templates/"+t.id+".html";
async function audit(t,route,mode,width,height,{capture=false}={}){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:"reduce"});
 const label=t.id+"/"+route+"/"+mode,issues=[];
 try{
  const response=await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:20000});
  if(response?.status()!==200)issues.push("HTTP "+(response?.status()||"no response"));
  const result=await page.evaluate(()=>{
   const all=[...document.querySelectorAll("main h1,main h2,main h3")];
   const visible=all.filter(el=>getComputedStyle(el).display!=="none");
   const headlines=visible.map(el=>{
    const s=getComputedStyle(el),r=el.getBoundingClientRect(),fs=parseFloat(s.fontSize);
    return {text:el.textContent.trim().slice(0,65),tag:el.tagName,
     lineHeight:fs>0?Math.round(parseFloat(s.lineHeight)/fs*100)/100:null,
     left:Math.round(r.left),right:Math.round(r.right)};
   });
   const width=Math.max(document.body.scrollWidth,document.documentElement.scrollWidth);
   const menus=[...document.querySelectorAll(".design-mobile,.fd-mobile-menu,.shell-mobile-menu")];
   const heading=visible.filter(el=>el.tagName==="H1");
   const broken=[...document.querySelectorAll('a[href^="#"]')]
    .filter(el=>el.getAttribute("href")!=="#"&&!document.getElementById(el.getAttribute("href").slice(1)))
    .map(el=>el.textContent.trim()).slice(0,5);
   const badMedia=[...document.querySelectorAll("img")].filter(el=>el.complete&&el.naturalWidth===0).map(el=>el.getAttribute("src")).slice(0,5);
   return {viewport:innerWidth,documentWidth:width,headlines,headCount:heading.length,
    hasMain:!!document.querySelector("main"),hasMenu:menus.length>0,
    missingAnchors:broken,brokenImages:badMedia};
  });
  if(result.documentWidth>width+3)issues.push("horizontal overflow "+(result.documentWidth-width)+"px");
  if(!result.hasMain||result.headCount!==1)issues.push("main region/H1 invalid");
  if(result.missingAnchors.length)issues.push("broken section anchors: "+result.missingAnchors.join(","));
  if(result.brokenImages.length)warnings.push(label+": incomplete images "+result.brokenImages.length);
  for(const h of result.headlines){
   if(h.lineHeight!==null&&h.lineHeight<1.01)warnings.push(label+": visually inspect tight "+h.tag+" line-height "+h.lineHeight+" ("+h.text+")");
   if(h.left< -width*.3||h.right>width*1.3)warnings.push(label+": inspect positioned heading "+h.text);
  }
  if(mode==="phone"&&result.hasMenu){
   const menu=page.locator(".design-mobile,.fd-mobile-menu,.shell-mobile-menu").first();
   const summary=menu.locator("summary").first();
   if(!await summary.isVisible())issues.push("small-screen menu unavailable");
   else{
    await summary.click();
    if(!await menu.evaluate(el=>el.open))issues.push("menu failed to open");
    const links=menu.locator("nav a:visible");
    if(await links.count()<2)issues.push("menu has fewer than two usable links");
    const bounds=await menu.locator("nav").boundingBox();
    if(!bounds||bounds.x< -2||bounds.x+bounds.width>width+2)issues.push("menu dropdown clipped");
    await summary.click();
    if(await menu.evaluate(el=>el.open))issues.push("menu failed to close");
   }
  }
  if(capture||issues.length){
   await page.screenshot({path:screenshots+"/"+safe(t.id)+"-"+mode+"-"+safe(route.split("/").filter(Boolean).pop()||"home")+".jpg",
    type:"jpeg",quality:62,fullPage:true,animations:"disabled",timeout:15000});
   snapCount++;
  }
  measurements.push({label,issues,...result});
 }catch(err){
  issues.push("browser exception: "+String(err?.message||err).slice(0,180));
  measurements.push({label,issues});
 }finally{
  for(const issue of issues)faults.push(label+": "+issue);
  await page.close();
 }
}
try{
 for(const t of catalog){
  const route=startPage(t);
  for(const [mode,width,height] of sizes)
   await audit(t,route,mode,width,height,{capture:mode==="phone"||mode==="desktop"});
  if(zipDesignFor(t.id)?.multipage){
   for(const page of ["work","features","studio","contact"])
    await audit(t,"/templates/"+t.id+"/"+page+".html","phone-chapter",390,844,{capture:true});
  }
 }
}finally{
 await browser.close();
 await writeFile(screenshots+"/results.json",JSON.stringify({
  date:new Date().toISOString(),origin,templates:catalog.length,
  checks:measurements.length,screenshots:snapCount,failures:faults.length,
  warnings:warnings.length,limitations:"Layout assertions do not constitute a human visual review.",
  results:measurements,faults,warnings},null,2)+"\n");
}
console.log("CATALOG VISUAL QA: "+catalog.length+" templates, "+measurements.length+
 " browser renders, "+snapCount+" screenshots, "+faults.length+" failures, "+warnings.length+" review warnings");
for(const fault of faults.slice(0,60))console.error("FAIL "+fault);
for(const warning of warnings.slice(0,30))console.warn("REVIEW "+warning);
if(faults.length)process.exitCode=1;

#!/usr/bin/env node
// Browser-rendered visual acceptance. Only fictional public previews are opened.
import {chromium} from "playwright";
import {mkdir,writeFile} from "node:fs/promises";
const base=(process.env.AWE_VISUAL_BASE||"http://127.0.0.1:8765").replace(/\/$/,"");
const folder="visual-acceptance-artifacts";
const chapters=["home","work","features","studio","contact"];
const sizes=[["mobile-390",390,844],["tablet-768",768,1024],["desktop-1440",1440,900],["wide-1920",1920,1080]];
const issues=[],samples=[];
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 for(const [mode,width,height] of sizes)for(const chapter of chapters){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:"reduce"});
  const label="Velocity/"+chapter+"/"+mode, faults=[];
  try{
   const url=base+"/templates/md-bugatti/"+chapter+".html";
   const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
   if(response?.status()!==200)faults.push("HTTP "+(response?.status()||"no response"));
   await page.evaluate(()=>document.fonts.ready);
   const data=await page.evaluate(()=>{
    const header=document.querySelector(".fv-header");
    const desktop=document.querySelector(".fv-nav");
    const mobile=document.querySelector(".fv-mobile-menu");
    const rect=header?.getBoundingClientRect();
    const links=nav=>[...(nav?.querySelectorAll("a")||[])].map(a=>({
     href:a.getAttribute("href"),active:a.getAttribute("aria-current")==="page"}));
    return {
     docWidth:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),
     header:rect?{left:rect.left,right:rect.right}:null,
     gradient:header?getComputedStyle(header).backgroundImage:"",
     desktopVisible:desktop&&getComputedStyle(desktop).display!=="none",
     mobileVisible:mobile&&getComputedStyle(mobile).display!=="none",
     desktopLinks:links(desktop),mobileLinks:links(mobile?.querySelector("nav")),
     headings:[...document.querySelectorAll(".fv-reveal h2")].map(el=>{
      const s=getComputedStyle(el);
      return {text:el.textContent.trim(),ratio:parseFloat(s.lineHeight)/parseFloat(s.fontSize)};
     }),
     h1:document.querySelectorAll("main h1").length
    };
   });
   if(data.docWidth>width+2)faults.push("Horizontal scroll at "+width+"px");
   if(!data.header||Math.abs(data.header.left)>1||Math.abs(data.header.right-width)>1)
    faults.push("Header gradient is not edge-to-edge");
   if(chapter==="home"&&width>900&&!data.gradient.includes("linear-gradient"))
    faults.push("Homepage header gradient is missing");
   if(data.h1!==1)faults.push("Main page needs exactly one H1");
   for(const h of data.headings)if(h.ratio<1.1)
    faults.push("Cramped headline "+h.text+" with line-height ratio "+h.ratio.toFixed(2));
   const expected=chapters.map(c=>"/templates/md-bugatti/"+c+".html");
   for(const [name,links] of [["desktop",data.desktopLinks],["mobile",data.mobileLinks]]){
    if(JSON.stringify(links.map(x=>x.href))!==JSON.stringify(expected))
     faults.push(name+" navigation links are missing or incorrect");
    if(links.filter(x=>x.active).length!==1||!links[chapters.indexOf(chapter)]?.active)
     faults.push(name+" active-page indicator incorrect");
   }
   if(width<=900){
    if(!data.mobileVisible||data.desktopVisible)faults.push("Mobile/desktop menu visibility incorrect");
    else{
     await page.locator(".fv-mobile-menu summary").click();
     if(!(await page.locator(".fv-mobile-menu").evaluate(el=>el.open)))
      faults.push("Mobile menu did not open");
     const panel=await page.locator(".fv-menu-panel").boundingBox();
     if(!panel||panel.x< -1||panel.x+panel.width>width+1)
      faults.push("Mobile dropdown overflows viewport");
     await page.locator(".fv-mobile-menu summary").click();
     if(await page.locator(".fv-mobile-menu").evaluate(el=>el.open))
      faults.push("Mobile menu did not close");
    }
   }else if(!data.desktopVisible||data.mobileVisible)
    faults.push("Desktop/mobile menu visibility incorrect");
   if(mode==="mobile-390"||mode==="desktop-1440"||
      mode==="wide-1920"&&chapter==="home"||faults.length)
    await page.screenshot({path:folder+"/"+chapter+"-"+mode+".png",
      fullPage:true,animations:"disabled"});
   samples.push({label,geometry:data,issues:faults});
  }catch(e){
   faults.push("Browser exception: "+String(e?.message||e));
   samples.push({label,issues:faults});
  }finally{
   for(const issue of faults)issues.push(label+": "+issue);
   await page.close();
  }
 }
}finally{
 await browser.close();
 await writeFile(folder+"/report.json",JSON.stringify({
  checkedAt:new Date().toISOString(),base,total:samples.length,failures:issues.length,
  note:"Geometric browser checks do NOT replace inspection of the captured screenshots.",
  samples,issues},null,2)+"\n");
}
console.log("Visual acceptance: "+samples.length+" rendered checks, "+issues.length+" failures");
for(const issue of issues)console.error("FAIL "+issue);
console.log("Screenshots and report: "+folder+"/");
if(issues.length)process.exitCode=1;

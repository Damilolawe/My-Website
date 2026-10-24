// Browser-only add-on transport QA: no real vendor calls, accounts, or payment requests.
import {mkdir,writeFile} from "node:fs/promises";
import {chromium} from "playwright-core";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderApprovedRunwayPages} from "../shared/runway-customer-pages.mjs";

const IDS=["index","folio","runwayml","runwaymulti","nike","clay","liquidmetal","arcade","ferrari","daylight"];
const SIZES=[{width:360,height:780,name:"mobile"},{width:1440,height:900,name:"desktop"}];
const OUT="qa-output/addon-feasibility/browser";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const findings=[];
let failures=0;
const injection='<style data-awe-addon-smoke>.awe-qa-booking{display:inline-flex;align-items:center;justify-content:center;max-width:calc(100% - 32px);min-height:44px;margin:16px;padding:12px 18px;border:2px solid currentColor;border-radius:8px;text-decoration:none;font:600 15px system-ui,sans-serif;overflow-wrap:anywhere}@media(max-width:420px){.awe-qa-booking{max-width:calc(100vw - 32px)}}</style><a class="awe-qa-booking" rel="noopener noreferrer" href="https://calendly.com/example/consultation">Book an appointment</a>';
await mkdir(OUT,{recursive:true});
try{
 for(const id of IDS){
  const v=sampleForTemplate(id);
  const htmls=id==="runwaymulti"?renderApprovedRunwayPages(v):{"index.html":renderSite(v,{sample:false})};
  for(const [file,original] of Object.entries(htmls)){
   const decorated=original.replace(/<\/body>/i,injection+"</body>");
   for(const sz of SIZES){
    const page=await browser.newPage({viewport:{width:sz.width,height:sz.height},reducedMotion:"no-preference"});
    const pageErrors=[];
    page.on("pageerror",error=>pageErrors.push(String(error.message).slice(0,120)));
    const metrics=async()=>page.evaluate(()=>{
      const root=document.documentElement,body=document.body;
      const a=document.querySelector("a.awe-qa-booking");
      const bounds=a?.getBoundingClientRect();
      return {
       horizontalOverflow:Math.max(root.scrollWidth,body.scrollWidth)-root.clientWidth,
       customerAddonPresent:!!a,
       addonRendered:!!bounds && bounds.width>=100 && bounds.width<=innerWidth && bounds.height>=40,
       addonHref:a?.getAttribute("href"),
       addonInsideViewport:!!bounds&&bounds.left>=-2&&bounds.right<=innerWidth+2,
       viewportMeta:!!document.querySelector('meta[name="viewport"]'),
       title:document.title,
       navigableAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(x=>{
        const hash=x.getAttribute("href");return hash.length>1&&!document.getElementById(hash.slice(1));
       }).length
      };
    });
    try{
     await page.setContent(original,{waitUntil:"domcontentloaded",timeout:20000});
     const before=await metrics();
     await page.setContent(decorated,{waitUntil:"domcontentloaded",timeout:20000});
     const after=await metrics();
     const delta=after.horizontalOverflow-before.horizontalOverflow;
     const pass=after.customerAddonPresent && after.addonRendered && after.addonInsideViewport &&
        after.addonHref==="https://calendly.com/example/consultation" && delta<=2 && pageErrors.length===0;
     findings.push({template:id,file,viewport:sz.name,pass,baselineOverflow:before.horizontalOverflow,withAddonOverflow:after.horizontalOverflow,addedOverflow:delta,addonVisible:after.addonRendered,addonWithinWidth:after.addonInsideViewport,brokenInternalAnchors:after.navigableAnchors,pageErrors});
     if(!pass)failures++;
     if(["folio","runwaymulti","liquidmetal"].includes(id)&&file==="index.html")
       await page.screenshot({path:OUT+"/"+id+"-"+sz.name+".png",fullPage:true,timeout:15000});
    }catch(e){
     findings.push({template:id,file,viewport:sz.name,pass:false,error:String(e?.message||e).slice(0,300)});
     failures++;
    }finally{await page.close();}
   }
  }
 }
}finally{await browser.close();}
const summary={cases:findings.length,passed:findings.filter(x=>x.pass).length,failed:failures,templates:IDS.length,viewports:SIZES.map(x=>x.name)};
await writeFile(OUT+"/results.json",JSON.stringify({summary,findings},null,2));
await writeFile(OUT+"/results.md",[
 "# Add-on mock booking link: desktop/mobile compatibility",
 "",
 "This is a static mock feature injected after each customer site's body; it does not exercise real Calendly, Stripe, a booking workflow, or visual-art-direction integration.",
 "",
 "Cases: **"+summary.cases+"**, passed: **"+summary.passed+"**, failed: **"+summary.failed+"**.",
 "",
 "| Template | File | Viewport | Pass | Overflow added (px) | Baseline overflow (px) | Internal anchors missing | Error |",
 "|---|---|---|---|---:|---:|---:|---|",
 ...findings.map(f=>"| "+f.template+" | "+f.file+" | "+f.viewport+" | "+(f.pass?"PASS":"FAIL")+" | "+(f.addedOverflow??"-")+" | "+(f.baselineOverflow??"-")+" | "+(f.brokenInternalAnchors??"-")+" | "+(f.error||f.pageErrors?.join("; ")||"")+" |")
].join("\n"));
console.log(JSON.stringify(summary));
console.log("Failures",JSON.stringify(findings.filter(x=>!x.pass)));
if(failures)process.exitCode=1;

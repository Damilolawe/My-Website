// Deeper DIAGNOSTIC ONLY: mock add-on placement inside real customer template headers,
// plus real Chromium CSP/form checks. No live client, transaction, or vendor calls.
import {chromium} from "playwright-core";
import {createServer} from "node:http";
import {mkdir,writeFile,readFile} from "node:fs/promises";
import {templates,sampleForTemplate,normalize} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderApprovedRunwayPages} from "../shared/runway-customer-pages.mjs";

const output="qa-output/addon-feasibility/placement";
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const svgData="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23000000'/%3E%3Ctext x='20' y='30' fill='white' font-size='25' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E";
const addon='<span class="awe-addon-identity" data-addon="logo"><img width="28" height="28" alt="Brand identity" src="'+svgData+'"></span>'+
 '<a data-addon="booking" class="awe-addon-reserve" href="https://calendly.com/example/consult" rel="noopener noreferrer">Book now</a>';
const style='<style data-addon="style">@keyframes awe-addon-enter{from{opacity:.3}to{opacity:1}}'+
 '.awe-addon-identity{display:inline-flex;flex:0 0 auto;vertical-align:middle}'+
 '.awe-addon-identity img{width:28px;height:28px;max-width:28px;display:block}'+
 '.awe-addon-reserve{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;white-space:nowrap;min-height:44px;max-width:100%;padding:8px 13px;margin:3px 6px;border:1px solid currentColor;border-radius:8px;text-decoration:none;font:600 13px/1.2 system-ui,sans-serif;animation:awe-addon-enter .7s ease-out}'+
 '@media(prefers-reduced-motion:reduce){.awe-addon-reserve{animation:none}}</style>';
function attach(html){
 const nav=/<nav\b[^>]*>/i,header=/<header\b[^>]*>/i,main=/<main\b[^>]*>/i;
 const target=nav.test(html)?"nav":header.test(html)?"header":main.test(html)?"main":null;
 if(!target)return {html,position:null};
 const regex={nav,header,main}[target];
 return {html:html.replace(/<\/head>/i,style+"</head>").replace(regex,m=>m+addon),position:target};
}
const out=[];
const viewportSizes=[{name:"mobile",width:360,height:780},{name:"desktop",width:1440,height:900}];
for(const t of templates){
 const template=t.id;
 const v=sampleForTemplate(template);
 const originals=template==="runwaymulti"?renderApprovedRunwayPages(v):{"index.html":renderSite(v,{sample:false})};
 for(const [filename,html] of Object.entries(originals)){
  const mounted=attach(html);
  for(const viewport of viewportSizes){
   const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},reducedMotion:"no-preference"});
   const errors=[];
   page.on("pageerror",e=>errors.push(e.message.slice(0,150)));
   try{
    await page.setContent(html,{waitUntil:"domcontentloaded",timeout:18000});
    const before=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
    await page.setContent(mounted.html,{waitUntil:"domcontentloaded",timeout:18000});
    const after=await page.evaluate(()=>{
     const a=document.querySelector(".awe-addon-reserve"),logo=document.querySelector(".awe-addon-identity img"),root=document.documentElement;
     const r=a?.getBoundingClientRect(),lr=logo?.getBoundingClientRect();
     const style=a&&getComputedStyle(a),ls=logo&&getComputedStyle(logo);
     const missingAnchors=[...document.querySelectorAll('a[href^="#"]')].filter(x=>{
      const h=x.getAttribute("href");return h&&h.length>1&&!document.getElementById(h.slice(1));
     }).length;
     return {
      overflow:root.scrollWidth-root.clientWidth,
      bookingVisible:!!r&&r.width>=70&&r.height>=38&&r.right>0&&r.left<innerWidth&&r.top<innerHeight&&style.visibility!=="hidden"&&style.display!=="none",
      logoVisible:!!lr&&lr.width>=24&&lr.height>=24&&lr.right>0&&lr.left<innerWidth&&lr.top<innerHeight&&ls.visibility!=="hidden"&&ls.display!=="none",
      bookingInsideScreen:!!r&&r.left>=-2&&r.right<=innerWidth+2,
      animation:style?.animationName||"",
      brokenAnchors:missingAnchors,
      placement:a?.parentElement?.tagName||null
     };
    });
    const addedOverflow=after.overflow-Math.max(0,before.scrollWidth-before.clientWidth);
    const pass=after.bookingVisible&&after.logoVisible&&after.bookingInsideScreen&&addedOverflow<=2&&errors.length===0;
    const result={template,page:filename,viewport:viewport.name,placement:mounted.position,pass,addedOverflow,baselineOverflow:Math.max(0,before.scrollWidth-before.clientWidth),...after,errors};
    out.push(result);
    if((!pass && out.filter(x=>!x.pass).length<=8)||(["folio","liquidmetal","runwaymulti"].includes(template)&&filename==="index.html")){
      const name=template+"-"+filename.replace(".html","")+"-"+viewport.name;
      await page.screenshot({path:output+"/"+name+".png",fullPage:false,timeout:12000});
    }
   }catch(e){out.push({template,page:filename,viewport:viewport.name,pass:false,error:String(e.message).slice(0,250)});}
   finally{await page.close();}
  }
 }
}
const csp=JSON.parse(await readFile("firebase.json","utf8")).hosting.headers.flatMap(x=>x.headers||[]).find(x=>x.key==="Content-Security-Policy").value;
const webForms={};
const server=createServer((req,res)=>{
 res.setHeader("Content-Security-Policy",csp);
 res.setHeader("Content-Type","text/html;charset=UTF-8");
 if(req.url==="/"){res.writeHead(200);res.end('<!doctype html><html><head><title>Forms CSP QA</title></head><body><form id="external" action="https://addon.invalid/submit" method="POST"><input name="test" value="hello"><button type="submit">External form</button></form><form id="internal" action="/__addon_submission_not_implemented" method="POST"><button type="submit">Internal form</button></form></body></html>');return;}
 res.writeHead(404);res.end("No form receiver deployed");
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
try{
 const page=await browser.newPage();
 const messages=[];
 let externalRequests=0;
 page.on("console",msg=>messages.push(msg.text()));
 await page.route("https://addon.invalid/**",async route=>{externalRequests++;await route.fulfill({status:200,body:"fake"});});
 await page.goto("http://127.0.0.1:"+server.address().port+"/",{waitUntil:"domcontentloaded"});
 await page.locator("#external button").evaluate(button=>button.click());
 await page.waitForTimeout(450);
 webForms.externalFormBlockedByCsp=messages.some(x=>/form-action|Refused to send form|violates.*Content Security Policy/i.test(x))&&externalRequests===0;
 webForms.externalFormRequests=externalRequests;
 webForms.cspConsoleSample=messages.filter(x=>/form-action|Content Security Policy/i.test(x)).slice(0,2);
 await page.locator("#internal button").evaluate(button=>button.click());
 await page.waitForTimeout(350);
 webForms.internalFormSubmissionWithoutService404=(await page.locator("body").innerText()).includes("No form receiver deployed");
 await page.close();
}finally{await new Promise(resolve=>server.close(resolve));await browser.close();}
const testNormalized=normalize({...sampleForTemplate("index"),addons:[{id:"booking",price:49}],content:{...sampleForTemplate("index").content,logoUrl:"https://example.org/logo.png"}});
const transport={
 addonsFieldPreserved: Object.hasOwn(testNormalized,"addons"),
 logoUrlPreserved:Object.hasOwn(testNormalized.content,"logoUrl"),
 formCsp:webForms,
};
const failing=out.filter(x=>!x.pass),pass=out.length-failing.length;
const result={summary:{templates:templates.length,generatedPages:out.length/2,browserCases:out.length,passed:pass,failed:failing.length,strictNoOverflowAndVisible:pass===out.length},transport,failedExamples:failing.slice(0,35),byTemplate:templates.map(t=>({template:t.id,passes:out.filter(x=>x.template===t.id&&x.pass).length,total:out.filter(x=>x.template===t.id).length})),results:out};
await writeFile(output+"/results.json",JSON.stringify(result,null,2));
await writeFile(output+"/results.md",[
 "# Add-on native navigation placement and form compatibility",
 "",
 "Diagnostic experiment: tries inserting a mock logo and booking CTA inside each generated template's native nav/header. This is NOT production add-on implementation.",
 "",
 "## Summary",
 ...Object.entries(result.summary).map(([k,v])=>"- "+k+": **"+v+"**"),
 "",
 "## Data & forms",
 "- addons survives customer normalize(): **"+transport.addonsFieldPreserved+"**",
 "- custom logoUrl survives normalize(): **"+transport.logoUrlPreserved+"**",
 "- external POST form blocked by site's actual Firebase CSP: **"+webForms.externalFormBlockedByCsp+"**",
 "- same-origin POST without a backend receives 404: **"+webForms.internalFormSubmissionWithoutService404+"**",
 "",
 "## Template-specific compatibility",
 "| Template | Passed cases | Total cases |",
 "|---|---:|---:|",
 ...result.byTemplate.map(x=>"| "+x.template+" | "+x.passes+" | "+x.total+" |"),
 "",
 "## Failing placements",
 "| Template | Page | Viewport | Target | New overflow | Booking visible | Logo visible | Error |",
 "|---|---|---|---|---:|---|---|---|",
 ...failing.map(x=>"| "+x.template+" | "+x.page+" | "+x.viewport+" | "+x.placement+" | "+(x.addedOverflow??"—")+" | "+(x.bookingVisible??"—")+" | "+(x.logoVisible??"—")+" | "+(x.error||x.errors?.join("; ")||"")+" |"),
 "",
 "Do not infer that vendor functionality works from markup/CSS injection. This deliberately tests that a naive generic insert may break authored template design."
].join("\n"));
console.log("ADDON PLACEMENT RESULT",JSON.stringify({summary:result.summary,transport,failedExamples:failing.slice(0,12)}));

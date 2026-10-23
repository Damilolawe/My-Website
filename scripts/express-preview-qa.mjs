// Design-review browser QA. Tests this PR's built dist locally; never calls private APIs,
// never authenticates, never publishes an order, and never deploys production.
import {createServer} from "node:http";
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright-core";
import sharp from "sharp";
import {templates} from "../shared/model.mjs";

const root=resolve("dist");
const output=resolve("qa-express-artifacts");
await mkdir(output,{recursive:true});
const MIME={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",
 ".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp"};
const server=createServer(async(req,res)=>{
 const path=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
 const abs=resolve(root,"."+path);
 if(!(abs===root||abs.startsWith(root+sep))){res.writeHead(403).end();return;}
 try{
  const data=await readFile(abs.endsWith(sep)?resolve(abs,"index.html"):abs);
  res.writeHead(200,{"Content-Type":MIME[extname(abs)]||"text/html; charset=utf-8"}).end(data);
 }catch{res.writeHead(404).end("Not found");}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const base="http://127.0.0.1:"+server.address().port;
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const sizes=[
 {w:320,h:720},{w:375,h:812},{w:430,h:932},{w:768,h:1024},
 {w:1024,h:768},{w:1366,h:900},{w:1920,h:1080}
];
const failures=[],results=[],panels={"375":[],"1366":[]};
function note(id,width,fault){failures.push(id+" @ "+width+": "+fault);}
async function contactSheet(width){
 const items=panels[String(width)];
 if(items.length!==20)return;
 const columns=4,tileW=340,tileH=265;
 const composites=[];
 for(const [index,p] of items.entries()){
  const x=index%columns*tileW,y=Math.floor(index/columns)*tileH;
  const preview=await sharp(p.file).resize(316,195,{fit:"cover",position:"north"}).png().toBuffer();
  const title=p.id.replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const label=Buffer.from('<svg width="320" height="44"><rect width="320" height="44" fill="#f9f6ee"/>'+
   '<text x="9" y="27" fill="#171c23" font-family="Arial" font-size="17" font-weight="700">'+title+'</text></svg>');
  composites.push({input:preview,left:x+12,top:y+10},{input:label,left:x+12,top:y+207});
 }
 await sharp({create:{width:columns*tileW,height:Math.ceil(items.length/columns)*tileH,channels:4,
  background:"#eeeae1"}}).composite(composites).png().toFile(output+"/contact-sheet-"+width+".png");
}
async function inspect(page,id,w){
 return await page.evaluate(()=>{
  const doc=document.documentElement;
  const anchors=[...document.querySelectorAll('nav[aria-label="Section navigation"] a[href^="#"]')];
  const missing=anchors.filter(a=>!document.getElementById(a.getAttribute("href").slice(1)))
    .map(a=>a.getAttribute("href"));
  const head=document.querySelector(".hero h1");
  const rect=head?.getBoundingClientRect();
  const overflow=Math.max(doc.scrollWidth,document.body.scrollWidth)-doc.clientWidth;
  const contact=document.querySelector("#contact");
  return {overflow,missing,heroVisible:!!rect&&rect.width>0&&rect.height>0,hasContact:!!contact,
   heading:head?.textContent?.trim()||"",cssLoaded:!!document.querySelector(".site-architecture")};
 });
}
try{
 for(const size of sizes){
  const context=await browser.newContext({viewport:{width:size.w,height:size.h},
   isMobile:size.w<=430,hasTouch:size.w<=430,reducedMotion:"reduce"});
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  for(const {id,name} of templates){
   const url=base+"/templates/"+id+".html";
   try{
    const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:25000});
    if(response?.status()!==200){note(id,size.w,"HTTP "+response?.status());continue;}
    await page.locator("#contact").waitFor({state:"attached",timeout:3000});
    const data=await inspect(page,id,size.w);
    if(data.overflow>0)note(id,size.w,"horizontal overflow "+data.overflow+"px");
    if(data.missing.length)note(id,size.w,"broken anchors "+data.missing.join(","));
    if(!data.heroVisible||!data.hasContact||!data.cssLoaded)
      note(id,size.w,"missing hero, contact or architecture");
    if(errors.length){note(id,size.w,"JS exception "+errors.join(" | "));errors.length=0;}
    // A real user navigation click, especially important for Daylight's former flower overlap.
    const contact=page.locator('nav[aria-label="Section navigation"] a[href="#contact"]').first();
    if(await contact.count()){
     try{
      await contact.click({timeout:2500});
      if((await page.evaluate(()=>location.hash))!=="#contact")
       note(id,size.w,"contact click did not navigate");
     }catch(error){note(id,size.w,"contact link blocked: "+String(error.message).slice(0,130));}
    }
    results.push({id,name,width:size.w,...data});
    if(size.w===375||size.w===1366){
     // Capture hero and two actual interior sections of every design.
     const prefix=output+"/"+id+"-"+size.w;
     await page.locator(".hero").screenshot({path:prefix+"-hero.png",animations:"disabled",timeout:8000});
     await page.locator("#work").screenshot({path:prefix+"-work.png",animations:"disabled",timeout:8000})
       .catch(e=>note(id,size.w,"could not capture work: "+e.message.slice(0,95)));
     await page.locator("#contact").screenshot({path:prefix+"-contact.png",animations:"disabled",timeout:8000});
     panels[String(size.w)].push({id:name,file:prefix+"-hero.png"});
    }
    if([320,375,1366].includes(size.w)&&["folio","signal","ledger"].includes(id)){
     await page.screenshot({path:output+"/"+id+"-"+size.w+"-full.png",fullPage:true,animations:"disabled"});
    }
   }catch(e){note(id,size.w,String(e.message).slice(0,160));}
  }
  await context.close();
 }

 // Public AWE Express builder is exercised without signing in or placing an order.
 // This verifies the real selector, preview width controls and color-picker path.
 {
  const context=await browser.newContext({viewport:{width:1366,height:900}});
  const page=await context.newPage();
  await page.route(/^https:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
  try{
   await page.goto(base+"/order.html",{waitUntil:"domcontentloaded",timeout:20000});
   await page.locator('[data-type="Creative portfolio"]').waitFor({timeout:12000});
   await page.locator('[data-type="Creative portfolio"]').click();
   await page.locator("#next").click();
   await page.locator('[data-template="folio"]').waitFor({timeout:10000});
   const choices=await page.locator("[data-template]").count();
   if(choices!==20)failures.push("Builder: "+choices+" template choices rather than 20");
   await page.locator('[data-template="folio"]').click();
   await page.locator("#theater-mobile").click();
   if(!await page.locator(".experience-theater").evaluate(el=>el.classList.contains("is-mobile")))
    failures.push("Builder: MOBILE theater button did not switch layout");
   await page.locator("#theater-desktop").click();
   if(await page.locator(".experience-theater").evaluate(el=>el.classList.contains("is-mobile")))
    failures.push("Builder: DESKTOP theater button did not restore layout");
   await page.waitForFunction(()=>document.querySelector("#theater-frame")?.getAttribute("srcdoc")?.includes("folio-hero"),
    {timeout:15000}).catch(()=>failures.push("Builder: selected Folio preview did not render"));
   await page.locator("#next").click();
   await page.locator('input[name="primary"]').waitFor({timeout:6000});
   await page.locator('input[name="primary"]').fill("#b33392");
   await page.locator('input[name="secondary"]').fill("#cfd94a");
   const markup=await page.locator("#step iframe").evaluate(el=>el.getAttribute("srcdoc"));
   if(!markup?.includes("--accent:#b33392;--secondary:#cfd94a"))
    failures.push("Builder: selected palette did not propagate into preview HTML");
   if(!markup?.includes("folio-hero"))
    failures.push("Builder: selected template was lost in preview");
   await page.locator("#narrow").click();
   if(await page.locator("#step iframe").evaluate(el=>el.style.width)!=="320px")
    failures.push("Builder: MOBILE preview button did not set narrow width");
   await page.locator("#wide").click();
   if(await page.locator("#step iframe").evaluate(el=>el.style.width)!=="100%")
    failures.push("Builder: DESKTOP preview button did not restore full width");
   await page.screenshot({path:output+"/builder-style-preview.png",fullPage:false,animations:"disabled"});
  }catch(e){failures.push("Builder interaction: "+String(e.message).slice(0,180));}
  await context.close();
 }
 // Preserve an authentic before/after baseline for three creative exemplars.
 // This is a public production snapshot, not a pre-existing screenshot fabricated
 // from the new designs. If production cannot be reached, report that limitation.
 const comparisons=[];
 for(const id of ["folio","signal","ledger"]){
  for(const w of [320,375,1366]){
   const h=w>=1000?900:812;
   const context=await browser.newContext({viewport:{width:w,height:h},
    isMobile:w<500,hasTouch:w<500,reducedMotion:"reduce"});
   const page=await context.newPage();
   try{
    const existing=await page.goto("https://aweconcepts.com/templates/"+id+".html",
     {waitUntil:"domcontentloaded",timeout:12000});
    if(existing?.status()!==200)throw Error("production HTTP "+existing?.status());
    await page.locator(".hero").screenshot({path:output+"/BEFORE-"+id+"-"+w+".png",
     animations:"disabled",timeout:8000});
    const old=output+"/BEFORE-"+id+"-"+w+".png";
    await page.goto(base+"/templates/"+id+".html",{waitUntil:"domcontentloaded",timeout:12000});
    const current=output+"/AFTER-"+id+"-"+w+".png";
    await page.locator(".hero").screenshot({path:current,animations:"disabled",timeout:8000});
    const left=await sharp(old).resize(620,410,{fit:"contain",background:"#171a1f"}).png().toBuffer();
    const right=await sharp(current).resize(620,410,{fit:"contain",background:"#171a1f"}).png().toBuffer();
    await sharp({create:{width:1272,height:460,channels:4,background:"#f9f7f3"}})
     .composite([{input:left,left:8,top:42},{input:right,left:644,top:42},
      {input:Buffer.from('<svg width="1260" height="38"><text x="10" y="28" font-family="Arial" font-size="21">BEFORE — live production</text><text x="648" y="28" font-family="Arial" font-size="21">AFTER — pull request</text></svg>'),left:6,top:0}])
     .png().toFile(output+"/COMPARE-"+id+"-"+w+".png");
    comparisons.push({template:id,width:w,baseline:"https://aweconcepts.com/templates/"+id+".html"});
   }catch(e){console.warn("BEFORE_CAPTURE_UNAVAILABLE",id,w,String(e.message).slice(0,180));}
   await context.close();
  }
 }
 await writeFile(output+"/comparisons.json",JSON.stringify({capturedAt:new Date().toISOString(),comparisons},null,2));
 // Brief motion capture under normal animation preferences (never reduced-motion).
 try{
  const ctx=await browser.newContext({viewport:{width:960,height:620},
   reducedMotion:"no-preference",recordVideo:{dir:output,size:{width:960,height:620}}});
  const motion=await ctx.newPage();
  await motion.goto(base+"/templates/signal.html",{waitUntil:"domcontentloaded",timeout:12000});
  await motion.waitForTimeout(800);
  await motion.locator("#work").scrollIntoViewIfNeeded();
  await motion.waitForTimeout(1100);
  await motion.locator("#contact").scrollIntoViewIfNeeded();
  await motion.waitForTimeout(900);
  await motion.close();
  await ctx.close();
 }catch(e){console.warn("MOTION_CAPTURE_UNAVAILABLE",String(e.message).slice(0,180));}
 await contactSheet(375);
 await contactSheet(1366);
 await writeFile(output+"/results.json",JSON.stringify({failures,results},null,2));
 await writeFile(output+"/README.txt",
  "This is PR-branch local render QA, NOT a production deployment or real-device test.\n"+
  "View contact-sheet-375.png and contact-sheet-1366.png alongside each template's hero, work, contact.\n"+
  "Production before-captures and desktop motion video require separate browser verification.\n");
 console.log("DESIGN_QA",JSON.stringify({checked:results.length,expected:20*sizes.length,
  capturedHeroImages:panels["375"].length+panels["1366"].length,failures:failures.slice(0,60)}));
 if(failures.length)process.exitCode=1;
}finally{
 await browser.close();
 await new Promise(done=>server.close(done));
}

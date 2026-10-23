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

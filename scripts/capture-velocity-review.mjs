#!/usr/bin/env node
// Generate reviewable, full-page Velocity captures directly from the current built PR.
// No Firebase deployment, browser sign-in, or external screenshot service required.
import {chromium} from "playwright";
import sharp from "sharp";
import {createServer} from "node:http";
import {readFile,mkdir,writeFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {execFileSync} from "node:child_process";
import {existsSync} from "node:fs";

const root=resolve("dist");
const output=resolve("docs/velocity-review");
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".png":"image/png",".svg":"image/svg+xml"};
const server=createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,"http://127.0.0.1");
  const file=resolve(root,"."+decodeURIComponent(u.pathname));
  if(!file.startsWith(root+sep)){res.writeHead(403).end("Forbidden");return;}
  const bytes=await readFile(file);
  res.writeHead(200,{"Content-Type":types[extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
  res.end(bytes);
 }catch{res.writeHead(404).end("Not found");}
});
await mkdir(output,{recursive:true});
await new Promise((r,j)=>server.listen(0,"127.0.0.1",r).on("error",j));
const origin="http://127.0.0.1:"+server.address().port;
const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||(existsSync("/usr/bin/chromium")?"/usr/bin/chromium":undefined);
let browser;
const captures=[];
try{
 browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
 for(const [viewportName,viewport] of Object.entries({desktop:{width:1440,height:900},mobile:{width:390,height:844}})){
  const page=await browser.newPage({viewport,deviceScaleFactor:1,reducedMotion:"reduce"});
  await page.emulateMedia({reducedMotion:"reduce"});
  for(const route of ["home","work","features","studio","contact"]){
   const url=route==="home"?"/templates/md-bugatti/home.html":"/templates/md-bugatti/"+route+".html";
   const response=await page.goto(origin+url,{waitUntil:"domcontentloaded",timeout:40000});
   if(!response||response.status()!==200)throw new Error(route+" returned "+response?.status());
   await page.evaluate(async()=>{
    await Promise.race([document.fonts?.ready||Promise.resolve(),new Promise(r=>setTimeout(r,2000))]);
    // Trigger lazy image loading, including below-fold imagery, before fullPage capture.
    const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    for(let y=0;y<=max;y+=Math.max(350,innerHeight*.85)){scrollTo(0,y);await new Promise(r=>setTimeout(r,45))}
    scrollTo(0,0);
   });
   await page.waitForFunction(()=>[...document.images].every(i=>!i.currentSrc||i.complete),{timeout:9000}).catch(()=>{});
   await page.waitForTimeout(600);
   const filename="velocity-"+route+"-"+viewportName+".webp";
   const image=await page.screenshot({fullPage:true,type:"png",animations:"disabled",timeout:40000});
   await sharp(image).webp({quality:83,effort:4}).toFile(resolve(output,filename));
   const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,height:document.documentElement.scrollHeight,images:[...document.images].map(i=>({src:i.currentSrc||i.src,loaded:i.complete&&i.naturalWidth>0})),headline:document.querySelector("#hero-title")?.textContent?.trim()}));
   captures.push({route,viewportName,filename,overflow:metrics.scrollWidth>metrics.viewport,viewportWidth:metrics.viewport,pageHeight:metrics.height,headline:metrics.headline,imagesLoaded:metrics.images.filter(i=>i.loaded).length,imagesFailed:metrics.images.filter(i=>!i.loaded).length});
   console.log(filename,JSON.stringify(captures.at(-1)));
  }
  await page.close();
 }
}finally{await browser?.close();await new Promise(r=>server.close(r))}
const revision=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
await writeFile(resolve(output,"review-metadata.json"),JSON.stringify({revision,capturedAt:new Date().toISOString(),captures},null,2)+"\n");
if(captures.length!==10||captures.some(x=>x.overflow))process.exitCode=1;
console.log("Captured "+captures.length+" Velocity full-page reviews at revision "+revision);

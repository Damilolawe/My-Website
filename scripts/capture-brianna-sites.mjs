/**
 * Capture REAL Brianna website first-fold screenshots in Cloud Shell before
 * the Firebase build. No mockups, remote screenshot proxy or secret editor URL.
 *
 * The original before image is write-once: once it exists, this script never
 * revisits the original domain. This preserves the old design after the Wix
 * redesign eventually takes over that hostname.
 *
 * Images are saved in the Cloud Shell working copy and included by build.mjs.
 * Archive them in version control separately for long-term portability.
 */
import {access,mkdir,readFile,rename,unlink} from "node:fs/promises";
import {existsSync} from "node:fs";
import {resolve,join} from "node:path";
import {chromium} from "playwright";
import sharp from "sharp";

const root=resolve(".");
const out=join(root,"assets/case-studies");
const captures=[
  {name:"Original",file:"brianna-before.webp",url:"https://www.briannalucilledemmings.com/",writeOnce:true},
  {name:"Wix Studio redesign",file:"brianna-after.webp",url:"https://damilolawe03.wixstudio.com/website?rc=test-site",writeOnce:true},
];

async function validExisting(file){
  try{
    await access(file);
    const meta=await sharp(file).metadata();
    const buf=await readFile(file);
    return meta.format==="webp"&&meta.width>=1100&&meta.height>=650&&buf.length>=10_000;
  }catch{return false;}
}
async function captureOne(browser,entry){
  const dest=join(out,entry.file);
  // Never overwrite a previously preserved snapshot without an explicit, separate decision.
  if(entry.writeOnce&&await validExisting(dest)){
    console.log("Preserved earlier "+entry.name+" capture: "+dest);
    return true;
  }
  const page=await browser.newPage({
    viewport:{width:1440,height:900},deviceScaleFactor:1,
    reducedMotion:"reduce",serviceWorkers:"block",locale:"en-US",
  });
  try{
    console.log("Capturing actual "+entry.name+" website (no simulated artwork)...");
    await page.goto(entry.url,{waitUntil:"domcontentloaded",timeout:45000});
    await page.waitForTimeout(6500);
    await page.evaluate(async()=>{
      await Promise.race([document.fonts?.ready||Promise.resolve(),new Promise(r=>setTimeout(r,2500))]);
      scrollTo(0,0);
    });
    // Detect Wix preview/login/error states before presenting the screenshot as real.
    const text=await Promise.all(page.frames().map(async frame=>{
      try{return await frame.locator("body").innerText({timeout:1200});}
      catch{return "";}
    }));
    const title=await page.title();
    const visible=text.join(" ").trim();
    const finalUrl=page.url();
    if(/login|sign.in|access.denied|error 404/i.test(title+" "+visible.slice(0,250))
       || /(?:login\.wix\.com|accounts\.wix\.com)/i.test(finalUrl)
       || !/Brianna\s+(Lucille\s+)?Demmings/i.test(title+" "+visible)
       || visible.length<25){
      throw Error("Wix returned an inaccessible or unverified page (title="+JSON.stringify(title)+", visible text="+visible.length+" characters)");
    }
    const png=await page.screenshot({type:"png",animations:"disabled",timeout:30000});
    const image=sharp(png);
    const stats=await image.stats();
    if(stats.channels.slice(0,3).every(c=>c.stdev<8))throw Error("Screenshot appears blank");
    const tmp=dest+".partial";
    try{
      await image.resize({width:1280}).webp({quality:83,effort:4}).toFile(tmp);
      if(!(await validExisting(tmp)))throw Error("Captured image failed size/format validation");
      await rename(tmp,dest);
    }catch(e){await unlink(tmp).catch(()=>{});throw e;}
    console.log("Archived real "+entry.name+" screenshot: "+dest);
    return true;
  }finally{await page.close();}
}
export async function captureBriannaSites(){
  await mkdir(out,{recursive:true});
  if(await Promise.all(captures.map(e=>validExisting(join(out,e.file)))).then(v=>v.every(Boolean))){
    console.log("Both Brianna captures already archived locally; preserving snapshots.");
    return true;
  }
  const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||
    (existsSync("/usr/bin/chromium")?"/usr/bin/chromium":undefined);
  let browser;
  try{
    browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
    for(const entry of captures){
      try{await captureOne(browser,entry);}
      catch(e){console.warn("Brianna "+entry.name+" capture unavailable: "+e.message);}
    }
  }catch(e){
    console.warn("Browser unavailable for Brianna capture: "+e.message);
  }finally{await browser?.close();}
  const ok=(await Promise.all(captures.map(e=>validExisting(join(out,e.file))))).every(Boolean);
  console.log(ok?
    "Brianna original + redesign screenshots are ready for this Firebase build.":
    "Brianna captures incomplete; the website will show REAL direct site links, not a fake comparison.");
  return ok;
}
if(import.meta.url===new URL("file://"+resolve(process.argv[1]||"")).href)
  await captureBriannaSites();

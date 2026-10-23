// Public browser QA. Runs in GitHub Actions, never signs in or creates records.
import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {chromium} from "playwright-core";
import {templates} from "../shared/model.mjs";

const origin="https://aweconcepts.com";
const viewports=[
  {name:"iPhone-390",width:390,height:844,mobile:true},
  {name:"Android-360",width:360,height:800,mobile:true},
  {name:"Tablet-portrait",width:768,height:1024,mobile:true},
  {name:"Tablet-landscape",width:1024,height:768,mobile:false},
  {name:"Desktop-1440",width:1440,height:900,mobile:false},
];
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage","--no-sandbox"]});
const failures=[];
const softWarnings=[];
await mkdir("qa-browser-artifacts",{recursive:true});
async function testPage(page,url,label,{waitMs=250}={}){
  const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:25000});
  if(response?.status()!==200)failures.push(label+": HTTP "+(response?.status()||"no response"));
  await page.waitForTimeout(waitMs);
  const layout=await page.evaluate(()=>({
    client:document.documentElement.clientWidth,
    scroll:document.documentElement.scrollWidth,
    body:document.body.scrollWidth,
    missingAnchors:[...document.querySelectorAll('a[href^="#"]')]
      .map(link=>link.getAttribute("href"))
      .filter(href=>href.length>1&&!document.getElementById(href.slice(1)))
      .slice(0,4)
  }));
  const delta=layout.scroll-layout.client;
  if(delta>1)failures.push(label+": horizontal overflow "+delta+"px ("+layout.scroll+"/"+layout.client+")");
  if(layout.missingAnchors.length)failures.push(label+": missing fragment anchors "+layout.missingAnchors.join(","));
  console.log("QA",label,"HTTP",response?.status(),"horizontalOverflow",delta,"anchors",layout.missingAnchors.length);
  return layout;
}
try {
 // iPhone-size, touch scrolling with motion enabled: detect tab reloads and
 // silent jumps that responsive screenshots alone cannot identify.
 {
  const context=await browser.newContext({
    viewport:{width:390,height:844},isMobile:true,hasTouch:true,
    deviceScaleFactor:2,reducedMotion:"no-preference"
  });
  const page=await context.newPage();
  let mainNavigations=0;
  page.on("framenavigated",frame=>{if(frame===page.mainFrame())mainNavigations++;});
  await testPage(page,origin+"/","iPhone-390 scroll stability",{waitMs:850});
  const first=await page.evaluate(()=>{
    const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    window.scrollTo({top:Math.min(max-40,Math.max(950,max*.35)),behavior:"instant"});
    return scrollY;
  });
  if(first<500) failures.push("iPhone-390 scroll stability: could not enter the homepage");
  await page.waitForTimeout(8300); // Outlast the previous 6800ms autoplay interval.
  const after=await page.evaluate(()=>scrollY);
  if(after<first-120)failures.push("iPhone-390 unexpected upward reset from "+first+" to "+after);
  if(mainNavigations!==1)failures.push("iPhone-390 homepage navigated or reloaded "+mainNavigations+" times");
  const heroRenderer=await page.locator("#hero-art").getAttribute("data-renderer");
  if(heroRenderer)failures.push("iPhone-390 allocated unnecessary mobile 3D renderer: "+heroRenderer);
  console.log("SCROLL_STABILITY",JSON.stringify({first,after,mainNavigations,heroRenderer}));
  await context.close();
 }
 for(const size of viewports) {
  const context=await browser.newContext({
    viewport:{width:size.width,height:size.height},
    isMobile:size.mobile,hasTouch:size.mobile,deviceScaleFactor:size.mobile?2:1,
    reducedMotion:"reduce"
  });
  const page=await context.newPage();
  page.on("pageerror",error=>failures.push(size.name+" JS exception: "+error.message.slice(0,180)));
  page.on("console",msg=>{
    if(/GSAP target.*not found|InvalidStateError.*Transition|ViewTransition opt-in disabled/i.test(msg.text()))
      failures.push(size.name+" animation warning: "+msg.text().slice(0,180));
    else if(msg.type()==="error")softWarnings.push(size.name+": "+msg.text().slice(0,160));
  });
  await testPage(page,origin+"/",size.name+" homepage",{waitMs:650});
  assert.equal(await page.locator("#worlds-choices .worlds-choice").count(),20,
    size.name+": 20 template selectors should be available");
  const menu=page.locator("#menu-toggle");
  if(await menu.isVisible()){
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"),"true",size.name+": mobile menu did not open");
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"),"false",size.name+": mobile menu did not close");
  }
  if(size.width===360) {
    for(let i=0;i<20;i++){
      const selection=page.locator("#worlds-choices .worlds-choice").nth(i);
      const world=await selection.getAttribute("data-world");
      await selection.click();
      assert.equal(await selection.getAttribute("aria-pressed"),"true","Selected design must update state: "+world);
    }
  }
  await page.screenshot({path:"qa-browser-artifacts/"+size.name+"-homepage.png",fullPage:false});
  await testPage(page,origin+"/order.html",size.name+" builder",{waitMs:300});
  await testPage(page,origin+"/account.html",size.name+" account",{waitMs:250});
  await testPage(page,origin+"/admin.html",size.name+" owner login",{waitMs:250});
  await testPage(page,origin+"/contact.html",size.name+" contact",{waitMs:250});
  if(size.width===360||size.width===768){
    for(const entry of templates){
      const label=size.name+" template "+entry.id;
      await testPage(page,origin+"/templates/"+entry.id+".html",label,{waitMs:180});
      if(["afterhours","folio","atelier"].includes(entry.id)){
        await page.waitForTimeout(1100);
        await page.screenshot({path:"qa-browser-artifacts/"+size.name+"-"+entry.id+".png",fullPage:false});
      }
      // Exercise a real section link, not just existence of href/#target.
      const first=page.locator('nav[aria-label="Section navigation"] a[href^="#"]').first();
      if(await first.count()) {
        const href=await first.getAttribute("href");
        try {
          await first.click({timeout:4500});
          const hash=await page.evaluate(()=>decodeURIComponent(location.hash));
          if(hash!==href)failures.push(label+": section link navigated to "+hash+" instead of "+href);
          const target=await page.evaluate(h=>!!document.getElementById(h.slice(1)),href);
          if(!target)failures.push(label+": section link target missing "+href);
        } catch(error){
          failures.push(label+": section navigation click failed: "+String(error.message).slice(0,160));
        }
      } else failures.push(label+": missing template section navigation");
    }
  }
  if(size.width===1440){
    for(const template of ["afterhours","folio","atelier"]){
      await testPage(page,origin+"/templates/"+template+".html",size.name+" flagship "+template,{waitMs:1100});
      const firstFold=await page.evaluate(slug=>{
        const title=document.querySelector(slug==="folio"?".folio-words h1":slug==="afterhours"?".afterhours-words h1":".atelier-copy h1");
        const media=document.querySelector(slug==="folio"?".folio-picture .hero-media":slug==="afterhours"?".afterhours-screen > .hero-media":".atelier-photo .hero-media");
        const rect=el=>{const r=el?.getBoundingClientRect();return r?{top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null};
        return {title:rect(title),media:rect(media),viewport:innerHeight};
      },template);
      console.log("FLAGSHIP_FIRST_FOLD",template,JSON.stringify(firstFold));
      if(!firstFold.title||firstFold.title.top>firstFold.viewport-90||firstFold.title.bottom<0)
        failures.push("Desktop flagship "+template+": headline is below the first fold");
      if(!firstFold.media||firstFold.media.width<230||firstFold.media.height<270)
        failures.push("Desktop flagship "+template+": image area is undersized");
      await page.screenshot({path:"qa-browser-artifacts/"+size.name+"-"+template+".png",fullPage:false});
    }
  }
  await context.close();
 }
} finally {
 await browser.close();
}
console.log("Public browser QA warnings (nonfatal):",JSON.stringify(softWarnings.slice(0,10)));
if(failures.length){
 console.error("Browser QA findings:",JSON.stringify(failures,null,2));
 process.exitCode=1;
}else console.log("Public responsive and gallery browser QA passed for all requested viewports.");

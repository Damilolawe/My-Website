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
 // A clean desktop session must actually animate. Earlier QA only checked
 // screenshots/layout and allowed completely static GSAP/reveal experiences.
 {
  const context=await browser.newContext({
    viewport:{width:1440,height:900},reducedMotion:"no-preference",hasTouch:false
  });
  const page=await context.newPage();
  page.on("pageerror",error=>failures.push("Desktop homepage JS exception: "+error.message.slice(0,180)));
  // Each Playwright context starts with empty storage. Do not register an
  // init script: it would also erase the persisted-pause recovery test state.
  await testPage(page,origin+"/","Desktop-1440 motion smoke",{waitMs:700});
  const startup=await page.evaluate(()=>({
    gsap:!!window.gsap,scrollTrigger:!!window.ScrollTrigger,
    paused:!!window.AWE_MOTION_PAUSED,
    revealReady:document.documentElement.classList.contains("motion-ready"),
    activeTriggers:window.ScrollTrigger?.getAll?.().length||0,
    heroFrame:document.querySelector("#reel-index")?.textContent?.trim()||""
  }));
  console.log("DESKTOP_MOTION_START",JSON.stringify(startup));
  if(!startup.gsap||!startup.scrollTrigger||startup.activeTriggers<1)
    failures.push("Desktop motion: GSAP/ScrollTrigger are missing or have no active triggers");
  if(startup.paused||!startup.revealReady)
    failures.push("Desktop motion: unpaused session did not initialize reveal animations");
  await page.mouse.move(1,1);
  await page.waitForTimeout(7250);
  const nextFrame=await page.locator("#reel-index").textContent();
  if(nextFrame?.trim()===startup.heroFrame)
    failures.push("Desktop motion: automatic hero carousel did not advance");
  const card=page.locator(".pricing-card.reveal").first();
  const before=await card.evaluate(el=>getComputedStyle(el).opacity);
  // Force an immediate scroll: native CSS smooth scroll can still be in
  // flight when an opacity snapshot is sampled in headless Chrome.
  await card.evaluate(el=>{
    const y=el.getBoundingClientRect().top+scrollY-innerHeight*.3;
    window.scrollTo({top:y,behavior:"instant"});
  });
  await page.waitForTimeout(1150);
  const reveal=await card.evaluate(el=>({
    opacity:Number(getComputedStyle(el).opacity),
    inView:el.classList.contains("in-view"),
    top:el.getBoundingClientRect().top,
    scrollY:window.scrollY
  }));
  const after=String(reveal.opacity);
  console.log("DESKTOP_REVEAL",JSON.stringify({before,after,...reveal}));
  if(Number(before)>0.25||Number(after)<0.95)
    failures.push("Desktop reveal: pricing card did not fade/slide into view");
  await page.evaluate(()=>{localStorage.setItem("awe-motion","paused");});
  await page.reload({waitUntil:"domcontentloaded"});
  const recovery=await page.evaluate(()=>({
    paused:!!window.AWE_MOTION_PAUSED,
    visible:(()=>{const el=document.querySelector("#motion-resume");return !!el&&!el.hidden&&getComputedStyle(el).display!=="none"&&el.getBoundingClientRect().width>0;})(),
    text:document.querySelector("#motion-resume")?.textContent
  }));
  if(!recovery.paused||!recovery.visible)
    failures.push("Desktop motion: persisted pause has no discoverable enable control");
  await page.locator("#motion-resume").click();
  const resumed=await page.evaluate(()=>({
    paused:!!window.AWE_MOTION_PAUSED,
    revealReady:document.documentElement.classList.contains("motion-ready"),
    label:document.querySelector("#motion-toggle")?.textContent
  }));
  console.log("DESKTOP_MOTION_RESUME",JSON.stringify({recovery,resumed}));
  if(resumed.paused||!resumed.revealReady||resumed.label!=="PAUSE MOTION")
    failures.push("Desktop motion: enabling animations did not restore motion");
  await context.close();
 }
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
  if(size.width<=768){
    const heroFit=await page.evaluate(()=>{
      const q=s=>document.querySelector(s)?.getBoundingClientRect();
      const controls=q(".hero-art .showreel-controls"),footer=q(".hero-footer"),art=q(".hero-art"),deck=q(".showreel-deck");
      return {controlsBottom:controls?.bottom,footerTop:footer?.top,artBottom:art?.bottom,deckHeight:deck?.height};
    });
    if(heroFit.footerTop===undefined||heroFit.controlsBottom===undefined)
      failures.push(size.name+": missing showreel controls or footer");
    else if(heroFit.footerTop-heroFit.controlsBottom<20)
      failures.push(size.name+": showreel/footer collision "+Math.round(heroFit.footerTop-heroFit.controlsBottom)+"px clearance");
    if(heroFit.artBottom!==undefined&&heroFit.controlsBottom>heroFit.artBottom+1)
      failures.push(size.name+": showreel controls overflow outside hero art");
    console.log("MOBILE_HERO_CLEARANCE",size.name,JSON.stringify(heroFit));
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
        if(size.width===360){
          const fold=await page.evaluate(slug=>{
            const heading=document.querySelector(slug==="folio"?".folio-words h1":slug==="atelier"?".atelier-copy h1":".afterhours-words h1");
            const art=document.querySelector(slug==="folio"?".folio-picture .hero-media":slug==="atelier"?".atelier-photo .hero-media":".afterhours-screen > .hero-media");
            const nav=document.querySelector(".shell-header");
            const rect=el=>{const r=el?.getBoundingClientRect();return r?{top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null};
            const photoLabel=slug==="atelier"?document.querySelector(".atelier-photo .study-motto"):null;
            const photoCredit=slug==="atelier"?document.querySelector(".atelier-photo .study-credit"):null;
            return {title:rect(heading),photo:rect(art),nav:rect(nav),motto:rect(photoLabel),credit:rect(photoCredit),viewport:innerHeight};
          },entry.id);
          console.log("MOBILE_TEMPLATE_FIRST_FOLD",entry.id,JSON.stringify(fold));
          if(!fold.title||fold.title.top>fold.viewport-40)
            failures.push("Mobile "+entry.id+": headline starts below first screen");
          if(!fold.photo||fold.photo.top>fold.viewport-40)
            failures.push("Mobile "+entry.id+": photography not visible in first screen");
          if(entry.id==="folio"&&fold.photo&&fold.title&&fold.photo.bottom>fold.title.top-4)
            failures.push("Mobile Folio: cover image intersects headline instead of having its own space");
          if(fold.nav&&fold.photo&&fold.photo.top<fold.nav.bottom-2)
            failures.push("Mobile "+entry.id+": art overlaps navigation");
          if(entry.id==="afterhours" && fold.nav?.bottom>250)
            failures.push("Mobile After Hours: header consumes too much of the first viewport");
          if(entry.id==="atelier" && fold.nav?.bottom>240)
            failures.push("Mobile Atelier: header is too tall");
          if(entry.id==="atelier" && fold.credit&&fold.motto && fold.credit.top<fold.motto.bottom+8 && fold.credit.bottom>fold.motto.top)
            failures.push("Mobile Atelier: image credit overlaps its editorial caption");
          if(entry.id==="folio" && fold.nav?.bottom>235)
            failures.push("Mobile Folio: compact editorial masthead too tall");
        }
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

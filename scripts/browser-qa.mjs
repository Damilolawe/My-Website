// Public browser QA. Runs in GitHub Actions, never signs in or creates records.
import assert from "node:assert/strict";
import {mkdir, writeFile} from "node:fs/promises";
import {chromium} from "playwright-core";
import {templates} from "../shared/model.mjs";
import {templatePageCount} from "../shared/tiers.mjs";
import {uploadedDesignFor} from "../shared/uploaded-designs.mjs";
import {premiumStudyIds} from "../shared/premium-art-direction-35.mjs";

const origin="https://aweconcepts.com";
const viewports=[
  {name:"Narrow-320",width:320,height:700,mobile:true},
  {name:"Android-360",width:360,height:800,mobile:true},
  {name:"iPhone-375",width:375,height:812,mobile:true},
  {name:"iPhone-390",width:390,height:844,mobile:true},
  {name:"Wide-phone-430",width:430,height:932,mobile:true},
  {name:"Tablet-portrait",width:768,height:1024,mobile:true},
  {name:"Tablet-landscape",width:1024,height:768,mobile:false},
  {name:"Desktop-1440",width:1440,height:900,mobile:false},
  {name:"Wide-desktop-1920",width:1920,height:1080,mobile:false},
];
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage","--no-sandbox"]});
const failures=[];
const softWarnings=[];
const measurements=[];
const embeddedMeasurements=[];
let fatalError=null;
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
  measurements.push({label,url,status:response?.status()||0,width:layout.client,overflow:delta,missingAnchors:layout.missingAnchors});
  if(delta>1){
    const offenders=await page.evaluate(()=>[...document.querySelectorAll("*")].map(el=>({el,rect:el.getBoundingClientRect()})).filter(({rect})=>rect.right>innerWidth+2 && rect.width>0).slice(0,8).map(({el,rect})=>({element:el.tagName.toLowerCase()+"."+String(el.className||"").replace(/\s+/g,".").slice(0,60),right:Math.round(rect.right),width:Math.round(rect.width)})));
    console.log("QA_OVERFLOW_ELEMENTS",label,JSON.stringify(offenders));
    failures.push(label+": horizontal overflow "+delta+"px ("+layout.scroll+"/"+layout.client+")");
  }
  if(layout.missingAnchors.length)failures.push(label+": missing fragment anchors "+layout.missingAnchors.join(","));
  console.log("QA",label,"HTTP",response?.status(),"horizontalOverflow",delta,"anchors",layout.missingAnchors.length);
  return layout;
}
try {
 // Desktop motion must work even if a visitor's OS setting says Reduce Motion.
 {
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:"no-preference",hasTouch:false});
  const page=await context.newPage();
  page.on("pageerror",error=>failures.push("Desktop homepage JS exception: "+error.message.slice(0,180)));
  await testPage(page,origin+"/","Desktop-1440 motion smoke",{waitMs:800});
  const startup=await page.evaluate(()=>({
    gsap:!!window.gsap,scrollTrigger:!!window.ScrollTrigger,
    paused:!!window.AWE_MOTION_PAUSED,
    ready:document.documentElement.classList.contains("motion-ready"),
    triggers:window.ScrollTrigger?.getAll?.().length||0,
    frame:document.querySelector("#reel-index")?.textContent?.trim()||"",
    banner:!!document.querySelector("#motion-resume"),
    toggle:!!document.querySelector("#motion-toggle")
  }));
  console.log("DESKTOP_MOTION_START",JSON.stringify(startup));
  if(!startup.gsap||!startup.scrollTrigger||startup.triggers<2||!startup.ready||startup.paused||startup.banner||startup.toggle)
    failures.push("Desktop motion is disabled or still has unwanted controls");
  await page.mouse.move(2,2);
  await page.waitForTimeout(7100);
  let next=(await page.locator("#reel-index").textContent())?.trim();
  if(next===startup.frame){await page.waitForTimeout(1500);next=(await page.locator("#reel-index").textContent())?.trim();}
  if(next===startup.frame)failures.push("Desktop hero reel did not advance");
  const card=page.locator(".pricing-card.reveal").first();
  await card.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.33,behavior:"instant"}));
  await page.waitForTimeout(1150);
  const reveal=await card.evaluate(el=>({opacity:+getComputedStyle(el).opacity,visible:el.classList.contains("in-view")}));
  console.log("DESKTOP_REVEAL",JSON.stringify(reveal));
  if(!reveal.visible||reveal.opacity<.95)failures.push("Desktop pricing section never revealed");
  await page.evaluate(()=>{localStorage.setItem("awe-motion","paused");});
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForTimeout(900);
  const os=await page.evaluate(()=>({
    paused:!!window.AWE_MOTION_PAUSED,
    ready:document.documentElement.classList.contains("motion-ready"),
    banner:!!document.querySelector("#motion-resume"),
    hasToggle:!!document.querySelector("#motion-toggle"),
    osReduced:matchMedia("(prefers-reduced-motion: reduce)").matches,
    animation:getComputedStyle(document.querySelector(".hero") ,"::before").animationDuration
  }));
  console.log("DESKTOP_MOTION_REDUCED_OS",JSON.stringify(os));
  if(!os.osReduced||os.paused||!os.ready||os.banner||os.hasToggle)
    failures.push("Desktop animation incorrectly gated by old pause or OS setting");
  if(parseFloat(os.animation)<1)
    failures.push("Desktop decorative motion is disabled despite always-on studio mode");
  await context.close();
 }
 // AWE-QA-001 / 002 / 006 targeted visual and keyboard regression checks.
 {
  const context=await browser.newContext({viewport:{width:1363,height:936},hasTouch:false});
  const page=await context.newPage();
  await testPage(page,origin+"/templates/creative/daylight.html","AUDIT_DAYLIGHT",{waitMs:900});
  const contact=page.locator('nav[aria-label="Section navigation"] a[href="#contact"]').first();
  if(await contact.count()){
    try{
      await contact.click({timeout:5000});
      if(await page.evaluate(()=>location.hash)!=="#contact")
        failures.push("AUDIT_DAYLIGHT_CONTACT: blocked Contact link");
    }catch(e){failures.push("AUDIT_DAYLIGHT_CONTACT: "+String(e.message).slice(0,150));}
  }else{
    const state=await page.evaluate(()=>({
      contactSection:!!document.getElementById("contact"),
      emptyNote:!!document.querySelector(".contact-setup-note,.contact-emblem"),
      brokenAnchors:[...document.querySelectorAll('a[href="#contact"]')].length
    }));
    if(state.contactSection||state.emptyNote||state.brokenAnchors)
      failures.push("AUDIT_DAYLIGHT_CONTACT: Empty or unreachable contact panel remains");
  }
  console.log("AUDIT_DAYLIGHT_CONTACT",await page.evaluate(()=>({
    hash:location.hash,
    hasContactSection:!!document.getElementById("contact"),
    hasEmptyPlaceholder:!!document.querySelector(".contact-setup-note")
  })));
  await testPage(page,origin+"/templates/creative/signal.html","AUDIT_SIGNAL",{waitMs:500});
  await testPage(page,origin+"/templates/creative/afterhours.html","AUDIT_AFTERHOURS",{waitMs:900});
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
  assert.equal(await page.locator("#express-showcase").count(),0,size.name+": the gallery belongs in AWE Express, not the homepage");
  const menu=page.locator("#menu-toggle");
  if(await menu.isVisible()){
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"),"true",size.name+": mobile menu did not open");
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"),"false",size.name+": mobile menu did not close");
  }
  if(size.width<=768){
    const heroFit=await page.evaluate(()=>{
      const q=s=>document.querySelector(s)?.getBoundingClientRect();
      const legacyControls=q(".hero-art .showreel-controls");
      const universeControls=q(".awe-universe .universe-footer");
      const controls=document.documentElement.classList.contains("universe-ready")?universeControls:legacyControls;
      const footer=q(".hero-footer"),art=q(".hero-art"),deck=q(".showreel-deck");
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
  if(size.width===390){
    // Verify the flagship hero actually opens real, allowlisted template pages.
    const world=page.locator('#awe-universe [data-open-universe="runwayml"]');
    assert.equal(await world.count(),1,"Cinematic website world is present");
    await world.click();
    assert.equal(await page.locator('#universe-dialog').evaluate(el=>el.open),true,
      "Selecting a world should open the immersive browser preview");
    assert.equal(await page.locator('#universe-standalone').getAttribute("href"),"/templates/runwayml.html");
    await page.locator('[data-universe-device="mobile"]').click();
    assert.equal(await page.locator('#universe-preview-wrap').getAttribute("data-device"),"mobile");
    await page.keyboard.press("Escape");
    await page.locator('#universe-dialog').waitFor({state:"hidden",timeout:8000});
    assert.equal(await page.locator('#universe-dialog').evaluate(el=>el.open),false);
    // Walk the public brief without writing a production inquiry. The final
    // action must be explicit, and return contact details must be required.
    await page.locator("#brief-description").fill("I need a portfolio to show recent creative work.");
    await page.locator("#brief-next").click();
    await page.locator("#brief-next").click();
    assert.match(await page.locator("#brief-step-label").textContent(),/02 \/ 03/,
      "The brief must not advance without return contact details");
    await page.locator("#brief-name").fill("Browser QA");
    await page.locator("#brief-email").fill("browser-qa@example.test");
    await page.locator("#brief-next").click();
    assert.equal(await page.locator("#send-brief").isVisible(),true,
      "The review step needs an explicit send action");
    assert.match(await page.locator("#brief-summary").textContent(),/Browser QA/);
    await page.screenshot({path:"qa-browser-artifacts/"+size.name+"-inquiry-review.png",fullPage:false});
  }
  await testPage(page,origin+"/order.html",size.name+" builder",{waitMs:300});
  await testPage(page,origin+"/account.html",size.name+" account",{waitMs:250});
  await testPage(page,origin+"/admin.html",size.name+" owner login",{waitMs:250});
  await testPage(page,origin+"/contact.html",size.name+" contact",{waitMs:250});
  { // Every template at every required viewport, including desktop navigation.
    for(const entry of templates){
      const label=size.name+" template "+entry.id;
      await testPage(page,origin+"/templates/"+entry.id+".html",label,{waitMs:180});
      if(["afterhours","folio","atelier"].includes(entry.id)){
        if(size.width===360){
          const fold=await page.evaluate(slug=>{
            const heading=document.querySelector(slug==="folio"?".fe-hero h1":slug==="atelier"?".atelier-copy h1":".md-afterhours-hero h1");
            const art=document.querySelector(slug==="folio"?".fe-cover":slug==="atelier"?".atelier-photo .hero-media":".md-afterhours-hero .md-media");
            const nav=document.querySelector(slug==="folio"?".fe-header":".shell-header");
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
          if(entry.id==="folio"&&fold.photo&&fold.title&&fold.photo.top<fold.title.bottom+8)
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
      }
      if(size.width===360){
        await page.waitForTimeout(450);
        await page.screenshot({path:"qa-browser-artifacts/template-phone-"+entry.id+".jpg",type:"jpeg",quality:76,fullPage:false});
      }
      // Exercise a real section link, not just existence of href/#target.
      // Test each template's ACTUAL navigation. The Runway cinematic edition
      // has a real mobile details menu and its Signature edition links pages.
      const menu=page.locator(".rw-menu:visible:not([open]) > summary, .trio-menu:visible:not([open]) > summary");
      if(await menu.count()) await menu.click();
      const first=page.locator('nav[aria-label="Section navigation"] a[href^="#"]:visible, nav[aria-label="Primary navigation"] a[href^="#"]:visible, nav[aria-label="Main navigation"] a[href^="#"]:not([href="#main"]):visible, nav[aria-label="Main navigation"] a[href^="/templates/"]:visible, .rw-menu nav a[href^="#"]:visible, .rw-menu nav a[href^="/experiments/runwayml-multipage/"]:visible, .rw-header-nav a[href^="/experiments/runwayml-multipage/"]:visible, .trio-menu nav a[href^="#"]:visible').first();
      if(await first.count()) {
        const href=await first.getAttribute("href");
        try {
          await first.click({timeout:4500});
          if(href.startsWith("#")){
            const hash=await page.evaluate(()=>decodeURIComponent(location.hash));
            if(hash!==href)failures.push(label+": section link navigated to "+hash+" instead of "+href);
            const target=await page.evaluate(h=>!!document.getElementById(h.slice(1)),href);
            if(!target)failures.push(label+": section link target missing "+href);
          }else{
            const path=await page.evaluate(()=>location.pathname);
            if(path!==href.split("#")[0])failures.push(label+": multipage link navigated to "+path+" instead of "+href);
          }
        } catch(error){
          failures.push(label+": section navigation click failed: "+String(error.message).slice(0,2500));
        }
      } else failures.push(label+": missing template section navigation");
    }
  }
  if(size.width===1440){
    for(const {id:template} of templates){
      await testPage(page,origin+"/templates/"+template+".html",size.name+" template "+template,{waitMs:["afterhours","folio","atelier"].includes(template)?1100:450});
      if(["afterhours","folio","atelier"].includes(template)){
       const firstFold=await page.evaluate(slug=>{
        const title=document.querySelector(slug==="folio"?".fe-hero h1":slug==="afterhours"?".md-afterhours-hero h1":".atelier-copy h1");
        const media=document.querySelector(slug==="folio"?".fe-cover":slug==="afterhours"?".md-afterhours-hero .md-media":".atelier-photo .hero-media");
        const rect=el=>{const r=el?.getBoundingClientRect();return r?{top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null};
        return {title:rect(title),media:rect(media),viewport:innerHeight};
      },template);
      console.log("FLAGSHIP_FIRST_FOLD",template,JSON.stringify(firstFold));
      if(!firstFold.title||firstFold.title.top>firstFold.viewport-90||firstFold.title.bottom<0)
        failures.push("Desktop flagship "+template+": headline is below the first fold");
      if(!firstFold.media||firstFold.media.width<230||firstFold.media.height<270)
        failures.push("Desktop flagship "+template+": image area is undersized");
      }
      await page.screenshot({path:"qa-browser-artifacts/template-desktop-"+template+".jpg",type:"jpeg",quality:76,fullPage:false});
    }
  }
  await context.close();
 }
 // Re-audit: exercise actual narrow CSS viewports, not a 360px CSS thumbnail
 // inside a browser viewport of some unrelated width.
 for(const width of [320,345,360,375]){
  const context=await browser.newContext({viewport:{width,height:812},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  const page=await context.newPage();
  for(const {id} of templates){
   await page.goto(origin+"/templates/"+id+".html",{waitUntil:"domcontentloaded",timeout:25000});
   await page.waitForTimeout(130);
   const geometry=await page.evaluate(()=>{
    const all=[...document.querySelectorAll(".case-image")].slice(0,4).map(el=>{
      const r=el.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width};
    });
    const hero=document.querySelector(".hero-variant h1, .fd-hero h1, .rw-hero h1, .fe-hero h1");
    const h=hero?.getBoundingClientRect();
    const contact=document.querySelector("#contact .architect-contact-links, #contact .lm-contact-links, #contact .fd-contact, #contact.rw-manifesto, #contact.contact");
    const setup=document.querySelector("#contact .contact-setup-note");
    return {width:innerWidth,docWidth:document.documentElement.scrollWidth,
      heading:h?{left:h.left,right:h.right,width:h.width,fontSize:getComputedStyle(hero).fontSize,tracking:getComputedStyle(hero).letterSpacing,lineHeight:getComputedStyle(hero).lineHeight}:null,
      typographyGuard:!!document.querySelector('style[data-awe-typography="readability"]'),
      cards:all,contactText:contact?.textContent?.trim()||setup?.textContent?.trim()||"",
      contactLinks:contact?.querySelectorAll("a").length||0,
      authoredScenes:document.querySelectorAll(".art-scene").length,
      authoredChapters:document.querySelectorAll(".md-edition-break").length,
      contactSection:!!document.getElementById("contact"),
      contactPageLink:!!document.querySelector('nav a[href$="/contact.html"]'),
      repetitiveElements:document.querySelectorAll(".experience-interlude,.md-edition-break,.contact-emblem,.contact-setup-note,.story-art,.story-opening,.chapter-num,.chapter-kicker").length,
      folioVerified:!!document.querySelector(".fe-cover") && document.querySelectorAll(".fe-project").length>=3 && !!document.querySelector(".fe-process")};
   });
   console.log("NARROW_TEMPLATE",width,id,JSON.stringify(geometry));
   if(id==="folio"&&!geometry.folioVerified)
     failures.push("Narrow "+width+" folio: approved editorial cover, projects or process missing");
   else if(id!=="folio"&&uploadedDesignFor(id)&&premiumStudyIds.includes(id)&&geometry.authoredScenes!==1)
     failures.push("Narrow "+width+" "+id+": original source art scene is missing");
   if(premiumStudyIds.includes(id)&&(geometry.authoredChapters!==0||geometry.repetitiveElements>0))
     failures.push("Narrow "+width+" "+id+": generic filler element reintroduced");
   if(id!=="folio"&&uploadedDesignFor(id)&&!premiumStudyIds.includes(id)&&(geometry.authoredScenes!==1||geometry.authoredChapters!==1))
     failures.push("Narrow "+width+" "+id+": protected authored scene or chapter missing");
   if(geometry.width>width+2 || geometry.docWidth>width+2){
     const offenders=await page.evaluate(()=>[...document.querySelectorAll("*")]
       .map(el=>({selector:el.tagName.toLowerCase()+"."+String(el.className||"").replace(/\s+/g,".").slice(0,70),
         rect:el.getBoundingClientRect()}))
       .filter(x=>x.rect.right>innerWidth+2||x.rect.left< -2)
       .slice(0,12).map(x=>({selector:x.selector,left:Math.round(x.rect.left),right:Math.round(x.rect.right)})));
     console.log("NARROW_OVERFLOW_ELEMENTS",width,id,JSON.stringify(offenders));
     failures.push("Narrow "+width+" "+id+": horizontal page clipping/overflow");
   }
   if(!geometry.heading||geometry.heading.left< -1||geometry.heading.right>width+1)
     failures.push("Narrow "+width+" "+id+": headline clipped beyond visible viewport ("+
       (geometry.heading?.left??"missing")+".."+(geometry.heading?.right??"missing")+")");
   // Visual-typography regression: check computed pixels, not merely CSS source.
   if(!["liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"].includes(id)){
     if(!geometry.typographyGuard)failures.push("TYPOGRAPHY_GUARD "+width+" "+id+": readable CSS missing");
     const fs=Number.parseFloat(geometry.heading?.fontSize),tr=Number.parseFloat(geometry.heading?.tracking),lh=Number.parseFloat(geometry.heading?.lineHeight);
     if(Number.isFinite(fs)&&Number.isFinite(tr)&&tr < -fs*.065)
       failures.push("TYPOGRAPHY_TRACKING "+width+" "+id+": compressed letters "+tr+"px for "+fs+"px font");
     if(Number.isFinite(fs)&&Number.isFinite(lh)&&lh < fs*.96)
       failures.push("TYPOGRAPHY_LINE_HEIGHT "+width+" "+id+": colliding line boxes "+lh+"px for "+fs+"px font");
   }
   for(const card of geometry.cards)
     if(card.right>width+4||card.left< -5||card.width>width+5)
       failures.push("Narrow "+width+" "+id+": case image exceeds viewport");
   if(premiumStudyIds.includes(id)){
     if(geometry.contactSection&&!geometry.contactLinks)
       failures.push("Narrow "+width+" "+id+": empty contact section must not render");
   }else if(templatePageCount(id)===5 && id!=="runwaymulti"){
     // Five-page designs keep contact on contact.html, not each homepage.
     // Regress both discoverable navigation and the actual separate document.
     if(!geometry.contactPageLink)
       failures.push("Narrow "+width+" "+id+": missing link to contact page");
     if(width===320){
       const route=origin+"/templates/"+id+"/contact.html";
       const response=await page.goto(route,{waitUntil:"domcontentloaded",timeout:25000});
       const contact=await page.evaluate(()=>{
         const el=document.querySelector("#contact.contact");
         return {present:!!el,links:el?.querySelectorAll("a[href]").length||0,text:el?.textContent?.trim()||""};
       });
       if(response?.status()!==200||!contact.present||
          (!contact.links&&!/add your own email|add a contact email|contact method|contact link|contact details will be added/i.test(contact.text)))
         failures.push("Narrow "+width+" "+id+": five-page contact document missing or empty");
     }
   }else if(!geometry.contactLinks&&!/add your own email|add a contact email|contact method|contact link|contact details will be added/i.test(geometry.contactText))
     failures.push("Narrow "+width+" "+id+": contact section offers no action or setup message");
  }
  // The embedded theater is narrower than the physical phone; verify that
  // its *real inner frame width* also keeps essential content inside view.
  if(width===320||width===360){
    await page.goto(origin+"/order.html",{waitUntil:"domcontentloaded",timeout:25000});
    await page.locator("[data-tier=starter]").click();
    await page.locator('#worlds-choices [data-world="afterhours"]').click();
    await page.locator("#express-showcase").scrollIntoViewIfNeeded();
    await page.locator("#worlds-mobile").click();
    await page.locator("#worlds-loading").waitFor({state:"hidden",timeout:18000});
    const inside=page.frameLocator("#worlds-frame");
    await inside.locator(".site-architecture").waitFor({state:"visible",timeout:12000});
    const inner=await inside.locator("body").evaluate(()=>{
      const w=innerWidth;
      const rect=el=>{if(!el)return null;const r=el.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width};};
      const heading=document.querySelector(".hero-variant h1");
      const cards=[...document.querySelectorAll(".case-image")].slice(0,3).map(rect);
      return {width:w,docWidth:document.documentElement.scrollWidth,title:rect(heading),cards};
    });
    console.log("NESTED_PHONE_THEATER",width,JSON.stringify(inner));
    if(inner.docWidth>inner.width+2)
      failures.push("Nested phone "+width+": embedded document overflows by "+(inner.docWidth-inner.width));
    if(!inner.title||inner.title.left< -1||inner.title.right>inner.width+1)
      failures.push("Nested phone "+width+": cinematic headline clipped");
    for(const card of inner.cards)if(card.left< -4||card.right>inner.width+4)
      failures.push("Nested phone "+width+": case card clipped at "+Math.round(card.left)+"/"+Math.round(card.right));
  }
  await context.close();
 }
 // Gallery should reveal a complete cinematic first impression and never
 // report a new preview name while its old HTML is still visible.
 {
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  await page.goto(origin+"/order.html",{waitUntil:"domcontentloaded"});
  await page.locator("[data-tier=starter]").click();
  await page.locator("#express-showcase").scrollIntoViewIfNeeded();
  assert.equal(await page.locator("#worlds-choices .worlds-choice").count(),78,"Starter should show exactly 78 one-page designs");
  await page.locator("#worlds-search").fill("after hours");
  assert.equal(await page.locator("#worlds-choices .worlds-choice:visible").count(),1,"Express design search must filter designs");
  await page.locator("#worlds-choices .worlds-choice:visible").click();
  await page.locator("#worlds-loading").waitFor({state:"hidden",timeout:18000});
  assert.equal(await page.locator("#worlds-name").textContent(),"After Hours");
  await page.locator("#worlds-search").fill("");
  await page.waitForTimeout(2100);
  await page.locator("#worlds-desktop").click();
  await page.waitForTimeout(300);
  const desktop=await page.evaluate(()=>{
    const frame=document.querySelector("#worlds-frame");
    const view=document.querySelector(".worlds-view");
    return {frameHeight:frame.getBoundingClientRect().height,viewHeight:view.getBoundingClientRect().height,
      loading:document.querySelector("#worlds-loading")?.hidden};
  });
  const decoration=await page.locator(".worlds-accent").count()?await page.locator(".worlds-accent").evaluate(el=>getComputedStyle(el).display):"none";
  console.log("AUDIT_THEATER_ORNAMENT",decoration);
  if(decoration!=="none")failures.push("Theater ornament still crowds the device controls");
  console.log("AUDIT_THEATER_DESKTOP",JSON.stringify(desktop));
  if(desktop.viewHeight<630||desktop.frameHeight<630)
    failures.push("Theater desktop first impression too short");
  await page.locator("#worlds-mobile").click();
  await page.waitForTimeout(160);
  const mobile=await page.evaluate(()=>{
    const frame=document.querySelector("#worlds-frame");
    return {height:frame.getBoundingClientRect().height,width:frame.getBoundingClientRect().width};
  });
  console.log("AUDIT_THEATER_MOBILE",JSON.stringify(mobile));
  if(mobile.height<760||mobile.width<320||mobile.width>380)
    failures.push("Theater mobile viewport is cropped or not a true mobile width");
  let currentTier="starter";
  for(const mode of ["desktop","mobile"]){
    await page.locator("#worlds-"+mode).click();
    const single=templates.filter(t=>templatePageCount(t.id)===1);
    const multi=templates.filter(t=>templatePageCount(t.id)===5);
    for(const entry of [...single,...multi]){
      const desired=templatePageCount(entry.id)===5?"signature":"starter";
      if(currentTier!==desired){
        await page.locator('[data-switch-tier="'+desired+'"]').click();
        currentTier=desired;
        await page.waitForFunction(expected=>document.querySelectorAll("#worlds-choices .worlds-choice").length===expected,desired==="signature"?38:78);
        const count=await page.locator("#worlds-choices .worlds-choice").count();
        assert.equal(count,desired==="signature"?38:78,"Tier gallery contains only the expected page count");
      }
      const label="Embedded "+mode+" "+entry.id;
      try{
        await page.locator('#worlds-choices [data-world="'+entry.id+'"]').click();
        await page.locator("#worlds-loading").waitFor({state:"hidden",timeout:18000});
        const inside=page.frameLocator("#worlds-frame");
        await inside.locator("body").waitFor({state:"visible",timeout:12000});
        if(desired==="signature"&&entry.id.startsWith("md-")){
          const tabs=page.locator(".worlds-page-list button");
          if(await tabs.count()!==5)throw Error("Five-page preview controls missing");
          await tabs.nth(1).click();
          await page.locator("#worlds-loading").waitFor({state:"hidden",timeout:18000});
          if(await tabs.nth(1).getAttribute("aria-pressed")!=="true")throw Error("Work page preview was not selected");
          embeddedMeasurements.push({id:entry.id,mode,status:"pass",page:"work"});
          continue;
        }
        const menu=inside.locator('.rw-menu:not([open]) > summary:visible,.trio-menu:not([open]) > summary:visible');
        if(await menu.count())await menu.first().click();
        const link=inside.locator('nav a[href^="about:srcdoc#"]:not([href="about:srcdoc#main"]):visible').first();
        if(!await link.count())throw Error("No usable in-frame section navigation");
        const href=await link.getAttribute("href");
        // The desktop theater scales a 1280px iframe; keyboard activation verifies
        // the link without Playwright miscalculating its transformed click point.
        await link.press("Enter",{timeout:5000});
        const hash=await inside.locator("body").evaluate(()=>location.hash);
        if(hash!==new URL(href).hash)throw Error("Frame navigated to "+hash+" instead of "+href);
        embeddedMeasurements.push({id:entry.id,mode,status:"pass",hash});
        console.log("EMBEDDED_NAV",mode,entry.id,"PASS",hash);
      }catch(error){
        embeddedMeasurements.push({id:entry.id,mode,status:"fail",error:String(error.message)});
        failures.push(label+": "+String(error.message).slice(0,2500));
      }
    }
  }
  await context.close();
 }
} catch(error) {
 fatalError=String(error.stack||error);
 failures.push(fatalError);
} finally {
 await writeFile("qa-browser-artifacts/results.json",JSON.stringify({testedAt:new Date().toISOString(),commit:process.env.GITHUB_SHA||null,measurements,embeddedMeasurements,failures,softWarnings,fatalError},null,2));
 await browser.close();
}
console.log("Public browser QA warnings (nonfatal):",JSON.stringify(softWarnings.slice(0,10)));
if(failures.length){
 console.error("Browser QA findings:",JSON.stringify(failures,null,2));
 process.exitCode=1;
}else console.log("Public responsive and gallery browser QA passed for all requested viewports.");


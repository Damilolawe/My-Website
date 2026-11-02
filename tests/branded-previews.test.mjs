import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { KAPPO_PAGES } from "../scripts/rewrite-kappo-preview-urls.mjs";
import { detailSlugs } from "../preview/pace-sbdc/deep-content.mjs";
import { mediaSlugs } from "../preview/pace-sbdc/media-content.mjs";

const root = "branded-previews/";
const read = async path => readFile(root + path, "utf8");
const expectedFiles = ["404.html", "index.html", "robots.txt", "kappo-sono/styles.css", "kappo-sono/site.js", ...KAPPO_PAGES.map(name=>"kappo-sono/"+name),"otaku-haven/index.html","otaku-haven/styles.css","otaku-haven/site.js","shotsbyriq/index.html","shotsbyriq/styles.css","shotsbyriq/site.js","shotsbyriq/import-status.json","jay-millz-shot-em/index.html","jay-millz-shot-em/styles.css","jay-millz-shot-em/site.js","jay-millz-shot-em/import-status.json", ...["index","services","about","stories","events","resources","contact","team","teambio","locations","library","media","partners","spanish",...detailSlugs,...mediaSlugs].map(name=>"pace-sbdc/"+name+".html"),"pace-sbdc/styles.css","pace-sbdc/site.js"].sort();

test("branded previews build exactly the allowlisted independent public concepts", async () => {
 execFileSync(process.execPath, ["scripts/build-branded-previews.mjs"], {stdio:"pipe"});
 const actual = [];
 const walk = async (base, prefix="") => {
  for (const entry of await readdir(base,{withFileTypes:true})) {
   const rel = prefix + entry.name;
   if(entry.isDirectory()) await walk(base + "/" + entry.name, rel + "/");
   else actual.push(rel);
  }
 };
 await walk(root+"public");
 assert.deepEqual(actual.filter(path=>!path.startsWith("shotsbyriq/photos/")&&!path.startsWith("jay-millz-shot-em/photos/")).sort(),expectedFiles);
 assert.ok(actual.every(path=>!path.includes("admin/")&&!path.includes("orders/")),"Private content must not enter the isolated preview");
 const landing=await read("public/index.html");
 assert.match(landing,/href="\/otaku-haven\/"/);
 assert.match(landing,/href="\/kappo-sono\/"/);
 assert.match(landing,/independent design studies/);
 assert.match(landing,/href="\/shotsbyriq"/);
 assert.match(landing,/href="\/jay-millz-shot-em\/"/);
 assert.match(landing,/href="\/pace-sbdc\/"/);
 assert.match(landing,/noindex,nofollow/);
 assert.equal(await read("public/robots.txt"),"User-agent: *\nDisallow: /\n");
});

test("restaurant pages resolve logo, navigation, script and CSS on branded host", async () => {
 for(const name of KAPPO_PAGES){
  const html = await read("public/kappo-sono/"+name);
  assert.match(html,/href="\/kappo-sono\/styles.css\?v=motion-20261102"/);
  assert.match(html,/href="\/kappo-sono\/"/);
  assert.doesNotMatch(html,/\b(?:href|src)="\/(?:styles\.css|site\.js|menu\.html|story\.html|gallery\.html|visit\.html)"/);
  assert.match(html,/noindex/);
  if(name !== "404.html"){
   assert.match(html,/src="\/kappo-sono\/site.js\?v=motion-20261102"/);
   for(const page of ["menu","story","gallery","visit"])
    assert.ok(html.includes('href="/kappo-sono/'+page+'.html"'),name+" missing "+page);
  }
 }
});

test("photographer editorial imports real Instagram post photographs with original source attribution",async()=>{
 const html=await read("public/shotsbyriq/index.html");
 const css=await read("public/shotsbyriq/styles.css");
 const js=await read("public/shotsbyriq/site.js");
 const source=JSON.parse(await readFile("preview/shotsbyriq/instagram-sources.json","utf8"));
 const status=JSON.parse(await read("public/shotsbyriq/import-status.json"));
 assert.equal(source.images.length,9);
 assert.equal(status.requested,9);
 assert.equal(status.count,9,"Never publish a partial/broken photographer portfolio");
 assert.ok(status.assets.every(asset=>asset.imported && asset.bytes>4000));
 assert.ok(status.assets.every(asset=>["original-instagram-post","published-photo-snapshot"].includes(asset.source)));
 assert.match(html,/UNOFFICIAL DESIGN STUDY BY/);
 assert.match(html,/app\.acuityscheduling\.com\/schedule\/18b40bc9/);
 assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
 assert.match(html,/noindex,nofollow/);
 assert.match(html,/id="lightbox"/);
 assert.match(html,/href="\/shotsbyriq\/styles\.css\?v=motion-20261102"/);
 assert.match(html,/src="\/shotsbyriq\/site\.js\?v=motion-20261102"/);
 assert.match(html,/data-category="creative"/);
 assert.match(html,/data-category="editorial"/);
 assert.match(html,/id="booking-info"/);
 assert.match(html,/STRICT NO-REFUND POLICY/);
 assert.match(html,/BROOKLYN, NY/);
 assert.match(html,/MONDAY THROUGH SUNDAY/i);
 assert.match(html,/48 hours/i);
 assert.match(html,/3–14 days/);
 assert.match(html,/24 hours/);
 assert.match(html,/7 days/);
 assert.match(html,/\$50 fee/);
 assert.match(html,/\$100/);
 assert.doesNotMatch(html,/schedule\.php\?owner=30252037/);
 assert.match(css,/#101014/);
 assert.match(css,/booking-brief/);
 // Regression coverage for phone recording: no clipped long editorial word
 // and no illegible rotated BY glyph in the header/footer branding.
 assert.match(html,/class="headline-long">PERSONALITY\.<\/span>/);
 assert.match(css,/\.spread-copy h2 \.headline-long\{font-size:clamp\(25px,8\.25vw,54px\)/);
 assert.match(html,/class="footer-logo" aria-label="SHOTSBYRIQ, back to top"/);
 assert.match(html,/class="footer-by">BY<\/span>RIQ/);
 assert.match(css,/\.logo small\{[^}]*transform:none;/);
 assert.match(css,/\.brief-rule p\{font-size:14px;line-height:1\.78\}/);
 assert.match(css,/\.archive \.frame img\{filter:brightness\(\.96\)/);
 assert.doesNotMatch(html,/class="footer-logo">S<span>\/<\/span>RIQ/);
 assert.match(css,/\/\* BLUE HOUR/,"Blue Hour photographer theme should load after legacy dark theme");
 assert.match(css,/--blue:#4c6fff/,"Primary highlight should be cobalt blue");
 assert.match(css,/--accent-soft:#86a3ff/,"Secondary highlight should be cool blue");
 assert.match(css,/\.nav-book,\.cover-cta a,\.booking-link\{background:#4c6fff;color:#fff\}/,"All primary booking/hero CTAs use blue");
 assert.match(css,/\.brief-head h2 i\{color:#aec2ff\}/,"Booking policy headlines use blue");
 // Editorial hero must be an actual five-image contact-sheet collage.
 // The oversized headline belongs in a separate text panel on every viewport.
 assert.match(html,/<h1 id="cover-heading">BE<br><em>SEEN<span class="endmark">\.<\/span><\/em><\/h1>/);
 assert.match(html,/<span>SHOTSBYRIQ \/ PORTRAIT PHOTOGRAPHY<\/span>/);
 assert.match(html,/<span>BROOKLYN \/ NYC<\/span>/);
 assert.match(html,/<meta property="og:title" content="SHOTSBYRIQ \| Portraits in Focus">/);
 assert.doesNotMatch(html,/THE(?:<br>|\s+)<em>IMAGE<\/em>|THE IMAGE ISSUE|THE PHOTOGRAPHY ISSUE/);
 assert.equal([...html.matchAll(/class="hero-shot hero-shot--/g)].length,5,"Exactly five real photos make up the hero collage");
 for(const id of ["0","4","2","7","6"]){
  assert.match(html,new RegExp('data-open-photo="'+id+'"'));
 }
 assert.match(html,/class="hero-collage"/);
 assert.match(html,/class="cover-deck"/);
 assert.match(html,/class="film-ticker"/);
 assert.match(html,/class="cover-bottomline"/);
 assert.match(css,/\/\* RIQ \/ VOLUME 01/);
 assert.match(css,/@keyframes riq-mosaic-enter/);
 assert.match(css,/@keyframes riq-endless-contact/);
 const collageCss=css.slice(css.lastIndexOf("/* RIQ / VOLUME 01"));
 assert.match(collageCss,/grid-template-columns:repeat\(12,minmax\(0,1fr\)\)/);
 assert.match(collageCss,/@media\(max-width:760px\)\{\s*\.cover\{\s*display:flex;/,"Mobile collage must stack above the separate headline, not cover a face");
 assert.match(collageCss,/\.cover-type\{[\s\S]*?order:1;[\s\S]*?background:/);
 assert.match(collageCss,/\.cover-cta\{[\s\S]*?pointer-events:auto;/,"Keep the booking/gallery CTA usable on phones");
 assert.match(collageCss,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(js,/querySelectorAll\('\[data-open-photo\]'\)/);
 assert.match(js,/filterView\('all'\);\s*open\(tile\)/);
 assert.match(html,/SEE ORIGINAL POST/);
 assert.ok(source.images.every(p=>p.post.startsWith("https://www.instagram.com/shotsbyriq_/p/")));
 assert.ok(source.images.every(p=>html.includes("/shotsbyriq/photos/"+p.file)),"Every photograph should be a stable first-party hosted import");
 assert.ok(source.images.every(p=>!html.includes(p.url)),"Do not leave expiring signed Instagram CDN URLs in the published page");
 assert.match(css, /contact-sheet/);assert.match(js,/ArrowRight/);
 assert.doesNotMatch(html,/data:image\/webp;base64/);
 assert.doesNotMatch(html,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF]/u);
});

test("photographer links, booking routes, gallery destinations, and social preview assets remain valid", async () => {
 const html=await read("public/shotsbyriq/index.html");
 const js=await read("public/shotsbyriq/site.js");
 const manifest=JSON.parse(await readFile("preview/shotsbyriq/instagram-sources.json","utf8"));
 const base="https://preview.aweconcepts.com/shotsbyriq";
 const booking="https://app.acuityscheduling.com/schedule/18b40bc9";
 const profile="https://www.instagram.com/shotsbyriq_/";
 const originalPosts=new Set(manifest.images.map(photo=>photo.post));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(new Set(ids).size,ids.length,"Duplicate section IDs break navigation");
 const anchors=[...html.matchAll(/<a\b[^>]*>/g)].map(match=>match[0]);
 assert.ok(anchors.length>=25,"Missing expected navigation, booking and attribution links");
 const destinations=new Set();
 for(const anchor of anchors){
  const href=anchor.match(/\bhref="([^"]+)"/)?.[1];
  assert.ok(href,"Every anchor must have a usable href: "+anchor);
  destinations.add(href);
  assert.doesNotMatch(href,/^(?:javascript:|data:|http:|\/\/)/i);
  if(href.startsWith("#")){
   assert.ok(href.length>1&&ids.includes(href.slice(1)),"Missing on-page section for "+href);
  }else{
   const url=new URL(href);
   assert.equal(url.protocol,"https:");
   assert.ok(["aweconcepts.com","app.acuityscheduling.com","www.instagram.com"].includes(url.host),"Unexpected or mistyped outbound host: "+href);
   if(url.host==="app.acuityscheduling.com")assert.equal(href,booking,"Use the photographer's current direct booking URL");
   if(url.host==="www.instagram.com")assert.ok(href===profile||originalPosts.has(href),"Use a verified photographer profile or original post");
   if(url.host==="aweconcepts.com")assert.equal(href,"https://aweconcepts.com/");
  }
  if(/target="_blank"/.test(anchor))assert.match(anchor,/rel="noopener noreferrer"/,"Off-site links must be safe in new tabs");
 }
 for(const id of ["top","archive","approach","sessions","booking-info","contact","content"]){
  assert.ok(destinations.has("#"+id),"Missing expected navigation link to #"+id);
 }
 for(const href of [booking,profile,"https://aweconcepts.com/"])assert.ok(destinations.has(href),"Missing key public action "+href);
 const gallery=[...html.matchAll(/<button\b[^>]*class="frame frame--\d+"[^>]*data-category="([^"]+)"[^>]*data-photo="(\d+)"[^>]*>/g)];
 assert.equal(gallery.length,manifest.images.length,"Photo buttons must map to every imported image");
 const dynamicPosts=[...js.matchAll(/\{label:'([^']+)',post:'([^']+)'\}/g)];
 assert.equal(dynamicPosts.length,manifest.images.length,"Photo-viewer original-post links must match all gallery images");
 gallery.forEach((match,i)=>{
  const item=manifest.images[i];
  assert.equal(Number(match[2]),i,"Photo button index mismatch");
  assert.equal(match[1],item.category,"Gallery filter mismatch");
  assert.equal(dynamicPosts[i][1],item.label,"Photo viewer title mismatch");
  assert.equal(dynamicPosts[i][2],item.post,"Original Instagram post link mismatch");
  assert.ok(html.includes("/shotsbyriq/photos/"+item.file),"Missing local gallery photo");
 });
 const filterCategories=[...html.matchAll(/<button\b[^>]*data-filter="([^"]+)"/g)].map(match=>match[1]);
 assert.ok(filterCategories.includes("all"));
 assert.deepEqual(new Set(filterCategories.filter(x=>x!=="all")),new Set(manifest.images.map(p=>p.category)),"Every category should have a filter");
 assert.match(js,/menuButton\?\.addEventListener\('click'/,"Mobile menu must respond to taps");
 assert.match(js,/menu\?\.querySelectorAll\('a'\)/,"Mobile menu must close after navigation");
 assert.match(js,/modalPost\.href=p\.post/,"Lightbox must navigate to the selected original post");
 const srcs=[...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match=>match[1]);
 assert.ok(srcs.length>=9,"Expected all locally hosted photographs");
 for(const src of srcs)assert.ok(src.startsWith("/shotsbyriq/photos/"),"Unstable external image source: "+src);
 assert.match(html,/<meta property="og:url" content="https:\/\/preview\.aweconcepts\.com\/shotsbyriq">/);
 assert.match(html,/<meta property="og:image" content="https:\/\/preview\.aweconcepts\.com\/shotsbyriq\/photos\/golden-era-01\.jpg">/);
 assert.match(html,/<meta name="twitter:image" content="https:\/\/preview\.aweconcepts\.com\/shotsbyriq\/photos\/golden-era-01\.jpg">/);
 assert.doesNotMatch(html,/<meta property="og:image" content="https:\/\/(?:scontent|instagram)\./,"Social-share photo must not expire");
 assert.ok(base.length>0);
});

test("preview Firebase target is separate from production and not a private draft deployment", async () => {
 const production = JSON.parse(await readFile("firebase.json","utf8"));
 assert.equal(production.hosting.public,"dist");
 assert.equal(production.hosting.target,undefined);
 const config=JSON.parse(await read("firebase.json"));
 const rc=JSON.parse(await read(".firebaserc"));
 assert.equal(config.hosting.public,"public");
 assert.equal(config.hosting.target,"previews");
 assert.ok(config.hosting.redirects.some(rule=>rule.source==="/shotsbyriq/"&&rule.destination==="/shotsbyriq"&&rule.type===302));
 assert.equal(rc.projects.default,"awe-digital");
 assert.deepEqual(rc.targets["awe-digital"].hosting.previews,["awe-concepts-previews"]);
 assert.ok(config.hosting.headers[0].headers.some(h=>h.key==="X-Robots-Tag"&&h.value.includes("noindex")));
 const workflow=await readFile(".github/workflows/branded-previews.yml","utf8");
 assert.match(workflow,/target: 'previews'/);
 assert.match(workflow,/entryPoint: 'branded-previews'/);
 assert.match(workflow,/channelId: live/);
 assert.doesNotMatch(workflow,/npm run build/);
});


test("Jay Millz concept maintains verified booking destination and original blue design", async () => {
 const html=await read("public/jay-millz-shot-em/index.html");
 const css=await read("public/jay-millz-shot-em/styles.css");
 const js=await read("public/jay-millz-shot-em/site.js");
 const booking="https://jaymillzshotem.as.me/schedule/1a0370e8";
 assert.match(html,/INDEPENDENT WEBSITE DESIGN CONCEPT/);
 assert.match(html,/NOT THE PHOTOGRAPHER'S OFFICIAL WEBSITE/);
 assert.match(html,/Designed by/i);
 assert.match(html,/AWE CONCEPTS/);
 assert.match(html,/name="robots" content="noindex,nofollow"/);
 assert.match(html,/class="awe-credit"/);
 assert.match(html,/class="awe-symbol"/);
 assert.match(html,/viewBox="0 0 64 64"/);
 assert.match(html,/class="photo-rights-note"/);
 assert.match(html,/data-about-portrait="personal"/);
 assert.match(html,/https:\/\/www\.instagram\.com\/itsjaymillz\/p\/De7iLMDAPf_\//);
 assert.match(html,/THE PERSON BEHIND THE LENS \/ @ITSJAYMILLZ/);

 assert.match(html,/Portfolio photos are from @jaymillzshotem/);
 assert.match(html,/About portrait is from @itsjaymillz/);
 assert.match(html,/public Instagram portfolio/);
 assert.doesNotMatch(html,/Photography from Jay Millz Shot Em&#39;s public scheduling site/);

 assert.match(html,/THE<br>SHOT <em>IS<\/em>/);
 assert.match(html,/YOUR MOMENT\.<br><em>IN FOCUS\.<\/em>/);
 assert.match(html,/THE CAMERA IS READY/);
 assert.match(html,/create portraits that feel unmistakably yours/);
 assert.doesNotMatch(html,/READY TO<br>GET <em>SHOT\?<\/em>/);
 assert.doesNotMatch(html,/QUICK FIRE/);
 assert.match(css,/\.final-cta h2\{font:800 clamp\(64px,11\.8vw,170px\)/);
 assert.match(css,/\.final-cta h2\{font-size:clamp\(49px,14\.8vw,84px\)/);

 for(const amount of ["$100","$200","$275","$250"])assert.ok(html.includes(amount));
 assert.match(html,/50% non-refundable deposit/);
 assert.match(html,/3–4 day turnaround/);
 assert.match(html,/Da Beauty Bundle/i);
 assert.match(html,/src="\.\/site\.js\?v=motion-20261102"/);
 assert.match(html,/href="\.\/styles\.css\?v=motion-20261102"/);
 assert.match(css,/--blue:#356dff/);
 assert.match(css,/--blue2:#77a8ff/);
 assert.match(css,/@media\(max-width:620px\)/);
 assert.match(css,/Photography and text never overlap/);
 assert.match(js,/querySelectorAll\('button\[data-filter\]'\)/);
 assert.match(js,/lightbox\?\.showModal\(\)/);
 assert.match(js,/className = 'photo-fallback'/);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,"Section IDs must remain unique");
 const anchors=[...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
 assert.ok(anchors.length>=25);
 for(const match of anchors){
  const href=match[1],tag=match[0];
  if(href.startsWith("#")) assert.ok(ids.includes(href.slice(1)),"Missing section: "+href);
  else{
   const url=new URL(href);
   assert.equal(url.protocol,"https:");
   assert.ok(["aweconcepts.com","jaymillzshotem.as.me","www.instagram.com"].includes(url.host),"Unexpected host "+url.host);
   if(url.host==="jaymillzshotem.as.me")assert.equal(href,booking);
   if(/target="_blank"/.test(tag))assert.match(tag,/rel="noopener noreferrer"/);
  }
 }
 const images=[...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)];
 assert.ok(images.length>=9);
 const importStatus=JSON.parse(await read("public/jay-millz-shot-em/import-status.json"));
 const manifest=JSON.parse(await readFile("preview/jay-millz-shot-em/instagram-sources.json","utf8"));
 assert.equal(manifest.images.length,9);
 assert.equal(importStatus.requested,9);
 assert.equal(importStatus.assets.length,9);
 assert.equal(importStatus.about?.file,"about-jay.jpg");
 assert.equal(importStatus.about?.imported,true);
 assert.ok(importStatus.about?.bytes>3500);
 const aboutSource=JSON.parse(await readFile("preview/jay-millz-shot-em/about-source.json","utf8"));
 assert.equal(aboutSource.account,"itsjaymillz");
 assert.equal(aboutSource.post,"https://www.instagram.com/itsjaymillz/p/De7iLMDAPf_/");

 assert.equal(importStatus.count,importStatus.assets.filter(p=>p.imported).length);
 images.forEach((match,i)=>{
  const imported=importStatus.assets[i];
  assert.equal(imported.id,i+1);
  if(i===8){
   assert.equal(match[1],"/jay-millz-shot-em/photos/about-jay.jpg");
  }else if(imported.imported){
   assert.equal(match[1],"/jay-millz-shot-em/photos/"+imported.file);
   assert.ok(imported.bytes>3500);
  }else assert.equal(new URL(match[1]).host,"cdn-s.acuityscheduling.com");
 });
 for(const filter of ["all","portraits","studio","lifestyle"])assert.ok(html.includes('data-filter="'+filter+'"'));
 assert.doesNotMatch(html,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF]/u);
});


test("each independent preview has a unique, accessible motion signature", async () => {
  const cases = [
    {
      name: "kappo-sono", css: ["ks-silk-open","ks-ink-draw","ks-page-rise"],
      js: ["motion-reached","IntersectionObserver"], selectors: [".hero:after",".page-hero h1"]
    },
    {
      name: "otaku-haven", css: ["oh-power-orbit","oh-rank-advance","oh-button-charge"],
      js: ["--oh-spot-x","is-powered","showcase.animate"], selectors: [".hero-art:after",".rank-panel.is-powered"]
    },
    {
      name: "shotsbyriq", css: ["riq-viewfinder","riq-contact-in","riq-flash"],
      js: ["exposure-progress","photo-arrived"], selectors: [".cover-media:before",".frame:before"]
    },
    {
      name: "jay-millz-shot-em", css: ["jm-title-in","jm-focus-on","jm-flash"],
      js: ["motion-ready"], selectors: [".hero-primary:before",".session-card:before"]
    }
  ];
  for(const site of cases){
    const css=await read("public/"+site.name+"/styles.css");
    const js=await read("public/"+site.name+"/site.js");
    for(const name of site.css) assert.ok(css.includes(name),site.name+" missing effect "+name);
    for(const name of site.js) assert.ok(js.includes(name),site.name+" missing motion handler "+name);
    for(const selector of site.selectors) assert.ok(css.includes(selector),site.name+" missing decorative selector "+selector);
    assert.match(css, /prefers-reduced-motion:reduce/,site.name+" must turn off motion if requested");
    assert.ok(!js.includes("setInterval("),site.name+" must not run perpetual JS timers");
    assert.ok(!js.includes("setTimeout("),site.name+" motion should not rely on timers");
    assert.doesNotMatch(css,/url\(['"]?http:\/\//,site.name+" introduces insecure content");
  }
});


test("all deployed pages reference the current animation revision, not stale cached assets", async()=>{
 const pages=["kappo-sono/index.html","kappo-sono/menu.html","kappo-sono/story.html",
  "kappo-sono/gallery.html","kappo-sono/visit.html","otaku-haven/index.html",
  "shotsbyriq/index.html","jay-millz-shot-em/index.html"];
 for(const page of pages){
  const html=await read("public/"+page);
  assert.match(html,/styles\.css\?v=motion-20261102/,page+" stylesheet cache-bust");
  assert.match(html,/site\.js\?v=motion-20261102/,page+" script cache-bust");
 }
});


test("Pace SBDC redesign ships seven independent, accurate and usable public pages",async()=>{
 const names=["index","services","about","stories","events","resources","contact","team","teambio","locations","library","media","partners","spanish",...detailSlugs,...mediaSlugs];
 const host="https://www.pacesbdc.org";
 for(const name of names){
  const doc=await read("public/pace-sbdc/"+name+".html");
  assert.match(doc,/INDEPENDENT WEBSITE REDESIGN CONCEPT/i);
  assert.match(doc,/NOT (?:AFFILIATED WITH THE OFFICIAL|THE OFFICIAL)/);
  assert.match(doc,/noindex,nofollow/);
  assert.match(doc,/https:\/\/nysbdc\.ecenterdirect\.com\/signup\?centerid=31/);
  assert.match(doc,/href="\.\/styles\.css\?v=motion-20261102"/);
  assert.match(doc,/src="\.\/site\.js\?v=motion-20261102"/);
  assert.match(doc,/href="https:\/\/aweconcepts\.com\/"/);
  assert.match(doc,/Designed by/i);
  const ids=[...doc.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,name+" duplicate IDs");
  const hrefs=[...doc.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
  for(const match of hrefs){
   const h=match[1],tag=match[0];
   assert.ok(h&&!h.startsWith("http:"),name+" unsafe empty or mixed-content anchor");
   if(h.startsWith("#"))assert.ok(ids.includes(h.slice(1)),name+" broken anchor: "+h);
   if(/target="_blank"/.test(tag))assert.match(tag,/rel="noopener noreferrer"/,name+" unsafe tab");
  }
  assert.doesNotMatch(doc,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF\uFE0E\uFE0F\u200D]/u);
  assert.doesNotMatch(doc,/<form\b/,"This concept must never collect visitor data");
 }
 const home=await read("public/pace-sbdc/index.html");
 for(const item of ["Big ideas.","20,100","$255","10,600","1986","Services","Our impact","GET FREE ADVISING","Request"]){
  assert.ok(home.toLowerCase().includes(item.toLowerCase()),"Homepage missing "+item);
 }
 for(const page of ["about","services","success-stories","events","faqs"]){
  assert.ok(home.includes('./'+page+'.html'),"Homepage must use the local "+page+" page");
 }
 assert.ok(!home.includes('href="'+host),"No legacy links in homepage");
 for(const category of ["all","starting","growing"])assert.match(home,new RegExp('data-service="'+category+'"'));
 const js=await read("public/pace-sbdc/site.js");
 assert.match(js,/service-filter-btn/);
 assert.match(js,/aria-pressed/);
 assert.match(js,/IntersectionObserver/);
 assert.match(js,/prefers-reduced-motion/);
 assert.match(js,/image/i);
 const css=await read("public/pace-sbdc/styles.css");
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/\.inner-hero/);
 assert.match(css,/\.services-grid/);
 const csp=JSON.parse(await readFile("branded-previews/firebase.json","utf8")).hosting.headers[0].headers.find(x=>x.key==="Content-Security-Policy").value;
 assert.match(csp,/https:\/\/static\.wixstatic\.com/);
});


test("Pace SBDC retains authentic brand colors, assets and the original full content taxonomy",async()=>{
 const css=await read("public/pace-sbdc/styles.css");
 for(const color of ["#002d73","#0036a1","#ffb81a","#4780b5"])assert.ok(css.includes(color),"Missing authentic Pace color "+color);
 assert.match(css,/\.official-lockup/);
 assert.match(css,/\.official-extra-nav/);
 const pageNames=["index","services","about","stories","events","resources","contact","team","teambio","locations","library","media","partners","spanish"];
 for(const name of pageNames){
  const html=await read("public/pace-sbdc/"+name+".html");
  assert.match(html,/8f09f9_6f772fba8eba4d78869d1198efd188ed/,"Official Pace SBDC source artwork");
  assert.match(html,/8f09f9_15d5736f9cd347fdb6f0be8a7dac6f33/,"Official NYSBDC/SBA accreditation");
  assert.match(html,/INDEPENDENT WEBSITE REDESIGN CONCEPT/);
  assert.match(html,/href="\.\/library\.html"/);
  assert.match(html,/href="\.\/team\.html"/);
  assert.match(html,/href="\.\/locations\.html"/);
  assert.match(html,/href="\.\/spanish\.html"/);
 }
 const team=await read("public/pace-sbdc/team.html");
 for(const person of ["Rawle Brown","Sandra Cely","Greg Callender","Susan Gluck","Sanchit Deep Singh","Eeshani Juthani","Lily Lin","Roxanna Astorga","Andrew Flamm"])assert.ok(team.includes(person),person+" absent");
 const locations=await read("public/pace-sbdc/locations.html");
 for(const area of ["Canarsie","Crown Heights","East Williamsburg","Flatbush","Grand Army Plaza","Industry City","Midtown Manhattan","Park Slope","Prospect Lefferts Gardens","Red Hook","Sunset Park BID","Williamsburg"])assert.ok(locations.includes(area),area+" absent");
 const library=await read("public/pace-sbdc/library.html");
 for(const subject of ["Financing Options","Bonding Assistance","Government Procurement","International Trade","Hiring & Pace Internships","Employee Training","Real Estate","Website Planning","Email Marketing","COVID-19 Recovery Archive","Social Media Marketing","Business Planning"])assert.ok(library.includes(subject),subject+" absent");
 const media=await read("public/pace-sbdc/media.html");
 for(const category of ["Latest Blog","Newsletter Archive","Press Coverage","Photo Collection","Video and Webinars","SBDC Day","2025 Year in Review","Testimonials","Brooklyn Expansion"])assert.ok(media.includes(category),category+" absent");
 const contact=await read("public/pace-sbdc/contact.html");
 assert.match(contact,/THE OFFICIAL REGISTRATION/);
 assert.match(contact,/Brooklyn Public Library/);
 assert.match(contact,/NYSBDC eCenter Direct/i);
 const spanish=await read("public/pace-sbdc/spanish.html");
 assert.match(spanish,/signup\?centerid=31&_locale=es_MX/);
 assert.match(spanish,/Asesoría/);
 const source=await readFile("preview/pace-sbdc/official-content.mjs","utf8");
 assert.match(source,/originalDirectory/);
 assert.match(source,/inlineEnrichment/);
 assert.doesNotMatch(source,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF\uFE0E\uFE0F\u200D]/u);
});


test("Every original Pace SBDC section is rebuilt locally without external old-site links",async()=>{
 const ids=["index","services","about","stories","events","resources","contact","team","teambio","locations","library","media","partners","spanish",...detailSlugs,...mediaSlugs];
 assert.ok(ids.length>=45,"Site should include all source routes");
 const paths=new Set(ids.map(slug=>slug+".html"));
 for(const slug of ids){
  const doc=await read("public/pace-sbdc/"+slug+".html");
  assert.doesNotMatch(doc,/<a\b[^>]*href="https?:\/\/(?:www\.)?pacesbdc\.org/i,slug+" incorrectly exits to old website");
  assert.match(doc,/src="\.\/site\.js\?v=motion-20261102"/);
  assert.match(doc,/href="\.\/styles\.css\?v=motion-20261102"/);
  const all=[...doc.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)];
  for(const match of all){
   const href=match[1];
   if(href.startsWith("./")&&href.endsWith(".html"))assert.ok(paths.has(href.slice(2)),slug+" links to missing local page "+href);
  }
 }
 const selected=await read("public/pace-sbdc/library.html");
 for(const slug of ["financing","sbaloans","bonding","training","hiring","realestate","business-planning","tax-planning","marketing-sales","leadgeneration","social-media-marketing","website","email-marketing","internationaltrade","procurement"])
  assert.match(selected,new RegExp('href="\\./'+slug+'\\.html"'),"Local resource "+slug+" not listed");
 for(const slug of ["blog","photos","newsletter","press","video","social","sbdc-day","year-in-review","success-stories","testimonials"])
  assert.ok(await read("public/pace-sbdc/"+slug+".html"),"Missing media or impact section "+slug);
 const footer=await read("public/pace-sbdc/contact.html");
 assert.match(footer,/href="\.\/privacy-policy\.html"/);
 assert.match(footer,/href="\.\/counseling-form\.html"/);
 assert.match(footer,/href="\.\/year-in-review\.html"/);
 assert.doesNotMatch(footer,/VISIT THE OFFICIAL WEBSITE/);
});

test("Otaku Haven ticker automatically scrolls on every screen without pause controls", async () => {
 const html=await read("public/otaku-haven/index.html");
 const css=await read("public/otaku-haven/styles.css");
 const js=await read("public/otaku-haven/site.js");
 assert.match(html,/RISE THROUGH<br>THE <span>RANKS\.<\/span>/);
 assert.doesNotMatch(html,/EVERY LEGEND<br>STARTS AT/);
 assert.match(html,/class="ticker-track"/);
 assert.doesNotMatch(html,/ticker-motion-toggle|PLAY MOTION|PAUSE MOTION/);
 assert.match(html,/styles\.css\?v=motion-20261102-always-3/);
 assert.match(html,/site\.js\?v=motion-20261102-always-3/);
 assert.match(css,/ticker-loop-offset/);
 assert.match(css,/\.ticker-track\{[^}]*animation:marquee [^;]+ linear infinite/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.ticker \.ticker-track\{animation:marquee [^}]+!important\}\}/);
 assert.doesNotMatch(css,/ticker-motion-toggle|ticker\.is-playing|\.ticker-track\{animation:none\}/);
 assert.match(js,/Math\.ceil\(ticker\.clientWidth \/ width\) \+ 2/);
 assert.match(js,/setProperty\("--ticker-loop-offset", "-" \+ width \+ "px"\)/);
 assert.doesNotMatch(js,/tickerMotionPreference|tickerOptedIn|tickerToggle|updateTickerPreference/);
});


test("Pace SBDC complete-site quality gate validates 50 pages, staff biographies and current training",async()=>{
 const slugs=["index","services","about","stories","events","resources","contact","team","teambio","locations","library","media","partners","spanish",...detailSlugs,...mediaSlugs];
 assert.equal(slugs.length,50,"Pace SBDC inventory unexpectedly changed");
 const all=new Map;
 for(const slug of slugs)all.set(slug,await read("public/pace-sbdc/"+slug+".html"));
 const known=new Set(slugs);
 for(const [slug,html] of all){
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size,slug+" has duplicate IDs");
  const present=new Set(ids);
  for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)){
   const href=match[1],tag=match[0];
   assert.ok(href,slug+" contains an empty link");
   assert.doesNotMatch(href,/^https?:\/\/(?:www\.)?pacesbdc\.org/i,slug+" links to superseded original site");
   if(href.startsWith("#"))assert.ok(present.has(href.slice(1)),slug+" has broken in-page anchor "+href);
   if(href.startsWith("./")&&href.includes(".html")){
    const matchPage=href.match(/^\.\/([^#?]+)\.html(?:#(.+))?$/);
    if(matchPage){
     assert.ok(known.has(matchPage[1]),slug+" points to missing page "+href);
     if(matchPage[2])assert.ok(all.get(matchPage[1]).includes('id="'+matchPage[2]+'"'),slug+" broken staff/article anchor "+href);
    }
   }
   if(tag.includes('target="_blank"'))assert.match(tag,/rel="noopener noreferrer"/,slug+" has unsafe new-window link");
  }
  assert.match(html,/<meta property="og:title"/,slug+" lacks page title metadata");
 }
 const team=all.get("teambio");
 assert.equal((team.match(/class="biography-photo"/g)||[]).length,8,"Eight published staff portraits should be shown");
 assert.equal((all.get("team").match(/class="team-headshot"/g)||[]).length,8,"Team directory should use the same real staff photos");
 for(const person of ["Andrew Flamm","Rawle Brown","Sandra Cely","Greg Callender","Susan Gluck","Eeshani Juthani","Roxanna Astorga","Sanchit Deep Singh","Lily Lin"])
  assert.ok(team.includes(person),person+" biography missing");
 const directory=all.get("team");
 for(const anchor of ["rawle-brown","sandra-cely","greg-callender","susan-gluck","eeshani-juthani","roxanna-astorga","sanchit-deep-singh","lily-lin"])
  assert.ok(directory.includes('./teambio.html#'+anchor),"Team directory lacks local "+anchor+" profile");
 const eventPage=all.get("events");
 for(const name of ["NELP Contract Basics","Small Business Website Workday","Building a New Business Website","NELP Small Business Legal Clinic","Understanding SBA Microloans","Small Business Financing Panel & Networking"])
  assert.ok(eventPage.includes(name),"Missing upcoming event "+name);
 assert.equal((eventPage.match(/class="event-row reveal"/g)||[]).length,6);
 assert.match(all.get("financing"),/href="\.\/"/,"Detail-page logo must take readers home");
});

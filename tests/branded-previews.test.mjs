import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { KAPPO_PAGES } from "../scripts/rewrite-kappo-preview-urls.mjs";

const root = "branded-previews/";
const read = async path => readFile(root + path, "utf8");
const expectedFiles = ["404.html", "index.html", "robots.txt", "kappo-sono/styles.css", "kappo-sono/site.js", ...KAPPO_PAGES.map(name=>"kappo-sono/"+name),"otaku-haven/index.html","otaku-haven/styles.css","otaku-haven/site.js","shotsbyriq/index.html","shotsbyriq/styles.css","shotsbyriq/site.js","shotsbyriq/import-status.json"].sort();

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
 assert.deepEqual(actual.filter(path=>!path.startsWith("shotsbyriq/photos/")).sort(),expectedFiles);
 assert.ok(actual.every(path=>!path.includes("admin/")&&!path.includes("orders/")),"Private content must not enter the isolated preview");
 const landing=await read("public/index.html");
 assert.match(landing,/href="\/otaku-haven\/"/);
 assert.match(landing,/href="\/kappo-sono\/"/);
 assert.match(landing,/independent design studies/);
 assert.match(landing,/href="\/shotsbyriq"/);
 assert.match(landing,/noindex,nofollow/);
 assert.equal(await read("public/robots.txt"),"User-agent: *\nDisallow: /\n");
});

test("restaurant pages resolve logo, navigation, script and CSS on branded host", async () => {
 for(const name of KAPPO_PAGES){
  const html = await read("public/kappo-sono/"+name);
  assert.match(html,/href="\/kappo-sono\/styles.css"/);
  assert.match(html,/href="\/kappo-sono\/"/);
  assert.doesNotMatch(html,/\b(?:href|src)="\/(?:styles\.css|site\.js|menu\.html|story\.html|gallery\.html|visit\.html)"/);
  assert.match(html,/noindex/);
  if(name !== "404.html"){
   assert.match(html,/src="\/kappo-sono\/site.js"/);
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
 assert.match(html,/href="\/shotsbyriq\/styles\.css"/);
 assert.match(html,/src="\/shotsbyriq\/site\.js"/);
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

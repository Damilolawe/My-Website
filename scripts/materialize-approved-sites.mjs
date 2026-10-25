// Deploy SEO-readable, independent static copies of PUBLIC owner-approved sites.
// Runs during GitHub Actions builds, never on customer browsers.
// No service role keys are used: the public manifest/API only reveals sites that
// already have an active public version and a matching owner approval record.
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { hasUnsafeExecutableMarkup } from "../platform/safe-video-frames.mjs";

export const DEFAULT_API = "https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api/public";
const SLUG = /^[a-z0-9-]{3,90}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TYPES = new Map([["image/jpeg","jpg"],["image/png","png"],["image/webp","webp"]]);
const MAX_SITES = 100;
// Approved QA fixtures are accessible to testers but excluded from search indexing.
const NON_INDEXABLE_QA_SLUGS = new Set(["project-8ef68bc1-1a3e-491e-be2f-97095a954059"]);
const MAX_HTML = 220_000;
const MAX_ASSET = 4_194_304;
const MAX_TOTAL = 150_000_000;
const allowedOrigins = new Set([
  "https://awe-digital.web.app", "https://aweconcepts.com", "https://www.aweconcepts.com"
]);
const enc = s => String(s).replaceAll("&","&amp;").replaceAll('"',"&quot;")
  .replaceAll("<","&lt;").replaceAll(">","&gt;");
function assert(condition, reason) {
  if (!condition) throw Error("Static publication aborted: " + reason);
}
function validateOrigin(value) {
  const origin = new URL(value).origin;
  assert(allowedOrigins.has(origin) && value.replace(/\/$/,"") === origin,
    "unverified canonical origin");
  return origin;
}
async function request(url,fetcher,accept="application/json") {
  const res=await fetcher(url,{method:"GET",cache:"no-store",credentials:"omit",
    headers:{Accept:accept},signal:AbortSignal.timeout(20000)});
  assert(res.ok,"approved public endpoint unavailable ("+res.status+")");
  return res;
}
function versionedHtml(html,version,canonical,noindex=false) {
  const maxHtml = typeof html==="string" && html.includes('data-awe-design-study=') ? 256_000 : MAX_HTML;
  assert(typeof html==="string" && html.length<=maxHtml &&
    /^<!doctype html>/i.test(html.slice(0,60)) &&
    /<\/head>/i.test(html) && /<h1(?:\s|>)/i.test(html), "malformed generated HTML");
  assert(!hasUnsafeExecutableMarkup(html),
    "unexpected executable HTML");
  assert(!/FICTIONAL TEMPLATE DEMO|SAMPLE CONTENT ONLY/i.test(html),
    "sample pages cannot be published as customer sites");
  const metadata = '<meta name="awe-approved-version" content="'+version+'">'+
    '<meta name="robots" content="'+(noindex?"noindex,nofollow":"index,follow")+'">'+
    '<link rel="canonical" href="'+enc(canonical)+'">'+
    '<meta property="og:url" content="'+enc(canonical)+'">';
  return html.replace(/<\/head>/i, metadata+"</head>");
}
function normalizeManifest(value) {
  assert(value && Array.isArray(value.sites) && value.sites.length<=MAX_SITES &&
    Object.keys(value).every(k=>["sites"].includes(k)), "invalid manifest");
  const found=new Set();
  for(const site of value.sites) {
    assert(SLUG.test(site.slug)&&UUID.test(site.version) &&
      Array.isArray(site.assets)&&site.assets.length<=12,"invalid approved site entry");
    assert(!found.has(site.slug),"duplicate customer slug");
    found.add(site.slug);
    assert(new Set(site.assets).size===site.assets.length &&
      site.assets.every(id=>UUID.test(id)),"invalid asset manifest");
  }
  return value.sites;
}
export async function materializeApprovedSites({
  outDir="dist",
  api=DEFAULT_API,
  siteOrigin="https://awe-digital.web.app",
  fetcher=fetch
}={}) {
  const origin=validateOrigin(siteOrigin);
  assert(api===DEFAULT_API,"untrusted public publishing endpoint");
  const root=path.resolve(outDir);
  const sitesDir=path.join(root,"sites");
  // Fetch and validate everything BEFORE modifying dist. Errors block
  // the Firebase deploy, preserving the previous live release.
  const manifest=normalizeManifest(await (await request(api+"/manifest",fetcher)).json());
  const snapshots=[];
  let total=0;
  for(const site of manifest) {
    const canonical=origin+"/sites/"+site.slug+"/";
    const response=await request(api+"/"+site.slug,fetcher);
    const data=await response.json();
    assert(data && data.version===site.version && typeof data.html==="string",
      "published version changed mid-build: "+site.slug);
    // Published multi-page files are generated exclusively from the immutable,
    // owner-approved site version. No upload, arbitrary filenames or drafts.
    const allowedBundles=[["index.html","research.html","work.html","studio.html","journal.html"],["index.html","work.html","features.html","studio.html","contact.html"]];
    const pageNames=data.pages?allowedBundles.find(names=>names.length===Object.keys(data.pages).length&&names.every(n=>typeof data.pages[n]==="string")):["index.html"];
    assert(Array.isArray(pageNames),"unexpected approved site page names");
    if(data.pages){
      assert(Object.getPrototypeOf(data.pages)===Object.prototype &&
        Object.keys(data.pages).length===5 &&
        pageNames.every(n=>typeof data.pages[n]==="string") &&
        data.pages["index.html"]===data.html,
        "invalid approved multi-page document bundle");
    }
    const pageHtml=Object.fromEntries(pageNames.map(name=>[
      name,versionedHtml(data.pages?data.pages[name]:data.html,site.version,
        canonical+(name==="index.html"?"":name),NON_INDEXABLE_QA_SLUGS.has(site.slug))
    ]));
    const assets=[];
    for(const aid of site.assets) {
      const endpoint=api+"/"+site.slug+"/assets/"+aid;
      const image=await request(endpoint,fetcher,"image/*");
      const mime=(image.headers.get("content-type")||"").split(";")[0].toLowerCase();
      const ext=TYPES.get(mime);
      assert(ext,"unapproved image type for "+aid);
      const size=Number(image.headers.get("content-length")||0);
      assert(size<=MAX_ASSET,"oversized image for "+aid);
      const contents=new Uint8Array(await image.arrayBuffer());
      assert(contents.length>0&&contents.length<=MAX_ASSET,"invalid image body for "+aid);
      const target="assets/"+aid+"."+ext;
      const names=[
        'src="'+endpoint+'"',
        'src="/sites/'+site.slug+'/assets/'+aid+'"',
        'src="/api/assets/'+aid+'"'
      ];
      for(const name of pageNames)
        for(const original of names)pageHtml[name]=pageHtml[name].replaceAll(original,'src="'+target+'"');
      assets.push({target,contents});
      total+=contents.length;
      assert(total<MAX_TOTAL,"static site media exceeds deployment budget");
    }
    for(const name of pageNames) {
      const html=pageHtml[name];
      assert(!html.includes('src="/api/assets/') &&
        !html.includes(api+"/"+site.slug+"/assets/") &&
        !html.includes('src="/sites/'+site.slug+'/assets/'),
        "unresolved private/dynamic asset reference");
      total+=Buffer.byteLength(html);
      assert(total<MAX_TOTAL,"static sites exceed deployment budget");
    }
    snapshots.push({slug:site.slug,version:site.version,pages:pageHtml,assets,canonical});
  }
  await rm(sitesDir,{recursive:true,force:true});
  await mkdir(sitesDir,{recursive:true});
  for(const {slug,pages,assets} of snapshots) {
    const dest=path.join(sitesDir,slug);
    await mkdir(path.join(dest,"assets"),{recursive:true});
    for(const [filename,html] of Object.entries(pages))await writeFile(path.join(dest,filename),html);
    for(const asset of assets) await writeFile(path.join(dest,asset.target),asset.contents);
  }
  const pages=["/","/why-awe.html","/order.html","/contact.html",
    ...snapshots.filter(s=>!NON_INDEXABLE_QA_SLUGS.has(s.slug)).flatMap(s=>Object.keys(s.pages).map(name=>"/sites/"+s.slug+"/"+(name==="index.html"?"":name)))];
  const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n'+
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
    pages.map(url=>'  <url><loc>'+enc(origin+url)+'</loc></url>').join("\n")+
    '\n</urlset>\n';
  await writeFile(path.join(root,"sitemap.xml"),sitemap);
  await writeFile(path.join(root,"robots.txt"),
    "User-agent: *\nAllow: /\nSitemap: "+origin+"/sitemap.xml\n");
  return {published:snapshots.length,sites:snapshots.map(x=>x.slug),bytes:total};
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  const result=await materializeApprovedSites({
    outDir:"dist",
    siteOrigin:process.env.AWE_SITE_ORIGIN||"https://awe-digital.web.app"
  });
  console.log("Materialized "+result.published+" approved static customer sites.");
}

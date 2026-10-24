import test from "node:test";
import assert from "node:assert/strict";
import {mkdtemp,readFile,rm,stat} from "node:fs/promises";
import path from "node:path";
import {tmpdir} from "node:os";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderApprovedRunwayPages,RUNWAY_PAGES} from "../shared/runway-customer-pages.mjs";
import {materializeApprovedSites,DEFAULT_API} from "../scripts/materialize-approved-sites.mjs";

const version="88888888-aaaa-4bbb-8ccc-777777777777";
const slug="runway-client-portfolio";
const approved={slug,version,assets:[]};
const mkInput=()=>{
 const v=sampleForTemplate("runwaymulti");
 return {...v,content:{...v.content,name:"Independent Frames",headline:"Images made to last.",bio:"Visual research and selected work.",cards:[{title:"Northern Lights",description:"A study of light and form.",url:"https://example.org/portfolio"},{title:"Wide Horizons",description:"Editorial moving-image sequence.",url:""}],services:[{title:"Creative direction",description:"For independent projects."}],publicEmail:"studio@example.org",photoIds:[]}};
};
test("approved RunwayML signature generates five separate, customer-personalized static pages",()=>{
 const v=mkInput();
 const pages=renderApprovedRunwayPages(v);
 assert.deepEqual(Object.keys(pages),RUNWAY_PAGES);
 for(const filename of RUNWAY_PAGES){
  const html=pages[filename];
  assert(html.startsWith("<!doctype html>"),filename);
  assert(html.includes("Independent Frames"),filename);
  assert(html.includes("rw-header"),filename);
  assert(html.includes("rw-footer"),filename);
  assert(html.includes("href=\"./research.html\""),filename);
  assert(html.includes("href=\"./work.html\""),filename);
  assert(html.includes("href=\"./studio.html\""),filename);
  assert(html.includes("href=\"./journal.html\""),filename);
  assert(html.includes('prefers-reduced-motion:reduce'),filename);
  assert(!html.includes("images.unsplash.com"),filename+" leaked demo photography");
  assert(!html.includes("FICTIONAL TEMPLATE DEMO"),filename);
  assert(!html.includes("<script"),filename);
  assert(html.length<220000,filename+" too large for publication");
 }
 assert(pages["index.html"].includes('href="#main" class="rw-skip"'));
 assert(pages["work.html"].includes("Northern Lights"));
 assert(pages["studio.html"].includes("mailto:studio@example.org"));
 assert(pages["research.html"].includes("Visual research"));
 assert(pages["journal.html"].includes("Wide Horizons"));
});
test("approved renderer escapes customers' editable fields and rejects other templates",()=>{
 const v=mkInput();
 const html=renderApprovedRunwayPages({...v,content:{...v.content,headline:"<script>bad</script>",cards:[{title:"<img onerror=bad()>",description:"a",url:"javascript:bad()"}]}})["work.html"];
 assert(html.includes("&lt;img onerror=bad()&gt;"));
 assert(!html.includes("<script"));
 assert(!html.includes("javascript:bad()"));
 assert.throws(()=>renderApprovedRunwayPages({...v,template:"runwayml"}),/Only the approved/);
});
async function scratch(fn){
 const dir=await mkdtemp(path.join(tmpdir(),"awe-runway-multi-"));
 try{return await fn(dir);}finally{await rm(dir,{recursive:true,force:true});}
}
test("approved static materializer stores five HTML documents and validates every route",async()=>{
 await scratch(async outDir=>{
  const pages=renderApprovedRunwayPages(mkInput());
  const fetcher=async url=>{
   if(url===DEFAULT_API+"/manifest")return Response.json({sites:[approved]});
   if(url===DEFAULT_API+"/"+slug)return Response.json({version,html:pages["index.html"],pages});
   throw Error("Unexpected public URL "+url);
  };
  const result=await materializeApprovedSites({outDir,fetcher});
  assert.deepEqual(result.sites,[slug]);
  for(const filename of RUNWAY_PAGES){
   const html=await readFile(path.join(outDir,"sites",slug,filename),"utf8");
   assert(html.includes('<meta name="awe-approved-version" content="'+version+'">'));
   const canonical="https://awe-digital.web.app/sites/"+slug+"/"+(filename==="index.html"?"":filename);
   assert(html.includes('rel="canonical" href="'+canonical+'"'),filename);
  }
  const map=await readFile(path.join(outDir,"sitemap.xml"),"utf8");
  assert(map.includes("/sites/"+slug+"/work.html"));
  assert(map.includes("/sites/"+slug+"/journal.html"));
  assert((await stat(path.join(outDir,"sites",slug,"index.html"))).size>3000);
 });
});
test("unapproved file names and injected HTML block publication without deleting prior pages",async()=>{
 await scratch(async outDir=>{
  const pages=renderApprovedRunwayPages(mkInput());
  const fake=mutated=>async url=>{
   if(url===DEFAULT_API+"/manifest")return Response.json({sites:[approved]});
   if(url===DEFAULT_API+"/"+slug)return Response.json({version,html:mutated["index.html"],pages:mutated});
   throw Error("Unexpected URL "+url);
  };
  await materializeApprovedSites({outDir,fetcher:fake(pages)});
  const before=await readFile(path.join(outDir,"sites",slug,"index.html"),"utf8");
  await assert.rejects(()=>materializeApprovedSites({outDir,fetcher:fake({...pages,"../admin.html":"unsafe"})}),/invalid approved multi-page/);
  await assert.rejects(()=>materializeApprovedSites({outDir,fetcher:fake({...pages,"journal.html":pages["journal.html"].replace("</body>","<script>bad()</script></body>")})}),/unexpected executable HTML/);
  assert.equal(await readFile(path.join(outDir,"sites",slug,"index.html"),"utf8"),before);
 });
});
test("Supabase edge renderer is byte-identical to browser renderer",async()=>{
 const [front,edge]=await Promise.all([
  readFile(new URL("../shared/runway-customer-pages.mjs",import.meta.url),"utf8"),
  readFile(new URL("../supabase/functions/awe-api/shared/runway-customer-pages.mjs",import.meta.url),"utf8")
 ]);
 assert.equal(front,edge);
});

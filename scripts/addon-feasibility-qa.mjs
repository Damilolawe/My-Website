// Diagnostic-only feasibility audit. Does not mutate production, Stripe, or Supabase.
import {mkdtemp,readFile,rm,writeFile,mkdir} from "node:fs/promises";
import {tmpdir} from "node:os";
import path from "node:path";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderApprovedRunwayPages,RUNWAY_PAGES} from "../shared/runway-customer-pages.mjs";
import {materializeApprovedSites,DEFAULT_API} from "./materialize-approved-sites.mjs";

const OUT="qa-output/addon-feasibility";
const UUID="11111111-2222-4333-8444-555555555555";
const SAMPLES=["index","folio","runwayml","runwaymulti","nike","clay","liquidmetal","arcade","ferrari","daylight"];
const safe=s=>String(s).replaceAll("|","\\|").replaceAll("\n"," ");
const sum=(rows,key)=>rows.filter(row=>row[key]===true).length;
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
const results=[];
const sampleMap=new Map();

for(const t of templates){
 const row={template:t.id,engine:"",renders:false,completeDocument:false,mobileViewport:false,responsiveCSS:false,clientName:false,clientHeadline:false,clientBio:false,primaryColor:false,safeCustomerText:false,hasPageTitle:false,hasDescription:false,safeStaticOutput:false,unresolvedAssetReferences:0,errors:[]};
 try{
  const v=sampleForTemplate(t.id);
  const input={...v,design:{...v.design,primary:"#A1B2C3",secondary:"#234567"},content:{...v.content,name:"ALPHA-CUSTOMER-ORBIT-2026",headline:"BETA-HEADLINE-ORBIT-2026",bio:"GAMMA-BIO-ORBIT-2026",publicEmail:"sample@example.test"}};
  const h=t.id==="runwaymulti"?renderApprovedRunwayPages(input)["index.html"]:renderSite(input,{sample:false});
  row.engine=t.id==="runwaymulti"?"five-page customer renderer":"standard customer renderer";
  row.renders=typeof h==="string"&&h.length>500;
  row.completeDocument=/^<!doctype html>/i.test(h)&&/<html[\s>]/i.test(h)&&/<\/body>/i.test(h);
  row.mobileViewport=/<meta[^>]*name=["']viewport["']/i.test(h);
  row.responsiveCSS=/@media\b/i.test(h)||/clamp\(/i.test(h);
  row.clientName=h.includes("ALPHA-CUSTOMER-ORBIT-2026");
  row.clientHeadline=h.includes("BETA-HEADLINE-ORBIT-2026");
  row.clientBio=h.includes("GAMMA-BIO-ORBIT-2026");
  row.primaryColor=/#A1B2C3/i.test(h);
  row.hasPageTitle=/<title[\s>][\s\S]*?<\/title>/i.test(h);
  row.hasDescription=/<meta[^>]*name=["']description["']/i.test(h);
  row.safeStaticOutput=!/<script\b|<iframe\b|<object\b|<embed\b|javascript:/i.test(h);
  row.unresolvedAssetReferences=(h.match(/src=["']\/api\/assets\//g)||[]).length;
  const hostile={...input,content:{...input.content,headline:'<script>alert("x")</script><img src=x onerror=alert(1)>'}};
  const x=t.id==="runwaymulti"?renderApprovedRunwayPages(hostile)["index.html"]:renderSite(hostile,{sample:false});
  row.safeCustomerText=!/<script\b|<img src=x onerror/i.test(x);
  sampleMap.set(t.id,h);
 }catch(e){row.errors.push(String(e?.message||e).slice(0,280));}
 results.push(row);
}
const fixtures=[];
for(const id of SAMPLES){
 const orig=sampleMap.get(id);
 if(!orig){fixtures.push({id,ok:false,error:"No valid client HTML"});continue;}
 const isMulti=id==="runwaymulti";
 const makeInput=()=>{
  const v=sampleForTemplate(id);
  return {...v,content:{...v.content,name:"QA CUSTOMER "+id,headline:"QA personalized website",bio:"QA content"}};
 };
 let pages;
 try{
  pages=isMulti?renderApprovedRunwayPages(makeInput()):{"index.html":orig};
 }catch(e){fixtures.push({id,ok:false,error:String(e.message)});continue;}
 const extra='<a class="awe-qa-booking" href="https://calendly.com/example/consultation" rel="noopener">Book appointment</a>'+
  '<style data-addon-motion>@media(prefers-reduced-motion:no-preference){.awe-qa-booking{transition:opacity .2s}}</style>';
 const decorated=Object.fromEntries(Object.entries(pages).map(([filename,html])=>[filename,html.replace(/<\/body>/i,extra+"</body>")]));
 const slug="addon-probe-"+id;
 const root=await mkdtemp(path.join(tmpdir(),"awe-addon-"));
 try{
  const fetcher=async url=>{
   if(url===DEFAULT_API+"/manifest")return Response.json({sites:[{slug,version:UUID,assets:[]}]});
   if(url===DEFAULT_API+"/"+slug)return Response.json({
    version:UUID,html:decorated["index.html"],...(isMulti?{pages:decorated}:{})
   });
   throw Error("Unexpected mock API request "+url);
  };
  const published=await materializeApprovedSites({outDir:root,fetcher,siteOrigin:"https://aweconcepts.com"});
  const names=isMulti?RUNWAY_PAGES:["index.html"];
  const rendered=await Promise.all(names.map(n=>readFile(path.join(root,"sites",slug,n),"utf8")));
  const contentPreserved=rendered.every(h=>h.includes('class="awe-qa-booking"')&&h.includes("calendly.com/example/consultation")&&h.includes("data-addon-motion"));
  const seoVersioned=rendered.every(h=>h.includes('<meta name="awe-approved-version" content="'+UUID+'">')&&h.includes('rel="canonical"'));
  fixtures.push({id,ok:published.published===1 && contentPreserved&&seoVersioned,pages:names.length,linkPreserved:contentPreserved,seoVersioned,errors:[]});
 }catch(e){fixtures.push({id,ok:false,error:String(e?.message||e).slice(0,400)});}
 finally{await rm(root,{recursive:true,force:true});}
}
const root=await mkdtemp(path.join(tmpdir(),"awe-addon-negative-"));
let executableBlocked=false;
try{
 const id="insecure-fixture";
 const src=sampleMap.get("index");
 const html=src.replace(/<\/body>/i,'<script src="https://analytics.example.test/js"></script></body>');
 const fetcher=async url=>{
  if(url===DEFAULT_API+"/manifest")return Response.json({sites:[{slug:id,version:UUID,assets:[]}]});
  if(url===DEFAULT_API+"/"+id)return Response.json({html,version:UUID});
  throw Error("unexpected URL");
 };
 try{await materializeApprovedSites({outDir:root,fetcher,siteOrigin:"https://aweconcepts.com"});}
 catch(e){executableBlocked=/unexpected executable HTML/.test(String(e.message));}
}finally{await rm(root,{recursive:true,force:true});}
const [firebase,checkout,tiers,exportSource]=await Promise.all([
 readFile("firebase.json","utf8").then(JSON.parse),
 readFile("netlify/functions/api.mjs","utf8"),
 readFile("shared/tiers.mjs","utf8"),
 readFile("platform/export.mjs","utf8")
]);
const csp=firebase.hosting.headers.flatMap(x=>x.headers||[]).find(x=>x.key==="Content-Security-Policy")?.value||"";
const architecture={
 acceptsExternalBookingLinks:true,
 browserScriptsAllowed:csp.includes("script-src 'self'")&&!csp.includes("script-src 'none'"),
 arbitraryThirdPartyScriptsAllowed:/script-src[^;]*https:\/\/\*/.test(csp),
 externalFormActionsAllowed:!csp.includes("form-action 'self'"),
 executableHTMLRejectedAtPublish:executableBlocked,
 checkoutSupportsAddonLineItems:/add.?ons?|selectedAddons|add_on/.test(checkout.slice(checkout.indexOf('checkout.sessions.create(')-800,checkout.indexOf('checkout.sessions.create(')+500)),
 checkoutUsesFixedPackageAmount:checkout.includes("unit_amount: p.amount"),
 multiPageLimitedToRunway:tiers.includes('templateId === "runwaymulti"')&&tiers.includes('pageCount === 5'),
 exportSupportsRunwayFivePages:exportSource.includes('renderApprovedRunwayPages(v.input)'),
 uploadedVectorLogosSupported:exportSource.includes('image/svg+xml'),
 generalArbitraryPagesSupported:false
};
const summary={
 templates:results.length,
 renders:sum(results,"renders"),
 mobileViewport:sum(results,"mobileViewport"),
 responsiveCSS:sum(results,"responsiveCSS"),
 personalizedName:sum(results,"clientName"),
 personalizedHeadline:sum(results,"clientHeadline"),
 personalizedBio:sum(results,"clientBio"),
 primaryColorUsed:sum(results,"primaryColor"),
 hasDescription:sum(results,"hasDescription"),
 safeCustomerText:sum(results,"safeCustomerText"),
 passedStaticPublicationFixtures:fixtures.filter(f=>f.ok).length,
 testedStaticPublicationFixtures:fixtures.length
};
const report={
 audit:"Client site add-on feasibility (no production changes)",
 generatedAt:new Date().toISOString(),
 scope:"All template renderers + ten local fake-approval static publication fixtures; no connected vendor accounts or payments tested",
 summary,architecture,templates:results,fixtures,
 limitations:[
 "Markup transport passing does not prove a booking provider, contact email, analytics tag, CRM, or payment gateway actually works.",
 "Published customer sites reject scripts and embeds; arbitrary third-party integrations need a reviewed security architecture.",
 "No licensed logo asset, translation human review, provider account access, actual domain/DNS change or checkout transaction is exercised.",
 "Visual quality and mobile interactions need real browser verification, not just static source checks."
 ]
};
await mkdir(OUT,{recursive:true});
await writeFile(path.join(OUT,"report.json"),JSON.stringify(report,null,2));
const lines=[
 "# AWE Concepts — client-site add-on feasibility results",
 "",
 "Non-production diagnostic: these are real renderer outputs and mock approved static publications, NOT tested live client accounts, payments, or third-party services.",
 "",
 "## Summary",
 ...Object.entries(summary).map(([k,v])=>"- "+k+": **"+v+"**"),
 "",
 "## Architecture blockers / capabilities",
 ...Object.entries(architecture).map(([k,v])=>"- "+k+": **"+v+"**"),
 "",
 "## Ten publication fixtures",
 "| Template | Static publish | Pages | Booking link/CSS survives | SEO version metadata | Error |",
 "|---|---|---:|---|---|---|",
 ...fixtures.map(f=>"| "+safe(f.id)+" | "+(f.ok?"PASS":"FAIL")+" | "+(f.pages||0)+" | "+(f.linkPreserved?"yes":"no")+" | "+(f.seoVersioned?"yes":"no")+" | "+safe(f.error||"")+" |"),
 "",
 "## All client renderers",
 "| Template | Renders | Name | Headline | Bio | Brand color | Meta description | Safe customer text | Error |",
 "|---|---|---|---|---|---|---|---|---|",
 ...results.map(r=>"| "+safe(r.template)+" | "+(r.renders?"PASS":"FAIL")+" | "+(r.clientName?"yes":"no")+" | "+(r.clientHeadline?"yes":"no")+" | "+(r.clientBio?"yes":"no")+" | "+(r.primaryColor?"yes":"no")+" | "+(r.hasDescription?"yes":"no")+" | "+(r.safeCustomerText?"yes":"no")+" | "+safe(r.errors.join("; "))+" |"),
 "",
 "## Limitations",
 ...report.limitations.map(x=>"- "+x),
 ""
];
await writeFile(path.join(OUT,"report.md"),lines.join("\n"));
console.log(JSON.stringify({summary,architecture,fixtures},null,2));
if(summary.renders<results.length)process.exitCode=1;
if(!executableBlocked)process.exitCode=1;


// Isolated preview experiment: five real HTML documents, preserving the original
// RunwayML template and its single-page renderer unchanged.
// Rollback: revert this feature commit or remove this builder invocation.
// No customer/published-site flow is changed until the product supports it.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderSite } from "../shared/render.mjs";
import { sampleForTemplate } from "../shared/model.mjs";

const ROUTE = "/experiments/runwayml-multipage/";
const entries = [
  ["research", "Research", "research.html"],
  ["work", "Work", "work.html"],
  ["studio", "Studio", "studio.html"],
  ["journal", "Journal", "journal.html"]
];
const safe = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const linkFor = name => name === "home" ? ROUTE : ROUTE + name + ".html";
function rewriteLinks(html, active = "") {
  let result = html;
  for (const [id, , file] of entries) result = result.replaceAll('href="#'+id+'"','href="'+ROUTE+file+'"');
  result = result.replaceAll('href="#contact"','href="'+linkFor("studio")+'#contact"');
  if (active) result = result.replaceAll('href="'+linkFor(active)+'"','href="'+linkFor(active)+'" aria-current="page"');
  return result;
}
function getMatch(html,re) {
  const result = html.match(re);
  if(!result)throw Error("RunwayML prototype cannot find expected original design markup");
  return result[0];
}
const EXPERIMENT_CSS = [
 ".rw-site .rw-header-nav a[aria-current=page],.rw-site .rw-menu a[aria-current=page]{opacity:.72;text-decoration:underline;text-underline-offset:8px}",
 ".rw-multi-spotlight{padding-block:clamp(95px,12vw,180px)}",
 ".rw-multi-overview{display:grid;grid-template-columns:1fr 1.4fr;gap:clamp(28px,6vw,110px);align-items:start}",
 ".rw-multi-overview>p{font-size:clamp(15px,1.6vw,20px);color:#a7a7a7;line-height:1.5;max-width:530px}",
 ".rw-multi-overview h2{font-size:clamp(43px,5.5vw,84px);font-weight:400;letter-spacing:-.052em;line-height:1.02}",
 ".rw-multi-kicker{display:block;color:#7d848e;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:23px}",
 ".rw-multi-wide{height:clamp(370px,62vw,900px);overflow:hidden;position:relative;margin-top:clamp(55px,7vw,110px)}",
 ".rw-multi-wide .rw-picture{height:100%}",
 ".rw-multi-wide figcaption{position:absolute;bottom:20px;left:23px;font-size:11px;text-transform:uppercase;letter-spacing:.13em;color:#fff;text-shadow:0 1px 10px #000}",
 ".rw-multi-wide{margin-inline:0}",
 ".rw-multi-chapters{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;padding-top:65px;padding-bottom:110px}",
 ".rw-multi-chapters article{padding-top:20px;border-top:1px solid #27272a}",
 ".rw-multi-chapters h3{font-size:clamp(23px,2.6vw,37px);letter-spacing:-.03em;line-height:1.05;font-weight:400;margin:23px 0 18px}",
 ".rw-multi-chapters p{font-size:15px;color:#a7a7a7;line-height:1.45;max-width:470px}",
 ".rw-multi-split{display:grid;grid-template-columns:1.2fr .8fr;gap:12px;padding:0 clamp(20px,3.5vw,60px)}",
 ".rw-multi-split .rw-picture:first-child{height:clamp(440px,55vw,760px)}",
 ".rw-multi-split .rw-picture:nth-child(2){height:clamp(320px,38vw,550px);align-self:end}",
 ".rw-multi-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-block:65px 120px}",
 ".rw-multi-grid figure{margin:0;position:relative;overflow:hidden;height:clamp(270px,39vw,580px)}",
 ".rw-multi-grid figure:nth-child(3){grid-column:1/-1;height:clamp(420px,59vw,880px)}",
 ".rw-multi-grid figure .rw-picture{height:100%}",
 ".rw-multi-grid figcaption{position:absolute;bottom:18px;left:20px;color:#fff;font-size:11px;letter-spacing:.13em;text-transform:uppercase;text-shadow:0 1px 8px #000}",
 ".rw-multi-essay{padding-block:clamp(70px,9vw,135px);border-top:1px solid #27272a;display:grid;grid-template-columns:.72fr 1.28fr;gap:clamp(35px,6vw,100px)}",
 ".rw-multi-essay h2{font-size:clamp(36px,4vw,64px);font-weight:400;line-height:1.02;letter-spacing:-.045em}",
 ".rw-multi-essay p{font-size:clamp(16px,1.75vw,22px);color:#a7a7a7;line-height:1.45;max-width:700px}",
 ".rw-multi-essay p+p{margin-top:22px}",
 ".rw-multi-essay .rw-picture{height:clamp(280px,35vw,530px);margin-top:35px}",
 ".rw-multi-light{background:#e9ecf2;color:#0c0c0c;padding-block:clamp(90px,12vw,175px)}",
 ".rw-multi-light .rw-multi-kicker{color:#404040}",
 ".rw-multi-light h2{font-size:clamp(42px,5.6vw,92px);line-height:.98;letter-spacing:-.048em;font-weight:400}",
 ".rw-multi-light p{font-size:16px;max-width:620px;color:#404040;line-height:1.5;margin-top:27px}",
 ".rw-multi-light .rw-picture{height:clamp(370px,55vw,770px);margin-top:65px}",
 ".rw-multi-cta{display:flex;gap:25px;align-items:center;flex-wrap:wrap;padding-block:40px 95px;border-top:1px solid #27272a}",
 ".rw-multi-cta p{font-size:14px;color:#a7a7a7;max-width:460px}",
 ".rw-multi-test{color:#767d88;font-size:11px;text-transform:uppercase;letter-spacing:.08em;padding-top:18px}",
 "@media(max-width:800px){.rw-multi-overview,.rw-multi-essay{grid-template-columns:1fr}.rw-multi-chapters{grid-template-columns:1fr 1fr}.rw-multi-split{grid-template-columns:1fr 1fr}}",
 "@media(max-width:640px){.rw-multi-overview,.rw-multi-essay,.rw-multi-split,.rw-multi-grid,.rw-multi-chapters{grid-template-columns:1fr}.rw-multi-grid figure:nth-child(3){grid-column:auto}.rw-multi-grid figure,.rw-multi-grid figure:nth-child(3){height:360px}.rw-multi-split .rw-picture:first-child{height:430px}.rw-multi-split .rw-picture:nth-child(2){height:260px}.rw-multi-overview h2{font-size:clamp(42px,11vw,66px)}.rw-multi-wide{height:450px}.rw-multi-chapters{padding-block:55px 90px}}",
 "@media(prefers-reduced-motion:no-preference){.rw-site.motion-expressive .rw-multi-overview h2,.rw-site.motion-expressive .rw-multi-essay h2{animation:rw-arrive .95s ease both}.rw-multi-wide img{transition:transform 1.2s ease}.rw-multi-wide:hover img{transform:scale(1.025)}}"
].join("\n");

export async function buildRunwayMultipage(outDir="dist") {
  const root=path.join(outDir,"experiments","runwayml-multipage");
  await mkdir(root,{recursive:true});
  const base=renderSite(sampleForTemplate("runwayml"),{sample:true});
  const css=getMatch(base,/<style>[\s\S]*?<\/style>/).replace("</style>",EXPERIMENT_CSS+"</style>");
  const header=getMatch(base,/<header class="rw-header">[\s\S]*?<\/header>/);
  const footer=getMatch(base,/<footer class="rw-footer">[\s\S]*?<\/footer>/);
  const imgs=[...new Set([...base.matchAll(/<img src="([^"]+)"/g)].map(x=>x[1]))];
  if(imgs.length<6)throw Error("RunwayML demo imagery changed; check preview before releasing multipage experiment");
  // Curated standard Unsplash stock photographs, not Runway assets.
  // Store verified copies on our own Firebase origin so gallery frames never
  // depend solely on third-party runtime image requests. No image is imported
  // from a customer's private uploads or from the proprietary Runway website.
  const additionalStock=[
    "photo-1695132681148-eb1c7c38782d",
    "photo-1634985037947-559e7092284f",
    "photo-1518837695005-2083093ee35b",
    "photo-1470770841072-f978cf4d019e",
    "photo-1497436072909-60f362e1d4b1",
    "photo-1483347756197-71ef80e95f73",
    "photo-1451187580459-43490279c0fa",
    "photo-1500534623283-312aade485b7"
  ].map(id=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=1450&q=76");
  const allImages=[...imgs,...additionalStock];
  const stockDir=path.join(outDir,"assets","runway-stock");
  await mkdir(stockDir,{recursive:true});
  const srcs=await Promise.all(allImages.map(async(url,i)=>{
    const local="/assets/runway-stock/frame-"+String(i+1).padStart(2,"0")+".jpg";
    try{
      const u=new URL(url);
      if(u.hostname!=="images.unsplash.com")throw Error("Untrusted stock host");
      const req=new URL(u.href);
      req.searchParams.set("fm","jpg");
      req.searchParams.set("w","1450");
      req.searchParams.set("q","76");
      const response=await fetch(req,{signal:AbortSignal.timeout(15000)});
      if(!response.ok||!(response.headers.get("content-type")||"").startsWith("image/"))throw Error("Unavailable stock image "+response.status);
      const bytes=new Uint8Array(await response.arrayBuffer());
      if(bytes.length<3000||bytes.length>4500000)throw Error("Unexpected stock image size");
      await writeFile(path.join(stockDir,path.basename(local)),bytes);
      return local;
    }catch(e){
      // A temporary stock CDN failure must not take the entire business offline.
      // Keep the licensed stock URL as a runtime fallback for the demo only.
      return url;
    }
  }));
  const localImages=srcs;

  function pic(index,loading="lazy"){
    return '<div class="rw-picture"><img src="'+safe(localImages[index%localImages.length])+'" alt="Original cinematic landscape study, frame '+(index+1)+'" loading="'+loading+'"></div>';
  }
  const overline=(num,title)=>'<span class="rw-multi-kicker">'+num+' / '+title+'</span>';
  const link=(text,route)=>'<a class="rw-text-link" href="'+(route==="journal#story-1" ? ROUTE+"journal.html#story-1" : linkFor(route))+'">'+safe(text)+' ↗︎</a>';
  const close='<div class="rw-multi-cta rw-inner"><p>Explore another chapter in the FRAME STUDIES cinematic collection.</p>'+link("Explore all work","work")+link("Return home","home")+'</div>';
  function hero(index,marker,heading,body,linkText,linkTarget){
    return '<section class="rw-hero" aria-labelledby="rw-h1">'+pic(index,"eager")+
      '<div class="rw-hero-content"><div><p class="rw-eyebrow">'+safe(marker)+'</p><h1 id="rw-h1">'+safe(heading)+'</h1></div>'+
      '<div class="rw-hero-aside"><p>'+safe(body)+'</p>'+link(linkText,linkTarget)+'</div></div>'+
      '<div class="rw-edge">SCROLL TO DISCOVER ↓︎</div></section>';
  }
  function shell(page,title,body){
    const head=header.replace('href="#main"','href="'+ROUTE+'"');
    const bottom=footer.replaceAll('href="#main"','href="'+ROUTE+'"');
    let html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<meta name="robots" content="noindex,nofollow"><meta name="color-scheme" content="dark">'+
      '<title>'+safe(title)+' — FRAME STUDIES</title><meta name="description" content="An independent cinematic editorial design experiment">'+css+
      '</head><body class="rw-site motion-expressive"><a href="#main" class="rw-skip">Skip to content</a>'+
      head+'<main id="main">'+body+'</main>'+bottom+'</body></html>';
    return rewriteLinks(html,page);
  }
  const workStory=[
    ["Motion as a language","Visual stories do not need to explain every moment. Sometimes a change in light, scale, or rhythm says enough."],
    ["A different perspective","Each frame is a place to explore composition, atmosphere, contrast, and the possibilities of an image."],
    ["What lies beyond","An ongoing collection of visual studies, assembled as fragments of an imagined world."]
  ];
  const research=hero(2,"01 / Research","The making of possible.","A space for experimenting with visual language, new perspectives, and the images that inspire them.","Explore selected work","work")+
    '<section class="rw-multi-spotlight rw-inner"><div class="rw-multi-overview"><div>'+overline("01","An open inquiry")+'<h2>Questions become images. Images become worlds.</h2></div><p>We study the relationship between composition, imagination and the moving image. Each exploration starts with a question: what might this moment look like from somewhere entirely new?</p></div>'+
    '<figure class="rw-multi-wide">'+pic(1)+'<figcaption>Study / Atmosphere 001</figcaption></figure></section>'+
    '<section class="rw-multi-chapters rw-inner">'+
    '<article>'+overline("A","Observation")+'<h3>See beyond the expected.</h3><p>Lighting, time and perspective can transform an ordinary scene into something that feels unfamiliar and new.</p></article>'+
    '<article>'+overline("B","Experimentation")+'<h3>Follow a possibility.</h3><p>Visual exploration is a process of trying, looking again and allowing the result to suggest the next question.</p></article>'+
    '<article>'+overline("C","Discovery")+'<h3>Make room for the unknown.</h3><p>Every experiment is another frame in a bigger story. The work is intentionally open-ended.</p></article></section>'+close;
  const work=hero(1,"02 / Work","A world in motion.","Fragments of worlds in progress. A visual archive of cinematic studies and imagined possibilities.","Read the journal","journal")+
    '<section class="rw-multi-spotlight rw-inner"><div class="rw-multi-overview"><div>'+overline("02","Selected frames")+'<h2>Made to be seen. Made to be felt.</h2></div><p>A collection of visual experiments exploring scale, atmosphere and the space between reality and imagination. These images are illustrative studies, not client projects.</p></div></section>'+
    '<section class="rw-multi-split" aria-label="Featured frames">'+pic(0)+pic(3)+'</section>'+
    '<section class="rw-inner"><div class="rw-multi-grid">'+
      [2,4,5].map((index,i)=>'<figure>'+pic(index)+'<figcaption>Frame / 00'+(i+3)+'</figcaption></figure>').join('')+
      '</div><div class="rw-multi-overview" style="padding-bottom:110px"><div>'+overline("03","Behind the work")+'<h2>Nothing is the last frame.</h2></div><p>These images are not an ending. They are an invitation to explore another angle, another atmosphere, another visual possibility.</p></div></section>'+close;
  const studio=hero(4,"03 / Studio","For anyone with a story to tell.","The same editorial spirit, from a different point of view. Cinema-grade visual design made for exploration.","View the work","work")+
    '<section class="rw-multi-light" id="contact"><div class="rw-inner">'+overline("03","The studio")+
    '<h2>Ideas deserve<br>room to become.</h2><p>FRAME STUDIES is a fictional independent visual studio created to demonstrate this design system. Its visual identity is deliberately minimal: images hold the spotlight, while the interface steps aside.</p>'+pic(5)+'</div></section>'+
    '<section class="rw-multi-spotlight rw-inner"><div class="rw-multi-overview"><div>'+overline("04","Our approach")+'<h2>Art, image, imagination.</h2></div><p>Everything begins with a vision. We build around focused typography, rich photographic compositions and a restrained visual language that lets stories carry the experience.</p></div></section>'+close;
  const journal=hero(3,"04 / Journal","Notes from the edge of imagination.","An editorial space for fragments, questions, and the visual ideas behind each imagined scene.","Read the first story","journal#story-1")+
    '<section class="rw-research rw-inner" id="stories"><div class="rw-section-heading"><h2>Stories in the making.</h2>'+overline("04","Dispatches")+'</div><div class="rw-article-grid">'+
    workStory.map((story,i)=>'<a class="rw-article" href="#story-'+(i+1)+'">'+pic((i+1)%6)+'<div class="rw-article-meta"><span>Journal / 0'+(i+1)+'</span><span>FRAME STUDIES</span></div><h3>'+safe(story[0])+'</h3><p>'+safe(story[1])+'</p></a>').join('')+
    '</div></section>'+
    workStory.map((story,i)=>'<section class="rw-multi-essay rw-inner" id="story-'+(i+1)+'"><div>'+overline("0"+(i+1),"Journal")+'<h2>'+safe(story[0])+'</h2></div><div><p>'+safe(story[1])+'</p><p>Each new scene begins with an observation. We change the distance, the time of day, and the frame. What remains is an image that invites a second look.</p>'+pic((i+2)%6)+'</div></section>').join('')+close;
  let sampleHome=base.replace('</head>','<meta name="robots" content="noindex,nofollow"></head>');
  for(let i=0;i<imgs.length;i++)sampleHome=sampleHome.replaceAll(imgs[i],localImages[i]);
  const home=rewriteLinks(sampleHome).replace('</footer>','<p class="rw-multi-test rw-inner">MULTI-PAGE EXPERIMENT · <a href="/templates/runwayml.html">COMPARE THE ORIGINAL SINGLE-PAGE TEMPLATE</a></p></footer>');
  const pages=[
    ["index.html",home],
    ["research.html",shell("research","Research",research)],
    ["work.html",shell("work","Work",work)],
    ["studio.html",shell("studio","Studio",studio)],
    ["journal.html",shell("journal","Journal",journal)]
  ];
  for(const [name,html] of pages) {
    if (!/^<!doctype html>/.test(html)||!html.includes("rw-header")||!html.includes("rw-footer")||html.includes("<script"))
      throw Error("RunwayML multi-page output failed safety or structure checks: "+name);
    await writeFile(path.join(root,name),html);
  }
  return pages.map(([name])=>ROUTE+name);
}

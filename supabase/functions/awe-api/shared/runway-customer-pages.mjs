// Pure renderer for a customer's *approved immutable version*, not a public demo.
// Generates five fully linked, self-contained HTML documents. Does not mutate
// orders, charge customers, publish drafts, or include proprietary Runway assets.
import {normalize,esc} from "./model.mjs";
import {renderRunwayML} from "./runwayml.mjs";
const E=x=>esc(x??"");
export const RUNWAY_PAGES=Object.freeze(["index.html","research.html","work.html","studio.html","journal.html"]);
function safeDoc(page,body,header,footer,stylesheet,copy){
 const title=page==="index.html"?copy.headline:page.replace(".html","").toUpperCase()+" — "+copy.name;
 const addCSS='.rw-subchapter{padding-top:130px;padding-bottom:130px}.rw-subchapter .rw-small-label{color:#a7a7a7}.rw-subchapter h2{font-size:clamp(41px,5.2vw,90px);font-weight:400;letter-spacing:-.05em;line-height:1.01;margin:30px 0;max-width:1020px}.rw-subchapter p{color:#a7a7a7;font-size:clamp(16px,1.5vw,22px);line-height:1.5;max-width:780px}.rw-subchapter .rw-picture{height:clamp(330px,53vw,720px);margin-block:60px}.rw-subgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.rw-subgrid article{padding-top:20px;border-top:1px solid #27272a}.rw-subgrid h3{font-size:clamp(25px,3vw,48px);line-height:1.06;font-weight:400;letter-spacing:-.035em;margin:18px 0}.rw-subgrid p{font-size:15px}.rw-subgrid .rw-picture{height:clamp(250px,32vw,440px);margin:0 0 20px}.rw-subnote{padding-top:45px;border-top:1px solid #27272a}.rw-subnote .rw-text-link{margin-top:20px}@media(max-width:640px){.rw-subgrid{grid-template-columns:1fr}.rw-subchapter{padding-top:95px;padding-bottom:75px}}';
 const documentCSS=stylesheet.replace("</style>",addCSS+"</style>");
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>'+E(title)+'</title><meta name="description" content="'+E(copy.headline)+'">'+documentCSS+'</head><body class="rw-site motion-'+E(copy.motion)+'"><a href="#main" class="rw-skip">Skip to content</a>'+header+'<main id="main">'+body+'</main>'+footer+'</body></html>';
}
function navLinks(html){
 return html.replaceAll('href="#research"','href="./research.html"')
   .replaceAll('href="#work"','href="./work.html"')
   .replaceAll('href="#studio"','href="./studio.html"')
   .replaceAll('href="#journal"','href="./journal.html"')
   .replaceAll('href="#contact"','href="./studio.html#contact"')
   .replaceAll('href="#main"','href="./"');
}
function photo(c,i,opts){
 const id=c.photoIds[i];
 const url=id?opts.assetBase+id+opts.assetSuffix:null;
 const tag=url?'<img src="'+E(url)+'" alt="'+E(c.name)+' — selected image '+(i+1)+'" loading="lazy">':'';
 return '<div class="rw-picture '+(url?'':'rw-empty')+'">'+tag+'</div>';
}
function detailHeading(n,label,title,description){
 return '<span class="rw-small-label">'+n+' / '+E(label)+'</span><h2>'+E(title)+'</h2><p>'+E(description)+'</p>';
}
export function renderApprovedRunwayPages(input,options={}){
 const v=normalize(input);
 if(v.template!=="runwaymulti")throw Error("Only the approved RunwayML multi-page template has a document bundle.");
 const opts={assetBase:"/api/assets/",assetSuffix:"",...options,sample:false};
 const c=v.content;
 const original=renderRunwayML(v,{...opts,sample:false});
 const stylesheet=original.match(/<style>[\s\S]*?<\/style>/)?.[0];
 const top=original.match(/<header class="rw-header">[\s\S]*?<\/header>/)?.[0];
 const bottom=original.match(/<footer class="rw-footer">[\s\S]*?<\/footer>/)?.[0];
 if(!stylesheet||!top||!bottom||!original.includes("<main id="))throw Error("RunwayML source structure changed: inspect before publishing.");
 const header=navLinks(top).replaceAll('href="./"','href="./"');
 const footer=navLinks(bottom);
 const cp={name:c.name,headline:c.headline,motion:v.design.animation};
 const bio=c.bio||"";
 const cards=c.cards||[];
 const work=cards.length?cards:[];
 const links='<div class="rw-subnote"><a class="rw-text-link" href="./work.html">View selected work ↗︎</a> &nbsp; <a class="rw-text-link" href="./studio.html#contact">Get in touch ↗︎</a></div>';
 const intro=(eyebrow,title,description,imageIndex)=>{
   return '<section class="rw-hero"><div class="rw-picture">'+(c.photoIds[imageIndex]?'<img src="'+E(opts.assetBase+c.photoIds[imageIndex]+opts.assetSuffix)+'" alt="'+E(c.name)+' featured image" loading="eager">':'')+'</div><div class="rw-hero-content"><div><p class="rw-eyebrow">'+E(eyebrow)+'</p><h1 id="rw-h1">'+E(title)+'</h1></div><div class="rw-hero-aside"><p>'+E(description)+'</p><a class="rw-text-link" href="#chapter">Explore this chapter ↓︎</a></div></div></section>';
 };
 const opening=navLinks(original).replaceAll('href="./" aria-label','href="./" aria-label');
 function wrap(page,hero,chapter){
   return safeDoc(page,hero+'<section class="rw-subchapter rw-inner" id="chapter">'+chapter+'</section>',header,footer,stylesheet,cp);
 }
 const research=wrap("research.html",
   intro("01 / Research", "Every idea starts somewhere.", bio,1),
   detailHeading("01","The approach","Looking closer at the process.",bio)+photo(c,2,opts)+links);
 const workCards=work.map((x,i)=>'<article>'+photo(c,(i+3)%12,opts)+'<span class="rw-small-label">SELECTED WORK / 0'+(i+1)+'</span><h3>'+E(x.title)+'</h3><p>'+E(x.description)+'</p>'+(x.url&&/^https:\/\//i.test(x.url)?'<a class="rw-text-link" href="'+E(x.url)+'" rel="noopener noreferrer">Explore project ↗︎</a>':'')+'</article>').join("");
 const workHtml=wrap("work.html",
   intro("02 / Work","Selected work.",c.headline,2),
   detailHeading("02","The collection","A body of work in motion.",bio)+(workCards?'<div class="rw-subgrid">'+workCards+'</div>':photo(c,3,opts))+links);
 const services=(c.services||[]).map((s,i)=>'<article><span class="rw-small-label">DISCIPLINE / 0'+(i+1)+'</span><h3>'+E(s.title)+'</h3><p>'+E(s.description)+'</p></article>').join("");
 const contact=c.publicEmail?'<a class="rw-text-link" href="mailto:'+E(c.publicEmail)+'">Start a conversation ↗︎</a>':'<p>This website has not published a contact method yet.</p>';
 const studio=wrap("studio.html",
   intro("03 / Studio","The people behind the work.",bio,4),
   detailHeading("03","The studio",c.name,bio)+photo(c,5,opts)+(services?'<div class="rw-subgrid">'+services+'</div>':'')+'<section id="contact" class="rw-subnote"><h2>Start something new.</h2>'+contact+'</section>');
 const stories=work.map((x,i)=>'<article><span class="rw-small-label">STORY / 0'+(i+1)+'</span><h3>'+E(x.title)+'</h3><p>'+E(x.description)+'</p></article>').join("");
 const journal=wrap("journal.html",
   intro("04 / Journal","Notes from the process.",bio,0),
   detailHeading("04","Editorial notes","The thinking behind the work.",bio)+(stories?'<div class="rw-subgrid">'+stories+'</div>':photo(c,0,opts))+links);
 const result={"index.html":opening,"research.html":research,"work.html":workHtml,"studio.html":studio,"journal.html":journal};
 for(const name of RUNWAY_PAGES){
   const html=result[name];
   if(!/^<!doctype html>/i.test(html)||html.includes("<script")||html.length>220000)
     throw Error("Unsafe or oversized RunwayML page: "+name);
 }
 return result;
}

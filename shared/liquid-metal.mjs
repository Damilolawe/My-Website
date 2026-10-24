import {esc,https} from "./model.mjs";
import {liquidMetalCSS} from "./liquid-metal-style.mjs";
const E=x=>esc(x??"");
const R=x=>E(x).replace(/\r?\n/g,"<br>");
const arrow='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const logo='<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-30 12 12)"/></svg>';
const process='<svg viewBox="0 0 300 90" role="img" aria-label="Illustrative brushed-silver creative-process line; not real-time statistics"><path d="M1 76 40 68 75 62 112 67 147 40 180 44 220 23 265 29 297 9" fill="none" stroke="#C8CDD6" stroke-width="1.75"/><circle cx="297" cy="9" r="4" fill="#C8CDD6"/></svg>';
const names={
"Student résumé":{work:"Projects & experiments",about:"The person behind the work",services:"Capabilities"},
"Professional portfolio":{work:"Selected case studies",about:"A little about me",services:"What I do"},
"Actor / model":{work:"Credits & on-screen work",about:"Meet the performer",services:"Creative disciplines"},
"Creative portfolio":{work:"Selected portfolio",about:"Behind the work",services:"Creative services"},
"Personal brand":{work:"Ideas & endeavors",about:"The story so far",services:"Ways to collaborate"},
"Small business":{work:"How we work",about:"Our story",services:"What we offer"}
};
export function renderLiquidMetal(v,{sample=false,assetBase="/api/assets/",assetSuffix=""}={}){
 const c=v.content,d=v.design,type=v.type,namesForType=names[type]||names["Professional portfolio"];
 const sections=d.sections;
 const works=c.cards.length?c.cards:String(c.projects||"").split(/\n\s*\n/).filter(Boolean).slice(0,12).map(x=>{const a=x.split("\n");return {title:a[0],description:a.slice(1).join("\n"),url:""}});
 const present={about:!!c.bio,work:!!(works.length||c.photoIds.length>1),services:!!c.services.length,education:!!c.education,experience:!!c.experience,skills:!!c.skills,testimonials:!!c.testimonials.length,contact:true};
 const enabled=sections.filter(s=>present[s]);
 const actualWork=works.length?works:c.photoIds.slice(1).map((_,j)=>({title:"Selected project "+(j+1),description:"",url:""}));
 const img=i=>c.photoIds[i]?'<img src="'+E(assetBase+c.photoIds[i]+assetSuffix)+'" alt="'+E(c.name+" project image "+(i+1))+'" loading="'+(i===0?"eager":"lazy")+'">':"";
 const primaryTarget=enabled.includes("work")?"#work":enabled.includes("contact")?"#contact":"#main";
 const nav=enabled.filter(s=>["about","work","services","contact"].includes(s)).map(s=>'<a href="#'+E(s)+'">'+E(s==="work"?"Work":s==="services"?"Services":s==="about"?"About":"Contact")+'</a>').join("");
 const hero='<section class="hero hero-variant liquidmetal-hero lm-hero lm-wrap" aria-labelledby="hero-title"><div class="lm-hero-copy"><span class="lm-eyebrow">'+E(c.heroLabel||"An independently crafted presence")+'</span><h1 id="hero-title" class="lm-metal-text">'+E(c.headline)+'</h1><p class="lm-lead">'+E((c.bio||"Design, considered in every detail.").slice(0,430))+'</p><div class="lm-actions"><a class="lm-btn lm-btn-primary" href="'+primaryTarget+'">'+E(c.ctaLabel||"Explore my work")+arrow+'</a>'+(enabled.includes("contact")?'<a class="lm-btn lm-btn-secondary" href="#contact">Get in touch</a>':"")+'</div><div class="lm-meta"><span>Edition 01</span><i></i><span>'+E(type)+'</span></div></div><div class="lm-stage" aria-label="Architectural graphite and brushed-metal artwork"><div class="lm-sphere" aria-hidden="true"></div>'+img(0)+'<div class="lm-stage-overlay lm-glass"><span>'+E(c.name)+'</span><span>LM / 01</span></div></div></section>';
 const title={about:namesForType.about,work:namesForType.work,services:namesForType.services,education:"Education",experience:"Experience",skills:"Skills & expertise",testimonials:"Testimonials"};
 const chapter=(id,i,body,sub)=>'<section class="lm-section" id="'+E(id)+'"><div class="lm-wrap"><div class="lm-section-head"><div><span class="lm-eyebrow">0'+String(i+1)+' / '+E(id.toUpperCase())+'</span><h2>'+E(title[id])+'</h2></div><p>'+E(sub||"An intentional perspective.")+'</p></div>'+body+'</div></section>';
 const body=enabled.filter(s=>s!=="contact").map((s,i)=>{
  if(s==="about")return chapter(s,i,'<div class="lm-about-grid"><div class="lm-about lm-glass"><p>'+R(c.bio)+'</p></div><div class="lm-diagnostic lm-glass"><span class="lm-eyebrow">The practice</span>'+process+'<p>Creative approach / illustrative study</p></div></div>',"A considered introduction.");
  if(s==="work")return chapter(s,i,'<div class="lm-work-grid">'+actualWork.map((w,j)=>'<article class="lm-work-card lm-glass"><div class="lm-card-visual"><span class="lm-card-index">CASE / '+String(j+1).padStart(2,"0")+'</span>'+img(j+1)+'</div><div class="lm-work-info"><h3>'+E(w.title)+'</h3><p>'+R(w.description)+'</p>'+(https(w.url)?'<a class="lm-text-link" href="'+E(w.url)+'" target="_blank" rel="noopener noreferrer">View project '+arrow+'</a>':"")+'</div></article>').join("")+'</div>',"An evolving portfolio of selected work.");
  if(s==="services")return chapter(s,i,'<div class="lm-services">'+c.services.map((w,j)=>'<article class="lm-service lm-glass"><span class="lm-service-icon">'+logo+'</span><h3>'+E(w.title)+'</h3><p>'+R(w.description)+'</p>'+(https(w.url)?'<a class="lm-text-link" href="'+E(w.url)+'" target="_blank" rel="noopener noreferrer">Learn more '+arrow+'</a>':"")+'</article>').join("")+'</div>',"Explore the work behind the work.");
  if(["education","experience","skills"].includes(s))return chapter(s,i,'<div class="lm-detail">'+R(c[s])+'</div>',"A timeline of meaningful experience.");
  if(s==="testimonials")return chapter(s,i,c.testimonials.map(t=>'<blockquote class="lm-quote"><p>“'+E(t.quote)+'”</p>'+(t.attribution?'<cite>'+E(t.attribution)+'</cite>':"")+'</blockquote>').join(""),"Words from collaborators.");
  return "";
 }).join("");
 const links=c.links.map(url=>'<a href="'+E(url)+'" class="lm-btn lm-btn-secondary" target="_blank" rel="noopener noreferrer">'+E(new URL(url).hostname)+arrow+'</a>').join("");
 const contact=enabled.includes("contact")?'<section class="lm-contact" id="contact"><div class="lm-wrap"><div class="lm-contact-pane lm-glass"><span class="lm-eyebrow">The next conversation</span><h2 class="lm-metal-text">Let’s make something<br>worth remembering.</h2>'+(c.publicEmail?'<a class="lm-btn lm-btn-primary" href="mailto:'+E(c.publicEmail)+'">Email '+E(c.name)+arrow+'</a>':'<p class="lm-contact-copy contact-setup-note">The site owner can add a contact email before publishing.</p>')+'<div class="lm-contact-links">'+links+'</div></div></div></section>':"";
 const head='<header class="shell-header shell-liquidmetal lm-head lm-wrap"><a class="lm-brand" href="#main"><span class="lm-logo">'+logo+'</span><span>'+E(c.name)+'</span></a><nav class="lm-nav" aria-label="Section navigation">'+nav+'</nav></header>';
 const foot='<footer class="shell-footer shell-footer-liquidmetal lm-footer lm-wrap"><span>'+E(c.name)+'</span><span>Liquid Metal / Original Awe Concepts edition</span><a href="#main">Back to top ↑</a></footer>';
 const font='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">';
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>'+E(c.name)+' — '+E(c.headline)+'</title><meta name="description" content="'+E(c.headline)+'">'+font+'<style>'+liquidMetalCSS+'</style></head><body class="liquidmetal motion-'+E(d.animation)+'">'+(sample?'<div class="lm-banner">FICTIONAL TEMPLATE DEMO — SAMPLE CONTENT ONLY</div>':"")+'<a class="lm-skip" href="#main">Skip to content</a><div class="lm-outer"><div class="site-architecture site-architecture-liquidmetal" data-architecture="metal-machined-glass">'+head+'<main id="main">'+hero+body+contact+'</main>'+foot+'</div></div></body></html>';
}

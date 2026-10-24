/**
 * Twenty page architectures, not twenty palette swaps.
 * Every mode changes entire chapters: work/gallery, services, career narrative,
 * introductions and final contact composition.
 *
 * Input is already normalized by shared/model.mjs. All user content is escaped,
 * photo IDs are allowlisted by normalization, URLs allowlist HTTPS.
 */
import {esc,https} from "./model.mjs";
import { sampleArtwork, illustrationArtwork } from "./photographic-direction.mjs";
import {originalDirections,directionFor} from "./refero-originals.mjs";

const E=esc;
const prose=value=>E(value).replace(/\r?\n/g,"<br>");
const all=x=>x.filter(Boolean).join("");
const architectures={
  index:{mode:"index-records",word:"The record",no:"01",detail:"Selected projects, clearly considered."},
  folio:{mode:"editorial-spreads",word:"The edition",no:"02",detail:"An anthology of ideas and images."},
  still:{mode:"gallery-installation",word:"The collection",no:"03",detail:"A curated perspective on the work."},
  afterhours:{mode:"cinematic-reel",word:"The screening",no:"04",detail:"Scenes worth returning to."},
  signal:{mode:"poster-wall",word:"The dispatch",no:"05",detail:"Work that refuses to whisper."},
  daylight:{mode:"playful-scrapbook",word:"The good stuff",no:"06",detail:"Ideas that make an impression."},
  atlas:{mode:"research-index",word:"The case files",no:"07",detail:"Ideas with purpose and proof."},
  terminal:{mode:"command-console",word:"The build log",no:"08",detail:"Projects committed to the world."},
  orbit:{mode:"space-mission",word:"The missions",no:"09",detail:"Making space for new ideas."},
  playbill:{mode:"theatre-program",word:"The repertoire",no:"10",detail:"Performances and selected credits."},
  monologue:{mode:"screenplay-scenes",word:"The scenes",no:"11",detail:"Every choice moves the story."},
  portraiture:{mode:"portrait-gallery",word:"The lookbook",no:"12",detail:"Characters. Frames. Expression."},
  contactsheet:{mode:"photographic-contact",word:"The archive",no:"13",detail:"A sequence of selected frames."},
  atelier:{mode:"fashion-campaign",word:"The campaign",no:"14",detail:"A collection made with intention."},
  museum:{mode:"museum-exhibition",word:"The exhibition",no:"15",detail:"Objects, observations and meaning."},
  brutalist:{mode:"experimental-flyers",word:"The manifesto",no:"16",detail:"More ideas. Fewer conventions."},
  nocturne:{mode:"luxury-chapters",word:"The signature",no:"17",detail:"Only what deserves the spotlight."},
  foundry:{mode:"industrial-projects",word:"The practice",no:"18",detail:"Reliable work, visible results."},
  bloom:{mode:"botanical-journal",word:"The journal",no:"19",detail:"People, products and possibilities."},
  ledger:{mode:"business-briefs",word:"The outcomes",no:"20",detail:"Clarity in everything we deliver."},
  ...Object.fromEntries(originalDirections.map((d,i)=>[d.id,{mode:"ref-"+d.id,word:d.name,no:String(i+21).padStart(2,"0"),detail:d.tag}])),
};

function visual(item,i,ctx){
  const id=ctx.c.photoIds[i+1];
  if(id){
    return '<div class="case-image"><img src="'+E(ctx.assetBase+id+ctx.assetSuffix)+'" loading="lazy" alt="'+E(item.title||ctx.c.name)+'"></div>';
  }
  const direction=directionFor(ctx.t);
  if(direction) return '<div class="case-image case-art ref-case-art ref-case-'+E(direction.id)+'"><strong>'+String(i+1).padStart(2,"0")+'</strong><span>'+E(direction.name)+'</span></div>';
  // Each mode has its own visual geometry defined by page architecture CSS.
  return '<div class="case-image case-art">'+(ctx.sample?sampleArtwork(ctx.t,'work',i):illustrationArtwork(ctx.t))+'</div>';
}
function caseBody(item,i,ctx){
  return '<div class="case-body"><span class="case-counter">'+String(i+1).padStart(2,"0")+' / '+E(ctx.typeLabel)+'</span>'+
   '<h3>'+E(item.title||"Selected work")+'</h3>'+
   (item.description?'<p>'+prose(item.description)+'</p>':"")+
   (https(item.url)?'<a href="'+E(item.url)+'" target="_blank" rel="noopener noreferrer">Explore this work ↗︎</a>':"")+'</div>';
}
function workMarkup(mode,items,ctx){
  const figures=items.map((item,i)=>{
    const media=visual(item,i,ctx),body=caseBody(item,i,ctx);
    if(directionFor(ctx.t)) return '<article class="case-entry case-original case-'+E(ctx.t)+'"><span class="ref-case-counter">EDITION '+String(i+1).padStart(2,"0")+'</span>'+media+'<div class="ref-case-body">'+body+'</div></article>';
    switch(mode){
      case "index-records":return '<article class="case-entry case-record">'+body+media+'<span class="record-arrow" aria-hidden="true">↗︎</span></article>';
      case "editorial-spreads":return '<article class="case-entry case-spread"><div class="spread-figure">'+media+'<span>PLATE / '+String(i+1).padStart(2,"0")+'</span></div>'+body+'</article>';
      case "gallery-installation":return '<article class="case-entry case-installation">'+media+'<div class="gallery-plaque">'+body+'</div></article>';
      case "cinematic-reel":return '<article class="case-entry case-scene"><div class="scene-frame"><span class="scene-timecode">00 : '+String(i+1).padStart(2,"0")+' : 24</span>'+media+'<span class="scene-play" aria-hidden="true">▶︎</span></div>'+body+'</article>';
      case "poster-wall":return '<article class="case-entry case-poster"><span class="poster-snipe" aria-hidden="true">✳︎</span>'+media+body+'</article>';
      case "playful-scrapbook":return '<article class="case-entry case-note"><span class="note-tape" aria-hidden="true"></span>'+media+body+'</article>';
      case "research-index":return '<article class="case-entry case-research"><div class="research-line"><span>REF_'+String(i+1).padStart(3,"0")+'</span><span>ANALYSIS / OUTPUT</span></div>'+body+media+'</article>';
      case "command-console":return '<article class="case-entry case-command"><div class="command-prompt">visitor@portfolio:~$ <span>cat projects/'+String(i+1).padStart(2,"0")+'.md</span></div>'+body+'<div class="command-end">$ _</div></article>';
      case "space-mission":return '<article class="case-entry case-mission"><div class="mission-node">'+media+'<span>ORBIT / '+String(i+1).padStart(2,"0")+'</span></div>'+body+'</article>';
      case "theatre-program":return '<article class="case-entry case-program"><div class="program-number">'+String(i+1).padStart(2,"0")+'</div>'+body+'<div class="program-divider" aria-hidden="true">❦︎</div></article>';
      case "screenplay-scenes":return '<article class="case-entry case-screenplay"><p class="script-location">SCENE '+String(i+1).padStart(2,"0")+'. INT. PORTFOLIO — DAY</p>'+caseBody(item,i,ctx)+'<p class="script-end">CUT TO:</p></article>';
      case "portrait-gallery":return '<article class="case-entry case-portrait"><div class="portrait-mat">'+media+'</div>'+body+'</article>';
      case "photographic-contact":return '<article class="case-entry case-contact-frame">'+media+'<div class="contact-frame-info">'+body+'</div><span class="negative-id">FRAME '+String(i+1).padStart(2,"0")+'</span></article>';
      case "fashion-campaign":return '<article class="case-entry case-runway">'+media+'<div class="runway-overlay">'+body+'</div></article>';
      case "museum-exhibition":return '<article class="case-entry case-artifact"><div class="artifact-stand">'+media+'</div><div class="artifact-label">'+body+'</div></article>';
      case "experimental-flyers":return '<article class="case-entry case-flyer"><span class="flyer-stamp" aria-hidden="true">N° '+String(i+1).padStart(2,"0")+'</span>'+body+media+'</article>';
      case "luxury-chapters":return '<article class="case-entry case-noir"><div class="noir-number">'+String(i+1).padStart(2,"0")+'</div>'+media+body+'</article>';
      case "industrial-projects":return '<article class="case-entry case-job"><div class="job-index">'+String(i+1).padStart(2,"0")+'</div>'+body+media+'</article>';
      case "botanical-journal":return '<article class="case-entry case-journal"><span class="journal-spark" aria-hidden="true">✽︎</span>'+media+body+'</article>';
      case "business-briefs":return '<article class="case-entry case-report"><div class="report-tag">'+String(i+1).padStart(2,"0")+' / CASE STUDY</div><div class="report-media">'+media+'</div>'+body+'<span class="report-arrow" aria-hidden="true">↗︎</span></article>';
    }
  });
  return '<div class="art-directed-work mode-'+mode+'">'+figures.join("")+'</div>';
}
function heading(id,i,ctx){
  const titles={
    "Student résumé":{about:"Behind the ambition",work:"Projects & experiments",services:"What I can contribute",education:"Education",experience:"Experience",skills:"Skills & tools",testimonials:"References",contact:"Connect with me"},
    "Professional portfolio":{about:"My perspective",work:"Case studies",services:"Expertise",education:"Learning",experience:"The journey",skills:"Core capabilities",testimonials:"In their words",contact:"Start a conversation"},
    "Actor / model":{about:"The performer",work:"Credits & on-screen work",services:"Creative disciplines",education:"Training",experience:"Selected performances",skills:"Special skills",testimonials:"What people say",contact:"Casting enquiries"},
    "Creative portfolio":{about:"The artist",work:"Selected collection",services:"Creative services",education:"Education",experience:"Selected commissions",skills:"The craft",testimonials:"In collaboration",contact:"Let's create"},
    "Personal brand":{about:"My story",work:"What I am building",services:"Ways to collaborate",education:"Background",experience:"Milestones",skills:"Strengths",testimonials:"In their words",contact:"Let's connect"},
    "Small business":{about:"Our story",work:"Our work",services:"What we offer",education:"Background",experience:"Our story",skills:"Why choose us",testimonials:"Customer feedback",contact:"Let's talk"}
  };
  return titles[ctx.value.type]?.[id]||({about:"The story",work:"Selected work",services:"Services",education:"Education",experience:"Experience",skills:"Skills",testimonials:"Testimonials",contact:"Let's talk"})[id];
}
function shell(id,index,ctx,inside){
  const def=architectures[ctx.t];
  const intro=ctx.streamlined
    ? '<div class="chapter-intro chapter-intro--content"><h2>'+E(heading(id,index,ctx))+'</h2></div>'
    : '<div class="chapter-intro"><span class="chapter-num">'+def.no+' : '+String(index).padStart(2,"0")+'</span>'+
      '<span class="chapter-kicker">'+E(def.word)+' / '+E(id)+'</span>'+
      '<h2>'+E(heading(id,index,ctx))+'</h2>'+
      (id==="work"?'<p>'+E(def.detail)+'</p>':"")+'</div>';
  return '<section class="chapter chapter-'+E(id)+' chapter-'+def.mode+'" id="'+id+'">'+
    intro+'<div class="chapter-content">'+inside+'</div></section>';
}
export function designSections(value,{assetBase="/api/assets/",assetSuffix="",sample=false,streamlined=false}={}){
  const {content:c,design:d,template:t}=value;
  const def=architectures[t];
  if(!def)return null;
  const ctx={c,d,t,value,assetBase,assetSuffix,sample,streamlined,typeLabel:value.type==="Actor / model"?"CREDIT":value.type==="Small business"?"PROJECT":"WORK"};
  const items=c.cards?.length?c.cards:String(c.projects||"").split(/\n\s*\n/).filter(Boolean).map(x=>({title:x.split("\n")[0],description:x.split("\n").slice(1).join("\n"),url:""}));
  const sections=[];
  for(const [index,id] of d.sections.entries()){
    if(id==="about"&&c.bio){
      sections.push(shell(id,index+1,ctx,streamlined
        ? '<div class="architect-story architect-story--content"><p>'+prose(c.bio)+'</p></div>'
        : '<div class="architect-story"><span class="story-opening" aria-hidden="true">“</span><p>'+prose(c.bio)+'</p>'+
          '<span class="story-signature">'+E(c.name)+'</span><span class="story-art" aria-hidden="true">✳︎</span></div>'));
    } else if(id==="work"&&(items.length||c.photoIds.length>1)){
      const workItems=items.length?items:c.photoIds.slice(1).map((_,i)=>({title:"Selected work "+(i+1),description:"",url:""}));
      sections.push(shell(id,index+1,ctx,workMarkup(def.mode,workItems,ctx)));
    } else if(id==="services"&&c.services.length){
      const cards=c.services.map((item,i)=>'<article class="offer"><div class="offer-number">'+String(i+1).padStart(2,"0")+'</div><div><h3>'+E(item.title)+'</h3>'+
        (item.description?'<p>'+prose(item.description)+'</p>':"")+
        (https(item.url)?'<a href="'+E(item.url)+'" target="_blank" rel="noopener noreferrer">Learn more ↗︎</a>':"")+
        '</div><span class="offer-symbol" aria-hidden="true">↗︎</span></article>').join("");
      sections.push(shell(id,index+1,ctx,'<div class="art-directed-services">'+cards+'</div>'));
    } else if(["education","experience","skills"].includes(id)&&c[id]){
      sections.push(shell(id,index+1,ctx,'<div class="architect-history"><p class="history-tag">'+E(id)+' / '+E(c.name)+'</p><div>'+prose(c[id])+'</div></div>'));
    } else if(id==="testimonials"&&c.testimonials.length){
      sections.push(shell(id,index+1,ctx,'<div class="architect-testimonials">'+c.testimonials.map(x=>'<blockquote><p>“'+E(x.quote)+'”</p>'+
        (x.attribution?'<cite>— '+E(x.attribution)+'</cite>':"")+'</blockquote>').join("")+'</div>'));
    } else if(id==="contact"){
      const links=(c.publicEmail?'<a class="architect-contact-button" href="mailto:'+E(c.publicEmail)+'">Send an email <span aria-hidden="true">↗︎</span></a>':"")+
        (c.links||[]).filter(https).map(x=>'<a href="'+E(x)+'" target="_blank" rel="noopener noreferrer">'+E(new URL(x).hostname)+' ↗︎</a>').join("");
      if(streamlined){
        // No fabricated contact cards, boilerplate statements or decorative glyphs.
        // Genuine contact links remain accessible when the client supplies them.
        if(links) sections.push('<section class="chapter chapter-contact chapter-'+def.mode+' chapter-contact--minimal" id="contact"><div class="architect-contact-links architect-contact-links--minimal">'+links+'</div></section>');
      }else{
        sections.push(shell(id,index+1,ctx,'<div class="architect-contact"><span class="contact-emblem" aria-hidden="true">✳︎</span><p>'+
          E(value.type==="Small business"?"Your next project starts with a conversation.":value.type==="Actor / model"?"Available for casting enquiries and creative conversations.":"Something worth making starts here.")+
          '</p><div class="architect-contact-links">'+(links||'<p class="contact-setup-note">'+
            (ctx.sample?'Fictional portfolio demonstration — add your own email or contact link when building your site.':'This website has not published a contact method yet. Please check back for an updated way to get in touch.')+
          '</p>')+'</div></div>'));
      }
    }
  }
  return sections.join("");
}
export function designedHeader(value,ids){
  const def=architectures[value.template],mode=def.mode;
  return '<div class="architect-masthead"><span class="masthead-tag">'+def.no+' / '+E(mode.replace(/-/g," "))+'</span>'+
    '<strong>'+E(value.content.name)+'</strong><span class="masthead-persona">'+E(value.type)+'</span></div>';
}
export function designedFooter(value){
  const def=architectures[value.template];
  return '<div class="architect-endmark"><span>'+def.no+' / '+E(def.word)+'</span><span>✳︎</span><span>'+E(value.content.name)+'</span></div>';
}
export function architectureMode(id){return architectures[id]?.mode||null;}

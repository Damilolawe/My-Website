import {esc} from "./model.mjs";
import {originalDirections,directionFor} from "./refero-originals.mjs";
const E=esc;
const nav=(ids)=>ids.map(id=>'<a href="#'+E(id)+'">'+E(id==="work"?"Projects":id==="contact"?"Contact":id)+'</a>').join("");
const title=(c)=>'<a class="shell-brand" href="#main">'+E(c.name)+'</a>';
const small=(text)=>'<span class="shell-note">'+E(text)+'</span>';
export const shellIdentities={
 liquidmetal:"metal-machined-glass",
 index:"career-dossier",folio:"editorial-issue",still:"museum-minimal",afterhours:"cinema-credits",signal:"graphic-broadcast",
 daylight:"scrapbook-studio",atlas:"research-dashboard",terminal:"developer-command",orbit:"orbital-deck",
 playbill:"theatre-marquee",monologue:"typed-script",portraiture:"casting-lookbook",contactsheet:"photo-negative",
 atelier:"runway-catalogue",museum:"curatorial-exhibit",brutalist:"pasteup-zine",nocturne:"midnight-salon",
 foundry:"industrial-workshop",bloom:"botanical-card",ledger:"consultancy-brief",arcade:"esports-broadcast",
 ...Object.fromEntries(originalDirections.map(d=>[d.id,d.character]))
};
function head(v,ids){
 const t=v.template,c=v.content,ln=nav(ids),b=title(c);
 switch(t){
 case "index":return '<header class="shell-header shell-index"><div class="shell-vertical"><b>INDEX 001</b><span>PROFILE / PORTFOLIO</span></div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><div class="shell-header-end">OPEN FOR CONNECTION ↗︎</div></header>';
 case "folio":return '<header class="shell-header shell-folio"><div class="folio-rule"><span>EST. TODAY</span>'+b+'<span>ISSUE 001 / DIGITAL</span></div><nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav></header>';
 case "still":return '<header class="shell-header shell-still"><nav class="shell-nav" aria-label="Section navigation">'+b+'<span class="shell-nav-links">'+ln+'</span></nav><div class="still-hairline" aria-hidden="true"></div></header>';
 case "afterhours":return '<header class="shell-header shell-afterhours"><div class="cinema-topline"><span>REC ●</span>'+b+'<span>00:00:01:24</span></div><nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav><div class="cinema-perforation" aria-hidden="true">▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣</div></header>';
 case "signal":return '<header class="shell-header shell-signal"><div class="signal-brandbar">'+b+'<span>YOU ARE HERE →︎</span></div><nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav></header>';
 case "daylight":return '<header class="shell-header shell-daylight"><div class="daylight-tab" aria-hidden="true">✿︎</div><nav class="shell-nav" aria-label="Section navigation">'+b+'<span class="shell-nav-links">'+ln+'</span></nav></header>';
 case "atlas":return '<header class="shell-header shell-atlas"><div class="atlas-id">PORTFOLIO / 001<br>OBJECTIVE — THE FUTURE</div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><span class="atlas-registration">REF.001 ↗︎</span></header>';
 case "terminal":return '<header class="shell-header shell-terminal"><div class="terminal-headerbar"><span>● ● ●</span><code>~ / '+E(c.name.toLowerCase().replace(/[^a-z0-9 ]/g,"").slice(0,45))+'</code><span>↗︎</span></div><nav class="shell-nav" aria-label="Section navigation"><span class="terminal-prompt">$ cd ~</span>'+b+ln+'</nav></header>';
 case "orbit":return '<header class="shell-header shell-orbit"><div class="orbit-compass" aria-hidden="true">◎</div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><div class="orbit-coordinates">LONGITUDE 020 / LATITUDE 026</div></header>';
 case "playbill":return '<header class="shell-header shell-playbill"><p class="playbill-fineprint">THE PERFORMING ARTS / PRESENTS</p>'+b+'<nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav><p class="playbill-fineprint">ADMIT ONE / ALL ARE WELCOME</p></header>';
 case "monologue":return '<header class="shell-header shell-monologue"><div class="script-pagination">ORIGINAL SCREENPLAY<br>PAGE 01</div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><span class="script-paperclip" aria-hidden="true">⌁</span></header>';
 case "portraiture":return '<header class="shell-header shell-portraiture"><div class="portrait-count">LOOK 001 / SERIES 01</div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><div class="portrait-frame-number">+ 001/020 +</div></header>';
 case "contactsheet":return '<header class="shell-header shell-contactsheet"><div class="negative-dashes" aria-hidden="true">▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦</div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><div class="negative-dashes" aria-hidden="true">▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦</div></header>';
 case "atelier":return '<header class="shell-header shell-atelier"><div class="atelier-seasons">COLLECTION 001 / INDEPENDENT</div><nav class="shell-nav" aria-label="Section navigation">'+b+'<span class="shell-nav-links">'+ln+'</span></nav><div class="atelier-seasonline">THE ART OF APPEARING</div></header>';
 case "museum":return '<header class="shell-header shell-museum"><div class="museum-exhibit-tag">GALLERY 001 — NOW VIEWING</div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><div class="museum-entrance">ENTRANCE →︎</div></header>';
 case "brutalist":return '<header class="shell-header shell-brutalist"><div class="brutalist-brand">'+b+'<b aria-hidden="true">✳︎</b></div><nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav><span class="brutalist-strapline">MAKE SOME NOISE / ISSUE 001</span></header>';
 case "nocturne":return '<header class="shell-header shell-nocturne"><div class="nocturne-star" aria-hidden="true">✦︎</div>'+b+'<nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav><div class="nocturne-byline">THE SIGNATURE EDITION</div></header>';
 case "foundry":return '<header class="shell-header shell-foundry"><div class="foundry-stamp" aria-hidden="true">F—01</div><div class="foundry-heading">'+b+small("HONEST WORK / CLEAR RESULTS")+'</div><nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav></header>';
 case "bloom":return '<header class="shell-header shell-bloom"><span class="bloom-flowerlet" aria-hidden="true">✻︎</span>'+b+'<nav class="shell-nav" aria-label="Section navigation">'+ln+'</nav><div class="bloom-wave" aria-hidden="true">﹏﹏﹏</div></header>';
 case "ledger":return '<header class="shell-header shell-ledger"><div class="ledger-rule"><span>BUSINESS / EDITION 01</span><span>01 — 20</span></div><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav><div class="ledger-underheader"><span>THINK BIGGER.</span><span>WORK SMARTER.</span></div></header>';
 default: {
  const dir=directionFor(t);
  if(dir) return '<header class="shell-header shell-'+E(t)+'"><div class="ref-topline"><span>'+E(dir.style)+'</span><span>ORIGINAL / 001</span></div><nav class="shell-nav" aria-label="Section navigation">'+b+'<span class="shell-nav-links">'+ln+'</span></nav></header>';
  return '<header class="shell-header"><nav class="shell-nav" aria-label="Section navigation">'+b+ln+'</nav></header>';
 }
 }
}
function foot(v){
 const c=v.content,t=v.template,name=E(c.name);
 const sign={
 index:["NEXT / CHAPTER","APPLIED EXPERIENCE"],folio:["THE END","A CURATED EDITION"],still:["COLLECTION COMPLETE","THE WORK CONTINUES"],afterhours:["END CREDITS","STARRING THE WORK"],signal:["NEVER BLEND IN","LEAVE A MARK"],
 daylight:["STAY CURIOUS","SEE YOU OUT THERE"],atlas:["FILE CLOSED","NEXT DISCOVERY AHEAD"],terminal:["process.exit(0)","THANK YOU FOR VISITING"],orbit:["MISSION COMPLETE","NEXT DESTINATION"],playbill:["CURTAIN CALL","THANK YOU FOR ATTENDING"],monologue:["FADE OUT.","TO BE CONTINUED"],portraiture:["THAT'S A WRAP","NEXT LOOK"],contactsheet:["END OF ROLL","ARCHIVE / 001"],atelier:["END OF COLLECTION","EST. TODAY"],museum:["EXIT THROUGH IDEAS","VISIT AGAIN"],brutalist:["THAT'S ALL.","OR IS IT?"],nocturne:["THE FINAL WORD","UNTIL NEXT TIME"],foundry:["BUILT TO LAST","NEXT JOB"],bloom:["GROW WITH US","GOOD THINGS AHEAD"],ledger:["BRIEF CLOSED","WORK IN PROGRESS"]
 }[t]||["THE END","NEXT CHAPTER"];
 return '<footer class="shell-footer shell-footer-'+t+'"><span class="shell-footer-index">'+E(sign[1])+'</span><strong>'+E(sign[0])+'</strong><div class="shell-footer-bottom"><span>'+name+'</span><a href="#main">BACK TO START ↗︎</a></div></footer>';
}
function middle(v,hero,sections,interlude){
 switch(v.template){
 case "folio":case "atelier":case "museum":return '<div class="shell-opening shell-opening-editorial">'+hero+'</div><div class="shell-mid">'+sections+'</div>'+interlude;
 case "terminal":case "ledger":case "atlas":return '<div class="shell-opening shell-opening-technical">'+hero+interlude+'</div><div class="shell-mid shell-mid-technical">'+sections+'</div>';
 case "afterhours":case "monologue":case "playbill":return '<div class="shell-opening shell-opening-performance">'+hero+'</div>'+interlude+'<div class="shell-mid shell-mid-performance">'+sections+'</div>';
 case "brutalist":case "signal":return interlude+'<div class="shell-opening shell-opening-graphic">'+hero+'</div><div class="shell-mid shell-mid-graphic">'+sections+'</div>';
 case "still":case "nocturne":case "portraiture":return '<div class="shell-opening shell-opening-quiet">'+hero+'</div><div class="shell-mid shell-mid-quiet">'+sections+'</div>'+interlude;
 case "contactsheet":return hero+sections+interlude;
 case "foundry":case "bloom":case "daylight":return '<div class="shell-opening shell-opening-business">'+hero+interlude+'</div><div class="shell-mid shell-mid-business">'+sections+'</div>';
 default:return hero+interlude+sections;
 }
}
export function siteChrome(value,{hero,sections,interlude,navIds}){
 const t=value.template,mode=shellIdentities[t]||"base";
 const compact=value.design.navigation==="compact";
 const ids=compact?navIds.filter(x=>["work","contact"].includes(x)):navIds;
 return '<div class="site-architecture site-architecture-'+E(t)+'" data-architecture="'+E(mode)+'">'+
  head(value,ids)+
  '<main id="main" class="page shell-main">'+middle(value,hero,sections,interlude)+'</main>'+
  foot(value)+'</div>';
}


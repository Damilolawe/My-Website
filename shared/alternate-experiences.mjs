import { esc } from "./model.mjs";
import { illustrationArtwork } from "./photographic-direction.mjs";
const E=(s)=>esc(s);
const lead=(c,t,cta)=>'<div class="hero-copy"><p class="eyebrow hero-label">'+E(c.heroLabel||t)+'</p><h1 id="hero-title">'+E(c.headline)+'</h1>'+(c.bio?'<p class="hero-intro">'+E(c.bio.split("\n")[0].slice(0,210))+'</p>':'')+'<div class="hero-actions"><a class="pill-link" href="'+cta+'">'+E(c.ctaLabel)+' ↗︎</a></div></div>';
const frame=(image,template)=>'<div class="hero-media">'+(image||illustrationArtwork(template))+'</div>';
export const alternateIds=["atlas","terminal","orbit","playbill","monologue","portraiture","contactsheet","atelier","museum","brutalist","nocturne","foundry","bloom","ledger"];
export function alternateHero(t,{c,value,heroImage,ctaTarget}) {
  const words=lead(c,value.type,ctaTarget),media=frame(heroImage,t),name=E(c.name);
  switch(t){
    case "atlas":
      return '<section class="hero hero-variant atlas-hero" aria-labelledby="hero-title"><div class="atlas-top eyebrow"><span>001 — FULL PROFILE</span><span>DESIGNING THE FUTURE</span></div><div class="atlas-layout"><aside class="atlas-side eyebrow">01 / OVERVIEW <span>● ACTIVE STORY</span></aside>'+words+'<div class="atlas-visual">'+media+'<div class="atlas-caption">PROFILE / '+name+'</div></div></div><div class="atlas-bottom eyebrow">RESEARCH / DESIGN / DELIVERY <b aria-hidden="true">↗︎</b></div></section>';
    case "terminal":
      return '<section class="hero hero-variant terminal-hero" aria-labelledby="hero-title"><div class="terminal-window"><div class="terminal-bar"><span class="terminal-dots" aria-hidden="true">● ● ●</span><span>portfolio.sh — '+name+'</span><span>□</span></div><div class="terminal-interface"><div class="terminal-command">visitor@'+name.replace(/[^a-z0-9]/gi,"").toLowerCase().slice(0,20)+':~$ <span>open --portfolio</span></div>'+words+'<div class="terminal-output"><span class="terminal-caret" aria-hidden="true">▋</span> Ready to make an impact.</div>'+(c.photoIds[0]?'<figure class="terminal-customer-photo" style="margin:24px 0 0">'+heroImage+'</figure>':'')+'</div></div><div class="terminal-under eyebrow"><span>INTERFACE / 001</span><span>DESIGNED TO FUNCTION</span></div></section>';
    case "orbit":
      return '<section class="hero hero-variant orbit-hero" aria-labelledby="hero-title"><div class="orbit-particles" aria-hidden="true"><i></i><i></i><i></i></div><div class="orbit-visual">'+media+'<span class="orbit-number eyebrow">A / 360°</span></div><div class="orbit-words">'+words+'</div><div class="orbit-vertical eyebrow">IDEAS / TOMORROW / TODAY</div></section>';
    case "playbill":
      return '<section class="hero hero-variant playbill-hero" aria-labelledby="hero-title"><div class="playbill-header eyebrow">THE PERFORMERS ISSUE <span>—</span> SEASON 01</div><div class="playbill-stage"><div class="playbill-ornament" aria-hidden="true">✧︎</div><div class="playbill-words">'+words+'</div><div class="playbill-image">'+media+'</div></div><div class="playbill-footer"><strong>'+name+'</strong><span class="eyebrow">LIGHTS. CAMERA. CHARACTER.</span></div></section>';
    case "monologue":
      return '<section class="hero hero-variant monologue-hero" aria-labelledby="hero-title"><div class="script-page"><div class="script-header eyebrow"><span>FADE IN:</span><span>SCENE 01 / THE INTRODUCTION</span></div><p class="script-direction">INT. THE NEXT CHAPTER — DAY</p><div class="script-character">'+name.toUpperCase()+'</div>'+words+'<div class="script-end eyebrow">CUT TO: THE WORK ↓︎</div></div><div class="script-edge" aria-hidden="true">01</div></section>';
    case "portraiture":
      return '<section class="hero hero-variant portraiture-hero" aria-labelledby="hero-title"><div class="portraiture-mosaic" aria-hidden="true"><span></span><span></span><span></span><span></span></div><div class="portraiture-image">'+media+'<span class="portraiture-seal eyebrow">01 / LOOKBOOK</span></div><div class="portraiture-copy">'+words+'</div><div class="portraiture-bottom eyebrow">THE FACES / THE STORIES / THE MOMENTS</div></section>';
    case "contactsheet":
      return '<section class="hero hero-variant contactsheet-hero" aria-labelledby="hero-title"><div class="contactsheet-strip eyebrow"><span>ARCHIVE / 001</span><span>SELECTED FRAME / '+name+'</span></div><div class="contactsheet-board"><div class="contactsheet-grid" aria-hidden="true"><i>01</i><i>02</i><i>03</i><i>04</i><i>05</i><i>06</i></div><div class="contactsheet-center">'+words+'</div></div><p class="contactsheet-foot eyebrow">FRAME. FOCUS. FEELING. <b>↗︎</b></p></section>';
    case "atelier":
      return '<section class="hero hero-variant atelier-hero" aria-labelledby="hero-title"><div class="atelier-head eyebrow">COLLECTION 001 / THE PERSON BEHIND THE WORK</div><div class="atelier-stage"><div class="atelier-numeral" aria-hidden="true">01</div><div class="atelier-photo">'+media+'</div><div class="atelier-copy">'+words+'</div></div><div class="atelier-bottom eyebrow"><span>AN EXERCISE IN EXPRESSION</span><span>'+name+'</span></div></section>';
    case "museum":
      return '<section class="hero hero-variant museum-hero" aria-labelledby="hero-title"><div class="museum-index eyebrow">EXHIBITION / 001 / A NEW POINT OF VIEW</div><div class="museum-plinth">'+media+'<span class="museum-object-label eyebrow">OBJECT NO. 01</span></div><div class="museum-words">'+words+'</div><div class="museum-line eyebrow">A LIVING COLLECTION OF IDEAS — '+name+'</div></section>';
    case "brutalist":
      return '<section class="hero hero-variant brutalist-hero" aria-labelledby="hero-title"><div class="brutalist-strap" aria-hidden="true">NO MORE ORDINARY. NO MORE ORDINARY. NO MORE ORDINARY.</div><div class="brutalist-stage">'+words+'<div class="brutalist-icon" aria-hidden="true">✳︎</div><div class="brutalist-art">'+media+'</div></div><div class="brutalist-tape eyebrow">'+name+' <span>DO SOMETHING LOUD.</span></div></section>';
    case "nocturne":
      return '<section class="hero hero-variant nocturne-hero" aria-labelledby="hero-title"><div class="nocturne-stars" aria-hidden="true">✦︎ ✧︎ ✦︎ ✧︎ ✦︎</div><div class="nocturne-center"><span class="nocturne-monogram" aria-hidden="true">N°</span>'+words+'<div class="nocturne-ring" aria-hidden="true"></div></div><div class="nocturne-footer eyebrow">'+name+' <span>INDEPENDENCE. INTENTION. IMPACT.</span></div></section>';
    case "foundry":
      return '<section class="hero hero-variant foundry-hero" aria-labelledby="hero-title"><div class="foundry-top eyebrow"><strong>'+name+'</strong><span>WORK WITH PURPOSE / EST. TODAY</span></div><div class="foundry-layout"><div class="foundry-copy">'+words+'</div><div class="foundry-graphic">'+media+'<span class="foundry-badge" aria-hidden="true">F / 01</span></div></div><div class="foundry-rule eyebrow">HONEST WORK. HIGH STANDARDS. GOOD PEOPLE.</div></section>';
    case "bloom":
      return '<section class="hero hero-variant bloom-hero" aria-labelledby="hero-title"><div class="bloom-flower" aria-hidden="true">✿︎</div><div class="bloom-label eyebrow">SMALL BUSINESS. BIG HEART.</div><div class="bloom-stage">'+words+'<div class="bloom-portrait">'+media+'</div></div><div class="bloom-foot eyebrow">YOU BELONG HERE. <span>✳︎</span></div></section>';
    case "ledger":
      return '<section class="hero hero-variant ledger-hero" aria-labelledby="hero-title"><div class="ledger-top eyebrow"><span>CLARITY IS EVERYTHING.</span><span>ISSUE 01 / A BETTER BUSINESS</span></div><div class="ledger-lines" aria-hidden="true"></div><div class="ledger-main">'+words+'<div class="ledger-card"><span class="eyebrow">THE WORK / IN FOCUS</span>'+media+'<span class="eyebrow">'+name+'</span></div></div><div class="ledger-bottom eyebrow">GOOD THINKING. WELL EXECUTED. ↗︎</div></section>';
    default:return null;
  }
}

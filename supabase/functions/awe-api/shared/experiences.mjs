import {alternateHero} from "./alternate-experiences.mjs";
import {esc} from "./model.mjs";
const e=(s)=>esc(s);
const art='<div class="experience-art" aria-hidden="true"><span class="art-orb"></span><span class="art-orbit"></span><span class="art-shard"></span><span class="art-signature">A / D</span></div>';
const kicker=(c,t)=>'<p class="eyebrow hero-label">'+e(c.heroLabel||t)+'</p>';
const headline=(c)=>'<h1 id="hero-title">'+e(c.headline)+'</h1>';
const copy=(c,t,cta)=>'<div class="hero-copy">'+kicker(c,t)+headline(c)+(c.bio?'<p class="hero-intro">'+e(c.bio.split("\n")[0].slice(0,210))+'</p>':'')+'<div class="hero-actions"><a class="pill-link" href="'+cta+'">'+e(c.ctaLabel)+' ↗︎</a></div></div>';
export function experienceHero(t,{c,value,heroImage,ctaTarget}) {
  const words=copy(c,value.type,ctaTarget);
  const image='<div class="hero-media">'+(heroImage||art)+'</div>';
  switch(t){
    case "index": return '<section class="hero hero-variant index-hero" aria-labelledby="hero-title"><div class="index-lines" aria-hidden="true"></div><span class="index-overline eyebrow">01 / YOUR NEXT CHAPTER</span>'+words+'<div class="index-identity">'+image+'<div class="identity-stamp"><span class="eyebrow">PORTFOLIO / PROFILE</span><strong>'+e(c.name)+'</strong><span aria-hidden="true">✳︎</span></div></div></section>';
    case "folio": return '<section class="hero hero-variant folio-hero" aria-labelledby="hero-title"><div class="folio-masthead eyebrow"><span>THE SELECTED WORKS</span><span>AN INDEPENDENT PORTFOLIO</span></div><div class="folio-words">'+words+'</div><div class="folio-picture">'+image+'<span class="folio-volume eyebrow">VOL. 001 / ✳︎</span></div><div class="folio-colophon eyebrow">'+e(c.name)+' / STORY · IMAGE · IDEAS</div></section>';
    case "still": return '<section class="hero hero-variant still-hero" aria-labelledby="hero-title"><div class="still-top eyebrow">THE ART OF PRESENCE <span>— 01</span></div><div class="still-stage">'+image+'<div class="still-words">'+words+'</div></div><div class="still-footer eyebrow"><span>'+e(c.name)+'</span><span>AN INDEPENDENT PORTFOLIO</span></div></section>';
    case "afterhours": return '<section class="hero hero-variant afterhours-hero" aria-labelledby="hero-title"><div class="afterhours-screen">'+image+'<div class="afterhours-veil"></div><span class="afterhours-frame eyebrow">SCENE 01 / INTRODUCING</span><div class="afterhours-words">'+words+'</div><span class="afterhours-count eyebrow">THE WORK BEGINS HERE ↗︎</span></div><div class="afterhours-footer eyebrow"><span>'+e(c.name)+'</span><span>PORTFOLIO / MOTION / STORY</span></div></section>';
    case "signal": return '<section class="hero hero-variant signal-hero" aria-labelledby="hero-title"><div class="signal-tape" aria-hidden="true"><span>MAKE YOUR MARK ✳︎ MAKE YOUR MARK ✳︎ MAKE YOUR MARK ✳︎</span></div><div class="signal-stage">'+words+'<div class="signal-artwork">'+image+'<span class="signal-sticker-a" aria-hidden="true">NEW<br>ENERGY↗︎</span><span class="signal-sticker-b" aria-hidden="true">✳︎</span></div></div><div class="signal-footer eyebrow">'+e(c.name)+' / IDEAS THAT TAKE UP SPACE</div></section>';
    case "daylight": return '<section class="hero hero-variant daylight-hero" aria-labelledby="hero-title"><div class="daylight-sun" aria-hidden="true">✳︎</div><div class="daylight-badge eyebrow">YOUR NEXT BIG THING ↗︎</div>'+words+'<div class="daylight-photo">'+image+'<span class="daylight-hello" aria-hidden="true">HEY!</span></div><div class="daylight-footer eyebrow">GOOD WORK. GOOD ENERGY. ✺︎</div></section>';
    default: return alternateHero(t,{c,value,heroImage,ctaTarget}) || '<section class="hero hero-variant" aria-labelledby="hero-title">'+words+image+'</section>';
  }
}
export function experienceInterlude(t,c) {
  const lines={index:"YOUR NEXT CHAPTER",folio:"IN THE DETAILS",still:"MADE WITH PURPOSE",afterhours:"ON THE REEL",signal:"NEVER BLEND IN",daylight:"THE GOOD STUFF",atlas:"CLARITY IN MOTION",terminal:"HELLO WORLD",orbit:"WITHOUT LIMITS",playbill:"TAKE THE STAGE",monologue:"THE NEXT SCENE",portraiture:"EVERY ANGLE",contactsheet:"THE CONTACT SHEET",atelier:"THE COLLECTION",museum:"A LIVING EXHIBITION",brutalist:"MAKE SOME NOISE",nocturne:"THE ART OF PRESENCE",foundry:"MADE TO LAST",bloom:"GOOD THINGS GROW",ledger:"THINK BIGGER"};
  const label=lines[t]||"MADE WITH INTENTION";
  return '<div class="experience-interlude" aria-label="'+e(label)+'"><div class="experience-track" aria-hidden="true">'+Array.from({length:4},()=>'<span>'+e(label)+' <b>✳︎</b> '+e(c.name)+' <b>↗︎</b></span>').join('')+'</div></div>';
}


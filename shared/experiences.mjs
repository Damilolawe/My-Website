import {alternateHero} from "./alternate-experiences.mjs";
import {esc} from "./model.mjs";
import { illustrationArtwork } from "./photographic-direction.mjs";
const e=(s)=>esc(s);

const kicker=(c,t)=>'<p class="eyebrow hero-label">'+e(c.heroLabel||t)+'</p>';
const headline=(c)=>'<h1 id="hero-title">'+e(c.headline)+'</h1>';
const copy=(c,t,cta)=>'<div class="hero-copy">'+kicker(c,t)+headline(c)+(c.bio?'<p class="hero-intro">'+e(c.bio.split("\n")[0].slice(0,210))+'</p>':'')+'<div class="hero-actions"><a class="pill-link" href="'+cta+'">'+e(c.ctaLabel)+' ↗︎</a></div></div>';
export function experienceHero(t,{c,value,heroImage,ctaTarget}) {
  const words=copy(c,value.type,ctaTarget);
  const image='<div class="hero-media">'+(heroImage||illustrationArtwork(t))+'</div>';
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
  // Twenty personalities, four fundamentally different editorial rhythms.
  // Dynamic names/headlines are escaped, and no fake client claims are inserted.
  const themes={
    index:["THE NEXT CHAPTER","01 / THE DOSSIER","precise"],
    folio:["THOUGHTFULLY, IN PRINT.","02 / A NEW PERSPECTIVE","editorial"],
    still:["A QUIETER KIND OF IMPACT.","03 / THE COLLECTION","editorial"],
    afterhours:["ROLL THE NEXT SCENE.","04 / THE SCREENING","cinema"],
    signal:["MAKE SOMETHING LOUD.","05 / THE FREQUENCY","graphic"],
    daylight:["THE GOOD STUFF STARTS HERE.","06 / THE DAYBOOK","graphic"],
    atlas:["EVERY IDEA, MAPPED.","07 / THE RESEARCH","precise"],
    terminal:["BUILD WHAT COMES NEXT.","08 / SYSTEM READY","precise"],
    orbit:["TAKE UP MORE SPACE.","09 / THE MISSION","precise"],
    playbill:["YOU'RE ON THE BILL.","10 / THE PROGRAM","cinema"],
    monologue:["AND... ACTION.","11 / THE SCRIPT","cinema"],
    portraiture:["BEYOND THE PORTRAIT.","12 / THE LOOKBOOK","editorial"],
    contactsheet:["THE MOMENT, HELD.","13 / THE ARCHIVE","graphic"],
    atelier:["EVERY DETAIL IS INTENTIONAL.","14 / THE COLLECTION","editorial"],
    museum:["GOOD WORK BELONGS ON DISPLAY.","15 / THE EXHIBITION","editorial"],
    brutalist:["NORMAL IS NOT THE BRIEF.","16 / THE MANIFESTO","graphic"],
    nocturne:["THE ART OF LESS.","17 / THE SIGNATURE","editorial"],
    foundry:["MAKE IT MEAN SOMETHING.","18 / THE WORKSHOP","precise"],
    bloom:["MADE TO GROW.","19 / THE GARDEN","graphic"],
    ledger:["THE WORK SPEAKS.","20 / THE BRIEF","precise"]
  };
  const [message,eyebrow,mode]=themes[t]||themes.index;
  const safeName=e(c.name||"Selected work");
  return '<aside class="experience-interlude studio-index studio-index--'+e(t)+' studio-index--'+mode+'" aria-label="'+e(message)+'">'+
    '<div class="experience-track studio-index-inner">'+
    '<span class="studio-index-number" aria-hidden="true">'+e(eyebrow.slice(0,2))+'</span>'+
    '<div class="studio-index-message"><span class="studio-index-eyebrow">'+e(eyebrow)+'</span><strong>'+e(message)+'</strong><span class="studio-index-rule" aria-hidden="true"></span></div>'+
    '<div class="studio-index-side"><span>'+safeName+'</span><span class="studio-index-glyph" aria-hidden="true">↗</span></div>'+
    '</div></aside>';
}

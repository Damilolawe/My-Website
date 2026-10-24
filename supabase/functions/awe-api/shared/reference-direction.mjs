import {esc} from "./model.mjs";
import {directionFor} from "./refero-originals.mjs";
const E = esc;
const glyphs = {
fieldnotes:"01—22",cutouts:"✂",orchard:"◉",specimen:"Aa",gazette:"№ 01",
negative:"◐",workshop:"⌗",hearth:"◒",clinical:"+",carryall:"001",
threshold:"⌂",runway:"STUDIO",porcelain:"◎",kinetic:"MOVE",nightgrid:">_",
couture:"ATELIER",signaldeck:"▦",obsidian:"◑",highlighter:"↗"
};
export function directionHero(value,heroImage,ctaTarget) {
 const d=directionFor(value.template),c=value.content;
 if(!d)return null;
 const media=heroImage ? '<div class="ref-image">'+heroImage+'</div>' : '<div class="ref-art" role="img" aria-label="Original '+E(d.style)+' design illustration"><span>'+E(glyphs[d.id])+'</span></div>';
 const words='<div class="ref-words hero-copy"><span class="eyebrow hero-label">'+E(c.heroLabel||d.style)+'</span><h1 id="hero-title">'+E(c.headline)+'</h1><p class="hero-intro">'+E(String(c.bio||d.tag).split("\n")[0].slice(0,210))+'</p><div class="hero-actions"><a class="pill-link" href="'+ctaTarget+'">'+E(c.ctaLabel||"Explore work")+' ↗︎</a></div></div>';
 const stamp='<span class="ref-stamp eyebrow">'+E(c.name)+' / '+E(d.character)+'</span>';
 const kicker='<span class="ref-index eyebrow">ORIGINAL / '+E(d.id.toUpperCase())+'</span>';
 return '<section class="hero hero-variant ref-'+E(d.id)+' ref-hero ref-'+E(d.id)+'-hero" data-architecture="'+E(d.character)+'" aria-labelledby="hero-title">'+kicker+words+'<div class="ref-media">'+media+stamp+'</div></section>';
}
export const directionCSS = `
.ref-hero{display:grid;grid-template-columns:1.04fr .96fr;gap:clamp(24px,5vw,85px);align-items:center;position:relative;min-height:710px}
.ref-hero .ref-words{min-width:0;position:relative;z-index:2}.ref-hero h1{font-size:clamp(3.5rem,7.4vw,8.6rem);line-height:.94;letter-spacing:-.065em;max-width:13ch}
.ref-index{position:absolute;top:23px;left:0;color:var(--muted)}.ref-media{min-height:480px;position:relative;overflow:hidden;background:var(--secondary)}
.ref-art{min-height:480px;height:100%;position:relative;display:grid;place-items:center;overflow:hidden;color:var(--accent);background:var(--secondary)}
.ref-art:before{content:"";width:54%;aspect-ratio:1;border:clamp(15px,3vw,50px) solid currentColor;border-radius:50%;position:absolute;opacity:.32}
.ref-art:after{content:"";height:140%;width:2px;background:currentColor;opacity:.35;position:absolute;transform:rotate(35deg)}
.ref-art span{position:relative;z-index:2;font:800 clamp(5rem,13vw,13rem)/.9 Georgia,serif;letter-spacing:-.12em;text-align:center;overflow-wrap:anywhere;padding:20px}
.ref-stamp{position:absolute;left:18px;bottom:16px;z-index:4;background:var(--bg);padding:8px 12px;color:var(--fg)}
.ref-image{height:100%}.ref-image img{width:100%;height:100%;min-height:480px;object-fit:cover}
.ref-hero .hero-actions{margin-top:32px}
.fieldnotes .ref-media{border:1px solid currentColor}.fieldnotes .ref-art{background:repeating-linear-gradient(0deg,transparent 0 39px,#00000018 40px),repeating-linear-gradient(90deg,transparent 0 39px,#00000018 40px),var(--secondary)}.fieldnotes .work-grid{grid-template-columns:2fr 1fr}
.cutouts .ref-hero{grid-template-columns:.95fr 1.05fr}.cutouts .ref-media{transform:rotate(3deg);box-shadow:14px 15px 0 var(--accent)}.cutouts .work-card:nth-child(2){transform:rotate(2deg)}.cutouts h1{font-style:italic}
.orchard .ref-hero h1{font-family:Georgia,serif;font-weight:400;font-style:italic}.orchard .ref-media{border-radius:270px 270px 0 0}.orchard .pill-link{border-radius:60px}.orchard .work-card{border-radius:28px}
.specimen .ref-hero{grid-template-columns:1fr;gap:26px}.specimen h1{font-family:Georgia,serif;font-size:clamp(6rem,11vw,12rem);max-width:100%;border-bottom:7px solid currentColor}.specimen .ref-media{width:70%;margin-left:auto;min-height:320px}.specimen .ref-art{min-height:320px}.specimen .work-grid{grid-template-columns:1fr 1fr}
.gazette .ref-hero{border-top:5px double currentColor;border-bottom:5px double currentColor}.gazette h1{font-family:Georgia,serif;text-transform:uppercase;font-weight:500}.gazette .section{border-top:5px double var(--fg)}.gazette .work-card{background:transparent;border-width:0 0 1px;border-radius:0}
.negative{--bg:#111518!important;--fg:#f1f2ee!important;--surface:#22282a!important;--border:#ffffff42!important;--muted:#bdc2c2!important}.negative .ref-hero{grid-template-columns:1fr 1.14fr}.negative .ref-media{min-height:640px;filter:grayscale(1)}.negative .ref-art{min-height:640px}.negative .work-grid{grid-template-columns:1fr 1fr}
.workshop .ref-hero{grid-template-columns:.83fr 1.17fr}.workshop .ref-art{background:repeating-linear-gradient(0deg,transparent 0 29px,#1112 30px),repeating-linear-gradient(90deg,transparent 0 29px,#1112 30px),var(--secondary)}.workshop h1{text-transform:uppercase;font-weight:800}.workshop .work-grid{gap:0}
.hearth .ref-hero h1{font-family:Georgia,serif;font-weight:400;line-height:1.05}.hearth .ref-media{border-radius:240px 240px 0 0;min-height:600px}.hearth .ref-art{min-height:600px}.hearth .service-card{border-radius:110px 110px 10px 10px}
.clinical .ref-media{border:1px dashed var(--accent);border-radius:18px}.clinical .ref-art{background:linear-gradient(90deg,transparent 49.7%,var(--accent) 50%,transparent 50.3%),linear-gradient(transparent 49.7%,var(--accent) 50%,transparent 50.3%),var(--secondary)}.clinical .ref-art span{font-family:Arial,sans-serif;font-weight:300}.clinical .work-card{border-radius:18px}
.carryall .ref-hero h1{font:900 clamp(4rem,7vw,9rem)/.87 Arial,sans-serif;text-transform:uppercase}.carryall .ref-media{border:14px solid var(--accent)}.carryall .ref-art span{font-family:Arial Black,Arial,sans-serif}.carryall .section{border-top:4px solid var(--fg)}
.threshold h1{font:400 clamp(4rem,7.5vw,9rem)/1 Georgia,serif}.threshold .ref-media{border-radius:260px 260px 12px 12px}.threshold .ref-art:before{border-radius:50% 50% 0 0;transform:scaleX(.7)}.threshold .work-card{border-radius:20px}
.runway .ref-hero{grid-template-columns:1fr}.runway .ref-words h1{font:400 clamp(6rem,11vw,12rem)/.95 Georgia,serif;max-width:100%}.runway .ref-media{min-height:700px}.runway .ref-art{min-height:700px;background:repeating-linear-gradient(90deg,var(--secondary) 0 18%,var(--accent) 18% 20%,var(--secondary) 20% 39%)}.runway .work-card:nth-child(even){transform:translateY(40px)}
.porcelain h1{font:400 clamp(4rem,6vw,7rem)/1.04 Georgia,serif}.porcelain .ref-media{aspect-ratio:1;border-radius:50%;min-height:0}.porcelain .ref-art{min-height:0;aspect-ratio:1}.porcelain .work-card{border:0;background:transparent}
.kinetic h1{font:900 clamp(4.3rem,8vw,10rem)/.88 Arial,sans-serif;text-transform:uppercase;font-style:italic;transform:skewY(-4deg)}.kinetic .ref-media{transform:skewY(-5deg)}.kinetic .ref-art:before{border-radius:0;transform:skew(-25deg) scaleX(.45)}.kinetic .section{border-top:6px solid var(--fg)}
.nightgrid{--bg:#0d0d13!important;--fg:#f4f1fa!important;--surface:#1b1b25!important;--muted:#bdafc7!important;--border:#ffffff44!important}.nightgrid .ref-media{border:1px solid #6d5d7b;border-radius:20px;box-shadow:0 20px 100px #7953ff20}.nightgrid .ref-art{background:repeating-linear-gradient(0deg,transparent 0 22px,#ffffff17 23px),#191723}.nightgrid .work-card{border-radius:16px}
.couture .ref-hero{grid-template-columns:.75fr 1.25fr}.couture h1{font:italic 400 clamp(4rem,7vw,9rem)/.98 Georgia,serif}.couture .ref-media,.couture .ref-art{min-height:720px}.couture .ref-art:before{border-width:2px;border-radius:50% 50% 0 0;transform:scaleX(.45)}.couture .work-grid{grid-template-columns:1fr 1fr}
.signaldeck{--bg:#111218!important;--fg:#f3f4f6!important;--surface:#252633!important;--muted:#babcc4!important;--border:#ffffff38!important}.signaldeck .ref-media{border-radius:22px;box-shadow:0 30px 80px #ec694827}.signaldeck .ref-art{background:repeating-linear-gradient(90deg,#23232d 0 23%,#30313c 23% 24%),#23232d}.signaldeck .work-card{border-radius:14px}
.obsidian{--bg:#090a11!important;--fg:#f5f3fb!important;--surface:#1b1d2d!important;--muted:#bec0cf!important;--border:#ffffff2a!important}.obsidian .ref-hero{grid-template-columns:1fr}.obsidian h1{font:italic 400 clamp(5rem,10vw,11rem)/.94 Georgia,serif;max-width:none}.obsidian .ref-media{border-radius:50% 50% 0 0;min-height:650px}.obsidian .ref-art{min-height:650px}.obsidian .work-card:first-child{grid-column:span 2}
.highlighter .ref-hero h1{font-weight:400;font-size:clamp(4.8rem,8vw,9rem)}.highlighter .ref-art{background:#181917;color:var(--accent)}.highlighter .ref-art:before{border-radius:0;transform:skew(-25deg)}.highlighter .work-card{border-radius:12px}
@media(max-width:850px){.ref-hero,.fieldnotes .ref-hero,.cutouts .ref-hero,.orchard .ref-hero,.negative .ref-hero,.workshop .ref-hero,.hearth .ref-hero,.couture .ref-hero{grid-template-columns:1fr;min-height:0}.ref-media,.negative .ref-media,.couture .ref-media,.runway .ref-media,.obsidian .ref-media{min-height:360px}.ref-art,.negative .ref-art,.couture .ref-art,.runway .ref-art,.obsidian .ref-art{min-height:360px}.specimen .ref-media{width:100%}.ref-hero h1{font-size:clamp(3.5rem,10vw,7rem)}}
@media(max-width:560px){.ref-hero h1,.specimen h1,.runway .ref-words h1,.obsidian h1,.kinetic h1{font-size:clamp(3.6rem,12vw,6.2rem)}.ref-media,.negative .ref-media,.couture .ref-media,.obsidian .ref-media{min-height:270px}.ref-art,.negative .ref-art,.couture .ref-art,.obsidian .ref-art{min-height:270px}.ref-art span{font-size:clamp(4rem,20vw,7rem)}.ref-hero .work-grid,.fieldnotes .work-grid{grid-template-columns:1fr}.ref-hero{padding-top:75px}}
`;

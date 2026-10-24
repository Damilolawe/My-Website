import { normalize, esc, https } from "./model.mjs";
import { collectionEditionCSS } from "./collection-edition.mjs";
import { folioVisualCSS } from "./folio-visual-fixes.mjs";
import { sampleArtwork, photoCSS } from "./photographic-direction.mjs";
import { experienceHero, experienceInterlude } from "./experiences.mjs";
import { alternateCSS } from "./alternate-styles.mjs";
import { experienceCSS } from "./experience-styles.mjs";
import {designSections,designedHeader,designedFooter} from "./full-page-layouts.mjs";
import {fullPageCSS} from "./full-page-styles.mjs";
import {siteChrome} from "./site-shells.mjs";
import {shellCSS} from "./site-shell-styles.mjs";
import {exemplarCSS} from "./exemplar-redesign.mjs";
import {paletteCSS,paletteInline} from "./theme-palette.mjs";
import {signatureMarkup,signatureCSSFor} from "./creative-signatures.mjs";
import {renderArcadeNight} from "./arcade-night.mjs";
import {renderLiquidMetal} from "./liquid-metal.mjs";
import {renderRunwayML} from "./runwayml.mjs";
import {renderVoltAgentTrio} from "./voltagent-trio.mjs";
import {renderRunwayMultiPreview} from "./runway-multipage-preview.mjs";
import {freeDesignFor} from "./free-designmd.mjs";
import {renderFreeDesign} from "./free-designmd-render.mjs";
import {directionFor} from "./refero-originals.mjs";
import {mdHero,mdCSSFor,mdPaletteFor} from "./md-rebuild.mjs";
import {uploadedDesignFor} from "./uploaded-designs.mjs";
import {exactGuideCSSFor} from "./exact-design-css.mjs";
import {authoredBeat} from "./md-art-direction.mjs";
import {mdSourceFeature,mdSourceFeatureCSS} from "./md-source-feature.mjs";
import {artDirectionCSS} from "./md-art-styles.mjs";

/* Static, sandboxable HTML output: no third-party fonts, scripts, cookies or APIs.
 * Keep the whole approved document immutable in awe_versions.html. */
const E = (value) => esc(value);
const rich = (value) => E(value).replace(/\r?\n/g, "<br>");
const join = (items) => items.filter(Boolean).join("");
const cardFallback = (value) => {
  const entries = String(value || "").split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean).slice(0, 12);
  return entries.map((entry) => {
    const lines = entry.split(/\n/);
    return { title: (lines.shift() || "").slice(0, 120), description: lines.join("\n").slice(0, 1200), url: "" };
  });
};
const css = (
  '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 var(--body-font);-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration-thickness:1px;text-underline-offset:5px}a:focus-visible,button:focus-visible{outline:3px solid var(--accent);outline-offset:4px}img{display:block;max-width:100%}h1,h2,h3,p{margin-top:0}h1,h2,h3{line-height:1.08;letter-spacing:-.055em}h1{font-size:clamp(3.5rem,9vw,9rem);max-width:1050px;overflow-wrap:break-word}h2{font-size:clamp(2.5rem,5.4vw,5.3rem)}h3{font-size:clamp(1.4rem,2.8vw,2.4rem)}.page{width:min(1480px,90%);margin-inline:auto}.skip{position:absolute;left:-9999px;top:0;z-index:40;background:var(--accent);color:#111;padding:12px}.skip:focus{left:12px}.eyebrow{font:600 .75rem/1.5 var(--label-font);text-transform:uppercase;letter-spacing:.14em}.muted{color:var(--muted)}.site-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:92px;border-bottom:1px solid var(--border)}.brand{text-decoration:none;font-weight:800;letter-spacing:-.06em;font-size:1.35rem}.nav-links{display:flex;flex-wrap:wrap;gap:clamp(12px,2vw,30px);justify-content:flex-end}.nav-links a{text-decoration:none;text-transform:uppercase;letter-spacing:.07em;font-size:.74rem}.nav-links a:hover,.text-link:hover{color:var(--accent)}.hero{position:relative;min-height:75vh;display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(30px,5vw,90px);align-items:center;padding:clamp(75px,9vw,145px) 0;isolation:isolate}.hero-copy{position:relative;z-index:2}.hero-label{margin-bottom:22px;color:var(--accent)}.hero-intro{font-size:clamp(1rem,1.6vw,1.3rem);max-width:620px;color:var(--muted)}.hero-actions{display:flex;align-items:center;gap:23px;flex-wrap:wrap;margin-top:40px}.pill-link{display:inline-flex;gap:30px;align-items:center;text-decoration:none;padding:14px 25px;border-radius:var(--radius);border:1px solid var(--accent);background:var(--accent);color:var(--on-accent);font-weight:700}.text-link{font-size:.84rem;font-weight:650;text-decoration:none}.hero-media{min-height:490px;position:relative;overflow:hidden;border-radius:var(--radius);background:var(--accent)}.hero-media img{width:100%;height:100%;min-height:490px;object-fit:cover}.hero-art{position:absolute;inset:0;background:radial-gradient(circle at 70% 28%,var(--secondary),transparent 48%),repeating-linear-gradient(115deg,transparent,transparent 20px,#ffffff27 20px,#ffffff27 21px),var(--accent)}.hero-art:before{content:"";position:absolute;inset:15%;border:clamp(20px,4vw,60px) solid #fff8;border-radius:50%;transform:rotate(-25deg) scaleX(.75)}.hero-art:after{content:"A / D";position:absolute;bottom:22px;left:25px;font-size:clamp(4rem,10vw,9rem);line-height:1;font-weight:800;letter-spacing:-.13em;opacity:.45}.section{padding:clamp(65px,10vw,145px) 0;border-top:1px solid var(--border)}.section-head{display:grid;grid-template-columns:minmax(170px,.35fr) 1fr;gap:35px;margin-bottom:48px;align-items:start}.section-head p{font-size:clamp(1.05rem,2vw,1.45rem);max-width:720px;color:var(--muted)}.number{display:block;margin-bottom:12px}.prose{font-size:clamp(1.13rem,2.1vw,1.8rem);max-width:900px;line-height:1.58;overflow-wrap:anywhere}.work-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.work-card{overflow:hidden;min-width:0;border:1px solid var(--border);border-radius:var(--radius);background:var(--surface)}.work-card:first-child:nth-last-child(odd){grid-column:span 2}.work-picture{width:100%;height:clamp(220px,32vw,500px);object-fit:cover;display:block}.work-art{height:clamp(220px,32vw,500px);display:grid;place-items:center;position:relative;overflow:hidden;background:linear-gradient(130deg,var(--secondary),var(--accent))}.work-art:after{content:"";width:48%;aspect-ratio:1;border:24px solid #ffffff77;border-radius:50%;transform:rotate(-30deg) scaleX(.65)}.work-card-body{padding:clamp(22px,3vw,44px)}.work-card-body p{white-space:pre-line;color:var(--muted)}.work-card-body a{font-weight:700}.services-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.service-card{min-width:0;padding:clamp(25px,4vw,55px);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}.service-card p{color:var(--muted);white-space:pre-line}.numbermark{font-size:.75rem;letter-spacing:.12em;color:var(--accent);margin-bottom:55px}.timeline{display:grid;gap:0}.timeline-row{display:grid;grid-template-columns:minmax(180px,.32fr) 1fr;gap:30px;padding:30px 0;border-top:1px solid var(--border)}.timeline-row .prose{font-size:clamp(1rem,1.7vw,1.3rem)}.quote-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:25px}.quote{margin:0;background:var(--surface);padding:clamp(30px,4vw,65px);border-radius:var(--radius);border:1px solid var(--border)}.quote p{font-size:clamp(1.4rem,2.3vw,2.1rem);line-height:1.45}.quote cite{font-style:normal;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase}.contact-block{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end}.contact-block h2{max-width:850px}.contact-links{display:flex;gap:22px;flex-wrap:wrap;align-items:center}.contact-links a{max-width:100%;overflow-wrap:anywhere}.site-footer{padding:48px 0;display:flex;flex-wrap:wrap;gap:30px;justify-content:space-between;border-top:1px solid var(--border)}.site-footer a{text-decoration:none}.demo-banner{background:#dcfc46;color:#111;padding:10px 20px;text-align:center;font:700 12px monospace}.density-airy .section{padding-block:clamp(90px,13vw,185px)}.density-compact .section{padding-block:clamp(45px,6vw,95px)}.align-center .hero-copy{text-align:center}.align-center .hero-actions{justify-content:center}.align-right .hero-copy{text-align:right}.align-right .hero-actions{justify-content:flex-end}.align-right .hero-intro{margin-left:auto}.index .hero{grid-template-columns:1.35fr .65fr}.index .hero h1{font-weight:850}.index .work-card:nth-child(2){transform:translateY(40px)}.folio{--body-font:Georgia,serif;--label-font:Arial,sans-serif}.folio .hero{grid-template-columns:1fr;padding-top:120px}.folio .hero h1{font-family:Georgia,serif;font-style:italic;font-weight:400;max-width:1280px}.folio .hero-media{height:460px;min-height:0;width:72%;margin-left:auto}.folio .hero-media img{min-height:0;height:100%}.folio .work-grid{grid-template-columns:repeat(12,1fr)}.folio .work-card{grid-column:span 6}.folio .work-card:first-child{grid-column:span 8}.folio .work-card:nth-child(2){grid-column:span 4;margin-top:100px}.folio .section-head h2{font-style:italic;font-weight:400}.still .hero{grid-template-columns:1fr 1fr;min-height:85vh}.still .hero h1{font-size:clamp(3rem,6.2vw,7rem);font-weight:400}.still .hero-media{border-radius:46% 46% 0 0}.still .service-card{background:transparent;border:0;border-top:1px solid var(--border)}.still .work-card{background:transparent;border:0}.still .work-card-body{padding-inline:0}.afterhours{--bg:#101115;--fg:#f3f0ed;--surface:#202126;--border:#ffffff36;--muted:#b5b1b0}.afterhours .hero{min-height:94vh}.afterhours .hero h1{font-size:clamp(3.2rem,8.7vw,10rem);font-weight:900;text-transform:uppercase}.afterhours .hero-media{border-radius:45% 45% 4px 4px}.afterhours .hero-art{background:radial-gradient(ellipse at 46% 30%,var(--accent),#171822 70%)}.afterhours .work-card{border:0}.signal .hero h1{font-weight:950;text-transform:uppercase;line-height:.91;transform:rotate(-2deg)}.signal .hero-media{box-shadow:18px 18px 0 var(--secondary);transform:rotate(2deg)}.signal .section{border-top:5px solid var(--fg)}.signal .work-card:nth-child(even){transform:rotate(1.5deg)}.signal .work-card:nth-child(odd){transform:rotate(-1deg)}.signal .service-card{border:3px solid var(--fg)}.daylight .hero{grid-template-columns:.95fr 1.05fr}.daylight .hero h1{font-weight:900;letter-spacing:-.07em}.daylight .hero-media{border-radius:100px 20px 100px 20px;transform:rotate(2deg)}.daylight .service-card,.daylight .quote{border-radius:35px}.daylight .section{border-radius:32px;padding-inline:clamp(16px,3vw,48px)}'
  + '@media(max-width:800px){.hero,.index .hero,.folio .hero,.still .hero,.afterhours .hero,.daylight .hero{grid-template-columns:1fr;min-height:0}.hero-media,.folio .hero-media{height:380px;min-height:380px;width:100%;margin:0}.hero-media img{height:380px;min-height:380px}.section-head{grid-template-columns:1fr;gap:10px}.services-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.contact-block{grid-template-columns:1fr}.folio .work-card:first-child,.folio .work-card:nth-child(2){grid-column:span 6;margin-top:0}.nav-links{gap:13px}}'
  + '@media(max-width:560px){.site-nav{align-items:flex-start;padding-block:22px;min-height:0}.nav-links{max-width:65%;gap:12px}.nav-links a{font-size:.66rem}.hero{padding-block:65px 80px}.hero h1{font-size:clamp(3.1rem,13vw,5.5rem)}.hero-media,.folio .hero-media{min-height:280px;height:310px}.hero-media img{height:310px;min-height:280px}.work-grid,.folio .work-grid,.services-grid,.quote-grid{grid-template-columns:1fr}.work-card,.work-card:first-child:nth-last-child(odd),.folio .work-card:first-child,.folio .work-card:nth-child(2){grid-column:auto;margin-top:0}.index .work-card:nth-child(2),.signal .work-card{transform:none}.timeline-row{grid-template-columns:1fr;gap:4px}.page{width:min(100% - 32px,1480px)}.site-footer{gap:12px}}'
  + '@media(prefers-reduced-motion:no-preference){.hero-copy{animation:hero-in .75s both}@keyframes hero-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}.work-card{transition:transform .25s,box-shadow .25s}.work-card:hover{box-shadow:0 16px 44px #0002}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}}'
);
export function renderPremium(input, options = {}) {
  const { assetBase = "/api/assets/", sample = false, assetSuffix = "" } = options;
  const value = normalize(input);
  if (value.template === "arcade") return renderArcadeNight(value, options);
  if (value.template === "liquidmetal") return renderLiquidMetal(value, options);
  if (value.template === "runwayml") return renderRunwayML(value, options);
  if (["nike","clay","ferrari"].includes(value.template)) return renderVoltAgentTrio(value, options);
  if (value.template === "runwaymulti") return renderRunwayMultiPreview(value, options);
  if (freeDesignFor(value.template)) return renderFreeDesign(value, options);
  const c = value.content, d = value.design, t = value.template;
  const items = c.cards.length ? c.cards : cardFallback(c.projects);
  const has = (id) => d.sections.includes(id);
  const image = (id, alt, cls, eager) => '<img class="' + cls + '" src="' + E(assetBase + id + assetSuffix) + '" alt="' + E(alt) + '" loading="' + (eager ? "eager" : "lazy") + '">';
  const navIds = d.sections.filter((s) =>
    s === "contact" || (s === "work" ? items.length || c.photoIds.length > 1 : s === "services" ? c.services.length : s === "testimonials" ? c.testimonials.length : s === "about" ? c.bio : c[s]));
  const titles={
    "Student résumé":{about:"The person behind the work",work:"Projects & experiments",services:"Capabilities",experience:"Experience",education:"Education",skills:"Toolbox",contact:"Say hello"},
    "Professional portfolio":{about:"A little about me",work:"Selected case studies",services:"What I do",experience:"Career highlights",education:"Background",skills:"Expertise",contact:"Work together"},
    "Actor / model":{about:"Meet the performer",work:"Credits & on-screen work",services:"Creative disciplines",experience:"Roles & performances",education:"Training",skills:"Range & abilities",contact:"Casting & enquiries"},
    "Creative portfolio":{about:"Behind the lens",work:"Selected portfolio",services:"Creative services",experience:"Exhibitions & commissions",education:"Training",skills:"Creative practice",contact:"Make something together"},
    "Personal brand":{about:"The story so far",work:"Ideas & endeavors",services:"Ways to collaborate",experience:"The journey",education:"What shaped me",skills:"What I bring",contact:"Start a conversation"},
    "Small business":{about:"Our story",work:"How we work",services:"What we offer",experience:"Our experience",education:"Our background",skills:"What we do best",contact:"Get in touch"}
  };
  const labelFor=(id,fallback)=>titles[value.type]?.[id]||fallback;
  const heading = (id, index, title, intro) => '<div class="section-head"><div class="eyebrow"><span class="number">' + String(index).padStart(2, "0") + ' / ' + E(id) + '</span></div><div><h2>' + E(labelFor(id,title)) + '</h2>' + (intro ? '<p>' + E(intro) + '</p>' : '') + '</div></div>';
  const section = (id, index) => {
    if (id === "about" && c.bio) return '<section class="section" id="about">' + heading(id,index,'Behind the work','A little about the person and thinking behind it.') + '<div class="prose">' + rich(c.bio) + '</div></section>';
    if (id === "work" && (items.length || c.photoIds.length > 1)) {
      const media = c.photoIds.slice(1);
      const cards = items.length ? items : media.map((_,i)=>({title:'Selected work ' + (i + 1),description:'',url:''}));
      return '<section class="section" id="work">' + heading(id,index,t === 'folio' ? 'Selected editions' : t === 'afterhours' ? 'On the reel' : 'Selected work','A few things worth a closer look.') + '<div class="work-grid">' + join(cards.map((item,i) => '<article class="work-card">' + (media[i] ? image(media[i],item.title || c.name,'work-picture') : '<div class="work-art" aria-hidden="true"></div>') + '<div class="work-card-body"><p class="eyebrow">PROJECT / ' + String(i+1).padStart(2,'0') + '</p><h3>' + E(item.title || 'Selected work') + '</h3>' + (item.description ? '<p>' + rich(item.description) + '</p>' : '') + (https(item.url) ? '<a href="' + E(item.url) + '" target="_blank" rel="noopener noreferrer">View project ↗︎</a>' : '') + '</div></article>')) + '</div></section>';
    }
    if (id === 'services' && c.services.length) return '<section class="section" id="services">' + heading(id,index,'What I can do','How we could work together.') + '<div class="services-grid">' + join(c.services.map((s,i)=>'<article class="service-card"><p class="eyebrow numbermark">' + String(i+1).padStart(2,'0') + ' / SERVICES</p><h3>' + E(s.title) + '</h3><p>' + rich(s.description) + '</p>' + (https(s.url) ? '<a href="' + E(s.url) + '" target="_blank" rel="noopener noreferrer">Learn more ↗︎</a>' : '') + '</article>')) + '</div></section>';
    if (['education','experience','skills'].includes(id) && c[id]) return '<section class="section" id="' + id + '">' + heading(id,index,{education:'Education & training',experience:'Experience & impact',skills:'Skills & capabilities'}[id]) + '<div class="timeline"><div class="timeline-row"><p class="eyebrow">' + E({education:'Where I studied',experience:'Where I have been',skills:'What I bring'}[id]) + '</p><div class="prose">' + rich(c[id]) + '</div></div></div></section>';
    if (id === 'testimonials' && c.testimonials.length) return '<section class="section" id="testimonials">' + heading(id,index,'Kind words','What collaborators and clients say.') + '<div class="quote-grid">' + join(c.testimonials.map(x => '<blockquote class="quote"><p>“' + E(x.quote) + '”</p>' + (x.attribution ? '<cite>— ' + E(x.attribution) + '</cite>' : '') + '</blockquote>')) + '</div></section>';
    if (id === 'contact') return '<section class="section" id="contact"><div class="contact-block"><div><p class="eyebrow">LET’S CONNECT</p><h2>Let’s make something happen.</h2></div><div class="contact-links">' + (c.publicEmail ? '<a class="pill-link" href="mailto:' + E(c.publicEmail) + '">Get in touch ↗︎</a>' : '') + join(c.links.map(u=>'<a href="' + E(u) + '" target="_blank" rel="noopener noreferrer">' + E(new URL(u).hostname) + ' ↗︎</a>')) + (c.publicEmail || c.links.length ? '' : '<p class="contact-setup-note">'+(sample?'Fictional demonstration — add a public email or contact link to activate this section.':'The site owner has not published a contact method yet.')+'</p>') + '</div></div></section>';
    return '';
  };
  const composed = designSections(value,{assetBase,assetSuffix,sample});
  const actualSections = composed === null ? d.sections.map((s,i)=>section(s,i+1)).filter(Boolean).join("") : composed;
  const heroImage = c.photoIds[0] ? image(c.photoIds[0],c.name + ' portrait','hero-picture',true) : (sample && !directionFor(t) ? sampleArtwork(t,'hero') : '');
  const accent = d.primary, second = d.secondary, dark = d.appearance === 'dark' || t === 'afterhours';
  const radius = {sharp:'0',soft:'14px',round:'36px'}[d.corners];
  const bodyFont = d.font === 'serif' ? 'Georgia,serif' : d.font === 'mono' ? 'ui-monospace,monospace' : 'system-ui,Arial,sans-serif';
  // Choose readable text on customizable CTA fills using relative luminance.
  const rgb = d.primary.slice(1).match(/../g).map(x=>parseInt(x,16)/255);
  const luminance = rgb.map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4)
    .reduce((sum,x,i)=>sum+x*[0.2126,0.7152,0.0722][i],0);
  const onAccent = luminance > 0.179 ? '#10120d' : '#ffffff';
  const theme = ':root{--accent:' + accent + ';--secondary:' + second + ';--bg:' + (dark?'#141619':'#f7f6f2') + ';--fg:' + (dark?'#f8f7f2':'#191b20') + ';--surface:' + (dark?'#22232a':'#fff') + ';--muted:' + (dark?'#b8b9c0':'#585d62') + ';--border:' + (dark?'#ffffff36':'#17191726') + ';--radius:' + radius + ';--body-font:' + bodyFont + ';--label-font:ui-monospace,monospace;--on-accent:' + onAccent + ';' + paletteInline(accent,second,dark) + '}';
  const ctaTarget = has('work') && (items.length || c.photoIds.length>1) ? '#work' : has('contact') ? '#contact' : '#main';
  const hero=mdHero(value,heroImage,ctaTarget) || experienceHero(t,{c,value,heroImage,ctaTarget});
  const signature = signatureMarkup(value,navIds,{sample,assetBase,assetSuffix});
  const page=siteChrome(value,{hero,sections:signature+(uploadedDesignFor(t)?mdSourceFeature(value)+authoredBeat(value):'')+actualSections,interlude:directionFor(t) ? '' : experienceInterlude(t,c),navIds});
  // Original directions ship a purpose-built, compact stylesheet; legacy templates keep their exact styling.
  let styleBundle=uploadedDesignFor(t)
    ? theme + css + experienceCSS + alternateCSS + fullPageCSS + shellCSS + paletteCSS + photoCSS + collectionEditionCSS + (signature ? signatureCSSFor(t) : '') + exactGuideCSSFor(t) + mdCSSFor(t) + mdPaletteFor(value,{sample}) + artDirectionCSS + mdSourceFeatureCSS
    : theme + css + experienceCSS + alternateCSS + fullPageCSS + shellCSS + paletteCSS + photoCSS + collectionEditionCSS + exemplarCSS + (signature ? signatureCSSFor(t) : '');
  if(t === 'folio') styleBundle += folioVisualCSS;
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="' + (dark ? 'dark' : 'light') + '"><title>' + E(c.name) + ' — ' + E(c.headline) + '</title><meta name="description" content="' + E(c.headline) + '"><style>' + styleBundle + '</style></head><body class="' + E(t) + ' density-' + E(d.density) + ' align-' + E(d.heroAlignment) + ' motion-' + E(d.animation) + '">' +
    (sample ? '<div class="demo-banner">FICTIONAL TEMPLATE DEMO — SAMPLE CONTENT ONLY</div>' : '') +
    '<a href="#main" class="skip">Skip to content</a>' + page + '</body></html>';
}


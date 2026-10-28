import {sampleForTemplate} from "./model.mjs";

// Applied to customized customer sites AFTER all source-authored styles. The
// original template is left untouched until a color actually changes.
const HEX=/^#[0-9a-f]{6}$/i;
const channels=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const hex=rgb=>"#"+rgb.map(x=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,"0")).join("");
const mix=(a,b,weight)=>hex(channels(a).map((x,i)=>x*weight+channels(b)[i]*(1-weight)));
const lightness=color=>channels(color).map(v=>{const x=v/255;return x<=0.04045?x/12.92:((x+.055)/1.055)**2.4;})
  .reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
const ink=color=>lightness(color)>0.179?"#101216":"#ffffff";
const darkBody=value=>value.design?.appearance==="dark";

// Only opt in to the new CSS when the visitor has CHANGED a color. This protects
// source designs, original gallery screenshots and their authored CSS verbatim.
export function applyCustomerColors(html,value){
 if(typeof html!=="string"||!html.includes("</head>")||!value?.template)return html;
 const primary=value.design?.primary,secondary=value.design?.secondary;
 if(!HEX.test(primary||"")||!HEX.test(secondary||""))return html;
 const starting=sampleForTemplate(value.template);
 if(starting?.design?.primary?.toLowerCase()===primary.toLowerCase() &&
    starting?.design?.secondary?.toLowerCase()===secondary.toLowerCase())return html;
 const dark=darkBody(value),base=dark?"#101217":"#ffffff";
 const canvas=mix(secondary,base,dark?.30:.16);
 const surface=mix(secondary,base,dark?.75:.79);
 const onCanvas=ink(canvas),onSurface=ink(surface),onPrimary=ink(primary);
 const declaration="--awe-primary:"+primary+";--awe-secondary:"+secondary+
   ";--awe-canvas:"+canvas+";--awe-surface:"+surface+
   ";--awe-on-canvas:"+onCanvas+";--awe-on-surface:"+onSurface+
   ";--awe-on-primary:"+onPrimary+";--awe-soft-primary:"+mix(primary,canvas,.14);
 // Scoped, semantic overrides. No changes to page geometry, fonts, hero imagery,
 // animation, authored Quick Start CSS or customer content.
 const css=`
 body{${declaration};--accent:var(--awe-primary);--on-accent:var(--awe-on-primary)}
 body.site{--accent:var(--awe-primary)!important;--surface:var(--awe-surface)!important;
   --bg:var(--awe-canvas)!important;--ink:var(--awe-on-canvas)!important;
   --button:var(--awe-on-primary)!important;--fg-accent:var(--awe-primary)!important;
   --fg-surface:var(--awe-surface)!important}
 body.trio-site{--trio-accent:var(--awe-primary)!important;
   --trio-surface:var(--awe-surface)!important;--trio-bg:var(--awe-canvas)!important;
   --trio-fg:var(--awe-on-canvas)!important}
 body.fd-site{--accent:var(--awe-primary)!important;--card:var(--awe-surface)!important;
   --paper:var(--awe-canvas)!important;--ink:var(--awe-on-canvas)!important;
   --button-text:var(--awe-on-primary)!important}
 body.folio-editorial{--rust:var(--awe-primary)!important;
   --paper:var(--awe-canvas)!important;--light:var(--awe-surface)!important}
 body.liquidmetal{--accent:var(--awe-primary)!important}
 body.site,body.trio-site,body.fd-site,body.folio-editorial,
 body.arcade-night,body.liquidmetal,body.rw-site{background-color:var(--awe-canvas)!important}
 body.site :is(.hero,.contact,.study-approach,.fn-hero,.fv-panel,.pq-hero),
 body.trio-site :is(.clay-hero,.clay-features,.nike-editorial,.ferrari-vision,.trio-contact),
 body.fd-site :is(.fd-hero,.fd-contact),
 body.folio-editorial :is(.fe-hero,.fe-contact),
 body.arcade-night :is(.arcade-hero,.arcade-contact),
 body.liquidmetal :is(.lm-hero,.lm-contact),
 body.rw-site :is(.rw-light,.rw-intro,.rw-research,.rw-manifesto){
   background-color:var(--awe-surface)!important
 }
 body.site :is(.hero,.contact),
 body.trio-site :is(.clay-hero,.clay-features,.nike-editorial,.ferrari-vision,.trio-contact),
 body.fd-site .fd-contact,
 body.folio-editorial .fe-contact,
 body.arcade-night .arcade-contact,
 body.liquidmetal .lm-contact{
   color:var(--awe-on-surface)!important
 }
 body.site .hero :is(h1,h2,p,.eyebrow),
 body.site .contact :is(h1,h2,p),
 body.trio-clay .clay-hero :is(h1,h2,p),
 body.trio-site .trio-contact :is(h1,h2,p),
 body.fd-site .fd-contact :is(h1,h2,p){
   color:var(--awe-on-surface)!important
 }
 body.site :is(.section,.card,.study-approach-item),
 body.trio-site :is(.clay-card,.trio-feature,.trio-card),
 body.fd-site :is(.fd-section,.fd-card),
 body.folio-editorial :is(.fe-section,.fe-card){
   border-color:color-mix(in srgb,var(--awe-primary) 45%,transparent)!important
 }
 body.site :is(.section,.card):not(.hero):not(.contact),
 body.trio-site :is(.clay-card,.trio-card),
 body.fd-site :is(.fd-card,.fd-content),
 body.folio-editorial :is(.fe-card){
   background-color:var(--awe-canvas)!important
 }
 body.site :is(.design-nav,.fn-header,.pq-header),
 body.trio-site :is(.clay-header,.nike-header,.ferrari-header),
 body.fd-site .fd-header,
 body.folio-editorial .fe-header{
   background-color:var(--awe-canvas)!important;
   color:var(--awe-on-canvas)!important
 }
 body.site :is(a.button,button.button,.fn-primary,.fn-header-cta,.fv-primary,.pq-primary),
 body.trio-site .trio-button,
 body.fd-site :is(.fd-primary,a.fd-primary),
 body.folio-editorial :is(.fe-button,.fe-cta),
 body.arcade-night :is(.arcade-button,.arcade-cta),
 body.liquidmetal .lm-btn-primary{
   background:var(--awe-primary)!important;border-color:var(--awe-primary)!important;
   color:var(--awe-on-primary)!important
 }
 body.site :is(.design-nav a[aria-current],.eyebrow,.fn-tag),
 body.trio-site .trio-label,
 body.fd-site .fd-overline,
 body.folio-editorial :is(.fe-hero h1 em,.fe-heading em),
 body.liquidmetal .lm-eyebrow{
   text-decoration-color:var(--awe-primary);
 }
 body :is(a,button,summary):focus-visible{outline-color:var(--awe-primary)!important}
 `;
 return html.replace("</head>",'<style data-awe-customer-colors="v1">'+css+"</style></head>");
}

import {paletteTokens} from "./theme-palette.mjs";

// Color roles are applied to every published template. We preserve the 42
// independent palettes and change only verified low-contrast elements.
// No DOM elements, page composition, artwork, motion or client data are altered.
const HEX=/^#[0-9a-f]{6}$/i;
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const luminance=hex=>rgb(hex).map(x=>{x/=255;return x<=0.04045?x/12.92:((x+.055)/1.055)**2.4;})
  .reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
export function readableOn(background){
  if(!HEX.test(background))throw new TypeError("Expected 6-digit hex color");
  return ratio("#ffffff",background)>=ratio("#000000",background)?"#ffffff":"#000000";
}
const BODY=id=>id==="folio"?"body.folio-editorial":id==="liquidmetal"?"body.liquidmetal":
  id==="arcade"?"body.arcade-night":["runwayml","runwaymulti"].includes(id)?"body.rw-site":
  ["nike","clay","ferrari"].includes(id)?"body.trio-"+id:
  ["acidchrome","voidstage","studiomargaux","neomemphis","monobrutalist",
   "vestigefolio","botanicalpress","limepress","gazettebroadside","risograph"].includes(id)?"body.fd-"+id:"body."+id;

// The fixes below are based on measured 390px + 1440px computed CSS,
// and use high contrast within each original art direction.
const SKIP=["index","still","daylight","atlas","playbill","contactsheet","ledger","couture"];
const NAV=["orbit","monologue","nocturne"];
const LOCAL={
  monologue:'.case-screenplay,.case-screenplay h3,.case-screenplay p,.case-screenplay span{color:var(--awe-header-ink)!important}',
  playbill:'.md-playbill-hero .md-lead{color:var(--on-accent)!important}',
  contactsheet:'.md-contactsheet-hero .md-lead{color:#ffffff!important}',
  brutalist:'.md-brutalist-hero .md-lead{color:#202020!important}',
  vestigefolio:'.fd-hero .fd-lead{color:color-mix(in srgb,var(--ink) 82%,var(--paper))!important}',
  botanicalpress:'.fd-hero .fd-lead{color:color-mix(in srgb,var(--ink) 82%,var(--paper))!important}',
  gazettebroadside:'.fd-hero .fd-lead{color:color-mix(in srgb,var(--ink) 82%,var(--paper))!important}.fd-primary{color:#f8f6ed!important}',
  neomemphis:'.fd-primary{color:var(--awe-on-accent)!important}'
};
const ALL=[...SKIP,...NAV,...Object.keys(LOCAL)];
const allowed=new Set(ALL);
export function applyColorConsistency(html,id,design={}){
  if(typeof html!=="string"||!html.includes("</head>"))return html;
  // RunwayML's original single-page renderer must remain byte-for-byte identical;
  // both Runway variants already passed their 390px and 1440px contrast audits.
  if(id==="runwayml"||id==="runwaymulti")return html;
  const primary=HEX.test(design.primary??"")?design.primary:"#343434";
  const secondary=HEX.test(design.secondary??"")?design.secondary:"#e5e5e5";
  const dark=design.appearance==="dark"||id==="afterhours";
  const body=BODY(id);
  const headOn=readableOn(paletteTokens(primary,secondary,dark)["palette-secondary-soft"]);
  let css=body+"{--awe-on-accent:"+readableOn(primary)+";--awe-header-ink:"+headOn+"}";
  if(allowed.has(id)){
    if(SKIP.includes(id))css+=body+" .skip{color:var(--on-accent)!important}";
    if(NAV.includes(id))css+=body+" .shell-header,"+body+" .shell-header a{color:var(--awe-header-ink)!important}";
    if(LOCAL[id])css+=body+" "+LOCAL[id];
  }
  return html.replace("</head>",'<style data-awe-color-system="'+id+'">'+css+"</style></head>");
}

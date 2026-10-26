/* Semantic-only bridge shared by three independently art-directed flagship sites.
 * Reuses customer data and safe publication URLs; does not impose a visual layout.
 */
export const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export const paths=(t,page)=>t.multipage?"/templates/"+t.id+"/"+page+".html":"#"+(page==="home"?"main":page);
export const first=(v,i,fallback="")=>esc(v.content.cards?.[i]?.title||fallback);
export const description=(v,i,fallback="")=>esc(v.content.cards?.[i]?.description||fallback);
export const digits=n=>String(n).padStart(2,"0");
export function artMedia(v,options,i,alt,placeholder){
 const id=v.content.photoIds?.[i];
 if(id&&!options.sample){
  const src=String(options.assetBase||"/api/assets/")+id+String(options.assetSuffix||"");
  return '<img class="fg-client-image" loading="'+(i===0?'eager':'lazy')+'" alt="'+esc(alt)+'" src="'+esc(src)+'">';
 }
 return placeholder;
}
export function projectLink(t,page){
 return t.multipage?paths(t,page):"#"+(page==="home"?"main":page);
}
export function contactAction(v){
 const address=v.content.publicEmail;
 return address?'<a href="mailto:'+esc(address)+'">Start a conversation <span aria-hidden="true">↗</span></a>':
  '<p class="fg-contact-note">Contact details will be added by the site owner.</p>';
}
export function documentForFlagship(t,v,options,page,profile,{title,css,body,sourceCSS="",sourceArtCSS="",metaDescription=""}){
 const fgClass=t.source==="bugatti"?"fg-velocity":t.source==="mintlify"?"fg-fieldnotes":"fg-pixelquest";
 const ink=esc(t.ink),background=esc(t.bg),accent=esc(v.design.primary||t.accent),surface=esc(v.design.secondary||t.surface);
 const base=':root{--fg-accent:'+accent+';--fg-background:'+background+';--fg-ink:'+ink+';--fg-surface:'+surface+'}'+
 '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}img{max-width:100%;display:block}button,input,summary{font:inherit}a{color:inherit}'+
 'a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--fg-accent);outline-offset:5px}'+
 '.fg-client-image{width:100%;height:100%;object-fit:cover}'+
 '.fg-banner{background:#0a0a0a;color:#fff;padding:9px 16px;text-align:center;font:700 10px/1.5 ui-monospace,monospace;letter-spacing:.1em}'+
 '.fg-contact-note{opacity:.7;font-size:14px}'+
 '@media(max-width:550px){.fg-banner{font-size:9px}}'+
 '.fg-skip{position:absolute;top:-200px;left:12px;z-index:50;background:#fff;color:#111;padding:12px}.fg-skip:focus{top:12px}'+
 '@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;scroll-behavior:auto!important;transition:none!important}}';
 let output='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<meta name="description" content="'+esc(metaDescription||v.content.bio)+'">'+
  '<title>'+esc(v.content.name)+' / '+esc(page)+'</title><style>'+base+sourceCSS+sourceArtCSS+css+'</style></head>'+
  '<body class="site page-'+esc(page)+' arch-hero-'+esc(profile.hero)+' arch-work-'+esc(profile.work)+' arch-nav-'+esc(profile.nav)+' arch-flow-'+esc(profile.flow)+
  ' source-'+esc(t.id)+' '+fgClass+' motion-'+esc(v.design.animation||"expressive")+'">'+
  (options.sample?'<div class="fg-banner">FICTIONAL TEMPLATE DEMO — ALL CONTENT ILLUSTRATIVE</div>':'')+
  '<a class="fg-skip" href="#main">Skip to content</a>'+body+'</body></html>';
 if(options.customerPages&&t.multipage)for(const [label,dest] of Object.entries({home:"index.html",work:"work.html",features:"features.html",studio:"studio.html",contact:"contact.html"})){
  output=output.replaceAll("/templates/"+t.id+"/"+label+".html","./"+dest);
 }
 return output;
}

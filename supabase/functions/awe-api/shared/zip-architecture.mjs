/* Architectures are explicitly assigned by design source, not inferred from a palette.
 * Each source has a separate hero composition + project layout + navigation + reading flow.
 * Shared inputs are limited to customer-safe content fields and navigation destinations.
 * No JavaScript is injected into generated customer pages. */
const sourceArchitectures="bugatti|cinema|feature|line|classic\nairbnb|gallery|posters|underlined|studio-after-work\nbmw-m|panorama|bento|compact|approach-first\nbmw|diagonal|rail|boxed|studio-first\naljazeera|folio|editorial|rail|classic\ncal|interface|linear|center|studio-after-work\nbinance|interface|index|line|approach-first\nairtable|collage|stagger|underlined|studio-first\n1win|collage|columns|compact|classic\nclaude|interface|feature|boxed|studio-after-work\nclickhouse|sidepanel|posters|rail|approach-first\ncoinbase|index|bento|center|studio-first\nelevenlabs|index|rail|line|classic\ncursor|split|editorial|underlined|studio-after-work\ncohere|exhibition|linear|compact|approach-first\ndell-1996|panorama|index|boxed|studio-first\ndji|monument|stagger|rail|classic\ncomposio|gallery|columns|center|studio-after-work\nexpo|overlap|feature|line|approach-first\nhashicorp|billboard|posters|underlined|studio-first\nframer|sidepanel|bento|compact|classic\nibm|folio|rail|boxed|studio-after-work\nintercom|split|editorial|rail|approach-first\njobright|reverse|linear|center|studio-first\nhp|exhibition|index|line|classic\nkraken|billboard|stagger|underlined|studio-after-work\nlamborghini|billboard|columns|compact|approach-first\nlovable|float|feature|boxed|studio-first\nmastercard|sidepanel|posters|rail|classic\nmercury|split|bento|center|studio-after-work\nmeta|gallery|rail|line|approach-first\nmongodb|monument|editorial|underlined|studio-first\nmistral.ai|folio|linear|compact|classic\nminimax|exhibition|index|boxed|studio-after-work\nmintlify|reverse|stagger|rail|approach-first\nmiro|folio|columns|center|studio-first\nmydealz|storyboard|feature|line|classic\nnerdwallet|reverse|posters|underlined|studio-after-work\nnotion|gallery|bento|compact|approach-first\nnintendo-2001|collage|rail|boxed|studio-first\nnvidia|float|editorial|rail|classic\noracle|folio|linear|center|studio-after-work\nplaystation|billboard|index|line|approach-first\nollama|storyboard|stagger|underlined|studio-first\nopencode.ai|exhibition|columns|compact|classic\nrenault|float|feature|boxed|studio-after-work\noura|gallery|posters|rail|approach-first\nposthog|interface|bento|center|studio-first\npinterest|gallery|rail|line|classic\nsentry|sidepanel|editorial|underlined|studio-after-work\nshopify|index|linear|compact|approach-first\nrevolut|panorama|posters|boxed|studio-first\nreplicate|index|stagger|rail|classic\nsanity|overlap|columns|center|studio-after-work\nsap|exhibition|feature|line|approach-first\nresend|split|posters|underlined|studio-first\nspacex|reverse|bento|compact|classic\nslack|float|rail|boxed|studio-after-work\nstarbucks|folio|editorial|rail|approach-first\ntesla|overlap|linear|center|studio-first\nstripe|float|index|line|classic\ntheverge|exhibition|stagger|underlined|studio-after-work\nvercel|gallery|columns|compact|approach-first\nuber|gallery|feature|boxed|studio-first\nsuperhuman|interface|posters|rail|classic\nsupabase|overlap|bento|center|studio-after-work\ntogether.ai|billboard|rail|line|approach-first\nvodafone|gallery|editorial|underlined|studio-first\nwired|storyboard|linear|compact|classic\nwebflow|collage|index|boxed|studio-after-work\nwise|gallery|stagger|rail|approach-first\nvoltagent|monument|columns|center|studio-first\nzapier|exhibition|feature|line|classic\nx.ai|folio|posters|underlined|studio-after-work".split("\n").map(line=>{
 const [source,hero,work,nav,flow]=line.split("|");
 return [source,Object.freeze({id:source,hero,work,nav,flow})];
});
export const architectureMap=Object.freeze(Object.fromEntries(sourceArchitectures));
export const architectureFor=t=>architectureMap[t.source]||null;
export const architectureSignature=t=>{const a=architectureFor(t);return a?[a.hero,a.work,a.nav,a.flow].join("/"):null};
const escapeHTML=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function architecturalHero(t,profile,{title,summary,heroLabel,media,cta,label="home"}){
 if(!profile)throw Error("Design architecture is required for "+t.id);
 const labelText=escapeHTML(heroLabel);
 const copy='<div class="arch-copy"><span class="eyebrow">'+labelText+'</span><h1 id="hero-title">'+title+'</h1><p>'+summary+'</p>'+cta+'</div>';
 const visual='<div class="visual arch-visual">'+media+'</div>';
 const no=String(t.sourceIndex+1).padStart(2,"0");
 const side='<aside class="arch-side" aria-hidden="true"><span>ISSUE / '+no+'</span><strong>'+no+'</strong></aside>';
 const small='<span class="arch-caption" aria-hidden="true">AWE / DESIGN STUDY '+no+'</span>';
 let stage;
 switch(profile.hero){
  case "cinema": stage='<div class="arch-cinema">'+visual+'<div class="arch-cinema-copy">'+copy+'</div></div>'+small;break;
  case "panorama": stage=visual+'<div class="arch-panorama-copy">'+copy+small+'</div>';break;
  case "folio": stage='<div class="arch-folio-intro">'+small+copy+'</div>'+visual;break;
  case "exhibition": stage=side+visual+copy;break;
  case "billboard": stage=copy+'<div class="arch-billboard-scene">'+visual+small+'</div>';break;
  case "interface": stage=copy+'<div class="arch-interface-frame"><div class="arch-interface-bar" aria-hidden="true"><span></span><span></span><span></span></div>'+visual+'</div>';break;
  case "sidepanel": stage=side+copy+visual;break;
  case "collage": stage=copy+'<div class="arch-collage-media">'+visual+'<div class="arch-collage-note" aria-hidden="true">'+no+' / EDITION</div></div>';break;
  case "index": stage=side+copy+visual;break;
  case "gallery": stage=visual+copy+small;break;
  case "diagonal": stage=copy+visual+small;break;
  case "float": stage=visual+'<div class="arch-float-copy">'+copy+'</div>'+small;break;
  case "storyboard": stage='<div class="arch-storyboard-head">'+small+copy+'</div><div class="arch-storyboard-scene">'+visual+'<span aria-hidden="true">FRAME / '+no+'</span></div>';break;
  case "monument": stage=copy+visual+side;break;
  case "overlap": stage=visual+copy+small;break;
  case "reverse": stage=visual+copy;break;
  case "split": stage=copy+visual;break;
  default:throw Error("Unsupported architecture "+profile.hero);
 }
 return '<section class="hero hero-variant md-hero md-'+escapeHTML(t.id)+'-hero arch-hero arch-hero-'+profile.hero+'" data-architecture="'+escapeHTML(profile.id)+'" data-chapter="'+escapeHTML(label)+'" aria-labelledby="hero-title">'+stage+'</section>';
}
export const architecturalCSS=`
/* Each art direction uses a different compositional skeleton, not a recolored split hero. */
body.site .arch-hero{box-sizing:border-box;position:relative;isolation:isolate;width:100%;min-width:0}
body.site .arch-hero>*{min-width:0}
body.site .arch-hero .arch-copy{min-width:0;position:relative;z-index:2}
body.site .arch-hero .arch-copy h1{max-width:100%;overflow-wrap:normal;word-break:normal;hyphens:none}
body.site .arch-hero .arch-copy p{line-height:1.5}
body.site .arch-hero .arch-visual{position:relative;min-width:0;min-height:0}
.arch-caption{display:block;font:600 10px/1.5 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase}
.arch-side{display:none}
body.site.arch-hero-cinema .hero{display:block;min-height:80vh;padding:clamp(20px,3vw,50px) var(--g)}
.arch-cinema{position:relative;min-height:clamp(570px,79vh,950px);display:grid;align-items:end;overflow:hidden;background:var(--surface)}
.arch-cinema>.arch-visual{position:absolute;inset:0;height:100%;border-radius:0;opacity:.65}
.arch-cinema-copy{position:relative;z-index:2;background:linear-gradient(0deg,var(--bg),transparent);padding:clamp(30px,5vw,95px);width:100%}
body.site.arch-hero-cinema .arch-copy{max-width:850px}
body.site.arch-hero-cinema .arch-hero h1{font-size:clamp(57px,9vw,155px);line-height:.88}
body.site.arch-hero-panorama .hero{display:flex;flex-direction:column;align-items:stretch;gap:clamp(18px,3vw,40px);padding-top:clamp(20px,5vw,70px)}
body.site.arch-hero-panorama .hero>.arch-visual{order:0;width:100%;height:clamp(310px,52vw,700px)}
.arch-panorama-copy{order:1;display:flex;justify-content:space-between;align-items:end;gap:30px}
.arch-panorama-copy>.arch-copy{max-width:880px}
body.site.arch-hero-folio .hero{display:flex;flex-direction:column;align-items:stretch;gap:clamp(35px,7vw,105px)}
.arch-folio-intro{display:grid;grid-template-columns:minmax(120px,.5fr) minmax(0,2fr);gap:30px;align-items:start}
body.site.arch-hero-folio .hero>.arch-visual{height:clamp(300px,45vw,590px)}
body.site.arch-hero-folio .arch-copy h1{font-family:Georgia,serif;font-weight:400;font-style:italic}
body.site.arch-hero-exhibition .hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.8fr);gap:clamp(20px,3vw,55px);align-items:center}
body.site.arch-hero-exhibition .hero>.arch-visual{height:clamp(380px,48vw,710px)}
body.site.arch-hero-billboard .hero{display:flex;flex-direction:column;align-items:stretch;gap:25px;text-align:center}
body.site.arch-hero-billboard .arch-copy{max-width:1050px;margin:auto}
body.site.arch-hero-billboard .arch-copy h1{font-size:clamp(58px,10vw,154px);line-height:.93}
body.site.arch-hero-billboard .arch-copy p{margin-inline:auto}
.arch-billboard-scene{width:100%;position:relative;display:grid;gap:10px;text-align:left}
.arch-billboard-scene>.arch-visual{height:clamp(350px,42vw,650px)}
body.site.arch-hero-interface .hero{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.3fr);gap:clamp(40px,6vw,100px)}
.arch-interface-frame{border:1px solid var(--line);padding:6px;box-shadow:clamp(7px,1.5vw,22px) clamp(7px,1.5vw,22px) 0 color-mix(in srgb,var(--accent) 19%,transparent);min-width:0}
.arch-interface-bar{padding:12px;display:flex;gap:6px;border-bottom:1px solid var(--line)}
.arch-interface-bar span{height:6px;width:6px;background:var(--accent);border-radius:50%}
.arch-interface-frame>.arch-visual{height:clamp(350px,45vw,640px);border-radius:0}
body.site.arch-hero-sidepanel .hero{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(15px,3vw,60px)}
body.site.arch-hero-collage .hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:start}
.arch-collage-media{position:relative;padding:25px 25px 60px 0}
.arch-collage-media>.arch-visual{height:clamp(410px,49vw,680px)}
.arch-collage-note{position:absolute;right:0;bottom:0;padding:25px;background:var(--accent);color:var(--button);font:700 12px ui-monospace,monospace;letter-spacing:.12em}
body.site.arch-hero-index .hero{display:grid;grid-template-columns:minmax(0,.65fr) minmax(0,1.3fr);gap:clamp(15px,4vw,75px)}
body.site.arch-hero-gallery .hero{display:flex;flex-direction:column;align-items:stretch;gap:36px}
body.site.arch-hero-gallery .hero>.arch-visual{height:clamp(350px,60vw,800px)}
body.site.arch-hero-gallery .hero>.arch-copy{max-width:780px;align-self:flex-end}
body.site.arch-hero-diagonal .hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:center;overflow:hidden}
body.site.arch-hero-diagonal .hero>.arch-visual{transform:skewY(-5deg) translateX(3%);border-radius:0}
body.site.arch-hero-diagonal .hero>.arch-caption{grid-column:1/-1}
body.site.arch-hero-float .hero{display:block;min-height:clamp(630px,83vh,970px)}
body.site.arch-hero-float .hero>.arch-visual{width:67%;height:clamp(500px,65vh,800px);margin-left:auto}
.arch-float-copy{position:relative;margin-top:clamp(-190px,-14vw,-90px);max-width:630px;padding:clamp(25px,4vw,70px);background:var(--bg);border:1px solid var(--line)}
body.site.arch-hero-storyboard .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:clamp(20px,5vw,95px)}
.arch-storyboard-head{display:flex;flex-direction:column;justify-content:space-between;gap:60px}
.arch-storyboard-scene{position:relative;border-top:7px solid var(--ink);border-bottom:7px solid var(--ink)}
.arch-storyboard-scene>.arch-visual{height:clamp(380px,50vw,680px);border-radius:0}
.arch-storyboard-scene>span{display:block;padding:13px 0;font:650 12px ui-monospace,monospace;letter-spacing:.14em}
body.site.arch-hero-monument .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}
body.site.arch-hero-monument .arch-copy h1{font-size:clamp(65px,9vw,155px);line-height:.89;text-transform:uppercase}
body.site.arch-hero-overlap .hero{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);position:relative;min-height:75vh}
body.site.arch-hero-overlap .hero>.arch-visual{grid-column:1/-1;grid-row:1;height:clamp(560px,70vh,850px)}
body.site.arch-hero-overlap .hero>.arch-copy{grid-column:1/2;grid-row:1;background:var(--bg);padding:clamp(25px,3vw,65px);align-self:center;margin-left:clamp(10px,3vw,65px)}
body.site.arch-hero-overlap .hero>.arch-caption{position:absolute;bottom:4%;right:var(--g)}
body.site.arch-hero-float .pa-hero strong,body.site.arch-hero-float .pa-hero .pa-hero-kicker,body.site.arch-hero-float .pa-hero .pa-hero-footer,body.site.arch-hero-overlap .pa-hero strong,body.site.arch-hero-overlap .pa-hero .pa-hero-kicker,body.site.arch-hero-overlap .pa-hero .pa-hero-footer{left:auto;right:6%;text-align:right;max-width:52%}
body.site.arch-hero-reverse .hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr)}
body.site.arch-hero-split .hero{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}
/* Nine independently composed project-gallery systems. */
body.site.arch-work-feature .cards{grid-template-columns:minmax(0,1.6fr) minmax(0,1fr)}
body.site.arch-work-feature .cards>.card:first-child{grid-row:span 2}
body.site.arch-work-feature .cards>.card:first-child .artbox{height:clamp(380px,48vw,710px)}
body.site.arch-work-editorial .cards{grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(15px,2vw,38px)}
body.site.arch-work-editorial .cards>.card{grid-column:span 2}
body.site.arch-work-editorial .cards>.card:first-child{grid-column:span 4}
body.site.arch-work-editorial .cards>.card:first-child .artbox{height:clamp(300px,35vw,560px)}
body.site.arch-work-columns .cards{grid-template-columns:repeat(3,minmax(0,1fr));align-items:start}
body.site.arch-work-columns .cards>.card:nth-child(2){margin-top:clamp(45px,10vw,150px)}
body.site.arch-work-rail .cards{display:flex;gap:clamp(15px,2.5vw,40px);overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:28px}
body.site.arch-work-rail .cards>.card{flex:0 0 min(65vw,540px);scroll-snap-align:start}
body.site.arch-work-stagger .cards{grid-template-columns:repeat(12,minmax(0,1fr))}
body.site.arch-work-stagger .cards>.card{grid-column:span 5}
body.site.arch-work-stagger .cards>.card:nth-child(2){grid-column:7/span 6;margin-top:80px}
body.site.arch-work-stagger .cards>.card:nth-child(3){grid-column:3/span 7}
body.site.arch-work-bento .cards{grid-template-columns:repeat(2,minmax(0,1fr))}
body.site.arch-work-bento .cards>.card:first-child{grid-row:span 2}
body.site.arch-work-bento .cards>.card:first-child .artbox{height:clamp(430px,52vw,760px)}
body.site.arch-work-index .cards{grid-template-columns:1fr;gap:0}
body.site.arch-work-index .cards>.card{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.8fr);gap:clamp(20px,4vw,70px);align-items:start;padding:30px 0;border-top:1px solid var(--line)}
body.site.arch-work-index .cards>.card .artbox{grid-row:span 3;height:clamp(240px,30vw,430px)}
body.site.arch-work-posters .cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,65px)}
body.site.arch-work-posters .cards>.card:nth-child(1){transform:rotate(-2deg)}
body.site.arch-work-posters .cards>.card:nth-child(2){transform:translateY(35px) rotate(2deg)}
body.site.arch-work-posters .cards>.card:nth-child(3){transform:rotate(-1deg)}
body.site.arch-work-linear .cards{grid-template-columns:1fr;gap:0}
body.site.arch-work-linear .cards>.card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:15px 60px;align-items:center;border-bottom:1px solid var(--line);padding:35px 0}
body.site.arch-work-linear .cards>.card .artbox{grid-row:span 3;margin-bottom:0;height:clamp(280px,34vw,460px)}
/* Six typographically distinct navigation hierarchies with shared accessible links. */
body.site header.design-nav{min-width:0;position:relative}
body.site.arch-nav-center header.design-nav{flex-direction:column;justify-content:center;gap:20px;text-align:center}
body.site.arch-nav-center header.design-nav nav{justify-content:center}
body.site.arch-nav-rail header.design-nav{display:flex;justify-content:space-between;align-items:center}
body.site.arch-nav-rail header.design-nav nav{counter-reset:railnav;gap:clamp(14px,2.4vw,34px)}
body.site.arch-nav-rail header.design-nav nav a{counter-increment:railnav}
body.site.arch-nav-rail header.design-nav nav a::before{content:counter(railnav,decimal-leading-zero);margin-right:7px;font:600 10px ui-monospace,monospace;opacity:.55}
body.site.arch-nav-boxed header.design-nav nav{border:1px solid var(--line);padding:14px 18px}
body.site.arch-nav-compact header.design-nav{padding-block:16px;border-bottom-width:3px}
body.site.arch-nav-compact header.design-nav nav a{font:700 11px ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase}
body.site.arch-nav-underlined header.design-nav{border:0}
body.site.arch-nav-underlined header.design-nav nav a{padding-bottom:7px;border-bottom:2px solid transparent}
body.site.arch-nav-underlined header.design-nav nav a[aria-current]{border-color:currentColor}
/* Secondary chapters remain authored pages, rather than five recolored copies. */
body.site.page-work.arch-work-index .section{padding-top:50px}
body.site.page-features .study-chapter{margin-top:clamp(30px,4vw,65px)}
body.site.page-studio .about{min-height:45vh;align-items:center}
@media(max-width:960px){
 body.site .arch-hero{min-height:0}
 body.site.arch-hero-exhibition .hero,body.site.arch-hero-sidepanel .hero,body.site.arch-hero-index .hero,body.site.arch-hero-monument .hero{grid-template-columns:1fr}
 body.site.arch-hero-storyboard .hero,body.site.arch-hero-interface .hero{grid-template-columns:1fr}
 body.site.arch-work-feature .cards,body.site.arch-work-stagger .cards,body.site.arch-work-editorial .cards,body.site.arch-work-bento .cards{grid-template-columns:repeat(2,minmax(0,1fr))}
 body.site.arch-work-stagger .cards>.card,body.site.arch-work-editorial .cards>.card,body.site.arch-work-stagger .cards>.card:nth-child(2){grid-column:auto;margin-top:0}
 body.site.arch-work-feature .cards>.card:first-child,body.site.arch-work-bento .cards>.card:first-child{grid-row:auto}
}
@media(max-width:640px){
 body.site header.design-nav,body.site.arch-nav-rail header.design-nav{display:flex;flex-wrap:wrap;flex-direction:column;gap:15px;align-items:flex-start}
 body.site header.design-nav nav,body.site.arch-nav-rail header.design-nav nav{flex-direction:row;align-items:center;justify-content:flex-start;gap:12px}
 body.site header.design-nav nav a{font-size:11px}
 body.site .arch-hero{display:flex!important;flex-direction:column;align-items:stretch;gap:24px;padding:40px var(--g)!important;min-height:0!important}
 body.site .arch-hero .arch-copy h1{font-size:clamp(34px,9.5vw,58px);line-height:1.08;letter-spacing:-.035em}
 body.site .arch-hero .arch-copy p{font-size:16px}
 body.site .arch-hero .arch-caption{display:none}
 body.site .arch-hero .arch-visual,body.site .arch-hero>.arch-visual,body.site .arch-hero .arch-interface-frame>.arch-visual{height:clamp(265px,81vw,440px);width:100%}
 body.site .arch-hero .arch-cinema{min-height:540px}
 body.site .arch-hero .arch-cinema>.arch-visual{height:100%}
 body.site .arch-cinema-copy{padding:25px;background:var(--bg)}
 body.site .arch-panorama-copy,body.site .arch-folio-intro,body.site .arch-hero .arch-storyboard-head{display:block}
 body.site .arch-hero .arch-interface-frame{width:100%}
 body.site .arch-hero .arch-collage-media{padding:0}
 body.site .arch-hero .arch-collage-note{display:none}
 body.site .arch-hero .arch-float-copy{margin:0;max-width:none;padding:20px}
 body.site .arch-hero .arch-storyboard-scene>.arch-visual{height:clamp(265px,81vw,440px)}
 body.site .arch-hero .arch-copy{order:0}
 body.site .arch-hero .arch-visual,body.site .arch-hero .arch-interface-frame,body.site .arch-hero .arch-storyboard-scene{order:1}
 body.site.arch-work-feature .cards,body.site.arch-work-stagger .cards,body.site.arch-work-editorial .cards,body.site.arch-work-bento .cards,body.site.arch-work-index .cards,body.site.arch-work-linear .cards,body.site.arch-work-posters .cards,body.site.arch-work-columns .cards{display:grid;grid-template-columns:1fr;gap:25px}
 body.site.arch-work-rail .cards>.card{flex-basis:86vw}
 body.site .cards>.card,body.site.arch-work-stagger .cards>.card:nth-child(2),body.site.arch-work-posters .cards>.card{grid-column:auto;transform:none;margin-top:0}
 body.site.arch-work-index .cards>.card,body.site.arch-work-linear .cards>.card{display:block}
 body.site .cards .artbox,body.site.arch-work-feature .cards>.card:first-child .artbox,body.site.arch-work-bento .cards>.card:first-child .artbox{height:clamp(250px,75vw,420px)}
 body.site.arch-hero-overlap .hero>.arch-copy{margin:0;padding:20px}
}
@media(prefers-reduced-motion:reduce){body.site .arch-hero *,body.site .cards *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

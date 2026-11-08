/**
 * Structural design variation for existing Awe Concepts generated preview sites.
 * Pure transform: no network, external images, or fabricated business information.
 * Apply only to the known shared-format prospect pages, preserving bespoke sites.
 * Future refreshes should apply this AFTER business-specific copy/imagery updates.
 */
export const DESIGN_MARKER = 'awe-distinctive-direction-2026';
const heroModes = [
  '.hero{grid-template-columns:1.28fr .72fr}.hero-copy{background:var(--ink);color:var(--paper);padding:9vw 6vw}.hero-media{padding:0}.hero-media .frame{height:100%;max-height:none;border-radius:0}.hero-line{color:var(--accent)}',
  '.hero{display:flex;flex-direction:column}.hero-copy{text-align:center;align-items:center;min-height:385px;padding:6vw 7vw 2vw}.hero-actions{justify-content:center}.hero-description{margin-inline:auto}.hero-media{padding:0 6vw 6vw;min-height:430px}.hero-media .frame{height:410px;width:100%;max-height:none;border-radius:230px 230px 0 0}.hero-count{display:none}',
  '.hero{grid-template-columns:.7fr 1.3fr}.hero-media{grid-column:1;grid-row:1;min-height:660px;padding:0}.hero-media .frame{height:100%;max-height:none;border-radius:0}.hero-copy{grid-column:2;grid-row:1;background:var(--accent);color:var(--paper);padding:8vw 7vw}.hero-line{color:var(--paper)}',
  '.hero{grid-template-columns:1fr 1fr;gap:4vw;padding:4vw}.hero-copy{padding:5vw 2vw}.hero-media{padding:0;min-height:580px}.hero-media .frame{height:550px;max-height:none;border-radius:0;transform:rotate(-4deg);border:14px solid var(--ink)}.hero-bottom{left:4vw;right:4vw}',
  '.hero{display:flex;flex-direction:column}.hero-copy{padding:6vw 7vw 3vw;min-height:330px}.hero h1{text-transform:uppercase;font-size:clamp(4rem,10.5vw,11rem)}.hero-media{padding:0 7vw 7vw;min-height:410px}.hero-media .frame{height:400px;max-height:none;width:100%;border-radius:0;clip-path:polygon(0 0,93% 0,100% 100%,7% 100%)}',
  '.hero{grid-template-columns:repeat(12,1fr);align-items:center;padding:5vw}.hero-copy{grid-column:1/8;grid-row:1;z-index:2;padding:5vw 2vw}.hero-media{grid-column:7/13;grid-row:1;min-height:620px;padding:0}.hero-media .frame{height:600px;max-height:none;width:100%;border-radius:50% 50% 0 0}.hero h1{font-style:italic}',
  '.hero{grid-template-columns:1fr 1fr}.hero-media{grid-column:1;grid-row:1;min-height:650px;padding:3vw}.hero-media .frame{height:590px;max-height:none;border-radius:50%;border:2vw solid var(--accent)}.hero-copy{grid-column:2;grid-row:1;padding:6vw}.hero-line{font-style:normal;text-transform:uppercase}',
  '.hero{grid-template-columns:1.1fr .9fr;background:var(--ink);color:var(--paper);padding:4vw 6vw 6vw}.hero-copy{padding:5vw 2vw 5vw 0}.hero-media{padding:0;min-height:560px}.hero-media .frame{height:100%;max-height:none;border-radius:0 0 180px 0;outline:1px solid var(--accent);outline-offset:9px}.hero h1{text-transform:uppercase}.hero-line{color:var(--accent)}',
  '.hero{display:flex;flex-direction:column}.hero-copy{min-height:310px;padding:7vw 7vw 2vw}.hero h1{font-size:clamp(4rem,11vw,12rem);line-height:.86;max-width:none}.hero-media{padding:0 7vw 7vw;min-height:360px}.hero-media .frame{height:370px;max-height:none;width:100%;border-radius:0}.hero-count{display:none}',
  '.hero{grid-template-columns:.9fr 1.1fr}.hero-copy{background:var(--accent);color:var(--paper);padding:8vw 6vw}.hero-media{padding:5vw 4vw;min-height:630px}.hero-media .frame{height:540px;max-height:none;border-radius:50% 10px 50% 10px}.hero-line{color:var(--paper)}',
  '.hero{grid-template-columns:.8fr 1.2fr}.hero-copy{padding:8vw 4vw 8vw 7vw}.hero-media{padding:0;min-height:650px}.hero-media .frame{height:100%;max-height:none;border-radius:175px 0 0 0;clip-path:polygon(12% 0,100% 0,100% 100%,0 100%)}',
  '.hero{display:flex;flex-direction:column}.hero-copy{padding:6vw 7vw 3vw;text-align:right;align-items:flex-end;min-height:350px}.hero-description{text-align:right}.hero-actions{justify-content:flex-end}.hero-media{padding:0 7vw 6vw;min-height:400px}.hero-media .frame{width:100%;height:400px;max-height:none;border-radius:160px 0 160px 0}',
  '.hero{grid-template-columns:1.25fr .75fr;gap:3vw;padding:4vw}.hero-copy{padding:6vw 3vw;border:2px solid var(--ink)}.hero-media{padding:0;min-height:590px}.hero-media .frame{height:550px;max-height:none;border-radius:0;border:14px solid var(--accent)}.hero h1{font-weight:900;text-transform:uppercase}',
  '.hero{display:flex;flex-direction:column}.hero-copy{padding:7vw;min-height:470px;position:relative;z-index:2;max-width:68%}.hero-media{position:absolute;right:0;top:7%;height:85%;width:43%;min-height:0;opacity:.45;padding:0}.hero-media .frame{height:100%;max-height:none;border-radius:0}.hero h1{font-size:clamp(4rem,9vw,10rem)}',
  '.hero{grid-template-columns:1fr 1fr;align-items:start}.hero-copy{padding:10vw 4vw 5vw}.hero-media{padding:4vw 4vw 4vw 0;min-height:670px}.hero-media .frame{height:610px;max-height:none;border-radius:300px 300px 30px 30px}.hero-line{font-weight:800;font-style:normal}',
  '.hero{grid-template-columns:1fr}.hero-copy{padding:6vw 7vw 3vw;min-height:390px;background:var(--accent);color:var(--paper)}.hero-media{padding:3vw 7vw 8vw;min-height:420px}.hero-media .frame{height:410px;max-height:none;width:100%;border-radius:0 0 220px 0}.hero-line{color:var(--paper)}',
  '.hero{grid-template-columns:.72fr 1.28fr}.hero-copy{grid-column:2;grid-row:1;padding:5vw}.hero-media{grid-column:1;grid-row:1;min-height:690px;padding:0}.hero-media .frame{max-height:none;height:100%;border-radius:0 250px 250px 0}.hero h1{font-weight:300;font-style:italic}',
  '.hero{grid-template-columns:1.15fr .85fr;padding:4vw 6vw;gap:3vw}.hero-copy{padding:7vw 3vw 5vw 0}.hero-media{padding:1vw;min-height:600px;background:var(--accent)}.hero-media .frame{height:540px;max-height:none;border-radius:0;box-shadow:22px 22px 0 var(--ink)}.hero h1{font-weight:900;line-height:.84}',
  '.hero{grid-template-columns:1fr 1fr}.hero-copy{padding:5vw 7vw;border-top:20px solid var(--accent);border-bottom:20px solid var(--accent)}.hero-media{padding:0;min-height:630px}.hero-media .frame{height:100%;max-height:none;border-radius:0;clip-path:ellipse(49% 48% at 50% 50%)}.hero-line{font-family:var(--body);font-style:normal;text-transform:uppercase}',
  '.hero{display:flex;flex-direction:column}.hero-copy{padding:6vw 7vw 2vw;align-items:center;text-align:center;min-height:360px}.hero-actions{justify-content:center}.hero-description{margin-inline:auto}.hero-media{padding:0 12vw 8vw;min-height:410px}.hero-media .frame{height:420px;max-height:none;width:100%;border-radius:0;transform:rotate(3deg);box-shadow:-18px 18px 0 var(--accent)}',
  '.hero{grid-template-columns:1fr 1fr;gap:0}.hero-copy{grid-column:2;grid-row:1;background:var(--ink);color:var(--paper);padding:6vw}.hero-media{grid-column:1;grid-row:1;padding:0;min-height:700px}.hero-media .frame{height:100%;max-height:none;border-radius:0 0 240px 0}.hero h1{text-transform:uppercase;font-family:var(--body);font-weight:900}.hero-line{color:var(--accent)}',
  '.hero{grid-template-columns:1fr;min-height:740px;background:var(--ink);color:var(--paper)}.hero-media{position:absolute;inset:0;width:100%;height:100%;min-height:0;padding:0;z-index:0}.hero-media .frame{height:100%;width:100%;max-height:none;border-radius:0;filter:brightness(.38)}.hero-copy{position:relative;z-index:2;padding:8vw 7vw;max-width:76%;min-height:660px}.hero-line{color:var(--accent)}'
];
const galleries = [
 '.gallery{padding:0 7vw 8vw}.photo-grid{grid-template-columns:1.75fr .45fr;gap:2vw}.photo-a{height:630px;border-radius:0}.photo-b{margin-top:110px;height:340px;border-radius:180px 180px 0 0}',
 '.gallery{padding:6vw}.photo-grid{grid-template-columns:1fr 1fr;align-items:start;gap:6vw}.photo-a{height:430px;border-radius:50% 50% 0 0}.photo-b{height:580px;margin-top:90px;border-radius:0}',
 '.gallery{padding:0 0 8vw}.gallery-top{padding-inline:7vw}.photo-grid{grid-template-columns:1fr 1fr;gap:0}.photo-a,.photo-b{height:540px;margin:0;border-radius:0}',
 '.gallery{padding:7vw}.photo-grid{grid-template-columns:1fr 1fr;gap:4vw}.photo-a{height:600px;transform:rotate(-4deg);border-radius:0;box-shadow:15px 15px 0 var(--accent)}.photo-b{height:430px;transform:rotate(4deg);border-radius:0}',
 '.gallery{padding:4vw 7vw}.photo-grid{grid-template-columns:1.5fr .5fr;gap:2vw}.photo-a{height:320px;border-radius:0}.photo-b{height:320px;margin:0;border-radius:0}',
 '.gallery{padding:6vw}.photo-grid{grid-template-columns:.6fr 1.4fr}.photo-a{height:430px;margin-top:150px;border-radius:200px 200px 0 0}.photo-b{height:620px;margin:0;border-radius:0 0 220px 0}',
 '.gallery{background:var(--accent);color:var(--paper);padding:7vw}.photo-grid{grid-template-columns:1fr 1fr;gap:14px}.photo-a,.photo-b{height:510px;margin:0;border:12px solid var(--paper);border-radius:0}',
 '.gallery{padding:7vw}.photo-grid{grid-template-columns:1.25fr .75fr;gap:0}.photo-a{height:580px;border-radius:0}.photo-b{height:360px;margin:140px 0 0 -50px;border:14px solid var(--paper);border-radius:0;z-index:2}',
 '.gallery{padding:7vw}.photo-grid{grid-template-columns:.8fr 1.2fr;gap:6vw}.photo-a{height:590px;border-radius:0 230px 0 0}.photo-b{height:420px;margin:0;border-radius:210px 0 210px 0}',
 '.gallery{padding:8vw 4vw}.photo-grid{grid-template-columns:1fr 1fr;gap:18px}.photo-a{height:420px;border-radius:200px 0 0 200px}.photo-b{height:420px;margin:0;border-radius:0 200px 200px 0}',
 '.gallery{padding:6vw}.photo-grid{grid-template-columns:1.65fr .45fr;gap:2vw}.photo-a{height:520px;border-radius:0 0 230px 0}.photo-b{height:240px;margin-top:100px;border-radius:50%}'
];
const features = [
 '.details{background:var(--ink);color:var(--paper)}.feature-grid{grid-template-columns:1fr;gap:0}.feature{min-height:130px;display:grid;grid-template-columns:55px 1fr 2fr;align-items:center;gap:2vw;border-top:1px solid currentColor}.feature h3{margin:0}.feature p{max-width:none}.feature-rule{display:none}',
 '.details{background:var(--accent);color:var(--paper)}.feature-grid{grid-template-columns:1fr 1fr 1fr;gap:12px}.feature{background:var(--paper);color:var(--ink);padding:28px;min-height:360px;border:0}.feature h3{font-weight:800}',
 '.details{background:var(--paper);color:var(--ink)}.feature-grid{grid-template-columns:1fr;gap:24px}.feature{min-height:0;border-left:6px solid var(--accent);border-top:0;padding:18px 4vw}.feature h3{margin:12px 0}',
 '.details{background:var(--ink);color:var(--paper)}.feature-grid{grid-template-columns:repeat(3,1fr);gap:5vw}.feature{border:0;border-bottom:2px solid var(--accent);padding:3vw 1vw 2vw}.feature h3{font-style:italic}',
 '.details{background:var(--accent);color:var(--paper)}.feature-grid{grid-template-columns:1.2fr .8fr;gap:2vw}.feature:first-child{grid-row:span 2;background:var(--ink);color:var(--paper);min-height:390px;padding:4vw}.feature:not(:first-child){padding:2vw;border:1px solid currentColor;min-height:150px}.feature h3{margin:16px 0}',
 '.details{background:var(--paper);color:var(--ink)}.feature-grid{grid-template-columns:repeat(3,1fr);gap:0}.feature{padding:2vw;border-right:1px solid currentColor;border-top:3px solid currentColor}.feature h3{text-transform:uppercase;font-family:var(--body);font-weight:900}',
 '.details{background:var(--ink);color:var(--paper)}.feature-grid{grid-template-columns:1fr 1fr;gap:4vw}.feature:first-child{grid-column:span 2;min-height:180px}.feature{border-top:1px solid currentColor}.feature h3{margin:12px 0}',
 '.details{background:var(--accent);color:var(--paper)}.feature-grid{grid-template-columns:1fr 1fr 1fr;gap:5vw}.feature{border:0;min-height:240px}.feature:nth-child(2){margin-top:75px}.feature:nth-child(3){margin-top:150px}'
];
const stories = [
 '.story{grid-template-columns:1.5fr .5fr;gap:6vw}.story h2{font-size:clamp(4rem,7vw,8rem)}',
 '.story{display:block;text-align:center;background:var(--ink);color:var(--paper)}.story-body{margin:30px auto 0;max-width:780px}',
 '.story{grid-template-columns:.7fr 1.3fr}.story-body{border-left:3px solid var(--accent);padding-left:3vw}',
 '.story{grid-template-columns:1fr 1fr;background:var(--accent);color:var(--paper);gap:8vw}',
 '.story{display:flex;flex-direction:column;align-items:flex-start;gap:35px}.story h2{max-width:1000px}.story-body{margin-left:20vw}',
 '.story{display:grid;grid-template-columns:1fr 1fr;gap:3vw}.section-heading{border-top:12px solid var(--accent);padding-top:3vw}.story-body{font-size:19px}',
 '.story{display:grid;grid-template-columns:.9fr 1.1fr;gap:7vw}.story .section-heading{order:2}.story .story-body{order:1}',
 '.story{display:block;background:var(--ink);color:var(--paper)}.story .section-heading{max-width:840px}.story .story-body{margin:30px 0 0 auto;max-width:470px}'
];
const closings = [
 '.closing{grid-template-columns:1fr 1fr;background:var(--ink);color:var(--paper)}.closing-photo{border-radius:0;transform:none}.closing h2{font-style:italic}',
 '.closing{display:flex;flex-direction:column;align-items:center;text-align:center;background:var(--accent);color:var(--paper)}.closing-photo{height:320px;width:80%;border-radius:200px 200px 0 0;transform:none}.closing-body{order:2}.closing-photo{order:1}.closing-location{align-items:center}',
 '.closing{grid-template-columns:1.35fr .65fr}.closing-body{border-left:12px solid var(--accent);padding-left:4vw}.closing-photo{height:350px;border-radius:50%;transform:none}',
 '.closing{grid-template-columns:1fr 1fr}.closing-photo{grid-column:1;grid-row:1;border-radius:0 190px 0 190px;transform:none}.closing-body{grid-column:2;grid-row:1}.closing h2{text-transform:uppercase}',
 '.closing{grid-template-columns:1fr;min-height:540px;background:var(--accent);color:var(--paper)}.closing-photo{position:absolute;right:0;top:0;width:45%;height:100%;opacity:.4;border-radius:0;transform:none}.closing-body{max-width:65%}',
 '.closing{grid-template-columns:1.4fr .6fr;background:var(--paper)}.closing h2{font-weight:900;font-family:var(--body)}.closing-photo{height:440px;border-radius:0;transform:rotate(3deg);border:12px solid var(--accent)}',
 '.closing{display:flex;flex-direction:column;align-items:flex-start;gap:20px}.closing h2{font-size:clamp(5rem,10vw,11rem)}.closing-photo{height:230px;width:100%;border-radius:0;transform:none}',
 '.closing{grid-template-columns:1fr 1fr;background:var(--ink);color:var(--paper)}.closing-body{order:2;text-align:right;justify-self:end}.closing-location{align-items:flex-end}.closing-photo{order:1;border-radius:200px 0 0 0;transform:none}'
];
const headers = [
 '.site-header{border-bottom:8px solid var(--accent)}.site-nav .nav-button{border-radius:99px}',
 '.site-header{background:var(--ink);color:var(--paper)}.site-nav .nav-button{background:var(--paper);color:var(--ink)}',
 '.site-header{min-height:120px;align-items:flex-end}.wordmark{text-transform:uppercase;letter-spacing:-.07em}.site-nav{padding-bottom:7px}',
 '.site-header{border-top:7px solid var(--accent)}.wordmark{font-family:var(--body);font-weight:900}.site-nav a{letter-spacing:.16em}',
 '.site-header{box-shadow:inset 0 -2px 0 var(--accent)}.site-nav{gap:12px}.site-nav a{padding:13px 17px;border:1px solid currentColor}.site-nav .nav-button{border:0}',
 '.site-header{background:var(--accent);color:var(--paper)}.site-nav .nav-button{background:var(--ink);color:var(--paper)}'
];
const typography = [
 '.hero h1{letter-spacing:-.075em;font-weight:900}.hero-line{font-style:normal}',
 '.hero h1{font-style:italic;font-weight:400;letter-spacing:-.055em}.hero-line{font-family:var(--body)}',
 '.hero h1{font-family:var(--body);font-weight:900;text-transform:uppercase;letter-spacing:-.09em}',
 '.hero h1{font-weight:300;letter-spacing:-.065em}.hero-line{font-weight:900}',
 '.hero h1{font-weight:800;text-transform:uppercase;letter-spacing:-.06em}.hero-line{font-style:italic}',
 '.hero h1{font-family:Georgia,serif;font-weight:400;letter-spacing:-.08em}.hero-line{font-style:normal}',
 '.hero h1{font-family:Arial,sans-serif;font-weight:800;letter-spacing:-.075em}.hero-line{font-family:Georgia,serif}',
 '.hero h1{font-variant:small-caps;letter-spacing:-.035em}.hero-line{text-transform:uppercase;font-style:normal}'
];
const perms = [
 ['story','gallery','details'],['gallery','story','details'],
 ['story','details','gallery'],['gallery','details','story'],
 ['details','story','gallery'],['details','gallery','story']
];
function scopeRules(css) {
  return css.replace(/(^|})\s*([^{}]+)\{/g, (whole,before,sel) =>
    before + sel.split(',').map(x => 'body.awe-distinct '+x.trim()).join(',') + '{');
}
export function redesignPreview({html,css,site,index}) {
  if (!html || !css || !site || !Number.isInteger(index)) return null;
  if (html.includes(DESIGN_MARKER) || css.includes(DESIGN_MARKER)) return null;
  const common=['class="hero-copy"','class="hero-media"','class="marquee-track"',
    'class="story section"','class="gallery section"','class="details section"','class="closing section"'];
  if (!common.every(s => html.includes(s))) return null; // Never replace bespoke pages
  const heroIndex=index%heroModes.length;
  const galleryIndex=(index*5+Math.floor(index/heroModes.length))%galleries.length;
  const featureIndex=(index*3+Math.floor(index/heroModes.length))%features.length;
  const storyIndex=(index*3+Math.floor(index/7))%stories.length;
  const closingIndex=(index*5+Math.floor(index/3))%closings.length;
  const headerIndex=(index*5+Math.floor(index/5))%headers.length;
  const typographyIndex=(index*5+Math.floor(index/8))%typography.length;
  const structureIndex=(index+Math.floor(index/heroModes.length))%perms.length;
  const direction=[heroIndex,galleryIndex,featureIndex,storyIndex,closingIndex,headerIndex,typographyIndex,structureIndex].join('-');
  html=html.replace(/<body class="([^"]+)"/, (_m,classes) => '<body class="'+classes+' awe-distinct '+DESIGN_MARKER+' design-'+direction+'"');
  // Structural differences: real DOM section order changes, not just randomized palette.
  const blocks={};
  html=html.replace(/<section class="(story|gallery|details) section"[\s\S]*?<\/section>/g,
    (match,type) => {blocks[type]=match;return '<!-- AWE_LAYOUT_'+type+' -->';});
  if(Object.keys(blocks).length!==3) throw new Error('Section extraction failed for '+site.slug);
  const order=perms[structureIndex];
  html=html.replace('<!-- AWE_LAYOUT_story -->',order.map(x=>blocks[x]).join(''));
  html=html.replace('<!-- AWE_LAYOUT_gallery -->','').replace('<!-- AWE_LAYOUT_details -->','');
  // Genuine site-level visual differences through independently generated source CSS.
  const cssPieces=[
    '/* '+DESIGN_MARKER+' | '+site.slug+' | direction '+direction+' */',
    scopeRules(headers[headerIndex]),scopeRules(heroModes[heroIndex]),
    scopeRules(typography[typographyIndex]),
    scopeRules(stories[storyIndex]),scopeRules(galleries[galleryIndex]),
    scopeRules(features[featureIndex]),scopeRules(closings[closingIndex]),
    // Architecture-specific treatments; each site gets a unique combination of parameters.
    'body.awe-distinct .hero{isolation:isolate}'+
    'body.awe-distinct .hero h1{overflow-wrap:anywhere;font-size:min(var(--hero-size),'+(6.5+(index%7)*.45)+'vw + 1.5rem)}'+
    'body.awe-distinct .frame figcaption{letter-spacing:'+(0.07+(index%5)*0.02)+'em}'+
    'body.awe-distinct .details-heading{gap:'+(3+(index%5))+'vw}'+
    'body.awe-distinct .gallery-top{margin-bottom:'+(12+(index%6)*7)+'px}'+
    'body.awe-distinct .feature-index{font-size:'+(11+(index%3)*2)+'px}',
    // Consistent responsive QA baseline: don't let architectural variants clip mobile screens.
    '@media(max-width:700px){'+
    'body.awe-distinct .site-header{min-height:70px;align-items:center;padding:14px 6vw}'+
    'body.awe-distinct .site-nav{background:var(--paper);color:var(--ink)}'+
    'body.awe-distinct .site-nav .nav-button{background:var(--accent);color:var(--paper)}'+
    'body.awe-distinct .hero{display:flex;flex-direction:column;min-height:0;gap:0;padding:0;background:var(--paper);color:var(--ink)}'+
    'body.awe-distinct .hero-copy{display:flex;grid-column:auto;grid-row:auto;order:'+(index%4===0?2:1)+';position:relative;z-index:2;width:100%;max-width:none;min-height:0;height:auto;transform:none;padding:65px 6vw 45px;align-items:flex-start;text-align:left;border:0;box-shadow:none;background:var(--paper);color:var(--ink)}'+
    'body.awe-distinct .hero h1{font-size:clamp(2.8rem,11vw,5.1rem);line-height:1;max-width:100%}'+
    'body.awe-distinct .hero-line{color:var(--accent)}'+
    'body.awe-distinct .hero-description{text-align:left;margin-inline:0;max-width:100%}'+
    'body.awe-distinct .hero-actions{justify-content:flex-start}'+
    'body.awe-distinct .hero-media{display:grid;grid-column:auto;grid-row:auto;order:'+(index%4===0?1:2)+';position:relative;inset:auto;z-index:1;width:100%;height:auto;min-height:340px;padding:16px 6vw 58px;opacity:1;filter:none;background:transparent;clip-path:none}'+
    'body.awe-distinct .hero-media .frame{width:100%;height:clamp(290px,86vw,470px);max-height:none;transform:none;box-shadow:none;outline:none;border:0;clip-path:none;filter:none;border-radius:'+(index%3===0?'0':index%3===1?'180px 180px 0 0':'12px')+'}'+
    'body.awe-distinct .hero-bottom{left:0;right:0;bottom:0}'+
    'body.awe-distinct .section{padding:70px 6vw}'+
    'body.awe-distinct .story,body.awe-distinct .details-heading,body.awe-distinct .closing{display:flex;flex-direction:column;align-items:stretch;gap:30px}'+
    'body.awe-distinct .story .section-heading,body.awe-distinct .story .story-body{order:initial;margin:0;max-width:100%}'+
    'body.awe-distinct .story h2,body.awe-distinct .details h2{font-size:clamp(2.75rem,10vw,4.8rem)}'+
    'body.awe-distinct .gallery{padding:38px 6vw 72px}'+
    'body.awe-distinct .photo-grid{display:grid;grid-template-columns:1fr;gap:18px}'+
    'body.awe-distinct .photo-a,body.awe-distinct .photo-b{position:relative;inset:auto;width:100%;height:340px;min-height:0;margin:0;transform:none;box-shadow:none;border:0;border-radius:12px}'+
    'body.awe-distinct .feature-grid{display:grid;grid-template-columns:1fr;gap:24px}'+
    'body.awe-distinct .feature,body.awe-distinct .feature:first-child,body.awe-distinct .feature:nth-child(2),body.awe-distinct .feature:nth-child(3){grid-column:auto;grid-row:auto;min-height:140px;margin:0;padding:20px 0;display:flex;flex-direction:column;align-items:flex-start;border-left:0;border-right:0;border-top:1px solid currentColor}'+
    'body.awe-distinct .feature h3{margin:14px 0}'+
    'body.awe-distinct .closing{min-height:0}'+
    'body.awe-distinct .closing .closing-body{grid-column:auto;grid-row:auto;order:1;max-width:100%;width:100%;text-align:left;justify-self:stretch;align-self:stretch;padding:0;margin:0;border:0}'+
    'body.awe-distinct .closing-location{align-items:flex-start;text-align:left}'+
    'body.awe-distinct .closing .closing-photo{grid-column:auto;grid-row:auto;order:2;position:relative;inset:auto;width:100%;height:290px;opacity:1;transform:none;border:0;border-radius:12px;filter:none}'+
    'body.awe-distinct .closing .closing-deco{display:none}'+
    '}',
    '@media(prefers-reduced-motion:reduce){body.awe-distinct *{scroll-behavior:auto}}'
  ];
  css += '\n\n'+cssPieces.join('\n')+'\n';
  return {html,css,direction,archetype:heroIndex,structure:order.join('>')};
}

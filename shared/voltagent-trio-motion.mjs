
const motionShared = `
.trio-site header nav a,.trio-site .trio-button{transition:transform .36s cubic-bezier(.2,.8,.2,1),opacity .3s ease,background .3s ease}
.trio-site header nav a:hover{opacity:.62}
.trio-site .trio-button:hover{transform:translateY(-4px)}
.trio-site .trio-button:active{transform:translateY(0)}
@keyframes trio-reveal{from{opacity:.76;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@supports (animation-timeline:view()){
.trio-nike .nike-product,.trio-nike .nike-story-copy,.trio-clay .clay-panel,.trio-clay .clay-closing>div:first-child,.trio-ferrari .ferrari-feature,.trio-ferrari .ferrari-specs article{
animation:trio-reveal 1s linear both;animation-timeline:view();animation-range:entry 0% cover 35%
}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.trio-site *,.trio-site *::before,.trio-site *::after{animation:none!important;animation-timeline:auto!important;transition:none!important;transform:none!important;translate:none!important}}
.trio-site.motion-none *,.trio-site.motion-none *::before,.trio-site.motion-none *::after{animation:none!important;animation-timeline:auto!important;transition:none!important;transform:none!important;translate:none!important}
`;
const nikeMotion = `
@keyframes nk-sprint{from{opacity:0;transform:translateY(44px) skewY(3deg);filter:blur(5px)}to{opacity:1;transform:translateY(0) skewY(0);filter:blur(0)}}
@keyframes nk-breathe{from{transform:scale(1.11) translateX(-1%)}to{transform:scale(1.012)}}
@keyframes nk-track{to{transform:translateX(-50%)}}
@keyframes nk-quick{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
.trio-nike .nike-hero .trio-media img{animation:nk-breathe 12s cubic-bezier(.18,.76,.2,1) both}
.trio-nike .nike-hero h1{animation:nk-sprint .95s .12s cubic-bezier(.16,1,.3,1) both}
.trio-nike .nike-hero .trio-label{display:inline-block;animation:nk-quick .65s .1s ease-out both}
.trio-nike .nike-hero p{animation:nk-quick .7s .6s ease-out both}
.trio-nike .nike-hero .trio-button{animation:nk-quick .7s .78s ease-out both}
.trio-nike .nike-runline{overflow:hidden;white-space:nowrap;background:#111;color:#fff;border-block:1px solid #353535;padding:14px 0;font:900 clamp(15px,2.2vw,26px)/1 Impact,Arial,sans-serif;letter-spacing:.14em}
.trio-nike .nike-runline-inner{display:flex;width:max-content;animation:nk-track 24s linear infinite}
.trio-nike .nike-runline-inner span{padding:0 32px;white-space:nowrap;flex:none}
.trio-nike .nike-runline-inner i{font-style:normal;color:#c9f14e;margin:0 33px}
.trio-nike .nike-product{transition:transform .55s cubic-bezier(.16,.9,.2,1)}
.trio-nike .nike-product:hover{transform:translateY(-8px)}
.trio-nike .nike-directions a{transition:transform .35s ease,background-color .35s ease}
.trio-nike .nike-directions a:hover{transform:translateY(-5px)}
.trio-nike .nike-directions a span{transition:transform .35s ease}
.trio-nike .nike-directions a:hover span{transform:translate(5px,-5px)}
.trio-nike .nike-story .trio-media img{transition:transform 1.7s cubic-bezier(.18,1,.2,1)}
.trio-nike .nike-story .trio-media:hover img{transform:scale(1.08)}
@media(hover:none){.trio-nike .nike-product:hover{transform:none}}
`;
const clayMotion = `
@keyframes cl-left{from{transform:translate3d(0,0,0) rotate(-23deg)}to{transform:translate3d(-8px,-21px,0) rotate(-17deg)}}
@keyframes cl-right{from{transform:translate3d(0,0,0) rotate(18deg)}to{transform:translate3d(12px,-18px,0) rotate(12deg)}}
@keyframes cl-orb{from{transform:translateY(0) rotate(0)}to{transform:translateY(-27px) rotate(18deg)}}
@keyframes cl-spark{from{transform:translateY(10px) scale(.8);opacity:.55}to{transform:translateY(-17px) scale(1.13);opacity:1}}
@keyframes cl-appear{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes cl-bars{0%,100%{transform:scaleY(.62)}50%{transform:scaleY(1)}}
@keyframes cl-orbit{to{transform:rotate(360deg)}}
.trio-clay .clay-mount.a{animation:cl-left 6.3s ease-in-out infinite alternate}
.trio-clay .clay-mount.b{animation:cl-right 7.1s ease-in-out infinite alternate}
.trio-clay .clay-sphere{animation:cl-orb 5s ease-in-out infinite alternate}
.trio-clay .clay-spark{position:absolute;z-index:4;border-radius:50%;pointer-events:none;background:radial-gradient(circle at 28% 20%,#fff,#fff5ac 26%,#ff4d8b);box-shadow:0 6px 22px #0002;animation:cl-spark 3.8s ease-in-out infinite alternate}
.trio-clay .clay-spark.s1{width:37px;height:37px;left:15%;top:13%}
.trio-clay .clay-spark.s2{width:21px;height:21px;left:75%;top:43%;background:radial-gradient(circle,#fff,#b8a4ed);animation-delay:-2s;animation-duration:4.5s}
.trio-clay .clay-spark.s3{width:14px;height:14px;left:51%;top:4%;background:#ffb084;animation-delay:-1s}
.trio-clay .clay-hero h1{animation:cl-appear 1.1s .1s cubic-bezier(.16,1,.3,1) both}
.trio-clay .clay-hero p,.trio-clay .clay-hero .trio-button{animation:cl-appear .85s .45s ease-out both}
.trio-clay .clay-panel{transition:transform .5s ease,box-shadow .5s ease}
.trio-clay .clay-panel:hover{transform:translateY(-7px);box-shadow:0 21px 55px #0a1a1a24}
.trio-clay .clay-ui{transition:transform .55s ease}
.trio-clay .clay-panel:hover .clay-ui{transform:translateY(5px) rotate(0)}
.trio-clay .clay-ui-bars b{transform-origin:bottom;animation:cl-bars 2.8s ease-in-out infinite}
.trio-clay .clay-ui-bars b:nth-child(2){animation-delay:-.8s;animation-duration:3.5s}
.trio-clay .clay-ui-bars b:nth-child(3){animation-delay:-1.5s;animation-duration:2.4s}
.trio-clay .clay-ui-bars b:nth-child(4){animation-delay:-.3s;animation-duration:3.7s}
.trio-clay .clay-gem{position:relative}
.trio-clay .clay-gem:after{content:"";position:absolute;inset:-18%;border:2px dashed #b8a4ed70;border-radius:50%;animation:cl-orbit 30s linear infinite}
@media(hover:none){.trio-clay .clay-panel:hover{transform:none}}
`;
const ferrariMotion = `
@keyframes fr-lens{from{transform:scale(1.13) translateX(-1%)}to{transform:scale(1.01)}}
@keyframes fr-type{from{opacity:0;filter:blur(5px);transform:translateY(32px);letter-spacing:-.1em}to{opacity:1;filter:blur(0);transform:translateY(0);letter-spacing:-.07em}}
@keyframes fr-caption{from{opacity:0;transform:translateY(17px)}to{opacity:1;transform:translateY(0)}}
@keyframes fr-line{from{transform:scaleX(0);transform-origin:left}to{transform:scaleX(1);transform-origin:left}}
@keyframes fr-cue{0%{transform:translateY(-110%)}80%,100%{transform:translateY(160%)}}
.trio-ferrari .ferrari-hero .trio-media img{animation:fr-lens 17s cubic-bezier(.16,.8,.2,1) both}
.trio-ferrari .ferrari-hero h1{animation:fr-type 1.55s .24s cubic-bezier(.16,.9,.2,1) both}
.trio-ferrari .ferrari-hero .trio-label{display:inline-block;animation:fr-caption .95s .25s ease-out both}
.trio-ferrari .ferrari-hero p{animation:fr-caption 1s .9s ease-out both}
.trio-ferrari .ferrari-hero .trio-button{animation:fr-caption 1s 1.2s ease-out both}
.trio-ferrari .ferrari-hero:before{content:"";position:absolute;z-index:2;bottom:22px;left:clamp(20px,4vw,75px);right:clamp(20px,4vw,75px);height:2px;background:#da291c;animation:fr-line 2.4s 1.2s cubic-bezier(.18,.9,.2,1) both;pointer-events:none}
.trio-ferrari .ferrari-scroll-cue{position:absolute;z-index:2;right:clamp(20px,4vw,75px);bottom:62px;display:flex;gap:13px;align-items:center;font:700 10px Arial,sans-serif;letter-spacing:.15em}
.trio-ferrari .ferrari-scroll-cue i{height:40px;width:1px;background:#fff4;overflow:hidden;position:relative}
.trio-ferrari .ferrari-scroll-cue i:after{content:"";display:block;height:60%;background:#da291c;animation:fr-cue 2.3s ease-in-out infinite}
.trio-ferrari .ferrari-vision{position:relative}
.trio-ferrari .ferrari-vision:before{content:"";position:absolute;top:45px;left:clamp(20px,4vw,75px);height:3px;width:65px;background:#da291c}
.trio-ferrari .ferrari-feature{transition:transform .8s ease}
.trio-ferrari .ferrari-feature:hover{transform:translateY(-7px)}
.trio-ferrari .ferrari-feature .trio-media img{transition:transform 1.9s ease,filter 1.9s ease}
.trio-ferrari .ferrari-feature:hover .trio-media img{transform:scale(1.08);filter:brightness(.86)}
.trio-ferrari .ferrari-specs article{position:relative;overflow:hidden}
.trio-ferrari .ferrari-specs article:before{content:"";position:absolute;top:0;left:0;width:100%;height:2px;background:#da291c;transform:scaleX(0);transform-origin:left;transition:transform .8s ease}
.trio-ferrari .ferrari-specs article:hover:before{transform:scaleX(1)}
.trio-ferrari .ferrari-specs article strong{transition:transform .7s ease}
.trio-ferrari .ferrari-specs article:hover strong{transform:translateX(8px)}
@media(max-width:780px){.trio-ferrari .ferrari-hero-copy{bottom:112px}}
@media(hover:none){.trio-ferrari .ferrari-feature:hover{transform:none}}
`;
export function trioMotionCSS(type){const motion={nike:nikeMotion,clay:clayMotion,ferrari:ferrariMotion}[type];if(!motion)throw Error("Unsupported motion design");return motionShared+motion;}

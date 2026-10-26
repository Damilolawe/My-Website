import {esc,paths,digits,artMedia,contactAction,documentForFlagship} from "./zip-flagship-utils.mjs";

const VELOCITY_CSS=`
body.site.fg-velocity{margin:0;background:#11120f;color:#f5f2eb;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden;--fv-ink:#151612;--fv-paper:#e9e6de;--fv-muted:#a8a69d;--fv-brass:#b79b66;--fv-line:#ffffff30}
body.site.fg-velocity *{box-sizing:border-box}
.fv-header{position:absolute;inset:0 0 auto;z-index:40;min-height:86px;padding:25px clamp(22px,4vw,68px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:linear-gradient(#070807c9,transparent);color:#f8f6ef}
body.site.fg-velocity:has(.fg-banner) .fv-header{top:32px}
.fv-brand{font-size:12px;letter-spacing:.32em;text-decoration:none;text-transform:uppercase;white-space:nowrap}
.fv-nav{display:flex;justify-content:center;flex-wrap:wrap;gap:clamp(12px,2.1vw,32px)}
.fv-nav a{font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.14em;text-decoration:none;text-transform:uppercase;opacity:.72}
.fv-nav a:hover,.fv-nav a[aria-current]{opacity:1;color:#d2b982}
.fv-header-label{text-align:right;font:500 9px/1.5 ui-monospace,monospace;letter-spacing:.17em;color:#d2d0c8}
.fv-eyebrow{display:block;font:600 10px/1.6 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;color:var(--fv-brass)}
.fv-hero{position:relative;isolation:isolate;min-height:760px;height:100svh;max-height:1120px;overflow:hidden;background:#151715}
.fv-hero-photo,.fv-hero-photo>.fv-art-tile{position:absolute;inset:0;overflow:hidden;background:linear-gradient(125deg,#313532,#11120f 68%)}
.fv-hero-photo>img,.fv-hero-photo>.fv-art-tile img{width:100%;height:100%;object-fit:cover;object-position:center 53%;filter:brightness(.67) saturate(.58)}
.fv-hero-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#090a09d9 0%,#090a0970 38%,transparent 80%),linear-gradient(0deg,#11120f 0%,transparent 38%,#05060550 100%)}
.fv-hero-copy{position:absolute;left:clamp(25px,10vw,160px);right:24px;bottom:clamp(100px,14vh,180px);z-index:2;max-width:1000px}
.fv-hero h1{font:400 clamp(70px,11.7vw,178px)/.82 Arial,sans-serif;letter-spacing:-.09em;text-transform:uppercase;max-width:990px;margin:25px 0 0;color:#f7f5ef}
.fv-hero-copy>p{max-width:490px;margin:30px 0 0;font:400 clamp(16px,1.5vw,20px)/1.6 Georgia,serif;color:#e1dfd9}
.fv-hero-actions{display:flex;align-items:center;gap:32px;flex-wrap:wrap;margin-top:35px}
.fv-button{display:inline-flex;align-items:center;min-height:50px;padding:0 0 11px;border-bottom:1px solid var(--fv-brass);color:inherit;text-decoration:none;font:600 10px/1.5 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}
.fv-button:after{content:"";width:7px;height:7px;margin-left:22px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(45deg)}
.fv-hero-aside{position:absolute;z-index:2;top:35%;right:clamp(25px,5vw,80px);writing-mode:vertical-rl;font:500 9px ui-monospace,monospace;letter-spacing:.19em;color:#e7e3d8}
.fv-hero-index{position:absolute;z-index:2;right:clamp(24px,5vw,76px);bottom:50px;display:flex;align-items:center;gap:14px;font:500 9px ui-monospace,monospace;letter-spacing:.17em}
.fv-hero-index:before{content:"";width:55px;height:1px;background:currentColor}
.fv-reveal{padding:clamp(78px,9vw,140px) clamp(24px,9vw,145px) clamp(95px,11vw,170px);display:grid;grid-template-columns:.65fr 1.35fr;gap:clamp(38px,8vw,130px);align-items:start;background:#11120f}
.fv-reveal-index{padding-top:8px;font:500 10px/1.7 ui-monospace,monospace;letter-spacing:.14em;color:var(--fv-muted)}
.fv-reveal h2{margin:0;font:400 clamp(44px,7.2vw,108px)/.94 Georgia,serif;letter-spacing:-.065em;max-width:900px}
.fv-reveal p{max-width:600px;margin:28px 0 0;font:400 18px/1.7 Georgia,serif;color:#bebcb5}
.fv-reveal-rule{height:1px;background:#ffffff35;margin-top:54px}
.fv-home-specs{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}
.fv-home-spec{border-top:1px solid #ffffff48;padding-top:14px;color:#d7d4cc;font:500 9px/1.6 ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase}
.fv-home-spec strong{display:block;font:400 16px/1.3 Georgia,serif;letter-spacing:0;text-transform:none;margin-top:6px;color:#f4f1e9}
.fv-work-intro{min-height:540px;padding:180px clamp(24px,8vw,130px) 86px;background:#e9e6de;color:#171813;display:grid;grid-template-columns:1fr auto;align-items:end;gap:30px}
.fv-work-intro h1,.fv-page-title{font:400 clamp(65px,11vw,160px)/.83 Arial,sans-serif;letter-spacing:-.09em;text-transform:uppercase;margin:26px 0 0;max-width:950px}
.fv-work-intro p{max-width:250px;margin:0 0 8px;font:400 17px/1.6 Georgia,serif}
.fv-collection{padding:0 clamp(24px,8vw,130px) 130px;background:#e9e6de;color:#171813}
.fv-collection-label{display:flex;justify-content:space-between;gap:20px;padding:24px 0;border-top:1px solid #14161255;font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase}
.fv-cases{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(18px,4vw,65px);row-gap:80px}
.fv-case{min-width:0;grid-column:span 7}
.fv-case:nth-child(2){grid-column:9/span 4;margin-top:150px}
.fv-case:nth-child(3){grid-column:2/span 8;margin-top:10px}
.fv-case-stage{height:clamp(310px,44vw,650px);position:relative;overflow:hidden;background:#242722}
.fv-case:nth-child(2) .fv-case-stage{height:clamp(300px,34vw,490px)}
.fv-case-stage>img,.fv-case-stage>.fv-art-tile img{width:100%;height:100%;object-fit:cover;filter:saturate(.55) contrast(1.06);transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.fv-case:hover .fv-case-stage>img,.fv-case:hover .fv-case-stage>.fv-art-tile img{transform:scale(1.035)}
.fv-case-stage:after{content:"";position:absolute;inset:0;border:1px solid #1416121c;pointer-events:none}
.fv-case-meta{display:flex;justify-content:space-between;margin:18px 0 10px;font:600 9px/1.5 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}
.fv-case h2{margin:0;font:400 clamp(27px,4vw,58px)/1.05 Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase}
.fv-case p{max-width:520px;margin:12px 0 0;font:400 16px/1.65 Georgia,serif;color:#494a43}
.fv-features{padding:150px clamp(24px,7vw,112px) 130px;background:#dedbd2;color:#171813;min-height:100vh}
.fv-feature-heading{display:grid;grid-template-columns:.72fr 1.28fr;gap:36px;align-items:end;margin-bottom:72px}
.fv-feature-heading h1,.fv-feature-heading h2{grid-column:2;margin:15px 0 0;font:400 clamp(58px,9vw,134px)/.87 Arial,sans-serif;letter-spacing:-.09em;text-transform:uppercase;max-width:950px}
.fv-feature-heading p{grid-column:2;max-width:560px;margin:16px 0 0;font:400 17px/1.65 Georgia,serif;color:#4a4a42}
.fv-technical{display:grid;grid-template-columns:1.05fr .95fr;border-top:1px solid #17181350;border-bottom:1px solid #17181350;min-height:600px}
.fv-cutaway{position:relative;min-height:450px;overflow:hidden;background:radial-gradient(ellipse at 52% 48%,#c0beb5,#777870 75%,#484b45);display:grid;place-items:center}
.fv-cutaway:before{content:"";position:absolute;inset:9%;border:1px solid #1114;border-radius:50%;transform:scaleX(1.2)}
.fv-cutaway .guide-scene{position:absolute;inset:0;z-index:0;filter:brightness(.9) contrast(1.1)}
.fv-cutaway .guide-scene>small,.fv-cutaway .guide-scene>span{display:none}
.fv-cutaway-tag{position:absolute;top:22px;left:24px;font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase}
.fv-cutaway-note{position:absolute;right:24px;bottom:22px;font:500 9px/1.6 ui-monospace,monospace;letter-spacing:.12em}
.fv-cutaway-tag,.fv-cutaway-note{z-index:2;color:#f2efe6;text-shadow:0 1px 5px #000}
.fv-spec-panel{padding:25px clamp(20px,4vw,62px);border-left:1px solid #17181350;display:flex;flex-direction:column;justify-content:center}
.fv-spec-caption{font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase;color:#5b5b53;margin-bottom:18px}
.fv-spec{border-top:1px solid #17181350;padding:0}
.fv-spec:last-child{border-bottom:1px solid #17181350}
.fv-spec summary{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:19px 0;cursor:pointer;list-style:none;font:400 clamp(20px,2.5vw,35px)/1.15 Arial,sans-serif;letter-spacing:-.04em}
.fv-spec summary::-webkit-details-marker{display:none}
.fv-spec summary:after{content:"+";font:300 25px/1 Arial,sans-serif;color:#786747}
.fv-spec[open] summary:after{content:"−"}
.fv-spec p{max-width:450px;margin:0;padding:0 30px 21px 0;font:400 15px/1.7 Georgia,serif;color:#4d4d46}
.fv-metric-strip{display:grid;grid-template-columns:repeat(3,1fr);padding-top:30px;gap:20px}
.fv-metric{font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.13em;text-transform:uppercase}
.fv-metric strong{display:block;font:400 clamp(22px,3vw,38px)/1.15 Georgia,serif;letter-spacing:-.04em;text-transform:none;margin-top:12px}
.fv-studio{background:#d9d2c4;color:#191a16}
.fv-studio-opening{min-height:760px;padding:175px clamp(24px,8vw,130px) 95px;display:grid;grid-template-columns:.75fr 1.25fr;gap:40px;align-items:end}
.fv-studio-opening h1{grid-column:2;margin:18px 0 0;font:400 clamp(67px,11vw,158px)/.81 Arial,sans-serif;letter-spacing:-.1em;text-transform:uppercase;max-width:990px}
.fv-studio-opening .fv-eyebrow{grid-column:2}
.fv-studio-opening p{grid-column:2;max-width:570px;margin:28px 0 0;font:400 19px/1.6 Georgia,serif}
.fv-studio-photo{position:relative;margin:0 clamp(24px,8vw,130px);height:min(65vw,760px);min-height:390px;overflow:hidden;background:#484c46}
.fv-studio-photo img,.fv-studio-photo .fv-art-tile img{width:100%;height:100%;object-fit:cover;filter:sepia(.13) saturate(.62) brightness(.79)}
.fv-studio-photo figcaption{position:absolute;bottom:20px;left:24px;color:white;font:500 9px/1.6 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase}
.fv-studio-note{padding:110px clamp(24px,14vw,220px) 140px;display:grid;grid-template-columns:.6fr 1.4fr;gap:55px}
.fv-studio-note h2{margin:0;font:400 clamp(37px,5.4vw,77px)/1 Georgia,serif;letter-spacing:-.06em}
.fv-studio-note p{max-width:540px;margin:0;font:400 17px/1.8 Georgia,serif}
.fv-process{padding:70px clamp(24px,8vw,130px) 120px;border-top:1px solid #17181355}
.fv-process h2{font:400 10px/1.6 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;margin:0 0 28px}
.fv-process-list{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #17181355}
.fv-process-step{padding:24px 25px 10px 0;border-right:1px solid #17181344}
.fv-process-step+ .fv-process-step{padding-left:25px}
.fv-process-step:last-child{border:0}
.fv-process-step span{font:600 9px ui-monospace,monospace;letter-spacing:.16em;color:#725f3e}
.fv-process-step h3{margin:26px 0 9px;font:400 clamp(23px,3vw,39px)/1.1 Georgia,serif}
.fv-process-step p{max-width:280px;margin:0;font:400 14px/1.65 Georgia,serif;color:#4a4a42}
.fv-contact-page{min-height:100svh;padding:165px clamp(24px,8vw,130px) 110px;background:#131511;display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(45px,9vw,150px);align-items:center}
.fv-contact-copy h1{margin:26px 0 0;font:400 clamp(66px,10.6vw,154px)/.82 Arial,sans-serif;letter-spacing:-.095em;text-transform:uppercase;max-width:900px}
.fv-contact-copy p{max-width:430px;margin:28px 0 0;font:400 18px/1.65 Georgia,serif;color:#c7c5bb}
.fv-concierge{border-top:1px solid #ffffff55;border-bottom:1px solid #ffffff55;padding:28px 0}
.fv-concierge-label{font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.17em;text-transform:uppercase;color:var(--fv-brass)}
.fv-concierge h2{font:400 clamp(29px,4vw,50px)/1.05 Georgia,serif;letter-spacing:-.04em;margin:16px 0}
.fv-concierge p{max-width:390px;color:#c3c0b7;font:400 15px/1.7 Georgia,serif;margin:0 0 26px}
.fv-contact-action a{display:inline-flex;align-items:center;justify-content:space-between;gap:35px;min-height:58px;padding:0 18px;border:1px solid #d2c39e;text-decoration:none;font:600 9px/1.6 ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase}
.fv-contact-action a:after{content:"";width:7px;height:7px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(45deg)}
.fv-contact-action .fg-contact-note{max-width:320px;font-size:13px;color:#c3c0b7}
.fv-contact-details{grid-column:1/-1;display:flex;justify-content:space-between;gap:25px;flex-wrap:wrap;border-top:1px solid #ffffff35;padding-top:20px;font:500 9px/1.6 ui-monospace,monospace;letter-spacing:.13em;color:#aaa99f;text-transform:uppercase}
.fv-footer{background:#090a08;padding:24px clamp(22px,4vw,68px);display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;color:#aaa99f;font:500 9px/1.6 ui-monospace,monospace;letter-spacing:.13em;text-transform:uppercase}
.fv-footer a{text-decoration:none;color:#eee9dc}
@media(max-width:900px){.fv-header{grid-template-columns:1fr auto}.fv-header-label{display:none}.fv-feature-heading{grid-template-columns:1fr}.fv-feature-heading h1,.fv-feature-heading h2,.fv-feature-heading p{grid-column:1}.fv-technical{grid-template-columns:1fr}.fv-spec-panel{border-left:0;border-top:1px solid #17181350}.fv-contact-page{grid-template-columns:1fr}.fv-contact-details{grid-column:1}.fv-studio-opening{grid-template-columns:.35fr 1.65fr}}
@media(max-width:650px){.fv-header{position:absolute;display:flex;align-items:flex-start;flex-direction:column;gap:15px;padding:17px 20px}.fv-brand{font-size:10px}.fv-nav{justify-content:flex-start;gap:10px 16px}.fv-nav a{font-size:8px}.fv-hero{height:92svh;min-height:650px}.fv-hero-copy{left:24px;right:24px;bottom:105px}.fv-hero h1{font-size:clamp(58px,14vw,90px);line-height:.88}.fv-hero-copy>p{font-size:15px;margin-top:19px}.fv-hero-aside{display:none}.fv-hero-index{bottom:30px;right:24px}.fv-reveal{grid-template-columns:1fr;gap:22px;padding:82px 24px 90px}.fv-reveal h2{font-size:clamp(43px,12vw,67px)}.fv-reveal p{font-size:16px}.fv-reveal-rule{margin-top:35px}.fv-home-specs{gap:12px}.fv-home-spec{font-size:8px}.fv-home-spec strong{font-size:14px}.fv-work-intro{min-height:520px;padding:175px 24px 60px;grid-template-columns:1fr;gap:24px}.fv-work-intro h1{font-size:clamp(59px,14vw,89px)}.fv-work-intro p{max-width:330px}.fv-collection{padding:0 24px 90px}.fv-cases{display:block}.fv-case,.fv-case:nth-child(2),.fv-case:nth-child(3){display:block;margin:0 0 55px}.fv-case-stage,.fv-case:nth-child(2) .fv-case-stage{height:clamp(280px,82vw,430px)}.fv-features{padding:150px 24px 90px}.fv-feature-heading{margin-bottom:43px}.fv-feature-heading h1,.fv-feature-heading h2{font-size:clamp(55px,13vw,83px)}.fv-cutaway{min-height:330px}.fv-spec-panel{padding:22px 0}.fv-spec summary{font-size:22px}.fv-metric-strip{gap:10px}.fv-metric{font-size:8px}.fv-metric strong{font-size:22px}.fv-studio-opening{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;min-height:650px;padding:170px 24px 62px;gap:18px}.fv-studio-opening h1{font-size:clamp(59px,14vw,92px);margin:0}.fv-studio-opening p{font-size:16px;margin:0}.fv-studio-photo{margin:0 24px;height:100vw;min-height:300px}.fv-studio-note{padding:75px 24px 88px;grid-template-columns:1fr;gap:22px}.fv-studio-note h2{font-size:43px}.fv-process{padding:55px 24px 85px}.fv-process-list{grid-template-columns:1fr}.fv-process-step,.fv-process-step+.fv-process-step{padding:22px 0;border-right:0;border-bottom:1px solid #17181344}.fv-process-step h3{margin:15px 0 8px}.fv-contact-page{padding:160px 24px 70px;gap:48px}.fv-contact-copy h1{font-size:clamp(60px,14vw,92px)}.fv-contact-copy p{font-size:16px}.fv-contact-details{display:grid;grid-template-columns:1fr;gap:9px}.fv-footer{padding:20px 24px}}
@media(prefers-reduced-motion:reduce){.fv-case-stage>img,.fv-case-stage>.fv-art-tile img{transition:none}}
`;

const photo=index=>[
 "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=82&fit=crop",
 "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1500&q=82&fit=crop",
 "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1600&q=82&fit=crop"
][index%3];

function visual(v,options,index,title,sourceScene){
 // Licensed/authorized assets supplied by customers take precedence. Remote photography is
 // reserved for fictional template previews; published customer sites use authored artwork.
 const demo='<img loading="'+(index===0?'eager':'lazy')+'" src="'+photo(index)+'" alt="'+esc(title)+'" referrerpolicy="no-referrer">';
 const authored='<div class="fv-art-tile">'+sourceScene+'</div>';
 return artMedia(v,options,index,title,options.sample?demo:authored);
}

export function renderVelocity({t,v,options,page,profile,sourceCSS,sourceScene,sourceArtCSS}){
 const name=esc(v.content.name),headline=esc(v.content.headline),bio=esc(v.content.bio);
 const link=target=>paths(t,target);
 const routes=[["home","Atelier"],["work","Models"],["features","Engineering"],["studio","Design"],["contact","Concierge"]];
 const nav=routes.map(([route,label])=>'<a href="'+link(route)+'" '+(page===route?'aria-current="page"':'')+'>'+label+'</a>').join("");
 const header='<header class="fv-header"><a class="fv-brand" href="'+link("home")+'">'+name+'</a><nav class="fv-nav" aria-label="Primary navigation">'+nav+'</nav><span class="fv-header-label">MOTOR CAR / ATELIER 001</span></header>';
 const cards=(v.content.cards||[]).slice(0,3).map((card,index)=>'<article class="fv-case"><div class="fv-case-stage">'+visual(v,options,index,card.title,sourceScene)+'</div><div class="fv-case-meta"><span>PROJECT '+digits(index+1)+' / MODEL</span><span>DESIGN STUDY</span></div><h2>'+esc(card.title)+'</h2><p>'+esc(card.description)+'</p></article>').join("");
 const homeHero='<section class="fv-hero" data-architecture="'+esc(t.source)+'" aria-labelledby="hero-title"><div class="fv-hero-photo">'+visual(v,options,0,name+" automotive editorial",sourceScene)+'</div><span class="fv-hero-aside">FORM / FORCE / FLIGHT — '+digits(2026)+'</span><div class="fv-hero-copy"><span class="fv-eyebrow">'+esc(v.content.heroLabel)+'</span><h1 id="hero-title">'+headline+'</h1><p>'+bio+'</p><div class="fv-hero-actions"><a class="fv-button" href="'+link("work")+'">Discover the models</a><span class="fv-eyebrow">A STUDY IN MOTION / 001</span></div></div><span class="fv-hero-index">SCROLL TO ENTER / 01</span></section>';
 const homeReveal='<section class="fv-reveal" id="studio"><div class="fv-reveal-index">01 — A POINT OF VIEW<br>DESIGN / ENGINEERING / SOUL</div><div><h2>Speed, given a sense of place.</h2><p>'+bio+'</p><div class="fv-reveal-rule"></div><div class="fv-home-specs"><span class="fv-home-spec">First principle<strong>Purposeful form</strong></span><span class="fv-home-spec">Character<strong>Quiet confidence</strong></span><span class="fv-home-spec">Approach<strong>Driver first</strong></span></div></div></section>';
 const workPage='<section class="fv-work-intro" aria-labelledby="hero-title"><div><span class="fv-eyebrow">THE MODEL REGISTER / 01—03</span><h1 id="hero-title">A study in<br>three acts.</h1></div><p>Each machine begins with a different question. Every answer is shaped around the drive.</p></section><section class="fv-collection" id="work"><div class="fv-collection-label"><span>THE COLLECTION</span><span>SELECT A STORY / 2026</span></div><div class="fv-cases">'+cards+'</div></section>';
 const specItems=(v.content.cards||[]).slice(0,3).map((card,index)=>'<details class="fv-spec" '+(index===0?'open':'')+'><summary><span>'+digits(index+1)+' / '+esc(card.title)+'</span></summary><p>'+esc(card.description)+' The system is considered as part of one balanced whole, tuned to make the driver feel connected to every input.</p></details>').join("");
 const featuresPage='<section class="fv-features fv-engineering" id="features"><div class="fv-feature-heading"><span class="fv-eyebrow">ENGINEERING / FIELD NOTES 001</span><h1 id="hero-title">The science<br>of sensation.</h1><p>Explore the thinking behind a responsive, composed machine. Details open to reveal the intent behind each engineering study.</p></div><div class="fv-technical"><div class="fv-cutaway"><span class="fv-cutaway-tag">CHASSIS STUDY / A—01</span>'+sourceScene+'<span class="fv-cutaway-note">ILLUSTRATIVE DESIGN STUDY</span></div><div class="fv-spec-panel fv-specs study-approach study-approach-list"><span class="fv-spec-caption">INTERACTIVE SYSTEMS / SELECT TO EXPAND</span>'+specItems+'</div></div><div class="fv-metric-strip"><span class="fv-metric">Design priority<strong>Balance</strong></span><span class="fv-metric">Road character<strong>Composed</strong></span><span class="fv-metric">Driver connection<strong>Direct</strong></span></div></section>';
 const studioPage='<section class="fv-studio" id="studio"><div class="fv-studio-opening"><span class="fv-eyebrow">AN ATELIER FOR THE AUTOMOBILE</span><h1 id="hero-title">Made to<br>move you.</h1><p>'+bio+'</p></div><figure class="fv-studio-photo">'+visual(v,options,1,"Automotive design atelier",sourceScene)+'<figcaption>FORM REFINED BY HAND / STUDIO NOTES 001</figcaption></figure><div class="fv-studio-note fv-manifesto"><span class="fv-eyebrow">DESIGN PHILOSOPHY / 01</span><div><h2>Less noise.<br>More feeling.</h2><p>We begin with proportion, touch and the view from the driver’s seat. Surfaces are reduced until every crease earns its place; materials are chosen to reward the senses over time. The result is a clear expression of purpose, finished with patience and care.</p></div></div><section class="fv-process"><h2>The atelier sequence</h2><div class="fv-process-list"><article class="fv-process-step"><span>01 / OBSERVE</span><h3>Listen to the road</h3><p>Understand the way a machine should respond before drawing its outline.</p></article><article class="fv-process-step"><span>02 / SCULPT</span><h3>Find the gesture</h3><p>Work through volume, light and material until form feels inevitable.</p></article><article class="fv-process-step"><span>03 / REFINE</span><h3>Attend to detail</h3><p>Bring finish and function together in a coherent, enduring whole.</p></article></div></section></section>';
 const contactPage='<section class="fv-contact-page" id="contact"><div class="fv-contact-copy"><span class="fv-eyebrow">PRIVATE CLIENT SERVICES / '+name+'</span><h1 id="hero-title">The road<br>starts here.</h1><p>'+bio+'</p></div><aside class="fv-concierge"><span class="fv-concierge-label">A PERSONAL INTRODUCTION</span><h2>Speak with the atelier.</h2><p>Share what you are looking for and a member of the studio will help shape your next conversation.</p><div class="fv-contact-action">'+contactAction(v)+'</div></aside><div class="fv-contact-details"><span>PRIVATE ENQUIRIES / BY APPOINTMENT</span><span>COLLECTION / COMMISSION / ATELIER</span><span>RESPONSE / PERSONAL & DISCREET</span></div></section>';
 const homeSpecs=specItems;
 const homeFeatures='<section class="fv-features fv-engineering" id="features"><div class="fv-feature-heading"><span class="fv-eyebrow">ENGINEERING / FIELD NOTES 001</span><h2>The science<br>of sensation.</h2><p>Three ideas guide the engineering: balance, response and a composed connection between road and driver.</p></div><div class="fv-technical"><div class="fv-cutaway"><span class="fv-cutaway-tag">CHASSIS STUDY / A—01</span>'+sourceScene+'<span class="fv-cutaway-note">ILLUSTRATIVE DESIGN STUDY</span></div><div class="fv-spec-panel fv-specs"><span class="fv-spec-caption">INTERACTIVE SYSTEMS / SELECT TO EXPAND</span>'+homeSpecs+'</div></div></section>';
 const homeContact='<section class="fv-reveal" id="contact"><div class="fv-reveal-index">PRIVATE CLIENT SERVICES</div><div><span class="fv-eyebrow">BEGIN A CONVERSATION</span><h2>Consider the next road.</h2><p>'+bio+'</p><a class="fv-button" href="'+link("contact")+'">Meet the concierge</a></div></section>';
 const body=header+'<main id="main">'+(page==="home"?homeHero+homeReveal+'<section class="fv-collection" id="work"><div class="fv-collection-label"><span>THE MODEL REGISTER</span><span>THREE STUDIES / IN MOTION</span></div><div class="fv-cases">'+cards+'</div></section>'+homeFeatures+homeContact:
  page==="work"?workPage:
  page==="features"?featuresPage:
  page==="studio"?studioPage:contactPage)+'</main><footer class="fv-footer"><span>'+name+' / AUTOMOTIVE DESIGN STUDY</span><span>FICTIONAL TEMPLATE CONCEPT — AWE CONCEPTS</span><a href="'+link("home")+'">RETURN TO ATELIER</a></footer>';
 return documentForFlagship(t,v,options,page,profile,{title:name,css:VELOCITY_CSS,body,sourceCSS,sourceArtCSS,metaDescription:v.content.bio});
}

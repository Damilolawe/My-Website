export const alternateCSS = `
/* FOURTEEN DISTINCT EXPRESS ART DIRECTIONS — STATIC, PORTABLE, SCRIPT-FREE */
.atlas-hero,.terminal-hero,.orbit-hero,.playbill-hero,.monologue-hero,.portraiture-hero,.contactsheet-hero,.atelier-hero,.museum-hero,.brutalist-hero,.nocturne-hero,.foundry-hero,.bloom-hero,.ledger-hero{display:block;position:relative;padding:0;max-width:none;min-height:0;overflow:clip}
.hero-variant .hero-media:has(.experience-art){min-height:0}
.atlas-hero{background:#e8f3ed;color:#162e29;padding:25px 30px 70px;min-height:780px}
.atlas-top,.atlas-bottom{display:flex;justify-content:space-between;border-block:1px solid #163e3852;padding:15px 0}.atlas-top{margin-bottom:55px}
.atlas-layout{display:grid;grid-template-columns:100px minmax(0,1.3fr) minmax(260px,.72fr);gap:24px;align-items:center;min-height:570px}
.atlas-side{writing-mode:vertical-rl;transform:rotate(180deg);align-self:stretch;display:flex;justify-content:space-between}
.atlas-layout h1{font:880 clamp(68px,7.8vw,148px)/.91 system-ui,sans-serif;letter-spacing:-.095em}
.atlas-visual{align-self:stretch;position:relative;border-left:4px solid #163e38;padding-left:15px}.atlas-visual .hero-media{height:89%;min-height:400px;border-radius:0}.atlas-caption{font:700 11px monospace;padding:17px;border-bottom:4px solid #163e38}.atlas-bottom{margin-top:25px}
.atlas .section-head{grid-template-columns:1fr .7fr;border-bottom:2px solid;padding-bottom:20px}.atlas .work-grid{grid-template-columns:repeat(3,1fr)}
.terminal-hero{background:#101713;color:#bbffc2;padding:50px 3vw 70px}
.terminal-window{border:2px solid #69db80;box-shadow:12px 12px 0 #052b13;margin:0 auto;width:min(1250px,100%);min-height:630px}
.terminal-bar{display:flex;justify-content:space-between;gap:14px;border-bottom:2px solid #69db80;padding:13px 19px;font:700 12px monospace}.terminal-dots{color:#8bffa0}
.terminal-interface{padding:clamp(22px,5vw,85px);min-height:550px;background:repeating-linear-gradient(0deg,transparent 0 3px,#3e7b4d15 4px 5px)}
.terminal-command,.terminal-output{font:15px/1.7 monospace;margin-bottom:55px}.terminal-command span{color:#f5faf4}
.terminal-interface h1{font:800 clamp(58px,8.8vw,160px)/.9 monospace;letter-spacing:-.095em;max-width:980px;color:#e5ffe9}
.terminal-interface .hero-label,.terminal-interface .hero-intro{color:#b3e8bc}.terminal-interface .pill-link{background:#9dffa6;color:#07170b;border-color:#9dffa6}
.terminal-caret{display:inline-block;animation:terminal-blink 1s step-end infinite}.terminal-under{display:flex;justify-content:space-between;margin-top:22px}
.terminal .section{border-top:1px dashed #69db80}.terminal .service-card{border:1px solid #69db80;border-radius:0}.terminal .work-card{border:1px solid #69db80;border-radius:0}
.orbit-hero{min-height:90svh;background:radial-gradient(circle at 70% 50%,#5d3b9a,#160d39 65%);color:#f8f6ff;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:90px 4vw}
.orbit-visual{grid-column:2;grid-row:1;position:relative;width:min(500px,100%);aspect-ratio:1;justify-self:center;animation:orbit-hover 10s ease-in-out infinite alternate}
.orbit-visual .hero-media{width:100%;height:100%;min-height:0;border-radius:50%;box-shadow:0 0 0 25px #ffffff11,0 0 0 55px #ffffff09,0 0 110px #a77aea55}
.orbit-visual .experience-art{border-radius:50%}.orbit-number{position:absolute;top:0;right:-25px;color:#e6e0ff}
.orbit-words{grid-column:1;grid-row:1;z-index:4}.orbit-words h1{font:800 clamp(68px,9vw,170px)/.9 system-ui,sans-serif;letter-spacing:-.095em;text-shadow:5px 10px 50px #0004}
.orbit-words .hero-label,.orbit-words .hero-intro{color:#e0d8ff}
.orbit-particles{position:absolute;inset:0;pointer-events:none}.orbit-particles i{position:absolute;border:2px solid #9c8fe566;width:130px;aspect-ratio:1;border-radius:50%;top:15%;left:8%}.orbit-particles i:nth-child(2){top:70%;left:25%;width:75px}.orbit-particles i:nth-child(3){top:8%;left:80%;width:50px}
.orbit-vertical{writing-mode:vertical-rl;position:absolute;right:20px;bottom:80px}
.orbit .work-card{border-radius:45px;background:linear-gradient(140deg,#dad6ff,var(--surface))}
.playbill-hero{background:#e6d5bd;color:#3d211d;padding:30px 6vw 50px;font-family:Georgia,serif}
.playbill-header{display:flex;justify-content:space-between;border-block:3px double;padding:14px 0;margin-bottom:25px}
.playbill-stage{display:grid;grid-template-columns:1.15fr .85fr;align-items:center;min-height:620px;position:relative;border:1px solid #7a3c2d;padding:40px}
.playbill-ornament{position:absolute;top:-30px;left:47%;background:#e6d5bd;padding:0 15px;font-size:60px}
.playbill-words{z-index:3;position:relative}.playbill-words h1{font:italic 400 clamp(70px,9vw,155px)/.88 Georgia,serif;letter-spacing:-.07em}
.playbill-words .pill-link{background:#8f322c;color:#fdf3de;border-color:#8f322c}
.playbill-image{height:600px;max-width:430px;justify-self:center;width:100%;filter:sepia(.45)}
.playbill-image .hero-media{height:100%;border-radius:48% 48% 0 0;min-height:0}
.playbill-footer{display:flex;justify-content:space-between;align-items:center;border-bottom:3px double;margin-top:30px;padding-bottom:20px}
.playbill-footer strong{font:italic 400 clamp(28px,5vw,70px)/1 Georgia,serif}
.playbill .work-grid{grid-template-columns:repeat(2,1fr)}.playbill .work-card{border:1px solid #956c59;background:#f3e7d7;border-radius:0}
.monologue-hero{background:#f4ecd9;color:#1f211e;min-height:85svh;padding:45px 5vw 70px;display:grid;place-items:center;font-family:"Courier New",monospace}
.script-page{background:#fffdf6;box-shadow:18px 24px 0 #bab3a5,0 30px 80px #0002;width:min(1050px,100%);padding:clamp(25px,6vw,100px);position:relative;min-height:700px}
.script-header{display:flex;justify-content:space-between;border-bottom:1px solid;padding-bottom:17px}
.script-direction{font-size:13px;text-align:left;margin:100px 0 35px}
.script-character{font-weight:700;text-align:center;margin-bottom:20px;letter-spacing:.22em}
.script-page .hero-copy{text-align:center}.script-page h1{font:700 clamp(45px,6.5vw,110px)/1.05 "Courier New",monospace;letter-spacing:-.06em}
.script-page .hero-actions{justify-content:center}.script-page .hero-intro{margin-inline:auto}.script-end{text-align:right;margin-top:90px}
.script-edge{position:absolute;right:15px;top:15px;font-size:13px}
.monologue .section-head h2{font-family:"Courier New",monospace;font-weight:700}.monologue .work-card{background:#fcf8e9;border:1px solid #131610;border-radius:0}
.portraiture-hero{position:relative;background:#edcfbf;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center;padding:65px 5vw 90px;min-height:90svh}
.portraiture-mosaic{position:absolute;inset:0;z-index:-1;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;opacity:.2}
.portraiture-mosaic span{background:linear-gradient(130deg,#bd876f,#f5d6c4);border-radius:120px 120px 0 0}.portraiture-mosaic span:nth-child(even){transform:translateY(80px)}
.portraiture-image{width:85%;height:660px;position:relative;justify-self:center}.portraiture-image .hero-media{height:100%;border-radius:220px 220px 0 0}
.portraiture-seal{position:absolute;right:-30px;bottom:30px;padding:20px;background:#291c19;color:white;transform:rotate(90deg)}
.portraiture-copy h1{font:600 clamp(68px,8vw,145px)/.93 Georgia,serif;letter-spacing:-.07em}
.portraiture .work-grid{grid-template-columns:repeat(3,1fr)}.portraiture .work-card{border-radius:130px 130px 0 0}
.contactsheet-hero{background:#1f221e;color:#e8f1df;padding:25px 3vw 50px;min-height:85svh}
.contactsheet-strip{display:flex;justify-content:space-between;border-block:1px solid #ffffff66;padding:18px 0}
.contactsheet-board{position:relative;margin:30px 0;min-height:680px;display:grid;place-items:center}
.contactsheet-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:12px}
.contactsheet-grid i{font:700 12px monospace;display:flex;align-items:flex-end;padding:10px;color:#dce8db;background:linear-gradient(145deg,#7b9275,#35463d);filter:saturate(.5)}
.contactsheet-grid i:nth-child(2n){background:radial-gradient(circle,#ddd5a8,#514f42)}.contactsheet-grid i:nth-child(3n){background:repeating-linear-gradient(45deg,#536c59,#536c59 20px,#243b30 21px,#243b30 34px)}
.contactsheet-center{z-index:2;text-align:center;background:#202820e8;padding:50px 7vw;max-width:1000px;backdrop-filter:blur(12px);border:1px solid #f7f7f055}
.contactsheet-center .hero-copy{text-align:center}.contactsheet-center h1{font:850 clamp(58px,8vw,140px)/.85 system-ui,sans-serif;text-transform:uppercase}
.contactsheet-center .hero-actions{justify-content:center}.contactsheet-center .hero-intro{margin:auto;color:#e5e9de}
.contactsheet-foot{display:flex;justify-content:space-between}
.contactsheet .work-grid{grid-template-columns:repeat(3,1fr);gap:8px}.contactsheet .work-card{border:0;border-radius:0}
.atelier-hero{background:#e6e0d5;color:#37302b;min-height:950px;padding:30px 3vw 70px}
.atelier-head{padding:15px 0;border-block:1px solid}
.atelier-stage{position:relative;display:grid;grid-template-columns:.65fr 1.1fr 1.2fr;align-items:center;gap:0;padding:80px 0 35px}
.atelier-numeral{align-self:start;font:italic 400 clamp(160px,22vw,430px)/.7 Georgia,serif;color:#af9d8a}
.atelier-photo{height:690px;transform:rotate(-3deg);box-shadow:12px 15px 0 #463f36}.atelier-photo .hero-media{height:100%;border-radius:0;filter:sepia(.35)}
.atelier-copy{margin-left:-8vw;z-index:2}.atelier-copy h1{font:italic 400 clamp(75px,9vw,155px)/.9 Georgia,serif;letter-spacing:-.085em}
.atelier-bottom{display:flex;justify-content:space-between;padding:20px 0;border-top:1px solid}
.atelier .work-grid{grid-template-columns:repeat(12,1fr)}.atelier .work-card{grid-column:span 5;transform:rotate(-2deg)}.atelier .work-card:nth-child(2){grid-column:8/13;margin-top:110px}
.museum-hero{background:#eee8da;color:#352f23;min-height:95svh;padding:25px 5vw 70px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:5vw}
.museum-index{grid-column:1/-1;border-bottom:1px solid #796e52;padding:16px 0}
.museum-plinth{height:630px;width:80%;justify-self:center;position:relative;background:#c0ac80;padding:35px;box-shadow:0 40px 50px #5b4b3026}
.museum-plinth .hero-media{height:100%;min-height:0;border:20px solid #dbd3be;border-radius:0;box-shadow:0 0 0 1px #594d38}
.museum-object-label{position:absolute;bottom:-45px;left:0}.museum-words h1{font:400 clamp(65px,7vw,135px)/1.05 Georgia,serif;letter-spacing:-.075em}
.museum-line{grid-column:1/-1;text-align:right;border-top:1px solid;padding-top:20px}
.museum .section-head{grid-template-columns:1fr}.museum .work-grid{grid-template-columns:repeat(3,1fr);gap:50px}.museum .work-card{border:0;background:transparent}
.brutalist-hero{background:#fb4f54;color:#101011;min-height:90svh;padding:0}
.brutalist-strap{background:#0c0c0d;color:#f8f8d7;padding:20px 0;text-align:center;font:900 clamp(14px,2vw,27px) system-ui;white-space:nowrap;transform:rotate(-1deg)}
.brutalist-stage{min-height:730px;position:relative;display:grid;align-items:center;grid-template-columns:1.2fr .6fr;padding:90px 5vw}
.brutalist-stage h1{font:1000 clamp(75px,12vw,215px)/.79 system-ui,sans-serif;letter-spacing:-.13em;text-transform:uppercase;text-shadow:8px 8px 0 #f8e85b;transform:rotate(-3deg)}
.brutalist-stage .hero-copy{grid-column:1;z-index:4}.brutalist-icon{position:absolute;font-size:clamp(180px,28vw,600px);line-height:1;right:0;top:6%;transform:rotate(10deg);color:#ffde44}
.brutalist-art{width:75%;justify-self:end;transform:rotate(8deg);box-shadow:24px 25px #131417;z-index:2}.brutalist-art .hero-media{height:500px;min-height:500px;border:7px solid #101011;border-radius:0}
.brutalist-tape{background:#161616;color:white;padding:23px 5vw;display:flex;justify-content:space-between}
.brutalist .work-card{border:5px solid #111;border-radius:0;box-shadow:12px 12px 0 #ef4c58}
.nocturne-hero{background:radial-gradient(ellipse at 50% 20%,#4d322c,#101012 70%);min-height:92svh;padding:30px 5vw;color:#f2dbb1;display:grid;place-items:center;position:relative}
.nocturne-stars{position:absolute;top:12%;font-size:clamp(24px,4vw,65px);letter-spacing:.8em;opacity:.55}
.nocturne-center{text-align:center;max-width:1050px;z-index:2;position:relative;padding:100px 0}
.nocturne-monogram{display:block;font:italic 400 clamp(130px,18vw,300px)/.8 Georgia,serif;color:#b8915a80;letter-spacing:-.12em}
.nocturne-center .hero-copy{text-align:center}.nocturne-center h1{font:italic 400 clamp(67px,9vw,160px)/.96 Georgia,serif;color:#ffedcf}
.nocturne-center .hero-intro{margin:auto;color:#d2c3b5}.nocturne-center .hero-actions{justify-content:center}
.nocturne-ring{position:absolute;inset:-8%;border:1px solid #b68e5a42;border-radius:50%;transform:scaleX(.83);z-index:-1}
.nocturne-footer{position:absolute;bottom:24px;left:5vw;right:5vw;display:flex;justify-content:space-between}
.nocturne .work-card{background:#241b1c;border:1px solid #8f6d44;border-radius:0}
.foundry-hero{background:#e4d3b1;color:#302d27;min-height:90svh;padding:30px 3vw}
.foundry-top,.foundry-rule{display:flex;justify-content:space-between;align-items:center;border-block:2px solid #322c25;padding:17px 0}
.foundry-top strong{font:900 30px system-ui;letter-spacing:-.06em}
.foundry-layout{display:grid;grid-template-columns:1.2fr .8fr;align-items:center;min-height:690px;gap:4vw}
.foundry-copy h1{font:950 clamp(75px,10vw,180px)/.85 system-ui;letter-spacing:-.095em;text-transform:uppercase}
.foundry-graphic{position:relative}.foundry-graphic .hero-media{min-height:620px;height:620px;border-radius:0;clip-path:polygon(0 0,100% 0,100% 85%,85% 100%,0 100%)}
.foundry-badge{position:absolute;right:0;bottom:0;font:950 35px system-ui;background:#f0ae2f;color:#111;padding:25px;transform:rotate(-8deg)}
.foundry .services-grid{grid-template-columns:repeat(3,1fr)}.foundry .service-card{background:#e8d6b4;border:2px solid #3d2e26;border-radius:0}
.bloom-hero{min-height:86svh;background:#f2dfe4;color:#502d3b;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:4vw;padding:100px 4vw;position:relative}
.bloom-hero:before{content:"";position:absolute;inset:11% 3% 7%;border:3px dashed #b67d91;border-radius:43% 27% 45% 28%;pointer-events:none}
.bloom-flower{position:absolute;top:5%;right:5%;font-size:clamp(110px,18vw,280px);line-height:1;color:#b6719d;transform:rotate(-18deg)}
.bloom-label{position:absolute;top:30px;left:4vw}
.bloom-stage{display:contents}.bloom-stage .hero-copy{grid-column:1;z-index:2}.bloom-stage h1{font:italic 600 clamp(70px,8vw,150px)/.96 Georgia,serif}
.bloom-portrait{grid-column:2;width:90%;justify-self:end;transform:rotate(4deg)}
.bloom-portrait .hero-media{min-height:580px;height:580px;border-radius:200px 160px 140px 180px}
.bloom-foot{position:absolute;bottom:22px;right:8vw}.bloom .work-card,.bloom .service-card{border-radius:60px 20px;background:#fff5f6}
.ledger-hero{background:#edf0f1;color:#172f42;padding:30px 3vw 70px;min-height:86svh}
.ledger-top,.ledger-bottom{display:flex;justify-content:space-between;padding:18px 0;border-block:1px solid #274e73}
.ledger-main{display:grid;grid-template-columns:1.3fr .7fr;gap:4vw;align-items:center;min-height:700px;position:relative}
.ledger-main h1{font:900 clamp(70px,8.5vw,160px)/.91 system-ui;letter-spacing:-.1em}
.ledger-card{position:relative;min-height:540px;background:#1c3c5a;color:white;padding:20px;display:grid;grid-template-rows:auto 1fr auto;gap:20px;box-shadow:20px 20px 0 #aac1d2}
.ledger-card .hero-media{min-height:410px;height:410px;border-radius:0}
.ledger-bottom{margin-top:30px}.ledger-lines{height:5px;background:repeating-linear-gradient(90deg,#1d3b58 0 3px,transparent 3px 15px)}
.ledger .work-card,.ledger .service-card{background:#e2e9f3;border-radius:0;border:1px solid #335b79}
@keyframes terminal-blink{50%{opacity:0}}
@keyframes orbit-hover{to{transform:translateY(-28px) rotate(-4deg)}}
@keyframes bloom-sway{to{transform:rotate(16deg)}}
@keyframes brutalist-jump{to{transform:translateY(-17px) rotate(17deg)}}
@keyframes contact-develop{from{filter:grayscale(1);opacity:.35}to{filter:grayscale(0);opacity:1}}
@keyframes monologue-type{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@media(prefers-reduced-motion:no-preference){
.motion-expressive .terminal-caret{animation:terminal-blink 1s steps(1) infinite}
.motion-expressive .orbit-visual{animation:orbit-hover 10s ease-in-out infinite alternate}
.motion-expressive .bloom-flower{animation:bloom-sway 5s ease-in-out infinite alternate}
.motion-expressive .brutalist-icon{animation:brutalist-jump 3s ease-in-out infinite alternate}
.motion-expressive .contactsheet-grid i{animation:contact-develop 1.3s both;animation-delay:calc(var(--i,0) * 125ms)}
.motion-expressive .script-direction{animation:monologue-type 1.3s .5s both steps(24)}
.motion-expressive .atelier-numeral{animation:orbit-hover 9s ease-in-out infinite alternate}
.motion-expressive .nocturne-ring{animation:awe-orbit 45s linear infinite}
.motion-expressive .portraiture-mosaic span{animation:contact-develop 2s both}
}
@media(max-width:900px){
.atlas-layout{grid-template-columns:40px 1fr}.atlas-visual{grid-column:2;min-height:330px}.atlas-visual .hero-media{height:380px;min-height:380px}
.orbit-hero,.portraiture-hero,.museum-hero,.foundry-layout,.bloom-hero,.ledger-main,.playbill-stage{grid-template-columns:1fr;min-height:0}
.orbit-words{grid-column:1;grid-row:1}.orbit-visual{grid-column:1;grid-row:2;justify-self:center;width:65%;margin:45px 0}
.playbill-image,.portraiture-image{height:400px;width:75%;margin:30px auto}
.portraiture-copy{grid-row:1}.atelier-stage{grid-template-columns:1fr 1fr}.atelier-numeral{position:absolute;top:15px}.atelier-photo{height:460px}.atelier-copy{margin-left:-11vw}
.brutalist-stage{grid-template-columns:1fr}.brutalist-art{width:55%;margin-top:40px}
.foundry-layout .hero-media{height:440px;min-height:440px}.bloom-stage{display:flex;flex-direction:column}.bloom-portrait{width:70%;align-self:end}
.ledger-card{max-width:600px;margin:40px 20px}
}
@media(max-width:600px){
.atlas-hero,.terminal-hero,.contactsheet-hero,.atelier-hero,.foundry-hero,.ledger-hero{padding:25px 16px 55px}
.atlas-hero h1,.orbit-words h1,.brutalist-stage h1,.foundry-copy h1,.ledger-main h1{font-size:clamp(50px,13vw,96px)}
.atlas-layout{grid-template-columns:1fr}.atlas-side{display:none}.atlas-visual{grid-column:1}.atlas-top,.atlas-bottom,.playbill-header,.playbill-footer,.ledger-top{font-size:9px}
.terminal-window{min-height:0}.terminal-interface{min-height:430px;padding:20px}.terminal-interface h1{font-size:clamp(45px,11vw,80px)}
.orbit-hero{padding:70px 18px}.orbit-visual{width:90%}
.playbill-hero{padding:20px}.playbill-stage{padding:22px}.playbill-words h1{font-size:clamp(60px,14vw,100px)}
.monologue-hero{padding:25px 15px}.script-page{min-height:550px}.script-direction{margin-top:60px}.script-page h1{font-size:clamp(40px,9vw,80px)}
.portraiture-hero{padding:65px 18px}.portraiture-image{width:80%;height:360px}.portraiture-copy h1{font-size:clamp(56px,13vw,95px)}
.contactsheet-board{min-height:530px}.contactsheet-grid{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(3,1fr)}.contactsheet-center{padding:32px 12px}.contactsheet-center h1{font-size:clamp(44px,11vw,85px)}
.atelier-stage{display:flex;flex-direction:column}.atelier-numeral{font-size:210px}.atelier-photo{width:70%;height:390px;margin-top:90px}.atelier-copy{margin:30px 0}.atelier-copy h1{font-size:clamp(57px,13vw,94px)}
.museum-hero{padding:25px 18px}.museum-plinth{width:85%;height:420px}.museum-words h1{font-size:clamp(52px,12vw,100px)}
.brutalist-stage{padding:55px 18px}.brutalist-art{width:85%}.brutalist-art .hero-media{height:350px;min-height:350px}
.nocturne-hero{padding:70px 18px}.nocturne-center h1{font-size:clamp(55px,12vw,110px)}.nocturne-monogram{font-size:180px}
.foundry-top strong{font-size:19px}.foundry-graphic .hero-media{height:400px;min-height:400px}.foundry-graphic{margin:30px 0}
.bloom-hero{padding:100px 18px 65px}.bloom-stage h1{font-size:clamp(56px,12vw,105px)}.bloom-portrait{width:85%}.bloom-portrait .hero-media{min-height:380px;height:380px}
.ledger-card{margin:35px 15px}.ledger-card .hero-media{min-height:300px;height:300px}
.atlas .work-grid,.portraiture .work-grid,.contactsheet .work-grid,.museum .work-grid{grid-template-columns:1fr}
.atelier .work-grid{grid-template-columns:1fr}.atelier .work-card,.atelier .work-card:nth-child(2){grid-column:auto;margin:0;transform:none}
}
@media(prefers-reduced-motion:reduce){.terminal-caret,.orbit-visual,.bloom-flower,.brutalist-icon,.contactsheet-grid i,.script-direction,.atelier-numeral,.nocturne-ring{animation:none!important}}
.motion-none .terminal-caret,.motion-none .orbit-visual,.motion-none .bloom-flower,.motion-none .brutalist-icon,.motion-none .contactsheet-grid i,.motion-none .script-direction,.motion-none .atelier-numeral,.motion-none .nocturne-ring{animation:none!important}
`;

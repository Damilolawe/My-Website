export const experienceCSS = `
.hero-variant{position:relative;max-width:none;isolation:isolate;overflow:clip}
.hero-variant .hero-copy{position:relative;z-index:3}
.hero-variant .hero-label{font-weight:800;letter-spacing:.19em;color:var(--fg)}
.hero-variant .hero-copy h1{text-wrap:balance}
.hero-variant .hero-media{min-height:470px;height:100%;overflow:hidden}
.hero-variant .hero-media>img{width:100%;height:100%;min-height:470px;object-fit:cover;transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
.hero-variant .hero-media:hover>img{transform:scale(1.065)}
.hero-variant .pill-link{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s}
.hero-variant .pill-link:hover{transform:translateY(-6px);box-shadow:0 20px 40px #0003}
.experience-art{position:absolute;inset:0;overflow:hidden;background:radial-gradient(circle at 75% 25%,var(--secondary),transparent 46%),linear-gradient(140deg,var(--accent),var(--secondary))}
.experience-art:before{content:"";position:absolute;inset:-20%;background:repeating-linear-gradient(90deg,transparent 0 33px,#fff2 34px 35px);transform:rotate(-12deg)}
.art-orb{position:absolute;top:8%;left:15%;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 25% 22%,#fff9,transparent 25%),radial-gradient(circle at 65% 70%,#222e,#0002 72%);box-shadow:inset -20px -35px 75px #0006,0 25px 85px #0005}
.art-orbit{position:absolute;inset:14%;border:clamp(18px,3vw,42px) solid #fff8;border-radius:50%;transform:rotate(39deg) scaleX(.62)}
.art-shard{position:absolute;right:14%;top:-20%;width:20%;height:145%;transform:rotate(28deg);background:#fff4}
.art-signature{position:absolute;bottom:1%;left:5%;font:900 clamp(78px,16vw,230px)/.8 system-ui,sans-serif;letter-spacing:-.13em;color:#fff8;mix-blend-mode:overlay}
.experience-interlude{overflow:hidden;border-block:1px solid var(--border);padding:19px 0;margin:10px 0 30px}
.experience-track{width:max-content;display:flex;gap:50px;white-space:nowrap;animation:awe-flow 35s linear infinite}
.experience-track span{display:inline-flex;gap:40px;align-items:center;font:750 clamp(19px,2.5vw,37px)/1 var(--body-font);letter-spacing:-.06em}
.experience-track b{color:var(--accent)}
/* Precision professional */
.index-hero{display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:5vw;padding:85px 2vw;min-height:790px}
.index-lines{position:absolute;inset:0;z-index:-1;background-image:linear-gradient(to right,#8882 1px,transparent 1px),linear-gradient(to bottom,#8882 1px,transparent 1px);background-size:calc(100%/12) 90px;mask-image:linear-gradient(#000,transparent)}
.index-overline{position:absolute;top:20px;left:2vw}
.index-hero h1{font:900 clamp(65px,8vw,150px)/.9 system-ui,sans-serif;letter-spacing:-.09em}
.index-identity{position:relative;align-self:stretch;min-height:560px}
.index-identity .hero-media{height:100%;min-height:560px;clip-path:polygon(0 0,100% 0,100% 87%,85% 100%,0 100%);border-radius:0}
.identity-stamp{position:absolute;bottom:10px;left:-30px;background:var(--fg);color:var(--bg);padding:23px;width:min(310px,90%);box-shadow:12px 12px 0 var(--accent);display:grid;gap:8px}
.identity-stamp strong{font-size:clamp(19px,2.5vw,37px);letter-spacing:-.06em}.identity-stamp>span:last-child{position:absolute;right:15px;top:8px;font-size:32px;color:var(--accent)}
.index .work-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.index .work-card:first-child{grid-column:span 2}.index .work-card:nth-child(2){transform:none}
/* Magazine-like editorial */
.folio-hero{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:18px;padding:25px 0 70px;min-height:90vh;align-items:start}
.folio-masthead{grid-column:1/-1;display:flex;justify-content:space-between;border-block:1px solid;padding:14px 0}
.folio-words{grid-column:1/10;margin-top:8vw;z-index:3;position:relative}
.folio-words h1{font:italic 400 clamp(70px,11vw,205px)/.9 Georgia,serif;letter-spacing:-.075em}
.folio-picture{grid-column:9/13;grid-row:2;position:relative;align-self:end;margin-top:15vw}
.folio-picture .hero-media{height:clamp(300px,37vw,580px);min-height:0;border-radius:0;filter:sepia(.18)}
.folio-picture .hero-media>img{min-height:0}.folio-volume{position:absolute;bottom:0;left:-65px;writing-mode:vertical-rl}
.folio-colophon{grid-column:1/-1;border-top:2px solid;padding:15px 0}
.folio .section-head h2{font:italic 400 clamp(60px,7vw,130px)/.96 Georgia,serif}
.folio .work-grid{grid-template-columns:repeat(12,1fr)}.folio .work-card{grid-column:span 6;border:0;background:transparent}.folio .work-card:first-child{grid-column:span 8}.folio .work-card:nth-child(2){grid-column:span 4;margin-top:120px}.folio .work-card-body{padding-inline:0}
/* Architectural minimal */
.still-hero{display:block;min-height:88vh;padding:90px 0 0}.still-top,.still-footer{display:flex;justify-content:space-between;gap:20px}
.still-stage{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;min-height:630px;margin:60px 0}
.still-stage .hero-media{width:76%;height:630px;min-height:630px;justify-self:center;border-radius:50% 50% 0 0;filter:saturate(.8)}
.still-words{position:relative;z-index:3;margin-left:-10vw}.still-words h1{font:400 clamp(52px,6.6vw,120px)/1.06 Georgia,serif;letter-spacing:-.062em}
.still-words .hero-copy{text-shadow:0 3px 40px var(--bg)}
.still-footer{padding:20px 0;border-top:1px solid var(--border)}
.still .work-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:55px}.still .work-card{grid-column:span 6}.still .work-card:first-child{grid-column:span 8}.still .work-card:nth-child(2){grid-column:7/13;margin-top:110px}
.still .work-card{border:0;background:transparent}.still .work-card-body{padding-inline:0}.still .service-card{border:0;border-top:1px solid var(--border);background:transparent}
/* Full-bleed film */
.afterhours-hero{display:block;padding:0;min-height:0}
.afterhours-screen{position:relative;display:grid;align-items:center;min-height:86svh;overflow:hidden;margin-inline:calc(50% - 50vw);background:#090a10}
.afterhours-screen>.hero-media{position:absolute;inset:0;height:100%;min-height:0;border-radius:0;opacity:.7}
.afterhours-screen>.hero-media>img{height:100%;min-height:100%;filter:brightness(.65) saturate(.75)}
.afterhours-screen .experience-art{background:radial-gradient(ellipse at 65% 30%,var(--accent),#10121a 65%)}
.afterhours-veil{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,#07080ad9,transparent 90%),linear-gradient(0deg,#07080adf,transparent 70%)}
.afterhours-words{z-index:2;position:relative;width:min(1240px,88%);margin:auto;padding:145px 0}
.afterhours-words h1{font:900 clamp(65px,9.9vw,195px)/.85 system-ui,sans-serif;text-transform:uppercase;letter-spacing:-.105em;color:white}
.afterhours-words .hero-label,.afterhours-words .hero-intro{color:#e6e1f5}
.afterhours-frame,.afterhours-count{position:absolute;z-index:3;color:white;left:5vw;top:25px}.afterhours-count{top:auto;bottom:25px;left:auto;right:5vw}
.afterhours-footer{display:flex;justify-content:space-between;padding:20px 0}
.afterhours .work-grid{display:grid;grid-template-columns:repeat(12,1fr)}.afterhours .work-card{grid-column:span 6;border:0}.afterhours .work-card:first-child{grid-column:span 8}.afterhours .work-card:nth-child(2){grid-column:span 4;margin-top:100px}
/* Graphic disruption */
.signal-hero{display:block;position:relative;padding:25px 0 70px}
.signal-tape{background:var(--fg);color:var(--bg);overflow:hidden;white-space:nowrap;padding:14px 0;font:900 17px system-ui;text-transform:uppercase;letter-spacing:.15em;transform:rotate(-1deg) scale(1.06)}
.signal-tape span{display:block;width:max-content;animation:awe-flow 19s linear infinite}
.signal-stage{display:grid;grid-template-columns:1fr .82fr;align-items:center;gap:0;min-height:700px;padding:55px 0 35px}
.signal-stage .hero-copy{margin-right:-7vw}.signal-stage h1{font:950 clamp(70px,10vw,180px)/.87 system-ui,sans-serif;text-transform:uppercase;letter-spacing:-.105em;transform:rotate(-3deg);text-shadow:6px 7px 0 var(--secondary)}
.signal-artwork{position:relative}.signal-artwork .hero-media{min-height:590px;transform:rotate(5deg);box-shadow:22px 22px 0 var(--fg)}
.signal-sticker-a{position:absolute;right:-28px;top:-35px;width:145px;height:145px;border-radius:50%;background:var(--secondary);color:#111;display:grid;place-items:center;text-align:center;font:950 24px/.85 system-ui;transform:rotate(15deg);z-index:4}
.signal-sticker-b{position:absolute;bottom:5%;left:-25px;font-size:130px;text-shadow:5px 5px var(--secondary);z-index:4}
.signal-footer{padding:22px 0;border-block:5px solid var(--fg)}
.signal .work-card:nth-child(even){transform:none}.signal .work-card{border:3px solid var(--fg);box-shadow:9px 9px 0 var(--fg)}
/* Youthful, expressive */
.daylight-hero{display:grid;grid-template-columns:1fr 1fr;position:relative;gap:4vw;align-items:center;padding:120px 25px 90px;min-height:83vh}
.daylight-hero:before{content:"";position:absolute;inset:7% 0 12%;background:var(--secondary);border-radius:125px 35px 145px 32px;opacity:.72;z-index:-1;transform:rotate(-1deg)}
.daylight-hero h1{font:950 clamp(60px,7.8vw,145px)/.96 system-ui;letter-spacing:-.095em}
.daylight-photo{position:relative;transform:rotate(4deg)}.daylight-photo .hero-media{min-height:500px;border:10px solid var(--fg);border-radius:150px 24px 150px 24px;box-shadow:15px 20px 0 var(--accent)}
.daylight-sun{position:absolute;z-index:3;top:0;right:4%;font-size:clamp(120px,18vw,260px);color:var(--accent);line-height:1;pointer-events:none}
.daylight-badge{position:absolute;top:55px;left:25px;padding:10px 19px;border-radius:50px;background:var(--accent);color:#111}
.daylight-hello{position:absolute;bottom:-37px;left:-30px;background:var(--fg);color:var(--bg);font:950 61px system-ui;padding:9px 20px;transform:rotate(-13deg);border-radius:34px}
.daylight-footer{position:absolute;right:7%;bottom:28px}
.daylight .work-grid{grid-template-columns:repeat(3,1fr)}.daylight .work-card:first-child{grid-column:span 2}.daylight .work-card:nth-child(2){transform:translateY(70px)}
@keyframes awe-flow{to{transform:translateX(-50%)}}@keyframes awe-orbit{to{transform:rotate(360deg)}}@keyframes awe-hover{to{transform:translateY(-16px)}}@keyframes awe-chrome{from{opacity:.15;transform:translateY(45px)}to{opacity:1;transform:none}}@keyframes awe-image{from{transform:scale(1.13)}to{transform:scale(1)}}
.motion-none *,.motion-none *:before,.motion-none *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
@media(prefers-reduced-motion:no-preference){
.motion-expressive .hero-variant .hero-copy{animation:awe-chrome .95s both cubic-bezier(.22,1,.36,1)}
.motion-subtle .hero-variant .hero-copy{animation:awe-chrome .6s both}
.motion-expressive .hero-variant .hero-media>img{animation:awe-image 1.55s both cubic-bezier(.22,1,.36,1)}
.motion-expressive .art-orb{animation:awe-hover 8s ease-in-out infinite alternate}
.motion-expressive .art-orbit{animation:awe-orbit 28s linear infinite}
.motion-expressive .daylight-sun{animation:awe-orbit 45s linear infinite}
.motion-expressive .signal-sticker-a{animation:awe-hover 5s ease-in-out infinite alternate}
.motion-subtle .experience-track{animation-duration:65s}.motion-expressive .experience-track{animation-duration:24s}
.motion-expressive .work-card:hover{transform:translateY(-10px);box-shadow:0 25px 75px #0003}
@supports (animation-timeline:view()) {
.motion-expressive .section-head h2,.motion-expressive .service-card,.motion-expressive .quote{animation:awe-chrome linear both;animation-timeline:view();animation-range:entry 0% entry 55%}
}}
@media(max-width:950px){
.index-hero,.signal-stage,.daylight-hero{grid-template-columns:1fr;min-height:0}
.index-identity{min-height:420px;width:86%;justify-self:end}.index-identity .hero-media{min-height:420px}
.folio-words{grid-column:1/12}.folio-picture{grid-column:8/13;margin-top:50px}
.still-stage{min-height:0}.still-stage .hero-media{height:480px;min-height:480px}.still-words{margin-left:-15vw}
.signal-stage .hero-copy{margin-right:0}.signal-artwork{margin:50px 40px}.signal-artwork .hero-media{min-height:440px}
.daylight-photo{width:85%;max-width:650px;justify-self:end}.daylight-photo .hero-media{min-height:430px}}
@media(max-width:650px){
.hero-variant .hero-media,.hero-variant .hero-media>img{min-height:320px}
.index-hero{padding:55px 0 85px;gap:25px}.index-hero h1{font-size:clamp(55px,13vw,97px)}.index-identity{width:90%;min-height:340px}.index-identity .hero-media{min-height:340px;height:340px}
.folio-hero{display:flex;flex-direction:column;gap:23px;min-height:0}.folio-words{margin-top:25px}.folio-words h1{font-size:clamp(63px,15vw,104px)}.folio-picture{align-self:flex-end;width:75%;margin:10px 0}.folio-picture .hero-media{height:320px;min-height:320px}.folio-masthead span:last-child{display:none}
.still-hero{padding:50px 0 0;min-height:0}.still-stage{display:flex;flex-direction:column;gap:35px;min-height:0;margin:30px 0}.still-stage .hero-media{width:100%;min-height:380px;height:380px}.still-words{margin:0;align-self:stretch}.still-words h1{font-size:clamp(50px,13vw,100px)}.still-words .hero-copy{text-shadow:none}
.afterhours-screen{min-height:80svh}.afterhours-words{padding:150px 0 110px}.afterhours-words h1{font-size:clamp(52px,14vw,110px)}.afterhours-frame,.afterhours-count{font-size:9px}
.signal-stage{min-height:0}.signal-stage h1{font-size:clamp(60px,14vw,110px);text-shadow:3px 4px 0 var(--secondary)}.signal-artwork{margin:55px 20px}.signal-artwork .hero-media{min-height:350px;height:350px}.signal-sticker-a{width:105px;height:105px;font-size:18px;right:-14px}.signal-sticker-b{font-size:85px}
.daylight-hero{padding:100px 0 75px}.daylight-hero h1{font-size:clamp(60px,13vw,106px)}.daylight-photo{width:85%;margin-top:35px}.daylight-photo .hero-media{min-height:340px;height:340px;border-width:6px}.daylight-sun{font-size:120px}.daylight-hello{font-size:36px;bottom:-15px;left:-12px}
.index .work-grid,.folio .work-grid,.still .work-grid,.afterhours .work-grid,.daylight .work-grid{grid-template-columns:1fr}
.index .work-card:first-child,.folio .work-card,.folio .work-card:first-child,.folio .work-card:nth-child(2),.still .work-card,.still .work-card:first-child,.still .work-card:nth-child(2),.afterhours .work-card,.afterhours .work-card:first-child,.afterhours .work-card:nth-child(2),.daylight .work-card:first-child{grid-column:auto;margin:0}
.daylight .work-card:nth-child(2){transform:none}}
@media(prefers-reduced-motion:reduce){.experience-track,.signal-tape span,.hero-variant *,.hero-variant *:before,.hero-variant *:after{animation:none!important;transition:none!important}.hero-variant .hero-media:hover>img{transform:none}}
`;

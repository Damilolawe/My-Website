export const fullPageCSS = `/* TWENTY INDEPENDENT PAGE SYSTEMS — every chapter changes with the art direction. */
.architect-masthead{display:flex;justify-content:space-between;align-items:center;gap:20px;border-bottom:1px solid var(--border);font:700 11px/1.4 var(--label-font);letter-spacing:.12em;text-transform:uppercase;padding:12px 0}
.architect-masthead strong{font:750 clamp(14px,1.8vw,23px)/1.1 var(--body-font);letter-spacing:-.05em;text-transform:none}
.architect-endmark{display:flex;align-items:center;justify-content:space-between;padding:50px 0;gap:20px;border-top:1px solid var(--border);font:750 13px var(--label-font);text-transform:uppercase;letter-spacing:.12em}
.architect-endmark span:nth-child(2){font:140px/.7 Georgia;color:var(--accent)}
.chapter{position:relative;padding:clamp(90px,12vw,200px) 0;overflow:clip;border-top:1px solid var(--border)}
.chapter-intro{display:grid;grid-template-columns:90px 1fr;gap:5px 30px;margin-bottom:55px}
.chapter-num,.chapter-kicker,.case-counter,.masthead-tag,.history-tag{font:800 11px/1.6 var(--label-font);letter-spacing:.13em;text-transform:uppercase}
.chapter-intro h2{grid-column:2;font-size:clamp(44px,7vw,130px);letter-spacing:-.085em;line-height:.92;text-wrap:balance}
.chapter-intro>p{grid-column:2;max-width:650px;font-size:clamp(16px,1.7vw,23px);color:var(--muted)}
.chapter-content{position:relative}
.art-directed-work{display:grid;gap:30px;min-width:0}
.case-entry{min-width:0;position:relative}
.case-entry .case-body{position:relative}
.case-entry .case-body h3{font:800 clamp(25px,3.2vw,55px)/1.05 var(--body-font);letter-spacing:-.06em;overflow-wrap:anywhere;margin:12px 0}
.case-entry .case-body p{max-width:600px;color:var(--muted);font-size:clamp(14px,1.4vw,19px);line-height:1.5;white-space:pre-line}
.case-entry .case-body a,.offer a{display:inline-block;font-size:13px;font-weight:800;text-underline-offset:6px;margin-top:10px}
.case-entry .case-image{position:relative;height:clamp(280px,30vw,525px);min-width:0;overflow:hidden}
.case-entry .case-image img{width:100%;height:100%;object-fit:cover;transition:transform .9s cubic-bezier(.22,1,.36,1)}
.case-entry:hover .case-image img{transform:scale(1.075)}
.case-art{background:radial-gradient(ellipse at 70% 20%,var(--secondary),transparent 60%),linear-gradient(135deg,var(--accent),var(--secondary));isolation:isolate}
.case-art i{display:block;position:absolute;left:14%;top:10%;width:65%;aspect-ratio:1;border:clamp(22px,4vw,85px) solid #fff8;border-radius:50%;transform:rotate(-23deg) scaleX(.72)}
.case-art b{position:absolute;right:5%;top:-10%;height:110%;width:15%;transform:rotate(-29deg);background:#fff6}
.case-art>span{position:absolute;left:3%;bottom:-6%;font:950 clamp(160px,23vw,400px)/1 system-ui;letter-spacing:-.13em;color:#0003}
.art-directed-services{display:grid;gap:0}
.offer{display:grid;grid-template-columns:90px 1fr 70px;gap:20px;align-items:start;border-top:1px solid var(--border);padding:35px 10px}
.offer:last-child{border-bottom:1px solid var(--border)}
.offer h3{font-size:clamp(22px,3vw,48px);line-height:1.05;max-width:730px}
.offer p{max-width:650px;color:var(--muted);white-space:pre-line}
.offer-symbol{font-size:40px;text-align:right;transition:transform .4s}
.offer:hover .offer-symbol{transform:rotate(45deg)}
.architect-story{display:grid;grid-template-columns:100px 1fr .25fr;gap:40px;align-items:start}
.architect-story>p{font:400 clamp(27px,4.8vw,75px)/1.2 var(--body-font);letter-spacing:-.055em;max-width:1100px}
.story-opening{font:italic 260px/.6 Georgia;color:var(--accent)}
.story-signature{grid-column:2;font:750 12px var(--label-font);letter-spacing:.15em;text-transform:uppercase}
.story-art{grid-column:3;grid-row:1/3;align-self:end;font-size:clamp(80px,13vw,230px);line-height:1;color:var(--accent)}
.architect-history{display:grid;grid-template-columns:.3fr 1fr;gap:30px;padding:45px 0;border-block:1px solid var(--border)}
.architect-history>div{font-size:clamp(22px,3.1vw,43px);line-height:1.55;white-space:normal;max-width:1000px;overflow-wrap:anywhere}
.architect-testimonials{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:25px}
.architect-testimonials blockquote{margin:0;padding:clamp(25px,5vw,75px);background:var(--surface);border:1px solid var(--border)}
.architect-testimonials blockquote p{font:400 clamp(23px,3vw,49px)/1.24 Georgia,serif}
.architect-testimonials cite{font:800 11px var(--label-font);letter-spacing:.12em}
.architect-contact{display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:center}
.architect-contact>p{font-size:clamp(26px,5vw,82px);line-height:1.09;letter-spacing:-.075em;max-width:1120px}
.contact-emblem{font-size:110px;color:var(--accent);line-height:1}
.architect-contact-links{grid-column:2;display:flex;gap:20px;flex-wrap:wrap;align-items:center}
.architect-contact-links a{text-underline-offset:7px;overflow-wrap:anywhere}
.architect-contact-button{padding:15px 26px;background:var(--accent);color:var(--on-accent);text-decoration:none;font-weight:800;display:flex;gap:50px;align-items:center}
.architect-contact-button span{transition:transform .3s}
.architect-contact-button:hover span{transform:rotate(45deg)}
/* THE INDEX — recruiter-facing index sheets, no portfolio tile clichés */
.index-records{display:block}
.case-record{display:grid;grid-template-columns:1fr .43fr 55px;gap:35px;align-items:center;border-top:2px solid var(--fg);padding:25px 0}
.case-record .case-image{height:260px}.case-record .case-body h3{font-family:system-ui,sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:-.08em}
.record-arrow{font-size:50px;align-self:start}
.index .chapter-intro{grid-template-columns:160px 1fr}.index .chapter{border-top:2px solid var(--fg)}
/* FOLIO — alternating magazine plates */
.editorial-spreads{display:grid;grid-template-columns:repeat(12,1fr);gap:100px 24px}
.case-spread{grid-column:span 7}.case-spread:nth-child(even){grid-column:8/13;transform:translateY(80px)}
.case-spread .case-image{height:clamp(350px,40vw,680px)}.case-spread:nth-child(3n) .case-image{height:clamp(230px,26vw,410px)}
.spread-figure>span{display:block;margin:12px 0;font:800 11px/1.2 monospace;letter-spacing:.1em}
.folio .chapter-intro h2{font:italic 400 clamp(65px,8vw,150px)/.96 Georgia,serif}.folio .case-body h3{font:italic 400 clamp(34px,4.7vw,78px)/1 Georgia,serif}
.folio .architect-services{border-top:0}.folio .offer h3{font-family:Georgia,serif;font-weight:400;font-style:italic}
.folio .architect-story>p{font-family:Georgia,serif;font-style:italic}
/* STILL — gallery installation with plinths */
.gallery-installation{display:grid;grid-template-columns:repeat(12,1fr);gap:110px 40px}
.case-installation{grid-column:span 6}.case-installation:nth-child(even){grid-column:7/13;margin-top:160px}
.case-installation .case-image{height:clamp(420px,50vw,740px);border-radius:48% 48% 0 0}
.gallery-plaque{border-left:3px solid var(--fg);padding:22px 30px;margin:30px auto;width:85%}
.still .chapter-intro{text-align:center;grid-template-columns:1fr}.still .chapter-intro>*{grid-column:1!important}
.still .chapter-intro h2{font:400 clamp(60px,8vw,150px)/.96 Georgia,serif}
.still .architect-story{grid-template-columns:1fr;max-width:900px;margin-inline:auto}
.still .story-opening{font-size:150px}.still .story-art{display:none}
/* AFTERHOURS — widescreen reel and scene cards */
.cinematic-reel{display:grid;gap:100px}
.case-scene{display:grid;grid-template-columns:1.3fr .7fr;gap:45px;align-items:end}
.case-scene:nth-child(even){grid-template-columns:.7fr 1.3fr}.case-scene:nth-child(even) .scene-frame{grid-column:2;grid-row:1}.case-scene:nth-child(even) .case-body{grid-column:1;grid-row:1}
.scene-frame{position:relative;background:#000;padding:24px 0;border-block:12px solid #000}
.scene-frame .case-image{aspect-ratio:16/9;height:auto}
.scene-timecode{position:absolute;top:3px;left:10px;font:11px monospace;color:#fff;z-index:2}.scene-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;aspect-ratio:1;border:1px solid #fff9;border-radius:50%;color:#fff;display:grid;place-items:center;font-size:25px;pointer-events:none}
.afterhours .chapter-intro h2{text-transform:uppercase;font-weight:950}
.afterhours .architect-contact{background:var(--surface);padding:clamp(35px,7vw,100px)}
/* SIGNAL — posters and overprinted collage */
.poster-wall{grid-template-columns:repeat(3,minmax(0,1fr));gap:25px}
.case-poster{border:4px solid var(--fg);box-shadow:12px 13px 0 var(--fg);background:var(--surface);transform:rotate(-2deg)}
.case-poster:nth-child(even){transform:rotate(3deg) translateY(60px)}
.case-poster .case-image{height:340px}.case-poster .case-body{padding:18px}
.poster-snipe{position:absolute;right:-25px;top:-32px;background:var(--secondary);color:#111;border:4px solid var(--fg);padding:5px 14px;font-size:50px;z-index:3;transform:rotate(17deg)}
.signal .chapter-intro h2{text-transform:uppercase;font-weight:950;transform:rotate(-2deg)}
.signal .offer{border:4px solid var(--fg);margin-bottom:12px;box-shadow:7px 7px var(--fg);padding:30px}
/* DAYLIGHT — overlapping scrapbook */
.playful-scrapbook{grid-template-columns:repeat(3,minmax(0,1fr));gap:70px 30px}
.case-note{padding:12px;background:#fff;color:#29282a;box-shadow:12px 19px 0 #0002;transform:rotate(-3deg);border-radius:14px}
.case-note:nth-child(even){transform:rotate(5deg) translateY(55px)}
.case-note .case-image{height:280px;border-radius:11px}.case-note .case-body{padding:22px 12px}.case-note .case-body p{color:#4a4a4a}
.note-tape{position:absolute;top:-20px;left:35%;width:110px;height:37px;z-index:2;background:#eadfad99;transform:rotate(9deg)}
.daylight .chapter-intro h2{font-weight:950;max-width:1050px}
/* ATLAS — architectural research records */
.research-index{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.case-research{padding:25px;border:2px solid #1a544e;background:#e0eee4;color:#17372f}
.case-research .case-body{padding:38px 0}.case-research .case-body p{color:#48665c}
.research-line{display:flex;justify-content:space-between;font:700 10px monospace;border-bottom:1px solid;padding-bottom:15px}
.case-research .case-image{height:210px;border-radius:0}
.atlas .chapter-intro h2{font:900 clamp(56px,8vw,145px)/.95 system-ui;letter-spacing:-.1em}
/* TERMINAL — genuine command line structure rather than image tiles */
.command-console{display:grid;gap:20px}
.case-command{background:#0b150d;color:#c3ffc0;border:2px solid #7ce092;box-shadow:8px 8px 0 #0b150d;padding:30px 35px;font-family:monospace}
.case-command .case-body h3{font-family:monospace;color:#fff;font-weight:700}
.case-command .case-body p{color:#c3dac5}
.command-prompt{font:14px/1.6 monospace;margin-bottom:30px;color:#88dba1}.command-prompt span{color:#fff}
.command-end{margin-top:30px;font:13px monospace;color:#d2ffd3}
.terminal .chapter-intro h2{font:800 clamp(55px,8vw,130px)/1 monospace;letter-spacing:-.085em}
.terminal .chapter-intro:before{content:"~/portfolio";position:absolute;top:35px;right:0;color:#91e99d;font:14px monospace}
/* ORBIT — mission cards radiate around celestial stage */
.space-mission{display:grid;grid-template-columns:repeat(3,1fr);gap:35px;padding:70px 0}
.case-mission{border:1px solid var(--border);border-radius:150px 150px 25px 25px;padding:17px;background:var(--surface)}
.case-mission:nth-child(even){transform:translateY(65px)}
.mission-node{position:relative}.mission-node .case-image{height:250px;border-radius:50%}
.mission-node>span{position:absolute;top:15px;left:15px;font:700 11px monospace;color:var(--fg);background:var(--surface);padding:8px}
.case-mission .case-body{padding:25px}.orbit .chapter-intro{text-align:center;grid-template-columns:1fr}.orbit .chapter-intro>*{grid-column:1}
.orbit .chapter-intro h2{font-size:clamp(65px,9vw,170px);font-weight:900}
/* PLAYBILL — credits belong in program, not generic cards */
.theatre-program{display:block;border:7px double currentColor;padding:clamp(25px,6vw,85px);background:#e9d7b9;color:#3b241d}
.case-program{display:grid;grid-template-columns:120px 1fr 70px;align-items:center;border-bottom:2px dotted #6b473b;min-height:190px;padding:25px 0}
.program-number{font:italic 400 clamp(50px,7vw,100px)/1 Georgia,serif}
.case-program .case-body h3{font:italic 400 clamp(38px,5vw,70px)/1 Georgia,serif}
.case-program .case-body p{color:#69534c}.program-divider{font-size:55px;text-align:center}
.playbill .chapter-intro h2{font:italic 400 clamp(65px,9vw,160px)/.95 Georgia,serif}
.playbill .architect-story>p{font-family:Georgia,serif}
/* MONOLOGUE — screenplay pages */
.screenplay-scenes{display:grid;grid-template-columns:minmax(0,1fr);gap:45px;max-width:1100px;margin:auto}
.case-screenplay{padding:clamp(35px,7vw,95px);background:#fffdf5;color:#252521;box-shadow:14px 20px 0 #bbb4a0;font-family:"Courier New",monospace}
.case-screenplay .case-body{margin:55px auto;max-width:700px}
.case-screenplay .case-body h3{font:700 clamp(34px,5vw,75px)/1.1 "Courier New",monospace;text-transform:uppercase}
.case-screenplay .case-body p{color:#4b4b46}.script-location,.script-end{font:700 13px monospace}.script-end{text-align:right}
.monologue .chapter-intro h2{font-family:monospace}
/* PORTRAITURE — staggered lookbook gallery */
.portrait-gallery{display:grid;grid-template-columns:repeat(12,1fr);gap:55px 24px}
.case-portrait{grid-column:span 4}.case-portrait:nth-child(3n+2){transform:translateY(100px)}
.portrait-mat{padding:12px;background:#e9d3c7;box-shadow:0 20px 45px #0002}
.portrait-mat .case-image{height:450px;border-radius:45% 45% 0 0}
.portraiture .chapter-intro h2{font:400 clamp(65px,8vw,155px)/.95 Georgia,serif}
/* CONTACTSHEET — dense archive frames */
.photographic-contact{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.case-contact-frame{background:#262926;color:#f5f4e9;padding:8px}
.case-contact-frame .case-image{height:220px;filter:grayscale(.55)}
.case-contact-frame:nth-child(3n) .case-image{background:linear-gradient(135deg,#89988c,#4d5a54)}
.case-contact-frame .case-body{padding:15px 7px}.case-contact-frame .case-body h3{font:800 clamp(17px,1.9vw,28px)/1.1 system-ui}
.case-contact-frame .case-body p{color:#b8c3b6;font-size:12px}
.negative-id{font:10px monospace;letter-spacing:.1em;color:#ccd1c4}
.contactsheet .chapter-intro h2{text-transform:uppercase;font-weight:950}
/* ATELIER — runway campaign plates */
.fashion-campaign{display:grid;grid-template-columns:repeat(12,1fr);gap:120px 25px}
.case-runway{grid-column:span 8;position:relative}
.case-runway:nth-child(even){grid-column:6/13;transform:translateY(90px)}
.case-runway .case-image{height:clamp(510px,52vw,860px)}
.runway-overlay{position:relative;background:var(--bg);width:75%;padding:25px;margin:-90px 0 0 auto}
.atelier .chapter-intro h2{font:italic 400 clamp(65px,10vw,165px)/.9 Georgia,serif}
/* MUSEUM — exhibition stands and plaques */
.museum-exhibition{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:120px 70px}
.case-artifact:nth-child(even){margin-top:170px}
.artifact-stand{padding:clamp(25px,5vw,75px);background:#ded4bc}
.artifact-stand .case-image{height:470px;border:16px solid #f0ebdb;box-shadow:0 0 0 1px #574d40}
.artifact-label{max-width:470px;margin:25px 0;border-left:2px solid var(--fg);padding:15px 30px}
.museum .chapter-intro{text-align:center;grid-template-columns:1fr}.museum .chapter-intro>*{grid-column:1}
.museum .chapter-intro h2{font:400 clamp(70px,9vw,170px)/.95 Georgia,serif}
/* BRUTALIST — flyers, mega type and rotations */
.experimental-flyers{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:85px 35px}
.case-flyer{padding:25px;border:7px solid #111;background:#ffdd39;color:#121212;box-shadow:20px 18px 0 #111;transform:rotate(-2deg)}
.case-flyer:nth-child(even){transform:rotate(3deg) translateY(65px);background:#ef6b70}
.case-flyer .case-body h3{font:950 clamp(40px,6vw,100px)/.85 system-ui;text-transform:uppercase}
.case-flyer .case-body p{color:#303030}.case-flyer .case-image{height:240px;margin-top:25px}
.flyer-stamp{position:absolute;right:20px;top:20px;font:800 22px monospace}
.brutalist .chapter-intro h2{font:950 clamp(70px,10vw,185px)/.85 system-ui;text-transform:uppercase}
/* NOCTURNE — restrained widescreen storytelling */
.luxury-chapters{display:grid;gap:145px}
.case-noir{position:relative;display:grid;grid-template-columns:.7fr 1.3fr;gap:50px;align-items:center;min-height:600px}
.case-noir:nth-child(even){grid-template-columns:1.3fr .7fr}
.case-noir:nth-child(even) .case-image{grid-column:1;grid-row:1}
.case-noir:nth-child(even) .case-body{grid-column:2;grid-row:1}
.noir-number{position:absolute;font:italic 400 clamp(180px,20vw,350px)/.85 Georgia,serif;color:var(--accent);opacity:.2;top:-85px;left:-20px;pointer-events:none}
.case-noir .case-image{height:570px;border-radius:50% 50% 0 0}
.nocturne .chapter-intro h2{font:italic 400 clamp(60px,8vw,155px)/1 Georgia,serif}
.nocturne .architect-story>p{font:italic 400 clamp(30px,5vw,80px)/1.17 Georgia,serif}
/* FOUNDRY — industrial job records */
.industrial-projects{display:grid;gap:15px}
.case-job{display:grid;grid-template-columns:110px 1fr 35%;gap:25px;align-items:center;padding:25px;border:2px solid #34312a;background:#d9c39e;color:#28251d}
.job-index{font:950 clamp(50px,8vw,120px)/1 system-ui;letter-spacing:-.1em}
.case-job .case-image{height:290px}.case-job .case-body p{color:#554735}
.foundry .chapter-intro h2{font:950 clamp(65px,10vw,185px)/.85 system-ui;text-transform:uppercase}
.foundry .offer{border-bottom:3px solid var(--fg);border-top:0}
/* BLOOM — botanical notes and organic journal */
.botanical-journal{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:45px 25px}
.case-journal{padding:12px;background:#fff6f1;color:#573f48;border-radius:45% 45% 5px 5px;box-shadow:12px 20px #aa719336}
.case-journal:nth-child(even){transform:translateY(80px)}.case-journal .case-image{height:350px;border-radius:48% 48% 0 0}
.case-journal .case-body{padding:20px}.case-journal .case-body p{color:#746067}.journal-spark{position:absolute;font:100px Georgia;top:-45px;right:-25px;color:#a44e79}
.bloom .chapter-intro h2{font:italic 600 clamp(65px,9vw,145px)/.92 Georgia,serif}
.bloom .architect-testimonials blockquote{border-radius:100px 10px 100px 10px}
/* LEDGER — actual reporting/case brief table */
.business-briefs{display:grid;border-top:3px solid var(--fg)}
.case-report{display:grid;grid-template-columns:140px 1fr 60px;gap:25px;align-items:start;padding:45px 15px;border-bottom:1px solid var(--border)}
.case-report .case-body h3{font:850 clamp(27px,3.8vw,67px)/1.05 system-ui}
.report-tag{font:750 11px monospace;letter-spacing:.1em}.report-arrow{font:45px/1 system-ui;align-self:start}
.ledger .chapter-intro h2{font:950 clamp(65px,9vw,160px)/.88 system-ui}
.ledger .architect-services .offer{grid-template-columns:140px 1fr 60px}
/* No script dependency, performance budget, progressive motion */
@media(prefers-reduced-motion:no-preference){
 .motion-expressive .chapter-intro h2{animation:chapter-appear .7s both}
 .motion-expressive .case-entry:hover{filter:saturate(1.08)}
 .motion-expressive .offer:hover{background:var(--surface)}
 @supports(animation-timeline:view()){
 .motion-expressive .case-entry,.motion-expressive .architect-story,.motion-expressive .offer{
 animation:chapter-appear linear both;animation-timeline:view();animation-range:entry 0% entry 25%;
 }
 }
}
@keyframes chapter-appear{from{opacity:.35;transform:translateY(25px)}to{opacity:1;transform:none}}
@media(max-width:900px){
 .chapter-intro{grid-template-columns:60px 1fr;gap:15px}
 .architect-story{grid-template-columns:60px 1fr}.story-art{display:none}
 .case-record{grid-template-columns:1fr .65fr 30px}
 .editorial-spreads,.gallery-installation,.fashion-campaign,.portrait-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:45px 20px}
 .case-spread,.case-spread:nth-child(even),.case-installation,.case-installation:nth-child(even),.case-portrait,.case-runway,.case-runway:nth-child(even){grid-column:auto;transform:none;margin:0}
 .case-scene,.case-scene:nth-child(even),.case-noir,.case-noir:nth-child(even){grid-template-columns:1fr}
 .case-scene:nth-child(even) .scene-frame,.case-noir:nth-child(even) .case-image{grid-column:1;grid-row:1}
 .case-scene:nth-child(even) .case-body,.case-noir:nth-child(even) .case-body{grid-column:1;grid-row:2}
 .poster-wall,.space-mission,.playful-scrapbook,.botanical-journal{grid-template-columns:repeat(2,minmax(0,1fr))}
 .photographic-contact{grid-template-columns:repeat(3,minmax(0,1fr))}
 .case-job{grid-template-columns:85px 1fr}.case-job .case-image{grid-column:2}
 .case-mission:nth-child(even),.case-note:nth-child(even),.case-journal:nth-child(even){transform:none}
}
@media(max-width:600px){
 .architect-masthead{flex-wrap:wrap;font-size:9px}.architect-masthead .masthead-persona{display:none}
 .chapter{padding:80px 0}.chapter-intro{display:block;margin-bottom:30px}.chapter-intro .chapter-num{margin-right:13px}.chapter-intro .chapter-kicker{display:inline-block}
 .chapter-intro h2{font-size:clamp(42px,11vw,86px);margin:15px 0}
 .architect-story{display:block}.story-opening{font-size:110px;display:block}.architect-story>p{font-size:clamp(24px,8vw,50px)}.story-signature{display:block}
 .architect-history,.architect-contact{grid-template-columns:1fr}.architect-contact-links{grid-column:1}
 .architect-testimonials{grid-template-columns:1fr}
 .offer{grid-template-columns:40px 1fr 20px;padding:30px 0;gap:10px}.offer-symbol{font-size:22px}
 .art-directed-work,.editorial-spreads,.gallery-installation,.portrait-gallery,.fashion-campaign,.research-index,.poster-wall,.playful-scrapbook,.space-mission,.photographic-contact,.museum-exhibition,.experimental-flyers,.botanical-journal{grid-template-columns:1fr;gap:40px}
 .case-entry,.case-spread,.case-spread:nth-child(even),.case-installation,.case-installation:nth-child(even),.case-portrait,.case-artifact,.case-artifact:nth-child(even),.case-note,.case-note:nth-child(even),.case-poster,.case-poster:nth-child(even),.case-journal,.case-journal:nth-child(even),.case-flyer,.case-flyer:nth-child(even){grid-column:auto;transform:none;margin:0}
 .case-image,.case-entry .case-image{height:310px}
 .case-record{display:block}.case-record .case-image{height:240px;margin:15px 0}.record-arrow{display:none}
 .case-spread .case-image{height:380px}.case-installation .case-image{height:450px}
 .case-program{grid-template-columns:55px 1fr;gap:15px}.program-divider{display:none}.program-number{font-size:50px}
 .case-screenplay{padding:30px 20px}
 .case-contact-frame .case-image{height:330px}
 .case-portrait .case-image{height:380px}
 .case-runway .case-image{height:420px}.runway-overlay{margin:0;width:100%}
 .case-noir{min-height:0}.case-noir .case-image{height:420px}
 .case-job{grid-template-columns:1fr}.case-job .case-image{grid-column:1}.job-index{font-size:65px}
 .case-report{grid-template-columns:75px 1fr;gap:15px}.report-arrow{display:none}
 .architect-endmark span:nth-child(2){font-size:70px}
}
@media(prefers-reduced-motion:reduce){.case-entry,.chapter-intro h2,.architect-story,.offer{animation:none!important}}
.motion-none .case-entry,.motion-none .chapter-intro h2,.motion-none .architect-story,.motion-none .offer{animation:none!important}
`;

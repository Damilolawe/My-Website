import {esc,paths,digits,artMedia,contactAction,documentForFlagship} from "./zip-flagship-utils.mjs";

const VELOCITY_CSS=`
body.site.fg-velocity{margin:0;background:#11120f;color:#f5f2eb;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden;--fv-ink:#151612;--fv-paper:#e9e6de;--fv-muted:#a8a69d;--fv-brass:#b79b66;--fv-line:#ffffff30}
body.site.fg-velocity *{box-sizing:border-box}
.fv-header{position:absolute;inset:0 0 auto;z-index:40;min-height:86px;padding:25px clamp(22px,4vw,68px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:linear-gradient(#070807c9,transparent);color:#f8f6ef}
/* The source-guide selector restricts every Bugatti header to 1400px.
   Velocity alone needs a full-bleed gradient, without moving its centered nav. */
body.site.fg-velocity header.fv-header{max-width:none;margin:0;width:100%}
@media(min-width:901px){body.site.fg-velocity header.fv-header{padding-inline:max(clamp(22px,4vw,68px),calc(50vw - 700px + clamp(22px,4vw,68px)))}}
body.site.fg-velocity:has(.fg-banner) .fv-header{top:32px}
.fv-brand{font-size:12px;letter-spacing:.32em;text-decoration:none;text-transform:uppercase;white-space:nowrap}
.fv-nav{display:flex;justify-content:center;flex-wrap:nowrap;white-space:nowrap;gap:clamp(10px,1.65vw,26px)}
.fv-nav a{font:600 10px/1.6 ui-monospace,monospace;letter-spacing:.12em;text-decoration:none;text-transform:uppercase;opacity:.85}
.fv-nav a:hover,.fv-nav a[aria-current]{opacity:1;color:#d2b982}
.fv-header-label{text-align:right;font:500 9px/1.5 ui-monospace,monospace;letter-spacing:.17em;color:#d2d0c8}
.fv-mobile-menu{display:none}
.fv-mobile-menu summary{display:flex;align-items:center;justify-content:center;gap:12px;min-width:98px;min-height:44px;padding:10px 12px;border:1px solid #b79b6680;background:#121611;color:#f3eee4;cursor:pointer;list-style:none;font:600 11px/1.4 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}
.fv-mobile-menu summary::-webkit-details-marker{display:none}
.fv-mobile-menu summary::marker{content:""}
.fv-menu-word--open{display:none}
.fv-mobile-menu[open] .fv-menu-word--open{display:inline}
.fv-mobile-menu[open] .fv-menu-word--closed{display:none}
.fv-menu-icon{display:block;position:relative;width:18px;height:15px;flex:0 0 18px}
.fv-menu-icon:before,.fv-menu-icon:after{content:"";position:absolute;left:0;width:18px;height:1px;background:currentColor;transition:transform .2s}
.fv-menu-icon:before{top:4px}
.fv-menu-icon:after{top:11px}
.fv-mobile-menu[open] .fv-menu-icon:before{transform:translateY(3.5px) rotate(45deg)}
.fv-mobile-menu[open] .fv-menu-icon:after{transform:translateY(-3.5px) rotate(-45deg)}
.fv-menu-panel{position:absolute;top:100%;left:clamp(18px,4vw,30px);right:clamp(18px,4vw,30px);display:grid;gap:0;padding:12px 14px;background:#121712;color:#f6f1e5;border:1px solid #b79b6680;box-shadow:0 25px 50px #000a;max-height:calc(100svh - 100px);overflow-y:auto;z-index:45}
.fv-menu-panel a{display:flex;align-items:center;min-height:48px;padding:12px 14px;border-bottom:1px solid #ffffff21;text-decoration:none;text-transform:uppercase;font:600 12px/1.5 ui-monospace,monospace;letter-spacing:.13em}
.fv-menu-panel a:last-child{border:0}
.fv-menu-panel a:hover,.fv-menu-panel a[aria-current="page"]{background:#ffffff0b;color:#e1c68e}
.fv-mobile-menu summary:focus-visible,.fv-menu-panel a:focus-visible{outline:2px solid #e1c68e;outline-offset:3px}
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

/* Velocity v2: page-specific composition, not shared card grids. */
.fv-header--solid{background:#131511!important;color:#f7f5ed;min-height:88px;box-shadow:0 10px 22px #10151026}
.fv-header--solid .fv-brand,.fv-header--solid .fv-nav a{color:#f4f0e6}
.fv-header--solid .fv-nav a{opacity:.92}
.fv-header--solid .fv-nav a[aria-current],.fv-header--solid .fv-nav a:hover{color:#e1c68e;opacity:1}
.fv-home-preview{background:#d8d1c3;color:#171914;padding:clamp(65px,8vw,130px) clamp(25px,8vw,130px);display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:clamp(35px,7vw,120px)}
.fv-preview-heading{display:flex;flex-direction:column;align-items:flex-start}
.fv-preview-heading h2{font:400 clamp(49px,7vw,110px)/.92 Georgia,serif;letter-spacing:-.075em;margin:25px 0 0}
.fv-preview-heading p{font:400 clamp(17px,1.8vw,22px)/1.65 Georgia,serif;max-width:410px;margin:25px 0;color:#3d4038}
.fv-home-feature{display:block;position:relative;min-width:0}
.fv-home-feature-visual{height:clamp(350px,49vw,650px);position:relative;overflow:hidden;background:#17201e}
.fv-home-feature-visual>img,.fv-home-feature-visual>.fv-art-tile img{height:100%;width:100%;object-fit:cover;filter:grayscale(.7) contrast(1.06)}
.fv-home-feature-label{position:absolute;right:-20px;bottom:24px;background:#111714;color:#f1eadd;min-width:55%;padding:21px 24px;box-shadow:0 18px 40px #0004}
.fv-home-feature-label span{display:block;font:600 9px/1.5 ui-monospace,monospace;letter-spacing:.16em;color:#d7c49d}
.fv-home-feature-label strong{display:block;font:400 clamp(20px,3vw,39px)/1.1 Georgia,serif;margin-top:12px}
.fv-home-engineer{display:grid;grid-template-columns:.55fr 1.45fr;gap:clamp(32px,7vw,100px);padding:clamp(85px,10vw,155px) clamp(24px,8vw,130px);background:#18201e;color:#f2eee4}
.fv-home-engineer h2{font:400 clamp(53px,8vw,125px)/.88 Arial,sans-serif;letter-spacing:-.095em;margin:0;text-transform:uppercase}
.fv-home-engineer p{font:400 clamp(17px,1.8vw,22px)/1.6 Georgia,serif;max-width:570px;color:#c1c8bb}
.fv-engineer-signature{grid-column:2;display:flex;flex-wrap:wrap;gap:30px;border-top:1px solid #ffffff4b;padding-top:25px;font:500 10px/1.5 ui-monospace,monospace;letter-spacing:.18em;color:#b6b8b0}
.fv-model-register{padding:35px clamp(24px,8vw,130px) 150px;background:#e9e6de;color:#171813}
.fv-model-register-head{display:flex;justify-content:space-between;gap:15px;padding:0 0 34px;border-bottom:1px solid #191b1757;font:600 10px/1.4 ui-monospace,monospace;letter-spacing:.15em}
.fv-model-stories{display:flex;flex-direction:column;gap:0}
.fv-model-story{min-width:0;display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(34px,6vw,100px);align-items:center;border-bottom:1px solid #1718134a;padding:clamp(65px,9vw,155px) 0}
.fv-model-story:nth-child(2){grid-template-columns:.85fr 1.15fr}
.fv-model-story:nth-child(2) .fv-model-visual{order:2}
.fv-model-story:nth-child(3){display:block;background:#1b2220;color:#f4f0e4;margin:clamp(45px,7vw,95px) 0 0;padding:clamp(24px,4vw,75px);border:0}
.fv-model-story:nth-child(3) .fv-model-visual{height:min(59vw,780px)}
.fv-model-story:nth-child(3) .fv-model-content{display:grid;grid-template-columns:1fr 1fr;gap:12px 60px;padding-top:35px}
.fv-model-story:nth-child(3) .fv-model-content>.fv-eyebrow{grid-column:1/-1}
.fv-model-story:nth-child(3) .fv-model-content h2{grid-column:1}
.fv-model-story:nth-child(3) .fv-model-content p{grid-column:2}
.fv-model-story:nth-child(3) .fv-model-aside{grid-column:1/-1;color:#bdbaae;border-color:#ffffff4a}
.fv-model-visual{position:relative;height:clamp(400px,49vw,730px);overflow:hidden;background:#232a27}
.fv-model-visual>img,.fv-model-visual>.fv-art-tile img{width:100%;height:100%;object-fit:cover;filter:grayscale(.65) contrast(1.1)}
.fv-model-story:nth-child(2) .fv-model-visual{height:clamp(430px,54vw,850px)}
.fv-model-visual-id{position:absolute;left:24px;bottom:24px;font:600 10px ui-monospace,monospace;letter-spacing:.2em;color:#fff;background:#161b1bba;padding:12px}
.fv-model-content h2{font:400 clamp(43px,6vw,93px)/.91 Arial,sans-serif;letter-spacing:-.085em;text-transform:uppercase;margin:30px 0 25px}
.fv-model-content p{font:400 clamp(17px,1.9vw,23px)/1.65 Georgia,serif;max-width:530px}
.fv-model-aside{display:flex;justify-content:space-between;gap:14px;padding-top:22px;margin-top:60px;border-top:1px solid #17181356;font:500 9px/1.6 ui-monospace,monospace;letter-spacing:.11em;color:#54554c}
.fv-cutaway{background:#111b19}
.fv-cutaway:before{display:none}
.fv-chassis-map{display:block;width:100%;height:100%;min-height:360px}
.fv-demo-enquiry{border:1px solid #bca980;max-width:425px}
.fv-demo-enquiry summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:18px;min-height:65px;padding:18px 22px;cursor:pointer;font:600 11px/1.6 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}
.fv-demo-enquiry summary::-webkit-details-marker{display:none}
.fv-demo-enquiry summary:after{content:"+";font:400 25px Arial,sans-serif;color:#c9b48f}
.fv-demo-enquiry[open] summary:after{content:"−"}
.fv-demo-enquiry summary:focus-visible{outline:3px solid #e4c995;outline-offset:3px}
.fv-demo-interior{padding:0 22px 22px;border-top:1px solid #ffffff38}
.fv-demo-interior p{font:400 14px/1.6 Georgia,serif;margin:20px 0}
.fv-demo-interior label{display:block;font:600 10px ui-monospace,monospace;text-transform:uppercase;letter-spacing:.1em;margin-bottom:9px}
.fv-demo-interior select:focus-visible{outline:3px solid #e4c995;outline-offset:3px}
.fv-demo-interior select{width:100%;padding:14px 12px;background:#f1e9d8;color:#18201c;border:0;font:500 15px Arial,sans-serif}
.fv-demo-note{display:block;font:600 9px/1.7 ui-monospace,monospace;letter-spacing:.08em;color:#c5ad7f;margin-top:18px}

@media(max-width:900px){.fv-header{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:14px;min-height:78px;padding:16px clamp(18px,4vw,30px)}.fv-header-label,.fv-nav{display:none}.fv-brand{min-width:0;white-space:normal;overflow-wrap:anywhere}.fv-mobile-menu{display:block;grid-column:2;justify-self:end}.fv-feature-heading{grid-template-columns:1fr}.fv-feature-heading h1,.fv-feature-heading h2,.fv-feature-heading p{grid-column:1}.fv-technical{grid-template-columns:1fr}.fv-spec-panel{border-left:0;border-top:1px solid #17181350}.fv-contact-page{grid-template-columns:1fr}.fv-contact-details{grid-column:1}.fv-studio-opening{grid-template-columns:.35fr 1.65fr}}
@media(max-width:650px){.fv-header{position:absolute;display:flex;align-items:flex-start;flex-direction:column;gap:15px;padding:17px 20px}.fv-brand{font-size:10px}.fv-nav{justify-content:flex-start;gap:10px 16px}.fv-nav a{font-size:8px}.fv-hero{height:92svh;min-height:650px}.fv-hero-copy{left:24px;right:24px;bottom:105px}.fv-hero h1{font-size:clamp(58px,14vw,90px);line-height:.88}.fv-hero-copy>p{font-size:15px;margin-top:19px}.fv-hero-aside{display:none}.fv-hero-index{bottom:30px;right:24px}.fv-reveal{grid-template-columns:1fr;gap:22px;padding:82px 24px 90px}.fv-reveal h2{font-size:clamp(43px,12vw,67px)}.fv-reveal p{font-size:16px}.fv-reveal-rule{margin-top:35px}.fv-home-specs{gap:12px}.fv-home-spec{font-size:8px}.fv-home-spec strong{font-size:14px}.fv-work-intro{min-height:520px;padding:175px 24px 60px;grid-template-columns:1fr;gap:24px}.fv-work-intro h1{font-size:clamp(59px,14vw,89px)}.fv-work-intro p{max-width:330px}.fv-collection{padding:0 24px 90px}.fv-cases{display:block}.fv-case,.fv-case:nth-child(2),.fv-case:nth-child(3){display:block;margin:0 0 55px}.fv-case-stage,.fv-case:nth-child(2) .fv-case-stage{height:clamp(280px,82vw,430px)}.fv-features{padding:150px 24px 90px}.fv-feature-heading{margin-bottom:43px}.fv-feature-heading h1,.fv-feature-heading h2{font-size:clamp(55px,13vw,83px)}.fv-cutaway{min-height:330px}.fv-spec-panel{padding:22px 0}.fv-spec summary{font-size:22px}.fv-metric-strip{gap:10px}.fv-metric{font-size:8px}.fv-metric strong{font-size:22px}.fv-studio-opening{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;min-height:650px;padding:170px 24px 62px;gap:18px}.fv-studio-opening h1{font-size:clamp(59px,14vw,92px);margin:0}.fv-studio-opening p{font-size:16px;margin:0}.fv-studio-photo{margin:0 24px;height:100vw;min-height:300px}.fv-studio-note{padding:75px 24px 88px;grid-template-columns:1fr;gap:22px}.fv-studio-note h2{font-size:43px}.fv-process{padding:55px 24px 85px}.fv-process-list{grid-template-columns:1fr}.fv-process-step,.fv-process-step+.fv-process-step{padding:22px 0;border-right:0;border-bottom:1px solid #17181344}.fv-process-step h3{margin:15px 0 8px}.fv-contact-page{padding:160px 24px 70px;gap:48px}.fv-contact-copy h1{font-size:clamp(60px,14vw,92px)}.fv-contact-copy p{font-size:16px}.fv-contact-details{display:grid;grid-template-columns:1fr;gap:9px}.fv-footer{padding:20px 24px}}

@media(max-width:900px){.fv-home-preview{grid-template-columns:1fr}.fv-home-feature-visual{height:clamp(350px,70vw,600px)}.fv-home-engineer{grid-template-columns:1fr}.fv-engineer-signature{grid-column:1}.fv-model-story,.fv-model-story:nth-child(2){grid-template-columns:1fr}.fv-model-story:nth-child(2) .fv-model-visual{order:0}.fv-model-story:nth-child(3){margin:30px 0}.fv-model-story:nth-child(3) .fv-model-content{grid-template-columns:1fr}.fv-model-story:nth-child(3) .fv-model-content h2,.fv-model-story:nth-child(3) .fv-model-content p{grid-column:1}}
@media(max-width:650px){
.fv-header,.fv-header--solid{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;background:#121712!important;color:#f4eee4;min-height:78px;gap:12px;padding:16px 20px}
.fv-brand{font-size:clamp(10px,3vw,12px);letter-spacing:.22em}
.fv-nav{display:none}
.fv-mobile-menu{display:block}
.fv-home-preview{padding:75px 24px;gap:28px}
.fv-preview-heading h2{font-size:clamp(48px,12vw,67px)}
.fv-home-feature-visual{height:370px}
.fv-home-feature-label{right:0;bottom:0;min-width:62%}
.fv-home-engineer{padding:85px 24px}
.fv-home-engineer h2{font-size:clamp(51px,12vw,75px)}
.fv-model-register{padding:25px 24px 95px}
.fv-model-register-head{font-size:8px}
.fv-model-story{padding:70px 0;gap:24px}
.fv-model-visual,.fv-model-story:nth-child(2) .fv-model-visual,.fv-model-story:nth-child(3) .fv-model-visual{height:clamp(300px,90vw,480px)}
.fv-model-story:nth-child(3){padding:19px}
.fv-model-content h2{font-size:clamp(43px,11vw,65px);margin:14px 0}
.fv-model-aside{margin-top:26px}
.fv-chassis-map{min-height:310px}
.fv-studio-opening{min-height:0!important;padding:160px 24px 55px!important;justify-content:flex-start!important}
.fv-studio-opening h1{font-size:clamp(57px,13.6vw,85px)}
.fv-studio-opening .fv-eyebrow{margin-bottom:7px}
.fv-work-intro{padding-top:180px;min-height:0}
.fv-features{padding-top:180px}
}

@media(prefers-reduced-motion:reduce){.fv-case-stage>img,.fv-case-stage>.fv-art-tile img{transition:none}}
`;


const CHASSIS_DIAGRAM='<svg class="fv-chassis-map" viewBox="0 0 840 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Original automotive engineering schematic with aerodynamic body, structural rail and suspension detail"><defs><pattern id="fv-engineer-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#96b3a7" stroke-opacity=".12"/></pattern><linearGradient id="fv-engineer-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a8b2a5"/><stop offset=".5" stop-color="#3b4641"/><stop offset="1" stop-color="#111a18"/></linearGradient></defs><rect width="840" height="540" fill="#111b19"/><rect width="840" height="540" fill="url(#fv-engineer-grid)"/><g stroke="#a0c5b4" stroke-opacity=".3" fill="none"><path d="M48 77H790M48 475H790M70 51V495M778 51V495"/><circle cx="420" cy="275" r="215" stroke-dasharray="3 10"/></g><g transform="translate(82 114)"><path d="M30 184L99 138L215 117L281 63L450 49L548 91L623 131L680 180L660 217H31Z" fill="url(#fv-engineer-metal)" stroke="#e3ddc8" stroke-width="3"/><path d="M102 166L215 141L288 82H448L555 145L627 173M228 144H542" stroke="#9ad5b6" stroke-width="3" fill="none"/><path d="M182 189L240 136H531L596 189" stroke="#d4b889" stroke-width="4" fill="none"/><rect x="284" y="146" width="215" height="50" rx="5" fill="#8f7c57" stroke="#e7d5a9"/><path d="M315 147V195M347 147V195M379 147V195M411 147V195M443 147V195M475 147V195" stroke="#252e29" stroke-width="3"/><circle cx="180" cy="210" r="65" fill="#101918" stroke="#9fbaaa" stroke-width="9"/><circle cx="180" cy="210" r="32" fill="none" stroke="#dbc296" stroke-width="6"/><circle cx="554" cy="210" r="65" fill="#101918" stroke="#9fbaaa" stroke-width="9"/><circle cx="554" cy="210" r="32" fill="none" stroke="#dbc296" stroke-width="6"/><path d="M151 189L208 249L238 187M529 187L559 249L602 189" fill="none" stroke="#88c6ac" stroke-width="4"/></g><g stroke="#cdb489" stroke-width="2" fill="none"><path d="M434 195L554 72H733"/><path d="M395 310L328 423H88"/><path d="M635 312L705 426H798"/><circle cx="434" cy="195" r="5" fill="#cdb489"/><circle cx="395" cy="310" r="5" fill="#cdb489"/><circle cx="635" cy="312" r="5" fill="#cdb489"/></g><g fill="#f0e6d4" font-family="monospace" font-size="15"><text x="560" y="66">01 / AERO FORM</text><text x="88" y="446">02 / CHASSIS</text><text x="646" y="450">03 / SUSPENSION</text></g><g fill="#91a79b" font-family="monospace" font-size="12"><text x="42" y="42">FORM / FORCE / MOTION</text><text x="585" y="516">SCHEMATIC / NOT TO SCALE</text></g></svg>';

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
 const mobileMenu='<details class="fv-mobile-menu"><summary><span class="fv-menu-word fv-menu-word--closed">Menu</span><span class="fv-menu-word fv-menu-word--open">Close</span><span class="fv-menu-icon" aria-hidden="true"></span></summary><nav class="fv-menu-panel" aria-label="Mobile navigation">'+nav+'</nav></details>';
 const header='<header class="fv-header '+(page==="home"?"fv-header--hero":"fv-header--solid")+'"><a class="fv-brand" href="'+link("home")+'">'+name+'</a><nav class="fv-nav" aria-label="Desktop navigation">'+nav+'</nav>'+mobileMenu+'<span class="fv-header-label">MOTOR CAR / ATELIER 001</span></header>';
 const collection=v.content.cards||[];
 const featured=collection[0]||{title:"The Model Register",description:"A study of form and motion."};
 const stories=collection.slice(0,3).map((card,i)=>'<article class="fv-model-story fv-model-story-'+(i+1)+'"><div class="fv-model-visual">'+visual(v,options,i,card.title,sourceScene)+'<span class="fv-model-visual-id">STUDY / '+digits(i+1)+'</span></div><div class="fv-model-content"><span class="fv-eyebrow">PROJECT '+digits(i+1)+' / DESIGN EXPLORATION</span><h2>'+esc(card.title)+'</h2><p>'+esc(card.description)+'</p><div class="fv-model-aside"><span>ATELIER / '+digits(i+1)+'</span><span>'+["PROPORTION / PRESENCE","MATERIAL / MOTION","CHARACTER / DETAIL"][i]+'</span></div></div></article>').join("");
 const homeTeaser='<section class="fv-home-preview" id="work"><div class="fv-preview-heading"><span class="fv-eyebrow">THE REGISTER / A FIRST LOOK</span><h2>One road.<br>New perspectives.</h2><p>A preview of three independent design explorations. Go deeper into the model stories.</p><a class="fv-button" href="'+link("work")+'">Explore the collection</a></div><div class="fv-cases fv-home-feature"><div class="fv-home-feature-visual">'+visual(v,options,1,featured.title,sourceScene)+'</div><div class="fv-home-feature-label"><span>PROJECT 01 / SELECTED STUDY</span><strong>'+esc(featured.title)+'</strong></div></div></section>';
 const homeHero='<section class="fv-hero" data-architecture="'+esc(t.source)+'" aria-labelledby="hero-title"><div class="fv-hero-photo">'+visual(v,options,0,name+" automotive editorial",sourceScene)+'</div><span class="fv-hero-aside">FORM / FORCE / FLIGHT — '+digits(2026)+'</span><div class="fv-hero-copy"><span class="fv-eyebrow">'+esc(v.content.heroLabel)+'</span><h1 id="hero-title">'+headline+'</h1><p>'+bio+'</p><div class="fv-hero-actions"><a class="fv-button" href="'+link("work")+'">Discover the models</a><span class="fv-eyebrow">A STUDY IN MOTION / 001</span></div></div><span class="fv-hero-index">SCROLL TO ENTER / 01</span></section>';
 const homeReveal='<section class="fv-reveal" id="studio"><div class="fv-reveal-index">01 — A POINT OF VIEW<br>DESIGN / ENGINEERING / SOUL</div><div><h2>Speed, given a sense of place.</h2><p>'+bio+'</p><div class="fv-reveal-rule"></div><div class="fv-home-specs"><span class="fv-home-spec">First principle<strong>Purposeful form</strong></span><span class="fv-home-spec">Character<strong>Quiet confidence</strong></span><span class="fv-home-spec">Approach<strong>Driver first</strong></span></div></div></section>';
 const workPage='<section class="fv-work-intro" aria-labelledby="hero-title"><div><span class="fv-eyebrow">MODEL CHAPTERS / 01—03</span><h1 id="hero-title">Form follows<br>feeling.</h1></div><p>Each machine starts from a different question, explored through proportion, materials and the experience of driving.</p></section><section class="fv-model-register" id="work"><div class="fv-model-register-head"><span>THE COLLECTION / IN-DEPTH STUDIES</span><span>THREE DISTINCT DIRECTIONS</span></div><div class="fv-cases fv-model-stories">'+stories+'</div></section>';
 const specItems=(v.content.cards||[]).slice(0,3).map((card,index)=>'<details class="fv-spec" '+(index===0?'open':'')+'><summary><span>'+digits(index+1)+' / '+esc(card.title)+'</span></summary><p>'+esc(card.description)+' The system is considered as part of one balanced whole, tuned to make the driver feel connected to every input.</p></details>').join("");
 const engineeringVisual='<div class="fv-cutaway"><span class="fv-cutaway-tag">ENGINEERING ANATOMY / 001</span>'+CHASSIS_DIAGRAM+'<span class="fv-cutaway-note">ORIGINAL TECHNICAL SCHEMATIC</span></div>';
 const featuresPage='<section class="fv-features fv-engineering" id="features"><div class="fv-feature-heading"><span class="fv-eyebrow">ENGINEERING / FIELD NOTES 001</span><h1 id="hero-title">The science<br>of sensation.</h1><p>Explore the thinking behind a responsive, composed machine. Details open to reveal the intent behind each engineering study.</p></div><div class="fv-technical">'+engineeringVisual+'<div class="fv-spec-panel fv-specs study-approach study-approach-list"><span class="fv-spec-caption">INTERACTIVE SYSTEMS / SELECT TO EXPAND</span>'+specItems+'</div></div><div class="fv-metric-strip"><span class="fv-metric">Design priority<strong>Balance</strong></span><span class="fv-metric">Road character<strong>Composed</strong></span><span class="fv-metric">Driver connection<strong>Direct</strong></span></div></section>';
 const studioPage='<section class="fv-studio" id="studio"><div class="fv-studio-opening"><span class="fv-eyebrow">AN ATELIER FOR THE AUTOMOBILE</span><h1 id="hero-title">Made to<br>move you.</h1><p>'+bio+'</p></div><figure class="fv-studio-photo">'+visual(v,options,1,"Automotive design atelier",sourceScene)+'<figcaption>FORM REFINED BY HAND / STUDIO NOTES 001</figcaption></figure><div class="fv-studio-note fv-manifesto"><span class="fv-eyebrow">DESIGN PHILOSOPHY / 01</span><div><h2>Less noise.<br>More feeling.</h2><p>We begin with proportion, touch and the view from the driver’s seat. Surfaces are reduced until every crease earns its place; materials are chosen to reward the senses over time. The result is a clear expression of purpose, finished with patience and care.</p></div></div><section class="fv-process"><h2>The atelier sequence</h2><div class="fv-process-list"><article class="fv-process-step"><span>01 / OBSERVE</span><h3>Listen to the road</h3><p>Understand the way a machine should respond before drawing its outline.</p></article><article class="fv-process-step"><span>02 / SCULPT</span><h3>Find the gesture</h3><p>Work through volume, light and material until form feels inevitable.</p></article><article class="fv-process-step"><span>03 / REFINE</span><h3>Attend to detail</h3><p>Bring finish and function together in a coherent, enduring whole.</p></article></div></section></section>';
 const demoEnquiry=options.sample?'<details class="fv-demo-enquiry"><summary>Explore the sample enquiry</summary><div class="fv-demo-interior"><p>This interactive demonstration does not collect or submit information.</p><label for="fv-interest">Your interest</label><select id="fv-interest"><option>Private consultation</option><option>Design commission</option><option>Collection enquiry</option></select><span class="fv-demo-note">CONFIGURE CONTACT DETAILS TO ACTIVATE REAL ENQUIRIES</span></div></details>':contactAction(v);
 const contactPage='<section class="fv-contact-page" id="contact"><div class="fv-contact-copy"><span class="fv-eyebrow">PRIVATE CLIENT SERVICES / '+name+'</span><h1 id="hero-title">The road<br>starts here.</h1><p>'+bio+'</p></div><aside class="fv-concierge"><span class="fv-concierge-label">A PERSONAL INTRODUCTION</span><h2>Speak with the atelier.</h2><p>Share the direction you are imagining, from a private collection to an individual commission.</p><div class="fv-contact-action">'+demoEnquiry+'</div></aside><div class="fv-contact-details"><span>PRIVATE ENQUIRIES / BY APPOINTMENT</span><span>COLLECTION / COMMISSION / ATELIER</span><span>RESPONSE / PERSONAL & DISCREET</span></div></section>';
 const homeSpecs=specItems;
 const homeFeatures='<section class="fv-home-engineer" id="features"><span class="fv-eyebrow">ENGINEERING / A FIRST LOOK</span><div><h2>Feeling is<br>the measure.</h2><p>Architecture, materials and composure become one experience. See the philosophy beneath the design.</p><a class="fv-button" href="'+link("features")+'">Explore the engineering study</a></div><div class="fv-engineer-signature"><span>01 / BALANCE</span><span>02 / FEEDBACK</span><span>03 / COMPOSURE</span></div></section>';
 const homeContact='<section class="fv-reveal" id="contact"><div class="fv-reveal-index">PRIVATE CLIENT SERVICES</div><div><span class="fv-eyebrow">BEGIN A CONVERSATION</span><h2>Consider the next road.</h2><p>'+bio+'</p><a class="fv-button" href="'+link("contact")+'">Meet the concierge</a></div></section>';
 const body=header+'<main id="main">'+(page==="home"?homeHero+homeReveal+homeTeaser+homeFeatures+homeContact:
  page==="work"?workPage:
  page==="features"?featuresPage:
  page==="studio"?studioPage:contactPage)+'</main><footer class="fv-footer"><span>'+name+' / AUTOMOTIVE DESIGN STUDY</span><span>FICTIONAL TEMPLATE CONCEPT — AWE CONCEPTS</span><a href="'+link("home")+'">RETURN TO ATELIER</a></footer>';
 return documentForFlagship(t,v,options,page,profile,{title:name,css:VELOCITY_CSS,body,sourceCSS,sourceArtCSS,metaDescription:v.content.bio});
}

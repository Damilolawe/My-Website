export default {
  id: "md-dji",
  root: "alt",
  fonts: "family=Unbounded:wght@700;800&family=Manrope:wght@400;600;800",
  labels: {work:"Flights",services:"Services",about:"Crew",contact:"Book"},
  intros: {work:{title:"Recent flights",text:"A few of the places we have taken a camera lately."},features:{title:"What we fly",text:"Every job is planned, permitted and flown by licensed pilots."},studio:{title:"Who flies",text:null},contact:{title:"Plan a shoot",text:"Tell us the place, the date and what you want people to feel."}},
  demo: {
    name: "Skyline Aerial", headline: "See the whole picture.", heroLabel: "Aerial film and photography",
    bio: "We fly cameras where people can't stand: over coastlines at dawn, through construction sites, above a festival crowd. You get footage that shows the scale of what you built.",
    cards: [
      { title: "Coastline at first light", description: "A forty-second opener shot over three mornings to catch the fog lifting off the bay." },
      { title: "Tower in progress", description: "Monthly flyovers of a twenty-storey build, stitched into one time-lapse for the investors." },
      { title: "Harvest weekend", description: "Crowd, stage and fields from four hundred feet, cut for the festival's social channels." },
    ],
    services: [
      { title: "Brand films", description: "Concept, permits, flight and edit, delivered in 4K." },
      { title: "Construction progress", description: "Scheduled flights from the same positions, every month." },
      { title: "Events", description: "Live crowd coverage with a licensed second pilot." },
    ],
  },
  css: `
.alt{--sky:#0070d5;--deep:#03122a;--mist:#e7f0fb;--sun:#ffb15c;--ink:#03122a;background:var(--deep);color:var(--mist);font:400 17px/1.65 Manrope,system-ui,sans-serif}
.alt header{position:absolute;inset:auto 0 auto 0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px clamp(18px,4vw,56px)}
.alt .brand{font:700 18px Unbounded,sans-serif;letter-spacing:-.02em;text-decoration:none}
.alt nav{display:flex;gap:clamp(14px,2.4vw,32px);font-weight:600;font-size:15px}.alt nav a{text-decoration:none;opacity:.8}.alt nav a:hover{opacity:1}
.alt-hero{position:relative;min-height:100svh;display:grid;align-items:end;overflow:hidden;padding:120px clamp(18px,4vw,56px) clamp(40px,7vw,90px);isolation:isolate}
.alt-topo{position:absolute;inset:-30%;z-index:-2;background:repeating-radial-gradient(circle at 62% 42%,transparent 0 22px,rgba(120,180,255,.22) 23px 24px),repeating-radial-gradient(circle at 20% 80%,transparent 0 30px,rgba(255,177,92,.14) 31px 32px);animation:topo 28s ease-in-out infinite alternate}
@keyframes topo{to{transform:scale(1.18) rotate(4deg) translate(-2%,3%)}}
.alt-glow{position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 50% at 70% 30%,rgba(0,112,213,.55),transparent 70%),radial-gradient(40% 30% at 15% 90%,rgba(255,177,92,.28),transparent 70%)}
.alt-ruler{position:absolute;right:clamp(14px,3vw,40px);top:90px;bottom:40px;width:44px;background:repeating-linear-gradient(to bottom,rgba(231,240,251,.55) 0 1px,transparent 1px 12px),repeating-linear-gradient(to bottom,rgba(231,240,251,.9) 0 2px,transparent 2px 60px);background-size:12px 100%,28px 100%;background-repeat:repeat-y;background-position:right top;-webkit-mask:linear-gradient(transparent,#000 15%,#000 85%,transparent);mask:linear-gradient(transparent,#000 15%,#000 85%,transparent);animation:climb 3s linear infinite}
@keyframes climb{to{background-position:right 60px,right 60px}}
.alt-readout{position:absolute;right:clamp(66px,8vw,110px);top:50%;font:600 14px/1.2 Manrope;color:var(--sun);font-variant-numeric:tabular-nums}
.alt h1{font:800 clamp(52px,11.5vw,190px)/.86 Unbounded,sans-serif;letter-spacing:-.055em;max-width:12ch;color:var(--mist)}
.alt h1 .ch{animation:rise .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 35ms + .2s)}
@keyframes rise{from{opacity:0;transform:translateY(.4em)}}
.alt-sub{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end;margin-top:clamp(28px,4vw,50px);max-width:1100px}
.alt-sub p{max-width:46ch;color:rgba(231,240,251,.82)}
.alt .cta{display:inline-flex;padding:16px 26px;border-radius:999px;background:var(--sun);color:var(--deep);font-weight:800;text-decoration:none;white-space:nowrap;transition:transform .25s}.alt .cta:hover{transform:translateY(-3px)}.alt .cta-muted{background:transparent;color:var(--mist);border:1px solid rgba(231,240,251,.4);font-weight:600;white-space:normal}
.alt-horizon{position:absolute;left:0;right:0;bottom:34%;height:1px;background:linear-gradient(90deg,transparent,var(--sun),transparent);transform-origin:center;animation:tilt 9s ease-in-out infinite alternate;z-index:-1}
@keyframes tilt{from{transform:rotate(-3deg)}to{transform:rotate(2deg)}}
.alt-work{background:var(--mist);color:var(--ink);padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.alt-work h2,.alt-svc h2,.alt-end h2{font:800 clamp(36px,6vw,92px)/.95 Unbounded,sans-serif;letter-spacing:-.05em;max-width:14ch}
.alt-frames{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(16px,2.4vw,32px);margin-top:clamp(40px,6vw,80px)}
.alt-frame{position:relative;margin:0}.alt-frame:first-child{grid-row:span 2}
.alt-shot{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:6px;background:linear-gradient(#5aa7f0 0 38%,#ffd29a 38% 40%,#2f6f9e 40%)}
.alt-frame:first-child .alt-shot{aspect-ratio:auto;height:100%;min-height:420px}
.alt-shot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.alt-shot:before,.alt-shot:after{content:"";position:absolute;inset:0}
.alt-shot:before{background:linear-gradient(160deg,transparent 52%,#1b4b73 52% 60%,transparent 60%),linear-gradient(200deg,transparent 58%,#0e2f4d 58%);}
.alt-shot:after{inset:14px;border:2px solid #fff;-webkit-mask:linear-gradient(#000 0 0) top left/26px 26px no-repeat,linear-gradient(#000 0 0) top right/26px 26px no-repeat,linear-gradient(#000 0 0) bottom left/26px 26px no-repeat,linear-gradient(#000 0 0) bottom right/26px 26px no-repeat;mask:linear-gradient(#000 0 0) top left/26px 26px no-repeat,linear-gradient(#000 0 0) top right/26px 26px no-repeat,linear-gradient(#000 0 0) bottom left/26px 26px no-repeat,linear-gradient(#000 0 0) bottom right/26px 26px no-repeat}
.alt-frame:nth-child(2) .alt-shot{background:linear-gradient(#c9dff5 0 30%,#8fa9c2 30% 100%)}.alt-frame:nth-child(2) .alt-shot:before{background:repeating-linear-gradient(90deg,transparent 0 30px,rgba(3,18,42,.5) 30px 34px) 30% 20%/40% 70% no-repeat,linear-gradient(transparent 70%,#3d5368 70%)}
.alt-frame:nth-child(3) .alt-shot{background:linear-gradient(#ff9d5c 0 34%,#7aa34a 34%)}.alt-frame:nth-child(3) .alt-shot:before{background:radial-gradient(circle at 50% 55%,#03122a 0 3px,transparent 4px) 0 0/16px 14px,linear-gradient(transparent 52%,rgba(122,163,74,0) 52%)}
.alt-frame figcaption{margin-top:14px}.alt-frame h3{font:700 clamp(19px,1.8vw,24px)/1.2 Unbounded,sans-serif;letter-spacing:-.03em}.alt-frame p{margin-top:6px;color:#3b4d66;max-width:44ch}
@supports (animation-timeline:view()){.alt-frame{animation:frame linear both;animation-timeline:view();animation-range:entry 0% cover 40%}@keyframes frame{from{opacity:.2;transform:scale(.92)}}}
.alt-svc{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}
.alt-svc ul{list-style:none;margin:0;padding:0}.alt-svc li{display:grid;grid-template-columns:1fr 1.3fr;gap:20px;padding:26px 0;border-top:1px solid rgba(231,240,251,.2)}.alt-svc li:last-child{border-bottom:1px solid rgba(231,240,251,.2)}
.alt-svc h3{font:700 22px/1.2 Unbounded,sans-serif;letter-spacing:-.03em}.alt-svc p{color:rgba(231,240,251,.75)}
.alt-end{padding:clamp(80px,12vw,180px) clamp(18px,4vw,56px);background:var(--sky);color:#fff;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:30px}
.alt footer{display:flex;justify-content:space-between;gap:20px;padding:24px clamp(18px,4vw,56px);font-size:14px;color:rgba(231,240,251,.6)}
@media(max-width:820px){.alt nav{gap:14px;font-size:13px}.alt-ruler,.alt-readout{display:none}.alt-sub,.alt-svc,.alt-svc li{grid-template-columns:1fr}.alt-frames{grid-template-columns:1fr}.alt-frame:first-child{grid-row:auto}.alt-frame:first-child .alt-shot{min-height:300px}}
.alt-intro{position:relative;overflow:hidden;padding:150px clamp(18px,4vw,56px) clamp(60px,8vw,110px);isolation:isolate}.alt-intro .alt-topo{animation-duration:40s}.alt-intro h1{font:800 clamp(46px,8vw,128px)/.9 Unbounded,sans-serif;letter-spacing:-.05em;max-width:14ch}.alt-intro p{margin-top:24px;max-width:50ch;color:rgba(231,240,251,.82)}
.alt-about{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);background:var(--mist);color:var(--ink);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}.alt-about h2{font:800 clamp(36px,6vw,92px)/.95 Unbounded,sans-serif;letter-spacing:-.05em}.alt-about>p{grid-column:2;font-size:clamp(19px,1.8vw,24px);max-width:46ch}.alt-about dl{grid-column:2;margin:0}.alt-about dt{font:700 14px Unbounded,sans-serif;margin-top:26px;color:var(--sky)}.alt-about dd{margin:6px 0 0;padding-bottom:20px;border-bottom:1px solid #c6d6ea}
@media(max-width:820px){.alt-about{grid-template-columns:1fr}.alt-about>p,.alt-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="alt-hero" aria-labelledby="h"><div class="alt-topo" aria-hidden="true"></div><div class="alt-glow" aria-hidden="true"></div><div class="alt-horizon" aria-hidden="true"></div><div class="alt-ruler" aria-hidden="true"></div><div class="alt-readout" aria-hidden="true">400 ft</div><div><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="alt-sub"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Plan a shoot") + "</div></div></section>",
  intro: (k) => { const t = k.intro(); return '<section class="alt-intro" aria-labelledby="h"><div class="alt-topo" aria-hidden="true"></div><div class="alt-glow" aria-hidden="true"></div><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="alt-work" id="work"><h2>' + k.h("work", k.page === "work" ? "Flight log" : "Recent flights") + '</h2><div class="alt-frames">' + k.c.cards.slice(0, 3).map((x, i) => '<figure class="alt-frame"><div class="alt-shot">' + k.photo(i) + "</div><figcaption><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></figcaption></figure>").join("") + "</div></section>",
  services: (k) => '<section class="alt-svc" id="services"><h2>' + k.h("services", "What we fly") + '</h2><ul>' + k.c.services.map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="alt-about" id="about"><h2>' + k.h("about", "The crew") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="alt-end" id="contact"><h2>' + k.h("contact", "Have a place worth seeing from above?") + '</h2>' + k.cta("Plan a shoot") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

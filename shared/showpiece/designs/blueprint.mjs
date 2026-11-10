export default {
  id: "md-ibm",
  root: "bb",
  fonts: "family=IBM+Plex+Sans+Condensed:wght@300;500;700&family=IBM+Plex+Mono:wght@400",
  labels: { work: "Projects", services: "Services", about: "Practice", contact: "Commission" },
  intros: {
    work: { title: "Projects", text: "Bridges, schools and one very long footpath." },
    features: { title: "Services", text: "Structural engineering from feasibility to final inspection." },
    studio: { title: "The practice", text: null },
    contact: { title: "Commission us", text: "Send drawings, a sketch or just an address. We reply within two working days." },
  },
  demo: {
    name: "Blueprint Bureau", headline: "Built to the drawing.", heroLabel: "Structural engineering",
    bio: "A twelve-person engineering practice designing the parts of buildings nobody sees: frames, foundations and the calculations that keep them standing for a hundred years.",
    cards: [
      { title: "Riverside footbridge", description: "A 48-metre steel span, lifted into place in a single night." },
      { title: "Northgate primary school", description: "Timber frame, three storeys, built in eleven months." },
      { title: "Granary conversion", description: "A listed 1880s warehouse, strengthened for forty new homes." },
    ],
    services: [
      { title: "Feasibility", description: "Will it stand, and what will it take? Answered in two weeks." },
      { title: "Detailed design", description: "Calculations, drawings and specifications ready for tender." },
      { title: "Site support", description: "Inspections and answers while it is being built." },
    ],
  },
  css: `
.bb{--blue:#0e3a8c;--deep:#082766;--line:rgba(220,234,255,.28);--white:#eaf2ff;--chalk:#fbfdff;--amber:#ffc844;background:var(--blue);color:var(--white);font:300 18px/1.65 "IBM Plex Sans Condensed",system-ui,sans-serif;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px),linear-gradient(rgba(220,234,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(220,234,255,.1) 1px,transparent 1px);background-size:120px 120px,120px 120px,24px 24px,24px 24px}
.bb header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:2px solid var(--white)}
.bb .brand{font:700 20px/1 "IBM Plex Sans Condensed";letter-spacing:.06em;text-transform:uppercase;text-decoration:none}
.bb nav{display:flex;gap:clamp(14px,2.4vw,30px);font:400 13px "IBM Plex Mono",monospace;text-transform:uppercase}.bb nav a{text-decoration:none}.bb nav a:hover,.bb nav a[aria-current]{color:var(--amber)}
.bb-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.bb-ref{font:400 13px "IBM Plex Mono",monospace;color:var(--amber)}
.bb h1{margin-top:18px;font:700 clamp(58px,8.6vw,140px)/.9 "IBM Plex Sans Condensed";text-transform:uppercase;letter-spacing:-.02em}
.bb h1 .ch{animation:bb-in .5s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes bb-in{from{opacity:0}}
.bb-hero p{margin-top:24px;max-width:44ch}
.bb .cta{display:inline-flex;margin-top:30px;padding:14px 24px;border:2px solid var(--white);font:400 14px "IBM Plex Mono",monospace;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s}.bb .cta:hover{background:var(--white);color:var(--blue)}.bb .cta-muted{border-style:dashed;text-transform:none}
.bb-sheet{position:relative;border:2px solid var(--white);padding:16px;background:rgba(8,39,102,.5)}
.bb-sheet svg{display:block;width:100%;height:auto}
.bb-sheet .s{fill:none;stroke:var(--white);stroke-width:2;stroke-dasharray:1200;animation:bb-draw 3.4s cubic-bezier(.5,0,.2,1) both}
.bb-sheet .s2{animation-delay:.6s}.bb-sheet .s3{animation-delay:1.2s;stroke-dasharray:6 6;animation-name:bb-fade}.bb-sheet .s4{stroke:var(--amber);animation-delay:1.8s}
@keyframes bb-draw{from{stroke-dashoffset:1200}}@keyframes bb-fade{from{opacity:0}}
.bb-sheet text{font:400 13px "IBM Plex Mono",monospace;fill:var(--white);animation:bb-fade 1s ease 2.6s both}
.bb-title{display:grid;grid-template-columns:repeat(3,1fr);margin-top:14px;border-top:2px solid var(--white);font:400 12px "IBM Plex Mono",monospace;text-transform:uppercase}.bb-title span{padding:8px 10px;border-right:1px solid var(--line)}.bb-title span:last-child{border:0}
.bb-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);border-bottom:2px solid var(--white)}.bb-intro h1{font-size:clamp(52px,7.6vw,120px)}.bb-intro p{margin-top:20px;max-width:46ch}
.bb h2{font:700 clamp(40px,6vw,92px)/.92 "IBM Plex Sans Condensed";text-transform:uppercase;letter-spacing:-.015em;max-width:14ch}
.bb-projects{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--chalk);color:var(--deep);background-image:none}
.bb-list{margin-top:clamp(36px,5vw,60px);border-top:2px solid var(--deep)}
.bb-row{display:grid;grid-template-columns:90px minmax(0,1fr) minmax(0,1.2fr) 160px;gap:24px;align-items:center;padding:24px 0;border-bottom:1px solid #b8c7e3}
.bb-row code{font:400 13px "IBM Plex Mono",monospace;color:#5b6f97}.bb-row h3{font:700 26px/1.1 "IBM Plex Sans Condensed";text-transform:uppercase}.bb-row p{color:#3b4f78}
.bb-thumb{height:90px;border:1px solid #b8c7e3;background:repeating-linear-gradient(45deg,transparent 0 8px,#dbe4f5 8px 9px)}.bb-thumb img{width:100%;height:100%;object-fit:cover}
.bb-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.bb-svc ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:clamp(36px,5vw,60px);border:2px solid var(--white);counter-reset:st}
.bb-svc li{padding:28px;border-right:1px solid var(--line);counter-increment:st}.bb-svc li:last-child{border:0}
.bb-svc li:before{content:"Stage " counter(st);display:block;font:400 13px "IBM Plex Mono",monospace;color:var(--amber);margin-bottom:26px}
.bb-svc h3{font:700 26px "IBM Plex Sans Condensed";text-transform:uppercase}.bb-svc p{margin-top:8px}
.bb-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--deep);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.bb-about>p{font-size:clamp(20px,1.9vw,25px)}.bb-about dl{grid-column:2;margin:0;font-family:"IBM Plex Mono",monospace;font-size:15px}.bb-about dt{color:var(--amber);margin-top:18px}.bb-about dd{margin:4px 0 0}
.bb-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);border-top:2px solid var(--white);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:30px}
.bb footer{display:flex;justify-content:space-between;padding:20px clamp(18px,4vw,56px);font:400 12px "IBM Plex Mono",monospace;text-transform:uppercase;border-top:2px solid var(--white)}
@media(max-width:900px){.bb nav{gap:12px;font-size:11px}.bb-hero,.bb-svc ol,.bb-about{grid-template-columns:1fr}.bb-svc li{border-right:0;border-bottom:1px solid var(--line)}.bb-row{grid-template-columns:1fr;gap:6px}.bb-thumb{display:none}.bb-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="bb-hero" aria-labelledby="h"><div><span class="bb-ref">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Commission a study") + '</div><div class="bb-sheet" aria-hidden="true"><svg viewBox="0 0 600 340"><path class="s" d="M20 300 H580"/><path class="s s2" d="M60 300 V200 Q300 40 540 200 V300"/><path class="s s3" d="M60 200 L540 200 M120 200 V300 M180 200 V300 M240 200 V300 M300 200 V300 M360 200 V300 M420 200 V300 M480 200 V300"/><path class="s s4" d="M60 320 H540 M60 312 V328 M540 312 V328"/><text x="250" y="334">48.0 m span</text><text x="250" y="80">steel arch, S355</text></svg><div class="bb-title"><span>Drawing 04</span><span>Scale 1:200</span><span>Rev C</span></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="bb-intro" aria-labelledby="h"><span class="bb-ref">Sheet / ' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="bb-projects" id="work"><h2>Project register</h2><div class="bb-list">' + k.c.cards.map((x, i) => '<article class="bb-row"><code>P-' + String(204 + i * 7) + "</code><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + '</p><div class="bb-thumb">' + k.photo(i) + "</div></article>").join("") + "</div></section>",
  services: (k) => '<section class="bb-svc" id="services"><h2>How a project runs</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="bb-about" id="about"><h2>The practice</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="bb-end" id="contact"><h2>Got a site? Send us the address.</h2>' + k.cta("Commission a study") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

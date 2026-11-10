export default {
  id: "md-tesla",
  root: "ef",
  fonts: "family=Red+Hat+Display:wght@300;500;900&family=Red+Hat+Mono:wght@400",
  labels: { work: "Models", services: "Charging", about: "About", contact: "Book a drive" },
  intros: {
    work: { title: "The models", text: "Three cars, one platform, every one fully electric." },
    features: { title: "Charging", text: "At home overnight, or on the road in twenty minutes." },
    studio: { title: "About Electric Form", text: null },
    contact: { title: "Book a test drive", text: "Choose a model and a time. We bring the car to you." },
  },
  demo: {
    name: "Electric Form", headline: "Quiet. Quick. Electric.", heroLabel: "Electric cars, designed simply",
    bio: "Three electric cars built on one quiet platform. Up to 520 km on a charge, over-the-air updates, and an interior with nothing you do not need.",
    cards: [
      { title: "Form One", description: "A compact city car. 380 km range, parks anywhere." },
      { title: "Form Two", description: "A family estate. 520 km range and room for a dog." },
      { title: "Form Three", description: "A two-door coupe. 0 to 100 in 3.9 seconds." },
    ],
    services: [
      { title: "Home charger", description: "Fitted in an afternoon, full by morning." },
      { title: "Fast network", description: "From 10 to 80 percent in about twenty minutes." },
      { title: "Charging plan", description: "One monthly price for every public charge." },
    ],
  },
  css: `
@property --pct{syntax:"<integer>";initial-value:0;inherits:false}
.ef{--white:#f7f7f6;--silver:#d9dad8;--ink:#141516;--grey:#7a7d80;--volt:#e8202a;background:var(--white);color:var(--ink);font:300 18px/1.65 "Red Hat Display",system-ui,sans-serif}
.ef header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.ef .brand{font:500 15px/1 "Red Hat Display";letter-spacing:.42em;text-transform:uppercase;text-decoration:none}
.ef nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:15px}.ef nav a{text-decoration:none;color:var(--grey)}.ef nav a:hover,.ef nav a[aria-current]{color:var(--ink)}
.ef-hero{display:grid;justify-items:center;text-align:center;padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.ef h1{font:900 clamp(52px,8.6vw,146px)/.95 "Red Hat Display";letter-spacing:-.05em}
.ef h1 .w{margin:0 .08em}
.ef h1 .ch{animation:ef-in .8s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--i) * 40ms)}@keyframes ef-in{from{opacity:0;transform:translateY(.3em)}}
.ef-car{width:min(100%,960px);margin-top:clamp(20px,3vw,40px);overflow:visible}
.ef-car .body{fill:none;stroke:var(--ink);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:2400;animation:ef-draw 3s cubic-bezier(.6,0,.3,1) .5s both}
.ef-car .wheel{fill:none;stroke:var(--ink);stroke-width:2.5;stroke-dasharray:300;animation:ef-draw 1.5s ease 2.4s both}
.ef-car .road{stroke:var(--silver);stroke-width:2}
.ef-car .glow{fill:none;stroke:var(--volt);stroke-width:3;stroke-linecap:round;stroke-dasharray:60 2400;animation:ef-run 4s linear 3.2s infinite}
@keyframes ef-draw{from{stroke-dashoffset:2400}}@keyframes ef-run{from{stroke-dashoffset:0}to{stroke-dashoffset:-2460}}
.ef-charge{display:flex;align-items:center;gap:16px;margin-top:18px;font:400 14px "Red Hat Mono",monospace;color:var(--grey)}
.ef-battery{position:relative;width:200px;height:20px;border:2px solid var(--ink);border-radius:5px;padding:2px}
.ef-battery:after{content:"";position:absolute;right:-7px;top:5px;width:4px;height:8px;border-radius:0 2px 2px 0;background:var(--ink)}
.ef-battery i{display:block;height:100%;width:calc(var(--pct) * 1%);border-radius:2px;background:var(--volt);animation:ef-pct 4s cubic-bezier(.3,.6,.3,1) 1s both;--pct:86}
.ef-num{counter-reset:p var(--pct);animation:ef-pct 4s cubic-bezier(.3,.6,.3,1) 1s both;--pct:86}.ef-num:after{content:counter(p) "% charged"}
@keyframes ef-pct{from{--pct:0}}
.ef-hero p{margin-top:28px;max-width:52ch;color:#4b4e51}
.ef .cta{display:inline-flex;margin-top:28px;padding:15px 34px;border-radius:4px;background:var(--ink);color:#fff;font-weight:500;text-decoration:none;transition:background .2s}.ef .cta:hover{background:var(--volt)}.ef .cta-muted{background:var(--silver);color:var(--grey)}
.ef-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);text-align:center}.ef-intro h1{font-size:clamp(52px,7.6vw,124px)}.ef-intro p{margin:18px auto 0;max-width:46ch;color:#4b4e51}
.ef h2{font:900 clamp(42px,6vw,96px)/.95 "Red Hat Display";letter-spacing:-.045em;max-width:14ch}
.ef-models{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--white)}
.ef-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;margin-top:clamp(40px,6vw,70px);background:#2a2c2e}
.ef-model{padding:30px;background:var(--ink);transition:background .3s}.ef-model:hover{background:#1e2022}
.ef-model svg{width:100%;height:auto}.ef-model svg path{fill:none;stroke:var(--white);stroke-width:2;stroke-linecap:round}.ef-model svg circle{fill:none;stroke:var(--volt);stroke-width:2}
.ef-model img{width:100%;aspect-ratio:16/9;object-fit:cover}
.ef-model h3{margin-top:22px;font:900 30px "Red Hat Display";letter-spacing:-.03em}.ef-model p{margin-top:6px;color:#a7aaad}
.ef-charge-s{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ef-charge-s ul{margin-top:clamp(36px,5vw,56px);border-top:2px solid var(--ink)}
.ef-charge-s li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr) 200px;gap:30px;align-items:center;padding:26px 0;border-bottom:1px solid var(--silver)}
.ef-charge-s h3{font:500 28px "Red Hat Display";letter-spacing:-.02em}.ef-charge-s p{color:#4b4e51}
.ef-charge-s li:after{content:"";height:10px;border-radius:5px;background:linear-gradient(90deg,var(--volt) var(--f,40%),var(--silver) 0)}.ef-charge-s li:nth-child(2):after{--f:80%}.ef-charge-s li:nth-child(3):after{--f:100%}
.ef-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--silver);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ef-about>p{font-size:clamp(20px,2vw,26px)}.ef-about dl{grid-column:2;margin:0;font-family:"Red Hat Mono",monospace;font-size:15px}.ef-about dt{color:var(--volt);margin-top:18px}.ef-about dd{margin:4px 0 0}
.ef-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ef-end h2{margin:0 auto}
.ef footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Red Hat Mono",monospace;color:var(--grey);border-top:1px solid var(--silver)}
@media(max-width:900px){.ef nav{gap:12px;font-size:13px}.ef .brand{letter-spacing:.2em;font-size:12px}.ef-row,.ef-about{grid-template-columns:1fr}.ef-charge-s li{grid-template-columns:1fr;gap:8px}.ef-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ef-hero" aria-labelledby="h"><h1 id="h">' + k.letters(k.c.headline) + '</h1><svg class="ef-car" viewBox="0 0 960 260" aria-hidden="true"><line class="road" x1="0" y1="232" x2="960" y2="232"/><path class="body" d="M90 200 C90 170 120 160 170 155 L300 140 C360 90 430 70 520 70 C620 70 680 100 740 140 L840 158 C875 165 890 180 890 200 L860 200 M770 200 L320 200 M230 200 L90 200"/><circle class="wheel" cx="275" cy="200" r="42"/><circle class="wheel" cx="815" cy="200" r="42"/><path class="glow" d="M90 200 C90 170 120 160 170 155 L300 140 C360 90 430 70 520 70 C620 70 680 100 740 140 L840 158 C875 165 890 180 890 200"/></svg><div class="ef-charge" aria-hidden="true"><span class="ef-battery"><i></i></span><span class="ef-num"></span></div><p>' + k.E(k.c.bio) + "</p>" + k.cta("Book a test drive") + "</section>",
  intro: (k) => { const t = k.intro(); return '<section class="ef-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => { const shapes = ["M20 90 C20 70 40 66 70 64 L120 58 C150 30 190 26 230 30 C260 34 280 50 300 64 L330 70 C345 74 350 82 350 90", "M20 90 C20 72 30 64 60 60 L110 46 C130 30 250 28 290 40 L330 66 C345 72 350 80 350 90", "M20 90 C20 76 50 70 90 66 L150 46 C190 34 230 34 260 46 L320 70 C340 76 350 84 350 90"]; return '<section class="ef-models" id="work"><h2>The line-up</h2><div class="ef-row">' + k.c.cards.map((x, i) => '<article class="ef-model">' + (k.photo(i) || '<svg viewBox="0 0 370 120" aria-hidden="true"><path d="' + shapes[i % 3] + '"/><circle cx="100" cy="92" r="16"/><circle cx="290" cy="92" r="16"/></svg>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ef-charge-s" id="services"><h2>Charging, sorted</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ef-about" id="about"><h2>Less car, more drive</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ef-end" id="contact"><h2>Feel the quiet.</h2>' + k.cta("Book a test drive") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

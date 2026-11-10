export default {
  id: "md-bmw",
  root: "nl",
  fonts: "family=Familjen+Grotesk:ital,wght@0,400;0,600;0,700;1,500",
  labels: { work: "Routes", services: "Rentals", about: "About", contact: "Plan a trip" },
  intros: {
    work: { title: "Routes we love", text: "Each one planned around the chargers, the views and a good lunch." },
    features: { title: "Rentals", text: "Electric cars, charged and ready, with the route loaded in." },
    studio: { title: "About Northline", text: null },
    contact: { title: "Plan a trip", text: "Tell us where you want to end up. We will plan the road there." },
  },
  demo: {
    name: "Northline", headline: "Every journey begins here.", heroLabel: "Electric road trips, planned for you",
    bio: "Rent an electric car with the whole trip already mapped: charging stops, scenic detours and places to stay. You just drive.",
    cards: [
      { title: "Fjord loop, 640 km", description: "Five days, three ferries and a charger at every overnight stop." },
      { title: "Alpine passes, 410 km", description: "Seven passes, two lakes and a lot of regenerative braking." },
      { title: "Atlantic coast, 820 km", description: "Surf towns, lighthouses and the longest straight road you will ever drive." },
    ],
    services: [
      { title: "Weekend rental", description: "Friday pickup, Monday return, battery full both ways." },
      { title: "Planned road trip", description: "Car, route, stays and charging, booked as one trip." },
      { title: "One-way drops", description: "Start in one city, leave the car in another." },
    ],
  },
  css: `
.nl{--snow:#f5f6f1;--pine:#1d4a38;--road:#2b2e33;--sign:#ffd23f;--sky:#a9d0ea;--moss:#6f9a62;background:var(--snow);color:var(--road);font:400 17px/1.65 "Familjen Grotesk",system-ui,sans-serif}
.nl header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.nl .brand{display:flex;align-items:center;gap:12px;font:700 22px/1 "Familjen Grotesk";text-decoration:none;color:var(--pine)}
.nl .brand:before{content:"";width:26px;height:26px;border-radius:6px;background:linear-gradient(135deg,var(--sign) 50%,var(--pine) 50%)}
.nl nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.nl nav a{text-decoration:none}.nl nav a:hover{color:var(--moss)}
.nl-hero{position:relative;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(24px,4vw,60px);align-items:center;padding:clamp(20px,4vw,50px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.nl h1{font:700 clamp(54px,8.6vw,138px)/.92 "Familjen Grotesk";letter-spacing:-.045em;color:var(--pine)}
.nl h1 .ch{animation:nl-up .6s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 25ms)}@keyframes nl-up{from{opacity:0;transform:translateY(.3em)}}
.nl-hero p{margin-top:26px;font-size:clamp(18px,1.6vw,22px);max-width:40ch}
.nl .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:12px;background:var(--sign);color:var(--road);font-weight:700;text-decoration:none;box-shadow:0 4px 0 #c9a000;transition:transform .15s,box-shadow .15s}.nl .cta:hover{transform:translateY(2px);box-shadow:0 2px 0 #c9a000}.nl .cta-muted{background:transparent;box-shadow:none;border:2px solid var(--road);font-weight:600}
.nl-map{position:relative;aspect-ratio:1.15;border-radius:28px;overflow:hidden;background:radial-gradient(circle at 70% 25%,#d7e9d0 0 18%,transparent 19%),radial-gradient(circle at 25% 75%,#d7e9d0 0 22%,transparent 23%),repeating-radial-gradient(circle at 70% 25%,transparent 0 18px,rgba(29,74,56,.12) 19px 20px),repeating-radial-gradient(circle at 25% 75%,transparent 0 22px,rgba(29,74,56,.1) 23px 24px),#e8f0df}
.nl-map:before{content:"";position:absolute;right:-8%;top:-10%;width:48%;height:55%;border-radius:50%;background:var(--sky);opacity:.8}
.nl-map svg{position:absolute;inset:0;width:100%;height:100%}
.nl-road{fill:none;stroke:var(--road);stroke-width:14;stroke-linecap:round;stroke-linejoin:round}
.nl-dash{fill:none;stroke:var(--sign);stroke-width:3;stroke-linecap:round;stroke-dasharray:10 14}
.nl-route{fill:none;stroke:var(--pine);stroke-width:5;stroke-linecap:round;stroke-dasharray:1400;animation:nl-draw 3.2s cubic-bezier(.4,0,.2,1) .4s both}
@keyframes nl-draw{from{stroke-dashoffset:1400}}
.nl-pin{transform-box:fill-box;transform-origin:50% 100%;animation:nl-pin .5s cubic-bezier(.3,1.7,.5,1) both}.nl-pin:nth-of-type(1){animation-delay:1.1s}.nl-pin:nth-of-type(2){animation-delay:2s}.nl-pin:nth-of-type(3){animation-delay:3s}
@keyframes nl-pin{from{transform:scale(0)}}
.nl-pin circle{fill:var(--sign);stroke:var(--road);stroke-width:3}.nl-pin path{fill:var(--road)}
.nl-km{position:absolute;left:18px;bottom:18px;padding:10px 16px;border-radius:12px;background:var(--road);color:var(--snow);font:600 15px "Familjen Grotesk"}
.nl-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}.nl-intro h1{font-size:clamp(50px,7.5vw,120px)}.nl-intro p{margin-top:20px;max-width:46ch;font-size:clamp(18px,1.6vw,21px)}
.nl h2{font:700 clamp(40px,6vw,90px)/.95 "Familjen Grotesk";letter-spacing:-.04em;color:var(--pine);max-width:14ch}
.nl-routes{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--pine);color:var(--snow)}.nl-routes h2{color:var(--snow)}
.nl-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.nl-trip{padding:24px;border-radius:24px;background:#24563f}.nl-trip svg{width:100%;height:90px}.nl-trip svg path{fill:none;stroke:var(--sign);stroke-width:3;stroke-linecap:round;stroke-dasharray:6 8}.nl-trip svg circle{fill:var(--snow)}
.nl-trip img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin-bottom:14px}
.nl-trip h3{margin-top:14px;font:700 24px/1.15 "Familjen Grotesk";letter-spacing:-.02em}.nl-trip p{margin-top:6px;opacity:.85}
.nl-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.nl-signs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,60px)}
.nl-signs li{padding:26px;border-radius:16px;background:var(--road);color:var(--snow);border:4px solid var(--snow);box-shadow:0 0 0 3px var(--road)}
.nl-signs h3{font:700 22px "Familjen Grotesk";color:var(--sign)}.nl-signs p{margin-top:8px}
.nl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px);background:#e8f0df}.nl-about>p{font-size:clamp(19px,1.8vw,24px)}.nl-about dl{grid-column:2;margin:0}.nl-about dt{font-weight:700;margin-top:18px;color:var(--pine)}.nl-about dd{margin:4px 0 0}
.nl-end{padding:clamp(90px,12vw,160px) clamp(18px,4vw,56px);background:var(--sign);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.nl-end .cta{margin:0;background:var(--road);color:var(--snow);box-shadow:none}
.nl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--road);color:var(--snow)}
@media(max-width:860px){.nl nav{gap:12px;font-size:14px}.nl-hero,.nl-about,.nl-list,.nl-signs{grid-template-columns:1fr}.nl-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="nl-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Plan my trip") + '</div><div class="nl-map" aria-hidden="true"><svg viewBox="0 0 600 520"><path class="nl-road" d="M40 470 C140 420 120 330 220 300 S360 330 400 240 S470 90 560 60"/><path class="nl-dash" d="M40 470 C140 420 120 330 220 300 S360 330 400 240 S470 90 560 60"/><path class="nl-route" d="M40 470 C140 420 120 330 220 300 S360 330 400 240 S470 90 560 60"/><g class="nl-pin"><circle cx="220" cy="286" r="16"/><path d="M214 280h12l-5 7h4l-9 9 2-7h-4z"/></g><g class="nl-pin"><circle cx="400" cy="226" r="16"/><path d="M394 220h12l-5 7h4l-9 9 2-7h-4z"/></g><g class="nl-pin"><circle cx="560" cy="46" r="16"/><path d="M554 40h12l-5 7h4l-9 9 2-7h-4z"/></g></svg><span class="nl-km">3 charging stops planned</span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="nl-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => { const r = ["M10 70 C60 20 110 80 160 40 S250 20 290 50", "M10 40 C50 80 100 10 160 60 S240 80 290 20", "M10 60 C70 60 90 20 150 30 S230 80 290 40"]; return '<section class="nl-routes" id="work"><h2>' + k.h("work", "Routes we love") + '</h2><div class="nl-list">' + k.c.cards.map((x, i) => '<article class="nl-trip">' + (k.photo(i) || '<svg viewBox="0 0 300 90" aria-hidden="true"><path d="' + r[i % 3] + '"/><circle cx="10" cy="' + [70, 40, 60][i % 3] + '" r="6"/><circle cx="290" cy="' + [50, 20, 40][i % 3] + '" r="6"/></svg>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="nl-svc" id="services"><h2>' + k.h("services", "Pick up, plug in, go") + '</h2><ul class="nl-signs">' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="nl-about" id="about"><h2>' + k.h("about", "Why electric, why now") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="nl-end" id="contact"><h2>' + k.h("contact", "Where does your road go?") + '</h2>' + k.cta("Plan my trip") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

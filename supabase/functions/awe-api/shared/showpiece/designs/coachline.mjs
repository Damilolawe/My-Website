export default {
  id: "md-bugatti",
  root: "av",
  fonts: "family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400&family=Jost:wght@300;400;500",
  labels: { work: "Commissions", services: "Process", about: "Atelier", contact: "Enquire" },
  intros: {
    work: { title: "Commissions", text: "Every car leaves the atelier with a name, not a number." },
    features: { title: "The process", text: "Eighteen months from first sketch to first drive." },
    studio: { title: "The atelier", text: null },
    contact: { title: "Begin a commission", text: "Every conversation starts with a private appointment." },
  },
  demo: {
    name: "Atelier Velocity", headline: "Beyond every limit.", heroLabel: "Coachbuilt hypercars",
    bio: "We build eleven cars a year, each shaped by hand around the person who will drive it. Carbon, leather and aluminium, finished to a tolerance you can feel.",
    cards: [
      { title: "Nº 07 Nocturne", description: "Midnight blue over bare carbon, with a cabin stitched in silver thread." },
      { title: "Nº 08 Solstice", description: "A roadster for a collector in Lisbon, built for coastal roads at dawn." },
      { title: "Nº 09 Meridian", description: "Track-tuned chassis, road-legal trim, one driver's seat moulded to fit." },
    ],
    services: [
      { title: "First sketch", description: "We meet, talk about how you drive, and draw the car together." },
      { title: "The build", description: "Twelve craftspeople, one car, visits to the atelier whenever you like." },
      { title: "Handover", description: "A private road, a full tank, and a day to get to know it." },
    ],
  },
  css: `
.av{--black:#100e0c;--champ:#d8c39a;--ivory:#f4efe4;--smoke:#2a2622;--dim:#9c9286;background:var(--black);color:var(--ivory);font:300 17px/1.7 Jost,system-ui,sans-serif}
.av header{position:absolute;left:0;right:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:26px clamp(18px,4vw,56px)}
.av .brand{font:400 15px/1 Jost;letter-spacing:.42em;text-transform:uppercase;text-decoration:none}
.av nav{display:flex;gap:clamp(16px,2.6vw,38px);font-size:14px;letter-spacing:.08em}.av nav a{text-decoration:none;color:var(--dim);transition:color .3s}.av nav a:hover,.av nav a[aria-current]{color:var(--champ)}
.av-hero{position:relative;min-height:100svh;display:grid;align-content:center;justify-items:center;text-align:center;overflow:hidden;isolation:isolate;padding:120px clamp(18px,4vw,56px) 80px}
.av-speed{position:absolute;inset:30% -10%;z-index:-1;background:repeating-linear-gradient(0deg,transparent 0 22px,rgba(216,195,154,.18) 22px 23px);-webkit-mask:linear-gradient(90deg,transparent,#000 30%,#000 70%,transparent);mask:linear-gradient(90deg,transparent,#000 30%,#000 70%,transparent);animation:av-rush 1.6s linear infinite}
@keyframes av-rush{to{background-position:0 0;transform:translateX(-6%)}}
.av-glow{position:absolute;left:50%;top:58%;width:90vw;height:40vw;translate:-50% -50%;z-index:-2;background:radial-gradient(closest-side,rgba(216,195,154,.18),transparent)}
.av-kicker{font:400 13px Jost;letter-spacing:.5em;text-transform:uppercase;color:var(--champ)}
.av h1{margin-top:26px;font:400 clamp(64px,13vw,220px)/.9 "Bodoni Moda",serif;letter-spacing:-.03em;background:linear-gradient(105deg,#8a7650 0%,#8a7650 38%,#fff7df 48%,#8a7650 58%,#8a7650 100%);background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:av-shine 6.5s cubic-bezier(.6,0,.4,1) infinite}
@keyframes av-shine{0%{background-position:100% 0}60%,100%{background-position:0 0}}
.av-hero h1,.av-intro h1{animation:av-shine 6.5s cubic-bezier(.6,0,.4,1) infinite,av-in 1.6s cubic-bezier(.2,.8,.2,1) both}@keyframes av-in{from{opacity:0;letter-spacing:.12em}}
.av-hero p{margin-top:30px;max-width:48ch;color:#c9c0b2}
.av .cta{display:inline-flex;margin-top:36px;padding:16px 34px;border:1px solid var(--champ);color:var(--champ);font:400 13px Jost;letter-spacing:.3em;text-transform:uppercase;text-decoration:none;transition:background .4s,color .4s}.av .cta:hover{background:var(--champ);color:var(--black)}.av .cta-muted{letter-spacing:.04em;text-transform:none;border-color:var(--smoke);color:var(--dim)}
.av-intro{position:relative;padding:170px clamp(18px,4vw,56px) clamp(70px,9vw,120px);text-align:center;overflow:hidden;isolation:isolate}.av-intro h1{margin-top:0;font-size:clamp(56px,10vw,160px)}.av-intro p{max-width:46ch;margin:22px auto 0;color:#c9c0b2}
.av h2{font:400 clamp(40px,6vw,96px)/1 "Bodoni Moda",serif;letter-spacing:-.02em}

.av-work{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.av-cars{display:flex;gap:clamp(16px,2vw,28px);margin-top:clamp(40px,6vw,80px);overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:18px;scrollbar-color:var(--champ) var(--smoke)}
.av-car{flex:0 0 min(78vw,520px);scroll-snap-align:start}
.av-plate{position:relative;aspect-ratio:16/10;overflow:hidden;background:linear-gradient(180deg,#1d1a17,#0c0b0a)}
.av-plate img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.av-plate:before{content:"";position:absolute;left:8%;right:8%;bottom:22%;height:24%;border-radius:50% 60% 8% 8%/90% 100% 10% 10%;background:linear-gradient(180deg,#3a342d,#141210);box-shadow:inset 0 2px 0 rgba(255,247,223,.5)}
.av-plate:after{content:"";position:absolute;left:14%;right:14%;bottom:16%;height:3px;background:linear-gradient(90deg,transparent,var(--champ),transparent);opacity:.7}
.av-plate:has(img):before,.av-plate:has(img):after{display:none}
.av-car h3{margin-top:22px;font:400 30px/1.1 "Bodoni Moda",serif;font-style:italic}.av-car p{margin-top:8px;color:#b9b0a3;max-width:40ch}
.av-steps{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);background:var(--ivory);color:var(--black);counter-reset:s}
.av-steps ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,4vw,60px);margin-top:clamp(40px,6vw,80px)}
.av-steps li{counter-increment:s;border-top:1px solid #b9ab92;padding-top:24px}
.av-steps li:before{content:counter(s,upper-roman);display:block;font:400 64px/1 "Bodoni Moda",serif;color:#a48b5d}
.av-steps h3{margin-top:16px;font:500 20px Jost}.av-steps p{margin-top:8px;color:#4c463f}
.av-about{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}
.av-about>p{font:400 clamp(22px,2.2vw,30px)/1.5 "Bodoni Moda",serif;color:#e6dccb}
.av-about dl{grid-column:2;margin:0}.av-about dt{font:400 12px Jost;letter-spacing:.4em;text-transform:uppercase;color:var(--champ);margin-top:26px}.av-about dd{margin:8px 0 0;color:#c9c0b2}
.av-end{padding:clamp(100px,14vw,200px) clamp(18px,4vw,56px);text-align:center;border-top:1px solid var(--smoke)}.av-end h2{max-width:14ch;margin:0 auto}
.av footer{display:flex;justify-content:space-between;padding:26px clamp(18px,4vw,56px);font-size:13px;letter-spacing:.12em;color:var(--dim);border-top:1px solid var(--smoke)}.av footer a{text-decoration:none}
@media(max-width:820px){.av nav{gap:14px;font-size:12px}.av .brand{letter-spacing:.25em;font-size:12px}.av-steps ol,.av-about{grid-template-columns:1fr}.av-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="av-hero" aria-labelledby="h"><div class="av-glow" aria-hidden="true"></div><div class="av-speed" aria-hidden="true"></div><span class="av-kicker">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.E(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Begin a commission") + "</section>",
  intro: (k) => { const t = k.intro(); return '<section class="av-intro" aria-labelledby="h"><div class="av-glow" aria-hidden="true"></div><div class="av-speed" aria-hidden="true"></div><h1 id="h">' + k.E(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="av-work" id="work"><h2>' + k.h("work", "Recent commissions") + '</h2><div class="av-cars" tabindex="0" aria-label="Commissions">' + k.c.cards.map((x, i) => '<article class="av-car"><div class="av-plate">' + k.photo(i) + "</div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="av-steps" id="services"><h2>' + k.h("services", "From sketch to first drive") + '</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="av-about" id="about"><h2>' + k.h("about", "The atelier") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="av-end" id="contact"><h2>' + k.h("contact", "Some cars are bought. Yours will be made.") + '</h2>' + k.cta("Request an appointment") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

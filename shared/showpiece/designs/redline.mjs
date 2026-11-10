export default {
  id: "ferrari",
  root: "fr",
  fonts: "family=Racing+Sans+One&family=Archivo+Narrow:wght@400;600;700",
  labels: { work: "Season", services: "Experiences", about: "The team", contact: "Book a seat" },
  demo: {
    name: "Redline Racing Club", headline: "Born on the track.", heroLabel: "Track days and endurance racing",
    bio: "An amateur racing team with three cars, twenty volunteer mechanics and a season of endurance races across Europe. Join a track day, ride alongside a driver, or train for your race licence.",
    cards: [
      { title: "Six hours at the ring", description: "Third in class after a night stint in the rain." },
      { title: "The rookie programme", description: "Five new drivers licensed this season, from karting to cars." },
      { title: "A new engine, built in the garage", description: "Rebuilt over a winter by the volunteer crew." },
    ],
    services: [
      { title: "Track day", description: "Your car or ours, with an instructor." },
      { title: "Passenger laps", description: "Three hot laps beside a race driver." },
      { title: "Licence training", description: "Coaching from first lap to first race." },
    ],
  },
  css: `
@property --rpm{syntax:"<integer>";initial-value:0;inherits:false}
.fr{--red:#d40000;--deep:#8f0000;--graphite:#16171a;--panel:#202227;--white:#f2f2f0;--yellow:#ffd200;--mute:#8a8c92;background:var(--graphite);color:var(--white);font:400 17px/1.65 "Archivo Narrow",system-ui,sans-serif}
.fr header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--red)}
.fr .brand{font:400 26px/1 "Racing Sans One";text-decoration:none;font-style:italic}
.fr nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700;text-transform:uppercase;letter-spacing:.08em}.fr nav a{text-decoration:none}.fr nav a:hover{color:var(--yellow)}
.fr-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(50% 60% at 75% 50%,rgba(212,0,0,.25),transparent 70%)}
.fr-label{font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:13px;color:var(--yellow)}
.fr h1{margin-top:14px;font:400 clamp(64px,10vw,170px)/.88 "Racing Sans One";font-style:italic;letter-spacing:-.01em}
.fr h1 .ch{display:inline-block;animation:fr-in .45s cubic-bezier(.2,1,.3,1) both;animation-delay:calc(var(--i) * 28ms)}@keyframes fr-in{from{opacity:0;transform:translateX(-1em) skewX(-24deg);filter:blur(4px)}}
.fr-hero p{margin-top:22px;max-width:44ch;color:#c9cbd0;font-size:18px}
.fr .cta{display:inline-flex;margin-top:28px;padding:16px 30px;background:var(--red);color:var(--white);font:400 20px "Racing Sans One";text-decoration:none;clip-path:polygon(12px 0,100% 0,calc(100% - 12px) 100%,0 100%);transition:background .2s}.fr .cta:hover{background:var(--yellow);color:var(--graphite)}.fr .cta-muted{background:var(--panel);color:var(--mute);font:600 15px "Archivo Narrow"}
.fr-dash{justify-self:center;width:min(100%,440px);padding:22px;border-radius:30px;background:linear-gradient(#26282e,#121316);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),0 40px 60px -30px #000}
.fr-lights{display:flex;justify-content:center;gap:8px;margin-bottom:18px}
.fr-lights i{width:22px;height:22px;border-radius:50%;background:#2a2c31;animation:fr-shift 3s steps(1) infinite;animation-delay:var(--d)}
@keyframes fr-shift{0%{background:#2a2c31;box-shadow:none}10%,70%{background:var(--c);box-shadow:0 0 14px var(--c)}80%,100%{background:#2a2c31;box-shadow:none}}
.fr-tach{position:relative;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#0b0c0e 56%,transparent 57%),conic-gradient(from 225deg,#3a3d44 0 210deg,var(--red) 210deg 270deg,transparent 270deg);box-shadow:inset 0 0 0 3px #2f3238}
.fr-tach:before{content:"";position:absolute;inset:6%;border-radius:50%;background:repeating-conic-gradient(from 225deg,var(--white) 0 .8deg,transparent .8deg 27deg);-webkit-mask:radial-gradient(circle,transparent 82%,#000 83%);mask:radial-gradient(circle,transparent 82%,#000 83%)}
.fr-needle{position:absolute;left:50%;bottom:50%;width:6px;height:40%;margin-left:-3px;border-radius:3px;background:var(--yellow);transform-origin:50% 100%;transform:rotate(calc(-135deg + var(--rpm) * .027deg));animation:fr-rev 3s cubic-bezier(.5,0,.3,1) infinite;box-shadow:0 0 10px rgba(255,210,0,.6);--rpm:0}
@keyframes fr-rev{0%{--rpm:1000}70%{--rpm:9400}80%{--rpm:5200}100%{--rpm:1000}}
.fr-hub{position:absolute;left:50%;top:50%;width:40px;height:40px;margin:-20px;border-radius:50%;background:#2f3238}
.fr-gear{position:absolute;left:50%;top:62%;translate:-50% 0;font:400 54px "Racing Sans One";color:var(--white)}
.fr-gear small{display:block;font:700 11px "Archivo Narrow";letter-spacing:.2em;text-align:center;color:var(--mute)}
.fr h2{font:400 clamp(48px,7vw,116px)/.9 "Racing Sans One";font-style:italic;max-width:14ch}
.fr-season{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fr-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(40px,6vw,70px)}
.fr-r{position:relative;padding:26px;background:var(--panel);border-left:6px solid var(--red);overflow:hidden}
.fr-r b{position:absolute;right:-6px;top:-18px;font:400 120px/1 "Racing Sans One";color:rgba(255,255,255,.05)}
.fr-r small{font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--yellow);font-size:13px}
.fr-r img{width:100%;aspect-ratio:16/9;object-fit:cover;margin:14px 0}
.fr-r h3{margin-top:8px;font:700 24px/1.2 "Archivo Narrow";text-transform:uppercase}.fr-r p{margin-top:8px;color:#b8bac0}
.fr-exp{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--red)}
.fr-exp ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;margin-top:clamp(36px,5vw,56px);background:var(--deep)}
.fr-exp li{padding:30px;background:var(--red)}
.fr-exp h3{font:400 28px "Racing Sans One";font-style:italic}.fr-exp p{margin-top:6px}
.fr-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:repeating-linear-gradient(45deg,#1b1c20 0 20px,#16171a 20px 40px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.fr-about>p{font-size:clamp(19px,1.8vw,24px)}.fr-about dl{grid-column:2;margin:0}.fr-about dt{font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--yellow);margin-top:16px}.fr-about dd{margin:2px 0 0}
.fr-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:linear-gradient(90deg,var(--white) 0 10%,var(--graphite) 10% 20%,var(--white) 20% 30%,var(--graphite) 30% 40%,var(--white) 40% 50%,var(--graphite) 50% 60%,var(--white) 60% 70%,var(--graphite) 70% 80%,var(--white) 80% 90%,var(--graphite) 90%) 0 0/100% 20px no-repeat,var(--graphite)}.fr-end h2{margin:20px auto 0}
.fr footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:4px solid var(--red)}
@media(max-width:900px){.fr nav{gap:12px;font-size:13px}.fr-hero,.fr-list,.fr-exp ul,.fr-about{grid-template-columns:1fr}.fr-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const L = ["#2ecc71", "#2ecc71", "#2ecc71", "#ffd200", "#ffd200", "#ff3b30", "#ff3b30", "#3a7bff"]; return '<section class="fr-hero" aria-labelledby="h"><div><span class="fr-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a seat") + '</div><div class="fr-dash" aria-hidden="true"><div class="fr-lights">' + L.map((c, i) => '<i style="--c:' + c + ";--d:" + (i * 0.22).toFixed(2) + 's"></i>').join("") + '</div><div class="fr-tach"><span class="fr-needle"></span><span class="fr-hub"></span><span class="fr-gear">4<small>Gear</small></span></div></div></section>'; },
  work: (k) => { const t = ["Endurance", "Academy", "Garage"]; return '<section class="fr-season" id="work"><h2>This season</h2><div class="fr-list">' + k.c.cards.map((x, i) => '<article class="fr-r"><b>' + (i + 1) + "</b><small>" + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="fr-exp" id="services"><h2>Experiences</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fr-about" id="about"><h2>The team</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fr-end" id="contact"><h2>Lights out. Away we go.</h2>' + k.cta("Book a seat") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

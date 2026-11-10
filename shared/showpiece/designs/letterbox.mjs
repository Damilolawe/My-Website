export default {
  id: "voidstage",
  root: "vs",
  fonts: "family=Geologica:wght@300;500;700",
  labels: { work: "Films", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Mika Laine", headline: "Light, then story.", heroLabel: "Film director",
    bio: "I direct short films, commercials and music videos with very little dialogue and a lot of atmosphere. Nordic light, long takes and silence that does the talking.",
    cards: [
      { title: "Polar Night", description: "Short film. Two strangers waiting for a sunrise that does not come." },
      { title: "Weightless", description: "Commercial for a swimwear brand, shot entirely underwater." },
      { title: "Hollow Bells", description: "Music video in one unbroken eight-minute take." },
    ],
    services: [
      { title: "Commercials", description: "Concept, treatment and direction." },
      { title: "Music videos", description: "Low budget, high ambition." },
      { title: "Short film", description: "Development and festival strategy." },
    ],
  },
  css: `
.vs{--void:#000;--white:#f2f2f2;--mute:#6a6a6a;--line:#1c1c1c;--glow:#e8e3d6;background:var(--void);color:var(--white);font:300 17px/1.75 Geologica,system-ui,sans-serif}
.vs header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px)}
.vs .brand{font:500 15px/1 Geologica;letter-spacing:-.02em;text-decoration:none}
.vs nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:14px}.vs nav a{text-decoration:none;color:var(--mute)}.vs nav a:hover,.vs nav a[aria-current]{color:var(--white)}
.vs-hero{position:relative;min-height:calc(100svh - 64px);display:grid;align-content:center;padding:60px clamp(18px,4vw,56px);overflow:hidden;isolation:isolate}
.vs-slit{position:absolute;left:0;right:0;top:50%;height:46%;translate:0 -50%;z-index:-1;background:radial-gradient(70% 120% at 50% 50%,#3a3830,#121110 60%,#000);clip-path:inset(50% 0 50% 0);animation:vs-open 3s cubic-bezier(.7,0,.2,1) .4s forwards}
@keyframes vs-open{to{clip-path:inset(0 0 0 0)}}
.vs-slit:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(232,227,214,.18),transparent);width:30%;animation:vs-sweep 7s ease-in-out 3s infinite}
@keyframes vs-sweep{from{transform:translateX(-100%)}to{transform:translateX(400%)}}
.vs-dust{position:absolute;inset:0;z-index:-1;background:radial-gradient(1px 1px at 20% 40%,rgba(255,255,255,.6),transparent),radial-gradient(1px 1px at 60% 55%,rgba(255,255,255,.5),transparent),radial-gradient(1px 1px at 80% 45%,rgba(255,255,255,.4),transparent);animation:vs-dust 8s linear infinite}@keyframes vs-dust{to{transform:translateY(-30px)}}
.vs-label{font:300 13px Geologica;letter-spacing:.3em;text-transform:uppercase;color:#bdb8aa}
.vs h1{margin-top:16px;font:500 clamp(64px,11vw,200px)/.88 Geologica;letter-spacing:-.075em}
.vs h1 .ch{animation:vs-in 1.2s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(1.6s + var(--i) * 40ms)}@keyframes vs-in{from{opacity:0;letter-spacing:.1em}}
.vs-meta{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end;margin-top:30px}
.vs-meta p{max-width:46ch;color:#c9c5b8}
.vs .cta{display:inline-flex;align-items:center;gap:12px;padding:14px 0;color:var(--white);font:500 15px Geologica;text-decoration:none;border-bottom:1px solid var(--white)}.vs .cta:before{content:"";width:10px;height:10px;border:1px solid var(--white);border-radius:50%;transition:background .3s}.vs .cta:hover:before{background:var(--white)}.vs .cta-muted{border-color:var(--line);color:var(--mute)}
.vs-tc{position:absolute;right:clamp(18px,4vw,56px);bottom:24px;font:300 12px Geologica;letter-spacing:.2em;color:var(--mute)}
.vs h2{font:500 clamp(48px,7.4vw,124px)/.9 Geologica;letter-spacing:-.06em;max-width:12ch}
.vs-films{padding:clamp(80px,10vw,160px) clamp(18px,4vw,56px)}
.vs-list{margin-top:clamp(40px,6vw,80px)}
.vs-f{display:grid;grid-template-columns:80px minmax(0,1fr) minmax(0,1fr);gap:clamp(20px,3vw,40px);align-items:baseline;padding:30px 0;border-top:1px solid var(--line);transition:padding .4s}.vs-f:hover{padding-left:16px}
.vs-f span{font-size:13px;color:var(--mute)}
.vs-f h3{font:500 clamp(30px,3.4vw,52px)/1 Geologica;letter-spacing:-.05em}.vs-f p{color:#a8a59b}
.vs-f img{grid-column:2/-1;width:100%;aspect-ratio:2.39;object-fit:cover;filter:grayscale(.6)}
.vs-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,160px)}
.vs-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,40px);margin-top:clamp(36px,5vw,56px)}
.vs-svc li{padding-top:18px;border-top:1px solid var(--white)}
.vs-svc h3{font:500 22px Geologica;letter-spacing:-.03em}.vs-svc p{margin-top:6px;color:#a8a59b}
.vs-about{padding:clamp(80px,10vw,160px) clamp(18px,4vw,56px);background:var(--glow);color:var(--void);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.vs-about>p{font:300 clamp(20px,1.9vw,26px)/1.5 Geologica}.vs-about dl{grid-column:2;margin:0}.vs-about dt{font-weight:700;font-size:12px;letter-spacing:.24em;text-transform:uppercase;margin-top:18px}.vs-about dd{margin:2px 0 0}
.vs-end{padding:clamp(100px,14vw,200px) clamp(18px,4vw,56px);text-align:center}.vs-end h2{margin:0 auto 30px}
.vs footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:12px;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.vs nav{gap:12px;font-size:13px}.vs-meta,.vs-svc ul,.vs-about{grid-template-columns:1fr}.vs-f{grid-template-columns:40px 1fr}.vs-f p,.vs-f img{grid-column:2}.vs-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.vs-slit{clip-path:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="vs-hero" aria-labelledby="h"><span class="vs-slit" aria-hidden="true"></span><span class="vs-dust" aria-hidden="true"></span><span class="vs-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="vs-meta"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Contact") + '</div><span class="vs-tc" aria-hidden="true">2.39 : 1</span></section>',
  work: (k) => '<section class="vs-films" id="work"><h2>Films</h2><div class="vs-list">' + k.c.cards.map((x, i) => '<article class="vs-f"><span>' + String(i + 1).padStart(2, "0") + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="vs-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="vs-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="vs-end" id="contact"><h2>Roll camera.</h2>' + k.cta("Contact") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

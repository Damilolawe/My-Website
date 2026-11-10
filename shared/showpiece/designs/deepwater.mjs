export default {
  id: "md-kraken",
  root: "dw",
  fonts: "family=Cinzel:wght@600;800&family=Nunito:wght@400;700",
  labels: { work: "Dive sites", services: "Courses", about: "The school", contact: "Book a dive" },
  demo: {
    name: "Deepwater Dive School", headline: "Breathe underwater.", heroLabel: "Scuba courses and guided dives",
    bio: "Learn to dive in our heated training pool, then explore wrecks and reefs with instructors who have logged thousands of dives. Small groups, all equipment included.",
    cards: [
      { title: "The steamer wreck, 18 metres", description: "A cargo ship from 1911, now home to conger eels and lobsters." },
      { title: "Seal Point reef", description: "Shallow, sunny and full of curious grey seals in late summer." },
      { title: "The kelp forest", description: "A slow drift through swaying kelp at 9 metres." },
    ],
    services: [
      { title: "Try a dive", description: "Two hours in the pool, no experience needed." },
      { title: "Open water course", description: "Four days to your first certification." },
      { title: "Guided dives", description: "Boat trips every weekend from April to October." },
    ],
  },
  css: `
@property --dep{syntax:"<integer>";initial-value:0;inherits:false}
.dw{--sea0:#0f6f8f;--sea1:#0a3d5c;--sea2:#06192e;--foam:#e8fbff;--coral:#ff8a5c;--glow:#7cf5ff;background:var(--sea2);color:var(--foam);font:400 17px/1.7 Nunito,system-ui,sans-serif}
.dw header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);background:var(--sea0)}
.dw .brand{font:800 22px/1 Cinzel;letter-spacing:.06em;text-decoration:none}
.dw nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.dw nav a{text-decoration:none}.dw nav a:hover{color:var(--coral)}
.dw-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:center;padding:80px clamp(18px,4vw,56px);background:linear-gradient(180deg,var(--sea0),var(--sea1) 55%,var(--sea2));overflow:hidden;isolation:isolate}
.dw-hero:before{content:"";position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(100deg,transparent 0 60px,rgba(255,255,255,.06) 60px 90px,transparent 90px 160px);-webkit-mask:linear-gradient(#000,transparent 70%);mask:linear-gradient(#000,transparent 70%);animation:dw-rays 10s ease-in-out infinite alternate}
@keyframes dw-rays{to{transform:translateX(-80px) skewX(-6deg)}}
.dw-label{font-weight:700;color:var(--glow);letter-spacing:.1em;text-transform:uppercase;font-size:14px}
.dw h1{margin-top:14px;max-width:11ch;font:800 clamp(56px,9vw,150px)/.95 Cinzel}
.dw h1 .ch{display:inline-block;animation:dw-sink 1.2s ease both;animation-delay:calc(var(--i) * 45ms)}@keyframes dw-sink{from{opacity:0;transform:translateY(-.4em);filter:blur(6px)}}
.dw-hero p{margin-top:22px;max-width:46ch;font-size:clamp(18px,1.5vw,20px);color:#c5e9f2}
.dw .cta{justify-self:start;display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:999px;background:var(--coral);color:var(--sea2);font-weight:700;text-decoration:none;transition:box-shadow .3s}.dw .cta:hover{box-shadow:0 0 0 8px rgba(255,138,92,.25)}.dw .cta-muted{background:rgba(255,255,255,.1);color:#c5e9f2}
.dw-bub{position:absolute;bottom:-40px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;border:2px solid rgba(232,251,255,.6);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.6),transparent 40%);z-index:-1;animation:dw-rise var(--t) linear infinite;animation-delay:var(--d)}
@keyframes dw-rise{to{transform:translate(30px,-110vh)}}
.dw-gauge{position:absolute;right:clamp(18px,4vw,56px);top:50%;translate:0 -50%;display:grid;justify-items:center;gap:10px;font:800 14px Cinzel;color:var(--glow)}
.dw-dial{width:clamp(130px,13vw,170px);aspect-ratio:1;border-radius:50%;border:8px solid #1d5a78;background:radial-gradient(circle,var(--sea2) 58%,transparent 59%),conic-gradient(var(--glow) calc(var(--dep) * 12deg),#0f2f47 0);display:grid;place-items:center;animation:dw-dive 4s cubic-bezier(.3,.8,.4,1) .6s both;--dep:18;counter-reset:d var(--dep)}
.dw-dial:after{content:counter(d) " m";font:800 clamp(28px,3vw,38px) Cinzel;color:var(--foam)}
@keyframes dw-dive{from{--dep:0}}
.dw h2{font:800 clamp(40px,5.6vw,90px)/1 Cinzel;max-width:14ch}
.dw-sites{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sea2)}
.dw-list{position:relative;margin-top:clamp(40px,6vw,70px);padding-left:clamp(40px,6vw,90px)}
.dw-list:before{content:"";position:absolute;left:clamp(12px,2vw,30px);top:0;bottom:0;width:3px;background:linear-gradient(var(--glow),transparent)}
.dw-site{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:center;padding:26px 0}
.dw-site:before{content:attr(data-d);position:absolute;left:calc(clamp(40px,6vw,90px) * -1 - 4px);top:30px;padding:4px 8px;border-radius:999px;background:var(--glow);color:var(--sea2);font:800 12px Nunito}
.dw-site img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:20px}
.dw-site h3{font:800 26px/1.15 Cinzel}.dw-site p{margin-top:8px;color:#a9d3df}
.dw-courses{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sea1)}
.dw-courses ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.dw-courses li{padding:30px;border-radius:24px;background:rgba(255,255,255,.06);border:1px solid rgba(124,245,255,.25)}
.dw-courses h3{font:800 22px Cinzel;color:var(--glow)}.dw-courses p{margin-top:8px}
.dw-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sea0);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.dw-about>p{font-size:clamp(19px,1.8vw,24px)}.dw-about dl{grid-column:2;margin:0}.dw-about dt{font:800 18px Cinzel;color:var(--coral);margin-top:16px}.dw-about dd{margin:2px 0 0}
.dw-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 50% 120%,#0f4d6e,var(--sea2) 60%)}.dw-end h2{margin:0 auto}
.dw footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#8fb7c4}
@media(max-width:900px){.dw nav{gap:12px;font-size:14px}.dw-gauge{position:static;translate:none;justify-self:start;margin-top:36px}.dw-site,.dw-courses ul,.dw-about{grid-template-columns:1fr}.dw-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const b = Array.from({ length: 16 }, (_, i) => '<span class="dw-bub" aria-hidden="true" style="--x:' + ((i * 37) % 100) + "%;--s:" + (8 + (i * 7) % 26) + "px;--t:" + (7 + (i % 5) * 2) + "s;--d:-" + ((i * 1.3) % 9).toFixed(1) + 's"></span>').join(""); return '<section class="dw-hero" aria-labelledby="h">' + b + '<span class="dw-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a dive") + '<div class="dw-gauge" aria-hidden="true"><span class="dw-dial"></span>Depth</div></section>'; },
  work: (k) => { const d = ["18 m", "6 m", "9 m"]; return '<section class="dw-sites" id="work"><h2>' + k.h("work", "Where we dive") + '</h2><div class="dw-list">' + k.c.cards.map((x, i) => '<article class="dw-site" data-d="' + d[i % 3] + '"><div><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div>" + k.photo(i) + "</article>").join("") + "</div></section>"; },
  services: (k) => '<section class="dw-courses" id="services"><h2>' + k.h("services", "Courses") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="dw-about" id="about"><h2>' + k.h("about", "About the school") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="dw-end" id="contact"><h2>' + k.h("contact", "The water is waiting.") + '</h2>' + k.cta("Book a dive") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

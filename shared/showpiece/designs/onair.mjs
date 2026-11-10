export default {
  id: "md-vodafone",
  root: "rr",
  fonts: "family=Righteous&family=Exo+2:wght@400;600;800",
  labels: { work: "Shows", services: "Get involved", about: "The station", contact: "Listen live" },
  demo: {
    name: "Red Line Radio", headline: "Your town, on air.", heroLabel: "Community radio, 104.6 FM",
    bio: "Forty volunteer presenters, one tiny studio above the bakery, and a schedule that runs from dawn chorus to late-night jazz. Local voices, local news, and music you will not hear anywhere else.",
    cards: [
      { title: "The Breakfast Bulletin", description: "Weekdays from 7. Traffic, weather and what is on in town today." },
      { title: "Crate Diggers", description: "Saturday nights. Two collectors, four turntables, no playlists." },
      { title: "The Allotment Hour", description: "Sunday mornings. Gardening questions answered live." },
    ],
    services: [
      { title: "Present a show", description: "Free training. Pitch us an idea." },
      { title: "Advertise locally", description: "Reach 18,000 listeners in town." },
      { title: "Become a friend", description: "Five a month keeps the transmitter on." },
    ],
  },
  css: `
.rr{--red:#e60000;--deep:#8c0000;--black:#121212;--cream:#fff6ef;--dial:#f2e2c4;--amber:#ffb703;background:var(--cream);color:var(--black);font:400 17px/1.65 "Exo 2",system-ui,sans-serif}
.rr header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--red);color:var(--cream)}
.rr .brand{font:400 24px/1 Righteous;text-decoration:none}
.rr nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.rr nav a{text-decoration:none}.rr nav a:hover{color:var(--amber)}
.rr-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:var(--red);color:var(--cream)}
.rr-sign{display:inline-flex;align-items:center;gap:10px;padding:8px 16px;border-radius:8px;border:3px solid var(--cream);font:400 18px Righteous;letter-spacing:.14em;animation:rr-live 1.6s ease-in-out infinite}
.rr-sign:before{content:"";width:12px;height:12px;border-radius:50%;background:var(--cream)}
@keyframes rr-live{50%{box-shadow:0 0 30px rgba(255,246,239,.7);background:rgba(255,246,239,.15)}}
.rr-label{display:block;margin-top:18px;font-weight:600;color:#ffd4cc}
.rr h1{margin-top:10px;font:400 clamp(58px,9vw,150px)/.92 Righteous;letter-spacing:-.01em}
.rr h1 .ch{display:inline-block;animation:rr-in .6s ease both;animation-delay:calc(var(--i) * 35ms)}@keyframes rr-in{from{opacity:0;transform:translateY(-.4em)}}
.rr-hero p{margin-top:22px;max-width:44ch;color:#ffe2db}
.rr .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:999px;background:var(--cream);color:var(--red);font:400 18px Righteous;text-decoration:none;transition:background .2s}.rr .cta:hover{background:var(--amber);color:var(--black)}.rr .cta-muted{background:rgba(255,255,255,.15);color:#ffe2db;font:400 15px "Exo 2"}
.rr-set{justify-self:center;width:min(100%,500px);padding:24px;border-radius:28px;background:linear-gradient(#3a2618,#2a1a10);box-shadow:inset 0 2px 0 rgba(255,255,255,.15),0 40px 60px -30px rgba(0,0,0,.6)}
.rr-grille{height:110px;border-radius:14px;background:radial-gradient(circle,#1a110a 3px,transparent 3.5px) 0 0/12px 12px,#5a3c26;animation:rr-thump .5s ease-in-out infinite alternate}@keyframes rr-thump{to{filter:brightness(1.15)}}
.rr-dial{position:relative;margin-top:18px;height:70px;border-radius:10px;background:var(--dial);overflow:hidden;box-shadow:inset 0 0 20px rgba(0,0,0,.25)}
.rr-scale{position:absolute;inset:10px 16px auto;display:flex;justify-content:space-between;font:600 12px "Exo 2";color:#6b4e2e}
.rr-ticks{position:absolute;left:16px;right:16px;bottom:10px;height:20px;background:repeating-linear-gradient(90deg,#6b4e2e 0 2px,transparent 2px 12px)}
.rr-needle{position:absolute;top:0;bottom:0;width:3px;background:var(--red);box-shadow:0 0 8px var(--red);animation:rr-tune 4.5s cubic-bezier(.5,0,.3,1) .5s both}
@keyframes rr-tune{0%{left:6%}40%{left:86%}70%{left:54%}100%{left:72%}}
.rr-knobs{display:flex;justify-content:space-between;align-items:center;margin-top:18px}
.rr-knob{width:58px;height:58px;border-radius:50%;background:conic-gradient(#d8c3a0,#8c7350,#d8c3a0,#8c7350,#d8c3a0);box-shadow:0 4px 0 #1a110a;position:relative;animation:rr-turn 4.5s cubic-bezier(.5,0,.3,1) .5s both}
.rr-knob:after{content:"";position:absolute;left:50%;top:6px;width:4px;height:14px;margin-left:-2px;border-radius:2px;background:#2a1a10}
@keyframes rr-turn{from{transform:rotate(-200deg)}}
.rr-freq{font:400 34px Righteous;color:var(--amber);text-shadow:0 0 14px rgba(255,183,3,.6)}
.rr h2{font:400 clamp(42px,6vw,98px)/1 Righteous;max-width:14ch}
.rr-shows{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.rr-list{margin-top:clamp(40px,6vw,70px)}
.rr-s{display:grid;grid-template-columns:110px minmax(0,1fr) minmax(0,1.3fr);gap:26px;align-items:center;padding:26px 0;border-top:3px solid var(--black)}
.rr-time{font:400 26px Righteous;color:var(--red)}
.rr-s h3{font:800 24px/1.15 "Exo 2"}.rr-s p{color:#4a4a4a}
.rr-s img{grid-column:2/-1;width:100%;max-height:240px;object-fit:cover;border-radius:16px}
.rr-inv{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--black);color:var(--cream)}
.rr-inv ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.rr-inv li{padding:30px;border-radius:24px;background:#1e1e1e;border:2px solid #333;transition:border-color .2s}.rr-inv li:hover{border-color:var(--red)}
.rr-inv h3{font:400 24px Righteous;color:var(--amber)}.rr-inv p{margin-top:8px}
.rr-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--dial);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.rr-about>p{font-size:clamp(19px,1.8vw,24px)}.rr-about dl{grid-column:2;margin:0}.rr-about dt{font:400 20px Righteous;color:var(--deep);margin-top:16px}.rr-about dd{margin:2px 0 0}
.rr-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--red);color:var(--cream)}.rr-end h2{margin:0 auto}
.rr footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--black);color:var(--cream)}
@media(max-width:900px){.rr nav{gap:12px;font-size:14px}.rr-hero,.rr-inv ul,.rr-about{grid-template-columns:1fr}.rr-s{grid-template-columns:80px 1fr}.rr-s p,.rr-s img{grid-column:2}.rr-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="rr-hero" aria-labelledby="h"><div><span class="rr-sign" aria-hidden="true">On air</span><span class="rr-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Listen live") + '</div><div class="rr-set" aria-hidden="true"><div class="rr-grille"></div><div class="rr-dial"><span class="rr-scale"><span>88</span><span>92</span><span>96</span><span>100</span><span>104</span><span>108</span></span><span class="rr-ticks"></span><span class="rr-needle"></span></div><div class="rr-knobs"><span class="rr-knob"></span><span class="rr-freq">104.6</span><span class="rr-knob"></span></div></div></section>',
  work: (k) => { const t = ["07:00", "21:00", "10:00"]; return '<section class="rr-shows" id="work"><h2>' + k.h("work", "On the schedule") + '</h2><div class="rr-list">' + k.c.cards.map((x, i) => '<article class="rr-s"><span class="rr-time">' + t[i % 3] + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>"; },
  services: (k) => '<section class="rr-inv" id="services"><h2>' + k.h("services", "Get involved") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="rr-about" id="about"><h2>' + k.h("about", "Above the bakery") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="rr-end" id="contact"><h2>' + k.h("contact", "Tune in.") + '</h2>' + k.cta("Listen live") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

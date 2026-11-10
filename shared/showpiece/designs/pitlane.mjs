export default {
  id: "md-bmw-m",
  root: "ax",
  fonts: "family=Saira+Condensed:ital,wght@0,500;0,800;1,800;1,900&family=Saira:wght@400;600",
  labels: { work: "Lap log", services: "Track days", about: "Team", contact: "Book" },
  intros: {
    work: { title: "Lap log", text: "Recent sessions, recent records, recent smiles." },
    features: { title: "Track days", text: "Bring your car or drive ours. Coaching included either way." },
    studio: { title: "The team", text: null },
    contact: { title: "Book a session", text: "Pick a date, tell us your experience, and we will set up the car." },
  },
  demo: {
    name: "Apex Motorworks", headline: "Find the line.", heroLabel: "Track days and driver coaching",
    bio: "Open track days at three circuits, with instructors in the passenger seat and data on every lap. Beginners welcome. Lap records also welcome.",
    cards: [
      { title: "First-timer session", description: "Twenty laps, two instructors and a video of your best one." },
      { title: "Wet-weather masterclass", description: "A soaked skidpan and a morning of controlled slides." },
      { title: "Club championship round 4", description: "Twelve drivers, one tenth of a second between the top three." },
    ],
    services: [
      { title: "Open pit lane", description: "Bring your own car, run in mixed groups by pace." },
      { title: "Arrive and drive", description: "We supply the car, the helmet and the tyres." },
      { title: "Data coaching", description: "Telemetry from your laps, explained corner by corner." },
    ],
  },
  css: `
@property --s{syntax:"<integer>";initial-value:0;inherits:false}@property --ms{syntax:"<integer>";initial-value:0;inherits:false}
.ax{--asphalt:#17181c;--tarmac:#24262c;--white:#f3f4f6;--blue:#1c69d4;--navy:#0b2a5b;--red:#e3242b;--kerb:#f3f4f6;background:var(--asphalt);color:var(--white);font:400 17px/1.6 Saira,system-ui,sans-serif}
.ax header{position:relative;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.ax .brand{font:italic 900 26px/1 "Saira Condensed";text-transform:uppercase;text-decoration:none;letter-spacing:.01em}
.ax .brand:after{content:"";display:inline-block;width:42px;height:10px;margin-left:10px;vertical-align:middle;transform:skewX(-20deg);background:linear-gradient(90deg,#6cc4ff 0 33%,var(--navy) 33% 66%,var(--red) 66%)}
.ax nav{display:flex;gap:clamp(14px,2.4vw,30px);font:600 15px Saira;text-transform:uppercase;letter-spacing:.04em}.ax nav a{text-decoration:none;opacity:.75}.ax nav a:hover,.ax nav a[aria-current]{opacity:1}
.ax-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:end;padding:40px clamp(18px,4vw,56px) clamp(50px,7vw,90px);overflow:hidden;isolation:isolate}
.ax-livery{position:absolute;top:-20%;bottom:-20%;left:55%;width:34vw;display:flex;gap:2.4vw;transform:skewX(-22deg);z-index:-1;animation:ax-sweep 1.3s cubic-bezier(.7,0,.2,1) both}
.ax-livery i{flex:1}.ax-livery i:nth-child(1){background:#6cc4ff}.ax-livery i:nth-child(2){background:var(--navy)}.ax-livery i:nth-child(3){background:var(--red)}
@keyframes ax-sweep{from{transform:translateX(120vw) skewX(-22deg)}}
.ax-kerb{position:absolute;left:0;right:0;bottom:0;height:14px;z-index:-1;background:repeating-linear-gradient(90deg,var(--red) 0 60px,var(--kerb) 60px 120px);animation:ax-kerb 1.2s linear infinite}@keyframes ax-kerb{to{background-position:-120px 0}}
.ax-label{font:600 15px Saira;text-transform:uppercase;letter-spacing:.14em;color:#9fb4d6}
.ax h1{margin-top:14px;font:italic 900 clamp(84px,17vw,280px)/.82 "Saira Condensed";text-transform:uppercase;letter-spacing:-.01em}
.ax h1 .ch{animation:ax-ch .6s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--i) * 40ms + .9s)}@keyframes ax-ch{from{opacity:0;transform:translateX(-.6em) skewX(-20deg)}}
.ax-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;margin-top:30px}
.ax-row p{max-width:44ch;color:#c9ccd3}
.ax-timer{padding:16px 22px;background:#000;border-left:6px solid var(--red);font:800 clamp(36px,4.6vw,64px)/1 "Saira Condensed";font-variant-numeric:tabular-nums;white-space:nowrap}
.ax-timer small{display:block;font:600 12px Saira;letter-spacing:.14em;text-transform:uppercase;color:#9fb4d6;margin-bottom:6px}
.ax-timer b{font-weight:800;counter-reset:s var(--s);animation:ax-s 2.4s cubic-bezier(.2,.8,.2,1) 1.1s both}.ax-timer b:after{content:"1:" counter(s,decimal-leading-zero)}
.ax-timer i{font-style:normal;color:#6cc4ff;counter-reset:ms var(--ms);animation:ax-ms 2.4s cubic-bezier(.2,.8,.2,1) 1.1s both}.ax-timer i:after{content:"." counter(ms)}
@keyframes ax-s{from{--s:0}to{--s:42}}@keyframes ax-ms{from{--ms:100}to{--ms:318}}
.ax-timer b{--s:42}.ax-timer i{--ms:318}
.ax .cta{display:inline-flex;margin-top:28px;padding:16px 30px;background:var(--red);color:#fff;font:italic 800 20px "Saira Condensed";text-transform:uppercase;letter-spacing:.04em;text-decoration:none;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%);transition:background .2s}.ax .cta:hover{background:var(--blue)}.ax .cta-muted{background:var(--tarmac);font:400 15px Saira;text-transform:none;clip-path:none}
.ax-intro{position:relative;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden;isolation:isolate}.ax-intro .ax-livery{left:68%;width:24vw;opacity:.85}.ax-intro h1{font-size:clamp(70px,12vw,190px)}.ax-intro p{margin-top:20px;max-width:46ch;color:#c9ccd3}
.ax h2{font:italic 900 clamp(48px,7vw,110px)/.88 "Saira Condensed";text-transform:uppercase}
.ax-laps{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--white);color:var(--asphalt)}
.ax-lap{display:grid;grid-template-columns:70px minmax(0,1fr) minmax(0,1.1fr) 220px;gap:24px;align-items:center;padding:26px 0;border-bottom:2px solid #d8dbe1}
.ax-lap .pos{font:italic 900 46px/1 "Saira Condensed";color:var(--blue)}.ax-lap h3{font:italic 800 28px/1 "Saira Condensed";text-transform:uppercase}.ax-lap p{color:#4a4f5a}
.ax-sectors{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.ax-sectors i{height:12px;background:#d8dbe1;position:relative;overflow:hidden}.ax-sectors i:after{content:"";position:absolute;inset:0;transform-origin:left}
.ax-sectors i:nth-child(1):after{background:#a14bd8}.ax-sectors i:nth-child(2):after{background:#2fbf5b}.ax-sectors i:nth-child(3):after{background:#f2c200}
@supports (animation-timeline:view()){.ax-sectors i:after{animation:ax-fill linear both;animation-timeline:view();animation-range:entry 30% cover 45%}.ax-sectors i:nth-child(2):after{animation-range:entry 40% cover 50%}.ax-sectors i:nth-child(3):after{animation-range:entry 50% cover 55%}@keyframes ax-fill{from{transform:scaleX(0)}}}
.ax-board{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ax-board ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,60px)}
.ax-board li{padding:28px;background:#000;border-top:6px solid var(--blue)}.ax-board li:nth-child(2){border-color:#6cc4ff}.ax-board li:nth-child(3){border-color:var(--red)}
.ax-board h3{font:italic 800 32px/1 "Saira Condensed";text-transform:uppercase}.ax-board p{margin-top:10px;color:#b9bdc6}
.ax-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--tarmac);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ax-about>p{font-size:clamp(19px,1.8vw,24px);color:#d6d9df}.ax-about dl{grid-column:2;margin:0}.ax-about dt{font:italic 800 24px "Saira Condensed";text-transform:uppercase;color:#6cc4ff;margin-top:20px}.ax-about dd{margin:4px 0 0;color:#c9ccd3}
.ax-end{position:relative;padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);overflow:hidden;background:repeating-conic-gradient(#202227 0 25%,#1a1b1f 0 50%) 0 0/60px 60px}.ax-end h2{max-width:12ch}
.ax footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#9095a0}
@media(max-width:860px){.ax nav{gap:12px;font-size:12px}.ax .brand:after{display:none}.ax-row,.ax-about,.ax-board ul{grid-template-columns:1fr}.ax-lap{grid-template-columns:50px 1fr;gap:10px 16px}.ax-lap p,.ax-sectors{grid-column:2}.ax-about dl{grid-column:auto}.ax-livery{left:62%;width:50vw}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ax-hero" aria-labelledby="h"><div class="ax-livery" aria-hidden="true"><i></i><i></i><i></i></div><div class="ax-kerb" aria-hidden="true"></div><span class="ax-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="ax-row"><div><p>' + k.E(k.c.bio) + "</p>" + k.cta("Book a track day") + '</div><div class="ax-timer" aria-hidden="true"><small>Best lap today</small><b></b><i></i></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="ax-intro" aria-labelledby="h"><div class="ax-livery" aria-hidden="true"><i></i><i></i><i></i></div><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="ax-laps" id="work"><h2>Lap log</h2>' + k.c.cards.map((x, i) => '<article class="ax-lap"><span class="pos" aria-hidden="true">P' + (i + 1) + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + '</p><div class="ax-sectors" aria-hidden="true"><i></i><i></i><i></i></div></article>').join("") + "</section>",
  services: (k) => '<section class="ax-board" id="services"><h2>Choose your session</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ax-about" id="about"><h2>In the pit lane</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ax-end" id="contact"><h2>Lights out in five.</h2>' + k.cta("Book a track day") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

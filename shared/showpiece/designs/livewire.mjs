export default {
  id: "md-wired",
  root: "lw",
  fonts: "family=Teko:wght@500;700&family=Heebo:wght@400;500;700",
  labels: { work: "Jobs", services: "Services", about: "About", contact: "Book an electrician" },
  demo: {
    name: "Live Wire Electrical", headline: "Lights on. Every time.", heroLabel: "Domestic and commercial electricians",
    bio: "Certified electricians for rewires, fuse boards, EV chargers and the light that has flickered for three years. Clean work, fixed quotes, and we turn up when we say we will.",
    cards: [
      { title: "A full Victorian rewire", description: "Three floors, every socket replaced, plaster made good in ten days." },
      { title: "Home EV charger", description: "Fitted in a morning, with a smart timer for cheap overnight power." },
      { title: "A cafe's new lighting", description: "Warm pendants, dimmable zones and lower bills." },
    ],
    services: [
      { title: "Rewires", description: "Whole homes or single rooms." },
      { title: "Fuse boards", description: "Modern boards with safety switches." },
      { title: "EV chargers", description: "Installed, certified and registered." },
    ],
  },
  css: `
.lw{--navy:#0b1a2e;--board:#0f2742;--trace:#1e4a6e;--volt:#ffe14a;--spark:#7ef9ff;--white:#f3f6fa;--orange:#ff7a1a;background:var(--white);color:var(--navy);font:400 17px/1.65 Heebo,system-ui,sans-serif}
.lw header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--navy);color:var(--white)}
.lw .brand{display:flex;align-items:center;gap:8px;font:700 28px/1 Teko;text-transform:uppercase;letter-spacing:.04em;text-decoration:none}.lw .brand:before{content:"";width:14px;height:22px;background:var(--volt);clip-path:polygon(60% 0,0 55%,45% 55%,30% 100%,100% 40%,55% 40%)}
.lw nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.lw nav a{text-decoration:none}.lw nav a:hover{color:var(--volt)}
.lw-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:var(--board);color:var(--white);overflow:hidden;isolation:isolate}
.lw-hero:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(var(--trace) 1px,transparent 1px) 0 0/40px 40px,linear-gradient(90deg,var(--trace) 1px,transparent 1px) 0 0/40px 40px;opacity:.35}
.lw-label{font:500 22px Teko;letter-spacing:.12em;text-transform:uppercase;color:var(--volt)}
.lw h1{margin-top:8px;font:700 clamp(68px,10vw,170px)/.85 Teko;text-transform:uppercase}
.lw h1 .ch{animation:lw-flick 1.4s steps(1) both;animation-delay:calc(var(--i) * 40ms)}
@keyframes lw-flick{0%{opacity:0}10%{opacity:1}14%{opacity:.2}18%{opacity:1}24%{opacity:.4}30%,100%{opacity:1}}
.lw-hero p{margin-top:20px;max-width:44ch;color:#c2d0de}
.lw .cta{display:inline-flex;margin-top:26px;padding:14px 26px;background:var(--volt);color:var(--navy);font:700 24px/1 Teko;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);transition:background .2s}.lw .cta:hover{background:var(--spark)}.lw .cta-muted{background:var(--trace);color:#c2d0de;font:400 15px Heebo;text-transform:none;letter-spacing:0}
.lw-circuit{position:relative;justify-self:center;width:min(100%,480px);aspect-ratio:1}
.lw-circuit svg{position:absolute;inset:0;width:100%;height:100%}
.lw-circuit .t{fill:none;stroke:var(--trace);stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.lw-circuit .p{fill:none;stroke:var(--spark);stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:40 600;stroke-dashoffset:640;filter:drop-shadow(0 0 6px var(--spark));animation:lw-pulse 2.4s linear infinite;animation-delay:var(--d)}
@keyframes lw-pulse{to{stroke-dashoffset:0}}
.lw-circuit circle{fill:var(--board);stroke:var(--spark);stroke-width:3}
.lw-bulb{position:absolute;left:50%;top:12%;width:30%;aspect-ratio:.75;translate:-50% 0;border-radius:50% 50% 40% 40%/60% 60% 40% 40%;background:radial-gradient(circle at 50% 40%,#fff,var(--volt) 40%,#e6b800);box-shadow:0 0 0 0 rgba(255,225,74,0);animation:lw-glow 2.4s ease-in-out 1s infinite}
.lw-bulb:after{content:"";position:absolute;left:28%;right:28%;bottom:-24%;height:26%;border-radius:0 0 8px 8px;background:repeating-linear-gradient(#9aa6b2 0 5px,#6f7b87 5px 8px)}
@keyframes lw-glow{0%,100%{box-shadow:0 0 30px 10px rgba(255,225,74,.35);filter:brightness(.85)}40%,70%{box-shadow:0 0 90px 40px rgba(255,225,74,.55);filter:brightness(1.1)}}
.lw h2{font:700 clamp(54px,7.6vw,128px)/.88 Teko;text-transform:uppercase;max-width:14ch}
.lw-jobs{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.lw-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.lw-j{position:relative;padding:28px;background:#fff;border:2px solid var(--navy);border-radius:4px}
.lw-j:before{content:"";position:absolute;left:-2px;right:-2px;top:-2px;height:8px;background:linear-gradient(90deg,var(--volt) 0 33%,var(--orange) 33% 66%,var(--spark) 66%)}
.lw-j small{font:500 20px Teko;letter-spacing:.08em;text-transform:uppercase;color:var(--orange)}
.lw-j img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:10px 0 14px}
.lw-j h3{margin-top:4px;font:700 22px/1.2 Heebo}.lw-j p{margin-top:8px;color:#45576b}
.lw-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--navy);color:var(--white)}
.lw-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.lw-svc li{padding:28px;border:1px solid var(--trace);border-radius:4px;transition:box-shadow .3s,border-color .3s}.lw-svc li:hover{border-color:var(--spark);box-shadow:0 0 30px rgba(126,249,255,.2)}
.lw-svc h3{font:700 34px Teko;text-transform:uppercase;color:var(--volt)}.lw-svc p{margin-top:6px;color:#c2d0de}
.lw-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--volt);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.lw-about>p{font-size:clamp(19px,1.8vw,24px)}.lw-about dl{grid-column:2;margin:0}.lw-about dt{font:700 24px Teko;text-transform:uppercase;margin-top:16px}.lw-about dd{margin:2px 0 0}
.lw-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--board);color:var(--white)}.lw-end h2{margin:0 auto}
.lw footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--navy);color:#c2d0de}
@media(max-width:900px){.lw nav{gap:12px;font-size:14px}.lw-hero,.lw-list,.lw-svc ul,.lw-about{grid-template-columns:1fr}.lw-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const P = ["M20 380 H120 V300 H200 V200", "M380 380 H300 V320 H260 V200", "M20 120 H90 V200 H170", "M380 140 H330 V220 H290", "M200 380 V300"]; return '<section class="lw-hero" aria-labelledby="h"><div><span class="lw-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book an electrician") + '</div><div class="lw-circuit" aria-hidden="true"><svg viewBox="0 0 400 400">' + P.map(d => '<path class="t" d="' + d + '"/>').join("") + P.map((d, i) => '<path class="p" style="--d:' + (i * 0.45).toFixed(2) + 's" d="' + d + '"/>').join("") + '<circle cx="20" cy="380" r="8"/><circle cx="380" cy="380" r="8"/><circle cx="20" cy="120" r="8"/><circle cx="380" cy="140" r="8"/><circle cx="200" cy="380" r="8"/></svg><span class="lw-bulb"></span></div></section>'; },
  work: (k) => { const t = ["Rewire", "EV charger", "Lighting"]; return '<section class="lw-jobs" id="work"><h2>Recent jobs</h2><div class="lw-list">' + k.c.cards.map((x, i) => '<article class="lw-j"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="lw-svc" id="services"><h2>What we do</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="lw-about" id="about"><h2>Certified and careful</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="lw-end" id="contact"><h2>Something flickering?</h2>' + k.cta("Book an electrician") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "contactsheet",
  root: "ct",
  fonts: "family=Kode+Mono:wght@400;700&family=Gantari:wght@400;600;800",
  labels: { work: "Stories", services: "Assignments", about: "About", contact: "Contact" },
  demo: {
    name: "Tomas Rivera", headline: "Thirty-six frames at a time.", heroLabel: "Documentary photographer",
    bio: "I shoot long-form stories on film: fishing towns, night markets and the people who keep cities running after dark. Published in magazines and newspapers, printed in my own darkroom.",
    cards: [
      { title: "The night shift", description: "Bakers, nurses and bus drivers, photographed between midnight and six." },
      { title: "Last boats out", description: "Three winters with a fishing fleet of four boats." },
      { title: "Market at dawn", description: "The flower market, from first lorry to last bucket." },
    ],
    services: [
      { title: "Editorial", description: "Assignments for magazines and newspapers." },
      { title: "Long-form", description: "Projects over months, for books and exhibitions." },
      { title: "Darkroom prints", description: "Silver gelatin prints, signed and numbered." },
    ],
  },
  css: `
.ct{--black:#121110;--sheet:#1d1c1a;--paper:#f4f1ea;--red:#e8332a;--amber:#f1a33b;--mute:#8d887e;background:var(--black);color:var(--paper);font:400 17px/1.7 Gantari,system-ui,sans-serif}
.ct header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.ct .brand{font:700 16px/1 "Kode Mono";letter-spacing:.06em;text-transform:uppercase;text-decoration:none}
.ct nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.ct nav a{text-decoration:none;color:var(--mute)}.ct nav a:hover,.ct nav a[aria-current]{color:var(--amber)}
.ct-hero{padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.ct-label{font:400 13px "Kode Mono";letter-spacing:.14em;text-transform:uppercase;color:var(--amber)}
.ct h1{margin-top:12px;max-width:16ch;font:800 clamp(50px,7.4vw,124px)/.95 Gantari;letter-spacing:-.04em}
.ct h1 .ch{animation:ct-in .5s ease both;animation-delay:calc(var(--i) * 20ms)}@keyframes ct-in{from{opacity:0;filter:brightness(4)}}
.ct-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end;margin-top:22px}
.ct-row p{max-width:52ch;color:#cfcac0}
.ct .cta{display:inline-flex;padding:14px 24px;background:var(--amber);color:var(--black);font:700 14px "Kode Mono";text-transform:uppercase;text-decoration:none;transition:background .2s}.ct .cta:hover{background:var(--paper)}.ct .cta-muted{background:#2a2825;color:var(--mute)}
.ct-sheet{position:relative;margin-top:clamp(30px,4vw,50px);padding:18px;background:var(--sheet);border-radius:4px}
.ct-strip{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:20px 6px;margin-bottom:10px;background:radial-gradient(circle,var(--sheet) 3px,transparent 3.5px) 0 4px/18px 12px repeat-x,radial-gradient(circle,var(--sheet) 3px,transparent 3.5px) 0 calc(100% - 4px)/18px 12px repeat-x,#2d2a26;position:relative}
.ct-strip:after{content:attr(data-n);position:absolute;left:10px;bottom:2px;font:400 10px "Kode Mono";color:var(--amber)}
.ct-f{aspect-ratio:1.5;background:var(--g);filter:grayscale(1) contrast(1.1);animation:ct-dev 1.4s ease both;animation-delay:var(--d)}
@keyframes ct-dev{from{opacity:0;filter:grayscale(1) brightness(3)}}
.ct-circle{position:absolute;width:var(--w);height:var(--h);left:var(--x);top:var(--y);border:3px solid var(--red);border-radius:46% 54% 50% 50%/52% 48% 52% 48%;transform:rotate(-4deg);clip-path:inset(0 100% 0 0);animation:ct-mark 1s cubic-bezier(.6,0,.3,1) 2.6s forwards}
@keyframes ct-mark{to{clip-path:inset(0 0 0 0)}}
.ct-loupe{position:absolute;right:6%;top:-24px;width:clamp(90px,10vw,130px);aspect-ratio:1;border-radius:50%;border:10px solid #0b0b0a;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.35),transparent 50%);box-shadow:0 20px 30px -10px #000;animation:ct-loupe 8s ease-in-out 3s infinite alternate}
@keyframes ct-loupe{to{transform:translate(-40vw,120px)}}
.ct h2{font:800 clamp(42px,6vw,98px)/.95 Gantari;letter-spacing:-.04em;max-width:14ch}
.ct-stories{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper);color:var(--black)}
.ct-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px)}
.ct-s{padding:14px 14px 22px;background:#fff;box-shadow:0 20px 30px -24px rgba(0,0,0,.5)}
.ct-print{display:block;aspect-ratio:1.25;background:var(--g);filter:grayscale(1);border:10px solid #fff;outline:1px solid #ddd}
.ct-s img{width:100%;aspect-ratio:1.25;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.ct-s small{display:block;margin-top:14px;font:400 12px "Kode Mono";color:var(--red)}
.ct-s h3{margin-top:4px;font:800 24px/1.15 Gantari}.ct-s p{margin-top:6px;color:#4d4a44}
.ct-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ct-svc ul{margin-top:clamp(36px,5vw,56px)}
.ct-svc li{display:grid;grid-template-columns:120px minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:22px 0;border-top:1px solid #2e2b27}
.ct-svc li:before{content:"F/" attr(data-f);font:400 14px "Kode Mono";color:var(--amber)}
.ct-svc h3{font:800 24px Gantari}.ct-svc p{color:#cfcac0}
.ct-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#2a0d0b;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ct-about>p{font-size:clamp(19px,1.8vw,24px);color:#f3d7cf}.ct-about dl{grid-column:2;margin:0}.ct-about dt{font:400 13px "Kode Mono";text-transform:uppercase;color:var(--red);margin-top:18px}.ct-about dd{margin:2px 0 0;color:#f3d7cf}
.ct-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ct-end h2{margin:0 auto 30px}
.ct footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 12px "Kode Mono";color:var(--mute);border-top:1px solid #2e2b27}
@media(max-width:900px){.ct nav{gap:12px;font-size:14px}.ct-row,.ct-list,.ct-about{grid-template-columns:1fr}.ct-strip{grid-template-columns:repeat(3,1fr)}.ct-strip .ct-f:nth-child(n+4){display:none}.ct-svc li{grid-template-columns:1fr}.ct-about dl{grid-column:auto}.ct-loupe{display:none}}
@media (prefers-reduced-motion:reduce){.ct-circle{clip-path:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const G = ["linear-gradient(160deg,#ddd,#555)", "radial-gradient(circle at 30% 40%,#eee 0 18%,#444 60%)", "linear-gradient(#bbb 0 50%,#333 50%)", "linear-gradient(90deg,#222,#999 40%,#333)", "radial-gradient(circle at 70% 30%,#fff 0 10%,#666 40%,#222)", "linear-gradient(200deg,#eee,#666 70%)"]; let n = 0; const strip = (s, o) => '<div class="ct-strip" data-n="' + s + '">' + G.map((g, i) => '<span class="ct-f" style="--g:' + G[(i + o) % 6] + ";--d:" + (0.2 + (n++) * 0.08).toFixed(2) + 's"></span>').join("") + "</div>"; return '<section class="ct-hero" aria-labelledby="h"><span class="ct-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="ct-row"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Contact") + '</div><div class="ct-sheet" aria-hidden="true">' + strip("12A", 0) + strip("18A", 2) + strip("24A", 4) + '<span class="ct-circle" style="--x:calc(33.3% + 8px);--y:calc(33.3% + 10px);--w:calc(16.6% - 2px);--h:calc(33.3% - 26px)"></span><span class="ct-loupe"></span></div></section>'; },
  work: (k) => { const g = ["linear-gradient(160deg,#ddd,#555)", "radial-gradient(circle at 30% 40%,#eee 0 18%,#444 60%)", "linear-gradient(200deg,#eee,#666 70%)"]; return '<section class="ct-stories" id="work"><h2>Stories</h2><div class="ct-list">' + k.c.cards.map((x, i) => '<article class="ct-s">' + (k.photo(i) || '<span class="ct-print" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<small>Roll " + (i * 7 + 4) + ", frame " + (i * 5 + 12) + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => { const f = ["2.8", "8", "11"]; return '<section class="ct-svc" id="services"><h2>Assignments</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li data-f="' + f[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="ct-about" id="about"><h2>In the darkroom</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ct-end" id="contact"><h2>Got a story worth a roll of film?</h2>' + k.cta("Contact") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

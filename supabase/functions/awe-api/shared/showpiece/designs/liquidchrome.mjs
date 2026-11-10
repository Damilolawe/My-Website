export default {
  id: "acidchrome",
  root: "ac",
  fonts: "family=Tilt+Warp&family=Space+Grotesk:wght@400;500;700",
  labels: { work: "Work", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Nova Reign", headline: "Chrome dreams, rendered.", heroLabel: "3D artist and motion designer",
    bio: "I make liquid metal, impossible materials and short loops for album covers, fashion drops and stage screens. Everything is rendered, nothing is real, and everyone asks how.",
    cards: [
      { title: "Album cover, liquid silver", description: "A chrome figure melting into a puddle of light, for a debut record." },
      { title: "Stage visuals, world tour", description: "Forty minutes of loops for an arena screen 30 metres wide." },
      { title: "Sneaker drop teaser", description: "A ten-second loop that hit a million views in a day." },
    ],
    services: [
      { title: "3D stills", description: "Covers, posters and key art." },
      { title: "Motion loops", description: "Social, stage and screens." },
      { title: "Art direction", description: "Look development for launches." },
    ],
  },
  css: `
.ac{--onyx:#060608;--panel:#101016;--white:#f5f6ff;--mute:#8b8fa8;--holo:conic-gradient(from 0deg,#ff9be6,#9bf6ff,#c6ff9b,#ffe29b,#ff9be6);background:var(--onyx);color:var(--white);font:400 17px/1.65 "Space Grotesk",system-ui,sans-serif}
.ac header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.ac .brand{font:400 22px/1 "Tilt Warp";text-decoration:none;background:linear-gradient(90deg,#fff,#9bf6ff,#ff9be6,#fff);-webkit-background-clip:text;background-clip:text;color:transparent}
.ac nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.ac nav a{text-decoration:none;color:var(--mute)}.ac nav a:hover,.ac nav a[aria-current]{color:var(--white)}
.ac-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:center;justify-items:center;text-align:center;padding:60px clamp(18px,4vw,56px);overflow:hidden;isolation:isolate}
.ac-blob{position:absolute;left:50%;top:50%;width:min(70vw,640px);aspect-ratio:1;translate:-50% -50%;z-index:-1;border-radius:42% 58% 63% 37%/45% 38% 62% 55%;background:radial-gradient(circle at 30% 25%,#fff 0 6%,transparent 18%),radial-gradient(circle at 70% 75%,rgba(0,0,0,.6),transparent 50%),linear-gradient(135deg,#e9ecf5,#5b5f70 30%,#f8f9ff 46%,#3a3d4a 60%,#cfd3e0 78%,#6b6f80);box-shadow:inset 0 0 60px rgba(255,255,255,.4),0 0 120px rgba(155,246,255,.25);animation:ac-morph 12s ease-in-out infinite,ac-spin 30s linear infinite}
.ac-blob:after{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--holo);mix-blend-mode:color;opacity:.55;animation:ac-hue 8s linear infinite}
@keyframes ac-morph{0%,100%{border-radius:42% 58% 63% 37%/45% 38% 62% 55%}33%{border-radius:63% 37% 40% 60%/55% 62% 38% 45%}66%{border-radius:38% 62% 56% 44%/36% 54% 46% 64%}}
@keyframes ac-spin{to{rotate:360deg}}
@keyframes ac-hue{to{filter:hue-rotate(360deg)}}
.ac-drop{position:absolute;width:var(--s);aspect-ratio:1;left:var(--x);top:var(--y);z-index:-1;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff 0 10%,#9aa0b8 40%,#2b2e3a);animation:ac-float var(--t) ease-in-out infinite alternate}
@keyframes ac-float{to{transform:translate(20px,-30px)}}
.ac-label{padding:6px 14px;border-radius:999px;background:rgba(6,6,8,.6);font-weight:500;letter-spacing:.24em;text-transform:uppercase;font-size:13px;color:#fff}
.ac h1{margin-top:16px;max-width:12ch;font:400 clamp(56px,9vw,156px)/.92 "Tilt Warp";letter-spacing:-.02em;color:var(--onyx);-webkit-text-stroke:0;text-shadow:0 1px 0 rgba(255,255,255,.4);mix-blend-mode:normal;background:linear-gradient(180deg,#fff 0 45%,#a8adc2 50%,#f3f4fb 70%,#7d8198);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 6px 20px rgba(0,0,0,.6))}
.ac-hero p{margin-top:22px;max-width:48ch;padding:14px 20px;border-radius:18px;background:rgba(6,6,8,.55);color:#f1f2fa}
.ac .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:999px;background:var(--holo);color:var(--onyx);font-weight:700;text-decoration:none;box-shadow:0 0 40px rgba(255,155,230,.4);transition:filter .3s}.ac .cta:hover{filter:hue-rotate(90deg)}.ac .cta-muted{background:var(--panel);color:var(--mute);box-shadow:none}
.ac h2{font:400 clamp(44px,6.4vw,104px)/.95 "Tilt Warp";max-width:14ch;background:linear-gradient(90deg,#fff,#9bf6ff 40%,#ff9be6 70%,#fff);-webkit-background-clip:text;background-clip:text;color:transparent}
.ac-work{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ac-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.ac-w{position:relative;padding:2px;border-radius:24px;background:var(--holo)}
.ac-w>div{height:100%;padding:24px;border-radius:22px;background:var(--panel)}
.ac-orb{display:block;width:60%;aspect-ratio:1;margin:0 auto 20px;border-radius:var(--r);background:radial-gradient(circle at 30% 25%,#fff 0 8%,transparent 20%),linear-gradient(135deg,#e9ecf5,#5b5f70 35%,#f8f9ff 50%,#3a3d4a 70%,#cfd3e0)}
.ac-w img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:16px;margin-bottom:18px}
.ac-w h3{font:700 22px/1.2 "Space Grotesk"}.ac-w p{margin-top:8px;color:#a9adc5}
.ac-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.ac-svc ul{margin-top:clamp(36px,5vw,56px)}
.ac-svc li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;padding:24px 0;border-top:1px solid #23232e}
.ac-svc h3{font:400 28px "Tilt Warp"}.ac-svc p{color:#b9bcd6}
.ac-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:linear-gradient(135deg,#e9ecf5,#bfc3d2 40%,#f8f9ff 60%,#9ea3b6);color:var(--onyx);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ac-about h2{background:none;color:var(--onyx)}.ac-about>p{font-size:clamp(19px,1.8vw,24px)}.ac-about dl{grid-column:2;margin:0}.ac-about dt{font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:13px;margin-top:18px}.ac-about dd{margin:2px 0 0}
.ac-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ac-end h2{margin:0 auto}
.ac footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid #1a1a22}
@media(max-width:900px){.ac nav{gap:12px;font-size:14px}.ac-list,.ac-about,.ac-svc li{grid-template-columns:1fr}.ac-about dl{grid-column:auto}.ac-blob{width:110vw}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const D = [["12%", "18%", "60px", "6s"], ["80%", "24%", "36px", "7s"], ["18%", "74%", "28px", "5s"], ["84%", "70%", "70px", "8s"]]; return '<section class="ac-hero" aria-labelledby="h"><span class="ac-blob" aria-hidden="true"></span>' + D.map(d => '<span class="ac-drop" aria-hidden="true" style="--x:' + d[0] + ";--y:" + d[1] + ";--s:" + d[2] + ";--t:" + d[3] + '"></span>').join("") + '<span class="ac-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.E(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a project") + "</section>"; },
  work: (k) => { const r = ["50%", "42% 58% 63% 37%/45% 38% 62% 55%", "30%"]; return '<section class="ac-work" id="work"><h2>' + k.h("work", "Selected work") + '</h2><div class="ac-list">' + k.c.cards.map((x, i) => '<article class="ac-w"><div>' + (k.photo(i) || '<span class="ac-orb" aria-hidden="true" style="--r:' + r[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ac-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ac-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ac-end" id="contact"><h2>' + k.h("contact", "Let us make something impossible.") + '</h2>' + k.cta("Start a project") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

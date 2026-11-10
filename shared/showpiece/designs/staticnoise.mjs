export default {
  id: "signal",
  root: "sn",
  fonts: "family=Rubik+Mono+One&family=IBM+Plex+Sans:wght@400;500;700",
  labels: { work: "Projects", services: "Services", about: "About", contact: "Say hello" },
  demo: {
    name: "Kit Marlowe", headline: "Cut through the noise.", heroLabel: "Graphic designer and art director",
    bio: "I make identities, posters and campaigns for music, culture and anyone tired of looking like everyone else. Ten years in studios, now independent, working with small teams who like to be brave.",
    cards: [
      { title: "A festival identity", description: "Three days, 60 bands and a logo that changed shape every hour." },
      { title: "Record sleeves", description: "Twelve covers for an independent label, all screen-printed." },
      { title: "A city bike campaign", description: "Posters on 400 bus stops, and a 30 percent rise in rentals." },
    ],
    services: [
      { title: "Identity", description: "Logos, type and the rules that hold them together." },
      { title: "Campaigns", description: "Posters, social and outdoor." },
      { title: "Art direction", description: "Shoots, motion and launches." },
    ],
  },
  css: `
.sn{--black:#0b0b0b;--white:#f2f2f2;--red:#ff2a2a;--green:#2aff8a;--blue:#2a6bff;--mute:#8a8a8a;background:var(--white);color:var(--black);font:400 17px/1.65 "IBM Plex Sans",system-ui,sans-serif}
.sn header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--black);color:var(--white)}
.sn .brand{font:400 16px/1 "Rubik Mono One";text-decoration:none}
.sn nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.sn nav a{text-decoration:none}.sn nav a:hover{color:var(--red)}
.sn-hero{position:relative;min-height:calc(100svh - 64px);display:grid;align-content:center;padding:60px clamp(18px,4vw,56px);background:var(--black);color:var(--white);overflow:hidden;isolation:isolate}
.sn-static{position:absolute;inset:-50%;z-index:-1;background:repeating-radial-gradient(circle at 17% 32%,#fff 0 1px,transparent 1px 3px),repeating-radial-gradient(circle at 73% 61%,#888 0 1px,transparent 1px 4px),repeating-radial-gradient(circle at 41% 87%,#bbb 0 1px,transparent 1px 2px);opacity:.22;animation:sn-noise .2s steps(3) infinite,sn-tune 4s ease 1s forwards}
@keyframes sn-noise{33%{transform:translate(-3%,2%)}66%{transform:translate(2%,-3%)}}
@keyframes sn-tune{to{opacity:.05}}
.sn-bars{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#c0c0c0 0 14.28%,#c0c000 0 28.57%,#00c0c0 0 42.85%,#00c000 0 57.14%,#c000c0 0 71.42%,#c00000 0 85.71%,#0000c0 0);opacity:0;animation:sn-bars 4s steps(1) 1s forwards}
@keyframes sn-bars{0%{opacity:0}10%{opacity:.25}14%{opacity:0}20%{opacity:.12}24%,100%{opacity:0}}
.sn-label{font:500 14px "IBM Plex Sans";letter-spacing:.18em;text-transform:uppercase;color:var(--green)}
.sn h1{position:relative;margin-top:18px;font:400 clamp(48px,8vw,138px)/.95 "Rubik Mono One";letter-spacing:-.04em;text-transform:uppercase}
.sn h1 .ch{display:inline-block;animation:sn-in .6s steps(4) both;animation-delay:calc(var(--i) * 35ms)}@keyframes sn-in{0%{opacity:0;transform:translateX(-.3em);text-shadow:-6px 0 var(--red),6px 0 var(--blue)}100%{opacity:1}}
.sn h1{text-shadow:-3px 0 var(--red),3px 0 var(--blue);animation:sn-glitch 5s steps(1) 2s infinite}
@keyframes sn-glitch{0%,92%,100%{text-shadow:-3px 0 var(--red),3px 0 var(--blue);transform:none}93%{text-shadow:-10px 0 var(--red),10px 0 var(--blue);transform:skewX(-8deg)}95%{text-shadow:6px 0 var(--red),-6px 0 var(--green);transform:translateX(6px)}}
.sn-hero p{margin-top:24px;max-width:46ch;color:#c6c6c6}
.sn .cta{justify-self:start;display:inline-flex;margin-top:28px;padding:16px 26px;background:var(--white);color:var(--black);font:400 14px "Rubik Mono One";text-transform:uppercase;text-decoration:none;box-shadow:-4px 0 0 var(--red),4px 0 0 var(--blue);transition:box-shadow .2s}.sn .cta:hover{box-shadow:-8px 0 0 var(--red),8px 0 0 var(--blue)}.sn .cta-muted{background:#222;color:var(--mute);box-shadow:none;font:400 15px "IBM Plex Sans";text-transform:none}
.sn-scan{position:absolute;left:0;right:0;height:140px;z-index:-1;background:linear-gradient(transparent,rgba(255,255,255,.07),transparent);animation:sn-scan 5s linear infinite}@keyframes sn-scan{from{top:-140px}to{top:100%}}
.sn h2{font:400 clamp(40px,6vw,96px)/.95 "Rubik Mono One";letter-spacing:-.04em;text-transform:uppercase;max-width:14ch}
.sn-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sn-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:clamp(40px,6vw,70px);background:var(--black);border:4px solid var(--black)}
.sn-p{padding:28px;background:var(--white);transition:background .2s,color .2s}.sn-p:hover{background:var(--black);color:var(--white)}
.sn-p small{font:400 12px "Rubik Mono One";color:var(--red)}
.sn-p img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:16px 0;filter:grayscale(1) contrast(1.3)}
.sn-p:hover img{filter:none}
.sn-p h3{margin-top:10px;font:700 24px/1.15 "IBM Plex Sans"}.sn-p p{margin-top:8px}
.sn-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--red);color:var(--black)}
.sn-svc ul{margin-top:clamp(36px,5vw,56px)}
.sn-svc li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;padding:24px 0;border-top:4px solid var(--black)}
.sn-svc h3{font:400 24px "Rubik Mono One";text-transform:uppercase}
.sn-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sn-about>p{font-size:clamp(19px,1.8vw,24px)}.sn-about dl{grid-column:2;margin:0}.sn-about dt{font:400 13px "Rubik Mono One";color:var(--blue);margin-top:18px}.sn-about dd{margin:2px 0 0}
.sn-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--black);color:var(--white)}.sn-end h2{margin:0 auto;text-shadow:-3px 0 var(--red),3px 0 var(--blue)}
.sn footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--black);color:var(--mute);border-top:1px solid #222}
@media(max-width:900px){.sn nav{gap:12px;font-size:14px}.sn-list,.sn-about,.sn-svc li{grid-template-columns:1fr}.sn-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.sn-static{opacity:.05}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="sn-hero" aria-labelledby="h"><span class="sn-static" aria-hidden="true"></span><span class="sn-bars" aria-hidden="true"></span><span class="sn-scan" aria-hidden="true"></span><span class="sn-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Say hello") + "</section>",
  work: (k) => '<section class="sn-proj" id="work"><h2>Selected projects</h2><div class="sn-list">' + k.c.cards.map((x, i) => '<article class="sn-p"><small>CH ' + String(i + 1).padStart(2, "0") + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="sn-svc" id="services"><h2>What I do</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="sn-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sn-end" id="contact"><h2>Loud ideas welcome.</h2>' + k.cta("Say hello") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

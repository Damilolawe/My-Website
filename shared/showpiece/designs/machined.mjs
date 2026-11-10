export default {
  id: "liquidmetal",
  root: "lm",
  fonts: "family=Syncopate:wght@400;700&family=Manrope:wght@400;500;700",
  labels: { work: "Objects", services: "Services", about: "About", contact: "Commission" },
  demo: {
    name: "Theo Brandt", headline: "Shaped from solid.", heroLabel: "Industrial designer",
    bio: "I design objects people keep for decades: kitchen tools, lamps and hand-held devices, machined from aluminium and steel. From the first sketch to the factory floor.",
    cards: [
      { title: "Halo desk lamp", description: "One aluminium billet, no visible screws, a light that dims with a twist." },
      { title: "Field radio", description: "A rugged radio for mountain huts, drop tested from two metres." },
      { title: "Pepper mill No. 4", description: "Knurled grip, ceramic burr, made to outlast the kitchen." },
    ],
    services: [
      { title: "Product design", description: "Concept, form and engineering handover." },
      { title: "Prototyping", description: "Machined and printed models you can hold." },
      { title: "Manufacturing", description: "Finding and managing the right factory." },
    ],
  },
  css: `
.lm{--g0:#0d0e10;--g1:#17191c;--g2:#24272b;--steel:#a9b0b8;--chrome:#e8ecf0;--blue:#7fb3ff;--mute:#7c838b;background:var(--g0);color:var(--chrome);font:400 17px/1.7 Manrope,system-ui,sans-serif}
.lm header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);border-bottom:1px solid var(--g2)}
.lm .brand{font:700 15px/1 Syncopate;letter-spacing:.2em;text-transform:uppercase;text-decoration:none}
.lm nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:15px}.lm nav a{text-decoration:none;color:var(--mute)}.lm nav a:hover,.lm nav a[aria-current]{color:var(--chrome)}
.lm-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.lm-label{font:400 12px Syncopate;letter-spacing:.24em;text-transform:uppercase;color:var(--blue)}
.lm h1{margin-top:18px;font:700 clamp(44px,6.6vw,110px)/1 Syncopate;text-transform:uppercase;letter-spacing:-.02em;background:linear-gradient(100deg,#6f7780 0 30%,#fff 45%,#8a929b 55%,#d9dee3 70%,#6f7780) 0 0/250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lm-sheen 5s ease-in-out infinite}
@keyframes lm-sheen{0%,100%{background-position:100% 0}50%{background-position:0 0}}
.lm-hero p{margin-top:24px;max-width:44ch;color:#b5bcc4}
.lm .cta{display:inline-flex;margin-top:28px;padding:15px 28px;border-radius:999px;background:linear-gradient(#f4f6f8,#b9c0c7);color:var(--g0);font:700 14px Manrope;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;box-shadow:inset 0 1px 0 #fff,0 10px 30px -10px rgba(127,179,255,.5);transition:filter .2s}.lm .cta:hover{filter:brightness(1.08)}.lm .cta-muted{background:var(--g2);color:var(--mute);box-shadow:none}
.lm-puck{position:relative;justify-self:center;width:min(100%,420px);aspect-ratio:1;border-radius:50%;background:conic-gradient(from 0deg,#2a2e33,#cfd5db,#3a3f45,#f0f3f6,#2a2e33,#aab1b8,#3a3f45,#e0e5ea,#2a2e33);box-shadow:0 50px 80px -40px #000,inset 0 0 0 2px rgba(255,255,255,.2);animation:lm-turn 18s linear infinite}
@keyframes lm-turn{to{transform:rotate(360deg)}}
.lm-puck:before{content:"";position:absolute;inset:10%;border-radius:50%;background:repeating-radial-gradient(circle,#1d2024 0 1px,#2a2e33 1px 3px);box-shadow:inset 0 6px 14px rgba(0,0,0,.7),0 1px 0 rgba(255,255,255,.25)}
.lm-puck:after{content:"";position:absolute;inset:34%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#9aa2aa 40%,#3a3f45);box-shadow:0 0 40px rgba(127,179,255,.35)}
.lm-glare{position:absolute;inset:0;border-radius:50%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.35) 50%,transparent 60%);background-size:300% 100%;mix-blend-mode:screen;animation:lm-glare 4s ease-in-out infinite;pointer-events:none}
@keyframes lm-glare{from{background-position:100% 0}to{background-position:-100% 0}}
.lm-wrap{position:relative;justify-self:center;width:min(100%,420px)}
.lm-led{position:absolute;right:6%;top:8%;width:12px;height:12px;border-radius:50%;background:var(--blue);box-shadow:0 0 16px var(--blue);animation:lm-led 2s ease-in-out infinite alternate}@keyframes lm-led{to{opacity:.3}}
.lm h2{font:700 clamp(32px,4.6vw,76px)/1.05 Syncopate;text-transform:uppercase;letter-spacing:-.02em;max-width:16ch}
.lm-obj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--g1)}
.lm-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;margin-top:clamp(40px,6vw,70px);background:var(--g2);border-radius:20px;overflow:hidden}
.lm-o{padding:30px;background:linear-gradient(160deg,var(--g1),var(--g0));transition:background .3s}.lm-o:hover{background:linear-gradient(160deg,#20242a,var(--g1))}
.lm-o small{font:400 11px Syncopate;letter-spacing:.2em;color:var(--blue)}
.lm-shape{display:block;width:60%;aspect-ratio:1;margin:22px auto;border-radius:var(--r);background:linear-gradient(135deg,#f0f3f6,#6f7780 50%,#d9dee3);box-shadow:0 30px 30px -24px #000,inset 0 1px 0 #fff}
.lm-o img{width:100%;aspect-ratio:1;object-fit:cover;margin:18px 0;border-radius:12px;filter:grayscale(.8)}
.lm-o h3{font:700 22px/1.2 Manrope}.lm-o p{margin-top:8px;color:#9aa1a9}
.lm-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.lm-svc ul{margin-top:clamp(36px,5vw,56px)}
.lm-svc li{display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:24px 0;border-top:1px solid var(--g2)}
.lm-svc li:before{content:"";width:40px;height:2px;background:linear-gradient(90deg,var(--steel),transparent);align-self:center}
.lm-svc h3{font:700 16px Syncopate;text-transform:uppercase;letter-spacing:.06em}.lm-svc p{color:#b5bcc4}
.lm-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:linear-gradient(180deg,#d9dee3,#a9b0b8);color:var(--g0);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.lm-about>p{font-size:clamp(19px,1.8vw,24px)}.lm-about dl{grid-column:2;margin:0}.lm-about dt{font:700 12px Syncopate;letter-spacing:.16em;text-transform:uppercase;margin-top:18px}.lm-about dd{margin:2px 0 0}
.lm-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.lm-end h2{margin:0 auto}
.lm footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;color:var(--mute);border-top:1px solid var(--g2)}
@media(max-width:900px){.lm nav{gap:12px;font-size:13px}.lm-hero,.lm-list,.lm-about{grid-template-columns:1fr}.lm-svc li{grid-template-columns:1fr}.lm-svc li:before{display:none}.lm-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="lm-hero" aria-labelledby="h"><div><span class="lm-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.E(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Commission") + '</div><div class="lm-wrap" aria-hidden="true"><div class="lm-puck"></div><span class="lm-glare"></span><span class="lm-led"></span></div></section>',
  work: (k) => { const r = ["50%", "24%", "50% 50% 12px 12px"]; return '<section class="lm-obj" id="work"><h2>' + k.h("work", "Objects") + '</h2><div class="lm-list">' + k.c.cards.map((x, i) => '<article class="lm-o"><small>OBJ ' + String(i + 1).padStart(3, "0") + "</small>" + (k.photo(i) || '<span class="lm-shape" aria-hidden="true" style="--r:' + r[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="lm-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="lm-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="lm-end" id="contact"><h2>' + k.h("contact", "Let us make something that lasts.") + '</h2>' + k.cta("Commission") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

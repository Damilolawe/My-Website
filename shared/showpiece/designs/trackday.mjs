export default {
  id: "nike",
  root: "sk",
  fonts: "family=Saira+Extra+Condensed:wght@700;900&family=Archivo:wght@400;600;800",
  labels: { work: "Collection", services: "Services", about: "About", contact: "Shop" },
  demo: {
    name: "Stride Athletics", headline: "Every mile counts.", heroLabel: "Running shoes and kit",
    bio: "Shoes and kit for runners of every pace, designed with a club of 400 runners who test everything before it reaches the shop. Free gait analysis, and free returns if the fit is wrong.",
    cards: [
      { title: "Tempo 4", description: "A light daily trainer with a springy foam that lasts 800 km." },
      { title: "Trail Ridge", description: "Grip for mud, rock and the hill you always walk up." },
      { title: "Long Run jacket", description: "Packs into its own pocket. Reflective all over." },
    ],
    services: [
      { title: "Gait analysis", description: "Ten minutes on a treadmill, free." },
      { title: "Run club", description: "Tuesdays and Saturdays, all paces." },
      { title: "Shoe recycling", description: "Old pairs turned into running tracks." },
    ],
  },
  css: `
@property --km{syntax:"<integer>";initial-value:0;inherits:false}
.sk{--track:#d4502c;--lane:#f5f1ea;--ink:#0d0d0d;--volt:#e4ff3a;--grey:#efefec;--mute:#6c6c68;background:var(--grey);color:var(--ink);font:400 17px/1.6 Archivo,system-ui,sans-serif}
.sk header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--ink);color:var(--grey)}
.sk .brand{font:900 30px/1 "Saira Extra Condensed";text-transform:uppercase;letter-spacing:.02em;font-style:italic;text-decoration:none}
.sk nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.sk nav a{text-decoration:none}.sk nav a:hover{color:var(--volt)}
.sk-hero{position:relative;min-height:calc(100svh - 62px);display:grid;align-content:end;padding:60px clamp(18px,4vw,56px) clamp(40px,6vw,70px);background:var(--track);color:var(--lane);overflow:hidden;isolation:isolate}
.sk-lanes{position:absolute;inset:-20% -10%;z-index:-1;background:repeating-linear-gradient(0deg,transparent 0 12.2%,var(--lane) 12.2% 12.6%);transform:perspective(600px) rotateX(55deg);transform-origin:50% 100%}
.sk-lanes:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 120px,rgba(245,241,234,.2) 120px 124px);animation:sk-run .6s linear infinite}
@keyframes sk-run{to{background-position:-124px 0}}
.sk-streak{position:absolute;left:0;top:var(--y);z-index:-1;width:30%;height:4px;background:linear-gradient(90deg,transparent,var(--volt));animation:sk-zip var(--t) linear infinite;animation-delay:var(--d)}
@keyframes sk-zip{from{transform:translateX(-100%)}to{transform:translateX(400%)}}
.sk-label{font:800 14px Archivo;letter-spacing:.14em;text-transform:uppercase}
.sk h1{margin-top:10px;font:900 clamp(96px,17vw,300px)/.8 "Saira Extra Condensed";text-transform:uppercase;font-style:italic;letter-spacing:-.01em}
.sk h1 .ch{display:inline-block;animation:sk-in .5s cubic-bezier(.2,1.2,.4,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes sk-in{from{opacity:0;transform:translateX(1.4em) skewX(-20deg)}}
.sk-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:30px;align-items:end;margin-top:22px}
.sk-row p{max-width:44ch}
.sk-km{font:900 clamp(54px,6vw,90px)/1 "Saira Extra Condensed";color:var(--volt);counter-reset:k var(--km);animation:sk-km 3s ease-out .6s both;--km:42}
.sk-km:before{content:counter(k) " km"}
.sk-km small{display:block;font:600 12px Archivo;letter-spacing:.14em;text-transform:uppercase;color:var(--lane)}
@keyframes sk-km{from{--km:0}}
.sk .cta{display:inline-flex;padding:18px 34px;border-radius:999px;background:var(--lane);color:var(--ink);font:800 16px Archivo;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;transition:background .2s}.sk .cta:hover{background:var(--volt)}.sk .cta-muted{background:rgba(0,0,0,.2);color:var(--lane);font:600 14px Archivo;text-transform:none}
.sk h2{font:900 clamp(64px,10vw,170px)/.82 "Saira Extra Condensed";text-transform:uppercase;font-style:italic;max-width:12ch}
.sk-coll{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sk-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.sk-p{position:relative;padding:22px;background:#fff;overflow:hidden}
.sk-p small{font:800 13px Archivo;text-transform:uppercase;letter-spacing:.1em;color:var(--track)}
.sk-shoe{position:relative;display:block;height:200px;margin:12px 0;background:var(--grey)}
.sk-shoe:before{content:"";position:absolute;left:12%;right:10%;bottom:22%;height:38%;border-radius:40% 70% 20% 20%/80% 90% 20% 20%;background:var(--c);transform:rotate(-8deg);transition:transform .4s}
.sk-shoe:after{content:"";position:absolute;left:10%;right:8%;bottom:16%;height:12%;border-radius:0 0 30px 30px;background:var(--ink);transform:rotate(-8deg);transition:transform .4s}
.sk-p:hover .sk-shoe:before,.sk-p:hover .sk-shoe:after{transform:rotate(-14deg) translateY(-14px)}
.sk-p img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:12px 0}
.sk-p h3{font:900 36px/1 "Saira Extra Condensed";text-transform:uppercase;font-style:italic}.sk-p p{margin-top:6px;color:#4a4a47}
.sk-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--grey)}
.sk-svc ul{margin-top:clamp(36px,5vw,56px)}
.sk-svc li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;padding:22px 0;border-top:2px solid #2a2a2a}
.sk-svc h3{font:900 40px/1 "Saira Extra Condensed";text-transform:uppercase;font-style:italic;color:var(--volt)}
.sk-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--volt);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sk-about>p{font-size:clamp(19px,1.8vw,24px)}.sk-about dl{grid-column:2;margin:0}.sk-about dt{font:800 14px Archivo;text-transform:uppercase;letter-spacing:.1em;margin-top:16px}.sk-about dd{margin:2px 0 0}
.sk-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--track);color:var(--lane)}.sk-end .cta{margin-top:30px}
.sk footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:600;background:var(--ink);color:var(--grey)}
@media(max-width:900px){.sk nav{gap:12px;font-size:14px}.sk-row,.sk-list,.sk-about,.sk-svc li{grid-template-columns:1fr}.sk-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="sk-hero" aria-labelledby="h"><span class="sk-lanes" aria-hidden="true"></span>' + [["18%", "1.4s", "0s"], ["34%", "1.1s", "-.4s"], ["52%", "1.7s", "-.9s"]].map(s => '<span class="sk-streak" aria-hidden="true" style="--y:' + s[0] + ";--t:" + s[1] + ";--d:" + s[2] + '"></span>').join("") + '<span class="sk-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="sk-row"><p>' + k.E(k.c.bio) + '</p><div class="sk-km" aria-hidden="true"><small>Club miles this week</small></div>' + k.cta("Shop the collection") + "</div></section>",
  work: (k) => { const c = ["var(--volt)", "var(--track)", "#3a6df0"], t = ["Road", "Trail", "Kit"]; return '<section class="sk-coll" id="work"><h2>' + k.h("work", "The collection") + '</h2><div class="sk-list">' + k.c.cards.map((x, i) => '<article class="sk-p"><small>' + t[i % 3] + "</small>" + (k.photo(i) || '<span class="sk-shoe" aria-hidden="true" style="--c:' + c[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="sk-svc" id="services"><h2>' + k.h("services", "In store") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="sk-about" id="about"><h2>' + k.h("about", "Tested by runners") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sk-end" id="contact"><h2>' + k.h("contact", "Lace up.") + '</h2>' + k.cta("Shop the collection") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

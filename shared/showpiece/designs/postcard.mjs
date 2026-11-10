export default {
  id: "md-airbnb",
  root: "hb",
  fonts: "family=Young+Serif&family=Figtree:wght@400;600;800",
  labels: { work: "Homes", services: "Hosting", about: "About", contact: "Book" },
  intros: {
    work: { title: "Places to stay", text: "Hand-picked homes where the host leaves a note and the kettle on." },
    features: { title: "How hosting works", text: "We look after the guests. You keep the keys." },
    studio: { title: "Who we are", text: null },
    contact: { title: "Plan a stay", text: "Tell us where, when and who is coming. We will send three homes that fit." },
  },
  demo: {
    name: "Homeby", headline: "Wish you were here.", heroLabel: "Homes worth writing home about",
    bio: "We find small homes in quiet places and let them to people who will look after them. Every stay comes with a local guide written by the host.",
    cards: [
      { title: "The boathouse, Lake Orta", description: "Two rooms over the water, a rowing boat, and breakfast from the bakery next door." },
      { title: "Olive press, Puglia", description: "Stone walls a metre thick, a courtyard pool, and four hundred trees." },
      { title: "Cliff cottage, Cornwall", description: "A fire, a deep bath, and a footpath straight down to the cove." },
    ],
    services: [
      { title: "Guest care", description: "We answer every message, day or night, so hosts never have to." },
      { title: "Housekeeping", description: "Fresh linen, a full welcome basket, and a checklist after every stay." },
      { title: "Local guides", description: "We help hosts write the guide only they could write." },
    ],
  },
  css: `
.hb{--sea:#0f6e7a;--sand:#f3e6cb;--sun:#f5b62e;--ink:#11282d;--rose:#e9a59b;--paper:#fffaf0;background:var(--sand);color:var(--ink);font:400 17px/1.65 Figtree,system-ui,sans-serif}
.hb header{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px clamp(18px,4vw,56px)}
.hb .brand{font:400 30px/1 "Young Serif",serif;text-decoration:none;color:var(--sea)}
.hb nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.hb nav a{text-decoration:none}.hb nav a:hover{color:var(--sea)}
.hb-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(70px,9vw,120px)}
.hb h1{font:400 clamp(60px,9vw,150px)/.95 "Young Serif",serif;letter-spacing:-.03em;color:var(--ink)}
.hb h1 .ch{animation:hb-ink .7s ease both;animation-delay:calc(var(--i) * 40ms + .5s)}@keyframes hb-ink{from{opacity:0;transform:translateY(-.15em) rotate(-4deg)}}
.hb-hero p{margin-top:26px;font-size:clamp(18px,1.6vw,22px);max-width:42ch}
.hb .cta{display:inline-flex;margin-top:30px;padding:17px 30px;border-radius:999px;background:var(--sea);color:#fff;font-weight:800;text-decoration:none;transition:transform .25s}.hb .cta:hover{transform:rotate(-2deg) scale(1.03)}.hb .cta-muted{background:transparent;color:var(--ink);border:2px solid var(--ink);font-weight:600}
.hb-stack{position:relative;aspect-ratio:1.05;max-width:620px;justify-self:center;width:100%}
.hb-card{position:absolute;inset:8% 8% 14% 8%;padding:14px 14px 56px;background:var(--paper);box-shadow:0 22px 40px -18px rgba(17,40,45,.45);animation:hb-fan 1.4s cubic-bezier(.2,.9,.2,1) both}
.hb-card:nth-child(1){--r:-11deg;--x:-9%;animation-delay:.1s}.hb-card:nth-child(2){--r:7deg;--x:8%;animation-delay:.25s}.hb-card:nth-child(3){--r:-2deg;--x:0%;animation-delay:.4s}
.hb-card{transform:translateX(var(--x)) rotate(var(--r))}
@keyframes hb-fan{from{transform:translateY(30px) rotate(0)}}
.hb-view{position:relative;height:100%;overflow:hidden;background:linear-gradient(#9fd4e0 0 46%,var(--sea) 46%)}
.hb-view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hb-view:before{content:"";position:absolute;left:12%;top:20%;width:22%;aspect-ratio:1;border-radius:50%;background:var(--sun)}
.hb-view:after{content:"";position:absolute;left:46%;bottom:34%;width:30%;height:26%;background:linear-gradient(135deg,transparent 50%,#c96f5e 50%) top/100% 40% no-repeat,linear-gradient(#fff,#fff) bottom/100% 60% no-repeat}
.hb-card:nth-child(1) .hb-view{background:linear-gradient(#f7c8a8 0 50%,#6b9a5b 50%)}.hb-card:nth-child(2) .hb-view{background:linear-gradient(#cfe8f1 0 40%,#2f7f8c 40%)}
.hb-view:has(img):before,.hb-view:has(img):after{display:none}
.hb-card figcaption{position:absolute;left:18px;bottom:16px;font:400 20px "Young Serif",serif}
.hb-stamp{position:absolute;right:2%;top:0;width:clamp(88px,10vw,130px);aspect-ratio:1;border-radius:50%;border:3px double var(--sea);color:var(--sea);display:grid;place-items:center;text-align:center;font:800 12px/1.2 Figtree;letter-spacing:.06em;text-transform:uppercase;padding:14px;transform:rotate(14deg);animation:hb-stamp .5s cubic-bezier(.3,1.6,.5,1) 1.5s both}
@keyframes hb-stamp{from{transform:rotate(14deg) scale(2.4);opacity:0}}
.hb-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px) clamp(40px,5vw,70px)}.hb-intro h1{font-size:clamp(52px,8vw,130px)}.hb-intro p{margin-top:22px;max-width:46ch;font-size:clamp(18px,1.6vw,21px)}
.hb h2{font:400 clamp(40px,6vw,92px)/1 "Young Serif",serif;letter-spacing:-.025em;max-width:15ch}
.hb-homes{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper)}
.hb-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,3vw,40px);margin-top:clamp(40px,6vw,70px)}
.hb-home{background:#fff;padding:12px 12px 22px;box-shadow:0 18px 30px -22px rgba(17,40,45,.5);transition:transform .35s}.hb-home:nth-child(odd){transform:rotate(-1.4deg)}.hb-home:nth-child(even){transform:rotate(1.2deg) translateY(24px)}.hb-home:hover{transform:rotate(0) translateY(-6px)}
.hb-home .hb-view{height:auto;aspect-ratio:4/3}.hb-home h3{margin:18px 8px 0;font:400 23px/1.2 "Young Serif",serif}.hb-home p{margin:6px 8px 0;color:#405256}
.hb-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}
.hb-svc ul{display:grid;gap:16px}.hb-svc li{display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:start;padding:24px;border-radius:24px;background:var(--paper)}.hb-svc li:before{content:"";width:40px;height:40px;border-radius:50%;background:var(--sun);box-shadow:inset 0 0 0 10px var(--paper),inset 0 0 0 13px var(--sea)}
.hb-svc h3{font:800 20px Figtree}.hb-svc p{color:#405256}
.hb-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sea);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.hb-about>p{font-size:clamp(19px,1.8vw,24px)}.hb-about dl{grid-column:2;margin:0}.hb-about dt{font:400 22px "Young Serif",serif;margin-top:20px;color:var(--sun)}.hb-about dd{margin:6px 0 0}
.hb-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--rose)}.hb-end h2{margin:0 auto}
.hb footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:14px;background:var(--ink);color:var(--sand)}
@media(max-width:860px){.hb-hero,.hb-svc,.hb-about{grid-template-columns:1fr}.hb-grid{grid-template-columns:1fr}.hb-home:nth-child(n){transform:none}.hb-about dl{grid-column:auto}.hb nav{gap:12px;font-size:14px}.hb .brand{font-size:24px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const cards = (k.c.cards.length ? k.c.cards : [{ title: k.c.name }]).slice(0, 3); const picks = [cards[2] || cards[0], cards[1] || cards[0], cards[0]]; return '<section class="hb-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Find a stay") + '</div><div class="hb-stack" aria-hidden="true">' + picks.map((x, i) => '<figure class="hb-card"><div class="hb-view">' + k.photo(2 - i) + "</div><figcaption>" + k.E(x.title) + "</figcaption></figure>").join("") + '<span class="hb-stamp">' + k.E(k.c.heroLabel || "Wish you were here") + "</span></div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="hb-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="hb-homes" id="work"><h2>Postcards from our homes</h2><div class="hb-grid">' + k.c.cards.map((x, i) => '<article class="hb-home"><div class="hb-view">' + k.photo(i) + "</div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="hb-svc" id="services"><h2>For hosts</h2><ul>' + k.c.services.map(s => "<li><div><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></div></li>").join("") + "</ul></section>",
  about: (k) => '<section class="hb-about" id="about"><h2>Why we started</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="hb-end" id="contact"><h2>Where to next?</h2>' + k.cta("Plan a stay") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

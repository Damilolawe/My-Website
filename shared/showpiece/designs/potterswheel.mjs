export default {
  id: "md-sanity",
  root: "sw",
  fonts: "family=Italiana&family=Hind+Madurai:wght@400;500;600",
  labels: { work: "Pieces", services: "Classes", about: "Studio", contact: "Book a class" },
  demo: {
    name: "Stillwater Pottery", headline: "Slow hands, steady wheel.", heroLabel: "Ceramics studio and classes",
    bio: "A quiet studio by the canal with six wheels, two kilns and a shelf of pieces waiting to be glazed. Take a class, rent a wheel, or buy a mug that was clay a month ago.",
    cards: [
      { title: "Tidewater mugs", description: "Speckled stoneware with a blue glaze that pools at the base." },
      { title: "Moon jars", description: "Two halves thrown and joined, fired for three days." },
      { title: "Everyday bowls", description: "Stackable, oven-safe and a little different every time." },
    ],
    services: [
      { title: "Taster evening", description: "Two hours on the wheel. You take home what you make." },
      { title: "Six-week course", description: "Throwing, trimming and glazing, start to finish." },
      { title: "Studio membership", description: "Shelf space, firing and a wheel when you want it." },
    ],
  },
  css: `
.sw{--clay:#c98f6b;--slip:#e9d9c8;--stone:#f5efe7;--glaze:#4b7a8c;--ink:#2f2620;--deep:#5a3e2e;background:var(--stone);color:var(--ink);font:400 17px/1.75 "Hind Madurai",system-ui,sans-serif}
.sw header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px)}
.sw .brand{font:400 26px/1 Italiana;letter-spacing:.06em;text-decoration:none}
.sw nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.sw nav a{text-decoration:none}.sw nav a:hover{color:var(--glaze)}
.sw-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(30px,5vw,80px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.sw-label{font-weight:600;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--clay)}
.sw h1{margin-top:16px;font:400 clamp(58px,8.6vw,146px)/.98 Italiana;letter-spacing:-.01em}
.sw h1 .ch{animation:sw-in 1.4s ease both;animation-delay:calc(var(--i) * 40ms)}@keyframes sw-in{from{opacity:0;letter-spacing:.3em}}
.sw-hero p{margin-top:22px;max-width:44ch}
.sw .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:999px;background:var(--deep);color:var(--stone);font-weight:600;text-decoration:none;transition:background .3s}.sw .cta:hover{background:var(--glaze)}.sw .cta-muted{background:var(--slip);color:#7a6658}
.sw-wheel{position:relative;justify-self:center;width:min(100%,460px);aspect-ratio:1;display:grid;place-items:end center}
.sw-wheel:before{content:"";position:absolute;inset:auto 4% 4%;height:20%;border-radius:50%;background:radial-gradient(ellipse,#8c7a6b,#4f4239);box-shadow:0 30px 40px -20px rgba(0,0,0,.4)}
.sw-plate{position:absolute;left:12%;right:12%;bottom:15%;height:12%;border-radius:50%;background:repeating-conic-gradient(#a9a097 0 10deg,#b8afa5 10deg 20deg);animation:sw-spin .8s linear infinite}
@keyframes sw-spin{to{background-position:0 0;filter:hue-rotate(0)}}
.sw-plate{background:repeating-linear-gradient(90deg,#a9a097 0 14px,#b8afa5 14px 28px);background-size:56px 100%;animation:sw-slide .5s linear infinite}@keyframes sw-slide{to{background-position:56px 0}}
.sw-pot{position:absolute;left:50%;bottom:19%;width:44%;height:52%;translate:-50% 0;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(90,62,46,.18) 9px 11px),linear-gradient(90deg,#a86f4f,var(--clay) 30%,#e0b08f 50%,var(--clay) 70%,#8f5a3e);clip-path:polygon(30% 0,70% 0,68% 6%,62% 12%,74% 30%,90% 55%,88% 80%,72% 100%,28% 100%,12% 80%,10% 55%,26% 30%,38% 12%,32% 6%);background-size:100% 100%,200% 100%;animation:sw-throw 4s cubic-bezier(.4,0,.2,1) .4s both,sw-shine 1.2s linear infinite}
@keyframes sw-throw{from{clip-path:polygon(20% 60%,80% 60%,80% 60%,82% 64%,86% 70%,90% 76%,90% 86%,80% 100%,20% 100%,10% 86%,10% 76%,14% 70%,18% 64%,20% 60%)}}
@keyframes sw-shine{to{background-position:0 0,-200% 0}}
.sw-hand{position:absolute;bottom:34%;width:22%;height:16%;border-radius:40% 40% 50% 50%;background:#d8a27f;opacity:.9;animation:sw-press 4s ease-in-out .4s both}
.sw-hand.l{left:12%;transform:rotate(18deg)}.sw-hand.r{right:12%;transform:rotate(-18deg) scaleX(-1)}
@keyframes sw-press{0%{opacity:0}20%,80%{opacity:.9}100%{opacity:0}}
.sw h2{font:400 clamp(44px,6.4vw,108px)/1 Italiana;max-width:14ch}
.sw-pieces{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--slip)}
.sw-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px)}
.sw-pc{text-align:center}
.sw-vessel{display:block;width:56%;aspect-ratio:.8;margin:0 auto 22px;background:linear-gradient(90deg,color-mix(in srgb,var(--c),#000 20%),var(--c) 40%,color-mix(in srgb,var(--c),#fff 25%) 55%,var(--c) 70%,color-mix(in srgb,var(--c),#000 25%));clip-path:var(--shape);transition:transform .5s}.sw-pc:hover .sw-vessel{transform:translateY(-10px)}
.sw-pc img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:200px 200px 16px 16px;margin-bottom:22px}
.sw-pc h3{font:400 30px Italiana}.sw-pc p{margin-top:6px;color:#6d5b4e}
.sw-classes{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sw-classes ol{margin-top:clamp(36px,5vw,56px);counter-reset:n}
.sw-classes li{display:grid;grid-template-columns:80px minmax(0,1fr) minmax(0,1.3fr);gap:24px;align-items:baseline;padding:26px 0;border-top:1px solid #d8c8b6;counter-increment:n}
.sw-classes li:before{content:counter(n,upper-roman);font:400 30px Italiana;color:var(--clay)}
.sw-classes h3{font:400 32px Italiana}
.sw-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--deep);color:var(--stone);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sw-about>p{font-size:clamp(19px,1.8vw,24px)}.sw-about dl{grid-column:2;margin:0}.sw-about dt{font:400 22px Italiana;color:var(--slip);margin-top:16px}.sw-about dd{margin:2px 0 0}
.sw-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.sw-end h2{margin:0 auto}
.sw footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#7a6658}
@media(max-width:900px){.sw nav{gap:12px;font-size:14px}.sw-hero,.sw-list,.sw-about{grid-template-columns:1fr}.sw-classes li{grid-template-columns:50px 1fr}.sw-classes li p{grid-column:2}.sw-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="sw-hero" aria-labelledby="h"><div><span class="sw-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a class") + '</div><div class="sw-wheel" aria-hidden="true"><span class="sw-plate"></span><span class="sw-pot"></span><span class="sw-hand l"></span><span class="sw-hand r"></span></div></section>',
  work: (k) => { const v = [["#4b7a8c", "polygon(20% 0,80% 0,80% 10%,95% 15%,95% 100%,5% 100%,5% 15%,20% 10%)"], ["#ece4d6", "polygon(35% 0,65% 0,62% 8%,92% 30%,100% 60%,85% 92%,60% 100%,40% 100%,15% 92%,0 60%,8% 30%,38% 8%)"], ["#8a9a6a", "polygon(0 30%,100% 30%,90% 80%,70% 100%,30% 100%,10% 80%)"]]; return '<section class="sw-pieces" id="work"><h2>From the kiln</h2><div class="sw-list">' + k.c.cards.map((x, i) => '<article class="sw-pc">' + (k.photo(i) || '<span class="sw-vessel" aria-hidden="true" style="--c:' + v[i % 3][0] + ";--shape:" + v[i % 3][1] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="sw-classes" id="services"><h2>Classes</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="sw-about" id="about"><h2>By the canal</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sw-end" id="contact"><h2>Get your hands in the clay.</h2>' + k.cta("Book a class") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

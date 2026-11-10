export default {
  id: "md-sap",
  root: "mx",
  fonts: "family=Alfa+Slab+One&family=Cabin:wght@400;600;700",
  labels: { work: "Syrups", services: "Visit", about: "The farm", contact: "Order syrup" },
  demo: {
    name: "Maple Ridge Sugarhouse", headline: "Tapped by hand. Boiled by fire.", heroLabel: "Family maple farm since 1952",
    bio: "Four thousand maple trees on a north-facing ridge. Every spring we tap them by hand and boil the sap over a wood fire until it turns to amber syrup. Forty litres of sap make one litre of syrup.",
    cards: [
      { title: "Golden, delicate", description: "The first run of the season. Light and buttery." },
      { title: "Amber, rich", description: "Our best seller. Made for pancakes." },
      { title: "Dark, robust", description: "Late season, deep flavour, perfect for baking." },
    ],
    services: [
      { title: "Sugaring season tours", description: "Weekends in March, with hot syrup on snow." },
      { title: "Pancake breakfast", description: "Sundays all spring in the sugarhouse." },
      { title: "Farm shop", description: "Syrup, candy and maple butter, all year." },
    ],
  },
  css: `
.mx{--amber:#c4721c;--gold:#e8a33d;--bark:#3d2617;--snow:#fbf7f1;--forest:#2d4a32;--red:#a8322a;--cream:#f4e6d0;background:var(--snow);color:var(--bark);font:400 17px/1.7 Cabin,system-ui,sans-serif}
.mx header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--red);color:var(--snow);border-bottom:6px solid transparent;border-image:repeating-linear-gradient(90deg,var(--bark) 0 18px,var(--red) 18px 36px) 6}
.mx .brand{font:400 22px/1 "Alfa Slab One";text-decoration:none}
.mx nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.mx nav a{text-decoration:none}.mx nav a:hover{color:var(--gold)}
.mx-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:linear-gradient(180deg,#e9f1f4,var(--snow))}
.mx-label{font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:13px;color:var(--red)}
.mx h1{margin-top:14px;font:400 clamp(48px,7vw,118px)/1 "Alfa Slab One";letter-spacing:-.01em}
.mx h1 .ch{animation:mx-in .9s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes mx-in{from{opacity:0;color:var(--gold);transform:translateY(-.2em)}}
.mx-hero p{margin-top:22px;max-width:46ch}
.mx .cta{display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:6px;background:var(--amber);color:var(--snow);font-weight:700;text-decoration:none;transition:background .2s}.mx .cta:hover{background:var(--bark)}.mx .cta-muted{background:var(--cream);color:#7a604c}
.mx-tree{position:relative;justify-self:center;width:min(100%,360px);height:clamp(420px,40vw,520px)}
.mx-trunk{position:absolute;left:18%;top:0;bottom:0;width:42%;border-radius:20px 20px 0 0;background:repeating-linear-gradient(90deg,#5b3d2a 0 6px,#4a3021 6px 10px,#6a4a34 10px 22px);box-shadow:inset -18px 0 30px rgba(0,0,0,.35)}
.mx-spout{position:absolute;left:58%;top:36%;width:40px;height:10px;border-radius:3px;background:#9aa0a6}
.mx-drop{position:absolute;left:calc(58% + 32px);top:calc(36% + 8px);width:12px;height:16px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:var(--gold);opacity:0;animation:mx-drip 1.8s cubic-bezier(.6,0,.9,.5) infinite;animation-delay:var(--d)}
@keyframes mx-drip{0%{opacity:0;transform:scale(.3)}20%{opacity:1;transform:scale(1)}80%{opacity:1;transform:translateY(150px)}81%,100%{opacity:0;transform:translateY(150px)}}
.mx-bucket{position:absolute;left:48%;top:calc(36% + 170px);width:46%;height:120px;border-radius:4px 4px 14px 14px;background:linear-gradient(90deg,#8f969c,#d6dade 40%,#9aa1a7);clip-path:polygon(0 0,100% 0,92% 100%,8% 100%);overflow:hidden}
.mx-bucket:before{content:"";position:absolute;left:-10%;right:-10%;top:-26px;height:30px;border-radius:50%;border:4px solid #6b7177;border-bottom-color:transparent}
.mx-bucket i{position:absolute;left:0;right:0;bottom:0;height:var(--lvl);background:linear-gradient(var(--gold),var(--amber));animation:mx-fill 8s ease-out .6s both;--lvl:62%}
@property --lvl{syntax:"<percentage>";initial-value:0%;inherits:false}
@keyframes mx-fill{from{--lvl:6%}}
.mx-steam{position:absolute;right:4%;top:6%;display:flex;gap:10px}.mx-steam i{width:16px;height:60px;border-radius:50%;background:rgba(61,38,23,.12);filter:blur(4px);animation:mx-steam 3s ease-in-out infinite;animation-delay:var(--d)}@keyframes mx-steam{0%{opacity:0;transform:translateY(20px)}50%{opacity:1}100%{opacity:0;transform:translateY(-30px) scaleX(1.6)}}
.mx h2{font:400 clamp(40px,5.6vw,92px)/1.02 "Alfa Slab One";max-width:14ch}
.mx-grades{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.mx-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px);align-items:end}
.mx-g{text-align:center}
.mx-bottle{display:block;width:44%;aspect-ratio:.42;margin:0 auto 22px;background:linear-gradient(90deg,rgba(255,255,255,.25),transparent 30%,transparent 70%,rgba(0,0,0,.2)),var(--c);clip-path:polygon(40% 0,60% 0,60% 14%,70% 22%,100% 34%,100% 100%,0 100%,0 34%,30% 22%,40% 14%);position:relative}
.mx-g img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:14px;margin-bottom:22px}
.mx-g h3{font:400 24px "Alfa Slab One"}.mx-g p{margin-top:6px}
.mx-visit{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--forest);color:var(--snow)}
.mx-visit ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.mx-visit li{padding:28px;border-radius:12px;background:rgba(255,255,255,.07);border-top:6px solid var(--gold)}
.mx-visit h3{font:400 22px "Alfa Slab One";color:var(--gold)}.mx-visit p{margin-top:8px}
.mx-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mx-about>p{font-size:clamp(19px,1.8vw,24px)}.mx-about dl{grid-column:2;margin:0}.mx-about dt{font:400 18px "Alfa Slab One";color:var(--red);margin-top:16px}.mx-about dd{margin:2px 0 0}
.mx-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:linear-gradient(var(--gold),var(--amber));color:var(--snow)}.mx-end h2{margin:0 auto}.mx-end .cta{background:var(--bark)}
.mx footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--bark);color:var(--cream)}
@media(max-width:900px){.mx nav{gap:12px;font-size:14px}.mx-hero,.mx-list,.mx-visit ul,.mx-about{grid-template-columns:1fr}.mx-about dl{grid-column:auto}.mx-tree{height:420px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="mx-hero" aria-labelledby="h"><div><span class="mx-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Order syrup") + '</div><div class="mx-tree" aria-hidden="true"><span class="mx-steam"><i style="--d:0s"></i><i style="--d:1s"></i><i style="--d:2s"></i></span><span class="mx-trunk"></span><span class="mx-spout"></span><span class="mx-drop" style="--d:0s"></span><span class="mx-drop" style="--d:.9s"></span><span class="mx-bucket"><i></i></span></div></section>',
  work: (k) => { const c = ["#e3a641", "#b8651b", "#6b3410"]; return '<section class="mx-grades" id="work"><h2>' + k.h("work", "Three grades of gold") + '</h2><div class="mx-list">' + k.c.cards.map((x, i) => '<article class="mx-g">' + (k.photo(i) || '<span class="mx-bottle" aria-hidden="true" style="--c:' + c[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="mx-visit" id="services"><h2>' + k.h("services", "Visit the sugarhouse") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="mx-about" id="about"><h2>' + k.h("about", "Seventy springs on the ridge") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mx-end" id="contact"><h2>' + k.h("contact", "Pour a little spring on it.") + '</h2>' + k.cta("Order syrup") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

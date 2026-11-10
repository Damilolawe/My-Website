export default {
  id: "atelier",
  root: "ma",
  fonts: "family=Forum&family=Raleway:wght@400;500;600",
  labels: { work: "Collections", services: "Services", about: "The atelier", contact: "Book a fitting" },
  demo: {
    name: "Maison Okoye", headline: "Cut, pinned, made for you.", heroLabel: "Couture atelier",
    bio: "A small atelier making bridal, evening and tailored pieces by hand. Every garment starts with a fitting, a sketch and a length of fabric chosen together.",
    cards: [
      { title: "The silk column", description: "A bias-cut wedding dress in ivory silk, three fittings over two months." },
      { title: "The evening suit", description: "Midnight wool, hand-padded lapels and a lining in emerald." },
      { title: "The archive capsule", description: "Six pieces cut from deadstock fabric found in a Lyon mill." },
    ],
    services: [
      { title: "Bridal", description: "Gowns, veils and second looks." },
      { title: "Tailoring", description: "Suits and coats cut to measure." },
      { title: "Alterations", description: "Restyling much-loved pieces." },
    ],
  },
  css: `
.ma{--ivory:#f8f3ea;--linen:#ece2d0;--ink:#191512;--emerald:#0f4c3a;--blush:#e7c9c1;--gold:#b08d57;--mute:#857a6c;background:var(--ivory);color:var(--ink);font:400 17px/1.75 Raleway,system-ui,sans-serif}
.ma header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px)}
.ma .brand{font:400 26px/1 Forum;letter-spacing:.14em;text-transform:uppercase;text-decoration:none}
.ma nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:13px;letter-spacing:.18em;text-transform:uppercase}.ma nav a{text-decoration:none}.ma nav a:hover{color:var(--emerald)}
.ma-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.ma-label{font-weight:500;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.ma h1{margin-top:16px;font:400 clamp(56px,8.4vw,140px)/.98 Forum;letter-spacing:-.01em}
.ma h1 .ch{animation:ma-in 1.2s ease both;animation-delay:calc(var(--i) * 35ms)}@keyframes ma-in{from{opacity:0;transform:translateY(-.15em)}}
.ma-hero p{margin-top:22px;max-width:44ch;color:#4a4139}
.ma .cta{display:inline-flex;margin-top:28px;padding:15px 30px;background:var(--emerald);color:var(--ivory);font-weight:500;font-size:13px;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;transition:background .3s}.ma .cta:hover{background:var(--ink)}.ma .cta-muted{background:var(--linen);color:var(--mute)}
.ma-form{position:relative;justify-self:center;width:min(100%,380px);aspect-ratio:.66}
.ma-body{position:absolute;left:22%;right:22%;top:6%;height:42%;background:linear-gradient(90deg,#d9c8ae,#efe3cf 40%,#d1bea2);clip-path:polygon(30% 0,70% 0,74% 8%,96% 20%,100% 40%,86% 70%,80% 100%,20% 100%,14% 70%,0 40%,4% 20%,26% 8%)}
.ma-drape{position:absolute;left:16%;right:16%;top:44%;height:44%;background:linear-gradient(90deg,#c9dacd,#f1f6f1 35%,#d6e4d9 60%,#a9c3b0);clip-path:polygon(18% 0,82% 0,90% 20%,100% 100%,0 100%,10% 20%);transform-origin:top;animation:ma-drape 2.2s cubic-bezier(.4,0,.2,1) .4s both;opacity:.95}
@keyframes ma-drape{from{transform:scaleY(0)}}
.ma-pole{position:absolute;left:50%;top:80%;bottom:6%;width:8px;margin-left:-4px;background:#3a2f26}
.ma-base{position:absolute;left:32%;right:32%;bottom:2%;height:6%;border-radius:50%;background:#3a2f26}
.ma-tape{position:absolute;left:4%;right:4%;top:24%;height:22px;background:repeating-linear-gradient(90deg,#f4d36a 0 9px,#3a2f26 9px 10px),#f4d36a;transform:rotate(-14deg);clip-path:inset(0 100% 0 0);animation:ma-tape 1.6s cubic-bezier(.6,0,.3,1) 1.6s forwards;box-shadow:0 4px 8px -4px rgba(0,0,0,.4)}
@keyframes ma-tape{to{clip-path:inset(0 0 0 0)}}
.ma-pins{position:absolute;inset:0}
.ma-pins i{position:absolute;left:var(--x);top:var(--y);width:12px;height:12px;border-radius:50%;background:var(--c);box-shadow:0 2px 0 rgba(0,0,0,.25);animation:ma-pin .4s cubic-bezier(.3,2,.5,1) both;animation-delay:var(--d)}
.ma-pins i:after{content:"";position:absolute;left:5px;top:10px;width:2px;height:14px;background:#aaa;transform:rotate(20deg)}
@keyframes ma-pin{from{transform:scale(0) translateY(-20px)}}
.ma-stitch{position:absolute;left:24%;right:24%;top:47%;height:2px;background:repeating-linear-gradient(90deg,var(--ink) 0 8px,transparent 8px 14px);clip-path:inset(0 100% 0 0);animation:ma-tape 2s steps(14) 3s forwards}
.ma h2{font:400 clamp(44px,6.4vw,104px)/1 Forum;max-width:14ch}
.ma-coll{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--linen)}
.ma-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:clamp(40px,6vw,70px)}
.ma-c{text-align:center}
.ma-swatch{display:block;aspect-ratio:.8;margin-bottom:20px;background:var(--g);clip-path:polygon(0 4%,8% 0,16% 4%,24% 0,32% 4%,40% 0,48% 4%,56% 0,64% 4%,72% 0,80% 4%,88% 0,96% 4%,100% 0,100% 100%,0 100%);box-shadow:inset 0 0 40px rgba(0,0,0,.15)}
.ma-c img{width:100%;aspect-ratio:.8;object-fit:cover;margin-bottom:20px}
.ma-c h3{font:400 28px/1.15 Forum}.ma-c p{margin-top:8px;color:#5a5047}
.ma-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ma-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.ma-svc li{padding:34px 28px;border:1px solid var(--gold);text-align:center;background:linear-gradient(var(--ivory),var(--ivory)) padding-box}
.ma-svc li:before{content:"";display:block;width:44px;height:1px;margin:0 auto 18px;background:var(--gold)}
.ma-svc h3{font:400 26px Forum}.ma-svc p{margin-top:8px;color:#5a5047}
.ma-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--emerald);color:var(--ivory);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ma-about>p{font-size:clamp(19px,1.8vw,24px)}.ma-about dl{grid-column:2;margin:0}.ma-about dt{font-weight:600;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--blush);margin-top:18px}.ma-about dd{margin:2px 0 0}
.ma-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ma-end h2{margin:0 auto}
.ma footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--mute)}
@media(max-width:900px){.ma nav{gap:12px;font-size:11px}.ma-hero,.ma-list,.ma-svc ul,.ma-about{grid-template-columns:1fr}.ma-about dl{grid-column:auto}.ma-form{width:min(100%,280px)}}
@media (prefers-reduced-motion:reduce){.ma-tape,.ma-stitch{clip-path:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const P = [["32%", "34%", "#c0392b", "2.8s"], ["62%", "38%", "#0f4c3a", "3s"], ["44%", "58%", "#b08d57", "3.2s"], ["60%", "72%", "#c0392b", "3.4s"]]; return '<section class="ma-hero" aria-labelledby="h"><div><span class="ma-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a fitting") + '</div><div class="ma-form" aria-hidden="true"><span class="ma-pole"></span><span class="ma-base"></span><span class="ma-body"></span><span class="ma-drape"></span><span class="ma-stitch"></span><span class="ma-tape"></span><span class="ma-pins">' + P.map(p => '<i style="--x:' + p[0] + ";--y:" + p[1] + ";--c:" + p[2] + ";--d:" + p[3] + '"></i>').join("") + "</span></div></section>"; },
  work: (k) => { const g = ["linear-gradient(160deg,#fbf6ec,#e9dcc5)", "linear-gradient(160deg,#1b2440,#0b1020)", "repeating-linear-gradient(45deg,#c9a46b 0 6px,#a9844e 6px 12px)"]; return '<section class="ma-coll" id="work"><h2>Collections</h2><div class="ma-list">' + k.c.cards.map((x, i) => '<article class="ma-c">' + (k.photo(i) || '<span class="ma-swatch" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ma-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ma-about" id="about"><h2>The atelier</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ma-end" id="contact"><h2>Let us begin with a fitting.</h2>' + k.cta("Book a fitting") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "botanicalpress",
  root: "bt",
  fonts: "family=Sorts+Mill+Goudy:ital@0;1&family=Karla:wght@400;600",
  labels: { work: "Plates", services: "Commissions", about: "About", contact: "Enquire" },
  demo: {
    name: "Ana Moreau", headline: "Drawn from life, leaf by leaf.", heroLabel: "Botanical illustrator",
    bio: "I draw plants from life in pencil and watercolour, for botanic gardens, field guides and the occasional seed packet. Each plate takes about three weeks and a lot of patience.",
    cards: [
      { title: "Quercus robur, the English oak", description: "Leaf, acorn and catkin, drawn over one spring and autumn." },
      { title: "A field guide to hedgerows", description: "Eighty plates for a guide published by a wildlife trust." },
      { title: "Seed packets for a heritage nursery", description: "Twenty-four varieties, each painted from the nursery's own stock." },
    ],
    services: [
      { title: "Scientific plates", description: "Accurate illustration for research and guides." },
      { title: "Private commissions", description: "A favourite plant, framed." },
      { title: "Workshops", description: "Drawing plants, for beginners." },
    ],
  },
  css: `
.bt{--bone:#f3ecdc;--paper:#faf5ea;--forest:#1f3a2b;--terra:#b65a34;--sepia:#7d6448;--rule:#d9ccb2;background:var(--bone);color:var(--forest);font:400 17px/1.75 Karla,system-ui,sans-serif}
.bt header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px);border-bottom:1px solid var(--rule)}
.bt .brand{font:italic 400 26px/1 "Sorts Mill Goudy";text-decoration:none}
.bt nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600;font-size:14px;letter-spacing:.08em;text-transform:uppercase}.bt nav a{text-decoration:none}.bt nav a:hover{color:var(--terra)}
.bt-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.bt-label{font:italic 400 20px "Sorts Mill Goudy";color:var(--terra)}
.bt h1{margin-top:12px;font:400 clamp(52px,7.6vw,128px)/1 "Sorts Mill Goudy";letter-spacing:-.02em}
.bt h1 .ch{animation:bt-in 1.4s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes bt-in{from{opacity:0;color:var(--terra)}}
.bt-hero p{margin-top:22px;max-width:44ch;color:#3d4a3f}
.bt .cta{display:inline-flex;margin-top:28px;padding:14px 26px;background:var(--forest);color:var(--bone);font-weight:600;font-size:14px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;transition:background .3s}.bt .cta:hover{background:var(--terra)}.bt .cta-muted{background:var(--rule);color:var(--sepia)}
.bt-sheet{position:relative;justify-self:center;width:min(100%,400px);aspect-ratio:.72;padding:22px;background:var(--paper);box-shadow:0 30px 50px -36px rgba(31,58,43,.6),inset 0 0 60px rgba(125,100,72,.12)}
.bt-sheet svg{position:absolute;inset:6% 10% 24%;width:80%;height:70%;overflow:visible}
.bt-sheet .st{fill:none;stroke:var(--forest);stroke-width:2;stroke-linecap:round;stroke-dasharray:600;stroke-dashoffset:600;animation:bt-draw 2.6s ease forwards;animation-delay:var(--d)}
.bt-sheet .lf{fill:rgba(107,138,94,.0);stroke:var(--forest);stroke-width:1.6;stroke-dasharray:500;stroke-dashoffset:500;animation:bt-draw 2.2s ease forwards,bt-wash 1.4s ease forwards;animation-delay:var(--d),calc(var(--d) + 2s)}
.bt-sheet .vn{fill:none;stroke:var(--forest);stroke-width:.8;opacity:.7;stroke-dasharray:200;stroke-dashoffset:200;animation:bt-draw 1.6s ease forwards;animation-delay:var(--d)}
.bt-sheet .ac{fill:rgba(182,90,52,0);stroke:var(--sepia);stroke-width:1.6;animation:bt-acorn 1.2s ease 4s forwards}
@keyframes bt-draw{to{stroke-dashoffset:0}}
@keyframes bt-wash{to{fill:rgba(107,138,94,.35)}}
@keyframes bt-acorn{to{fill:rgba(182,90,52,.55)}}
.bt-tape{position:absolute;width:56px;height:16px;background:rgba(217,204,178,.85)}
.bt-lbl{position:absolute;right:16px;bottom:16px;width:55%;padding:10px 12px;border:1px solid var(--forest);font:400 12px/1.5 Karla;background:var(--paper)}
.bt-lbl b{display:block;font:italic 400 16px "Sorts Mill Goudy"}
.bt h2{font:400 clamp(44px,6.4vw,104px)/1 "Sorts Mill Goudy";max-width:14ch}
.bt-plates{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper)}
.bt-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:clamp(40px,6vw,70px)}
.bt-p{padding:18px;border:1px solid var(--rule);background:var(--bone)}
.bt-sp{display:block;aspect-ratio:.8;background:var(--paper);position:relative;overflow:hidden}
.bt-sp:before{content:"";position:absolute;left:50%;top:12%;bottom:12%;width:2px;background:var(--forest)}
.bt-sp:after{content:"";position:absolute;left:50%;top:var(--t);width:44%;height:22%;margin-left:var(--m);border-radius:0 100%;background:var(--c);border:1px solid var(--forest);transform:rotate(var(--r))}
.bt-p img{width:100%;aspect-ratio:.8;object-fit:cover}
.bt-p small{display:block;margin-top:14px;font-weight:600;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--terra)}
.bt-p h3{margin-top:4px;font:italic 400 22px/1.25 "Sorts Mill Goudy"}.bt-p p{margin-top:6px;color:#4c5a4f}
.bt-com{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.bt-com ul{margin-top:clamp(36px,5vw,56px)}
.bt-com li{display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:22px 0;border-top:1px solid var(--rule)}
.bt-com li:before{content:"Fig. " counter(list-item);font:italic 400 16px "Sorts Mill Goudy";color:var(--terra)}
.bt-com h3{font:400 26px "Sorts Mill Goudy"}.bt-com p{color:#3d4a3f}
.bt-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--forest);color:var(--bone);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.bt-about>p{font:italic 400 clamp(21px,2vw,27px)/1.55 "Sorts Mill Goudy"}.bt-about dl{grid-column:2;margin:0}.bt-about dt{font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#e3a07f;margin-top:18px}.bt-about dd{margin:2px 0 0}
.bt-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.bt-end h2{margin:0 auto}
.bt footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;color:var(--sepia);border-top:1px solid var(--rule)}
@media(max-width:900px){.bt nav{gap:12px;font-size:12px}.bt-hero,.bt-list,.bt-about{grid-template-columns:1fr}.bt-com li{grid-template-columns:1fr}.bt-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.bt-sheet .lf{fill:rgba(107,138,94,.35)}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const leaf = (x, y, r, d) => '<g transform="translate(' + x + " " + y + ") rotate(" + r + ')"><path class="lf" style="--d:' + d + 's" d="M0 0 C10 -14 22 -12 26 -26 C34 -18 32 -6 40 -4 C34 4 38 14 30 20 C24 18 14 26 8 20 C6 12 -4 8 0 0Z"/><path class="vn" style="--d:' + (d + 0.8) + 's" d="M0 0 L32 0 M10 0 L18 -10 M18 0 L26 -12 M14 0 L22 10 M22 0 L30 12"/></g>'; return '<section class="bt-hero" aria-labelledby="h"><div><span class="bt-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Enquire") + '</div><div class="bt-sheet" aria-hidden="true"><span class="bt-tape" style="left:30%;top:58%;transform:rotate(-8deg)"></span><span class="bt-tape" style="left:46%;top:18%;transform:rotate(6deg)"></span><svg viewBox="0 0 200 260"><path class="st" style="--d:.2s" d="M100 250 C98 200 104 160 96 120 C90 90 104 60 100 20"/><path class="st" style="--d:.8s" d="M98 150 C80 140 66 130 54 112"/><path class="st" style="--d:1s" d="M100 100 C118 92 132 84 146 66"/>' + leaf(54, 112, -140, 1.4) + leaf(146, 66, -40, 1.8) + leaf(100, 20, -90, 2.2) + leaf(98, 190, 20, 2.6) + leaf(98, 170, 160, 3) + '<ellipse class="ac" cx="126" cy="196" rx="10" ry="14"/><path class="ac" d="M114 186 C118 176 134 176 138 186Z"/></svg><div class="bt-lbl"><b>Quercus robur</b>English oak. Collected in the park, October. Pencil and watercolour.</div></div></section>'; },
  work: (k) => { const S = [["30%", "0", "-30deg", "#9fb38f"], ["44%", "-44%", "30deg", "#c9a46b"], ["24%", "0", "-50deg", "#b65a34"]]; return '<section class="bt-plates" id="work"><h2>' + k.h("work", "Plates") + '</h2><div class="bt-list">' + k.c.cards.map((x, i) => '<article class="bt-p">' + (k.photo(i) || '<span class="bt-sp" aria-hidden="true" style="--t:' + S[i % 3][0] + ";--m:" + S[i % 3][1] + ";--r:" + S[i % 3][2] + ";--c:" + S[i % 3][3] + '"></span>') + "<small>Plate " + ["IV", "XII", "XX"][i % 3] + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="bt-com" id="services"><h2>' + k.h("services", "Commissions") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="bt-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="bt-end" id="contact"><h2>' + k.h("contact", "Is there a plant you love?") + '</h2>' + k.cta("Enquire") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

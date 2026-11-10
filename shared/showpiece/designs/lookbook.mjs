export default {
  id: "vestigefolio",
  root: "vf",
  fonts: "family=Playfair+Display:ital,wght@0,400;1,400&family=Hanken+Grotesk:wght@300;400;500",
  labels: { work: "Collection", services: "Services", about: "The house", contact: "Appointments" },
  demo: {
    name: "Vestige", headline: "A quieter kind of luxury.", heroLabel: "Autumn and winter collection",
    bio: "A small fashion house making a few pieces each season in wool, silk and undyed linen. No logos, no rush, and clothes designed to be worn for twenty years.",
    cards: [
      { title: "The long coat", description: "Undyed wool from one farm, cut long and loose." },
      { title: "The silk shirt", description: "Washed silk in bone, ink and moss." },
      { title: "The wide trouser", description: "High waist, deep pleats, pockets you can use." },
    ],
    services: [
      { title: "Private appointments", description: "Try the collection at the studio." },
      { title: "Made to measure", description: "Any piece, cut to you." },
      { title: "Repairs, for life", description: "Bring it back, we will mend it." },
    ],
  },
  css: `
.vf{--bone:#efe9df;--stone:#d9d1c4;--ink:#1f1c18;--moss:#6b6a4f;--mute:#8a8174;background:var(--bone);color:var(--ink);font:300 16px/1.85 "Hanken Grotesk",system-ui,sans-serif}
.vf header{display:flex;justify-content:space-between;align-items:center;padding:26px clamp(18px,5vw,80px)}
.vf .brand{font:400 26px/1 "Playfair Display";letter-spacing:.3em;text-transform:uppercase;text-decoration:none}
.vf nav{display:flex;gap:clamp(14px,2.4vw,34px);font-weight:400;font-size:12px;letter-spacing:.24em;text-transform:uppercase}.vf nav a{text-decoration:none;color:var(--mute)}.vf nav a:hover,.vf nav a[aria-current]{color:var(--ink)}
.vf-hero{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(30px,5vw,80px);align-items:end;padding:clamp(30px,4vw,60px) clamp(18px,5vw,80px) clamp(70px,9vw,130px)}
.vf-label{font-weight:400;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--mute)}
.vf h1{margin-top:20px;font:400 clamp(50px,7vw,116px)/1.02 "Playfair Display";letter-spacing:-.02em}
.vf h1 .ch{animation:vf-in 2s ease both;animation-delay:calc(var(--i) * 50ms)}@keyframes vf-in{from{opacity:0}}
.vf-hero p{margin-top:26px;max-width:38ch;color:#4b453d}
.vf .cta{display:inline-flex;margin-top:34px;padding:14px 30px;border:1px solid var(--ink);font-weight:400;font-size:12px;letter-spacing:.28em;text-transform:uppercase;text-decoration:none;transition:background .4s,color .4s}.vf .cta:hover{background:var(--ink);color:var(--bone)}.vf .cta-muted{border-color:var(--stone);color:var(--mute)}
.vf-rail{position:relative;display:flex;gap:16px;height:clamp(440px,46vw,620px);overflow:hidden}
.vf-col{flex:1;display:flex;flex-direction:column;gap:16px;animation:vf-up 30s linear infinite;animation-direction:var(--dir)}
.vf-col:nth-child(2){margin-top:-120px}
@keyframes vf-up{to{transform:translateY(-50%)}}
.vf-look{flex:none;aspect-ratio:.66;background:var(--g);position:relative}
.vf-look:after{content:attr(data-n);position:absolute;left:12px;bottom:10px;font-size:11px;letter-spacing:.2em;color:rgba(255,255,255,.85)}
.vf-rail:before,.vf-rail:after{content:"";position:absolute;left:0;right:0;height:80px;z-index:1;pointer-events:none}.vf-rail:before{top:0;background:linear-gradient(var(--bone),transparent)}.vf-rail:after{bottom:0;background:linear-gradient(transparent,var(--bone))}
.vf h2{font:400 clamp(40px,5.6vw,92px)/1.05 "Playfair Display";letter-spacing:-.015em;max-width:15ch}
.vf-coll{padding:clamp(80px,10vw,160px) clamp(18px,5vw,80px);background:var(--stone)}
.vf-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,50px);margin-top:clamp(40px,6vw,80px)}
.vf-c:nth-child(2){margin-top:80px}
.vf-pic{display:block;aspect-ratio:.7;background:var(--g)}
.vf-c img{width:100%;aspect-ratio:.7;object-fit:cover}
.vf-c small{display:block;margin-top:18px;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.vf-c h3{margin-top:6px;font:400 24px "Playfair Display"}.vf-c p{margin-top:6px;color:#4b453d}
.vf-svc{padding:clamp(80px,10vw,160px) clamp(18px,5vw,80px)}
.vf-svc ul{margin-top:clamp(36px,5vw,56px)}
.vf-svc li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:24px;padding:26px 0;border-top:1px solid var(--stone)}
.vf-svc h3{font:400 italic 26px "Playfair Display"}.vf-svc p{color:#4b453d}
.vf-about{padding:clamp(80px,10vw,160px) clamp(18px,5vw,80px);background:var(--ink);color:var(--bone);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,110px)}.vf-about>p{font:400 clamp(22px,2.1vw,30px)/1.5 "Playfair Display"}.vf-about dl{grid-column:2;margin:0}.vf-about dt{font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:#bfb6a7;margin-top:20px}.vf-about dd{margin:4px 0 0}
.vf-end{padding:clamp(100px,14vw,200px) clamp(18px,5vw,80px);text-align:center}.vf-end h2{margin:0 auto}
.vf footer{display:flex;justify-content:space-between;padding:26px clamp(18px,5vw,80px);font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--mute);border-top:1px solid var(--stone)}
@media(max-width:900px){.vf nav{gap:10px;font-size:10px}.vf-hero,.vf-list,.vf-about,.vf-svc li{grid-template-columns:1fr}.vf-c:nth-child(2){margin-top:0}.vf-about dl{grid-column:auto}.vf-rail{height:420px}}
@media (prefers-reduced-motion:reduce){.vf-col{animation:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const G = ["linear-gradient(180deg,#cdbfa9,#8e7f68)", "linear-gradient(180deg,#3b3631,#1f1c18)", "linear-gradient(180deg,#d9d1c4,#a59a89)", "linear-gradient(180deg,#7d7b5d,#4f4e38)", "linear-gradient(180deg,#e7dfd2,#bdb2a1)", "linear-gradient(180deg,#5d564c,#2f2b26)"]; let n = 1; const col = (o, dir) => '<div class="vf-col" style="--dir:' + dir + '">' + [0, 1, 2, 0, 1, 2].map(j => '<span class="vf-look" data-n="Look ' + String(n++).padStart(2, "0") + '" style="--g:' + G[(j + o) % 6] + '"></span>').join("") + "</div>"; return '<section class="vf-hero" aria-labelledby="h"><div><span class="vf-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book an appointment") + '</div><div class="vf-rail" aria-hidden="true">' + col(0, "normal") + col(3, "reverse") + col(1, "normal") + "</div></section>"; },
  work: (k) => { const g = ["linear-gradient(180deg,#cdbfa9,#8e7f68)", "linear-gradient(180deg,#e7dfd2,#bdb2a1)", "linear-gradient(180deg,#5d564c,#2f2b26)"]; return '<section class="vf-coll" id="work"><h2>' + k.h("work", "The collection") + '</h2><div class="vf-list">' + k.c.cards.map((x, i) => '<article class="vf-c">' + (k.photo(i) || '<span class="vf-pic" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<small>Look " + String(i * 4 + 3).padStart(2, "0") + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="vf-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="vf-about" id="about"><h2>' + k.h("about", "The house") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="vf-end" id="contact"><h2>' + k.h("contact", "Come and see it in person.") + '</h2>' + k.cta("Book an appointment") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

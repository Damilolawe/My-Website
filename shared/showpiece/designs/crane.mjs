export default {
  id: "md-hashicorp",
  root: "ty",
  fonts: "family=Anton&family=Sarabun:wght@400;600;800",
  labels: { work: "Projects", services: "Services", about: "Company", contact: "Request a quote" },
  demo: {
    name: "Tallyard Construction", headline: "Built level. Built to last.", heroLabel: "Commercial and residential construction",
    bio: "Three generations of builders, one rule: finish on the date we promised. We build schools, clinics, warehouses and homes, with a site manager you can call any day of the week.",
    cards: [
      { title: "Riverside primary school", description: "Fourteen classrooms, finished in the summer holidays, open on day one of term." },
      { title: "Harbour clinic extension", description: "A new wing built while the clinic stayed open every day." },
      { title: "Twelve townhouses", description: "Timber frame, solar roofs, handed over two weeks early." },
    ],
    services: [
      { title: "New builds", description: "From groundworks to handover." },
      { title: "Extensions", description: "Built around buildings that stay in use." },
      { title: "Fit-out", description: "Interiors for offices, shops and clinics." },
    ],
  },
  css: `
.ty{--sun:#ffb81c;--steel:#2b2f36;--concrete:#e6e2d8;--white:#faf8f2;--ink:#17191d;--red:#d63a1f;background:var(--white);color:var(--ink);font:400 17px/1.7 Sarabun,system-ui,sans-serif}
.ty header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--sun);border-bottom:8px solid transparent;border-image:repeating-linear-gradient(45deg,var(--ink) 0 14px,var(--sun) 14px 28px) 8}
.ty .brand{font:400 26px/1 Anton;text-transform:uppercase;letter-spacing:.02em;text-decoration:none}
.ty nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:800}.ty nav a{text-decoration:none}.ty nav a:hover{text-decoration:underline}
.ty-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:end;padding:clamp(50px,7vw,100px) clamp(18px,4vw,56px) 0;background:linear-gradient(#cfe3ee,#eef3f0);overflow:hidden}
.ty-copy{padding-bottom:clamp(50px,7vw,100px)}
.ty-label{font-weight:800;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--red)}
.ty h1{margin-top:14px;font:400 clamp(60px,9vw,150px)/.9 Anton;text-transform:uppercase}
.ty h1 .ch{animation:ty-drop .7s cubic-bezier(.4,1.6,.5,1) both;animation-delay:calc(var(--i) * 18ms)}@keyframes ty-drop{from{opacity:0;transform:translateY(-1.2em)}}
.ty-copy p{margin-top:20px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.ty .cta{display:inline-flex;margin-top:26px;padding:16px 28px;background:var(--ink);color:var(--sun);font:400 20px Anton;text-transform:uppercase;letter-spacing:.04em;text-decoration:none;transition:background .2s}.ty .cta:hover{background:var(--red);color:var(--white)}.ty .cta-muted{background:var(--concrete);color:#555;font:600 15px Sarabun;text-transform:none}
.ty-site{position:relative;height:clamp(400px,40vw,540px)}
.ty-mast{position:absolute;left:18%;bottom:0;width:26px;height:92%;background:repeating-linear-gradient(45deg,transparent 0 10px,var(--sun) 10px 13px),repeating-linear-gradient(-45deg,transparent 0 10px,var(--sun) 10px 13px);border-left:4px solid var(--sun);border-right:4px solid var(--sun)}
.ty-jib{position:absolute;left:4%;right:2%;top:8%;height:22px;background:repeating-linear-gradient(60deg,transparent 0 10px,var(--sun) 10px 13px),repeating-linear-gradient(-60deg,transparent 0 10px,var(--sun) 10px 13px);border-top:4px solid var(--sun);border-bottom:4px solid var(--sun)}
.ty-cab{position:absolute;left:calc(18% - 8px);top:calc(8% + 26px);width:42px;height:34px;background:var(--sun);border:3px solid var(--ink)}
.ty-trolley{position:absolute;top:calc(8% + 26px);left:30%;width:4px;height:var(--rope);background:var(--ink);animation:ty-move 8s ease-in-out infinite;--rope:30%}
.ty-trolley:after{content:"";position:absolute;left:-36px;bottom:-30px;width:76px;height:30px;background:var(--red);border:3px solid var(--ink)}
@keyframes ty-move{0%{left:30%;height:20%}25%{left:78%;height:20%}40%{left:78%;height:52%}55%{left:78%;height:20%}80%{left:30%;height:20%}100%{left:30%;height:20%}}
.ty-build{position:absolute;right:6%;bottom:0;width:34%;display:flex;flex-direction:column-reverse}
.ty-build i{height:42px;border:3px solid var(--ink);border-top:0;background:repeating-linear-gradient(90deg,var(--concrete) 0 30%,#9fb6c4 30% 46%,var(--concrete) 46% 54%,#9fb6c4 54% 70%,var(--concrete) 70%);animation:ty-rise .6s ease both;animation-delay:var(--d)}
.ty-build i:first-child{border-top:3px solid var(--ink)}
@keyframes ty-rise{from{opacity:0;transform:translateY(-60px)}}
.ty h2{font:400 clamp(44px,6.4vw,104px)/.95 Anton;text-transform:uppercase;max-width:14ch}
.ty-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--steel);color:var(--white)}
.ty-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.ty-p{border-top:8px solid var(--sun);padding-top:20px}
.ty-p img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:16px;filter:grayscale(.3)}
.ty-p small{font:400 18px Anton;color:var(--sun)}
.ty-p h3{margin-top:6px;font:800 24px/1.2 Sarabun}.ty-p p{margin-top:8px;color:#c9ccd1}
.ty-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ty-svc ol{margin-top:clamp(36px,5vw,56px);counter-reset:n}
.ty-svc li{display:grid;grid-template-columns:120px minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:24px 0;border-top:3px solid var(--ink);counter-increment:n}
.ty-svc li:before{content:"0" counter(n);font:400 54px/1 Anton;color:var(--sun);-webkit-text-stroke:2px var(--ink)}
.ty-svc h3{font:400 32px Anton;text-transform:uppercase}
.ty-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sun);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ty-about>p{font-size:clamp(19px,1.8vw,24px)}.ty-about dl{grid-column:2;margin:0}.ty-about dt{font:400 22px Anton;text-transform:uppercase;margin-top:16px}.ty-about dd{margin:2px 0 0}
.ty-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--concrete)}.ty-end h2{margin:0 auto}
.ty footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--ink);color:var(--sun)}
@media(max-width:900px){.ty nav{gap:12px;font-size:14px}.ty-hero,.ty-list,.ty-about{grid-template-columns:1fr}.ty-svc li{grid-template-columns:70px 1fr}.ty-svc li p{grid-column:2}.ty-about dl{grid-column:auto}.ty-site{height:360px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ty-hero" aria-labelledby="h"><div class="ty-copy"><span class="ty-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Request a quote") + '</div><div class="ty-site" aria-hidden="true"><span class="ty-mast"></span><span class="ty-jib"></span><span class="ty-cab"></span><span class="ty-trolley"></span><span class="ty-build">' + Array.from({ length: 6 }, (_, i) => '<i style="--d:' + (0.3 + i * 0.25).toFixed(2) + 's"></i>').join("") + "</span></div></section>",
  work: (k) => '<section class="ty-proj" id="work"><h2>Handed over on time</h2><div class="ty-list">' + k.c.cards.map((x, i) => '<article class="ty-p">' + k.photo(i) + "<small>Project " + String(i + 1).padStart(2, "0") + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ty-svc" id="services"><h2>What we build</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="ty-about" id="about"><h2>Three generations on site</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ty-end" id="contact"><h2>Tell us what you need built.</h2>' + k.cta("Request a quote") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

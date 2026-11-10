export default {
  id: "monobrutalist",
  root: "mb",
  fonts: "family=Spline+Sans+Mono:wght@400;600;700",
  labels: { work: "Work", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Ola Berg", headline: "No frills. Just work.", heroLabel: "Web developer",
    bio: "I build fast, accessible websites with plain HTML, careful CSS and as little JavaScript as possible. Pages that load in under a second and still work in ten years.",
    cards: [
      { title: "A newspaper archive", description: "One million articles, static pages, loads in 0.4 seconds." },
      { title: "A council website", description: "Rebuilt to pass every accessibility check, top to bottom." },
      { title: "An artist's portfolio", description: "Twelve kilobytes of CSS. No framework." },
    ],
    services: [
      { title: "Build", description: "Hand-coded sites, fast and accessible." },
      { title: "Audit", description: "Speed and accessibility, with fixes." },
      { title: "Maintain", description: "Updates and care, monthly." },
    ],
  },
  css: `
@property --n{syntax:"<integer>";initial-value:0;inherits:false}
.mb{--w:#fff;--k:#000;--g:#e6e6e6;background:var(--w);color:var(--k);font:400 16px/1.6 "Spline Sans Mono",ui-monospace,monospace}
.mb header{display:flex;justify-content:space-between;align-items:stretch;border-bottom:3px solid var(--k)}
.mb .brand{display:flex;align-items:center;padding:16px clamp(18px,4vw,56px);font-weight:700;text-transform:uppercase;text-decoration:none;border-right:3px solid var(--k)}
.mb nav{display:flex}.mb nav a{display:flex;align-items:center;padding:16px clamp(12px,2vw,24px);border-left:3px solid var(--k);text-decoration:none;text-transform:uppercase;font-weight:600}.mb nav a:hover,.mb nav a[aria-current]{background:var(--k);color:var(--w)}
.mb-hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);border-bottom:3px solid var(--k)}
.mb-copy{padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px);border-right:3px solid var(--k)}
.mb-label{display:inline-block;padding:2px 8px;background:var(--k);color:var(--w);font-weight:700;text-transform:uppercase;font-size:13px}
.mb h1{margin-top:18px;font:700 clamp(50px,7.6vw,128px)/.92 "Spline Sans Mono";letter-spacing:-.06em;text-transform:uppercase}
.mb h1 .ch{animation:mb-type .01s both;animation-delay:calc(var(--i) * 45ms)}@keyframes mb-type{from{background:var(--k);color:var(--k)}}
.mb-copy p{margin-top:22px;max-width:52ch}
.mb .cta{display:inline-flex;margin-top:24px;padding:14px 22px;border:3px solid var(--k);background:var(--k);color:var(--w);font-weight:700;text-transform:uppercase;text-decoration:none}.mb .cta:hover{background:var(--w);color:var(--k)}.mb .cta-muted{background:var(--w);color:var(--k);border-style:dashed}
.mb-grid{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:1fr}
.mb-grid i{aspect-ratio:1;border:1.5px solid var(--k);animation:mb-flip 4s steps(1) infinite;animation-delay:var(--d)}
@keyframes mb-flip{0%,49%{background:var(--w)}50%,100%{background:var(--k)}}
.mb-meter{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-top:3px solid var(--k);font-weight:700;text-transform:uppercase;counter-reset:n var(--n);animation:mb-count 3s steps(40) .3s both;--n:100}
.mb-meter b:after{content:counter(n) "/100"}
@keyframes mb-count{from{--n:0}}
.mb h2{font:700 clamp(40px,6vw,96px)/.95 "Spline Sans Mono";letter-spacing:-.06em;text-transform:uppercase}
.mb-sec{border-bottom:3px solid var(--k)}
.mb-sec>h2{padding:clamp(30px,4vw,56px) clamp(18px,4vw,56px);border-bottom:3px solid var(--k)}
.mb-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
.mb-w{padding:clamp(20px,3vw,36px);border-right:3px solid var(--k)}.mb-w:last-child{border-right:0}
.mb-w:hover{background:var(--k);color:var(--w)}
.mb-w small{font-weight:700}
.mb-w img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:14px 0;filter:grayscale(1) contrast(1.4);border:3px solid currentColor}
.mb-w h3{margin-top:10px;font-weight:700;font-size:20px;text-transform:uppercase}.mb-w p{margin-top:8px}
.mb-svc table{width:100%;border-collapse:collapse}
.mb-svc th,.mb-svc td{padding:20px clamp(18px,4vw,56px);border-bottom:3px solid var(--k);text-align:left;vertical-align:top}.mb-svc tr:last-child th,.mb-svc tr:last-child td{border-bottom:0}.mb-svc th{width:36%;border-right:3px solid var(--k);text-transform:uppercase}
.mb-about{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.mb-about>p{padding:clamp(30px,4vw,56px) clamp(18px,4vw,56px);font-size:clamp(18px,1.6vw,21px);border-right:3px solid var(--k)}
.mb-about dl{margin:0}.mb-about dl div{display:grid;grid-template-columns:160px 1fr;border-bottom:3px solid var(--k)}.mb-about dl div:last-child{border-bottom:0}.mb-about dt{padding:14px 18px;font-weight:700;text-transform:uppercase;border-right:3px solid var(--k);background:var(--g)}.mb-about dd{margin:0;padding:14px 18px}
.mb-end{padding:clamp(80px,12vw,160px) clamp(18px,4vw,56px);background:var(--k);color:var(--w)}.mb-end .cta{background:var(--w);color:var(--k);border-color:var(--w)}
.mb footer{display:flex;justify-content:space-between;padding:16px clamp(18px,4vw,56px);font-weight:700;text-transform:uppercase;font-size:13px}
@media(max-width:900px){.mb nav a{padding:12px 10px;font-size:12px}.mb-hero,.mb-list,.mb-about{grid-template-columns:1fr}.mb-copy,.mb-w,.mb-about>p{border-right:0;border-bottom:3px solid var(--k)}.mb-about dl div{grid-template-columns:1fr}.mb-about dt{border-right:0}}
@media (prefers-reduced-motion:reduce){.mb-grid i:nth-child(3n){background:var(--k)}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="mb-hero" aria-labelledby="h"><div class="mb-copy"><span class="mb-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Contact") + '</div><div aria-hidden="true"><div class="mb-grid">' + Array.from({ length: 36 }, (_, i) => '<i style="--d:-' + (((i * 7) % 11) * 0.37).toFixed(2) + 's"></i>').join("") + '</div><div class="mb-meter">Performance <b></b></div></div></section>',
  work: (k) => '<section class="mb-sec" id="work"><h2>Work</h2><div class="mb-list">' + k.c.cards.map((x, i) => '<article class="mb-w"><small>[' + String(i + 1).padStart(2, "0") + "]</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="mb-sec mb-svc" id="services"><h2>Services</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="mb-sec" id="about"><h2>About</h2><div class="mb-about"><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "<div></div>") + "</div></section>",
  contact: (k) => '<section class="mb-end" id="contact"><h2>Get in touch.</h2>' + k.cta("Contact") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Top</a></footer>',
};

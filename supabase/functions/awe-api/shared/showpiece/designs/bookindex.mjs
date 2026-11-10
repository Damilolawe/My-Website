export default {
  id: "index",
  root: "ix",
  fonts: "family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;700",
  labels: { work: "Selected work", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Maya Okafor", headline: "Product designer, indexed.", heroLabel: "Product designer in Bristol",
    bio: "I design calm, useful software for health and public services. Ten years of research, prototypes and shipped products, most recently for a national appointment booking service.",
    cards: [
      { title: "Booking a GP appointment", description: "Redesigned for 4 million monthly visitors. Missed appointments fell by a fifth." },
      { title: "A pharmacy stock tool", description: "From paper ledgers to a tablet app used in 300 branches." },
      { title: "Accessible forms kit", description: "A shared library of form patterns, tested with screen reader users." },
    ],
    services: [
      { title: "Product design", description: "Research, flows and interfaces, end to end." },
      { title: "Design systems", description: "Components that teams actually adopt." },
      { title: "Workshops", description: "Two-day sprints to unblock a stuck project." },
    ],
  },
  css: `
.ix{--paper:#f8f6f1;--ink:#1a1a1a;--rule:#cfc9bd;--red:#c0392b;--mute:#6b665d;background:var(--paper);color:var(--ink);font:400 17px/1.7 Inter,system-ui,sans-serif}
.ix header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.ix .brand{font:600 22px/1 "EB Garamond";text-decoration:none}
.ix nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:15px}.ix nav a{text-decoration:none}.ix nav a:hover{color:var(--red)}
.ix-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);padding:clamp(30px,5vw,80px) clamp(18px,4vw,56px) clamp(60px,8vw,110px);align-items:start}
.ix-label{font-size:14px;font-weight:500;color:var(--mute)}
.ix h1{margin-top:12px;font:400 clamp(58px,8.4vw,140px)/.95 "EB Garamond";letter-spacing:-.025em}
.ix h1 .ch{animation:ix-in .9s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes ix-in{from{opacity:0;transform:translateY(.15em)}}
.ix-hero p{margin-top:22px;max-width:44ch;color:#3a3833}
.ix .cta{display:inline-flex;margin-top:28px;padding:14px 22px;border:1px solid var(--ink);color:var(--ink);font-weight:500;text-decoration:none;transition:background .2s,color .2s}.ix .cta:hover{background:var(--ink);color:var(--paper)}.ix .cta-muted{border-color:var(--rule);color:var(--mute)}
.ix-book{position:relative;padding:clamp(24px,3vw,40px);background:#fff;box-shadow:0 1px 0 var(--rule),0 30px 50px -36px rgba(0,0,0,.4);font:400 17px/1.55 "EB Garamond"}
.ix-book h3{font:600 15px Inter;letter-spacing:.24em;text-transform:uppercase;text-align:center;padding-bottom:14px;border-bottom:1px solid var(--rule)}
.ix-tabs{position:absolute;right:-14px;top:60px;display:grid;gap:4px}.ix-tabs i{width:14px;height:34px;border-radius:0 4px 4px 0;background:var(--rule)}.ix-tabs i:nth-child(2){background:var(--red);width:20px}
.ix-entries{margin-top:16px;columns:2;column-gap:28px}
.ix-entries b{display:block;margin:12px 0 2px;font:600 26px "EB Garamond";color:var(--red);break-after:avoid}
.ix-entries span{display:flex;gap:6px;align-items:baseline;animation:ix-row .5s ease both;animation-delay:var(--d)}
.ix-entries span:after{content:"";order:1;flex:1;border-bottom:1px dotted var(--rule)}
.ix-entries em{order:2;font-style:normal;color:var(--mute)}
@keyframes ix-row{from{opacity:0;transform:translateX(-8px)}}
.ix-entries span.on{background:linear-gradient(transparent 60%,#ffe58a 60%);background-size:0 100%;background-repeat:no-repeat;animation:ix-row .5s ease both,ix-hi .8s ease 2.6s forwards;animation-delay:var(--d),2.6s}
@keyframes ix-hi{to{background-size:100% 100%}}
.ix h2{font:400 clamp(44px,6.4vw,104px)/1 "EB Garamond";letter-spacing:-.02em;max-width:14ch}
.ix-work{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);border-top:1px solid var(--rule)}
.ix-list{margin-top:clamp(40px,6vw,70px)}
.ix-w{display:grid;grid-template-columns:90px minmax(0,1.2fr) minmax(0,1fr);gap:28px;align-items:baseline;padding:28px 0;border-top:1px solid var(--rule);transition:background .3s}.ix-w:hover{background:#fff}
.ix-w>span{font:italic 400 22px "EB Garamond";color:var(--red)}
.ix-w h3{font:400 clamp(26px,2.6vw,36px)/1.1 "EB Garamond"}.ix-w p{color:#4a4741}
.ix-w img{grid-column:2/-1;width:100%;max-height:300px;object-fit:cover}
.ix-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#fff}
.ix-svc dl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin-top:clamp(36px,5vw,56px)}
.ix-svc dt{font:400 28px "EB Garamond";padding-top:16px;border-top:2px solid var(--ink)}.ix-svc dd{margin:8px 0 0;color:#4a4741}
.ix-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(30px,6vw,90px)}.ix-about>p{font:400 clamp(21px,2vw,27px)/1.5 "EB Garamond"}
.ix-cv{grid-column:2;margin:0}.ix-cv div{display:grid;grid-template-columns:140px 1fr;gap:20px;padding:16px 0;border-top:1px solid var(--rule)}.ix-cv dt{font:600 13px Inter;letter-spacing:.14em;text-transform:uppercase;color:var(--red)}.ix-cv dd{margin:0}
.ix-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--ink);color:var(--paper)}.ix-end h2{margin:0 auto}.ix-end .cta{border-color:var(--paper);color:var(--paper)}
.ix footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute)}
@media(max-width:900px){.ix nav{gap:12px;font-size:13px}.ix-hero,.ix-svc dl,.ix-about{grid-template-columns:1fr}.ix-w{grid-template-columns:50px 1fr}.ix-w p,.ix-w img{grid-column:2}.ix-cv{grid-column:auto}.ix-cv div{grid-template-columns:1fr;gap:4px}.ix-entries{columns:1}.ix-tabs{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const E = [["A", [["Accessibility", "12, 40"], ["Appointments", "3"]]], ["D", [["Design systems", "18"], ["Discovery", "7, 22"]]], ["P", [["Pharmacy", "27"], ["Prototypes", "9, 31", 1]]], ["R", [["Research", "5, 14"]]], ["S", [["Service design", "36"]]]]; let n = 0; return '<section class="ix-hero" aria-labelledby="h"><div><span class="ix-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Get in touch") + '</div><div class="ix-book" aria-hidden="true"><span class="ix-tabs"><i></i><i></i><i></i></span><h3>Index</h3><div class="ix-entries">' + E.map(g => "<b>" + g[0] + "</b>" + g[1].map(e => '<span class="' + (e[2] ? "on" : "") + '" style="--d:' + (0.4 + (n++) * 0.14).toFixed(2) + 's">' + e[0] + "<em>" + e[1] + "</em></span>").join("")).join("") + "</div></div></section>"; },
  work: (k) => '<section class="ix-work" id="work"><h2>' + k.h("work", "Selected work") + '</h2><div class="ix-list">' + k.c.cards.map((x, i) => '<article class="ix-w"><span>p. ' + (3 + i * 12) + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="ix-svc" id="services"><h2>' + k.h("services", "How I can help") + '</h2><dl>' + k.c.services.slice(0, 3).map(s => "<div><dt>" + k.E(s.title) + "</dt><dd>" + k.E(s.description || "") + "</dd></div>").join("") + "</dl></section>",
  about: (k) => '<section class="ix-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? '<dl class="ix-cv">' + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ix-end" id="contact"><h2>' + k.h("contact", "See also: working together.") + '</h2>' + k.cta("Get in touch") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

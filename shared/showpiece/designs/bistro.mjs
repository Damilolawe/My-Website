export default {
  id: "md-renault",
  root: "cf",
  fonts: "family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Josefin+Sans:wght@400;600",
  labels: { work: "The menu", services: "Reservations", about: "Our story", contact: "Book a table" },
  demo: {
    name: "Cafe Margot", headline: "Lunch, the French way.", heroLabel: "A neighbourhood bistro since 1987",
    bio: "Steak frites, onion soup and a wine list written on the mirror. Lunch is two courses and a coffee, dinner is long and loud, and the tarte tatin is always worth the wait.",
    cards: [
      { title: "Soupe a l'oignon", description: "Slow onions, beef stock and a lid of melted Comte." },
      { title: "Steak frites", description: "Bavette, shallot butter and fries cooked twice." },
      { title: "Tarte tatin", description: "Caramelised apples, baked to order, with creme fraiche." },
    ],
    services: [
      { title: "Lunch menu", description: "Two courses and coffee, Tuesday to Saturday." },
      { title: "Private dining", description: "The back room seats 18." },
      { title: "Wine evenings", description: "First Thursday of the month, six wines, one host." },
    ],
  },
  css: `
.cf{--red:#b3202a;--cream:#f8f1e4;--navy:#16233f;--board:#202422;--chalk:#f2efe6;--gold:#c9a24b;--ink:#1d1b18;background:var(--cream);color:var(--ink);font:400 17px/1.7 "Josefin Sans",system-ui,sans-serif}
.cf header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--navy);color:var(--cream)}
.cf .brand{font:italic 700 26px/1 "Playfair Display";text-decoration:none}
.cf nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600;text-transform:uppercase;letter-spacing:.12em;font-size:13px}.cf nav a{text-decoration:none}.cf nav a:hover{color:var(--gold)}
.cf-awning{height:70px;background:repeating-linear-gradient(90deg,var(--red) 0 60px,var(--cream) 60px 120px);-webkit-mask:radial-gradient(30px 22px at 30px 70px,transparent 98%,#000) -0px 0/60px 100%;mask:radial-gradient(30px 22px at 30px 70px,transparent 98%,#000) 0 0/60px 100%;transform-origin:top;animation:cf-flap 3s ease-in-out infinite alternate}
@keyframes cf-flap{to{transform:scaleY(.92) skewX(-1deg)}}
.cf-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.cf-label{font-weight:600;text-transform:uppercase;letter-spacing:.16em;font-size:13px;color:var(--red)}
.cf h1{margin-top:14px;font:900 clamp(56px,8.4vw,140px)/.95 "Playfair Display";letter-spacing:-.02em;color:var(--navy)}
.cf h1 .ch{animation:cf-in .8s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes cf-in{from{opacity:0;transform:translateY(.25em)}}
.cf-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.cf .cta{display:inline-flex;margin-top:28px;padding:16px 30px;background:var(--red);color:var(--cream);font-weight:600;text-transform:uppercase;letter-spacing:.12em;font-size:14px;text-decoration:none;transition:background .2s}.cf .cta:hover{background:var(--navy)}.cf .cta-muted{background:#ece2cf;color:#6b604f;text-transform:none;letter-spacing:0}
.cf-board{position:relative;padding:clamp(26px,3vw,40px);border:14px solid #6d4a2b;border-radius:6px;background:radial-gradient(circle at 30% 20%,#2c312e,var(--board));color:var(--chalk);box-shadow:0 30px 50px -30px rgba(0,0,0,.6);transform:rotate(1.5deg)}
.cf-board h3{font:italic 700 clamp(30px,3vw,40px)/1 "Playfair Display";text-align:center}
.cf-board ul{margin-top:18px}
.cf-board li{display:flex;align-items:baseline;gap:10px;padding:10px 0;font-size:clamp(16px,1.4vw,19px);clip-path:inset(0 100% 0 0);animation:cf-chalk 1s steps(18) both;animation-delay:var(--d)}
.cf-board li:after{content:"";flex:1;order:1;border-bottom:2px dotted rgba(242,239,230,.4)}
.cf-board li b{order:2;font:700 20px "Playfair Display"}
@keyframes cf-chalk{to{clip-path:inset(0 0 0 0)}}
.cf-board small{display:block;margin-top:16px;text-align:center;font:italic 400 16px "Playfair Display";color:var(--gold)}
.cf h2{font:900 clamp(42px,6vw,98px)/1 "Playfair Display";letter-spacing:-.02em;color:var(--navy);max-width:14ch}
.cf-menu{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--navy);color:var(--cream)}.cf-menu h2{color:var(--cream)}
.cf-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:clamp(40px,6vw,70px)}
.cf-d{text-align:center}
.cf-plate{display:block;width:70%;aspect-ratio:1;margin:0 auto 20px;border-radius:50%;background:radial-gradient(circle,var(--c) 0 45%,#fff 46% 62%,#e7e3da 63% 66%,#fff 67%);box-shadow:0 20px 30px -20px rgba(0,0,0,.6);transition:transform .5s}.cf-d:hover .cf-plate{transform:rotate(30deg)}
.cf-d img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:50%;margin-bottom:20px}
.cf-d h3{font:italic 700 28px/1.15 "Playfair Display";color:var(--gold)}.cf-d p{margin-top:8px;color:#d6d0c3}
.cf-res{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.cf-res ul{margin-top:clamp(36px,5vw,56px)}
.cf-res li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:24px 0;border-top:1px solid var(--navy)}
.cf-res h3{font:italic 700 32px "Playfair Display";color:var(--red)}
.cf-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--red);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.cf-about h2{color:var(--cream)}.cf-about>p{font:italic 400 clamp(20px,2vw,26px)/1.55 "Playfair Display"}.cf-about dl{grid-column:2;margin:0}.cf-about dt{font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-top:16px;color:var(--gold)}.cf-about dd{margin:2px 0 0}
.cf-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.cf-end h2{margin:0 auto}
.cf footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--navy);color:var(--cream)}
@media(max-width:900px){.cf nav{gap:12px;font-size:11px}.cf-hero,.cf-list,.cf-about,.cf-res li{grid-template-columns:1fr}.cf-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.cf-board li{clip-path:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + '</nav></header><div class="cf-awning" aria-hidden="true"></div>',
  hero: (k) => { const m = [["Soupe a l'oignon", "9"], ["Moules marinieres", "14"], ["Steak frites", "19"], ["Tarte tatin", "8"]]; return '<section class="cf-hero" aria-labelledby="h"><div><span class="cf-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a table") + '</div><div class="cf-board" aria-hidden="true"><h3>Aujourd\'hui</h3><ul>' + m.map((x, i) => '<li style="--d:' + (0.6 + i * 0.7).toFixed(1) + 's">' + x[0] + "<b>" + x[1] + "</b></li>").join("") + "</ul><small>Wine of the day on the mirror</small></div></section>"; },
  work: (k) => { const c = ["#c98a3a", "#7a3b26", "#e0a54a"]; return '<section class="cf-menu" id="work"><h2>' + k.h("work", "From the kitchen") + '</h2><div class="cf-list">' + k.c.cards.map((x, i) => '<article class="cf-d" style="--c:' + c[i % 3] + '">' + (k.photo(i) || '<span class="cf-plate" aria-hidden="true"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="cf-res" id="services"><h2>' + k.h("services", "Reservations") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="cf-about" id="about"><h2>' + k.h("about", "Since 1987") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="cf-end" id="contact"><h2>' + k.h("contact", "A table for two?") + '</h2>' + k.cta("Book a table") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

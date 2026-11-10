export default {
  id: "md-together-ai",
  root: "lt",
  fonts: "family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700",
  labels: { work: "Suppers", services: "Seats", about: "The hosts", contact: "Reserve a seat" },
  demo: {
    name: "The Long Table", headline: "Dinner with strangers.", heroLabel: "A monthly supper club",
    bio: "Once a month we set one long table for twenty-four people who have never met. Five courses, shared plates and a seating plan that puts you next to someone new. Most people leave as friends.",
    cards: [
      { title: "The harvest supper", description: "Squash, smoked trout and a pear tart, by candlelight in a barn." },
      { title: "The noodle night", description: "Hand-pulled noodles, made at the table by our guest chef." },
      { title: "The midsummer feast", description: "Long evening, garden table, strawberries and elderflower." },
    ],
    services: [
      { title: "A single seat", description: "Come alone. That is the point." },
      { title: "A pair", description: "Two seats, placed at opposite ends." },
      { title: "The whole table", description: "Private suppers for birthdays and teams." },
    ],
  },
  css: `
.lt{--linen:#f7f0e6;--wine:#6e1f2e;--olive:#5d6b3a;--wood:#8a5a3a;--ink:#2b1d17;--gold:#e4b363;background:var(--linen);color:var(--ink);font:400 17px/1.7 "DM Sans",system-ui,sans-serif}
.lt header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.lt .brand{font:italic 400 26px/1 "DM Serif Display";text-decoration:none;color:var(--wine)}
.lt nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.lt nav a{text-decoration:none}.lt nav a:hover{color:var(--wine)}
.lt-hero{padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);text-align:center}
.lt-label{font-weight:700;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--olive)}
.lt h1{margin:14px auto 0;max-width:12ch;font:400 clamp(58px,9vw,150px)/.95 "DM Serif Display";letter-spacing:-.02em;color:var(--wine)}
.lt h1 .ch{animation:lt-in 1s ease both;animation-delay:calc(var(--i) * 35ms)}@keyframes lt-in{from{opacity:0;transform:translateY(.3em)}}
.lt-hero p{margin:22px auto 0;max-width:52ch}
.lt .cta{display:inline-flex;margin-top:28px;padding:16px 32px;border-radius:999px;background:var(--wine);color:var(--linen);font-weight:700;text-decoration:none;transition:background .3s}.lt .cta:hover{background:var(--olive)}.lt .cta-muted{background:#ece0cf;color:#7d6a5d}
.lt-table{position:relative;max-width:1100px;height:clamp(200px,20vw,260px);margin:clamp(40px,6vw,70px) auto 0;border-radius:24px;background:repeating-linear-gradient(90deg,#94603e 0 120px,#8a5a3a 120px 124px),var(--wood);box-shadow:0 30px 50px -30px rgba(43,29,23,.6);display:grid;grid-template-columns:repeat(6,1fr);align-items:center;padding:0 3%}
.lt-table:before{content:"";position:absolute;left:0;right:0;top:50%;height:44px;margin-top:-22px;background:repeating-linear-gradient(90deg,#efe2cc 0 20px,#e8d8bd 20px 40px)}
.lt-place{position:relative;display:grid;place-items:center;height:100%;grid-template-rows:1fr 1fr}
.lt-plate{width:clamp(48px,5vw,70px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,var(--f) 0 34%,#fff 36% 70%,#e5ddd0 72% 76%,#fff 78%);box-shadow:0 6px 10px -4px rgba(0,0,0,.35);animation:lt-serve .6s cubic-bezier(.3,1.5,.5,1) both;animation-delay:var(--d)}
@keyframes lt-serve{from{opacity:0;transform:translateY(-40px) scale(.6)}}
.lt-candle{position:absolute;left:50%;top:50%;width:10px;height:26px;margin:-26px 0 0 -5px;border-radius:3px;background:#fff8e6;z-index:2}
.lt-candle:before{content:"";position:absolute;left:50%;top:-14px;width:10px;height:16px;margin-left:-5px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 50% 70%,#fff3b0,var(--gold) 60%,#ff8a3d);box-shadow:0 0 18px 6px rgba(228,179,99,.6);animation:lt-flick .2s ease-in-out infinite alternate}
@keyframes lt-flick{to{transform:scale(.9,1.1) translateX(1px);opacity:.85}}
.lt h2{font:400 clamp(44px,6.4vw,104px)/1 "DM Serif Display";letter-spacing:-.015em;color:var(--wine);max-width:14ch}
.lt-suppers{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--olive);color:var(--linen)}.lt-suppers h2{color:var(--linen)}
.lt-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin-top:clamp(40px,6vw,70px)}
.lt-menu{padding:30px 26px;background:var(--linen);color:var(--ink);text-align:center;border-radius:4px;box-shadow:0 20px 30px -20px rgba(0,0,0,.5)}
.lt-menu:before{content:"Menu";display:block;font:italic 400 18px "DM Serif Display";color:var(--olive);margin-bottom:12px}
.lt-menu img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px;margin-bottom:14px}
.lt-menu h3{font:400 28px/1.1 "DM Serif Display";color:var(--wine)}.lt-menu p{margin-top:10px;font-size:15px}
.lt-seats{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.lt-seats ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.lt-seats li{padding:30px;border-radius:24px;border:1px solid #d9c8b2}.lt-seats li:nth-child(2){background:var(--wine);color:var(--linen);border-color:var(--wine)}
.lt-seats h3{font:400 28px "DM Serif Display"}.lt-seats p{margin-top:8px}
.lt-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--gold);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.lt-about>p{font-size:clamp(19px,1.8vw,24px)}.lt-about dl{grid-column:2;margin:0}.lt-about dt{font:400 22px "DM Serif Display";color:var(--wine);margin-top:16px}.lt-about dd{margin:2px 0 0}
.lt-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.lt-end h2{margin:0 auto}
.lt footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#7d6a5d}
@media(max-width:900px){.lt nav{gap:12px;font-size:14px}.lt-list,.lt-seats ul,.lt-about{grid-template-columns:1fr}.lt-about dl{grid-column:auto}.lt-table{grid-template-columns:repeat(3,1fr)}.lt-place:nth-child(n+4){display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const f = ["#c8693b", "#7a8f3f", "#b8323c", "#e0a64a", "#5c7d3a", "#9d3a2e"]; const pl = (i) => '<span class="lt-plate" style="--f:' + f[i % 6] + ";--d:" + (0.8 + i * 0.12).toFixed(2) + 's"></span>'; return '<section class="lt-hero" aria-labelledby="h"><span class="lt-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Reserve a seat") + '<div class="lt-table" aria-hidden="true">' + Array.from({ length: 6 }, (_, i) => '<span class="lt-place">' + pl(i) + pl(i + 6) + (i % 2 ? '<span class="lt-candle"></span>' : "") + "</span>").join("") + "</div></section>"; },
  work: (k) => '<section class="lt-suppers" id="work"><h2>Past suppers</h2><div class="lt-list">' + k.c.cards.map((x, i) => '<article class="lt-menu">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="lt-seats" id="services"><h2>Pull up a chair</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="lt-about" id="about"><h2>Your hosts</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="lt-end" id="contact"><h2>There is a seat with your name on it.</h2>' + k.cta("Reserve a seat") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

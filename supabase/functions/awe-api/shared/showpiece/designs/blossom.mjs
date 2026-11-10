export default {
  id: "bloom",
  root: "bh",
  fonts: "family=Petrona:ital,wght@0,400;0,600;1,400&family=Nunito+Sans:wght@400;600;700",
  labels: { work: "Arrangements", services: "Services", about: "Our story", contact: "Order flowers" },
  demo: {
    name: "Bloom House", headline: "Grown nearby, arranged by hand.", heroLabel: "Seasonal florist",
    bio: "We grow half of our flowers on a small plot outside town and buy the rest from farms we know by name. Bouquets, weddings and weekly flowers, wrapped in paper, never plastic.",
    cards: [
      { title: "The weekly bunch", description: "Whatever is best that week, delivered every Friday." },
      { title: "A meadow wedding", description: "Wild-looking arches, loose bouquets and dried flower buttonholes." },
      { title: "Dried wreaths", description: "Lavender, wheat and statice that last all winter." },
    ],
    services: [
      { title: "Bouquets", description: "Same-day delivery in town." },
      { title: "Weddings", description: "From one bouquet to the whole barn." },
      { title: "Workshops", description: "Wreath and arranging evenings." },
    ],
  },
  css: `
.bh{--cream:#fbf6ee;--sage:#a8b89a;--moss:#4f6343;--peach:#f4b69c;--rose:#e88a98;--butter:#f6dd8a;--ink:#2e2a24;background:var(--cream);color:var(--ink);font:400 17px/1.75 "Nunito Sans",system-ui,sans-serif}
.bh header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.bh .brand{font:italic 600 26px/1 Petrona;text-decoration:none;color:var(--moss)}
.bh nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.bh nav a{text-decoration:none}.bh nav a:hover{color:var(--rose)}
.bh-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.bh-label{font:italic 400 20px Petrona;color:var(--moss)}
.bh h1{margin-top:12px;font:600 clamp(52px,7.6vw,128px)/1 Petrona;letter-spacing:-.025em}
.bh h1 .ch{animation:bh-in 1s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes bh-in{from{opacity:0;transform:translateY(.25em)}}
.bh-hero p{margin-top:22px;max-width:44ch;color:#4d473d}
.bh .cta{display:inline-flex;margin-top:28px;padding:15px 30px;border-radius:999px;background:var(--moss);color:var(--cream);font-weight:700;text-decoration:none;transition:background .3s}.bh .cta:hover{background:var(--rose)}.bh .cta-muted{background:#efe6d6;color:#7a7163}
.bh-vase{position:relative;justify-self:center;width:min(100%,420px);aspect-ratio:.9}
.bh-jar{position:absolute;left:34%;right:34%;bottom:0;height:30%;border-radius:20px 20px 40px 40px;background:linear-gradient(90deg,rgba(168,184,154,.4),rgba(255,255,255,.7) 40%,rgba(168,184,154,.5));box-shadow:inset 0 -40% 0 rgba(168,184,154,.35);border:2px solid rgba(79,99,67,.25)}
.bh-stem{position:absolute;left:50%;bottom:22%;width:4px;height:var(--h);margin-left:-2px;background:var(--moss);border-radius:2px;transform-origin:bottom;transform:rotate(var(--r));animation:bh-grow 1.4s cubic-bezier(.3,.8,.4,1) both;animation-delay:var(--d)}
@keyframes bh-grow{from{transform:rotate(var(--r)) scaleY(0)}}
.bh-flower{position:absolute;left:50%;top:-30px;width:60px;height:60px;margin-left:-30px;animation:bh-open 1s cubic-bezier(.3,1.6,.5,1) both,bh-sway 4s ease-in-out infinite alternate;animation-delay:calc(var(--d) + 1.1s),calc(var(--d) + 2s)}
.bh-flower i{position:absolute;left:50%;top:50%;width:26px;height:40px;margin:-40px 0 0 -13px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:var(--c);transform-origin:50% 100%;transform:rotate(var(--a))}
.bh-flower:after{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px;border-radius:50%;background:var(--butter);box-shadow:inset 0 0 0 4px rgba(0,0,0,.06)}
@keyframes bh-open{from{transform:scale(0) rotate(-90deg)}}
@keyframes bh-sway{to{transform:rotate(8deg)}}
.bh-leaf{position:absolute;left:50%;top:40%;width:34px;height:16px;border-radius:0 100%;background:var(--sage);transform-origin:left;transform:rotate(-30deg)}
.bh-leaf.r{transform:scaleX(-1) rotate(-30deg)}
.bh h2{font:600 clamp(42px,6vw,98px)/1.02 Petrona;letter-spacing:-.02em;max-width:14ch}
.bh-arr{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#f3e7d6}
.bh-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin-top:clamp(40px,6vw,70px)}
.bh-a{text-align:center}
.bh-arch{display:block;aspect-ratio:.8;border-radius:999px 999px 20px 20px;background:var(--g);margin-bottom:20px;transition:transform .5s}.bh-a:hover .bh-arch,.bh-a:hover img{transform:translateY(-8px)}
.bh-a img{width:100%;aspect-ratio:.8;object-fit:cover;border-radius:999px 999px 20px 20px;margin-bottom:20px;transition:transform .5s}
.bh-a h3{font:600 26px/1.15 Petrona}.bh-a p{margin-top:6px;color:#5b5448}
.bh-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.bh-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.bh-svc li{padding:30px;border-radius:30px;background:var(--c)}
.bh-svc h3{font:600 26px Petrona}.bh-svc p{margin-top:6px}
.bh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--moss);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.bh-about>p{font:italic 400 clamp(21px,2vw,27px)/1.55 Petrona}.bh-about dl{grid-column:2;margin:0}.bh-about dt{font-weight:700;color:var(--butter);margin-top:16px}.bh-about dd{margin:2px 0 0}
.bh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 20% 20%,rgba(232,138,152,.25),transparent 40%),radial-gradient(circle at 80% 70%,rgba(246,221,138,.35),transparent 40%)}.bh-end h2{margin:0 auto}
.bh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#7a7163}
@media(max-width:900px){.bh nav{gap:12px;font-size:14px}.bh-hero,.bh-list,.bh-svc ul,.bh-about{grid-template-columns:1fr}.bh-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const F = [["58%", "-24deg", "var(--rose)", ".2s", 6], ["68%", "-6deg", "var(--peach)", ".5s", 8], ["62%", "14deg", "var(--butter)", ".8s", 5], ["48%", "30deg", "#c9a7e8", "1.1s", 6], ["44%", "-38deg", "#fff", "1.4s", 7]]; return '<section class="bh-hero" aria-labelledby="h"><div><span class="bh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Order flowers") + '</div><div class="bh-vase" aria-hidden="true">' + F.map(f => '<span class="bh-stem" style="--h:' + f[0] + ";--r:" + f[1] + ";--d:" + f[3] + '"><span class="bh-leaf"></span><span class="bh-leaf r"></span><span class="bh-flower" style="--c:' + f[2] + '">' + Array.from({ length: f[4] }, (_, i) => '<i style="--a:' + Math.round(i * 360 / f[4]) + 'deg"></i>').join("") + "</span></span>").join("") + '<span class="bh-jar"></span></div></section>'; },
  work: (k) => { const g = ["radial-gradient(circle at 40% 40%,#e88a98 0 14%,transparent 15%),radial-gradient(circle at 62% 52%,#f6dd8a 0 12%,transparent 13%),radial-gradient(circle at 46% 66%,#f4b69c 0 14%,transparent 15%),#a8b89a", "linear-gradient(#fbf6ee,#f3dfe2)", "radial-gradient(circle,transparent 0 30%,#c9a46b 31% 50%,transparent 51%),#efe3cf"]; return '<section class="bh-arr" id="work"><h2>' + k.h("work", "Arrangements") + '</h2><div class="bh-list">' + k.c.cards.map((x, i) => '<article class="bh-a">' + (k.photo(i) || '<span class="bh-arch" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => { const c = ["#f9d9cd", "#e3ead9", "#fbefc6"]; return '<section class="bh-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li style="--c:' + c[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="bh-about" id="about"><h2>' + k.h("about", "Our story") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="bh-end" id="contact"><h2>' + k.h("contact", "Send someone a little spring.") + '</h2>' + k.cta("Order flowers") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

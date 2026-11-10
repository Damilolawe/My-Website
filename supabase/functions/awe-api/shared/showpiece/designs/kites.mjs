export default {
  id: "md-mistral-ai",
  root: "kt",
  fonts: "family=Shrikhand&family=Quicksand:wght@400;600;700",
  labels: { work: "Kites", services: "Lessons", about: "The shop", contact: "Visit us" },
  demo: {
    name: "North Wind Kites", headline: "Catch the wind.", heroLabel: "Kite shop and flying lessons on the cliffs",
    bio: "We make, sell and repair kites in a little shop at the top of the cliff path. On windy weekends we run lessons on the headland, and kids under ten fly free.",
    cards: [
      { title: "The diamond", description: "Our classic single-line kite, sewn by hand, flies in light wind." },
      { title: "The stunt kite", description: "Two lines, loops and dives. Comes with a lesson." },
      { title: "The giant octopus", description: "Eight metres of tails. Needs a strong wind and two people." },
    ],
    services: [
      { title: "First flight", description: "An hour on the headland for beginners." },
      { title: "Stunt school", description: "Loops, spins and landings in three sessions." },
      { title: "Kite repairs", description: "Torn sails and snapped spars fixed in a week." },
    ],
  },
  css: `
.kt{--sky:#8fd3ff;--sky2:#d7f0ff;--sun:#ffd447;--red:#ff4f4f;--teal:#16b8a6;--grass:#58b85a;--ink:#183049;--white:#fff;background:var(--sky2);color:var(--ink);font:400 18px/1.7 Quicksand,system-ui,sans-serif}
.kt header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);background:var(--sky)}
.kt .brand{font:400 26px/1 Shrikhand;text-decoration:none;color:var(--white);text-shadow:2px 2px 0 var(--ink)}
.kt nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.kt nav a{text-decoration:none}.kt nav a:hover{color:var(--white)}
.kt-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:center;padding:60px clamp(18px,4vw,56px) 180px;background:linear-gradient(var(--sky),var(--sky2));overflow:hidden;isolation:isolate}
.kt-hero:after{content:"";position:absolute;left:-5%;right:-5%;bottom:-60px;height:200px;border-radius:50% 50% 0 0;background:var(--grass);z-index:-1}
.kt-cloud{position:absolute;top:var(--y);width:var(--w);height:calc(var(--w) * .3);border-radius:999px;background:var(--white);opacity:.85;z-index:-2;animation:kt-drift var(--t) linear infinite;animation-delay:var(--d)}
.kt-cloud:before{content:"";position:absolute;left:20%;top:-50%;width:45%;height:120%;border-radius:50%;background:inherit}
@keyframes kt-drift{from{transform:translateX(-30vw)}to{transform:translateX(130vw)}}
.kt-label{font-weight:700;color:var(--ink)}
.kt h1{margin-top:10px;font:400 clamp(66px,11vw,190px)/.95 Shrikhand;color:var(--white);text-shadow:4px 4px 0 var(--ink);max-width:9ch}
.kt h1 .ch{display:inline-block;animation:kt-up 1s cubic-bezier(.3,1.5,.5,1) both,kt-sway 3s ease-in-out infinite alternate;animation-delay:calc(var(--i) * 50ms),calc(var(--i) * 90ms)}
@keyframes kt-up{from{opacity:0;transform:translateY(1em) rotate(20deg)}}
@keyframes kt-sway{from{translate:0 0}to{translate:0 -6px}}
.kt-hero p{margin-top:20px;max-width:44ch;font-weight:600}
.kt .cta{justify-self:start;display:inline-flex;margin-top:26px;padding:16px 30px;border-radius:999px;background:var(--red);color:var(--white);font-weight:700;text-decoration:none;box-shadow:0 5px 0 var(--ink);transition:transform .15s}.kt .cta:hover{transform:translateY(-3px) rotate(-2deg)}.kt .cta-muted{background:var(--white);color:#557;box-shadow:none}
.kt-kite{position:absolute;right:var(--r);top:var(--t);width:var(--s);aspect-ratio:.8;transform-origin:50% 120%;animation:kt-fly var(--p) ease-in-out infinite alternate;animation-delay:var(--d);z-index:-1}
.kt-kite b{position:absolute;inset:0;clip-path:polygon(50% 0,100% 40%,50% 100%,0 40%);background:conic-gradient(from 45deg at 50% 40%,var(--a) 0 25%,var(--b) 0 50%,var(--a) 0 75%,var(--b) 0)}
.kt-kite i{position:absolute;left:50%;top:100%;width:2px;height:60vh;background:rgba(24,48,73,.35);transform-origin:top;transform:rotate(-14deg)}
.kt-kite s{position:absolute;left:calc(50% - 6px);top:100%;width:12px;height:110px;background:repeating-linear-gradient(transparent 0 12px,var(--a) 12px 20px,transparent 20px 32px);animation:kt-tail 1s ease-in-out infinite alternate;transform-origin:top}
@keyframes kt-fly{from{transform:rotate(-8deg) translate(0,0)}to{transform:rotate(10deg) translate(-30px,20px)}}
@keyframes kt-tail{to{transform:skewX(18deg)}}
.kt h2{font:400 clamp(44px,6.4vw,104px)/1 Shrikhand;max-width:14ch}
.kt-kites{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--white)}
.kt-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.kt-k{position:relative;padding:28px;border-radius:30px;background:var(--sky2);text-align:center}
.kt-k:before{content:"";display:block;width:90px;aspect-ratio:.8;margin:0 auto 18px;clip-path:polygon(50% 0,100% 40%,50% 100%,0 40%);background:conic-gradient(from 45deg at 50% 40%,var(--a) 0 25%,var(--b) 0 50%,var(--a) 0 75%,var(--b) 0);transition:transform .4s}.kt-k:hover:before{transform:rotate(-14deg) translateY(-8px)}
.kt-k:has(img):before{display:none}
.kt-k img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px;margin-bottom:16px}
.kt-k h3{font:400 26px Shrikhand}.kt-k p{margin-top:8px}
.kt-lessons{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--grass);color:var(--white)}
.kt-lessons ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.kt-lessons li{padding:30px;border-radius:30px;background:rgba(255,255,255,.16)}
.kt-lessons h3{font:400 26px Shrikhand;color:var(--sun)}.kt-lessons p{margin-top:8px}
.kt-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sun);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.kt-about>p{font-size:clamp(19px,1.8vw,24px);font-weight:600}.kt-about dl{grid-column:2;margin:0}.kt-about dt{font:400 20px Shrikhand;margin-top:16px}.kt-about dd{margin:2px 0 0}
.kt-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--sky)}.kt-end h2{margin:0 auto;color:var(--white);text-shadow:4px 4px 0 var(--ink)}
.kt footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:600}
@media(max-width:900px){.kt nav{gap:12px;font-size:14px}.kt-list,.kt-lessons ul,.kt-about{grid-template-columns:1fr}.kt-about dl{grid-column:auto}.kt-kite{opacity:.5}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const kite = (r, t, s, a, b, p, d) => '<span class="kt-kite" aria-hidden="true" style="--r:' + r + ";--t:" + t + ";--s:" + s + ";--a:" + a + ";--b:" + b + ";--p:" + p + ";--d:" + d + '"><b></b><s></s><i></i></span>'; const cloud = (y, w, t, d) => '<span class="kt-cloud" aria-hidden="true" style="--y:' + y + ";--w:" + w + ";--t:" + t + ";--d:" + d + '"></span>'; return '<section class="kt-hero" aria-labelledby="h">' + cloud("12%", "180px", "60s", "-10s") + cloud("30%", "120px", "45s", "-30s") + cloud("8%", "240px", "80s", "-50s") + kite("12%", "10%", "clamp(110px,12vw,170px)", "var(--red)", "var(--sun)", "2.6s", "0s") + kite("30%", "30%", "clamp(70px,7vw,100px)", "var(--teal)", "var(--white)", "3.2s", "-1s") + kite("4%", "46%", "clamp(60px,6vw,80px)", "var(--ink)", "var(--red)", "2.2s", "-.5s") + '<span class="kt-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Visit the shop") + "</section>"; },
  work: (k) => { const c = [["var(--red)", "var(--sun)"], ["var(--teal)", "var(--ink)"], ["var(--sun)", "var(--teal)"]]; return '<section class="kt-kites" id="work"><h2>' + k.h("work", "Made in the shop") + '</h2><div class="kt-list">' + k.c.cards.map((x, i) => '<article class="kt-k" style="--a:' + c[i % 3][0] + ";--b:" + c[i % 3][1] + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="kt-lessons" id="services"><h2>' + k.h("services", "Lessons on the headland") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="kt-about" id="about"><h2>' + k.h("about", "At the top of the cliff path") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="kt-end" id="contact"><h2>' + k.h("contact", "Windy this weekend?") + '</h2>' + k.cta("Visit the shop") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

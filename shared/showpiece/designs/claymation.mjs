export default {
  id: "clay",
  root: "cy",
  fonts: "family=Grandstander:wght@600;800;900&family=Mulish:wght@400;600;700",
  labels: { work: "Features", services: "Pricing", about: "About", contact: "Try it free" },
  demo: {
    name: "Kiln", headline: "Plans you can actually hold.", heroLabel: "Project planning for small teams",
    bio: "Kiln turns your team's plans into chunky cards you can drag, stack and squish around a board. Deadlines bend, work shifts, and everyone can see what is happening without a meeting.",
    cards: [
      { title: "Drag, drop, done", description: "Move a task and every date after it shifts with it." },
      { title: "Weekly round-up", description: "A friendly summary of what finished, posted every Friday." },
      { title: "Workload blobs", description: "See who is overloaded at a glance, by how big their blob is." },
    ],
    services: [
      { title: "Free", description: "Up to five people, all the features." },
      { title: "Team", description: "Unlimited boards and guests." },
      { title: "Studio", description: "Client portals and time tracking." },
    ],
  },
  css: `
.cy{--cream:#fff4e6;--peach:#ffb48a;--berry:#ff6b8b;--sky:#7cc4ff;--mint:#7fe0b3;--sun:#ffd166;--grape:#9b7bff;--ink:#2c2240;background:var(--cream);color:var(--ink);font:400 17px/1.7 Mulish,system-ui,sans-serif}
.cy header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.cy .brand{font:900 28px/1 Grandstander;text-decoration:none}
.cy nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.cy nav a{text-decoration:none}.cy nav a:hover{color:var(--berry)}
.cy-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.cy-label{display:inline-block;padding:8px 16px;border-radius:999px;background:#fff;font-weight:700;font-size:14px;box-shadow:0 6px 0 rgba(44,34,64,.12)}
.cy h1{margin-top:18px;font:900 clamp(56px,8.4vw,140px)/.95 Grandstander;letter-spacing:-.02em}
.cy h1 .ch{display:inline-block;animation:cy-squish .7s cubic-bezier(.3,1.8,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes cy-squish{0%{opacity:0;transform:scale(1.6,.3) translateY(.4em)}60%{transform:scale(.9,1.15)}100%{transform:none}}
.cy-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.cy .cta{display:inline-flex;margin-top:28px;padding:18px 32px;border-radius:24px;background:var(--berry);color:#fff;font:800 18px Grandstander;text-decoration:none;box-shadow:inset 0 -8px 0 rgba(0,0,0,.15),0 10px 0 #c94a68;transition:transform .15s,box-shadow .15s}.cy .cta:hover{transform:translateY(6px);box-shadow:inset 0 -4px 0 rgba(0,0,0,.15),0 4px 0 #c94a68}.cy .cta-muted{background:#f3e3cf;color:#7a6c64;box-shadow:none;font:600 15px Mulish}
.cy-board{position:relative;aspect-ratio:1.1;border-radius:40px;background:#ffe7cf;box-shadow:inset 0 -14px 0 rgba(0,0,0,.05)}
.cy-blob{position:absolute;left:var(--x);top:var(--y);width:var(--w);aspect-ratio:var(--a);padding:16px;border-radius:30px;background:var(--c);box-shadow:inset -10px -14px 0 rgba(0,0,0,.12),inset 8px 10px 0 rgba(255,255,255,.35),0 18px 24px -14px rgba(44,34,64,.4);font:800 16px Grandstander;animation:cy-bounce 2.4s cubic-bezier(.4,0,.4,1) infinite;animation-delay:var(--d);transform-origin:50% 100%}
@keyframes cy-bounce{0%,100%{transform:translateY(0) scale(1,1)}10%{transform:translateY(0) scale(1.08,.9)}40%{transform:translateY(-22px) scale(.95,1.06)}70%{transform:translateY(0) scale(1.04,.94)}}
.cy-blob i{display:block;height:10px;margin-top:10px;border-radius:5px;background:rgba(255,255,255,.6);width:var(--p)}
.cy-eyes{position:absolute;right:14px;top:12px;display:flex;gap:6px}.cy-eyes:before,.cy-eyes:after{content:"";width:10px;height:12px;border-radius:50%;background:var(--ink);animation:cy-blink 4s steps(1) infinite}@keyframes cy-blink{96%{transform:scaleY(.1)}}
.cy h2{font:900 clamp(44px,6.4vw,104px)/.95 Grandstander;letter-spacing:-.02em;max-width:14ch}
.cy-feat{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.cy-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.cy-f{padding:28px;border-radius:36px;background:var(--c);box-shadow:inset -12px -16px 0 rgba(0,0,0,.08),inset 10px 12px 0 rgba(255,255,255,.35),0 24px 30px -20px rgba(44,34,64,.35);transition:transform .3s cubic-bezier(.3,1.8,.5,1)}.cy-f:hover{transform:scale(1.04,.96) rotate(-1deg)}
.cy-f img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:24px;margin-bottom:16px}
.cy-f h3{font:800 28px/1.1 Grandstander}.cy-f p{margin-top:8px}
.cy-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--cream)}
.cy-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.cy-price li{padding:30px;border-radius:36px;background:#3a2f55;box-shadow:inset -10px -12px 0 rgba(0,0,0,.2),inset 8px 10px 0 rgba(255,255,255,.06)}.cy-price li:nth-child(2){background:var(--grape)}
.cy-price h3{font:900 30px Grandstander}.cy-price p{margin-top:8px}
.cy-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sun);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.cy-about>p{font-size:clamp(19px,1.8vw,24px)}.cy-about dl{grid-column:2;margin:0}.cy-about dt{font:800 20px Grandstander;margin-top:16px}.cy-about dd{margin:2px 0 0}
.cy-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.cy-end h2{margin:0 auto}
.cy footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:600}
@media(max-width:900px){.cy nav{gap:12px;font-size:14px}.cy-hero,.cy-list,.cy-price ul,.cy-about{grid-template-columns:1fr}.cy-about dl{grid-column:auto}.cy-blob{font-size:13px;padding:12px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const B = [["Launch plan", "6%", "8%", "46%", "1.5", "var(--peach)", "0s", "70%"], ["Design review", "56%", "6%", "38%", "1.2", "var(--sky)", ".3s", "40%"], ["Ship it", "52%", "48%", "42%", "1.4", "var(--mint)", ".6s", "90%"], ["Copy", "10%", "56%", "34%", "1.1", "var(--sun)", ".9s", "55%"]]; return '<section class="cy-hero" aria-labelledby="h"><div><span class="cy-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Try it free") + '</div><div class="cy-board" aria-hidden="true">' + B.map(b => '<span class="cy-blob" style="--x:' + b[1] + ";--y:" + b[2] + ";--w:" + b[3] + ";--a:" + b[4] + ";--c:" + b[5] + ";--d:" + b[6] + ";--p:" + b[7] + '">' + b[0] + '<span class="cy-eyes"></span><i></i><i style="--p:40%"></i></span>').join("") + "</div></section>"; },
  work: (k) => { const c = ["var(--sky)", "var(--peach)", "var(--mint)"]; return '<section class="cy-feat" id="work"><h2>Squishy features</h2><div class="cy-list">' + k.c.cards.map((x, i) => '<article class="cy-f" style="--c:' + c[i % 3] + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="cy-price" id="services"><h2>Pricing</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="cy-about" id="about"><h2>Why clay?</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="cy-end" id="contact"><h2>Get your hands on your plans.</h2>' + k.cta("Try it free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

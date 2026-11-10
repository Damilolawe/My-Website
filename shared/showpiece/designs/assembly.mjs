export default {
  id: "md-mintlify",
  root: "ck",
  fonts: "family=Reddit+Sans:wght@400;600;800&family=Reddit+Mono:wght@400;600",
  labels: { work: "Manuals", services: "Process", about: "Studio", contact: "Contact" },
  intros: {
    work: { title: "Manuals we have written", text: "Instructions, guides and help centres people actually finish reading." },
    features: { title: "How we work", text: "We watch people use the thing, then write down only what they need." },
    studio: { title: "About Clear Steps", text: null },
    contact: { title: "Tell us what needs explaining", text: "Send us the product, the manual or the problem. We reply within two days." },
  },
  demo: {
    name: "Clear Steps", headline: "Instructions people actually follow.", heroLabel: "Technical writing and instruction design",
    bio: "We write manuals, setup guides and help centres for products that confuse people. Fewer words, clearer pictures, and every step tested with real users before it ships.",
    cards: [
      { title: "A flat-pack desk, rewritten", description: "From 42 steps to 14. Support calls about assembly fell by 60 percent." },
      { title: "A boiler control panel", description: "One page by the boiler, in plain words and four languages." },
      { title: "A help centre for a bank app", description: "200 articles cut to 60, each answering one question." },
    ],
    services: [
      { title: "Watch", description: "We observe people using your product, and note where they stop." },
      { title: "Write", description: "Short steps, one action each, with a drawing where words fail." },
      { title: "Test", description: "New readers try the draft. We fix every place they hesitate." },
    ],
  },
  css: `
.ck{--paper:#fbfbf7;--ink:#141414;--blue:#2457ff;--yellow:#ffd23f;--grid:#e8e8e0;--mute:#6b6b66;background:var(--paper);color:var(--ink);font:400 17px/1.7 "Reddit Sans",system-ui,sans-serif}
.ck header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:2px solid var(--ink)}
.ck .brand{display:flex;align-items:center;gap:10px;font:800 20px/1 "Reddit Sans";text-decoration:none}.ck .brand:before{content:"1";display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--ink);color:var(--paper);font:600 14px "Reddit Mono"}
.ck nav{display:flex;gap:clamp(12px,2vw,26px);font-weight:600;font-size:15px}.ck nav a{text-decoration:none}.ck nav a:hover,.ck nav a[aria-current]{color:var(--blue)}
.ck-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/28px 28px,var(--paper)}
.ck-label{font:600 13px "Reddit Mono";letter-spacing:.06em;text-transform:uppercase;color:var(--blue)}
.ck h1{margin-top:14px;font:800 clamp(50px,7.4vw,124px)/.96 "Reddit Sans";letter-spacing:-.04em}
.ck h1 .ch{animation:ck-in .45s ease both;animation-delay:calc(var(--i) * 22ms)}@keyframes ck-in{from{opacity:0;transform:translateY(.15em)}}
.ck-hero p{margin-top:22px;max-width:44ch;color:#3c3c38}
.ck .cta{display:inline-flex;align-items:center;gap:10px;margin-top:28px;padding:15px 26px;border-radius:8px;background:var(--blue);color:#fff;font-weight:800;text-decoration:none;transition:background .2s}.ck .cta:hover{background:var(--ink)}.ck .cta-muted{background:var(--grid);color:var(--mute)}
.ck-sheet{position:relative;aspect-ratio:1.05;border:2px solid var(--ink);border-radius:6px;background:#fff}
.ck-step{position:absolute;left:16px;top:14px;display:flex;gap:8px;align-items:center;font:600 13px "Reddit Mono"}
.ck-step b{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--ink);color:#fff;font:800 18px "Reddit Sans";counter-reset:s var(--st);animation:ck-steps 8s steps(4) infinite;--st:1}
.ck-step b:before{content:counter(s)}
@property --st{syntax:"<integer>";initial-value:1;inherits:false}
@keyframes ck-steps{from{--st:1}to{--st:5}}
.ck-stage{position:absolute;inset:16% 12% 10%}
.ck-seat{position:absolute;left:14%;right:14%;top:8%;height:20%;border:3px solid var(--ink);border-radius:50%;background:var(--yellow);animation:ck-seat 8s cubic-bezier(.6,0,.3,1) infinite}
@keyframes ck-seat{0%,25%{transform:translateY(-60px);opacity:.25}40%,100%{transform:none;opacity:1}}
.ck-leg{position:absolute;top:22%;width:6%;height:66%;border:3px solid var(--ink);border-radius:3px;background:#fff;transform-origin:top;transform:rotate(var(--r));animation:ck-leg 8s cubic-bezier(.6,0,.3,1) infinite;animation-delay:var(--d)}
@keyframes ck-leg{0%{transform:rotate(var(--r)) translateY(40px);opacity:0}12%,100%{transform:rotate(var(--r));opacity:1}}
.ck-bar{position:absolute;left:24%;right:24%;top:62%;height:5%;border:3px solid var(--ink);background:#fff;animation:ck-bar 8s cubic-bezier(.6,0,.3,1) infinite}
@keyframes ck-bar{0%,15%{transform:translateX(120px);opacity:0}28%,100%{transform:none;opacity:1}}
.ck-screw{position:absolute;left:var(--x);top:var(--y);width:16px;height:16px;border-radius:50%;border:3px solid var(--ink);background:conic-gradient(var(--ink) 0 8%,#fff 0 50%,var(--ink) 0 58%,#fff 0);animation:ck-screw 8s linear infinite}
@keyframes ck-screw{0%,40%{transform:translateY(-30px) rotate(0);opacity:0}48%{opacity:1;transform:translateY(0) rotate(0)}62%,100%{transform:rotate(720deg);opacity:1}}
.ck-call{position:absolute;left:var(--x);top:var(--y);display:grid;place-items:center;width:28px;height:28px;border-radius:50%;border:2px solid var(--blue);background:#fff;color:var(--blue);font:600 13px "Reddit Mono"}
.ck-call:after{content:"";position:absolute;left:100%;top:50%;width:var(--l);border-top:2px dashed var(--blue);transform-origin:left;transform:rotate(var(--a))}
.ck-check{position:absolute;right:16px;bottom:14px;padding:6px 12px;border-radius:999px;background:#e6f8ec;color:#1b8a4b;font:600 13px "Reddit Mono";animation:ck-ok 8s steps(1) infinite}@keyframes ck-ok{0%,64%{opacity:0}65%,100%{opacity:1}}
.ck-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);border-bottom:2px solid var(--ink);background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/28px 28px}
.ck-intro h1{font-size:clamp(44px,6.6vw,108px)}.ck-intro p{margin-top:18px;max-width:50ch;color:#3c3c38}
.ck h2{font:800 clamp(40px,5.6vw,92px)/.98 "Reddit Sans";letter-spacing:-.04em;max-width:15ch}
.ck-man{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ck-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px);counter-reset:m}
.ck-m{padding:26px;border:2px solid var(--ink);border-radius:6px;background:#fff;counter-increment:m;position:relative}
.ck-m:before{content:counter(m);position:absolute;right:20px;top:18px;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--yellow);border:2px solid var(--ink);font:800 16px "Reddit Sans"}
.ck-m small{font:600 12px "Reddit Mono";text-transform:uppercase;color:var(--blue)}
.ck-m img{width:100%;aspect-ratio:16/10;object-fit:cover;margin:14px 0;border:2px solid var(--ink)}
.ck-m h3{margin-top:12px;max-width:16ch;font:800 22px/1.2 "Reddit Sans"}.ck-m p{margin-top:8px;color:#4a4a46}
.ck-proc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper)}
.ck-proc ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-top:clamp(36px,5vw,56px);counter-reset:p}
.ck-proc li{position:relative;padding:28px 24px 0 0;counter-increment:p}
.ck-proc li:before{content:counter(p);display:grid;place-items:center;width:48px;height:48px;margin-bottom:18px;border-radius:50%;background:var(--yellow);color:var(--ink);font:800 22px "Reddit Sans";position:relative;z-index:1}
.ck-proc li:after{content:"";position:absolute;left:48px;right:0;top:52px;border-top:2px dashed #555}.ck-proc li:last-child:after{display:none}
.ck-proc h3{font:800 26px "Reddit Sans"}.ck-proc p{margin-top:6px;color:#c9c9c2}
.ck-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ck-about>p{font-size:clamp(19px,1.8vw,24px)}.ck-about dl{grid-column:2;margin:0}.ck-about dt{font:600 13px "Reddit Mono";text-transform:uppercase;margin-top:16px}.ck-about dd{margin:2px 0 0}
.ck-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ck-end h2{margin:0 auto}
.ck footer{display:flex;justify-content:space-between;padding:20px clamp(18px,4vw,56px);font:400 13px "Reddit Mono";color:var(--mute);border-top:2px solid var(--ink)}
@media(max-width:900px){.ck nav{gap:10px;font-size:13px}.ck-hero,.ck-list,.ck-proc ol,.ck-about{grid-template-columns:1fr}.ck-proc li:after{display:none}.ck-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ck-hero" aria-labelledby="h"><div><span class="ck-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Get your manual fixed") + '</div><div class="ck-sheet" aria-hidden="true"><span class="ck-step"><b></b>of 4</span><div class="ck-stage"><span class="ck-leg" style="left:47%;--r:0deg;--d:.4s;opacity:.6"></span><span class="ck-leg" style="left:24%;--r:8deg;--d:0s"></span><span class="ck-leg" style="right:24%;--r:-8deg;--d:.2s"></span><span class="ck-bar"></span><span class="ck-seat"></span><span class="ck-screw" style="--x:26%;--y:20%"></span><span class="ck-screw" style="--x:68%;--y:20%"></span></div><span class="ck-call" style="--x:6%;--y:24%;--l:60px;--a:20deg">A</span><span class="ck-call" style="--x:8%;--y:70%;--l:70px;--a:-10deg">B</span><span class="ck-call" style="--x:86%;--y:40%;--l:60px;--a:160deg">C</span><span class="ck-check">Assembled in 6 minutes</span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="ck-intro" aria-labelledby="h"><span class="ck-label">' + k.E(k.c.name) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => { const t = ["Furniture", "Home heating", "Banking"]; return '<section class="ck-man" id="work"><h2>' + k.h("work", "Before and after") + '</h2><div class="ck-list">' + k.c.cards.map((x, i) => '<article class="ck-m"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ck-proc" id="services"><h2>' + k.h("services", "Three steps, every time") + '</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="ck-about" id="about"><h2>' + k.h("about", "The studio") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ck-end" id="contact"><h2>' + k.h("contact", "Step one: say hello.") + '</h2>' + k.cta("Get your manual fixed") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

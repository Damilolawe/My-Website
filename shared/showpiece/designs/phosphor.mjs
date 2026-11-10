export default {
  id: "terminal",
  root: "tm",
  fonts: "family=Major+Mono+Display&family=Fira+Code:wght@400;500;700",
  labels: { work: "Projects", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Sam Okonkwo", headline: "Hello, world.", heroLabel: "Backend developer",
    bio: "I build fast, boring, reliable backends: APIs, data pipelines and the systems that keep working at 3am. Twelve years of shipping, mostly in Go and Postgres.",
    cards: [
      { title: "Payments API, 99.99 percent uptime", description: "Rebuilt a payment service handling 2 million transactions a day." },
      { title: "A search index in a weekend", description: "Full-text search for a library catalogue of 4 million books." },
      { title: "Open-source job queue", description: "A tiny Postgres-backed queue with 3,000 stars and counting." },
    ],
    services: [
      { title: "Backend builds", description: "APIs and services, designed and shipped." },
      { title: "Performance", description: "Find the slow query. Fix the slow query." },
      { title: "Mentoring", description: "Code reviews and pairing for growing teams." },
    ],
  },
  css: `
.tm{--crt:#050d07;--glow:#3cff7a;--dim:#1f8a45;--amber:#ffbf3c;--bezel:#1a1c1a;--white:#d8ffe4;background:var(--crt);color:var(--glow);font:400 16px/1.7 "Fira Code",ui-monospace,monospace}
.tm header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);border-bottom:1px dashed var(--dim)}
.tm .brand{font:700 16px "Fira Code";text-decoration:none}.tm .brand:before{content:"~/";color:var(--dim)}
.tm nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:14px}.tm nav a{text-decoration:none;color:var(--dim)}.tm nav a:before{content:"./"}.tm nav a:hover,.tm nav a[aria-current]{color:var(--glow)}
.tm-hero{padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.tm-screen{position:relative;padding:clamp(22px,3vw,40px);border-radius:28px;background:radial-gradient(ellipse at center,#0b1f10,var(--crt) 80%);box-shadow:0 0 0 18px var(--bezel),0 0 0 20px #2a2d2a,0 40px 80px -30px #000,inset 0 0 120px rgba(60,255,122,.08);overflow:hidden;text-shadow:0 0 6px rgba(60,255,122,.7)}
.tm-screen:before{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(transparent 0 2px,rgba(0,0,0,.35) 2px 4px);z-index:2}
.tm-screen:after{content:"";position:absolute;left:0;right:0;height:80px;background:linear-gradient(transparent,rgba(60,255,122,.06),transparent);animation:tm-roll 6s linear infinite;z-index:2}@keyframes tm-roll{from{top:-80px}to{top:100%}}
.tm-boot{font-size:14px;color:var(--dim)}
.tm-boot span{display:block;opacity:0;animation:tm-line .01s forwards;animation-delay:var(--d)}
.tm-boot b{color:var(--glow);font-weight:400}
@keyframes tm-line{to{opacity:1}}
.tm-label{display:block;margin-top:18px;color:var(--amber);opacity:0;animation:tm-line .01s 1.6s forwards}
.tm h1{margin-top:12px;font:400 clamp(48px,8vw,132px)/1 "Major Mono Display";letter-spacing:-.02em;color:var(--white);text-shadow:0 0 10px rgba(60,255,122,.9),0 0 40px rgba(60,255,122,.4)}
.tm h1 .ch{animation:tm-type .01s both;animation-delay:calc(1.8s + var(--i) * 80ms)}@keyframes tm-type{from{visibility:hidden}}
.tm h1:after{content:"";display:inline-block;width:.5em;height:.8em;margin-left:.1em;background:var(--glow);vertical-align:-.05em;animation:tm-blink 1s steps(1) infinite}@keyframes tm-blink{50%{opacity:0}}
.tm-screen p{margin-top:22px;max-width:60ch;color:#a6f5c0}
.tm .cta{display:inline-flex;margin-top:24px;padding:12px 20px;border:1px solid var(--glow);color:var(--glow);text-decoration:none;transition:background .15s,color .15s}.tm .cta:before{content:"$ ";color:var(--dim)}.tm .cta:hover{background:var(--glow);color:var(--crt)}.tm .cta-muted{border-color:var(--dim);color:var(--dim)}.tm .cta-muted:before{content:"# "}
.tm h2{font:400 clamp(36px,5vw,80px)/1 "Major Mono Display";color:var(--white);max-width:16ch}.tm h2:before{content:"> ";color:var(--dim)}
.tm-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.tm-ls{margin-top:clamp(40px,6vw,70px);border:1px solid var(--dim)}
.tm-ls header{padding:10px 16px;border-bottom:1px solid var(--dim);color:var(--dim);font-size:13px}
.tm-row{display:grid;grid-template-columns:110px minmax(0,1fr) minmax(0,1.4fr);gap:20px;padding:18px 16px;border-bottom:1px dashed #12391f;transition:background .15s}.tm-row:hover{background:#0a2112}
.tm-row:last-child{border:0}
.tm-row span{color:var(--amber);font-size:13px}
.tm-row h3{font:500 17px "Fira Code";color:var(--white)}.tm-row p{color:#8fdcab;font-size:15px}
.tm-row img{grid-column:2/-1;width:100%;max-height:220px;object-fit:cover;filter:grayscale(1) sepia(1) hue-rotate(70deg) saturate(3) brightness(.8)}
.tm-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.tm-svc pre{margin-top:clamp(30px,4vw,50px);padding:24px;border:1px solid var(--dim);white-space:pre-wrap;font:400 15px/1.8 "Fira Code";color:#a6f5c0}
.tm-svc pre b{color:var(--amber);font-weight:400}.tm-svc pre i{color:var(--dim);font-style:normal}
.tm-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#081a0d;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(30px,6vw,90px);border-top:1px dashed var(--dim);border-bottom:1px dashed var(--dim)}.tm-about>p{color:#a6f5c0}.tm-about dl{grid-column:2;margin:0}.tm-about dt{color:var(--amber);margin-top:16px}.tm-about dt:before{content:"## "}.tm-about dd{margin:2px 0 0;color:#a6f5c0}
.tm-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.tm-end h2{margin:0 auto}
.tm footer{display:flex;justify-content:space-between;padding:20px clamp(18px,4vw,56px);font-size:13px;color:var(--dim)}
@media(max-width:900px){.tm nav{gap:10px;font-size:12px}.tm-row,.tm-about{grid-template-columns:1fr}.tm-row img{grid-column:auto}.tm-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.tm-boot span,.tm-label{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name.toLowerCase().replace(/\s+/g, "-")) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const B = ["<b>boot</b> loading kernel ........ ok", "<b>mount</b> /home/portfolio ...... ok", "<b>net</b> link up, 1 Gbps ...... ok", "<b>whoami</b>"]; return '<section class="tm-hero" aria-labelledby="h"><div class="tm-screen"><div class="tm-boot" aria-hidden="true">' + B.map((b, i) => '<span style="--d:' + (0.2 + i * 0.35).toFixed(2) + 's">' + b + "</span>").join("") + '</div><span class="tm-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("contact --now") + "</div></section>"; },
  work: (k) => '<section class="tm-proj" id="work"><h2>ls projects</h2><div class="tm-ls"><header>total ' + k.c.cards.length + "</header>" + k.c.cards.map((x, i) => '<article class="tm-row"><span>drwxr-xr-x 0' + (i + 1) + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="tm-svc" id="services"><h2>cat services</h2><pre>' + k.c.services.slice(0, 3).map(s => "<b>" + k.E(s.title) + "</b>\n<i>  # </i>" + k.E(s.description || "")).join("\n\n") + "</pre></section>",
  about: (k) => '<section class="tm-about" id="about"><h2>man me</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="tm-end" id="contact"><h2>ping me</h2>' + k.cta("contact --now") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">cd ~</a></footer>',
};

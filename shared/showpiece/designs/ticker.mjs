export default {
  id: "md-coinbase",
  root: "tk",
  fonts: "family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Geist+Mono:wght@500",
  labels: {work:"How it works",services:"Plans",about:"About",contact:"Talk to us"},
  intros: {work:{title:"How it works",text:"Connect your accounts once. We keep the picture up to date."},features:{title:"Plans",text:"Pick the help you need. Change or cancel any time."},studio:{title:"Who we are",text:null},contact:{title:"Talk to a planner",text:"Book a free review and we will walk through your numbers together."}},
  demo: {
    name: "The Future Fund", headline: "Money, made legible.", heroLabel: "Personal finance, explained",
    bio: "We turn your accounts into one clear picture: what's coming in, what's going out, and how much you can safely put away this month.",
    cards: [
      { title: "Monthly snapshot", description: "One page that shows where every dollar went." },
      { title: "Goal tracker", description: "Name it, price it, and watch the progress bar move." },
      { title: "Plain-language advice", description: "A real planner answers your questions within a day." },
    ],
    services: [
      { title: "Budget review", description: "A 45-minute call and a written plan." },
      { title: "Savings autopilot", description: "Rules that move money for you on payday." },
      { title: "Retirement check-in", description: "Are you on track? We'll show you the maths." },
    ],
  },
  css: `
.tk-item img{grid-column:1/-1;width:100%;max-height:260px;object-fit:cover;margin-top:14px}
@property --a{syntax:"<integer>";initial-value:0;inherits:false}@property --b{syntax:"<integer>";initial-value:0;inherits:false}
.tk{--blue:#0052ff;--ink:#0a1633;--sky:#eef3ff;--mint:#00c389;--line:#d5def3;background:#fff;color:var(--ink);font:400 17px/1.6 "Bricolage Grotesque",system-ui,sans-serif}
.tk header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px);border-bottom:1px solid var(--line)}
.tk .brand{font:800 22px/1 "Bricolage Grotesque";letter-spacing:-.04em;text-decoration:none;display:flex;align-items:center;gap:10px}.tk .brand:before{content:"";width:22px;height:22px;border-radius:50%;background:conic-gradient(var(--blue) 0 70%,var(--mint) 0)}
.tk nav{display:flex;gap:28px;font-weight:600}.tk nav a{text-decoration:none}.tk nav a:hover{color:var(--blue)}
.tk-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,120px) clamp(18px,4vw,56px)}
.tk h1{font:800 clamp(56px,8.4vw,140px)/.92 "Bricolage Grotesque";font-stretch:82%;letter-spacing:-.035em}
.tk h1 .ch{animation:fade .5s ease both;animation-delay:calc(var(--i) * 40ms)}@keyframes fade{from{opacity:0}}
.tk-hero p{margin-top:28px;font-size:clamp(18px,1.6vw,22px);max-width:40ch;color:#36446b}
.tk .cta{display:inline-flex;margin-top:32px;padding:17px 28px;border-radius:14px;background:var(--blue);color:#fff;font-weight:700;text-decoration:none;transition:background .2s}.tk .cta:hover{background:var(--ink)}.tk .cta-muted{background:var(--sky);color:var(--ink)}
.tk-board{position:relative;padding:clamp(24px,3vw,40px);border-radius:28px;background:var(--ink);color:#fff;overflow:hidden}
.tk-board small{font:500 14px "Geist Mono",monospace;color:#9fb3e8}
.tk-num{display:flex;align-items:baseline;margin-top:8px;font:800 clamp(64px,9vw,140px)/1 "Bricolage Grotesque";letter-spacing:-.05em;color:var(--mint);font-variant-numeric:tabular-nums}
.tk-num b{font-weight:800;animation:ca 2.6s cubic-bezier(.15,.85,.25,1) .4s both;counter-reset:a var(--a)}.tk-num b:after{content:counter(a)}@keyframes ca{to{--a:24}}
.tk-num i{font-style:normal;animation:cb 2.6s cubic-bezier(.15,.85,.25,1) .4s both;counter-reset:b var(--b)}.tk-num i:after{content:"." counter(b) "%"}@keyframes cb{to{--b:8}}
.tk-num:before{content:"+"}@media (prefers-reduced-motion:reduce){.tk-num b{--a:24}.tk-num i{--b:8}}
.tk-board svg{display:block;width:100%;height:auto;margin-top:20px;overflow:visible}
.tk-board .path{fill:none;stroke:var(--mint);stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:900;animation:draw 2.6s cubic-bezier(.15,.85,.25,1) .4s both}
.tk-board .area{fill:url(#g);animation:fade 1s ease 2.2s both}
.tk-board .grid{stroke:#ffffff1f;stroke-width:1}
@keyframes draw{from{stroke-dashoffset:900}}@keyframes draws{from{stroke-dashoffset:300}}
.tk-legend{display:flex;justify-content:space-between;margin-top:14px;font:500 13px "Geist Mono",monospace;color:#9fb3e8}
.tk-rows{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);background:var(--sky)}
.tk h2{font:800 clamp(38px,5.5vw,84px)/.98 "Bricolage Grotesque";font-stretch:82%;letter-spacing:-.03em;max-width:15ch}
.tk-list{margin-top:clamp(36px,5vw,64px);border-top:2px solid var(--ink)}
.tk-item{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) 160px;gap:30px;align-items:center;padding:30px 0;border-bottom:1px solid var(--line)}
.tk-item h3{font:700 clamp(22px,2.2vw,30px)/1.15 "Bricolage Grotesque";letter-spacing:-.03em}.tk-item p{color:#36446b}
.tk-item svg{width:100%;height:46px}.tk-item svg path{fill:none;stroke:var(--blue);stroke-width:3;stroke-linecap:round;stroke-dasharray:300}
@supports (animation-timeline:view()){.tk-item svg path{animation:draws linear both;animation-timeline:view();animation-range:entry 20% cover 45%}}
.tk-svc{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.tk-svc article{padding:30px;border:1px solid var(--line);border-radius:22px}.tk-svc h3{font:700 24px/1.2 "Bricolage Grotesque";margin-bottom:10px}.tk-svc p{color:#36446b}
.tk-end{margin:0 clamp(18px,4vw,56px) 40px;padding:clamp(50px,8vw,110px);border-radius:32px;background:var(--blue);color:#fff;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.tk-end .cta{background:#fff;color:var(--blue);margin:0}
.tk footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px;color:#56638a}
@media(max-width:860px){.tk nav{gap:14px;font-size:13px}.tk .brand{font-size:18px}.tk-hero,.tk-svc{grid-template-columns:1fr}.tk-item{grid-template-columns:1fr;gap:10px}.tk-item svg{max-width:220px}}
.tk-intro{padding:clamp(60px,9vw,130px) clamp(18px,4vw,56px) clamp(40px,6vw,80px);border-bottom:1px solid var(--line)}.tk-intro h1{font:800 clamp(52px,8vw,128px)/.94 "Bricolage Grotesque";font-stretch:82%;letter-spacing:-.035em;max-width:14ch}.tk-intro h1 .ch{animation:fade .5s ease both;animation-delay:calc(var(--i) * 30ms)}.tk-intro p{margin-top:22px;font-size:clamp(18px,1.6vw,22px);max-width:44ch;color:#36446b}
.tk-about{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.tk-about>p{font-size:clamp(19px,1.8vw,24px);color:#36446b}.tk-about dl{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin:0}.tk-about dl div{padding:26px;border-radius:20px;background:var(--sky)}.tk-about dt{font:500 13px "Geist Mono",monospace;color:var(--blue)}.tk-about dd{margin:10px 0 0;font-size:18px}
@media(max-width:860px){.tk-about,.tk-about dl{grid-template-columns:1fr}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="tk-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a free review") + '</div><div class="tk-board" aria-hidden="true"><small>Example savings growth, 12 months</small><div class="tk-num"><b></b><i></i></div><svg viewBox="0 0 600 220"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00c389" stop-opacity=".45"/><stop offset="1" stop-color="#00c389" stop-opacity="0"/></linearGradient></defs><line class="grid" x1="0" y1="55" x2="600" y2="55"/><line class="grid" x1="0" y1="110" x2="600" y2="110"/><line class="grid" x1="0" y1="165" x2="600" y2="165"/><path class="area" d="M0 200 L60 185 L120 192 L180 160 L240 168 L300 130 L360 138 L420 98 L480 104 L540 60 L600 40 L600 220 L0 220Z"/><path class="path" d="M0 200 L60 185 L120 192 L180 160 L240 168 L300 130 L360 138 L420 98 L480 104 L540 60 L600 40"/></svg><div class="tk-legend"><span>Jan</span><span>Jun</span><span>Dec</span></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="tk-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => { const sp = ["M5 38 L60 30 L110 34 L160 18 L215 22 L270 8", "M5 30 L60 34 L110 20 L160 24 L215 12 L270 14", "M5 40 L60 28 L110 30 L160 20 L215 16 L270 6"]; return '<section class="tk-rows" id="work"><h2>' + k.h("work", "Everything in one clear view") + '</h2><div class="tk-list">' + k.c.cards.slice(0, 6).map((x, i) => '<div class="tk-item"><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + '</p><svg viewBox="0 0 275 46" aria-hidden="true"><path d="' + sp[i % 3] + '"/></svg>' + k.photo(i) + '</div>').join("") + "</div></section>"; },
  services: (k) => '<section class="tk-svc" id="services" aria-label="Plans">' + k.c.services.slice(0, 3).map(s => "<article><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></article>").join("") + "</section>",
  about: (k) => '<section class="tk-about" id="about"><h2>' + k.h("about", "Built for real budgets") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="tk-end" id="contact"><h2>' + k.h("contact", "Start with a free review.") + '</h2>' + k.cta("Book a free review") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

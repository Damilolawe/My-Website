export default {
  id: "md-sentry",
  root: "nw",
  fonts: "family=Syne:wght@400;600;700;800&family=Martian+Mono:wght@400;500",
  labels: {work:"Results",services:"Product",about:"Team",contact:"Get started"},
  intros: {work:{title:"Results",text:"What teams caught, and how fast they fixed it."},features:{title:"The product",text:"Three tools that work together, set up in an afternoon."},studio:{title:"Who we are",text:null},contact:{title:"Get started",text:"Connect your app in a few minutes. Your first alerts arrive the same day."}},
  demo: {
    name: "Night Watch", headline: "Know before they do.", heroLabel: "Error monitoring for small teams",
    bio: "Night Watch catches errors in your app, groups them, and tells the right person in plain language. Fewer surprise outages, quieter on-call nights.",
    cards: [
      { title: "Checkout crash, fixed in 9 minutes", description: "An alert with the exact line and the deploy that caused it." },
      { title: "Slow search, traced", description: "Found the one query adding two seconds to every page." },
      { title: "Silent failures, surfaced", description: "Background jobs that failed quietly for weeks, now on a dashboard." },
    ],
    services: [
      { title: "Error tracking", description: "Stack traces grouped by cause, not by message." },
      { title: "Performance traces", description: "See which request is slow and why." },
      { title: "Smart alerts", description: "Paged only when it matters, routed to who owns it." },
    ],
  },
  css: `
.nw-case img{grid-column:1/-1;width:100%;max-height:260px;object-fit:cover;margin-top:14px}
.nw{--bg:#120a24;--panel:#1d1238;--lilac:#a28afe;--lime:#c6ff4d;--red:#ff4d6d;--text:#ece6ff;background:var(--bg);color:var(--text);font:400 17px/1.65 Syne,system-ui,sans-serif}
.nw header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.nw .brand{font:800 20px/1 Syne;letter-spacing:-.02em;text-decoration:none;display:flex;gap:10px;align-items:center}.nw .brand:before{content:"";width:10px;height:10px;border-radius:50%;background:var(--lime);box-shadow:0 0 0 0 var(--lime);animation:ping 2s infinite}
@keyframes ping{70%{box-shadow:0 0 0 12px transparent}}
.nw nav{display:flex;gap:28px;font-weight:600}.nw nav a{text-decoration:none;opacity:.8}.nw nav a:hover{opacity:1;color:var(--lime)}
.nw-hero{position:relative;min-height:88svh;display:grid;align-items:center;padding:40px clamp(18px,4vw,56px) 80px;overflow:hidden;isolation:isolate}
.nw-radar{position:absolute;right:-10vw;top:50%;width:min(80vw,900px);aspect-ratio:1;translate:0 -50%;border-radius:50%;z-index:-1;background:repeating-radial-gradient(circle,transparent 0 58px,rgba(162,138,254,.22) 59px 60px);}
.nw-radar:before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(198,255,77,.3),transparent 22%);animation:sweep 4s linear infinite}
.nw-radar:after{content:"";position:absolute;left:62%;top:30%;width:12px;height:12px;border-radius:50%;background:var(--red);box-shadow:0 0 18px var(--red);animation:blip 4s linear infinite}
@keyframes sweep{to{transform:rotate(360deg)}}@keyframes blip{0%,12%{opacity:0}16%{opacity:1}60%,100%{opacity:0}}
.nw h1{position:relative;font:800 clamp(56px,10.5vw,176px)/.88 Syne;letter-spacing:-.05em;max-width:11ch}
.nw-glitch{position:relative;display:inline-block}
.nw-glitch:before,.nw-glitch:after{content:attr(data-text);position:absolute;inset:0;pointer-events:none;opacity:0}
.nw-glitch:before{color:var(--lime);clip-path:inset(0 0 60% 0);animation:g1 3.2s steps(1) infinite}
.nw-glitch:after{color:var(--red);clip-path:inset(55% 0 0 0);animation:g2 3.2s steps(1) infinite}
@keyframes g1{0%,86%,100%{transform:none;opacity:0}88%{transform:translate(-6px,-2px);opacity:.9}92%{transform:translate(5px,1px);opacity:.9}}
@keyframes g2{0%,88%,100%{transform:none;opacity:0}90%{transform:translate(6px,2px);opacity:.9}94%{transform:translate(-4px,0);opacity:.9}}
.nw-hero p{margin-top:28px;max-width:44ch;font-size:clamp(18px,1.6vw,21px);color:#c9bff0}
.nw .cta{display:inline-flex;margin-top:32px;padding:16px 26px;border-radius:10px;background:var(--lime);color:var(--bg);font-weight:800;text-decoration:none;transition:transform .2s}.nw .cta:hover{transform:translateY(-2px)}.nw .cta-muted{background:var(--panel);color:var(--text)}
.nw-term{margin:0 clamp(18px,4vw,56px);border:1px solid #3a2a6b;border-radius:18px;background:var(--panel);overflow:hidden}
.nw-term-top{display:flex;gap:8px;align-items:center;padding:14px 18px;border-bottom:1px solid #3a2a6b;font:500 13px "Martian Mono",monospace;color:#9e90d6}.nw-term-top i{width:10px;height:10px;border-radius:50%;background:#3a2a6b}
.nw-log{height:220px;overflow:hidden;-webkit-mask:linear-gradient(transparent,#000 25%,#000 80%,transparent);mask:linear-gradient(transparent,#000 25%,#000 80%,transparent)}
.nw-log ol{list-style:none;margin:0;padding:10px 18px;font:400 13px/2 "Martian Mono",monospace;animation:scroll 14s linear infinite}
.nw-log li span{color:var(--lime)}.nw-log li b{font-weight:400;color:var(--red)}.nw-log li em{font-style:normal;color:var(--lilac)}
@keyframes scroll{to{transform:translateY(-50%)}}
.nw-cases{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.nw h2{font:800 clamp(38px,6vw,96px)/.92 Syne;letter-spacing:-.05em;max-width:14ch}
.nw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,70px)}
.nw-case{position:relative;padding:30px;border-radius:20px;background:var(--panel);border:1px solid #3a2a6b;overflow:hidden}
.nw-case:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(198,255,77,.12),transparent 70%);transform:translateX(-100%);transition:transform .7s}.nw-case:hover:before{transform:translateX(100%)}
.nw-case .state{display:inline-flex;gap:8px;align-items:center;font:500 13px "Martian Mono",monospace;color:var(--lime)}.nw-case .state:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--lime)}
.nw-case h3{margin-top:22px;font:700 clamp(22px,2vw,28px)/1.15 Syne;letter-spacing:-.02em}.nw-case p{margin-top:10px;color:#c9bff0}
.nw-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.nw-svc ul{list-style:none;margin:clamp(30px,4vw,50px) 0 0;padding:0}.nw-svc li{display:grid;grid-template-columns:1fr 1.4fr;gap:30px;padding:24px 0;border-top:1px solid #3a2a6b}.nw-svc h3{font:700 24px Syne}.nw-svc p{color:#c9bff0}
.nw-end{margin:0 clamp(18px,4vw,56px) 40px;padding:clamp(50px,8vw,110px);border-radius:28px;background:var(--lilac);color:var(--bg);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.nw-end .cta{margin:0;background:var(--bg);color:var(--lime)}
.nw footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px;color:#9e90d6}
@media(max-width:860px){.nw nav{gap:14px;font-size:13px}.nw .brand{font-size:17px}.nw-grid,.nw-svc li{grid-template-columns:1fr}.nw-radar{right:-40vw;opacity:.6}}
.nw-intro{position:relative;overflow:hidden;padding:clamp(60px,9vw,130px) clamp(18px,4vw,56px);isolation:isolate}.nw-intro .nw-radar{right:-20vw;width:min(60vw,700px);opacity:.7}.nw-intro h1{font:800 clamp(50px,8vw,130px)/.9 Syne;letter-spacing:-.05em;max-width:12ch}.nw-intro p{margin-top:24px;max-width:46ch;color:#c9bff0;font-size:clamp(18px,1.6vw,21px)}
.nw-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.nw-about>p{font-size:clamp(19px,1.8vw,24px);color:#c9bff0}.nw-about ol{grid-column:1/-1;font:400 14px/1.8 "Martian Mono",monospace;border:1px solid #3a2a6b;border-radius:16px;padding:22px;background:var(--panel)}.nw-about li span{color:var(--lime)}
@media(max-width:860px){.nw-about{grid-template-columns:1fr}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const log = ['<li><span>ok</span> deploy 4f2a1c rolled out to 3 regions</li>', '<li><b>error</b> TypeError in checkout/total.js:118</li>', '<li><em>group</em> 214 events, 1 cause, assigned to payments</li>', '<li><span>ok</span> fix merged, error rate back to 0.02%</li>', '<li><em>trace</em> /search p95 2.1s, slow query in products.sql</li>', '<li><span>ok</span> index added, p95 now 240ms</li>', '<li><b>warn</b> job email-digest failed 3 times</li>', '<li><span>ok</span> retry policy updated, queue drained</li>'].join(""); return '<section class="nw-hero" aria-labelledby="h"><div class="nw-radar" aria-hidden="true"></div><div><h1 id="h"><span class="nw-glitch" data-text="' + k.E(k.c.headline) + '">' + k.E(k.c.headline) + "</span></h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start monitoring") + '</div></section><div class="nw-term" aria-hidden="true"><div class="nw-term-top"><i></i><i></i><i></i>live events</div><div class="nw-log"><ol>' + log + log + "</ol></div></div>"; },
  intro: (k) => { const t = k.intro(); return '<section class="nw-intro" aria-labelledby="h"><div class="nw-radar" aria-hidden="true"></div><h1 id="h"><span class="nw-glitch" data-text="' + k.E(t.title) + '">' + k.E(t.title) + "</span></h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="nw-cases" id="work"><h2>' + k.h("work", "Problems found before anyone noticed") + '</h2><div class="nw-grid">' + k.c.cards.slice(0, 6).map((x, i) => '<article class="nw-case"><span class="state">Resolved</span><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="nw-svc" id="services"><h2>' + k.h("services", "What it watches") + '</h2><ul>' + k.c.services.map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="nw-about" id="about"><h2>' + k.h("about", "Who is on watch") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<ol>" + k.aboutItems.map(a => "<li><span>" + k.E(a.title.toLowerCase()) + "</span> " + k.E(a.text) + "</li>").join("") + "</ol>" : "") + "</section>",
  contact: (k) => '<section class="nw-end" id="contact"><h2>' + k.h("contact", "Sleep through the night.") + '</h2>' + k.cta("Start monitoring") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-vercel",
  root: "fd",
  fonts: "family=Golos+Text:wght@400;600;900&family=Azeret+Mono:wght@400;600",
  labels: { work: "Customers", services: "Pricing", about: "About", contact: "Deploy" },
  intros: {
    work: { title: "Sites we serve", text: "Shops, docs and launches, delivered from the nearest city." },
    features: { title: "Pricing", text: "Free for personal projects. Per-seat for teams." },
    studio: { title: "About Frontier", text: null },
    contact: { title: "Deploy", text: "Connect a repository. Your site is live in under a minute." },
  },
  demo: {
    name: "Frontier Deploy", headline: "Push code. It's live.", heroLabel: "Hosting for front-end teams",
    bio: "Connect your repository and every push becomes a live preview link. Merge, and it goes out to 70 cities in seconds, close to every visitor.",
    cards: [
      { title: "Launch day without the panic", description: "A product launch that took 40 times its normal traffic without a blip." },
      { title: "A preview for every change", description: "Designers review the real site, not screenshots, before anything merges." },
      { title: "Docs that load instantly", description: "A developer docs site served from the city closest to each reader." },
    ],
    services: [
      { title: "Hobby", description: "Free for personal projects and experiments." },
      { title: "Team", description: "Preview comments, analytics and more build time." },
      { title: "Enterprise", description: "Dedicated support, security reviews and uptime guarantee." },
    ],
  },
  css: `
.fd{--black:#000;--panel:#0b0b0d;--line:#222;--white:#ededed;--mute:#8a8a8a;--ok:#2ee59d;--build:#f5a623;background:var(--black);color:var(--white);font:400 17px/1.65 "Golos Text",system-ui,sans-serif}
.fd header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid var(--line)}
.fd .brand{font:900 19px/1 "Golos Text";letter-spacing:-.03em;text-decoration:none;display:flex;align-items:center;gap:10px}.fd .brand:before{content:"";width:18px;height:18px;border-radius:50%;background:conic-gradient(#ff4d4d,#f9cb28,#2ee59d,#3291ff,#ff4d4d)}
.fd nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:15px}.fd nav a{text-decoration:none;color:var(--mute)}.fd nav a:hover,.fd nav a[aria-current]{color:var(--white)}
.fd-hero{text-align:center;padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) 0}
.fd-label{font:400 13px "Azeret Mono",monospace;color:var(--mute)}
.fd h1{margin-top:18px;font:900 clamp(58px,9.4vw,160px)/.9 "Golos Text";letter-spacing:-.065em;color:#fff;text-shadow:0 0 60px rgba(255,255,255,.25)}
.fd h1 .ch{animation:fd-in .7s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes fd-in{from{opacity:0;filter:blur(6px)}}
.fd-hero p{margin:24px auto 0;max-width:48ch;color:#a7a7a7}
.fd .cta{display:inline-flex;margin-top:30px;padding:14px 26px;border-radius:8px;background:#fff;color:#000;font-weight:600;text-decoration:none;transition:background .2s}.fd .cta:hover{background:#ccc}.fd .cta-muted{background:var(--panel);color:var(--mute);border:1px solid var(--line)}
.fd-globe{position:relative;width:min(100%,1000px);margin:clamp(40px,6vw,70px) auto 0;aspect-ratio:2.2;background:radial-gradient(#3a3a3a 1.2px,transparent 1.3px) 0 0/14px 14px;-webkit-mask:radial-gradient(ellipse 50% 50% at 50% 50%,#000 60%,transparent 100%);mask:radial-gradient(ellipse 50% 50% at 50% 50%,#000 60%,transparent 100%)}
.fd-node{position:absolute;left:var(--x);top:var(--y);width:10px;height:10px;margin:-5px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 0 rgba(46,229,157,.6);animation:fd-ping 2.4s ease-out infinite;animation-delay:var(--d)}
@keyframes fd-ping{0%{box-shadow:0 0 0 0 rgba(46,229,157,.7)}80%,100%{box-shadow:0 0 0 22px rgba(46,229,157,0)}}
.fd-status{position:relative;display:inline-flex;align-items:center;gap:10px;margin:-40px auto 0;padding:10px 16px;border:1px solid var(--line);border-radius:999px;background:var(--panel);font:400 13px "Azeret Mono",monospace}
.fd-status i{width:9px;height:9px;border-radius:50%;background:var(--build);animation:fd-dot 6s steps(1) infinite}
.fd-status span{display:inline-grid}.fd-status span b{grid-area:1/1;font-weight:400;opacity:0;animation:fd-swap 6s steps(1) infinite}.fd-status span b:nth-child(1){animation-name:fd-a}.fd-status span b:nth-child(2){animation-name:fd-b}.fd-status span b:nth-child(3){animation-name:fd-c}
@keyframes fd-a{0%{opacity:1}33%,100%{opacity:0}}@keyframes fd-b{0%,32%{opacity:0}33%{opacity:1}66%,100%{opacity:0}}@keyframes fd-c{0%,65%{opacity:0}66%,100%{opacity:1}}
@keyframes fd-dot{0%{background:var(--mute)}33%{background:var(--build)}66%{background:var(--ok)}}
.fd-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);text-align:center;border-bottom:1px solid var(--line)}.fd-intro h1{font-size:clamp(52px,7.6vw,124px)}.fd-intro p{margin:18px auto 0;max-width:46ch;color:#a7a7a7}
.fd h2{font:900 clamp(42px,6vw,96px)/.92 "Golos Text";letter-spacing:-.055em;max-width:14ch}
.fd-cust{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fd-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-top:clamp(40px,6vw,70px);background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.fd-site{padding:28px;background:var(--black)}
.fd-site code{display:flex;align-items:center;gap:8px;font:400 13px "Azeret Mono",monospace;color:var(--ok)}.fd-site code:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--ok)}
.fd-site img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:8px;margin-bottom:16px;border:1px solid var(--line)}
.fd-site h3{margin-top:30px;font:600 22px/1.2 "Golos Text";letter-spacing:-.02em}.fd-site p{margin-top:8px;color:#9b9b9b}
.fd-price{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.fd-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.fd-price li{padding:28px;border:1px solid var(--line);border-radius:12px;background:var(--panel)}.fd-price li:nth-child(2){border-color:#555}
.fd-price h3{font:600 15px "Azeret Mono",monospace}.fd-price p{margin-top:12px;font-size:20px}
.fd-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--panel);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px);border-block:1px solid var(--line)}.fd-about>p{font-size:clamp(19px,1.8vw,23px);color:#c9c9c9}.fd-about dl{grid-column:2;margin:0;font-family:"Azeret Mono",monospace;font-size:14px}.fd-about dt{color:var(--ok);margin-top:18px}.fd-about dd{margin:4px 0 0;color:#a7a7a7}
.fd-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.fd-end h2{margin:0 auto}
.fd footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Azeret Mono",monospace;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.fd nav{gap:12px;font-size:13px}.fd-grid,.fd-price ul,.fd-about{grid-template-columns:1fr}.fd-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.fd-status span b:nth-child(3){opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const pts = [[18, 36], [22, 48], [28, 42], [47, 30], [50, 36], [53, 32], [58, 44], [72, 40], [80, 52], [84, 70], [30, 70], [62, 62]]; return '<section class="fd-hero" aria-labelledby="h"><span class="fd-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Deploy a project") + '<div class="fd-globe" aria-hidden="true">' + pts.map((p, i) => '<span class="fd-node" style="--x:' + p[0] + "%;--y:" + p[1] + "%;--d:" + (i * 0.2).toFixed(1) + 's"></span>').join("") + '</div><div class="fd-status" aria-hidden="true"><i></i><span><b>Queued</b><b>Building</b><b>Ready in 70 cities</b></span></div></section>'; },
  intro: (k) => { const t = k.intro(); return '<section class="fd-intro" aria-labelledby="h"><span class="fd-label">/' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="fd-cust" id="work"><h2>' + k.h("work", "Shipped on Frontier") + '</h2><div class="fd-grid">' + k.c.cards.map((x, i) => '<article class="fd-site">' + (k.photo(i) || "<code>Ready</code>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="fd-price" id="services"><h2>' + k.h("services", "Pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fd-about" id="about"><h2>' + k.h("about", "Built for the people who ship") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fd-end" id="contact"><h2>' + k.h("contact", "Your next push could be live.") + '</h2>' + k.cta("Deploy a project") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

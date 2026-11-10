export default {
  id: "md-clickhouse",
  root: "qh",
  fonts: "family=Barlow+Semi+Condensed:wght@400;600;800&family=Inconsolata:wght@400;700",
  labels: { work: "Benchmarks", services: "Pricing", about: "About", contact: "Run a query" },
  demo: {
    name: "Query House", headline: "Billions of rows. Milliseconds.", heroLabel: "An analytics database built for speed",
    bio: "Query House answers questions over billions of rows before you finish reaching for your coffee. Load your logs, events or sales, and ask anything in plain SQL.",
    cards: [
      { title: "4.2 billion rows, 0.08 seconds", description: "A delivery company counts every stop, every day, live." },
      { title: "Dashboards that never spin", description: "A newsroom watches readership update second by second." },
      { title: "Logs you can actually search", description: "A game studio finds a crash across a month of logs in under a second." },
    ],
    services: [
      { title: "Developer", description: "Free up to 10 GB, perfect for trying it out." },
      { title: "Production", description: "Pay for storage and compute, scale on demand." },
      { title: "Dedicated", description: "Your own cluster, tuned and managed for you." },
    ],
  },
  css: `
@property --spd{syntax:"<integer>";initial-value:0;inherits:false}
.qh{--black:#111;--panel:#1b1b1b;--yellow:#faff69;--white:#f2f2f2;--mute:#8b8b8b;background:var(--black);color:var(--white);font:400 17px/1.65 "Barlow Semi Condensed",system-ui,sans-serif}
.qh header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid #2a2a2a}
.qh .brand{display:flex;align-items:center;gap:8px;font:800 22px/1 "Barlow Semi Condensed";text-transform:uppercase;text-decoration:none}.qh .brand:before{content:"";width:22px;height:20px;background:repeating-linear-gradient(90deg,var(--yellow) 0 4px,transparent 4px 6px)}
.qh nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.qh nav a{text-decoration:none;color:var(--mute)}.qh nav a:hover,.qh nav a[aria-current]{color:var(--yellow)}
.qh-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.qh-label{font:400 14px Inconsolata,monospace;color:var(--yellow)}
.qh h1{margin-top:16px;font:800 clamp(56px,8.6vw,146px)/.88 "Barlow Semi Condensed";text-transform:uppercase;letter-spacing:-.02em}
.qh h1 .ch{animation:qh-in .25s steps(2) both;animation-delay:calc(var(--i) * 25ms)}@keyframes qh-in{from{opacity:0}}
.qh-hero p{margin-top:24px;max-width:44ch;color:#bdbdbd;font-size:clamp(18px,1.5vw,21px)}
.qh .cta{display:inline-flex;margin-top:30px;padding:15px 26px;background:var(--yellow);color:var(--black);font:800 16px "Barlow Semi Condensed";text-transform:uppercase;letter-spacing:.04em;text-decoration:none;transition:filter .2s}.qh .cta:hover{filter:brightness(.9)}.qh .cta-muted{background:var(--panel);color:var(--mute)}
.qh-gauge{position:relative;justify-self:center;width:min(100%,440px);aspect-ratio:2/1.5}
.qh-dial{position:absolute;inset:0 0 auto;aspect-ratio:2/1;border-radius:999px 999px 0 0;background:conic-gradient(from 270deg at 50% 100%,var(--yellow) 0 calc(var(--spd) * .9deg),#2a2a2a 0 180deg,transparent 0);-webkit-mask:radial-gradient(circle at 50% 100%,transparent 58%,#000 59%);mask:radial-gradient(circle at 50% 100%,transparent 58%,#000 59%);animation:qh-rev 2.4s cubic-bezier(.2,1.1,.3,1) .4s both;--spd:170}
.qh-ticks{position:absolute;inset:0 0 auto;aspect-ratio:2/1;border-radius:999px 999px 0 0;background:repeating-conic-gradient(from 270deg at 50% 100%,#000 0 1deg,transparent 1deg 9deg);-webkit-mask:radial-gradient(circle at 50% 100%,transparent 58%,#000 59%);mask:radial-gradient(circle at 50% 100%,transparent 58%,#000 59%)}
.qh-needle{position:absolute;left:50%;bottom:33.3%;width:6px;height:46%;margin-left:-3px;border-radius:3px;background:var(--white);transform-origin:50% 100%;transform:rotate(calc(var(--spd) * .9deg - 90deg));animation:qh-rev 2.4s cubic-bezier(.2,1.1,.3,1) .4s both;--spd:170}.qh-needle:after{content:"";position:absolute;left:50%;bottom:-9px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:var(--white)}
@keyframes qh-rev{from{--spd:0}}
.qh-read{position:absolute;left:0;right:0;bottom:0;text-align:center;font:700 clamp(30px,4vw,52px)/1 Inconsolata,monospace;color:var(--yellow)}.qh-read small{display:block;font:400 13px Inconsolata;color:var(--mute);margin-top:6px}
.qh-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px)}.qh-intro h1{font-size:clamp(52px,8vw,128px)}.qh-intro p{margin-top:18px;max-width:46ch;color:#bdbdbd}
.qh h2{font:800 clamp(44px,6.4vw,104px)/.9 "Barlow Semi Condensed";text-transform:uppercase;max-width:14ch}
.qh-bench{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.qh-rows{margin-top:clamp(40px,6vw,70px)}
.qh-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:24px;padding:24px 0;border-top:1px solid #2a2a2a}
.qh-row h3{font:800 26px/1.1 "Barlow Semi Condensed";text-transform:uppercase}.qh-row p{margin-top:6px;color:#bdbdbd}
.qh-bar{align-self:center;height:22px;background:var(--panel);overflow:hidden}.qh-bar i{display:block;height:100%;width:var(--w);background:var(--yellow)}
.qh-row:nth-child(1) .qh-bar i{--w:8%}.qh-row:nth-child(2) .qh-bar i{--w:14%}.qh-row:nth-child(3) .qh-bar i{--w:5%}
@supports (animation-timeline:view()){.qh-bar i{animation:qh-bar linear both;animation-timeline:view();animation-range:entry 20% cover 45%}@keyframes qh-bar{from{width:100%;background:#555}}}
.qh-row img{grid-column:1/-1;width:100%;max-height:260px;object-fit:cover}
.qh-price{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.qh-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;margin-top:clamp(36px,5vw,56px);background:#2a2a2a}
.qh-price li{padding:30px;background:var(--black)}.qh-price li:nth-child(2){background:var(--yellow);color:var(--black)}
.qh-price h3{font:800 28px "Barlow Semi Condensed";text-transform:uppercase}.qh-price p{margin-top:8px}
.qh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--panel);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.qh-about>p{font-size:clamp(19px,1.8vw,24px)}.qh-about dl{grid-column:2;margin:0;font-family:Inconsolata,monospace}.qh-about dt{color:var(--yellow);margin-top:16px}.qh-about dd{margin:2px 0 0;color:#bdbdbd}
.qh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.qh-end h2{margin:0 auto}
.qh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px Inconsolata,monospace;color:var(--mute);border-top:1px solid #2a2a2a}
@media(max-width:900px){.qh nav{gap:12px;font-size:14px}.qh-hero,.qh-price ul,.qh-about,.qh-row{grid-template-columns:1fr}.qh-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="qh-hero" aria-labelledby="h"><div><span class="qh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Run a free query") + '</div><div class="qh-gauge" aria-hidden="true"><span class="qh-dial"></span><span class="qh-ticks"></span><span class="qh-needle"></span><div class="qh-read">0.08 s<small>4.2 billion rows scanned</small></div></div></section>',
  work: (k) => '<section class="qh-bench" id="work"><h2>' + k.h("work", "Measured, not promised") + '</h2><div class="qh-rows">' + k.c.cards.map((x, i) => '<article class="qh-row"><div><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + '</p></div><span class="qh-bar" aria-hidden="true"><i></i></span>' + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="qh-price" id="services"><h2>' + k.h("services", "Pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="qh-about" id="about"><h2>' + k.h("about", "Built for impatient people") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="qh-end" id="contact"><h2>' + k.h("contact", "Ask a bigger question.") + '</h2>' + k.cta("Run a free query") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

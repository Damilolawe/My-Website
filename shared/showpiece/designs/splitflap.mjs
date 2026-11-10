export default {
  id: "md-wise",
  root: "wl",
  fonts: "family=Oswald:wght@500;700&family=Overpass:wght@400;600;800",
  labels: { work: "How it works", services: "Fees", about: "About", contact: "Send money" },
  intros: {
    work: { title: "How it works", text: "Real exchange rates, a small fee you see upfront, money there in hours." },
    features: { title: "Fees", text: "One small fee per transfer. No markup hidden in the rate." },
    studio: { title: "About World Ledger", text: null },
    contact: { title: "Send money", text: "Create an account, verify once, and send your first transfer today." },
  },
  demo: {
    name: "World Ledger", headline: "Money without borders.", heroLabel: "International transfers at the real rate",
    bio: "Send money to 70 countries at the exchange rate you see on the news. One small fee, shown before you pay, and most transfers arrive the same day.",
    cards: [
      { title: "See the fee first", description: "Every transfer shows the fee and the exact amount that arrives." },
      { title: "Hold 40 currencies", description: "Keep euros, yen and dollars in one account and switch when the rate is right." },
      { title: "Get paid like a local", description: "Account details in five countries, so clients can pay you without wires." },
    ],
    services: [
      { title: "Personal transfers", description: "From 0.4 percent, no subscription." },
      { title: "Business account", description: "Pay suppliers and staff abroad in bulk." },
      { title: "Debit card", description: "Spend in any currency, converted at the real rate." },
    ],
  },
  css: `
.wl{--ink:#14211b;--lime:#b7f36b;--forest:#163a2b;--paper:#f3f6ef;--board:#0f1512;--flap:#1d2621;--amber:#ffcc4d;background:var(--paper);color:var(--ink);font:400 17px/1.65 Overpass,system-ui,sans-serif}
.wl header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.wl .brand{font:700 24px/1 Oswald;text-transform:uppercase;letter-spacing:.02em;text-decoration:none}
.wl nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.wl nav a{text-decoration:none}.wl nav a:hover{color:var(--forest)}
.wl-hero{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px) clamp(60px,8vw,110px);background:var(--forest);color:var(--paper)}
.wl-top{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:end}
.wl h1{font:700 clamp(62px,10vw,170px)/.88 Oswald;text-transform:uppercase;letter-spacing:-.01em;color:var(--lime)}
.wl h1 .ch{animation:wl-in .5s steps(3) both;animation-delay:calc(var(--i) * 40ms)}@keyframes wl-in{from{opacity:0;transform:rotateX(90deg)}}
.wl-top p{font-size:clamp(18px,1.5vw,21px);color:#d5e4da}
.wl .cta{display:inline-flex;margin-top:24px;padding:16px 28px;border-radius:999px;background:var(--lime);color:var(--ink);font-weight:800;text-decoration:none;transition:transform .2s}.wl .cta:hover{transform:translateY(-3px)}.wl .cta-muted{background:rgba(255,255,255,.12);color:#d5e4da}
.wl-board{margin-top:clamp(40px,6vw,70px);padding:clamp(14px,2vw,24px);border-radius:12px;background:var(--board);box-shadow:inset 0 0 0 3px #2b3730}
.wl-row{display:grid;grid-template-columns:repeat(3,auto) 1fr auto;gap:clamp(10px,2vw,30px);align-items:center;padding:10px 0;border-bottom:1px solid #26302a;font:700 clamp(18px,2.4vw,34px)/1 Oswald;text-transform:uppercase}
.wl-row:last-child{border:0}
.wl-cells{display:flex;gap:4px}
.wl-cells span{position:relative;display:grid;place-items:center;width:1.05em;height:1.4em;border-radius:4px;background:var(--flap);color:var(--paper);overflow:hidden;perspective:200px}
.wl-cells span:after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:#000}
.wl-cells span:before{content:"";position:absolute;inset:0 0 50% 0;background:#26302a;transform-origin:bottom;animation:wl-flap .35s ease-in both;animation-delay:var(--d)}
@keyframes wl-flap{0%{transform:rotateX(0)}100%{transform:rotateX(-90deg)}}
.wl-rate .wl-cells span{color:var(--amber)}
.wl-arrow{width:28px;height:2px;background:var(--lime);position:relative}.wl-arrow:after{content:"";position:absolute;right:0;top:-5px;border:6px solid transparent;border-left:8px solid var(--lime);border-right:0}
.wl-status{font:600 13px Overpass;color:var(--lime);text-transform:none}
.wl-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);background:var(--forest);color:var(--paper)}.wl-intro h1{font-size:clamp(52px,8vw,128px)}.wl-intro p{margin-top:18px;max-width:46ch;color:#d5e4da}
.wl h2{font:700 clamp(44px,6.4vw,104px)/.9 Oswald;text-transform:uppercase;max-width:13ch}
.wl-how{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.wl-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px);counter-reset:s}
.wl-step{padding:28px;border-radius:20px;background:#fff;border:2px solid var(--ink);counter-increment:s}
.wl-step:before{content:counter(s);display:grid;place-items:center;width:52px;height:52px;margin-bottom:26px;border-radius:50%;background:var(--lime);font:700 26px Oswald}
.wl-step img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:16px}
.wl-step h3{font:800 22px/1.2 Overpass}.wl-step p{margin-top:8px;color:#45524b}
.wl-fees{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.wl-fees table{width:100%;margin-top:clamp(36px,5vw,56px);border-collapse:collapse;font-size:18px}
.wl-fees th,.wl-fees td{padding:22px 0;border-bottom:2px solid var(--ink);text-align:left}.wl-fees th{font:700 26px Oswald;text-transform:uppercase;width:40%}
.wl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--lime);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.wl-about>p{font-size:clamp(19px,1.8vw,24px)}.wl-about dl{grid-column:2;margin:0}.wl-about dt{font:700 22px Oswald;text-transform:uppercase;margin-top:16px}.wl-about dd{margin:2px 0 0}
.wl-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--board);color:var(--paper);text-align:center}.wl-end h2{margin:0 auto;color:var(--lime)}
.wl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.wl nav{gap:12px;font-size:14px}.wl-top,.wl-steps,.wl-about{grid-template-columns:1fr}.wl-about dl{grid-column:auto}.wl-row{grid-template-columns:auto auto 1fr}.wl-row>:nth-child(4),.wl-row>:nth-child(5){display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { let n = 0; const cells = t => '<span class="wl-cells">' + [...t].map(ch => '<span style="--d:' + (0.2 + (n++) * 0.05).toFixed(2) + 's">' + ch + "</span>").join("") + "</span>"; const row = (a, b, r, s) => '<div class="wl-row">' + cells(a) + '<span class="wl-arrow"></span>' + cells(b) + '<span class="wl-rate">' + cells(r) + '</span><span class="wl-status">' + s + "</span></div>"; return '<section class="wl-hero" aria-labelledby="h"><div class="wl-top"><h1 id="h">' + k.letters(k.c.headline) + "</h1><div><p>" + k.E(k.c.bio) + "</p>" + k.cta("Send money") + '</div></div><div class="wl-board" aria-hidden="true">' + row("USD", "EUR", "0.9214", "Arrives today") + row("GBP", "INR", "105.82", "Arrives in 2 hours") + row("CAD", "JPY", "109.40", "Arrives today") + "</div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="wl-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="wl-how" id="work"><h2>' + k.h("work", "Three steps, no surprises") + '</h2><div class="wl-steps">' + k.c.cards.map((x, i) => '<article class="wl-step">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="wl-fees" id="services"><h2>' + k.h("services", "Fees, in plain sight") + '</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="wl-about" id="about"><h2>' + k.h("about", "Why we exist") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="wl-end" id="contact"><h2>' + k.h("contact", "Send it at the real rate.") + '</h2>' + k.cta("Send money") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

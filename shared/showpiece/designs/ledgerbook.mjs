export default {
  id: "ledger",
  root: "lg",
  fonts: "family=Besley:ital,wght@0,500;0,700;1,500&family=Inter:wght@400;500;600",
  labels: { work: "Results", services: "Services", about: "The firm", contact: "Book a call" },
  demo: {
    name: "Ledger & Co.", headline: "Clear numbers, better decisions.", heroLabel: "Finance consultancy for growing businesses",
    bio: "We are a small team of accountants and analysts who help founders understand their numbers. Monthly reporting, cash forecasts and an honest opinion before every big decision.",
    cards: [
      { title: "A bakery chain, back in profit", description: "Margins up from 2 to 11 percent in a year by fixing three suppliers." },
      { title: "A studio's first investment", description: "A forecast and data room that helped close a seed round." },
      { title: "A charity's cash plan", description: "Twelve months of runway mapped, grant by grant." },
    ],
    services: [
      { title: "Monthly reporting", description: "Clear accounts and a call to explain them." },
      { title: "Forecasting", description: "Cash, hiring and growth scenarios." },
      { title: "Fundraising support", description: "Models, data rooms and investor questions." },
    ],
  },
  css: `
@property --pct{syntax:"<integer>";initial-value:0;inherits:false}
.lg{--paper:#fbf8f1;--green:#1e4d3a;--line:#d9e4dc;--red:#b23a2b;--ink:#1a1d1b;--mute:#6b706c;--gold:#c7a250;background:var(--paper);color:var(--ink);font:400 17px/1.7 Inter,system-ui,sans-serif}
.lg header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);border-bottom:1px solid var(--line)}
.lg .brand{font:700 24px/1 Besley;text-decoration:none;color:var(--green)}
.lg nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:15px}.lg nav a{text-decoration:none}.lg nav a:hover{color:var(--green)}
.lg-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.lg-label{font-weight:600;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.lg h1{margin-top:14px;font:700 clamp(50px,7.2vw,120px)/1 Besley;letter-spacing:-.025em;color:var(--green)}
.lg h1 .ch{animation:lg-in .8s ease both;animation-delay:calc(var(--i) * 20ms)}@keyframes lg-in{from{opacity:0}}
.lg-hero p{margin-top:22px;max-width:44ch;color:#3e433f}
.lg .cta{display:inline-flex;margin-top:28px;padding:15px 26px;border-radius:4px;background:var(--green);color:var(--paper);font-weight:600;text-decoration:none;transition:background .2s}.lg .cta:hover{background:var(--ink)}.lg .cta-muted{background:var(--line);color:var(--mute)}
.lg-book{position:relative;padding:22px 22px 26px;background:#fff;border-radius:6px;box-shadow:0 1px 0 var(--line),0 30px 60px -40px rgba(0,0,0,.4);background-image:linear-gradient(90deg,transparent 74px,#f2b8b0 74px 76px,transparent 76px),repeating-linear-gradient(transparent 0 33px,var(--line) 33px 34px);background-position:0 0,0 54px}
.lg-book header{display:grid;grid-template-columns:44px 1fr 90px;gap:18px;padding:0 0 12px;border:0;font:600 12px Inter;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.lg-row{display:grid;grid-template-columns:44px 1fr 90px;gap:18px;height:34px;align-items:center;font:500 15px Besley;opacity:0;animation:lg-row .4s ease forwards;animation-delay:var(--d)}
.lg-row span:last-child{text-align:right;font-variant-numeric:tabular-nums}
.lg-row.neg span:last-child{color:var(--red)}
@keyframes lg-row{from{opacity:0;transform:translateX(-10px)}to{opacity:1}}
.lg-chart{position:relative;height:140px;margin-top:16px}
.lg-chart svg{width:100%;height:100%;overflow:visible}
.lg-chart path{fill:none;stroke:var(--green);stroke-width:3;stroke-linecap:round;stroke-dasharray:600;stroke-dashoffset:600;animation:lg-draw 2s ease 2s forwards}
.lg-chart .area{fill:rgba(30,77,58,.08);stroke:none;opacity:0;animation:lg-row .6s ease 3.6s forwards}
@keyframes lg-draw{to{stroke-dashoffset:0}}
.lg-total{position:absolute;right:0;top:-8px;padding:8px 12px;border-radius:6px;background:var(--green);color:var(--paper);font:600 14px Inter;counter-reset:p var(--pct);animation:lg-pct 2s ease 2s both;--pct:42}
.lg-total:after{content:"+" counter(p) "% margin"}
@keyframes lg-pct{from{--pct:0}}
.lg h2{font:700 clamp(40px,5.6vw,92px)/1.02 Besley;letter-spacing:-.02em;color:var(--green);max-width:14ch}
.lg-res{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--green);color:var(--paper)}.lg-res h2{color:var(--paper)}
.lg-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.lg-r{padding:28px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}
.lg-num{display:block;font:700 clamp(44px,4.4vw,64px)/1 Besley;color:var(--gold)}
.lg-r img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:4px;margin:14px 0}
.lg-r h3{margin-top:14px;font:600 20px/1.3 Inter}.lg-r p{margin-top:8px;color:#c9d6cd}
.lg-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.lg-svc table{width:100%;margin-top:clamp(36px,5vw,56px);border-collapse:collapse}
.lg-svc th,.lg-svc td{padding:20px 0;border-bottom:1px solid var(--line);text-align:left}.lg-svc th{font:700 24px Besley;color:var(--green);width:38%}.lg-svc td{color:#3e433f}
.lg-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#f1ebdc;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.lg-about>p{font:500 clamp(20px,1.9vw,25px)/1.55 Besley}.lg-about dl{grid-column:2;margin:0}.lg-about dt{font-weight:600;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-top:18px}.lg-about dd{margin:2px 0 0}
.lg-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.lg-end h2{margin:0 auto}
.lg footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.lg nav{gap:12px;font-size:13px}.lg-hero,.lg-list,.lg-about{grid-template-columns:1fr}.lg-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.lg-row,.lg-chart .area{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const R = [["Jan", "Revenue", "48,200"], ["Jan", "Suppliers", "-21,400", 1], ["Feb", "Revenue", "52,900"], ["Feb", "Payroll", "-18,100", 1], ["Mar", "Revenue", "61,300"]]; return '<section class="lg-hero" aria-labelledby="h"><div><span class="lg-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a call") + '</div><div class="lg-book" aria-hidden="true"><header><span>Month</span><span>Entry</span><span style="text-align:right">Amount</span></header>' + R.map((r, i) => '<div class="lg-row' + (r[3] ? " neg" : "") + '" style="--d:' + (0.3 + i * 0.3).toFixed(1) + 's"><span>' + r[0] + "</span><span>" + r[1] + "</span><span>" + r[2] + "</span></div>").join("") + '<div class="lg-chart"><span class="lg-total"></span><svg viewBox="0 0 400 140" preserveAspectRatio="none"><path class="area" d="M0 120 L70 110 L140 112 L210 86 L280 70 L350 40 L400 22 V140 H0Z"/><path d="M0 120 L70 110 L140 112 L210 86 L280 70 L350 40 L400 22"/></svg></div></div></section>'; },
  work: (k) => { const n = ["+9 pts", "Seed", "12 mo"]; return '<section class="lg-res" id="work"><h2>Results for clients</h2><div class="lg-list">' + k.c.cards.map((x, i) => '<article class="lg-r"><span class="lg-num">' + n[i % 3] + "</span>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="lg-svc" id="services"><h2>Services</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="lg-about" id="about"><h2>The firm</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="lg-end" id="contact"><h2>Let us look at the numbers together.</h2>' + k.cta("Book a call") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-slack",
  root: "wr",
  fonts: "family=Epilogue:wght@400;600;800;900",
  labels: { work: "Teams", services: "Pricing", about: "About", contact: "Try it free" },
  intros: {
    work: { title: "Teams that moved in", text: "Fewer emails, faster answers, and a lot less 'did you see my message?'" },
    features: { title: "Pricing", text: "Free for small teams, paid when you want the full history." },
    studio: { title: "About The Workroom", text: null },
    contact: { title: "Try it free", text: "Create a workspace and invite your team in two minutes." },
  },
  demo: {
    name: "The Workroom", headline: "Where good work happens.", heroLabel: "Team chat, organised by topic",
    bio: "Channels for every project, threads for every question, and search that finds the decision from three months ago. Your team's conversations in one calm, organised place.",
    cards: [
      { title: "A newsroom that stopped emailing", description: "One channel per story, from pitch to published." },
      { title: "Support and engineering, one room", description: "Bugs reported, fixed and confirmed in a single thread." },
      { title: "A studio across four time zones", description: "Daily updates posted async, no 7am calls." },
    ],
    services: [
      { title: "Free", description: "90 days of history and ten integrations." },
      { title: "Pro", description: "Unlimited history, huddles and guest access." },
      { title: "Business", description: "Single sign-on, exports and uptime guarantee." },
    ],
  },
  css: `
.wr{--plum:#3b0f3f;--deep:#2a0a2d;--side:#4a1550;--green:#2bac76;--blue:#36c5f0;--yellow:#ecb22e;--red:#e01e5a;--white:#fff;--ink:#1d1c1d;background:var(--white);color:var(--ink);font:400 17px/1.65 Epilogue,system-ui,sans-serif}
.wr header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--plum);color:#fff}
.wr .brand{display:flex;align-items:center;gap:10px;font:900 21px/1 Epilogue;text-decoration:none}.wr .brand:before{content:"";width:22px;height:22px;background:linear-gradient(var(--blue),var(--blue)) 0 0/45% 45% no-repeat,linear-gradient(var(--green),var(--green)) 100% 0/45% 45% no-repeat,linear-gradient(var(--red),var(--red)) 0 100%/45% 45% no-repeat,linear-gradient(var(--yellow),var(--yellow)) 100% 100%/45% 45% no-repeat;border-radius:5px}
.wr nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.wr nav a{text-decoration:none;opacity:.8}.wr nav a:hover,.wr nav a[aria-current]{opacity:1}
.wr-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px);background:var(--plum);color:#fff}
.wr-label{font-weight:600;color:var(--yellow)}
.wr h1{margin-top:18px;font:900 clamp(56px,8.4vw,140px)/.92 Epilogue;letter-spacing:-.05em}
.wr h1 .ch{animation:wr-in .55s cubic-bezier(.3,1.4,.5,1) both;animation-delay:calc(var(--i) * 25ms)}@keyframes wr-in{from{opacity:0;transform:translateY(.4em)}}
.wr-hero p{margin-top:24px;max-width:44ch;color:#e6d9e7;font-size:clamp(18px,1.5vw,20px)}
.wr .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:8px;background:#fff;color:var(--plum);font-weight:800;text-decoration:none;transition:background .2s}.wr .cta:hover{background:var(--yellow)}.wr .cta-muted{background:var(--side);color:#e6d9e7}
.wr-app{display:grid;grid-template-columns:150px 1fr;border-radius:14px;overflow:hidden;background:#fff;color:var(--ink);box-shadow:0 40px 70px -30px #000;min-height:360px}
.wr-side{padding:16px 0;background:var(--deep);color:#d6c2d8;font-size:14px}
.wr-side b{display:block;padding:0 16px 12px;color:#fff}
.wr-side span{position:relative;display:block;padding:5px 16px}
.wr-side span.on{background:#1164a3;color:#fff;font-weight:700}
.wr-side span i{position:absolute;right:12px;top:7px;min-width:18px;padding:0 5px;border-radius:9px;background:var(--red);color:#fff;font:700 11px/18px Epilogue;font-style:normal;text-align:center;transform:scale(0);animation:wr-pop .4s cubic-bezier(.3,1.7,.5,1) both;animation-delay:var(--d)}
@keyframes wr-pop{to{transform:scale(1)}}
.wr-feed{display:flex;flex-direction:column;gap:12px;padding:16px 18px;font-size:14px}
.wr-feed>b{padding-bottom:8px;border-bottom:1px solid #eee}
.wr-msg{display:grid;grid-template-columns:36px 1fr;gap:10px;opacity:0;animation:wr-msg .45s ease forwards;animation-delay:var(--d)}
.wr-msg:before{content:"";width:36px;height:36px;border-radius:8px;background:var(--c)}
.wr-msg strong{display:block;font-size:14px}.wr-hero .wr-msg p{margin:2px 0 0;line-height:1.45;color:var(--ink);font-size:14px}
.wr-react{display:inline-flex;gap:6px;margin-top:6px}.wr-react em{padding:2px 9px;border:1px solid #1164a3;border-radius:999px;background:#e8f5fa;font:700 12px Epilogue;font-style:normal;color:#1164a3}
@keyframes wr-msg{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.wr-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);background:var(--plum);color:#fff}.wr-intro h1{font-size:clamp(52px,7.6vw,124px)}.wr-intro p{margin-top:18px;max-width:46ch;color:#e6d9e7}
.wr h2{font:900 clamp(42px,6vw,96px)/.92 Epilogue;letter-spacing:-.05em;max-width:13ch}
.wr-teams{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.wr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.wr-team{padding:28px;border-radius:20px;border:2px solid #eee;transition:border-color .2s}.wr-team:hover{border-color:var(--c,var(--blue))}.wr-team:nth-child(2){--c:var(--green)}.wr-team:nth-child(3){--c:var(--red)}
.wr-team code{display:inline-block;padding:4px 10px;border-radius:6px;background:#f4ede4;font:600 14px Epilogue;color:var(--plum)}
.wr-team img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:14px}
.wr-team h3{margin-top:18px;font:800 23px/1.2 Epilogue;letter-spacing:-.03em}.wr-team p{margin-top:8px;color:#55535a}
.wr-price{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.wr-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.wr-price li{padding:30px;border-radius:20px;background:#f4ede4}.wr-price li:nth-child(2){background:var(--plum);color:#fff}
.wr-price h3{font:900 30px Epilogue;letter-spacing:-.04em}.wr-price p{margin-top:8px}
.wr-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.wr-about>p{font-size:clamp(19px,1.8vw,24px)}.wr-about dl{grid-column:2;margin:0}.wr-about dt{font-weight:800;margin-top:16px}.wr-about dd{margin:2px 0 0}
.wr-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--plum);color:#fff;text-align:center}.wr-end h2{margin:0 auto}
.wr footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--deep);color:#d6c2d8}
@media(max-width:900px){.wr nav{gap:12px;font-size:14px}.wr-hero,.wr-grid,.wr-price ul,.wr-about{grid-template-columns:1fr}.wr-about dl{grid-column:auto}.wr-app{grid-template-columns:1fr}.wr-side{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const m = (c, d, who, txt, r) => '<div class="wr-msg" style="--c:' + c + ";--d:" + d + '"><div><strong>' + who + "</strong><p>" + txt + "</p>" + (r ? '<span class="wr-react"><em>' + r + "</em></span>" : "") + "</div></div>"; return '<section class="wr-hero" aria-labelledby="h"><div><span class="wr-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Try it free") + '</div><div class="wr-app" aria-hidden="true"><div class="wr-side"><b>Studio</b><span># general</span><span class="on"># launch</span><span># design<i style="--d:1.2s">3</i></span><span># support<i style="--d:2s">1</i></span><span># random</span></div><div class="wr-feed"><b># launch</b>' + m("var(--blue)", ".6s", "Priya", "Final copy is in the doc. Can someone check the pricing page?", "+1  4") + m("var(--green)", "1.4s", "Tom", "On it. Two typos fixed, ready to ship.", "") + m("var(--yellow)", "2.2s", "Ana", "Shipping at 3. Thanks everyone.", "done  6") + "</div></div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="wr-intro" aria-labelledby="h"><span class="wr-label"># ' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="wr-teams" id="work"><h2>' + k.h("work", "Teams that moved in") + '</h2><div class="wr-grid">' + k.c.cards.map((x, i) => '<article class="wr-team">' + (k.photo(i) || '<code># team-' + (i + 1) + "</code>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="wr-price" id="services"><h2>' + k.h("services", "Pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="wr-about" id="about"><h2>' + k.h("about", "Less noise, more work") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="wr-end" id="contact"><h2>' + k.h("contact", "Bring your team in.") + '</h2>' + k.cta("Try it free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

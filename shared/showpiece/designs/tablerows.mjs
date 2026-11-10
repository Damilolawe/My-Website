export default {
  id: "md-supabase",
  root: "gd",
  fonts: "family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700",
  labels: { work: "Built with it", services: "Pricing", about: "About", contact: "Start a project" },
  intros: {
    work: { title: "Built with Grove", text: "Apps that went from weekend project to real users." },
    features: { title: "Pricing", text: "Two free projects. Pay per project when you go live." },
    studio: { title: "About Grove", text: null },
    contact: { title: "Start a project", text: "A database, sign-in and file storage, ready in two minutes." },
  },
  demo: {
    name: "Grove Database", headline: "Build the backend by Friday.", heroLabel: "A database, sign-in and storage in one",
    bio: "Grove gives you a real SQL database, user sign-in, file storage and live updates, all in one project. Write the app; skip the server set-up.",
    cards: [
      { title: "A booking app in a weekend", description: "Tables, logins and email confirmations, live by Sunday evening." },
      { title: "Live scores for a local league", description: "Every goal shows up on every phone the moment it is entered." },
      { title: "Photo uploads for a school trip", description: "Parents sign in and see only their child's class album." },
    ],
    services: [
      { title: "Free", description: "Two projects, 500 MB database, 50,000 users." },
      { title: "Pro", description: "8 GB database, daily backups, no pausing." },
      { title: "Team", description: "Roles, audit logs and priority support." },
    ],
  },
  css: `
.gd{--cream:#f4efe4;--teal:#0f5f5c;--deep:#0a3b39;--terra:#d4643c;--sage:#cfe2d7;--ink:#13201f;--mute:#5f6e6c;background:var(--cream);color:var(--ink);font:400 17px/1.65 "Space Grotesk",system-ui,sans-serif}
.gd header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:2px solid var(--ink)}
.gd .brand{font:700 20px/1 "Space Grotesk";text-decoration:none;display:flex;align-items:center;gap:10px}.gd .brand:before{content:"";width:20px;height:20px;border:3px solid var(--teal);border-radius:50% 50% 50% 0}
.gd nav{display:flex;gap:clamp(14px,2.4vw,30px);font:400 14px "Space Mono",monospace}.gd nav a{text-decoration:none}.gd nav a:hover,.gd nav a[aria-current]{color:var(--terra)}
.gd-hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.gd-label{font:400 13px "Space Mono",monospace;color:var(--terra)}
.gd h1{margin-top:18px;font:700 clamp(56px,8.4vw,140px)/.92 "Space Grotesk";letter-spacing:-.05em}
.gd h1 .ch{animation:gd-in .5s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes gd-in{from{opacity:0;transform:translateY(.25em)}}
.gd-hero p{margin-top:24px;max-width:44ch;color:#3c4b49}
.gd .cta{display:inline-flex;margin-top:30px;padding:15px 26px;border:2px solid var(--ink);background:var(--teal);color:#fff;font:700 15px "Space Mono",monospace;text-decoration:none;box-shadow:5px 5px 0 var(--ink);transition:transform .15s,box-shadow .15s}.gd .cta:hover{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--ink)}.gd .cta-muted{background:var(--cream);color:var(--mute);box-shadow:none}
.gd-table{border:2px solid var(--ink);background:#fff;box-shadow:10px 10px 0 var(--ink);font:400 clamp(12px,1vw,14px) "Space Mono",monospace;overflow:hidden}
.gd-bar{display:flex;justify-content:space-between;padding:10px 14px;background:var(--ink);color:var(--cream)}.gd-bar b{font-weight:400;color:#7fe0b6}
.gd-grid{display:grid;grid-template-columns:40px 1.4fr 1fr 1fr}
.gd-grid span{padding:9px 12px;border-bottom:1px solid #e6e1d4;border-right:1px solid #e6e1d4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gd-grid .h{background:var(--sage);font-weight:700}
.gd-row{display:contents}
.gd-row span{animation:gd-row 6s ease infinite;animation-delay:var(--d)}
@keyframes gd-row{0%{opacity:0;background:#7fe0b6}6%{opacity:1;background:#7fe0b6}20%,100%{opacity:1;background:transparent}}
.gd-live{display:flex;align-items:center;gap:8px;padding:10px 14px;color:var(--teal)}.gd-live:before{content:"";width:8px;height:8px;border-radius:50%;background:#18b06c;animation:gd-blink 1.2s ease-in-out infinite}@keyframes gd-blink{50%{opacity:.2}}
.gd-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);border-bottom:2px solid var(--ink)}.gd-intro h1{font-size:clamp(52px,7.6vw,124px)}.gd-intro p{margin-top:18px;max-width:46ch;color:#3c4b49}
.gd h2{font:700 clamp(42px,6vw,96px)/.92 "Space Grotesk";letter-spacing:-.045em;max-width:14ch}
.gd-built{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.gd-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.gd-card{border:2px solid var(--ink);background:#fff;box-shadow:6px 6px 0 var(--c,var(--teal))}.gd-card:nth-child(2){--c:var(--terra)}.gd-card:nth-child(3){--c:var(--ink)}
.gd-card code{display:block;padding:10px 16px;border-bottom:2px solid var(--ink);font:400 13px "Space Mono",monospace;background:var(--sage)}
.gd-card img{width:100%;aspect-ratio:16/10;object-fit:cover;border-bottom:2px solid var(--ink)}
.gd-card div{padding:20px}.gd-card h3{font:700 22px/1.2 "Space Grotesk"}.gd-card p{margin-top:8px;color:#3c4b49}
.gd-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--teal);color:var(--cream)}
.gd-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.gd-price li{padding:26px;border:2px solid var(--cream)}.gd-price li:nth-child(2){background:var(--cream);color:var(--ink)}
.gd-price h3{font:700 15px "Space Mono",monospace;text-transform:uppercase}.gd-price p{margin-top:14px;font-size:20px}
.gd-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.gd-about>p{font-size:clamp(19px,1.8vw,24px)}.gd-about dl{grid-column:2;margin:0;font-family:"Space Mono",monospace;font-size:15px}.gd-about dt{color:var(--terra);margin-top:18px}.gd-about dd{margin:4px 0 0}
.gd-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--terra);color:#fff;text-align:center;border-top:2px solid var(--ink)}.gd-end h2{margin:0 auto}
.gd footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Space Mono",monospace;border-top:2px solid var(--ink)}
@media(max-width:900px){.gd nav{gap:12px;font-size:12px}.gd-hero,.gd-cards,.gd-price ul,.gd-about{grid-template-columns:1fr}.gd-about dl{grid-column:auto}.gd-grid{grid-template-columns:30px 1.4fr 1fr}.gd-grid span:nth-child(4n){display:none}}
@media (prefers-reduced-motion:reduce){.gd-row span{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const rows = [["1", "maya@club.org", "Goals", "3"], ["2", "theo@club.org", "Assists", "5"], ["3", "ines@club.org", "Goals", "4"], ["4", "sam@club.org", "Saves", "11"], ["5", "ravi@club.org", "Goals", "2"]]; return '<section class="gd-hero" aria-labelledby="h"><div><span class="gd-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a project") + '</div><div class="gd-table" aria-hidden="true"><div class="gd-bar"><span>public.scores</span><b>5 rows</b></div><div class="gd-grid"><span class="h">id</span><span class="h">player</span><span class="h">stat</span><span class="h">n</span>' + rows.map((r, i) => '<div class="gd-row" style="--d:' + (0.4 + i * 0.5) + 's">' + r.map(c => "<span>" + c + "</span>").join("") + "</div>").join("") + '</div><div class="gd-live">Listening for changes</div></div></section>'; },
  intro: (k) => { const t = k.intro(); return '<section class="gd-intro" aria-labelledby="h"><span class="gd-label">select * from ' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="gd-built" id="work"><h2>' + k.h("work", "Shipped on Grove") + '</h2><div class="gd-cards">' + k.c.cards.map((x, i) => '<article class="gd-card">' + (k.photo(i) || "<code>project_" + (i + 1) + "</code>") + "<div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>",
  services: (k) => '<section class="gd-price" id="services"><h2>' + k.h("services", "Pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="gd-about" id="about"><h2>' + k.h("about", "Why we built Grove") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="gd-end" id="contact"><h2>' + k.h("contact", "Your backend, before lunch.") + '</h2>' + k.cta("Start a project") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

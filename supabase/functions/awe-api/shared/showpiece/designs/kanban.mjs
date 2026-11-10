export default {
  id: "md-airtable",
  root: "fw",
  fonts: "family=Schibsted+Grotesk:ital,wght@0,400;0,600;0,800;0,900;1,800",
  labels: { work: "Projects", services: "Pricing", about: "About", contact: "Start free" },
  intros: {
    work: { title: "Projects on the board", text: "Real research teams, from interview to insight." },
    features: { title: "Pricing", text: "Start free. Add your team when you are ready." },
    studio: { title: "About Fieldwork", text: null },
    contact: { title: "Start a board", text: "Import your notes or start from a template. Free for small teams." },
  },
  demo: {
    name: "Fieldwork Studio", headline: "All your ideas, connected.", heroLabel: "Boards for research teams",
    bio: "Fieldwork turns interview notes, sticky notes and loose ideas into one board your whole team can see. Tag a quote once and it shows up everywhere it matters.",
    cards: [
      { title: "Twelve interviews, one pattern", description: "A health team tagged quotes and found the same worry in nine of them." },
      { title: "Workshop to roadmap", description: "Sticky notes from a Tuesday session became next quarter's plan by Friday." },
      { title: "Archive that answers", description: "Search three years of research and find who said it, and when." },
    ],
    services: [
      { title: "Free", description: "Up to three people and five boards." },
      { title: "Team", description: "Unlimited boards, tagging and a shared quote library." },
      { title: "Lab", description: "Permissions, audit history and single sign-on." },
    ],
  },
  css: `
.fw{--paper:#f7f6f1;--ink:#17191c;--blue:#2d7ff9;--yellow:#fcb400;--pink:#f82b60;--green:#20c933;--teal:#18bfff;background:var(--paper);color:var(--ink);font:400 17px/1.6 "Schibsted Grotesk",system-ui,sans-serif}
.fw header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.fw .brand{display:flex;align-items:center;gap:10px;font:900 21px/1 "Schibsted Grotesk";letter-spacing:-.03em;text-decoration:none}
.fw .brand:before{content:"";width:26px;height:22px;background:linear-gradient(90deg,var(--blue) 0 30%,transparent 30% 35%,var(--yellow) 35% 65%,transparent 65% 70%,var(--pink) 70%);border-radius:4px}
.fw nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.fw nav a{text-decoration:none}.fw nav a:hover{color:var(--blue)}
.fw-hero{padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.fw-top{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:40px;align-items:end}
.fw h1{font:900 clamp(56px,9.4vw,156px)/.88 "Schibsted Grotesk";letter-spacing:-.06em}
.fw h1 .ch{animation:fw-pop .5s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes fw-pop{from{opacity:0;transform:translateY(.4em)}}
.fw-top p{font-size:clamp(17px,1.5vw,20px);color:#45484f}
.fw .cta{display:inline-flex;margin-top:22px;padding:15px 26px;border-radius:10px;background:var(--ink);color:#fff;font-weight:800;text-decoration:none;transition:background .2s}.fw .cta:hover{background:var(--blue)}.fw .cta-muted{background:#fff;color:var(--ink);border:2px solid var(--ink);font-weight:600}
.fw-board{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,60px);padding:18px;border-radius:22px;background:#e9e7df;min-height:340px}
.fw-col{position:relative;padding:12px;border-radius:14px;background:#f2f0e9}
.fw-col h3{display:flex;justify-content:space-between;font:800 14px "Schibsted Grotesk";padding:4px 6px 12px}.fw-col h3 span{font-weight:600;color:#7a7d84}
.fw-card{display:block;margin-bottom:10px;padding:14px;border-radius:12px;background:#fff;box-shadow:0 2px 0 rgba(23,25,28,.08);font:600 15px/1.3 "Schibsted Grotesk"}
.fw-card i{display:inline-block;margin-bottom:8px;padding:2px 10px;border-radius:999px;font:800 11px/1.6 "Schibsted Grotesk";font-style:normal;color:#fff;background:var(--c,var(--blue))}
.fw-mover{position:absolute;top:66px;left:calc(18px + 12px);width:calc((100% - 36px - 32px) / 3 - 24px);z-index:3;box-shadow:0 18px 30px -12px rgba(23,25,28,.35);animation:fw-move 9s cubic-bezier(.65,0,.35,1) infinite}
@keyframes fw-move{0%,12%{transform:translate(0,0) rotate(0)}22%{transform:translate(50%,-20px) rotate(4deg)}33%,45%{transform:translate(calc(100% + 40px),40px) rotate(0)}55%{transform:translate(calc(150% + 40px),20px) rotate(-4deg)}66%,88%{transform:translate(calc(200% + 80px),90px) rotate(0)}100%{transform:translate(0,0)}}
.fw-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}.fw-intro h1{font-size:clamp(52px,8vw,130px)}.fw-intro p{margin-top:20px;max-width:46ch;color:#45484f}
.fw h2{font:900 clamp(40px,6vw,92px)/.92 "Schibsted Grotesk";letter-spacing:-.055em;max-width:13ch}
.fw-projects{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper)}
.fw-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.fw-tile{padding:28px;border-radius:22px;background:var(--c);color:var(--ink);transform:rotate(var(--r));transition:transform .3s}.fw-tile:hover{transform:rotate(0) translateY(-6px)}
.fw-tile:nth-child(3n+1){--c:var(--yellow);--r:-1.5deg}.fw-tile:nth-child(3n+2){--c:var(--teal);--r:1deg}.fw-tile:nth-child(3n){--c:#ff8fae;--r:-.5deg}
.fw-tile img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:16px}
.fw-tile h3{font:800 24px/1.15 "Schibsted Grotesk";letter-spacing:-.03em}.fw-tile p{margin-top:8px}
.fw-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fw-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,60px)}
.fw-price li{padding:30px;border-radius:22px;background:#fff;border:2px solid var(--ink)}.fw-price li:nth-child(2){background:var(--blue);color:#fff;border-color:var(--blue)}
.fw-price h3{font:900 30px "Schibsted Grotesk";letter-spacing:-.04em}.fw-price p{margin-top:10px}
.fw-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.fw-about>p{font-size:clamp(19px,1.8vw,23px)}.fw-about dl{grid-column:2;margin:0;display:grid;gap:12px}.fw-about dl div{padding:16px 20px;border-radius:14px;border-left:6px solid var(--yellow);background:var(--paper)}.fw-about dt{font-weight:800}.fw-about dd{margin:4px 0 0}
.fw-end{padding:clamp(90px,12vw,160px) clamp(18px,4vw,56px);background:var(--yellow);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}
.fw footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:860px){.fw nav{gap:12px;font-size:14px}.fw-top,.fw-tiles,.fw-price ul,.fw-about{grid-template-columns:1fr}.fw-board{grid-template-columns:1fr}.fw-col:nth-child(n+2){display:none}.fw-mover{display:none}.fw-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const t = (k.c.cards.length ? k.c.cards : [{ title: "First idea" }]).map(x => k.E(x.title)); const card = (txt, tag, c) => '<span class="fw-card"><i style="--c:' + c + '">' + tag + "</i><br>" + txt + "</span>"; return '<section class="fw-hero" aria-labelledby="h"><div class="fw-top"><h1 id="h">' + k.letters(k.c.headline) + "</h1><div><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a free board") + '</div></div><div class="fw-board" aria-hidden="true"><div class="fw-col"><h3>Notes <span>4</span></h3>' + card("Interview with a night nurse", "quote", "var(--pink)") + card("Photos from the ward visit", "photo", "var(--teal)") + '</div><div class="fw-col"><h3>Themes <span>3</span></h3>' + card(t[1] || t[0], "theme", "var(--yellow)") + card("Handover is rushed", "theme", "var(--yellow)") + '</div><div class="fw-col"><h3>Decisions <span>2</span></h3>' + card(t[2] || t[0], "decided", "var(--green)") + '</div><span class="fw-card fw-mover"><i style="--c:var(--blue)">idea</i><br>' + t[0] + "</span></div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="fw-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="fw-projects" id="work"><h2>' + k.h("work", "What teams found") + '</h2><div class="fw-tiles">' + k.c.cards.map((x, i) => '<article class="fw-tile">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="fw-price" id="services"><h2>' + k.h("services", "Simple pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fw-about" id="about"><h2>' + k.h("about", "Made by researchers") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fw-end" id="contact"><h2>' + k.h("contact", "Pin your first idea.") + '</h2>' + k.cta("Start a free board") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

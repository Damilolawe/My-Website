export default {
  id: "md-x-ai",
  root: "xw",
  fonts: "family=Libre+Franklin:wght@400;700;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400",
  labels: { work: "Puzzles", services: "Subscribe", about: "About", contact: "Try today's puzzle" },
  demo: {
    name: "Cross Words", headline: "Seven letters for happy.", heroLabel: "A daily crossword, made by hand",
    bio: "A new crossword every morning, written by a small team of setters who love a good pun. Easy on Monday, fiendish by Saturday, and always solvable with a cup of tea.",
    cards: [
      { title: "The daily mini", description: "Five by five. Two minutes with your coffee." },
      { title: "The weekday classic", description: "Fifteen by fifteen, getting harder as the week goes on." },
      { title: "The Saturday cryptic", description: "For people who enjoy being outwitted." },
    ],
    services: [
      { title: "Daily", description: "Every puzzle, every day, with the archive." },
      { title: "Print edition", description: "A monthly booklet of thirty puzzles by post." },
      { title: "Gift", description: "A year of puzzles for someone clever." },
    ],
  },
  css: `
.xw{--paper:#fbfaf6;--ink:#111;--blue:#2d5bd7;--yellow:#ffd93d;--grey:#d9d6cc;--mute:#666;background:var(--paper);color:var(--ink);font:400 17px/1.7 "Libre Baskerville",Georgia,serif}
.xw header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:4px double var(--ink)}
.xw .brand{display:flex;align-items:center;gap:10px;font:900 22px/1 "Libre Franklin";text-transform:uppercase;letter-spacing:.02em;text-decoration:none}.xw .brand:before{content:"";width:22px;height:22px;background:conic-gradient(var(--ink) 0 25%,#fff 0 50%,var(--ink) 0 75%,#fff 0);border:2px solid var(--ink)}
.xw nav{display:flex;gap:clamp(14px,2.4vw,30px);font:700 15px "Libre Franklin"}.xw nav a{text-decoration:none}.xw nav a:hover{color:var(--blue)}
.xw-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.xw-label{font:italic 400 19px "Libre Baskerville";color:var(--blue)}
.xw h1{margin-top:12px;font:900 clamp(54px,8vw,132px)/.95 "Libre Franklin";letter-spacing:-.04em}
.xw h1 .ch{animation:xw-in .3s steps(2) both;animation-delay:calc(var(--i) * 45ms)}@keyframes xw-in{from{opacity:0}}
.xw-hero p{margin-top:22px;max-width:44ch}
.xw .cta{display:inline-flex;margin-top:28px;padding:15px 26px;background:var(--ink);color:var(--paper);font:700 16px "Libre Franklin";text-decoration:none;transition:background .2s}.xw .cta:hover{background:var(--blue)}.xw .cta-muted{background:var(--grey);color:var(--mute)}
.xw-puz{justify-self:center;width:min(100%,440px)}
.xw-grid{display:grid;grid-template-columns:repeat(7,1fr);border:3px solid var(--ink);background:var(--ink);gap:2px}
.xw-c{position:relative;aspect-ratio:1;background:#fff;display:grid;place-items:center;font:700 clamp(18px,2.2vw,28px) "Libre Franklin";text-transform:uppercase}
.xw-c.b{background:var(--ink)}
.xw-c small{position:absolute;left:3px;top:1px;font:400 10px "Libre Franklin"}
.xw-c.a{background:#dbe5ff}
.xw-c.a.f{background:var(--yellow)}
.xw-c span{opacity:0;animation:xw-fill .2s ease both;animation-delay:var(--d)}
@keyframes xw-fill{to{opacity:1}}
.xw-clue{margin-top:14px;padding:14px 16px;background:#dbe5ff;font:700 15px "Libre Franklin"}.xw-clue b{color:var(--blue);margin-right:8px}
.xw h2{font:900 clamp(42px,6vw,98px)/.98 "Libre Franklin";letter-spacing:-.04em;max-width:14ch}
.xw-puzzles{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#f1efe7}
.xw-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.xw-p{padding:24px;background:#fff;border:2px solid var(--ink)}
.xw-mini{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:2px;width:60%;margin-bottom:20px;padding:2px;background:var(--ink)}
.xw-mini i{aspect-ratio:1;background:#fff}.xw-mini i:nth-child(7n+3),.xw-mini i:nth-child(5n+1){background:var(--ink)}
.xw-p img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:16px}
.xw-p h3{font:900 24px/1.15 "Libre Franklin"}.xw-p p{margin-top:8px;color:#444}
.xw-sub{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.xw-sub ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px);counter-reset:n}
.xw-sub li{padding:28px;border-top:6px solid var(--ink);counter-increment:n}.xw-sub li:before{content:counter(n) " across";display:block;font:700 13px "Libre Franklin";text-transform:uppercase;color:var(--blue);margin-bottom:8px}
.xw-sub h3{font:900 24px "Libre Franklin"}.xw-sub p{margin-top:6px}
.xw-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.xw-about>p{font-size:clamp(19px,1.8vw,23px)}.xw-about dl{grid-column:2;margin:0}.xw-about dt{font:900 17px "Libre Franklin";margin-top:16px}.xw-about dd{margin:2px 0 0}
.xw-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.xw-end h2{margin:0 auto}
.xw footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Libre Franklin";border-top:4px double var(--ink)}
@media(max-width:900px){.xw nav{gap:12px;font-size:13px}.xw-hero,.xw-list,.xw-sub ol,.xw-about{grid-template-columns:1fr}.xw-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.xw-c span{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const G = ["B..S..B", "...U...", "CHIPPER", "B..P..B", ".B.E.B.", "...R...", "B..B..B"]; let fill = 0; const cells = G.map((row, r) => [...row].map((ch, c) => { if (ch === "B") return '<span class="xw-c b"></span>'; const across = r === 2; const num = (r === 0 && c === 3) ? 1 : (r === 2 && c === 0) ? 2 : (r === 4 && c === 0) ? 3 : 0; const letter = across ? "CHIPPER"[c] : (c === 3 && ch !== ".") ? ch : ""; const d = across ? (0.8 + (fill++) * 0.28).toFixed(2) : "0"; return '<span class="xw-c' + (across ? " a" + (c === 6 ? " f" : "") : "") + '">' + (num ? "<small>" + num + "</small>" : "") + (letter ? '<span style="--d:' + (across ? d : "0") + 's">' + letter + "</span>" : "") + "</span>"; }).join("")).join(""); return '<section class="xw-hero" aria-labelledby="h"><div><span class="xw-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Try today's puzzle") + '</div><div class="xw-puz" aria-hidden="true"><div class="xw-grid">' + cells + '</div><div class="xw-clue"><b>2 Across</b>In good spirits (7)</div></div></section>'; },
  work: (k) => { const n = [5, 9, 7]; return '<section class="xw-puzzles" id="work"><h2>Pick your puzzle</h2><div class="xw-list">' + k.c.cards.map((x, i) => '<article class="xw-p">' + (k.photo(i) || '<span class="xw-mini" aria-hidden="true" style="--n:' + n[i % 3] + '">' + "<i></i>".repeat(n[i % 3] * n[i % 3]) + "</span>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="xw-sub" id="services"><h2>Subscribe</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="xw-about" id="about"><h2>The setters</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="xw-end" id="contact"><h2>Pencils ready?</h2>' + k.cta("Try today's puzzle") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

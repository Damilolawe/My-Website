export default {
  id: "md-claude",
  root: "ki",
  fonts: "family=Crimson+Pro:ital,wght@0,400;0,700;1,400&family=Atkinson+Hyperlegible:wght@400;700",
  labels: { work: "What it finds", services: "Plans", about: "About", contact: "Try it" },
  demo: {
    name: "Kinship Intelligence", headline: "Every answer, with its source.", heroLabel: "A research assistant for libraries and archives",
    bio: "Ask a question in plain words. Kinship searches your collection, answers in a paragraph, and shows the exact page each sentence came from, so readers can check it themselves.",
    cards: [
      { title: "A town history, searchable", description: "Ninety years of council minutes, answered by date, street or name." },
      { title: "Letters from the front", description: "A war archive where families can find a great-grandparent's regiment." },
      { title: "The recipe collection", description: "Handwritten cookbooks, transcribed and searchable by ingredient." },
    ],
    services: [
      { title: "Small library", description: "Up to 50,000 pages, unlimited readers." },
      { title: "Archive", description: "Handwriting transcription and custom catalogues." },
      { title: "Network", description: "Several branches, one shared search." },
    ],
  },
  css: `
.ki{--navy:#14254a;--ink:#1a1d24;--paper:#f7f8fb;--card:#fff;--rule:#c9d4ea;--hi:#e8f05a;--red:#c43d3d;background:var(--paper);color:var(--ink);font:400 17px/1.7 "Atkinson Hyperlegible",system-ui,sans-serif}
.ki header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);border-bottom:3px double var(--navy)}
.ki .brand{font:700 24px/1 "Crimson Pro",serif;text-decoration:none;color:var(--navy)}
.ki nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700;font-size:15px}.ki nav a{text-decoration:none}.ki nav a:hover{color:var(--red)}
.ki-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.ki-label{font:italic 400 20px "Crimson Pro",serif;color:var(--red)}
.ki h1{margin-top:12px;font:700 clamp(54px,7.8vw,128px)/.98 "Crimson Pro",serif;letter-spacing:-.03em;color:var(--navy)}
.ki h1 .ch{animation:ki-in .6s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes ki-in{from{opacity:0;transform:translateY(.2em)}}
.ki-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.ki .cta{display:inline-flex;margin-top:28px;padding:14px 26px;border-radius:4px;background:var(--navy);color:#fff;font-weight:700;text-decoration:none;transition:background .2s}.ki .cta:hover{background:var(--red)}.ki .cta-muted{background:#e4e9f3;color:#4c5568}
.ki-drawer{position:relative;height:clamp(340px,34vw,440px)}
.ki-card{position:absolute;left:4%;right:4%;padding:24px 26px;border-radius:4px;background:var(--card);background-image:linear-gradient(transparent 46px,var(--red) 46px 48px,transparent 48px),repeating-linear-gradient(transparent 0 27px,var(--rule) 27px 28px);background-position:0 0,0 48px;box-shadow:0 14px 30px -18px rgba(20,37,74,.5);font:400 16px/28px "Crimson Pro",serif;animation:ki-file 9s cubic-bezier(.6,0,.3,1) infinite;animation-delay:var(--d)}
.ki-card:nth-child(1){top:0;--d:0s}.ki-card:nth-child(2){top:30px;--d:-3s}.ki-card:nth-child(3){top:60px;--d:-6s}
.ki-card b{display:block;font:700 18px/20px "Crimson Pro",serif;color:var(--navy);margin-bottom:28px}
.ki-card mark{background:var(--hi);padding:0 2px}
.ki-card small{display:block;font:700 12px "Atkinson Hyperlegible";color:var(--red)}
@keyframes ki-file{0%,28%{transform:translateY(0) rotate(-1deg);z-index:3}33%{transform:translateY(-120px) rotate(3deg);z-index:3}38%,61%{transform:translateY(60px);z-index:1}66%,94%{transform:translateY(30px);z-index:2}100%{transform:translateY(0) rotate(-1deg);z-index:3}}
.ki h2{font:700 clamp(40px,5.6vw,88px)/1.02 "Crimson Pro",serif;letter-spacing:-.025em;max-width:15ch;color:var(--navy)}
.ki-finds{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#e9eef7}
.ki-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.ki-find{padding:26px;background:var(--card);border-top:6px solid var(--navy);box-shadow:0 12px 24px -20px rgba(20,37,74,.5)}
.ki-find small{font:700 12px "Atkinson Hyperlegible";color:var(--red)}
.ki-find img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:14px}
.ki-find h3{margin-top:10px;font:700 26px/1.15 "Crimson Pro",serif}.ki-find p{margin-top:8px;color:#4c5568}
.ki-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ki-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ki-plans li{padding:28px;border:2px solid var(--navy);border-radius:4px}.ki-plans li:nth-child(2){background:var(--navy);color:#fff}
.ki-plans h3{font:700 28px "Crimson Pro",serif}.ki-plans p{margin-top:8px}
.ki-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--navy);color:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ki-about h2{color:#fff}.ki-about>p{font:400 clamp(20px,2vw,26px)/1.55 "Crimson Pro",serif}.ki-about dl{grid-column:2;margin:0}.ki-about dt{font-weight:700;color:var(--hi);margin-top:16px}.ki-about dd{margin:2px 0 0}
.ki-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ki-end h2{margin:0 auto}
.ki footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;border-top:3px double var(--navy)}
@media(max-width:900px){.ki nav{gap:12px;font-size:13px}.ki-hero,.ki-list,.ki-plans ul,.ki-about{grid-template-columns:1fr}.ki-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.ki-card:nth-child(n+2){display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ki-hero" aria-labelledby="h"><div><span class="ki-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Try it with your collection") + '</div><div class="ki-drawer" aria-hidden="true"><div class="ki-card"><b>When did the bridge open?</b>The new bridge opened on <mark>4 June 1931</mark>, with a brass band and a ribbon cut by the mayor.<small>Source: Council minutes, vol. 12, p. 88</small></div><div class="ki-card"><b>Who ran the bakery on Mill Street?</b>The bakery was run by <mark>Ada and Tom Fenwick</mark> from 1919 until the war.<small>Source: Trade directory, 1925, p. 41</small></div><div class="ki-card"><b>What was on the school menu?</b>Pupils were served <mark>stew on Mondays</mark> and fish every Friday.<small>Source: School log book, 1948, p. 7</small></div></div></section>',
  work: (k) => '<section class="ki-finds" id="work"><h2>What readers found</h2><div class="ki-list">' + k.c.cards.map((x, i) => '<article class="ki-find">' + k.photo(i) + "<small>Collection " + (i + 1) + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ki-plans" id="services"><h2>Plans for every collection</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ki-about" id="about"><h2>Built with librarians</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ki-end" id="contact"><h2>Ask your archive anything.</h2>' + k.cta("Try it with your collection") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

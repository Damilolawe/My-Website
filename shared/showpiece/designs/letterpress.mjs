export default {
  id: "md-aljazeera",
  root: "ol",
  fonts: "family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400",
  labels: { work: "Letters", services: "Subscribe", about: "About", contact: "Write in" },
  intros: {
    work: { title: "Recent letters", text: "One long story a week, written slowly and checked twice." },
    features: { title: "Subscribe", text: "Free on Sundays. Paid subscribers get the archive and the podcast." },
    studio: { title: "About the letter", text: null },
    contact: { title: "Write in", text: "Tips, corrections and replies all land in the same inbox. We read every one." },
  },
  demo: {
    name: "The Open Letter", headline: "Dear reader, here is what happened.", heroLabel: "An independent weekly newsletter",
    bio: "One reported story every Sunday, written as a letter to you. No hot takes, no paywall on the news itself, and a reply button that a real editor reads.",
    cards: [
      { title: "The town that bought its own pub", description: "How 312 neighbours raised the money and what they serve now." },
      { title: "Notes from the night ferry", description: "Twelve hours with the crew who keep the island supplied." },
      { title: "Where the river used to be", description: "A drought, a dry riverbed and the village that found its old bridge." },
    ],
    services: [
      { title: "The Sunday letter", description: "Free, every week, straight to your inbox." },
      { title: "Supporter", description: "The full archive, the audio edition and our thanks in print." },
      { title: "Gift subscription", description: "A year of letters for someone who reads to the end." },
    ],
  },
  css: `
.ol{--paper:#f4f1ea;--sheet:#fffdf8;--ink:#1b1f24;--red:#c8102e;--kraft:#c9a679;--desk:#3c4a52;background:var(--desk);color:var(--ink);font:400 19px/1.7 Newsreader,Georgia,serif}
.ol header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);color:var(--sheet)}
.ol .brand{font:600 italic 24px/1 Newsreader;text-decoration:none}
.ol nav{display:flex;gap:clamp(14px,2.4vw,30px);font:400 15px "Courier Prime",monospace}.ol nav a{text-decoration:none;opacity:.8}.ol nav a:hover,.ol nav a[aria-current]{opacity:1;text-decoration:underline}
.ol-hero{padding:clamp(20px,4vw,50px) clamp(18px,4vw,56px) clamp(70px,9vw,120px);display:grid;place-items:center}
.ol-letter{position:relative;width:min(960px,100%);padding:clamp(34px,6vw,80px) clamp(24px,6vw,90px) clamp(44px,6vw,80px);background:var(--sheet);box-shadow:0 30px 60px -30px rgba(0,0,0,.6);transform:rotate(-.6deg);background-image:repeating-linear-gradient(transparent 0 33px,rgba(27,31,36,.06) 33px 34px)}
.ol-letter:before{content:"";position:absolute;top:-14px;right:12%;width:120px;height:34px;background:rgba(201,166,121,.75);transform:rotate(4deg)}
.ol-date{font:400 15px "Courier Prime",monospace;color:#6a6f75}
.ol h1{margin-top:22px;font:400 clamp(40px,6.4vw,96px)/1.05 "Courier Prime",monospace;letter-spacing:-.03em}
.ol-type{display:inline;background:linear-gradient(var(--ink),var(--ink)) right bottom/0 0 no-repeat}
.ol h1 .ch{animation:ol-key .01s both;animation-delay:calc(var(--i) * 70ms + .4s)}@keyframes ol-key{from{opacity:0}}
.ol-caret{display:inline-block;width:.55em;height:.95em;margin-left:.08em;vertical-align:-.1em;background:var(--red);animation:ol-blink 1s steps(1) infinite}@keyframes ol-blink{50%{opacity:0}}
.ol-letter p{margin-top:28px;max-width:52ch;font-size:clamp(19px,1.7vw,23px)}
.ol-sign{margin-top:30px;font:italic 400 28px Newsreader;color:var(--red)}
.ol .cta{display:inline-flex;margin-top:28px;padding:14px 24px;background:var(--red);color:#fff;font:700 15px "Courier Prime",monospace;text-decoration:none;transition:transform .2s}.ol .cta:hover{transform:rotate(-1deg)}.ol .cta-muted{background:transparent;color:var(--ink);border:1px dashed var(--ink);font-weight:400}
.ol-intro{padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px);color:var(--sheet)}.ol-intro h1{font-size:clamp(44px,7vw,110px)}.ol-intro p{margin-top:18px;max-width:46ch;opacity:.9}
.ol h2{font:600 clamp(36px,5vw,72px)/1.05 Newsreader;letter-spacing:-.02em}
.ol-stack{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper)}
.ol-entries{display:grid;gap:clamp(18px,3vw,30px);margin-top:clamp(36px,5vw,60px)}
.ol-entry{display:grid;grid-template-columns:110px minmax(0,1fr) 120px;gap:28px;align-items:start;padding:28px;background:var(--sheet);border-left:6px solid var(--kraft);box-shadow:0 12px 24px -20px rgba(0,0,0,.4)}
.ol-entry:nth-child(even){margin-left:clamp(0px,6vw,90px)}
.ol-no{font:700 15px "Courier Prime",monospace;color:var(--red)}.ol-entry h3{font:600 clamp(24px,2.4vw,32px)/1.15 Newsreader}.ol-entry p{margin-top:8px;color:#4a4f55}
.ol-stamp{width:96px;height:112px;padding:7px;background:var(--sheet);border:2px dashed var(--kraft);justify-self:end;transform:rotate(4deg)}.ol-stamp span{display:grid;place-items:center;height:100%;background:var(--desk);color:var(--sheet);font:700 12px "Courier Prime",monospace;text-align:center}
.ol-stamp img{width:100%;height:100%;object-fit:cover}
.ol-subs{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);color:var(--sheet)}
.ol-subs ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,60px)}
.ol-subs li{padding:28px;border:1px solid rgba(255,253,248,.35)}.ol-subs h3{font:600 26px Newsreader}.ol-subs p{margin-top:8px;opacity:.85}
.ol-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sheet);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(30px,6vw,90px)}.ol-about>p{font-size:clamp(20px,1.9vw,26px)}.ol-about dl{grid-column:2;margin:0;font-family:"Courier Prime",monospace;font-size:16px}.ol-about dt{font-weight:700;margin-top:18px;color:var(--red)}.ol-about dd{margin:4px 0 0}
.ol-end{padding:clamp(90px,12vw,160px) clamp(18px,4vw,56px);background:var(--paper);text-align:center}.ol-end h2{max-width:16ch;margin:0 auto}
.ol footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 14px "Courier Prime",monospace;color:var(--sheet)}
@media(max-width:860px){.ol nav{gap:12px;font-size:13px}.ol-entry{grid-template-columns:1fr}.ol-entry:nth-child(even){margin-left:0}.ol-stamp{justify-self:start}.ol-subs ul,.ol-about{grid-template-columns:1fr}.ol-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ol-hero" aria-labelledby="h"><div class="ol-letter"><span class="ol-date">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '<span class="ol-caret" aria-hidden="true"></span></h1><p>' + k.E(k.c.bio) + '</p><p class="ol-sign">The editors</p>' + k.cta("Get the Sunday letter") + "</div></section>",
  intro: (k) => { const t = k.intro(); return '<section class="ol-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + '<span class="ol-caret" aria-hidden="true"></span></h1><p>' + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="ol-stack" id="work"><h2>' + k.h("work", "From recent letters") + '</h2><div class="ol-entries">' + k.c.cards.map((x, i) => '<article class="ol-entry"><span class="ol-no">No. ' + String(140 - i) + "</span><div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + '</p></div><div class="ol-stamp" aria-hidden="true">' + (k.photo(i) || "<span>Sunday<br>post</span>") + "</div></article>").join("") + "</div></section>",
  services: (k) => '<section class="ol-subs" id="services"><h2>' + k.h("services", "Ways to read") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ol-about" id="about"><h2>' + k.h("about", "Who writes the letter") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ol-end" id="contact"><h2>' + k.h("contact", "Write back. We read every reply.") + '</h2>' + k.cta("Write to the editors") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

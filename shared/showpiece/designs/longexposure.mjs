export default {
  id: "still",
  root: "sl",
  fonts: "family=Tenor+Sans&family=Nanum+Myeongjo:wght@400;700",
  labels: { work: "Series", services: "Commissions", about: "About", contact: "Enquire" },
  demo: {
    name: "Elin Sato", headline: "Quiet light.", heroLabel: "Fine art photographer",
    bio: "I photograph coastlines and empty rooms on long exposures, sometimes minutes at a time, until the water turns to mist and only the light is left. Prints are made by hand in small editions.",
    cards: [
      { title: "Low tide, north shore", description: "Twelve exposures of four minutes each, made over one winter." },
      { title: "Rooms after closing", description: "Museums and libraries photographed in the hour after the doors shut." },
      { title: "Fog studies", description: "A harbour, the same view, forty mornings in a row." },
    ],
    services: [
      { title: "Editions", description: "Archival prints, editions of ten." },
      { title: "Commissions", description: "Architecture and interiors, by arrangement." },
      { title: "Exhibitions", description: "Available for group and solo shows." },
    ],
  },
  css: `
.sl{--white:#f7f7f5;--stone:#e4e2dc;--ink:#1f1f1d;--mute:#86847d;--mist:#c9ced2;background:var(--white);color:var(--ink);font:400 16px/1.9 "Nanum Myeongjo",Georgia,serif}
.sl header{display:flex;justify-content:space-between;align-items:center;padding:28px clamp(18px,5vw,80px)}
.sl .brand{font:400 15px/1 "Tenor Sans";letter-spacing:.36em;text-transform:uppercase;text-decoration:none}
.sl nav{display:flex;gap:clamp(18px,3vw,40px);font:400 13px "Tenor Sans";letter-spacing:.2em;text-transform:uppercase}.sl nav a{text-decoration:none;color:var(--mute)}.sl nav a:hover,.sl nav a[aria-current]{color:var(--ink)}
.sl-hero{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);gap:clamp(30px,6vw,110px);align-items:end;padding:clamp(40px,6vw,100px) clamp(18px,5vw,80px) clamp(80px,10vw,140px)}
.sl-label{font:400 12px "Tenor Sans";letter-spacing:.3em;text-transform:uppercase;color:var(--mute)}
.sl h1{margin-top:24px;font:400 clamp(54px,7vw,116px)/1 "Tenor Sans";letter-spacing:-.02em}
.sl h1 .ch{animation:sl-in 2.4s ease both;animation-delay:calc(var(--i) * 90ms)}@keyframes sl-in{from{opacity:0}}
.sl-hero p{margin-top:28px;max-width:36ch;color:#4b4a46}
.sl .cta{display:inline-flex;margin-top:32px;padding-bottom:6px;border-bottom:1px solid var(--ink);font:400 13px "Tenor Sans";letter-spacing:.24em;text-transform:uppercase;text-decoration:none;transition:letter-spacing .5s}.sl .cta:hover{letter-spacing:.34em}.sl .cta-muted{border-color:var(--stone);color:var(--mute)}
.sl-frame{position:relative;aspect-ratio:1.5;overflow:hidden;background:linear-gradient(180deg,#d9dde0 0 52%,#b7bec3 52% 54%,#a8b0b5 54%)}
.sl-frame:before{content:"";position:absolute;inset:-20%;background:radial-gradient(60% 30% at 50% 54%,rgba(255,255,255,.9),transparent 70%);filter:blur(10px);animation:sl-mist 12s ease-in-out infinite alternate}
@keyframes sl-mist{from{transform:translateX(-6%)}to{transform:translateX(6%)}}
.sl-rock{position:absolute;bottom:30%;left:var(--x);width:var(--w);aspect-ratio:2.4;border-radius:50% 50% 20% 20%;background:#3b3c3b;filter:blur(.4px)}
.sl-rock:after{content:"";position:absolute;left:0;right:0;top:100%;height:60%;background:linear-gradient(#3b3c3b,transparent);opacity:.35;transform:scaleY(-1);filter:blur(3px)}
.sl-dev{position:absolute;inset:0;background:var(--white);animation:sl-develop 4s ease .6s both}@keyframes sl-develop{to{opacity:0}}
.sl-meta{position:absolute;left:0;bottom:-34px;font:400 11px "Tenor Sans";letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.sl-photo{position:relative;padding-bottom:34px}
.sl h2{font:400 clamp(38px,5vw,80px)/1.05 "Tenor Sans";letter-spacing:-.015em;max-width:16ch}
.sl-series{padding:clamp(80px,10vw,160px) clamp(18px,5vw,80px)}
.sl-list{display:grid;gap:clamp(60px,8vw,120px);margin-top:clamp(50px,7vw,90px)}
.sl-s{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,.6fr);gap:clamp(30px,5vw,80px);align-items:end}
.sl-s:nth-child(even){grid-template-columns:minmax(0,.6fr) minmax(0,1.4fr)}.sl-s:nth-child(even) .sl-ph{order:2}
.sl-ph{aspect-ratio:1.5;background:linear-gradient(var(--a),var(--b))}
.sl-s img{width:100%;aspect-ratio:1.5;object-fit:cover;filter:grayscale(.4)}
.sl-s small{font:400 11px "Tenor Sans";letter-spacing:.3em;text-transform:uppercase;color:var(--mute)}
.sl-s h3{margin-top:10px;font:400 26px/1.25 "Tenor Sans"}.sl-s p{margin-top:10px;color:#4b4a46}
@supports (animation-timeline:view()){.sl-ph,.sl-s img{animation:sl-rev linear both;animation-timeline:view();animation-range:entry 0% cover 40%}@keyframes sl-rev{from{opacity:.1;filter:grayscale(1) blur(6px)}}}
.sl-com{padding:clamp(80px,10vw,140px) clamp(18px,5vw,80px);background:var(--stone)}
.sl-com ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(24px,4vw,60px);margin-top:clamp(36px,5vw,56px)}
.sl-com h3{font:400 13px "Tenor Sans";letter-spacing:.24em;text-transform:uppercase}.sl-com p{margin-top:10px}
.sl-about{padding:clamp(80px,10vw,160px) clamp(18px,5vw,80px);display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(30px,6vw,110px)}.sl-about>p{font-size:clamp(18px,1.6vw,22px)}.sl-about dl{grid-column:2;margin:0}.sl-about dt{font:400 12px "Tenor Sans";letter-spacing:.24em;text-transform:uppercase;color:var(--mute);margin-top:22px}.sl-about dd{margin:4px 0 0}
.sl-end{padding:clamp(100px,14vw,200px) clamp(18px,5vw,80px);text-align:center;background:var(--ink);color:var(--white)}.sl-end h2{margin:0 auto}.sl-end .cta{border-color:var(--white)}
.sl footer{display:flex;justify-content:space-between;padding:28px clamp(18px,5vw,80px);font:400 12px "Tenor Sans";letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
@media(max-width:900px){.sl nav{gap:12px;font-size:11px}.sl-hero,.sl-s,.sl-s:nth-child(even),.sl-com ul,.sl-about{grid-template-columns:1fr}.sl-s:nth-child(even) .sl-ph{order:0}.sl-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="sl-hero" aria-labelledby="h"><div><span class="sl-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Enquire") + '</div><div class="sl-photo" aria-hidden="true"><div class="sl-frame"><span class="sl-rock" style="--x:22%;--w:16%"></span><span class="sl-rock" style="--x:58%;--w:9%"></span><span class="sl-dev"></span></div><span class="sl-meta">Low tide, 240 seconds</span></div></section>',
  work: (k) => { const g = [["#d9dde0", "#9aa3a8"], ["#e8e4dc", "#b9b2a6"], ["#dfe3e4", "#c3c9cb"]]; return '<section class="sl-series" id="work"><h2>Series</h2><div class="sl-list">' + k.c.cards.map((x, i) => '<article class="sl-s">' + (k.photo(i) || '<span class="sl-ph" aria-hidden="true" style="--a:' + g[i % 3][0] + ";--b:" + g[i % 3][1] + '"></span>') + "<div><small>No. " + String(i + 1).padStart(2, "0") + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="sl-com" id="services"><h2>Prints and commissions</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="sl-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sl-end" id="contact"><h2>Slow down with me.</h2>' + k.cta("Enquire") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

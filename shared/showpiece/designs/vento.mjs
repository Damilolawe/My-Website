export default {
  id: "md-lamborghini",
  root: "vg",
  fonts: "family=Orbitron:wght@600;900&family=Titillium+Web:wght@400;600;700",
  labels: { work: "Builds", services: "Services", about: "Garage", contact: "Book a slot" },
  demo: {
    name: "Vento Garage", headline: "Made to be driven.", heroLabel: "Performance car detailing and tuning",
    bio: "Paint correction, ceramic coatings and track-day setup for cars that deserve it. Every car is booked in for a full day, inspected under daylight lamps, and handed back with a report.",
    cards: [
      { title: "Matte black, restored", description: "Three days of hand correction on a matte wrap that others refused." },
      { title: "Track-day setup", description: "Alignment, brakes and tyre pressures tuned for a club race weekend." },
      { title: "Concours finish", description: "A classic coupe prepared for a show lawn, and it won." },
    ],
    services: [
      { title: "Detail", description: "Wash, decontaminate and protect. One full day." },
      { title: "Ceramic coat", description: "Five years of gloss with a yearly check." },
      { title: "Track setup", description: "Geometry, brakes and a data session." },
    ],
  },
  css: `
.vg{--black:#0b0b0c;--carbon:#161618;--acid:#c6ff00;--orange:#ff6a13;--white:#f3f3f3;--mute:#8a8a90;background:var(--black);color:var(--white);font:400 17px/1.65 "Titillium Web",system-ui,sans-serif}
.vg header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.vg .brand{font:900 20px/1 Orbitron;letter-spacing:.14em;text-transform:uppercase;text-decoration:none}
.vg nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:14px}.vg nav a{text-decoration:none;color:var(--mute)}.vg nav a:hover,.vg nav a[aria-current]{color:var(--acid)}
.vg-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:end;padding:60px clamp(18px,4vw,56px) clamp(50px,7vw,90px);overflow:hidden;isolation:isolate;background:radial-gradient(70% 60% at 70% 40%,#1e2010,transparent 70%),var(--black)}
.vg-lines{position:absolute;inset:0;z-index:-1;overflow:hidden}
.vg-lines i{position:absolute;left:0;top:var(--y);width:40%;height:2px;background:linear-gradient(90deg,transparent,var(--c));animation:vg-zip var(--t) linear infinite;animation-delay:var(--d)}
@keyframes vg-zip{from{transform:translateX(-100%)}to{transform:translateX(300%)}}
.vg-hex{position:absolute;right:-6%;top:6%;width:min(62vw,820px);aspect-ratio:1.15;z-index:-1;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);background:linear-gradient(135deg,#1b1c1f,#0f0f11);box-shadow:inset 0 0 0 2px var(--acid)}
.vg-hex:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(60deg,transparent 0 30px,rgba(198,255,0,.06) 30px 32px)}
.vg-hex:after{content:"";position:absolute;inset:0;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);border:3px solid var(--acid);background:conic-gradient(from 0deg,transparent 0 80%,rgba(198,255,0,.5) 90%,transparent);animation:vg-spin 4s linear infinite;-webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);-webkit-mask-composite:xor;mask-composite:exclude;padding:3px}
@keyframes vg-spin{to{transform:rotate(360deg)}}
.vg-label{font:600 13px Orbitron;letter-spacing:.24em;text-transform:uppercase;color:var(--acid)}
.vg h1{margin-top:16px;font:900 clamp(48px,8.4vw,150px)/.92 Orbitron;text-transform:uppercase;letter-spacing:-.01em;font-style:italic}
.vg h1 .ch{display:inline-block;animation:vg-in .5s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes vg-in{from{opacity:0;transform:translateX(-1.5em) skewX(-30deg)}}
.vg-row{display:flex;flex-wrap:wrap;gap:30px;align-items:end;justify-content:space-between;margin-top:26px}
.vg-hero p{max-width:46ch;color:#c4c4c8}
.vg .cta{display:inline-flex;padding:16px 34px;background:var(--acid);color:var(--black);font:900 14px Orbitron;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;clip-path:polygon(12px 0,100% 0,calc(100% - 12px) 100%,0 100%);transition:background .2s}.vg .cta:hover{background:var(--orange)}.vg .cta-muted{background:var(--carbon);color:var(--mute);font:400 14px "Titillium Web";letter-spacing:0;text-transform:none}
.vg h2{font:900 clamp(38px,5.4vw,88px)/.95 Orbitron;text-transform:uppercase;font-style:italic;max-width:14ch}
.vg-builds{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.vg-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:clamp(40px,6vw,70px)}
.vg-b{position:relative;padding:26px;background:var(--carbon);clip-path:polygon(0 0,calc(100% - 30px) 0,100% 30px,100% 100%,30px 100%,0 calc(100% - 30px));transition:background .3s}.vg-b:hover{background:#1f2112}
.vg-b small{font:600 12px Orbitron;letter-spacing:.2em;color:var(--acid)}
.vg-b img{width:100%;aspect-ratio:16/10;object-fit:cover;margin:14px 0}
.vg-b h3{margin-top:10px;font:700 24px/1.15 "Titillium Web";text-transform:uppercase}.vg-b p{margin-top:8px;color:#a5a5ab}
.vg-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.vg-svc ul{margin-top:clamp(36px,5vw,56px)}
.vg-svc li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:24px;padding:26px 0;border-top:1px solid #2a2a2e;transition:padding .3s}.vg-svc li:hover{padding-left:20px;border-color:var(--acid)}
.vg-svc h3{font:900 24px Orbitron;text-transform:uppercase;font-style:italic}.vg-svc p{color:#c4c4c8}
.vg-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--acid);color:var(--black);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.vg-about>p{font-size:clamp(19px,1.8vw,24px)}.vg-about dl{grid-column:2;margin:0}.vg-about dt{font:900 16px Orbitron;text-transform:uppercase;margin-top:16px}.vg-about dd{margin:2px 0 0}
.vg-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.vg-end h2{margin:0 auto 30px}
.vg footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;color:var(--mute);border-top:1px solid #222}
@media(max-width:900px){.vg nav{gap:12px;font-size:12px}.vg-list,.vg-about,.vg-svc li{grid-template-columns:1fr}.vg-about dl{grid-column:auto}.vg-hex{width:110vw;right:-40%}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const l = Array.from({ length: 12 }, (_, i) => '<i style="--y:' + (8 + i * 7.5) + "%;--t:" + (1.2 + (i % 4) * 0.5) + "s;--d:-" + (i * 0.37).toFixed(2) + "s;--c:" + (i % 3 ? "var(--acid)" : "var(--orange)") + '"></i>').join(""); return '<section class="vg-hero" aria-labelledby="h"><div class="vg-lines" aria-hidden="true">' + l + '</div><span class="vg-hex" aria-hidden="true"></span><span class="vg-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="vg-row"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Book a slot") + "</div></section>"; },
  work: (k) => '<section class="vg-builds" id="work"><h2>Recent builds</h2><div class="vg-list">' + k.c.cards.map((x, i) => '<article class="vg-b"><small>Build ' + String(i + 1).padStart(2, "0") + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="vg-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="vg-about" id="about"><h2>One car a day</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="vg-end" id="contact"><h2>Bring it in.</h2>' + k.cta("Book a slot") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "neomemphis",
  root: "nm",
  fonts: "family=Lilita+One&family=Poppins:wght@400;600;700",
  labels: { work: "Projects", services: "Services", about: "About", contact: "Say hi" },
  demo: {
    name: "Benny Okafor", headline: "Shapes, but make it useful.", heroLabel: "Product and toy designer",
    bio: "I design playful objects that people actually use: stools, lamps, building blocks and the occasional teapot. Bright colours, honest materials and nothing too serious.",
    cards: [
      { title: "Stack stool", description: "Three shapes, one stool, no tools. Sold out twice." },
      { title: "Squiggle lamp", description: "A bent tube light that looks drawn in the air." },
      { title: "Block party", description: "A set of 40 wooden blocks for children and grown-ups." },
    ],
    services: [
      { title: "Product design", description: "From sketch to factory sample." },
      { title: "Toys and games", description: "Safe, sturdy and fun to hold." },
      { title: "Window displays", description: "Shop windows people stop for." },
    ],
  },
  css: `
.nm{--white:#fffdf8;--red:#ff3b3b;--blue:#1d4dff;--yellow:#ffd400;--pink:#ff8fc8;--mint:#2fd6a6;--ink:#121212;background:var(--white);color:var(--ink);font:400 17px/1.7 Poppins,system-ui,sans-serif}
.nm header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:4px solid var(--ink)}
.nm .brand{font:400 26px/1 "Lilita One";text-decoration:none}
.nm nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.nm nav a{text-decoration:none}.nm nav a:hover{color:var(--red)}
.nm-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:center;padding:60px clamp(18px,4vw,56px);background:radial-gradient(circle,var(--ink) 1.5px,transparent 2px) 0 0/24px 24px,var(--white);overflow:hidden;isolation:isolate}
.nm-sh{position:absolute;left:var(--x);top:var(--y);z-index:-1;animation:nm-float var(--t) ease-in-out infinite alternate;animation-delay:var(--d)}
@keyframes nm-float{to{transform:translate(18px,-22px) rotate(var(--r))}}
.nm-sh>span{display:block}
.nm-circle{width:var(--s);aspect-ratio:1;border-radius:50%;background:var(--c);border:4px solid var(--ink)}
.nm-tri{width:0;height:0;border-left:calc(var(--s) / 2) solid transparent;border-right:calc(var(--s) / 2) solid transparent;border-bottom:var(--s) solid var(--c);filter:drop-shadow(4px 4px 0 var(--ink))}
.nm-stripe{width:var(--s);height:calc(var(--s) * .5);background:repeating-linear-gradient(45deg,var(--c) 0 8px,transparent 8px 16px);border:4px solid var(--ink)}
.nm-zig{width:var(--s);height:30px;background:linear-gradient(135deg,var(--c) 25%,transparent 25%) -15px 0/30px 30px,linear-gradient(225deg,var(--c) 25%,transparent 25%) -15px 0/30px 30px}
.nm-squig{position:absolute;left:4%;bottom:10%;width:min(50vw,560px);z-index:-1}
.nm-squig path{fill:none;stroke:var(--blue);stroke-width:12;stroke-linecap:round;stroke-dasharray:1200;stroke-dashoffset:1200;animation:nm-draw 2.6s ease .4s forwards}
@keyframes nm-draw{to{stroke-dashoffset:0}}
.nm-label{display:inline-block;width:max-content;padding:6px 14px;background:var(--yellow);border:3px solid var(--ink);font-weight:700;transform:rotate(-3deg)}
.nm h1{margin-top:20px;max-width:12ch;font:400 clamp(60px,9.4vw,160px)/.92 "Lilita One";letter-spacing:-.01em;text-shadow:5px 5px 0 var(--pink)}
.nm h1 .ch{display:inline-block;animation:nm-in .6s cubic-bezier(.3,2,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes nm-in{from{opacity:0;transform:rotate(-30deg) scale(.3)}}
.nm-hero p{margin-top:22px;max-width:44ch;padding:16px 18px;background:var(--white);border:3px solid var(--ink);box-shadow:6px 6px 0 var(--mint)}
.nm .cta{display:inline-flex;width:max-content;margin-top:26px;padding:15px 28px;background:var(--red);color:var(--white);font:400 22px "Lilita One";text-decoration:none;border:3px solid var(--ink);box-shadow:6px 6px 0 var(--ink);transition:transform .15s,box-shadow .15s}.nm .cta:hover{transform:translate(6px,6px);box-shadow:0 0 0 var(--ink)}.nm .cta-muted{background:var(--white);color:#555;font:600 15px Poppins;box-shadow:none}
.nm h2{font:400 clamp(46px,6.6vw,108px)/.95 "Lilita One";max-width:14ch}
.nm-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--blue);color:var(--white)}
.nm-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px)}
.nm-p{padding:24px;background:var(--white);color:var(--ink);border:4px solid var(--ink);box-shadow:10px 10px 0 var(--c);transform:rotate(var(--r));transition:transform .3s}.nm-p:hover{transform:rotate(0) translateY(-6px)}
.nm-obj{display:block;height:170px;margin-bottom:18px;background:var(--g);border:3px solid var(--ink)}
.nm-p img{width:100%;aspect-ratio:4/3;object-fit:cover;border:3px solid var(--ink);margin-bottom:18px}
.nm-p h3{font:400 28px/1.1 "Lilita One"}.nm-p p{margin-top:6px}
.nm-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.nm-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(36px,5vw,56px)}
.nm-svc li{padding:30px;border:4px solid var(--ink);border-radius:var(--br);background:var(--c)}
.nm-svc h3{font:400 28px "Lilita One"}.nm-svc p{margin-top:6px}
.nm-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px);border-block:4px solid var(--ink)}.nm-about>p{font-size:clamp(19px,1.8vw,24px)}.nm-about dl{grid-column:2;margin:0}.nm-about dt{font:400 22px "Lilita One";margin-top:16px}.nm-about dd{margin:2px 0 0}
.nm-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle,var(--ink) 1.5px,transparent 2px) 0 0/24px 24px}.nm-end h2{margin:0 auto;display:inline-block;padding:20px 30px;background:var(--pink);border:4px solid var(--ink)}.nm-end .cta{display:flex;margin:30px auto 0}
.nm footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:700;background:var(--ink);color:var(--white)}
@media(max-width:900px){.nm nav{gap:12px;font-size:14px}.nm-list,.nm-svc ul,.nm-about{grid-template-columns:1fr}.nm-about dl{grid-column:auto}.nm-sh{opacity:.5}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const S = [["nm-circle", "70%", "12%", "140px", "var(--yellow)", "6s", "0s", "20deg"], ["nm-tri", "84%", "52%", "110px", "var(--red)", "5s", "-1s", "-30deg"], ["nm-stripe", "62%", "64%", "160px", "var(--blue)", "7s", "-2s", "10deg"], ["nm-zig", "56%", "30%", "180px", "var(--mint)", "4s", "-.5s", "-8deg"], ["nm-circle", "90%", "20%", "60px", "var(--pink)", "5s", "-3s", "0deg"]]; return '<section class="nm-hero" aria-labelledby="h">' + S.map(s => '<span class="nm-sh" aria-hidden="true" style="--x:' + s[1] + ";--y:" + s[2] + ";--t:" + s[5] + ";--d:" + s[6] + ";--r:" + s[7] + '"><span class="' + s[0] + '" style="--s:' + s[3] + ";--c:" + s[4] + '"></span></span>').join("") + '<svg class="nm-squig" aria-hidden="true" viewBox="0 0 600 120"><path d="M10 60 C60 0 110 120 160 60 S260 0 310 60 S410 120 460 60 S560 0 590 60"/></svg><span class="nm-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Say hi") + "</section>"; },
  work: (k) => { const c = ["var(--red)", "var(--yellow)", "var(--mint)"], r = ["-2deg", "1.5deg", "-1deg"], g = ["linear-gradient(var(--red) 0 33%,var(--yellow) 33% 66%,var(--blue) 66%)", "radial-gradient(circle at 50% 60%,var(--yellow) 0 22%,transparent 23%),repeating-linear-gradient(90deg,var(--pink) 0 20px,#fff 20px 40px)", "conic-gradient(var(--red) 0 25%,var(--blue) 0 50%,var(--yellow) 0 75%,var(--mint) 0)"]; return '<section class="nm-proj" id="work"><h2>Things I made</h2><div class="nm-list">' + k.c.cards.map((x, i) => '<article class="nm-p" style="--c:' + c[i % 3] + ";--r:" + r[i % 3] + '">' + (k.photo(i) || '<span class="nm-obj" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => { const c = ["var(--pink)", "var(--mint)", "var(--yellow)"], b = ["50% 50% 20px 20px", "20px", "20px 80px 20px 80px"]; return '<section class="nm-svc" id="services"><h2>What I do</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li style="--c:' + c[i % 3] + ";--br:" + b[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="nm-about" id="about"><h2>About me</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="nm-end" id="contact"><h2>Let us make something fun.</h2>' + k.cta("Say hi") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

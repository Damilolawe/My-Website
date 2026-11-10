export default {
  id: "risograph",
  root: "rs",
  fonts: "family=Chango&family=Overpass+Mono:wght@400;600",
  labels: { work: "Prints", services: "Services", about: "About", contact: "Say hello" },
  demo: {
    name: "Penny Dot", headline: "Made to leave a mark.", heroLabel: "Illustrator and zine maker",
    bio: "I draw loud pictures and print them in two colours on a secondhand risograph in my spare room. Posters, zines and album art, slightly off-register on purpose.",
    cards: [
      { title: "Night bus zine", description: "Twenty pages of drawings from the last bus home. Third printing." },
      { title: "Gig poster series", description: "Twelve posters for a small venue, one a month." },
      { title: "Album art, pink and black", description: "A cover and inner sleeve for a garage-pop record." },
    ],
    services: [
      { title: "Illustration", description: "Editorial, posters and album art." },
      { title: "Riso printing", description: "Short runs for artists and bands." },
      { title: "Zine workshops", description: "Fold, draw, print in an afternoon." },
    ],
  },
  css: `
.rs{--cream:#f6efe0;--pink:#ff48b0;--blue:#0078bf;--ink:#1b1b1b;--mute:#6d6659;background:var(--cream);color:var(--ink);font:400 16px/1.7 "Overpass Mono",ui-monospace,monospace}
.rs header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:2px solid var(--ink)}
.rs .brand{position:relative;font:400 20px/1 Chango;text-decoration:none;text-shadow:3px 2px 0 var(--pink)}
.rs nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.rs nav a{text-decoration:none}.rs nav a:hover{color:var(--pink)}
.rs-hero{position:relative;padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden;isolation:isolate}
.rs-hero:after{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(circle,rgba(0,0,0,.07) 1px,transparent 1.5px) 0 0/5px 5px,radial-gradient(circle,rgba(0,0,0,.05) 1px,transparent 1.5px) 2px 3px/7px 7px;mix-blend-mode:multiply}
.rs-label{display:inline-block;padding:4px 10px;background:var(--pink);color:var(--cream);font-weight:600;font-size:13px;text-transform:uppercase;mix-blend-mode:multiply}
.rs h1{position:relative;margin-top:18px;max-width:11ch;font:400 clamp(60px,10vw,170px)/.92 Chango;color:var(--ink)}
.rs h1:before{content:attr(data-t) / "";position:absolute;inset:0;color:var(--pink);mix-blend-mode:multiply;transform:translate(6px,4px);animation:rs-reg 4s ease-in-out infinite alternate;z-index:-1}
@keyframes rs-reg{0%{transform:translate(6px,4px)}50%{transform:translate(-3px,6px)}100%{transform:translate(4px,-2px)}}
.rs h1 .ch{animation:rs-in .4s steps(2) both;animation-delay:calc(var(--i) * 30ms)}@keyframes rs-in{from{opacity:0}}
.rs-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,60px);align-items:end;margin-top:clamp(24px,3vw,40px)}
.rs-grid p{max-width:46ch}
.rs .cta{display:inline-flex;margin-top:22px;padding:14px 24px;background:var(--blue);color:var(--cream);font:400 16px Chango;text-decoration:none;box-shadow:5px 4px 0 var(--pink);mix-blend-mode:multiply;transition:box-shadow .2s}.rs .cta:hover{box-shadow:-5px -4px 0 var(--pink)}.rs .cta-muted{background:transparent;color:var(--mute);border:2px dashed var(--mute);box-shadow:none;font:600 14px "Overpass Mono"}
.rs-print{position:relative;aspect-ratio:1.2}
.rs-layer{position:absolute;inset:0;mix-blend-mode:multiply}
.rs-layer.p{animation:rs-shift 5s ease-in-out infinite alternate}
@keyframes rs-shift{to{transform:translate(8px,-5px) rotate(.6deg)}}
.rs-sun{position:absolute;left:52%;top:8%;width:36%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,var(--c) 40%,transparent 41%) 0 0/9px 9px}
.rs-hill{position:absolute;left:0;right:0;bottom:0;height:46%;border-radius:60% 40% 0 0;background:var(--c)}
.rs-hill2{position:absolute;left:30%;right:-10%;bottom:0;height:34%;border-radius:50% 50% 0 0;background:repeating-linear-gradient(45deg,var(--c) 0 3px,transparent 3px 7px)}
.rs-bird{position:absolute;left:var(--x);top:var(--y);width:34px;height:14px;border-top:4px solid var(--c);border-radius:50% 50% 0 0;animation:rs-fly 3s ease-in-out infinite alternate}
.rs-bird:after{content:"";position:absolute;left:100%;top:-4px;width:34px;height:14px;border-top:4px solid var(--c);border-radius:50% 50% 0 0}
@keyframes rs-fly{to{transform:translate(20px,-10px)}}
.rs-cap{position:absolute;left:8px;top:8px;padding:2px 8px;background:var(--cream);font-size:11px;font-weight:600;z-index:2}
.rs h2{position:relative;font:400 clamp(42px,6vw,98px)/.95 Chango;max-width:14ch;text-shadow:5px 3px 0 rgba(255,72,176,.7)}
.rs-prints{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--pink);color:var(--ink)}
.rs-prints h2{text-shadow:5px 3px 0 rgba(0,120,191,.7)}
.rs-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.rs-p{padding:16px;background:var(--cream);transform:rotate(var(--r));box-shadow:0 14px 24px -14px rgba(0,0,0,.4)}
.rs-art{display:block;aspect-ratio:.8;background:radial-gradient(circle,var(--blue) 35%,transparent 36%) 0 0/8px 8px,radial-gradient(circle at 60% 40%,var(--pink) 0 30%,transparent 31%),var(--cream);mix-blend-mode:multiply;position:relative}
.rs-art:after{content:"";position:absolute;inset:18% 28%;border-radius:50% 50% 10% 10%;background:var(--blue);mix-blend-mode:multiply;transform:translate(var(--o),2px)}
.rs-p img{width:100%;aspect-ratio:.8;object-fit:cover;filter:grayscale(1) contrast(1.4);mix-blend-mode:multiply}
.rs-p h3{margin-top:14px;font:400 20px/1.15 Chango}.rs-p p{margin-top:6px;font-size:14px}
.rs-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.rs-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.rs-svc li{padding:26px;border:3px solid var(--blue);box-shadow:6px 5px 0 var(--pink)}
.rs-svc h3{font:400 20px Chango;color:var(--blue)}.rs-svc p{margin-top:6px}
.rs-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--blue);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.rs-about h2{text-shadow:5px 3px 0 var(--pink)}.rs-about>p{font-size:clamp(18px,1.6vw,21px)}.rs-about dl{grid-column:2;margin:0}.rs-about dt{font-weight:600;text-transform:uppercase;color:var(--pink);margin-top:16px}.rs-about dd{margin:2px 0 0}
.rs-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.rs-end h2{margin:0 auto}
.rs footer{display:flex;justify-content:space-between;padding:20px clamp(18px,4vw,56px);font-size:13px;border-top:2px solid var(--ink)}
@media(max-width:900px){.rs nav{gap:12px;font-size:13px}.rs-grid,.rs-list,.rs-svc ul,.rs-about{grid-template-columns:1fr}.rs-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="rs-hero" aria-labelledby="h"><span class="rs-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h" data-t="' + k.E(k.c.headline) + '">' + k.letters(k.c.headline) + '</h1><div class="rs-grid"><div><p>' + k.E(k.c.bio) + "</p>" + k.cta("Say hello") + '</div><div class="rs-print" aria-hidden="true"><span class="rs-cap">2 colour riso, A3</span><div class="rs-layer b" style="--c:var(--blue)"><span class="rs-hill" style="--c:var(--blue)"></span><span class="rs-bird" style="--x:20%;--y:20%;--c:var(--blue)"></span></div><div class="rs-layer p"><span class="rs-sun" style="--c:var(--pink)"></span><span class="rs-hill2" style="--c:var(--pink)"></span><span class="rs-bird" style="--x:34%;--y:34%;--c:var(--pink)"></span></div></div></div></section>',
  work: (k) => { const r = ["-2deg", "1.5deg", "-1deg"], o = ["4px", "-5px", "6px"]; return '<section class="rs-prints" id="work"><h2>Fresh prints</h2><div class="rs-list">' + k.c.cards.map((x, i) => '<article class="rs-p" style="--r:' + r[i % 3] + ";--o:" + o[i % 3] + '">' + (k.photo(i) || '<span class="rs-art" aria-hidden="true"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="rs-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="rs-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="rs-end" id="contact"><h2>Let us print something loud.</h2>' + k.cta("Say hello") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

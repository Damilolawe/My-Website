export default {
  id: "md-framer",
  root: "fs",
  fonts: "family=Darker+Grotesque:wght@500;800;900&family=Figtree:wght@400;600",
  labels: { work: "Showcase", services: "Pricing", about: "About", contact: "Start designing" },
  intros: {
    work: { title: "Made with Form Studio", text: "Sites designed on the canvas and published the same afternoon." },
    features: { title: "Pricing", text: "Design for free. Pay when you put a site on your own domain." },
    studio: { title: "About us", text: null },
    contact: { title: "Start designing", text: "Open a blank canvas or start from a layout. No code needed." },
  },
  demo: {
    name: "Form Studio", headline: "Draw it. Publish it.", heroLabel: "Website design, straight from the canvas",
    bio: "Lay out your site like a poster: drag, resize, animate. When it looks right, press publish and it is live, fast and responsive.",
    cards: [
      { title: "A portfolio in a weekend", description: "An illustrator laid out forty pieces and launched on Sunday night." },
      { title: "Launch page, same day", description: "A product team designed, reviewed and shipped before the press release." },
      { title: "Menus that move", description: "A café added scroll animations without writing a line of code." },
    ],
    services: [
      { title: "Free", description: "Unlimited canvases, a free subdomain." },
      { title: "Site", description: "Your own domain, forms and analytics." },
      { title: "Studio", description: "Client billing, staging and team roles." },
    ],
  },
  css: `
.fs{--white:#fff;--canvas:#f2f2f0;--ink:#111;--blue:#0a84ff;--pink:#ff4fa3;--lime:#c6f432;--grey:#8e8e8a;background:var(--white);color:var(--ink);font:400 17px/1.6 Figtree,system-ui,sans-serif}
.fs header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px)}
.fs .brand{font:900 26px/1 "Darker Grotesque";letter-spacing:-.02em;text-decoration:none;display:flex;align-items:center;gap:10px}.fs .brand:before{content:"";width:22px;height:22px;background:var(--ink);clip-path:polygon(0 0,100% 0,100% 50%,50% 50%,100% 100%,0 100%,0 50%)}
.fs nav{display:flex;gap:6px}.fs nav a{padding:8px 14px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px}.fs nav a:hover,.fs nav a[aria-current]{background:var(--canvas);text-decoration:none}
.fs-hero{position:relative;margin:0 clamp(10px,2vw,24px);padding:clamp(70px,10vw,140px) clamp(18px,4vw,56px);border-radius:24px;background:var(--canvas);background-image:radial-gradient(#c9c9c5 1px,transparent 1px);background-size:22px 22px;overflow:hidden;text-align:center}
.fs-sel{position:relative;display:inline-block;padding:10px 20px}
.fs-sel:before{content:"";position:absolute;inset:0;border:1.5px solid var(--blue);animation:fs-resize 6s cubic-bezier(.6,0,.3,1) infinite}
.fs-sel i{position:absolute;width:12px;height:12px;background:#fff;border:1.5px solid var(--blue);animation:fs-resize 6s cubic-bezier(.6,0,.3,1) infinite}
.fs-sel i:nth-child(1){left:-6px;top:-6px}.fs-sel i:nth-child(2){right:-6px;top:-6px}.fs-sel i:nth-child(3){left:-6px;bottom:-6px}.fs-sel i:nth-child(4){right:-6px;bottom:-6px}
.fs-size{position:absolute;left:50%;bottom:-34px;translate:-50% 0;padding:3px 9px;border-radius:5px;background:var(--blue);color:#fff;font:600 12px Figtree;white-space:nowrap}
@keyframes fs-resize{0%,30%,100%{transform:none}45%,75%{transform:scaleX(1.04) scaleY(1.08)}}
.fs h1{font:900 clamp(70px,12vw,210px)/.8 "Darker Grotesque";letter-spacing:-.04em}
.fs h1 .ch{animation:fs-drop .7s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 40ms)}@keyframes fs-drop{from{opacity:0;transform:translateY(-.5em) rotate(8deg)}}
.fs-hero p{max-width:46ch;margin:56px auto 0;font-size:clamp(18px,1.6vw,21px);color:#4a4a47}
.fs .cta{display:inline-flex;margin-top:28px;padding:15px 26px;border-radius:10px;background:var(--blue);color:#fff;font-weight:600;text-decoration:none;transition:transform .2s}.fs .cta:hover{transform:translateY(-2px)}.fs .cta-muted{background:#fff;color:var(--ink)}
.fs-cursor{position:absolute;display:flex;align-items:flex-start;gap:4px;pointer-events:none}
.fs-cursor svg{width:20px;height:20px}
.fs-cursor b{padding:3px 9px;border-radius:999px;font:600 12px Figtree;color:#fff;white-space:nowrap}
.fs-c1{left:12%;top:24%;animation:fs-c1 8s ease-in-out infinite}.fs-c1 svg{fill:var(--pink)}.fs-c1 b{background:var(--pink)}
.fs-c2{right:10%;top:62%;animation:fs-c2 7s ease-in-out infinite}.fs-c2 svg{fill:#7a5cff}.fs-c2 b{background:#7a5cff}
@keyframes fs-c1{0%,100%{transform:none}30%{transform:translate(120px,40px)}60%{transform:translate(60px,140px)}}
@keyframes fs-c2{0%,100%{transform:none}40%{transform:translate(-140px,-60px)}70%{transform:translate(-40px,-120px)}}
.fs-intro{margin:0 clamp(10px,2vw,24px);padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:24px;background:var(--canvas);background-image:radial-gradient(#c9c9c5 1px,transparent 1px);background-size:22px 22px}.fs-intro h1{font-size:clamp(60px,9vw,150px)}.fs-intro p{margin-top:20px;max-width:46ch;color:#4a4a47}
.fs h2{font:900 clamp(48px,7vw,110px)/.85 "Darker Grotesque";letter-spacing:-.035em;max-width:13ch}
.fs-show{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fs-frames{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.fs-frame span{display:block;font:600 13px Figtree;color:var(--grey);margin-bottom:8px}
.fs-board{position:relative;aspect-ratio:3/4;border-radius:6px;overflow:hidden;background:var(--c,var(--lime));transition:transform .4s,box-shadow .4s}.fs-frame:hover .fs-board{transform:translateY(-6px);box-shadow:0 0 0 2px var(--blue)}
.fs-frame:nth-child(2) .fs-board{--c:#ffd8ea}.fs-frame:nth-child(3) .fs-board{--c:#d8e8ff}
.fs-board img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fs-board:before{content:"";position:absolute;left:10%;right:10%;top:10%;height:44%;border-radius:4px;background:var(--ink);opacity:.9}
.fs-board:after{content:"";position:absolute;left:10%;bottom:12%;width:60%;height:24%;background:repeating-linear-gradient(var(--ink) 0 10px,transparent 10px 22px)}
.fs-board:has(img):before,.fs-board:has(img):after{display:none}
.fs-frame h3{margin-top:16px;font:800 30px/1 "Darker Grotesque"}.fs-frame p{margin-top:6px;color:#55554f}
.fs-price{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.fs-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.fs-price li{padding:28px;border-radius:18px;background:var(--canvas)}.fs-price li:nth-child(2){background:var(--ink);color:#fff}
.fs-price h3{font:900 34px/1 "Darker Grotesque"}.fs-price p{margin-top:10px}
.fs-about{margin:0 clamp(10px,2vw,24px) clamp(60px,8vw,100px);padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:24px;background:var(--lime);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.fs-about>p{font-size:clamp(19px,1.8vw,24px)}.fs-about dl{grid-column:2;margin:0}.fs-about dt{font:800 26px "Darker Grotesque";margin-top:16px}.fs-about dd{margin:2px 0 0}
.fs-end{margin:0 clamp(10px,2vw,24px) 20px;padding:clamp(80px,11vw,160px) clamp(18px,4vw,56px);border-radius:24px;background:var(--ink);color:#fff;text-align:center}.fs-end h2{margin:0 auto}
.fs footer{display:flex;justify-content:space-between;padding:10px clamp(18px,4vw,56px) 26px;font-size:14px;color:var(--grey)}
@media(max-width:900px){.fs nav{gap:0}.fs nav a{padding:6px 8px;font-size:13px}.fs-frames,.fs-price ul,.fs-about{grid-template-columns:1fr}.fs-about dl{grid-column:auto}.fs-cursor{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const cur = (c, n) => '<span class="fs-cursor ' + c + '" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M2 2l6 16 2.5-6.5L17 9z"/></svg><b>' + n + "</b></span>"; return '<section class="fs-hero" aria-labelledby="h">' + cur("fs-c1", "Maya") + cur("fs-c2", "Jon") + '<h1 id="h" class="fs-sel"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i>' + k.letters(k.c.headline) + '<span class="fs-size" aria-hidden="true">Heading, 1240 x 380</span></h1><p>' + k.E(k.c.bio) + "</p>" + k.cta("Start designing") + "</section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="fs-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="fs-show" id="work"><h2>' + k.h("work", "Designed here, live today") + '</h2><div class="fs-frames">' + k.c.cards.map((x, i) => '<article class="fs-frame"><span>Frame ' + (i + 1) + '</span><div class="fs-board">' + k.photo(i) + "</div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="fs-price" id="services"><h2>' + k.h("services", "Pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fs-about" id="about"><h2>' + k.h("about", "Design should feel like drawing") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fs-end" id="contact"><h2>' + k.h("contact", "Your blank canvas is ready.") + '</h2>' + k.cta("Start designing") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

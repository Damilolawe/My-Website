export default {
  id: "md-replicate",
  root: "sb",
  fonts: "family=Bungee&family=Kanit:wght@400;500;700",
  labels: { work: "Events", services: "Packages", about: "About", contact: "Book the booth" },
  demo: {
    name: "Snap Booth", headline: "Strike a pose.", heroLabel: "Photo booth hire for parties and weddings",
    bio: "A vintage-style photo booth with a velvet curtain, a box of silly hats and prints in eight seconds. We set it up, run it all night, and send every photo the next morning.",
    cards: [
      { title: "A garden wedding", description: "412 strips printed, one for every guest and a guestbook full of copies." },
      { title: "A fiftieth birthday", description: "Disco theme, sequinned hats and a grandmother who would not leave the booth." },
      { title: "An office summer party", description: "Branded strips and a slideshow on the big screen all evening." },
    ],
    services: [
      { title: "Classic", description: "Three hours, unlimited prints, props box." },
      { title: "Wedding", description: "Five hours, guestbook and custom strip design." },
      { title: "All night", description: "Until the last song, with a host." },
    ],
  },
  css: `
.sb{--red:#d7263d;--velvet:#7a0f1f;--gold:#f2c14e;--black:#121212;--paper:#fbf7ef;--teal:#1b998b;background:var(--paper);color:var(--black);font:400 17px/1.7 Kanit,system-ui,sans-serif}
.sb header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--black);color:var(--gold)}
.sb .brand{font:400 22px/1 Bungee;text-decoration:none}
.sb nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;color:var(--paper)}.sb nav a{text-decoration:none}.sb nav a:hover{color:var(--gold)}
.sb-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:repeating-linear-gradient(90deg,var(--velvet) 0 34px,#8d1426 34px 50px,var(--velvet) 50px 70px);color:var(--paper);overflow:hidden;isolation:isolate}
.sb-hero:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(0,0,0,.5),transparent 60%)}
.sb-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;animation:sb-flash 4s ease-out 1.5s infinite}
@keyframes sb-flash{0%,2%{opacity:0}4%{opacity:.85}14%,100%{opacity:0}}
.sb-label{font:400 14px Bungee;color:var(--gold)}
.sb h1{margin-top:14px;font:400 clamp(56px,8.6vw,146px)/.95 Bungee;letter-spacing:-.01em;text-shadow:5px 5px 0 var(--black)}
.sb h1 .ch{display:inline-block;animation:sb-in .5s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 40ms)}@keyframes sb-in{from{opacity:0;transform:scale(2.2)}}
.sb-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px);color:#f3dfe2}
.sb .cta{display:inline-flex;margin-top:28px;padding:16px 28px;background:var(--gold);color:var(--black);font:400 16px Bungee;text-decoration:none;box-shadow:5px 5px 0 var(--black);transition:transform .15s,box-shadow .15s}.sb .cta:hover{transform:translate(3px,3px);box-shadow:2px 2px 0 var(--black)}.sb .cta-muted{background:rgba(255,255,255,.15);color:#f3dfe2;font:400 15px Kanit}
.sb-slot{position:relative;justify-self:center;width:min(100%,250px);height:clamp(440px,40vw,540px);padding-top:16px}
.sb-slot:before{content:"";position:absolute;left:-10%;right:-10%;top:0;height:18px;border-radius:9px;background:var(--black);z-index:2}
.sb-strip{position:relative;display:grid;gap:10px;padding:14px 14px 40px;background:#fff;box-shadow:0 30px 40px -24px rgba(0,0,0,.6);transform:rotate(-3deg);animation:sb-print 2.4s steps(12) .6s both}
@keyframes sb-print{from{clip-path:inset(0 0 100% 0);transform:rotate(-3deg) translateY(-30px)}to{clip-path:inset(0 0 0 0)}}
.sb-strip span{aspect-ratio:4/3;position:relative;overflow:hidden;background:var(--bg);animation:sb-dev 3s ease both;animation-delay:var(--d)}
@keyframes sb-dev{from{filter:brightness(2.4) saturate(0)}}
.sb-strip span:before{content:"";position:absolute;left:50%;bottom:-18%;width:50%;aspect-ratio:1;margin-left:-25%;border-radius:50% 50% 0 0;background:var(--fg)}
.sb-strip span:after{content:"";position:absolute;left:50%;top:20%;width:28%;aspect-ratio:1;margin-left:-14%;border-radius:50%;background:var(--fg);box-shadow:0 -14px 0 -6px var(--hat)}
.sb-strip small{position:absolute;left:0;right:0;bottom:10px;text-align:center;font:400 12px Bungee;color:var(--red)}
.sb h2{font:400 clamp(38px,5.4vw,88px)/1 Bungee;max-width:14ch}
.sb-events{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sb-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:clamp(40px,6vw,70px)}
.sb-pol{padding:14px 14px 22px;background:#fff;box-shadow:0 20px 30px -20px rgba(0,0,0,.4);transform:rotate(var(--r));transition:transform .3s}.sb-pol:hover{transform:rotate(0) scale(1.03)}
.sb-pol:before{content:"";display:block;aspect-ratio:1;margin-bottom:14px;background:var(--c)}
.sb-pol:has(img):before{display:none}
.sb-pol img{width:100%;aspect-ratio:1;object-fit:cover;margin-bottom:14px}
.sb-pol h3{font:400 18px/1.25 Bungee}.sb-pol p{margin-top:6px;color:#555}
.sb-pack{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--black);color:var(--paper)}
.sb-pack ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.sb-pack li{padding:30px;border:2px dashed var(--gold);position:relative}.sb-pack li:nth-child(2){background:var(--red);border-style:solid}
.sb-pack h3{font:400 22px Bungee;color:var(--gold)}.sb-pack p{margin-top:8px}
.sb-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--gold);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sb-about>p{font-size:clamp(19px,1.8vw,24px)}.sb-about dl{grid-column:2;margin:0}.sb-about dt{font:400 16px Bungee;margin-top:16px}.sb-about dd{margin:2px 0 0}
.sb-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--velvet);color:var(--paper)}.sb-end h2{margin:0 auto}
.sb footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--black);color:var(--paper)}
@media(max-width:900px){.sb nav{gap:12px;font-size:14px}.sb-hero,.sb-list,.sb-pack ul,.sb-about{grid-template-columns:1fr}.sb-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.sb-flash{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const f = [["#f9d6dc", "#3b2a2a", "var(--gold)", ".6s"], ["#cfe9e6", "#2a2a3b", "var(--red)", "1.2s"], ["#fbe7b5", "#3b2a2a", "var(--teal)", "1.8s"], ["#e3dcf7", "#2a3b2a", "var(--black)", "2.4s"]]; return '<section class="sb-hero" aria-labelledby="h"><div><span class="sb-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book the booth") + '</div><div class="sb-slot" aria-hidden="true"><div class="sb-strip">' + f.map(x => '<span style="--bg:' + x[0] + ";--fg:" + x[1] + ";--hat:" + x[2] + ";--d:" + x[3] + '"></span>').join("") + "<small>" + k.E(k.c.name) + '</small></div></div><span class="sb-flash" aria-hidden="true"></span></section>'; },
  work: (k) => { const c = ["#f9d6dc", "#cfe9e6", "#fbe7b5"], r = ["-3deg", "2deg", "-1deg"]; return '<section class="sb-events" id="work"><h2>Recent events</h2><div class="sb-list">' + k.c.cards.map((x, i) => '<article class="sb-pol" style="--c:' + c[i % 3] + ";--r:" + r[i % 3] + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="sb-pack" id="services"><h2>Packages</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="sb-about" id="about"><h2>Behind the curtain</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sb-end" id="contact"><h2>Say cheese.</h2>' + k.cta("Book the booth") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

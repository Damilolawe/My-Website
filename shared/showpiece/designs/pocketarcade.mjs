export default {
  id: "md-nintendo-2001",
  root: "pa",
  fonts: "family=Silkscreen:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700;800",
  labels: { work: "Game nights", services: "Prices", about: "The cafe", contact: "Book a table" },
  demo: {
    name: "Pocket Arcade Cafe", headline: "Press start.", heroLabel: "A retro games cafe",
    bio: "Two hundred classic consoles and handhelds, all working, all free to play with any drink. Bring friends, pick a cartridge from the wall, and settle who is best once and for all.",
    cards: [
      { title: "Tuesday tournament", description: "Kart racing, eight players, winner gets their name on the wall." },
      { title: "Handheld hour", description: "Link cables out, trading on, every Thursday from six." },
      { title: "Birthday parties", description: "Private room, two hours, pizza and a prize for the high score." },
    ],
    services: [
      { title: "Free play", description: "Any console, with any drink." },
      { title: "Private room", description: "Up to 10 friends, 2 hours." },
      { title: "Repairs", description: "We fix old handhelds and consoles too." },
    ],
  },
  css: `
.pa{--purple:#6a4bd6;--grape:#3b2a86;--clear:rgba(160,140,255,.35);--screen:#9bbc0f;--dark:#0f380f;--mid:#306230;--lite:#8bac0f;--cream:#f6f2ff;--pink:#ff5fa2;--ink:#1b1340;background:var(--cream);color:var(--ink);font:400 17px/1.7 "M PLUS Rounded 1c",system-ui,sans-serif}
.pa header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--grape);color:var(--cream)}
.pa .brand{font:700 18px/1 Silkscreen;text-decoration:none}
.pa nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:800}.pa nav a{text-decoration:none}.pa nav a:hover{color:var(--pink)}
.pa-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(circle at 80% 40%,#e3dbff,var(--cream) 60%)}
.pa-label{font:700 14px Silkscreen;color:var(--purple)}
.pa h1{margin-top:12px;font:700 clamp(56px,9vw,150px)/.95 Silkscreen;color:var(--grape)}
.pa h1 .ch{animation:pa-in .01s both;animation-delay:calc(var(--i) * 90ms)}@keyframes pa-in{from{visibility:hidden}}
.pa-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.pa .cta{display:inline-flex;margin-top:28px;padding:14px 26px;border-radius:999px;background:var(--pink);color:#fff;font:700 15px Silkscreen;text-decoration:none;box-shadow:0 6px 0 #c2357a;transition:transform .1s,box-shadow .1s}.pa .cta:hover{transform:translateY(4px);box-shadow:0 2px 0 #c2357a}.pa .cta-muted{background:#e8e2ff;color:#5d5490;box-shadow:none;font:400 15px "M PLUS Rounded 1c"}
.pa-dev{position:relative;justify-self:center;width:min(100%,330px);aspect-ratio:.62;padding:26px 24px;border-radius:22px 22px 70px 22px;background:linear-gradient(160deg,rgba(150,120,255,.75),rgba(90,60,200,.85));box-shadow:inset 0 0 0 3px rgba(255,255,255,.35),0 40px 60px -30px rgba(27,19,64,.6);animation:pa-tilt 5s ease-in-out infinite alternate}
@keyframes pa-tilt{from{transform:rotate(-4deg)}to{transform:rotate(3deg) translateY(-8px)}}
.pa-dev:before{content:"";position:absolute;inset:0;border-radius:inherit;background:repeating-linear-gradient(90deg,transparent 0 6px,rgba(255,255,255,.06) 6px 7px)}
.pa-bezel{position:relative;padding:18px 18px 26px;border-radius:10px 10px 30px 10px;background:#4a4a5a}
.pa-scr{position:relative;aspect-ratio:10/9;background:var(--screen);overflow:hidden;box-shadow:inset 0 0 0 3px var(--mid)}
.pa-ground{position:absolute;left:0;right:0;bottom:0;height:18%;background:repeating-linear-gradient(90deg,var(--mid) 0 10px,var(--dark) 10px 20px);animation:pa-scroll .6s steps(4) infinite}@keyframes pa-scroll{to{background-position:-20px 0}}
.pa-hero2{position:absolute;left:22%;bottom:18%;width:24px;height:24px;background:var(--dark);box-shadow:0 -8px 0 -4px var(--dark);animation:pa-jump 1.2s steps(6) infinite}
@keyframes pa-jump{0%,100%{transform:translateY(0)}50%{transform:translateY(-48px)}}
.pa-block{position:absolute;bottom:18%;right:-30px;width:20px;height:30px;background:var(--dark);animation:pa-come 1.2s linear infinite}@keyframes pa-come{to{right:110%}}
.pa-score{position:absolute;left:8px;top:6px;font:700 11px Silkscreen;color:var(--dark)}
.pa-pad{display:flex;justify-content:space-between;align-items:center;margin-top:28px}
.pa-cross{position:relative;width:76px;height:76px}.pa-cross:before,.pa-cross:after{content:"";position:absolute;background:#2a2a3a;border-radius:4px}.pa-cross:before{left:26px;top:0;width:24px;height:76px}.pa-cross:after{left:0;top:26px;width:76px;height:24px}
.pa-ab{display:flex;gap:12px;transform:rotate(-24deg)}.pa-ab i{width:38px;height:38px;border-radius:50%;background:var(--pink);box-shadow:0 4px 0 #a02a60}.pa-ab i:last-child{animation:pa-press 1.2s steps(2) infinite}@keyframes pa-press{50%{transform:translateY(3px);box-shadow:0 1px 0 #a02a60}}
.pa h2{font:700 clamp(36px,5.4vw,88px)/1 Silkscreen;color:var(--grape);max-width:14ch}
.pa-nights{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--grape);color:var(--cream)}.pa-nights h2{color:var(--cream)}
.pa-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.pa-cart{padding:22px 22px 26px;border-radius:10px 10px 4px 4px;background:#d9d6e8;color:var(--ink);clip-path:polygon(0 0,82% 0,100% 8%,100% 100%,0 100%)}
.pa-cart:before{content:"";display:block;height:14px;margin-bottom:16px;background:repeating-linear-gradient(90deg,#b5b1cc 0 6px,transparent 6px 10px)}
.pa-lab{padding:16px;border-radius:6px;background:var(--c);color:#fff}
.pa-cart img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px;margin-bottom:12px}
.pa-lab h3{font:700 18px/1.25 Silkscreen}.pa-lab p{margin-top:8px;font-size:15px}
.pa-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.pa-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.pa-price li{padding:26px;background:var(--screen);color:var(--dark);box-shadow:inset 0 0 0 4px var(--mid),8px 8px 0 var(--grape)}
.pa-price h3{font:700 20px Silkscreen}.pa-price p{margin-top:8px;font-weight:700}
.pa-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#e8e2ff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.pa-about>p{font-size:clamp(19px,1.8vw,24px)}.pa-about dl{grid-column:2;margin:0}.pa-about dt{font:700 16px Silkscreen;color:var(--purple);margin-top:16px}.pa-about dd{margin:2px 0 0}
.pa-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.pa-end h2{margin:0 auto}
.pa footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px Silkscreen;background:var(--grape);color:var(--cream)}
@media(max-width:900px){.pa nav{gap:12px;font-size:14px}.pa-hero,.pa-list,.pa-price ul,.pa-about{grid-template-columns:1fr}.pa-about dl{grid-column:auto}.pa-dev{width:min(100%,280px)}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="pa-hero" aria-labelledby="h"><div><span class="pa-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a table") + '</div><div class="pa-dev" aria-hidden="true"><div class="pa-bezel"><div class="pa-scr"><span class="pa-score">HI 04820</span><span class="pa-ground"></span><span class="pa-hero2"></span><span class="pa-block"></span></div></div><div class="pa-pad"><span class="pa-cross"></span><span class="pa-ab"><i></i><i></i></span></div></div></section>',
  work: (k) => { const c = ["var(--pink)", "var(--purple)", "#1f9e89"]; return '<section class="pa-nights" id="work"><h2>Game nights</h2><div class="pa-list">' + k.c.cards.map((x, i) => '<article class="pa-cart"><div class="pa-lab" style="--c:' + c[i % 3] + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="pa-price" id="services"><h2>Prices</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="pa-about" id="about"><h2>Insert coin</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="pa-end" id="contact"><h2>Player two, ready?</h2>' + k.cta("Book a table") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

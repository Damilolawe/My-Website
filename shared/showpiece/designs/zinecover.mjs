export default {
  id: "md-theverge",
  root: "ev",
  fonts: "family=Anybody:wdth,wght@50..150,400..900&family=Instrument+Serif:ital@0;1",
  labels: { work: "Stories", services: "Subscribe", about: "About", contact: "Get the issue" },
  demo: {
    name: "Static Weekly", headline: "Culture, loudly.", heroLabel: "An independent magazine about music, games and the internet",
    bio: "Long reads, loud opinions and the best new music each Friday. Printed four times a year, posted to your door, and written by people who still care about the album as a format.",
    cards: [
      { title: "The last video shop in town", description: "Twelve thousand tapes, one owner and a waiting list for horror." },
      { title: "Why everyone is learning to DJ", description: "Inside the bedroom-to-basement pipeline of the new club scene." },
      { title: "The game that took ten years", description: "Two friends, one garage and a pixel-art world finally finished." },
    ],
    services: [
      { title: "Print", description: "Four issues a year, posted anywhere." },
      { title: "Digital", description: "Every story, every archive, every week." },
      { title: "Both", description: "Print, digital and the members' playlist." },
    ],
  },
  css: `
.ev{--acid:#d4ff3a;--hot:#ff2e88;--ink:#0d0d0d;--paper:#f6f3ec;--violet:#5b2bff;background:var(--paper);color:var(--ink);font:400 18px/1.6 "Instrument Serif",Georgia,serif}
.ev header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);border-bottom:2px solid var(--ink)}
.ev .brand{font:900 24px/1 Anybody;font-stretch:140%;text-transform:uppercase;letter-spacing:-.02em;text-decoration:none}
.ev nav{display:flex;gap:clamp(14px,2.4vw,30px);font:600 15px Anybody;text-transform:uppercase}.ev nav a{text-decoration:none}.ev nav a:hover{background:var(--acid)}
.ev-hero{position:relative;padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden}
.ev-label{display:inline-block;font:italic 400 22px "Instrument Serif"}
.ev h1{margin-top:6px;font:900 clamp(64px,12vw,220px)/.86 Anybody;text-transform:uppercase;letter-spacing:0;font-stretch:68%;animation:ev-stretch 3.2s cubic-bezier(.6,0,.2,1) .3s both}
@keyframes ev-stretch{from{font-stretch:150%;letter-spacing:-.04em}}
.ev h1 .ch{display:inline-block;animation:ev-in .4s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes ev-in{from{opacity:0}}
.ev-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,60px);align-items:start;margin-top:clamp(24px,3vw,40px)}
.ev-hero p{font-size:clamp(20px,1.8vw,26px);line-height:1.4}
.ev .cta{display:inline-flex;margin-top:24px;padding:14px 24px;background:var(--ink);color:var(--acid);font:800 16px Anybody;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s}.ev .cta:hover{background:var(--hot);color:var(--paper)}.ev .cta-muted{background:#e6e1d6;color:#555;font:italic 400 17px "Instrument Serif";text-transform:none}
.ev-stickers{position:relative;height:clamp(220px,22vw,300px)}
.ev-st{position:absolute;display:grid;place-items:center;text-align:center;font:900 clamp(16px,1.6vw,22px)/1 Anybody;text-transform:uppercase;animation:ev-slap .5s cubic-bezier(.3,1.8,.5,1) both;animation-delay:var(--d)}
@keyframes ev-slap{from{opacity:0;transform:scale(2.4) rotate(0)}}
.ev-st.a{left:2%;top:4%;width:clamp(130px,13vw,170px);aspect-ratio:1;border-radius:50%;background:var(--acid);transform:rotate(-12deg);--d:1.4s}
.ev-st.b{left:36%;top:30%;padding:16px 22px;background:var(--hot);color:var(--paper);transform:rotate(6deg);--d:1.8s}
.ev-st.c{right:2%;top:0;width:clamp(120px,12vw,160px);aspect-ratio:1;background:var(--violet);color:var(--paper);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);transform:rotate(10deg);--d:2.2s;font-size:14px}
.ev-st.d{left:10%;bottom:0;padding:10px 16px;border:3px solid var(--ink);background:var(--paper);transform:rotate(-4deg);--d:2.6s}
.ev-marq{display:flex;overflow:hidden;background:var(--ink);color:var(--acid);font:800 clamp(20px,2vw,28px) Anybody;text-transform:uppercase;white-space:nowrap}
.ev-marq span{padding:14px 0;animation:ev-roll 24s linear infinite}.ev-marq span:after{content:" ";padding-right:1em}
@keyframes ev-roll{to{transform:translateX(-100%)}}
.ev h2{font:900 clamp(48px,7vw,120px)/.86 Anybody;font-stretch:60%;text-transform:uppercase;letter-spacing:-.03em;max-width:12ch}
.ev-stories{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ev-list{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:24px;margin-top:clamp(40px,6vw,70px)}
.ev-s{border-top:6px solid var(--ink);padding-top:16px}
.ev-s:first-child h3{font-size:clamp(32px,3.2vw,48px)}
.ev-s small{font:800 13px Anybody;text-transform:uppercase;background:var(--acid);padding:2px 6px}
.ev-s img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:14px 0;filter:contrast(1.1)}
.ev-s h3{margin-top:10px;font:800 26px/1.05 Anybody;font-stretch:75%;text-transform:uppercase}.ev-s p{margin-top:8px;font-size:19px}
.ev-s:hover h3{background:var(--hot);color:var(--paper)}
.ev-sub{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--violet);color:var(--paper)}
.ev-sub ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ev-sub li{padding:28px;background:var(--paper);color:var(--ink);transform:rotate(var(--r))}.ev-sub li:nth-child(1){--r:-1.5deg}.ev-sub li:nth-child(2){--r:1deg;background:var(--acid)}.ev-sub li:nth-child(3){--r:-.5deg}
.ev-sub h3{font:900 30px Anybody;font-stretch:70%;text-transform:uppercase}.ev-sub p{margin-top:8px}
.ev-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ev-about>p{font-size:clamp(22px,2.2vw,30px);line-height:1.35}.ev-about dl{grid-column:2;margin:0}.ev-about dt{font:800 16px Anybody;text-transform:uppercase;margin-top:16px}.ev-about dd{margin:2px 0 0}
.ev-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--acid)}.ev-end h2{margin:0 auto}
.ev footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:600 13px Anybody;text-transform:uppercase;background:var(--ink);color:var(--paper)}
@media(max-width:900px){.ev nav{gap:12px;font-size:12px}.ev-grid,.ev-list,.ev-sub ul,.ev-about{grid-template-columns:1fr}.ev-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const m = k.c.cards.map(x => k.E(x.title)).join(" / "); return '<section class="ev-hero" aria-labelledby="h"><span class="ev-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="ev-grid"><div><p>' + k.E(k.c.bio) + "</p>" + k.cta("Get the issue") + '</div><div class="ev-stickers" aria-hidden="true"><span class="ev-st a">Issue<br>No. 24</span><span class="ev-st b">New music Friday</span><span class="ev-st c">Long<br>reads</span><span class="ev-st d">Printed on paper</span></div></div></section><div class="ev-marq" aria-hidden="true"><span>' + m + " / " + m + "</span><span>" + m + " / " + m + "</span></div>"; },
  work: (k) => { const t = ["Feature", "Music", "Games"]; return '<section class="ev-stories" id="work"><h2>In this issue</h2><div class="ev-list">' + k.c.cards.map((x, i) => '<article class="ev-s"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ev-sub" id="services"><h2>Subscribe</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ev-about" id="about"><h2>Who we are</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ev-end" id="contact"><h2>Read it on paper.</h2>' + k.cta("Get the issue") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

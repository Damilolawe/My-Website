export default {
  id: "md-miro",
  root: "gi",
  fonts: "family=Caveat:wght@600;700&family=Rethink+Sans:wght@400;600;800",
  labels: { work: "Boards", services: "Pricing", about: "About", contact: "Start a board" },
  intros: {
    work: { title: "Boards people made", text: "Workshops, retros and plans that started as a mess of sticky notes." },
    features: { title: "Pricing", text: "Three boards free, forever. Unlimited when your team is hooked." },
    studio: { title: "About the club", text: null },
    contact: { title: "Start a board", text: "Invite your team with a link. Nobody needs an account to add a note." },
  },
  demo: {
    name: "Good Ideas Club", headline: "Big ideas begin together.", heroLabel: "An online whiteboard for teams",
    bio: "One endless board for the whole team. Throw up sticky notes, draw arrows, vote on the good ones, and leave with a plan everyone actually agreed on.",
    cards: [
      { title: "A retro in fifteen minutes", description: "Went well, didn't, try next: the template does the facilitating." },
      { title: "Map the whole customer journey", description: "Every step, every complaint, every idea in one picture." },
      { title: "Brainstorm across time zones", description: "Notes added overnight, voted on by morning." },
    ],
    services: [
      { title: "Free", description: "Three editable boards and every template." },
      { title: "Team", description: "Unlimited boards, voting and timers." },
      { title: "Studio", description: "Client workspaces and guest access." },
    ],
  },
  css: `
.gi{--sun:#ffd02f;--ink:#1d1b16;--paper:#fffdf6;--pink:#ff9ec7;--sky:#8fd3ff;--mint:#9ef0b4;--red:#ff5a36;background:var(--paper);color:var(--ink);font:400 17px/1.6 "Rethink Sans",system-ui,sans-serif}
.gi header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.gi .brand{font:700 32px/1 Caveat;text-decoration:none}
.gi nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.gi nav a{text-decoration:none}.gi nav a:hover{color:var(--red)}
.gi-hero{position:relative;min-height:calc(100svh - 70px);margin:0 clamp(10px,2vw,24px);padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);border-radius:28px;background:var(--sun);background-image:radial-gradient(rgba(29,27,22,.18) 1.5px,transparent 1.5px);background-size:26px 26px;overflow:hidden}
.gi h1{position:relative;z-index:2;font:800 clamp(60px,9.6vw,164px)/.9 "Rethink Sans";letter-spacing:-.06em;max-width:11ch}
.gi h1 .ch{animation:gi-in .5s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes gi-in{from{opacity:0;transform:scale(.6)}}
.gi-hero p{position:relative;z-index:2;margin-top:24px;max-width:40ch;font-size:clamp(18px,1.6vw,21px)}
.gi .cta{position:relative;z-index:2;display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:12px;background:var(--ink);color:#fff;font-weight:800;text-decoration:none;transition:transform .2s}.gi .cta:hover{transform:rotate(-2deg)}.gi .cta-muted{background:#fff;color:var(--ink)}
.gi-note{position:absolute;z-index:1;width:clamp(130px,13vw,190px);aspect-ratio:1;padding:16px;font:700 clamp(20px,1.9vw,28px)/1.05 Caveat;box-shadow:0 14px 20px -12px rgba(29,27,22,.5);transform:rotate(var(--r));animation:gi-stick .6s cubic-bezier(.3,1.6,.5,1) both;animation-delay:var(--d)}
@keyframes gi-stick{from{opacity:0;transform:translateY(-60px) rotate(calc(var(--r) * -3)) scale(1.2)}}
.gi-n1{right:22%;top:12%;background:var(--pink);--r:-6deg;--d:.6s}.gi-n2{right:6%;top:24%;background:var(--sky);--r:5deg;--d:.85s}.gi-n3{right:16%;top:52%;background:var(--mint);--r:-3deg;--d:1.1s}.gi-n4{right:3%;top:62%;background:#fff;--r:7deg;--d:1.35s}
.gi-vote{position:absolute;right:8px;bottom:8px;display:flex;gap:4px}.gi-vote i{width:12px;height:12px;border-radius:50%;background:var(--red)}
.gi-arrow{position:absolute;right:12%;top:38%;z-index:1;width:22%;overflow:visible}
.gi-arrow path{fill:none;stroke:var(--ink);stroke-width:4;stroke-linecap:round;stroke-dasharray:400;animation:gi-draw 1.2s ease 1.8s both}@keyframes gi-draw{from{stroke-dashoffset:400}}
.gi-intro{margin:0 clamp(10px,2vw,24px);padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:28px;background:var(--sun);background-image:radial-gradient(rgba(29,27,22,.18) 1.5px,transparent 1.5px);background-size:26px 26px}.gi-intro h1{font-size:clamp(54px,8vw,128px)}.gi-intro p{margin-top:18px;max-width:46ch}
.gi h2{font:800 clamp(42px,6vw,96px)/.92 "Rethink Sans";letter-spacing:-.055em;max-width:14ch}
.gi h2 + .gi-scrawl{display:block;margin-top:6px;font:700 30px Caveat;color:var(--red)}
.gi-boards{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.gi-wall{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,3vw,40px);margin-top:clamp(40px,6vw,70px)}
.gi-card{padding:24px 22px 28px;background:var(--c);box-shadow:0 18px 24px -18px rgba(29,27,22,.6);transform:rotate(var(--r));transition:transform .3s}.gi-card:hover{transform:rotate(0) scale(1.03)}
.gi-card:nth-child(3n+1){--c:var(--pink);--r:-2deg}.gi-card:nth-child(3n+2){--c:var(--sky);--r:1.5deg}.gi-card:nth-child(3n){--c:var(--mint);--r:-.8deg}
.gi-card img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:16px}
.gi-card h3{font:700 32px/1 Caveat}.gi-card p{margin-top:10px}
.gi-price{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.gi-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.gi-price li{padding:28px;border:3px solid var(--ink);border-radius:18px}.gi-price li:nth-child(2){background:var(--sun)}
.gi-price h3{font:800 28px "Rethink Sans";letter-spacing:-.04em}.gi-price p{margin-top:8px}
.gi-about{margin:0 clamp(10px,2vw,24px) 40px;padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:28px;background:var(--ink);color:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.gi-about>p{font-size:clamp(19px,1.8vw,24px)}.gi-about dl{grid-column:2;margin:0}.gi-about dt{font:700 28px Caveat;color:var(--sun);margin-top:14px}.gi-about dd{margin:2px 0 0}
.gi-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.gi-end h2{margin:0 auto}
.gi footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:15px}
@media(max-width:900px){.gi nav{gap:12px;font-size:14px}.gi-wall,.gi-price ul,.gi-about{grid-template-columns:1fr}.gi-about dl{grid-column:auto}.gi-note,.gi-arrow{display:none}.gi-hero{min-height:0}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const t = (k.c.cards.length ? k.c.cards : [{ title: "Idea" }]).map(x => k.E(x.title)); const v = n => '<span class="gi-vote">' + "<i></i>".repeat(n) + "</span>"; return '<section class="gi-hero" aria-labelledby="h"><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a free board") + '<div aria-hidden="true"><span class="gi-note gi-n1">' + (t[0] || "") + v(3) + '</span><span class="gi-note gi-n2">' + (t[1] || t[0]) + v(1) + '</span><span class="gi-note gi-n3">' + (t[2] || t[0]) + v(4) + '</span><span class="gi-note gi-n4">Let\'s do this one!' + '</span><svg class="gi-arrow" viewBox="0 0 200 100"><path d="M10 80 C60 10 140 10 185 60 M185 60 l-20 -4 M185 60 l-4 -20"/></svg></div></section>'; },
  intro: (k) => { const t = k.intro(); return '<section class="gi-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="gi-boards" id="work"><h2>Off the wall</h2><span class="gi-scrawl">real boards, real teams</span><div class="gi-wall">' + k.c.cards.map((x, i) => '<article class="gi-card">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="gi-price" id="services"><h2>Pricing</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="gi-about" id="about"><h2>Why a club?</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="gi-end" id="contact"><h2>Grab a marker.</h2>' + k.cta("Start a free board") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

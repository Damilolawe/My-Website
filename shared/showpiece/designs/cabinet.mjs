export default {
  id: "md-playstation",
  root: "na2",
  fonts: "family=Press+Start+2P&family=Rubik:wght@400;600;800",
  labels: { work: "Games", services: "Play passes", about: "About", contact: "Visit" },
  intros: {
    work: { title: "On the floor", text: "Sixty cabinets, restored and set to free play." },
    features: { title: "Play passes", text: "One price at the door. Every machine on free play after that." },
    studio: { title: "About the arcade", text: null },
    contact: { title: "Visit", text: "Open late every night. Private hire for parties and teams." },
  },
  demo: {
    name: "Neon Arcade", headline: "Insert coin. Stay all night.", heroLabel: "A free-play retro arcade and bar",
    bio: "Sixty restored arcade cabinets, all set to free play once you are through the door. Pinball at the back, a bar at the front, and a high score board that resets every Monday.",
    cards: [
      { title: "Monday score reset", description: "Every board wiped clean. First name on the top spot wins a pass." },
      { title: "Pinball alley", description: "Twelve tables from the seventies to now, levelled weekly." },
      { title: "Two-player Tuesdays", description: "Bring someone. Co-op cabinets only, all night." },
    ],
    services: [
      { title: "Evening pass", description: "Unlimited play from 6pm to close." },
      { title: "Season pass", description: "Every night for three months, plus a guest on Fridays." },
      { title: "Private hire", description: "The whole floor for your party or team." },
    ],
  },
  css: `
.na2{--black:#0a0612;--cab:#170c26;--magenta:#ff2bd6;--cyan:#21f3ff;--yellow:#ffe14d;--text:#f2ecff;background:var(--black);color:var(--text);font:400 17px/1.65 Rubik,system-ui,sans-serif}
.na2 header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:3px solid var(--magenta)}
.na2 .brand{font:400 15px/1.3 "Press Start 2P",monospace;text-decoration:none;color:var(--cyan);text-shadow:0 0 12px var(--cyan)}
.na2 nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.na2 nav a{text-decoration:none}.na2 nav a:hover,.na2 nav a[aria-current]{color:var(--yellow)}
.na2-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.na2-label{font:400 11px/1.6 "Press Start 2P",monospace;color:var(--magenta)}
.na2 h1{margin-top:22px;font:800 clamp(52px,7.6vw,124px)/.95 Rubik;letter-spacing:-.04em;text-transform:uppercase;color:#fff;text-shadow:0 0 18px rgba(255,43,214,.7),4px 4px 0 var(--magenta)}
.na2 h1 .ch{animation:na2-flick 1.6s steps(1) both;animation-delay:calc(var(--i) * 40ms)}
@keyframes na2-flick{0%{opacity:0}20%{opacity:1}24%{opacity:.2}28%,100%{opacity:1}}
.na2-hero p{margin-top:26px;max-width:44ch;color:#cfc4e6}
.na2 .cta{display:inline-flex;margin-top:30px;padding:16px 24px;background:var(--yellow);color:var(--black);font:400 12px/1.4 "Press Start 2P",monospace;text-decoration:none;box-shadow:0 6px 0 #a88a00;transition:transform .1s,box-shadow .1s}.na2 .cta:active{transform:translateY(4px);box-shadow:0 2px 0 #a88a00}.na2 .cta-muted{background:var(--cab);color:#cfc4e6;box-shadow:none;font-family:Rubik;font-size:15px}
.na2-cab{position:relative;justify-self:center;width:min(100%,380px);padding:22px 22px 30px;border-radius:26px 26px 8px 8px;background:linear-gradient(180deg,#2a1544,var(--cab));box-shadow:inset 0 0 0 4px var(--magenta),0 0 50px rgba(255,43,214,.3)}
.na2-marquee{padding:12px;border-radius:12px;background:var(--magenta);text-align:center;font:400 12px "Press Start 2P",monospace;color:#fff;animation:na2-glow 1.4s ease-in-out infinite alternate}@keyframes na2-glow{to{box-shadow:0 0 30px var(--magenta)}}
.na2-screen{position:relative;margin-top:18px;aspect-ratio:4/3.4;border-radius:18px;overflow:hidden;background:#05020a;box-shadow:inset 0 0 40px rgba(33,243,255,.25)}
.na2-screen:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(transparent 0 2px,rgba(0,0,0,.35) 2px 4px);pointer-events:none}
.na2-scores{position:absolute;inset:12% 10%;font:400 clamp(9px,.9vw,11px)/2.4 "Press Start 2P",monospace;color:var(--cyan)}
.na2-scores b{display:block;font-weight:400;color:var(--yellow);text-align:center;margin-bottom:10px}
.na2-scores span{display:flex;justify-content:space-between}
.na2-coin{position:absolute;left:0;right:0;bottom:12%;text-align:center;font:400 clamp(10px,1vw,13px) "Press Start 2P",monospace;color:#fff;animation:na2-blink 1s steps(1) infinite}@keyframes na2-blink{50%{opacity:0}}
.na2-sprite{position:absolute;bottom:26%;left:-40px;width:28px;height:28px;background:var(--yellow);clip-path:polygon(100% 20%,50% 50%,100% 80%,100% 100%,0 100%,0 0,100% 0);animation:na2-run 4s linear infinite,na2-chomp .25s steps(1) infinite}
@keyframes na2-run{to{left:110%}}@keyframes na2-chomp{50%{clip-path:polygon(100% 45%,50% 50%,100% 55%,100% 100%,0 100%,0 0,100% 0)}}
.na2-panel{display:flex;justify-content:center;gap:16px;margin-top:20px}.na2-panel i{width:26px;height:26px;border-radius:50%;background:var(--cyan);box-shadow:0 4px 0 #0c8c95}.na2-panel i:nth-child(2){background:var(--magenta);box-shadow:0 4px 0 #8a1173}.na2-panel i:first-child{width:14px;height:40px;border-radius:7px;background:#ddd;box-shadow:0 0 0 8px #444;margin-right:16px}
.na2-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);border-bottom:3px solid var(--cyan)}.na2-intro h1{font-size:clamp(48px,7vw,112px)}.na2-intro p{margin-top:18px;max-width:46ch;color:#cfc4e6}
.na2 h2{font:800 clamp(40px,5.6vw,88px)/.95 Rubik;letter-spacing:-.035em;text-transform:uppercase;max-width:15ch;color:var(--yellow)}
.na2-games{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.na2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.na2-game{padding:24px;border-radius:16px;background:var(--cab);box-shadow:inset 0 0 0 2px var(--c,var(--cyan));transition:transform .2s,box-shadow .2s}.na2-game:nth-child(2){--c:var(--magenta)}.na2-game:nth-child(3){--c:var(--yellow)}
.na2-game:hover{transform:translateY(-6px);box-shadow:inset 0 0 0 2px var(--c),0 0 30px var(--c)}
.na2-game code{font:400 11px "Press Start 2P",monospace;color:var(--c,var(--cyan))}
.na2-game img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;margin-bottom:16px}
.na2-game h3{margin-top:14px;font:800 24px/1.15 Rubik;text-transform:uppercase}.na2-game p{margin-top:8px;color:#cfc4e6}
.na2-passes{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.na2-passes ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.na2-passes li{padding:26px;border:3px dashed var(--magenta);border-radius:14px}.na2-passes h3{font:400 14px/1.6 "Press Start 2P",monospace;color:var(--cyan)}.na2-passes p{margin-top:14px}
.na2-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--cab);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.na2-about>p{font-size:clamp(19px,1.8vw,23px)}.na2-about dl{grid-column:2;margin:0}.na2-about dt{font:400 11px "Press Start 2P",monospace;color:var(--magenta);margin-top:20px}.na2-about dd{margin:8px 0 0;color:#cfc4e6}
.na2-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.na2-end h2{margin:0 auto}
.na2 footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 10px "Press Start 2P",monospace;color:#9a8fb5;border-top:3px solid var(--magenta)}
@media(max-width:900px){.na2 nav{gap:12px;font-size:14px}.na2 .brand{font-size:11px}.na2-hero,.na2-grid,.na2-passes ul,.na2-about{grid-template-columns:1fr}.na2-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="na2-hero" aria-labelledby="h"><div><span class="na2-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Plan a visit") + '</div><div class="na2-cab" aria-hidden="true"><div class="na2-marquee">High scores</div><div class="na2-screen"><div class="na2-scores"><b>This week</b><span><i>1. ACE</i><i>98,450</i></span><span><i>2. MOJ</i><i>87,120</i></span><span><i>3. ZED</i><i>76,900</i></span><span><i>4. YOU</i><i>?????</i></span></div><span class="na2-sprite"></span><span class="na2-coin">Insert coin</span></div><div class="na2-panel"><i></i><i></i><i></i></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="na2-intro" aria-labelledby="h"><span class="na2-label">Level ' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="na2-games" id="work"><h2>What\'s on the floor</h2><div class="na2-grid">' + k.c.cards.map((x, i) => '<article class="na2-game">' + (k.photo(i) || "<code>Stage " + (i + 1) + "</code>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="na2-passes" id="services"><h2>Play passes</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="na2-about" id="about"><h2>Player one, ready</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="na2-end" id="contact"><h2>Continue? Press start.</h2>' + k.cta("Plan a visit") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

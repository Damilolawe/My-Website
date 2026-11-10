export default {
  id: "md-mastercard",
  root: "mc",
  fonts: "family=Gloock&family=Space+Mono:wght@400;700&family=Albert+Sans:wght@400;600",
  labels: { work: "Benefits", services: "Cards", about: "About", contact: "Apply" },
  intros: {
    work: { title: "What you get", text: "A card built for people who spend most of their money on trips." },
    features: { title: "Choose a card", text: "Three cards, one app, no foreign transaction fees on any of them." },
    studio: { title: "About Moment", text: null },
    contact: { title: "Apply", text: "It takes about five minutes. You will know the same day." },
  },
  demo: {
    name: "Moment Card", headline: "Spend it on somewhere new.", heroLabel: "A travel card with no foreign fees",
    bio: "Pay like a local in 150 countries, earn a point for every dollar, and turn points into flights without blackout dates. No foreign transaction fees, ever.",
    cards: [
      { title: "No foreign fees", description: "The exchange rate you see is the rate you pay." },
      { title: "Lounge access", description: "Two free visits a year in over 900 airport lounges." },
      { title: "Lost card, sorted", description: "Freeze it in the app, get a replacement wherever you are." },
    ],
    services: [
      { title: "Moment", description: "No annual fee, one point per dollar." },
      { title: "Moment Plus", description: "Double points on travel and dining." },
      { title: "Moment Reserve", description: "Lounge access and travel insurance included." },
    ],
  },
  css: `
.mc{--plum:#2a1230;--wine:#4a1d4c;--champ:#e8cfa0;--cream:#fbf5ea;--coral:#ff7b62;--mute:#c2aeb9;background:var(--plum);color:var(--cream);font:400 17px/1.65 "Albert Sans",system-ui,sans-serif}
.mc header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.mc .brand{font:400 26px/1 Gloock,serif;text-decoration:none;color:var(--champ)}
.mc nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600;font-size:15px}.mc nav a{text-decoration:none;color:var(--mute)}.mc nav a:hover,.mc nav a[aria-current]{color:var(--cream)}
.mc-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(40px,7vw,100px) clamp(18px,4vw,56px) clamp(70px,9vw,120px)}
.mc h1{font:400 clamp(56px,8vw,132px)/.98 Gloock,serif;letter-spacing:-.02em}
.mc h1 .ch{animation:mc-in .8s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes mc-in{from{opacity:0;transform:translateY(.15em)}}
.mc-hero p{margin-top:24px;max-width:44ch;color:var(--mute);font-size:clamp(18px,1.5vw,20px)}
.mc .cta{display:inline-flex;margin-top:30px;padding:16px 30px;border-radius:999px;background:var(--champ);color:var(--plum);font-weight:600;text-decoration:none;transition:background .2s}.mc .cta:hover{background:#fff}.mc .cta-muted{background:var(--wine);color:var(--mute)}
.mc-stage{perspective:1400px;display:grid;place-items:center;min-height:420px}
.mc-card{position:relative;width:min(100%,460px);aspect-ratio:1.586;transform-style:preserve-3d;animation:mc-flip 9s cubic-bezier(.6,0,.3,1) infinite}
@keyframes mc-flip{0%,35%{transform:rotateY(-14deg) rotateX(8deg)}45%,80%{transform:rotateY(166deg) rotateX(8deg)}90%,100%{transform:rotateY(346deg) rotateX(8deg)}}
.mc-face{position:absolute;inset:0;border-radius:22px;padding:7% 8%;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;box-shadow:0 40px 70px -30px #000}
.mc-front{background:linear-gradient(135deg,#7b3a6e,#2f1435 55%,#1b0b1e);display:grid;grid-template-rows:auto 1fr auto}
.mc-front:before{content:"";position:absolute;right:-20%;top:-40%;width:80%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(232,207,160,.45),transparent 65%)}
.mc-front b{font:400 22px Gloock,serif;color:var(--champ)}
.mc-chip{width:52px;height:40px;margin-top:22%;border-radius:8px;background:linear-gradient(135deg,#f7e4b6,#b8935a);box-shadow:inset 0 0 0 2px rgba(0,0,0,.15)}
.mc-wave{position:absolute;right:9%;top:38%;width:30px;height:30px}.mc-wave i{position:absolute;inset:0;border:2px solid var(--champ);border-left-color:transparent;border-bottom-color:transparent;border-radius:50%;transform:rotate(45deg);animation:mc-wave 1.6s ease-out infinite}.mc-wave i:nth-child(2){inset:-8px;animation-delay:.2s}.mc-wave i:nth-child(3){inset:-16px;animation-delay:.4s}
@keyframes mc-wave{0%{opacity:0}40%{opacity:1}100%{opacity:0}}
.mc-num{font:400 clamp(15px,1.7vw,21px) "Space Mono",monospace;letter-spacing:.12em;color:var(--cream)}
.mc-back{transform:rotateY(180deg);background:var(--champ);color:var(--plum);padding:0}
.mc-back:before{content:"";display:block;height:20%;margin-top:9%;background:var(--plum)}
.mc-back p{margin:8% 8% 0;font:400 14px "Space Mono",monospace}
.mc-back strong{display:block;margin:4% 8% 0;font:400 26px Gloock,serif}
.mc-intro{padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}.mc-intro h1{font-size:clamp(52px,7vw,116px)}.mc-intro p{margin-top:20px;max-width:46ch;color:var(--mute)}
.mc h2{font:400 clamp(40px,5.6vw,88px)/1 Gloock,serif;letter-spacing:-.015em;max-width:15ch}
.mc-benefits{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--cream);color:var(--plum)}
.mc-perks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.mc-perk{padding-top:24px;border-top:2px solid var(--plum)}
.mc-perk code{display:block;font:700 13px "Space Mono",monospace;color:var(--coral)}
.mc-perk img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin:16px 0 0}
.mc-perk h3{margin-top:16px;font:400 32px/1.05 Gloock,serif}.mc-perk p{margin-top:8px;color:#5a4458}
.mc-cards{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.mc-cards ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.mc-cards li{aspect-ratio:1.586;padding:24px;border-radius:18px;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(135deg,#5a2a5c,#2f1435);transition:transform .4s}.mc-cards li:nth-child(2){background:linear-gradient(135deg,#ff9b7f,#c4435a)}.mc-cards li:nth-child(3){background:linear-gradient(135deg,#f3dfb3,#a8844c);color:var(--plum)}
.mc-cards li:hover{transform:translateY(-8px) rotate(-1.5deg)}
.mc-cards h3{font:400 28px Gloock,serif}.mc-cards p{margin-top:4px;font-size:15px;opacity:.9}
.mc-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--wine);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mc-about>p{font-size:clamp(19px,1.8vw,24px)}.mc-about dl{grid-column:2;margin:0;font-family:"Space Mono",monospace;font-size:14px}.mc-about dt{color:var(--champ);margin-top:18px}.mc-about dd{margin:4px 0 0;color:var(--mute)}
.mc-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(50% 70% at 50% 100%,rgba(255,123,98,.25),transparent)}.mc-end h2{margin:0 auto}
.mc footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid var(--wine)}
@media(max-width:900px){.mc nav{gap:12px;font-size:13px}.mc-hero,.mc-perks,.mc-cards ul,.mc-about{grid-template-columns:1fr}.mc-stage{min-height:280px}.mc-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="mc-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Apply in five minutes") + '</div><div class="mc-stage" aria-hidden="true"><div class="mc-card"><div class="mc-face mc-front"><b>' + k.E(k.c.name) + '</b><span class="mc-chip"></span><span class="mc-wave"><i></i><i></i><i></i></span><span class="mc-num">4000 1234 5678 9010</span></div><div class="mc-face mc-back"><p>Points this trip</p><strong>12,480 points</strong><p>Lisbon, Porto, Seville</p></div></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="mc-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="mc-benefits" id="work"><h2>' + k.h("work", "Made for the trip, not the bank") + '</h2><div class="mc-perks">' + k.c.cards.map((x, i) => '<article class="mc-perk"><code>0' + (i + 1) + "</code>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="mc-cards" id="services"><h2>' + k.h("services", "Choose your card") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="mc-about" id="about"><h2>' + k.h("about", "Why we started") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mc-end" id="contact"><h2>' + k.h("contact", "Where are you going next?") + '</h2>' + k.cta("Apply in five minutes") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-nerdwallet",
  root: "pp",
  fonts: "family=Gelasio:ital,wght@0,500;0,700;1,500&family=Readex+Pro:wght@400;600",
  labels: { work: "Stories", services: "Coaching", about: "About", contact: "Book a call" },
  demo: {
    name: "Penny Plan", headline: "Save without thinking about it.", heroLabel: "Friendly money coaching",
    bio: "One call a month with a money coach who helps you set up a budget that runs itself. No judgement, no jargon, and no products to sell you.",
    cards: [
      { title: "A house deposit in three years", description: "Two teachers set up automatic saving and stopped checking their balance." },
      { title: "Debt-free by thirty", description: "A plan to clear 14,000 of card debt, smallest balance first." },
      { title: "A first emergency fund", description: "Three months of rent saved, one small transfer every payday." },
    ],
    services: [
      { title: "Money check-up", description: "One hour to see where it all goes." },
      { title: "Monthly coaching", description: "A call each month and a plan that adapts." },
      { title: "Couples plan", description: "One budget for two, with room for each." },
    ],
  },
  css: `
@property --fill{syntax:"<percentage>";initial-value:0%;inherits:false}
.pp{--mint:#d9f5e5;--green:#0e7a52;--deep:#0a3b2c;--gold:#f3b33d;--cream:#fbf8f1;--ink:#14231d;background:var(--cream);color:var(--ink);font:400 17px/1.7 "Readex Pro",system-ui,sans-serif}
.pp header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.pp .brand{display:flex;align-items:center;gap:10px;font:700 24px/1 Gelasio;text-decoration:none;color:var(--green)}.pp .brand:before{content:"";width:22px;height:22px;border-radius:50%;background:var(--gold);box-shadow:inset 0 0 0 4px #e09a1f}
.pp nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.pp nav a{text-decoration:none}.pp nav a:hover{color:var(--green)}
.pp-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.pp-label{font:italic 500 20px Gelasio;color:var(--green)}
.pp h1{margin-top:12px;font:700 clamp(50px,7.4vw,124px)/1 Gelasio;letter-spacing:-.025em}
.pp h1 .ch{animation:pp-in .6s ease both;animation-delay:calc(var(--i) * 20ms)}@keyframes pp-in{from{opacity:0;transform:translateY(-.3em)}}
.pp-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.pp .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:12px;background:var(--green);color:var(--cream);font-weight:600;text-decoration:none;transition:background .2s}.pp .cta:hover{background:var(--deep)}.pp .cta-muted{background:var(--mint);color:#4b6359}
.pp-jar{position:relative;justify-self:center;width:min(100%,320px);aspect-ratio:.8}
.pp-glass{position:absolute;inset:14% 6% 0;border-radius:36px 36px 48px 48px;border:6px solid var(--deep);background:linear-gradient(to top,var(--mint) var(--fill),rgba(255,255,255,.5) var(--fill));overflow:hidden;animation:pp-fill 4s cubic-bezier(.3,.7,.3,1) .5s both;--fill:68%}
@keyframes pp-fill{from{--fill:4%}}
.pp-glass:after{content:"";position:absolute;left:12%;top:10%;width:10%;height:60%;border-radius:999px;background:rgba(255,255,255,.7)}
.pp-lid{position:absolute;left:14%;right:14%;top:4%;height:12%;border-radius:12px;background:var(--gold);border:6px solid var(--deep)}
.pp-lid:after{content:"";position:absolute;left:30%;right:30%;top:40%;height:6px;border-radius:3px;background:var(--deep)}
.pp-coin{position:absolute;left:50%;top:-6%;width:56px;height:56px;margin-left:-28px;border-radius:50%;background:radial-gradient(circle,var(--gold) 55%,#e09a1f 56%);border:4px solid var(--deep);animation:pp-drop 2s cubic-bezier(.6,0,.9,.6) infinite;animation-delay:var(--d);opacity:0}
.pp-coin:after{content:"";position:absolute;inset:30% 44%;background:var(--deep);border-radius:2px}
@keyframes pp-drop{0%{opacity:1;transform:translateY(0) rotateY(0)}30%{transform:translateY(40px) rotateY(180deg);opacity:1}40%,100%{transform:translateY(90px) rotateY(270deg);opacity:0}}
.pp-tick{position:absolute;right:-24%;bottom:12%;padding:10px 14px;border-radius:14px;background:#fff;box-shadow:0 14px 30px -16px rgba(0,0,0,.4);font-weight:600;font-size:14px}.pp-tick b{display:block;font:700 26px Gelasio;color:var(--green)}
.pp h2{font:700 clamp(40px,5.6vw,92px)/1.02 Gelasio;letter-spacing:-.02em;max-width:14ch}
.pp-stories{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--mint)}
.pp-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.pp-s{padding:28px;border-radius:24px;background:var(--cream)}
.pp-s img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;margin-bottom:16px}
.pp-goal{height:12px;border-radius:6px;background:var(--mint);overflow:hidden;margin-bottom:18px}.pp-goal i{display:block;height:100%;width:var(--w);border-radius:6px;background:var(--green)}
@supports (animation-timeline:view()){.pp-goal i{animation:pp-goal linear both;animation-timeline:view();animation-range:entry 10% cover 40%}@keyframes pp-goal{from{width:0}}}
.pp-s h3{font:700 24px/1.2 Gelasio}.pp-s p{margin-top:8px;color:#425a50}
.pp-coach{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.pp-coach ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.pp-coach li{padding:28px;border-radius:24px;border:2px solid var(--green)}.pp-coach li:nth-child(2){background:var(--green);color:var(--cream)}
.pp-coach h3{font:700 24px Gelasio}.pp-coach p{margin-top:8px}
.pp-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--deep);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.pp-about>p{font-size:clamp(19px,1.8vw,24px)}.pp-about dl{grid-column:2;margin:0}.pp-about dt{font:700 20px Gelasio;color:var(--gold);margin-top:16px}.pp-about dd{margin:2px 0 0}
.pp-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.pp-end h2{margin:0 auto}
.pp footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.pp nav{gap:12px;font-size:14px}.pp-hero,.pp-list,.pp-coach ul,.pp-about{grid-template-columns:1fr}.pp-about dl{grid-column:auto}.pp-tick{right:-4%}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="pp-hero" aria-labelledby="h"><div><span class="pp-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a free call") + '</div><div class="pp-jar" aria-hidden="true"><span class="pp-coin" style="--d:0s"></span><span class="pp-coin" style="--d:.7s"></span><span class="pp-coin" style="--d:1.4s"></span><span class="pp-glass"></span><span class="pp-lid"></span><span class="pp-tick">Saved this year<b>4,820</b></span></div></section>',
  work: (k) => { const w = ["72%", "48%", "100%"]; return '<section class="pp-stories" id="work"><h2>' + k.h("work", "Goals people reached") + '</h2><div class="pp-list">' + k.c.cards.map((x, i) => '<article class="pp-s">' + k.photo(i) + '<span class="pp-goal" aria-hidden="true"><i style="--w:' + w[i % 3] + '"></i></span><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="pp-coach" id="services"><h2>' + k.h("services", "Ways we can help") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="pp-about" id="about"><h2>' + k.h("about", "No judgement, just a plan") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="pp-end" id="contact"><h2>' + k.h("contact", "Your first call is on us.") + '</h2>' + k.cta("Book a free call") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

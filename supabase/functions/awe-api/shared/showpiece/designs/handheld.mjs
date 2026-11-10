export default {
  id: "md-expo",
  root: "hh",
  fonts: "family=Dela+Gothic+One&family=Nunito:wght@400;700;800",
  labels: { work: "Apps", services: "Services", about: "Studio", contact: "Start an app" },
  demo: {
    name: "Handheld Studio", headline: "Apps people keep.", heroLabel: "A small studio that designs and builds phone apps",
    bio: "We design and build phone apps for iPhone and Android from one codebase. Small team, weekly demos, and apps that stay on the home screen long after launch.",
    cards: [
      { title: "A bakery that takes preorders", description: "Order by 8pm, collect warm at 7am. 2,000 regulars in the first month." },
      { title: "A running club app", description: "Routes, meetups and a leaderboard for a club of 600 runners." },
      { title: "A plant care diary", description: "Photo reminders for watering, rated 4.8 by its first 10,000 users." },
    ],
    services: [
      { title: "Design sprint", description: "Two weeks from idea to a prototype you can hold." },
      { title: "Build", description: "One codebase, both app stores, weekly releases." },
      { title: "Care plan", description: "Updates, fixes and new features each month." },
    ],
  },
  css: `
.hh{--sky:#e9f0ff;--blue:#2f5bff;--coral:#ff6f59;--mint:#5fe0b7;--ink:#111733;--white:#fff;background:var(--sky);color:var(--ink);font:400 17px/1.7 Nunito,system-ui,sans-serif}
.hh header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.hh .brand{font:400 22px/1 "Dela Gothic One";text-decoration:none}
.hh nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:800}.hh nav a{text-decoration:none}.hh nav a:hover{color:var(--blue)}
.hh-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);overflow:hidden}
.hh-label{display:inline-block;padding:6px 14px;border-radius:999px;background:var(--white);font-weight:800;font-size:14px;color:var(--blue)}
.hh h1{margin-top:18px;font:400 clamp(58px,9vw,150px)/.95 "Dela Gothic One";letter-spacing:-.02em}
.hh h1 .ch{display:inline-block;animation:hh-in .7s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 40ms)}@keyframes hh-in{from{opacity:0;transform:translateY(.6em) rotate(-12deg)}}
.hh-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.hh .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:999px;background:var(--ink);color:var(--white);font-weight:800;text-decoration:none;box-shadow:0 6px 0 var(--blue);transition:transform .15s,box-shadow .15s}.hh .cta:hover{transform:translateY(3px);box-shadow:0 3px 0 var(--blue)}.hh .cta-muted{background:var(--white);color:#5a6080;box-shadow:none}
.hh-fan{position:relative;height:clamp(420px,42vw,560px);perspective:1200px}
.hh-phone{position:absolute;left:50%;top:50%;width:clamp(170px,16vw,230px);aspect-ratio:9/19;margin:calc(clamp(170px,16vw,230px) * -19 / 18) 0 0 calc(clamp(170px,16vw,230px) / -2);padding:10px;border-radius:34px;background:var(--ink);box-shadow:0 40px 60px -30px rgba(17,23,51,.6);animation:hh-fan 1.2s cubic-bezier(.3,1.3,.5,1) .3s both,hh-bob 4s ease-in-out 1.5s infinite alternate}
.hh-phone:nth-child(1){--r:-16deg;--x:-62%}.hh-phone:nth-child(2){--r:0deg;--x:0%;z-index:2}.hh-phone:nth-child(3){--r:16deg;--x:62%}
.hh-phone{transform:translateX(var(--x)) rotate(var(--r))}
@keyframes hh-fan{from{transform:translateX(0) rotate(0) scale(.8);opacity:0}}
@keyframes hh-bob{to{transform:translateX(var(--x)) rotate(var(--r)) translateY(-14px)}}
.hh-scr{height:100%;border-radius:26px;overflow:hidden;background:var(--white);display:grid;grid-template-rows:auto 1fr auto;padding:22px 14px 14px;gap:10px}
.hh-scr b{font:400 15px "Dela Gothic One"}
.hh-tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-content:start}.hh-tiles i{aspect-ratio:1;border-radius:14px;background:var(--c)}
.hh-tab{display:flex;justify-content:space-around}.hh-tab i{width:20px;height:20px;border-radius:7px;background:#dfe5f7}.hh-tab i:first-child{background:var(--blue)}
.hh h2{font:400 clamp(42px,6vw,98px)/1 "Dela Gothic One";letter-spacing:-.02em;max-width:14ch}
.hh-apps{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--white);border-radius:48px 48px 0 0}
.hh-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.hh-app{padding:24px;border-radius:30px;background:var(--sky);transition:transform .25s}.hh-app:hover{transform:rotate(-1.5deg) translateY(-6px)}
.hh-app:before{content:"";display:block;width:64px;height:64px;margin-bottom:20px;border-radius:18px;background:var(--c)}
.hh-app img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px;margin-bottom:16px}
.hh-app h3{font:800 22px/1.25 Nunito}.hh-app p{margin-top:8px;color:#4d5375}
.hh-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--white)}
.hh-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.hh-svc li{padding:30px;border-radius:30px;border:3px solid var(--ink)}.hh-svc li:nth-child(2){background:var(--coral)}.hh-svc li:nth-child(3){background:var(--mint)}
.hh-svc h3{font:400 24px "Dela Gothic One"}.hh-svc p{margin-top:8px}
.hh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--blue);color:var(--white);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.hh-about>p{font-size:clamp(19px,1.8vw,24px)}.hh-about dl{grid-column:2;margin:0}.hh-about dt{font-weight:800;color:var(--mint);margin-top:16px}.hh-about dd{margin:2px 0 0}
.hh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.hh-end h2{margin:0 auto}
.hh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.hh nav{gap:12px;font-size:14px}.hh-hero,.hh-list,.hh-svc ul,.hh-about{grid-template-columns:1fr}.hh-about dl{grid-column:auto}.hh-fan{height:440px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const C = [["var(--coral)", "var(--mint)", "var(--blue)", "#ffd23f"], ["var(--blue)", "#ffd23f", "var(--coral)", "var(--mint)"], ["var(--mint)", "var(--blue)", "#ffd23f", "var(--coral)"]]; const ph = (t, c) => '<div class="hh-phone"><div class="hh-scr"><b>' + t + '</b><span class="hh-tiles">' + c.map(x => '<i style="--c:' + x + '"></i>').join("") + '</span><span class="hh-tab"><i></i><i></i><i></i><i></i></span></div></div>'; return '<section class="hh-hero" aria-labelledby="h"><div><span class="hh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start an app") + '</div><div class="hh-fan" aria-hidden="true">' + ph("Orders", C[0]) + ph("Today", C[1]) + ph("Plants", C[2]) + "</div></section>"; },
  work: (k) => { const c = ["var(--coral)", "var(--blue)", "var(--mint)"]; return '<section class="hh-apps" id="work"><h2>' + k.h("work", "Apps on real home screens") + '</h2><div class="hh-list">' + k.c.cards.map((x, i) => '<article class="hh-app" style="--c:' + c[i % 3] + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="hh-svc" id="services"><h2>' + k.h("services", "How we work") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="hh-about" id="about"><h2>' + k.h("about", "A small team on purpose") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="hh-end" id="contact"><h2>' + k.h("contact", "Got an app idea?") + '</h2>' + k.cta("Start an app") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

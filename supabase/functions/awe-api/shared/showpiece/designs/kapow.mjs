export default {
  id: "md-superhuman",
  root: "kp",
  fonts: "family=Bangers&family=Comic+Neue:wght@400;700",
  labels: { work: "New this week", services: "Clubs", about: "The shop", contact: "Visit" },
  demo: {
    name: "Kapow Comics", headline: "Every hero starts somewhere.", heroLabel: "Comic shop and reading room",
    bio: "New issues every Wednesday, back issues in long boxes, and a reading room where you can sit with a stack for as long as you like. Ask us for a recommendation and we will never stop talking.",
    cards: [
      { title: "Wednesday new releases", description: "Every new issue, with your pull list bagged and waiting." },
      { title: "Back issue boxes", description: "Thirty thousand comics, sorted by title and priced to read." },
      { title: "Draw night", description: "Bring a sketchbook. Thursdays from seven, everyone welcome." },
    ],
    services: [
      { title: "Pull list", description: "We save every issue you follow. No fee." },
      { title: "Kids' club", description: "Saturday mornings, ages 7 to 12." },
      { title: "Book club", description: "One graphic novel a month, discussed over tea." },
    ],
  },
  css: `
.kp{--yellow:#ffe600;--red:#ff2a1a;--blue:#1a5cff;--ink:#111;--paper:#fffdf2;background:var(--paper);color:var(--ink);font:400 18px/1.6 "Comic Neue",system-ui,sans-serif}
.kp header{display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,4vw,56px);background:var(--ink);color:var(--yellow)}
.kp .brand{font:400 32px/1 Bangers;letter-spacing:.04em;text-decoration:none}
.kp nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.kp nav a{text-decoration:none;color:var(--paper)}.kp nav a:hover{color:var(--yellow)}
.kp-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:16px;padding:clamp(20px,3vw,40px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.kp-panel{position:relative;border:5px solid var(--ink);background:var(--paper);overflow:hidden;box-shadow:8px 8px 0 var(--ink)}
.kp-main{padding:clamp(24px,3vw,44px);background:radial-gradient(circle,rgba(26,92,255,.25) 2px,transparent 2.5px) 0 0/12px 12px,var(--paper)}
.kp-cap{display:inline-block;padding:8px 14px;border:3px solid var(--ink);background:var(--yellow);font-weight:700;font-size:15px}
.kp h1{margin-top:18px;font:400 clamp(60px,9vw,150px)/.9 Bangers;letter-spacing:.02em;color:var(--red);-webkit-text-stroke:3px var(--ink);text-shadow:6px 6px 0 var(--ink)}
.kp h1 .ch{display:inline-block;animation:kp-pop .4s cubic-bezier(.3,2,.5,1) both;animation-delay:calc(var(--i) * 35ms)}@keyframes kp-pop{from{opacity:0;transform:scale(0) rotate(-20deg)}}
.kp-bubble{position:relative;margin-top:24px;max-width:46ch;padding:18px 22px;border:3px solid var(--ink);border-radius:28px;background:#fff}
.kp-bubble:after{content:"";position:absolute;left:40px;bottom:-22px;border:12px solid transparent;border-top:20px solid var(--ink);border-bottom:0}
.kp .cta{display:inline-flex;margin-top:34px;padding:14px 26px;background:var(--blue);color:#fff;font:400 26px/1 Bangers;letter-spacing:.06em;text-decoration:none;border:4px solid var(--ink);box-shadow:5px 5px 0 var(--ink);transform:rotate(-2deg);transition:transform .15s}.kp .cta:hover{transform:rotate(2deg) scale(1.05)}.kp .cta-muted{background:#fff;color:#555;font:400 15px "Comic Neue";letter-spacing:0;transform:none}
.kp-side{display:grid;grid-template-rows:1.2fr 1fr;gap:16px}
.kp-boom{display:grid;place-items:center;background:repeating-conic-gradient(from 0deg,var(--yellow) 0 10deg,#ffb800 10deg 20deg)}
.kp-burst{display:grid;place-items:center;width:78%;aspect-ratio:1.3;background:var(--red);clip-path:polygon(50% 0,58% 22%,80% 6%,74% 30%,100% 26%,82% 46%,100% 62%,76% 64%,84% 92%,60% 76%,50% 100%,40% 76%,16% 92%,24% 64%,0 62%,18% 46%,0 26%,26% 30%,20% 6%,42% 22%);font:400 clamp(44px,5vw,70px)/1 Bangers;color:var(--yellow);-webkit-text-stroke:2px var(--ink);animation:kp-boom 1.6s cubic-bezier(.3,2,.5,1) .8s infinite alternate}
@keyframes kp-boom{from{transform:scale(.8) rotate(-6deg)}to{transform:scale(1.05) rotate(4deg)}}
.kp-speed{position:relative;background:var(--blue);display:grid;place-items:center}
.kp-speed:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 30px,rgba(255,255,255,.35) 30px 34px);animation:kp-zoom .4s linear infinite}
@keyframes kp-zoom{to{background-position:-34px 0}}
.kp-speed b{position:relative;font:400 clamp(28px,3vw,42px) Bangers;color:#fff;letter-spacing:.06em;-webkit-text-stroke:1.5px var(--ink);animation:kp-shake .3s steps(2) infinite}@keyframes kp-shake{50%{transform:translate(3px,-2px)}}
.kp h2{font:400 clamp(48px,7vw,116px)/.9 Bangers;letter-spacing:.02em;max-width:14ch}
.kp-new{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow)}
.kp-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.kp-c{padding:20px;border:5px solid var(--ink);background:var(--paper);box-shadow:8px 8px 0 var(--ink);transition:transform .2s}.kp-c:hover{transform:rotate(-1.5deg) translateY(-4px)}
.kp-cover{display:block;aspect-ratio:2/3;max-height:240px;margin:0 auto 16px;border:3px solid var(--ink);background:radial-gradient(circle,var(--ink) 1.5px,transparent 2px) 0 0/8px 8px,var(--c)}
.kp-c img{width:100%;aspect-ratio:4/3;object-fit:cover;border:3px solid var(--ink);margin-bottom:16px}
.kp-c h3{font:400 30px/1 Bangers;letter-spacing:.03em}.kp-c p{margin-top:8px}
.kp-clubs{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.kp-clubs ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(36px,5vw,56px)}
.kp-clubs li{position:relative;padding:30px 26px;border:3px solid var(--ink);border-radius:40px;background:#fff}
.kp-clubs li:after{content:"";position:absolute;left:44px;bottom:-20px;border:10px solid transparent;border-top:18px solid var(--ink);border-bottom:0}
.kp-clubs h3{font:400 30px Bangers;color:var(--blue)}.kp-clubs p{margin-top:8px}
.kp-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--red);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.kp-about h2{color:var(--yellow);-webkit-text-stroke:2px var(--ink)}.kp-about>p{font-size:clamp(19px,1.8vw,24px)}.kp-about dl{grid-column:2;margin:0}.kp-about dt{font:400 24px Bangers;color:var(--yellow);margin-top:16px}.kp-about dd{margin:2px 0 0}
.kp-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle,rgba(255,42,26,.25) 2px,transparent 2.5px) 0 0/12px 12px,var(--paper)}.kp-end h2{margin:0 auto}
.kp footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:700;background:var(--ink);color:var(--yellow)}
@media(max-width:900px){.kp nav{gap:12px;font-size:14px}.kp-hero,.kp-list,.kp-clubs ul,.kp-about{grid-template-columns:1fr}.kp-side{grid-template-rows:220px 120px}.kp-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="kp-hero" aria-labelledby="h"><div class="kp-panel kp-main"><span class="kp-cap">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><p class="kp-bubble">' + k.E(k.c.bio) + "</p>" + k.cta("Visit the shop") + '</div><div class="kp-side" aria-hidden="true"><div class="kp-panel kp-boom"><span class="kp-burst">Kapow!</span></div><div class="kp-panel kp-speed"><b>New issues Wednesday</b></div></div></section>',
  work: (k) => { const c = ["var(--red)", "var(--blue)", "#1fbf6a"]; return '<section class="kp-new" id="work"><h2>' + k.h("work", "New this week") + '</h2><div class="kp-list">' + k.c.cards.map((x, i) => '<article class="kp-c">' + (k.photo(i) || '<span class="kp-cover" aria-hidden="true" style="--c:' + c[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="kp-clubs" id="services"><h2>' + k.h("services", "Clubs and pull lists") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="kp-about" id="about"><h2>' + k.h("about", "Our origin story") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="kp-end" id="contact"><h2>' + k.h("contact", "To be continued in store.") + '</h2>' + k.cta("Visit the shop") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

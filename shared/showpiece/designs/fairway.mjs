export default {
  id: "md-1win",
  root: "cl",
  fonts: "family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Mulish:wght@400;700",
  labels: { work: "The course", services: "Membership", about: "The club", contact: "Book a tee time" },
  demo: {
    name: "The Clubhouse", headline: "Nine holes before dinner.", heroLabel: "A members' golf club and kitchen",
    bio: "A nine-hole course on the edge of town, a driving range lit until ten, and a kitchen that does the best Sunday roast in the county. Members and guests welcome.",
    cards: [
      { title: "The ninth hole", description: "A 160-yard par three over the pond, with the terrace watching." },
      { title: "Twilight golf", description: "Tee off after six for half the green fee." },
      { title: "Sunday roast", description: "Served from noon until it runs out." },
    ],
    services: [
      { title: "Full membership", description: "Unlimited golf, two guest passes a month." },
      { title: "Twilight", description: "After 4pm, every day, for a lower fee." },
      { title: "Junior", description: "Under 18s, with free lessons on Saturdays." },
    ],
  },
  css: `
.cl{--green:#1f4a33;--fair:#3f8a4f;--light:#9cc98a;--cream:#f6f1e3;--gold:#c8a24a;--ink:#16241b;background:var(--cream);color:var(--ink);font:400 17px/1.7 Mulish,system-ui,sans-serif}
.cl header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);background:var(--green);color:var(--cream)}
.cl .brand{font:700 24px/1 "Libre Caslon Text",serif;text-decoration:none}
.cl nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700;font-size:15px}.cl nav a{text-decoration:none;opacity:.85}.cl nav a:hover{opacity:1;color:var(--gold)}
.cl-hero{position:relative;min-height:calc(100svh - 70px);display:grid;align-content:center;padding:60px clamp(18px,4vw,56px) 200px;background:linear-gradient(180deg,#bfe0f0 0 45%,transparent 45%),var(--fair);overflow:hidden;isolation:isolate}
.cl-hills{position:absolute;left:-10%;right:-10%;top:38%;height:30%;z-index:-1;background:radial-gradient(60% 100% at 30% 100%,#2f6b3e 60%,transparent 61%),radial-gradient(50% 100% at 75% 100%,#356f42 60%,transparent 61%)}
.cl-green{position:absolute;right:8%;bottom:9%;width:min(46vw,560px);aspect-ratio:2.6;border-radius:50%;background:radial-gradient(ellipse,var(--light),#7fb76d 70%);z-index:-1;box-shadow:0 20px 40px -20px rgba(0,0,0,.4)}
.cl-hole{position:absolute;right:21%;bottom:18%;width:22px;height:9px;border-radius:50%;background:#0d1a12}
.cl-flag{position:absolute;right:calc(21% + 10px);bottom:calc(18% + 4px);width:3px;height:140px;background:#fff;transform-origin:bottom}
.cl-flag:after{content:"";position:absolute;left:3px;top:0;width:54px;height:34px;background:#d9412b;clip-path:polygon(0 0,100% 50%,0 100%);transform-origin:left;animation:cl-wave 1.6s ease-in-out infinite alternate}@keyframes cl-wave{to{transform:scaleX(.8) skewY(6deg)}}
.cl-ball{position:absolute;left:8%;bottom:6%;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:inset -3px -3px 0 #d8d8d8;animation:cl-putt 5s cubic-bezier(.2,.7,.3,1) 1s infinite}
@keyframes cl-putt{0%{left:8%;bottom:6%;opacity:1}55%{left:calc(79% - 9px);bottom:18%;opacity:1}62%{left:calc(79% - 4px);bottom:18%;opacity:0;transform:scale(.4)}100%{opacity:0}}
.cl-copy{max-width:640px;padding:clamp(24px,3vw,40px);background:var(--cream);border-radius:4px;box-shadow:0 30px 60px -30px rgba(0,0,0,.4)}
.cl-label{font:italic 400 18px "Libre Caslon Text",serif;color:var(--fair)}
.cl h1{margin-top:10px;font:700 clamp(46px,6.4vw,104px)/1 "Libre Caslon Text",serif;letter-spacing:-.025em}
.cl h1 .ch{animation:cl-in .6s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes cl-in{from{opacity:0}}
.cl-copy p{margin-top:18px;color:#3d4a41}
.cl .cta{display:inline-flex;margin-top:24px;padding:14px 26px;background:var(--green);color:var(--cream);font-weight:700;text-decoration:none;border-radius:2px;transition:background .2s}.cl .cta:hover{background:var(--gold);color:var(--ink)}.cl .cta-muted{background:#e9e1cb;color:#5b6559}
.cl h2{font:700 clamp(40px,5.6vw,88px)/1.02 "Libre Caslon Text",serif;letter-spacing:-.02em;max-width:15ch}
.cl-course{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.cl-card{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:clamp(40px,6vw,70px);border:2px solid var(--ink)}
.cl-card article{padding:28px;border-right:1px solid var(--ink)}.cl-card article:last-child{border:0}
.cl-card b{display:block;font:700 13px Mulish;letter-spacing:.14em;text-transform:uppercase;color:var(--fair)}
.cl-card img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:14px 0}
.cl-card h3{margin-top:12px;font:700 26px/1.15 "Libre Caslon Text",serif}.cl-card p{margin-top:8px;color:#3d4a41}
.cl-member{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--green);color:var(--cream)}
.cl-member ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.cl-member li{padding:28px;border:1px solid var(--gold)}.cl-member h3{font:400 italic 28px "Libre Caslon Text",serif;color:var(--gold)}.cl-member p{margin-top:8px}
.cl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.cl-about>p{font:400 clamp(20px,2vw,26px)/1.55 "Libre Caslon Text",serif}.cl-about dl{grid-column:2;margin:0}.cl-about dt{font-weight:700;color:var(--fair);margin-top:16px}.cl-about dd{margin:2px 0 0}
.cl-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--light)}.cl-end h2{margin:0 auto}
.cl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--green);color:var(--cream)}
@media(max-width:900px){.cl nav{gap:12px;font-size:13px}.cl-card,.cl-member ul,.cl-about{grid-template-columns:1fr}.cl-card article{border-right:0;border-bottom:1px solid var(--ink)}.cl-about dl{grid-column:auto}.cl-hero{padding-bottom:220px}.cl-green{width:80vw}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="cl-hero" aria-labelledby="h"><div class="cl-hills" aria-hidden="true"></div><div class="cl-green" aria-hidden="true"></div><span class="cl-hole" aria-hidden="true"></span><span class="cl-flag" aria-hidden="true"></span><span class="cl-ball" aria-hidden="true"></span><div class="cl-copy"><span class="cl-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a tee time") + "</div></section>",
  work: (k) => '<section class="cl-course" id="work"><h2>On the scorecard</h2><div class="cl-card">' + k.c.cards.map((x, i) => "<article><b>Hole " + (i * 3 + 3) + "</b>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="cl-member" id="services"><h2>Membership</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="cl-about" id="about"><h2>About the club</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="cl-end" id="contact"><h2>See you on the first tee.</h2>' + k.cta("Book a tee time") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

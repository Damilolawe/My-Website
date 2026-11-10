export default {
  id: "nocturne",
  root: "nt",
  fonts: "family=Bellefair&family=Albert+Sans:wght@300;400;600",
  labels: { work: "Pieces", services: "Services", about: "The workshop", contact: "Request a viewing" },
  demo: {
    name: "Elias Noor", headline: "Time, made by hand.", heroLabel: "Independent watchmaker",
    bio: "I make a handful of mechanical watches each year at a bench in the old town: every wheel finished by hand, every dial painted in the workshop. Each piece takes about four months.",
    cards: [
      { title: "Nocturne I", description: "A moonphase in lapis and gold leaf, shown at night by a hand-wound movement." },
      { title: "Midnight chronograph", description: "Black enamel, salmon sub-dials and a pusher you can feel click." },
      { title: "The pocket piece", description: "A restored 1920s movement in a new silver case." },
    ],
    services: [
      { title: "Commissions", description: "One watch, designed with you." },
      { title: "Restoration", description: "Vintage movements returned to life." },
      { title: "Servicing", description: "Cleaning and regulation every five years." },
    ],
  },
  css: `
.nt{--night:#0a0b14;--velvet:#141632;--gold:#c9a45c;--champ:#efe2c4;--lapis:#1f3c88;--mute:#8a8aa3;background:var(--night);color:var(--champ);font:300 17px/1.8 "Albert Sans",system-ui,sans-serif}
.nt header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px)}
.nt .brand{font:400 24px/1 Bellefair;letter-spacing:.24em;text-transform:uppercase;text-decoration:none}
.nt nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:400;font-size:13px;letter-spacing:.2em;text-transform:uppercase}.nt nav a{text-decoration:none;color:var(--mute)}.nt nav a:hover,.nt nav a[aria-current]{color:var(--gold)}
.nt-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(60% 70% at 72% 50%,var(--velvet),transparent 70%);overflow:hidden}
.nt-dust{position:absolute;inset:0;pointer-events:none}
.nt-dust i{position:absolute;left:var(--x);top:-10px;width:3px;height:3px;border-radius:50%;background:var(--gold);box-shadow:0 0 6px var(--gold);animation:nt-fall var(--t) linear infinite;animation-delay:var(--d);opacity:.7}
@keyframes nt-fall{to{transform:translate(40px,110vh)}}
.nt-label{font-weight:400;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.nt h1{margin-top:18px;font:400 clamp(58px,8.6vw,146px)/.95 Bellefair;letter-spacing:-.01em}
.nt h1 .ch{animation:nt-in 1.6s ease both;animation-delay:calc(var(--i) * 50ms)}@keyframes nt-in{from{opacity:0;color:var(--gold);filter:blur(4px)}}
.nt-hero p{margin-top:24px;max-width:42ch;color:#c9c1ad}
.nt .cta{display:inline-flex;margin-top:30px;padding:15px 30px;border:1px solid var(--gold);color:var(--gold);font-weight:400;font-size:13px;letter-spacing:.24em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}.nt .cta:hover{background:var(--gold);color:var(--night)}.nt .cta-muted{border-color:#2a2c48;color:var(--mute)}
.nt-watch{position:relative;justify-self:center;width:min(100%,420px);aspect-ratio:1}
.nt-case{position:absolute;inset:0;border-radius:50%;background:conic-gradient(#8f7440,#f3dfa8,#a8894e,#f6e6b8,#8f7440,#e8cf8f,#8f7440);box-shadow:0 40px 80px -30px #000,0 0 0 1px rgba(255,255,255,.1)}
.nt-dial{position:absolute;inset:7%;border-radius:50%;background:radial-gradient(circle at 40% 35%,#203a7a,#0e1a40 70%);box-shadow:inset 0 0 30px rgba(0,0,0,.6)}
.nt-ticks{position:absolute;inset:9%;border-radius:50%;background:repeating-conic-gradient(var(--gold) 0 .6deg,transparent .6deg 30deg);-webkit-mask:radial-gradient(circle,transparent 84%,#000 85%);mask:radial-gradient(circle,transparent 84%,#000 85%)}
.nt-moon{position:absolute;left:34%;right:34%;top:18%;height:18%;border-radius:999px 999px 0 0;overflow:hidden;background:#0a1230;box-shadow:inset 0 0 0 2px var(--gold)}
.nt-moon:before{content:"";position:absolute;left:30%;top:20%;width:40%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff7dd,var(--gold));animation:nt-phase 20s linear infinite}
@keyframes nt-phase{from{transform:translateX(-140%)}to{transform:translateX(140%)}}
.nt-sub{position:absolute;left:50%;bottom:20%;width:18%;aspect-ratio:1;margin-left:-9%;border-radius:50%;background:#0a1230;box-shadow:inset 0 0 0 1px var(--gold)}
.nt-sub:after{content:"";position:absolute;left:50%;bottom:50%;width:2px;height:42%;margin-left:-1px;background:#e9785a;transform-origin:bottom;animation:nt-tick 60s steps(60) infinite}
.nt-hand{position:absolute;left:50%;bottom:50%;width:var(--w);height:var(--h);margin-left:calc(var(--w) / -2);border-radius:var(--w);background:linear-gradient(var(--champ),var(--gold));transform-origin:50% 100%;transform:rotate(var(--r))}
.nt-sec{animation:nt-tick 60s linear infinite;background:#e9785a}
@keyframes nt-tick{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.nt-pin{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px;border-radius:50%;background:var(--gold)}
.nt-crown{position:absolute;right:-4%;top:46%;width:7%;height:8%;border-radius:4px;background:repeating-linear-gradient(0deg,#a8894e 0 2px,#f3dfa8 2px 4px)}
.nt h2{font:400 clamp(44px,6.4vw,104px)/1 Bellefair;max-width:14ch}
.nt-pieces{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--velvet)}
.nt-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin-top:clamp(40px,6vw,70px)}
.nt-p{text-align:center}
.nt-mini{display:block;width:70%;aspect-ratio:1;margin:0 auto 24px;border-radius:50%;background:radial-gradient(circle,var(--c) 0 64%,transparent 65%),conic-gradient(#8f7440,#f3dfa8,#a8894e,#f6e6b8,#8f7440);box-shadow:0 30px 40px -24px #000;transition:transform .6s}.nt-p:hover .nt-mini{transform:rotate(-12deg)}
.nt-p img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:50%;margin-bottom:24px}
.nt-p h3{font:400 28px Bellefair;color:var(--gold)}.nt-p p{margin-top:8px;color:#c9c1ad}
.nt-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.nt-svc ul{margin-top:clamp(36px,5vw,56px)}
.nt-svc li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;padding:24px 0;border-top:1px solid #23264a}
.nt-svc h3{font:400 28px Bellefair}.nt-svc p{color:#c9c1ad}
.nt-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--champ);color:var(--night);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.nt-about>p{font:400 clamp(22px,2.1vw,28px)/1.5 Bellefair}.nt-about dl{grid-column:2;margin:0}.nt-about dt{font-weight:600;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#8f7440;margin-top:18px}.nt-about dd{margin:2px 0 0}
.nt-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 50% 100%,var(--velvet),var(--night) 60%)}.nt-end h2{margin:0 auto}
.nt footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
@media(max-width:900px){.nt nav{gap:12px;font-size:11px}.nt-hero,.nt-list,.nt-about,.nt-svc li{grid-template-columns:1fr}.nt-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="nt-hero" aria-labelledby="h"><span class="nt-dust" aria-hidden="true">' + Array.from({ length: 18 }, (_, i) => '<i style="--x:' + ((i * 53) % 100) + "%;--t:" + (9 + (i % 6) * 2) + "s;--d:-" + ((i * 1.7) % 12).toFixed(1) + 's"></i>').join("") + '</span><div><span class="nt-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Request a viewing") + '</div><div class="nt-watch" aria-hidden="true"><span class="nt-crown"></span><span class="nt-case"></span><span class="nt-dial"></span><span class="nt-ticks"></span><span class="nt-moon"></span><span class="nt-sub"></span><span class="nt-hand" style="--w:8px;--h:26%;--r:300deg"></span><span class="nt-hand" style="--w:5px;--h:36%;--r:52deg"></span><span class="nt-hand nt-sec" style="--w:2px;--h:40%;--r:0deg"></span><span class="nt-pin"></span></div></section>',
  work: (k) => { const c = ["#1f3c88", "#0d0d10", "#d9d4c8"]; return '<section class="nt-pieces" id="work"><h2>' + k.h("work", "Pieces") + '</h2><div class="nt-list">' + k.c.cards.map((x, i) => '<article class="nt-p">' + (k.photo(i) || '<span class="nt-mini" aria-hidden="true" style="--c:' + c[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="nt-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="nt-about" id="about"><h2>' + k.h("about", "At the bench") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="nt-end" id="contact"><h2>' + k.h("contact", "Some things are worth the wait.") + '</h2>' + k.cta("Request a viewing") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

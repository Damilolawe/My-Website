export default {
  id: "obsidian",
  root: "dk",
  fonts: "family=Cormorant+Upright:wght@400;600;700&family=Figtree:wght@300;400;600",
  labels: { work: "Films", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Ines Duarte", headline: "Out of the dark, an image.", heroLabel: "Cinematographer",
    bio: "I shoot feature films, documentaries and music videos, mostly on film, mostly at night. Warm light, deep shadow and a camera that stays close to the people in front of it.",
    cards: [
      { title: "Salt and Ember", description: "Feature, shot on 35mm in a fishing village over thirty nights." },
      { title: "The Night Ferry", description: "Documentary following a crossing that runs until dawn." },
      { title: "Velvet Hours", description: "A music video lit only by candles and car headlights." },
    ],
    services: [
      { title: "Features", description: "Director of photography for drama." },
      { title: "Documentary", description: "Small crews, long shoots." },
      { title: "Music videos", description: "Bold looks on short schedules." },
    ],
  },
  css: `
.dk{--black:#0a0605;--red:#c41e1e;--safe:#ff3b2f;--warm:#e8b48a;--paper:#f2e8dc;--mute:#8d726a;background:var(--black);color:var(--paper);font:300 17px/1.8 Figtree,system-ui,sans-serif}
.dk header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.dk .brand{font:600 24px/1 "Cormorant Upright";text-decoration:none}
.dk nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:400;font-size:14px;letter-spacing:.14em;text-transform:uppercase}.dk nav a{text-decoration:none;color:var(--mute)}.dk nav a:hover,.dk nav a[aria-current]{color:var(--safe)}
.dk-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(50% 60% at 50% 0,rgba(196,30,30,.45),transparent 70%);overflow:hidden}
.dk-bulb{position:absolute;left:50%;top:-30px;width:60px;height:60px;margin-left:-30px;border-radius:50%;background:radial-gradient(circle,#ff7a6e,var(--red));box-shadow:0 0 60px 30px rgba(196,30,30,.5);animation:dk-glow 4s ease-in-out infinite alternate}@keyframes dk-glow{to{box-shadow:0 0 90px 50px rgba(196,30,30,.4)}}
.dk-label{font-weight:400;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--safe)}
.dk h1{margin-top:16px;font:600 clamp(56px,8.4vw,142px)/.95 "Cormorant Upright";letter-spacing:-.01em}
.dk h1 .ch{animation:dk-dev 3s ease both;animation-delay:calc(var(--i) * 60ms)}@keyframes dk-dev{0%{opacity:0;color:var(--red)}40%{opacity:.6;color:var(--safe)}100%{opacity:1}}
.dk-hero p{margin-top:24px;max-width:42ch;color:#d4c2b3}
.dk .cta{display:inline-flex;margin-top:30px;padding:14px 28px;border:1px solid var(--safe);color:var(--safe);font-weight:400;font-size:13px;letter-spacing:.24em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}.dk .cta:hover{background:var(--safe);color:var(--black)}.dk .cta-muted{border-color:#3a2420;color:var(--mute)}
.dk-room{position:relative;aspect-ratio:1.1}
.dk-line{position:absolute;left:0;right:0;top:8%;height:2px;background:#4a2a24}
.dk-print{position:absolute;top:calc(8% + 6px);left:var(--x);width:var(--w);aspect-ratio:.8;padding:8px;background:#efe3d3;box-shadow:0 20px 30px -16px #000;transform-origin:50% 0;animation:dk-sway 5s ease-in-out infinite alternate;animation-delay:var(--d)}
.dk-print:before{content:"";position:absolute;left:50%;top:-14px;width:12px;height:22px;margin-left:-6px;border-radius:2px;background:#8b5e3c}
.dk-print i{display:block;width:100%;height:100%;background:var(--g);animation:dk-appear 4s ease both;animation-delay:calc(var(--d) + .4s)}
@keyframes dk-appear{from{filter:brightness(3) contrast(.2) sepia(1)}}
@keyframes dk-sway{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}
.dk-tray{position:absolute;left:8%;right:8%;bottom:0;height:26%;border-radius:8px;background:linear-gradient(#2a1310,#1a0a08);box-shadow:inset 0 6px 14px rgba(0,0,0,.8),0 0 0 3px #3a1a16}
.dk-tray:before{content:"";position:absolute;inset:10%;border-radius:6px;background:repeating-radial-gradient(ellipse at 40% 50%,rgba(255,59,47,.25) 0 6px,transparent 6px 16px);animation:dk-ripple 3s linear infinite}
@keyframes dk-ripple{to{background-size:120% 120%;background-position:-10% -10%}}
.dk-tray:after{content:"";position:absolute;left:28%;top:20%;width:44%;height:60%;background:#e7d6c2;opacity:.25;transform:rotate(-4deg);animation:dk-float 4s ease-in-out infinite alternate}@keyframes dk-float{to{transform:rotate(2deg) translateY(4px);opacity:.45}}
.dk h2{font:600 clamp(44px,6.4vw,104px)/1 "Cormorant Upright";max-width:14ch}
.dk-films{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.dk-list{display:grid;gap:clamp(40px,6vw,80px);margin-top:clamp(40px,6vw,70px)}
.dk-f{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:clamp(24px,4vw,60px);align-items:center}
.dk-f:nth-child(even){grid-template-columns:minmax(0,1fr) minmax(0,1.5fr)}.dk-f:nth-child(even) .dk-frame{order:2}
.dk-frame{display:block;aspect-ratio:2.39;background:var(--g);box-shadow:0 0 0 1px #2a1a16}
.dk-f img{width:100%;aspect-ratio:2.39;object-fit:cover}
@supports (animation-timeline:view()){.dk-frame,.dk-f img{animation:dk-rev linear both;animation-timeline:view();animation-range:entry 0% cover 40%}@keyframes dk-rev{from{filter:brightness(.1) sepia(1) hue-rotate(-30deg)}}}
.dk-f small{font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--safe)}
.dk-f h3{margin-top:6px;font:600 32px/1.1 "Cormorant Upright"}.dk-f p{margin-top:8px;color:#bfa999}
.dk-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#160b09}
.dk-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.dk-svc li{padding:30px;border-top:1px solid var(--red)}
.dk-svc h3{font:600 28px "Cormorant Upright";color:var(--warm)}.dk-svc p{margin-top:8px;color:#bfa999}
.dk-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper);color:var(--black);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.dk-about>p{font:400 clamp(22px,2.2vw,30px)/1.45 "Cormorant Upright"}.dk-about dl{grid-column:2;margin:0}.dk-about dt{font-weight:600;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--red);margin-top:18px}.dk-about dd{margin:2px 0 0}
.dk-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 50% 0,rgba(196,30,30,.4),transparent 60%)}.dk-end h2{margin:0 auto}
.dk footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
@media(max-width:900px){.dk nav{gap:12px;font-size:12px}.dk-hero,.dk-f,.dk-f:nth-child(even),.dk-svc ul,.dk-about{grid-template-columns:1fr}.dk-f:nth-child(even) .dk-frame{order:0}.dk-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const P = [["4%", "28%", "radial-gradient(circle at 60% 40%,#f2c79b 0 18%,#5a2a1e 60%,#1a0a08)", ".4s"], ["36%", "28%", "linear-gradient(180deg,#2a1814 0 50%,#c98a5c 50% 54%,#1a0f0c 54%)", "1.2s"], ["68%", "28%", "radial-gradient(circle at 30% 70%,#ffd6a8 0 10%,#7a3a24 40%,#140806)", "2s"]]; return '<section class="dk-hero" aria-labelledby="h"><span class="dk-bulb" aria-hidden="true"></span><div><span class="dk-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Contact") + '</div><div class="dk-room" aria-hidden="true"><span class="dk-line"></span>' + P.map(p => '<span class="dk-print" style="--x:' + p[0] + ";--w:" + p[1] + ";--g:" + p[2] + ";--d:" + p[3] + '"><i></i></span>').join("") + '<span class="dk-tray"></span></div></section>'; },
  work: (k) => { const g = ["linear-gradient(180deg,#2a1814 0 50%,#c98a5c 50% 54%,#1a0f0c 54%)", "radial-gradient(ellipse at 70% 60%,#f2c79b 0 8%,#4a1f18 40%,#0e0605)", "radial-gradient(circle at 30% 50%,#ffd6a8 0 6%,transparent 7%),radial-gradient(circle at 70% 50%,#ffd6a8 0 6%,transparent 7%),#180a07"]; const t = ["Feature", "Documentary", "Music video"]; return '<section class="dk-films" id="work"><h2>Films</h2><div class="dk-list">' + k.c.cards.map((x, i) => '<article class="dk-f">' + (k.photo(i) || '<span class="dk-frame" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<div><small>" + t[i % 3] + "</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="dk-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="dk-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="dk-end" id="contact"><h2>Let us find the light together.</h2>' + k.cta("Contact") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

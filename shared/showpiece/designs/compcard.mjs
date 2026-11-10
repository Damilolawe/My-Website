export default {
  id: "portraiture",
  root: "pt",
  fonts: "family=Prata&family=Mukta:wght@400;500;700",
  labels: { work: "Portfolio", services: "Bookings", about: "Details", contact: "Book" },
  demo: {
    name: "Leila Morgan", headline: "Every side of the story.", heroLabel: "Model and actor",
    bio: "Editorial, commercial and runway work across London, Paris and Lagos. Comfortable in front of a camera, a crowd or a rehearsal room, and always on time for call.",
    cards: [
      { title: "Spring campaign", description: "A linen collection shot on a Lisbon rooftop at sunrise." },
      { title: "Runway, Paris", description: "Six shows in four days during fashion week." },
      { title: "A perfume film", description: "A sixty-second film, shot in one long take." },
    ],
    services: [
      { title: "Editorial", description: "Magazines and lookbooks." },
      { title: "Commercial", description: "Campaigns, catalogues and film." },
      { title: "Runway", description: "Shows and presentations." },
    ],
  },
  css: `
.pt{--bone:#f1ece4;--ink:#1a1714;--rose:#d9a7a0;--clay:#a8624d;--mute:#7c7066;--white:#fffdf9;background:var(--bone);color:var(--ink);font:400 17px/1.7 Mukta,system-ui,sans-serif}
.pt header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.pt .brand{font:400 24px/1 Prata;text-decoration:none}
.pt nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;letter-spacing:.12em;text-transform:uppercase;font-size:13px}.pt nav a{text-decoration:none}.pt nav a:hover{color:var(--clay)}
.pt-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.pt-label{font-weight:500;letter-spacing:.24em;text-transform:uppercase;font-size:13px;color:var(--clay)}
.pt h1{margin-top:14px;font:400 clamp(54px,8vw,132px)/1 Prata;letter-spacing:-.02em}
.pt h1 .ch{animation:pt-in 1s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes pt-in{from{opacity:0;filter:blur(6px)}}
.pt-hero p{margin-top:22px;max-width:44ch;color:#4a4039}
.pt .cta{display:inline-flex;margin-top:28px;padding:14px 28px;border:1px solid var(--ink);font-weight:500;letter-spacing:.16em;text-transform:uppercase;font-size:13px;text-decoration:none;transition:background .2s,color .2s}.pt .cta:hover{background:var(--ink);color:var(--bone)}.pt .cta-muted{border-color:#cfc5b8;color:var(--mute)}
.pt-card{display:grid;grid-template-columns:1.2fr 1fr;gap:10px;padding:14px;background:var(--white);box-shadow:0 30px 60px -36px rgba(0,0,0,.4);transform:rotate(-1.5deg)}
.pt-main{position:relative;aspect-ratio:.72;overflow:hidden;background:#d8cfc3}
.pt-angle{position:absolute;inset:0;display:grid;place-items:end center;opacity:0;animation:pt-cycle 8s ease-in-out infinite;animation-delay:var(--d)}
@keyframes pt-cycle{0%,4%{opacity:0}8%,25%{opacity:1}29%,100%{opacity:0}}
.pt-sil{width:62%;aspect-ratio:.55;border-radius:50% 50% 10% 10%/30% 30% 10% 10%;background:var(--c);position:relative;transform:scaleX(var(--sx))}
.pt-sil:before{content:"";position:absolute;left:50%;top:-38%;width:56%;aspect-ratio:.8;margin-left:-28%;border-radius:50%;background:var(--c);transform:translateX(var(--tx))}
.pt-tag{position:absolute;left:10px;top:10px;padding:2px 8px;background:var(--white);font:500 11px Mukta;letter-spacing:.2em;text-transform:uppercase}
.pt-side{display:grid;grid-template-rows:1fr 1fr auto;gap:10px}
.pt-thumb{background:var(--g)}
.pt-stats{padding:12px 4px 4px;font-size:13px;line-height:1.8}
.pt-stats b{display:block;font:400 20px Prata;margin-bottom:4px}
.pt-stats span{display:flex;justify-content:space-between;border-bottom:1px solid #e4dccf}
.pt h2{font:400 clamp(44px,6.4vw,104px)/1 Prata;letter-spacing:-.015em;max-width:14ch}
.pt-port{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--bone)}
.pt-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.pt-p{position:relative}
.pt-frame{display:block;aspect-ratio:.75;background:var(--g);transition:transform .5s}.pt-p:hover .pt-frame,.pt-p:hover img{transform:scale(.97)}
.pt-p img{width:100%;aspect-ratio:.75;object-fit:cover;transition:transform .5s}
.pt-p h3{margin-top:16px;font:400 24px/1.2 Prata}.pt-p p{margin-top:6px;color:#bfb4a8}
.pt-book{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.pt-book ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.pt-book li{padding:30px;background:var(--white);border-top:3px solid var(--clay)}
.pt-book h3{font:400 26px Prata}.pt-book p{margin-top:8px;color:#5a4f46}
.pt-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--rose);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.pt-about>p{font-size:clamp(19px,1.8vw,24px)}.pt-about dl{grid-column:2;margin:0}.pt-about dt{font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:13px;margin-top:18px}.pt-about dd{margin:2px 0 0}
.pt-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.pt-end h2{margin:0 auto}
.pt footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
@media(max-width:900px){.pt nav{gap:12px;font-size:11px}.pt-hero,.pt-list,.pt-book ul,.pt-about{grid-template-columns:1fr}.pt-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.pt-angle:first-child{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const A = [["Front", "1", "0%", "0s"], ["Three quarter", ".85", "8%", "2s"], ["Profile", ".6", "18%", "4s"], ["Back", "1", "0%", "6s"]]; return '<section class="pt-hero" aria-labelledby="h"><div><span class="pt-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book") + '</div><div class="pt-card" aria-hidden="true"><div class="pt-main">' + A.map((a, i) => '<span class="pt-angle" style="--d:' + a[3] + '"><span class="pt-sil" style="--c:' + (i === 3 ? "#4a3a30" : "#6b4c3b") + ";--sx:" + a[1] + ";--tx:" + a[2] + '"></span><span class="pt-tag">' + a[0] + "</span></span>").join("") + '</div><div class="pt-side"><span class="pt-thumb" style="--g:linear-gradient(160deg,#d9a7a0,#a8624d)"></span><span class="pt-thumb" style="--g:linear-gradient(160deg,#cfc5b8,#7c7066)"></span><div class="pt-stats"><b>' + k.E(k.c.name) + "</b><span>Height<em>178 cm</em></span><span>Hair<em>Black</em></span><span>Eyes<em>Brown</em></span><span>Based<em>London</em></span></div></div></div></section>"; },
  work: (k) => { const g = ["linear-gradient(170deg,#e6c9b5,#a8624d)", "linear-gradient(170deg,#3b3330,#8b7a6e)", "linear-gradient(170deg,#d9a7a0,#5a3a40)"]; return '<section class="pt-port" id="work"><h2>Portfolio</h2><div class="pt-list">' + k.c.cards.map((x, i) => '<article class="pt-p">' + (k.photo(i) || '<span class="pt-frame" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="pt-book" id="services"><h2>Bookings</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="pt-about" id="about"><h2>Details</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="pt-end" id="contact"><h2>Available for your next shoot.</h2>' + k.cta("Book") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

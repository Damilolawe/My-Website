export default {
  id: "couture",
  root: "cn",
  fonts: "family=Cormorant+SC:wght@400;600&family=Montserrat:wght@300;400;600",
  labels: { work: "Stories", services: "Services", about: "About", contact: "Work with me" },
  demo: {
    name: "Camille Rousseau", headline: "Notes on how we dress.", heroLabel: "Fashion editor and stylist",
    bio: "Fifteen years writing about clothes for magazines in Paris and London, and styling the shoots that went with them. Now independent: editorials, lookbooks and the occasional wardrobe rescue.",
    cards: [
      { title: "The return of the trench", description: "A twelve-page story on one coat, shot in rain on the Seine." },
      { title: "Lookbook for a knitwear label", description: "Forty looks, one farmhouse, a lot of wool." },
      { title: "The capsule wardrobe, revisited", description: "A column that became a small book." },
    ],
    services: [
      { title: "Editorial styling", description: "Magazine shoots and covers." },
      { title: "Lookbooks", description: "Concept, casting and styling." },
      { title: "Personal wardrobe", description: "Edit, shop and style, privately." },
    ],
  },
  css: `
.cn{--cream:#f6efe3;--paper:#fffaf2;--ink:#1d1a17;--blush:#e7c4b8;--sage:#9aa58c;--rule:#d8cbb6;--mute:#867a6b;background:var(--cream);color:var(--ink);font:300 16px/1.85 Montserrat,system-ui,sans-serif}
.cn header{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px clamp(18px,4vw,56px);border-bottom:1px solid var(--rule)}
.cn .brand{grid-column:2;font:400 28px/1 "Cormorant SC";letter-spacing:.2em;text-decoration:none}
.cn nav{grid-column:3;justify-self:end;display:flex;gap:clamp(14px,2.4vw,26px);font-weight:400;font-size:12px;letter-spacing:.2em;text-transform:uppercase}.cn nav a{text-decoration:none}.cn nav a:hover{color:var(--mute)}
.cn-issue{display:flex;justify-content:space-between;padding:10px clamp(18px,4vw,56px);font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--mute);border-bottom:1px solid var(--rule)}
.cn-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.cn-label{font-weight:400;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--mute)}
.cn h1{margin-top:18px;font:400 clamp(58px,8.8vw,148px)/.92 "Cormorant SC";letter-spacing:-.01em}
.cn h1 .ch{animation:cn-in 1.6s ease both;animation-delay:calc(var(--i) * 40ms)}@keyframes cn-in{from{opacity:0;letter-spacing:.2em}}
.cn-hero p{margin-top:24px;max-width:44ch;color:#4a443c}
.cn .cta{display:inline-flex;margin-top:30px;padding-bottom:6px;border-bottom:1px solid var(--ink);font-weight:400;font-size:12px;letter-spacing:.3em;text-transform:uppercase;text-decoration:none;transition:padding .3s}.cn .cta:hover{padding-left:12px}.cn .cta-muted{border-color:var(--rule);color:var(--mute)}
.cn-sheet{position:relative;justify-self:center;width:min(100%,380px);aspect-ratio:.72;background:var(--paper);box-shadow:0 30px 50px -36px rgba(0,0,0,.4);transform:rotate(2deg)}
.cn-sheet:before{content:"";position:absolute;left:10%;top:-12px;width:80px;height:26px;background:rgba(231,196,184,.7);transform:rotate(-6deg)}
.cn-sheet svg{position:absolute;inset:6% 10%;width:80%;height:88%;overflow:visible}
.cn-sheet path{fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1400;stroke-dashoffset:1400;animation:cn-draw 4.5s ease forwards;animation-delay:var(--d)}
@keyframes cn-draw{to{stroke-dashoffset:0}}
.cn-wash{position:absolute;left:24%;top:34%;width:52%;height:52%;border-radius:40% 60% 30% 70%/50% 40% 60% 50%;background:var(--blush);opacity:0;mix-blend-mode:multiply;animation:cn-wash 2s ease 3.4s forwards}
@keyframes cn-wash{to{opacity:.65}}
.cn-note{position:absolute;right:-6%;bottom:12%;padding:8px 12px;background:#fff;font:italic 400 15px "Cormorant SC";transform:rotate(-4deg);box-shadow:0 8px 16px -8px rgba(0,0,0,.3)}
.cn-swatch{position:absolute;left:-8%;bottom:20%;width:70px;height:70px;background:repeating-linear-gradient(45deg,var(--sage) 0 3px,#b9c2ad 3px 6px);clip-path:polygon(0 6%,10% 0,20% 6%,30% 0,40% 6%,50% 0,60% 6%,70% 0,80% 6%,90% 0,100% 6%,100% 100%,0 100%);transform:rotate(-8deg)}
.cn h2{font:400 clamp(44px,6.4vw,104px)/1 "Cormorant SC";max-width:14ch}
.cn-stories{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper)}
.cn-list{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:clamp(20px,3vw,40px);margin-top:clamp(40px,6vw,70px)}
.cn-s{border-top:1px solid var(--ink);padding-top:18px}
.cn-s small{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--mute)}
.cn-plate{display:block;aspect-ratio:.8;margin:16px 0;background:var(--g)}
.cn-s img{width:100%;aspect-ratio:.8;object-fit:cover;margin:16px 0}
.cn-s h3{font:400 28px/1.15 "Cormorant SC"}.cn-s p{margin-top:8px;color:#5a5249}
.cn-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.cn-svc ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:clamp(36px,5vw,56px);counter-reset:n}
.cn-svc li{counter-increment:n;text-align:center}.cn-svc li:before{content:counter(n,lower-roman);display:block;font:400 40px "Cormorant SC";color:var(--sage)}
.cn-svc h3{font:400 26px "Cormorant SC"}.cn-svc p{margin-top:6px;color:#5a5249}
.cn-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.cn-about>p{font:400 clamp(22px,2.2vw,30px)/1.45 "Cormorant SC"}.cn-about dl{grid-column:2;margin:0}.cn-about dt{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--blush);margin-top:18px}.cn-about dd{margin:4px 0 0}
.cn-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.cn-end h2{margin:0 auto}
.cn footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);border-top:1px solid var(--rule)}
@media(max-width:900px){.cn header{grid-template-columns:1fr;gap:10px;justify-items:center}.cn .brand,.cn nav{grid-column:auto;justify-self:center}.cn-hero,.cn-list,.cn-svc ol,.cn-about{grid-template-columns:1fr}.cn-about dl{grid-column:auto}.cn-note,.cn-swatch{display:none}}
@media (prefers-reduced-motion:reduce){.cn-wash{opacity:.65}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + '</nav></header><div class="cn-issue" aria-hidden="true"><span>Notes</span><span>Autumn edition</span><span>No. 14</span></div>',
  hero: (k) => '<section class="cn-hero" aria-labelledby="h"><div><span class="cn-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Work with me") + '</div><div class="cn-sheet" aria-hidden="true"><span class="cn-wash"></span><svg viewBox="0 0 200 300"><path style="--d:.2s" d="M100 20 C92 20 88 28 90 36 C92 44 108 44 110 36 C112 28 108 20 100 20 M96 44 L94 56 M104 44 L106 56"/><path style="--d:.8s" d="M94 56 C78 60 70 66 66 80 L60 120 C70 124 80 120 84 112 L86 96 C88 110 86 124 82 136 C70 170 52 230 40 280 C80 290 120 290 160 280 C148 230 130 170 118 136 C114 124 112 110 114 96 L116 112 C120 120 130 124 140 120 L134 80 C130 66 122 60 106 56"/><path style="--d:2.2s" d="M82 136 C94 140 106 140 118 136 M70 200 C90 208 110 208 130 200 M58 250 C86 258 114 258 142 250"/><path style="--d:3s" d="M90 290 L88 300 M110 290 L112 300"/></svg><span class="cn-swatch"></span><span class="cn-note">Wool crepe, bias cut</span></div></section>',
  work: (k) => { const g = ["linear-gradient(180deg,#d9c6ad,#a88f6f)", "linear-gradient(180deg,#e7c4b8,#c99a8c)", "linear-gradient(180deg,#c9d0bf,#8f9a81)"]; const t = ["Feature", "Lookbook", "Column"]; return '<section class="cn-stories" id="work"><h2>Recent stories</h2><div class="cn-list">' + k.c.cards.map((x, i) => '<article class="cn-s"><small>' + t[i % 3] + "</small>" + (k.photo(i) || '<span class="cn-plate" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="cn-svc" id="services"><h2>Services</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="cn-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="cn-end" id="contact"><h2>Shall we talk about clothes?</h2>' + k.cta("Work with me") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "signaldeck",
  root: "sd",
  fonts: "family=Bai+Jamjuree:wght@400;600;700&family=Ubuntu+Mono:wght@400;700",
  labels: { work: "Projects", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Noah Fischer", headline: "Built for the keyboard.", heroLabel: "Product engineer",
    bio: "I build fast tools for people who live in them all day: editors, dashboards and command palettes where every action is one shortcut away. Eight years at product startups, now freelance.",
    cards: [
      { title: "A command palette for a CRM", description: "Search, jump and act from one box. Daily use doubled in a month." },
      { title: "Offline-first notes app", description: "Syncs when it can, works when it cannot. 40,000 users." },
      { title: "Keyboard-only admin panel", description: "A support team that never touches the mouse." },
    ],
    services: [
      { title: "Product engineering", description: "Front to back, from prototype to launch." },
      { title: "Performance passes", description: "Make the slow screen feel instant." },
      { title: "Design systems in code", description: "Components your team will actually reuse." },
    ],
  },
  css: `
.sd{--bg:#0d0e12;--plate:#16181f;--key:#23262f;--keytop:#2d313c;--accent:#ff7a45;--violet:#9b8cff;--text:#e9eaf2;--mute:#7b7f92;background:var(--bg);color:var(--text);font:400 17px/1.65 "Bai Jamjuree",system-ui,sans-serif}
.sd header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.sd .brand{font:700 20px/1 "Bai Jamjuree";text-decoration:none}
.sd nav{display:flex;gap:clamp(12px,2vw,24px);font-weight:600;font-size:15px}.sd nav a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--mute)}.sd nav a:hover,.sd nav a[aria-current]{color:var(--text)}
.sd-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.sd-label{font:700 14px "Ubuntu Mono";letter-spacing:.06em;color:var(--accent)}
.sd h1{margin-top:12px;font:700 clamp(52px,7.8vw,130px)/.94 "Bai Jamjuree";letter-spacing:-.03em}
.sd h1 .ch{animation:sd-in .4s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes sd-in{from{opacity:0;transform:translateY(.12em)}}
.sd-hero p{margin-top:22px;max-width:44ch;color:#b9bccd}
.sd .cta{display:inline-flex;align-items:center;gap:12px;margin-top:28px;padding:14px 22px;border-radius:10px;background:var(--text);color:var(--bg);font-weight:700;text-decoration:none;transition:background .2s}.sd .cta:after{content:"Enter";padding:2px 8px;border-radius:5px;background:var(--bg);color:var(--text);font:700 12px "Ubuntu Mono"}.sd .cta:hover{background:var(--accent)}.sd .cta-muted{background:var(--plate);color:var(--mute)}.sd .cta-muted:after{display:none}
.sd-pal{position:relative;margin-bottom:18px;padding:14px;border-radius:14px;background:var(--plate);border:1px solid #262a35;box-shadow:0 30px 50px -30px #000}
.sd-search{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--bg);font:400 16px "Ubuntu Mono";color:var(--mute)}
.sd-search b{color:var(--text);font-weight:400;overflow:hidden;white-space:nowrap;width:0;animation:sd-type 1.6s steps(15) .6s forwards}
@keyframes sd-type{to{width:15ch}}
.sd-search:after{content:"";width:2px;height:18px;background:var(--accent);animation:sd-caret 1s steps(1) infinite}@keyframes sd-caret{50%{opacity:0}}
.sd-opt{display:flex;justify-content:space-between;padding:9px 12px;margin-top:6px;border-radius:8px;font-size:15px;color:#b9bccd}
.sd-opt.on{background:rgba(155,140,255,.18);color:var(--text);animation:sd-pick .3s ease 2.4s both}@keyframes sd-pick{from{background:transparent}}
.sd-opt kbd{font:400 13px "Ubuntu Mono";color:var(--mute)}
.sd-board{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;padding:14px;border-radius:16px;background:var(--plate);border:1px solid #262a35}
.sd-k{aspect-ratio:1;border-radius:8px;background:linear-gradient(var(--keytop),var(--key));box-shadow:0 4px 0 #0a0b0e,inset 0 1px 0 rgba(255,255,255,.06);display:grid;place-items:center;font:700 13px "Ubuntu Mono";color:var(--mute);animation:sd-press 4s ease infinite;animation-delay:var(--d)}
.sd-k.w2{grid-column:span 2;aspect-ratio:auto}.sd-k.w4{grid-column:span 4;aspect-ratio:auto}
.sd-k.hot{color:var(--accent)}
@keyframes sd-press{0%,6%,100%{transform:none;box-shadow:0 4px 0 #0a0b0e,inset 0 1px 0 rgba(255,255,255,.06)}3%{transform:translateY(3px);box-shadow:0 1px 0 #0a0b0e;background:linear-gradient(var(--violet),#6d5ee0);color:#fff}}
.sd h2{font:700 clamp(42px,6vw,98px)/.96 "Bai Jamjuree";letter-spacing:-.03em;max-width:14ch}
.sd-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sd-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(40px,6vw,70px)}
.sd-p{padding:24px;border-radius:16px;background:var(--plate);border:1px solid #262a35;transition:border-color .2s,transform .2s}.sd-p:hover{border-color:var(--violet);transform:translateY(-4px)}
.sd-p kbd{display:inline-block;padding:3px 9px;border-radius:6px;background:var(--key);box-shadow:0 3px 0 #0a0b0e;font:700 13px "Ubuntu Mono";color:var(--accent)}
.sd-p img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:10px;margin:16px 0}
.sd-p h3{margin-top:14px;font:700 22px/1.2 "Bai Jamjuree"}.sd-p p{margin-top:8px;color:#a9adc0}
.sd-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.sd-svc ul{margin-top:clamp(36px,5vw,56px)}
.sd-svc li{display:grid;grid-template-columns:80px minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:center;padding:20px 0;border-top:1px solid #23262f}
.sd-svc li:before{content:attr(data-k);justify-self:start;padding:6px 10px;border-radius:7px;background:var(--key);box-shadow:0 3px 0 #0a0b0e;font:700 14px "Ubuntu Mono";color:var(--violet)}
.sd-svc h3{font:700 22px "Bai Jamjuree"}.sd-svc p{color:#b9bccd}
.sd-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--violet);color:var(--bg);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sd-about>p{font-size:clamp(19px,1.8vw,24px)}.sd-about dl{grid-column:2;margin:0}.sd-about dt{font:700 14px "Ubuntu Mono";text-transform:uppercase;margin-top:18px}.sd-about dd{margin:2px 0 0}
.sd-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.sd-end h2{margin:0 auto}
.sd footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Ubuntu Mono";color:var(--mute);border-top:1px solid #1b1e26}
@media(max-width:900px){.sd nav{gap:10px;font-size:13px}.sd-hero,.sd-list,.sd-about{grid-template-columns:1fr}.sd-svc li{grid-template-columns:60px 1fr}.sd-svc li p{grid-column:2}.sd-about dl{grid-column:auto}.sd-k{font-size:10px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const rows = ["QWERTYUIOP", "ASDFGHJKL;", "ZXCVBNM,./"]; const hot = { K: 2.2, C: 0.6, M: 1.0, D: 1.4 }; let i = 0; const keys = rows.map(r => [...r].map(ch => '<span class="sd-k' + (hot[ch] ? " hot" : "") + '" style="--d:' + (hot[ch] !== undefined ? hot[ch] : 1 + (i++ % 17) * 0.23).toFixed(2) + 's">' + ch + "</span>").join("")).join("") + '<span class="sd-k w2" style="--d:3.1s">Cmd</span><span class="sd-k w4" style="--d:2.7s"></span><span class="sd-k w2" style="--d:3.4s">Opt</span><span class="sd-k w2 hot" style="--d:2.4s">Enter</span>'; return '<section class="sd-hero" aria-labelledby="h"><div><span class="sd-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a project") + '</div><div aria-hidden="true"><div class="sd-pal"><div class="sd-search">&gt; <b>start a project</b></div><div class="sd-opt on">Start a project<kbd>Cmd K</kbd></div><div class="sd-opt">See projects<kbd>G P</kbd></div><div class="sd-opt">Read about me<kbd>G A</kbd></div></div><div class="sd-board">' + keys + "</div></div></section>"; },
  work: (k) => { const s = ["Cmd K", "Cmd S", "G A"]; return '<section class="sd-proj" id="work"><h2>' + k.h("work", "Projects") + '</h2><div class="sd-list">' + k.c.cards.map((x, i) => '<article class="sd-p"><kbd>' + s[i % 3] + "</kbd>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => { const s = ["1", "2", "3"]; return '<section class="sd-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map((x, i) => '<li data-k="Cmd ' + s[i] + '"><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="sd-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sd-end" id="contact"><h2>' + k.h("contact", "Press Enter to begin.") + '</h2>' + k.cta("Start a project") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "atlas",
  root: "at",
  fonts: "family=Sofia+Sans:wght@400;600;800;900&family=Sofia+Sans+Condensed:wght@600;800",
  labels: { work: "Case studies", services: "Skills", about: "About", contact: "Contact" },
  demo: {
    name: "Priya Raman", headline: "Every stop, one route.", heroLabel: "Data analyst and researcher",
    bio: "Nine years turning messy data into decisions: transport planning, public health and now climate. I build the models, then explain them so everyone in the room can act on them.",
    cards: [
      { title: "Bus routes, redrawn", description: "A city network re-planned from ticket data. Journey times fell by 11 percent." },
      { title: "Clinic waiting times", description: "A forecasting model that helped three hospitals plan winter staffing." },
      { title: "Flood risk map", description: "Open data, rainfall records and a map every resident can search." },
    ],
    services: [
      { title: "Analysis", description: "SQL, Python and plain-English findings." },
      { title: "Forecasting", description: "Models you can trust and explain." },
      { title: "Dashboards", description: "Live numbers for teams who need them daily." },
    ],
  },
  css: `
.at{--paper:#fbfbf8;--ink:#141821;--l1:#e3242b;--l2:#0098d4;--l3:#00a86b;--l4:#f39c12;--l5:#8e44ad;--grey:#d6d6d0;--mute:#5d6470;background:var(--paper);color:var(--ink);font:400 17px/1.65 "Sofia Sans",system-ui,sans-serif}
.at header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--ink);color:var(--paper)}
.at .brand{display:flex;align-items:center;gap:10px;font:900 20px/1 "Sofia Sans";text-decoration:none}.at .brand:before{content:"";width:24px;height:24px;border-radius:50%;border:5px solid var(--l1);box-shadow:inset 0 0 0 3px var(--paper)}
.at nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.at nav a{text-decoration:none}.at nav a:hover{color:var(--l4)}
.at-hero{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.at-label{font:800 14px "Sofia Sans Condensed";letter-spacing:.14em;text-transform:uppercase;color:var(--l2)}
.at h1{margin-top:12px;font:900 clamp(56px,8.4vw,140px)/.9 "Sofia Sans";letter-spacing:-.04em}
.at h1 .ch{animation:at-in .5s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes at-in{from{opacity:0;transform:translateY(.2em)}}
.at-hero p{margin-top:22px;max-width:42ch;color:#3c4350}
.at .cta{display:inline-flex;margin-top:26px;padding:14px 26px;border-radius:999px;background:var(--ink);color:var(--paper);font:800 16px "Sofia Sans";text-decoration:none;transition:background .2s}.at .cta:hover{background:var(--l1)}.at .cta-muted{background:var(--grey);color:var(--mute)}
.at-map{position:relative;aspect-ratio:1.25;border-radius:20px;background:#fff;box-shadow:0 0 0 1px var(--grey),0 30px 50px -36px rgba(0,0,0,.35);overflow:hidden}
.at-map svg{position:absolute;inset:0;width:100%;height:100%}
.at-map .ln{fill:none;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:900;stroke-dashoffset:900;animation:at-draw 2.2s cubic-bezier(.5,0,.3,1) forwards;animation-delay:var(--d)}
@keyframes at-draw{to{stroke-dashoffset:0}}
.at-map .st{fill:#fff;stroke:var(--ink);stroke-width:4;opacity:0;animation:at-st .3s ease forwards;animation-delay:var(--d)}
.at-map .ix{fill:#fff;stroke:var(--ink);stroke-width:5}
@keyframes at-st{to{opacity:1}}
.at-map text{font:800 13px "Sofia Sans Condensed";fill:var(--ink);opacity:0;animation:at-st .3s ease forwards;animation-delay:var(--d)}
.at-train{fill:var(--ink);offset-rotate:auto}
.at-key{position:absolute;left:14px;bottom:14px;display:grid;gap:4px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.92);font:800 12px "Sofia Sans Condensed";text-transform:uppercase;letter-spacing:.06em}
.at-key span{display:flex;align-items:center;gap:8px}.at-key span:before{content:"";width:22px;height:6px;border-radius:3px;background:var(--c)}
.at h2{font:900 clamp(44px,6.4vw,104px)/.92 "Sofia Sans";letter-spacing:-.04em;max-width:14ch}
.at-cases{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#f0f0ea}
.at-list{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px);padding-top:40px}
.at-list:before{content:"";position:absolute;left:0;right:0;top:12px;height:10px;border-radius:5px;background:var(--l2)}
.at-c{position:relative;padding:26px;border-radius:18px;background:#fff}
.at-c:before{content:"";position:absolute;left:26px;top:-40px;width:26px;height:26px;border-radius:50%;background:#fff;border:6px solid var(--ink)}
.at-c small{font:800 13px "Sofia Sans Condensed";letter-spacing:.1em;text-transform:uppercase;color:var(--l2)}
.at-c img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin:12px 0}
.at-c h3{margin-top:8px;font:800 24px/1.15 "Sofia Sans"}.at-c p{margin-top:8px;color:#4a515d}
.at-skills{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.at-skills ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.at-skills li{padding:26px;border-radius:18px;border-left:10px solid var(--c);background:#fff;box-shadow:0 0 0 1px var(--grey)}
.at-skills h3{font:800 24px "Sofia Sans"}.at-skills p{margin-top:6px;color:#4a515d}
.at-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(30px,6vw,90px)}.at-about>p{font-size:clamp(19px,1.8vw,24px)}
.at-line{grid-column:2;position:relative;margin:0;padding-left:34px}.at-line:before{content:"";position:absolute;left:8px;top:6px;bottom:6px;width:6px;border-radius:3px;background:var(--l3)}
.at-line div{position:relative;padding:10px 0}.at-line div:before{content:"";position:absolute;left:-34px;top:14px;width:22px;height:22px;border-radius:50%;background:var(--paper);border:5px solid var(--ink);box-shadow:0 0 0 3px var(--l3)}
.at-line dt{font:800 15px "Sofia Sans Condensed";letter-spacing:.1em;text-transform:uppercase;color:var(--l4)}.at-line dd{margin:2px 0 0}
.at-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.at-end h2{margin:0 auto}
.at footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--ink);color:var(--grey)}
@media(max-width:900px){.at nav{gap:12px;font-size:14px}.at-hero,.at-list,.at-skills ul,.at-about{grid-template-columns:1fr}.at-list:before{display:none}.at-c:before{display:none}.at-line{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const L = [["var(--l1)", "M40 260 H180 L240 200 H460", ".2s"], ["var(--l2)", "M240 40 V200 L300 260 V360", ".7s"], ["var(--l3)", "M60 80 L180 200 H240 L360 80 H460", "1.2s"], ["var(--l4)", "M100 360 L240 200", "1.7s"]]; const S = [[40, 260, "School", "1.6s"], [240, 200, "First job", "2.2s", 1], [460, 200, "Today", "2.6s"], [240, 40, "Degree", "2.2s"], [300, 360, "Research", "2.8s"], [60, 80, "Transport", "3s"], [460, 80, "Climate", "3.2s"], [100, 360, "Health", "3.4s"]]; return '<section class="at-hero" aria-labelledby="h"><div><span class="at-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Get in touch") + '</div><div class="at-map" aria-hidden="true"><svg viewBox="0 0 500 400">' + L.map(l => '<path class="ln" style="stroke:' + l[0] + ";--d:" + l[2] + '" d="' + l[1] + '"/>').join("") + S.map(s => '<circle class="' + (s[4] ? "ix" : "st") + '" style="--d:' + s[3] + '" cx="' + s[0] + '" cy="' + s[1] + '" r="' + (s[4] ? 14 : 9) + '"/><text style="--d:' + s[3] + '" x="' + (s[0] + (s[0] > 400 ? -18 : 16)) + '" y="' + (s[1] - 14) + '"' + (s[0] > 400 ? ' text-anchor="end"' : "") + ">" + s[2] + "</text>").join("") + '</svg><div class="at-key"><span style="--c:var(--l1)">Career</span><span style="--c:var(--l2)">Education</span><span style="--c:var(--l3)">Projects</span></div></div></section>'; },
  work: (k) => '<section class="at-cases" id="work"><h2>Case studies</h2><div class="at-list">' + k.c.cards.map((x, i) => '<article class="at-c"><small>Stop ' + (i + 1) + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => { const c = ["var(--l1)", "var(--l3)", "var(--l5)"]; return '<section class="at-skills" id="services"><h2>Skills</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li style="--c:' + c[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="at-about" id="about"><h2>The route so far</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? '<dl class="at-line">' + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="at-end" id="contact"><h2>Next stop: your project.</h2>' + k.cta("Get in touch") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

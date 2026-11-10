export default {
  id: "md-uber",
  root: "nr",
  fonts: "family=Wix+Madefor+Display:wght@600;800&family=Wix+Madefor+Text:wght@400;600",
  labels: { work: "Rides", services: "Fares", about: "About", contact: "Book a ride" },
  demo: {
    name: "Night Owl Cabs", headline: "Home safe, any hour.", heroLabel: "A local taxi company, running all night",
    bio: "Licensed local drivers, fixed fares agreed before you get in, and a dispatcher who answers the phone at 3am. Book online, by phone or from the rank outside the station.",
    cards: [
      { title: "Station to anywhere in town", description: "Fixed fare, no surge, cars waiting for the last train." },
      { title: "Airport runs", description: "Booked in advance, flight tracked, bags carried." },
      { title: "School and hospital runs", description: "The same trusted driver every week." },
    ],
    services: [
      { title: "Town fare", description: "Fixed price within the ring road." },
      { title: "Airport", description: "One price each way, meet and greet included." },
      { title: "Account", description: "Monthly billing for businesses and care homes." },
    ],
  },
  css: `
.nr{--black:#0a0a0a;--road:#1a1a1c;--line:#2a2a2e;--yellow:#ffd60a;--white:#f6f6f4;--mute:#9a9aa0;background:var(--black);color:var(--white);font:400 17px/1.65 "Wix Madefor Text",system-ui,sans-serif}
.nr header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.nr .brand{display:flex;align-items:center;gap:10px;font:800 22px/1 "Wix Madefor Display";text-decoration:none}.nr .brand:before{content:"";width:28px;height:16px;border-radius:4px;background:repeating-linear-gradient(90deg,var(--black) 0 4px,var(--yellow) 4px 8px);box-shadow:0 0 0 2px var(--yellow)}
.nr nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.nr nav a{text-decoration:none;color:var(--mute)}.nr nav a:hover,.nr nav a[aria-current]{color:var(--yellow)}
.nr-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.nr-label{font-weight:600;color:var(--yellow)}
.nr h1{margin-top:14px;font:800 clamp(54px,8vw,132px)/.95 "Wix Madefor Display";letter-spacing:-.04em}
.nr h1 .ch{animation:nr-in .5s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes nr-in{from{opacity:0;color:var(--yellow)}}
.nr-hero p{margin-top:22px;max-width:44ch;color:#c4c4c8}
.nr-book{display:grid;gap:10px;margin-top:28px;max-width:420px;padding:18px;border-radius:18px;background:var(--road)}
.nr-book span{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;background:var(--line);color:var(--mute);font-size:15px}
.nr-book span:before{content:"";width:10px;height:10px;border-radius:50%;background:var(--white)}.nr-book span:nth-child(2):before{border-radius:2px;background:var(--yellow)}
.nr .cta{display:inline-flex;justify-content:center;padding:15px 24px;border-radius:10px;background:var(--yellow);color:var(--black);font:800 16px "Wix Madefor Display";text-decoration:none;transition:filter .2s}.nr .cta:hover{filter:brightness(.9)}.nr .cta-muted{background:var(--line);color:var(--mute);font:400 14px "Wix Madefor Text"}
.nr-map{position:relative;aspect-ratio:1.1;border-radius:26px;overflow:hidden;background:linear-gradient(var(--line) 2px,transparent 2px) 0 0/70px 70px,linear-gradient(90deg,var(--line) 2px,transparent 2px) 0 0/70px 70px,var(--road)}
.nr-map:before{content:"";position:absolute;left:-10%;top:58%;width:130%;height:26px;background:#232327;transform:rotate(-18deg)}
.nr-map:after{content:"";position:absolute;left:62%;top:-10%;width:22px;height:130%;background:#232327;transform:rotate(12deg)}
.nr-blk{position:absolute;border-radius:6px;background:#141416}
.nr-route{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.nr-route path{fill:none;stroke:var(--yellow);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1000;stroke-dashoffset:1000;animation:nr-draw 2.4s ease .8s forwards}
@keyframes nr-draw{to{stroke-dashoffset:0}}
.nr-car{position:absolute;z-index:3;width:22px;height:22px;margin:-11px;border-radius:50%;background:var(--yellow);animation:nr-ping 1.6s ease-out infinite}
@keyframes nr-ping{0%{box-shadow:0 0 0 0 rgba(255,214,10,.6)}100%{box-shadow:0 0 0 22px rgba(255,214,10,0)}}
.nr-pin{position:absolute;z-index:3;width:26px;height:26px;margin:-26px 0 0 -13px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--white)}
.nr-eta{position:absolute;z-index:4;right:18px;bottom:18px;padding:14px 18px;border-radius:14px;background:var(--white);color:var(--black);font-weight:600;font-size:14px}.nr-eta b{display:block;font:800 30px "Wix Madefor Display"}
.nr h2{font:800 clamp(42px,6vw,98px)/.98 "Wix Madefor Display";letter-spacing:-.04em;max-width:14ch}
.nr-rides{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.nr-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.nr-r{padding:28px;border-radius:22px;background:var(--road);transition:background .25s}.nr-r:hover{background:#26261f}
.nr-r small{display:inline-block;padding:4px 10px;border-radius:999px;background:var(--yellow);color:var(--black);font-weight:600}
.nr-r img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin-top:16px}
.nr-r h3{margin-top:16px;font:800 24px/1.15 "Wix Madefor Display"}.nr-r p{margin-top:8px;color:#b0b0b6}
.nr-fares{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.nr-fares table{width:100%;margin-top:clamp(36px,5vw,56px);border-collapse:collapse}
.nr-fares th,.nr-fares td{padding:22px 0;border-bottom:1px solid var(--line);text-align:left}.nr-fares th{font:800 24px "Wix Madefor Display";width:40%}.nr-fares td{color:#c4c4c8}
.nr-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow);color:var(--black);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.nr-about>p{font-size:clamp(19px,1.8vw,24px)}.nr-about dl{grid-column:2;margin:0}.nr-about dt{font:800 18px "Wix Madefor Display";margin-top:16px}.nr-about dd{margin:2px 0 0}
.nr-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.nr-end h2{margin:0 auto 30px}
.nr footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.nr nav{gap:12px;font-size:14px}.nr-hero,.nr-list,.nr-about{grid-template-columns:1fr}.nr-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const b = [[6, 6, 22, 30], [34, 4, 20, 20], [70, 8, 24, 26], [8, 46, 26, 14], [40, 30, 18, 22], [74, 46, 20, 18], [10, 74, 24, 20], [44, 70, 14, 24], [72, 74, 22, 20]]; return '<section class="nr-hero" aria-labelledby="h"><div><span class="nr-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + '</p><div class="nr-book"><span aria-hidden="true">Central Station</span><span aria-hidden="true">Home</span>' + k.cta("Book a ride") + '</div></div><div class="nr-map" aria-hidden="true">' + b.map(r => '<span class="nr-blk" style="left:' + r[0] + "%;top:" + r[1] + "%;width:" + r[2] + "%;height:" + r[3] + '%"></span>').join("") + '<svg class="nr-route" viewBox="0 0 440 400" preserveAspectRatio="none"><path d="M60 380 L60 300 L200 260 L240 140 L400 110"/></svg><span class="nr-pin" style="left:91%;top:27.5%"></span><span class="nr-car" style="left:13.6%;top:95%"></span><div class="nr-eta">Arriving in<b>4 min</b></div></div></section>'; },
  work: (k) => { const t = ["Fixed fare", "Pre-booked", "Regular"]; return '<section class="nr-rides" id="work"><h2>' + k.h("work", "Where we take people") + '</h2><div class="nr-list">' + k.c.cards.map((x, i) => '<article class="nr-r"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="nr-fares" id="services"><h2>' + k.h("services", "Fares") + '</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="nr-about" id="about"><h2>' + k.h("about", "Local drivers, all night") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="nr-end" id="contact"><h2>' + k.h("contact", "Where to tonight?") + '</h2>' + k.cta("Book a ride") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

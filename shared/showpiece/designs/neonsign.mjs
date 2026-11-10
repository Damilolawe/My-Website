export default {
  id: "afterhours",
  root: "ah",
  fonts: "family=Monoton&family=Be+Vietnam+Pro:wght@400;600;800",
  labels: { work: "Sets", services: "Bookings", about: "About", contact: "Book a set" },
  demo: {
    name: "DJ Nova Reyes", headline: "Open late.", heroLabel: "DJ and producer",
    bio: "Disco, house and the records your parents danced to, mixed until the lights come up. Resident on Fridays at a basement club, available for weddings, launches and long nights.",
    cards: [
      { title: "Friday residency", description: "Four years, every Friday, from midnight until close." },
      { title: "Rooftop sunset sessions", description: "Summer Sundays, slow disco as the city lights up." },
      { title: "A wedding until 3am", description: "First dance to last call, with a horn section for the encore." },
    ],
    services: [
      { title: "Club nights", description: "Two to six hour sets, all vinyl or digital." },
      { title: "Weddings", description: "Ceremony, dinner and dance floor." },
      { title: "Brand events", description: "Launches, openings and after-parties." },
    ],
  },
  css: `
.ah{--night:#08060d;--plum:#1a0f24;--pink:#ff3fa4;--cyan:#3ff3ff;--amber:#ffb13b;--white:#f6f0ff;--mute:#9a8fb0;background:var(--night);color:var(--white);font:400 17px/1.7 "Be Vietnam Pro",system-ui,sans-serif}
.ah header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.ah .brand{font:800 18px/1 "Be Vietnam Pro";letter-spacing:.14em;text-transform:uppercase;text-decoration:none}
.ah nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.ah nav a{text-decoration:none;color:var(--mute)}.ah nav a:hover,.ah nav a[aria-current]{color:var(--pink)}
.ah-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(60% 70% at 25% 40%,#2a0f3a,transparent 70%),radial-gradient(40% 50% at 85% 60%,#0d2a3a,transparent 70%);overflow:hidden}
.ah-wall{position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(0deg,transparent 0 38px,rgba(255,255,255,.03) 38px 40px),repeating-linear-gradient(90deg,transparent 0 78px,rgba(255,255,255,.03) 78px 80px)}
.ah-label{font-weight:600;letter-spacing:.2em;text-transform:uppercase;font-size:13px;color:var(--amber)}
.ah h1{margin-top:18px;font:400 clamp(60px,9vw,156px)/1.05 Monoton;color:var(--pink);text-shadow:0 0 6px #fff,0 0 18px var(--pink),0 0 40px var(--pink),0 0 80px var(--pink)}
.ah h1 .ch{animation:ah-buzz 3s steps(1) both;animation-delay:calc(var(--i) * 70ms)}
@keyframes ah-buzz{0%{opacity:.08;text-shadow:none}8%{opacity:1}10%{opacity:.2;text-shadow:none}14%{opacity:1}18%{opacity:.4;text-shadow:none}22%,100%{opacity:1}}
.ah h1 .w:nth-child(2) .ch:nth-child(3){animation:ah-buzz 3s steps(1) both,ah-faulty 5s steps(1) 4s infinite}
@keyframes ah-faulty{0%,90%,94%,100%{opacity:1}92%{opacity:.25;text-shadow:none}}
.ah-hero p{margin-top:24px;max-width:44ch;color:#cbbfdf}
.ah .cta{display:inline-flex;margin-top:28px;padding:15px 28px;border:2px solid var(--cyan);border-radius:999px;color:var(--cyan);font-weight:800;text-transform:uppercase;letter-spacing:.12em;font-size:14px;text-decoration:none;box-shadow:0 0 18px rgba(63,243,255,.5),inset 0 0 18px rgba(63,243,255,.3);transition:background .2s,color .2s}.ah .cta:hover{background:var(--cyan);color:var(--night)}.ah .cta-muted{border-color:#3a3050;color:var(--mute);box-shadow:none}
.ah-deck{position:relative;justify-self:center;width:min(100%,420px);aspect-ratio:1.1;padding:22px;border-radius:20px;background:linear-gradient(#25202e,#16121c);box-shadow:0 0 0 2px #2e2838,0 40px 60px -30px #000}
.ah-plat{position:absolute;left:8%;top:10%;width:66%;aspect-ratio:1;border-radius:50%;background:#0c0b10;box-shadow:inset 0 0 0 6px #1d1a24}
.ah-rec{position:absolute;inset:6%;border-radius:50%;background:radial-gradient(circle,var(--pink) 0 15%,#111 16% 17%,transparent 18%),repeating-radial-gradient(circle,#141217 0 2px,#1d1b21 2px 4px);animation:ah-spin 1.8s linear infinite}
.ah-rec:after{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 30deg,transparent 0 10%,rgba(255,255,255,.12) 14%,transparent 20% 60%,rgba(255,255,255,.08) 64%,transparent 70%)}
@keyframes ah-spin{to{transform:rotate(360deg)}}
.ah-arm{position:absolute;right:14%;top:12%;width:8px;height:56%;border-radius:4px;background:linear-gradient(#ccc,#888);transform-origin:50% 0;transform:rotate(24deg)}
.ah-arm:after{content:"";position:absolute;left:-6px;bottom:-6px;width:20px;height:26px;border-radius:4px;background:#ddd}
.ah-fader{position:absolute;right:8%;bottom:10%;display:flex;gap:10px;height:40%}
.ah-fader i{position:relative;width:6px;border-radius:3px;background:#0c0b10}.ah-fader i:after{content:"";position:absolute;left:-8px;width:22px;height:12px;border-radius:3px;background:var(--cyan);box-shadow:0 0 10px var(--cyan);animation:ah-fade var(--t) ease-in-out infinite alternate}
@keyframes ah-fade{from{top:10%}to{top:80%}}
.ah-eq{position:absolute;left:8%;bottom:8%;display:flex;gap:4px;align-items:end;height:16%}.ah-eq b{width:8px;height:var(--h);background:linear-gradient(var(--pink),var(--amber));animation:ah-eq .4s ease-in-out infinite alternate;animation-delay:var(--d)}@keyframes ah-eq{from{transform:scaleY(.3)}}
.ah-eq b{transform-origin:bottom}
.ah h2{font:400 clamp(38px,5.4vw,90px)/1.1 Monoton;color:var(--cyan);text-shadow:0 0 14px rgba(63,243,255,.6);max-width:14ch}
.ah-sets{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--plum)}
.ah-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.ah-s{padding:26px;border-radius:20px;background:#120a1a;border:1px solid #2e1f3c;transition:box-shadow .3s,border-color .3s}.ah-s:hover{border-color:var(--pink);box-shadow:0 0 40px rgba(255,63,164,.25)}
.ah-s small{font-weight:800;letter-spacing:.14em;text-transform:uppercase;font-size:12px;color:var(--amber)}
.ah-s img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;margin:14px 0}
.ah-s h3{margin-top:10px;font:800 24px/1.2 "Be Vietnam Pro"}.ah-s p{margin-top:8px;color:#cbbfdf}
.ah-book{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ah-book ul{margin-top:clamp(36px,5vw,56px)}
.ah-book li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;padding:24px 0;border-top:1px solid #2e1f3c}
.ah-book h3{font:800 24px "Be Vietnam Pro";color:var(--pink)}.ah-book p{color:#cbbfdf}
.ah-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:linear-gradient(135deg,#2a0f3a,#0d2a3a);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ah-about>p{font-size:clamp(19px,1.8vw,24px)}.ah-about dl{grid-column:2;margin:0}.ah-about dt{font-weight:800;color:var(--amber);margin-top:16px}.ah-about dd{margin:2px 0 0;color:#e2d8f2}
.ah-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ah-end h2{margin:0 auto;color:var(--pink);text-shadow:0 0 14px rgba(255,63,164,.7)}
.ah footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;color:var(--mute);border-top:1px solid #1c1426}
@media(max-width:900px){.ah nav{gap:12px;font-size:14px}.ah-hero,.ah-list,.ah-about,.ah-book li{grid-template-columns:1fr}.ah-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ah-hero" aria-labelledby="h"><span class="ah-wall" aria-hidden="true"></span><div><span class="ah-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a set") + '</div><div class="ah-deck" aria-hidden="true"><span class="ah-plat"><span class="ah-rec"></span></span><span class="ah-arm"></span><span class="ah-fader"><i style="--t:2.2s"></i><i style="--t:3.1s"></i><i style="--t:1.7s"></i></span><span class="ah-eq">' + [60, 90, 40, 75, 100, 55, 80].map((h, i) => '<b style="--h:' + h + "%;--d:-" + (i * 0.13).toFixed(2) + 's"></b>').join("") + "</span></div></section>",
  work: (k) => { const t = ["Fridays", "Sundays", "One night only"]; return '<section class="ah-sets" id="work"><h2>' + k.h("work", "Recent sets") + '</h2><div class="ah-list">' + k.c.cards.map((x, i) => '<article class="ah-s"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ah-book" id="services"><h2>' + k.h("services", "Bookings") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ah-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ah-end" id="contact"><h2>' + k.h("contact", "Last call.") + '</h2>' + k.cta("Book a set") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

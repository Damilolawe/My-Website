export default {
  id: "arcade",
  root: "ar",
  fonts: "family=Russo+One&family=Saira+Semi+Condensed:wght@400;600;800",
  labels: { work: "Events", services: "Services", about: "About", contact: "Book me" },
  demo: {
    name: "Zara Kim", headline: "Every match, a main event.", heroLabel: "Esports host and caster",
    bio: "Seven years calling tournaments, from community cups to arena finals with 40,000 people watching live. I bring the energy, the stats and the calm when the stream goes down.",
    cards: [
      { title: "World finals, main stage", description: "Lead caster for a three-day final watched by 2 million people." },
      { title: "University league", description: "Weekly broadcasts for 64 teams, with a student crew I trained." },
      { title: "Charity marathon", description: "36 hours live, 90,000 raised for a children's hospital." },
    ],
    services: [
      { title: "Casting", description: "Play-by-play and colour commentary." },
      { title: "Hosting", description: "Desk shows, interviews and stage." },
      { title: "Broadcast consulting", description: "Run-of-show, graphics and talent coaching." },
    ],
  },
  css: `
@property --view{syntax:"<integer>";initial-value:0;inherits:false}
.ar{--bg:#07070d;--panel:#11111c;--magenta:#ff2e93;--cyan:#21e6ff;--lime:#c6ff3d;--white:#f3f4ff;--mute:#8c8fae;background:var(--bg);color:var(--white);font:400 17px/1.6 "Saira Semi Condensed",system-ui,sans-serif}
.ar header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:linear-gradient(90deg,var(--magenta),#7b2dff);clip-path:polygon(0 0,100% 0,100% 80%,98% 100%,0 100%)}
.ar .brand{font:400 20px/1 "Russo One";text-transform:uppercase;text-decoration:none}
.ar nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:800;text-transform:uppercase;letter-spacing:.06em}.ar nav a{text-decoration:none}.ar nav a:hover{color:var(--lime)}
.ar-hero{position:relative;padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden}
.ar-screen{position:relative;min-height:clamp(480px,48vw,620px);border-radius:16px;padding:clamp(24px,3vw,44px);background:radial-gradient(70% 80% at 70% 30%,#2b0f4d,transparent 70%),radial-gradient(60% 70% at 20% 90%,#0b3550,transparent 70%),var(--panel);overflow:hidden;display:grid;align-content:end}
.ar-screen:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.03) 0 2px,transparent 2px 4px);pointer-events:none}
.ar-live{position:absolute;left:clamp(24px,3vw,44px);top:clamp(20px,2.4vw,30px);display:flex;gap:8px;align-items:center}
.ar-live b{padding:4px 10px;background:#ff2238;font:400 13px "Russo One";letter-spacing:.06em;animation:ar-pulse 1.2s ease-in-out infinite alternate}@keyframes ar-pulse{to{opacity:.6}}
.ar-live span{padding:4px 10px;background:rgba(0,0,0,.5);font-weight:800;counter-reset:v var(--view);animation:ar-count 4s ease-out .4s both;--view:48210}.ar-live span:before{content:counter(v) " watching"}
@keyframes ar-count{from{--view:12000}}
.ar-score{position:absolute;left:50%;top:clamp(20px,2.4vw,30px);translate:-50% 0;display:flex;align-items:stretch;font:400 18px "Russo One";clip-path:polygon(4% 0,96% 0,100% 100%,0 100%)}
.ar-score span{padding:8px 18px;background:var(--c);color:var(--t,var(--white))}.ar-score i{font-style:normal;padding:8px 14px;background:#000;color:var(--lime)}
.ar-feed{position:absolute;right:clamp(24px,3vw,44px);top:clamp(64px,7vw,90px);display:grid;gap:6px;justify-items:end}
.ar-feed span{padding:6px 12px;background:rgba(0,0,0,.6);border-right:4px solid var(--c);font-weight:600;font-size:14px;animation:ar-kill 6s ease both infinite;animation-delay:var(--d);opacity:0}
@keyframes ar-kill{0%{opacity:0;transform:translateX(40px)}6%,70%{opacity:1;transform:none}80%,100%{opacity:0}}
.ar-label{display:inline-block;padding:4px 12px;background:var(--lime);color:var(--bg);font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:14px;width:max-content}
.ar h1{margin-top:12px;font:400 clamp(48px,7.6vw,128px)/.92 "Russo One";text-transform:uppercase}
.ar h1 .ch{display:inline-block;animation:ar-in .35s cubic-bezier(.2,1.4,.4,1) both;animation-delay:calc(var(--i) * 25ms)}@keyframes ar-in{from{opacity:0;transform:skewX(-20deg) translateX(-.5em)}}
.ar-lower{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;margin-top:18px}
.ar-lower p{max-width:52ch;color:#c4c6e2}
.ar .cta{display:inline-flex;padding:16px 28px;background:var(--cyan);color:var(--bg);font:400 16px "Russo One";text-transform:uppercase;text-decoration:none;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);transition:background .2s}.ar .cta:hover{background:var(--lime)}.ar .cta-muted{background:var(--panel);color:var(--mute);font:600 15px "Saira Semi Condensed"}
.ar h2{font:400 clamp(40px,5.6vw,92px)/.95 "Russo One";text-transform:uppercase;max-width:14ch}
.ar-events{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ar-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.ar-e{position:relative;padding:26px;background:var(--panel);border:1px solid #23233a;clip-path:polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,0 100%);transition:border-color .2s}.ar-e:hover{border-color:var(--magenta)}
.ar-e small{font:800 13px "Saira Semi Condensed";letter-spacing:.12em;text-transform:uppercase;color:var(--magenta)}
.ar-e img{width:100%;aspect-ratio:16/9;object-fit:cover;margin:14px 0}
.ar-e h3{margin-top:8px;font:800 24px/1.15 "Saira Semi Condensed";text-transform:uppercase}.ar-e p{margin-top:8px;color:#b6b8d4}
.ar-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:linear-gradient(135deg,#1a0b33,#07202e)}
.ar-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ar-svc li{padding:28px;background:rgba(0,0,0,.35);border-top:4px solid var(--c)}
.ar-svc h3{font:400 22px "Russo One";text-transform:uppercase}.ar-svc p{margin-top:8px;color:#c4c6e2}
.ar-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ar-about>p{font-size:clamp(19px,1.8vw,24px);color:#d6d8f0}.ar-about dl{grid-column:2;margin:0}.ar-about dt{font:400 16px "Russo One";text-transform:uppercase;color:var(--cyan);margin-top:16px}.ar-about dd{margin:2px 0 0;color:#c4c6e2}
.ar-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:linear-gradient(90deg,var(--magenta),#7b2dff)}.ar-end h2{margin:0 auto 30px}.ar-end .cta{background:var(--bg);color:var(--lime)}
.ar footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute)}
@media(max-width:900px){.ar nav{gap:12px;font-size:13px}.ar-list,.ar-svc ul,.ar-about,.ar-lower{grid-template-columns:1fr}.ar-about dl{grid-column:auto}.ar-feed,.ar-score{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const F = [["Nova takes the objective", "var(--cyan)", ".6s"], ["Team Rift wins round 12", "var(--magenta)", "1.6s"], ["Match point", "var(--lime)", "2.6s"]]; return '<section class="ar-hero" aria-labelledby="h"><div class="ar-screen"><div class="ar-live" aria-hidden="true"><b>Live</b><span></span></div><div class="ar-score" aria-hidden="true"><span style="--c:var(--magenta)">RFT</span><i>12 : 11</i><span style="--c:var(--cyan);--t:var(--bg)">NVA</span></div><div class="ar-feed" aria-hidden="true">' + F.map(f => '<span style="--c:' + f[1] + ";--d:" + f[2] + '">' + f[0] + "</span>").join("") + '</div><span class="ar-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="ar-lower"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Book me") + "</div></div></section>"; },
  work: (k) => { const t = ["Arena", "League", "Marathon"]; return '<section class="ar-events" id="work"><h2>' + k.h("work", "On the mic") + '</h2><div class="ar-list">' + k.c.cards.map((x, i) => '<article class="ar-e"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => { const c = ["var(--magenta)", "var(--cyan)", "var(--lime)"]; return '<section class="ar-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li style="--c:' + c[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="ar-about" id="about"><h2>' + k.h("about", "Player profile") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ar-end" id="contact"><h2>' + k.h("contact", "Ready? Go live.") + '</h2>' + k.cta("Book me") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

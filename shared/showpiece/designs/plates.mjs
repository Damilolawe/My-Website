export default {
  id: "md-minimax",
  root: "pc",
  fonts: "family=Bebas+Neue&family=Inter+Tight:wght@400;600;800",
  labels: { work: "Classes", services: "Membership", about: "The gym", contact: "Join" },
  demo: {
    name: "Plate Club", headline: "Lift heavy. Feel light.", heroLabel: "Strength gym and coaching",
    bio: "Twelve racks, real chalk and coaches who write your program around your week. Beginners welcome: everyone here once lifted the empty bar for the first time.",
    cards: [
      { title: "Barbell basics", description: "Six weeks to learn the squat, bench and deadlift safely." },
      { title: "Strong over fifty", description: "Slower tempo, mobility work and lots of good conversation." },
      { title: "Competition team", description: "Program, coaching and a team bus to every meet." },
    ],
    services: [
      { title: "Open gym", description: "6am to 10pm, every day." },
      { title: "Coached", description: "Three coached sessions a week and a written program." },
      { title: "One to one", description: "Personal coaching, booked by the hour." },
    ],
  },
  css: `
.pc{--black:#0d0d0d;--chalk:#f4f1ea;--red:#e3242b;--blue:#1f5fe0;--yellow:#ffd21f;--green:#26a65b;--steel:#9aa0a6;background:var(--chalk);color:var(--black);font:400 17px/1.65 "Inter Tight",system-ui,sans-serif}
.pc header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);background:var(--black);color:var(--chalk)}
.pc .brand{font:400 30px/1 "Bebas Neue";letter-spacing:.04em;text-decoration:none}
.pc nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:800;text-transform:uppercase;font-size:14px;letter-spacing:.06em}.pc nav a{text-decoration:none}.pc nav a:hover{color:var(--yellow)}
.pc-hero{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);background:var(--black);color:var(--chalk);overflow:hidden}
.pc-top{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:clamp(30px,5vw,70px);align-items:end}
.pc-label{font-weight:800;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--yellow)}
.pc h1{margin-top:12px;font:400 clamp(74px,12vw,210px)/.84 "Bebas Neue";letter-spacing:.005em}
.pc h1 .ch{display:inline-block;animation:pc-lift .7s cubic-bezier(.5,0,.2,1.4) both;animation-delay:calc(var(--i) * 30ms)}@keyframes pc-lift{from{opacity:0;transform:translateY(.5em) scaleY(.6)}}
.pc-top p{color:#c9c6bf;font-size:clamp(18px,1.5vw,20px)}
.pc .cta{display:inline-flex;margin-top:24px;padding:16px 30px;background:var(--red);color:var(--chalk);font:400 24px/1 "Bebas Neue";letter-spacing:.06em;text-decoration:none;transition:background .2s}.pc .cta:hover{background:var(--yellow);color:var(--black)}.pc .cta-muted{background:#222;color:#aaa;font:400 15px "Inter Tight";letter-spacing:0}
.pc-bar{position:relative;display:flex;align-items:center;justify-content:center;height:clamp(150px,16vw,220px);margin-top:clamp(40px,6vw,70px);animation:pc-press 3.6s cubic-bezier(.6,0,.3,1) 2.6s infinite}
.pc-bar:before{content:"";position:absolute;left:0;right:0;top:50%;height:14px;margin-top:-7px;border-radius:4px;background:linear-gradient(var(--steel),#5f646a);background-size:100% 100%}
.pc-side{position:relative;height:100%;display:flex;align-items:center;gap:6px;flex:1}.pc-side:last-child{flex-direction:row-reverse}
.pc-side:first-child{justify-content:flex-start;padding-left:4%}.pc-side:last-child{justify-content:flex-start;padding-right:4%}
.pc-side i{width:var(--w);height:var(--h);border-radius:8px;background:var(--c);box-shadow:inset 0 0 0 4px rgba(0,0,0,.2);animation:pc-load .45s cubic-bezier(.3,1.5,.5,1) both;animation-delay:var(--d)}
.pc-side:first-child i{--from:-120vw}.pc-side:last-child i{--from:120vw}
@keyframes pc-load{from{transform:translateX(var(--from))}}
.pc-collar{width:24px;height:46px;border-radius:5px;background:var(--steel);z-index:1}
.pc-mid{flex:0 0 30%}
@keyframes pc-press{0%,100%{transform:none}40%,55%{transform:translateY(-22px)}}
.pc-kg{position:absolute;left:50%;bottom:-6px;translate:-50% 100%;font:400 clamp(24px,2.6vw,34px) "Bebas Neue";letter-spacing:.06em;color:var(--yellow)}
.pc h2{font:400 clamp(54px,8vw,140px)/.88 "Bebas Neue";max-width:12ch}
.pc-classes{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.pc-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:clamp(40px,6vw,70px)}
.pc-c{padding:30px;background:var(--black);color:var(--chalk);border-top:10px solid var(--c)}
.pc-c img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:16px;filter:grayscale(1) contrast(1.2)}
.pc-c h3{font:400 36px/1 "Bebas Neue";letter-spacing:.02em}.pc-c p{margin-top:10px;color:#c9c6bf}
.pc-mem{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.pc-mem ul{margin-top:clamp(36px,5vw,56px)}
.pc-mem li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:22px 0;border-top:4px solid var(--black)}
.pc-mem h3{font:400 46px/1 "Bebas Neue"}
.pc-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.pc-about>p{font-size:clamp(19px,1.8vw,24px)}.pc-about dl{grid-column:2;margin:0}.pc-about dt{font:400 26px "Bebas Neue";margin-top:16px}.pc-about dd{margin:2px 0 0}
.pc-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--red);color:var(--chalk)}.pc-end h2{margin:0 auto}.pc-end .cta{background:var(--black)}
.pc footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;background:var(--black);color:var(--chalk)}
@media(max-width:900px){.pc nav{gap:12px;font-size:12px}.pc-top,.pc-list,.pc-about,.pc-mem li{grid-template-columns:1fr}.pc-about dl{grid-column:auto}.pc-mid{flex-basis:12%}.pc-side i{width:calc(var(--w) * .6)}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const P = [["var(--red)", 34, 100], ["var(--blue)", 30, 88], ["var(--yellow)", 26, 74], ["var(--green)", 22, 60]]; const side = s => '<span class="pc-side">' + P.map((p, i) => '<i style="--c:' + p[0] + ";--w:" + p[1] + "px;--h:" + p[2] + "%;--d:" + (1 + i * 0.3 + s * 0.15).toFixed(2) + 's"></i>').join("") + '<span class="pc-collar"></span></span>'; return '<section class="pc-hero" aria-labelledby="h"><div class="pc-top"><div><span class="pc-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1></div><div><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a free session") + '</div></div><div class="pc-bar" aria-hidden="true">' + side(0) + '<span class="pc-mid"></span>' + side(1) + '<span class="pc-kg">180 kg</span></div></section>'; },
  work: (k) => { const c = ["var(--red)", "var(--blue)", "var(--yellow)"]; return '<section class="pc-classes" id="work"><h2>Classes</h2><div class="pc-list">' + k.c.cards.map((x, i) => '<article class="pc-c" style="--c:' + c[i % 3] + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="pc-mem" id="services"><h2>Membership</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="pc-about" id="about"><h2>Chalk on every hand</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="pc-end" id="contact"><h2>Your first session is free.</h2>' + k.cta("Book a free session") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

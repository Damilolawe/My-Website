export default {
  id: "md-opencode-ai",
  root: "ob",
  fonts: "family=Archivo+Narrow:wght@500;700&family=Sometype+Mono:wght@400;700",
  labels: { work: "Projects", services: "Membership", about: "The space", contact: "Join" },
  demo: {
    name: "Open Bench", headline: "Make it yourself.", heroLabel: "A community workshop and makerspace",
    bio: "Laser cutters, lathes, sewing machines and a wall of hand tools, shared by four hundred members. Take an induction, book a bench, and make the thing you have been thinking about.",
    cards: [
      { title: "A walnut dining table", description: "Built over six Saturdays by a member who had never used a plane." },
      { title: "Repair cafe", description: "Toasters, lamps and jackets fixed for free on the first Sunday of the month." },
      { title: "A kids' coding robot", description: "Laser-cut body, open plans, now in twelve local schools." },
    ],
    services: [
      { title: "Hobby", description: "Evenings and weekends, all tools after induction." },
      { title: "Full time", description: "Any hour, your own storage shelf." },
      { title: "Workshops", description: "Weekend classes, from welding to dressmaking." },
    ],
  },
  css: `
.ob{--board:#d9b58a;--hole:#8a6a45;--ply:#f1e4cf;--ink:#1f1a14;--orange:#ff6b1a;--blue:#2c6bd9;--steel:#9aa3ad;background:var(--ply);color:var(--ink);font:400 17px/1.65 "Sometype Mono",ui-monospace,monospace}
.ob header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--ink);color:var(--ply)}
.ob .brand{font:700 24px/1 "Archivo Narrow";text-transform:uppercase;letter-spacing:.04em;text-decoration:none}
.ob nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:15px}.ob nav a{text-decoration:none}.ob nav a:hover{color:var(--orange)}
.ob-hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.ob-label{font-size:14px;color:var(--orange)}
.ob h1{margin-top:12px;font:700 clamp(62px,9.6vw,164px)/.88 "Archivo Narrow";text-transform:uppercase;letter-spacing:-.01em}
.ob h1 .ch{display:inline-block;animation:ob-in .5s cubic-bezier(.3,1.4,.5,1) both;animation-delay:calc(var(--i) * 35ms)}@keyframes ob-in{from{opacity:0;transform:translateY(-.6em) rotate(-8deg)}}
.ob-hero p{margin-top:22px;max-width:46ch;font-size:16px}
.ob .cta{display:inline-flex;margin-top:26px;padding:14px 24px;background:var(--orange);color:var(--ink);font:700 18px "Archivo Narrow";text-transform:uppercase;letter-spacing:.06em;text-decoration:none;border:2px solid var(--ink);transition:background .2s}.ob .cta:hover{background:var(--blue);color:#fff}.ob .cta-muted{background:transparent;color:#6b5f50;font:400 14px "Sometype Mono";text-transform:none}
.ob-peg{position:relative;height:clamp(400px,38vw,520px);border-radius:6px;background:radial-gradient(circle,var(--hole) 3px,transparent 4px) 0 0/28px 28px,var(--board);box-shadow:inset 0 0 0 10px #c79e6e,0 30px 50px -30px rgba(0,0,0,.5);overflow:hidden}
.ob-t{position:absolute;left:var(--x);top:var(--y);transform-origin:50% 0;animation:ob-swing var(--s) ease-in-out infinite alternate;animation-delay:var(--d)}
.ob-t:before{content:"";position:absolute;left:50%;top:-14px;width:6px;height:18px;margin-left:-3px;border-radius:3px;background:#555}
@keyframes ob-swing{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
.ob-hammer{width:24px;height:150px;border-radius:6px;background:linear-gradient(90deg,#b5793f,#d49a5c)}.ob-hammer:after{content:"";position:absolute;left:-28px;top:-6px;width:80px;height:34px;border-radius:6px;background:var(--steel)}
.ob-wrench{width:20px;height:170px;border-radius:10px;background:var(--steel)}.ob-wrench:after{content:"";position:absolute;left:-16px;bottom:-26px;width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 50% 30%,var(--board) 30%,transparent 31%),var(--steel);clip-path:polygon(0 0,35% 0,35% 40%,65% 40%,65% 0,100% 0,100% 100%,0 100%)}
.ob-saw{width:200px;height:70px;background:linear-gradient(170deg,var(--steel) 0 62%,transparent 63%)}.ob-saw:after{content:"";position:absolute;right:-60px;top:-6px;width:70px;height:60px;border-radius:14px 30px 30px 14px;background:var(--orange);box-shadow:inset 22px 0 0 -10px var(--board)}
.ob-tape{width:96px;height:96px;border-radius:18px;background:#ffd23f;box-shadow:inset 0 0 0 10px #e3b71e}.ob-tape:after{content:"";position:absolute;left:50%;top:50%;width:34px;height:34px;margin:-17px;border-radius:50%;background:var(--ink)}
.ob-sd{width:20px;height:150px;border-radius:4px 4px 10px 10px;background:linear-gradient(var(--steel) 0 55%,var(--blue) 55%)}
.ob-note{position:absolute;right:22px;bottom:22px;padding:14px 16px;background:#fff8c4;font-size:13px;line-height:1.5;transform:rotate(3deg);box-shadow:0 10px 20px -12px rgba(0,0,0,.4)}
.ob h2{font:700 clamp(46px,6.6vw,108px)/.9 "Archivo Narrow";text-transform:uppercase;max-width:14ch}
.ob-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--ply)}
.ob-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.ob-p{padding:24px;border:2px solid #4a4036;border-radius:4px;position:relative}
.ob-p:before{content:attr(data-n);position:absolute;right:16px;top:12px;font-size:12px;color:var(--orange)}
.ob-p img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:16px}
.ob-p h3{font:700 26px/1.1 "Archivo Narrow";text-transform:uppercase}.ob-p p{margin-top:10px;font-size:15px;color:#cbbfae}
.ob-mem{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ob-mem ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ob-mem li{position:relative;padding:30px 26px 26px;background:#fff;border:2px solid var(--ink)}
.ob-mem li:before{content:"";position:absolute;left:50%;top:-12px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:var(--orange);border:2px solid var(--ink)}
.ob-mem h3{font:700 28px "Archivo Narrow";text-transform:uppercase}.ob-mem p{margin-top:8px;font-size:15px}
.ob-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--board);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ob-about>p{font-size:clamp(17px,1.5vw,20px)}.ob-about dl{grid-column:2;margin:0}.ob-about dt{font:700 20px "Archivo Narrow";text-transform:uppercase;margin-top:16px}.ob-about dd{margin:2px 0 0}
.ob-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--orange)}.ob-end h2{margin:0 auto}.ob-end .cta{background:var(--ink);color:var(--ply)}
.ob footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;background:var(--ink);color:var(--ply)}
@media(max-width:900px){.ob nav{gap:12px;font-size:13px}.ob-hero,.ob-list,.ob-mem ul,.ob-about{grid-template-columns:1fr}.ob-about dl{grid-column:auto}.ob-peg{height:380px}.ob-saw{width:130px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const t = (c, x, y, s, d) => '<span class="ob-t ' + c + '" style="--x:' + x + ";--y:" + y + ";--s:" + s + ";--d:" + d + '"></span>'; return '<section class="ob-hero" aria-labelledby="h"><div><span class="ob-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book an induction") + '</div><div class="ob-peg" aria-hidden="true">' + t("ob-hammer", "12%", "16%", "2.4s", "0s") + t("ob-wrench", "32%", "12%", "2s", "-.6s") + t("ob-sd", "46%", "18%", "2.8s", "-1s") + t("ob-saw", "56%", "14%", "3s", "-.3s") + t("ob-tape", "62%", "54%", "2.2s", "-1.4s") + '<span class="ob-note">Return tools<br>to their outline.<br>Thanks, the members</span></div></section>'; },
  work: (k) => '<section class="ob-proj" id="work"><h2>Made on our benches</h2><div class="ob-list">' + k.c.cards.map((x, i) => '<article class="ob-p" data-n="Bench ' + (i * 4 + 3) + '">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ob-mem" id="services"><h2>Membership</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ob-about" id="about"><h2>Shared tools, shared skills</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ob-end" id="contact"><h2>Your bench is waiting.</h2>' + k.cta("Book an induction") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

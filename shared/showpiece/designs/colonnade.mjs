export default {
  id: "md-oracle",
  root: "co",
  fonts: "family=Marcellus&family=Figtree:wght@400;600",
  labels: { work: "Projects", services: "Practice", about: "About", contact: "Contact" },
  intros: {
    work: { title: "Restorations", text: "Old buildings, made sound for another century." },
    features: { title: "The practice", text: "Survey, repair and the craft to do both properly." },
    studio: { title: "About Column One", text: null },
    contact: { title: "Contact", text: "Send a photograph and an address. We will arrange a survey." },
  },
  demo: {
    name: "Column One", headline: "Built to outlast us.", heroLabel: "Stone conservation and restoration",
    bio: "We repair historic stone buildings: churches, town halls, terraces and the occasional folly. Every repair is matched to the original stone, and recorded so the next mason knows what we did.",
    cards: [
      { title: "St Anne's west front", description: "Four hundred blocks surveyed, ninety replaced from the original quarry." },
      { title: "The market hall columns", description: "Six cast stone columns rebuilt without closing the Saturday market." },
      { title: "Harbour terrace", description: "Salt-damaged sandstone cleaned, consolidated and repointed in lime." },
    ],
    services: [
      { title: "Condition surveys", description: "Every stone assessed, mapped and photographed." },
      { title: "Repair and carving", description: "Matching stone, cut and carved in our workshop." },
      { title: "Long-term care", description: "Inspections every five years, so small problems stay small." },
    ],
  },
  css: `
.co{--marble:#f2eee6;--vein:#d9d2c3;--stone:#b9ad97;--ink:#2a2620;--terra:#a8492f;--gold:#b58b3a;background:var(--marble);color:var(--ink);font:400 17px/1.7 Figtree,system-ui,sans-serif}
.co header{display:flex;flex-direction:column;align-items:center;gap:14px;padding:26px clamp(18px,4vw,56px) 18px;border-bottom:1px solid var(--vein)}
.co .brand{font:400 30px/1 Marcellus,serif;letter-spacing:.24em;text-transform:uppercase;text-decoration:none}
.co nav{display:flex;gap:clamp(16px,3vw,40px);font-size:14px;letter-spacing:.14em;text-transform:uppercase}.co nav a{text-decoration:none;color:#6f6556}.co nav a:hover,.co nav a[aria-current]{color:var(--terra)}
.co-hero{display:grid;grid-template-columns:1fr minmax(0,1.3fr) 1fr;align-items:end;gap:clamp(10px,3vw,40px);padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px) 0;text-align:center}
.co-col{display:flex;flex-direction:column;align-items:center;justify-self:center}
.co-col span{display:block;width:clamp(70px,8vw,120px);height:clamp(36px,4vw,56px);margin-top:-1px;background:repeating-linear-gradient(90deg,var(--marble) 0 7px,var(--vein) 7px 9px);border-inline:1px solid var(--stone);transform-origin:bottom;animation:co-drum .6s cubic-bezier(.3,1.4,.5,1) both}
.co-col span:first-child{width:clamp(100px,11vw,160px);height:22px;background:var(--stone)}
.co-col span:last-child{width:clamp(110px,12vw,170px);height:26px;background:var(--vein);border:1px solid var(--stone)}
@keyframes co-drum{from{opacity:0;transform:translateY(-80px)}}
.co-col:first-child span:nth-last-child(1){animation-delay:.1s}.co-col span:nth-last-child(2){animation-delay:.3s}.co-col span:nth-last-child(3){animation-delay:.5s}.co-col span:nth-last-child(4){animation-delay:.7s}.co-col span:nth-last-child(5){animation-delay:.9s}.co-col span:nth-last-child(6){animation-delay:1.1s}.co-col span:nth-last-child(7){animation-delay:1.3s}
.co-label{font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:var(--terra)}
.co h1{margin-top:18px;font:400 clamp(54px,7.6vw,124px)/1 Marcellus,serif;letter-spacing:-.01em}
.co h1 .ch{animation:co-in 1s ease both;animation-delay:calc(var(--i) * 40ms + .4s)}@keyframes co-in{from{opacity:0;transform:translateY(.2em)}}
.co-hero p{margin:22px auto 0;max-width:44ch;color:#554c40}
.co .cta{display:inline-flex;margin:28px 0 clamp(50px,7vw,90px);padding:15px 30px;border:1px solid var(--ink);font-size:14px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}.co .cta:hover{background:var(--ink);color:var(--marble)}.co .cta-muted{border-color:var(--stone);color:#6f6556;letter-spacing:.02em;text-transform:none}
.co-frieze{height:42px;background:repeating-linear-gradient(90deg,var(--stone) 0 14px,transparent 14px 20px,var(--stone) 20px 34px,transparent 34px 60px) center/auto 60% no-repeat,var(--vein);border-block:1px solid var(--stone)}
.co-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);text-align:center;border-bottom:1px solid var(--vein)}.co-intro h1{font-size:clamp(50px,7vw,110px)}.co-intro p{margin:18px auto 0;max-width:46ch;color:#554c40}
.co h2{font:400 clamp(40px,5.6vw,86px)/1.04 Marcellus,serif;max-width:15ch}
.co-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.co-arches{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,3vw,40px);margin-top:clamp(40px,6vw,70px)}
.co-arch{text-align:center}
.co-portal{position:relative;aspect-ratio:3/4;border-radius:999px 999px 0 0;overflow:hidden;background:linear-gradient(180deg,#ddd3bf,#c4b69c);border:1px solid var(--stone)}
.co-portal img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.co-portal:before{content:"";position:absolute;inset:14% 22% 0;border-radius:999px 999px 0 0;background:var(--marble);border:1px solid var(--stone)}
.co-portal:has(img):before{display:none}
.co-arch h3{margin-top:18px;font:400 26px/1.15 Marcellus,serif}.co-arch p{margin-top:8px;color:#554c40}
.co-practice{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--marble)}
.co-practice ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,3vw,40px);margin-top:clamp(36px,5vw,60px);counter-reset:r}
.co-practice li{padding-top:22px;border-top:1px solid var(--gold);counter-increment:r}.co-practice li:before{content:counter(r,upper-roman);display:block;font:400 40px Marcellus,serif;color:var(--gold)}
.co-practice h3{margin-top:10px;font:400 26px Marcellus,serif}.co-practice p{margin-top:8px;color:#cfc6b6}
.co-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.co-about>p{font:400 clamp(20px,2vw,27px)/1.5 Marcellus,serif}.co-about dl{grid-column:2;margin:0}.co-about dt{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin-top:18px}.co-about dd{margin:4px 0 0;color:#554c40}
.co-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;border-top:1px solid var(--vein)}.co-end h2{margin:0 auto}
.co footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#6f6556;border-top:1px solid var(--vein)}
@media(max-width:900px){.co nav{gap:12px;font-size:12px;letter-spacing:.08em}.co .brand{font-size:22px;letter-spacing:.14em}.co-hero{grid-template-columns:1fr}.co-col{display:none}.co-arches,.co-practice ol,.co-about{grid-template-columns:1fr}.co-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const col = '<div class="co-col" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'; return '<section class="co-hero" aria-labelledby="h">' + col + '<div><span class="co-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Arrange a survey") + "</div>" + col + '</section><div class="co-frieze" aria-hidden="true"></div>'; },
  intro: (k) => { const t = k.intro(); return '<section class="co-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="co-proj" id="work"><h2>Recent restorations</h2><div class="co-arches">' + k.c.cards.map((x, i) => '<article class="co-arch"><div class="co-portal">' + k.photo(i) + "</div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="co-practice" id="services"><h2>How we work</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="co-about" id="about"><h2>The workshop</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="co-end" id="contact"><h2>Every old building has a story worth keeping.</h2>' + k.cta("Arrange a survey") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

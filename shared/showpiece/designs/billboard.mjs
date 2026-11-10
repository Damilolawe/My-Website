export default {
  id: "limepress",
  root: "lp",
  fonts: "family=Funnel+Display:wght@500;800&family=Funnel+Sans:wght@400;600",
  labels: { work: "Features", services: "Plans", about: "About", contact: "Open an account" },
  demo: {
    name: "Pip Money", headline: "Zero fees. Big savings.", heroLabel: "A savings account for freelancers",
    bio: "Pip sets aside tax and savings every time a client pays you, so the money you see is the money you can spend. No monthly fee, no minimum balance, and interest paid daily.",
    cards: [
      { title: "Tax pots", description: "A share of every payment, put aside automatically." },
      { title: "Daily interest", description: "Earned on every pound, paid every morning." },
      { title: "Invoice tracking", description: "See who has paid and who needs a nudge." },
    ],
    services: [
      { title: "Free", description: "Two pots, daily interest, no fee." },
      { title: "Plus", description: "Unlimited pots and invoice tracking." },
      { title: "Team", description: "Shared pots for small studios." },
    ],
  },
  css: `
@property --amt{syntax:"<integer>";initial-value:0;inherits:false}
.lp{--lime:#d4ff1e;--ink:#0b0d08;--white:#ffffff;--grey:#eef1e6;--mute:#5d6352;background:var(--lime);color:var(--ink);font:400 17px/1.6 "Funnel Sans",system-ui,sans-serif}
.lp header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.lp .brand{font:800 26px/1 "Funnel Display";letter-spacing:-.04em;text-decoration:none}
.lp nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.lp nav a{text-decoration:none}.lp nav a:hover{text-decoration:underline;text-decoration-thickness:3px}
.lp-hero{padding:clamp(20px,3vw,40px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden}
.lp-label{display:inline-block;padding:6px 12px;border:2px solid var(--ink);border-radius:999px;font-weight:600;font-size:14px}
.lp h1{margin-top:18px;font:800 clamp(78px,14vw,250px)/.85 "Funnel Display";letter-spacing:-.06em}
.lp h1 .ch{display:inline-block;animation:lp-in .5s cubic-bezier(.2,1.4,.4,1) both;animation-delay:calc(var(--i) * 25ms)}@keyframes lp-in{from{opacity:0;transform:translateY(.4em)}}
.lp-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(24px,4vw,60px);align-items:end;margin-top:clamp(30px,4vw,50px)}
.lp-row p{max-width:44ch;font-size:clamp(18px,1.5vw,21px)}
.lp .cta{display:inline-flex;margin-top:22px;padding:18px 32px;border-radius:999px;background:var(--ink);color:var(--lime);font:800 18px "Funnel Display";text-decoration:none;transition:transform .2s}.lp .cta:hover{transform:scale(1.05)}.lp .cta-muted{background:rgba(0,0,0,.1);color:var(--mute);font:600 15px "Funnel Sans"}
.lp-card{padding:clamp(20px,2.4vw,30px);border-radius:28px;background:var(--ink);color:var(--white)}
.lp-bal{display:flex;justify-content:space-between;align-items:baseline;font-weight:600;color:#a9b19a}
.lp-bal b{font:800 clamp(44px,5vw,72px)/1 "Funnel Display";letter-spacing:-.04em;color:var(--lime);counter-reset:a var(--amt);animation:lp-amt 3s cubic-bezier(.2,.8,.3,1) .6s both;--amt:12480}
.lp-bal b:before{content:counter(a)}
@keyframes lp-amt{from{--amt:0}}
.lp-pots{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px}
.lp-pot{padding:14px;border-radius:18px;background:#1b1f15}
.lp-pot span{font-size:13px;color:#a9b19a}.lp-pot b{display:block;font:800 22px "Funnel Display"}
.lp-bar{height:8px;margin-top:10px;border-radius:4px;background:#2c3224;overflow:hidden}.lp-bar i{display:block;height:100%;width:var(--w);border-radius:4px;background:var(--lime);transform-origin:left;animation:lp-bar 1.6s cubic-bezier(.3,1.4,.5,1) both;animation-delay:var(--d)}
@keyframes lp-bar{from{transform:scaleX(0)}}
.lp-ping{display:flex;align-items:center;gap:10px;margin-top:16px;padding:12px 14px;border-radius:14px;background:var(--lime);color:var(--ink);font-weight:600;animation:lp-ping .6s cubic-bezier(.3,1.8,.5,1) 3.4s both}
.lp-ping:before{content:"";width:12px;height:12px;border-radius:50%;background:var(--ink)}
@keyframes lp-ping{from{opacity:0;transform:translateY(20px) scale(.9)}}
.lp h2{font:800 clamp(56px,9vw,156px)/.85 "Funnel Display";letter-spacing:-.06em;max-width:11ch}
.lp-feat{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--white)}
.lp-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(40px,6vw,70px)}
.lp-f{padding:28px;border-radius:28px;background:#171a12}
.lp-f b{display:block;font:800 clamp(64px,6vw,96px)/.85 "Funnel Display";letter-spacing:-.05em;color:var(--lime)}
.lp-f img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:18px;margin:16px 0}
.lp-f h3{margin-top:18px;font:800 26px/1.1 "Funnel Display"}.lp-f p{margin-top:8px;color:#b9c1a8}
.lp-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.lp-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.lp-plans li{padding:30px;border-radius:28px;background:var(--white)}.lp-plans li:nth-child(2){background:var(--ink);color:var(--lime)}
.lp-plans h3{font:800 34px "Funnel Display";letter-spacing:-.03em}.lp-plans p{margin-top:6px}
.lp-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--white);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.lp-about>p{font-size:clamp(19px,1.8vw,24px)}.lp-about dl{grid-column:2;margin:0}.lp-about dt{font:800 18px "Funnel Display";margin-top:16px}.lp-about dd{margin:2px 0 0}
.lp-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px)}
.lp footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:600;background:var(--ink);color:var(--lime)}
@media(max-width:900px){.lp nav{gap:12px;font-size:14px}.lp-row,.lp-list,.lp-plans ul,.lp-about{grid-template-columns:1fr}.lp-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const P = [["Tax", "3,120", "62%", "1s"], ["Holiday", "1,400", "40%", "1.3s"], ["Rainy day", "2,050", "84%", "1.6s"]]; return '<section class="lp-hero" aria-labelledby="h"><span class="lp-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="lp-row"><div><p>' + k.E(k.c.bio) + "</p>" + k.cta("Open an account") + '</div><div class="lp-card" aria-hidden="true"><div class="lp-bal">Saved<b></b></div><div class="lp-pots">' + P.map(p => '<div class="lp-pot"><span>' + p[0] + "</span><b>" + p[1] + '</b><div class="lp-bar"><i style="--w:' + p[2] + ";--d:" + p[3] + '"></i></div></div>').join("") + '</div><div class="lp-ping">Client paid 2,400. 25 percent moved to Tax.</div></div></div></section>'; },
  work: (k) => { const b = ["25%", "4.1%", "0"]; return '<section class="lp-feat" id="work"><h2>' + k.h("work", "How it works") + '</h2><div class="lp-list">' + k.c.cards.map((x, i) => '<article class="lp-f"><b>' + b[i % 3] + "</b>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="lp-plans" id="services"><h2>' + k.h("services", "Plans") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="lp-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="lp-end" id="contact"><h2>' + k.h("contact", "Get paid. Stay calm.") + '</h2>' + k.cta("Open an account") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

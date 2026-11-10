export default {
  id: "md-composio",
  root: "mg",
  fonts: "family=Kumbh+Sans:wght@400;700;900&family=DM+Mono:wght@400;500",
  labels: { work: "Workflows", services: "Plans", about: "About", contact: "Connect your tools" },
  demo: {
    name: "Motion Grid", headline: "Everything works together.", heroLabel: "Connect the apps your team already uses",
    bio: "When a form is filled, a deal closes or a file lands, Motion Grid passes it to the next app automatically. Two hundred connections, set up by clicking, not coding.",
    cards: [
      { title: "New lead to welcome email", description: "Form, CRM and inbox, connected in four minutes." },
      { title: "Invoices filed themselves", description: "Every paid invoice saved, named and logged in the accounts sheet." },
      { title: "Support to engineering", description: "Bug reports from chat become tickets with the screenshot attached." },
    ],
    services: [
      { title: "Free", description: "Five workflows, 1,000 runs a month." },
      { title: "Team", description: "Unlimited workflows and shared folders." },
      { title: "Company", description: "Admin controls, logs and priority support." },
    ],
  },
  css: `
.mg{--black:#09090f;--panel:#14141f;--blue:#3d6bff;--mint:#3ef2c1;--pink:#ff5b8a;--white:#f1f2ff;--mute:#8a8ca8;background:var(--black);color:var(--white);font:400 17px/1.65 "Kumbh Sans",system-ui,sans-serif}
.mg header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.mg .brand{font:900 21px/1 "Kumbh Sans";letter-spacing:-.03em;text-decoration:none;display:flex;align-items:center;gap:8px}.mg .brand:before{content:"";width:20px;height:20px;background:radial-gradient(circle,var(--mint) 3px,transparent 4px) 0 0/10px 10px}
.mg nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.mg nav a{text-decoration:none;color:var(--mute)}.mg nav a:hover,.mg nav a[aria-current]{color:var(--white)}
.mg-hero{text-align:center;padding:clamp(50px,7vw,90px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.mg-label{font:400 13px "DM Mono",monospace;color:var(--mint)}
.mg h1{margin:16px auto 0;max-width:13ch;font:900 clamp(56px,8.6vw,146px)/.9 "Kumbh Sans";letter-spacing:-.055em}
.mg h1 .ch{animation:mg-in .6s cubic-bezier(.3,1.4,.5,1) both;animation-delay:calc(var(--i) * 25ms)}@keyframes mg-in{from{opacity:0;transform:scale(.5)}}
.mg-hero p{margin:22px auto 0;max-width:50ch;color:#b9bbd6}
.mg .cta{display:inline-flex;margin-top:28px;padding:15px 28px;border-radius:999px;background:var(--blue);color:#fff;font-weight:900;text-decoration:none;box-shadow:0 0 40px rgba(61,107,255,.5);transition:box-shadow .2s}.mg .cta:hover{box-shadow:0 0 70px rgba(61,107,255,.8)}.mg .cta-muted{background:var(--panel);color:var(--mute);box-shadow:none}
.mg-net{position:relative;width:min(100%,760px);aspect-ratio:2;margin:clamp(40px,6vw,60px) auto 0}
.mg-net svg{position:absolute;inset:0;width:100%;height:100%}
.mg-net path{fill:none;stroke:#2a2b42;stroke-width:2}
.mg-net path.f{stroke:var(--mint);stroke-width:3;stroke-dasharray:14 400;animation:mg-flow 2.8s linear infinite;animation-delay:var(--d)}
@keyframes mg-flow{from{stroke-dashoffset:414}to{stroke-dashoffset:0}}
.mg-node{position:absolute;left:var(--x);top:var(--y);width:clamp(54px,7vw,76px);aspect-ratio:1;translate:-50% -50%;border-radius:20px;display:grid;place-items:center;background:var(--panel);border:1px solid #2a2b42;font:500 12px "DM Mono",monospace;color:var(--white)}
.mg-node.hubn{width:clamp(90px,11vw,120px);border-radius:30px;background:var(--blue);border:0;font:900 15px "Kumbh Sans";box-shadow:0 0 0 10px rgba(61,107,255,.15),0 0 60px rgba(61,107,255,.5);animation:mg-beat 2.8s ease-in-out infinite}
@keyframes mg-beat{50%{box-shadow:0 0 0 18px rgba(61,107,255,.08),0 0 80px rgba(61,107,255,.6)}}
.mg-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);text-align:center}
.mg h2{font:900 clamp(44px,6.4vw,104px)/.9 "Kumbh Sans";letter-spacing:-.05em;max-width:14ch}
.mg-flows{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.mg-list{display:grid;gap:14px;margin-top:clamp(40px,6vw,70px)}
.mg-flow{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1.3fr);gap:24px;align-items:center;padding:22px 24px;border-radius:18px;background:var(--panel);border:1px solid #23243a}
.mg-chain{display:flex;align-items:center;gap:6px}.mg-chain i{width:30px;height:30px;border-radius:9px;background:var(--c)}.mg-chain b{width:18px;height:2px;background:var(--mute)}
.mg-flow h3{font:700 22px/1.2 "Kumbh Sans"}.mg-flow p{color:#b9bbd6}
.mg-flow img{grid-column:2/-1;width:100%;max-height:220px;object-fit:cover;border-radius:12px}
.mg-plans{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.mg-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.mg-plans li{padding:28px;border-radius:18px;background:var(--panel);border:1px solid #23243a}.mg-plans li:nth-child(2){border-color:var(--mint)}
.mg-plans h3{font:900 26px "Kumbh Sans"}.mg-plans p{margin-top:8px;color:#b9bbd6}
.mg-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--blue);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mg-about>p{font-size:clamp(19px,1.8vw,24px)}.mg-about dl{grid-column:2;margin:0;font-family:"DM Mono",monospace}.mg-about dt{color:var(--mint);margin-top:16px}.mg-about dd{margin:2px 0 0}
.mg-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.mg-end h2{margin:0 auto}
.mg footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "DM Mono",monospace;color:var(--mute);border-top:1px solid #1d1e30}
@media(max-width:900px){.mg nav{gap:12px;font-size:14px}.mg-plans ul,.mg-about,.mg-flow{grid-template-columns:1fr}.mg-flow img{grid-column:auto}.mg-about dl{grid-column:auto}.mg-node{font-size:10px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const n = [["Forms", 10, 20], ["Email", 10, 80], ["CRM", 30, 50], ["Sheets", 90, 20], ["Chat", 90, 80], ["Files", 70, 50]]; return '<section class="mg-hero" aria-labelledby="h"><span class="mg-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Connect your tools") + '<div class="mg-net" aria-hidden="true"><svg viewBox="0 0 100 50" preserveAspectRatio="none">' + n.map((p, i) => '<path d="M' + p[1] + " " + p[2] / 2 + " C50 " + p[2] / 2 + " 50 25 50 25\"/><path class=\"f\" style=\"--d:" + (i * 0.45).toFixed(2) + 's" d="M' + p[1] + " " + p[2] / 2 + ' C50 ' + p[2] / 2 + ' 50 25 50 25"/>').join("") + "</svg>" + n.map(p => '<span class="mg-node" style="--x:' + p[1] + "%;--y:" + p[2] + '%">' + p[0] + "</span>").join("") + '<span class="mg-node hubn" style="--x:50%;--y:50%">' + k.E(k.c.name.split(" ")[0]) + "</span></div></section>"; },
  work: (k) => { const cs = [["var(--mint)", "var(--blue)", "var(--pink)"], ["var(--pink)", "var(--mint)"], ["var(--blue)", "var(--pink)", "var(--mint)"]]; return '<section class="mg-flows" id="work"><h2>Workflows that run themselves</h2><div class="mg-list">' + k.c.cards.map((x, i) => '<article class="mg-flow"><span class="mg-chain" aria-hidden="true">' + cs[i % 3].map(c => '<i style="--c:' + c + '"></i>').join("<b></b>") + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>"; },
  services: (k) => '<section class="mg-plans" id="services"><h2>Plans</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="mg-about" id="about"><h2>Fewer copy and paste jobs</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mg-end" id="contact"><h2>Let the apps do the busywork.</h2>' + k.cta("Connect your tools") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

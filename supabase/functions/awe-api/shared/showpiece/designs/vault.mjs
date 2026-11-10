export default {
  id: "md-binance",
  root: "vl",
  fonts: "family=Michroma&family=Red+Hat+Text:wght@400;500;700",
  labels: { work: "Holdings", services: "Custody", about: "Security", contact: "Open a vault" },
  intros: {
    work: { title: "What we hold", text: "Assets kept offline, insured, and audited every quarter." },
    features: { title: "Custody plans", text: "From a single key to a full institutional setup." },
    studio: { title: "How we keep it safe", text: null },
    contact: { title: "Open a vault", text: "Speak to a custody specialist. Accounts open within a week." },
  },
  demo: {
    name: "Vanta Ledger", headline: "Kept cold. Kept safe.", heroLabel: "Digital asset custody",
    bio: "We store digital assets offline, across three vaults on two continents, with insurance and a quarterly public audit. You hold the keys to withdraw. We hold everything else.",
    cards: [
      { title: "Cold storage", description: "Keys generated and kept offline, never touching the internet." },
      { title: "Multi-party approval", description: "Withdrawals need sign-off from people you choose." },
      { title: "Quarterly audit", description: "Independent proof of reserves, published every three months." },
    ],
    services: [
      { title: "Personal vault", description: "For long-term holders who want to stop worrying." },
      { title: "Business vault", description: "Treasury custody with roles, limits and reporting." },
      { title: "Institutional", description: "Dedicated vault, custom approval flows, a named team." },
    ],
  },
  css: `
.vl-row img{grid-column:1/-1;width:100%;max-height:260px;object-fit:cover;margin-top:14px}
.vl{--deep:#0b1712;--panel:#122219;--gold:#d6b45e;--pale:#efe7cf;--mint:#93d4bb;--fog:#a9bbb2;background:var(--deep);color:var(--pale);font:400 17px/1.7 "Red Hat Text",system-ui,sans-serif}
.vl header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px);border-bottom:1px solid #1f3328}
.vl .brand{font:400 16px/1 Michroma,sans-serif;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:var(--gold)}
.vl nav{display:flex;gap:clamp(14px,2.4vw,32px);font-weight:500;font-size:15px}.vl nav a{text-decoration:none;color:var(--fog)}.vl nav a:hover,.vl nav a[aria-current]{color:var(--pale)}
.vl-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px);overflow:hidden}
.vl h1{font:400 clamp(44px,6.6vw,108px)/1.05 Michroma,sans-serif;letter-spacing:-.04em;text-transform:uppercase}
.vl h1 .ch{animation:vl-in .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes vl-in{from{opacity:0;filter:blur(6px)}}
.vl-hero p{margin-top:28px;max-width:44ch;color:var(--fog);font-size:clamp(18px,1.5vw,20px)}
.vl .cta{display:inline-flex;margin-top:32px;padding:16px 28px;background:var(--gold);color:var(--deep);font:700 15px "Red Hat Text";letter-spacing:.06em;text-transform:uppercase;text-decoration:none;transition:filter .2s}.vl .cta:hover{filter:brightness(1.12)}.vl .cta-muted{background:transparent;color:var(--fog);border:1px solid #2c4537;text-transform:none;letter-spacing:0;font-weight:400}
.vl-dial{position:relative;width:min(100%,520px);aspect-ratio:1;justify-self:center}
.vl-dial i{position:absolute;border-radius:50%;inset:var(--in)}
.vl-dial i:nth-child(1){--in:0;border:2px solid #2c4537;background:radial-gradient(circle,#142a20,#0b1712 70%)}
.vl-dial i:nth-child(2){--in:7%;border:10px dotted rgba(214,180,94,.55);animation:vl-turn 40s linear infinite}
.vl-dial i:nth-child(3){--in:18%;border:2px solid var(--gold);background:repeating-conic-gradient(rgba(214,180,94,.5) 0 1deg,transparent 1deg 10deg);-webkit-mask:radial-gradient(circle,transparent 84%,#000 85%);mask:radial-gradient(circle,transparent 84%,#000 85%);animation:vl-turn 22s linear infinite reverse}
.vl-dial i:nth-child(4){--in:30%;background:conic-gradient(from 0deg,#2a4335,#0f1d16,#2a4335,#0f1d16,#2a4335);box-shadow:0 0 0 2px var(--gold),inset 0 0 40px #000;animation:vl-spin 6s cubic-bezier(.6,0,.3,1) infinite}
.vl-dial i:nth-child(5){--in:44%;background:radial-gradient(circle at 35% 30%,#f7e3a8,var(--gold) 45%,#8a6d27);box-shadow:0 0 50px rgba(214,180,94,.45)}
.vl-dial b{position:absolute;left:50%;top:30%;width:4px;height:14%;translate:-50% 0;background:var(--gold);border-radius:2px;transform-origin:50% 143%;animation:vl-spin 6s cubic-bezier(.6,0,.3,1) infinite}
@keyframes vl-turn{to{transform:rotate(360deg)}}@keyframes vl-spin{0%{transform:rotate(0)}30%{transform:rotate(140deg)}55%{transform:rotate(-80deg)}80%,100%{transform:rotate(30deg)}}
.vl-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px)}.vl-intro h1{font-size:clamp(40px,5.6vw,90px)}.vl-intro p{margin-top:22px;max-width:46ch;color:var(--fog)}
.vl h2{font:400 clamp(30px,4.4vw,66px)/1.1 Michroma,sans-serif;letter-spacing:-.04em;text-transform:uppercase;max-width:16ch}
.vl-hold{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--panel)}
.vl-table{margin-top:clamp(36px,5vw,60px);border-top:1px solid var(--gold)}
.vl-row{display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1.3fr) 120px;gap:24px;align-items:center;padding:26px 0;border-bottom:1px solid #2c4537}
.vl-lock{width:34px;height:28px;border-radius:5px;background:var(--gold);position:relative;margin-top:12px}.vl-lock:before{content:"";position:absolute;left:7px;top:-14px;width:16px;height:18px;border:4px solid var(--gold);border-bottom:0;border-radius:10px 10px 0 0}
.vl-row h3{font:700 22px "Red Hat Text"}.vl-row p{color:var(--fog)}
.vl-bar{height:6px;border-radius:3px;background:#2c4537;overflow:hidden}.vl-bar:after{content:"";display:block;height:100%;width:100%;background:linear-gradient(90deg,var(--mint),var(--gold))}
@supports (animation-timeline:view()){.vl-bar:after{animation:vl-bar linear both;animation-timeline:view();animation-range:entry 20% cover 45%}@keyframes vl-bar{from{transform:translateX(-100%)}}}
.vl-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.vl-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;margin-top:clamp(36px,5vw,60px);background:#2c4537;border:2px solid #2c4537}
.vl-plans li{padding:32px;background:var(--deep)}.vl-plans li:hover{background:var(--panel)}.vl-plans h3{font:400 16px Michroma,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:var(--gold)}.vl-plans p{margin-top:12px;color:var(--fog)}
.vl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--panel);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.vl-about>p{font-size:clamp(19px,1.8vw,23px)}.vl-about dl{grid-column:2;margin:0}.vl-about dt{font:400 13px Michroma,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:var(--gold);margin-top:22px}.vl-about dd{margin:6px 0 0;color:var(--fog)}
.vl-end{padding:clamp(100px,13vw,180px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(50% 70% at 50% 100%,rgba(214,180,94,.2),transparent)}.vl-end h2{margin:0 auto}
.vl footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:14px;color:var(--fog);border-top:1px solid #1f3328}
@media(max-width:860px){.vl nav{gap:12px;font-size:13px}.vl .brand{font-size:12px}.vl-hero,.vl-plans ul,.vl-about{grid-template-columns:1fr}.vl-row{grid-template-columns:44px 1fr;gap:8px 16px}.vl-row p,.vl-bar{grid-column:2}.vl-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="vl-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Open a vault") + '</div><div class="vl-dial" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><b></b></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="vl-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="vl-hold" id="work"><h2>' + k.h("work", "Layers of protection") + '</h2><div class="vl-table">' + k.c.cards.map((x, i) => '<article class="vl-row"><span class="vl-lock" aria-hidden="true"></span><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + '</p><span class="vl-bar" aria-hidden="true"></span>' + k.photo(i) + '</article>').join("") + "</div></section>",
  services: (k) => '<section class="vl-plans" id="services"><h2>' + k.h("services", "Custody plans") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="vl-about" id="about"><h2>' + k.h("about", "Behind the door") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="vl-end" id="contact"><h2>' + k.h("contact", "Sleep well on it.") + '</h2>' + k.cta("Speak to a specialist") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

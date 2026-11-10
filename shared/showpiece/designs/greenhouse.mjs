export default {
  id: "md-mongodb",
  root: "gh",
  fonts: "family=Chivo:wght@300;400;700;900&family=Chivo+Mono:wght@400",
  labels: { work: "Projects", services: "Plans", about: "About", contact: "Start free" },
  intros: {
    work: { title: "What teams grew", text: "Apps that started with one table and kept growing." },
    features: { title: "Plans", text: "Start on a free cluster. Scale when the traffic arrives." },
    studio: { title: "About Greenhouse", text: null },
    contact: { title: "Start free", text: "A database ready in under a minute, no card needed." },
  },
  demo: {
    name: "Greenhouse Data", headline: "Plant it. Watch it grow.", heroLabel: "A database that grows with your app",
    bio: "Store your data the way your app already thinks about it. Start with a free cluster, then add space, speed and regions as your users arrive.",
    cards: [
      { title: "From side project to 2 million users", description: "A recipe app that never had to change databases on the way up." },
      { title: "Search inside every record", description: "A library catalogue made searchable without a second system." },
      { title: "Copies on three continents", description: "A game studio that keeps player saves close to every player." },
    ],
    services: [
      { title: "Seedling", description: "Free shared cluster for learning and prototypes." },
      { title: "Grow", description: "Dedicated cluster, backups and alerts." },
      { title: "Canopy", description: "Multi-region, private networking and support." },
    ],
  },
  css: `
.gh{--soil:#0b1f17;--moss:#123526;--leaf:#46e08a;--sprout:#b9f5c8;--cream:#f3f1e7;--clay:#c76b3e;background:var(--soil);color:var(--cream);font:400 17px/1.65 Chivo,system-ui,sans-serif}
.gh header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.gh .brand{display:flex;align-items:center;gap:10px;font:900 20px/1 Chivo;text-decoration:none}.gh .brand:before{content:"";width:16px;height:24px;border-radius:50% 50% 50% 50%/70% 70% 30% 30%;background:var(--leaf)}
.gh nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:15px}.gh nav a{text-decoration:none;opacity:.75}.gh nav a:hover,.gh nav a[aria-current]{opacity:1;color:var(--leaf)}
.gh-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:end;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px) 0;overflow:hidden}
.gh-label{font:400 13px "Chivo Mono",monospace;color:var(--leaf)}
.gh h1{margin-top:18px;font:900 clamp(58px,8.8vw,148px)/.9 Chivo;letter-spacing:-.05em}
.gh h1 .ch{animation:gh-in .7s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes gh-in{from{opacity:0;transform:translateY(.5em)}}
.gh-hero p{margin-top:24px;max-width:44ch;color:#bcc9bf}
.gh .cta{display:inline-flex;margin:30px 0 clamp(60px,8vw,110px);padding:16px 28px;border-radius:999px;background:var(--leaf);color:var(--soil);font-weight:700;text-decoration:none;transition:background .2s}.gh .cta:hover{background:var(--sprout)}.gh .cta-muted{background:var(--moss);color:#bcc9bf}
.gh-beds{position:relative;display:flex;align-items:flex-end;justify-content:space-around;height:clamp(340px,40vw,520px)}
.gh-plant{position:relative;width:18%;height:100%;display:flex;justify-content:center;align-items:flex-end}
.gh-stem{position:absolute;bottom:56px;left:50%;width:4px;margin-left:-2px;height:var(--h);background:var(--leaf);border-radius:2px;transform-origin:bottom;animation:gh-grow 2.4s cubic-bezier(.3,.8,.3,1) both;animation-delay:var(--d)}
.gh-stem i{position:absolute;width:38px;height:20px;border-radius:0 100% 0 100%;background:var(--leaf);transform-origin:left center;animation:gh-leaf 1s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--d) + 1.4s)}
.gh-stem i:nth-child(1){left:2px;top:30%;transform:rotate(-30deg)}.gh-stem i:nth-child(2){right:2px;top:55%;transform-origin:right center;border-radius:100% 0 100% 0;transform:rotate(30deg)}.gh-stem i:nth-child(3){left:2px;top:0;width:28px;height:28px;border-radius:50%;background:var(--sprout);transform:translate(-14px,-20px)}
@keyframes gh-grow{from{transform:scaleY(0)}}@keyframes gh-leaf{from{transform:scale(0)}}
.gh-pot{position:relative;z-index:1;width:100%;height:56px;border-radius:4px 4px 14px 14px;background:var(--clay);display:grid;place-items:center;font:400 12px "Chivo Mono",monospace;color:var(--cream)}
.gh-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px)}.gh-intro h1{font-size:clamp(52px,7.6vw,124px)}.gh-intro p{margin-top:20px;max-width:46ch;color:#bcc9bf}
.gh h2{font:900 clamp(42px,6vw,96px)/.92 Chivo;letter-spacing:-.045em;max-width:14ch}
.gh-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--cream);color:var(--soil)}
.gh-rows{margin-top:clamp(40px,6vw,70px);font-family:"Chivo Mono",monospace}
.gh-row{display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1.3fr);gap:24px;padding:24px 0;border-top:1px solid #cfccbd}.gh-row:last-child{border-bottom:1px solid #cfccbd}
.gh-row code{color:#5d7a69;font-size:14px}.gh-row h3{font:700 24px/1.15 Chivo;letter-spacing:-.02em}.gh-row p{font:400 15px/1.6 "Chivo Mono",monospace;color:#40564a}
.gh-row img{grid-column:2/-1;width:100%;max-height:260px;object-fit:cover;border-radius:10px}
.gh-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.gh-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px);align-items:end}
.gh-plans li{padding:28px;border-radius:20px 20px 4px 4px;background:var(--moss)}.gh-plans li:nth-child(1){min-height:200px}.gh-plans li:nth-child(2){min-height:260px;background:#1b4a33}.gh-plans li:nth-child(3){min-height:320px;background:var(--leaf);color:var(--soil)}
.gh-plans h3{font:900 28px Chivo}.gh-plans p{margin-top:8px;opacity:.85}
.gh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--moss);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.gh-about>p{font-size:clamp(19px,1.8vw,23px)}.gh-about dl{grid-column:2;margin:0;font-family:"Chivo Mono",monospace;font-size:15px}.gh-about dt{color:var(--leaf);margin-top:18px}.gh-about dd{margin:4px 0 0}
.gh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.gh-end h2{margin:0 auto}
.gh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Chivo Mono",monospace;color:#7d9284;border-top:1px solid var(--moss)}
@media(max-width:900px){.gh nav{gap:12px;font-size:13px}.gh-hero,.gh-plans ul,.gh-about{grid-template-columns:1fr}.gh-row{grid-template-columns:1fr;gap:6px}.gh-row img{grid-column:auto}.gh-about dl{grid-column:auto}.gh-beds{height:300px}.gh-plans li:nth-child(n){min-height:0}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const p = (h, d, label) => '<div class="gh-plant"><span class="gh-stem" style="--h:' + h + ';--d:' + d + '"><i></i><i></i><i></i></span><span class="gh-pot">' + label + "</span></div>"; return '<section class="gh-hero" aria-labelledby="h"><div><span class="gh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a free cluster") + '</div><div class="gh-beds" aria-hidden="true">' + p("28%", ".3s", "1 KB") + p("48%", ".6s", "10 MB") + p("66%", ".9s", "1 GB") + p("84%", "1.2s", "1 TB") + "</div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="gh-intro" aria-labelledby="h"><span class="gh-label">// ' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="gh-proj" id="work"><h2>' + k.h("work", "Started small. Kept growing.") + '</h2><div class="gh-rows">' + k.c.cards.map((x, i) => '<article class="gh-row"><code>{ ' + (i + 1) + " }</code><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="gh-plans" id="services"><h2>' + k.h("services", "Plans that grow") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="gh-about" id="about"><h2>' + k.h("about", "Rooted in good data") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="gh-end" id="contact"><h2>' + k.h("contact", "Plant your first record.") + '</h2>' + k.cta("Start a free cluster") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

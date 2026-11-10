export default {
  id: "md-pinterest",
  root: "pb",
  fonts: "family=Abril+Fatface&family=Work+Sans:wght@400;600",
  labels: { work: "Issues", services: "Subscribe", about: "About", contact: "Contribute" },
  intros: {
    work: { title: "Recent issues", text: "Each issue is one idea, collected from a hundred places." },
    features: { title: "Subscribe", text: "Twelve printed issues a year, or read online for free." },
    studio: { title: "About the magazine", text: null },
    contact: { title: "Contribute", text: "Send us the thing you have been collecting. We read every pitch." },
  },
  demo: {
    name: "Pinboard Editions", headline: "Collect what moves you.", heroLabel: "A monthly magazine made of mood boards",
    bio: "Every month we pick one idea, a colour, a material, a feeling, and fill a magazine with everything that inspired us about it. Printed on thick paper, made to be pinned up.",
    cards: [
      { title: "Issue 31: Terracotta", description: "Roof tiles, plant pots and a potter who only uses one clay." },
      { title: "Issue 32: Night swimming", description: "Lidos after dark, and the people who swim them." },
      { title: "Issue 33: Second hand", description: "The joy of things that had a life before you." },
    ],
    services: [
      { title: "Read online", description: "Every issue, free, a week after print." },
      { title: "Print subscription", description: "Twelve issues to your door, plus a poster." },
      { title: "Gift a year", description: "A subscription with a handwritten card." },
    ],
  },
  css: `
.pb{--cork:#c9925c;--cork2:#b47b46;--paper:#fffaf1;--ink:#231a14;--red:#e6332a;--teal:#1f8f8a;--mustard:#e8b63a;background:var(--paper);color:var(--ink);font:400 17px/1.65 "Work Sans",system-ui,sans-serif}
.pb header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.pb .brand{font:400 28px/1 "Abril Fatface",serif;text-decoration:none;color:var(--red)}
.pb nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.pb nav a{text-decoration:none}.pb nav a:hover{color:var(--red)}
.pb-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(24px,4vw,60px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.pb h1{font:400 clamp(58px,8.4vw,140px)/.95 "Abril Fatface",serif;letter-spacing:-.01em}
.pb h1 .ch{animation:pb-in .6s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes pb-in{from{opacity:0;transform:translateY(.2em)}}
.pb-hero p{margin-top:22px;max-width:42ch;font-size:clamp(18px,1.5vw,20px)}
.pb .cta{display:inline-flex;margin-top:28px;padding:15px 28px;border-radius:999px;background:var(--red);color:#fff;font-weight:600;text-decoration:none;transition:background .2s}.pb .cta:hover{background:var(--ink)}.pb .cta-muted{background:#f1e7d6;color:var(--ink)}
.pb-board{position:relative;aspect-ratio:1.15;border-radius:16px;border:14px solid #6b4423;background:radial-gradient(var(--cork2) 1px,transparent 1.5px) 0 0/9px 9px,radial-gradient(#d9a46c 1px,transparent 1.5px) 4px 5px/11px 11px,var(--cork);box-shadow:inset 0 0 30px rgba(0,0,0,.3),0 30px 50px -30px rgba(35,26,20,.6);overflow:hidden}
.pb-item{position:absolute;padding:10px 10px 30px;background:#fff;box-shadow:0 10px 18px -8px rgba(0,0,0,.5);transform-origin:50% 0;animation:pb-sway 5s ease-in-out infinite alternate,pb-pin .6s cubic-bezier(.3,1.5,.5,1) both;animation-delay:0s,var(--d)}
.pb-item:before{content:"";position:absolute;left:50%;top:-6px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--pin,var(--red));box-shadow:inset -3px -3px 0 rgba(0,0,0,.25),0 3px 4px rgba(0,0,0,.4);z-index:2}
@keyframes pb-sway{from{transform:rotate(calc(var(--r) - 1.5deg))}to{transform:rotate(calc(var(--r) + 1.5deg))}}
@keyframes pb-pin{from{opacity:0;translate:0 -40px}}
.pb-item span{display:block;width:100%;height:100%;background:var(--bg)}
.pb-item small{position:absolute;left:10px;bottom:8px;font:600 12px "Work Sans"}
.pb-i1{left:6%;top:8%;width:30%;height:42%;--r:-6deg;--bg:linear-gradient(160deg,#e8b63a,#d9662f);--d:.3s}
.pb-i2{left:40%;top:5%;width:26%;height:34%;--r:4deg;--bg:linear-gradient(#1f8f8a,#155e5b);--pin:var(--mustard);--d:.5s}
.pb-i3{right:5%;top:12%;width:24%;height:48%;--r:-3deg;--bg:repeating-linear-gradient(45deg,#e6332a 0 10px,#fffaf1 10px 20px);--pin:var(--teal);--d:.7s}
.pb-i4{left:12%;bottom:6%;width:34%;height:36%;--r:3deg;--bg:radial-gradient(circle at 40% 40%,#ffd9a8,#c66b3d);--d:.9s}
.pb-i5{left:52%;bottom:8%;width:26%;padding:16px;height:auto;--r:-5deg;background:var(--mustard);font:400 22px/1.05 "Abril Fatface",serif;--pin:var(--ink);--d:1.1s}
.pb-intro{padding:clamp(50px,7vw,100px) clamp(18px,4vw,56px)}.pb-intro h1{font-size:clamp(52px,7.6vw,124px)}.pb-intro p{margin-top:18px;max-width:46ch}
.pb h2{font:400 clamp(42px,6vw,96px)/.98 "Abril Fatface",serif;max-width:14ch}
.pb-issues{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#f4ead8}
.pb-masonry{columns:3 260px;column-gap:24px;margin-top:clamp(40px,6vw,70px)}
.pb-issue{break-inside:avoid;margin-bottom:24px;padding:12px 12px 22px;background:#fff;box-shadow:0 14px 24px -18px rgba(35,26,20,.6);transition:transform .3s}.pb-issue:hover{transform:rotate(-1deg) translateY(-4px)}
.pb-cover{height:var(--h,240px);background:var(--bg,linear-gradient(160deg,#e8b63a,#d9662f))}.pb-issue:nth-child(2) .pb-cover{--h:320px;--bg:linear-gradient(#1f3b5c,#0e1a2b)}.pb-issue:nth-child(3) .pb-cover{--h:200px;--bg:linear-gradient(120deg,#c8b9a6,#8a7a66)}
.pb-cover img{width:100%;height:100%;object-fit:cover}
.pb-issue h3{margin:16px 6px 0;font:400 26px/1.1 "Abril Fatface",serif}.pb-issue p{margin:8px 6px 0;color:#5a4b3f}
.pb-subs{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.pb-subs ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.pb-subs li{padding:28px;border-radius:4px;background:var(--c,#fff);box-shadow:0 10px 20px -16px rgba(35,26,20,.6);transform:rotate(var(--r,0))}.pb-subs li:nth-child(1){--r:-1deg}.pb-subs li:nth-child(2){--c:var(--mustard);--r:1deg}.pb-subs li:nth-child(3){--c:#cde6e3;--r:-.5deg}
.pb-subs h3{font:400 28px "Abril Fatface",serif}.pb-subs p{margin-top:8px}
.pb-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.pb-about>p{font-size:clamp(19px,1.8vw,24px)}.pb-about dl{grid-column:2;margin:0}.pb-about dt{font:400 24px "Abril Fatface",serif;color:var(--mustard);margin-top:16px}.pb-about dd{margin:2px 0 0}
.pb-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.pb-end h2{margin:0 auto}
.pb footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;border-top:1px solid #e8dcc6}
@media(max-width:900px){.pb nav{gap:12px;font-size:14px}.pb-hero,.pb-subs ul,.pb-about{grid-template-columns:1fr}.pb-about dl{grid-column:auto}.pb-subs li{transform:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const t = (k.c.cards.length ? k.c.cards : [{ title: "" }]).map(x => k.E(x.title)); return '<section class="pb-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Subscribe") + '</div><div class="pb-board" aria-hidden="true"><figure class="pb-item pb-i1"><span>' + k.photo(0) + "</span><small>" + (t[0] || "") + '</small></figure><figure class="pb-item pb-i2"><span>' + k.photo(1) + '</span></figure><figure class="pb-item pb-i3"><span></span></figure><figure class="pb-item pb-i4"><span>' + k.photo(2) + '</span></figure><p class="pb-item pb-i5">' + k.E(k.c.heroLabel || "This month") + "</p></div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="pb-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="pb-issues" id="work"><h2>From the archive</h2><div class="pb-masonry">' + k.c.cards.map((x, i) => '<article class="pb-issue"><div class="pb-cover">' + k.photo(i) + "</div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="pb-subs" id="services"><h2>Ways to read</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="pb-about" id="about"><h2>Made by collectors</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="pb-end" id="contact"><h2>Pin this one up.</h2>' + k.cta("Subscribe") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

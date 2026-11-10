export default {
  id: "md-shopify",
  root: "st",
  fonts: "family=Fraunces:opsz,wght,SOFT,WONK@9..144,800..900,100,1&family=Instrument+Sans:wght@400;600;700",
  labels: {work:"Shop",services:"Visit",about:"Makers",contact:"Say hello"},
  intros: {work:{title:"On the shelf",text:"Everything here was made by someone we have met in person."},features:{title:"Ways to shop",text:"Gift boxes, the monthly market and wholesale for other shops."},studio:{title:"Our story",text:null},contact:{title:"Come say hello",text:"Questions about an order, a gift or stocking our makers? Write to us."}},
  demo: {
    name: "Verdant Supply", headline: "Small batch. Big heart.", heroLabel: "Goods from independent makers",
    bio: "A shop for things made slowly: hand-thrown mugs, plant-dyed linen, honey from twelve hives up the road. Every maker is someone we've met.",
    cards: [
      { title: "Stoneware mugs", description: "Thrown in a garage studio, glazed in moss and oat." },
      { title: "Plant-dyed linen", description: "Napkins coloured with onion skin, avocado pit and indigo." },
      { title: "Wildflower honey", description: "Twelve hives, one hillside, bottled the week it's spun." },
    ],
    services: [
      { title: "Gift boxes", description: "Pick three goods, we wrap them in reusable cloth." },
      { title: "Maker market", description: "First Saturday of the month, twenty stalls, free coffee." },
      { title: "Wholesale", description: "Stock our makers in your shop." },
    ],
  },
  css: `
.st{overflow-x:clip;--paper:#e9f1d8;--leaf:#4f7a1f;--moss:#87a947;--tomato:#ff5a36;--ink:#1b2410;--plum:#5b2a4a;background:var(--paper);color:var(--ink);font:400 17px/1.6 "Instrument Sans",system-ui,sans-serif}
.st header{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px clamp(18px,4vw,56px)}
.st .brand{font:800 26px/1 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;text-decoration:none;color:var(--leaf)}
.st nav{display:flex;gap:6px}.st nav a{padding:9px 16px;border-radius:999px;border:2px solid var(--ink);text-decoration:none;font-weight:600;font-size:15px;transition:background .2s,color .2s}.st nav a:hover{background:var(--ink);color:var(--paper)}
.st-hero{position:relative;padding:clamp(30px,6vw,80px) clamp(18px,4vw,56px) clamp(50px,7vw,90px);overflow:hidden}
.st h1{font:900 clamp(64px,15vw,260px)/.82 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.045em;color:var(--leaf)}
.st h1 .ch{transform-origin:50% 100%;animation:drop .8s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 45ms)}
@keyframes drop{from{transform:translateY(-120%) rotate(-12deg);opacity:0}}
.st h1 .ch:nth-child(4n+2){color:var(--tomato)}.st h1 .ch:nth-child(5n+3){color:var(--plum)}
.st-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;margin-top:clamp(26px,4vw,50px)}
.st-row p{font-size:clamp(18px,1.7vw,23px);max-width:42ch}
.st .cta{display:inline-flex;padding:18px 30px;border-radius:999px;background:var(--tomato);color:#fff;font-weight:700;text-decoration:none;box-shadow:0 6px 0 var(--ink);transition:transform .15s,box-shadow .15s}.st .cta:hover{transform:translateY(3px);box-shadow:0 3px 0 var(--ink)}.st .cta-muted{background:transparent;color:var(--ink);box-shadow:none;border:2px dashed var(--ink)}
.st-sticker{position:absolute;right:clamp(14px,6vw,90px);top:clamp(10px,4vw,40px);width:clamp(110px,14vw,190px);aspect-ratio:1;border-radius:50%;background:var(--tomato);color:#fff;display:grid;place-items:center;text-align:center;font:800 clamp(15px,1.5vw,20px)/1.1 Fraunces,serif;padding:18px;animation:spin 16s linear infinite}
.st-sticker:before{content:"";position:absolute;inset:8px;border:2px dashed rgba(255,255,255,.7);border-radius:50%}
@keyframes spin{to{transform:rotate(360deg)}}
.st-marquee{overflow:hidden;background:var(--ink);color:var(--paper);border-block:3px solid var(--ink);transform:rotate(-2deg);margin:0 -20px}
.st-track{display:flex;width:max-content;animation:slide 22s linear infinite}.st-track span{padding:18px 28px;font:800 clamp(22px,3vw,40px)/1 Fraunces,serif;white-space:nowrap}.st-track span:nth-child(odd){color:var(--moss)}
@keyframes slide{to{transform:translateX(-50%)}}
.st-shelf{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.st h2{font:900 clamp(42px,7vw,110px)/.9 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.04em;max-width:13ch}
.st-goods{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2.5vw,34px);margin-top:clamp(36px,5vw,70px)}
.st-good{background:#fff;border:3px solid var(--ink);border-radius:28px;overflow:hidden;box-shadow:8px 8px 0 var(--ink);transition:transform .25s,box-shadow .25s}.st-good:hover{transform:translate(-4px,-4px) rotate(-1deg);box-shadow:12px 12px 0 var(--ink)}
.st-thing{position:relative;aspect-ratio:1.1;background:var(--moss);overflow:hidden}.st-thing img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.st-good:nth-child(2) .st-thing{background:#f3b6a8}.st-good:nth-child(3) .st-thing{background:#f7cf5d}
.st-thing i{position:absolute;left:50%;bottom:16%;translate:-50% 0;display:block}
.st-good:nth-child(1) .st-thing i{width:38%;height:46%;background:#f2ead8;border-radius:10px 10px 30px 30px;box-shadow:inset 0 -18px 0 #6c8a3a}.st-good:nth-child(1) .st-thing i:after{content:"";position:absolute;right:-30%;top:22%;width:34%;height:42%;border:10px solid #f2ead8;border-left:0;border-radius:0 40px 40px 0}
.st-good:nth-child(2) .st-thing i{width:56%;height:40%;background:repeating-linear-gradient(90deg,#8d3b5c 0 10px,#c06a8a 10px 20px);border-radius:6px;transform:rotate(-6deg)}
.st-good:nth-child(3) .st-thing i{width:34%;height:52%;background:#d98b17;border-radius:16px 16px 22px 22px;box-shadow:inset 0 14px 0 #fff3d6}
.st-good > div:last-child{padding:22px 24px 26px}.st-good h3{font:800 24px/1.15 Fraunces,serif}.st-good p{margin-top:8px;color:#3d4a2c}
.st-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.st-svc article{padding:28px;border-radius:28px;background:var(--leaf);color:var(--paper)}.st-svc article:nth-child(2){background:var(--plum)}.st-svc article:nth-child(3){background:var(--tomato)}
.st-svc h3{font:800 28px/1.1 Fraunces,serif;margin-bottom:10px}
.st-end{margin:0 clamp(18px,4vw,56px) clamp(40px,5vw,60px);padding:clamp(50px,8vw,110px) clamp(24px,5vw,70px);border-radius:40px;background:var(--ink);color:var(--paper);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.st-end h2{color:var(--moss)}
.st footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px}
@media(max-width:820px){.st nav a{padding:6px 10px;font-size:13px}.st .brand{font-size:20px}.st-row,.st-goods,.st-svc{grid-template-columns:1fr}.st-sticker{position:relative;right:auto;top:auto;margin-top:24px}}
.st-intro{position:relative;padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px) clamp(50px,7vw,90px);overflow:hidden}.st-intro h1{font:900 clamp(56px,11vw,180px)/.85 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.045em;color:var(--leaf)}.st-intro h1 .ch{transform-origin:50% 100%;animation:drop .8s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 45ms)}.st-intro p{margin-top:24px;font-size:clamp(18px,1.7vw,23px);max-width:44ch}
.st-about{margin:0 clamp(18px,4vw,56px) clamp(60px,8vw,110px);padding:clamp(40px,6vw,80px);border:3px solid var(--ink);border-radius:36px;background:#fff;box-shadow:10px 10px 0 var(--ink);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(24px,5vw,70px)}.st-about h2{color:var(--plum)}.st-about>p{font-size:clamp(18px,1.6vw,22px)}.st-about ul{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.st-about li{padding:20px;border-radius:20px;background:var(--paper)}.st-about li b{display:block;font:800 20px Fraunces,serif;margin-bottom:6px;color:var(--leaf)}
@media(max-width:820px){.st-about,.st-about ul{grid-template-columns:1fr}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const w = k.c.cards.slice(0, 4).map(x => "<span>" + k.E(x.title) + "</span>").join(""); return '<section class="st-hero" aria-labelledby="h"><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="st-row"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Order a gift box") + '</div><div class="st-sticker" aria-hidden="true">' + k.E(k.c.heroLabel || "Made by hand") + "</div></section>" + (w ? '<div class="st-marquee" aria-hidden="true"><div class="st-track">' + w + w + w + w + "</div></div>" : ""); },
  intro: (k) => { const t = k.intro(); return '<section class="st-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="st-shelf" id="work"><h2>On the shelf this week</h2><div class="st-goods">' + k.c.cards.slice(0, 3).map((x, i) => '<article class="st-good"><div class="st-thing">' + (k.photo(i) || '<i aria-hidden="true"></i>') + "</div><div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>",
  services: (k) => '<section class="st-svc" id="services" aria-label="Services">' + k.c.services.slice(0, 3).map(s => "<article><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></article>").join("") + "</section>",
  about: (k) => '<section class="st-about" id="about"><h2>Meet the makers</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<ul>" + k.aboutItems.map(a => "<li><b>" + k.E(a.title) + "</b>" + k.E(a.text) + "</li>").join("") + "</ul>" : "") + "</section>",
  contact: (k) => '<section class="st-end" id="contact"><h2>Come say hello.</h2>' + k.cta("Email the shop") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

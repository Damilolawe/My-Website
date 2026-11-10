export default {
  id: "md-hp",
  root: "ht",
  fonts: "family=Archivo+Black&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400",
  labels: { work: "Prints", services: "Price list", about: "The shop", contact: "Order prints" },
  demo: {
    name: "Halftone Print Shop", headline: "Printed while you wait.", heroLabel: "Posters, flyers, cards and zines",
    bio: "A neighbourhood print shop with four big printers and a guillotine older than the building. Bring a file on a stick or send it ahead, and pick up your prints the same day.",
    cards: [
      { title: "Gig posters, 200 by Friday", description: "Two colours on heavy matte, folded into the band's tour van." },
      { title: "A zine, stapled and trimmed", description: "Forty pages, 150 copies, ready for the fair on Saturday." },
      { title: "Wedding invitations", description: "Cream card, deckled edge, envelopes to match." },
    ],
    services: [
      { title: "Flyers", description: "A5, 500 copies, from 45." },
      { title: "Posters", description: "A3 to A0, matte or gloss." },
      { title: "Binding", description: "Stapled, stitched or perfect bound." },
    ],
  },
  css: `
.ht{--paper:#fffdf7;--c:#00a6d6;--m:#e6007e;--y:#ffe600;--k:#151515;background:var(--paper);color:var(--k);font:400 18px/1.65 "Source Serif 4",Georgia,serif}
.ht header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:3px solid var(--k)}
.ht .brand{display:flex;align-items:center;gap:10px;font:400 20px/1 "Archivo Black";text-transform:uppercase;text-decoration:none}
.ht .brand:before{content:"";width:26px;height:26px;background:radial-gradient(circle at 30% 30%,var(--c) 30%,transparent 31%),radial-gradient(circle at 70% 30%,var(--m) 30%,transparent 31%),radial-gradient(circle at 50% 70%,var(--y) 30%,transparent 31%);mix-blend-mode:multiply}
.ht nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.ht nav a{text-decoration:none}.ht nav a:hover{color:var(--m)}
.ht-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.ht-label{font-style:italic;color:var(--m)}
.ht h1{position:relative;margin-top:12px;font:400 clamp(58px,8.8vw,148px)/.9 "Archivo Black";text-transform:uppercase;letter-spacing:-.02em}
.ht h1 .ch{animation:ht-reg 1.1s cubic-bezier(.3,1.2,.5,1) both;animation-delay:calc(var(--i) * 20ms)}
@keyframes ht-reg{from{opacity:0;text-shadow:-14px 0 var(--c),14px 6px var(--m),0 -10px var(--y)}}
.ht h1{text-shadow:3px 3px 0 var(--y)}
.ht-hero p{margin-top:22px;max-width:44ch}
.ht .cta{display:inline-flex;margin-top:28px;padding:16px 26px;background:var(--k);color:var(--paper);font:400 16px "Archivo Black";text-transform:uppercase;text-decoration:none;box-shadow:5px 5px 0 var(--m);transition:box-shadow .2s,transform .2s}.ht .cta:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--c)}.ht .cta-muted{background:#efebe0;color:#555;box-shadow:none;font:400 15px "Source Serif 4";text-transform:none}
.ht-press{position:relative;height:clamp(400px,38vw,520px)}
.ht-printer{position:absolute;left:4%;right:4%;top:0;height:120px;border-radius:14px 14px 6px 6px;background:#ddd8cc;border:3px solid var(--k);z-index:2}
.ht-printer:before{content:"";position:absolute;left:12%;right:12%;bottom:-3px;height:12px;background:var(--k);border-radius:4px 4px 0 0}
.ht-printer:after{content:"";position:absolute;right:20px;top:20px;width:12px;height:12px;border-radius:50%;background:#3fd16d;box-shadow:0 0 10px #3fd16d;animation:ht-blink 1s steps(2) infinite}@keyframes ht-blink{50%{opacity:.3}}
.ht-sheet{position:absolute;left:16%;right:16%;top:110px;height:calc(100% - 110px);background:var(--paper);border:2px solid var(--k);box-shadow:0 20px 40px -24px rgba(0,0,0,.4);overflow:hidden;animation:ht-feed 2.6s cubic-bezier(.4,0,.2,1) .4s both}
@keyframes ht-feed{from{transform:translateY(-100%)}}
.ht-art{position:absolute;inset:18px;background:radial-gradient(circle,var(--c) 38%,transparent 40%) 0 0/14px 14px,radial-gradient(circle,var(--m) 34%,transparent 36%) 7px 7px/14px 14px;-webkit-mask:radial-gradient(circle at 60% 40%,#000 0 30%,transparent 62%);mask:radial-gradient(circle at 60% 40%,#000 0 30%,transparent 62%);mix-blend-mode:multiply}
.ht-art2{position:absolute;inset:18px;background:radial-gradient(circle,var(--y) 40%,transparent 42%) 3px 3px/12px 12px;-webkit-mask:linear-gradient(160deg,transparent 40%,#000 70%);mask:linear-gradient(160deg,transparent 40%,#000 70%);mix-blend-mode:multiply}
.ht-sheet b{position:absolute;left:24px;bottom:22px;font:400 clamp(28px,3vw,42px)/.9 "Archivo Black";text-transform:uppercase}
.ht-marks{position:absolute;inset:6px;border:1px dashed #999}
.ht h2{font:400 clamp(42px,6vw,98px)/.95 "Archivo Black";text-transform:uppercase;letter-spacing:-.02em;max-width:14ch}
.ht-prints{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--y)}
.ht-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px)}
.ht-pr{padding:18px 18px 24px;background:var(--paper);border:3px solid var(--k);box-shadow:8px 8px 0 var(--k)}
.ht-pr:before{content:"";display:block;aspect-ratio:3/2;margin-bottom:16px;background:radial-gradient(circle,var(--dot) 40%,transparent 42%) 0 0/10px 10px,#fff}
.ht-pr:nth-child(1){--dot:var(--c)}.ht-pr:nth-child(2){--dot:var(--m)}.ht-pr:nth-child(3){--dot:var(--k)}
.ht-pr:has(img):before{display:none}
.ht-pr img{width:100%;aspect-ratio:3/2;object-fit:cover;margin-bottom:16px}
.ht-pr h3{font:400 22px/1.15 "Archivo Black";text-transform:uppercase}.ht-pr p{margin-top:8px}
.ht-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ht-price table{width:100%;margin-top:clamp(36px,5vw,56px);border-collapse:collapse}
.ht-price th,.ht-price td{padding:20px 0;border-bottom:2px dotted var(--k);text-align:left}.ht-price th{font:400 26px "Archivo Black";text-transform:uppercase;width:40%}
.ht-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--c);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ht-about>p{font-size:clamp(20px,2vw,26px)}.ht-about dl{grid-column:2;margin:0}.ht-about dt{font:400 18px "Archivo Black";text-transform:uppercase;margin-top:16px;color:var(--y)}.ht-about dd{margin:2px 0 0}
.ht-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--m);color:var(--paper)}.ht-end h2{margin:0 auto}
.ht footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.ht nav{gap:12px;font-size:14px}.ht-hero,.ht-list,.ht-about{grid-template-columns:1fr}.ht-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ht-hero" aria-labelledby="h"><div><span class="ht-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Order prints") + '</div><div class="ht-press" aria-hidden="true"><span class="ht-printer"></span><div class="ht-sheet"><span class="ht-marks"></span><span class="ht-art"></span><span class="ht-art2"></span><b>Live<br>Saturday</b></div></div></section>',
  work: (k) => '<section class="ht-prints" id="work"><h2>Fresh off the press</h2><div class="ht-list">' + k.c.cards.map((x, i) => '<article class="ht-pr">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ht-price" id="services"><h2>Price list</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="ht-about" id="about"><h2>Ink on our hands</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ht-end" id="contact"><h2>Send us the file.</h2>' + k.cta("Order prints") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

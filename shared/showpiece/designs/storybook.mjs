export default {
  id: "md-starbucks",
  root: "fb",
  fonts: "family=Gloock&family=Karla:wght@400;700",
  labels: {work:"Stories",services:"How it works",about:"About",contact:"Contact"},
  intros: {work:{title:"The stories",text:"Every object on our shelves started somewhere. Here is where."},features:{title:"How it works",text:"Choose a gift, and we take care of the rest."},studio:{title:"Our story",text:null},contact:{title:"Write to us",text:"Tell us who the gift is for, and we will help you find it."}},
  demo: {
    name: "Far & Fable", headline: "Gifts with a story attached.", heroLabel: "A shop for keepsakes",
    bio: "Every object in the shop comes with the story of who made it and why. We wrap it, write a card, and send it on its way.",
    cards: [
      { title: "The lighthouse keeper's mug", description: "Made by a potter who lives in an old lighthouse." },
      { title: "A blanket for long winters", description: "Woven on a hundred-year-old loom in the hills." },
      { title: "Letters from the orchard", description: "Pressed apple-blossom stationery, one sheet at a time." },
    ],
    services: [
      { title: "Gift wrapping", description: "Paper, ribbon and a handwritten card." },
      { title: "Story cards", description: "Every gift arrives with its maker's story." },
      { title: "Local delivery", description: "Same-day within the city, on a bicycle." },
    ],
  },
  css: `
.fb{--sky:#fbe3d4;--sun:#f2b33d;--green:#00754a;--deep:#0b3d2c;--blush:#f4b9a6;--ink:#1d2a24;background:var(--sky);color:var(--ink);font:400 18px/1.7 Karla,system-ui,sans-serif}
.fb header{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.fb .brand{font:400 28px/1 Gloock,serif;text-decoration:none}
.fb nav{display:flex;gap:28px;font-weight:700}.fb nav a{text-decoration:none;border-bottom:2px solid transparent}.fb nav a:hover{border-color:currentColor}
.fb-hero{position:relative;height:clamp(640px,100svh,980px);overflow:hidden;text-align:center;isolation:isolate}
.fb-sun{position:absolute;left:50%;top:60%;width:clamp(180px,26vw,380px);aspect-ratio:1;border-radius:50%;translate:-50% 0;background:radial-gradient(circle at 40% 35%,#ffd77a,var(--sun));z-index:-3;animation:sunrise 2.4s cubic-bezier(.2,.8,.2,1) both}
@keyframes sunrise{from{transform:translateY(60%);opacity:.3}}
.fb-hill{position:absolute;left:-5%;right:-5%;bottom:0;z-index:-2;border-radius:50% 50% 0 0/100% 100% 0 0}
.fb-h1{height:44%;background:var(--blush);left:-30%;right:30%}.fb-h2{height:36%;background:#e98f74;left:35%;right:-25%}.fb-h3{height:26%;background:var(--green);z-index:-1}.fb-h4{height:14%;background:var(--deep);left:-20%;right:20%;z-index:0}
@supports (animation-timeline:scroll()){.fb-h1{animation:par1 linear both;animation-timeline:scroll()}.fb-h2{animation:par2 linear both;animation-timeline:scroll()}.fb-h4{animation:par3 linear both;animation-timeline:scroll()}.fb-sun{animation:sunrise 2.4s cubic-bezier(.2,.8,.2,1) both,sunset linear both;animation-timeline:auto,scroll();animation-range:normal,0 60vh}
@keyframes par1{to{transform:translateX(-12%)}}@keyframes par2{to{transform:translateX(14%)}}@keyframes par3{to{transform:translateY(40%)}}@keyframes sunset{to{transform:translateY(40%)}}}
.fb-copy{position:relative;z-index:2;padding:clamp(40px,7vw,90px) clamp(18px,4vw,56px) 0}
.fb h1{font:400 clamp(54px,9vw,150px)/.95 Gloock,serif;letter-spacing:-.03em;max-width:13ch;margin:0 auto}
.fb h1 .ch{animation:ink 1.1s ease both;animation-delay:calc(var(--i) * 30ms + .6s)}@keyframes ink{from{opacity:0;filter:blur(8px)}}
.fb-copy p{max-width:44ch;margin:24px auto 0;font-size:clamp(18px,1.6vw,21px)}
.fb .cta{display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:999px;background:var(--deep);color:#fff;font-weight:700;text-decoration:none;transition:background .2s}.fb .cta:hover{background:var(--green)}.fb .cta-muted{background:transparent;color:var(--ink);border:2px solid var(--ink)}
.fb-chapters{background:#fffaf6;padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.fb h2{font:400 clamp(40px,6vw,96px)/1 Gloock,serif;letter-spacing:-.02em;max-width:15ch}
.fb-book{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,44px);margin-top:clamp(40px,6vw,80px)}
.fb-page{position:relative;padding:clamp(28px,3vw,44px);background:#fff;border-radius:4px 20px 20px 4px;box-shadow:inset 10px 0 18px -12px rgba(0,0,0,.25),0 30px 40px -30px rgba(11,61,44,.4);transition:transform .4s}.fb-page:hover{transform:rotate(-1.5deg) translateY(-6px)}
.fb-page:nth-child(2){margin-top:60px}.fb-page:nth-child(3){margin-top:120px}
.fb-page .num{font:400 13px Karla;letter-spacing:.04em;color:var(--green)}
.fb-page h3{margin-top:14px;font:400 clamp(24px,2.3vw,32px)/1.15 Gloock,serif}
.fb-page p:first-letter{float:left;font:400 3.2em/.8 Gloock,serif;margin:6px 8px 0 0;color:var(--green)}
.fb-page p{margin-top:14px}
.fb-page img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;margin-bottom:18px}
.fb-svc{background:var(--green);color:#fff;padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}
.fb-svc ul{list-style:none;margin:0;padding:0}.fb-svc li{padding:22px 0;border-top:1px solid #ffffff40}.fb-svc h3{font:400 28px Gloock,serif}.fb-svc p{opacity:.85}
.fb-end{text-align:center;padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px)}.fb-end h2{margin:0 auto}
.fb footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:15px;background:var(--deep);color:#d9e7df}
@media(max-width:860px){.fb nav{gap:14px;font-size:14px}.fb .brand{font-size:22px}.fb-book,.fb-svc{grid-template-columns:1fr}.fb-page:nth-child(n){margin-top:0}}
.fb-intro{position:relative;overflow:hidden;text-align:center;padding:clamp(60px,9vw,130px) clamp(18px,4vw,56px) clamp(140px,16vw,240px);isolation:isolate}.fb-intro .fb-sun{top:52%;width:clamp(140px,18vw,260px)}.fb-intro .fb-h1{height:30%}.fb-intro .fb-h3{height:16%}.fb-intro h1{font:400 clamp(48px,8vw,130px)/.98 Gloock,serif;letter-spacing:-.03em;max-width:13ch;margin:0 auto}.fb-intro h1 .ch{animation:ink 1.1s ease both;animation-delay:calc(var(--i) * 30ms + .3s)}.fb-intro p{max-width:44ch;margin:20px auto 0}
.fb-about{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);background:#fffaf6;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}.fb-about>p{font-size:clamp(19px,1.8vw,23px)}.fb-about>p:first-letter{float:left;font:400 3.4em/.8 Gloock,serif;margin:6px 10px 0 0;color:var(--green)}.fb-about dl{grid-column:2;margin:0}.fb-about dt{font:400 24px Gloock,serif;margin-top:22px}.fb-about dd{margin:4px 0 0}
@media(max-width:860px){.fb-about{grid-template-columns:1fr}.fb-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="fb-hero" aria-labelledby="h"><div class="fb-sun" aria-hidden="true"></div><div class="fb-hill fb-h1" aria-hidden="true"></div><div class="fb-hill fb-h2" aria-hidden="true"></div><div class="fb-hill fb-h3" aria-hidden="true"></div><div class="fb-hill fb-h4" aria-hidden="true"></div><div class="fb-copy"><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Find a gift") + "</div></section>",
  intro: (k) => { const t = k.intro(); return '<section class="fb-intro" aria-labelledby="h"><div class="fb-sun" aria-hidden="true"></div><div class="fb-hill fb-h1" aria-hidden="true"></div><div class="fb-hill fb-h2" aria-hidden="true"></div><div class="fb-hill fb-h3" aria-hidden="true"></div><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="fb-chapters" id="work"><h2>Every gift has a beginning</h2><div class="fb-book">' + k.c.cards.slice(0, 3).map((x, i) => '<article class="fb-page">' + k.photo(i) + '<span class="num">Chapter ' + (i + 1) + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="fb-svc" id="services"><h2>From our shelf to their door</h2><ul>' + k.c.services.map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fb-about" id="about"><h2>How the shop began</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fb-end" id="contact"><h2>Tell us who it\'s for.</h2>' + k.cta("Write to us") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

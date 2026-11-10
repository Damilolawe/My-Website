export default {
  id: "md-lovable",
  root: "sun",
  fonts: "family=Bagel+Fat+One&family=Outfit:wght@400;500;700",
  labels: { work: "Made with it", services: "Pricing", about: "About", contact: "Start building" },
  intros: {
    work: { title: "Made with Sunroom", text: "Apps people described in a sentence, then used the same week." },
    features: { title: "Pricing", text: "Build for free. Upgrade when people start using it." },
    studio: { title: "About Sunroom", text: null },
    contact: { title: "Start building", text: "Describe your idea. We will have a first version ready in minutes." },
  },
  demo: {
    name: "Sunroom", headline: "Say it. See it.", heroLabel: "Build an app by describing it",
    bio: "Type what you want, in plain words. Sunroom builds a working app you can click through, then changes it every time you ask. When you like it, share the link.",
    cards: [
      { title: "A booking page for a dog walker", description: "Built on a phone, between two walks, in twenty minutes." },
      { title: "A recipe box for a family", description: "Four generations of recipes, searchable by whoever is hungry." },
      { title: "A club league table", description: "Scores in, standings out, updated after every match." },
    ],
    services: [
      { title: "Free", description: "Five apps, shared by link." },
      { title: "Maker", description: "Unlimited apps, your own domain, sign-in for users." },
      { title: "Team", description: "Build together and hand apps over to clients." },
    ],
  },
  css: `
@property --pc{syntax:"<integer>";initial-value:0;inherits:false}
.sun{--ink:#2b1640;--plum:#5a2a82;--sun:#ffb238;--rose:#ff6f91;--peach:#ffe2d1;--milk:#fff8f2;background:var(--milk);color:var(--ink);font:400 18px/1.6 Outfit,system-ui,sans-serif}
.sun header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.sun .brand{font:400 26px/1 "Bagel Fat One";text-decoration:none;color:var(--plum)}
.sun nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.sun nav a{text-decoration:none}.sun nav a:hover{color:var(--rose)}
.sun-hero{position:relative;margin:0 clamp(10px,2vw,24px);padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px);border-radius:36px;overflow:hidden;text-align:center;isolation:isolate;background:linear-gradient(180deg,#ffd9a8,#ffb3c4 55%,#c9a5ff)}
.sun-hero:before{content:"";position:absolute;left:50%;bottom:-45%;width:90vw;aspect-ratio:1;translate:-50% 0;border-radius:50%;z-index:-1;background:radial-gradient(circle,#fff3c4,var(--sun) 40%,transparent 66%);animation:sun-rise 3s cubic-bezier(.2,.8,.2,1) both}
@keyframes sun-rise{from{transform:translateY(30%);opacity:.3}}
.sun h1{font:400 clamp(72px,12vw,210px)/.9 "Bagel Fat One";color:var(--ink);letter-spacing:-.01em}
.sun h1 .ch{animation:sun-bounce .8s cubic-bezier(.3,1.7,.5,1) both;animation-delay:calc(var(--i) * 50ms + .3s)}@keyframes sun-bounce{from{opacity:0;transform:scale(.3)}}
.sun-hero>p{max-width:46ch;margin:22px auto 0;font-size:clamp(18px,1.6vw,21px)}
.sun .cta{display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:999px;background:var(--ink);color:#fff;font-weight:700;text-decoration:none;transition:transform .2s}.sun .cta:hover{transform:scale(1.04)}.sun .cta-muted{background:rgba(255,255,255,.7);color:var(--ink)}
.sun-prompt{display:flex;align-items:center;gap:12px;width:min(640px,100%);margin:40px auto 0;padding:12px 12px 12px 22px;border-radius:999px;background:#fff;box-shadow:0 20px 40px -20px rgba(43,22,64,.5);text-align:left}
.sun-prompt span{flex:1;overflow:hidden;white-space:nowrap;font-size:16px;color:#6b5a7a}
.sun-prompt span b{display:inline-block;overflow:hidden;vertical-align:bottom;font-weight:400;width:0;border-right:2px solid var(--rose);animation:sun-type 3.5s steps(38,end) 1s forwards}
@keyframes sun-type{to{width:38ch}}
.sun-prompt i{width:42px;height:42px;flex:none;border-radius:50%;background:var(--rose);position:relative}.sun-prompt i:after{content:"";position:absolute;left:14px;top:14px;width:12px;height:12px;border-top:3px solid #fff;border-right:3px solid #fff;transform:rotate(-45deg) translate(-2px,2px)}
.sun-app{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:min(640px,100%);margin:18px auto 0}
.sun-app span{height:56px;border-radius:16px;background:rgba(255,255,255,.75);transform:scale(0);animation:sun-block .5s cubic-bezier(.3,1.6,.5,1) forwards}
.sun-app span:nth-child(1){grid-column:span 4;height:34px;animation-delay:4.6s}.sun-app span:nth-child(2){grid-column:span 2;height:90px;animation-delay:4.8s}.sun-app span:nth-child(3){animation-delay:5s}.sun-app span:nth-child(4){animation-delay:5.15s;background:var(--sun)}.sun-app span:nth-child(5){grid-column:span 4;height:30px;animation-delay:5.3s;background:var(--ink)}
@keyframes sun-block{to{transform:none}}
.sun-intro{margin:0 clamp(10px,2vw,24px);padding:clamp(50px,7vw,100px) clamp(18px,4vw,56px);border-radius:36px;background:linear-gradient(180deg,#ffd9a8,#ffb3c4);text-align:center}.sun-intro h1{font-size:clamp(60px,9vw,150px)}.sun-intro p{max-width:44ch;margin:18px auto 0}
.sun h2{font:400 clamp(46px,6.6vw,104px)/.95 "Bagel Fat One";color:var(--plum);max-width:13ch}
.sun-made{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sun-phones{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,3vw,40px);margin-top:clamp(40px,6vw,70px)}
.sun-phone{padding:14px;border-radius:36px;background:var(--ink);transition:transform .4s}.sun-phone:nth-child(2){transform:translateY(40px)}.sun-phone:hover{transform:translateY(-8px) rotate(-1deg)}
.sun-screen{aspect-ratio:9/12;border-radius:24px;overflow:hidden;background:var(--peach);padding:18px;display:grid;align-content:start;gap:10px}
.sun-phone:nth-child(2) .sun-screen{background:#e6dcff}.sun-phone:nth-child(3) .sun-screen{background:#fff0c2}
.sun-screen img{width:100%;height:100%;object-fit:cover;border-radius:16px}
.sun-screen b{height:24px;border-radius:8px;background:rgba(43,22,64,.85);width:60%}.sun-screen i{height:60px;border-radius:14px;background:rgba(255,255,255,.8)}
.sun-phone h3{margin:18px 10px 0;font:700 21px/1.2 Outfit;color:#fff}.sun-phone p{margin:6px 10px 10px;color:#d9cce6;font-size:15px}
.sun-price{padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px)}
.sun-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.sun-price li{padding:30px;border-radius:30px;background:var(--peach)}.sun-price li:nth-child(2){background:var(--plum);color:#fff}
.sun-price h3{font:400 34px "Bagel Fat One"}.sun-price p{margin-top:8px}
.sun-about{margin:0 clamp(10px,2vw,24px) 40px;padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:36px;background:var(--peach);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sun-about>p{font-size:clamp(19px,1.8vw,24px)}.sun-about dl{grid-column:2;margin:0}.sun-about dt{font:400 24px "Bagel Fat One";color:var(--rose);margin-top:16px}.sun-about dd{margin:2px 0 0}
.sun-end{margin:0 clamp(10px,2vw,24px) 20px;padding:clamp(80px,11vw,160px) clamp(18px,4vw,56px);border-radius:36px;background:var(--ink);color:#fff;text-align:center}.sun-end h2{margin:0 auto;color:var(--sun)}.sun-end .cta{background:var(--sun);color:var(--ink)}
.sun footer{display:flex;justify-content:space-between;padding:12px clamp(18px,4vw,56px) 26px;font-size:15px}
@media(max-width:900px){.sun nav{gap:12px;font-size:14px}.sun-phones,.sun-price ul,.sun-about{grid-template-columns:1fr}.sun-phone:nth-child(2){transform:none}.sun-about dl{grid-column:auto}.sun-prompt span b{animation-name:sun-type-sm}@keyframes sun-type-sm{to{width:22ch}}}
@media (prefers-reduced-motion:reduce){.sun-prompt span b{width:auto}.sun-app span{transform:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="sun-hero" aria-labelledby="h"><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start building") + '<div class="sun-prompt" aria-hidden="true"><span><b>A booking page for my dog walking business</b></span><i></i></div><div class="sun-app" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="sun-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="sun-made" id="work"><h2>' + k.h("work", "Ideas that became apps") + '</h2><div class="sun-phones">' + k.c.cards.map((x, i) => '<article class="sun-phone"><div class="sun-screen">' + (k.photo(i) || '<b aria-hidden="true"></b><i aria-hidden="true"></i><i aria-hidden="true"></i>') + "</div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="sun-price" id="services"><h2>' + k.h("services", "Pick a plan") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="sun-about" id="about"><h2>' + k.h("about", "Anyone can make software") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sun-end" id="contact"><h2>' + k.h("contact", "What will you make?") + '</h2>' + k.cta("Start building") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

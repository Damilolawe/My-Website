export default {
  id: "md-revolut",
  root: "ea",
  fonts: "family=Plus+Jakarta+Sans:wght@400;600;800",
  labels: { work: "Features", services: "Plans", about: "About", contact: "Open an account" },
  intros: {
    work: { title: "What it does", text: "Everyday money, sorted on your phone." },
    features: { title: "Plans", text: "Free to start. Upgrade for travel perks and more cashback." },
    studio: { title: "About us", text: null },
    contact: { title: "Open an account", text: "Download the app and sign up in about five minutes." },
  },
  demo: {
    name: "Everyday Account", headline: "Money that keeps up.", heroLabel: "A bank account that lives on your phone",
    bio: "Spend, save and split bills from one app. Every payment shows up instantly, sorted into categories, so you always know what is left for the week.",
    cards: [
      { title: "Split the bill in a tap", description: "Dinner for six, settled before the dessert menu arrives." },
      { title: "Round up into savings", description: "Every coffee rounds up to the nearest dollar and saves the change." },
      { title: "Freeze your card instantly", description: "Lost it? Freeze it in the app, unfreeze when it turns up." },
    ],
    services: [
      { title: "Standard", description: "Free account, free card, instant notifications." },
      { title: "Plus", description: "Cashback on groceries and travel insurance." },
      { title: "Metal", description: "Higher cashback and airport lounge passes." },
    ],
  },
  css: `
@property --bal{syntax:"<integer>";initial-value:0;inherits:false}
.ea{--indigo:#3b2bff;--violet:#8b5cff;--pink:#ff5fc1;--white:#fff;--ink:#0d0b1f;--fog:#eceaff;background:var(--white);color:var(--ink);font:400 17px/1.65 "Plus Jakarta Sans",system-ui,sans-serif}
.ea header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.ea .brand{font:800 21px/1 "Plus Jakarta Sans";letter-spacing:-.04em;text-decoration:none}
.ea nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.ea nav a{text-decoration:none}.ea nav a:hover{color:var(--indigo)}
.ea-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:clamp(30px,5vw,80px);align-items:center;margin:0 clamp(10px,2vw,24px);padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px);border-radius:36px;background:linear-gradient(135deg,var(--indigo),var(--violet) 55%,var(--pink));color:#fff;overflow:hidden;isolation:isolate}
.ea-hero:before{content:"";position:absolute;inset:-30%;z-index:-1;background:conic-gradient(from 0deg,transparent,rgba(255,255,255,.18),transparent 30%);animation:ea-spin 12s linear infinite}@keyframes ea-spin{to{transform:rotate(360deg)}}
.ea h1{font:800 clamp(58px,8.6vw,146px)/.9 "Plus Jakarta Sans";letter-spacing:-.065em}
.ea h1 .ch{animation:ea-in .6s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes ea-in{from{opacity:0;transform:translateY(.4em)}}
.ea-hero p{margin-top:24px;max-width:42ch;font-size:clamp(18px,1.5vw,21px);color:#eae6ff}
.ea .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:999px;background:var(--ink);color:#fff;font-weight:800;text-decoration:none;transition:transform .2s}.ea .cta:hover{transform:scale(1.04)}.ea .cta-muted{background:rgba(255,255,255,.2);color:#fff}
.ea-phone{justify-self:center;width:min(100%,300px);aspect-ratio:9/18.5;padding:14px;border-radius:44px;background:var(--ink);box-shadow:0 40px 80px -30px rgba(13,11,31,.7);animation:ea-float 6s ease-in-out infinite}@keyframes ea-float{50%{transform:translateY(-12px) rotate(-1deg)}}
.ea-screen{height:100%;padding:24px 18px;border-radius:32px;background:var(--fog);color:var(--ink);overflow:hidden}
.ea-screen small{display:block;font-size:12px;color:#6b6890}
.ea-bal{display:block;margin-top:4px;font:800 38px/1 "Plus Jakarta Sans";letter-spacing:-.04em;counter-reset:b var(--bal);animation:ea-count 2.2s cubic-bezier(.2,.8,.2,1) .6s both;--bal:2480}
.ea-bal:before{content:"$" counter(b)}@keyframes ea-count{from{--bal:0}}
.ea-pills{display:flex;gap:6px;margin-top:16px}.ea-pills i{flex:1;height:34px;border-radius:12px;background:#fff}
.ea-tx{margin-top:18px;display:grid;gap:8px}
.ea-tx span{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:#fff;font-size:13px;font-weight:600;animation:ea-slide .5s cubic-bezier(.3,1.4,.5,1) both}
.ea-tx span:before{content:"";width:28px;height:28px;border-radius:9px;background:var(--c)}
.ea-tx span b{margin-left:auto;font-weight:800}
.ea-tx span:nth-child(1){--c:var(--pink);animation-delay:1.2s}.ea-tx span:nth-child(2){--c:var(--violet);animation-delay:1.45s}.ea-tx span:nth-child(3){--c:#ffc83d;animation-delay:1.7s}.ea-tx span:nth-child(4){--c:#2fd5a5;animation-delay:1.95s}
@keyframes ea-slide{from{opacity:0;transform:translateX(40px)}}
.ea-intro{margin:0 clamp(10px,2vw,24px);padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:36px;background:linear-gradient(135deg,var(--indigo),var(--violet) 55%,var(--pink));color:#fff}.ea-intro h1{font-size:clamp(54px,8vw,128px)}.ea-intro p{margin-top:18px;max-width:46ch}
.ea h2{font:800 clamp(44px,6.2vw,100px)/.92 "Plus Jakarta Sans";letter-spacing:-.06em;max-width:13ch}
.ea-feats{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ea-stack{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.ea-feat{padding:30px;border-radius:30px;background:var(--fog);transition:transform .3s}.ea-feat:hover{transform:translateY(-8px)}
.ea-feat:before{content:"";display:block;width:64px;height:40px;margin-bottom:30px;border-radius:10px;background:linear-gradient(135deg,var(--indigo),var(--pink));box-shadow:14px -10px 0 -4px rgba(59,43,255,.25)}
.ea-feat img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:18px;margin-bottom:18px}.ea-feat:has(img):before{display:none}
.ea-feat h3{font:800 24px/1.15 "Plus Jakarta Sans";letter-spacing:-.04em}.ea-feat p{margin-top:8px;color:#4a4770}
.ea-plans{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.ea-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ea-plans li{aspect-ratio:1.586;padding:26px;border-radius:22px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--c);color:#fff}.ea-plans li:nth-child(1){--c:linear-gradient(135deg,#c7c3ef,#8f89c9)}.ea-plans li:nth-child(2){--c:linear-gradient(135deg,var(--indigo),var(--pink))}.ea-plans li:nth-child(3){--c:linear-gradient(135deg,#3a3a46,#0d0b1f)}
.ea-plans h3{font:800 26px "Plus Jakarta Sans"}.ea-plans p{margin-top:4px;font-size:15px;opacity:.9}
.ea-about{margin:0 clamp(10px,2vw,24px) 40px;padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px);border-radius:36px;background:var(--ink);color:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ea-about>p{font-size:clamp(19px,1.8vw,24px);color:#d9d6f5}.ea-about dl{grid-column:2;margin:0}.ea-about dt{font-weight:800;color:var(--pink);margin-top:16px}.ea-about dd{margin:2px 0 0;color:#d9d6f5}
.ea-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ea-end h2{margin:0 auto}
.ea footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#6b6890}
@media(max-width:900px){.ea nav{gap:12px;font-size:14px}.ea-hero,.ea-stack,.ea-plans ul,.ea-about{grid-template-columns:1fr}.ea-about dl{grid-column:auto}.ea-phone{width:min(80%,260px)}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ea-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Open an account") + '</div><div class="ea-phone" aria-hidden="true"><div class="ea-screen"><small>Main account</small><span class="ea-bal"></span><div class="ea-pills"><i></i><i></i><i></i></div><div class="ea-tx"><span>Dinner, split 6 ways<b>-$24</b></span><span>Round-ups<b>+$3</b></span><span>Groceries<b>-$58</b></span><span>Salary<b>+$2,100</b></span></div></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="ea-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="ea-feats" id="work"><h2>Small things that add up</h2><div class="ea-stack">' + k.c.cards.map((x, i) => '<article class="ea-feat">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ea-plans" id="services"><h2>Pick your card</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ea-about" id="about"><h2>Banking without the queue</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ea-end" id="contact"><h2>Your account, in five minutes.</h2>' + k.cta("Open an account") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

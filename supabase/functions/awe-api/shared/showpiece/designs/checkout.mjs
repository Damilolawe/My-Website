export default {
  id: "md-stripe",
  root: "mp",
  fonts: "family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400",
  labels: { work: "Customers", services: "Products", about: "About", contact: "Start now" },
  intros: {
    work: { title: "Who gets paid with us", text: "From a two-person shop to a platform paying thousands of sellers." },
    features: { title: "Products", text: "Checkout, subscriptions and payouts, built to work together." },
    studio: { title: "About Modern Pay", text: null },
    contact: { title: "Start now", text: "Create an account and take a test payment in ten minutes." },
  },
  demo: {
    name: "Modern Pay", headline: "Get paid, anywhere.", heroLabel: "Online payments for growing businesses",
    bio: "Accept cards, wallets and bank transfers in 40 countries with one integration. Money lands in your account in two days, with fees you can read in one line.",
    cards: [
      { title: "A checkout that converts", description: "A bakery's online orders rose a fifth after switching to one-page checkout." },
      { title: "Subscriptions on autopilot", description: "A magazine bills 12,000 readers every month without a spreadsheet." },
      { title: "Paying out to sellers", description: "A craft marketplace pays 900 makers every Friday, automatically." },
    ],
    services: [
      { title: "Checkout", description: "A hosted payment page that works on every device." },
      { title: "Billing", description: "Subscriptions, invoices and failed-payment recovery." },
      { title: "Connect", description: "Split payments and pay out to your sellers." },
    ],
  },
  css: `
.mp{--navy:#0a2540;--blurple:#635bff;--cyan:#00d4ff;--pink:#ff5996;--orange:#ffb04a;--white:#fff;--fog:#f6f9fc;--slate:#425466;background:var(--white);color:var(--navy);font:400 17px/1.65 Archivo,system-ui,sans-serif}
.mp header{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.mp .brand{font:800 22px/1 Archivo;font-stretch:110%;letter-spacing:-.03em;text-decoration:none}
.mp nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.mp nav a{text-decoration:none}.mp nav a:hover{color:var(--blurple)}
.mp-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,7vw,100px) clamp(18px,4vw,56px) clamp(80px,10vw,140px);overflow:hidden;isolation:isolate}
.mp-wave{position:absolute;left:-10%;right:-10%;top:-40%;height:85%;z-index:-1;transform:skewY(-10deg);background:linear-gradient(110deg,var(--orange),var(--pink) 30%,var(--blurple) 60%,var(--cyan));background-size:200% 100%;filter:saturate(1.2);animation:mp-flow 10s ease-in-out infinite alternate}
@keyframes mp-flow{to{background-position:100% 0}}
.mp-label{display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.75);font-weight:600;font-size:14px}
.mp h1{margin-top:18px;font:900 clamp(60px,9.2vw,154px)/.88 Archivo;font-stretch:118%;letter-spacing:-.05em;mix-blend-mode:multiply}
.mp h1 .ch{animation:mp-in .7s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes mp-in{from{opacity:0;transform:translateX(-.3em)}}
.mp-hero p{margin-top:26px;max-width:42ch;color:var(--slate);font-size:clamp(18px,1.5vw,20px)}
.mp .cta{display:inline-flex;margin-top:30px;padding:14px 26px;border-radius:999px;background:var(--navy);color:#fff;font-weight:700;text-decoration:none;transition:background .2s}.mp .cta:hover{background:var(--blurple)}.mp .cta-muted{background:var(--fog);color:var(--slate)}
.mp-pay{justify-self:center;width:min(100%,380px);padding:26px;border-radius:18px;background:#fff;box-shadow:0 50px 100px -20px rgba(50,50,93,.3),0 30px 60px -30px rgba(0,0,0,.35)}
.mp-pay small{font-size:13px;color:var(--slate)}.mp-pay strong{display:block;font:800 34px Archivo;font-stretch:110%;margin-top:2px}
.mp-field{position:relative;margin-top:14px;padding:12px 14px;border:1px solid #e3e8ee;border-radius:8px;font:400 15px "JetBrains Mono",monospace;color:var(--navy);overflow:hidden;white-space:nowrap}
.mp-field label{display:block;font:600 12px Archivo;color:var(--slate);margin-bottom:4px}
.mp-type{display:inline-block;overflow:hidden;vertical-align:bottom;width:0;animation:mp-type 1.8s steps(19,end) .6s forwards}@keyframes mp-type{to{width:19ch}}
.mp-btn{position:relative;margin-top:18px;height:48px;border-radius:8px;background:var(--blurple);color:#fff;font:700 16px/48px Archivo;text-align:center;overflow:hidden}
.mp-btn span{display:block;animation:mp-btn1 .3s ease 2.8s forwards}
.mp-btn b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:10px;background:#18a058;transform:translateY(100%);animation:mp-btn2 .45s cubic-bezier(.3,1.4,.5,1) 3.2s forwards}
.mp-btn b:before{content:"";width:9px;height:16px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg) translateY(-2px)}
@keyframes mp-btn1{to{opacity:0}}@keyframes mp-btn2{to{transform:none}}
.mp-intro{position:relative;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px);overflow:hidden;isolation:isolate}.mp-intro .mp-wave{top:-70%;height:110%}.mp-intro h1{font-size:clamp(52px,8vw,128px)}.mp-intro p{margin-top:18px;max-width:46ch;color:var(--slate)}
.mp h2{font:900 clamp(44px,6.4vw,104px)/.9 Archivo;font-stretch:115%;letter-spacing:-.045em;max-width:13ch}
.mp-cust{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--fog)}
.mp-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.mp-case{position:relative;padding:30px;border-radius:16px;background:#fff;box-shadow:0 20px 40px -24px rgba(50,50,93,.3);overflow:hidden}
.mp-case:before{content:"";position:absolute;left:0;top:0;right:0;height:5px;background:linear-gradient(90deg,var(--orange),var(--pink),var(--blurple),var(--cyan))}
.mp-case img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:10px;margin-bottom:18px}
.mp-case h3{font:800 23px/1.15 Archivo;font-stretch:105%}.mp-case p{margin-top:8px;color:var(--slate)}
.mp-prod{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--navy);color:#fff}
.mp-prod ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.mp-prod li{padding:28px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}
.mp-prod h3{font:800 26px Archivo;font-stretch:115%;background:linear-gradient(90deg,var(--cyan),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}.mp-prod p{margin-top:8px;color:#adbdcc}
.mp-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mp-about>p{font-size:clamp(19px,1.8vw,24px);color:var(--slate)}.mp-about dl{grid-column:2;margin:0}.mp-about dt{font-weight:800;color:var(--blurple);margin-top:16px}.mp-about dd{margin:2px 0 0;color:var(--slate)}
.mp-end{position:relative;padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;overflow:hidden;isolation:isolate}.mp-end .mp-wave{top:auto;bottom:-60%;height:90%}.mp-end h2{margin:0 auto}
.mp footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--slate)}
@media(max-width:900px){.mp nav{gap:12px;font-size:14px}.mp-hero,.mp-grid,.mp-prod ul,.mp-about{grid-template-columns:1fr}.mp-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.mp-type{width:19ch}.mp-btn span{opacity:0}.mp-btn b{transform:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="mp-hero" aria-labelledby="h"><div class="mp-wave" aria-hidden="true"></div><div><span class="mp-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start accepting payments") + '</div><div class="mp-pay" aria-hidden="true"><small>Order total</small><strong>$48.00</strong><div class="mp-field"><label>Card number</label><span class="mp-type">4242 4242 4242 4242</span></div><div class="mp-field"><label>Expiry and CVC</label>12 / 28    123</div><div class="mp-btn"><span>Pay $48.00</span><b>Payment received</b></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="mp-intro" aria-labelledby="h"><div class="mp-wave" aria-hidden="true"></div><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="mp-cust" id="work"><h2>' + k.h("work", "Paid on time, every time") + '</h2><div class="mp-grid">' + k.c.cards.map((x, i) => '<article class="mp-case">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="mp-prod" id="services"><h2>' + k.h("services", "One platform, every payment") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="mp-about" id="about"><h2>' + k.h("about", "Payments, made plain") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mp-end" id="contact"><div class="mp-wave" aria-hidden="true"></div><h2>' + k.h("contact", "Take your first payment today.") + '</h2>' + k.cta("Start accepting payments") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

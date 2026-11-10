export default {
  id: "md-resend",
  root: "lh",
  fonts: "family=Spectral:ital,wght@0,300;0,600;1,300&family=Cutive+Mono",
  labels: { work: "Customers", services: "Pricing", about: "About", contact: "Get an API key" },
  intros: {
    work: { title: "Who sends with us", text: "Receipts, password resets and newsletters that land in the inbox." },
    features: { title: "Pricing", text: "3,000 emails a month free. Simple steps after that." },
    studio: { title: "About Letterhead", text: null },
    contact: { title: "Get an API key", text: "Verify your domain and send your first email in about five minutes." },
  },
  demo: {
    name: "Letterhead", headline: "Email that arrives.", heroLabel: "An email API for developers",
    bio: "Send receipts, sign-in links and updates from your app with a few lines of code. We handle the delivery, the bounces and the spam filters, so your messages reach the inbox.",
    cards: [
      { title: "Sign-in links in under a second", description: "A login flow where the email is there before the user switches tabs." },
      { title: "Receipts that never go to spam", description: "A shop that moved its order emails and stopped getting 'where is my receipt?'" },
      { title: "One template, every inbox", description: "Designed once, checked in forty email apps before sending." },
    ],
    services: [
      { title: "Free", description: "3,000 emails a month, one domain." },
      { title: "Pro", description: "50,000 emails, multiple domains and webhooks." },
      { title: "Scale", description: "Dedicated sending address and priority support." },
    ],
  },
  css: `
.lh{--black:#0c0c0c;--cream:#f2ead8;--paper:#fbf6ea;--wax:#a3201c;--ink:#1d1a16;--mute:#8d8676;background:var(--black);color:var(--cream);font:300 18px/1.65 Spectral,Georgia,serif}
.lh header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.lh .brand{font:600 italic 22px/1 Spectral;text-decoration:none}
.lh nav{display:flex;gap:clamp(14px,2.4vw,30px);font:400 16px "Cutive Mono",monospace}.lh nav a{text-decoration:none;color:#e4dccb}.lh nav a:hover,.lh nav a[aria-current]{color:var(--cream)}
.lh-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.lh-label{font:400 17px "Cutive Mono",monospace;color:#f0a08e}
.lh h1{margin-top:18px;font:300 clamp(62px,9vw,150px)/.95 Spectral;letter-spacing:-.04em}
.lh h1 .ch{animation:lh-in .9s ease both;animation-delay:calc(var(--i) * 35ms)}@keyframes lh-in{from{opacity:0;filter:blur(4px)}}
.lh-hero p{margin-top:24px;max-width:44ch;color:#cfc6b2}
.lh .cta{display:inline-flex;margin-top:30px;padding:15px 26px;border-radius:999px;background:var(--cream);color:var(--black);font:400 15px "Cutive Mono",monospace;text-decoration:none;transition:background .2s}.lh .cta:hover{background:#fff}.lh .cta-muted{background:#1b1a18;color:var(--mute)}
.lh-stage{position:relative;height:clamp(340px,34vw,460px);display:grid;place-items:center}
.lh-env{position:relative;width:min(100%,420px);aspect-ratio:1.55;margin-top:80px}
.lh-back{position:absolute;inset:0;border-radius:6px;background:#d9cdb2}
.lh-letter{z-index:1;position:absolute;left:6%;right:6%;top:6%;height:88%;padding:20px;border-radius:4px;background:var(--paper);color:var(--ink);font:400 clamp(11px,1vw,13px)/1.7 "Cutive Mono",monospace;box-shadow:0 10px 20px -10px rgba(0,0,0,.4);animation:lh-rise 6s cubic-bezier(.6,0,.3,1) infinite}
.lh-letter b{display:block;font:600 18px Spectral;margin-bottom:6px}
.lh-letter i{font-style:normal;color:var(--wax)}
@keyframes lh-rise{0%,12%{transform:translateY(0)}35%,80%{transform:translateY(-62%)}95%,100%{transform:translateY(0)}}
.lh-front{position:absolute;inset:0;border-radius:6px;background:linear-gradient(to top right,#e6dbc1 50%,transparent 50.5%) left/50.5% 100% no-repeat,linear-gradient(to top left,#e6dbc1 50%,transparent 50.5%) right/50.5% 100% no-repeat,linear-gradient(transparent 45%,#eee4cc 45%);z-index:2}
.lh-flap{position:absolute;left:0;right:0;top:0;height:58%;z-index:3;transform-origin:top;background:linear-gradient(to bottom right,#d2c4a6 50%,transparent 50.5%) left/50.5% 100% no-repeat,linear-gradient(to bottom left,#d2c4a6 50%,transparent 50.5%) right/50.5% 100% no-repeat;animation:lh-flap 6s cubic-bezier(.6,0,.3,1) infinite}
@keyframes lh-flap{0%,4%{transform:rotateX(0);z-index:3}14%,88%{transform:rotateX(180deg);z-index:0}100%{transform:rotateX(0);z-index:3}}
.lh-seal{position:absolute;left:50%;top:48%;z-index:4;width:58px;height:58px;margin:-29px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#c9342e,var(--wax) 60%,#6b1210);display:grid;place-items:center;font:600 italic 24px Spectral;color:#f0c9b8;animation:lh-seal 6s ease infinite}
@keyframes lh-seal{0%,3%{transform:scale(1);opacity:1}10%,90%{transform:scale(.4) translateY(80px);opacity:0}100%{transform:scale(1);opacity:1}}
.lh-ok{position:absolute;right:0;bottom:6%;padding:8px 14px;border-radius:999px;background:#1b1a18;font:400 13px "Cutive Mono",monospace;color:#9fdc9a;animation:lh-ok 6s ease infinite}@keyframes lh-ok{0%,35%{opacity:0}42%,85%{opacity:1}100%{opacity:0}}
.lh-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px)}.lh-intro h1{font-size:clamp(54px,8vw,128px)}.lh-intro p{margin-top:18px;max-width:46ch;color:#cfc6b2}
.lh h2{font:300 clamp(44px,6vw,98px)/1 Spectral;letter-spacing:-.035em;max-width:14ch}
.lh-cust{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper);color:var(--ink)}
.lh-mail{margin-top:clamp(40px,6vw,70px);border-top:1px solid #d8cfba}
.lh-row{display:grid;grid-template-columns:180px minmax(0,1fr) minmax(0,1.2fr);gap:24px;align-items:baseline;padding:24px 0;border-bottom:1px solid #d8cfba;font-family:"Cutive Mono",monospace}
.lh-row span{font-size:14px;color:var(--mute)}.lh-row h3{font:600 23px/1.2 Spectral}.lh-row p{font-size:15px;color:#4c4639}
.lh-row img{grid-column:2/-1;width:100%;max-height:240px;object-fit:cover;border-radius:6px}
.lh-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.lh-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.lh-price li{position:relative;padding:28px;background:var(--cream);color:var(--ink);border-radius:4px}
.lh-price li:after{content:"";position:absolute;right:16px;top:16px;width:42px;height:50px;border:2px dashed var(--wax);border-radius:3px}
.lh-price h3{font:600 26px Spectral}.lh-price p{margin-top:8px;color:#4c4639}
.lh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#151412;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.lh-about>p{font-size:clamp(20px,2vw,26px)}.lh-about dl{grid-column:2;margin:0;font-family:"Cutive Mono",monospace;font-size:15px}.lh-about dt{color:var(--wax);margin-top:18px}.lh-about dd{margin:4px 0 0;color:#cfc6b2}
.lh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.lh-end h2{margin:0 auto}
.lh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Cutive Mono",monospace;color:var(--mute);border-top:1px solid #1f1e1b}
@media(max-width:900px){.lh nav{gap:12px;font-size:12px}.lh-hero,.lh-price ul,.lh-about{grid-template-columns:1fr}.lh-row{grid-template-columns:1fr;gap:6px}.lh-row img{grid-column:auto}.lh-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.lh-flap,.lh-seal{display:none}.lh-letter{transform:translateY(-50%)}.lh-ok{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="lh-hero" aria-labelledby="h"><div><span class="lh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Get an API key") + '</div><div class="lh-stage" aria-hidden="true"><div class="lh-env"><span class="lh-back"></span><div class="lh-letter"><b>Your order is on its way</b>to: <i>sam@example.com</i><br>from: orders@yourshop.com<br>status: <i>delivered</i></div><span class="lh-front"></span><span class="lh-flap"></span><span class="lh-seal">L</span></div><span class="lh-ok">delivered in 0.8s</span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="lh-intro" aria-labelledby="h"><span class="lh-label">re: ' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="lh-cust" id="work"><h2>Sent, and received</h2><div class="lh-mail">' + k.c.cards.map((x, i) => '<article class="lh-row"><span>message 0' + (i + 1) + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="lh-price" id="services"><h2>Postage rates</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="lh-about" id="about"><h2>Why we care about email</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="lh-end" id="contact"><h2>Send your first email today.</h2>' + k.cta("Get an API key") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

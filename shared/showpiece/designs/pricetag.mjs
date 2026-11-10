export default {
  id: "md-mydealz",
  root: "bg",
  fonts: "family=Rammetto+One&family=Lato:wght@400;700;900",
  labels: { work: "Today's deals", services: "How it works", about: "About", contact: "Get the deals" },
  demo: {
    name: "Bargain Basement", headline: "Never pay full price.", heroLabel: "A community of deal hunters",
    bio: "Members post the best discounts they find, everyone votes, and the hottest deals rise to the top. Free to join, with a weekly email of the top ten.",
    cards: [
      { title: "Winter coats, 60 percent off", description: "Spotted by a member at 7am, voted to the top by lunch." },
      { title: "Family cinema tickets", description: "Four tickets and popcorn for the price of two, every Sunday." },
      { title: "Cast iron pan, half price", description: "The one that lasts forever, at its lowest price in two years." },
    ],
    services: [
      { title: "Spot it", description: "Post any deal you find, online or in a shop." },
      { title: "Vote it", description: "Hot deals rise, expired ones sink." },
      { title: "Save it", description: "Alerts for the things you are waiting to buy." },
    ],
  },
  css: `
.bg{--yellow:#ffe14d;--red:#ff3b30;--ink:#161616;--paper:#fffdf5;--green:#16a34a;--tag:#fff4c2;background:var(--paper);color:var(--ink);font:400 17px/1.65 Lato,system-ui,sans-serif}
.bg header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--red);color:var(--paper)}
.bg .brand{font:400 20px/1 "Rammetto One";text-decoration:none}
.bg nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:900}.bg nav a{text-decoration:none}.bg nav a:hover{color:var(--yellow)}
.bg-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:var(--yellow);overflow:hidden}
.bg-label{display:inline-block;padding:6px 12px;background:var(--ink);color:var(--yellow);font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:.1em;transform:rotate(-2deg)}
.bg h1{margin-top:20px;font:400 clamp(52px,8vw,132px)/.98 "Rammetto One";letter-spacing:-.02em}
.bg h1 .ch{display:inline-block;animation:bg-in .45s cubic-bezier(.3,1.8,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes bg-in{from{opacity:0;transform:scale(1.8) rotate(10deg)}}
.bg-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.bg .cta{display:inline-flex;margin-top:26px;padding:16px 28px;background:var(--red);color:var(--paper);font-weight:900;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;border:3px solid var(--ink);box-shadow:5px 5px 0 var(--ink);transition:transform .15s,box-shadow .15s}.bg .cta:hover{transform:translate(5px,5px);box-shadow:0 0 0 var(--ink)}.bg .cta-muted{background:var(--paper);color:#555;box-shadow:none;border-width:1px;text-transform:none}
.bg-tag{position:relative;justify-self:center;width:min(100%,380px);padding:40px 34px 34px 64px;background:var(--tag);border:3px solid var(--ink);border-radius:8px 30px 30px 8px;clip-path:polygon(40px 0,100% 0,100% 100%,40px 100%,0 50%);transform:rotate(-8deg);transform-origin:0 50%;animation:bg-swing 3s ease-in-out infinite alternate}
@keyframes bg-swing{to{transform:rotate(-2deg)}}
.bg-tag:before{content:"";position:absolute;left:22px;top:50%;width:18px;height:18px;margin-top:-9px;border-radius:50%;border:3px solid var(--ink);background:var(--yellow)}
.bg-tag small{font-weight:900;text-transform:uppercase;letter-spacing:.12em}
.bg-old{display:block;position:relative;width:max-content;margin-top:8px;font:400 clamp(30px,3.4vw,44px) "Rammetto One";color:#8a8577}
.bg-old:after{content:"";position:absolute;left:-6px;right:-6px;top:50%;height:6px;background:var(--red);transform:rotate(-8deg) scaleX(0);transform-origin:left;animation:bg-slash .4s ease-out both;animation-delay:var(--d)}
@keyframes bg-slash{to{transform:rotate(-8deg) scaleX(1)}}
.bg-new{display:block;margin-top:8px;font:400 clamp(40px,4.4vw,62px)/1 "Rammetto One";color:var(--red);animation:bg-pop .5s cubic-bezier(.3,1.8,.5,1) 2.2s both}@keyframes bg-pop{from{opacity:0;transform:scale(.3)}}
.bg-off{position:absolute;right:16px;top:14px;display:grid;place-items:center;width:84px;height:84px;border-radius:50%;background:var(--red);color:var(--paper);font:400 18px/1 "Rammetto One";text-align:center;animation:bg-pop .5s cubic-bezier(.3,1.8,.5,1) 2.6s both,bg-spin 12s linear 3s infinite}@keyframes bg-spin{to{transform:rotate(360deg)}}
.bg h2{font:400 clamp(38px,5.4vw,88px)/1 "Rammetto One";max-width:14ch}
.bg-deals{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.bg-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.bg-d{position:relative;padding:24px;border:3px dashed var(--ink);border-radius:16px;background:var(--paper)}
.bg-heat{display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:999px;background:var(--red);color:var(--paper);font-weight:900;font-size:14px}
.bg-d img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;margin:14px 0 0}
.bg-d h3{margin-top:14px;font:900 22px/1.25 Lato}.bg-d p{margin-top:8px;color:#4b4b4b}
.bg-how{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper)}
.bg-how ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px);counter-reset:n}
.bg-how li{padding:28px;border:3px solid var(--yellow);border-radius:16px;counter-increment:n}.bg-how li:before{content:counter(n);display:grid;place-items:center;width:52px;height:52px;margin-bottom:18px;border-radius:50%;background:var(--yellow);color:var(--ink);font:400 22px "Rammetto One"}
.bg-how h3{font:400 22px "Rammetto One";color:var(--yellow)}.bg-how p{margin-top:8px}
.bg-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--tag);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.bg-about>p{font-size:clamp(19px,1.8vw,24px)}.bg-about dl{grid-column:2;margin:0}.bg-about dt{font-weight:900;color:var(--red);margin-top:16px}.bg-about dd{margin:2px 0 0}
.bg-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--yellow)}.bg-end h2{margin:0 auto}
.bg footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-weight:700}
@media(max-width:900px){.bg nav{gap:12px;font-size:14px}.bg-hero,.bg-list,.bg-how ol,.bg-about{grid-template-columns:1fr}.bg-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="bg-hero" aria-labelledby="h"><div><span class="bg-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Get the deals") + '</div><div class="bg-tag" aria-hidden="true"><small>Today only</small><span class="bg-old" style="--d:.9s">120.00</span><span class="bg-old" style="--d:1.5s">89.00</span><span class="bg-new">48.00</span><span class="bg-off">60%<br>off</span></div></section>',
  work: (k) => { const h = ["412 votes", "288 votes", "197 votes"]; return '<section class="bg-deals" id="work"><h2>' + k.h("work", "Hottest right now") + '</h2><div class="bg-list">' + k.c.cards.map((x, i) => '<article class="bg-d"><span class="bg-heat">' + h[i % 3] + "</span>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="bg-how" id="services"><h2>' + k.h("services", "How it works") + '</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="bg-about" id="about"><h2>' + k.h("about", "Built by bargain hunters") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="bg-end" id="contact"><h2>' + k.h("contact", "Why pay more?") + '</h2>' + k.cta("Get the deals") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

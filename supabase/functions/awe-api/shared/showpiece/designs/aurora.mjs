export default {
  id: "md-mercury",
  root: "na",
  fonts: "family=Hanken+Grotesk:wght@200;300;500;700",
  labels: { work: "Features", services: "Accounts", about: "About", contact: "Open an account" },
  intros: {
    work: { title: "What you get", text: "Banking for small companies, without the branch visits." },
    features: { title: "Accounts", text: "Free to open, free to run, with interest on every dollar you keep." },
    studio: { title: "About North", text: null },
    contact: { title: "Open an account", text: "Apply online in ten minutes. Most companies are approved in a day." },
  },
  demo: {
    name: "North Banking", headline: "Calm money for busy founders.", heroLabel: "Business banking for startups",
    bio: "A business account that opens in a day, pays interest on your balance and sends invoices for you. One quiet dashboard for everything your company earns and spends.",
    cards: [
      { title: "Invoices that chase themselves", description: "Send, track and remind, then match the payment when it arrives." },
      { title: "Cards for the whole team", description: "Set limits per person, freeze one with a tap." },
      { title: "Interest on idle cash", description: "Earn on the runway you are not spending yet." },
    ],
    services: [
      { title: "Checking", description: "Free transfers, unlimited cards, no minimum balance." },
      { title: "Treasury", description: "Put spare cash to work, withdraw any day." },
      { title: "Bill pay", description: "Upload a bill, approve it, done." },
    ],
  },
  css: `
.na{--night:#060c1d;--deep:#0c1630;--frost:#e9f1ff;--mute:#8d9bba;--aqua:#4ff0c8;--violet:#8b6cff;--line:rgba(233,241,255,.12);background:var(--night);color:var(--frost);font:300 18px/1.65 "Hanken Grotesk",system-ui,sans-serif}
.na header{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.na .brand{font:500 18px/1 "Hanken Grotesk";letter-spacing:.2em;text-transform:uppercase;text-decoration:none}
.na nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:15px}.na nav a{text-decoration:none;color:var(--mute)}.na nav a:hover,.na nav a[aria-current]{color:var(--frost)}
.na-hero{position:relative;min-height:calc(100svh - 70px);display:grid;place-items:center;text-align:center;padding:60px clamp(18px,4vw,56px) 100px;overflow:hidden;isolation:isolate}
.na-sky{position:absolute;inset:-20% -10% 30%;z-index:-1;filter:blur(60px);opacity:.85}
.na-sky i{position:absolute;border-radius:50%;mix-blend-mode:screen}
.na-sky i:nth-child(1){left:5%;top:20%;width:60%;height:40%;background:var(--aqua);animation:na-a 14s ease-in-out infinite alternate}
.na-sky i:nth-child(2){right:0;top:5%;width:55%;height:50%;background:var(--violet);animation:na-b 18s ease-in-out infinite alternate}
.na-sky i:nth-child(3){left:30%;top:35%;width:40%;height:30%;background:#2c7cff;animation:na-c 12s ease-in-out infinite alternate}
@keyframes na-a{to{transform:translate(20%,10%) scaleX(1.3) rotate(8deg)}}@keyframes na-b{to{transform:translate(-25%,15%) scaleY(.7) rotate(-10deg)}}@keyframes na-c{to{transform:translate(-30%,-20%) scale(1.4)}}
.na-ground{position:absolute;left:0;right:0;bottom:0;height:22%;z-index:-1;background:linear-gradient(transparent,var(--night) 70%);}
.na-stars{position:absolute;inset:0;z-index:-1;background-image:radial-gradient(1px 1px at 12% 18%,#fff,transparent),radial-gradient(1px 1px at 72% 12%,#fff,transparent),radial-gradient(1px 1px at 44% 8%,#fff,transparent),radial-gradient(1px 1px at 88% 30%,#fff,transparent),radial-gradient(1px 1px at 22% 40%,#fff,transparent),radial-gradient(1px 1px at 60% 26%,#fff,transparent);opacity:.7}
.na-label{display:inline-block;padding:7px 14px;border-radius:999px;background:rgba(6,12,29,.55);font:500 13px "Hanken Grotesk";letter-spacing:.18em;text-transform:uppercase;color:var(--frost)}
.na h1{margin-top:22px;font:200 clamp(56px,9vw,156px)/.95 "Hanken Grotesk";letter-spacing:-.05em;max-width:14ch}
.na h1 .ch{animation:na-in 1.4s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes na-in{from{opacity:0;filter:blur(10px)}}
.na-hero p{margin:28px auto 0;max-width:46ch;color:#c2cbe0;font-size:clamp(18px,1.5vw,21px)}
.na .cta{display:inline-flex;margin-top:32px;padding:16px 30px;border-radius:999px;background:var(--frost);color:var(--night);font-weight:500;text-decoration:none;box-shadow:0 0 40px rgba(79,240,200,.3);transition:box-shadow .3s}.na .cta:hover{box-shadow:0 0 60px rgba(79,240,200,.7)}.na .cta-muted{background:rgba(233,241,255,.08);color:var(--mute);box-shadow:none}
.na-intro{position:relative;padding:clamp(70px,10vw,140px) clamp(18px,4vw,56px);overflow:hidden;isolation:isolate}.na-intro .na-sky{inset:-60% -10% 0;opacity:.55}.na-intro h1{font-size:clamp(52px,7.6vw,124px)}.na-intro p{margin-top:20px;max-width:46ch;color:#c2cbe0}
.na h2{font:200 clamp(40px,6vw,96px)/1 "Hanken Grotesk";letter-spacing:-.045em;max-width:14ch}
.na-feats{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.na-glass{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.na-pane{position:relative;padding:32px;border-radius:24px;background:linear-gradient(160deg,rgba(233,241,255,.08),rgba(233,241,255,.02));border:1px solid var(--line);overflow:hidden}
.na-pane:before{content:"";position:absolute;right:-30%;top:-40%;width:70%;aspect-ratio:1;border-radius:50%;background:var(--glow,var(--aqua));filter:blur(50px);opacity:.25}.na-pane:nth-child(2){--glow:var(--violet)}.na-pane:nth-child(3){--glow:#2c7cff}
.na-pane img{position:relative;width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin-bottom:18px}
.na-pane h3{position:relative;font:500 23px/1.2 "Hanken Grotesk";letter-spacing:-.02em}.na-pane p{position:relative;margin-top:10px;color:var(--mute)}
.na-accts{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.na-accts ul{margin-top:clamp(36px,5vw,56px);border-top:1px solid var(--line)}
.na-accts li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:30px;padding:28px 0;border-bottom:1px solid var(--line)}
.na-accts h3{font:300 clamp(26px,2.6vw,40px) "Hanken Grotesk";letter-spacing:-.03em}.na-accts p{color:var(--mute);align-self:center}
.na-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--deep);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.na-about>p{font-size:clamp(19px,1.8vw,24px);color:#c2cbe0}.na-about dl{grid-column:2;margin:0}.na-about dt{font:500 13px "Hanken Grotesk";letter-spacing:.18em;text-transform:uppercase;color:var(--aqua);margin-top:20px}.na-about dd{margin:6px 0 0;color:var(--mute)}
.na-end{position:relative;padding:clamp(100px,13vw,190px) clamp(18px,4vw,56px);text-align:center;overflow:hidden;isolation:isolate}.na-end .na-sky{inset:20% -10% -60%;opacity:.5}.na-end h2{margin:0 auto}
.na footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.na nav{gap:12px;font-size:13px}.na .brand{letter-spacing:.1em;font-size:14px}.na-glass,.na-about,.na-accts li{grid-template-columns:1fr}.na-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="na-hero" aria-labelledby="h"><div class="na-stars" aria-hidden="true"></div><div class="na-sky" aria-hidden="true"><i></i><i></i><i></i></div><div class="na-ground" aria-hidden="true"></div><div><span class="na-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Open an account") + "</div></section>",
  intro: (k) => { const t = k.intro(); return '<section class="na-intro" aria-labelledby="h"><div class="na-sky" aria-hidden="true"><i></i><i></i><i></i></div><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="na-feats" id="work"><h2>' + k.h("work", "Everything in one quiet place") + '</h2><div class="na-glass">' + k.c.cards.map((x, i) => '<article class="na-pane">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="na-accts" id="services"><h2>' + k.h("services", "Accounts") + '</h2><ul>' + k.c.services.map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="na-about" id="about"><h2>' + k.h("about", "Built by founders") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="na-end" id="contact"><div class="na-sky" aria-hidden="true"><i></i><i></i><i></i></div><h2>' + k.h("contact", "Your account, open by tomorrow.") + '</h2>' + k.cta("Open an account") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

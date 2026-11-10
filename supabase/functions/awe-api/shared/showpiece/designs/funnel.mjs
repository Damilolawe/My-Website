export default {
  id: "md-posthog",
  root: "eh",
  fonts: "family=Recursive:slnt,wght,CASL,MONO@-15..0,300..900,0..1,0..1",
  labels: { work: "Insights", services: "Pricing", about: "About", contact: "Try it" },
  intros: {
    work: { title: "Things teams found", text: "Small discoveries in the data that changed what they built next." },
    features: { title: "Pricing", text: "The first million events every month are free." },
    studio: { title: "About us", text: null },
    contact: { title: "Try it", text: "Add one line to your app. Your first chart is ready in five minutes." },
  },
  demo: {
    name: "Event Horizon", headline: "See where people drop off.", heroLabel: "Product analytics for small teams",
    bio: "Track what people actually do in your app, then watch the funnel to see exactly where they give up. Session replays show you why.",
    cards: [
      { title: "The signup step nobody finished", description: "One extra form field was costing a third of new signups." },
      { title: "A feature nobody found", description: "Moving one button doubled weekly use in a fortnight." },
      { title: "Replays that ended an argument", description: "Two designers, one replay, a decision by lunchtime." },
    ],
    services: [
      { title: "Free", description: "1 million events and 5,000 replays a month." },
      { title: "Pay as you go", description: "Beyond the free tier, pay only for what you send." },
      { title: "Self-hosted", description: "Run it on your own servers, keep every byte." },
    ],
  },
  css: `
.eh{--night:#1c1b29;--panel:#26253a;--orange:#ff7a1a;--blue:#4c8dff;--cream:#f7f1e5;--yel:#ffcf3f;--mute:#9a97b5;background:var(--cream);color:var(--night);font:400 17px/1.65 Recursive,system-ui,sans-serif;font-variation-settings:"CASL" .6}
.eh header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.eh .brand{font:900 21px/1 Recursive;font-variation-settings:"CASL" 1;text-decoration:none;display:flex;align-items:center;gap:8px}.eh .brand:before{content:"";width:22px;height:22px;background:var(--orange);clip-path:polygon(0 0,100% 0,62% 50%,62% 100%,38% 100%,38% 50%)}
.eh nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.eh nav a{text-decoration:none}.eh nav a:hover{color:var(--orange)}
.eh-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(40px,7vw,100px) clamp(18px,4vw,56px)}
.eh-label{font:500 14px Recursive;font-variation-settings:"MONO" 1;color:var(--orange)}
.eh h1{margin-top:16px;font:900 clamp(56px,8.4vw,140px)/.9 Recursive;font-variation-settings:"CASL" 1;letter-spacing:-.04em}
.eh h1 .ch{animation:eh-in .5s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes eh-in{from{opacity:0;transform:translateY(-.4em) rotate(-6deg)}}
.eh-hero p{margin-top:24px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.eh .cta{display:inline-flex;margin-top:30px;padding:15px 26px;border-radius:10px;background:var(--orange);color:#fff;font-weight:800;text-decoration:none;box-shadow:0 5px 0 #b35100;transition:transform .15s,box-shadow .15s}.eh .cta:hover{transform:translateY(2px);box-shadow:0 3px 0 #b35100}.eh .cta-muted{background:#fff;color:var(--night);box-shadow:none}
.eh-chart{padding:26px;border-radius:22px;background:var(--night);color:var(--cream)}
.eh-chart small{font:400 13px Recursive;font-variation-settings:"MONO" 1;color:var(--mute)}
.eh-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;align-items:end;height:280px;margin-top:20px;border-bottom:2px solid var(--panel)}
.eh-step{position:relative;height:100%;display:flex;flex-direction:column;justify-content:flex-end}
.eh-bar{height:var(--h);border-radius:8px 8px 0 0;background:var(--blue);transform-origin:bottom;animation:eh-rise 1.2s cubic-bezier(.3,1.3,.5,1) both;animation-delay:var(--d)}
.eh-step:nth-child(3) .eh-bar{background:var(--orange)}
.eh-bar:after{content:attr(data-v);position:absolute;left:0;right:0;top:calc(100% - var(--h) - 26px);text-align:center;font:700 14px Recursive;font-variation-settings:"MONO" 1;color:var(--cream);animation:eh-fade .5s ease both;animation-delay:calc(var(--d) + .9s)}
@keyframes eh-rise{from{transform:scaleY(0)}}@keyframes eh-fade{from{opacity:0}}
.eh-names{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:10px;font:400 13px Recursive;font-variation-settings:"MONO" 1;color:var(--mute);text-align:center}
.eh-drop{display:inline-block;margin-top:16px;padding:8px 12px;border-radius:8px;background:var(--orange);font:700 14px Recursive;color:#fff;animation:eh-fade .5s ease 2.2s both}
.eh-intro{padding:clamp(50px,7vw,100px) clamp(18px,4vw,56px)}.eh-intro h1{font-size:clamp(52px,7.6vw,124px)}.eh-intro p{margin-top:18px;max-width:46ch}
.eh h2{font:900 clamp(42px,6vw,96px)/.92 Recursive;font-variation-settings:"CASL" 1;letter-spacing:-.04em;max-width:14ch}
.eh-found{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--night);color:var(--cream)}
.eh-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.eh-card{padding:28px;border-radius:20px;background:var(--panel);border-top:6px solid var(--c,var(--orange))}.eh-card:nth-child(2){--c:var(--blue)}.eh-card:nth-child(3){--c:var(--yel)}
.eh-card code{font:400 13px Recursive;font-variation-settings:"MONO" 1;color:var(--c,var(--orange))}
.eh-card img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:16px}
.eh-card h3{margin-top:12px;font:800 23px/1.2 Recursive;font-variation-settings:"CASL" 1}.eh-card p{margin-top:8px;color:#cfcce3}
.eh-price{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.eh-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.eh-price li{padding:28px;border:2px solid var(--night);border-radius:18px;background:#fff;box-shadow:6px 6px 0 var(--night)}.eh-price li:nth-child(2){background:var(--yel)}
.eh-price h3{font:900 28px Recursive;font-variation-settings:"CASL" 1}.eh-price p{margin-top:8px}
.eh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#efe6d3;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.eh-about>p{font-size:clamp(19px,1.8vw,23px)}.eh-about dl{grid-column:2;margin:0;font-variation-settings:"MONO" 1}.eh-about dt{color:var(--orange);margin-top:16px;font-weight:700}.eh-about dd{margin:2px 0 0}
.eh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--orange);color:#fff;text-align:center}.eh-end h2{margin:0 auto}.eh-end .cta{background:var(--night);box-shadow:0 5px 0 #000}
.eh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.eh nav{gap:12px;font-size:14px}.eh-hero,.eh-cards,.eh-price ul,.eh-about{grid-template-columns:1fr}.eh-about dl{grid-column:auto}.eh-steps{height:200px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const s = [["100%", "1,000", ".3s"], ["72%", "720", ".5s"], ["31%", "310", ".7s"], ["24%", "240", ".9s"]]; return '<section class="eh-hero" aria-labelledby="h"><div><span class="eh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Try it free") + '</div><div class="eh-chart" aria-hidden="true"><small>Signup funnel, last 7 days</small><div class="eh-steps">' + s.map(x => '<div class="eh-step"><span class="eh-bar" data-v="' + x[1] + '" style="--h:' + x[0] + ";--d:" + x[2] + '"></span></div>').join("") + '</div><div class="eh-names"><span>Visit</span><span>Start</span><span>Details</span><span>Done</span></div><span class="eh-drop">57% drop off at the details step</span></div></section>'; },
  intro: (k) => { const t = k.intro(); return '<section class="eh-intro" aria-labelledby="h"><span class="eh-label">event: ' + k.E(k.page) + "_viewed</span><h1 id=\"h\">" + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="eh-found" id="work"><h2>' + k.h("work", "Found in the funnel") + '</h2><div class="eh-cards">' + k.c.cards.map((x, i) => '<article class="eh-card">' + (k.photo(i) || "<code>insight_" + (i + 1) + "</code>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="eh-price" id="services"><h2>' + k.h("services", "Honest pricing") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="eh-about" id="about"><h2>' + k.h("about", "Why we built it") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="eh-end" id="contact"><h2>' + k.h("contact", "Find your drop-off.") + '</h2>' + k.cta("Try it free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

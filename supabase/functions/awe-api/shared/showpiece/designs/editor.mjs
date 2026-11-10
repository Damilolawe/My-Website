export default {
  id: "md-cursor",
  root: "ns",
  fonts: "family=Fragment+Mono&family=Geist:wght@400;500;700;900",
  labels: { work: "Features", services: "Pricing", about: "About", contact: "Download" },
  intros: {
    work: { title: "What it does", text: "An editor that reads your whole project before it suggests a line." },
    features: { title: "Pricing", text: "Free for hobby projects. Paid plans for teams that ship daily." },
    studio: { title: "About Northstack", text: null },
    contact: { title: "Download", text: "Mac, Windows and Linux. Bring your settings, we will import them." },
  },
  demo: {
    name: "Northstack", headline: "Write the next line faster.", heroLabel: "A code editor that knows your project",
    bio: "Northstack reads your whole codebase, then suggests the next line, the next file and the next fix. Press tab to accept. Keep typing to ignore it.",
    cards: [
      { title: "Whole-project context", description: "Suggestions that know your types, your tests and your naming habits." },
      { title: "Fix it in place", description: "Highlight an error, describe the fix, review the diff before it lands." },
      { title: "Ask the codebase", description: "Where is billing handled? Get the files, not a guess." },
    ],
    services: [
      { title: "Hobby", description: "Free, with 2,000 completions a month." },
      { title: "Pro", description: "Unlimited completions and the larger models." },
      { title: "Team", description: "Shared rules, usage reports and single sign-on." },
    ],
  },
  css: `
@property --tw{syntax:"<integer>";initial-value:0;inherits:false}
.ns{--bg:#0e0f13;--panel:#16181f;--line:#262a35;--text:#e8e6e1;--mute:#7d8394;--orange:#ff7a3d;--teal:#5fd4c4;--violet:#b59cff;background:var(--bg);color:var(--text);font:400 17px/1.6 Geist,system-ui,sans-serif}
.ns header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid var(--line)}
.ns .brand{font:500 16px "Fragment Mono",monospace;text-decoration:none;display:flex;align-items:center;gap:8px}.ns .brand:before{content:"";width:10px;height:20px;background:var(--orange);animation:ns-blink 1.1s steps(1) infinite}
@keyframes ns-blink{50%{opacity:0}}
.ns nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:15px}.ns nav a{text-decoration:none;color:var(--mute)}.ns nav a:hover,.ns nav a[aria-current]{color:var(--text)}
.ns-hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.ns-label{font:400 14px "Fragment Mono",monospace;color:var(--orange)}
.ns h1{margin-top:20px;font:900 clamp(54px,7.6vw,124px)/.95 Geist;letter-spacing:-.06em}
.ns h1 .ch{animation:ns-type .01s both;animation-delay:calc(var(--i) * 45ms + .2s)}@keyframes ns-type{from{opacity:0}}
.ns-hero p{margin-top:26px;max-width:44ch;color:#b6b8c1;font-size:clamp(18px,1.5vw,20px)}
.ns .cta{display:inline-flex;margin-top:30px;padding:15px 24px;border-radius:8px;background:var(--text);color:var(--bg);font:700 15px Geist;text-decoration:none;transition:background .2s}.ns .cta:hover{background:var(--orange)}.ns .cta-muted{background:var(--panel);color:var(--mute)}
.ns-ide{border:1px solid var(--line);border-radius:14px;background:var(--panel);overflow:hidden;box-shadow:0 40px 80px -40px #000,0 0 0 1px rgba(255,122,61,.08)}
.ns-tabs{display:flex;gap:2px;padding:10px 12px 0;background:#121319}.ns-tabs span{padding:8px 14px;border-radius:8px 8px 0 0;font:400 13px "Fragment Mono",monospace;color:var(--mute)}.ns-tabs span:first-child{background:var(--panel);color:var(--text)}
.ns-code{padding:20px 0;font:400 clamp(12px,1.05vw,15px)/1.85 "Fragment Mono",monospace;counter-reset:ln}
.ns-code div{padding:0 20px;white-space:pre;counter-increment:ln;overflow:hidden}.ns-code div:before{content:counter(ln);display:inline-block;width:34px;color:#454b5a}
.ns-k{color:var(--violet)}.ns-s{color:var(--teal)}.ns-f{color:var(--orange)}.ns-c{color:#5a6070}
.ns-ghost{position:relative;display:inline-block;overflow:hidden;white-space:pre;vertical-align:bottom;width:0;color:#5a6070;animation:ns-ghost 9s steps(34,end) infinite}
.ns-ghost:after{content:"";position:absolute;right:0;top:15%;width:2px;height:70%;background:var(--orange)}
@keyframes ns-ghost{0%,8%{width:0;color:#5a6070}35%,52%{width:34ch;color:#5a6070}56%,90%{width:34ch;color:var(--text)}100%{width:34ch;color:var(--text)}}
.ns-hint{display:flex;gap:10px;align-items:center;margin:4px 20px 0 54px;font:400 12px "Fragment Mono",monospace;color:var(--mute);animation:ns-hint 9s infinite}.ns-hint b{padding:2px 7px;border:1px solid var(--line);border-radius:4px;font-weight:400;color:var(--text)}
@keyframes ns-hint{0%,34%{opacity:0}38%,52%{opacity:1}56%,100%{opacity:0}}
.ns-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);border-bottom:1px solid var(--line)}.ns-intro h1{font-size:clamp(50px,7vw,110px)}.ns-intro p{margin-top:20px;max-width:46ch;color:#b6b8c1}
.ns h2{font:900 clamp(40px,5.6vw,88px)/.95 Geist;letter-spacing:-.055em;max-width:14ch}
.ns-feats{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ns-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-top:clamp(40px,6vw,70px);background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.ns-feat{padding:30px;background:var(--bg);transition:background .3s}.ns-feat:hover{background:var(--panel)}
.ns-feat code{display:block;font:400 13px "Fragment Mono",monospace;color:var(--orange);margin-bottom:40px}
.ns-feat img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:8px;margin-bottom:20px}
.ns-feat h3{font:700 22px Geist;letter-spacing:-.03em}.ns-feat p{margin-top:8px;color:#9ea2ae}
.ns-price{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.ns-price ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.ns-price li{padding:28px;border:1px solid var(--line);border-radius:14px}.ns-price li:nth-child(2){border-color:var(--orange);box-shadow:0 0 0 1px var(--orange) inset}
.ns-price h3{font:500 15px "Fragment Mono",monospace;color:var(--orange)}.ns-price p{margin-top:12px;font-size:20px}
.ns-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ns-about>p{font-size:clamp(19px,1.8vw,23px);color:#c9cad1}.ns-about pre{grid-column:1/-1;margin:0;padding:24px;border:1px solid var(--line);border-radius:12px;background:var(--panel);font:400 14px/1.8 "Fragment Mono",monospace;white-space:pre-wrap;color:#b6b8c1}.ns-about pre b{font-weight:400;color:var(--teal)}
.ns-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);border-top:1px solid var(--line);text-align:center;background:radial-gradient(50% 60% at 50% 100%,rgba(255,122,61,.18),transparent)}.ns-end h2{margin:0 auto}
.ns footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:400 13px "Fragment Mono",monospace;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.ns nav{gap:12px;font-size:13px}.ns-hero,.ns-grid,.ns-price ul,.ns-about{grid-template-columns:1fr}.ns-ghost{animation-name:ns-ghost-sm}@keyframes ns-ghost-sm{0%,8%{width:0}35%,100%{width:20ch}}.ns-code{font-size:12px}}
@media (prefers-reduced-motion:reduce){.ns-ghost{width:34ch;color:var(--text)}.ns-hint{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ns-hero" aria-labelledby="h"><div><span class="ns-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Download free") + '</div><div class="ns-ide" aria-hidden="true"><div class="ns-tabs"><span>checkout.ts</span><span>cart.ts</span><span>tax.test.ts</span></div><div class="ns-code"><div><span class="ns-k">export function</span> <span class="ns-f">total</span>(cart: Cart) {</div><div>  <span class="ns-k">const</span> subtotal = sum(cart.items)</div><div>  <span class="ns-k">const</span> tax = taxFor(cart.region, subtotal)</div><div>  <span class="ns-ghost">return round(subtotal + tax - cart.discount)</span></div><div>}</div><div> </div><div><span class="ns-c">// suggested from 14 files in this project</span></div></div><div class="ns-hint"><b>Tab</b> to accept</div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="ns-intro" aria-labelledby="h"><span class="ns-label">~/' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="ns-feats" id="work"><h2>' + k.h("work", "Less typing. More shipping.") + '</h2><div class="ns-grid">' + k.c.cards.map((x, i) => '<article class="ns-feat">' + (k.photo(i) || "<code>// feature " + (i + 1) + "</code>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ns-price" id="services"><h2>' + k.h("services", "Plans") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ns-about" id="about"><h2>' + k.h("about", "Built by people who code all day") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<pre>" + k.aboutItems.map(a => "<b>" + k.E(a.title.toLowerCase()) + ":</b> " + k.E(a.text)).join("\n") + "</pre>" : "") + "</section>",
  contact: (k) => '<section class="ns-end" id="contact"><h2>' + k.h("contact", "Open your project. Press tab.") + '</h2>' + k.cta("Download free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "nightgrid",
  root: "ng",
  fonts: "family=Oxanium:wght@400;600;800&family=Share+Tech+Mono",
  labels: { work: "Systems", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Ravi Menon", headline: "All systems nominal.", heroLabel: "Site reliability engineer",
    bio: "I keep large systems calm: on-call rotas that do not burn people out, alerts that mean something, and recovery plans that have actually been tested. Ten years running platforms that cannot go down.",
    cards: [
      { title: "Zero-downtime migration", description: "Moved a booking platform to new data centres without a minute offline." },
      { title: "Alert diet", description: "Cut pages by 80 percent so on-call engineers could sleep again." },
      { title: "Game day drills", description: "Monthly failure drills that found three real problems before customers did." },
    ],
    services: [
      { title: "Reliability reviews", description: "A two-week audit with a prioritised plan." },
      { title: "On-call design", description: "Rotas, runbooks and escalation that work." },
      { title: "Incident coaching", description: "Calm, blameless reviews after things go wrong." },
    ],
  },
  css: `
.ng{--black:#05070a;--panel:#0b1016;--line:#17212c;--green:#3dffa8;--amber:#ffb627;--red:#ff4d5e;--blue:#4da3ff;--text:#cfe6dc;--mute:#5f7a72;background:var(--black);color:var(--text);font:400 16px/1.7 Oxanium,system-ui,sans-serif}
.ng header{display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,4vw,56px);border-bottom:1px solid var(--line);font-family:"Share Tech Mono",monospace}
.ng .brand{font:400 16px "Share Tech Mono";letter-spacing:.1em;text-transform:uppercase;text-decoration:none;color:var(--green)}.ng .brand:before{content:"[ ";color:var(--mute)}.ng .brand:after{content:" ]";color:var(--mute)}
.ng nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:14px;text-transform:uppercase}.ng nav a{text-decoration:none;color:var(--mute)}.ng nav a:hover,.ng nav a[aria-current]{color:var(--green)}
.ng-hero{padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.ng-deck{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);grid-template-rows:auto auto;gap:14px}
.ng-p{position:relative;padding:clamp(20px,2.4vw,32px);background:var(--panel);border:1px solid var(--line);border-radius:6px}
.ng-p:before{content:attr(data-t);position:absolute;left:14px;top:-9px;padding:0 6px;background:var(--black);font:400 11px "Share Tech Mono";letter-spacing:.14em;color:var(--mute)}
.ng-main{grid-row:span 2}
.ng-label{font:400 13px "Share Tech Mono";letter-spacing:.14em;text-transform:uppercase;color:var(--amber)}
.ng h1{margin-top:14px;font:800 clamp(48px,7vw,116px)/.94 Oxanium;letter-spacing:-.02em;color:#fff}
.ng h1 .ch{animation:ng-in .4s steps(3) both;animation-delay:calc(var(--i) * 30ms)}@keyframes ng-in{from{opacity:0;color:var(--green)}}
.ng-main p{margin-top:20px;max-width:48ch}
.ng .cta{display:inline-flex;margin-top:24px;padding:14px 22px;border:1px solid var(--green);color:var(--green);font:400 15px "Share Tech Mono";text-transform:uppercase;letter-spacing:.1em;text-decoration:none;box-shadow:inset 0 0 20px rgba(61,255,168,.15);transition:background .2s,color .2s}.ng .cta:hover{background:var(--green);color:var(--black)}.ng .cta-muted{border-color:var(--line);color:var(--mute);box-shadow:none}
.ng-radar{position:relative;width:100%;max-width:240px;margin:6px auto 0;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,transparent 0 24%,var(--line) 24.5% 25%,transparent 25.5% 49%,var(--line) 49.5% 50%,transparent 50.5% 74%,var(--line) 74.5% 75%,transparent 75.5%),linear-gradient(var(--line),var(--line)) 50% 0/1px 100% no-repeat,linear-gradient(90deg,var(--line),var(--line)) 0 50%/100% 1px no-repeat;border:1px solid var(--line);overflow:hidden}
.ng-sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(61,255,168,.45),transparent 25%);animation:ng-sweep 3s linear infinite}
@keyframes ng-sweep{to{transform:rotate(360deg)}}
.ng-blip{position:absolute;left:var(--x);top:var(--y);width:8px;height:8px;margin:-4px;border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c);animation:ng-blip 3s linear infinite;animation-delay:var(--d)}
@keyframes ng-blip{0%,5%{opacity:1}60%,100%{opacity:.15}}
.ng-gauges{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ng-g{font:400 11px "Share Tech Mono";color:var(--mute);text-transform:uppercase;text-align:center}
.ng-g b{display:block;height:70px;margin-bottom:6px;border:1px solid var(--line);background:linear-gradient(to top,var(--c) var(--v),transparent var(--v));-webkit-mask:repeating-linear-gradient(to top,#000 0 5px,transparent 5px 7px);mask:repeating-linear-gradient(to top,#000 0 5px,transparent 5px 7px);animation:ng-bar 2.4s ease-in-out infinite alternate;animation-delay:var(--d)}
@property --v{syntax:"<percentage>";initial-value:50%;inherits:false}
@keyframes ng-bar{from{--v:30%}to{--v:var(--max)}}
.ng-lights{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.ng-lights i{width:14px;height:14px;border-radius:3px;background:var(--c);box-shadow:0 0 8px var(--c);animation:ng-blink var(--t) steps(2) infinite}@keyframes ng-blink{50%{opacity:.25}}
.ng h2{font:800 clamp(40px,5.6vw,92px)/.95 Oxanium;letter-spacing:-.02em;color:#fff;max-width:15ch}
.ng-sys{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ng-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:clamp(40px,6vw,70px)}
.ng-s{padding:24px;background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--green)}
.ng-s small{font:400 12px "Share Tech Mono";color:var(--green)}.ng-s small:before{content:"";display:inline-block;width:8px;height:8px;margin-right:8px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)}
.ng-s img{width:100%;aspect-ratio:16/10;object-fit:cover;margin:14px 0;filter:grayscale(1) brightness(.8) sepia(.4) hue-rotate(100deg)}
.ng-s h3{margin-top:10px;font:600 20px/1.25 Oxanium;color:#fff}.ng-s p{margin-top:8px;color:#9fb8ae}
.ng-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.ng-svc table{width:100%;margin-top:clamp(36px,5vw,56px);border-collapse:collapse;font-family:"Share Tech Mono",monospace}
.ng-svc th,.ng-svc td{padding:18px 14px;border:1px solid var(--line);text-align:left}.ng-svc th{color:var(--amber);font-weight:400;width:36%;text-transform:uppercase}
.ng-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--panel);border-top:1px solid var(--line);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ng-about>p{font-size:clamp(18px,1.6vw,21px)}.ng-about dl{grid-column:2;margin:0;font-family:"Share Tech Mono",monospace}.ng-about dt{color:var(--blue);margin-top:16px;text-transform:uppercase}.ng-about dd{margin:2px 0 0}
.ng-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ng-end h2{margin:0 auto}
.ng footer{display:flex;justify-content:space-between;padding:18px clamp(18px,4vw,56px);font:400 12px "Share Tech Mono";color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.ng nav{gap:10px;font-size:12px}.ng-deck,.ng-list,.ng-about{grid-template-columns:1fr}.ng-main{grid-row:auto}.ng-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const B = [["30%", "34%", "var(--green)", "0s"], ["68%", "26%", "var(--amber)", ".8s"], ["60%", "72%", "var(--green)", "1.6s"], ["24%", "64%", "var(--blue)", "2.2s"]]; const G = [["CPU", "var(--green)", "62%", "0s"], ["Mem", "var(--blue)", "78%", ".6s"], ["Queue", "var(--amber)", "44%", "1.2s"]]; const L = ["var(--green)", "var(--green)", "var(--amber)", "var(--green)", "var(--blue)", "var(--green)", "var(--green)", "var(--red)", "var(--green)", "var(--green)"]; return '<section class="ng-hero" aria-labelledby="h"><div class="ng-deck"><div class="ng-p ng-main" data-t="Primary"><span class="ng-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Open a channel") + '</div><div class="ng-p" data-t="Radar" aria-hidden="true"><div class="ng-radar"><span class="ng-sweep"></span>' + B.map(b => '<span class="ng-blip" style="--x:' + b[0] + ";--y:" + b[1] + ";--c:" + b[2] + ";--d:" + b[3] + '"></span>').join("") + '</div></div><div class="ng-p" data-t="Load" aria-hidden="true"><div class="ng-gauges">' + G.map(g => '<span class="ng-g"><b style="--c:' + g[1] + ";--max:" + g[2] + ";--d:" + g[3] + '"></b>' + g[0] + "</span>").join("") + '</div><div class="ng-lights">' + L.map((c, i) => '<i style="--c:' + c + ";--t:" + (0.8 + (i % 4) * 0.4).toFixed(1) + 's"></i>').join("") + "</div></div></div></section>"; },
  work: (k) => '<section class="ng-sys" id="work"><h2>Systems I have kept up</h2><div class="ng-list">' + k.c.cards.map((x, i) => '<article class="ng-s"><small>Status: ok</small>' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ng-svc" id="services"><h2>Services</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="ng-about" id="about"><h2>Operator log</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ng-end" id="contact"><h2>Standing by for your signal.</h2>' + k.cta("Open a channel") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

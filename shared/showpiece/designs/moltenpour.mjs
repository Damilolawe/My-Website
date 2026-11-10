export default {
  id: "foundry",
  root: "fy",
  fonts: "family=Big+Shoulders+Stencil+Display:wght@700;900&family=Public+Sans:wght@400;600;800",
  labels: { work: "Projects", services: "Capabilities", about: "The works", contact: "Request a quote" },
  demo: {
    name: "Ironside Fabrication", headline: "Built in steel. Made to last.", heroLabel: "Metal fabrication and casting",
    bio: "Steel staircases, gates, balustrades and one-off castings, made in our own workshop by a team of twelve. We draw it, cut it, weld it, finish it and fit it ourselves.",
    cards: [
      { title: "A spiral staircase", description: "Four floors of a converted warehouse, in raw steel and oak treads." },
      { title: "Park gates", description: "Hand-forged gates for a city park, cast leaves on every bar." },
      { title: "Restaurant canopy", description: "A blackened steel canopy over forty outdoor seats." },
    ],
    services: [
      { title: "Fabrication", description: "Cutting, bending and welding in steel and aluminium." },
      { title: "Casting", description: "Bronze and iron castings from your pattern." },
      { title: "Installation", description: "Our own fitters, start to finish." },
    ],
  },
  css: `
.fy{overflow-x:clip;--soot:#121110;--iron:#2a2725;--steel:#6b6863;--molten:#ff6a00;--glow:#ffc23a;--ash:#ece8e1;--rust:#a3471f;background:var(--soot);color:var(--ash);font:400 17px/1.65 "Public Sans",system-ui,sans-serif}
.fy header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);border-bottom:2px solid var(--iron)}
.fy .brand{font:900 28px/1 "Big Shoulders Stencil Display";letter-spacing:.04em;text-transform:uppercase;text-decoration:none}
.fy nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.fy nav a{text-decoration:none;color:#b8b3aa}.fy nav a:hover,.fy nav a[aria-current]{color:var(--molten)}
.fy-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(40% 60% at 78% 80%,rgba(255,106,0,.25),transparent 70%);overflow:hidden}
.fy-label{font:900 22px "Big Shoulders Stencil Display";letter-spacing:.1em;text-transform:uppercase;color:var(--molten)}
.fy h1{margin-top:10px;font:900 clamp(64px,10vw,170px)/.84 "Big Shoulders Stencil Display";text-transform:uppercase}
.fy h1 .ch{animation:fy-heat 2.4s ease both;animation-delay:calc(var(--i) * 40ms)}@keyframes fy-heat{0%{opacity:0;color:var(--glow);text-shadow:0 0 30px var(--molten)}40%{opacity:1;color:var(--molten);text-shadow:0 0 20px var(--molten)}100%{color:var(--ash);text-shadow:none}}
.fy-hero p{margin-top:22px;max-width:44ch;color:#c9c3b8}
.fy .cta{display:inline-flex;margin-top:28px;padding:16px 28px;background:var(--molten);color:var(--soot);font:900 22px/1 "Big Shoulders Stencil Display";letter-spacing:.06em;text-transform:uppercase;text-decoration:none;transition:background .2s}.fy .cta:hover{background:var(--glow)}.fy .cta-muted{background:var(--iron);color:#9a958c;font:600 15px "Public Sans";text-transform:none;letter-spacing:0}
.fy-pour{position:relative;justify-self:center;width:min(100%,400px);aspect-ratio:.85}
.fy-ladle{position:absolute;left:4%;top:4%;width:52%;aspect-ratio:1.5;border-radius:0 0 50% 50%/0 0 70% 70%;background:linear-gradient(var(--steel),var(--iron));transform:rotate(28deg);transform-origin:80% 20%;box-shadow:inset 0 10px 0 var(--molten),0 0 40px rgba(255,106,0,.4)}
.fy-ladle:before{content:"";position:absolute;left:-40%;top:6%;width:44%;height:12px;background:var(--steel);border-radius:6px}
.fy-stream{position:absolute;left:46%;top:30%;width:16px;height:46%;border-radius:8px;background:linear-gradient(var(--glow),var(--molten));box-shadow:0 0 24px var(--molten),0 0 60px rgba(255,106,0,.6);transform-origin:top;animation:fy-stream 1.2s ease-in-out infinite alternate}
@keyframes fy-stream{from{transform:scaleX(.7)}to{transform:scaleX(1.15)}}
.fy-mould{position:absolute;left:14%;right:14%;bottom:0;height:24%;background:linear-gradient(#3a3532,#1c1a18);clip-path:polygon(0 0,32% 0,32% 30%,68% 30%,68% 0,100% 0,100% 100%,0 100%)}
.fy-fill{position:absolute;left:46%;right:46%;bottom:17%;height:7%;margin-left:-6%;margin-right:-6%;background:var(--molten);box-shadow:0 0 30px var(--molten);animation:fy-fill 4s ease-out both}
@keyframes fy-fill{from{transform:scaleY(.1);transform-origin:bottom}}
.fy-sparks{position:absolute;left:50%;bottom:22%}
.fy-sparks i{position:absolute;width:4px;height:4px;border-radius:50%;background:var(--glow);box-shadow:0 0 6px var(--glow);animation:fy-spark var(--t) ease-out infinite;animation-delay:var(--d)}
@keyframes fy-spark{from{transform:translate(0,0);opacity:1}to{transform:translate(var(--x),var(--y));opacity:0}}
.fy h2{font:900 clamp(52px,7.6vw,128px)/.88 "Big Shoulders Stencil Display";text-transform:uppercase;max-width:14ch}
.fy-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ash);color:var(--soot)}
.fy-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.fy-p{padding:26px;background:#fff;border-top:10px solid var(--rust);position:relative}
.fy-p:after{content:"";position:absolute;right:16px;top:16px;width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#999 30%,#ccc 32%)}
.fy-p small{font:900 18px "Big Shoulders Stencil Display";letter-spacing:.1em;color:var(--rust)}
.fy-p img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:12px 0;filter:grayscale(.5) contrast(1.1)}
.fy-p h3{margin-top:8px;font:800 22px/1.2 "Public Sans"}.fy-p p{margin-top:8px;color:#4c4843}
.fy-cap{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fy-cap ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;margin-top:clamp(36px,5vw,56px);background:var(--iron)}
.fy-cap li{padding:30px;background:var(--soot)}
.fy-cap h3{font:900 34px "Big Shoulders Stencil Display";text-transform:uppercase;color:var(--molten)}.fy-cap p{margin-top:6px;color:#c9c3b8}
.fy-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--rust);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.fy-about>p{font-size:clamp(19px,1.8vw,24px)}.fy-about dl{grid-column:2;margin:0}.fy-about dt{font:900 22px "Big Shoulders Stencil Display";text-transform:uppercase;margin-top:16px;color:var(--glow)}.fy-about dd{margin:2px 0 0}
.fy-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 50% 120%,rgba(255,106,0,.35),var(--soot) 60%)}.fy-end h2{margin:0 auto}
.fy footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#9a958c;border-top:2px solid var(--iron)}
@media(max-width:900px){.fy nav{gap:12px;font-size:14px}.fy-hero,.fy-list,.fy-cap ul,.fy-about{grid-template-columns:1fr}.fy-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="fy-hero" aria-labelledby="h"><div><span class="fy-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Request a quote") + '</div><div class="fy-pour" aria-hidden="true"><span class="fy-ladle"></span><span class="fy-stream"></span><span class="fy-mould"></span><span class="fy-fill"></span><span class="fy-sparks">' + Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI - Math.PI; return '<i style="--x:' + Math.round(Math.cos(a) * (60 + (i % 4) * 25)) + "px;--y:" + Math.round(Math.sin(a) * (50 + (i % 3) * 30)) + "px;--t:" + (0.8 + (i % 4) * 0.25).toFixed(2) + "s;--d:-" + ((i * 0.17) % 1).toFixed(2) + 's"></i>'; }).join("") + "</span></div></section>",
  work: (k) => '<section class="fy-proj" id="work"><h2>' + k.h("work", "Recent work") + '</h2><div class="fy-list">' + k.c.cards.map((x, i) => '<article class="fy-p"><small>Job ' + (214 + i * 17) + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="fy-cap" id="services"><h2>' + k.h("services", "Capabilities") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fy-about" id="about"><h2>' + k.h("about", "The works") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fy-end" id="contact"><h2>' + k.h("contact", "Strike while it is hot.") + '</h2>' + k.cta("Request a quote") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

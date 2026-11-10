export default {
  id: "runwayml",
  root: "rw",
  fonts: "family=Six+Caps&family=Manrope:wght@300;400;600",
  labels: { work: "Films", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Northlight Pictures", headline: "Everything begins with a vision.", heroLabel: "An independent film production company",
    bio: "We develop and produce feature films, documentaries and series with first-time and established directors. Small slates, long commitments, and stories that stay with you after the lights come up.",
    cards: [
      { title: "The light beyond the frame", description: "A feature debut that premiered at a winter festival." },
      { title: "What happens after dark", description: "A documentary about the people who keep a city lit at night." },
      { title: "The future is a canvas", description: "A six-part series about artists in a changing climate." },
    ],
    services: [
      { title: "Development", description: "From treatment to financed script." },
      { title: "Production", description: "Crew, schedule and shoot." },
      { title: "Festivals and sales", description: "Strategy for the right premiere." },
    ],
  },
  css: `
@property --cd{syntax:"<integer>";initial-value:3;inherits:false}
.rw{--black:#050505;--grey:#1a1a1a;--white:#f4f4f2;--mute:#8a8a86;--amber:#d9a441;background:var(--black);color:var(--white);font:300 17px/1.75 Manrope,system-ui,sans-serif}
.rw header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px);position:relative;z-index:3}
.rw .brand{font:400 30px/1 "Six Caps";letter-spacing:.12em;text-transform:uppercase;text-decoration:none}
.rw nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:400;font-size:14px;letter-spacing:.14em;text-transform:uppercase}.rw nav a{text-decoration:none;color:var(--mute)}.rw nav a:hover,.rw nav a[aria-current]{color:var(--white)}
.rw-hero{position:relative;min-height:calc(100svh - 74px);display:grid;align-content:end;padding:60px clamp(18px,4vw,56px) clamp(50px,7vw,90px);overflow:hidden;isolation:isolate}
.rw-leader{position:absolute;inset:0;z-index:2;display:grid;place-items:center;background:#bfbab0;animation:rw-gone .4s steps(1) 3.1s forwards}
@keyframes rw-gone{to{visibility:hidden;opacity:0}}
.rw-leader:before,.rw-leader:after{content:"";position:absolute;background:#222}.rw-leader:before{left:50%;top:0;bottom:0;width:3px}.rw-leader:after{top:50%;left:0;right:0;height:3px}
.rw-ring{position:relative;z-index:1;width:min(60vw,460px);aspect-ratio:1;border-radius:50%;border:6px solid #222;box-shadow:0 0 0 18px #bfbab0,0 0 0 24px #222;background:conic-gradient(rgba(0,0,0,.35) 0 var(--sweep),transparent 0);animation:rw-sweep 1s linear 3;--sweep:0deg}
@property --sweep{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes rw-sweep{to{--sweep:360deg}}
.rw-num{position:absolute;inset:0;z-index:2;display:grid;place-items:center;font:400 clamp(160px,22vw,300px)/1 "Six Caps";color:#222;counter-reset:c var(--cd);animation:rw-count 3s steps(3) both;--cd:0}
.rw-num:before{content:counter(c)}
@keyframes rw-count{from{--cd:3}to{--cd:0}}
.rw-scene{position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 50% at 70% 35%,rgba(217,164,65,.35),transparent 60%),radial-gradient(40% 40% at 20% 80%,rgba(80,110,140,.3),transparent 70%),linear-gradient(180deg,#0d0d0d,#050505);animation:rw-scene 14s ease-in-out infinite alternate}
@keyframes rw-scene{to{background-position:0 0,0 0,0 0;filter:brightness(1.25)}}
.rw-grain{position:absolute;inset:-50%;z-index:-1;background:radial-gradient(circle,rgba(255,255,255,.08) 1px,transparent 1.5px) 0 0/4px 4px;animation:rw-grain .3s steps(2) infinite;opacity:.6}
@keyframes rw-grain{50%{transform:translate(2%,-3%)}}
.rw-bars{position:absolute;left:0;right:0;height:9vh;background:var(--black);z-index:1}.rw-bars.t{top:0}.rw-bars.b{bottom:0}
.rw-label{position:relative;z-index:2;font-weight:400;font-size:13px;letter-spacing:.3em;text-transform:uppercase;color:var(--amber)}
.rw h1{position:relative;z-index:2;margin-top:14px;font:400 clamp(110px,20vw,340px)/.8 "Six Caps";text-transform:uppercase;letter-spacing:.01em}
.rw h1 .ch{animation:rw-in 1.4s ease both;animation-delay:calc(3.2s + var(--i) * 30ms)}@keyframes rw-in{from{opacity:0;filter:blur(8px)}}
.rw-foot{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end;margin-top:24px}
.rw-foot p{max-width:46ch;color:#cfcbc2}
.rw .cta{display:inline-flex;padding:15px 30px;border:1px solid var(--white);color:var(--white);font-weight:400;font-size:13px;letter-spacing:.24em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}.rw .cta:hover{background:var(--white);color:var(--black)}.rw .cta-muted{border-color:#333;color:var(--mute)}
.rw h2{font:400 clamp(80px,12vw,200px)/.85 "Six Caps";text-transform:uppercase}
.rw-films{padding:clamp(80px,10vw,160px) clamp(18px,4vw,56px)}
.rw-list{display:grid;gap:clamp(40px,6vw,80px);margin-top:clamp(40px,6vw,80px)}
.rw-f{position:relative}
.rw-still{display:block;aspect-ratio:2.39;background:var(--g)}
.rw-f img{width:100%;aspect-ratio:2.39;object-fit:cover}
@supports (animation-timeline:view()){.rw-still,.rw-f img{animation:rw-wide linear both;animation-timeline:view();animation-range:entry 0% cover 40%}@keyframes rw-wide{from{clip-path:inset(20% 0)}}}
.rw-f div{display:grid;grid-template-columns:80px minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:baseline;margin-top:20px}
.rw-f span{font-size:13px;letter-spacing:.2em;color:var(--amber)}
.rw-f h3{font:400 clamp(40px,4.4vw,70px)/.9 "Six Caps";text-transform:uppercase}.rw-f p{color:#a9a59c}
.rw-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,160px)}
.rw-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,40px);margin-top:clamp(36px,5vw,56px)}
.rw-svc li{padding-top:18px;border-top:1px solid #2a2a2a}
.rw-svc h3{font:400 40px/1 "Six Caps";text-transform:uppercase}.rw-svc p{margin-top:8px;color:#a9a59c}
.rw-about{padding:clamp(80px,10vw,160px) clamp(18px,4vw,56px);background:var(--white);color:var(--black);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.rw-about>p{font-size:clamp(19px,1.8vw,24px)}.rw-about dl{grid-column:2;margin:0}.rw-about dt{font-weight:600;font-size:12px;letter-spacing:.24em;text-transform:uppercase;margin-top:18px}.rw-about dd{margin:2px 0 0}
.rw-end{padding:clamp(100px,14vw,200px) clamp(18px,4vw,56px);text-align:center}.rw-end .cta{margin-top:30px}
.rw footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);border-top:1px solid #1a1a1a}
@media(max-width:900px){.rw nav{gap:12px;font-size:12px}.rw-foot,.rw-svc ul,.rw-about{grid-template-columns:1fr}.rw-f div{grid-template-columns:1fr}.rw-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.rw-leader{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="rw-hero" aria-labelledby="h"><div class="rw-leader" aria-hidden="true"><span class="rw-ring"></span><span class="rw-num"></span></div><span class="rw-scene" aria-hidden="true"></span><span class="rw-grain" aria-hidden="true"></span><span class="rw-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="rw-foot"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Contact") + "</div></section>",
  work: (k) => { const g = ["radial-gradient(60% 80% at 70% 40%,rgba(217,164,65,.6),transparent 60%),linear-gradient(#1a1a1a,#050505)", "radial-gradient(circle at 20% 60%,#f2d28a 0 2%,transparent 3%),radial-gradient(circle at 60% 50%,#f2d28a 0 1.5%,transparent 2.5%),linear-gradient(#0b1018,#030405)", "linear-gradient(180deg,#3a4a52 0 55%,#1b2226 55%)"]; return '<section class="rw-films" id="work"><h2>' + k.h("work", "Films") + '</h2><div class="rw-list">' + k.c.cards.map((x, i) => '<article class="rw-f">' + (k.photo(i) || '<span class="rw-still" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<div><span>" + String(i + 1).padStart(2, "0") + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="rw-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="rw-about" id="about"><h2>' + k.h("about", "About") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="rw-end" id="contact"><h2>' + k.h("contact", "Roll it.") + '</h2>' + k.cta("Contact") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-oura",
  root: "ms",
  fonts: "family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Alegreya+Sans:wght@400;500;700",
  labels: { work: "Programs", services: "Sessions", about: "The clinic", contact: "Book a consultation" },
  demo: {
    name: "Moonstill Sleep Clinic", headline: "Sleep, restored.", heroLabel: "A clinic for better nights",
    bio: "Specialists in insomnia, snoring and shift-work sleep. We start with two weeks of gentle tracking at home, then build a plan you can actually keep.",
    cards: [
      { title: "Insomnia, eight weeks", description: "A talking therapy program that helps most people fall asleep faster." },
      { title: "Shift-work reset", description: "Light, meals and naps planned around nurses' rotas." },
      { title: "Snoring assessment", description: "A home sleep study and a clear next step." },
    ],
    services: [
      { title: "Consultation", description: "Sixty minutes with a sleep specialist." },
      { title: "Home study", description: "Two weeks of tracking, reviewed with you." },
      { title: "Follow-up", description: "Monthly check-ins until nights are steady." },
    ],
  },
  css: `
.ms{--night:#0e1024;--indigo:#1f2350;--violet:#8b80f9;--moon:#f4ecd8;--rose:#e6b8c8;--mute:#9a9cc0;background:var(--night);color:var(--moon);font:400 18px/1.7 "Alegreya Sans",system-ui,sans-serif}
.ms header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.ms .brand{font:italic 500 26px/1 "Cormorant Garamond";text-decoration:none}
.ms nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.ms nav a{text-decoration:none;color:var(--mute)}.ms nav a:hover,.ms nav a[aria-current]{color:var(--moon)}
.ms-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);overflow:hidden;isolation:isolate}
.ms-hero:before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(1.5px 1.5px at 10% 20%,#fff,transparent),radial-gradient(1px 1px at 30% 70%,#fff,transparent),radial-gradient(1.5px 1.5px at 55% 15%,#fff,transparent),radial-gradient(1px 1px at 80% 60%,#fff,transparent),radial-gradient(1px 1px at 90% 25%,#fff,transparent),radial-gradient(1.5px 1.5px at 45% 85%,#fff,transparent);animation:ms-twinkle 4s ease-in-out infinite alternate}
@keyframes ms-twinkle{to{opacity:.4}}
.ms-label{font:italic 500 22px "Cormorant Garamond";color:var(--violet)}
.ms h1{margin-top:10px;font:500 clamp(64px,10vw,170px)/.92 "Cormorant Garamond";letter-spacing:-.02em}
.ms h1 .ch{animation:ms-in 1.6s ease both;animation-delay:calc(var(--i) * 70ms)}@keyframes ms-in{from{opacity:0;filter:blur(10px)}}
.ms-hero p{margin-top:22px;max-width:44ch;color:#c9c8e0}
.ms .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:999px;border:1px solid var(--violet);color:var(--moon);text-decoration:none;transition:background .3s}.ms .cta:hover{background:var(--violet);color:var(--night)}.ms .cta-muted{border-color:#2c3060;color:var(--mute)}
.ms-ring{position:relative;justify-self:center;width:min(100%,440px);aspect-ratio:1}
.ms-moon{position:absolute;inset:22%;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fffaf0,var(--moon) 50%,#d9cfb4);box-shadow:0 0 80px rgba(244,236,216,.35);animation:ms-glow 5s ease-in-out infinite alternate}
.ms-moon:after{content:"";position:absolute;inset:-2%;border-radius:50%;background:var(--night);transform:translateX(38%);animation:ms-phase 8s ease-in-out infinite alternate}
@keyframes ms-phase{to{transform:translateX(70%)}}
@keyframes ms-glow{to{box-shadow:0 0 120px rgba(139,128,249,.4)}}
.ms-orbit{position:absolute;inset:4%;border-radius:50%;border:1px solid rgba(139,128,249,.35);animation:ms-turn 20s linear infinite}
.ms-orbit:after{content:"";position:absolute;left:50%;top:-8px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--violet);box-shadow:0 0 20px var(--violet)}
@keyframes ms-turn{to{transform:rotate(360deg)}}
.ms-hyp{position:absolute;left:-6%;right:-6%;bottom:-2%;height:28%}
.ms-hyp path{fill:none;stroke:var(--rose);stroke-width:2.5;stroke-linejoin:round;stroke-dasharray:1200;stroke-dashoffset:1200;animation:ms-draw 4s ease 1s forwards}
@keyframes ms-draw{to{stroke-dashoffset:0}}
.ms h2{font:500 clamp(46px,6.6vw,108px)/1 "Cormorant Garamond";letter-spacing:-.015em;max-width:14ch}
.ms-prog{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--indigo)}
.ms-list{margin-top:clamp(40px,6vw,70px)}
.ms-p{display:grid;grid-template-columns:110px minmax(0,1fr) minmax(0,1.3fr);gap:28px;align-items:center;padding:28px 0;border-top:1px solid rgba(139,128,249,.25)}
.ms-phase{width:64px;height:64px;border-radius:50%;background:var(--moon);position:relative;overflow:hidden}.ms-phase:after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--indigo);transform:translateX(var(--p))}
.ms-p h3{font:italic 500 32px/1.1 "Cormorant Garamond"}.ms-p p{color:#c9c8e0}
.ms-p img{grid-column:2/-1;width:100%;max-height:260px;object-fit:cover;border-radius:20px}
.ms-sess{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ms-sess ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.ms-sess li{padding:32px;border-radius:200px 200px 24px 24px;background:linear-gradient(var(--indigo),var(--night));border:1px solid #2c3060;text-align:center}
.ms-sess h3{font:500 30px "Cormorant Garamond";color:var(--rose)}.ms-sess p{margin-top:8px;color:#c9c8e0}
.ms-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--moon);color:var(--night);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ms-about>p{font:italic 500 clamp(22px,2.2vw,28px)/1.5 "Cormorant Garamond"}.ms-about dl{grid-column:2;margin:0}.ms-about dt{font-weight:700;color:#5148c8;margin-top:16px}.ms-about dd{margin:2px 0 0}
.ms-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 50% 100%,var(--indigo),var(--night) 60%)}.ms-end h2{margin:0 auto}
.ms footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute)}
@media(max-width:900px){.ms nav{gap:12px;font-size:14px}.ms-hero,.ms-sess ul,.ms-about{grid-template-columns:1fr}.ms-p{grid-template-columns:72px 1fr}.ms-p p,.ms-p img{grid-column:2}.ms-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ms-hero" aria-labelledby="h"><div><span class="ms-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a consultation") + '</div><div class="ms-ring" aria-hidden="true"><span class="ms-orbit"></span><span class="ms-moon"></span><svg class="ms-hyp" viewBox="0 0 400 100" preserveAspectRatio="none"><path d="M0 20 H40 V60 H80 V85 H130 V60 H160 V30 H200 V70 H240 V90 H280 V55 H320 V25 H360 V45 H400"/></svg></div></section>',
  work: (k) => { const p = ["20%", "50%", "80%"]; return '<section class="ms-prog" id="work"><h2>Programs</h2><div class="ms-list">' + k.c.cards.map((x, i) => '<article class="ms-p"><span class="ms-phase" aria-hidden="true" style="--p:' + p[i % 3] + '"></span><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ms-sess" id="services"><h2>Sessions</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ms-about" id="about"><h2>Quiet, patient care</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ms-end" id="contact"><h2>Goodnight, for real this time.</h2>' + k.cta("Book a consultation") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

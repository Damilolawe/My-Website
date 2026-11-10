export default {
  id: "orbit",
  root: "or",
  fonts: "family=Audiowide&family=Rajdhani:wght@400;500;700",
  labels: { work: "Projects", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Ada Voss", headline: "Designing in three dimensions.", heroLabel: "Spatial and XR designer",
    bio: "I design interfaces you can walk around: museum installations, training simulators and mixed-reality tools. Eight years at the edge of screens, now designing for the space beyond them.",
    cards: [
      { title: "A walk-through planetarium", description: "A museum room where visitors steer the night sky with their hands." },
      { title: "Surgical training simulator", description: "Practice in mixed reality before the first real operation." },
      { title: "Showroom in a headset", description: "A furniture brand's full catalogue at true scale, in your living room." },
    ],
    services: [
      { title: "Spatial UX", description: "Interaction design for headsets and rooms." },
      { title: "Prototypes", description: "Working demos in weeks, not months." },
      { title: "Installations", description: "Interactive exhibits for museums and events." },
    ],
  },
  css: `
.or{--space:#05060f;--deep:#0c1030;--violet:#8a6bff;--cyan:#4de1ff;--white:#eef0ff;--mute:#8d92b8;background:var(--space);color:var(--white);font:400 18px/1.65 Rajdhani,system-ui,sans-serif}
.or header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.or .brand{font:400 18px/1 Audiowide;letter-spacing:.06em;text-decoration:none}
.or nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;letter-spacing:.06em;text-transform:uppercase;font-size:15px}.or nav a{text-decoration:none;color:var(--mute)}.or nav a:hover,.or nav a[aria-current]{color:var(--cyan)}
.or-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);background:radial-gradient(50% 60% at 75% 50%,#1b1650,transparent 70%);overflow:hidden}
.or-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(1px 1px at 12% 22%,#fff,transparent),radial-gradient(1px 1px at 42% 72%,#fff,transparent),radial-gradient(1.5px 1.5px at 62% 18%,#fff,transparent),radial-gradient(1px 1px at 88% 82%,#fff,transparent),radial-gradient(1px 1px at 28% 88%,#fff,transparent);opacity:.7}
.or-label{font:500 15px Rajdhani;letter-spacing:.24em;text-transform:uppercase;color:var(--cyan)}
.or h1{margin-top:14px;font:400 clamp(44px,6.4vw,108px)/1.02 Audiowide;letter-spacing:-.01em}
.or h1 .ch{display:inline-block;animation:or-in .8s cubic-bezier(.2,.8,.3,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes or-in{from{opacity:0;transform:perspective(400px) rotateY(80deg)}}
.or-hero p{margin-top:22px;max-width:44ch;color:#c2c6e6;font-size:19px}
.or .cta{display:inline-flex;margin-top:28px;padding:15px 28px;border-radius:999px;background:linear-gradient(90deg,var(--violet),var(--cyan));color:var(--space);font:700 16px Rajdhani;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;box-shadow:0 0 40px rgba(138,107,255,.5);transition:box-shadow .3s}.or .cta:hover{box-shadow:0 0 70px rgba(77,225,255,.6)}.or .cta-muted{background:var(--deep);color:var(--mute);box-shadow:none}
.or-gyro{position:relative;justify-self:center;width:min(100%,440px);aspect-ratio:1;perspective:1000px}
.or-stage{position:absolute;inset:0;transform-style:preserve-3d;animation:or-tilt 20s linear infinite}
@keyframes or-tilt{from{transform:rotateX(18deg) rotateY(0)}to{transform:rotateX(18deg) rotateY(360deg)}}
.or-ring{position:absolute;inset:var(--in);border-radius:50%;border:2px solid var(--c);box-shadow:0 0 18px var(--c),inset 0 0 18px var(--c);transform:rotateX(var(--rx)) rotateY(var(--ry));animation:or-ring var(--t) linear infinite}
@keyframes or-ring{to{transform:rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(360deg)}}
.or-ring:after{content:"";position:absolute;left:50%;top:-6px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--c);box-shadow:0 0 14px var(--c)}
.or-core{position:absolute;inset:38%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--cyan) 30%,var(--violet) 70%,#2a1d6b);box-shadow:0 0 60px rgba(77,225,255,.6);animation:or-pulse 3s ease-in-out infinite alternate}@keyframes or-pulse{to{transform:scale(1.08)}}
.or-grid{position:absolute;left:-10%;right:-10%;bottom:-24%;height:50%;background:linear-gradient(var(--violet) 1px,transparent 1px) 0 0/100% 30px,linear-gradient(90deg,var(--violet) 1px,transparent 1px) 0 0/40px 100%;transform:perspective(300px) rotateX(70deg);opacity:.35;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000);animation:or-floor 2s linear infinite}@keyframes or-floor{to{background-position:0 30px,0 0}}
.or h2{font:400 clamp(36px,5vw,84px)/1.05 Audiowide;max-width:15ch}
.or-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.or-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px);perspective:1200px}
.or-p{padding:28px;border-radius:24px;background:linear-gradient(160deg,rgba(138,107,255,.18),rgba(77,225,255,.06));border:1px solid rgba(138,107,255,.35);transition:transform .5s}.or-p:hover{transform:rotateY(-10deg) rotateX(6deg) translateZ(20px)}
.or-p small{font:700 13px Rajdhani;letter-spacing:.2em;color:var(--cyan)}
.or-p img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin:14px 0}
.or-p h3{margin-top:10px;font:700 24px/1.15 Rajdhani}.or-p p{margin-top:8px;color:#b2b7da}
.or-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--deep)}
.or-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.or-svc li{padding:30px;border-radius:50%/30%;text-align:center;border:1px solid rgba(77,225,255,.3);background:radial-gradient(circle at 50% 0,rgba(77,225,255,.15),transparent 70%)}
.or-svc h3{font:400 20px Audiowide;color:var(--cyan)}.or-svc p{margin-top:8px;color:#c2c6e6}
.or-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.or-about>p{font-size:clamp(20px,1.9vw,25px)}.or-about dl{grid-column:2;margin:0}.or-about dt{font:400 15px Audiowide;color:var(--violet);margin-top:18px}.or-about dd{margin:2px 0 0;color:#c2c6e6}
.or-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(circle at 50% 100%,#2a1d6b,var(--space) 60%)}.or-end h2{margin:0 auto}
.or footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid #15183a}
@media(max-width:900px){.or nav{gap:12px;font-size:13px}.or-hero,.or-list,.or-svc ul,.or-about{grid-template-columns:1fr}.or-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const R = [["4%", "var(--violet)", "70deg", "0deg", "14s"], ["10%", "var(--cyan)", "20deg", "60deg", "10s"], ["16%", "#ff6bd6", "80deg", "-40deg", "8s"], ["24%", "var(--white)", "0deg", "75deg", "12s"]]; return '<section class="or-hero" aria-labelledby="h"><div><span class="or-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Get in touch") + '</div><div class="or-gyro" aria-hidden="true"><span class="or-grid"></span><div class="or-stage">' + R.map(r => '<span class="or-ring" style="--in:' + r[0] + ";--c:" + r[1] + ";--rx:" + r[2] + ";--ry:" + r[3] + ";--t:" + r[4] + '"></span>').join("") + '</div><span class="or-core"></span></div></section>'; },
  work: (k) => '<section class="or-proj" id="work"><h2>Projects</h2><div class="or-list">' + k.c.cards.map((x, i) => '<article class="or-p"><small>X ' + (i * 120) + " / Y " + (i * 45 + 30) + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="or-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="or-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="or-end" id="contact"><h2>Step inside the next idea.</h2>' + k.cta("Get in touch") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

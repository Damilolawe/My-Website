export default {
  id: "md-nvidia",
  root: "vc",
  fonts: "family=Tektur:wght@500;800;900&family=Onest:wght@400;600",
  labels: { work: "Projects", services: "Hardware", about: "Lab", contact: "Book time" },
  intros: {
    work: { title: "Rendered here", text: "Films, simulations and models that needed more power than an office has." },
    features: { title: "Hardware", text: "Rent racks by the hour, the week or the season." },
    studio: { title: "The lab", text: null },
    contact: { title: "Book render time", text: "Tell us the job and the deadline. We will quote the hours." },
  },
  demo: {
    name: "Vector Compute", headline: "More frames per second.", heroLabel: "Rentable render and AI compute",
    bio: "Racks of graphics processors you can rent by the hour, for rendering films, training models or running simulations. Upload the job, watch it run, download the result.",
    cards: [
      { title: "An animated short in 9 days", description: "Twelve minutes, 17,000 frames, finished before the festival deadline." },
      { title: "Wind tunnel, simulated", description: "A cycling team tested forty helmet shapes without building one." },
      { title: "A language model, fine-tuned", description: "A legal startup trained on its own documents over a weekend." },
    ],
    services: [
      { title: "On demand", description: "Pay by the minute, no commitment." },
      { title: "Reserved", description: "Guaranteed racks for a fixed season." },
      { title: "Private cluster", description: "Your own hardware, in our cooling." },
    ],
  },
  css: `
.vc{--void:#05070a;--panel:#0e1218;--grid:#1a2230;--lime:#9dff3a;--cyan:#38e1ff;--text:#e6edf3;--mute:#7c8898;background:var(--void);color:var(--text);font:400 17px/1.65 Onest,system-ui,sans-serif}
.vc header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid var(--grid)}
.vc .brand{font:900 20px/1 Tektur;letter-spacing:.04em;text-transform:uppercase;text-decoration:none}.vc .brand:after{content:"";display:inline-block;width:8px;height:8px;margin-left:8px;background:var(--lime);vertical-align:middle}
.vc nav{display:flex;gap:clamp(14px,2.4vw,30px);font:500 14px Tektur;text-transform:uppercase;letter-spacing:.06em}.vc nav a{text-decoration:none;color:var(--mute)}.vc nav a:hover,.vc nav a[aria-current]{color:var(--lime)}
.vc-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px);overflow:hidden;background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/48px 48px;-webkit-mask:none}
.vc-label{font:500 13px Tektur;text-transform:uppercase;letter-spacing:.12em;color:var(--cyan)}
.vc h1{margin-top:18px;font:900 clamp(54px,8vw,132px)/.92 Tektur;text-transform:uppercase;letter-spacing:-.02em}
.vc h1 .ch{animation:vc-scan .5s steps(4) both;animation-delay:calc(var(--i) * 40ms)}@keyframes vc-scan{0%{opacity:0;color:var(--lime)}60%{opacity:1;color:var(--lime)}}
.vc-hero p{margin-top:24px;max-width:44ch;color:#b4bfcc}
.vc .cta{display:inline-flex;margin-top:30px;padding:16px 26px;background:var(--lime);color:var(--void);font:800 15px Tektur;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));transition:background .2s}.vc .cta:hover{background:var(--cyan)}.vc .cta-muted{background:var(--panel);color:var(--mute);text-transform:none}
.vc-scene{position:relative;height:clamp(320px,36vw,480px);perspective:900px;display:grid;place-items:center}
.vc-cube{position:relative;width:clamp(150px,16vw,220px);aspect-ratio:1;transform-style:preserve-3d;animation:vc-spin 14s linear infinite}
.vc-cube i{position:absolute;inset:0;border:2px solid var(--lime);background:rgba(157,255,58,.05);box-shadow:inset 0 0 30px rgba(157,255,58,.15)}
.vc-cube i:nth-child(1){transform:translateZ(calc(var(--s) / 2))}.vc-cube i:nth-child(2){transform:rotateY(180deg) translateZ(calc(var(--s) / 2))}.vc-cube i:nth-child(3){transform:rotateY(90deg) translateZ(calc(var(--s) / 2))}.vc-cube i:nth-child(4){transform:rotateY(-90deg) translateZ(calc(var(--s) / 2))}.vc-cube i:nth-child(5){transform:rotateX(90deg) translateZ(calc(var(--s) / 2))}.vc-cube i:nth-child(6){transform:rotateX(-90deg) translateZ(calc(var(--s) / 2))}
.vc-cube{--s:clamp(150px,16vw,220px)}
.vc-cube b{position:absolute;inset:28%;border:2px solid var(--cyan);transform:translateZ(0) rotateX(45deg) rotateY(45deg);transform-style:preserve-3d}
@keyframes vc-spin{from{transform:rotateX(-24deg) rotateY(0)}to{transform:rotateX(-24deg) rotateY(360deg)}}
.vc-floor{position:absolute;left:0;right:0;bottom:6%;height:40%;background:linear-gradient(var(--lime) 1px,transparent 1px) 0 0/40px 40px,linear-gradient(90deg,var(--lime) 1px,transparent 1px) 0 0/40px 40px;opacity:.25;transform:perspective(500px) rotateX(64deg);transform-origin:bottom;animation:vc-floor 2s linear infinite;-webkit-mask:linear-gradient(transparent,#000 60%);mask:linear-gradient(transparent,#000 60%)}
@keyframes vc-floor{to{background-position:0 40px,0 0}}
.vc-fps{position:absolute;right:0;top:4%;padding:8px 12px;border:1px solid var(--grid);background:var(--panel);font:500 12px Tektur;color:var(--lime);text-transform:uppercase;letter-spacing:.08em}
.vc-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);border-bottom:1px solid var(--grid);background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/48px 48px}.vc-intro h1{font-size:clamp(48px,7vw,112px)}.vc-intro p{margin-top:18px;max-width:46ch;color:#b4bfcc}
.vc h2{font:900 clamp(38px,5.4vw,84px)/.95 Tektur;text-transform:uppercase;max-width:15ch}
.vc-proj{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.vc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(40px,6vw,70px)}
.vc-tile{position:relative;padding:26px;background:var(--panel);border:1px solid var(--grid);clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,0 100%)}
.vc-tile:before{content:"";position:absolute;left:0;top:0;width:60px;height:3px;background:var(--lime)}
.vc-meter{display:block;height:6px;margin-bottom:26px;background:var(--grid)}.vc-meter:after{content:"";display:block;height:100%;width:var(--p,70%);background:linear-gradient(90deg,var(--lime),var(--cyan))}
.vc-tile:nth-child(2) .vc-meter{--p:88%}.vc-tile:nth-child(3) .vc-meter{--p:54%}
.vc-tile img{width:100%;aspect-ratio:16/9;object-fit:cover;margin-bottom:18px}
.vc-tile h3{font:800 22px/1.15 Tektur;text-transform:uppercase}.vc-tile p{margin-top:10px;color:#9aa6b4}
.vc-hw{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.vc-hw ul{margin-top:clamp(36px,5vw,56px);border-top:1px solid var(--lime)}
.vc-hw li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:30px;padding:24px 0;border-bottom:1px solid var(--grid)}
.vc-hw h3{font:800 28px Tektur;text-transform:uppercase;color:var(--lime)}.vc-hw p{color:#b4bfcc;align-self:center}
.vc-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--panel);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.vc-about>p{font-size:clamp(19px,1.8vw,23px);color:#c8d1db}.vc-about dl{grid-column:2;margin:0}.vc-about dt{font:500 13px Tektur;text-transform:uppercase;letter-spacing:.1em;color:var(--cyan);margin-top:18px}.vc-about dd{margin:4px 0 0;color:#b4bfcc}
.vc-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:radial-gradient(40% 60% at 50% 100%,rgba(157,255,58,.18),transparent)}.vc-end h2{margin:0 auto}
.vc footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:500 12px Tektur;text-transform:uppercase;letter-spacing:.08em;color:var(--mute);border-top:1px solid var(--grid)}
@media(max-width:900px){.vc nav{gap:12px;font-size:11px}.vc-hero,.vc-grid,.vc-about,.vc-hw li{grid-template-columns:1fr}.vc-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="vc-hero" aria-labelledby="h"><div><span class="vc-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book render time") + '</div><div class="vc-scene" aria-hidden="true"><span class="vc-floor"></span><div class="vc-cube"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></div><span class="vc-fps">Render 240 fps</span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="vc-intro" aria-labelledby="h"><span class="vc-label">/' + k.E(k.page) + '</span><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="vc-proj" id="work"><h2>' + k.h("work", "Rendered here") + '</h2><div class="vc-grid">' + k.c.cards.map((x, i) => '<article class="vc-tile">' + (k.photo(i) || '<span class="vc-meter" aria-hidden="true"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="vc-hw" id="services"><h2>' + k.h("services", "Rent the racks") + '</h2><ul>' + k.c.services.map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="vc-about" id="about"><h2>' + k.h("about", "Inside the lab") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="vc-end" id="contact"><h2>' + k.h("contact", "Your render, overnight.") + '</h2>' + k.cta("Book render time") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

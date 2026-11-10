export default {
  id: "runwaymulti",
  root: "rm",
  fonts: "family=Libre+Bodoni:ital,wght@0,400;0,600;1,400&family=Figtree:wght@300;400;600",
  labels: { work: "Work", services: "Research", about: "Studio", contact: "Journal" },
  intros: {
    work: { title: "Chapter three: Work", text: "Films, installations and images made over the last ten years." },
    features: { title: "Chapter two: Research", text: "What we study before we shoot: light, movement and the way people look." },
    studio: { title: "Chapter four: Studio", text: null },
    contact: { title: "Chapter five: Journal", text: "Notes from the studio, and a way to reach us." },
  },
  demo: {
    name: "Frame Studies", headline: "Everything begins with a vision.", heroLabel: "A visual studio in five chapters",
    bio: "A small studio making films, installations and photographs about light. We research slowly, shoot carefully and share what we learn along the way.",
    cards: [
      { title: "The light beyond the frame", description: "A study in movement, atmosphere and visual possibility." },
      { title: "What happens after dark", description: "Portraits of an imagined world, told in fragments." },
      { title: "The future is a canvas", description: "A visual experiment in perspective and scale." },
    ],
    services: [
      { title: "Light studies", description: "Months of tests before a single frame is final." },
      { title: "Movement archive", description: "A library of gestures, filmed at high speed." },
      { title: "Open notebooks", description: "Our research, published for anyone to use." },
    ],
  },
  css: `
.rm{--ink:#070707;--smoke:#141414;--bone:#ece6da;--gold:#c8a161;--mute:#8d877c;background:var(--ink);color:var(--bone);font:300 17px/1.8 Figtree,system-ui,sans-serif}
.rm header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px);border-bottom:1px solid #1d1d1d}
.rm .brand{font:italic 400 24px/1 "Libre Bodoni";text-decoration:none}
.rm nav{display:flex;gap:clamp(12px,2vw,28px);font-weight:400;font-size:13px;letter-spacing:.16em;text-transform:uppercase;counter-reset:ch}
.rm nav a{text-decoration:none;color:var(--mute);counter-increment:ch}.rm nav a:before{content:"0" counter(ch) " ";color:#4a4740}.rm nav a:hover,.rm nav a[aria-current]{color:var(--bone)}
.rm-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.rm-label{font-weight:400;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.rm h1{margin-top:18px;font:400 clamp(54px,8vw,134px)/.98 "Libre Bodoni";letter-spacing:-.025em}
.rm h1 .ch{animation:rm-in 1.6s ease both;animation-delay:calc(1.4s + var(--i) * 40ms)}@keyframes rm-in{from{opacity:0}}
.rm-hero p{margin-top:24px;max-width:42ch;color:#c4beb2}
.rm .cta{display:inline-flex;margin-top:30px;padding:14px 28px;border:1px solid var(--gold);color:var(--gold);font-weight:400;font-size:12px;letter-spacing:.26em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}.rm .cta:hover{background:var(--gold);color:var(--ink)}.rm .cta-muted{border-color:#2a2a2a;color:var(--mute)}
.rm-iris{position:relative;justify-self:center;width:min(100%,440px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(200,161,97,.35),transparent 60%),radial-gradient(circle at 40% 40%,#3a3022,#0b0a08 70%);box-shadow:0 0 0 14px #121212,0 0 0 16px #2a2a2a,0 40px 80px -30px #000;overflow:hidden}
@property --hole{syntax:"<percentage>";initial-value:30%;inherits:false}
.rm-blades{position:absolute;inset:0;border-radius:50%;background:repeating-conic-gradient(from 12deg,#3a3a3a 0 3deg,#262626 3deg 22deg,#141414 22deg 45deg);-webkit-mask:radial-gradient(circle,transparent var(--hole),#000 calc(var(--hole) + .6%));mask:radial-gradient(circle,transparent var(--hole),#000 calc(var(--hole) + .6%));animation:rm-open 3.2s cubic-bezier(.6,0,.2,1) .3s both,rm-breathe 6s ease-in-out 3.6s infinite alternate}
@keyframes rm-open{from{--hole:0%;transform:rotate(-70deg)}}
@keyframes rm-breathe{to{--hole:22%;transform:rotate(-20deg)}}
.rm-lens{position:absolute;inset:18%;border-radius:50%;background:radial-gradient(circle at 38% 34%,#fff6dc 0 4%,rgba(255,236,190,.4) 10%,transparent 30%),radial-gradient(circle,#c8a161,#5a4426 45%,#120f0a 75%)}
.rm-glint{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 80%,rgba(255,240,210,.18) 88%,transparent 96%);animation:rm-glint 8s linear infinite}@keyframes rm-glint{to{transform:rotate(360deg)}}
.rm-intro{padding:clamp(60px,9vw,130px) clamp(18px,4vw,56px);border-bottom:1px solid #1d1d1d}
.rm-intro small{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}
.rm-intro h1{font-size:clamp(46px,7vw,116px)}.rm-intro p{margin-top:18px;max-width:48ch;color:#c4beb2}
.rm h2{font:400 clamp(42px,6vw,98px)/1 "Libre Bodoni";letter-spacing:-.02em;max-width:14ch}
.rm-work{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.rm-reel{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:clamp(40px,6vw,70px);padding:22px 4px;background:radial-gradient(circle,var(--ink) 3px,transparent 3.5px) 0 6px/20px 12px repeat-x,radial-gradient(circle,var(--ink) 3px,transparent 3.5px) 0 calc(100% - 6px)/20px 12px repeat-x,#1a1a1a}
.rm-w{background:var(--smoke)}
.rm-frame{display:block;aspect-ratio:1.5;background:var(--g);filter:sepia(.3)}
.rm-w img{width:100%;aspect-ratio:1.5;object-fit:cover;filter:sepia(.3)}
.rm-w div{padding:18px}
.rm-w h3{font:italic 400 24px/1.2 "Libre Bodoni"}.rm-w p{margin-top:6px;font-size:15px;color:#a9a397}
.rm-res{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--smoke)}
.rm-res ol{margin-top:clamp(36px,5vw,56px);counter-reset:r}
.rm-res li{display:grid;grid-template-columns:110px minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:baseline;padding:26px 0;border-top:1px solid #262626;counter-increment:r}
.rm-res li:before{content:"Study " counter(r);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.rm-res h3{font:400 28px "Libre Bodoni"}.rm-res p{color:#bdb7ab}
.rm-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--bone);color:var(--ink);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.rm-about>p{font:400 clamp(22px,2.2vw,30px)/1.45 "Libre Bodoni"}.rm-about dl{grid-column:2;margin:0}.rm-about dt{font-weight:600;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#8a6a35;margin-top:18px}.rm-about dd{margin:2px 0 0}
.rm-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.rm-end h2{margin:0 auto}
.rm footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);border-top:1px solid #1d1d1d}
@media(max-width:900px){.rm nav{gap:10px;font-size:11px}.rm nav a:before{display:none}.rm-hero,.rm-reel,.rm-about{grid-template-columns:1fr}.rm-res li{grid-template-columns:1fr}.rm-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="rm-hero" aria-labelledby="h"><div><span class="rm-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Begin chapter one") + '</div><div class="rm-iris" aria-hidden="true"><span class="rm-lens"></span><span class="rm-blades"></span><span class="rm-glint"></span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="rm-intro" aria-labelledby="h"><small>' + k.E(k.c.name) + '</small><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => { const g = ["radial-gradient(60% 80% at 70% 40%,rgba(200,161,97,.6),transparent 60%),#121212", "radial-gradient(circle at 30% 50%,#e7d3a8 0 3%,transparent 4%),linear-gradient(#0c0f14,#050505)", "linear-gradient(160deg,#3b352b,#0e0d0b)"]; return '<section class="rm-work" id="work"><h2>' + k.h("work", "Selected work") + '</h2><div class="rm-reel">' + k.c.cards.map((x, i) => '<article class="rm-w">' + (k.photo(i) || '<span class="rm-frame" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="rm-res" id="services"><h2>' + k.h("services", "Research") + '</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="rm-about" id="about"><h2>' + k.h("about", "The studio") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="rm-end" id="contact"><h2>' + k.h("contact", "Write to the studio.") + '</h2>' + k.cta("Get in touch") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-spacex",
  root: "ln",
  fonts: "family=Big+Shoulders+Display:wght@800;900&family=Barlow:wght@400;600;700",
  labels: {work:"Missions",services:"Services",about:"Team",contact:"Contact"},
  intros: {work:{title:"Mission log",text:"Every flight, from pad to orbit."},features:{title:"Services",text:"Launch, mission design and the ground systems to run them."},studio:{title:"Who we are",text:null},contact:{title:"Book a launch",text:"Tell us about your payload and the orbit you need."}},
  demo: {
    name: "Skyward Mission", headline: "Built to leave.", heroLabel: "Launch systems and mission design",
    bio: "We design small launch vehicles and the missions they fly. From the first sketch to the moment the clamps release, one team carries it through.",
    cards: [
      { title: "Mission 07: weather sat", description: "A 180 kg payload placed in sun-synchronous orbit." },
      { title: "Second-stage relight", description: "Three burns, one tank, a new record for the team." },
      { title: "Recovery at sea", description: "The first booster we caught and flew again." },
    ],
    services: [
      { title: "Rideshare launch", description: "Space for small payloads on scheduled flights." },
      { title: "Mission design", description: "Orbit, timeline and risk, planned with you." },
      { title: "Ground systems", description: "Telemetry, tracking and a control room that works." },
    ],
  },
  css: `
@property --t{syntax:"<integer>";initial-value:10;inherits:false}
.ln{--black:#000;--white:#f4f4f2;--flame:#ff6a1a;--grey:#8b8b88;background:var(--black);color:var(--white);font:400 17px/1.6 Barlow,system-ui,sans-serif}
.ln header{position:absolute;left:0;right:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.ln .brand{font:800 22px/1 "Big Shoulders Display",sans-serif;letter-spacing:.02em;text-decoration:none;text-transform:uppercase}
.ln nav{display:flex;gap:28px;font-weight:600}.ln nav a{text-decoration:none;opacity:.75}.ln nav a:hover{opacity:1}
.ln-hero{position:relative;min-height:100svh;display:grid;place-items:center;text-align:center;overflow:hidden;isolation:isolate;padding:100px clamp(18px,4vw,56px) 60px}
.ln-stars,.ln-stars:after{position:absolute;inset:-50% 0 0;z-index:-2;background-image:radial-gradient(1px 1px at 10% 20%,#fff,transparent),radial-gradient(1px 1px at 30% 70%,#fff,transparent),radial-gradient(2px 2px at 55% 35%,#fff,transparent),radial-gradient(1px 1px at 75% 15%,#fff,transparent),radial-gradient(1px 1px at 88% 60%,#fff,transparent),radial-gradient(2px 2px at 20% 90%,#fff,transparent),radial-gradient(1px 1px at 65% 85%,#fff,transparent);background-size:340px 340px;animation:drift 40s linear infinite}
.ln-stars:after{content:"";inset:0;background-size:520px 520px;opacity:.6;animation-duration:70s}
@keyframes drift{to{transform:translateY(340px)}}
.ln-count{position:absolute;inset:0;display:grid;place-items:center;font:900 clamp(200px,45vw,640px)/1 "Big Shoulders Display";color:transparent;-webkit-text-stroke:2px rgba(244,244,242,.18);counter-reset:t var(--t);animation:count 3s steps(10,end) .2s both,away .6s ease 3.2s both;z-index:-1}
.ln-count:after{content:counter(t)}
@keyframes count{to{--t:0}}@keyframes away{to{opacity:0;transform:scale(1.4)}}
.ln-trail{position:absolute;left:50%;bottom:0;width:4px;height:0;opacity:1;translate:-50% 0;background:linear-gradient(to top,transparent,var(--flame) 30%,#fff);box-shadow:0 0 24px var(--flame);border-radius:4px;z-index:-1;animation:trail 1.4s cubic-bezier(.6,0,.2,1) 3.2s forwards}
@keyframes trail{to{height:120%;opacity:0}}
.ln h1{font:900 clamp(80px,17vw,300px)/.88 "Big Shoulders Display";text-transform:uppercase;letter-spacing:-.01em}
.ln h1 .split{display:inline-block;animation:launch 1.2s cubic-bezier(.2,.9,.1,1) 3.25s both}
@keyframes launch{from{letter-spacing:.6em;opacity:0;filter:blur(10px);transform:translateY(40px)}}
.ln-hero p{max-width:46ch;margin:26px auto 0;color:#c8c8c4;font-size:clamp(18px,1.6vw,21px);animation:fadein 1s ease 3.8s both}
.ln .cta{display:inline-flex;margin-top:30px;padding:16px 30px;border:2px solid var(--white);font:700 15px Barlow;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s;animation:fadein 1s ease 4s both}.ln .cta:hover{background:var(--white);color:var(--black)}.ln .cta-muted{border-color:var(--grey);color:var(--grey);text-transform:none;letter-spacing:0}
@keyframes fadein{from{opacity:0}}
.ln-log{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.ln h2{font:900 clamp(48px,8vw,130px)/.85 "Big Shoulders Display";text-transform:uppercase;max-width:12ch}
.ln-missions{margin-top:clamp(40px,6vw,80px);border-top:1px solid #333}
.ln-mission{display:grid;grid-template-columns:120px minmax(0,1fr) minmax(0,1fr);gap:30px;padding:clamp(26px,3vw,40px) 0;border-bottom:1px solid #333;align-items:baseline}
.ln-mission .t{font:900 clamp(40px,4vw,64px)/1 "Big Shoulders Display";color:var(--flame)}
.ln-mission h3{font:800 clamp(26px,3vw,44px)/1 "Big Shoulders Display";text-transform:uppercase}.ln-mission p{color:#b5b5b0}
@supports (animation-timeline:view()){.ln-mission{animation:slidein linear both;animation-timeline:view();animation-range:entry 0% cover 35%}@keyframes slidein{from{opacity:0;transform:translateX(-40px)}}}
.ln-svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #333;border-bottom:1px solid #333}
.ln-svc article{padding:clamp(30px,4vw,56px);border-right:1px solid #333}.ln-svc article:last-child{border-right:0}
.ln-svc h3{font:800 32px/1 "Big Shoulders Display";text-transform:uppercase;margin-bottom:14px}.ln-svc p{color:#b5b5b0}
.ln-end{position:relative;padding:clamp(100px,14vw,200px) clamp(18px,4vw,56px);text-align:center;overflow:hidden;background:radial-gradient(60% 80% at 50% 120%,#ff6a1a55,transparent 70%)}.ln-end h2{margin:0 auto}
.ln footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:14px;color:var(--grey);border-top:1px solid #333}
@media(max-width:860px){.ln nav{gap:14px;font-size:13px}.ln-mission{grid-template-columns:1fr;gap:8px}.ln-svc{grid-template-columns:1fr}.ln-svc article{border-right:0;border-bottom:1px solid #333}}
@media (prefers-reduced-motion:reduce){.ln-count,.ln-trail{display:none}}
.ln-intro{position:relative;overflow:hidden;padding:150px clamp(18px,4vw,56px) clamp(60px,8vw,110px);isolation:isolate}.ln-intro h1{font:900 clamp(70px,13vw,220px)/.88 "Big Shoulders Display";text-transform:uppercase}.ln-intro h1 .split{display:inline-block;animation:launch 1.2s cubic-bezier(.2,.9,.1,1) .2s both}.ln-intro p{margin-top:20px;max-width:46ch;color:#c8c8c4;font-size:clamp(18px,1.6vw,21px)}
.ln-about{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px);border-top:1px solid #333}.ln-about>p{font-size:clamp(19px,1.8vw,24px);color:#c8c8c4}.ln-about dl{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin:0;border-top:1px solid #333}.ln-about dl div{padding:28px 28px 28px 0}.ln-about dt{font:800 28px "Big Shoulders Display";text-transform:uppercase;color:var(--flame)}.ln-about dd{margin:8px 0 0;color:#b5b5b0}
@media(max-width:860px){.ln-about,.ln-about dl{grid-template-columns:1fr}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ln-hero" aria-labelledby="h"><div class="ln-stars" aria-hidden="true"></div><div class="ln-count" aria-hidden="true"></div><div class="ln-trail" aria-hidden="true"></div><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a launch") + "</div></section>",
  intro: (k) => { const t = k.intro(); return '<section class="ln-intro" aria-labelledby="h"><div class="ln-stars" aria-hidden="true"></div><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="ln-log" id="work"><h2>Mission log</h2><div class="ln-missions">' + k.c.cards.slice(0, 6).map((x, i) => '<article class="ln-mission"><span class="t" aria-hidden="true">T+' + String((i + 1) * 3).padStart(2, "0") + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ln-svc" id="services" aria-label="Services">' + k.c.services.slice(0, 3).map(s => "<article><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></article>").join("") + "</section>",
  about: (k) => '<section class="ln-about" id="about"><h2>Flight crew</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ln-end" id="contact"><h2>Your payload. Our rocket.</h2>' + k.cta("Book a launch") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

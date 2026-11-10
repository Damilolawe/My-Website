export default {
  id: "md-webflow",
  root: "fl",
  fonts: "family=Urbanist:ital,wght@0,400;0,600;0,900;1,900",
  labels: { work: "Showcase", services: "Plans", about: "About", contact: "Start building" },
  intros: {
    work: { title: "Sites in motion", text: "Studios and brands that design their own interactions." },
    features: { title: "Plans", text: "Build for free. Publish to your own domain when it is ready." },
    studio: { title: "About Flow State", text: null },
    contact: { title: "Start building", text: "Open the editor and start from a blank page or a layout." },
  },
  demo: {
    name: "Flow State", headline: "Design that moves.", heroLabel: "A visual website builder with motion built in",
    bio: "Build responsive websites visually, then add scroll effects, hovers and page transitions on a timeline. No code, no hand-off, and it publishes clean and fast.",
    cards: [
      { title: "A studio site that scrolls like a film", description: "Every section choreographed on the timeline, no developer needed." },
      { title: "A product launch in a week", description: "Designed, animated and published by one designer." },
      { title: "A menu with personality", description: "A restaurant whose dishes slide in as you scroll." },
    ],
    services: [
      { title: "Starter", description: "Free to build, one project on a subdomain." },
      { title: "Site", description: "Your domain, forms and CMS collections." },
      { title: "Workspace", description: "Teams, roles and client billing." },
    ],
  },
  css: `
.fl{--blue:#146ef5;--deep:#0a0a14;--white:#fff;--fog:#f2f4fa;--mute:#6b7085;--pink:#ff6bd6;background:var(--white);color:var(--deep);font:400 17px/1.65 Urbanist,system-ui,sans-serif}
.fl header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.fl .brand{font:900 22px/1 Urbanist;letter-spacing:-.04em;text-decoration:none}
.fl nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.fl nav a{text-decoration:none}.fl nav a:hover{color:var(--blue)}
.fl-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.fl h1{font:900 clamp(64px,10.4vw,176px)/.86 Urbanist;letter-spacing:-.06em}

.fl h1 .ch{animation:fl-ease 1.1s cubic-bezier(.68,-.55,.27,1.55) both;animation-delay:calc(var(--i) * 45ms)}@keyframes fl-ease{from{opacity:0;transform:translateY(.8em)}}
.fl-hero p{margin-top:24px;max-width:44ch;color:var(--mute);font-size:clamp(18px,1.5vw,21px)}
.fl .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:6px;background:var(--blue);color:#fff;font-weight:600;text-decoration:none;transition:transform .45s cubic-bezier(.68,-.55,.27,1.55)}.fl .cta:hover{transform:translateY(-4px) scale(1.04)}.fl .cta-muted{background:var(--fog);color:var(--mute)}
.fl-editor{padding:20px;border-radius:16px;background:var(--deep);color:#c9cde0;font:600 13px Urbanist;box-shadow:0 40px 80px -40px rgba(10,10,20,.7)}
.fl-editor small{display:flex;justify-content:space-between;margin-bottom:12px}
.fl-curve{position:relative;aspect-ratio:1.3;border-radius:10px;background:linear-gradient(#22222e 1px,transparent 1px) 0 0/25% 25%,linear-gradient(90deg,#22222e 1px,transparent 1px) 0 0/25% 25%,#13131c}
.fl-curve svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.fl-curve path{fill:none;stroke:var(--blue);stroke-width:3}.fl-curve line{stroke:#4c4f66;stroke-width:1.5;stroke-dasharray:4 4}.fl-curve circle.h{fill:var(--pink)}
.fl-dot{position:absolute;left:0;bottom:0;width:18px;height:18px;margin:-9px;border-radius:50%;background:#fff;box-shadow:0 0 18px var(--blue);offset-path:path("M0 300 C 120 300, 80 -40, 390 0");offset-rotate:0deg;animation:fl-move 2.6s cubic-bezier(.68,-.55,.27,1.55) infinite alternate}
@keyframes fl-move{from{offset-distance:0%}to{offset-distance:100%}}
.fl-track{position:relative;margin-top:16px;height:44px;border-radius:8px;background:#1b1b26}
.fl-track span{position:absolute;top:8px;left:0;width:28px;height:28px;border-radius:7px;background:var(--pink);animation:fl-slide 2.6s cubic-bezier(.68,-.55,.27,1.55) infinite alternate}@keyframes fl-slide{to{left:calc(100% - 28px)}}
.fl-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px)}.fl-intro h1{font-size:clamp(56px,8vw,130px)}.fl-intro p{margin-top:18px;max-width:46ch;color:var(--mute)}
.fl h2{font:900 clamp(44px,6.4vw,104px)/.9 Urbanist;letter-spacing:-.055em;max-width:12ch}
.fl-show{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--fog)}
.fl-list{display:grid;gap:18px;margin-top:clamp(40px,6vw,70px)}
.fl-item{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,4vw,60px);align-items:center;padding:24px;border-radius:20px;background:#fff}
.fl-item:nth-child(even){grid-template-columns:minmax(0,1fr) minmax(0,1.2fr)}.fl-item:nth-child(even) .fl-shot{order:2}
.fl-shot{aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:linear-gradient(120deg,var(--blue),var(--pink))}.fl-item:nth-child(2) .fl-shot{background:linear-gradient(120deg,#0a0a14,#146ef5)}.fl-item:nth-child(3) .fl-shot{background:linear-gradient(120deg,#ffb36b,#ff6bd6)}
.fl-shot img{width:100%;height:100%;object-fit:cover}
@supports (animation-timeline:view()){.fl-shot{animation:fl-shot linear both;animation-timeline:view();animation-range:entry 0% cover 40%}@keyframes fl-shot{from{clip-path:inset(0 100% 0 0 round 12px)}to{clip-path:inset(0 0 0 0 round 12px)}}}
.fl-item h3{font:900 clamp(26px,2.6vw,38px)/1.05 Urbanist;letter-spacing:-.04em}.fl-item p{margin-top:10px;color:var(--mute)}
.fl-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fl-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.fl-plans li{padding:30px;border-radius:20px;border:2px solid var(--fog);transition:border-color .3s,transform .45s cubic-bezier(.68,-.55,.27,1.55)}.fl-plans li:hover{border-color:var(--blue);transform:translateY(-8px)}
.fl-plans h3{font:900 30px Urbanist;letter-spacing:-.04em}.fl-plans p{margin-top:8px;color:var(--mute)}
.fl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--deep);color:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.fl-about>p{font-size:clamp(19px,1.8vw,24px);color:#c9cde0}.fl-about dl{grid-column:2;margin:0}.fl-about dt{font-weight:900;color:var(--pink);margin-top:16px}.fl-about dd{margin:2px 0 0;color:#c9cde0}
.fl-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--blue);color:#fff;text-align:center}.fl-end h2{margin:0 auto}.fl-end .cta{background:#fff;color:var(--blue)}
.fl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute)}
@media(max-width:900px){.fl nav{gap:12px;font-size:14px}.fl-hero,.fl-plans ul,.fl-about,.fl-item,.fl-item:nth-child(even){grid-template-columns:1fr}.fl-item:nth-child(even) .fl-shot{order:0}.fl-about dl{grid-column:auto}.fl-dot{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="fl-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start building free") + '</div><div class="fl-editor" aria-hidden="true"><small><span>Easing: back in-out</span><span>1.1s</span></small><div class="fl-curve"><svg viewBox="0 0 390 300" preserveAspectRatio="none"><line x1="0" y1="300" x2="120" y2="300"/><line x1="390" y1="0" x2="80" y2="-40"/><path d="M0 300 C 120 300, 80 -40, 390 0"/><circle class="h" cx="120" cy="300" r="7"/><circle class="h" cx="80" cy="-40" r="7"/></svg><span class="fl-dot"></span></div><div class="fl-track"><span></span></div></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="fl-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="fl-show" id="work"><h2>' + k.h("work", "Sites that move") + '</h2><div class="fl-list">' + k.c.cards.map((x, i) => '<article class="fl-item"><div class="fl-shot">' + k.photo(i) + "</div><div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>",
  services: (k) => '<section class="fl-plans" id="services"><h2>' + k.h("services", "Plans") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fl-about" id="about"><h2>' + k.h("about", "Motion is design") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fl-end" id="contact"><h2>' + k.h("contact", "Make it move.") + '</h2>' + k.cta("Start building free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-meta",
  root: "cs",
  fonts: "family=Lexend:wght@300;500;800;900",
  labels: { work: "Spaces", services: "Membership", about: "About", contact: "Join" },
  intros: {
    work: { title: "Spaces to join", text: "Small groups, run by the people in them." },
    features: { title: "Membership", text: "Free to join a space. Pay only if you want to host one." },
    studio: { title: "About Commonspace", text: null },
    contact: { title: "Join a space", text: "Tell us what you are into. We will find the right room." },
  },
  demo: {
    name: "Commonspace", headline: "Find your people.", heroLabel: "Small online communities, run by members",
    bio: "Commonspace is for groups small enough to know each other's names: book clubs, running crews, beginner coders. No feeds, no ads, just the people in the room.",
    cards: [
      { title: "Tuesday night runners", description: "Forty members, one route, a photo from every finish." },
      { title: "The slow readers", description: "One chapter a week, and nobody is ever behind." },
      { title: "First-time gardeners", description: "Questions welcome, especially the ones about tomatoes." },
    ],
    services: [
      { title: "Member", description: "Join as many spaces as you like. Free." },
      { title: "Host", description: "Run a space with events, polls and a shared calendar." },
      { title: "Organisation", description: "Several spaces under one roof, with shared moderation." },
    ],
  },
  css: `
.cs{--sky:#eef3ff;--blue:#2f5bff;--pink:#ff5fa8;--lime:#b8f04a;--sun:#ffc93c;--ink:#121a3a;background:var(--sky);color:var(--ink);font:300 18px/1.6 Lexend,system-ui,sans-serif}
.cs header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.cs .brand{font:900 22px/1 Lexend;letter-spacing:-.04em;text-decoration:none;display:flex;align-items:center;gap:8px}.cs .brand:before{content:"";width:22px;height:22px;border-radius:50%;background:var(--blue);box-shadow:10px 0 0 var(--pink)}.cs .brand{padding-right:10px}
.cs nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.cs nav a{text-decoration:none}.cs nav a:hover{color:var(--blue)}
.cs-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px) clamp(70px,9vw,120px)}
.cs h1{font:900 clamp(62px,9.4vw,160px)/.88 Lexend;letter-spacing:-.07em}
.cs h1 .ch{animation:cs-pop .6s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 40ms)}@keyframes cs-pop{from{opacity:0;transform:scale(.4)}}
.cs-hero p{margin-top:24px;max-width:42ch;font-size:clamp(18px,1.5vw,21px)}
.cs .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:999px;background:var(--blue);color:#fff;font-weight:500;text-decoration:none;transition:transform .2s}.cs .cta:hover{transform:scale(1.05)}.cs .cta-muted{background:#fff;color:var(--ink)}
.cs-orbit{position:relative;width:min(84%,520px);aspect-ratio:1;justify-self:center;margin:32px}.cs-hero{overflow:hidden}
.cs-ring{position:absolute;inset:var(--in);border:2px dashed rgba(47,91,255,.3);border-radius:50%;animation:cs-spin var(--d) linear infinite}
.cs-ring:nth-child(1){--in:0;--d:40s}.cs-ring:nth-child(2){--in:18%;--d:28s;animation-direction:reverse}.cs-ring:nth-child(3){--in:36%;--d:20s}
@keyframes cs-spin{to{transform:rotate(360deg)}}
.cs-ring b{position:absolute;width:64px;height:64px;margin:-32px;border-radius:50%;display:grid;place-items:center;font:800 20px Lexend;color:#fff;box-shadow:0 10px 20px -8px rgba(18,26,58,.4);animation:cs-spin var(--d) linear infinite reverse}
.cs-ring:nth-child(2) b{animation-direction:normal}
.cs-ring b:nth-child(1){left:50%;top:0;background:var(--pink)}.cs-ring b:nth-child(2){left:100%;top:50%;background:var(--sun);color:var(--ink)}.cs-ring b:nth-child(3){left:15%;top:85%;background:var(--lime);color:var(--ink)}
.cs-core{position:absolute;inset:40%;border-radius:50%;background:var(--blue);display:grid;place-items:center;text-align:center;color:#fff;font:800 clamp(14px,1.4vw,18px)/1.1 Lexend;box-shadow:0 0 0 14px rgba(47,91,255,.15),0 0 0 28px rgba(47,91,255,.08);animation:cs-beat 2.4s ease-in-out infinite}
@keyframes cs-beat{50%{box-shadow:0 0 0 22px rgba(47,91,255,.12),0 0 0 44px rgba(47,91,255,.04)}}
.cs-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}.cs-intro h1{font-size:clamp(40px,8vw,130px);overflow-wrap:anywhere}.cs-intro p{margin-top:18px;max-width:46ch}
.cs h2{font:900 clamp(44px,6.4vw,104px)/.9 Lexend;letter-spacing:-.06em;max-width:13ch}
.cs-spaces{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#fff}
.cs-rooms{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.cs-room{padding:28px;border-radius:30px;background:var(--sky)}
.cs-faces{display:flex;margin-bottom:22px}.cs-faces i{width:44px;height:44px;margin-right:-12px;border-radius:50%;border:3px solid var(--sky);background:var(--c)}.cs-faces i:nth-child(1){--c:var(--pink)}.cs-faces i:nth-child(2){--c:var(--sun)}.cs-faces i:nth-child(3){--c:var(--lime)}.cs-faces i:nth-child(4){--c:var(--blue)}
.cs-room img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:20px;margin-bottom:18px}
.cs-room h3{font:800 25px/1.15 Lexend;letter-spacing:-.04em}.cs-room p{margin-top:8px}
.cs-member{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.cs-member ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.cs-member li{padding:30px;border-radius:30px;background:#fff}.cs-member li:nth-child(2){background:var(--ink);color:#fff}
.cs-member h3{font:900 30px Lexend;letter-spacing:-.05em}.cs-member p{margin-top:8px}
.cs-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--pink);color:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.cs-about>p{font-size:clamp(19px,1.8vw,24px)}.cs-about dl{grid-column:2;margin:0}.cs-about dt{font-weight:800;margin-top:16px}.cs-about dd{margin:2px 0 0}
.cs-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--blue);color:#fff;text-align:center}.cs-end h2{margin:0 auto}.cs-end .cta{background:var(--lime);color:var(--ink)}
.cs footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:15px}
@media(max-width:900px){.cs nav{gap:12px;font-size:14px}.cs-hero,.cs-rooms,.cs-member ul,.cs-about{grid-template-columns:1fr}.cs-about dl{grid-column:auto}.cs-ring b{width:48px;height:48px;margin:-24px;font-size:16px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="cs-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Find a space") + '</div><div class="cs-orbit" aria-hidden="true"><span class="cs-ring"><b>A</b><b>J</b><b>M</b></span><span class="cs-ring"><b>R</b><b>K</b><b>S</b></span><span class="cs-ring"><b>T</b></span><span class="cs-core">You<br>are here</span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="cs-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="cs-spaces" id="work"><h2>' + k.h("work", "Rooms worth joining") + '</h2><div class="cs-rooms">' + k.c.cards.map((x, i) => '<article class="cs-room">' + (k.photo(i) || '<span class="cs-faces" aria-hidden="true"><i></i><i></i><i></i><i></i></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="cs-member" id="services"><h2>' + k.h("services", "Ways to belong") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="cs-about" id="about"><h2>' + k.h("about", "Small on purpose") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="cs-end" id="contact"><h2>' + k.h("contact", "There is a room for you.") + '</h2>' + k.cta("Find a space") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-cal",
  root: "dr",
  fonts: "family=Sora:wght@300;400;600;800",
  labels: { work: "Features", services: "Plans", about: "About", contact: "Try it" },
  intros: {
    work: { title: "What it does", text: "Less calendar admin, more time for the work itself." },
    features: { title: "Plans", text: "Free for one calendar. Paid plans for teams that share theirs." },
    studio: { title: "About us", text: null },
    contact: { title: "Try it free", text: "Connect your calendar in under a minute." },
  },
  demo: {
    name: "Daily Rhythm", headline: "Your day, arranged.", heroLabel: "Scheduling that plans around you",
    bio: "Daily Rhythm books meetings into the gaps you choose, protects your focus hours, and moves things around when plans change. You just show up.",
    cards: [
      { title: "Focus blocks that stick", description: "Your deep-work hours are guarded unless you say otherwise." },
      { title: "One link to book you", description: "People pick a time that already suits you. No back and forth." },
      { title: "Reshuffle in one tap", description: "Running late? Everything after slides to the next free slot." },
    ],
    services: [
      { title: "Personal", description: "One calendar, unlimited booking links. Free." },
      { title: "Team", description: "Shared availability and round-robin booking for up to 20 people." },
      { title: "Studio", description: "Client booking, reminders and payments in one place." },
    ],
  },
  css: `
.dr{--lilac:#eeeaff;--ink:#1e1a3d;--mint:#7fe7bd;--peach:#ffb59f;--lemon:#fff07a;--violet:#5b4bdb;background:var(--lilac);color:var(--ink);font:400 17px/1.65 Sora,system-ui,sans-serif}
.dr header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.dr .brand{font:800 21px/1 Sora;letter-spacing:-.04em;text-decoration:none;display:flex;align-items:center;gap:10px}.dr .brand:before{content:"";width:24px;height:24px;border-radius:50%;background:conic-gradient(var(--violet) 0 25%,var(--mint) 0 50%,var(--peach) 0 75%,var(--lemon) 0)}
.dr nav{display:flex;gap:6px;padding:6px;border-radius:999px;background:#fff}.dr nav a{padding:8px 16px;border-radius:999px;text-decoration:none;font-weight:600;font-size:15px}.dr nav a:hover,.dr nav a[aria-current]{background:var(--ink);color:#fff;text-decoration:none}
.dr-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.dr h1{font:800 clamp(56px,9vw,148px)/.9 Sora;letter-spacing:-.065em}
.dr h1 .ch{animation:dr-in .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 35ms)}@keyframes dr-in{from{opacity:0;transform:scale(.6)}}
.dr-hero p{margin-top:24px;max-width:42ch;font-size:clamp(18px,1.5vw,21px);color:#4a4572}
.dr .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:999px;background:var(--ink);color:#fff;font-weight:600;text-decoration:none;transition:background .2s}.dr .cta:hover{background:var(--violet)}.dr .cta-muted{background:#fff;color:var(--ink)}
.dr-day{position:relative;padding:22px 22px 22px 74px;border-radius:30px;background:#fff;box-shadow:0 30px 60px -40px rgba(30,26,61,.6);overflow:hidden}
.dr-day ol{position:relative;height:440px;background:repeating-linear-gradient(#ebe8f6 0 1px,transparent 1px 55px)}
.dr-hour{position:absolute;left:-54px;font:400 12px Sora;color:#8a85ab}
.dr-ev{position:absolute;left:84px;right:22px;padding:10px 14px;border-radius:14px;font:600 14px/1.3 Sora;animation:dr-slot .7s cubic-bezier(.3,1.4,.5,1) both}
.dr-ev small{display:block;font-weight:400;font-size:12px;opacity:.75}
.dr-ev:nth-of-type(1){top:28px;height:96px;background:var(--mint);animation-delay:.6s}
.dr-ev:nth-of-type(2){top:142px;height:52px;background:var(--peach);left:44%;animation-delay:1s}
.dr-ev:nth-of-type(3){top:208px;height:140px;background:var(--violet);color:#fff;animation-delay:1.4s}
.dr-ev:nth-of-type(4){top:362px;height:52px;background:var(--lemon);right:38%;animation-delay:1.8s}
@keyframes dr-slot{from{opacity:0;transform:translateX(110%)}}
.dr-now{position:absolute;left:66px;right:16px;height:2px;background:var(--violet);top:30px;animation:dr-now 14s linear infinite}.dr-now:before{content:"";position:absolute;left:-6px;top:-5px;width:12px;height:12px;border-radius:50%;background:var(--violet)}
@keyframes dr-now{to{top:calc(100% - 30px)}}
.dr-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}.dr-intro h1{font-size:clamp(52px,8vw,128px)}.dr-intro p{margin-top:20px;max-width:46ch;color:#4a4572}
.dr h2{font:800 clamp(40px,6vw,92px)/.95 Sora;letter-spacing:-.06em;max-width:13ch}
.dr-feats{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#fff}
.dr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.dr-feat{position:relative;padding:28px 28px 30px;border-radius:26px;background:var(--lilac);overflow:hidden}.dr-feat:nth-child(3n+2){background:#e7fbf2}.dr-feat:nth-child(3n){background:#fff3ee}
.dr-feat:before{content:"";display:block;width:56px;height:56px;margin-bottom:24px;border-radius:16px;background:conic-gradient(from 210deg,var(--violet) 0 30%,transparent 0) ,#fff;box-shadow:inset 0 0 0 2px var(--ink)}
.dr-feat img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:16px;margin-bottom:18px}
.dr-feat h3{font:600 22px/1.2 Sora;letter-spacing:-.03em}.dr-feat p{margin-top:8px;color:#4a4572}
.dr-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.dr-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,60px)}
.dr-plans li{padding:30px;border-radius:26px;background:#fff;border:2px solid transparent;transition:border-color .2s,transform .2s}.dr-plans li:nth-child(2){background:var(--ink);color:#fff;transform:translateY(-14px)}.dr-plans li:hover{border-color:var(--violet)}
.dr-plans h3{font:800 28px Sora;letter-spacing:-.04em}.dr-plans p{margin-top:10px;opacity:.8}
.dr-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.dr-about>p{font-size:clamp(19px,1.8vw,23px);color:#4a4572}.dr-about dl{grid-column:2;margin:0;display:grid;gap:12px}.dr-about dl div{padding:18px 22px;border-radius:18px;background:var(--lilac)}.dr-about dt{font-weight:800}.dr-about dd{margin:4px 0 0}
.dr-end{margin:0 clamp(18px,4vw,56px) 40px;padding:clamp(50px,8vw,110px);border-radius:36px;background:var(--violet);color:#fff;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.dr-end .cta{margin:0;background:var(--lemon);color:var(--ink)}
.dr footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px;color:#6a6591}
@media(max-width:860px){.dr nav{gap:2px;padding:4px}.dr nav a{padding:6px 10px;font-size:13px}.dr .brand{font-size:17px}.dr-hero,.dr-grid,.dr-plans ul,.dr-about{grid-template-columns:1fr}.dr-plans li:nth-child(2){transform:none}.dr-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const ev = (k.c.cards.length ? k.c.cards : [{ title: "Focus" }]).slice(0, 3); return '<section class="dr-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Try it free") + '</div><div class="dr-day" aria-hidden="true"><ol><li class="dr-hour" style="top:0">9:00</li><li class="dr-hour" style="top:110px">11:00</li><li class="dr-hour" style="top:220px">13:00</li><li class="dr-hour" style="top:330px">15:00</li></ol><span class="dr-ev">Focus block<small>Notifications off</small></span><span class="dr-ev">Coffee with Sam</span><span class="dr-ev">' + k.E(ev[0].title) + "<small>Booked through your link</small></span><span class=\"dr-ev\">Wrap up</span><span class=\"dr-now\"></span></div></section>"; },
  intro: (k) => { const t = k.intro(); return '<section class="dr-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="dr-feats" id="work"><h2>' + k.h("work", "Calendar admin, handled") + '</h2><div class="dr-grid">' + k.c.cards.map((x, i) => '<article class="dr-feat">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="dr-plans" id="services"><h2>' + k.h("services", "Pick your plan") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="dr-about" id="about"><h2>' + k.h("about", "Why we built it") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="dr-end" id="contact"><h2>' + k.h("contact", "Get your afternoons back.") + '</h2>' + k.cta("Try it free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

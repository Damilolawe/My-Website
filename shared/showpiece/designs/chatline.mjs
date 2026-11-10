export default {
  id: "md-intercom",
  root: "cg",
  fonts: "family=Gabarito:wght@400;600;800;900",
  labels: { work: "Stories", services: "Plans", about: "About", contact: "Book a demo" },
  intros: {
    work: { title: "Customer stories", text: "Teams that answer faster, and the customers who noticed." },
    features: { title: "Plans", text: "One inbox for every conversation, priced by seat." },
    studio: { title: "About us", text: null },
    contact: { title: "Book a demo", text: "Twenty minutes, your own help questions, a real answer." },
  },
  demo: {
    name: "Common Ground", headline: "Answer everyone, kindly.", heroLabel: "Customer support, in one inbox",
    bio: "Email, chat and social messages land in one shared inbox. A helper drafts the reply from your help pages; a person checks it and sends. Customers get answers in minutes, not days.",
    cards: [
      { title: "From two days to nine minutes", description: "A bike shop cut its average first reply time once every channel shared one inbox." },
      { title: "Half the questions answered overnight", description: "A travel company let the helper answer simple questions while the team slept." },
      { title: "One tone of voice", description: "Saved replies and a style guide kept fourteen agents sounding like one team." },
    ],
    services: [
      { title: "Starter", description: "Shared inbox and live chat for small teams." },
      { title: "Growth", description: "Drafted replies, routing and reporting." },
      { title: "Enterprise", description: "Custom workflows, roles and data controls." },
    ],
  },
  css: `
.cg{--sand:#fbf3e8;--coral:#ff6b4a;--ink:#24170f;--cream:#fffaf3;--teal:#147a72;--peach:#ffd7c4;background:var(--sand);color:var(--ink);font:400 18px/1.6 Gabarito,system-ui,sans-serif}
.cg header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.cg .brand{font:900 24px/1 Gabarito;letter-spacing:-.03em;text-decoration:none;display:flex;align-items:center;gap:10px}.cg .brand:before{content:"";width:28px;height:24px;border-radius:12px 12px 12px 3px;background:var(--coral)}
.cg nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.cg nav a{text-decoration:none}.cg nav a:hover{color:var(--coral)}
.cg-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px) clamp(70px,9vw,120px)}
.cg h1{font:900 clamp(60px,8.8vw,148px)/.9 Gabarito;letter-spacing:-.055em}
.cg h1 .ch{animation:cg-in .5s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes cg-in{from{opacity:0;transform:translateY(.3em) scale(.8)}}
.cg-hero p{margin-top:24px;max-width:44ch;font-size:clamp(18px,1.6vw,21px)}
.cg .cta{display:inline-flex;margin-top:30px;padding:16px 28px;border-radius:999px;background:var(--ink);color:var(--cream);font-weight:800;text-decoration:none;transition:background .2s}.cg .cta:hover{background:var(--coral)}.cg .cta-muted{background:var(--cream);color:var(--ink)}
.cg-chat{display:flex;flex-direction:column;gap:12px;padding:26px;border-radius:30px;background:var(--cream);box-shadow:0 30px 60px -30px rgba(36,23,15,.4)}
.cg-msg{max-width:84%;padding:14px 18px;border-radius:22px;font-size:16px;line-height:1.45;opacity:0;animation:cg-pop .45s cubic-bezier(.3,1.5,.5,1) forwards}
.cg-msg small{display:block;font-size:12px;opacity:.65;margin-bottom:3px}
.cg-them{align-self:flex-start;background:var(--peach);border-bottom-left-radius:6px}
.cg-us{align-self:flex-end;background:var(--teal);color:#fff;border-bottom-right-radius:6px}
.cg-msg:nth-child(1){animation-delay:.4s}.cg-msg:nth-child(2){animation-delay:1.6s}.cg-msg:nth-child(4){animation-delay:3.6s}
.cg-typing{align-self:flex-end;display:flex;gap:5px;padding:14px 18px;border-radius:22px;background:var(--teal);opacity:0;animation:cg-typing 1.6s ease 2s forwards}
.cg-typing i{width:8px;height:8px;border-radius:50%;background:#fff;animation:cg-dot 1s ease-in-out infinite}.cg-typing i:nth-child(2){animation-delay:.15s}.cg-typing i:nth-child(3){animation-delay:.3s}
@keyframes cg-pop{from{opacity:0;transform:translateY(16px) scale(.9)}to{opacity:1;transform:none}}
@keyframes cg-typing{0%{opacity:0}10%,85%{opacity:1}100%{opacity:0;height:0;padding:0;margin:-6px 0}}
@keyframes cg-dot{50%{transform:translateY(-5px)}}
.cg-time{align-self:center;padding:6px 14px;border-radius:999px;background:var(--sand);font-size:13px;font-weight:600;opacity:0;animation:cg-pop .4s ease 4.3s forwards}
.cg-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}.cg-intro h1{font-size:clamp(54px,8vw,128px)}.cg-intro p{margin-top:20px;max-width:46ch}
.cg h2{font:900 clamp(42px,6vw,96px)/.92 Gabarito;letter-spacing:-.05em;max-width:14ch}
.cg-stories{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--cream)}
.cg-quotes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.cg-quote{position:relative;padding:30px 28px 34px;border-radius:28px 28px 28px 8px;background:var(--peach)}.cg-quote:nth-child(2){background:#c8ebe6;border-radius:28px 28px 8px 28px}.cg-quote:nth-child(3){background:#ffe9a8}
.cg-quote img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:18px;margin-bottom:16px}
.cg-quote h3{font:800 26px/1.1 Gabarito;letter-spacing:-.03em}.cg-quote p{margin-top:10px}
.cg-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.cg-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:clamp(36px,5vw,56px)}
.cg-plans li{padding:30px;border-radius:26px;border:2px solid var(--ink)}.cg-plans li:nth-child(2){background:var(--coral);border-color:var(--coral);color:#fff}
.cg-plans h3{font:900 30px Gabarito}.cg-plans p{margin-top:8px}
.cg-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--teal);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.cg-about>p{font-size:clamp(19px,1.8vw,24px)}.cg-about dl{grid-column:2;margin:0;display:grid;gap:10px}.cg-about dl div{padding:16px 20px;border-radius:20px 20px 20px 6px;background:rgba(255,250,243,.14)}.cg-about dt{font-weight:800}.cg-about dd{margin:2px 0 0}
.cg-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);background:var(--coral);color:#fff;text-align:center}.cg-end h2{margin:0 auto}.cg-end .cta{background:#fff;color:var(--ink)}
.cg footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:15px}
@media(max-width:900px){.cg nav{gap:12px;font-size:14px}.cg-hero,.cg-quotes,.cg-plans ul,.cg-about{grid-template-columns:1fr}.cg-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.cg-msg,.cg-time{opacity:1}.cg-typing{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="cg-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a demo") + '</div><div class="cg-chat" aria-hidden="true"><p class="cg-msg cg-them"><small>Priya, via chat</small>Hi! My order says delivered but nothing arrived.</p><p class="cg-msg cg-them"><small>Priya</small>Order 4471 if that helps.</p><span class="cg-typing"><i></i><i></i><i></i></span><p class="cg-msg cg-us"><small>Sam, support</small>Sorry Priya. The courier left it at the wrong door. A new one ships today, free.</p><span class="cg-time">Answered in 3 minutes</span></div></section>',
  intro: (k) => { const t = k.intro(); return '<section class="cg-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="cg-stories" id="work"><h2>What changed for them</h2><div class="cg-quotes">' + k.c.cards.map((x, i) => '<article class="cg-quote">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="cg-plans" id="services"><h2>Plans for every team size</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="cg-about" id="about"><h2>Why we built it</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<div><dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd></div>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="cg-end" id="contact"><h2>Let\'s talk about your inbox.</h2>' + k.cta("Book a demo") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

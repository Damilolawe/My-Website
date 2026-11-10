export default {
  id: "md-elevenlabs",
  root: "sf",
  fonts: "family=Yeseva+One&family=Questrial",
  labels: { work: "Voices", services: "Plans", about: "Studio", contact: "Listen" },
  demo: {
    name: "Sound Form", headline: "Every story deserves a voice.", heroLabel: "Audiobook narration studio",
    bio: "We record audiobooks with professional narrators in two quiet booths by the river. Authors pick the voice, sit in on the session, and leave with a finished book ready for every store.",
    cards: [
      { title: "A debut thriller, 11 hours", description: "Recorded in eight days with a narrator the author chose from three auditions." },
      { title: "A children's series, four voices", description: "One narrator per character, mixed with gentle sound effects." },
      { title: "A memoir read by its author", description: "Coaching and retakes until it sounded exactly like them." },
    ],
    services: [
      { title: "Auditions", description: "Three narrators read your first chapter. You choose." },
      { title: "Recording", description: "Booth time, a producer and two rounds of retakes." },
      { title: "Mastering", description: "Files ready for every audiobook store." },
    ],
  },
  css: `
.sf{--blush:#fbeee8;--rose:#e6a7a0;--wine:#5a1e2e;--ink:#2a1219;--gold:#d8a648;background:var(--blush);color:var(--ink);font:400 18px/1.7 Questrial,system-ui,sans-serif}
.sf header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.sf .brand{font:400 26px/1 "Yeseva One",serif;text-decoration:none;color:var(--wine)}
.sf nav{display:flex;gap:clamp(14px,2.4vw,30px)}.sf nav a{text-decoration:none}.sf nav a:hover{color:var(--wine)}
.sf-hero{text-align:center;padding:clamp(40px,7vw,90px) clamp(18px,4vw,56px) clamp(60px,8vw,100px)}
.sf-label{font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:var(--wine)}
.sf h1{margin:20px auto 0;max-width:14ch;font:400 clamp(54px,8.4vw,140px)/1 "Yeseva One",serif;color:var(--wine)}
.sf h1 .ch{animation:sf-in .8s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes sf-in{from{opacity:0;transform:scale(1.4);filter:blur(4px)}}
.sf-wave{display:flex;align-items:center;justify-content:center;gap:clamp(3px,.5vw,6px);height:clamp(90px,12vw,150px);margin:clamp(30px,4vw,50px) auto 0;max-width:900px}
.sf-wave i{flex:1;max-width:10px;height:var(--h);border-radius:5px;background:var(--wine);animation:sf-talk var(--t) ease-in-out infinite alternate;animation-delay:var(--d)}
.sf-wave i:nth-child(5n){background:var(--gold)}
@keyframes sf-talk{0%{transform:scaleY(.15)}100%{transform:scaleY(1)}}
.sf-hero p{max-width:50ch;margin:30px auto 0}
.sf .cta{display:inline-flex;margin-top:28px;padding:16px 32px;border-radius:999px;background:var(--wine);color:var(--blush);text-decoration:none;transition:background .2s}.sf .cta:hover{background:var(--ink)}.sf .cta-muted{background:#f2dcd5;color:#7a5560}
.sf h2{font:400 clamp(42px,6vw,96px)/1.02 "Yeseva One",serif;color:var(--wine);max-width:14ch}
.sf-voices{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--wine);color:var(--blush)}.sf-voices h2{color:var(--blush)}
.sf-tracks{margin-top:clamp(40px,6vw,70px)}
.sf-track{display:grid;grid-template-columns:64px minmax(0,1fr) minmax(0,1.2fr);gap:24px;align-items:center;padding:22px 0;border-top:1px solid rgba(251,238,232,.25)}
.sf-play{width:56px;height:56px;border-radius:50%;background:var(--gold);position:relative}.sf-play:after{content:"";position:absolute;left:22px;top:17px;border:11px solid transparent;border-left:16px solid var(--wine);border-right:0}
.sf-track h3{font:400 28px/1.1 "Yeseva One",serif}.sf-track p{color:#ecd3cc}
.sf-track img{grid-column:2/-1;width:100%;max-height:240px;object-fit:cover;border-radius:12px}
.sf-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sf-svc ol{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px);counter-reset:n}
.sf-svc li{padding:30px;border-radius:200px 200px 20px 20px;background:#fff;text-align:center;counter-increment:n}.sf-svc li:before{content:counter(n);display:block;font:400 54px "Yeseva One",serif;color:var(--rose)}
.sf-svc h3{font:400 26px "Yeseva One",serif;color:var(--wine)}.sf-svc p{margin-top:8px}
.sf-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--rose);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sf-about>p{font-size:clamp(20px,2vw,25px)}.sf-about dl{grid-column:2;margin:0}.sf-about dt{font:400 22px "Yeseva One",serif;color:var(--wine);margin-top:16px}.sf-about dd{margin:2px 0 0}
.sf-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.sf-end h2{margin:0 auto}
.sf footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:#7a5560}
@media(max-width:900px){.sf nav{gap:12px;font-size:14px}.sf-svc ol,.sf-about{grid-template-columns:1fr}.sf-track{grid-template-columns:56px 1fr}.sf-track p,.sf-track img{grid-column:2}.sf-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const bars = Array.from({ length: 56 }, (_, i) => { const h = 20 + Math.round(80 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21))); return '<i style="--h:' + h + "%;--t:" + (0.4 + (i % 5) * 0.12).toFixed(2) + "s;--d:-" + ((i * 0.07) % 1).toFixed(2) + 's"></i>'; }).join(""); return '<section class="sf-hero" aria-labelledby="h"><span class="sf-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="sf-wave" aria-hidden="true">' + bars + "</div><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book an audition") + "</section>"; },
  work: (k) => '<section class="sf-voices" id="work"><h2>' + k.h("work", "Recently recorded") + '</h2><div class="sf-tracks">' + k.c.cards.map((x, i) => '<article class="sf-track"><span class="sf-play" aria-hidden="true"></span><h3>' + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => '<section class="sf-svc" id="services"><h2>' + k.h("services", "From first read to finished book") + '</h2><ol>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ol></section>",
  about: (k) => '<section class="sf-about" id="about"><h2>' + k.h("about", "Inside the booth") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sf-end" id="contact"><h2>' + k.h("contact", "Let your book be heard.") + '</h2>' + k.cta("Book an audition") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

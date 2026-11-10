export default {
  id: "gazettebroadside",
  root: "gz",
  fonts: "family=UnifrakturMaguntia&family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC",
  labels: { work: "Stories", services: "Services", about: "About", contact: "Write to us" },
  demo: {
    name: "The Harbour Gazette", headline: "Local news, worth reading.", heroLabel: "An independent weekly paper",
    bio: "Every Thursday since 1894, printed on the same street. Council meetings, lifeboat launches, the allotment show and the letters page, written by people who live here.",
    cards: [
      { title: "The lifeboat's 1,000th launch", description: "A night rescue in a force nine, told by the crew who were there." },
      { title: "The bakery that never closed", description: "Four generations, one oven, and a queue every Saturday." },
      { title: "Council votes on the old pier", description: "What was decided, who voted how, and what happens next." },
    ],
    services: [
      { title: "Subscriptions", description: "Delivered to your door every Thursday." },
      { title: "Notices", description: "Births, marriages and announcements." },
      { title: "Advertising", description: "Reach every household in the bay." },
    ],
  },
  css: `
.gz{--sage:#dfe2d6;--paper:#ecede4;--ink:#1c1d1a;--red:#8c1c13;--mute:#5d6056;background:var(--sage);color:var(--ink);font:400 18px/1.6 "IM Fell English",Georgia,serif}
.gz header{display:flex;justify-content:space-between;align-items:center;padding:12px clamp(18px,4vw,56px);border-bottom:1px solid var(--ink)}
.gz .brand{font:400 15px "IM Fell English SC";letter-spacing:.1em;text-decoration:none}
.gz nav{display:flex;gap:clamp(14px,2.4vw,30px);font:400 15px "IM Fell English SC"}.gz nav a{text-decoration:none}.gz nav a:hover{color:var(--red)}
.gz-hero{padding:clamp(20px,3vw,40px) clamp(18px,4vw,56px) clamp(50px,7vw,90px)}
.gz-mast{text-align:center;border-bottom:6px double var(--ink);padding-bottom:12px}
.gz-mast b{display:block;font:400 clamp(48px,9vw,140px)/1 UnifrakturMaguntia;animation:gz-ink 1.6s ease both}
@keyframes gz-ink{from{opacity:0;filter:blur(4px);transform:scale(1.04)}}
.gz-date{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--ink);font:400 14px "IM Fell English SC"}
.gz-extra{display:inline-block;margin:22px 0 0;padding:4px 16px;background:var(--red);color:var(--paper);font:400 16px "IM Fell English SC";letter-spacing:.2em;transform:rotate(-2deg);animation:gz-stamp .4s cubic-bezier(.3,2,.5,1) 1.4s both}
@keyframes gz-stamp{from{opacity:0;transform:rotate(-2deg) scale(2)}}
.gz-label{display:block;margin-top:14px;font:italic 400 18px "IM Fell English";color:var(--mute)}
.gz h1{margin-top:6px;font:400 clamp(52px,8.4vw,140px)/.92 "IM Fell English SC";letter-spacing:-.01em;text-align:center}
.gz h1 .w{display:inline-block;animation:gz-press .5s steps(3) both;animation-delay:calc(.6s + var(--n,0) * .25s)}
.gz h1 .w:nth-child(2){--n:1}.gz h1 .w:nth-child(3){--n:2}.gz h1 .w:nth-child(4){--n:3}
@keyframes gz-press{from{opacity:0;transform:translateY(-8px)}}
.gz-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-top:clamp(20px,3vw,34px);border-top:1px solid var(--ink)}
.gz-col{padding:16px 20px;border-right:1px solid var(--ink);font-size:16px;text-align:justify;hyphens:auto}.gz-col:last-child{border-right:0}
.gz-col:first-child:first-letter{float:left;margin:4px 8px 0 0;font:400 72px/.8 UnifrakturMaguntia;color:var(--red)}
.gz-col h3{font:400 20px/1.2 "IM Fell English SC";text-align:left;margin-bottom:8px}
.gz-roll{position:relative;height:16px;margin-top:20px;border-radius:8px;background:repeating-linear-gradient(90deg,#3c3d38 0 6px,#55574f 6px 12px);animation:gz-roll .4s linear infinite}@keyframes gz-roll{to{background-position:12px 0}}
.gz .cta{display:inline-flex;margin-top:18px;padding:12px 22px;border:2px solid var(--ink);background:var(--paper);font:400 16px "IM Fell English SC";letter-spacing:.1em;text-decoration:none;transition:background .2s,color .2s}.gz .cta:hover{background:var(--ink);color:var(--paper)}.gz .cta-muted{border-style:dotted;color:var(--mute)}
.gz h2{font:400 clamp(40px,5.6vw,92px)/1 "IM Fell English SC";max-width:15ch}
.gz-stories{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);background:var(--paper);border-block:6px double var(--ink)}
.gz-list{display:grid;grid-template-columns:1.4fr 1fr 1fr;margin-top:clamp(30px,5vw,60px);border-top:2px solid var(--ink)}
.gz-s{padding:20px;border-right:1px solid var(--ink)}.gz-s:last-child{border-right:0}
.gz-s small{font:400 13px "IM Fell English SC";letter-spacing:.14em;color:var(--red)}
.gz-cut{display:block;aspect-ratio:4/3;margin:12px 0;background:var(--g);filter:grayscale(1) contrast(1.2)}
.gz-s img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:12px 0;filter:grayscale(1) contrast(1.2)}
.gz-s h3{font:400 26px/1.1 "IM Fell English SC"}.gz-s:first-child h3{font-size:36px}.gz-s p{margin-top:8px;font-size:16px;text-align:justify}
.gz-svc{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px)}
.gz-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:clamp(30px,5vw,50px);border:2px solid var(--ink)}
.gz-svc li{padding:24px;border-right:1px solid var(--ink);text-align:center}.gz-svc li:last-child{border-right:0}
.gz-svc h3{font:400 22px "IM Fell English SC"}.gz-svc p{margin-top:6px;font-style:italic}
.gz-about{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.gz-about>p{font-size:clamp(20px,1.9vw,25px);font-style:italic}.gz-about dl{grid-column:2;margin:0}.gz-about dt{font:400 18px "IM Fell English SC";color:#e2b5a8;margin-top:16px}.gz-about dd{margin:2px 0 0}
.gz-end{padding:clamp(80px,11vw,160px) clamp(18px,4vw,56px);text-align:center}.gz-end h2{margin:0 auto}
.gz footer{display:flex;justify-content:space-between;padding:16px clamp(18px,4vw,56px);font:400 14px "IM Fell English SC";border-top:6px double var(--ink)}
@media(max-width:900px){.gz nav{gap:10px;font-size:13px}.gz-cols,.gz-list,.gz-svc ul,.gz-about{grid-template-columns:1fr}.gz-col,.gz-s,.gz-svc li{border-right:0;border-bottom:1px solid var(--ink)}.gz-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="gz-hero" aria-labelledby="h"><div class="gz-mast" aria-hidden="true"><b>' + k.E(k.c.name) + '</b></div><div class="gz-date" aria-hidden="true"><span>Vol. CXXX, No. 14</span><span>Thursday edition</span><span>Price: one coin</span></div><div style="text-align:center"><span class="gz-extra" aria-hidden="true">Extra</span><span class="gz-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1></div><div class="gz-cols"><div class="gz-col">' + k.E(k.c.bio) + '</div><div class="gz-col"><h3>In this edition</h3>' + k.c.cards.map(x => k.E(x.title)).join(". ") + '.</div><div class="gz-col"><h3>Delivered Thursday</h3>Pick up a copy at the harbour kiosk, or have it brought to your door before breakfast.' + k.cta("Write to us") + '</div></div><div class="gz-roll" aria-hidden="true"></div></section>',
  work: (k) => { const g = ["linear-gradient(160deg,#ccc,#444)", "radial-gradient(circle at 40% 40%,#eee,#555)", "linear-gradient(#aaa 0 50%,#333 50%)"]; const t = ["Front page", "Business", "Council"]; return '<section class="gz-stories" id="work"><h2>' + k.h("work", "This week") + '</h2><div class="gz-list">' + k.c.cards.map((x, i) => '<article class="gz-s"><small>' + t[i % 3] + "</small>" + (k.photo(i) || '<span class="gz-cut" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="gz-svc" id="services"><h2>' + k.h("services", "Services") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="gz-about" id="about"><h2>' + k.h("about", "About the paper") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="gz-end" id="contact"><h2>' + k.h("contact", "Got a story? Tell us.") + '</h2>' + k.cta("Write to us") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

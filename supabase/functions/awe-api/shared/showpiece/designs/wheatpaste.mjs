export default {
  id: "brutalist",
  root: "bp",
  fonts: "family=Bowlby+One+SC&family=Cousine:ital,wght@0,400;0,700;1,400",
  labels: { work: "Shows", services: "Booking", about: "The band", contact: "Book us" },
  demo: {
    name: "The Paper Saints", headline: "Loud. Live. Tonight.", heroLabel: "A four-piece punk band",
    bio: "Three chords, two drummers and one van that barely makes it. We play small rooms loudly, print our own posters and sell records from a suitcase at the back.",
    cards: [
      { title: "The basement, sold out", description: "180 people in a room built for 120. Nobody complained." },
      { title: "Summer festival, second stage", description: "A 4pm slot that turned into the talk of the weekend." },
      { title: "Debut album, on vinyl", description: "Recorded live in two days. 500 copies, pressed in red." },
    ],
    services: [
      { title: "Gigs", description: "Clubs, bars and festivals." },
      { title: "Support slots", description: "Touring with bigger bands." },
      { title: "Merch", description: "Records, shirts and screen-printed posters." },
    ],
  },
  css: `
.bp{--paper:#ece7da;--ink:#0d0d0d;--red:#e10600;--yellow:#ffe500;--grey:#bdb8ab;background:#2a2826;color:var(--ink);font:400 16px/1.6 Cousine,ui-monospace,monospace}
.bp header{display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,4vw,56px);background:var(--ink);color:var(--paper)}
.bp .brand{font:400 20px/1 "Bowlby One SC";text-decoration:none}
.bp nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700;text-transform:uppercase;font-size:14px}.bp nav a{text-decoration:none}.bp nav a:hover{background:var(--yellow);color:var(--ink)}
.bp-hero{position:relative;padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);background:repeating-linear-gradient(0deg,#33302d 0 2px,#2a2826 2px 6px);overflow:hidden}
.bp-wall{position:relative;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:20px}
.bp-poster{position:relative;padding:clamp(24px,3vw,44px);background:var(--paper);box-shadow:0 10px 20px rgba(0,0,0,.4);clip-path:polygon(0 1%,4% 0,30% 2%,60% 0,92% 1%,100% 0,99% 30%,100% 70%,98% 100%,70% 98%,40% 100%,8% 98%,0 100%,1% 60%);transform:rotate(-1deg);animation:bp-slap .5s cubic-bezier(.3,1.6,.5,1) both}
@keyframes bp-slap{from{transform:rotate(-8deg) scale(1.2);opacity:0}}
.bp-poster:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 30%,rgba(0,0,0,.08),transparent 30%),radial-gradient(circle at 80% 70%,rgba(0,0,0,.06),transparent 40%);pointer-events:none}
.bp-staple{position:absolute;width:22px;height:4px;background:#888;box-shadow:0 1px 0 #444}
.bp-label{display:inline-block;padding:4px 10px;background:var(--ink);color:var(--paper);font-weight:700;text-transform:uppercase;font-size:13px}
.bp h1{margin-top:16px;font:400 clamp(56px,9vw,150px)/.86 "Bowlby One SC";letter-spacing:-.02em}
.bp h1 .w{display:inline-block;animation:bp-word .4s steps(2) both;animation-delay:calc(.3s + var(--n,0) * 1s)}
.bp h1 .w:nth-child(1){--n:0}.bp h1 .w:nth-child(2){--n:.4}.bp h1 .w:nth-child(3){--n:.8}
@keyframes bp-word{from{opacity:0;transform:scale(1.6) rotate(-6deg)}}
.bp-poster p{margin-top:20px;max-width:46ch}
.bp .cta{display:inline-flex;margin-top:22px;padding:12px 22px;background:var(--red);color:var(--paper);font:400 18px "Bowlby One SC";text-decoration:none;transform:rotate(-2deg);box-shadow:4px 4px 0 var(--ink);transition:transform .15s}.bp .cta:hover{transform:rotate(2deg) scale(1.05)}.bp .cta-muted{background:var(--grey);color:#444;font:700 14px Cousine;transform:none}
.bp-side{display:grid;gap:20px;align-content:start}
.bp-flyer{position:relative;padding:22px;background:var(--c);color:var(--t);transform:rotate(var(--r));box-shadow:0 10px 20px rgba(0,0,0,.4);animation:bp-slap .5s cubic-bezier(.3,1.6,.5,1) both;animation-delay:var(--d)}
.bp-flyer b{display:block;font:400 clamp(28px,3vw,44px)/.95 "Bowlby One SC"}
.bp-flyer.torn{padding-bottom:48px;clip-path:polygon(0 0,100% 0,100% 70%,90% 76%,80% 68%,66% 80%,50% 70%,36% 82%,20% 72%,8% 80%,0 74%)}
.bp-stamp{position:absolute;right:14px;bottom:14px;padding:4px 10px;border:3px solid var(--red);color:var(--red);font:700 13px Cousine;text-transform:uppercase;transform:rotate(-12deg);opacity:0;animation:bp-stamp .3s ease 2.4s forwards}
@keyframes bp-stamp{from{transform:rotate(-12deg) scale(2)}to{opacity:.9;transform:rotate(-12deg)}}
.bp h2{font:400 clamp(44px,6.4vw,104px)/.9 "Bowlby One SC";max-width:14ch}
.bp-shows{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper)}
.bp-list{margin-top:clamp(40px,6vw,70px);border-top:6px solid var(--ink)}
.bp-s{display:grid;grid-template-columns:140px minmax(0,1fr) minmax(0,1.3fr);gap:24px;align-items:baseline;padding:22px 0;border-bottom:2px solid var(--ink)}
.bp-s span{font:400 28px "Bowlby One SC";color:var(--red)}
.bp-s h3{font:700 20px/1.2 Cousine;text-transform:uppercase}
.bp-s img{grid-column:2/-1;width:100%;max-height:260px;object-fit:cover;filter:grayscale(1) contrast(1.6)}
.bp-book{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--yellow)}
.bp-book ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.bp-book li{padding:26px;background:var(--paper);border:4px solid var(--ink);box-shadow:8px 8px 0 var(--ink)}
.bp-book h3{font:400 24px "Bowlby One SC"}.bp-book p{margin-top:6px}
.bp-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.bp-about>p{font-size:clamp(18px,1.6vw,22px)}.bp-about dl{grid-column:2;margin:0}.bp-about dt{font:400 18px "Bowlby One SC";color:var(--yellow);margin-top:16px}.bp-about dd{margin:2px 0 0}
.bp-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--red);color:var(--paper)}.bp-end h2{margin:0 auto}.bp-end .cta{background:var(--ink)}
.bp footer{display:flex;justify-content:space-between;padding:20px clamp(18px,4vw,56px);font-size:13px;text-transform:uppercase;background:var(--ink);color:var(--paper)}
@media(max-width:900px){.bp nav{gap:12px;font-size:12px}.bp-wall,.bp-book ul,.bp-about{grid-template-columns:1fr}.bp-s{grid-template-columns:1fr}.bp-s img{grid-column:auto}.bp-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="bp-hero" aria-labelledby="h"><div class="bp-wall"><div class="bp-poster"><span class="bp-staple" style="left:12px;top:10px;transform:rotate(-20deg)"></span><span class="bp-staple" style="right:14px;top:12px;transform:rotate(12deg)"></span><span class="bp-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book us") + '</div><div class="bp-side" aria-hidden="true"><div class="bp-flyer" style="--c:var(--yellow);--t:var(--ink);--r:3deg;--d:.6s"><b>Friday<br>doors 8pm</b>Basement bar, no dress code<span class="bp-stamp">Sold out</span></div><div class="bp-flyer torn" style="--c:var(--ink);--t:var(--paper);--r:-4deg;--d:1s"><b>New record<br>out now</b>500 copies on red vinyl</div><div class="bp-flyer" style="--c:var(--red);--t:var(--paper);--r:1.5deg;--d:1.4s"><b>All ages</b>Sunday matinee</div></div></div></section>',
  work: (k) => { const d = ["12 Oct", "28 Jul", "Out now"]; return '<section class="bp-shows" id="work"><h2>' + k.h("work", "Past shows") + '</h2><div class="bp-list">' + k.c.cards.map((x, i) => '<article class="bp-s"><span>' + d[i % 3] + "</span><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>"; },
  services: (k) => '<section class="bp-book" id="services"><h2>' + k.h("services", "Booking") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="bp-about" id="about"><h2>' + k.h("about", "The band") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="bp-end" id="contact"><h2>' + k.h("contact", "Turn it up.") + '</h2>' + k.cta("Book us") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

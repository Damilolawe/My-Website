export default {
  id: "monologue",
  root: "mn",
  fonts: "family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Anton",
  labels: { work: "Scripts", services: "Services", about: "About", contact: "Contact" },
  demo: {
    name: "Jonah Ellery", headline: "Fade in.", heroLabel: "Screenwriter",
    bio: "I write character-driven drama for film and television: small towns, big secrets, and people who say the wrong thing at the right moment. Two features produced, one series in development.",
    cards: [
      { title: "The Lighthouse Keeper's Daughter", description: "Feature. A grieving teenager and a stranger who washes ashore." },
      { title: "Low Season", description: "Six-part series. A seaside hotel, one bad winter, eleven guests." },
      { title: "Runner", description: "Short film. Festival selection, best screenplay award." },
    ],
    services: [
      { title: "Original scripts", description: "Features and series, from treatment to final draft." },
      { title: "Script doctoring", description: "Dialogue and structure passes on existing drafts." },
      { title: "Workshops", description: "Screenwriting courses for film schools." },
    ],
  },
  css: `
.mn{--page:#fdfcf8;--ink:#121212;--grey:#e9e6dc;--mute:#6b6b6b;--yellow:#ffe066;--black:#0b0b0b;background:var(--grey);color:var(--ink);font:400 16px/1.7 "Courier Prime","Courier New",monospace}
.mn header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--black);color:var(--page)}
.mn .brand{font:400 22px/1 Anton;letter-spacing:.06em;text-transform:uppercase;text-decoration:none}
.mn nav{display:flex;gap:clamp(14px,2.4vw,30px);text-transform:uppercase;font-size:14px}.mn nav a{text-decoration:none}.mn nav a:hover{color:var(--yellow)}
.mn-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.mn-page{position:relative;padding:clamp(30px,5vw,64px) clamp(26px,5vw,72px);background:var(--page);box-shadow:0 2px 0 #d8d4c8,0 30px 50px -30px rgba(0,0,0,.35)}
.mn-page:before{content:"1.";position:absolute;right:28px;top:20px;color:var(--mute)}
.mn-page>*{opacity:0;animation:mn-type .01s forwards;animation-delay:var(--d)}
@keyframes mn-type{to{opacity:1}}
.mn-sh{display:block;font-weight:700;text-transform:uppercase}
.mn-act{display:block;margin-top:18px}
.mn-char{display:block;margin:22px 0 0 34%;text-transform:uppercase}
.mn-par{display:block;margin-left:26%;font-style:italic;color:var(--mute)}
.mn-dia{margin:0 18% 0 18%}
.mn h1{font:400 clamp(60px,9vw,150px)/.9 Anton;text-transform:uppercase;letter-spacing:.01em;margin-left:18%}
.mn h1 .ch{animation:mn-key .01s both;animation-delay:calc(1.6s + var(--i) * 90ms)}@keyframes mn-key{from{visibility:hidden}}
.mn-dia p{margin:0}
.mn .cta{display:inline-flex;margin-top:24px;padding:12px 22px;background:var(--black);color:var(--yellow);text-transform:uppercase;font-weight:700;text-decoration:none;transition:background .2s,color .2s}.mn .cta:hover{background:var(--yellow);color:var(--black)}.mn .cta-muted{background:var(--grey);color:var(--mute);text-transform:none;font-weight:400}
.mn-trans{display:block;margin-top:22px;text-align:right;text-transform:uppercase}
.mn-slate{position:relative;justify-self:center;width:min(100%,380px);aspect-ratio:.92}
.mn-board{position:absolute;left:0;right:0;bottom:0;height:78%;padding:22px;background:var(--black);color:var(--page);display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr 1fr;gap:10px;font:400 13px "Courier Prime";text-transform:uppercase;border-radius:6px}
.mn-board b{display:block;font:400 clamp(26px,3vw,40px) Anton;letter-spacing:.04em}
.mn-board div{border-top:2px solid #444;padding-top:8px}
.mn-board div:first-child{grid-column:1/-1;border:0;padding:0}
.mn-clap{position:absolute;left:0;right:0;top:4%;height:18%;border-radius:6px 6px 0 0;background:repeating-linear-gradient(-60deg,var(--page) 0 26px,var(--black) 26px 52px);transform-origin:4% 100%;animation:mn-clap 3s cubic-bezier(.6,0,.4,1) .4s infinite}
.mn-base{position:absolute;left:0;right:0;top:20%;height:5%;background:repeating-linear-gradient(-60deg,var(--page) 0 26px,var(--black) 26px 52px)}
@keyframes mn-clap{0%,10%{transform:rotate(-24deg)}22%,100%{transform:rotate(0)}}
.mn h2{font:400 clamp(44px,6.4vw,104px)/.95 Anton;text-transform:uppercase;max-width:14ch}
.mn-scripts{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--black);color:var(--page)}
.mn-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:clamp(40px,6vw,70px)}
.mn-cover{position:relative;padding:34px 26px;aspect-ratio:.77;background:var(--page);color:var(--ink);display:flex;flex-direction:column;justify-content:center;text-align:center;box-shadow:6px 6px 0 #333}
.mn-cover:before{content:"";position:absolute;left:14px;top:20%;bottom:20%;width:6px;background:radial-gradient(circle,#b9b5aa 3px,transparent 3.5px) 0 0/6px 33.3%}
.mn-cover small{text-transform:uppercase;color:var(--mute)}
.mn-cover img{width:100%;aspect-ratio:16/9;object-fit:cover;margin-bottom:16px;filter:grayscale(1)}
.mn-cover h3{margin-top:10px;font:700 20px/1.3 "Courier Prime";text-transform:uppercase;text-decoration:underline}.mn-cover p{margin-top:14px;font-size:14px}
.mn-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.mn-svc ul{margin-top:clamp(36px,5vw,56px);max-width:860px}
.mn-svc li{padding:20px 0;border-top:1px solid #c9c5b9}
.mn-svc h3{font:700 18px "Courier Prime";text-transform:uppercase}.mn-svc h3:before{content:"INT. "}.mn-svc p{margin-left:18%}
.mn-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--page);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mn-about>p{font-size:18px}.mn-about dl{grid-column:2;margin:0}.mn-about dt{font-weight:700;text-transform:uppercase;margin-top:18px}.mn-about dd{margin:2px 0 0 18%}
.mn-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--yellow)}.mn-end h2{margin:0 auto}
.mn footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;text-transform:uppercase;background:var(--black);color:var(--page)}
@media(max-width:900px){.mn nav{gap:12px;font-size:12px}.mn-hero,.mn-list,.mn-about{grid-template-columns:1fr}.mn-about dl{grid-column:auto}.mn h1,.mn-dia{margin-left:0;margin-right:0}.mn-char{margin-left:20%}}
@media (prefers-reduced-motion:reduce){.mn-page>*{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="mn-hero" aria-labelledby="h"><div class="mn-page"><span class="mn-sh" style="--d:.2s">INT. WRITING ROOM - NIGHT</span><span class="mn-act" style="--d:.7s">A desk lamp. A cold coffee. ' + k.E(k.c.name.toUpperCase()) + ", " + k.E((k.c.heroLabel || "").toLowerCase()) + ', types the first line.</span><span class="mn-char" style="--d:1.2s">' + k.E(k.c.name.split(" ")[0].toUpperCase()) + '</span><span class="mn-par" style="--d:1.4s">(quietly)</span><h1 id="h" style="--d:1.6s">' + k.letters(k.c.headline) + '</h1><div class="mn-dia" style="--d:2.4s"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Contact") + '</div><span class="mn-trans" style="--d:3s">Cut to:</span></div><div class="mn-slate" aria-hidden="true"><span class="mn-base"></span><span class="mn-clap"></span><div class="mn-board"><div>Production<b>' + k.E(k.c.name.split(" ").slice(-1)[0]) + '</b></div><div>Scene<b>1</b></div><div>Take<b>4</b></div><div>Director<b>TBC</b></div><div>Date<b>Today</b></div></div></div></section>',
  work: (k) => { const t = ["Feature", "Series", "Short"]; return '<section class="mn-scripts" id="work"><h2>Scripts</h2><div class="mn-list">' + k.c.cards.map((x, i) => '<article class="mn-cover">' + k.photo(i) + "<small>" + t[i % 3] + "</small><h3>" + k.E(x.title) + "</h3><small>written by</small><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="mn-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="mn-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mn-end" id="contact"><h2>Smash cut to: your project.</h2>' + k.cta("Contact") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

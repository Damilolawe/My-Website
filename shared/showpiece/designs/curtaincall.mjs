export default {
  id: "playbill",
  root: "pl",
  fonts: "family=Rozha+One&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400",
  labels: { work: "Roles", services: "Representation", about: "Biography", contact: "Contact my agent" },
  demo: {
    name: "Rosalind Achebe", headline: "Now appearing.", heroLabel: "Stage and screen actor",
    bio: "Trained at drama school in London, twelve years on stage from Shakespeare to new writing, and recently on screen in a detective series. Happiest in a rehearsal room with a difficult script.",
    cards: [
      { title: "Lady Macbeth", description: "A sold-out regional run. Critics called it terrifying, in the good way." },
      { title: "The Glass Garden", description: "A new play by a first-time writer, transferred to the West End." },
      { title: "DS Hart, series two", description: "A recurring role in a television detective drama." },
    ],
    services: [
      { title: "Theatre", description: "Classical and contemporary, touring and resident." },
      { title: "Screen", description: "Television, film and commercials." },
      { title: "Voice", description: "Audiobooks, radio drama and narration." },
    ],
  },
  css: `
.pl{--velvet:#7b0f1e;--deep:#3d0710;--gold:#d9b25f;--cream:#f5ead2;--ink:#1e130e;--mute:#7a6650;background:var(--cream);color:var(--ink);font:400 18px/1.7 "Old Standard TT",Georgia,serif}
.pl header{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(18px,4vw,56px);background:var(--deep);color:var(--gold)}
.pl .brand{font:400 22px/1 "Rozha One";text-decoration:none}
.pl nav{display:flex;gap:clamp(14px,2.4vw,30px);font-style:italic}.pl nav a{text-decoration:none;color:var(--cream)}.pl nav a:hover{color:var(--gold)}
.pl-hero{position:relative;padding:clamp(24px,3vw,40px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);background:var(--deep);overflow:hidden}
.pl-stage{position:relative;min-height:clamp(520px,60vw,720px);border:3px solid var(--gold);background:radial-gradient(40% 60% at 50% 30%,rgba(255,236,190,.4),transparent 70%),var(--cream);display:grid;place-items:center;text-align:center;overflow:hidden;box-shadow:inset 0 0 0 8px var(--deep),inset 0 0 0 10px var(--gold)}
.pl-curt{position:absolute;top:0;bottom:0;width:52%;z-index:3;background:repeating-linear-gradient(90deg,#5e0b17 0 18px,#9a1a2b 18px 34px,#6d0d1b 34px 50px);box-shadow:inset -20px 0 40px rgba(0,0,0,.5);animation:pl-open 2.6s cubic-bezier(.7,0,.2,1) .6s both}
.pl-curt.l{left:0;transform-origin:left}.pl-curt.r{right:0;transform-origin:right;--dir:1}
@keyframes pl-open{from{transform:scaleX(1)}to{transform:scaleX(.12)}}
.pl-valance{position:absolute;left:0;right:0;top:0;height:60px;z-index:4;background:radial-gradient(40px 30px at 40px 0,#9a1a2b 98%,transparent) 0 0/80px 60px,var(--velvet);border-bottom:4px solid var(--gold)}
.pl-bill{position:relative;z-index:2;padding:80px 6% 40px}
.pl-presents{font:italic 400 20px "Old Standard TT";color:var(--mute)}
.pl h1{margin:12px auto 0;font:400 clamp(60px,10vw,170px)/.9 "Rozha One";color:var(--velvet)}
.pl h1 .ch{display:inline-block;animation:pl-in .6s ease both;animation-delay:calc(2.4s + var(--i) * 50ms)}@keyframes pl-in{from{opacity:0;transform:translateY(.3em)}}
.pl-star{display:block;margin-top:14px;font:700 clamp(22px,2.6vw,34px) "Old Standard TT";letter-spacing:.3em;text-transform:uppercase}
.pl-label{display:block;margin-top:6px;font-style:italic;color:var(--mute)}
.pl-bill p{margin:20px auto 0;max-width:52ch}
.pl .cta{display:inline-flex;margin-top:26px;padding:14px 30px;background:var(--velvet);color:var(--gold);font:700 15px "Old Standard TT";letter-spacing:.2em;text-transform:uppercase;text-decoration:none;border:2px solid var(--gold);transition:background .2s}.pl .cta:hover{background:var(--deep)}.pl .cta-muted{background:transparent;color:var(--mute);border-color:#c9b48e;letter-spacing:0;text-transform:none}
.pl-spot{position:absolute;left:50%;top:-20%;width:70%;height:140%;margin-left:-35%;z-index:1;background:radial-gradient(ellipse at 50% 0,rgba(255,240,200,.6),transparent 60%);animation:pl-sweep 6s ease-in-out 3s infinite alternate;transform-origin:50% 0}@keyframes pl-sweep{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
.pl h2{font:400 clamp(44px,6.4vw,104px)/1 "Rozha One";color:var(--velvet);max-width:14ch}
.pl-roles{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.pl-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px)}
.pl-r{padding:30px 26px;text-align:center;background:#fffaf0;border:1px solid var(--gold);outline:4px double var(--gold);outline-offset:-12px}
.pl-r small{font:italic 400 16px "Old Standard TT";color:var(--mute)}
.pl-r img{width:100%;aspect-ratio:4/5;object-fit:cover;margin:14px 0;filter:sepia(.3)}
.pl-r h3{margin-top:8px;font:400 30px/1.1 "Rozha One"}.pl-r p{margin-top:10px;font-size:16px}
.pl-rep{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--velvet);color:var(--cream)}.pl-rep h2{color:var(--gold)}
.pl-rep ul{margin-top:clamp(36px,5vw,56px)}
.pl-rep li{display:flex;align-items:baseline;gap:14px;padding:18px 0;font-size:20px}
.pl-rep li h3{font:400 28px "Rozha One";color:var(--gold);white-space:nowrap}
.pl-rep li:after{content:"";order:1;flex:1;border-bottom:2px dotted rgba(217,178,95,.5)}
.pl-rep li p{order:2;font-style:italic;text-align:right}
.pl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.pl-about>p{font-size:clamp(20px,1.9vw,25px)}.pl-about dl{grid-column:2;margin:0}.pl-about dt{font:700 14px "Old Standard TT";letter-spacing:.2em;text-transform:uppercase;color:var(--velvet);margin-top:18px}.pl-about dd{margin:2px 0 0}
.pl-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--deep);color:var(--gold)}.pl-end h2{margin:0 auto;color:var(--gold)}
.pl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-style:italic;background:var(--deep);color:var(--cream);border-top:1px solid var(--gold)}
@media(max-width:900px){.pl nav{gap:12px;font-size:14px}.pl-list,.pl-about{grid-template-columns:1fr}.pl-rep li{flex-wrap:wrap}.pl-rep li:after{display:none}.pl-rep li p{text-align:left}.pl-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.pl-curt{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="pl-hero" aria-labelledby="h"><div class="pl-stage"><span class="pl-valance" aria-hidden="true"></span><span class="pl-curt l" aria-hidden="true"></span><span class="pl-curt r" aria-hidden="true"></span><span class="pl-spot" aria-hidden="true"></span><div class="pl-bill"><span class="pl-presents">The company presents</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><span class="pl-star">' + k.E(k.c.name) + '</span><span class="pl-label">' + k.E(k.c.heroLabel || "") + "</span><p>" + k.E(k.c.bio) + "</p>" + k.cta("Contact my agent") + "</div></div></section>",
  work: (k) => { const a = ["Act one", "Act two", "Act three"]; return '<section class="pl-roles" id="work"><h2>' + k.h("work", "Recent roles") + '</h2><div class="pl-list">' + k.c.cards.map((x, i) => '<article class="pl-r"><small>' + a[i % 3] + "</small>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="pl-rep" id="services"><h2>' + k.h("services", "Available for") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="pl-about" id="about"><h2>' + k.h("about", "Biography") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="pl-end" id="contact"><h2>' + k.h("contact", "Take a bow.") + '</h2>' + k.cta("Contact my agent") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

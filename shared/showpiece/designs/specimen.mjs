export default {
  id: "studiomargaux",
  root: "sm",
  fonts: "family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&family=Instrument+Sans:wght@400;500;600",
  labels: { work: "Work", services: "Services", about: "Studio", contact: "Start a project" },
  demo: {
    name: "Studio Margaux", headline: "Type first. Always.", heroLabel: "A design studio for identities and books",
    bio: "We are three designers who start every project with the letters. Identities, books and signage for cultural institutions, restaurants and anyone who believes a typeface can carry a whole brand.",
    cards: [
      { title: "A museum rebrand", description: "A custom serif, cut from labels found in the museum's own archive." },
      { title: "A cookbook, 400 pages", description: "Recipes set in two typefaces and one very generous margin." },
      { title: "Wayfinding for a library", description: "Signs you can read from across a room, and from a wheelchair." },
    ],
    services: [
      { title: "Identity", description: "Names, marks and custom lettering." },
      { title: "Editorial", description: "Books, magazines and annual reports." },
      { title: "Signage", description: "Wayfinding for buildings and campuses." },
    ],
  },
  css: `
.sm{--cream:#f4ecdf;--ink:#1b1712;--tomato:#e2452b;--olive:#5f6232;--mute:#7c7366;background:var(--cream);color:var(--ink);font:400 17px/1.7 "Instrument Sans",system-ui,sans-serif}
.sm header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.sm .brand{font:600 22px/1 Fraunces;font-variation-settings:"SOFT" 100,"WONK" 1;text-decoration:none}
.sm nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500}.sm nav a{text-decoration:none}.sm nav a:hover{color:var(--tomato)}
.sm-hero{position:relative;padding:clamp(20px,3vw,40px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden}
.sm-giant{position:absolute;right:-6%;top:-6%;font:900 clamp(320px,52vw,760px)/.8 Fraunces;color:var(--tomato);font-variation-settings:"SOFT" 0,"WONK" 0,"opsz" 144;animation:sm-axis 6s ease-in-out infinite alternate;pointer-events:none;user-select:none}
@keyframes sm-axis{to{font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 9;font-weight:300}}
.sm-label{position:relative;font-weight:600;font-size:14px;letter-spacing:.1em;text-transform:uppercase}
.sm h1{position:relative;margin-top:clamp(120px,16vw,220px);max-width:9ch;font:800 clamp(72px,12vw,210px)/.86 Fraunces;letter-spacing:-.045em;font-variation-settings:"opsz" 144,"SOFT" 50}
.sm h1 .ch{display:inline-block;animation:sm-in 1s cubic-bezier(.2,.9,.3,1) both;animation-delay:calc(var(--i) * 40ms)}@keyframes sm-in{from{opacity:0;font-weight:200;transform:translateY(.2em)}}
.sm-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,60px);margin-top:30px;align-items:end}
.sm-row p{max-width:42ch;font-size:18px}
.sm .cta{display:inline-flex;padding:16px 28px;border-radius:999px;background:var(--ink);color:var(--cream);font-weight:600;text-decoration:none;justify-self:end;transition:background .3s}.sm .cta:hover{background:var(--tomato)}.sm .cta-muted{background:#e6dccb;color:var(--mute)}
.sm-spec{position:relative;display:flex;gap:clamp(10px,2vw,30px);flex-wrap:wrap;margin-top:clamp(40px,6vw,70px);padding-top:20px;border-top:2px solid var(--ink);font:400 clamp(28px,3.4vw,52px)/1 Fraunces}
.sm-spec span{font-variation-settings:"opsz" 144,"SOFT" var(--s),"WONK" var(--w);font-weight:var(--wt);animation:sm-spec 3s ease-in-out infinite alternate;animation-delay:var(--d)}
@keyframes sm-spec{to{font-weight:900}}
.sm h2{font:800 clamp(52px,8vw,136px)/.88 Fraunces;letter-spacing:-.04em;max-width:11ch;font-variation-settings:"SOFT" 100}
.sm-work{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--cream)}
.sm-list{margin-top:clamp(40px,6vw,70px)}
.sm-w{display:grid;grid-template-columns:minmax(0,.4fr) minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,3vw,40px);align-items:baseline;padding:28px 0;border-top:1px solid #3a342c}
.sm-w:nth-child(2){padding-left:12%}.sm-w:nth-child(3){padding-left:24%}
.sm-w b{font:300 clamp(60px,7vw,110px)/.8 Fraunces;color:var(--tomato);font-variation-settings:"WONK" 1}
.sm-w h3{font:600 clamp(28px,3vw,44px)/1 Fraunces;letter-spacing:-.02em}.sm-w p{color:#cfc5b5}
.sm-w img{grid-column:2/-1;width:100%;aspect-ratio:16/9;object-fit:cover}
.sm-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.sm-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,40px);margin-top:clamp(36px,5vw,56px)}
.sm-svc li:before{content:attr(data-g);display:block;font:900 clamp(90px,10vw,150px)/.9 Fraunces;color:var(--olive);font-variation-settings:"SOFT" 100,"WONK" 1}
.sm-svc h3{margin-top:12px;font:600 26px Fraunces}.sm-svc p{margin-top:6px;color:#4d463c}
.sm-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--tomato);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.sm-about>p{font:400 clamp(22px,2.2vw,30px)/1.4 Fraunces}.sm-about dl{grid-column:2;margin:0}.sm-about dt{font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-size:13px;margin-top:18px}.sm-about dd{margin:2px 0 0}
.sm-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px)}.sm-end h2{max-width:14ch}.sm-end .cta{margin-top:30px}
.sm footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute)}
@media(max-width:900px){.sm nav{gap:12px;font-size:14px}.sm-row,.sm-svc ul,.sm-about{grid-template-columns:1fr}.sm .cta{justify-self:start}.sm-w,.sm-w:nth-child(n){grid-template-columns:1fr;padding-left:0}.sm-w img{grid-column:auto}.sm-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const S = [["Aa", 0, 0, 300, "0s"], ["Rg", 100, 1, 500, ".4s"], ["Qq", 50, 0, 700, ".8s"], ["&", 100, 1, 400, "1.2s"], ["Ff", 0, 1, 900, "1.6s"], ["01", 80, 0, 600, "2s"]]; return '<section class="sm-hero" aria-labelledby="h"><span class="sm-giant" aria-hidden="true">' + k.E((k.c.name || "M").trim().charAt(0)) + '</span><span class="sm-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + '</h1><div class="sm-row"><p>' + k.E(k.c.bio) + "</p>" + k.cta("Start a project") + '</div><div class="sm-spec" aria-hidden="true">' + S.map(s => '<span style="--s:' + s[1] + ";--w:" + s[2] + ";--wt:" + s[3] + ";--d:" + s[4] + '">' + s[0] + "</span>").join("") + "</div></section>"; },
  work: (k) => '<section class="sm-work" id="work"><h2>Work</h2><div class="sm-list">' + k.c.cards.map((x, i) => '<article class="sm-w"><b>' + String(i + 1).padStart(2, "0") + "</b><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p>" + k.photo(i) + "</article>").join("") + "</div></section>",
  services: (k) => { const g = ["A", "g", "R"]; return '<section class="sm-svc" id="services"><h2>Services</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li data-g="' + g[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="sm-about" id="about"><h2>Studio</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="sm-end" id="contact"><h2>Let us set something beautiful.</h2>' + k.cta("Start a project") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

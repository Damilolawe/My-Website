export default {
  id: "md-notion",
  root: "mr",
  fonts: "family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400&family=Public+Sans:wght@400;600",
  labels: { work: "Templates", services: "Plans", about: "About", contact: "Get started" },
  intros: {
    work: { title: "Pages people built", text: "Plans, notes and trackers, each one started from a blank page." },
    features: { title: "Plans", text: "Free for yourself. Affordable for the whole team." },
    studio: { title: "About the room", text: null },
    contact: { title: "Get started", text: "Make your first page in under a minute." },
  },
  demo: {
    name: "The Making Room", headline: "One page for everything.", heroLabel: "Notes, plans and trackers in one place",
    bio: "Write notes, plan projects and keep lists in pages that link to each other. Start with a blank page or a template, and shape it as your work changes.",
    cards: [
      { title: "A wedding planned on one page", description: "Guests, budget and the seating chart, shared with both families." },
      { title: "A team wiki that stays current", description: "Every page shows who changed it last, and when." },
      { title: "A reading list with notes", description: "Books, quotes and a rating, sorted however you like." },
    ],
    services: [
      { title: "Personal", description: "Unlimited pages for one person. Free." },
      { title: "Team", description: "Shared spaces, comments and page history." },
      { title: "Company", description: "Permissions, audit log and single sign-on." },
    ],
  },
  css: `
.mr{--paper:#fbfaf7;--ink:#1f1e1c;--line:#e6e3dc;--mute:#7a766d;--tick:#e8574a;--hi:#fff2a8;background:var(--paper);color:var(--ink);font:400 17px/1.7 "Public Sans",system-ui,sans-serif}
.mr header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px);border-bottom:1px solid var(--line)}
.mr .brand{font:700 20px/1 Literata,serif;text-decoration:none}
.mr nav{display:flex;gap:clamp(14px,2.4vw,30px);font-size:15px}.mr nav a{text-decoration:none;color:var(--mute)}.mr nav a:hover,.mr nav a[aria-current]{color:var(--ink)}
.mr-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,120px) clamp(18px,4vw,56px)}
.mr h1{font:400 clamp(54px,7.8vw,128px)/1 Literata,serif;letter-spacing:-.04em}
.mr h1 .ch{animation:mr-in .7s ease both;animation-delay:calc(var(--i) * 25ms)}@keyframes mr-in{from{opacity:0}}
.mr-hero p{margin-top:26px;max-width:42ch;color:#4d4a44;font-size:clamp(18px,1.5vw,20px)}
.mr .cta{display:inline-flex;margin-top:30px;padding:14px 24px;border-radius:8px;background:var(--ink);color:#fff;font-weight:600;text-decoration:none;transition:background .2s}.mr .cta:hover{background:#3a3833}.mr .cta-muted{background:#efede7;color:var(--mute)}
.mr-page{padding:clamp(26px,3vw,44px);border:1px solid var(--line);border-radius:10px;background:#fff;box-shadow:0 30px 60px -40px rgba(31,30,28,.4)}
.mr-page small{display:block;font-size:13px;color:var(--mute)}
.mr-page b{display:block;margin-top:6px;font:700 30px/1.2 Literata,serif}
.mr-page b:before{content:"";display:inline-block;width:.8em;height:.8em;margin-right:12px;border-radius:4px;background:var(--hi);vertical-align:-.05em}
.mr-page ul{margin-top:22px}
.mr-page li{display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid var(--line)}
.mr-box{position:relative;flex:none;width:22px;height:22px;border:2px solid var(--ink);border-radius:5px}
.mr-box:after{content:"";position:absolute;left:5px;top:1px;width:7px;height:12px;border:solid var(--tick);border-width:0 3px 3px 0;transform:rotate(45deg) scale(0);transform-origin:center;animation:mr-tick .35s cubic-bezier(.3,1.6,.5,1) both;animation-delay:var(--d)}
.mr-page li span:last-child{position:relative}.mr-page li span:last-child:after{content:"";position:absolute;left:0;top:52%;height:2px;width:100%;background:var(--mute);transform:scaleX(0);transform-origin:left;animation:mr-strike .4s ease both;animation-delay:calc(var(--d) + .2s)}
.mr-page li:last-child span:last-child:after,.mr-page li:last-child .mr-box:after{display:none}
@keyframes mr-tick{to{transform:rotate(45deg) scale(1)}}@keyframes mr-strike{to{transform:scaleX(1)}}
.mr-slash{margin-top:18px;font-size:15px;color:var(--mute)}.mr-slash i{font-style:normal;padding:1px 6px;border-radius:4px;background:#efede7;color:var(--ink)}
.mr-intro{padding:clamp(60px,9vw,120px) clamp(18px,4vw,56px) clamp(40px,6vw,70px);border-bottom:1px solid var(--line)}.mr-intro h1{font-size:clamp(50px,7vw,112px)}.mr-intro p{margin-top:18px;max-width:46ch;color:#4d4a44}
.mr h2{font:400 clamp(40px,5.6vw,88px)/1.02 Literata,serif;letter-spacing:-.035em;max-width:15ch}
.mr h2 em{background:linear-gradient(transparent 60%,var(--hi) 60%)}
.mr-templates{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.mr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.mr-tpl{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;transition:transform .3s,box-shadow .3s}.mr-tpl:hover{transform:translateY(-4px);box-shadow:0 20px 40px -24px rgba(31,30,28,.4)}
.mr-cover{height:110px;background:var(--c,#f3e7d3)}.mr-tpl:nth-child(2) .mr-cover{--c:#dfe9f3}.mr-tpl:nth-child(3) .mr-cover{--c:#e7efdf}
.mr-cover img{width:100%;height:100%;object-fit:cover}
.mr-tpl div{padding:22px}.mr-tpl h3{font:700 22px/1.25 Literata,serif}.mr-tpl p{margin-top:8px;color:#4d4a44}
.mr-plans{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.mr-plans table{width:100%;margin-top:clamp(36px,5vw,56px);border-collapse:collapse}
.mr-plans th,.mr-plans td{padding:20px 0;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.mr-plans th{width:30%;font:700 22px Literata,serif}.mr-plans td{color:#4d4a44}
.mr-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#f3f1ec;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mr-about>p{font:400 clamp(20px,2vw,26px)/1.55 Literata,serif}.mr-about dl{grid-column:2;margin:0}.mr-about dt{font-weight:600;margin-top:16px}.mr-about dd{margin:2px 0 0;color:#4d4a44}
.mr-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.mr-end h2{margin:0 auto}
.mr footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute);border-top:1px solid var(--line)}
@media(max-width:900px){.mr nav{gap:12px;font-size:13px}.mr-hero,.mr-grid,.mr-about{grid-template-columns:1fr}.mr-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const items = ["Book the venue", "Send the invites", "Choose the menu", "Write the speech"]; return '<section class="mr-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Make your first page") + '</div><div class="mr-page" aria-hidden="true"><small>Shared with 4 people</small><b>Saturday plan</b><ul>' + items.map((x, i) => '<li><span class="mr-box" style="--d:' + (0.8 + i * 0.6) + 's"></span><span style="--d:' + (0.8 + i * 0.6) + 's">' + x + "</span></li>").join("") + '</ul><p class="mr-slash">Type <i>/</i> to add a table, a list or a page</p></div></section>'; },
  intro: (k) => { const t = k.intro(); return '<section class="mr-intro" aria-labelledby="h"><h1 id="h">' + k.letters(t.title) + "</h1><p>" + k.E(t.text) + "</p></section>"; },
  work: (k) => '<section class="mr-templates" id="work"><h2>Start from a <em>page that works</em></h2><div class="mr-grid">' + k.c.cards.map((x, i) => '<article class="mr-tpl"><div class="mr-cover">' + k.photo(i) + "</div><div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>",
  services: (k) => '<section class="mr-plans" id="services"><h2>Plans</h2><table><tbody>' + k.c.services.map(s => "<tr><th scope=\"row\">" + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="mr-about" id="about"><h2>A quiet place to think</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mr-end" id="contact"><h2>Your <em>first page</em> is waiting.</h2>' + k.cta("Get started free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

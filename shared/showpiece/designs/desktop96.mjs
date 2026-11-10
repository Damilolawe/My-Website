export default {
  id: "md-dell-1996",
  root: "bc",
  fonts: "family=VT323&family=Hind:wght@400;600;700",
  labels: { work: "Repairs", services: "Prices", about: "About", contact: "Book a repair" },
  demo: {
    name: "Byte & Co.", headline: "We fix old computers.", heroLabel: "Vintage computer repair and restoration",
    bio: "Beige towers, chunky laptops and the family computer from the attic. We repair, restore and recover the files from machines everyone else says are too old to fix.",
    cards: [
      { title: "A 1996 tower, booting again", description: "New capacitors, a cleaned fan and the original games still installed." },
      { title: "Twenty years of photos, recovered", description: "Copied off a failing hard drive onto a USB stick and two backups." },
      { title: "A school's computer lab, restored", description: "Twelve machines for a museum exhibit, all working." },
    ],
    services: [
      { title: "Diagnosis", description: "Free look and a written quote within two days." },
      { title: "Repair", description: "Parts, labour and a ninety-day guarantee." },
      { title: "File rescue", description: "Your files off old drives and disks, onto new media." },
    ],
  },
  css: `
.bc{--teal:#008080;--grey:#c0c0c0;--white:#fff;--dark:#808080;--navy:#000080;--ink:#000;background:var(--teal);color:var(--ink);font:400 17px/1.6 Hind,system-ui,sans-serif}
.bc header{display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:var(--grey);border-bottom:2px solid var(--dark);box-shadow:inset 0 2px 0 var(--white)}
.bc .brand{display:flex;align-items:center;gap:8px;padding:4px 12px;font:700 16px Hind;text-decoration:none;background:var(--grey);box-shadow:inset 2px 2px 0 var(--white),inset -2px -2px 0 var(--ink)}
.bc .brand:before{content:"";width:16px;height:14px;background:conic-gradient(#f00 0 25%,#0a0 0 50%,#ff0 0 75%,#00f 0)}
.bc nav{display:flex;gap:6px}.bc nav a{padding:4px 12px;font-weight:600;font-size:15px;text-decoration:none;background:var(--grey);box-shadow:inset 2px 2px 0 var(--white),inset -2px -2px 0 var(--ink)}.bc nav a:active,.bc nav a[aria-current]{box-shadow:inset 2px 2px 0 var(--ink),inset -2px -2px 0 var(--white);text-decoration:none}
.bc-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,50px);align-items:start;padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}
.bc-win{background:var(--grey);box-shadow:inset 2px 2px 0 var(--white),inset -2px -2px 0 var(--ink),4px 4px 0 rgba(0,0,0,.3)}
.bc-title{display:flex;justify-content:space-between;align-items:center;padding:4px 6px;background:linear-gradient(90deg,var(--navy),#1084d0);color:#fff;font:700 15px Hind}
.bc-title i{display:inline-block;width:18px;height:16px;margin-left:3px;background:var(--grey);box-shadow:inset 1px 1px 0 var(--white),inset -1px -1px 0 var(--ink)}
.bc-body{padding:clamp(18px,3vw,30px)}
.bc h1{font:400 clamp(56px,8vw,128px)/.85 VT323,monospace;color:var(--navy)}
.bc h1 .ch{animation:bc-type .01s both;animation-delay:calc(var(--i) * 60ms)}@keyframes bc-type{from{opacity:0}}
.bc-body p{margin-top:16px}
.bc .cta{display:inline-flex;margin-top:22px;padding:8px 22px;background:var(--grey);color:var(--ink);font-weight:700;text-decoration:none;box-shadow:inset 2px 2px 0 var(--white),inset -2px -2px 0 var(--ink),0 0 0 1px var(--ink)}.bc .cta:active{box-shadow:inset 2px 2px 0 var(--ink),inset -2px -2px 0 var(--white)}.bc .cta-muted{font-weight:400}
.bc-install .bc-body{font:400 20px/1.3 VT323,monospace}
.bc-prog{height:26px;margin-top:14px;padding:3px;box-shadow:inset 2px 2px 0 var(--dark),inset -2px -2px 0 var(--white);background:#fff}
.bc-prog i{display:block;height:100%;background:repeating-linear-gradient(90deg,var(--navy) 0 14px,transparent 14px 17px);animation:bc-load 5s steps(20) infinite}@keyframes bc-load{from{width:0}to{width:100%}}
.bc-files{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:18px;text-align:center;font:400 18px VT323,monospace}
.bc-files span:before{content:"";display:block;width:36px;height:30px;margin:0 auto 4px;background:#ffd84a;clip-path:polygon(0 15%,40% 15%,50% 0,100% 0,100% 100%,0 100%);animation:bc-hop 5s ease infinite;animation-delay:var(--d)}
@keyframes bc-hop{0%,70%,100%{transform:none}75%{transform:translateY(-8px)}}
.bc-intro{padding:clamp(40px,6vw,80px) clamp(18px,4vw,56px)}
.bc h2{font:400 clamp(44px,6vw,96px)/.9 VT323,monospace;color:#fff;text-shadow:3px 3px 0 var(--ink)}
.bc-repairs{padding:clamp(70px,9vw,120px) clamp(18px,4vw,56px)}
.bc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(30px,5vw,60px)}
.bc-grid h3{font:700 20px/1.2 Hind}.bc-grid p{margin-top:8px}
.bc-grid img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:12px;box-shadow:inset 2px 2px 0 var(--dark)}
.bc-prices{padding:0 clamp(18px,4vw,56px) clamp(70px,9vw,120px)}
.bc-prices table{width:100%;margin-top:clamp(30px,5vw,50px);border-collapse:collapse;background:#fff;box-shadow:inset 2px 2px 0 var(--dark)}
.bc-prices th,.bc-prices td{padding:12px 14px;border-bottom:1px solid var(--grey);text-align:left}.bc-prices th{font:400 24px VT323,monospace;color:var(--navy)}
.bc-about{padding:clamp(70px,9vw,120px) clamp(18px,4vw,56px)}
.bc-about .bc-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:30px}.bc-about dl{margin:0}.bc-about dt{font:400 22px VT323,monospace;color:var(--navy);margin-top:10px}.bc-about dd{margin:0}
.bc-end{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);text-align:center}.bc-end h2{margin:0 auto}
.bc footer{display:flex;justify-content:space-between;padding:6px 12px;background:var(--grey);font-size:14px;box-shadow:inset 0 2px 0 var(--white)}
@media(max-width:900px){.bc nav{flex-wrap:wrap}.bc nav a{font-size:13px;padding:3px 8px}.bc-hero,.bc-grid,.bc-about .bc-body{grid-template-columns:1fr}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const win = (title, body, cls = "") => '<div class="bc-win ' + cls + '"><div class="bc-title"><span>' + title + '</span><span aria-hidden="true"><i></i><i></i><i></i></span></div><div class="bc-body">' + body + "</div></div>"; return '<section class="bc-hero" aria-labelledby="h">' + win(k.E(k.c.heroLabel || k.c.name), '<h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a repair")) + '<div aria-hidden="true">' + win("Recovering files...", 'Copying FAMILY PHOTOS to USB drive<div class="bc-prog"><i></i></div><div class="bc-files"><span style="--d:.2s">PHOTOS</span><span style="--d:.5s">LETTERS</span><span style="--d:.8s">GAMES</span><span style="--d:1.1s">MUSIC</span></div>', "bc-install") + "</div></section>"; },
  work: (k) => '<section class="bc-repairs" id="work"><h2>Recent repairs</h2><div class="bc-grid">' + k.c.cards.map((x, i) => '<div class="bc-win"><div class="bc-title"><span>Job ' + (i + 1) + '.txt</span></div><div class="bc-body">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></div>").join("") + "</div></section>",
  services: (k) => '<section class="bc-prices" id="services"><h2>Price list</h2><table><tbody>' + k.c.services.map(s => '<tr><th scope="row">' + k.E(s.title) + "</th><td>" + k.E(s.description || "") + "</td></tr>").join("") + "</tbody></table></section>",
  about: (k) => '<section class="bc-about" id="about"><div class="bc-win"><div class="bc-title"><span>About.txt</span></div><div class="bc-body"><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</div></div></section>",
  contact: (k) => '<section class="bc-end" id="contact"><h2>Bring it in. We will take a look.</h2>' + k.cta("Book a repair") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-jobright",
  root: "rf",
  fonts: "family=Fredoka:wght@500;700&family=Nunito+Sans:wght@400;700",
  labels: { work: "Jobs", services: "For employers", about: "About", contact: "Find a job" },
  demo: {
    name: "Rightfit", headline: "Find work that fits.", heroLabel: "Local jobs, matched to you",
    bio: "Tell us what you are good at and how far you will travel. Rightfit shows you local jobs that fit, with the pay and hours on every listing. No cover letters needed.",
    cards: [
      { title: "Line cook, two streets away", description: "Matched on a Tuesday, started the following Monday." },
      { title: "Weekend shifts that fit a degree", description: "A student found 16 hours a week around lectures." },
      { title: "Back to work after ten years", description: "A returner found a part-time office role with school-hours shifts." },
    ],
    services: [
      { title: "Post a job", description: "Free for your first listing." },
      { title: "Matched shortlist", description: "Five suitable people, ready to interview." },
      { title: "Hiring days", description: "We host interviews at your place." },
    ],
  },
  css: `
.rf{--cream:#fff7ec;--orange:#ff7a2f;--purple:#5b3fd0;--yes:#2fc67a;--no:#ef4d5a;--ink:#1d1a2e;--white:#fff;background:var(--cream);color:var(--ink);font:400 17px/1.7 "Nunito Sans",system-ui,sans-serif}
.rf header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.rf .brand{font:700 26px/1 Fredoka;text-decoration:none;color:var(--purple)}
.rf nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.rf nav a{text-decoration:none}.rf nav a:hover{color:var(--orange)}
.rf-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);overflow:hidden}
.rf-label{font:500 18px Fredoka;color:var(--orange)}
.rf h1{margin-top:12px;font:700 clamp(60px,9.4vw,156px)/.92 Fredoka;letter-spacing:-.03em}
.rf h1 .ch{display:inline-block;animation:rf-in .55s cubic-bezier(.3,1.7,.5,1) both;animation-delay:calc(var(--i) * 35ms)}@keyframes rf-in{from{opacity:0;transform:scale(0)}}
.rf-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.rf .cta{display:inline-flex;margin-top:28px;padding:16px 30px;border-radius:18px;background:var(--purple);color:var(--white);font:700 18px Fredoka;text-decoration:none;transition:transform .2s}.rf .cta:hover{transform:scale(1.05) rotate(-2deg)}.rf .cta-muted{background:#efe6d8;color:#6a6478;font:400 15px "Nunito Sans"}
.rf-deck{position:relative;height:clamp(400px,34vw,440px)}
.rf-job p{margin:6px 0 0;font-size:15px;color:#4a4560}
.rf-meter{display:grid;gap:6px;font:700 14px "Nunito Sans";color:var(--purple)}.rf-meter i{height:10px;border-radius:5px;background:linear-gradient(90deg,var(--purple) 92%,#ece6fb 92%)}
.rf-job{position:absolute;inset:0 8% 70px;padding:28px;border-radius:28px;background:var(--white);box-shadow:0 30px 50px -30px rgba(29,26,46,.45);display:flex;flex-direction:column;gap:10px}
.rf-job:nth-child(1){transform:rotate(-6deg) translateY(16px);background:#ffe3cf}
.rf-job:nth-child(2){transform:rotate(4deg) translateY(8px);background:#e6defe}
.rf-job:nth-child(3){animation:rf-swipe 6s cubic-bezier(.5,0,.3,1) 1.2s infinite}
.rf-job b{font:700 clamp(24px,2.4vw,32px)/1.1 Fredoka}
.rf-job span{font-weight:700;color:#6a6478}
.rf-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}.rf-tags i{padding:6px 12px;border-radius:999px;background:var(--cream);font:700 14px "Nunito Sans";font-style:normal}
.rf-stamp{position:absolute;top:28px;right:24px;padding:4px 14px;border:4px solid var(--yes);border-radius:10px;color:var(--yes);font:700 26px Fredoka;transform:rotate(12deg);opacity:0;animation:rf-stamp 6s ease 1.2s infinite}
@keyframes rf-swipe{0%,30%{transform:none;opacity:1}50%{transform:translateX(140%) rotate(24deg);opacity:0}51%{transform:translateY(40px) scale(.9);opacity:0}70%,100%{transform:none;opacity:1}}
@keyframes rf-stamp{0%,14%{opacity:0;transform:rotate(12deg) scale(1.6)}22%,40%{opacity:1;transform:rotate(12deg) scale(1)}50%,100%{opacity:0}}
.rf-btns{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;gap:22px}
.rf-btns i{width:58px;height:58px;border-radius:50%;background:var(--white);box-shadow:0 10px 20px -10px rgba(0,0,0,.3);position:relative}
.rf-btns i:first-child:before,.rf-btns i:first-child:after{content:"";position:absolute;left:50%;top:50%;width:24px;height:4px;margin:-2px 0 0 -12px;border-radius:2px;background:var(--no);transform:rotate(45deg)}.rf-btns i:first-child:after{transform:rotate(-45deg)}
.rf-btns i:last-child:before{content:"";position:absolute;left:50%;top:50%;width:12px;height:22px;margin:-14px 0 0 -6px;border:solid var(--yes);border-width:0 4px 4px 0;transform:rotate(45deg)}
.rf-btns i:last-child{animation:rf-tap 6s ease 1.2s infinite}@keyframes rf-tap{0%,8%,24%,100%{transform:none}14%{transform:scale(.85)}}
.rf h2{font:700 clamp(42px,6vw,98px)/1 Fredoka;letter-spacing:-.025em;max-width:14ch}
.rf-jobs{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--purple);color:var(--white)}
.rf-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.rf-card{padding:26px;border-radius:28px;background:var(--white);color:var(--ink)}.rf-card:nth-child(2){transform:rotate(1.5deg)}.rf-card:nth-child(3){transform:rotate(-1.5deg)}
.rf-card small{display:inline-block;padding:4px 12px;border-radius:999px;background:var(--yes);color:var(--white);font-weight:700}
.rf-card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;margin-bottom:14px}
.rf-card h3{margin-top:12px;font:700 24px/1.2 Fredoka}.rf-card p{margin-top:8px;color:#5c576b}
.rf-emp{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.rf-emp ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.rf-emp li{padding:30px;border-radius:28px;background:var(--orange);color:var(--white)}.rf-emp li:nth-child(2){background:var(--ink)}.rf-emp li:nth-child(3){background:var(--yes)}
.rf-emp h3{font:700 26px Fredoka}.rf-emp p{margin-top:8px}
.rf-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#ffe3cf;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.rf-about>p{font-size:clamp(19px,1.8vw,24px)}.rf-about dl{grid-column:2;margin:0}.rf-about dt{font:700 20px Fredoka;color:var(--purple);margin-top:16px}.rf-about dd{margin:2px 0 0}
.rf-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.rf-end h2{margin:0 auto}
.rf footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.rf nav{gap:12px;font-size:14px}.rf-hero,.rf-list,.rf-emp ul,.rf-about{grid-template-columns:1fr}.rf-about dl{grid-column:auto}.rf-card:nth-child(n){transform:none}}
@media (prefers-reduced-motion:reduce){.rf-stamp{opacity:1}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="rf-hero" aria-labelledby="h"><div><span class="rf-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Find a job") + '</div><div class="rf-deck" aria-hidden="true"><div class="rf-job"></div><div class="rf-job"></div><div class="rf-job"><span>0.4 miles away</span><b>Barista, mornings</b><span>14 an hour, 6am to 12pm</span><p>A friendly corner cafe looking for an early riser. Training on the coffee machine from day one.</p><span class="rf-meter">92 percent fit<i></i></span><span class="rf-tags"><i>No experience</i><i>Weekdays</i><i>Free lunch</i></span><span class="rf-stamp">FITS</span></div><div class="rf-btns"><i></i><i></i></div></div></section>',
  work: (k) => '<section class="rf-jobs" id="work"><h2>Matches that worked out</h2><div class="rf-list">' + k.c.cards.map((x, i) => '<article class="rf-card">' + k.photo(i) + "<small>Matched</small><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="rf-emp" id="services"><h2>Hiring? Start here</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="rf-about" id="about"><h2>Why we built it</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="rf-end" id="contact"><h2>Your next job is close by.</h2>' + k.cta("Find a job") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

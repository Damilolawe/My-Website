export default {
  id: "md-zapier",
  root: "rc",
  fonts: "family=Krona+One&family=Encode+Sans:wght@400;600;700",
  labels: { work: "Deliveries", services: "Rates", about: "Riders", contact: "Book a pickup" },
  demo: {
    name: "Relay Couriers", headline: "Across town in an hour.", heroLabel: "Same-day bike couriers",
    bio: "Cargo bikes and riders who know every shortcut. We collect within 30 minutes and deliver across town within the hour, with a photo at the door so you know it arrived.",
    cards: [
      { title: "Lab samples, on time", description: "A clinic sends samples to the hospital lab four times a day." },
      { title: "Flowers that arrive fresh", description: "A florist delivers 60 bouquets every Friday before noon." },
      { title: "Contracts signed today", description: "A law firm gets documents signed and back in 90 minutes." },
    ],
    services: [
      { title: "Within the hour", description: "Collected in 30 minutes, anywhere in town." },
      { title: "Scheduled rounds", description: "The same rider, the same times, every day." },
      { title: "Cargo bike", description: "Up to 100 kg, for boxes and bulk." },
    ],
  },
  css: `
.rc{--orange:#ff5a1f;--cream:#fff6ea;--ink:#141414;--blue:#2747ff;--green:#1fae6b;--grey:#6a6560;background:var(--cream);color:var(--ink);font:400 17px/1.65 "Encode Sans",system-ui,sans-serif}
.rc header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.rc .brand{font:400 18px/1 "Krona One";text-decoration:none}
.rc nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.rc nav a{text-decoration:none}.rc nav a:hover{color:var(--orange)}
.rc-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.rc-label{font-weight:700;color:var(--orange)}
.rc h1{margin-top:12px;font:400 clamp(46px,6.8vw,112px)/1 "Krona One";letter-spacing:-.04em}
.rc h1 .ch{display:inline-block;animation:rc-in .5s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 25ms)}@keyframes rc-in{from{opacity:0;transform:translateX(1em)}}
.rc-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px)}
.rc .cta{display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:12px;background:var(--orange);color:var(--cream);font-weight:700;text-decoration:none;transition:background .2s}.rc .cta:hover{background:var(--ink)}.rc .cta-muted{background:#efe4d4;color:var(--grey)}
.rc-track{padding:26px;border-radius:26px;background:var(--white,#fff);box-shadow:0 30px 60px -36px rgba(20,20,20,.45)}
.rc-track header{padding:0 0 18px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;font:400 13px "Krona One"}
.rc-track header span:last-child{color:var(--green)}
.rc-steps{position:relative;margin-top:22px;padding-left:36px}
.rc-steps:before{content:"";position:absolute;left:11px;top:6px;bottom:6px;width:3px;background:#eee}
.rc-steps:after{content:"";position:absolute;left:11px;top:6px;width:3px;height:var(--prog);background:var(--orange);animation:rc-prog 5s steps(4,end) .6s both;--prog:100%}
@property --prog{syntax:"<percentage>";initial-value:0%;inherits:false}
@keyframes rc-prog{from{--prog:0%}}
.rc-step{position:relative;padding:12px 0}
.rc-step:before{content:"";position:absolute;left:-33px;top:16px;width:18px;height:18px;border-radius:50%;background:#fff;border:3px solid #ddd;animation:rc-dot .3s ease both;animation-delay:var(--d);z-index:1}
@keyframes rc-dot{to{border-color:var(--orange);background:var(--orange)}}
.rc-step b{display:block;font-weight:700}.rc-step span{font-size:14px;color:var(--grey)}
.rc-rider{position:relative;height:56px;margin-top:16px;overflow:hidden;border-radius:12px;background:repeating-linear-gradient(90deg,#f3ece2 0 30px,#ebe2d5 30px 60px)}
.rc-rider i{position:absolute;top:10px;left:-60px;width:52px;height:36px;border-radius:8px;background:var(--orange);animation:rc-ride 3s linear infinite}
.rc-rider i:before,.rc-rider i:after{content:"";position:absolute;bottom:-6px;width:16px;height:16px;border-radius:50%;background:var(--ink)}.rc-rider i:before{left:2px}.rc-rider i:after{right:2px}
@keyframes rc-ride{to{left:110%}}
.rc h2{font:400 clamp(36px,5vw,80px)/1.05 "Krona One";letter-spacing:-.04em;max-width:15ch}
.rc-deliv{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--cream)}
.rc-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.rc-parcel{position:relative;padding:28px;border-radius:6px;background:#c9a27a;color:var(--ink);background-image:linear-gradient(90deg,transparent 46%,#e8d3a6 46% 54%,transparent 54%)}
.rc-parcel:before{content:"Delivered";position:absolute;right:16px;top:16px;padding:4px 10px;border:2px solid var(--green);border-radius:6px;color:var(--green);font:700 12px "Encode Sans";text-transform:uppercase;transform:rotate(6deg);background:rgba(255,255,255,.7)}
.rc-parcel img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px;margin:20px 0 14px}
.rc-parcel h3{margin-top:28px;font:400 18px/1.35 "Krona One";background:var(--cream);padding:10px 12px;border-radius:4px}.rc-parcel p{margin-top:10px;padding:10px 12px;border-radius:4px;background:rgba(255,246,234,.85)}
.rc-rates{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.rc-rates ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.rc-rates li{padding:28px;border-radius:20px;border:3px solid var(--ink)}.rc-rates li:nth-child(1){background:var(--orange);color:var(--cream);border-color:var(--orange)}
.rc-rates h3{font:400 18px "Krona One"}.rc-rates p{margin-top:8px}
.rc-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--blue);color:var(--cream);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.rc-about>p{font-size:clamp(19px,1.8vw,24px)}.rc-about dl{grid-column:2;margin:0}.rc-about dt{font:400 15px "Krona One";margin-top:16px;color:#ffd0bd}.rc-about dd{margin:2px 0 0}
.rc-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.rc-end h2{margin:0 auto}
.rc footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--grey)}
@media(max-width:900px){.rc nav{gap:12px;font-size:14px}.rc-hero,.rc-list,.rc-rates ul,.rc-about{grid-template-columns:1fr}.rc-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.rc-step:before{border-color:var(--orange);background:var(--orange)}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const st = [["Collected", "10:02, Market Street"], ["On the way", "Rider Sam, cargo bike"], ["Nearly there", "2 minutes away"], ["Delivered", "10:48, photo at the door"]]; return '<section class="rc-hero" aria-labelledby="h"><div><span class="rc-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a pickup") + '</div><div class="rc-track" aria-hidden="true"><header><span>Parcel 4821</span><span>46 min</span></header><div class="rc-steps">' + st.map((s, i) => '<div class="rc-step" style="--d:' + (0.6 + i * 1.25).toFixed(2) + 's"><b>' + s[0] + "</b><span>" + s[1] + "</span></div>").join("") + '</div><div class="rc-rider"><i></i></div></div></section>'; },
  work: (k) => '<section class="rc-deliv" id="work"><h2>' + k.h("work", "Delivered this week") + '</h2><div class="rc-list">' + k.c.cards.map((x, i) => '<article class="rc-parcel">' + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="rc-rates" id="services"><h2>' + k.h("services", "Rates") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="rc-about" id="about"><h2>' + k.h("about", "Our riders") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="rc-end" id="contact"><h2>' + k.h("contact", "Need it there today?") + '</h2>' + k.cta("Book a pickup") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

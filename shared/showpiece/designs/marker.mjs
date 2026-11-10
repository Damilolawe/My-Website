export default {
  id: "highlighter",
  root: "hl",
  fonts: "family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Karla:wght@400;600;800",
  labels: { work: "Writing", services: "Work with me", about: "About", contact: "Subscribe" },
  demo: {
    name: "Grace Liu", headline: "Money, explained plainly.", heroLabel: "Personal finance writer",
    bio: "I write a weekly newsletter about money for people who were never taught it: pensions, rent, saving and tax, in plain words. Forty thousand readers and not a single stock tip.",
    cards: [
      { title: "Your first pension, in ten minutes", description: "The most-read issue. Shared by three employers with new staff." },
      { title: "Renting is not throwing money away", description: "A calm look at the numbers behind a loud argument." },
      { title: "The emergency fund, step by step", description: "A twelve-week plan that 6,000 readers followed." },
    ],
    services: [
      { title: "Newsletter", description: "Every Sunday, free." },
      { title: "Workshops", description: "Money basics for workplaces and universities." },
      { title: "Commissions", description: "Columns and explainers for publications." },
    ],
  },
  css: `
.hl{--paper:#fdfcf7;--ink:#141414;--hi:#fff35c;--pink:#ff9ad5;--green:#9bf2a7;--blue:#2f6fed;--rule:#e2dfd3;--mute:#6e6b62;background:var(--paper);color:var(--ink);font:400 17px/1.8 Merriweather,Georgia,serif}
.hl header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px);border-bottom:3px solid var(--ink)}
.hl .brand{font:900 22px/1 Merriweather;text-decoration:none}
.hl nav{display:flex;gap:clamp(14px,2.4vw,30px);font:600 15px Karla}.hl nav a{text-decoration:none}.hl nav a:hover{background:var(--hi)}
.hl-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(30px,5vw,70px);align-items:start;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px)}
.hl-label{font:800 13px Karla;letter-spacing:.16em;text-transform:uppercase;color:var(--blue)}
.hl h1{margin-top:14px;font:900 clamp(52px,7.6vw,128px)/1 Merriweather;letter-spacing:-.03em}
.hl h1 .w{background:linear-gradient(var(--hi),var(--hi)) 0 85%/0 40% no-repeat;animation:hl-swipe .5s ease forwards;animation-delay:calc(.6s + var(--n,0) * .35s)}
.hl h1 .w:nth-child(1){--n:0}.hl h1 .w:nth-child(2){--n:1}.hl h1 .w:nth-child(3){--n:2}
@keyframes hl-swipe{to{background-size:100% 40%}}
.hl-hero p{margin-top:22px;max-width:46ch;color:#3a3833}
.hl .cta{display:inline-flex;margin-top:28px;padding:14px 26px;background:var(--ink);color:var(--paper);font:800 16px Karla;text-decoration:none;transition:background .2s,color .2s}.hl .cta:hover{background:var(--hi);color:var(--ink)}.hl .cta-muted{background:var(--rule);color:var(--mute)}
.hl-clip{position:relative;padding:28px 26px;background:#fff;border:1px solid var(--rule);box-shadow:0 30px 50px -40px rgba(0,0,0,.4);font:400 15px/1.85 Merriweather;color:#3a3833;transform:rotate(1deg)}
.hl-clip h3{font:900 22px/1.2 Merriweather;color:var(--ink);margin-bottom:12px}
.hl-clip mark{color:inherit;background:linear-gradient(var(--c),var(--c)) 0 0/0 100% no-repeat;animation:hl-mark .7s ease forwards;animation-delay:var(--d)}
@keyframes hl-mark{to{background-size:100% 100%}}
.hl-pen{position:absolute;width:150px;height:30px;right:-30px;top:40%;border-radius:6px 16px 16px 6px;background:linear-gradient(90deg,#222 0 18%,var(--hi) 18%);transform:rotate(-24deg);box-shadow:0 10px 16px -8px rgba(0,0,0,.4);animation:hl-pen 4s ease-in-out .4s both}
.hl-pen:before{content:"";position:absolute;left:-14px;top:6px;border:9px solid transparent;border-right:14px solid #e6d12c;border-left:0}
@keyframes hl-pen{0%{transform:translate(-260px,-90px) rotate(-24deg)}30%{transform:translate(-40px,-60px) rotate(-24deg)}60%{transform:translate(-200px,10px) rotate(-24deg)}100%{transform:rotate(-24deg)}}
.hl-clip small{display:block;margin-top:16px;font:600 12px Karla;color:var(--mute)}
.hl h2{font:900 clamp(40px,5.6vw,92px)/1.02 Merriweather;letter-spacing:-.03em;max-width:15ch}
.hl-writing{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);border-top:1px solid var(--rule)}
.hl-cols{columns:3;column-gap:clamp(24px,4vw,56px);column-rule:1px solid var(--rule);margin-top:clamp(40px,6vw,70px)}
.hl-a{break-inside:avoid;padding-bottom:28px}
.hl-a small{font:800 12px Karla;letter-spacing:.14em;text-transform:uppercase;color:var(--blue)}
.hl-a img{width:100%;aspect-ratio:4/3;object-fit:cover;margin:12px 0;filter:grayscale(.3)}
.hl-a h3{margin-top:8px;font:900 24px/1.2 Merriweather}.hl-a h3 span{background:linear-gradient(var(--c),var(--c)) 0 85%/100% 40% no-repeat}
.hl-a p{margin-top:8px;font-size:16px;color:#3a3833}
.hl-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--hi)}
.hl-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.hl-svc li{padding:28px;background:var(--paper);border:2px solid var(--ink)}
.hl-svc h3{font:900 22px Merriweather}.hl-svc p{margin-top:6px;font-size:16px}
.hl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.hl-about>p{font-size:clamp(19px,1.8vw,23px)}.hl-about dl{grid-column:2;margin:0}.hl-about dt{font:800 13px Karla;letter-spacing:.14em;text-transform:uppercase;margin-top:18px}.hl-about dt span{background:var(--green);padding:0 4px}.hl-about dd{margin:4px 0 0}
.hl-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:var(--ink);color:var(--paper)}.hl-end h2{margin:0 auto}.hl-end h2 span{background:linear-gradient(var(--hi),var(--hi)) 0 85%/100% 40% no-repeat;color:var(--ink)}.hl-end .cta{background:var(--hi);color:var(--ink)}
.hl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font:600 14px Karla;color:var(--mute)}
@media(max-width:900px){.hl nav{gap:12px;font-size:13px}.hl-hero,.hl-svc ul,.hl-about{grid-template-columns:1fr}.hl-cols{columns:1}.hl-about dl{grid-column:auto}.hl-pen{display:none}}
@media (prefers-reduced-motion:reduce){.hl h1 .w{background-size:100% 40%}.hl-clip mark{background-size:100% 100%}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="hl-hero" aria-labelledby="h"><div><span class="hl-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Subscribe free") + '</div><div class="hl-clip" aria-hidden="true"><h3>This week: the boring account that matters</h3>If you only do one thing this month, <mark style="--c:var(--hi);--d:1.6s">move your savings to an account that pays interest</mark>. Most current accounts pay almost nothing. Then <mark style="--c:var(--pink);--d:2.4s">set up a transfer for the day after payday</mark>, so the money moves before you notice it. <mark style="--c:var(--green);--d:3.2s">Small and automatic beats big and occasional.</mark><small>Issue 212, read in 4 minutes</small><span class="hl-pen"></span></div></section>',
  work: (k) => { const c = ["var(--hi)", "var(--pink)", "var(--green)"]; const t = ["Pensions", "Housing", "Saving"]; return '<section class="hl-writing" id="work"><h2>Most read</h2><div class="hl-cols">' + k.c.cards.map((x, i) => '<article class="hl-a" style="--c:' + c[i % 3] + '"><small>' + t[i % 3] + "</small>" + k.photo(i) + "<h3><span>" + k.E(x.title) + "</span></h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="hl-svc" id="services"><h2>Work with me</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="hl-about" id="about"><h2>About</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt><span>" + k.E(a.title) + "</span></dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="hl-end" id="contact"><h2><span>The important bits</span>, every Sunday.</h2>' + k.cta("Subscribe free") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

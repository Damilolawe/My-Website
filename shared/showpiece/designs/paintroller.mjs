export default {
  id: "daylight",
  root: "dl",
  fonts: "family=Baloo+2:wght@500;700;800&family=Commissioner:wght@400;500;700",
  labels: { work: "Murals", services: "Services", about: "About", contact: "Start a wall" },
  demo: {
    name: "Sunny Adeyemi", headline: "Big walls, bright days.", heroLabel: "Muralist and illustrator",
    bio: "I paint murals for schools, cafes and the sides of buildings that need cheering up. Bold colour, friendly characters and walls that make people stop and take a photo.",
    cards: [
      { title: "A primary school playground", description: "Forty metres of jungle, painted with help from 200 children." },
      { title: "A corner cafe", description: "A wraparound breakfast scene, finished in four days." },
      { title: "The car park stairwell", description: "Seven floors, seven colours, no more gloomy climb." },
    ],
    services: [
      { title: "Murals", description: "Indoor and outdoor, any size." },
      { title: "Community projects", description: "Design days with schools and neighbours." },
      { title: "Illustration", description: "Posters, packaging and books." },
    ],
  },
  css: `
.dl{--sun:#ffc93c;--coral:#ff6b6b;--teal:#1fb6a6;--sky:#5aa9ff;--plum:#6c3fd1;--cream:#fffaf0;--ink:#1f1d2b;background:var(--cream);color:var(--ink);font:400 17px/1.7 Commissioner,system-ui,sans-serif}
.dl header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.dl .brand{font:800 26px/1 "Baloo 2";text-decoration:none}
.dl nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.dl nav a{text-decoration:none}.dl nav a:hover{color:var(--coral)}
.dl-hero{position:relative;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,100px);overflow:hidden}
.dl-wall{position:relative;height:clamp(220px,24vw,320px);margin-bottom:clamp(30px,4vw,50px);border-radius:28px;background:#ece5d6;overflow:hidden}
.dl-stripe{position:absolute;left:0;top:var(--y);height:var(--h);width:100%;background:var(--c);clip-path:inset(0 100% 0 0);animation:dl-paint 1.4s cubic-bezier(.6,0,.3,1) both;animation-delay:var(--d);border-radius:0 40px 40px 0}
@keyframes dl-paint{to{clip-path:inset(0 0 0 0)}}
.dl-roller{position:absolute;top:var(--y);left:0;width:60px;height:var(--h);animation:dl-roll 1.4s cubic-bezier(.6,0,.3,1) both;animation-delay:var(--d)}
.dl-roller:before{content:"";position:absolute;inset:0 6px;border-radius:12px;background:var(--c);box-shadow:inset 0 -8px 0 rgba(0,0,0,.15)}
.dl-roller:after{content:"";position:absolute;left:50%;top:100%;width:6px;height:60px;background:var(--ink);border-radius:3px}
@keyframes dl-roll{from{left:-60px;opacity:1}95%{opacity:1}to{left:100%;opacity:0}}
.dl-sunface{position:absolute;right:8%;top:50%;width:clamp(90px,10vw,140px);aspect-ratio:1;margin-top:calc(clamp(90px,10vw,140px) / -2);border-radius:50%;background:var(--sun);box-shadow:0 0 0 14px rgba(255,201,60,.35);animation:dl-pop .7s cubic-bezier(.3,1.8,.5,1) 3s both}
.dl-sunface:before{content:"";position:absolute;left:30%;top:36%;width:10%;height:14%;border-radius:50%;background:var(--ink);box-shadow:clamp(27px,3vw,42px) 0 0 var(--ink)}.dl-sunface:after{content:"";position:absolute;left:30%;right:30%;top:56%;height:18%;border:4px solid var(--ink);border-top:0;border-radius:0 0 40px 40px}
@keyframes dl-pop{from{transform:scale(0)}}
.dl-row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:clamp(24px,4vw,60px);align-items:end}
.dl-label{display:inline-block;padding:6px 14px;border-radius:999px;background:var(--teal);color:#fff;font-weight:700;font-size:14px}
.dl h1{margin-top:14px;font:800 clamp(56px,8.4vw,142px)/.92 "Baloo 2";letter-spacing:-.025em}
.dl h1 .ch{display:inline-block;animation:dl-in .5s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 30ms)}@keyframes dl-in{from{opacity:0;transform:translateY(.4em) rotate(8deg)}}
.dl-row p{font-size:clamp(18px,1.5vw,20px)}
.dl .cta{display:inline-flex;margin-top:22px;padding:15px 28px;border-radius:999px;background:var(--ink);color:var(--cream);font:700 18px "Baloo 2";text-decoration:none;transition:background .2s,transform .2s}.dl .cta:hover{background:var(--plum);transform:rotate(-3deg)}.dl .cta-muted{background:#efe7d6;color:#6b6556;font:500 15px Commissioner}
.dl h2{font:800 clamp(44px,6.4vw,104px)/.95 "Baloo 2";letter-spacing:-.02em;max-width:14ch}
.dl-murals{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--plum);color:var(--cream)}
.dl-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:clamp(40px,6vw,70px)}
.dl-m{padding:16px 16px 24px;border-radius:28px;background:var(--cream);color:var(--ink)}
.dl-swatch{display:block;aspect-ratio:4/3;border-radius:18px;background:var(--g);margin-bottom:16px}
.dl-m img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;margin-bottom:16px}
.dl-m h3{padding:0 8px;font:800 24px/1.15 "Baloo 2"}.dl-m p{padding:0 8px;margin-top:6px;color:#4d4a5a}
.dl-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.dl-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.dl-svc li{padding:30px;border-radius:200px 30px 30px 30px;background:var(--c);color:var(--ink)}
.dl-svc h3{font:800 28px "Baloo 2"}.dl-svc p{margin-top:6px}
.dl-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--sun);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.dl-about>p{font-size:clamp(19px,1.8vw,24px)}.dl-about dl{grid-column:2;margin:0}.dl-about dt{font:800 22px "Baloo 2";margin-top:16px}.dl-about dd{margin:2px 0 0}
.dl-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center;background:repeating-linear-gradient(90deg,var(--coral) 0 25%,var(--sun) 25% 50%,var(--teal) 50% 75%,var(--sky) 75%)}.dl-end h2{margin:0 auto;padding:30px;border-radius:30px;background:var(--cream);max-width:16ch}
.dl footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.dl nav{gap:12px;font-size:14px}.dl-row,.dl-list,.dl-svc ul,.dl-about{grid-template-columns:1fr}.dl-about dl{grid-column:auto}}
@media (prefers-reduced-motion:reduce){.dl-stripe{clip-path:none}.dl-roller{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const S = [["var(--coral)", "0%", "25%", ".3s"], ["var(--sun)", "25%", "25%", ".9s"], ["var(--teal)", "50%", "25%", "1.5s"], ["var(--sky)", "75%", "25%", "2.1s"]]; return '<section class="dl-hero" aria-labelledby="h"><div class="dl-wall" aria-hidden="true">' + S.map(s => '<span class="dl-stripe" style="--c:' + s[0] + ";--y:" + s[1] + ";--h:" + s[2] + ";--d:" + s[3] + '"></span>').join("") + S.map(s => '<span class="dl-roller" style="--c:' + s[0] + ";--y:" + s[1] + ";--h:" + s[2] + ";--d:" + s[3] + '"></span>').join("") + '<span class="dl-sunface"></span></div><div class="dl-row"><div><span class="dl-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1></div><div><p>" + k.E(k.c.bio) + "</p>" + k.cta("Start a wall") + "</div></div></section>"; },
  work: (k) => { const g = ["linear-gradient(135deg,#1fb6a6 0 40%,#ffc93c 40% 60%,#ff6b6b 60%)", "radial-gradient(circle at 30% 40%,#ffc93c 0 18%,transparent 19%),linear-gradient(#5aa9ff 0 60%,#ff6b6b 60%)", "repeating-linear-gradient(0deg,#ff6b6b 0 14%,#ffc93c 14% 28%,#1fb6a6 28% 42%,#5aa9ff 42% 56%,#6c3fd1 56% 70%,#ff9f43 70% 84%,#ff6bb5 84%)"]; return '<section class="dl-murals" id="work"><h2>Walls I have painted</h2><div class="dl-list">' + k.c.cards.map((x, i) => '<article class="dl-m">' + (k.photo(i) || '<span class="dl-swatch" aria-hidden="true" style="--g:' + g[i % 3] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => { const c = ["var(--coral)", "var(--teal)", "var(--sky)"]; return '<section class="dl-svc" id="services"><h2>What I do</h2><ul>' + k.c.services.slice(0, 3).map((s, i) => '<li style="--c:' + c[i % 3] + '"><h3>' + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>"; },
  about: (k) => '<section class="dl-about" id="about"><h2>Hello, I paint walls</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="dl-end" id="contact"><h2>Got a wall that needs some sun?</h2>' + k.cta("Start a wall") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

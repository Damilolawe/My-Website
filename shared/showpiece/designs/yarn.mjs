export default {
  id: "md-ollama",
  root: "wh",
  fonts: "family=Lobster+Two:ital,wght@0,700;1,400&family=Mali:wght@400;600",
  labels: { work: "Yarns", services: "Visits", about: "The farm", contact: "Visit the farm" },
  demo: {
    name: "Woolly Hill Farm", headline: "Soft as a cloud.", heroLabel: "An alpaca farm and yarn shop",
    bio: "Fourteen alpacas, one very bossy llama and a barn full of yarn spun from their fleece. Come for a walk with the herd, then take home wool that was grazing in the field last spring.",
    cards: [
      { title: "Fog grey double knit", description: "From Biscuit, our oldest alpaca. Warm, light and never itchy." },
      { title: "Honey brown aran", description: "Chunky and quick to knit. Perfect for a first jumper." },
      { title: "Snow white lace", description: "Fine enough for shawls, spun from the spring shearing." },
    ],
    services: [
      { title: "Alpaca walk", description: "An hour in the fields with the herd." },
      { title: "Knit and tea", description: "Saturday afternoons in the barn." },
      { title: "Shearing day", description: "Watch the spring shearing every May." },
    ],
  },
  css: `
.wh{--meadow:#cfe7b0;--sage:#7da35c;--barn:#b8463a;--wool:#fffaf0;--fawn:#d9b88f;--brown:#5b3b25;--sky:#eaf5ff;--ink:#3a2a1f;background:var(--wool);color:var(--ink);font:400 17px/1.75 Mali,system-ui,sans-serif}
.wh header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,4vw,56px)}
.wh .brand{font:700 28px/1 "Lobster Two";text-decoration:none;color:var(--barn)}
.wh nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.wh nav a{text-decoration:none}.wh nav a:hover{color:var(--barn)}
.wh-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px) clamp(80px,10vw,140px);background:linear-gradient(var(--sky) 0 62%,var(--meadow) 62%);overflow:hidden}
.wh-label{font:italic 400 22px "Lobster Two";color:var(--sage)}
.wh h1{margin-top:10px;font:700 clamp(60px,9vw,150px)/.95 "Lobster Two";color:var(--brown)}
.wh h1 .ch{display:inline-block;animation:wh-in .9s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 45ms)}@keyframes wh-in{from{opacity:0;transform:translateY(.5em) scale(.6)}}
.wh-hero p{margin-top:20px;max-width:44ch;padding:18px 20px;border-radius:20px;background:rgba(255,250,240,.85)}
.wh .cta{display:inline-flex;margin-top:24px;padding:16px 30px;border-radius:999px;background:var(--barn);color:var(--wool);font-weight:600;text-decoration:none;transition:transform .2s}.wh .cta:hover{transform:scale(1.05)}.wh .cta-muted{background:#efe3cf;color:#7a6250}
.wh-field{position:relative;height:clamp(360px,34vw,460px)}
.wh-ball{position:absolute;right:0;bottom:4%;width:clamp(120px,12vw,160px);aspect-ratio:1;border-radius:50%;background:repeating-linear-gradient(35deg,var(--fawn) 0 6px,#c79c6b 6px 9px),var(--fawn);box-shadow:inset -12px -12px 0 rgba(0,0,0,.12);animation:wh-roll 6s ease-in-out infinite alternate}
.wh-ball:after{content:"";position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(-50deg,transparent 0 10px,rgba(91,59,37,.25) 10px 12px)}
@keyframes wh-roll{from{transform:translateX(0) rotate(0)}to{transform:translateX(-60px) rotate(-200deg)}}
.wh-thread{position:absolute;left:0;bottom:12%;width:90%;height:120px;overflow:visible}
.wh-thread path{fill:none;stroke:#c79c6b;stroke-width:4;stroke-linecap:round;stroke-dasharray:900;stroke-dashoffset:900;animation:wh-draw 3s ease 1s forwards}
@keyframes wh-draw{to{stroke-dashoffset:0}}
.wh-alp{position:absolute;left:var(--x);bottom:var(--y);width:var(--w);aspect-ratio:.9;animation:wh-graze 4s ease-in-out infinite alternate;animation-delay:var(--d)}
.wh-alp b{position:absolute;left:10%;right:10%;bottom:20%;height:46%;border-radius:50% 50% 40% 40%;background:var(--c);box-shadow:inset 0 -8px 0 rgba(0,0,0,.06)}
.wh-alp b:before{content:"";position:absolute;right:-6%;bottom:60%;width:28%;height:110%;border-radius:40% 40% 20% 20%;background:var(--c)}
.wh-alp b:after{content:"";position:absolute;right:2%;bottom:150%;width:16%;aspect-ratio:1;border-radius:50%;background:var(--ink);box-shadow:-10px 0 0 -1px var(--ink)}
.wh-alp i{position:absolute;bottom:0;width:10%;height:26%;border-radius:4px;background:var(--c);left:20%;box-shadow:calc(var(--w) * .45) 0 0 var(--c)}
@keyframes wh-graze{to{transform:translateY(-4px) rotate(-2deg)}}
.wh h2{font:700 clamp(44px,6.4vw,104px)/1 "Lobster Two";color:var(--brown);max-width:14ch}
.wh-yarns{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.wh-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:clamp(40px,6vw,70px)}
.wh-y{text-align:center}
.wh-skein{display:block;width:70%;aspect-ratio:1.6;margin:0 auto 20px;border-radius:50%;background:repeating-linear-gradient(80deg,var(--c) 0 8px,color-mix(in srgb,var(--c),#000 12%) 8px 11px);box-shadow:0 18px 20px -16px rgba(0,0,0,.4);transition:transform .4s}.wh-y:hover .wh-skein{transform:rotate(-8deg) scale(1.05)}
.wh-y img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:28px;margin-bottom:18px}
.wh-y h3{font:700 28px "Lobster Two";color:var(--barn)}.wh-y p{margin-top:6px}
.wh-visits{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--meadow)}
.wh-visits ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.wh-visits li{padding:30px;border-radius:999px 999px 30px 30px;background:var(--wool);text-align:center;border:3px dashed var(--sage)}
.wh-visits h3{font:700 26px "Lobster Two";color:var(--brown)}.wh-visits p{margin-top:8px}
.wh-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--barn);color:var(--wool);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.wh-about h2{color:var(--wool)}.wh-about>p{font-size:clamp(19px,1.8vw,24px)}.wh-about dl{grid-column:2;margin:0}.wh-about dt{font:700 22px "Lobster Two";color:var(--fawn);margin-top:16px}.wh-about dd{margin:2px 0 0}
.wh-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.wh-end h2{margin:0 auto}
.wh footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px}
@media(max-width:900px){.wh nav{gap:12px;font-size:14px}.wh-hero,.wh-list,.wh-visits ul,.wh-about{grid-template-columns:1fr}.wh-hero{background:var(--sky)}.wh-about dl{grid-column:auto}.wh-field{height:300px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const a = (x, y, w, c, d) => '<span class="wh-alp" style="--x:' + x + ";--y:" + y + ";--w:" + w + ";--c:" + c + ";--d:" + d + '"><b></b><i></i></span>'; return '<section class="wh-hero" aria-labelledby="h"><div><span class="wh-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Visit the farm") + '</div><div class="wh-field" aria-hidden="true">' + a("0%", "30%", "clamp(100px,10vw,140px)", "#fff", "0s") + a("34%", "6%", "clamp(130px,13vw,180px)", "#8a6248", "-1s") + '<svg class="wh-thread" viewBox="0 0 600 120" preserveAspectRatio="none"><path d="M0 100 C80 40 140 120 220 70 S360 20 420 80 S520 110 560 90"/></svg><span class="wh-ball"></span></div></section>'; },
  work: (k) => { const c = ["#b9b3aa", "#c9965d", "#f4efe6"]; return '<section class="wh-yarns" id="work"><h2>Spun from our herd</h2><div class="wh-list">' + k.c.cards.map((x, i) => '<article class="wh-y" style="--c:' + c[i % 3] + '">' + (k.photo(i) || '<span class="wh-skein" aria-hidden="true"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="wh-visits" id="services"><h2>Come and visit</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="wh-about" id="about"><h2>Life on the hill</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="wh-end" id="contact"><h2>The herd says hello.</h2>' + k.cta("Visit the farm") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

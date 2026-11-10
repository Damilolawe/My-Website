export default {
  id: "folio",
  root: "fo",
  fonts: "family=Gilda+Display&family=Lora:ital,wght@0,400;0,500;1,400",
  labels: { work: "Books", services: "Commissions", about: "About", contact: "Write to me" },
  demo: {
    name: "Iris Thornbury", headline: "Stories, illustrated.", heroLabel: "Writer and illustrator",
    bio: "I write and illustrate picture books about small animals with big opinions. Six books published, translated into eleven languages, and read aloud at a great many bedtimes.",
    cards: [
      { title: "The Hedgehog Who Would Not Hurry", description: "A slow walk through four seasons. Shortlisted for a picture book prize." },
      { title: "Moth and the Moon", description: "A bedtime book about being brave in the dark." },
      { title: "Tea for Twelve Badgers", description: "A counting book with a great deal of cake." },
    ],
    services: [
      { title: "Book illustration", description: "Picture books and covers for publishers." },
      { title: "School visits", description: "Drawing workshops for ages five to nine." },
      { title: "Private commissions", description: "Illustrated portraits of houses and pets." },
    ],
  },
  css: `
.fo{--cream:#f6efe2;--paper:#fffaf0;--ink:#2b2420;--sage:#7c8c6a;--rose:#c97b6b;--navy:#2c3a52;--mute:#7d7066;background:var(--cream);color:var(--ink);font:400 18px/1.75 Lora,Georgia,serif}
.fo header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px)}
.fo .brand{font:400 26px/1 "Gilda Display";text-decoration:none}
.fo nav{display:flex;gap:clamp(14px,2.4vw,30px);font-style:italic}.fo nav a{text-decoration:none}.fo nav a:hover{color:var(--rose)}
.fo-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(30px,5vw,70px) clamp(18px,4vw,56px) clamp(60px,8vw,110px)}
.fo-label{font-style:italic;color:var(--sage)}
.fo h1{margin-top:12px;font:400 clamp(58px,8.6vw,146px)/.98 "Gilda Display";letter-spacing:-.015em}
.fo h1 .ch{animation:fo-in 1.1s ease both;animation-delay:calc(var(--i) * 45ms)}@keyframes fo-in{from{opacity:0}}
.fo-hero p{margin-top:22px;max-width:42ch}
.fo .cta{display:inline-flex;margin-top:28px;padding:14px 26px;border-radius:999px;background:var(--navy);color:var(--paper);font-style:italic;text-decoration:none;transition:background .3s}.fo .cta:hover{background:var(--rose)}.fo .cta-muted{background:#e9dfcd;color:var(--mute)}
.fo-book{position:relative;aspect-ratio:1.5;perspective:1800px}
.fo-spread{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;filter:drop-shadow(0 30px 30px rgba(43,36,32,.25))}
.fo-pg{position:relative;background:var(--paper);overflow:hidden}
.fo-pg:first-child{border-radius:8px 0 0 8px;box-shadow:inset -30px 0 30px -20px rgba(0,0,0,.18)}
.fo-pg:last-child{border-radius:0 8px 8px 0;box-shadow:inset 30px 0 30px -20px rgba(0,0,0,.18)}
.fo-art{position:absolute;inset:12%;border-radius:50% 50% 8px 8px;background:radial-gradient(circle at 70% 30%,#f4d58d 0 12%,transparent 13%),linear-gradient(transparent 60%,var(--sage) 60%),#c9d8e6}
.fo-hog{position:absolute;left:24%;bottom:24%;width:46%;height:24%;border-radius:60% 60% 30% 30%;background:repeating-linear-gradient(110deg,#6b4f3a 0 4px,#8a6a4f 4px 8px)}
.fo-hog:after{content:"";position:absolute;right:-16%;bottom:6%;width:28%;height:46%;border-radius:50% 70% 40% 50%;background:#d9b99b}
.fo-text{position:absolute;inset:14% 14%;font:italic 400 clamp(14px,1.3vw,18px)/1.8 Lora;color:#5b5048}
.fo-text b{display:block;margin-bottom:10px;font:400 clamp(20px,2vw,28px) "Gilda Display";font-style:normal;color:var(--ink)}
.fo-flip{position:absolute;left:50%;top:0;width:50%;height:100%;transform-origin:left center;transform-style:preserve-3d;animation:fo-turn 6s cubic-bezier(.6,0,.3,1) 1s infinite}
.fo-flip i{position:absolute;inset:0;backface-visibility:hidden;background:var(--paper);border-radius:0 8px 8px 0;box-shadow:inset 30px 0 30px -20px rgba(0,0,0,.18)}
.fo-flip i:last-child{transform:rotateY(180deg);border-radius:8px 0 0 8px;background:linear-gradient(90deg,var(--paper),#f3eadb)}
.fo-flip i:first-child:before{content:"";position:absolute;inset:14%;background:repeating-linear-gradient(transparent 0 18px,#e7dccb 18px 20px)}
@keyframes fo-turn{0%,26%{transform:rotateY(0);opacity:0}30%{opacity:1}58%{transform:rotateY(-180deg);opacity:1}64%,100%{transform:rotateY(-180deg);opacity:0}}
.fo h2{font:400 clamp(44px,6.4vw,104px)/1 "Gilda Display";max-width:14ch}
.fo-books{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--paper)}
.fo-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px;margin-top:clamp(40px,6vw,70px)}
.fo-cover{display:block;aspect-ratio:.78;margin-bottom:20px;border-radius:2px 8px 8px 2px;background:linear-gradient(90deg,rgba(0,0,0,.18) 0 4%,transparent 6%),radial-gradient(circle at 50% 42%,var(--a) 0 22%,transparent 23%),var(--b);box-shadow:0 20px 30px -20px rgba(0,0,0,.4);transition:transform .4s}.fo-b:hover .fo-cover{transform:rotate(-3deg) translateY(-6px)}
.fo-b img{width:100%;aspect-ratio:.78;object-fit:cover;border-radius:2px 8px 8px 2px;margin-bottom:20px}
.fo-b h3{font:400 26px/1.2 "Gilda Display"}.fo-b p{margin-top:8px;font-size:16px;color:var(--mute)}
.fo-com{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.fo-com ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(36px,5vw,56px)}
.fo-com li{padding:30px;border:1px solid #d9ccb6;border-radius:4px;background:var(--paper)}
.fo-com h3{font:400 26px "Gilda Display";color:var(--navy)}.fo-com p{margin-top:8px;font-size:16px}
.fo-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--navy);color:var(--paper);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.fo-about>p{font-style:italic;font-size:clamp(20px,1.9vw,25px)}.fo-about dl{grid-column:2;margin:0}.fo-about dt{font:400 22px "Gilda Display";color:#f4d58d;margin-top:16px}.fo-about dd{margin:2px 0 0}
.fo-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.fo-end h2{margin:0 auto}
.fo footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;font-style:italic;color:var(--mute)}
@media(max-width:900px){.fo nav{gap:12px;font-size:14px}.fo-hero,.fo-list,.fo-com ul,.fo-about{grid-template-columns:1fr}.fo-about dl{grid-column:auto}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="fo-hero" aria-labelledby="h"><div><span class="fo-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Write to me") + '</div><div class="fo-book" aria-hidden="true"><div class="fo-spread"><div class="fo-pg"><span class="fo-art"><span class="fo-hog"></span></span></div><div class="fo-pg"><div class="fo-text"><b>Chapter one</b>The hedgehog was in no hurry at all. The leaves could fall, the geese could go, and still he would take the long way round the pond.</div></div></div><div class="fo-flip"><i></i><i></i></div></div></section>',
  work: (k) => { const c = [["#f4d58d", "#7c8c6a"], ["#f6efe2", "#2c3a52"], ["#c97b6b", "#e9c9a6"]]; return '<section class="fo-books" id="work"><h2>' + k.h("work", "On the shelf") + '</h2><div class="fo-list">' + k.c.cards.map((x, i) => '<article class="fo-b">' + (k.photo(i) || '<span class="fo-cover" aria-hidden="true" style="--a:' + c[i % 3][0] + ";--b:" + c[i % 3][1] + '"></span>') + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="fo-com" id="services"><h2>' + k.h("services", "Commissions") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="fo-about" id="about"><h2>' + k.h("about", "About me") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="fo-end" id="contact"><h2>' + k.h("contact", "Shall we make a book?") + '</h2>' + k.cta("Write to me") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

export default {
  id: "md-cohere",
  root: "ch2",
  fonts: "family=Zilla+Slab:wght@400;700&family=Mulish:wght@400;700;900",
  labels: { work: "Results", services: "Plans", about: "About", contact: "Book a demo" },
  demo: {
    name: "Clarity House", headline: "Find it in every file.", heroLabel: "Search across all your company's documents",
    bio: "Contracts, policies, emails and slide decks: Clarity House reads them all and answers questions with the exact passage that holds the answer. Everything stays inside your company.",
    cards: [
      { title: "Every contract, one question", description: "A legal team found every renewal clause due this quarter in a minute." },
      { title: "New staff, faster answers", description: "Onboarding questions answered from the handbook, with the page linked." },
      { title: "Policy changes, tracked", description: "See which documents still mention the old travel policy." },
    ],
    services: [
      { title: "Team", description: "Up to 50 people and 100,000 documents." },
      { title: "Company", description: "Every department, single sign-on and audit log." },
      { title: "Private deployment", description: "Runs on your own servers." },
    ],
  },
  css: `
.ch2{--white:#fff;--cobalt:#1d3fd6;--ink:#101425;--lime:#d7f44c;--fog:#eef1fb;--mute:#5b6280;background:var(--white);color:var(--ink);font:400 17px/1.7 Mulish,system-ui,sans-serif}
.ch2 header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.ch2 .brand{font:900 21px/1 Mulish;letter-spacing:-.03em;text-decoration:none;display:flex;align-items:center;gap:8px}.ch2 .brand:before{content:"";width:18px;height:18px;border:4px solid var(--cobalt);border-radius:50%;box-shadow:8px 8px 0 -5px var(--cobalt)}
.ch2 nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:700}.ch2 nav a{text-decoration:none}.ch2 nav a:hover{color:var(--cobalt)}
.ch2-hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(50px,8vw,110px) clamp(18px,4vw,56px)}
.ch2 h1{font:700 clamp(56px,8.6vw,144px)/.92 "Zilla Slab",serif;letter-spacing:-.03em}
.ch2 h1 .ch{animation:ch2-in .6s ease both;animation-delay:calc(var(--i) * 30ms)}@keyframes ch2-in{from{opacity:0;transform:translateY(.3em)}}
.ch2-hero p{margin-top:24px;max-width:44ch;color:var(--mute);font-size:clamp(18px,1.5vw,20px)}
.ch2 .cta{display:inline-flex;margin-top:30px;padding:15px 26px;border-radius:6px;background:var(--cobalt);color:#fff;font-weight:900;text-decoration:none;transition:background .2s}.ch2 .cta:hover{background:var(--ink)}.ch2 .cta-muted{background:var(--fog);color:var(--mute)}
.ch2-doc{position:relative;padding:32px;border-radius:10px;background:var(--fog);font:400 15px/2 "Zilla Slab",serif;color:#5b6280;overflow:hidden}
.ch2-doc p{margin:0}
.ch2-doc mark{background:transparent;color:var(--ink);background-image:linear-gradient(var(--lime),var(--lime));background-size:0 100%;background-repeat:no-repeat;animation:ch2-mark 6s ease infinite;animation-delay:var(--d)}
@keyframes ch2-mark{0%,10%{background-size:0 100%}20%,90%{background-size:100% 100%}100%{background-size:0 100%}}
.ch2-lens{position:absolute;width:150px;height:150px;border-radius:50%;border:6px solid var(--cobalt);background:rgba(29,63,214,.06);box-shadow:0 20px 40px -20px rgba(16,20,37,.5);animation:ch2-scan 6s ease-in-out infinite}
.ch2-lens:after{content:"";position:absolute;right:-42px;bottom:-26px;width:60px;height:14px;border-radius:7px;background:var(--cobalt);transform:rotate(40deg)}
@keyframes ch2-scan{0%{left:10%;top:6%}35%{left:50%;top:30%}70%{left:20%;top:60%}100%{left:10%;top:6%}}
.ch2-ans{margin-top:18px;padding:16px 18px;border-left:5px solid var(--cobalt);background:#fff;font:700 15px/1.5 Mulish;color:var(--ink)}
.ch2 h2{font:700 clamp(42px,6vw,96px)/.98 "Zilla Slab",serif;letter-spacing:-.025em;max-width:14ch}
.ch2-results{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:#fff}
.ch2-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.ch2-res{padding:28px;border-radius:12px;background:#1a2040}
.ch2-res b{display:inline-block;padding:2px 8px;background:var(--lime);color:var(--ink);font:900 13px Mulish}
.ch2-res img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:8px;margin-bottom:14px}
.ch2-res h3{margin-top:14px;font:700 26px/1.15 "Zilla Slab",serif}.ch2-res p{margin-top:8px;color:#b8bfdc}
.ch2-plans{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ch2-plans ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ch2-plans li{padding:28px;border-radius:10px;background:var(--fog)}.ch2-plans li:nth-child(2){background:var(--cobalt);color:#fff}
.ch2-plans h3{font:700 28px "Zilla Slab",serif}.ch2-plans p{margin-top:8px}
.ch2-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--lime);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ch2-about>p{font-size:clamp(19px,1.8vw,24px)}.ch2-about dl{grid-column:2;margin:0}.ch2-about dt{font-weight:900;margin-top:16px}.ch2-about dd{margin:2px 0 0}
.ch2-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ch2-end h2{margin:0 auto}
.ch2 footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--mute)}
@media(max-width:900px){.ch2 nav{gap:12px;font-size:14px}.ch2-hero,.ch2-list,.ch2-plans ul,.ch2-about{grid-template-columns:1fr}.ch2-about dl{grid-column:auto}.ch2-lens{display:none}}
@media (prefers-reduced-motion:reduce){.ch2-doc mark{background-size:100% 100%}.ch2-lens{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => '<section class="ch2-hero" aria-labelledby="h"><div><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a demo") + '</div><div class="ch2-doc" aria-hidden="true"><p>Section 4.2. The agreement will <mark style="--d:.4s">renew automatically on 1 March</mark> unless either party gives sixty days notice in writing. Fees increase in line with inflation. Section 4.3. Travel is reimbursed at <mark style="--d:1.2s">economy rates for flights under six hours</mark>, with receipts submitted within thirty days of return.</p><div class="ch2-ans">Renews 1 March. Notice due by 31 December.</div><span class="ch2-lens"></span></div></section>',
  work: (k) => '<section class="ch2-results" id="work"><h2>Answers people found</h2><div class="ch2-list">' + k.c.cards.map((x, i) => '<article class="ch2-res">' + (k.photo(i) || "<b>Found in 2 s</b>") + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>",
  services: (k) => '<section class="ch2-plans" id="services"><h2>Plans</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ch2-about" id="about"><h2>Your files, finally useful</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ch2-end" id="contact"><h2>What would you ask first?</h2>' + k.cta("Book a demo") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

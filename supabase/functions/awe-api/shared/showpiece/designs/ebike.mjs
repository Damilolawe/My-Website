export default {
  id: "md-voltagent",
  root: "ab",
  fonts: "family=Chakra+Petch:wght@500;700&family=Asap:wght@400;600",
  labels: { work: "Bikes", services: "Services", about: "Workshop", contact: "Book a test ride" },
  demo: {
    name: "Ampere Bikes", headline: "Hills, flattened.", heroLabel: "Electric bike shop and workshop",
    bio: "Electric bikes for commuting, cargo and weekend climbs. Test ride anything in the shop, get it set up to fit you, and bring it back for a free service after a month.",
    cards: [
      { title: "The commuter", description: "80 km range, mudguards and lights, folds into a hallway." },
      { title: "The cargo", description: "Two kids or a week of shopping, with power for every hill." },
      { title: "The trail", description: "Full suspension and a motor that knows when to help." },
    ],
    services: [
      { title: "Test rides", description: "Any bike, any day, no booking needed." },
      { title: "Servicing", description: "Brakes, gears and battery health checks." },
      { title: "Cycle to work", description: "Spread the cost through your employer." },
    ],
  },
  css: `
@property --chg{syntax:"<integer>";initial-value:0;inherits:false}
.ab{--ink:#0e1512;--lime:#b8ff3c;--teal:#0f6e5c;--fog:#eef3ef;--white:#fff;--grey:#5b6762;background:var(--fog);color:var(--ink);font:400 17px/1.65 Asap,system-ui,sans-serif}
.ab header{display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,56px)}
.ab .brand{display:flex;align-items:center;gap:8px;font:700 22px/1 "Chakra Petch";text-transform:uppercase;text-decoration:none}.ab .brand:before{content:"";width:12px;height:20px;background:var(--teal);clip-path:polygon(60% 0,0 55%,45% 55%,30% 100%,100% 40%,55% 40%)}
.ab nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:600}.ab nav a{text-decoration:none}.ab nav a:hover{color:var(--teal)}
.ab-hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(30px,5vw,70px);align-items:center;padding:clamp(40px,6vw,90px) clamp(18px,4vw,56px);overflow:hidden}
.ab-label{font:500 15px "Chakra Petch";text-transform:uppercase;letter-spacing:.14em;color:var(--teal)}
.ab h1{margin-top:12px;font:700 clamp(62px,9.4vw,156px)/.9 "Chakra Petch";text-transform:uppercase;letter-spacing:-.02em}
.ab h1 .ch{display:inline-block;animation:ab-in .5s cubic-bezier(.2,.9,.3,1.2) both;animation-delay:calc(var(--i) * 35ms)}@keyframes ab-in{from{opacity:0;transform:translateX(-.8em)}}
.ab-hero p{margin-top:22px;max-width:44ch;font-size:clamp(18px,1.5vw,20px);color:#34403b}
.ab .cta{display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:999px;background:var(--ink);color:var(--lime);font:700 16px "Chakra Petch";text-transform:uppercase;letter-spacing:.06em;text-decoration:none;transition:background .2s,color .2s}.ab .cta:hover{background:var(--lime);color:var(--ink)}.ab .cta-muted{background:#dce5df;color:var(--grey);font:400 15px Asap;text-transform:none;letter-spacing:0}
.ab-ride{position:relative;aspect-ratio:1.4}
.ab-road{position:absolute;left:-20%;right:-20%;bottom:6%;height:4px;background:repeating-linear-gradient(90deg,var(--ink) 0 40px,transparent 40px 70px);animation:ab-road .6s linear infinite}@keyframes ab-road{to{background-position:-70px 0}}
.ab-bike{position:absolute;left:8%;right:8%;bottom:8%;aspect-ratio:2.2}
.ab-bike svg{width:100%;height:100%;overflow:visible}
.ab-bike .fr{fill:none;stroke:var(--teal);stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
.ab-bike .wh{fill:none;stroke:var(--ink);stroke-width:7}
.ab-bike .sp{fill:none;stroke:var(--grey);stroke-width:2;transform-box:fill-box;transform-origin:center;animation:ab-spin .8s linear infinite}@keyframes ab-spin{to{transform:rotate(360deg)}}
.ab-bike .bat{fill:var(--lime);stroke:var(--ink);stroke-width:3}
.ab-gauge{position:absolute;right:0;top:0;padding:18px 20px;border-radius:20px;background:var(--ink);color:var(--white);font:500 14px "Chakra Petch";text-transform:uppercase;letter-spacing:.1em;counter-reset:c var(--chg);animation:ab-charge 3s cubic-bezier(.3,.7,.3,1) .6s both;--chg:96}
.ab-gauge b{display:block;font:700 46px/1 "Chakra Petch";color:var(--lime);letter-spacing:0}.ab-gauge b:before{content:counter(c) "%"}
.ab-cells{display:flex;gap:4px;margin-top:10px}.ab-cells i{width:16px;height:22px;border-radius:3px;background:var(--lime);animation:ab-cell .3s ease both;animation-delay:var(--d)}
@keyframes ab-cell{from{background:#2c3a33}}
@keyframes ab-charge{from{--chg:8}}
.ab h2{font:700 clamp(46px,6.6vw,108px)/.92 "Chakra Petch";text-transform:uppercase;max-width:14ch}
.ab-bikes{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--white)}
.ab-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,70px)}
.ab-b{padding:26px;border-radius:24px;background:#18231e;border:1px solid #26352e}
.ab-spec{display:flex;gap:8px;margin-bottom:18px}.ab-spec span{padding:4px 10px;border-radius:999px;background:var(--lime);color:var(--ink);font:700 13px "Chakra Petch"}
.ab-b img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin-bottom:16px}
.ab-b h3{font:700 28px/1.1 "Chakra Petch";text-transform:uppercase}.ab-b p{margin-top:8px;color:#b5c4bd}
.ab-svc{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.ab-svc ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,56px)}
.ab-svc li{padding:28px;border-radius:24px;background:var(--white);border-left:8px solid var(--teal)}
.ab-svc h3{font:700 24px "Chakra Petch";text-transform:uppercase}.ab-svc p{margin-top:8px;color:var(--grey)}
.ab-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--lime);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.ab-about>p{font-size:clamp(19px,1.8vw,24px)}.ab-about dl{grid-column:2;margin:0}.ab-about dt{font:700 18px "Chakra Petch";text-transform:uppercase;margin-top:16px}.ab-about dd{margin:2px 0 0}
.ab-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.ab-end h2{margin:0 auto}
.ab footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:14px;color:var(--grey)}
@media(max-width:900px){.ab nav{gap:12px;font-size:14px}.ab-hero,.ab-list,.ab-svc ul,.ab-about{grid-template-columns:1fr}.ab-about dl{grid-column:auto}.ab-gauge{padding:12px 14px}.ab-gauge b{font-size:32px}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const spokes = c => [0, 30, 60, 90, 120, 150].map(a => '<line x1="' + (c + 46 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" y1="' + (128 + 46 * Math.sin(a * Math.PI / 180)).toFixed(1) + '" x2="' + (c - 46 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" y2="' + (128 - 46 * Math.sin(a * Math.PI / 180)).toFixed(1) + '"/>').join(""); return '<section class="ab-hero" aria-labelledby="h"><div><span class="ab-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1><p>" + k.E(k.c.bio) + "</p>" + k.cta("Book a test ride") + '</div><div class="ab-ride" aria-hidden="true"><span class="ab-road"></span><div class="ab-bike"><svg viewBox="0 0 400 182"><g class="sp">' + spokes(80) + '</g><g class="sp">' + spokes(320) + '</g><circle class="wh" cx="80" cy="128" r="50"/><circle class="wh" cx="320" cy="128" r="50"/><path class="fr" d="M80 128 L160 50 L270 50 L320 128 M160 50 L200 128 L270 50 M200 128 L80 128 M150 30 H180 M270 50 L280 20 H310"/><rect class="bat" x="180" y="56" width="76" height="22" rx="6"/></svg></div><div class="ab-gauge">Battery<b></b><span class="ab-cells">' + Array.from({ length: 6 }, (_, i) => '<i style="--d:' + (0.8 + i * 0.4).toFixed(1) + 's"></i>').join("") + "</span></div></div></section>"; },
  work: (k) => { const s = [["80 km", "18 kg"], ["60 km", "200 kg load"], ["100 km", "160 mm travel"]]; return '<section class="ab-bikes" id="work"><h2>' + k.h("work", "In the shop") + '</h2><div class="ab-list">' + k.c.cards.map((x, i) => '<article class="ab-b"><span class="ab-spec">' + s[i % 3].map(t => "<span>" + t + "</span>").join("") + "</span>" + k.photo(i) + "<h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="ab-svc" id="services"><h2>' + k.h("services", "Workshop") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="ab-about" id="about"><h2>' + k.h("about", "Riders first") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="ab-end" id="contact"><h2>' + k.h("contact", "Ride it before you decide.") + '</h2>' + k.cta("Book a test ride") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

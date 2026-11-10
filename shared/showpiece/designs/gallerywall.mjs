export default {
  id: "museum",
  root: "mu",
  fonts: "family=Libre+Caslon+Display&family=Spline+Sans:wght@400;500;700",
  labels: { work: "Works", services: "Exhibitions", about: "Artist statement", contact: "Enquiries" },
  demo: {
    name: "Hanne Larsen", headline: "Colour, held still.", heroLabel: "Painter",
    bio: "I paint large, quiet canvases about weather and memory, built up slowly in thin layers of oil. My work is held in private and public collections across Scandinavia.",
    cards: [
      { title: "North Light, No. 7", description: "Oil on linen, 180 by 140 cm. A grey afternoon on the fjord." },
      { title: "Second Thaw", description: "Oil on linen, 120 by 120 cm. Ice, just before it goes." },
      { title: "Rooms I Have Left", description: "A series of nine small panels, oil on birch." },
    ],
    services: [
      { title: "Solo show, Oslo", description: "Spring, at a harbour gallery." },
      { title: "Group show, Copenhagen", description: "Autumn, new landscape painting." },
      { title: "Studio visits", description: "By appointment for collectors and curators." },
    ],
  },
  css: `
.mu{--wall:#f3f1ec;--floor:#c9b9a2;--ink:#1a1a18;--mute:#7c7a73;--accent:#9e3d22;background:var(--wall);color:var(--ink);font:400 16px/1.75 "Spline Sans",system-ui,sans-serif}
.mu header{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(18px,4vw,56px)}
.mu .brand{font:400 24px/1 "Libre Caslon Display";text-decoration:none}
.mu nav{display:flex;gap:clamp(14px,2.4vw,30px);font-weight:500;font-size:14px}.mu nav a{text-decoration:none}.mu nav a:hover{color:var(--accent)}
.mu-hero{position:relative;padding:clamp(30px,4vw,60px) clamp(18px,4vw,56px) 0;overflow:hidden}
.mu-top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.7fr);gap:clamp(24px,4vw,60px);align-items:end}
.mu-label{font-weight:500;font-size:13px;color:var(--mute)}
.mu h1{margin-top:8px;font:400 clamp(58px,9vw,150px)/.95 "Libre Caslon Display";letter-spacing:-.02em}
.mu h1 .ch{animation:mu-in 1.4s ease both;animation-delay:calc(var(--i) * 40ms)}@keyframes mu-in{from{opacity:0}}
.mu-top p{color:#45433e}
.mu .cta{display:inline-flex;margin-top:18px;padding:12px 22px;border:1px solid var(--ink);font-weight:500;font-size:14px;text-decoration:none;transition:background .2s,color .2s}.mu .cta:hover{background:var(--ink);color:var(--wall)}.mu .cta-muted{border-color:#d4d0c7;color:var(--mute)}
.mu-room{position:relative;margin-top:clamp(30px,4vw,50px);height:clamp(320px,34vw,460px);background:linear-gradient(transparent 82%,var(--floor) 82%)}
.mu-room:before{content:"";position:absolute;left:0;right:0;top:82%;height:6px;background:#e3dfd6}
.mu-light{position:absolute;top:0;left:var(--x);width:var(--w);height:82%;background:radial-gradient(ellipse at 50% 0,rgba(255,244,214,.9),transparent 70%);opacity:0;animation:mu-on .8s ease forwards;animation-delay:var(--d)}
@keyframes mu-on{to{opacity:1}}
.mu-art{position:absolute;left:var(--x);top:var(--y);width:var(--w);aspect-ratio:var(--a);padding:var(--m);background:#fff;box-shadow:0 18px 30px -16px rgba(0,0,0,.45),0 0 0 6px #2a2622;animation:mu-hang .9s cubic-bezier(.3,1.4,.5,1) both;animation-delay:var(--d)}
.mu-art i{display:block;width:100%;height:100%;background:var(--g)}
@keyframes mu-hang{from{opacity:0;transform:translateY(-30px) rotate(-3deg)}}
.mu-lbl{position:absolute;left:var(--x);top:var(--y);padding:6px 8px;background:#fff;font-size:10px;line-height:1.4;box-shadow:0 1px 0 #ddd;opacity:0;animation:mu-on .5s ease forwards;animation-delay:var(--d)}
.mu-bench{position:absolute;left:38%;bottom:4%;width:24%;height:22px;background:#3a2f26;border-radius:3px}.mu-bench:before,.mu-bench:after{content:"";position:absolute;bottom:-26px;width:8px;height:26px;background:#3a2f26}.mu-bench:before{left:10%}.mu-bench:after{right:10%}
.mu h2{font:400 clamp(44px,6.4vw,104px)/1 "Libre Caslon Display";max-width:14ch}
.mu-works{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:#fff}
.mu-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(24px,4vw,60px);margin-top:clamp(40px,6vw,70px);align-items:end}
.mu-w .mu-canvas{display:block;aspect-ratio:var(--a);background:var(--g);box-shadow:0 20px 30px -24px rgba(0,0,0,.5)}
.mu-w img{width:100%;aspect-ratio:4/5;object-fit:cover}
.mu-w div{margin-top:18px;padding:12px 14px;border-left:3px solid var(--accent);background:var(--wall)}
.mu-w h3{font:400 22px/1.2 "Libre Caslon Display";font-style:italic}.mu-w p{margin-top:4px;font-size:14px;color:var(--mute)}
.mu-ex{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.mu-ex ul{margin-top:clamp(36px,5vw,56px)}
.mu-ex li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;padding:22px 0;border-top:1px solid #d9d5cc}
.mu-ex h3{font:400 26px "Libre Caslon Display"}.mu-ex p{color:#45433e}
.mu-about{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);background:var(--ink);color:var(--wall);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(30px,6vw,90px)}.mu-about>p{font:400 clamp(22px,2.2vw,30px)/1.45 "Libre Caslon Display"}.mu-about dl{grid-column:2;margin:0}.mu-about dt{font-weight:700;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#d9a48f;margin-top:18px}.mu-about dd{margin:2px 0 0}
.mu-end{padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px);text-align:center}.mu-end h2{margin:0 auto}
.mu footer{display:flex;justify-content:space-between;padding:22px clamp(18px,4vw,56px);font-size:13px;color:var(--mute)}
@media(max-width:900px){.mu nav{gap:12px;font-size:13px}.mu-top,.mu-list,.mu-about,.mu-ex li{grid-template-columns:1fr}.mu-about dl{grid-column:auto}.mu-lbl{display:none}}`,
  header: (k) => '<header><a class="brand" href="' + k.E(k.home) + '">' + k.E(k.c.name) + '</a><nav aria-label="Main">' + k.navHtml() + "</nav></header>",
  hero: (k) => { const A = [["8%", "8%", "14%", ".8", "10px", "linear-gradient(#cfd8de 0 55%,#8a9aa3 55% 62%,#5b6b74)", ".6s", "Second Thaw"], ["34%", "6%", "26%", "1.4", "14px", "linear-gradient(160deg,#e9e2d3,#b9b0a0 60%,#7b7466)", "1s", "North Light, No. 7"], ["72%", "12%", "14%", "1", "8px", "radial-gradient(circle at 60% 40%,#c86a4a 0 20%,#e8d7c2 22% 60%,#9e3d22)", "1.4s", "Rooms I Have Left"]]; return '<section class="mu-hero" aria-labelledby="h"><div class="mu-top"><div><span class="mu-label">' + k.E(k.c.heroLabel || "") + '</span><h1 id="h">' + k.letters(k.c.headline) + "</h1></div><div><p>" + k.E(k.c.bio) + "</p>" + k.cta("Enquiries") + '</div></div><div class="mu-room" aria-hidden="true">' + A.map(a => '<span class="mu-light" style="--x:calc(' + a[0] + " - 4%);--w:calc(" + a[2] + " + 8%);--d:" + a[6] + '"></span>').join("") + A.map(a => '<span class="mu-art" style="--x:' + a[0] + ";--y:" + a[1] + ";--w:" + a[2] + ";--a:" + a[3] + ";--m:" + a[4] + ";--g:" + a[5] + ";--d:" + a[6] + '"><i></i></span><span class="mu-lbl" style="--x:calc(' + a[0] + " + " + a[2] + " + 1.5%);--y:40%;--d:calc(" + a[6] + ' + 1s)"><b>' + a[7] + "</b><br>Oil on linen</span>").join("") + '<span class="mu-bench"></span></div></section>'; },
  work: (k) => { const W = [["linear-gradient(160deg,#e9e2d3,#b9b0a0 60%,#7b7466)", ".8"], ["linear-gradient(#cfd8de 0 55%,#8a9aa3 55% 62%,#5b6b74)", "1"], ["radial-gradient(circle at 60% 40%,#c86a4a 0 20%,#e8d7c2 22% 60%,#9e3d22)", ".7"]]; return '<section class="mu-works" id="work"><h2>' + k.h("work", "Works") + '</h2><div class="mu-list">' + k.c.cards.map((x, i) => '<article class="mu-w">' + (k.photo(i) || '<span class="mu-canvas" aria-hidden="true" style="--g:' + W[i % 3][0] + ";--a:" + W[i % 3][1] + '"></span>') + "<div><h3>" + k.E(x.title) + "</h3><p>" + k.E(x.description) + "</p></div></article>").join("") + "</div></section>"; },
  services: (k) => '<section class="mu-ex" id="services"><h2>' + k.h("services", "Exhibitions") + '</h2><ul>' + k.c.services.slice(0, 3).map(s => "<li><h3>" + k.E(s.title) + "</h3><p>" + k.E(s.description || "") + "</p></li>").join("") + "</ul></section>",
  about: (k) => '<section class="mu-about" id="about"><h2>' + k.h("about", "Statement") + '</h2><p>' + k.E(k.c.bio) + "</p>" + (k.aboutItems.length ? "<dl>" + k.aboutItems.map(a => "<dt>" + k.E(a.title) + "</dt><dd>" + k.E(a.text) + "</dd>").join("") + "</dl>" : "") + "</section>",
  contact: (k) => '<section class="mu-end" id="contact"><h2>' + k.h("contact", "Visit the studio.") + '</h2>' + k.cta("Enquiries") + "</section>",
  footer: (k) => "<footer><span>" + k.E(k.c.name) + '</span><a href="#main">Back to top</a></footer>',
};

import { normalize, esc } from "./model.mjs";
export function renderSite(
  input,
  { assetBase = "/api/assets/", sample = false, assetSuffix = "" } = {},
) {
  const { content: c, design: d, template: t } = normalize(input);
  const has = (s) => d.sections.includes(s);
  const available = d.sections.filter(
    (s) =>
      s === "contact" ||
      (s === "work" ? c.projects : c[s === "about" ? "bio" : s]),
  );
  const panel = (id, title, body) =>
    has(id) && body
      ? `<section id="${id}"><p class="eyebrow">${title}</p><div class="prose">${esc(body)}</div></section>`
      : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.name)} — ${esc(c.headline)}</title><meta name="description" content="${esc(c.headline)}"><style>
 *{box-sizing:border-box}html{scroll-behavior:smooth}body{--accent:${d.primary};--second:${d.secondary};margin:0;background:${d.appearance === "dark" ? "#141619" : "#f6f4ee"};color:${d.appearance === "dark" ? "#f8f7f2" : "#191b20"};font:17px/1.65 ${d.font === "serif" ? "Georgia,serif" : d.font === "mono" ? "monospace" : "Arial,sans-serif"}}a{color:inherit;text-underline-offset:5px}a:focus-visible{outline:3px solid currentColor;outline-offset:6px}.wrap{max-width:1240px;margin:auto;padding:0 6vw}nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:30px 0;border-bottom:1px solid #8886}nav div{display:flex;gap:20px;flex-wrap:wrap;font-size:12px}.brand{font-weight:bold;letter-spacing:-.05em;font-size:24px}.hero{padding:100px 0 70px;display:grid;gap:40px;grid-template-columns:${d.layout === "split" ? "1.35fr 1fr" : "1fr"};align-items:center}.eyebrow{text-transform:uppercase;font:11px monospace;letter-spacing:.16em}h1{font-size:clamp(44px,7.4vw,104px);line-height:1.02;letter-spacing:-.065em;margin:25px 0 38px;overflow-wrap:anywhere}h2{font-size:clamp(25px,4vw,48px);line-height:1.15}.art{min-height:300px;background:var(--accent);position:relative;overflow:hidden;border-radius:2px}.art:before{content:'';position:absolute;inset:15%;border:35px solid var(--second);border-radius:50%;transform:rotate(-25deg) scaleX(.7)}.art:after{content:'';width:40%;height:150%;background:#ffffff33;position:absolute;left:65%;top:-25%;transform:rotate(25deg)}.hero img{width:100%;height:480px;object-fit:cover;border-radius:2px}section{padding:55px 0;border-top:1px solid #8886;display:grid;grid-template-columns:1fr 2fr;gap:40px}.prose{white-space:pre-line;max-width:750px;font-size:clamp(18px,2.2vw,26px)}.gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;padding:30px 0}.gallery img{width:100%;height:360px;object-fit:cover}footer{padding:55px 0;display:flex;justify-content:space-between;gap:25px;flex-wrap:wrap;font-size:13px}.links{display:flex;gap:20px;flex-wrap:wrap}.sample{background:#dcfc46;color:#151515;text-align:center;padding:10px;font:12px monospace}
 .folio h1{font-family:Georgia,serif;font-weight:normal;font-style:italic}.folio .hero{border-bottom:12px double currentColor}.folio .eyebrow{font-style:italic}.still .wrap{max-width:1050px}.still .hero{padding:140px 0}.still h1{font-weight:400;font-size:clamp(42px,5.8vw,80px)}.still .art{border-radius:50% 50% 0 0}.afterhours .hero{min-height:85vh}.afterhours h1{text-transform:uppercase;font-weight:900}.afterhours .art{border-radius:48% 48% 5px 5px;background:radial-gradient(ellipse at top,var(--accent),#141619)}.signal h1{text-transform:uppercase;transform:rotate(-2deg)}.signal .art{transform:rotate(4deg);box-shadow:14px 14px 0 var(--second)}.signal section{border-top:4px solid currentColor}.daylight .art{border-radius:90px 15px 90px 15px}.daylight h1{letter-spacing:-.05em}.daylight section{border-radius:30px;padding:38px;margin:25px 0;border:1px solid #8886}.daylight nav{border-bottom:0}.daylight .brand{border:2px solid currentColor;padding:4px 18px;border-radius:50px}
 ${d.animation !== "none" ? `@media(prefers-reduced-motion:no-preference){.hero{animation:arrive ${d.animation === "expressive" ? "1.2s" : ".6s"} both}.art:before{animation:float 12s ease-in-out infinite alternate}@keyframes arrive{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}@keyframes float{to{transform:rotate(20deg) scaleX(.8)}}}` : ""}
 @media(max-width:650px){nav{align-items:start}nav div{gap:12px;max-width:60%;justify-content:flex-end}.hero{grid-template-columns:1fr;padding:65px 0}.hero img{height:360px}section{grid-template-columns:1fr;gap:10px}.gallery{grid-template-columns:1fr}.still .hero{padding:80px 0}.daylight section{padding:25px}.art{min-height:240px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important}}
 </style></head><body class="${t}">${sample ? '<div class="sample">FICTIONAL TEMPLATE DEMO — sample content only</div>' : ""}<div class="wrap"><nav aria-label="Main navigation"><a class="brand" href="#home">${esc(c.name)}</a><div>${(d.navigation === "compact" ? available.filter((s) => ["about", "contact"].includes(s)) : available).map((s) => `<a href="#${s}">${esc(s)}</a>`).join("")}</div></nav><main id="home"><div class="hero"><div><p class="eyebrow">${esc(input.type || "Portfolio")} / Independent perspective</p><h1>${esc(c.headline)}</h1>${has("work") ? '<a href="#work">Explore my work ↗</a>' : ""}</div>${c.photoIds[0] ? `<img src="${assetBase}${esc(c.photoIds[0])}${assetSuffix}" alt="${esc(c.name)}" fetchpriority="high">` : '<div class="art" aria-hidden="true"></div>'}</div>${panel("about", "01 / A little about me", c.bio)}${panel("work", "02 / Selected work", c.projects)}${
   c.photoIds.length > 1
     ? `<div class="gallery">${c.photoIds
         .slice(1)
         .map(
           (id) =>
             `<img src="${assetBase}${esc(id)}${assetSuffix}" alt="Portfolio image" loading="lazy">`,
         )
         .join("")}</div>`
     : ""
 }${panel("education", "03 / Education", c.education)}${panel("experience", "04 / Experience", c.experience)}${panel("skills", "05 / Capabilities", c.skills)}${has("contact") ? `<section id="contact"><p class="eyebrow">06 / Say hello</p><div><h2>Let’s make a connection.</h2><div class="links">${c.publicEmail ? `<a href="mailto:${esc(c.publicEmail)}">Email me ↗</a>` : ""}${c.links.map((u, i) => `<a href="${esc(u)}" rel="noopener noreferrer" target="_blank">${esc(new URL(u).hostname)} ↗</a>`).join("")}</div></div></section>` : ""}</main><footer><span>${esc(c.name)}</span><a href="#home">Back to top ↑</a></footer></div></body></html>`;
}

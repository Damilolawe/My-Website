import { esc } from "../model.mjs";

export const E = (s) => esc(s ?? "");

export const BASE_CSS = `*,*:before,*:after{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{margin:0;min-height:100vh;overflow-x:hidden}img{display:block;max-width:100%}a{color:inherit}h1,h2,h3,p,figure,ul,ol{margin:0}ul,ol{padding:0;list-style:none}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:12px;top:-60px;z-index:100;padding:10px 14px;background:#fff;color:#000}.skip:focus{top:12px}
:focus-visible{outline:3px solid currentColor;outline-offset:4px}
.demo{position:relative;z-index:50;padding:7px 16px;text-align:center;font:600 12px/1.4 system-ui,sans-serif;letter-spacing:.02em;background:#000;color:#fff}
.split{display:inline}.split .w{display:inline-block;white-space:nowrap}.split .ch{display:inline-block}
[aria-current=page]{text-decoration:underline;text-underline-offset:6px}
@media(max-width:640px){body>div>header{flex-wrap:wrap;row-gap:12px}body>div>header nav{flex-wrap:wrap;row-gap:6px}}
@media (prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`;

export const letters = (text) => {
  let i = 0;
  const words = String(text ?? "").split(/\s+/).filter(Boolean).map(w => '<span class="w">' + [...w].map(ch => '<span class="ch" style="--i:' + (i++) + '">' + E(ch) + "</span>").join("") + "</span>");
  return '<span class="sr">' + E(text) + '</span><span aria-hidden="true" class="split">' + words.join(" ") + "</span>";
};

const MP_BLOCKS = { home: ["hero", "work", "contact"], work: ["intro", "work", "contact"], features: ["intro", "services", "contact"], studio: ["intro", "about", "contact"], contact: ["intro", "contact"] };
const BLOCK_PAGE = { hero: "home", work: "work", services: "features", about: "studio", contact: "contact" };
const ABOUT_KEYS = [["education", "Education"], ["experience", "Experience"], ["skills", "Skills"]];

function contentFor(design, v, sample) {
  const c = v?.content || {};
  const d = design.demo || {};
  const base = sample ? { ...c, ...d, photoIds: c.photoIds || [], publicEmail: c.publicEmail } : {
    ...c, name: c.name || d.name, headline: c.headline || d.headline, heroLabel: c.heroLabel || d.heroLabel, bio: c.bio || d.bio,
    cards: c.cards?.length ? c.cards : [], services: c.services?.length ? c.services : [],
  };
  base.cards = (base.cards || []).filter(x => x && (x.title || x.description)).slice(0, 6);
  base.services = (base.services || []).filter(x => x && (x.title || x.description)).slice(0, 6);
  return base;
}

export function renderShowpieceDesign(design, v, options = {}) {
  const sample = !!options.sample;
  const c = contentFor(design, v, sample);
  const sections = v?.design?.sections || ["about", "work", "services", "contact"];
  const aboutItems = ABOUT_KEYS.filter(([key]) => sections.includes(key) && String(c[key] || "").trim()).map(([key, title]) => ({ key, title, text: String(c[key]).trim() }));
  const multipage = !!options.multipage;
  const page = multipage ? (options.page || "home") : null;
  const hasServices = c.services.length > 0 && (sections.includes("services") || !sections.length);
  const hasWork = c.cards.length > 0;
  const blocks = multipage
    ? (MP_BLOCKS[page] || MP_BLOCKS.home).map(b => b === "services" && !hasServices ? "about" : b)
    : ["hero", hasWork && "work", hasServices && "services", aboutItems.length && "about", "contact"].filter(Boolean);
  const labels = { work: "Work", services: "Services", about: "About", contact: "Contact", ...(design.labels || {}) };
  const pageUrl = (p) => options.href ? options.href(p) : (p === "home" ? "./" : "./" + p + ".html");
  const link = (block) => multipage ? pageUrl(BLOCK_PAGE[block] || "home") : "#" + block;
  const navBlocks = ["work", hasServices ? "services" : null, (multipage || aboutItems.length) ? "about" : null, "contact"].filter(Boolean)
    .filter(b => multipage || blocks.includes(b));
  const k = {
    c, E, letters, sample, multipage, page, aboutItems, labels,
    has: (b) => blocks.includes(b),
    link,
    home: multipage ? pageUrl("home") : "#main",
    nav: navBlocks.map(b => ({ label: labels[b], href: link(b), current: multipage && BLOCK_PAGE[b] === page })),
    navHtml: (cls = "") => navBlocks.map(b => '<a' + (cls ? ' class="' + cls + '"' : "") + ' href="' + E(link(b)) + '"' + (multipage && BLOCK_PAGE[b] === page ? ' aria-current="page"' : "") + ">" + E(labels[b]) + "</a>").join(""),
    cta: (label) => c.publicEmail ? '<a class="cta" href="mailto:' + E(c.publicEmail) + '">' + E(label) + "</a>"
      : sample ? '<a class="cta" href="' + E(link("contact")) + '">' + E(label) + "</a>"
      : '<span class="cta cta-muted">Contact details will be added by the site owner.</span>',
    photo: (i) => c.photoIds?.[i] ? '<img src="' + E((options.assetBase || "/api/assets/") + c.photoIds[i] + (options.assetSuffix || "")) + '" alt="" loading="' + (i === 0 ? "eager" : "lazy") + '">' : "",
    intro: () => {
      const t = (design.intros || {})[page] || {};
      return { title: t.title || labels[{ work: "work", features: "services", studio: "about", contact: "contact" }[page]] || c.name, text: t.text || (page === "studio" ? (c.heroLabel || c.headline) : page === "contact" ? "Tell us what you have in mind." : c.bio) };
    },
  };
  const order = { hero: design.hero, intro: design.intro, work: design.work, services: design.services, about: design.about, contact: design.contact };
  const main = blocks.map(b => (order[b] ? order[b](k) : "")).join("");
  const body = '<div class="' + design.root + '">' + design.header(k) + '<main id="main">' + main + "</main>" + design.footer(k) + "</div>";
  const title = c.name + (page && page !== "home" ? " / " + (k.intro().title) : " / " + c.headline);
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + E(title) + "</title>" +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + design.fonts + '&display=swap">' +
    "<style>" + BASE_CSS + design.css + "</style></head><body>" + '<a class="skip" href="#main">Skip to content</a>' +
    (sample ? '<div class="demo">Fictional template demo. All names and content are illustrative.</div>' : "") + body + "</body></html>";
}

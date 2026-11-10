import { esc } from "../model.mjs";
import { renderMotionChapter } from "../premium-art-direction-35.mjs";

export const E = (s) => esc(s ?? "");

export const BASE_CSS = `*,*:before,*:after{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{margin:0;min-height:100vh;overflow-x:hidden}img{display:block;max-width:100%}a{color:inherit}h1,h2,h3,p,figure,ul,ol{margin:0}ul,ol{padding:0;list-style:none}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:12px;top:-60px;z-index:100;padding:10px 14px;background:#fff;color:#000}.skip:focus{top:12px}
:focus-visible{outline:3px solid currentColor;outline-offset:4px}
.demo{position:relative;z-index:50;padding:7px 16px;text-align:center;font:600 12px/1.4 system-ui,sans-serif;letter-spacing:.02em;background:#000;color:#fff}
.split{display:inline}.split .w{display:inline-block;white-space:nowrap}.split .ch{display:inline-block}
/* Customer films and reels: validated YouTube, Vimeo or direct video files only. */
.awe-motion-chapter{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px)}.awe-motion-heading span{font-size:12px;letter-spacing:.2em;opacity:.7}.awe-motion-heading h2{margin-top:10px;font-size:clamp(36px,5vw,80px);line-height:1}.awe-motion-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px;margin-top:clamp(28px,4vw,50px)}.awe-motion-frame iframe,.awe-motion-frame video{display:block;width:100%;aspect-ratio:16/9;border:0;background:#000}.awe-motion-entry figcaption{display:flex;gap:12px;align-items:baseline;margin-top:12px}.awe-motion-entry figcaption span{font-size:12px;letter-spacing:.14em;opacity:.7}
.awe-extras{display:grid;gap:clamp(28px,4vw,50px);padding:clamp(60px,8vw,110px) clamp(18px,4vw,56px)}.awe-extras h2{font-size:clamp(26px,3vw,40px);margin-bottom:14px}.awe-quotes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px}.awe-quotes blockquote{margin:0;font-size:clamp(19px,1.8vw,24px);line-height:1.45}.awe-quotes figcaption{margin-top:10px;opacity:.75}.awe-notes{max-width:65ch;white-space:pre-line}.awe-links{display:flex;flex-wrap:wrap;gap:12px 24px}.awe-links a{text-underline-offset:4px;overflow-wrap:anywhere}
[aria-current=page]{text-decoration:underline;text-underline-offset:6px}
@media(max-width:640px){body>div>header{flex-wrap:wrap;row-gap:12px}body>div>header nav{flex-wrap:wrap;row-gap:6px}}
@media (prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}svg path{stroke-dashoffset:0!important}}`;

// Pull out every prefers-reduced-motion block so the motion-free "still"
// rendering shows exactly what reduced-motion visitors see.
export function reducedMotionCSS(css) {
  const out = [], marker = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/g;
  let m;
  while ((m = marker.exec(css))) {
    let depth = 1, i = marker.lastIndex;
    for (; i < css.length && depth; i++) depth += css[i] === "{" ? 1 : css[i] === "}" ? -1 : 0;
    out.push(css.slice(marker.lastIndex, i - 1));
  }
  return out.join("");
}

export const letters = (text) => {
  let i = 0;
  const words = String(text ?? "").split(/\s+/).filter(Boolean).map(w => '<span class="w">' + [...w].map(ch => '<span class="ch" style="--i:' + (i++) + '">' + E(ch) + "</span>").join("") + "</span>");
  return '<span class="sr">' + E(text) + '</span><span aria-hidden="true" class="split">' + words.join(" ") + "</span>";
};

const MP_BLOCKS = { home: ["hero", "work", "contact"], work: ["intro", "work", "contact"], features: ["intro", "services", "contact"], studio: ["intro", "about", "contact"], contact: ["intro", "contact"] };
const BLOCK_PAGE = { hero: "home", work: "work", services: "features", about: "studio", contact: "contact" };
// Customer sites never show demo copy: headings and labels fall back to these.
const NEUTRAL_LABELS = { work: "Work", services: "Services", about: "About", contact: "Contact" };
const NEUTRAL_HEADINGS = { work: "Selected work", services: "Services", about: "About", contact: "Get in touch" };
const NEUTRAL_INTROS = { work: "Selected work", features: "Services", studio: "About", contact: "Get in touch" };
const httpsOnly = (u) => /^https:\/\//i.test(String(u || "")) ? String(u) : "";

// Testimonials, profile links and project links the customer added.
function extrasSection(c, sample) {
  if (sample) return "";
  const quotes = (c.testimonials || []).slice(0, 6).map(t => "<figure><blockquote>" + E(t.quote) + "</blockquote>" + (t.attribution ? "<figcaption>" + E(t.attribution) + "</figcaption>" : "") + "</figure>").join("");
  const projects = (c.cards || []).filter(x => httpsOnly(x.url)).map(x => '<li><a href="' + E(x.url) + '" rel="noopener noreferrer">' + E(x.title || x.url) + "</a></li>").join("");
  const links = (c.links || []).map(httpsOnly).filter(Boolean).map(u => '<li><a href="' + E(u) + '" rel="noopener noreferrer me">' + E(u.replace(/^https:\/\/(www\.)?/i, "").replace(/\/$/, "")) + "</a></li>").join("");
  const notes = String(c.projects || "").trim();
  if (!quotes && !projects && !links && !notes) return "";
  return '<section class="awe-extras" id="more" aria-label="More">' + (quotes ? '<div class="awe-quotes">' + quotes + "</div>" : "") +
    (notes ? '<p class="awe-notes">' + E(notes) + "</p>" : "") +
    (projects ? '<div><h2>Projects</h2><ul class="awe-links">' + projects + "</ul></div>" : "") +
    (links ? '<div><h2>Elsewhere</h2><ul class="awe-links">' + links + "</ul></div>" : "") + "</section>";
}

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
  const sections = sample ? ["about", "work", "services", "contact"] : (v?.design?.sections || ["about", "work", "services", "contact"]);
  const aboutItems = ABOUT_KEYS.filter(([key]) => sections.includes(key) && String(c[key] || "").trim()).map(([key, title]) => ({ key, title, text: String(c[key]).trim() }));
  const multipage = !!options.multipage;
  const page = multipage ? (options.page || "home") : null;
  const hasServices = c.services.length > 0 && (sections.includes("services") || !sections.length);
  const hasWork = c.cards.length > 0 && (sample || sections.includes("work"));
  // Without a published email there is no contact panel, link or placeholder text.
  const hasEmail = !!c.publicEmail;
  const blocks = multipage
    ? (MP_BLOCKS[page] || MP_BLOCKS.home).map(b => b === "services" && !hasServices ? "about" : b)
    : ["hero", ...[hasWork && "work", hasServices && "services", aboutItems.length && "about"].filter(Boolean)
        .sort((a, b) => (sections.indexOf(a) + 99) % 99 - (sections.indexOf(b) + 99) % 99), "extras", "contact"];
  const labels = sample ? { ...NEUTRAL_LABELS, ...(design.labels || {}) } : NEUTRAL_LABELS;
  const pageUrl = (p) => options.href ? options.href(p) : (p === "home" ? "./" : "./" + p + ".html");
  const link = (block) => multipage ? pageUrl(BLOCK_PAGE[block] || "home") : "#" + block;
  const navBlocks = ["work", hasServices ? "services" : null, (multipage || aboutItems.length) ? "about" : null, hasEmail ? "contact" : null].filter(Boolean)
    .filter(b => multipage || blocks.includes(b));
  const k = {
    c, E, letters, sample, multipage, page, aboutItems, labels,
    has: (b) => blocks.includes(b),
    link,
    home: multipage ? pageUrl("home") : "#main",
    nav: navBlocks.map(b => ({ label: labels[b], href: link(b), current: multipage && BLOCK_PAGE[b] === page })),
    navHtml: (cls = "") => navBlocks.map(b => '<a' + (cls ? ' class="' + cls + '"' : "") + ' href="' + E(link(b)) + '"' + (multipage && BLOCK_PAGE[b] === page ? ' aria-current="page"' : "") + ">" + E(labels[b]) + "</a>").join(""),
    h: (block, text) => E(sample ? text : NEUTRAL_HEADINGS[block] || text),
    hr: (block, html) => sample ? html : E(NEUTRAL_HEADINGS[block] || ""),
    cta: (label) => hasEmail ? '<a class="cta" href="mailto:' + E(c.publicEmail) + '">' + E(sample ? label : "Get in touch") + "</a>"
      : hasWork && !(multipage && page === "work") ? '<a class="cta" href="' + E(link("work")) + '">' + E(sample ? labels.work : c.ctaLabel || "See the work") + "</a>"
      : "",
    photo: (i) => c.photoIds?.[i] ? '<img src="' + E((options.assetBase || "/api/assets/") + c.photoIds[i] + (options.assetSuffix || "")) + '" alt="" loading="' + (i === 0 ? "eager" : "lazy") + '">' : "",
    intro: () => {
      const t = sample ? (design.intros || {})[page] || {} : { title: NEUTRAL_INTROS[page] };
      return { title: t.title || labels[{ work: "work", features: "services", studio: "about", contact: "contact" }[page]] || c.name, text: t.text || (page === "studio" ? (c.heroLabel || c.headline) : page === "contact" ? "Tell us what you have in mind." : c.bio) };
    },
  };
  const order = { hero: design.hero, intro: design.intro, work: design.work, services: design.services, about: design.about, contact: design.contact };
  const motion = renderMotionChapter(c);
  if (motion) { const at = blocks.indexOf("work"); if (at >= 0) blocks.splice(at + 1, 0, "motion"); else if (!multipage || page === "home") blocks.splice(1, 0, "motion"); }
  order.motion = () => motion;
  order.extras = () => extrasSection(c, sample);
  if (multipage && page === "contact") blocks.splice(blocks.indexOf("contact"), 0, "extras");
  const main = blocks.map(b => { const html = order[b] ? order[b](k) : ""; return b === "contact" && !hasEmail ? html.replace('id="contact"', 'id="next"') : html; }).join("");
  const body = '<div class="' + design.root + '">' + design.header(k) + '<main id="main">' + main + "</main>" + design.footer(k) + "</div>";
  const title = c.name + (page && page !== "home" ? " / " + (k.intro().title) : " / " + c.headline);
  const css = BASE_CSS + design.css;
  const still = v?.design?.animation === "none" ? reducedMotionCSS(css) : "";
  return '<!doctype html><html lang="en" data-awe-engine="showpiece"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + E(title) + "</title>" +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + design.fonts + '&display=swap">' +
    "<style>" + css + still + "</style></head><body class=\"motion-" + E(v?.design?.animation || "subtle") + "\">" + '<a class="skip" href="#main">Skip to content</a>' +
    (sample ? '<div class="demo">FICTIONAL TEMPLATE DEMO — SAMPLE CONTENT ONLY</div>' : "") + body + "</body></html>";
}

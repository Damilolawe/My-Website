// Connects the showpiece designs to previews, catalog pages and customer sites.
// Pages are script-free; customer media comes only from approved photo IDs.
import { renderShowpiece, showpieceDesigns, showpiecePages } from "./showpiece/index.mjs";
import { templatePageCount } from "./tiers.mjs";

// Stored on new draft inputs. Five-page sites are re-rendered from their saved
// input, so versions saved before this engine existed keep their original design.
export const SHOWPIECE_ENGINE = "showpiece";
export const hasShowpiece = (id) => Object.hasOwn(showpieceDesigns, id);
export const isShowpieceMultipage = (id) => templatePageCount(id) === 5;

const publicHref = (id) => (p) => "/templates/" + id + "/" + p + ".html";
const siteHref = (p) => (p === "home" ? "./" : "./" + p + ".html");

export function renderShowpieceSite(v, options = {}, page = "home") {
  const id = v.template;
  const multipage = isShowpieceMultipage(id);
  const href = options.href || (options.sample ? publicHref(id) : siteHref);
  return renderShowpiece(id, v, {
    sample: !!options.sample,
    assetBase: options.assetBase,
    assetSuffix: options.assetSuffix,
    multipage,
    page: multipage ? (showpiecePages.includes(page) ? page : "home") : undefined,
    href: multipage ? href : undefined,
  });
}

// Published file names for each five-page template, in showpiece page order.
const RUNWAY_FILES = { home: "index.html", features: "research.html", work: "work.html", studio: "studio.html", contact: "journal.html" };
const STUDY_FILES = { home: "index.html", work: "work.html", features: "features.html", studio: "studio.html", contact: "contact.html" };

export function renderShowpieceCustomerPages(v, options = {}) {
  const files = v.template === "runwaymulti" ? RUNWAY_FILES : STUDY_FILES;
  const href = (p) => (p === "home" ? "./" : "./" + files[p]);
  const opts = { assetBase: "/api/assets/", assetSuffix: "", ...options, sample: false, href };
  return Object.fromEntries(showpiecePages.map((p) => [files[p], renderShowpieceSite(v, opts, p)]));
}

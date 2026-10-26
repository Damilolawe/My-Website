import {originalDirections} from "./refero-originals.mjs";
import {freeDesignTemplates} from "./free-designmd.mjs";
import {zipDesigns,zipDesignFor} from "./zip-design-catalog.mjs";
// Central package-to-template eligibility rules shared by the browser and server.
// A tier sets minimum design eligibility; package terms determine deliverables.
export const tiers = Object.freeze([
  { id: "starter", name: "Starter", inquiry: "$75", note: "One beautiful single-page website." },
  { id: "signature", name: "Signature", inquiry: "$150", note: "A complete five-page website with linked navigation." },
  { id: "premium", name: "Premium / AWE Custom", inquiry: "$250+", note: "Bespoke design and development. Tell us your idea for a custom quote." },
]);
const levels = Object.freeze(Object.fromEntries(tiers.map((t, index) => [t.id, index])));
const minimums = Object.freeze({
  index: "starter", daylight: "starter", atlas: "starter",
  terminal: "starter", ledger: "starter", bloom: "starter",
  runwayml: "starter", runwaymulti: "signature",
  nike: "starter", clay: "starter", ferrari: "starter",
  liquidmetal: "starter",
  folio: "starter", still: "starter", afterhours: "starter",
  signal: "starter", orbit: "starter", playbill: "starter",
  monologue: "starter", portraiture: "starter",
  contactsheet: "starter", foundry: "starter",
  arcade: "starter", atelier: "starter", museum: "starter",
  brutalist: "starter", nocturne: "starter",
  ...Object.fromEntries(originalDirections.map(d => [d.id,d.tier])),
  ...Object.fromEntries(freeDesignTemplates.map(d => [d.id,d.tier])),
  ...Object.fromEntries(zipDesigns.map(d => [d.id,d.tier])),
});
// Existing design page counts determine their tier; no templates are expanded or flattened.
// Keep package groupings exclusive; Premium is a bespoke brief, not a template tier.
export const templatePageCount = id => !Object.hasOwn(minimums,id) ? 0 :
  (id === "runwaymulti" || zipDesignFor(id)?.multipage ? 5 : 1);
export const minimumTier = templateId => templatePageCount(templateId) === 5 ? "signature" : templatePageCount(templateId) === 1 ? "starter" : null;
export const tierLevel = id => Object.hasOwn(levels, id) ? levels[id] : -1;
export function packageTier(pkg) {
  if (!pkg) return null;
  if (tierLevel(pkg.tier) !== -1) return pkg.tier;
  if (pkg.testOnly === true) return "premium"; // A scoped QA offer never changes public pricing.
  // Compatibility for existing USD packages before explicit tier metadata was added.
  if (pkg.currency === "usd" && Number.isInteger(pkg.amount) && pkg.amount > 0) {
    return pkg.amount >= 25000 ? "premium" : pkg.amount >= 15000 ? "signature" : "starter";
  }
  return null; // Other currencies need the owner to assign an explicit tier.
}
export function templateFitsTier(templateId, selectedTier) {
  return (selectedTier === "starter" && templatePageCount(templateId) === 1) ||
    (selectedTier === "signature" && templatePageCount(templateId) === 5);
}
export function packageAllowsTemplate(pkg, templateId) {
  const pages = templatePageCount(templateId);
  if (!pages || !pkg) return false;
  // Live packages must never sell a one-page template as a five-page site.
  if (pkg.delivery === "awe-multipage") {
    return packageTier(pkg) === "signature" && pkg.pageCount === 5 && pages === 5 &&
      (!Array.isArray(pkg.allowedTemplates) || pkg.allowedTemplates.includes(templateId));
  }
  // Preserve the restricted, non-public QA offer independently of live tiering.
  if (pkg.testOnly === true) return true;
  return packageTier(pkg) === "starter" && pages === 1 &&
    (pkg.delivery === "awe-hosted" || pkg.delivery == null);
}

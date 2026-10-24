import {originalDirections} from "./refero-originals.mjs";
// Central package-to-template eligibility rules shared by the browser and server.
// A tier sets minimum design eligibility; package terms determine deliverables.
export const tiers = Object.freeze([
  { id: "starter", name: "Starter", inquiry: "$75", note: "A focused, professional starting point." },
  { id: "signature", name: "Signature", inquiry: "$150", note: "More room to express your brand." },
  { id: "premium", name: "Premium", inquiry: "$250+", note: "For more ambitious creative directions." },
]);
const levels = Object.freeze(Object.fromEntries(tiers.map((t, index) => [t.id, index])));
const minimums = Object.freeze({
  index: "starter", daylight: "starter", atlas: "starter",
  terminal: "starter", ledger: "starter", bloom: "starter",
  folio: "signature", still: "signature", afterhours: "signature",
  signal: "signature", orbit: "signature", playbill: "signature",
  monologue: "signature", portraiture: "signature",
  contactsheet: "signature", foundry: "signature",
  arcade: "signature", atelier: "signature", museum: "signature",
  brutalist: "signature", nocturne: "signature",
  ...Object.fromEntries(originalDirections.map(d => [d.id,d.tier])),
});
export const minimumTier = templateId => minimums[templateId] || null;
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
  const minimum = minimumTier(templateId);
  return Boolean(minimum && tierLevel(selectedTier) >= tierLevel(minimum));
}
export function packageAllowsTemplate(pkg, templateId) {
  return pkg?.testOnly === true || templateFitsTier(templateId, packageTier(pkg));
}

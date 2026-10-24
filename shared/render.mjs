import { renderPremium } from "./premium.mjs";
import { renderFolioEditorial } from "./folio-editorial.mjs";
import { normalize } from "./model.mjs";

// Folio uses its own art-directed architecture, but shares normalization,
// customer media IDs, asset delivery, and approval workflows with all templates.
export function renderSite(input, options = {}) {
  const normalized = normalize(input);
  return normalized.template === "folio"
    ? renderFolioEditorial(normalized, options)
    : renderPremium(normalized, options);
}

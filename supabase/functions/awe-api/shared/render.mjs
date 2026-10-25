import { renderPremium } from "./premium.mjs";
import { renderFolioEditorial } from "./folio-editorial.mjs";
import { normalize } from "./model.mjs";
import { applyPremiumStudy } from "./premium-art-direction-35.mjs";
import { applyColorConsistency } from "./color-consistency.mjs";
import {zipDesignFor} from "./zip-design-catalog.mjs";
import {renderZipDesign} from "./zip-design-render.mjs";
import { applyTypographySafety } from "./typography-guard.mjs";

// Folio uses its own art-directed architecture, but shares normalization,
// customer media IDs, asset delivery, and approval workflows with all templates.
export function renderSite(input, options = {}) {
  const normalized = normalize(input);
  if(zipDesignFor(normalized.template))return applyTypographySafety(renderZipDesign(normalized,options), normalized.template);
  const page = normalized.template === "folio"
    ? renderFolioEditorial(normalized, options)
    : renderPremium(normalized, options);
  const upgraded = applyPremiumStudy(page, normalized.template, normalized.content);
  return applyTypographySafety(applyColorConsistency(upgraded, normalized.template, normalized.design), normalized.template);
}

import { renderPremium } from "./premium.mjs";
import { renderFolioEditorial } from "./folio-editorial.mjs";
import { normalize } from "./model.mjs";
import { applyPremiumStudy } from "./premium-art-direction-35.mjs";
import { applyColorConsistency } from "./color-consistency.mjs";
import {zipDesignFor} from "./zip-design-catalog.mjs";
import {renderZipDesign} from "./zip-design-render.mjs";
import { applyTypographySafety } from "./typography-guard.mjs";
import {exactGuideCSSFor} from "./exact-design-css.mjs";

// Preserve authored CSS tokens (including quoted content, descendant selectors and
// calc() spacing) while removing only comments/redundant whitespace. Afterhours'
// unusually rich layered art direction can exceed the strict HTML preview limit
// without changing any visible content, so compact that theme at the final
// rendering step instead of raising the release size budget.
export function compactInlineStyles(html, {preserve = []} = {}) {
  if (typeof html !== "string") return html;
  return html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (_whole, attrs, stylesheet) => {
    // Preserve the literal CSS from uploaded DESIGN.md Quick Start sources.
    // Certain QA checks and customer approvals require the original bytes,
    // and an HTML/CSS size budget must not silently rewrite user-owned guides.
    const protectedTokens = [];
    let safeStyles = stylesheet;
    for (const item of preserve.filter(Boolean)) {
      if (!safeStyles.includes(item)) continue;
      const marker = "__AWE_EXACT_CSS_BLOCK_" + protectedTokens.length + "__";
      safeStyles = safeStyles.replaceAll(item, marker);
      protectedTokens.push({marker, item});
    }
    const out = [];
    let quote = null;
    let whitespace = false;
    for (let i = 0; i < safeStyles.length; i++) {
      const ch = safeStyles[i];
      if (quote) {
        out.push(ch);
        if (ch === "\\") {
          if (i + 1 < safeStyles.length) out.push(safeStyles[++i]);
        } else if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") {
        if (whitespace && out.length && !"{;}".includes(out[out.length - 1])) out.push(" ");
        whitespace = false;
        out.push(ch);
        quote = ch;
        continue;
      }
      if (ch === "/" && safeStyles[i + 1] === "*") {
        const end = safeStyles.indexOf("*/", i + 2);
        if (end === -1) throw new Error("Unterminated CSS comment in template styles");
        i = end + 1;
        continue;
      }
      if (/\s/.test(ch)) { whitespace = true; continue; }
      const previous = out[out.length - 1];
      if (whitespace && out.length && !"{;}".includes(previous) && !"{;}".includes(ch)) out.push(" ");
      whitespace = false;
      if ("{};".includes(ch) && out[out.length - 1] === " ") out.pop();
      if (ch === "}" && out[out.length - 1] === ";") out.pop();
      out.push(ch);
    }
    let compacted = out.join("").trim();
    for (const {marker, item} of protectedTokens) compacted = compacted.replaceAll(marker, item);
    return "<style" + attrs + ">" + compacted + "</style>";
  });
}

// Folio uses its own art-directed architecture, but shares normalization,
// customer media IDs, asset delivery, and approval workflows with all templates.
export function renderSite(input, options = {}) {
  const normalized = normalize(input);
  if(zipDesignFor(normalized.template))return applyTypographySafety(renderZipDesign(normalized,options), normalized.template);
  const page = normalized.template === "folio"
    ? renderFolioEditorial(normalized, options)
    : renderPremium(normalized, options);
  const upgraded = applyPremiumStudy(page, normalized.template, normalized.content);
  const finished = applyTypographySafety(applyColorConsistency(upgraded, normalized.template, normalized.design), normalized.template);
  // Only optimize a design-guide page when its original rendered document
  // is approaching the strict 240,000-character preview limit. This protects
  // the next Refero guide from unexpectedly tripping the size gate as well.
  if (finished.length >= 230000 && exactGuideCSSFor(normalized.template)) {
    return compactInlineStyles(finished, {
      preserve: [
        exactGuideCSSFor(normalized.template),
        "/* Secondary visual QA: scoped legibility adjustments, preserving branding and motion. */"
      ]
    });
  }
  return finished;
}

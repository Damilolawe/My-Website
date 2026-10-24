import {sourceCssA} from "./source-css-a.mjs";
import {sourceCssB} from "./source-css-b.mjs";
import {sourceCssC} from "./source-css-c.mjs";
import {sourceCssD} from "./source-css-d.mjs";
/** Exact (unaltered) :root CSS blocks from the user-uploaded Refero DESIGN.md Quick Start sections.
 * These source token definitions are never paraphrased. The source documents remain private.
 */
export const exactGuideCSS = Object.freeze({...sourceCssA,...sourceCssB,...sourceCssC,...sourceCssD});
export const exactGuideCSSFor = templateId => exactGuideCSS[templateId] || '';

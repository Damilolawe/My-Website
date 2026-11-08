// Shared publishing helpers for the branded preview host, used by the full
// build (build-branded-previews.mjs) and the single-site build (build-one-preview.mjs).
export const stripLegacyAweCredits = html => html
  .replace(/<style\b[^>]*data-awe-credit-style=["']v1["'][^>]*>[\s\S]*?<\/style>/gi, "")
  .replace(/<div\b[^>]*\bid=["']awe-design-credit["'][^>]*>[\s\S]*?<\/div>/gi, "")
  .replace(/<a\b(?=[^>]*class=["'][^"']*\bawe-(?:credit|signature)\b)[^>]*>[\s\S]*?<\/a>/gi, "")
  .replace(/<p\b[^>]*>\s*Designed by\s*<a\b[^>]*href=["']https:\/\/aweconcepts\.com\/?["'][^>]*>[\s\S]*?<\/a>\s*<\/p>/gi, "")
  .replace(/<footer\b[^>]*class=["'][^"']*\bawe-watermark\b[^"']*["'][^>]*>[\s\S]*?<\/footer>/gi, "");

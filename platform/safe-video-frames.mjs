/* Only the exact sanitized, script-free video iframe markup authored by the
 * Awe renderers is permitted. No srcdoc, arbitrary hosts, event attributes,
 * custom sandbox escapes or user-authored iframe HTML can pass this allowlist.
 */
const TRUSTED_FRAME = /^<iframe src="https:\/\/(?:www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}|player\.vimeo\.com\/video\/[0-9]{1,15})" loading="lazy" title="[^"<>]{1,200}" referrerpolicy="strict-origin-when-cross-origin" allow="(?:encrypted-media; picture-in-picture|fullscreen; encrypted-media; picture-in-picture|fullscreen; picture-in-picture)" allowfullscreen><\/iframe>$/i;
export function hasUnsafeExecutableMarkup(html) {
  if (typeof html !== "string") return true;
  const remaining = html.replace(/<iframe\b[^>]{0,1500}><\/iframe>/gi, tag =>
    TRUSTED_FRAME.test(tag) ? "" : tag);
  return /<(?:script|iframe|object|embed|base)\b|\bon(?:load|error|click)\s*=|\bsrcdoc\s*=|javascript:/i.test(remaining);
}

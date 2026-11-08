// Independent outbound-link policy for preview sites.
//
// Previews may link to Awe Concepts, maps, social profiles and independent
// third-party booking / ordering / ticketing platforms. Any other absolute
// link is treated as a link to the business's own website and is forbidden.
// This module only DETECTS links; it never rewrites them, so a failing check
// has to be fixed in the site's source.
const allowed = [
  "aweconcepts.com",
  // maps
  "maps.app.goo.gl", "goo.gl", "maps.google.com", "maps.apple.com",
  // social and review profiles
  "instagram.com", "facebook.com", "tiktok.com", "youtube.com", "youtu.be", "threads.net",
  "linkedin.com", "x.com", "twitter.com", "pinterest.com", "yelp.com", "behance.net", "vimeo.com",
  // reservations, appointments, tickets
  "resy.com", "opentable.com", "exploretock.com", "sevenrooms.com", "eventbrite.com", "dice.fm",
  "as.me", "acuityscheduling.com", "calendly.com", "vagaro.com", "booksy.com", "styleseat.com",
  "mindbodyonline.com", "momence.com", "glossgenius.com", "fresha.com", "book.squareup.com",
  "nysbdc.ecenterdirect.com",
  // independent ordering platforms
  "order.online", "doordash.com", "ubereats.com", "grubhub.com", "seamless.com", "toasttab.com",
  "ezcater.com", "caviar.com", "chownow.com", "ddsemenu.com", "slicelife.com", "toast.app", "bakesy.shop",
  // app stores and community platforms
  "apps.apple.com", "play.google.com", "discord.gg",
  // independent press coverage
  "forbes.com", "secretnyc.co", "timeout.com", "eater.com", "nytimes.com", "qns.com", "queenspost.com", "gbnews24.com",
  "hobokengirl.com", "destinationjerseycity.com", "jcfamilies.com", "brooklynpaper.com", "bkmag.com", "grubstreet.com",
  "theinfatuation.com", "patch.com", "gothamist.com", "amny.com", "newyorker.com", "nypost.com", "brownstoner.com",
  "untappedcities.com", "michelin.com", "guide.michelin.com", "bonappetit.com", "foodandwine.com", "thrillist.com",
];
const domainIs = (host, suffix) => host === suffix || host.endsWith("." + suffix);

export function isAllowedOutbound(href) {
  if (!/^https?:\/\//i.test(href)) return true; // relative, anchors, tel:, mailto:
  let url;
  try { url = new URL(href.replace(/&amp;/g, "&")); } catch { return false; }
  const host = url.hostname.toLowerCase().replace(/^(www|m)\./, "");
  if (host === "google.com" && url.pathname.startsWith("/maps")) return true;
  return allowed.some(d => domainIs(host, d));
}

export function findOriginalSiteLinks(html) {
  const found = [];
  for (const m of html.matchAll(/<a\b[^>]*?\bhref\s*=\s*(["'])(.*?)\1/gi)) {
    if (!isAllowedOutbound(m[2])) found.push(m[2]);
  }
  return found;
}

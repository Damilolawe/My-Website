import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const slugs = ["tbili", "la-mestiza", "santuario-cafe", "le-loup-cafe", "duro-market", "the-block-coffee", "splendid-cafe", "cafe-aroma-y-sabor", "fiolicchia-bakery", "hairby-matty", "from-duo", "studio-and-story", "underscore-glasserie", "atma-yoga", "four-winds-games", "cultiva-cafe", "hots-coffee", "nena-sweets-cakes", "bier-cheese", "rachels-handmade-cookies", "dovetail-bakery", "smor-carroll-gardens", "caputo-bagels", "swaines-bk", "vibra-bronx", "cafe-mia", "problem-baker-parkslope", "atelier-artist", "prema-fulton", "three-coffee-halletts", "loved-ones-coffee", "worksbynet", "studio-shipley", "hanare-spa", "tiny-topiary", "kora-bakery", "old-mill-cafe", "birdee", "cafe-pr", "latte-da", "studio-ephemera", "loove-labs", "bem-books", "one-two-one-cafe", "chique-collective", "sadie-s-bakery", "evelyn-bar-and-kitchen", "aoko-matcha", "kyuramen-express", "wolf-forest-cafe", "kee-s-chocolates", "route-66-smokehouse", "al-aqusa-restaurant", "bensonhurst-bagels-and-deli", "grizzly-coffee-and-tea-house", "guisados-maria", "weng-s-garden", "gloria", "isla-and-co", "kings-co-imperial", "blanca-s-bakery", "brooklyn-improv", "dumbo-oyster-bar", "sugar-pop-candy-bar-pinkberry", "ssrp-ramen", "good-taste", "halal-street-eatz", "herbie-s-burgers", "kuttley-house", "lima-wok-and-bowl", "lucky-zhang-s-restaurant", "sur-1st-cafe", "marbre", "anna-bella-pizza-cafe", "kampos-taverna", "bk-halal-grill", "sweetness-usa", "jannat-aden-restaurant", "janet-s-pizza", "brooklyn-billiards", "east-wang", "good-taste-restaurant-168", "jalopy-theatre", "l-oranaise", "surf-city-pizzeria-2", "la-bagel-delight", "senzu-juice-and-smoothies", "shashlik-uz-n1", "emerald-cafe", "pies-n-thighs", "rick-s-restaurant", "wayne-and-sons", "argo", "cali-tajadas-bakery", "kyan-cafe", "guda", "loco-cafe", "luana-s-tavern", "maki", "mr-fire-bar-and-grill", "turbine-cafe", "leanly-ii-chinese-food", "miss-bagel", "fu-ying", "rb-bakery-and-cafe", "cafe-69-sports-bar", "desi-zaika", "el-puerto-de-mexico-restaurant", "adda-kitchen", "space-54", "jamaica-fried-chicken", "pa-nash-eurosoul", "18-steps-dengdeng-noodles", "kostantina-frozen-yogurt", "notable", "cloud-catering", "magic-nutrition", "ato-kitchens", "my-life-nutrition", "minitalia-pizzeria", "baby-cafe", "chianti-sports-bar-and-restaurant-sugar-and-cake", "julieta-taberna", "royal-canton-seafood-palace", "wan-chong-shan-xia", "wei-zhi-yuan", "madame-sousou", "om-wok", "restaurante-la-plaza-de-tulcingo", "oreas-gourmet-juice-bar", "fresh-pizza-and-pasta", "equis-pica-pollo-de-verdad", "rey-tacos", "jamaica-fry-chicken", "smash-time-burger-co", "your-choice-halal-chicken-and-pizza", "cemitas-cholula-restaurant", "socotra-restaurant", "santinos-slices-and-italian-ices", "orion-s", "baker-studio", "uncorked-wines", "below-sro", "greens-goods-grill", "pilates-addiction", "petaled", "house-of-amrut", "kitty-o-shea-s", "barchino", "hudson-golf", "hashi-market", "dubu-hana", "dutch-s-express", "vicoletto", "cana-coffee-and-bakery", "jane-s-matcha"];

test("large-scale prospect batches are complete public concepts", async () => {
  for (const slug of slugs) {
    const source = await readFile(`preview/${slug}/index.html`, "utf8");
    const css = await readFile(`preview/${slug}/styles.css`, "utf8");
    const output = await readFile(`branded-previews/public/${slug}/index.html`, "utf8");
    assert.match(source, /(?:Independent [^<]{0,60}concept|website concept|concept for)/i);
    assert.match(source, /<meta name="viewport"/i);
    assert.match(source, /<meta name="robots" content="noindex,nofollow">/i);
    assert.match(css, /prefers-reduced-motion/);
    assert.doesNotMatch(source, /Illustrative stock photography|Lorem ipsum|placeholder/i);
    assert.match(output, /awe-design-credit/);
    assert.match(output, /https:\/\/aweconcepts\.com/);
    assert.match(output, /styles\.css\?v=motion-20261102/);
    assert.match(output, /site\.js\?v=motion-20261102/);
  }
});


test("researched Gloria and Café Mia pages are preserved in public preview output", async () => {
  const cases = [
    { slug: "gloria", marker: "Gloria", brand: "gloria-dining" },
    { slug: "cafe-mia", marker: "Café Mia", brand: "cafe-page" },
    { slug: "om-wok", marker: "Om Wok", brand: "om-inner" },
    { slug: "jalopy-theatre", marker: "Jalopy", brand: "detail-hero" },
    { slug: "adda-kitchen", marker: "Adda Kitchen", brand: "adda-inner" },
    { slug: "petaled", marker: "PETALED", brand: "detail-block" },
    { slug: "pilates-addiction", marker: "Pilates Addiction", brand: "detail-band" },
    { slug: "dumbo-oyster-bar", marker: "Dumbo Oyster Bar", brand: "oyster-inner-hero" },
    { slug: "baker-studio", marker: "Baker Studio", brand: "inner-hero" },
    { slug: "jane-s-matcha", marker: "Jane", brand: "inner-hero" },
    { slug: "aoko-matcha", marker: "Aokō", brand: "subhero" }
  ];
  for (const {slug, marker, brand} of cases) {
    for (const kind of ["story", "services", "journal", "visit"]) {
      const authored = await readFile(`preview/${slug}/${kind}.html`, "utf8");
      const output = await readFile(`branded-previews/public/${slug}/${kind}.html`, "utf8");
      assert.match(authored, new RegExp(marker, "i"), `${slug}/${kind} needs its own identity`);
      assert.ok(output.includes(brand), `${slug}/${kind} must use bespoke layout`);
      assert.match(output, /data-awe-design-credit="v1"/, `${slug}/${kind} must retain footer`);
      assert.doesNotMatch(output, /This independent design concept is shaped around the character of the business/i);
    }
  }
});

test("generated fallback pages reuse a site's authored brand tokens", async () => {
  const css = await readFile("preview/isla-and-co/styles.css", "utf8");
  const page = await readFile("branded-previews/public/isla-and-co/story.html", "utf8");
  const accent = css.match(/--accent:([^;}]+)/)?.[1];
  assert.ok(accent, "Generated fallback must start from a branded source palette");
  assert.ok(page.includes("--accent:" + accent), "Fallback page must inherit the source accent");
  assert.match(page, /--headline:/);
});

test("PETALED and Pilates Addiction homepages depict their real disciplines, not flowers or meditation", async () => {
  const petaled = await readFile("preview/petaled/index.html", "utf8");
  const addiction = await readFile("preview/pilates-addiction/index.html", "utf8");
  assert.match(petaled, /Springboard Pilates/i);
  assert.match(petaled, /Kourtney Patterson/);
  assert.doesNotMatch(petaled, /floral concept|FLOWERS IN FOCUS|photo-1457089328109/i);
  assert.match(addiction, /November 8, 2026/);
  assert.match(addiction, /Aurum/);
  assert.doesNotMatch(addiction, /photo-1506126613408|WELLNESS IN FOCUS/i);
});

test("two distinct matcha shops have different photography and brand architecture", async () => {
  const jane = await readFile("preview/jane-s-matcha/index.html", "utf8");
  const aoko = await readFile("preview/aoko-matcha/index.html", "utf8");
  assert.match(jane, /Jane Yang/);
  assert.match(aoko, /five-intensity|five-shade|five shades|five-intensity/i);
  assert.doesNotMatch(jane + aoko, /photo-1515823064-d6e0c04616a7/);
  const photo = html => html.match(/<img[^>]+src="([^"]+)"/)?.[1];
  assert.notEqual(photo(jane), photo(aoko), "Both matcha shops cannot share the same hero image");
  assert.match(jane, /class="hero-image"/);
  assert.match(aoko, /class="shades"/);
});

test("QA filters only intentionally offscreen skip-to-content links", async () => {
  const script = await readFile("scripts/qa-mobile-previews.mjs", "utf8");
  assert.match(script, /el\.tagName === 'A' && r\.right <= 0/);
  assert.match(script, /skip\\s\+to/);
  assert.match(script, /r\.right > document\.documentElement\.clientWidth \+ 4/);
  const css = await readFile("preview/bem-books/styles.css", "utf8");
  assert.match(css, /grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /\.hero-copy,\.hero-image\{min-width:0;max-width:100%;width:100%\}/);
});

test("Pilates Addiction and PETALED use different licensed photo collections", async () => {
  const petaled = await readFile("preview/petaled/index.html", "utf8");
  const addiction = await readFile("preview/pilates-addiction/index.html", "utf8");
  const imageIds = html => [...html.matchAll(/images\.unsplash\.com\/(photo-[^?" ]+)/g)].map(x => x[1]);
  const shared = imageIds(petaled).filter(x => imageIds(addiction).includes(x));
  assert.deepEqual(shared, [], "Different studios should not share the same stock photographs");
  assert.match(addiction, /photo-1717500251997-80b234166d00/);
});

test("Dumbo Oyster Bar's complete reworked layout has matching standalone CSS", async () => {
  const html = await readFile("preview/dumbo-oyster-bar/index.html", "utf8");
  const css = await readFile("preview/dumbo-oyster-bar/styles.css", "utf8");
  const classes = ["oyster-site", "oyster-header", "oyster-nav", "oyster-cover", "oyster-photo-wrap", "oyster-story-grid", "oyster-inner-hero"];
  for (const c of classes) {
    assert.match(html + css, new RegExp(c), "Dumbo must expose " + c);
    assert.ok(css.includes("." + c), "Critical CSS selector missing: " + c);
  }
  assert.doesNotMatch(css, /\.variant-11 \.hero/);
});

test("Baker Studio includes real Hoboken medical-and-wellness details, not a generic fitness template", async () => {
  const html = await readFile("preview/baker-studio/index.html", "utf8");
  const css = await readFile("preview/baker-studio/styles.css", "utf8");
  assert.match(html, /1450 Garden Street/);
  assert.match(html, /Baker Health/);
  assert.match(html, /yoga, Pilates, meditation and fitness/i);
  assert.ok(css.includes(".inner-hero"));
  assert.ok(css.includes(".hero-img"));
});

test("browser QA catches an unrelated stylesheet despite successful CSS network loading", async () => {
  const script = await readFile("scripts/qa-mobile-previews.mjs", "utf8");
  assert.match(script, /unstyled page: stylesheet selectors do not match/);
  assert.match(script, /styledCount <= 1/);
  assert.match(script, /document\.styleSheets/);
});

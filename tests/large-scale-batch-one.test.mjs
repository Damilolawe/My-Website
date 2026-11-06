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
    { slug: "adda-kitchen", marker: "Adda Kitchen", brand: "adda-inner" }
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
  const css = await readFile("preview/dumbo-oyster-bar/styles.css", "utf8");
  const page = await readFile("branded-previews/public/dumbo-oyster-bar/story.html", "utf8");
  assert.match(css, /--accent:#9f522f/);
  assert.match(page, /--accent:#9f522f/);
  assert.match(page, /--headline:/);
});

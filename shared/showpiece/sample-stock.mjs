/*
 * Curated, brand-neutral Unsplash Free photos for FICTIONAL public demos.
 * Never call this module for customer pages, invoices, drafts or site exports.
 * Photo IDs are from established Unsplash public image URLs already used in
 * Awe Concepts preview concepts, plus neutral editorial photography.
 * The image subject is illustrative: no stock subject is identified as a client.
 */
const bank = Object.freeze({
  food: ["photo-1504674900247-0877df9cc836","photo-1414235077428-338989a2e8c0","photo-1551183053-bf91a1d81141","photo-1552566626-52f8b828add9"],
  cafe: ["photo-1498804103079-a6351b050096","photo-1511081692775-05d0f180a065","photo-1554118811-1e0d58224f24","photo-1481833761820-0509d3217039"],
  bakery: ["photo-1517433670267-08bbd4be890f","photo-1509440159596-0249088772ff","photo-1527515545081-5db817172677","photo-1612240498936-65f5101365d2"],
  flower: ["photo-1754257319937-d6a4ecbee06d","photo-1754258167278-4a91a38a4bd9","photo-1513519245088-0e12902e5a38","photo-1767551715049-fcd9b818b2d4"],
  beauty: ["photo-1562322140-8baeececf3df","photo-1522337660859-02fbefca4702","photo-1560066984-138dadb4c035","photo-1540555700478-4be289fbecef"],
  wellness: ["photo-1540555700478-4be289fbecef","photo-1717500251997-80b234166d00","photo-1747239069226-55382c570116","photo-1513519245088-0e12902e5a38"],
  fashion: ["photo-1515372039744-b8f02a3ae446","photo-1441986300917-64674bd600d8","photo-1490481651871-ab68de25d43d","photo-1523779917675-b6ed3a42a561"],
  photo: ["photo-1718964312487-d5e3d56fd2ce","photo-1630706437030-34c03d3e3ff4","photo-1780260412556-b47b849785dd","photo-1771072428050-1492abb58f4a"],
  art: ["photo-1513364776144-60967b0f800f","photo-1565193566173-7a0ee3dbe261","photo-1762062087175-0de79d49bf6c","photo-1776851629268-c878a7978c61"],
  gallery: ["photo-1549490349-8643362247b5","photo-1762062087175-0de79d49bf6c","photo-1513364776144-60967b0f800f","photo-1776851629268-c878a7978c61"],
  athlete: ["photo-1552674605-db6ffd4facb5","photo-1461896836934-ffe607ba8211","photo-1662692990101-ba8836519587","photo-1500534623283-312aade485b7"],
  sport: ["photo-1662692990101-ba8836519587","photo-1552674605-db6ffd4facb5","photo-1461896836934-ffe607ba8211","photo-1492684223066-81342ee5ff30"],
  automotive: ["photo-1494905998402-395d579af36f","photo-1500534623283-312aade485b7","photo-1441148345475-03a2e82f9719","photo-1486406146926-c627a92ad1ab"],
  interiors: ["photo-1460353581641-37baddab0fa2","photo-1523779917675-b6ed3a42a561","photo-1481833761820-0509d3217039","photo-1517248135467-4c7edcad34c4"],
  architecture: ["photo-1486406146926-c627a92ad1ab","photo-1507525428034-b723cf961d3e","photo-1497366754035-f200968a6e72","photo-1473448912268-2022ce9509d8"],
  landscape: ["photo-1500534623283-312aade485b7","photo-1473448912268-2022ce9509d8","photo-1488646953014-85cb44e25828","photo-1759503076789-f35229bf5123"],
  music: ["photo-1470225620780-dba8ba36b745","photo-1516280440614-37939bbacd81","photo-1492684223066-81342ee5ff30","photo-1531058020387-3be344556be6"],
  film: ["photo-1759503076789-f35229bf5123","photo-1630706437030-34c03d3e3ff4","photo-1774016591378-925354a456ee","photo-1718964312487-d5e3d56fd2ce"],
  gaming: ["photo-1610890716171-6b1bb98ffd09","photo-1542751371-adc38448a05e","photo-1601850494422-3cf14624b0b3","photo-1534778101976-62847782c213"],
  tech: ["photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c","photo-1497366811353-6870744d04b2","photo-1770734360042-676ef707d022"],
  business: ["photo-1497366811353-6870744d04b2","photo-1519389950473-47ba0277781c","photo-1763850407750-4671769329c1","photo-1507525428034-b723cf961d3e"],
  stationery: ["photo-1497366754035-f200968a6e72","photo-1763850407750-4671769329c1","photo-1513364776144-60967b0f800f","photo-1473448912268-2022ce9509d8"],
  games: ["photo-1610890716171-6b1bb98ffd09","photo-1542751371-adc38448a05e","photo-1601850494422-3cf14624b0b3","photo-1534778101976-62847782c213"],
  city: ["photo-1486406146926-c627a92ad1ab","photo-1500534623283-312aade485b7","photo-1494905998402-395d579af36f","photo-1497366811353-6870744d04b2"],
  craft: ["photo-1565193566173-7a0ee3dbe261","photo-1513364776144-60967b0f800f","photo-1762062087175-0de79d49bf6c","photo-1767551715049-fcd9b818b2d4"],
  abstract: ["photo-1771072428050-1492abb58f4a","photo-1780260412556-b47b849785dd","photo-1763850407750-4671769329c1","photo-1776851629268-c878a7978c61"],
});

const groups = [
  ["bakery", /\b(bakery|pastry|pastries|bread|cake|croissant|cookie|sugarhouse|sourdough|patisserie)\b/i],
  ["cafe", /\b(coffee|cafe|café|barista|espresso|roastery|latte|matcha|tea house)\b/i],
  ["food", /\b(restaurant|bistro|dining|kitchen|dishes|menu|cuisine|steak|pizza|burger|food|chef|brunch|tarte|frites)\b/i],
  ["flower", /\b(floral|flower|bloom|botanical|florist|bouquet|garden|plant shop|nursery|herbarium)\b/i],
  ["beauty", /\b(salon|hair|barber|skincare|makeup|nail|beauty|stylist)\b/i],
  ["wellness", /\b(spa|wellness|pilates|yoga|meditation|relaxation|self-care|retreat)\b/i],
  ["fashion", /\b(fashion|apparel|couture|lookbook|atelier|wardrobe|runway|clothing|garment|dress|collection|model casting|streetwear)\b/i],
  ["photo", /\b(photography|photographer|portrait|contact sheet|photo essay|photojournal|camera|film negative)\b/i],
  ["gallery", /\b(gallery|museum|exhibition|fine art|painting|canvas|sculpture|oil on linen|curator)\b/i],
  ["craft", /\b(pottery|ceramic|woodwork|craft|workshop|handmade|printmaking|letterpress|artisan|furniture studio)\b/i],
  ["film", /\b(filmmaker|cinematic|film studio|cinema|screenplay|theatre|theater|actor|stage|movie|reel|short film)\b/i],
  ["music", /\b(music|concert|radio|on air|sound|audio|band|musician|festival|gig|recording|podcast)\b/i],
  ["athlete", /\b(running|runner|training|athletics|running shoe|sneaker|sportswear|race day|football|fitness|gym)\b/i],
  ["sport", /\b(golf|stadium|sports|court|cycling club|soccer|basketball)\b/i],
  ["automotive", /\b(car|auto|motorsport|racing|engine|vehicle|garage|highway|roadster|driving|pit lane|grand touring)\b/i],
  ["games", /\b(board game|game night|tabletop|arcade|retro game|game console|video game|gaming)\b/i],
  ["interiors", /\b(interior|home decor|furniture|living room|hotel|hospitality|boutique hotel|space design)\b/i],
  ["architecture", /\b(architect|building|structure|real estate|property|construction|urban plan|blueprint|architecture)\b/i],
  ["landscape", /\b(nature|landscape|mountain|outdoor|travel|adventure|hike|coast|countryside|road trip|skyline)\b/i],
  ["city", /\b(courier|delivery|bicycle|transport|transit|city|urban|neighbourhood|neighborhood|street)\b/i],
  ["stationery", /\b(note|journal|writing|publishing|editorial|book|stationery|paper|print|news|press|magazine)\b/i],
  ["tech", /\b(ai|software|database|platform|technology|code|data|developer|internet|saas|product design|app|digital|automation|cyber|search engine|security)\b/i],
  ["business", /\b(finance|invest|bank|business|accounting|budget|wealth|payment|consult|startup|workspace|marketing|strategy|founder|team)\b/i],
  ["art", /\b(design|creative|illustration|graphic|artist|studio|typography|visual)\b/i]
];

// These public sample site IDs need a visual category that cannot be reliably
// inferred from their often intentionally abstract names.
const categoryById = Object.freeze({
  "nike":"athlete", "ferrari":"automotive", "md-bmw":"automotive",
  "md-bmw-m":"automotive","md-bugatti":"automotive","md-lamborghini":"automotive",
  "md-renault":"food","md-nintendo-2001":"gaming","md-playstation":"gaming",
  "md-dji":"landscape","md-airbnb":"interiors","md-shopify":"interiors",
  "md-mercury":"business","md-nvidia":"tech","md-oura":"wellness",
  "md-pinterest":"photo","md-dell-1996":"tech","runwayml":"film",
  "runwaymulti":"film","contactsheet":"photo","portraiture":"photo",
  "atelier":"fashion","nocturne":"fashion","foundry":"craft","bloom":"flower",
  "playbill":"film","monologue":"film","afterhours":"film","folio":"photo",
  "museum":"gallery","still":"art","ledger":"business","terminal":"tech",
  "orbit":"tech","atlas":"architecture","brutalist":"art","daylight":"craft"
});
const chooseCategory = (design) => {
  if (categoryById[design.id]) return categoryById[design.id];
  const d = design.demo || {};
  const identity = [d.name,d.heroLabel,d.headline,d.bio].filter(Boolean).join(" ");
  for (const [category,re] of groups) if (re.test(identity)) return category;
  const details = [...(d.cards||[]),...(d.services||[])].map(x=>[x.title,x.description].join(" ")).join(" ");
  for (const [category,re] of groups) if (re.test(details)) return category;
  return "abstract";
};

export function demoStockPhoto(design, index = 0) {
  const category = chooseCategory(design);
  const photos = bank[category] || bank.abstract;
  const photo = photos[((index % photos.length) + photos.length) % photos.length];
  const position = index % 3 === 1 ? "center 38%" : index % 3 === 2 ? "center 60%" : "center";
  const descriptor = ({photo:"documentary",athlete:"sports",tech:"technology",cafe:"coffee",flower:"floral",food:"culinary",automotive:"automotive",abstract:"editorial"}[category] || category) + " photograph";
  return '<img class="awe-demo-stock" src="https://images.unsplash.com/'+photo+
    '?auto=format&amp;fit=crop&amp;w=1000&amp;q=78" alt="Illustrative '+descriptor+
    ' for a fictional website demo" loading="'+(index ? "lazy" : "eager")+
    '" decoding="async" style="object-position:'+position+'">';
}

export const DEMO_STOCK_CSS = '.awe-demo-stock{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;background:#e2e5e6;min-height:0}.awe-demo-stock:not([src]){display:none}@media(max-width:640px){.awe-demo-stock{aspect-ratio:5/4}}';

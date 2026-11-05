import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'preview';
const SHARED = await readFile('preview/prospect-shared/site.js', 'utf8');
const { existsSync } = await import('node:fs');
const decodeHtml = x => { let value=String(x ?? ''); for(let i=0;i<6;i++){const next=value.replace(/&(?:amp|#38);/gi,'&').replace(/&(?:quot|#34);/gi,'"').replace(/&#(?:39|x27);/gi,"'").replace(/&(?:lt|#60);/gi,'<').replace(/&(?:gt|#62);/gi,'>'); if(next===value)break; value=next;} return value; };
const escapeHtml = x => String(x ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const hash = s => [...s].reduce((n,c) => (Math.imul(n,33)+c.charCodeAt(0))>>>0,5381);
const image = id => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1600&q=85';
const imgs = {
  matcha:['photo-1515823064-d6e0c04616a7','photo-1515823064-d6e0c04616a7','photo-1515823064-d6e0c04616a7','photo-1515823064-d6e0c04616a7'],
  coffee:['photo-1495474472287-4d71bcdd2085','photo-1442512595331-e89e73853f31','photo-1501339847302-ac426a4a7cbb','photo-1521017432531-fbd92d768814'],
  bakery:['photo-1509440159596-0249088772ff','photo-1484723091739-30a097e8f929','photo-1509440159596-0249088772ff','photo-1555507036-ab1f4038808a'],
  sweets:['photo-1578985545062-69928b1d9587','photo-1488477181946-6428a0291777','photo-1551024506-0bccd828d307','photo-1563805042-7684c019e1cb'],
  restaurant:['photo-1517248135467-4c7edcad34c4','photo-1414235077428-338989a2e8c0','photo-1559339352-11d035aa65de','photo-1547592180-85f173990554'],
  pizza:['photo-1513104890138-7c749659a591','photo-1579751626657-72bc17010498','photo-1565299624946-b28f40a0ae38','photo-1593560708920-61dd98c46a4e'],
  japanese:['photo-1569718212165-3a8278d5f624','photo-1579871494447-9811cf80d66c','photo-1555126634-323283e090fa','photo-1519984388953-d2406bc725e1'],
  asian:['photo-1563245372-f21724e3856d','photo-1546069901-ba9599a7e63c','photo-1552566626-52f8b828add9','photo-1512058564366-18510be2db19'],
  mexican:['photo-1551504734-5ee1c4a1479b','photo-1565299585323-38d6b0865b47','photo-1552332386-f8dd00dc2f85','photo-1547592166-23ac45744acd'],
  burger:['photo-1568901346375-23c9450c58cd','photo-1550547660-d9450f859349','photo-1571091718767-18b5b1457add','photo-1551782450-a2132b4ba21d'],
  bar:['photo-1514933651103-005eec06c04b','photo-1470337458703-46ad1756a187','photo-1470337458703-46ad1756a187','photo-1515003197210-e0cd71810b5f'],
  wellness:['photo-1544367567-0f2fcb009e0b','photo-1540555700478-4be289fbecef','photo-1518611012118-696072aa579a','photo-1506126613408-eca07ce68773'],
  creative:['photo-1513364776144-60967b0f800f','photo-1497366811353-6870744d04b2','photo-1542038784456-1ea8e935640e','photo-1503602642458-232111445657'],
  retail:['photo-1441986300917-64674bd600d8','photo-1473186578172-c141e6798cf4','photo-1490481651871-ab68de25d43d','photo-1481437156560-3205f6a55735'],
  entertainment:['photo-1470225620780-dba8ba36b745','photo-1506157786151-b8491531f063','photo-1516280440614-37939bbacd81','photo-1492684223066-81342ee5ff30'],
  flowers:['photo-1490750967868-88aa4486c946','photo-1457089328109-e5d9bd499191','photo-1487070183336-b863922373d4','photo-1468327768560-75b778cbb551']
};
const palettes = {
  matcha:[['#e8efdf','#263a2b','#688a45','#72846a'],['#203c2e','#f1f4e4','#a3c575','#b0c5a5'],['#f1f1e1','#29412d','#8da94f','#6d806b']],
  coffee:[['#f6efe4','#37251d','#ae482b','#6b5a51'],['#161e1b','#f4eedf','#becc8b','#a7aaa0'],['#e7d5bd','#2a251f','#6f4429','#75675c']],
  bakery:[['#fff2df','#4b281f','#d1593a','#8b6d57'],['#e5d5b2','#2a251e','#946733','#60574d'],['#40251f','#ffebd2','#e8a35b','#cfb9a8']],
  sweets:[['#fbebf1','#47273b','#b64078','#8c6177'],['#4a2146','#fff0df','#d992b3','#dfbed0'],['#f6dbbb','#623c44','#db5971','#866067']],
  restaurant:[['#181e1d','#f9f1e6','#c4a369','#aaa9a2'],['#f1e5cf','#26392e','#9f522f','#6b6c5b'],['#281d21','#fff0e1','#f0b67d','#b8aaaa']],
  pizza:[['#f4e6c5','#421f1d','#c23b30','#73645c'],['#2e4236','#fff4dc','#ebc36d','#c3c4aa'],['#fbf4eb','#4b2521','#e65c33','#826b64']],
  japanese:[['#171b23','#f0e9db','#c15e49','#ada8a1'],['#f0e5d8','#292d29','#9a3e36','#786e60'],['#1b3330','#faf1d9','#bbbd8b','#b0c1b0']],
  asian:[['#f1e6cd','#3a3026','#ba4c2c','#817261'],['#25252a','#f7f3eb','#c48763','#a5a0a0'],['#dce0d3','#2b352b','#a05b38','#6a796a']],
  mexican:[['#f7dfb5','#493528','#d45436','#86715d'],['#254841','#f1e4bd','#dfaa52','#b8c7ad'],['#e8bba0','#392821','#a43a26','#706155']],
  burger:[['#1b2633','#fff2d4','#ebaa40','#b8b4a5'],['#f5e6c6','#322b27','#dc4d31','#80715e'],['#2c3029','#fff0d7','#d7ac63','#b9b7a7']],
  bar:[['#171b22','#f3ebd8','#d5a86a','#adaeaf'],['#301e28','#f5e4cf','#bc7177','#c8abab'],['#eae0d7','#2b272a','#8f5a42','#786a68']],
  wellness:[['#e7e9df','#344a40','#9f9270','#7c8982'],['#edf1e4','#2c3730','#a56e54','#828a7e'],['#243a31','#ecf0d8','#a2ad75','#b6c2b5']],
  creative:[['#e8edf4','#1f3454','#df5a3e','#667b94'],['#222d32','#f5eee6','#c4afed','#adb8b8'],['#e6d5ca','#24282f','#c26349','#827d79']],
  retail:[['#f5ebe3','#313137','#a05c50','#828080'],['#1a2428','#f4e6dc','#c3d8b5','#aaaeb0'],['#ebe5db','#2d302b','#a57447','#7e817b']],
  entertainment:[['#1d1942','#f5e9fb','#f08c6b','#b8a1cc'],['#101e2b','#f9eccc','#79bcde','#b0bbc4'],['#f2ddc2','#322831','#d75f4a','#746c6d']],
  flowers:[['#f1e5da','#314d3d','#bd7487','#758575'],['#24392e','#fae8de','#e5b1c5','#a5b9ab'],['#fbf0e1','#463a39','#bd774f','#827773']]
};
const descriptors = {
  matcha:{line:['A greener kind of ritual.','Made for the matcha moment.','Slow down. Sip something green.','A little calm in every cup.'],intro:'A matcha-first concept celebrating green tea, careful preparation and everyday rituals.',cards:[['The matcha','Space to showcase verified matcha drinks and preparation.'],['The ritual','A thoughtful introduction to the atmosphere and experience.'],['Find us','A simple path to the storefront.']],terms:['MATCHA','GREEN TEA','THE RITUAL']},
  coffee:{line:['A daily ritual, made your own.','Good days start somewhere.','Meet me over something warm.','Find a moment worth keeping.'],intro:'Coffee, conversation and the in-between moments deserve an inviting place online.',cards:[['The ritual','A first look at the drinks, the energy and the moments that bring people together.'],['A place to pause','A visual introduction designed to feel as welcoming as a familiar neighborhood stop.'],['Find your way','An easy path from discovery to the front door.']],terms:['COFFEE','COMMUNITY','MORNINGS']},
  bakery:{line:['Made for the good part of the day.','Good things take shape here.','A little more to look forward to.','The neighborhood deserves a treat.'],intro:'A warm, tactile digital home built around the pleasure of discovering a neighborhood bakery.',cards:[['The bake','Room to spotlight the bakery’s signature goods as details are confirmed.'],['Little moments','An inviting first impression, from everyday visits to special occasions.'],['Stop by','Practical location details without the clutter.']],terms:['BAKED','FRESH','LOCAL']},
  sweets:{line:['Make room for something sweet.','Worth celebrating the little things.','A sweet spot in the city.','The good part, in every detail.'],intro:'A playful visual identity with room to show sweets, gifting and the joy of an everyday treat.',cards:[['The treats','A future home for verified flavors, favorites and seasonal offerings.'],['The occasion','Make the small celebrations feel just as special as the big ones.'],['The visit','Everything guests need to find the storefront.']],terms:['SWEET','CELEBRATE','DISCOVER']},
  restaurant:{line:['There is always room at the table.','Make tonight a good one.','Come curious. Leave inspired.','Your next favorite table awaits.'],intro:'A restaurant concept led by atmosphere, a clear food story and an effortless route to the door.',cards:[['The table','Introduce the dining experience through a generous editorial layout.'],['The flavors','A dedicated place for verified menus and updates when supplied.'],['The neighborhood','Help people turn interest into a real visit.']],terms:['GATHER','TASTE','DISCOVER']},
  pizza:{line:['A slice of the good life.','Your neighborhood. Your table.','Good food. Better company.','There is always room for one more.'],intro:'An energetic food-forward experience designed to make the next visit feel irresistible.',cards:[['The classics','A visual home for verified pizza and kitchen favorites.'],['For the table','Easy browsing that feels great for solo stops or shared meals.'],['Find us','Location details up front and within reach.']],terms:['PIZZA','THE TABLE','NEIGHBORHOOD']},
  japanese:{line:['Follow your appetite.','A moment to savor.','Good taste has a rhythm.','The art of coming together.'],intro:'A considered digital atmosphere inspired by the balance, detail and craft of a Japanese dining experience.',cards:[['The kitchen','Present verified offerings with clean, confident photography.'],['The details','Let type, space and imagery set the mood.'],['The visit','Clear information for planning a stop.']],terms:['CRAFT','FLAVOR','MOMENT']},
  asian:{line:['Something good is on the way.','The comfort of a good meal.','Flavor worth finding.','Every neighborhood needs a favorite.'],intro:'A lively, food-led concept that puts the feeling of a good meal front and center.',cards:[['The menu','A flexible area for confirmed dishes and offerings.'],['The mood','Authentic details can be added as the business provides them.'],['The stop','A simple next step from browsing to visiting.']],terms:['FLAVOR','TABLE','LOCAL']},
  mexican:{line:['Bring your appetite.','A little color. A lot of flavor.','Pull up. Dig in.','Good food brings us together.'],intro:'Expressive color and confident typography create a warm introduction to the kitchen.',cards:[['The flavors','A place for the restaurant’s confirmed specialties.'],['The good times','A vibrant, welcoming introduction for neighbors and new visitors.'],['The visit','Make getting there as easy as deciding to go.']],terms:['COLOR','FLAVOR','TOGETHER']},
  burger:{line:['Hungry looks good on you.','The good stuff starts here.','Get together. Dig in.','Make room for more.'],intro:'Big typography and appetite-first imagery give this neighborhood food concept plenty of energy.',cards:[['The favorites','Space to showcase confirmed signatures and specials.'],['The experience','The right mood for casual, come-as-you-are dining.'],['Get here','One clear route to the front door.']],terms:['GOOD FOOD','GOOD COMPANY','RIGHT HERE']},
  bar:{line:['Make a night of it.','Stay for another story.','The evening is yours.','Meet somewhere memorable.'],intro:'A cinematic digital front door shaped for atmosphere, gathering and a great night out.',cards:[['The mood','An editorial introduction to the room and its energy.'],['What is on','A flexible place for verified hours, events and offerings.'],['Find the door','Keep the essentials close at hand.']],terms:['AFTER DARK','GATHER','DISCOVER']},
  wellness:{line:['Make space to feel good.','Move at your own pace.','Find a little balance.','Your moment starts here.'],intro:'Calm typography, natural colors and breathing room create a grounded welcome.',cards:[['The practice','Explore the approach and atmosphere behind the experience.'],['The feeling','An inviting, unhurried experience.'],['Begin here','Find the location and your next step with ease.']],terms:['PAUSE','RESET','MOVE']},
  creative:{line:['Make room for new ideas.','For the things worth making.','A place to be inspired.','Good ideas live here.'],intro:'An expressive editorial approach that lets process, personality and creative work lead.',cards:[['The work','An adaptable portfolio for verified projects and services.'],['The approach','Tell the story behind the studio as the details take shape.'],['Get connected','Make the next step feel personal and easy.']],terms:['CREATE','EXPLORE','CONNECT']},
  retail:{line:['Find something that feels like you.','Curiosity looks good here.','A new favorite is waiting.','A little different, by design.'],intro:'A confident boutique-style digital introduction with room for collections and discoveries.',cards:[['The edit','A curated look at the shop and its personality.'],['The details','Give the brand’s character a clear visual language.'],['In person','Make the physical shop easy to discover.']],terms:['CURATED','DISCOVER','LOCAL']},
  entertainment:{line:['This is where it happens.','Something worth showing up for.','Gather for the good stuff.','Make every night count.'],intro:'A high-energy concept designed for happenings, community and moments worth sharing.',cards:[['The experience','Put the atmosphere and activity up front.'],['What is next','Discover what brings the community together.'],['Come through','A clear path from interest to attendance.']],terms:['PLAY','GATHER','EXPERIENCE']},
  flowers:{line:['Life in full color.','A little beauty goes a long way.','For all the moments that bloom.','Bring some color home.'],intro:'An expressive, botanical visual world with space for offerings and meaningful occasions.',cards:[['The collection','A fresh perspective on flowers and meaningful occasions.'],['The feeling','Let organic shapes and color tell the story.'],['Stop in','Help visitors find the studio or storefront.']],terms:['BLOOM','COLOR','DISCOVER']}
};

// Business-specific creative direction. Never represent illustrative stock as the client's own photography.
const businessDirections = {
  'your-choice-halal-chicken-and-pizza': {headline:'Chicken nights. Pizza nights. Your choice.', intro:'A neighborhood kitchen concept with room for halal chicken, pizza and the meals that bring everyone to the table.', genre:'restaurant', terms:['HALAL CHICKEN','PIZZA','YOUR CHOICE'], cards:[['Chicken & more','A spotlight on the chicken side of the kitchen.'],['Pizza for the table','Make room for slices and pies alongside the rest of the menu.'],['Find the kitchen','Directions and a simple way to plan your visit.']]},
  'baker-studio': {headline:'Movement with room to breathe.',intro:'Baker Studio brings together movement and wellness, with yoga, Pilates, meditation and fitness as part of the Baker Health experience.',terms:['YOGA','PILATES','WELLNESS'],cards:[['Yoga & Pilates','Movement-focused classes designed to support strength and balance.'],['Meditation & fitness','A space for both active movement and quieter moments.'],['Explore classes','Discover the studio and find the right class for your day.']]},
  'aoko-matcha': {headline:'Aoko. A moment for matcha.',intro:'A matcha-centered concept with a green-tea-first visual identity and space for verified drinks and shop details.',terms:['AOKO','MATCHA','GREEN TEA']},
  'jane-s-matcha': {headline:'Meet Jane’s matcha moment.',intro:'A green tea-focused neighborhood concept that makes matcha the unmistakable star.',terms:['JANE’S','MATCHA','THE RITUAL']},
  'lima-wok-and-bowl': {headline:'From the wok to the bowl.',intro:'A lively concept built around wok cooking, bowls and an easy route to the restaurant.',terms:['WOK','BOWL','FRESH FLAVOR']},
  'brooklyn-billiards': {headline:'Rack up a Brooklyn night.',intro:'A pool-hall concept focused on games, friends and the energy around the table.',terms:['BILLIARDS','BROOKLYN','PLAY']},
  'brooklyn-improv': {headline:'No script. Just Brooklyn.',intro:'A performance-first concept with room for confirmed shows, classes and ticket links.',terms:['IMPROV','COMEDY','LIVE']},
  'hudson-golf': {headline:'Make the next round count.',intro:'A golf-focused destination concept with space for verified experiences, reservations and events.',terms:['GOLF','PLAY','HUDSON']},
  'jalopy-theatre': {headline:'The stage belongs to the story.',intro:'An intimate live-performance concept built for upcoming shows, music and community.',terms:['LIVE MUSIC','THEATRE','COMMUNITY']},
  'petaled': {headline:'Something beautiful is growing.',intro:'A floral concept celebrating thoughtful arrangements and the occasions they mark.',terms:['FLOWERS','PETALS','OCCASIONS']},
  'kee-s-chocolates': {headline:'A little chocolate goes a long way.',intro:'A chocolate-forward concept with space for confirmed collections, gifting and special occasions.',terms:['CHOCOLATE','GIFTING','SMALL JOYS']},
  'pilates-addiction': {headline:'Find your strength in motion.',intro:'A Pilates-focused concept designed around movement, classes and a welcoming studio experience.',terms:['PILATES','STRENGTH','MOVEMENT']},
  'uncorked-wines': {headline:'Find a bottle worth sharing.',intro:'A wine-shop concept that puts discovery, selection and a neighborhood visit first.',terms:['WINE','DISCOVERY','NEIGHBORHOOD']},
  'senzu-juice-and-smoothies': {headline:'A fresh take on your day.',intro:'A juice-and-smoothie concept built around bright ingredients and a refreshing everyday ritual.',terms:['JUICE','SMOOTHIES','FRESH']},
  'oreas-gourmet-juice-bar': {headline:'Good energy, freshly poured.',intro:'A juice-bar concept with a fresh visual direction and room for verified drinks.',terms:['JUICE','FRESH','EVERY DAY']},
  'route-66-smokehouse': {headline:'Bring the smokehouse appetite.',intro:'A smokehouse-inspired concept with room for confirmed barbecue favorites and kitchen details.',terms:['SMOKEHOUSE','FLAVOR','GATHER']},
  'kyuramen-express': {headline:'Ramen worth making time for.',intro:'A ramen-first concept focused on rich broth, noodles and a satisfying bowl.',terms:['RAMEN','BROTH','NOODLES'],cards:[['The ramen','Put the noodles, broth and toppings at the center of the experience.'],['Find your bowl','Make the ramen offering easy to explore.'],['Visit Kyuramen','Make it simple to find the restaurant.']]},
  'ssrp-ramen': {headline:'All roads lead to ramen.',intro:'A noodle-shop concept centered on ramen and the experience around the bowl.',terms:['RAMEN','BROTH','NOODLES']}
};


const additionalDirections = {
 '18-steps-dengdeng-noodles':['Noodles with a story to tell.','NOODLES','BOWLS','18 STEPS'],
 'adda-kitchen':['A place to gather around flavor.','ADDA','KITCHEN','GATHER'],
 'al-aqusa-restaurant':['A neighborhood table, reimagined.','DINING','COMMUNITY','THE TABLE'],
 'anna-bella-pizza-cafe':['Pizza, café, and everything between.','PIZZA','CAFÉ','LOCAL'],
 'argo':['Meet at Argo. Stay a while.','ARGO','DINING','GATHER'],
 'ato-kitchens':['Good things happen in the kitchen.','ATO','KITCHEN','LOCAL'],
 'baby-cafe':['A little café moment goes a long way.','CAFÉ','PAUSE','LOCAL'],
 'barchino':['Your next slice has a name.','BARCHINO','PIZZA','NEIGHBORHOOD'],
 'below-sro':['The night starts below.','BELOW','AFTER DARK','GATHER'],
 'bensonhurst-bagels-and-deli':['The neighborhood bagel ritual.','BAGELS','DELI','BENSONHURST'],
 'bk-halal-grill':['Straight from the grill.','HALAL','GRILL','BROOKLYN'],
 'blanca-s-bakery':['Baked for the neighborhood.','BLANCA’S','BAKERY','FRESH'],
 'cafe-69-sports-bar':['The game looks better together.','SPORTS','BAR','GAME NIGHT'],
 'cali-tajadas-bakery':['A little joy, freshly baked.','CALI','BAKERY','FRESH'],
 'cana-coffee-and-bakery':['Coffee meets the bake.','COFFEE','BAKERY','CANA'],
 'cemitas-cholula-restaurant':['Bring on the cemitas.','CEMITAS','CHOLULA','FLAVOR'],
 'chianti-sports-bar-and-restaurant-sugar-and-cake':['From game time to good times.','SPORTS','DINING','GATHER'],
 'cloud-catering':['Every gathering has a flavor.','CATERING','OCCASIONS','CLOUD'],
 'desi-zaika':['A world of flavor at the table.','DESI','FLAVOR','GATHER'],
 'dubu-hana':['Comfort served with character.','DUBU HANA','DINING','COMFORT'],
 'dumbo-oyster-bar':['Meet us by the oysters.','OYSTERS','DUMBO','THE TABLE'],
 'dutch-s-express':['The neighborhood stop, made simple.','DUTCH’S','EXPRESS','LOCAL'],
 'east-wang':['Your next favorite wok stop.','EAST WANG','WOK','FLAVOR'],
 'el-puerto-de-mexico-restaurant':['A taste of Mexico, close to home.','MEXICO','FLAVOR','GATHER'],
 'emerald-cafe':['A new shade of café culture.','EMERALD','CAFÉ','PAUSE'],
 'equis-pica-pollo-de-verdad':['The chicken is the headline.','POLLO','FLAVOR','EQUIS'],
 'evelyn-bar-and-kitchen':['A night with Evelyn.','EVELYN','BAR','KITCHEN'],
 'fresh-pizza-and-pasta':['Two Italian favorites. One stop.','PIZZA','PASTA','FRESH'],
 'fu-ying':['A familiar favorite, worth finding.','FU YING','DINING','LOCAL'],
 'gloria':['There’s always a reason to gather.','GLORIA','DINING','GATHER'],
 'good-taste':['Follow your good taste.','GOOD TASTE','FLAVOR','LOCAL'],
 'good-taste-restaurant-168':['Good taste, another way.','GOOD TASTE','RESTAURANT','LOCAL'],
 'greens-goods-grill':['Fresh thinking. From the grill.','GREENS','GRILL','GOOD FOOD'],
 'grizzly-coffee-and-tea-house':['A coffee and tea kind of day.','COFFEE','TEA','GRIZZLY'],
 'guda':['Make a date with Guda.','GUDA','DINING','THE TABLE'],
 'guisados-maria':['Come hungry for guisados.','GUISADOS','MARIA','FLAVOR'],
 'halal-street-eatz':['Street food with serious appetite.','HALAL','STREET FOOD','EATZ'],
 'hashi-market':['Discover what’s on the shelf.','HASHI','MARKET','DISCOVER'],
 'herbie-s-burgers':['The burger is calling.','HERBIE’S','BURGERS','THE GRILL'],
 'house-of-amrut':['Find your place at the house.','AMRUT','GATHER','THE NIGHT'],
 'isla-and-co':['A little island energy.','ISLA','DINING','GATHER'],
 'jamaica-fried-chicken':['Fried chicken. Neighborhood energy.','JAMAICA','CHICKEN','LOCAL'],
 'jamaica-fry-chicken':['A crispy neighborhood favorite.','CHICKEN','JAMAICA','THE GRILL'],
 'janet-s-pizza':['Janet’s. Your pizza stop.','JANET’S','PIZZA','LOCAL'],
 'jannat-aden-restaurant':['Come to the table at Jannat Aden.','JANNAT ADEN','DINING','GATHER'],
 'julieta-taberna':['Make tonight a taberna night.','JULIETA','TABERNA','NIGHTS'],
 'kampos-taverna':['A table for the whole evening.','KAMPOS','TAVERNA','GATHER'],
 'kings-co-imperial':['An imperial take on dinner.','KINGS CO','DINING','FLAVOR'],
 'kitty-o-shea-s':['Meet at Kitty O’Shea’s.','KITTY O’SHEA’S','PUB','GATHER'],
 'kostantina-frozen-yogurt':['A little swirl of happiness.','FROZEN YOGURT','SWEET','KOSTANTINA'],
 'kuttley-house':['Come in. Stay for a cup.','KUTTLEY','COFFEE','HOUSE'],
 'kyan-cafe':['Meet me at Kyan.','KYAN','CAFÉ','PAUSE'],
 'l-oranaise':['Something special at L’Oranaise.','L’ORANAISE','DINING','GATHER'],
 'la-bagel-delight':['Bagels worth waking up for.','BAGELS','FRESH','DELIGHT'],
 'leanly-ii-chinese-food':['Your neighborhood Chinese-food stop.','CHINESE FOOD','LEANLY II','LOCAL'],
 'loco-cafe':['A little loco, a lot of café.','LOCO','CAFÉ','LOCAL'],
 'luana-s-tavern':['Your seat at Luana’s.','LUANA’S','TAVERN','GATHER'],
 'lucky-zhang-s-restaurant':['Good fortune. Good food.','LUCKY ZHANG’S','DINING','FLAVOR'],
 'madame-sousou':['Make it a Madame Sousou moment.','MADAME SOUSOU','DINING','GATHER'],
 'magic-nutrition':['Find your feel-good ritual.','NUTRITION','WELLNESS','MAGIC'],
 'maki':['A little more maki, please.','MAKI','JAPANESE','FLAVOR'],
 'marbre':['A bakery moment, beautifully made.','MARBRE','BAKERY','FRESH'],
 'minitalia-pizzeria':['A little Italy in every slice.','PIZZA','MINITALIA','LOCAL'],
 'miss-bagel':['Miss Bagel. Not your morning.','BAGELS','BREAKFAST','FRESH'],
 'mr-fire-bar-and-grill':['Turn up the grill.','MR FIRE','BAR','GRILL'],
 'my-life-nutrition':['Your day. Your wellness.','MY LIFE','NUTRITION','WELLNESS'],
 'notable':['A place worth noting.','NOTABLE','DINING','DISCOVER'],
 'om-wok':['Find your wok moment.','OM WOK','FLAVOR','BOWLS'],
 'orion-s':['Meet at Orion’s.','ORION’S','DINING','GATHER'],
 'pa-nash-eurosoul':['A little Euro. A little soul.','EUROSOUL','PA-NASH','DINING'],
 'pies-n-thighs':['Pies. Thighs. Good times.','PIES','CHICKEN','GOOD FOOD'],
 'rb-bakery-and-cafe':['Baked goods meet café days.','BAKERY','CAFÉ','RB'],
 'restaurante-la-plaza-de-tulcingo':['A table at La Plaza.','LA PLAZA','TULCINGO','FLAVOR'],
 'rey-tacos':['Make it a taco kind of day.','TACOS','REY','FLAVOR'],
 'rick-s-restaurant':['Come hungry to Rick’s.','RICK’S','DINING','LOCAL'],
 'royal-canton-seafood-palace':['A seafood feast in focus.','SEAFOOD','CANTON','GATHER'],
 'sadie-s-bakery':['A little something from Sadie’s.','SADIE’S','BAKERY','FRESH'],
 'santinos-slices-and-italian-ices':['Slices, ices, and a good day.','SLICES','ITALIAN ICES','SANTINOS'],
 'shashlik-uz-n1':['A table built around shashlik.','SHASHLIK','GRILL','GATHER'],
 'smash-time-burger-co':['It’s always smash time.','SMASH','BURGERS','GOOD FOOD'],
 'socotra-restaurant':['A table with a Socotra story.','SOCOTRA','DINING','GATHER'],
 'space-54':['Make space for a night out.','SPACE 54','NIGHTLIFE','EXPERIENCE'],
 'sugar-pop-candy-bar-pinkberry':['A sweet stop with options.','CANDY','FROZEN YOGURT','SWEET'],
 'sur-1st-cafe':['Your first café stop.','SUR 1ST','CAFÉ','LOCAL'],
 'surf-city-pizzeria-2':['Catch the next slice.','SURF CITY','PIZZA','LOCAL'],
 'sweetness-usa':['A little sweetness, every day.','SWEETNESS','TREATS','USA'],
 'turbine-cafe':['Fuel the day at Turbine.','TURBINE','CAFÉ','COFFEE'],
 'vicoletto':['Make a little time for Vicoletto.','VICOLETTO','DINING','GATHER'],
 'wan-chong-shan-xia':['Explore the flavors at Wan Chong Shan Xia.','WAN CHONG','DINING','FLAVOR'],
 'wayne-and-sons':['A family name. A neighborhood table.','WAYNE & SONS','DINING','GATHER'],
 'wei-zhi-yuan':['Discover Wei Zhi Yuan.','WEI ZHI YUAN','DINING','FLAVOR'],
 'weng-s-garden':['A neighborhood garden of flavor.','WENG’S','GARDEN','DINING'],
 'wolf-forest-cafe':['Find your café hideaway.','WOLF FOREST','CAFÉ','COFFEE']
};
for(const [slug,[headline,...terms]] of Object.entries(additionalDirections)){
  if(!businessDirections[slug])businessDirections[slug]={headline,terms};
}

function category(str) {
  const s = str.toLowerCase();
  if (/flor|flower|plant|topiary|petal/.test(s)) return 'flowers';
  if (/improv|billiard|golf|game|theatre|venue|entertain|performance|nightclub/.test(s)) return 'entertainment';
  if (/pilates|yoga|spa|salon|hair|fitness|nutrition|wellness|beauty/.test(s)) return 'wellness';
  if (/bakery|bagel|bread|baker|pastry|baking/.test(s)) return 'bakery';
  if (/cake|sweet|cookie|dessert|chocolate|frozen yogurt|ice cream|candy|juice|smoothie/.test(s)) return 'sweets';
  if (/coffee|cafe|café|matcha|tea house|tea shop/.test(s)) return 'coffee';
  if (/pizza|pizzeria|italian/.test(s)) return 'pizza';
  if (/japanese|ramen|sushi|udon/.test(s)) return 'japanese';
  if (/dumpling|chinese|korean|noodle|wok|asian/.test(s)) return 'asian';
  if (/mexic|taco|latino|latin|colombian|tulcingo|taquer/.test(s)) return 'mexican';
  if (/burger|fried chicken|chicken|grill|smokehouse|halal/.test(s)) return 'burger';
  if (/bar|tavern|wine|lounge|cocktail|pub|bistro/.test(s)) return 'bar';
  if (/artist|studio|design|creative|catering/.test(s)) return 'creative';
  if (/market|shop|store|boutique|books|deli|retail/.test(s)) return 'retail';
  return 'restaurant';
}
const approved = new Set(JSON.parse(await readFile('qa/111-prospect-revamp.json','utf8')).sites.map(site=>site.slug));
const dirs = (await readdir(root, {withFileTypes:true})).filter(x=>x.isDirectory() && approved.has(x.name)).map(x=>x.name);
const transformed = [];
for(const slug of dirs) {
  const dir = join(root, slug);
  let source;
  try { source=await readFile(join(dir,'index.html'),'utf8'); } catch { continue; }
  if(!(source.includes('This independent study organizes the business story') && source.includes('AWE / CONCEPT')) && !source.includes('Independent Website Concept</title>')) continue;
  const name = decodeHtml(source.match(/<h1>([^<]+)<\/h1>/)?.[1]);
  const eyebrow = decodeHtml(source.match(/<p class="eyebrow">([^<]+)<\/p>/)?.[1] || source.match(/<p class="overline"><span class="line"><\/span>([^<]+)<\/p>/)?.[1]);
  const address = decodeHtml(source.match(/<section id="visit"[\s\S]*?<h2>[^<]*<\/h2><p>([^<]+)<\/p>/)?.[1] || source.match(/<p class="closing-location">[\s\S]*?<\/span>([^<]*)<\/p>/)?.[1] || '');
  if(!name || !eyebrow) throw new Error('Missing business metadata for ' + slug);
  const [area,...typeParts] = eyebrow.split(' / ');
  const type = typeParts.join(' / ') || 'Neighborhood destination';
  const overrides = {'jane-s-matcha':'matcha','senzu-juice-and-smoothies':'coffee','oreas-gourmet-juice-bar':'coffee','baker-studio':'wellness','cloud-catering':'restaurant','hashi-market':'retail','uncorked-wines':'retail','greens-goods-grill':'restaurant','aoko-matcha':'matcha','anna-bella-pizza-cafe':'pizza','cafe-69-sports-bar':'bar','chianti-sports-bar-and-restaurant-sugar-and-cake':'bar','dumbo-oyster-bar':'restaurant','santinos-slices-and-italian-ices':'pizza','julieta-taberna':'bar','mr-fire-bar-and-grill':'bar','kampos-taverna':'restaurant','pies-n-thighs':'restaurant','bensonhurst-bagels-and-deli':'bakery'};
  const direction = businessDirections[slug] || {};
  const genre = direction.genre || overrides[slug] || category(type + ' ' + slug);
  const h = hash(slug);
  const design = h % 12;
  const scheme = palettes[genre][Math.floor(h/13)%palettes[genre].length];
  const mood = {...descriptors[genre], ...direction};
  const headline = direction.headline || mood.line[Math.floor(h/47)%mood.line.length];
  const pick = imgs[genre];
  const photos = [0,1,2].map((_,i)=> image(pick[(Math.floor(h/17)+i)%pick.length]));
  // Independently licensed stock photos, selected to avoid reusing a single photo three times.
  if (genre === 'matcha') { const matchaPhotos = [
    'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=85'
  ]; photos.splice(0,3,...matchaPhotos); }
  if (slug === 'senzu-juice-and-smoothies' || slug === 'oreas-gourmet-juice-bar') { photos.splice(0,3,image('photo-1610970881699-44a5587cabec'),image('photo-1505252585461-04db1eb84625'),image('photo-1622597467836-f3285f2131b8')); }
  if (slug === 'pies-n-thighs') { photos.splice(0,3,image('photo-1562967914-608f82629710'),image('photo-1484723091739-30a097e8f929'),image('photo-1555507036-ab1f4038808a')); }
  // Mixed-menu restaurant: show distinct food categories instead of a misleading burger-only hero.
  if (slug === 'your-choice-halal-chicken-and-pizza') { photos[0] = image(imgs.restaurant[3]); photos[1] = image(imgs.pizza[1]); photos[2] = image(imgs.restaurant[0]); }
  // Kyuramen's primary product is ramen, not sushi: force a bowl-first hero and gallery.
  if (slug === 'kyuramen-express' || slug === 'ssrp-ramen') { photos[0] = image('photo-1569718212165-3a8278d5f624'); photos[1] = image('photo-1555126634-323283e090fa'); photos[2] = image('photo-1519984388953-d2406bc725e1'); }
  // Rotate hero framing and content order by concept, rather than repeating one hero composition.
  const visualMode = h % 4;
  const n = escapeHtml(name), a = escapeHtml(area), t = escapeHtml(type), addr=escapeHtml(address);
  const intro = escapeHtml(mood.intro);
  const loc = address ? (/new york|brooklyn|queens|bronx|staten island|\bNY\b/i.test(address) ? address : address + ', New York') : area + ', New York';
  const map = 'https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(loc);
  const summary = escapeHtml(name + ' - ' + type + ' in ' + area + '. Independent website design proposal.');
  const mark = escapeHtml(name.length>29 ? name.split(' ').slice(0,3).join(' ') : name);
  const lines = [
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
  '<meta name="description" content="'+summary+'"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="'+scheme[0]+'">',
  '<title>'+n+' | Independent Website Concept</title><link rel="preconnect" href="https://images.unsplash.com">',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="./styles.css"><script defer src="./site.js"></script></head>',
  '<body class="concept variant-'+design+' visual-mode-'+visualMode+'"><a class="skip" href="#main">Skip to content</a>',
  '<div class="concept-notice">Independent design concept for '+n+' <span>Not the business&rsquo;s official website</span></div>',
  '<header class="site-header"><a class="wordmark" href="#top" aria-label="'+n+' home">'+mark+'</a>',
  '<button class="menu-toggle" data-menu type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>',
  '<nav class="site-nav" id="site-nav" data-nav aria-label="Main navigation"><a href="#experience">Discover</a><a href="#details">Explore</a><a href="#visit">Visit</a><a class="nav-button" href="#visit">Find us</a></nav></header>',
  '<main id="main"><section class="hero" id="top"><div class="hero-copy">',
  '<p class="overline"><span class="line"></span>'+a+' / '+t+'</p>',
  '<p class="hero-count">A local story / '+String((h%89)+11).padStart(2,'0')+'</p>',
  '<h1>'+n+'</h1><p class="hero-line">'+escapeHtml(headline)+'</p>',
  '<p class="hero-description">'+intro+'</p><div class="hero-actions"><a class="button solid" href="#experience">Explore '+escapeHtml(name.length>22?'the experience':name)+'</a><a class="button quiet" href="#visit">Plan a visit <span aria-hidden="true" class="chevron"></span></a></div>',
  '</div><div class="hero-media"><figure class="frame"><img src="'+photos[0]+'" alt="Representative editorial photograph for this independent '+escapeHtml(genre)+' concept" decoding="async" fetchpriority="high"><figcaption>01 / '+escapeHtml(genre.toUpperCase())+' IN FOCUS</figcaption></figure><span class="orbit" aria-hidden="true"></span></div>',
  '<div class="hero-bottom"><span>'+a+'</span><span>Discover / Explore / Visit</span></div></section>',
  '<div class="marquee" aria-hidden="true"><div class="marquee-track"><div class="marquee-unit">'+[...mood.terms,...mood.terms].map(x=>'<span>'+escapeHtml(x)+'</span>').join('')+'</div><div class="marquee-unit">'+[...mood.terms,...mood.terms].map(x=>'<span>'+escapeHtml(x)+'</span>').join('')+'</div></div></div>',
  '<section class="story section" id="experience"><div class="section-heading"><p class="overline">01 / The experience</p><h2>'+escapeHtml(headline)+'</h2></div><div class="story-body"><p>'+intro+'</p><p>'+n+' brings its own character to '+a+'. Explore the atmosphere, discover the neighborhood, and find your way to the door.</p></div></section>',
  '<section class="gallery section" id="gallery"><div class="gallery-top"><p class="overline">A closer look / The mood</p><span>02 / 04</span></div><div class="photo-grid"><figure class="photo photo-a"><img loading="lazy" decoding="async" src="'+photos[1]+'" alt="Illustrative editorial photograph"></figure><figure class="photo photo-b"><img loading="lazy" decoding="async" src="'+photos[2]+'" alt="Illustrative editorial detail"></figure></div></section>',
  '<section class="details section" id="details"><div class="details-heading"><p class="overline">02 / Discover more</p><h2>Good things in the details.</h2></div><div class="feature-grid">',
  ...mood.cards.map((card,i)=>'<article class="feature"><span class="feature-index">0'+(i+1)+'</span><h3>'+escapeHtml(card[0])+'</h3><p>'+escapeHtml(card[1])+'</p><span class="feature-rule"></span></article>'),
  '</div></section>',
  '<section class="closing section" id="visit"><div class="closing-deco" aria-hidden="true">'+escapeHtml(area.toUpperCase())+'</div><div class="closing-body"><p class="overline">03 / Find your way</p><h2>See you<br>around.</h2><p class="closing-location">'+n+'<span>'+a+'</span>'+addr+'</p><a class="button solid" href="'+map+'" target="_blank" rel="noopener noreferrer">View on map</a></div>',
  '<div class="closing-photo"><img loading="lazy" decoding="async" src="'+photos[0]+'" alt="Representative atmosphere image"></div></section></main>',
  '<footer class="site-footer"><p>'+n+' / '+a+'</p><p>Independent website proposal. Details and imagery subject to business approval.</p><a href="https://aweconcepts.com" target="_blank" rel="noopener noreferrer">Designed by Awe Concepts</a><a href="#top">Back to top</a></footer>',
  '</body></html>'
  ];
  const fonts = [
    ['Georgia, "Times New Roman", serif','Arial, Helvetica, sans-serif'],
    ['"Times New Roman", Georgia, serif','"Arial Narrow", Arial, sans-serif'],
    ['"Palatino Linotype", "Book Antiqua", Georgia, serif','Arial, Helvetica, sans-serif'],
    ['Arial, Helvetica, sans-serif','Georgia, serif'],
    ['"Trebuchet MS", Arial, sans-serif','Georgia, serif'],
    ['Georgia, serif','"Trebuchet MS", Arial, sans-serif']
  ][Math.floor(h/7)%6];
  const fontSize = name.length>42?'clamp(3rem,5.2vw,5.5rem)':name.length>26?'clamp(3.5rem,6.4vw,7.3rem)':'clamp(4.1rem,8.5vw,10rem)';
  const css = [
  '.visual-mode-1 .hero-media .frame{transform:rotate(-2deg);box-shadow:18px 18px 0 var(--accent)}.visual-mode-2 .hero-media .frame{border-radius:220px 220px 12px 12px}.visual-mode-3 .hero-media .frame{border:12px solid var(--paper);box-shadow:0 28px 70px #0002}.visual-mode-1 .photo-b{transform:translateY(-24px)}.visual-mode-2 .photo-a{border-radius:50% 50% 8px 8px}.visual-mode-3 .photo-b{border-radius:120px 120px 0 0}',
  ':root{--paper:'+scheme[0]+';--ink:'+scheme[1]+';--accent:'+scheme[2]+';--muted:'+scheme[3]+';--headline:'+fonts[0]+';--body:'+fonts[1]+';--hero-size:'+fontSize+';--radius:'+([0,20,80,12,120,3][h%6])+'px}',
  '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font:400 16px/1.55 var(--body);overflow-x:clip}img{display:block;width:100%;max-width:100%;object-fit:cover}a{color:inherit}button{font:inherit}a:focus-visible,button:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.skip{position:absolute;left:-9999px;top:8px;z-index:100;background:var(--accent);color:var(--ink);padding:10px}.skip:focus{left:8px}',
  '.concept-notice{font:500 10px/1.5 var(--body);letter-spacing:.065em;text-align:center;padding:7px 18px;background:var(--ink);color:var(--paper)}.concept-notice span{opacity:.72;margin-left:12px}.site-header{position:relative;z-index:20;min-height:88px;display:flex;align-items:center;justify-content:space-between;padding:14px clamp(20px,5vw,88px);border-bottom:1px solid currentColor;background:var(--paper)}.wordmark{font:800 clamp(19px,2.1vw,30px)/1.04 var(--headline);letter-spacing:-.035em;text-decoration:none;max-width:min(45%,470px);overflow-wrap:anywhere}.site-nav{display:flex;align-items:center;gap:clamp(16px,2.8vw,42px)}.site-nav a{font:600 11px/1.2 var(--body);text-decoration:none;text-transform:uppercase;letter-spacing:.09em}.site-nav a:hover{text-decoration:underline;text-underline-offset:5px}.site-nav .nav-button{background:var(--accent);color:var(--paper);padding:15px 20px;text-decoration:none}.menu-toggle{display:none}',
  '.section{padding:clamp(72px,10vw,150px) clamp(22px,7vw,112px)}.overline{font:700 11px/1.5 var(--body);text-transform:uppercase;letter-spacing:.14em;display:flex;align-items:center;gap:16px}.overline .line{display:inline-block;width:34px;border-top:2px solid var(--accent)}h1,h2,h3,p{overflow-wrap:break-word}h1,h2,h3{margin:0}h1,h2{font-family:var(--headline);font-weight:600;letter-spacing:-.055em}h2{font-size:clamp(3rem,6.4vw,7rem);line-height:1.02}p{margin-top:0}',
  '.hero{min-height:min(900px,90svh);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);position:relative;isolation:isolate}.hero-copy{padding:clamp(70px,7vw,110px) clamp(24px,7vw,112px) 100px;display:flex;align-items:flex-start;justify-content:center;flex-direction:column;min-width:0;position:relative;z-index:2}.hero h1{font-size:var(--hero-size);line-height:.94;max-width:1050px;margin:20px 0 12px}.hero-line{font:italic 500 clamp(1.5rem,2.55vw,3rem)/1.14 var(--headline);letter-spacing:-.03em;max-width:600px;margin:0 0 18px;color:var(--accent)}.hero-description{max-width:560px;font:400 clamp(15px,1.4vw,19px)/1.65 var(--body);opacity:.85}.hero-count{position:absolute;bottom:42px;left:clamp(24px,7vw,112px);font:700 10px var(--body);text-transform:uppercase;letter-spacing:.12em;opacity:.55}.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.button{display:inline-flex;min-height:50px;align-items:center;justify-content:center;gap:18px;padding:14px 22px;text-decoration:none;text-transform:uppercase;font:700 11px/1.4 var(--body);letter-spacing:.06em;transition:transform .2s,background .2s}.button:hover{transform:translateY(-3px)}.button.solid{background:var(--accent);color:var(--paper)}.button.quiet{border:1px solid currentColor}.chevron{display:inline-block;width:9px;height:9px;border-top:1px solid;border-right:1px solid;transform:rotate(45deg)}',
  '.hero-media{min-height:580px;position:relative;padding:clamp(20px,4vw,62px);display:grid;place-items:center;overflow:hidden}.hero-media .frame{width:100%;height:min(680px,65vw);max-height:86%;position:relative;margin:0;overflow:hidden;border-radius:var(--radius);z-index:1}.hero-media .frame img{height:100%;filter:saturate(.85);transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}.hero-media .frame:hover img{transform:scale(1.07)}.frame figcaption{position:absolute;bottom:18px;left:18px;background:var(--paper);color:var(--ink);padding:9px 11px;font:700 10px var(--body);letter-spacing:.1em}.orbit{position:absolute;width:60%;aspect-ratio:1;border:1px solid var(--accent);border-radius:50%;right:-20%;top:-20%;opacity:.7;pointer-events:none}.hero-bottom{position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:14px clamp(24px,7vw,112px);font:700 9px var(--body);letter-spacing:.14em;text-transform:uppercase;border-top:1px solid currentColor;background:var(--paper);z-index:4}',
  '.marquee{overflow:hidden;white-space:nowrap;background:var(--accent);color:var(--paper);padding:20px 0}.marquee-track{display:flex;width:max-content;will-change:transform;animation:awe-scroll 24s linear infinite;animation-play-state:running!important}.marquee-unit{flex:none;display:flex;gap:44px;padding-right:44px;align-items:center}.marquee-unit span{font:700 14px var(--body);letter-spacing:.14em}.marquee-unit span:after{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;border:1px solid currentColor;margin-left:44px}@keyframes awe-scroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}',
  '.story{display:grid;grid-template-columns:1fr 1fr;gap:10vw;align-items:end;border-bottom:1px solid currentColor}.story h2{max-width:700px}.story-body{max-width:540px}.story-body p:first-child{font:400 clamp(1.2rem,2vw,2rem)/1.45 var(--headline)}.story-body p:last-child{opacity:.68;line-height:1.85}',
  '.gallery{padding-top:40px;padding-bottom:clamp(60px,8vw,120px)}.gallery-top{display:flex;justify-content:space-between;gap:20px;align-items:center}.gallery-top span{font:700 10px var(--body)}.photo-grid{display:grid;grid-template-columns:1.16fr .84fr;gap:clamp(12px,2vw,28px);align-items:stretch}.photo{margin:0;overflow:hidden;border-radius:var(--radius);min-height:330px}.photo img{height:100%;max-height:780px;object-fit:cover;transition:transform 1.2s ease}.photo:hover img{transform:scale(1.06)}.photo-b{margin-top:10vw;height:440px}.image-note{font-size:11px;max-width:600px;margin:24px 0 0;opacity:.65}',
  '.details{background:var(--ink);color:var(--paper)}.details-heading{display:grid;grid-template-columns:1fr 2fr;gap:4vw;align-items:start;margin-bottom:60px}.details h2{max-width:860px}.feature-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,50px)}.feature{padding-top:18px;border-top:1px solid currentColor;display:flex;flex-direction:column;min-height:220px}.feature-index{font:700 11px var(--body);opacity:.6}.feature h3{font:500 clamp(1.6rem,2.2vw,2.6rem)/1.1 var(--headline);letter-spacing:-.035em;margin:30px 0 18px}.feature p{max-width:340px;font-size:15px;line-height:1.7;opacity:.7}.feature-rule{margin-top:auto;width:44px;border-top:2px solid var(--accent)}',
  '.closing{min-height:600px;position:relative;overflow:hidden;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:5vw}.closing-body{position:relative;z-index:2}.closing h2{font-size:clamp(4rem,8.2vw,9rem);line-height:.9;margin:20px 0 35px}.closing-location{font:500 17px/1.8 var(--body);display:flex;flex-direction:column;margin-bottom:26px}.closing-location span{opacity:.55}.closing-photo{height:500px;overflow:hidden;border-radius:var(--radius);transform:rotate(-3deg)}.closing-photo img{height:100%;filter:saturate(.7)}.closing-deco{position:absolute;right:-7vw;top:-15px;font:700 clamp(7rem,23vw,22rem) var(--headline);letter-spacing:-.09em;opacity:.04;white-space:nowrap;pointer-events:none}.site-footer{padding:34px clamp(22px,7vw,112px);display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;font:600 11px var(--body);text-transform:uppercase;letter-spacing:.05em;border-top:1px solid currentColor}.site-footer p{margin:0;max-width:430px}.site-footer a{text-decoration:none}',
  '.variant-1 .hero{grid-template-columns:1.12fr .88fr}.variant-1 .hero-media{background:var(--accent)}.variant-1 .hero-media .frame{clip-path:polygon(8% 0,100% 0,100% 86%,85% 100%,0 100%,0 15%)}.variant-1 .hero h1{text-transform:uppercase;font-family:var(--body);font-weight:800;letter-spacing:-.07em}',
  '.variant-2 .hero{grid-template-columns:1fr}.variant-2 .hero-copy{padding-top:92px;padding-bottom:28px;align-items:center;text-align:center}.variant-2 .hero-copy .hero-description{margin-left:auto;margin-right:auto}.variant-2 .hero-media{min-height:520px;padding-top:0}.variant-2 .hero-media .frame{height:450px;width:min(90%,1160px)}.variant-2 .hero-count{display:none}.variant-2 .hero-actions{justify-content:center}.variant-2 .story{background:var(--accent);color:var(--paper)}',
  '.variant-3 .hero{grid-template-columns:.85fr 1.15fr}.variant-3 .hero-media{grid-column:1;grid-row:1}.variant-3 .hero-copy{grid-column:2;grid-row:1}.variant-3 .hero-media .frame{border-radius:50% 50% 8px 8px}.variant-3 .story{grid-template-columns:1.4fr .6fr}',
  '.variant-4 .hero{grid-template-columns:1fr 1fr}.variant-4 .hero-media{padding:0;min-height:680px}.variant-4 .hero-media .frame{height:100%;max-height:none;border-radius:0}.variant-4 .hero-copy{border:18px solid var(--accent);padding-left:clamp(25px,5vw,80px)}.variant-4 .gallery .photo-a{transform:rotate(-2deg)}',
  '.variant-5 .hero{grid-template-columns:1.2fr .8fr}.variant-5 .hero-copy{background:var(--accent);color:var(--paper)}.variant-5 .hero-line{color:var(--paper)}.variant-5 .hero-actions .solid{background:var(--ink);color:var(--paper)}.variant-5 .hero-media .frame{clip-path:ellipse(48% 49% at 50% 50%);border-radius:0}.variant-5 .story{grid-template-columns:1fr}',
  '.variant-6 .hero{grid-template-columns:.95fr 1.05fr}.variant-6 .hero-media .frame{border-radius:0;transform:rotate(3deg)}.variant-6 .hero h1{font-style:italic}.variant-6 .hero-line{font-family:var(--body);font-style:normal;font-weight:800;text-transform:uppercase}.variant-6 .details{background:var(--accent)}',
  '.variant-7 .hero{grid-template-columns:1fr}.variant-7 .hero-copy{padding:100px 7vw 48px;max-width:1000px}.variant-7 .hero-media{position:absolute;right:3vw;top:16%;width:39%;height:75%;min-height:0;z-index:-1;opacity:.65}.variant-7 .hero-media .frame{height:100%;max-height:none;border-radius:220px 220px 0 0}.variant-7 .hero-copy{max-width:67%}.variant-7 .hero h1{font-weight:800;text-transform:uppercase}.variant-7 .story{background:var(--ink);color:var(--paper)}',
  '.variant-8 .hero{grid-template-columns:1.15fr .85fr}.variant-8 .hero-media{background:var(--ink)}.variant-8 .hero-media .frame{border:12px solid var(--paper);border-radius:0;box-shadow:20px 20px 0 var(--accent)}.variant-8 .hero-line{font-family:var(--body);font-style:normal;font-weight:700}.variant-8 .gallery .photo-b{border-radius:180px 180px 0 0}',
  '.variant-9 .hero{grid-template-columns:1fr}.variant-9 .hero-copy{order:2;padding-top:42px;padding-bottom:110px}.variant-9 .hero-media{order:1;min-height:480px;padding:20px 7vw 0}.variant-9 .hero-media .frame{height:460px;width:100%;max-height:none;border-radius:0 0 180px 0}.variant-9 .hero-bottom{order:3}.variant-9 .hero h1{max-width:1100px}.variant-9 .details{background:var(--accent)}',
  '.variant-10 .hero{grid-template-columns:1.1fr .9fr}.variant-10 .hero-media .frame{border-radius:50%}.variant-10 .hero-copy{background:var(--ink);color:var(--paper)}.variant-10 .hero-copy .button.quiet{border-color:var(--paper)}.variant-10 .hero-line{color:var(--accent)}.variant-10 .closing{background:var(--accent);color:var(--paper)}',
  '.variant-11 .hero{grid-template-columns:1fr 1fr}.variant-11 .hero-copy{padding-top:150px}.variant-11 .hero h1{text-transform:uppercase;line-height:.86;font-family:var(--body);font-weight:900}.variant-11 .hero-media{background:var(--accent);clip-path:polygon(0 0,100% 0,100% 100%,9% 100%)}.variant-11 .photo-a{border-radius:200px 200px 0 0}.variant-11 .photo-b{border-radius:0 0 200px 200px}',
  '@media(max-width:920px){.site-header{min-height:76px}.site-nav{gap:14px}.site-nav a{font-size:10px}.hero{min-height:0}.hero-copy{padding:90px 5vw 92px}.hero-media{min-height:470px}.hero-media .frame{height:500px}.variant-7 .hero-copy{max-width:70%}.closing-photo{height:410px}}',
  '@media(max-width:700px){.concept-notice{font-size:9px}.concept-notice span{display:block;margin-left:0}.site-header{min-height:68px;padding:13px 6vw}.wordmark{max-width:76%;font-size:clamp(18px,5vw,25px)}.menu-toggle{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:44px;height:44px;background:transparent;color:var(--ink);border:1px solid currentColor}.menu-toggle span{width:18px;border-top:2px solid currentColor}.site-nav{display:none;position:absolute;top:100%;left:0;right:0;padding:22px 6vw 28px;flex-direction:column;align-items:stretch;gap:24px;background:var(--paper);border-bottom:1px solid currentColor;box-shadow:0 12px 30px #00000010}.site-nav.open{display:flex}.site-nav a{font-size:13px}.site-nav .nav-button{text-align:center}.hero,.variant-1 .hero,.variant-3 .hero,.variant-4 .hero,.variant-5 .hero,.variant-6 .hero,.variant-7 .hero,.variant-8 .hero,.variant-10 .hero,.variant-11 .hero{display:flex;flex-direction:column}.hero-copy,.variant-3 .hero-copy,.variant-4 .hero-copy,.variant-5 .hero-copy,.variant-7 .hero-copy,.variant-8 .hero-copy,.variant-10 .hero-copy,.variant-11 .hero-copy{order:1;max-width:none;width:100%;padding:67px 6vw 45px;border:0;text-align:left;align-items:flex-start}.hero h1{font-size:clamp(3.2rem,11.5vw,5.4rem);line-height:.97;letter-spacing:-.055em;overflow-wrap:anywhere}.hero-line{font-size:clamp(1.5rem,7vw,2.7rem)}.hero-description{font-size:16px;max-width:540px}.hero-count{display:none}.hero-actions{justify-content:flex-start}.hero-media,.variant-3 .hero-media,.variant-4 .hero-media,.variant-5 .hero-media,.variant-7 .hero-media,.variant-8 .hero-media,.variant-10 .hero-media,.variant-11 .hero-media{order:2;position:relative;inset:auto;z-index:auto;opacity:1;width:100%;height:auto;min-height:370px;padding:18px 6vw 60px;clip-path:none;background:transparent}.hero-media .frame,.variant-2 .hero-media .frame,.variant-4 .hero-media .frame,.variant-7 .hero-media .frame,.variant-9 .hero-media .frame{height:clamp(300px,95vw,490px);max-height:none;width:100%;border-radius:var(--radius)}.variant-3 .hero-media .frame{border-radius:50% 50% 8px 8px}.variant-8 .hero-media .frame{box-shadow:8px 8px 0 var(--accent);border:5px solid var(--paper)}.variant-7 .hero-media .frame{border-radius:180px 180px 0 0}.variant-9 .hero-copy{order:1;padding-top:67px}.variant-9 .hero-media{order:2}.variant-2 .hero-copy{align-items:flex-start;text-align:left;padding:67px 6vw 45px}.hero-bottom{padding:13px 6vw}.hero-bottom span:last-child{display:none}.frame figcaption{font-size:9px}.section{padding:76px 6vw}.story,.variant-3 .story,.details-heading,.closing{grid-template-columns:1fr;gap:38px}.story{align-items:start}.story-body{max-width:550px}.story h2,.details h2{font-size:clamp(2.9rem,10vw,4.6rem)}.gallery{padding:28px 6vw 70px}.gallery-top{flex-wrap:wrap}.photo-grid{grid-template-columns:1fr;gap:16px}.photo{min-height:280px;height:380px}.photo-b{margin-top:0;height:280px}.details-heading{margin-bottom:44px}.feature-grid{grid-template-columns:1fr;gap:32px}.feature{min-height:170px}.feature h3{margin:22px 0 12px}.closing{display:flex;flex-direction:column;align-items:stretch}.closing h2{font-size:clamp(4rem,14vw,6rem)}.closing-photo{height:310px;width:88%;margin:0 auto;transform:rotate(-2deg)}.closing-deco{font-size:40vw}.site-footer{padding:25px 6vw;font-size:10px}.marquee{padding:14px 0}.marquee-unit{gap:24px;padding-right:24px}.marquee-unit span:after{margin-left:24px}}',
  '@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.hero-media .frame img,.photo img{transition:none!important}}'
  ].join('\n');
  await writeFile(join(dir,'index.html'), lines.join(''));
  await writeFile(join(dir,'styles.css'), css);
  await writeFile(join(dir,'site.js'), SHARED);
  transformed.push({slug,name,genre,design,area,address,photos});
}
if(transformed.length !== 111 && process.env.ALLOW_PARTIAL_REVAMP !== '1') throw new Error('Expected exactly 111 original generic concepts; detected ' + transformed.length + '. Do not silently modify a different set.');
await writeFile('qa/111-prospect-revamp.json', JSON.stringify({count:transformed.length,generatedAt:new Date().toISOString(),sites:transformed},null,2)+'\n');
console.log('Revamped ' + transformed.length + ' generic concepts with category-aware copy, imagery, distinct layouts and palettes.');

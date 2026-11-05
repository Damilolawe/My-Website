import { readFile, writeFile } from 'node:fs/promises';
const manifestPath='qa/111-prospect-revamp.json';
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
if(manifest.count!==111||manifest.sites.length!==111)throw Error('Expected manifest of exactly 111 independent concepts');
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const hash=s=>[...s].reduce((h,c)=>(Math.imul(h,33)+c.charCodeAt(0))>>>0,5381);
const url=id=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1600&q=85';
const stock={
 matcha:['photo-1751563721808-3b81940b88f7','photo-1775846933630-3c1531299e5a','photo-1759363580278-058211df7102'],
 noodles:['photo-1725325514130-a48d295a09e4','photo-1657457320616-dad53ad0f038','photo-1563245372-f21724e3856d'],
 bar:['photo-1514933651103-005eec06c04b','photo-1470337458703-46ad1756a187','photo-1515003197210-e0cd71810b5f'],
 bakery:['photo-1509440159596-0249088772ff','photo-1484723091739-30a097e8f929','photo-1555507036-ab1f4038808a'],
 pizza:['photo-1513104890138-7c749659a591','photo-1579751626657-72bc17010498','photo-1565299624946-b28f40a0ae38'],
 restaurant:['photo-1517248135467-4c7edcad34c4','photo-1414235077428-338989a2e8c0','photo-1559339352-11d035aa65de'],
 mexican:['photo-1551504734-5ee1c4a1479b','photo-1565299585323-38d6b0865b47','photo-1552332386-f8dd00dc2f85'],
 oyster:['photo-1729269529109-b4254a628dba','photo-1769816042382-969141ce4b67','photo-1517248135467-4c7edcad34c4']
};
const tone={
 restaurant:{desc:['A place to gather, connect, and make the next meal a little more memorable.','Good company and a new place to discover: find your next table in the neighborhood.','Every outing begins with a place that catches your eye. Discover the setting and plan your visit.'],heads:['Around the table.','A reason to gather.','Find your place.'],cards:[['The atmosphere','Explore the setting and take a closer look at the space.'],['Food & drink','Visit or contact the business for current menus, offerings, and availability.'],['In the neighborhood','Map the location and discover what is nearby.']]},
 asian:{desc:['Follow the flavors, find the neighborhood, and discover your next stop for a satisfying meal.','A place for a meal worth sharing. Explore the location and plan the next outing.','From a quick lunch to a relaxed dinner, discover a dining destination near you.'],heads:['Follow the flavor.','Come hungry.','A good meal brings people together.'],cards:[['At the table','Explore the experience and find a reason to visit.'],['In the kitchen','Ask the business for verified dishes, prices, and current menu details.'],['Come by','Find the address and make your way over.']]},
 coffee:{desc:['Coffee, conversation, and the little moments between. Find your next neighborhood pause.','Make room in the day for something comforting. Discover the shop and where to find it.','Start the morning, take an afternoon break, or find somewhere new to unwind.'],heads:['Your daily ritual.','Something good is brewing.','Take your time.'],cards:[['Daily rituals','Make the coffee stop part of the day.'],['Your neighborhood','Discover a place to pause and connect.'],['Visit','Find the shop and plan the next stop.']]},
 matcha:{desc:['Slow down and make room for green tea, thoughtful flavors, and a brighter daily ritual.','A matcha moment can change the pace of the day. Discover the tea-forward experience.','Something green, something refreshing, and somewhere to return.'],heads:['A greener kind of ritual.','Made for the matcha moment.','Find your green hour.'],cards:[['Matcha moments','Discover a tea-focused stop for a refreshing break.'],['Beyond the cup','Check with the cafe for its latest drinks, sweets, and seasonal selections.'],['Your next stop','Find the address and plan a visit.']]},
 bakery:{desc:['From the first morning stop to the last little treat, make a bakery visit part of the day.','Discover baked goods, neighborhood energy, and the pleasure of picking something up.','Some of the best moments begin with the smell of something baking.'],heads:['Fresh beginnings.','Worth stopping for.','A little something from the oven.'],cards:[['At the counter','Discover the bakery and its welcoming neighborhood setting.'],['Freshly made','Ask the bakery for its current goods and availability.'],['Come in','Find the location and make the next visit easy.']]},
 sweets:{desc:['Make the ordinary feel like an occasion with something worth savoring.','Small celebrations deserve a little sweetness. Discover the neighborhood treat stop.','A little color, a little joy, and a reason to celebrate today.'],heads:['The sweet side of the day.','For all the little celebrations.','A treat worth finding.'],cards:[['Something sweet','Discover the inspiration behind a treat-focused stop.'],['For the occasion','Contact the business for confirmed flavors, ordering, and availability.'],['Visit','Find the neighborhood location and stop in.']]},
 bar:{desc:['For the hours after work and the nights worth remembering, find your next meeting spot.','Discover a place to meet, unwind, and make an evening of it.','Plan the next night out, from the first hello to the final conversation.'],heads:['Stay for the evening.','Good nights begin here.','Make a night of it.'],cards:[['The room','Get a feel for the atmosphere and setting.'],['What is on','Contact the venue for updated menus, schedules, and availability.'],['Find us','Get the location and plan the next meet-up.']]},
 pizza:{desc:['A neighborhood slice, a table with friends, and a reason to come together.','Find your next comfort-food stop and keep the good times rolling.','Few things bring people together like a good pizza outing.'],heads:['Made to share.','Find your slice.','Together tastes better.'],cards:[['The classics','Check the restaurant for up-to-date options and specials.'],['The gathering','A place to picture the next casual get-together.'],['Where to go','Find the shop and plan the next visit.']]},
 mexican:{desc:['Colorful moments begin around the table. Find your next flavor-filled stop.','Bring your appetite and your people. Discover a neighborhood dining destination.','Make a little room in your day for bold flavors and a shared meal.'],heads:['Bring your appetite.','Color outside the ordinary.','There is room for everyone.'],cards:[['The flavors','Find inspiration for the next dining outing.'],['The table','Bring friends and discover the setting.'],['Plan ahead','Contact the business for the current menu and visit details.']]},
 burger:{desc:['Bring the crew and your appetite. Good food is always better together.','Make the next casual meal worth the trip.','From a quick stop to a full table, discover the neighborhood food scene.'],heads:['For the hungry.','Always room for more.','Good food, good company.'],cards:[['The bite','Contact the restaurant for its latest offerings.'],['The moment','A casual stop for the next shared meal.'],['Find the spot','Get directions to the neighborhood location.']]},
 japanese:{desc:['Slow down and savor the details of a thoughtful dining experience.','An invitation to explore the table, the atmosphere, and a new destination.','Discover Japanese-inspired dining through a considered, welcoming lens.'],heads:['Savor the moment.','The details matter.','Find your next table.'],cards:[['The craft','Explore the mood and atmosphere.'],['The menu','Confirm current offerings directly with the business.'],['The visit','Get the address and discover the neighborhood.']]},
 wellness:{desc:['Take time for yourself and make a little more room for balance.','Move, reset, and make space for a calmer kind of day.','Discover a thoughtful approach to feeling good in the neighborhood.'],heads:['Find your balance.','Move how you feel.','Make room for you.'],cards:[['The practice','Explore the studio and its atmosphere.'],['Your routine','Contact the business for verified offerings and appointments.'],['Begin here','Find the location and plan the first visit.']]},
 entertainment:{desc:['Discover a reason to get together, make something happen, and enjoy the moment.','Good experiences begin when you show up. Find your next outing.','From shared interests to memorable nights, discover the neighborhood scene.'],heads:['Show up for the good stuff.','Something is happening here.','Make the moment count.'],cards:[['The experience','Find out what makes a night out memorable.'],['What is next','Contact the venue for upcoming events and schedule details.'],['Come through','Map the location and plan an outing.']]},
 creative:{desc:['Ideas are meant to take shape. Find a place for creative thinking and work.','Discover a local destination for making, imagining, and connecting.','A place to explore a point of view and new ideas.'],heads:['Make room for ideas.','Creativity has a place.','Made to discover.'],cards:[['The approach','An introduction to the work and creative vision.'],['The offering','Contact the business for current services.'],['Connect','Find the location and next step.']]},
 flowers:{desc:['Make room for something beautiful in the everyday.','Moments bloom when you pay attention to the details.','Discover an easy way to bring color into the day.'],heads:['Let the day bloom.','Find something beautiful.','Color in every moment.'],cards:[['The inspiration','Discover the beauty of everyday botanical design.'],['The arrangements','Contact the studio for confirmed services and arrangements.'],['Drop by','Find the studio and explore the neighborhood.']]},
 retail:{desc:['Find a little inspiration in an unexpected new favorite.','Curiosity starts at the front door. Discover something new.','A place for the things that make your day more interesting.'],heads:['Curiosity is welcome.','Find your next favorite.','Discover the difference.'],cards:[['The collection','Ask the shop about confirmed inventory and offerings.'],['The experience','Browse a curated atmosphere designed for discovery.'],['Come through','Find the address and plan your stop.']]}
};
let stats={count:0,imagesFixed:0,genreFixed:0};
for(const site of manifest.sites){
 const path='preview/'+site.slug+'/index.html';
 let html=await readFile(path,'utf8');
 const oldPhotos=site.photos.slice();
 let genre=site.genre;
 if(['aoko-matcha','jane-s-matcha'].includes(site.slug)) genre='matcha';
 if(['anna-bella-pizza-cafe'].includes(site.slug))genre='pizza';
 if(['cafe-69-sports-bar','chianti-sports-bar-and-restaurant-sugar-and-cake'].includes(site.slug))genre='bar';
 if(['dumbo-oyster-bar','cloud-catering'].includes(site.slug))genre='restaurant';
 if(['oreas-gourmet-juice-bar','senzu-juice-and-smoothies'].includes(site.slug))genre='coffee';
 if(['barchino'].includes(site.slug))genre='pizza';
 if(['ato-kitchens'].includes(site.slug))genre='mexican';
 let photos=site.photos;
 if(genre==='matcha')photos=stock.matcha.map((v,i)=>url(stock.matcha[(i+hash(site.slug)%3)%3]));
 if(genre==='asian'&&(/noodle/i.test(site.name)))photos=stock.noodles.map((v,i)=>url(stock.noodles[(i+hash(site.slug)%3)%3]));
 if(genre==='pizza'&&site.genre!=='pizza')photos=stock.pizza.map(url);
 if(genre==='bar'&&site.genre!=='bar')photos=stock.bar.map(url);
 if(genre==='restaurant'&&site.genre!=='restaurant')photos=stock.restaurant.map(url);
 if(genre==='mexican'&&site.genre!=='mexican')photos=stock.mexican.map(url);
 if(site.slug==='dumbo-oyster-bar')photos=stock.oyster.map(url);
 if(genre==='coffee'&&site.genre!=='coffee')photos=site.photos.map((v,i)=>url(['photo-1495474472287-4d71bcdd2085','photo-1442512595331-e89e73853f31','photo-1501339847302-ac426a4a7cbb'][i]));
 photos=photos.map(v=>v.replace('photo-1608198093002-ad4e005484df','photo-1509440159596-0249088772ff').replace('photo-1536935338788846bb9981813','photo-1470337458703-46ad1756a187'));
 for(let i=0;i<oldPhotos.length;i++){
   const updated=html.split(oldPhotos[i]).join(photos[i]);
   if(updated!==html)stats.imagesFixed++;
   html=updated;
 }
 const voice=tone[genre]||tone.restaurant;
 const choice=hash(site.slug)%3;
 const name=esc(site.name),area=esc(site.area);
 const newDesc=voice.desc[choice];
 html=html.replace(/<p class="hero-description">[\s\S]*?<\/p>/, '<p class="hero-description">'+esc(newDesc)+'</p>');
 html=html.replace(/(<div class="story-body"><p>)[\s\S]*?(<\/p>)/,'$1'+esc(newDesc)+'$2');
 const storyVariants=[
   'Step inside the idea of '+name+' in '+area+'. Find the essentials, discover the setting, and make your next stop feel easy.',
   'In '+area+', '+name+' is a place to add to your neighborhood discoveries. Find the address and start exploring.',
   'Discover '+name+' in '+area+'. The details here are designed to help you get a feel for the place and find your way.'
 ];
 html=html.replace(/(<div class="story-body"><p>[\s\S]*?<\/p><p>)[\s\S]*?(<\/p>)/,'$1'+storyVariants[choice]+'$2');
 html=html.replace(/(<section class="story section" id="experience">[\s\S]*?<h2>)[\s\S]*?(<\/h2>)/,'$1'+esc(voice.heads[choice])+'$2');
 html=html.replace(/(<section class="details section" id="details">[\s\S]*?<h2>)[\s\S]*?(<\/h2>)/,'$1'+esc(voice.heads[(choice+1)%3])+'$2');
 html=html.replace(/(<div class="feature-grid">)[\s\S]*?(<\/div><\/section>)/,(match,open,close)=>open+voice.cards.map((v,i)=>'<article class="feature"><span class="feature-index">0'+(i+1)+'</span><h3>'+esc(v[0])+'</h3><p>'+esc(v[1])+'</p><span class="feature-rule"></span></article>').join('')+close);
 if(genre==='matcha'){
   html=html.replace(/<p class="hero-line">[\s\S]*?<\/p>/,'<p class="hero-line">'+esc(voice.heads[choice])+'</p>');
   html=html.replace(/SWEETS IN FOCUS/g,'MATCHA IN FOCUS');
   html=html.replace(/SWEET<\/span>/g,'MATCHA</span>').replace(/CELEBRATE<\/span>/g,'RITUAL</span>').replace(/DISCOVER<\/span>/g,'SAVOR</span>');
 }
 if(genre!=='matcha'&&site.genre!==genre) html=html.replace(new RegExp(site.genre.toUpperCase()+' IN FOCUS','g'),genre.toUpperCase()+' IN FOCUS');
 if(site.genre!==genre){stats.genreFixed++;site.genre=genre;}
 site.photos=photos;
 await writeFile(path,html);
 if(genre==='matcha'){
   const cssPath='preview/'+site.slug+'/styles.css';
   let css=await readFile(cssPath,'utf8');
   css=css.replace(/:root\{--paper:[^}]*--radius:/,':root{--paper:#e2ebd9;--ink:#243e30;--accent:#6c9368;--muted:#84927d;--headline:Georgia, serif;--body:Arial, Helvetica, sans-serif;--hero-size:clamp(4rem,8vw,9rem);--radius:');
   await writeFile(cssPath,css);
 }
 stats.count++;
}
manifest.polishedAt=new Date().toISOString();
manifest.polishStats=stats;
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log('POLISHED 111: ',JSON.stringify(stats));

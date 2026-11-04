const menuData={
ramen:{caption:"A BOWL FOR EVERY MOOD.",image:"ramen-set.jpg",items:[["Tonkotsu Ramen","Pork broth with chashu, marinated egg, mushrooms, bamboo shoots, naruto, seaweed, scallions and black garlic oil.","$20"],["Spicy Tonkotsu Ramen","A spicy variation of Susukino's tonkotsu ramen.","$20"],["Shoyu Ramen","Chicken broth with seafood-flavored shoyu, truffle sauce, chicken, marinated egg, mushrooms, bamboo shoots, nori and scallions.","$20"],["Spicy Shoyu Ramen","Spicy chicken broth with seafood-flavored shoyu, truffle sauce, chicken and traditional ramen toppings.","$20"],["Vegetable Ramen","A vegetable-based ramen option.","$19"],["Susukino Ramen","The restaurant's namesake ramen bowl.","$21"]]},
sushi:{caption:"SOMETHING WORTH SHARING.",image:"photo-09.jpg",items:[["Water St Roll","A signature special roll named for the neighborhood.","$18"],["Stone St Roll","A downtown-inspired special roll.","$19"],["Rainbow Roll","A colorful sushi roll favorite.","$17"],["Salmon Avocado Roll","Salmon and avocado maki.","$8.50"],["Shrimp Tempura Roll","Crispy shrimp tempura maki.","$8.50"],["3 Roll Set","Three-roll maki selection.","$24"]]},
sets:{caption:"THE WHOLE TABLE, COVERED.",image:"photo-08.jpg",items:[["Dinner Set","Choose a ramen or rice bowl, an appetizer and a maki roll.","$29"],["Lunch Ramen Set","An available ramen-and-roll lunch combination.","$21"],["Chicken Teriyaki Box","Teriyaki chicken bento.","$23"],["Gyu Don Box","Beef rice bowl set.","$23"],["Salmon Teriyaki Box","Salmon teriyaki bento.","$25"],["Sushi Dinner","Sushi dinner combination.","$25"],["Sashimi Dinner","Chef's sashimi dinner selection.","$35"]]},
more:{caption:"MAKE ROOM FOR MORE.",image:"photo-10.jpg",items:[["Gyu Don","Beef and rice bowl.","$20"],["Chicken Katsu Don","Chicken katsu rice bowl.","$19"],["Unagi Don","Grilled eel over rice.","$25"],["Spicy Dandan Rice","A spicy dandan-style rice dish.","$16"],["Takoyaki","Fried octopus balls with mayonnaise and takoyaki sauce.","$9"],["Karaage","Japanese fried boneless chicken.","$10"],["Pork Gyoza","Six pan-fried Japanese dumplings.","$9"],["Sake & Japanese Beer","Explore available pours and current happy hour specials.","Ask us"]]}
};
const tabs=[...document.querySelectorAll('[data-menu]')];
const items=document.querySelector('#menu-items');
const image=document.querySelector('#menu-image');
const caption=document.querySelector('#menu-caption');
const panel=document.querySelector('#menu-panel');
function paintMenu(key){const group=menuData[key];if(!group)return;items.replaceChildren();for(const [name,desc,price] of group.items){const wrap=document.createElement('div');wrap.className='dish';const copy=document.createElement('div');const title=document.createElement('h3');title.textContent=name;const text=document.createElement('p');text.textContent=desc;copy.append(title,text);const cost=document.createElement('strong');cost.textContent=price;wrap.append(copy,cost);items.append(wrap)}delete image.dataset.failed;image.src=/^(?:https?:|data:)/.test(group.image)?group.image:'/susukino/assets/'+group.image;caption.textContent=group.caption;for(const tab of tabs){const selected=tab.dataset.menu===key;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1}panel.setAttribute('aria-labelledby','tab-'+key)}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>paintMenu(tab.dataset.menu));tab.addEventListener('keydown',e=>{const shift=e.key==='ArrowRight'?1:e.key==='ArrowDown'?1:e.key==='ArrowLeft'?-1:e.key==='ArrowUp'?-1:0;if(!shift)return;e.preventDefault();const next=tabs[(i+shift+tabs.length)%tabs.length];paintMenu(next.dataset.menu);next.focus()})});
document.querySelector('[data-show-sets]')?.addEventListener('click',()=>{paintMenu('sets');document.querySelector('#menu')?.scrollIntoView({behavior:'smooth',block:'start'})});
const menuBtn=document.querySelector('.menu-toggle');const mobile=document.querySelector('#mobile-nav');
function closeMenu(){mobile.hidden=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open navigation')}
menuBtn.addEventListener('click',()=>{const open=mobile.hidden;mobile.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(!mobile.hidden&&!e.target.closest('.site-header'))closeMenu()});
const observer=window.IntersectionObserver?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.10}):null;document.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('is-visible'));
const stockFallbacks=[
'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1400&q=85',
'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1400&q=85',
'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85'
];
document.querySelectorAll('img').forEach((img,index)=>{
 const replace=()=>{
  if(img.dataset.failed)return;
  img.dataset.failed='1';
  if(img.closest('.brand-ring')){img.remove();return}
  img.src=stockFallbacks[index%stockFallbacks.length];
 };
 img.addEventListener('error',replace);
 if(img.complete&&img.naturalWidth===0)replace();
});

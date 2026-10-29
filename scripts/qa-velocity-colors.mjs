import {chromium} from 'playwright';
import {sampleForTemplate} from '../shared/model.mjs';
import {renderApprovedDesignPages} from '../shared/approved-pages.mjs';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('..',import.meta.url));
const server=createServer(async(req,res)=>{try{const p=new URL(req.url,'http://local').pathname;const file=path.resolve(root,'.'+p);if(!file.startsWith(root))throw Error('Invalid path');res.end(await readFile(file));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{}),args:['--no-sandbox']});
const results=[];
try{
 for(const appearance of ['dark','light'])for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const secondary of ['#1d53d7','#efad34']){
   const sample=sampleForTemplate('md-bugatti');
   const input={...sample,design:{...sample.design,primary:'#ff0077',secondary,appearance}};
   const pages=renderApprovedDesignPages(input);
   for(const [name,html] of Object.entries(pages)){
    await page.goto(origin);await page.setContent(html,{waitUntil:'domcontentloaded'});
    const values=await page.evaluate(()=>{
     const bg=el=>getComputedStyle(el).backgroundColor;
     const section=[...document.querySelectorAll('main>section')].filter(el=>!el.classList.contains('fv-hero')).find(el=>getComputedStyle(el).backgroundColor!=='rgba(0, 0, 0, 0)');
     const styles=getComputedStyle(document.body);
     return {body:bg(document.body),header:bg(document.querySelector('header')),footer:bg(document.querySelector('footer')),section:section&&bg(section),sectionInk:section&&getComputedStyle(section).color,overflow:document.documentElement.scrollWidth-innerWidth,canvas:styles.getPropertyValue('--awe-canvas').trim(),surface:styles.getPropertyValue('--awe-surface').trim()};
    });
    assert(values.canvas&&values.surface,name+' missing palette');
    const rgb=hex=>'rgb('+[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)).join(', ')+')';
    assert.equal(values.header,rgb(values.canvas),name+' header ignores picker');assert.equal(values.footer,rgb(values.canvas),name+' footer ignores picker');
    assert.equal(values.section,rgb(values.surface),name+' section ignores picker');assert(values.overflow<=1,name+' horizontal overflow '+values.overflow);
    if(width===390){await page.locator('.fv-mobile-menu summary').click();assert(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible());}
    results.push({appearance,width,secondary,name,...values});
   }
  }
  await page.close();
 }
 console.log('PASS: '+results.length+' Velocity chapter/viewport/palette combinations; header, footer, content surfaces, narrow menu, and overflow.');
 const luminance=rgb=>rgb.match(/\d+/g).map(Number).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
 for(const row of results){const [low,high]=[luminance(row.section),luminance(row.sectionInk)].sort((a,b)=>a-b);assert((high+.05)/(low+.05)>=4.5,row.name+' insufficient surface contrast');}
 console.log('PASS: surface text contrast is at least 4.5:1 in every tested palette.');
}finally{await browser.close();await new Promise(r=>server.close(r));}

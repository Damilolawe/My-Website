import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import sharp from 'sharp';

const root = resolve('branded-previews/public');
const manifest = JSON.parse(await readFile('qa/111-prospect-revamp.json','utf8'));
const output = resolve('artifacts/prospect-111-qa');
await mkdir(output,{recursive:true});
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'};
const server=createServer(async(req,res)=>{
  try {
    const uri=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const file=resolve(root,'.'+(uri.endsWith('/')?uri+'index.html':uri));
    if(file!==root&&!file.startsWith(root+sep)) throw Error('Invalid path');
    const contents=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(contents);
  }catch {res.writeHead(404);res.end('Not found')}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const specs=[{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844,isMobile:true,deviceScaleFactor:1}];
const report=[];
for(const spec of specs){
  const context=await browser.newContext({viewport:{width:spec.width,height:spec.height},isMobile:spec.isMobile,deviceScaleFactor:1});
  let cursor=0;
  const worker=async()=>{
    while(cursor<manifest.sites.length){
      const site=manifest.sites[cursor++];
      const page=await context.newPage();
      const record={slug:site.slug,view:spec.name,issues:[],screenshot:site.slug+'-'+spec.name+'.jpg'};
      try{
        const response=await page.goto(base+'/'+site.slug+'/',{waitUntil:'domcontentloaded',timeout:20000});
        if(!response||!response.ok()) record.issues.push('Page did not load');
        await page.evaluate(async()=>{
          const arr=Array.from(document.images);
          arr.forEach(img=>img.loading='eager');
          await Promise.race([Promise.all(arr.map(img=>img.decode().catch(()=>null))),new Promise(r=>setTimeout(r,9000))]);
        });
        const metrics=await page.evaluate(()=>{
          const vw=document.documentElement.clientWidth;
          const issues=[];
          if(document.documentElement.scrollWidth>vw+3)issues.push('Horizontal page overflow '+document.documentElement.scrollWidth+'px at '+vw+'px');
          for(const x of document.querySelectorAll('h1,h2,h3,p,a,button')){
            const r=x.getBoundingClientRect(),css=getComputedStyle(x);
            if(css.display==='none'||css.visibility==='hidden'||r.width<1||r.height<1)continue;
            if(!x.matches('.skip') && (r.left<-5||r.right>vw+5))issues.push('Text outside viewport: '+x.tagName+' '+x.textContent.trim().slice(0,45));
          }
          for(const img of document.images)if(img.currentSrc&&img.complete&&img.naturalWidth===0)issues.push('Broken image '+img.getAttribute('src').slice(0,100));
          for(const link of document.querySelectorAll('a[href^="#"]')) {
            const id=link.getAttribute('href').slice(1);
            if(id&&!document.getElementById(id))issues.push('Broken anchor #'+id);
          }
          const marquee=document.querySelector('.marquee-track');
          if(!marquee || getComputedStyle(marquee).animationName==='none')issues.push('Marquee animation missing');
          return {issues,viewport:vw,scrollWidth:document.documentElement.scrollWidth,images:document.images.length,title:document.title};
        });
        record.issues.push(...metrics.issues);record.metrics=metrics;
        if(spec.name==='desktop'){
          const banner=await page.evaluate(async()=>{
            const el=document.querySelector('.marquee-track');
            if(!el)return {ok:false,reason:'Missing marquee track'};
            const before=el.getBoundingClientRect().left;
            await new Promise(resolve=>setTimeout(resolve,900));
            const after=el.getBoundingClientRect().left;
            return {ok:Math.abs(after-before)>2,delta:after-before,width:el.getBoundingClientRect().width};
          });
          record.banner=banner;
          if(!banner.ok)record.issues.push('Desktop banner not visibly moving: '+JSON.stringify(banner));
        }
        if(spec.name==='mobile'){
          const menu=page.locator('[data-menu]');
          await menu.click();
          if(await menu.getAttribute('aria-expanded')!=='true')record.issues.push('Mobile nav did not open');
          await menu.click();
          if(await menu.getAttribute('aria-expanded')!=='false')record.issues.push('Mobile nav did not close');
        }
        await page.screenshot({path:join(output,record.screenshot),type:'jpeg',quality:65,fullPage:true,animations:'disabled',timeout:20000});
      }catch(err){record.issues.push('Browser error: '+err.message)}
      report.push(record);
      console.log(record.issues.length?'WARN ':'PASS ',spec.name,site.slug,record.issues.slice(0,3).join(' | '));
      await page.close();
    }
  };
  await Promise.all(Array.from({length:5},worker));
  await context.close();
}
await browser.close();server.close();
const failures=report.filter(x=>x.issues.length);
const summary={total:manifest.sites.length,checks:report.length,passed:report.length-failures.length,flagged:failures.length,issues:failures,completedAt:new Date().toISOString()};
await writeFile(join(output,'qa-results.json'),JSON.stringify(summary,null,2));
for(const view of ['desktop','mobile']){
 const entries=report.filter(r=>r.view===view);
 for(let offset=0;offset<entries.length;offset+=12){
   const subset=entries.slice(offset,offset+12);
   const tileW=265,tileH=380,columns=4,rows=3;
   const background=sharp({create:{width:tileW*columns,height:tileH*rows,channels:3,background:'#202124'}});
   const layers=[];
   for(let i=0;i<subset.length;i++){
     const s=subset[i],x=(i%columns)*tileW,y=Math.floor(i/columns)*tileH;
     try{
       const shot=await sharp(join(output,s.screenshot)).resize(tileW-16,tileH-43,{fit:'cover',position:'north'}).jpeg({quality:65}).toBuffer();
       layers.push({input:shot,left:x+8,top:y+30});
       const label=s.slug.replace(/&/g,'&amp;').replace(/</g,'&lt;').slice(0,31);
       const svg=Buffer.from('<svg width="265" height="29"><text x="8" y="19" fill="#fff" font-family="Arial" font-size="11">'+label+'</text></svg>');
       layers.push({input:svg,left:x,top:y});
     }catch{}
   }
   await background.composite(layers).jpeg({quality:76}).toFile(join(output,'contact-'+view+'-'+String(Math.floor(offset/12)+1).padStart(2,'0')+'.jpg'));
 }
}
console.log('QA SUMMARY',JSON.stringify({count:summary.total,checks:summary.checks,passed:summary.passed,flagged:summary.flagged}));
if(summary.flagged)process.exitCode=1;

#!/usr/bin/env python3
"""Report real computed text contrast and color roles for all 42 templates.
Uses browser-rendered styles, not source-string color guesses. Reports strong
signals only; gradient/media overlays are measured separately for manual review.
"""
import json, os, pathlib, sys
from playwright.sync_api import sync_playwright
BASE = 'http://127.0.0.1:' + os.environ.get('PORT','8765')
ROOT=pathlib.Path('color-qa-output'); ROOT.mkdir(exist_ok=True)
IDS=["index","folio","still","afterhours","signal","daylight","liquidmetal",
"atlas","terminal","orbit","playbill","monologue","portraiture","contactsheet",
"atelier","museum","brutalist","nocturne","foundry","bloom","ledger","arcade",
"nightgrid","couture","signaldeck","obsidian","highlighter","acidchrome","voidstage",
"studiomargaux","neomemphis","monobrutalist","vestigefolio","botanicalpress",
"limepress","gazettebroadside","risograph","runwayml","runwaymulti","nike","clay","ferrari"]
JS=r"""() => {
 const selectors='h1,h2,h3,h4,p,a,button,summary,blockquote,figcaption,nav span,header span,footer span,.fe-kicker,.fd-overline,.trio-label,.arcade-label,.rw-small-label';
 function rgba(s){const z=s.match(/rgba?\(([^)]+)\)/);if(!z)return null;const n=z[1].split(/[, /]+/).filter(Boolean).map(Number);if(n.length<3)return null;return [n[0],n[1],n[2],n[3]===undefined?1:n[3]];}
 function linear([r,g,b]){return [r,g,b].map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4})}
 function luminance(c){return linear(c).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);}
 function contrast(a,b){let x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
 function bgFor(el){
   let cur=el;
   while(cur){
     const cs=getComputedStyle(cur);
     if(cs.backgroundImage!=='none')return null; // gradient, image, no flat-color assumptions
     const bg=rgba(cs.backgroundColor);
     if(bg&&bg[3]>.96)return bg;
     if(bg&&bg[3]>.015)return null;
     cur=cur.parentElement;
   }
   return [255,255,255,1];
 }
 const elements=[...document.querySelectorAll(selectors)].filter(el=>{
   const rect=el.getBoundingClientRect(),style=getComputedStyle(el);
   if(rect.width<14||rect.height<10||style.display==='none'||style.visibility!=='visible'||+style.opacity<.75)return false;
   if(!el.textContent?.trim()||el.querySelector('a,button,h1,h2,h3,h4,p'))return false;
   return true;
 });
 const issues=[],samples=[];const ratios=[];
 for(const el of elements){
   const cs=getComputedStyle(el);const fg=rgba(cs.color),bg=bgFor(el);
   if(!fg||!bg||fg[3]<.97)continue;
   const r=contrast(fg,bg),size=parseFloat(cs.fontSize),weight=parseInt(cs.fontWeight)||400;
   const large=size>=24||(size>=18.66&&weight>=700),minimum=large?3:4.5;
   const note={tag:el.tagName,cls:String(el.className).slice(0,90),text:el.textContent.trim().slice(0,65),ratio:+r.toFixed(2),minimum,fg:cs.color,bg:`rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`,font:size};
   ratios.push(r);
   if(r<minimum-.15)issues.push(note);
   else if(samples.length<14 && el.matches('h1,h2,h3,a,button'))samples.push(note);
 }
 const body=getComputedStyle(document.body);
 return {totalText:elements.length,measured:ratios.length,lowContrast:issues.length,issues:issues.slice(0,35),samples,
    background:body.backgroundColor,color:body.color,primary:body.getPropertyValue('--accent').trim(),
    secondary:body.getPropertyValue('--secondary').trim(),onAccent:body.getPropertyValue('--on-accent').trim(),
    colorMarker:!!document.querySelector('[data-awe-color-system]')};
}"""
def main():
 allrows=[]
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True)
  for id in IDS:
   for label,w,h in [('mobile',390,844),('desktop',1440,900)]:
    p=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
    try:
     response=p.goto(f'{BASE}/templates/{id}.html',wait_until='domcontentloaded',timeout=20000)
     stats=p.evaluate(JS)
     if stats['lowContrast'] or not response or response.status!=200:
      p.screenshot(path=str(ROOT/f'{id}-{label}.png'),full_page=False)
     allrows.append({'id':id,'viewport':label,'http':response.status if response else 0,**stats})
    except Exception as e:
     allrows.append({'id':id,'viewport':label,'error':str(e)[:330]})
    finally:p.close()
  browser.close()
 (ROOT/'report.json').write_text(json.dumps(allrows,indent=2))
 for row in allrows:
  if row.get('error'):print('ERROR',row['id'],row['viewport'],row['error']);continue
  issues=row.get('issues',[])
  print('COLOR',row['id'],row['viewport'],'tested',row['measured'],'low',row['lowContrast'],
     'background',row['background'],'foreground',row['color'],'accent',row['primary'])
  for x in issues[:8]:print('  LOW',x['ratio'],x['minimum'],x['tag'],x['cls'],repr(x['text']),x['fg'],x['bg'])
 total=sum(x.get('lowContrast',0) for x in allrows)
 print('TOTAL',len(allrows),'VIEWS,',total,'LOW-CONTRAST ELEMENTS')
 # This prevents low-contrast labels from reappearing in future releases.
 return int(total>0 or any(x.get('error') or x.get('http')!=200 for x in allrows))
if __name__=='__main__':sys.exit(main())

#!/usr/bin/env python3
"""Visual smoke test for Awe Concepts' 35 upgraded templates.

Run after npm run build with a local HTTP server on PORT. The output includes
viewport screenshots, detailed JSON and readable findings. No checkout and no
customer data are accessed.
"""
import json, os, pathlib, re, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path("qa-output")
ROOT.mkdir(exist_ok=True)
IDS = [
 "index","still","afterhours","signal","daylight","atlas","terminal","orbit",
 "playbill","monologue","portraiture","contactsheet","atelier","museum",
 "brutalist","nocturne","foundry","bloom","ledger","arcade","nightgrid",
 "couture","signaldeck","obsidian","highlighter","acidchrome","voidstage",
 "studiomargaux","neomemphis","monobrutalist","vestigefolio","botanicalpress",
 "limepress","gazettebroadside","risograph",
]
PROTECTED = ["folio","liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"]
BASE = "http://127.0.0.1:" + os.environ.get("PORT", "8765")
SIZES = [("mobile320",320,720),("mobile390",390,844),("desktop",1440,900)]
JS = r"""() => {
 const h1=document.querySelector('h1');
 const root=document.documentElement, body=document.body;
 const all=[...document.querySelectorAll('h1,h2,h3,.hero-copy,.md-hero-copy,.fd-copy,header,nav,main')];
 const over=all.filter(el=>el.getBoundingClientRect().width>0 && 
    el.scrollWidth>el.clientWidth+5 && getComputedStyle(el).overflowX==='visible')
    .slice(0,12).map(el=>({tag:el.tagName,cls:String(el.className).slice(0,90),
        scroll:el.scrollWidth,width:el.clientWidth}));
 const nav=[...document.querySelectorAll('nav a[href^="#"]')];
 const brokenAnchors=nav.filter(a=>!document.getElementById(a.getAttribute('href').slice(1)))
    .map(a=>a.textContent.trim());
 const images=[...document.querySelectorAll('img')];
 const blank=images.filter(img=>!img.complete||img.naturalWidth===0)
     .map(img=>img.currentSrc||img.src).slice(0,10);
 return {width:innerWidth,scrollWidth:Math.max(root.scrollWidth,body.scrollWidth),
    pageHeight:Math.max(root.scrollHeight,body.scrollHeight),h1:h1?.textContent?.trim()||'',
    renderedSections:document.querySelectorAll('section').length,brokenAnchors,
    textOverflows:over,images:images.length,unloadedImages:blank,
    upgradeMarker:!!document.querySelector('[data-awe-design-study]')};
}"""
def main():
  findings=[]
  with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True)
    for id in IDS + PROTECTED:
      for label,w,h in SIZES:
        page=browser.new_page(viewport={"width":w,"height":h},device_scale_factor=1)
        errors=[]
        page.on("pageerror",lambda error:errors.append(str(error)[:300]))
        try:
          response=page.goto(f"{BASE}/templates/{id}.html",
                             wait_until="domcontentloaded",timeout=18000)
          page.wait_for_timeout(250)
          stats=page.evaluate(JS)
          issues=[]
          if not response or response.status!=200: issues.append("page-not-200")
          if not stats["h1"]:issues.append("missing-h1")
          if stats["scrollWidth"]>w+3:issues.append("horizontal-overflow")
          if stats["brokenAnchors"]:issues.append("broken-nav-anchors")
          if stats["textOverflows"]:issues.append("content-overflows")
          if id in IDS and not stats["upgradeMarker"]:issues.append("missing-upgrade")
          if id in PROTECTED and stats["upgradeMarker"]:issues.append("protected-modified")
          if errors:issues.append("javascript-error")
          out=ROOT/f"{id}-{label}.jpg"
          page.screenshot(path=str(out),type="jpeg",quality=72,animations="disabled")
          findings.append({"template":id,"viewport":label,"issues":issues,
                           "errors":errors,"stats":stats,"image":out.name})
        except Exception as exc:
          findings.append({"template":id,"viewport":label,"issues":["browser-exception"],
                           "exception":str(exc)[:500]})
        finally:
          page.close()
    browser.close()
  (ROOT/"report.json").write_text(json.dumps(findings,indent=2),encoding="utf-8")
  errors=[r for r in findings if r["issues"]]
  print(f"VISUAL QA: {len(findings)} pages checked, {len(errors)} flagged.")
  for row in errors[:90]:
    print(f"  {row['template']} {row['viewport']}: {','.join(row['issues'])} "
          f"{row.get('stats',{}).get('textOverflows',[])[:2]}")
  return int(bool(errors))

if __name__=="__main__":
    sys.exit(main())

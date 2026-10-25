#!/usr/bin/env python3
"""Browser QA for the 74 staged source-guided templates. Never uses customer data."""
import json, pathlib, re, sys, os
from playwright.sync_api import sync_playwright

ROOT=pathlib.Path("zip-qa-output")
ROOT.mkdir(exist_ok=True)
BASE="http://127.0.0.1:"+os.getenv("PORT","8765")
source=pathlib.Path("shared/zip-design-catalog.mjs").read_text()
matched=re.search(r'export const paletteRows=("(?:\\.|[^"])*");',source)
if not matched: raise RuntimeError("Missing design catalog")
rows=json.loads(matched.group(1)).split("\n")
items=[("md-"+re.sub(r"[^a-z0-9]+","-",r.split("|")[0]).strip("-"),r.split("|")[-1]=="M") for r in rows]
assert len(items)==74
SIZES=[("mobile320",320,750),("mobile390",390,844),("laptop",1200,850),("desktop",1440,900)]
SCRIPT=r"""() => {
 const $=(sel)=>[...document.querySelectorAll(sel)];
 const width=window.innerWidth;
 const sections=$('h1,h2,h3,.hero,header,nav,main,.hero-copy,.visual,.card,.card-art');
 const clipped=sections.filter(el=>{
  const r=el.getBoundingClientRect(),s=getComputedStyle(el);
  return r.width>0 && (r.right>width+3 || r.left< -3 || (el.scrollWidth>el.clientWidth+5 && s.overflowX==='visible'));
 }).slice(0,12).map(el=>({tag:el.tagName,cls:String(el.className).slice(0,70),text:el.textContent.trim().slice(0,42)}));
 const badAnchor=$('nav a[href^="#"]').filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(x=>x.textContent.trim());
 const headline=document.querySelector('h1');
 const h=headline?getComputedStyle(headline):null;
 const main=document.querySelector('main');
 return {
  pageWidth:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),
  headline:headline?.textContent.trim(),headlineCount:$('h1').length,
  sections:$('main section').length,cardCount:$('.card').length,
  hasMain:!!main,hasViewport:!!document.querySelector('meta[name="viewport"]'),
  contrast:[getComputedStyle(document.body).color,getComputedStyle(document.body).backgroundColor],
  brokenNav:badAnchor,clipped,hasScript:$('script').length>0,
  headingStyle:h?{font:h.fontFamily,letterSpacing:h.letterSpacing,lineHeight:h.lineHeight}:null
 };
}"""
def main():
 out=[]
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True)
  for template,multi in items:
   for mode,w,h in SIZES:
    page=browser.new_page(viewport={"width":w,"height":h},device_scale_factor=1)
    errors=[]
    page.on("pageerror",lambda exc:errors.append(str(exc)[:200]))
    try:
     resp=page.goto(BASE+"/templates/"+template+".html",wait_until="domcontentloaded",timeout=15000)
     info=page.evaluate(SCRIPT)
     failures=[]
     if not resp or resp.status!=200:failures.append("http")
     if info["pageWidth"]>w+3:failures.append("horizontal-scroll")
     if info["clipped"]:failures.append("clipped-content")
     if info["brokenNav"]:failures.append("broken-page-anchor")
     if not info["headline"] or info["headlineCount"]!=1:failures.append("headline")
     if not info["hasMain"] or not info["hasViewport"]:failures.append("structure")
     if info["hasScript"] or errors:failures.append("unsafe-script-error")
     if info["sections"]<2:failures.append("missing-sections")
     if mode in ("mobile390","desktop") or failures:
      page.screenshot(path=str(ROOT/(template+"-"+mode+".jpg")),type="jpeg",quality=65,animations="disabled",full_page=False)
     out.append({"template":template,"page":"home","view":mode,"issues":failures,"info":info})
    except Exception as exc:out.append({"template":template,"page":"home","view":mode,"issues":["exception"],"detail":str(exc)[:350]})
    finally:page.close()
   if multi:
    for target in ["home","work","features","studio","contact"]:
     page=browser.new_page(viewport={"width":390,"height":844})
     try:
      resp=page.goto(BASE+"/templates/"+template+"/"+target+".html",wait_until="domcontentloaded",timeout=15000)
      info=page.evaluate(SCRIPT)
      page_links=page.locator("nav a").count()
      issues=[]
      if not resp or resp.status!=200:issues.append("page-http")
      if not info["hasMain"] or not info["headline"]:issues.append("page-structure")
      if info["pageWidth"]>393 or info["clipped"]:issues.append("page-overflow")
      if page_links!=5:issues.append("nav-incomplete")
      if page.locator('nav a[aria-current="page"]').count()!=1:issues.append("active-navigation")
      out.append({"template":template,"page":target,"view":"mobile390","issues":issues,"info":info})
     except Exception as exc:out.append({"template":template,"page":target,"issues":["exception"],"detail":str(exc)[:350]})
     finally:page.close()
  # Exercise a real five-page AWE Express gallery preview, not just static documents.
  page=browser.new_page(viewport={"width":1200,"height":850})
  try:
   page.goto(BASE+"/order.html",wait_until="domcontentloaded",timeout=20000)
   page.locator('[data-tier="signature"]').click(timeout=12000)
   page.locator('#worlds-choices [data-world="md-framer"]').click(timeout=15000)
   bar=page.locator(".worlds-page-list")
   assert bar.is_visible(timeout=12000) and bar.locator("button").count()==5
   bar.get_by_role("button",name="WORK").click(timeout=10000)
   page.wait_for_function('() => document.querySelector("#worlds-frame")?.srcdoc?.includes("Work by design.")',timeout=20000)
   assert bar.get_by_role("button",name="WORK").get_attribute("aria-pressed")=="true"
   assert page.locator("#express-study-status").is_visible()
   bar.get_by_role("button",name="CONTACT").click()
   page.wait_for_function('() => document.querySelector("#worlds-frame")?.srcdoc?.includes("Make it yours.")',timeout=20000)
   out.append({"template":"md-framer","page":"Express five-page controls","view":"laptop","issues":[]})
  except Exception as exc:
   out.append({"template":"md-framer","page":"Express five-page controls","view":"laptop","issues":["gallery-interaction"],"detail":str(exc)[:400]})
  finally:page.close()
  browser.close()
 (ROOT/"report.json").write_text(json.dumps(out,indent=2))
 failures=[x for x in out if x["issues"]]
 print(f"New-design browser QA: {len(out)} page+viewport checks, {len(failures)} failures.")
 for x in failures[:50]:print(x["template"],x["page"],x.get("view",""),",".join(x["issues"]),x.get("info",{}).get("clipped",[])[:2])
 return int(bool(failures))
if __name__=="__main__":sys.exit(main())

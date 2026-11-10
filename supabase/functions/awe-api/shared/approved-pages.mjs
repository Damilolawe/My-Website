// Render approved customer-site pages from the immutable version only.
// The caller enforces ownership, review and publication authorization.
import {normalize} from "./model.mjs";
import {applyAweDesignCredit} from "./brand-credit.mjs";
import {renderZipDesign} from "./zip-design-render.mjs";
import {applyTypographySafety} from "./typography-guard.mjs";
import {zipDesignFor,zipPages} from "./zip-design-catalog.mjs";
import {renderApprovedRunwayPages,RUNWAY_PAGES} from "./runway-customer-pages.mjs";
import {SHOWPIECE_ENGINE,hasShowpiece,isShowpieceMultipage,renderShowpieceCustomerPages} from "./showpiece-site.mjs";
export const STUDY_PAGES=Object.freeze(["index.html","work.html","features.html","studio.html","contact.html"]);
export const allowedApprovedPageNames=template=>{
 if(template==="runwaymulti")return RUNWAY_PAGES;
 if(zipDesignFor(template)?.multipage)return STUDY_PAGES;
 return ["index.html"];
};
export function renderApprovedDesignPages(input,options={}){
 const v=normalize(input),t=zipDesignFor(v.template);
 // Only versions saved with the showpiece engine use it; older approved versions keep their design.
 if(input?.engine===SHOWPIECE_ENGINE&&hasShowpiece(v.template)&&isShowpieceMultipage(v.template))
  return Object.fromEntries(Object.entries(renderShowpieceCustomerPages(v,options)).map(([name,html])=>[name,applyAweDesignCredit(html)]));
 if(v.template==="runwaymulti")return Object.fromEntries(Object.entries(renderApprovedRunwayPages(v,options)).map(([name,html])=>[name,applyAweDesignCredit(html)]));
 if(!t?.multipage)throw Error("Five-page documents require an approved multipage template.");
 const opts={assetBase:"/api/assets/",assetSuffix:"",...options,sample:false,customerPages:true};
 return Object.fromEntries(zipPages.map((page,i)=>[STUDY_PAGES[i],applyAweDesignCredit(applyTypographySafety(renderZipDesign(v,opts,page),v.template))]));
}

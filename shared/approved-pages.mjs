// Render approved customer-site pages from the immutable version only.
// The caller enforces ownership, review and publication authorization.
import {normalize} from "./model.mjs";
import {renderZipDesign} from "./zip-design-render.mjs";
import {applyTypographySafety} from "./typography-guard.mjs";
import {applyCustomerColors} from "./customer-color-theme.mjs";
import {zipDesignFor,zipPages} from "./zip-design-catalog.mjs";
import {renderApprovedRunwayPages,RUNWAY_PAGES} from "./runway-customer-pages.mjs";
export const STUDY_PAGES=Object.freeze(["index.html","work.html","features.html","studio.html","contact.html"]);
export const allowedApprovedPageNames=template=>{
 if(template==="runwaymulti")return RUNWAY_PAGES;
 if(zipDesignFor(template)?.multipage)return STUDY_PAGES;
 return ["index.html"];
};
export function renderApprovedDesignPages(input,options={}){
 const v=normalize(input),t=zipDesignFor(v.template);
 if(v.template==="runwaymulti")
  return Object.fromEntries(Object.entries(renderApprovedRunwayPages(v,options))
    .map(([page,html])=>[page,applyCustomerColors(html,v)]));
 if(!t?.multipage)throw Error("Five-page documents require an approved multipage template.");
 const opts={assetBase:"/api/assets/",assetSuffix:"",...options,sample:false,customerPages:true};
 return Object.fromEntries(zipPages.map((page,i)=>[STUDY_PAGES[i],
  applyCustomerColors(applyTypographySafety(renderZipDesign(v,opts,page),v.template),v)]));
}

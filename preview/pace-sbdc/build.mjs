import {mkdir,readFile,writeFile,cp} from "node:fs/promises";
import {join} from "node:path";
import { pageBody, inlineEnrichment, extraSlugs } from "./official-content.mjs";

// Build seven isolated public concept pages. This is not an official Pace site.
const base="preview/pace-sbdc";
const map={
 services:["services","path","questions","closing"],
 about:["manifesto","impact","stories","closing"],
 stories:["impact","stories","closing"],
 events:["events","resources","closing"],
 resources:["resources","questions","closing"],
 contact:["path","questions","closing"]
};
const info={
 services:["WHAT WE DO","Guidance for <em>every stage.</em>","Business planning, capital, marketing, research, and more. Explore practical tools for your next step.","PRACTICAL SUPPORT / NO-COST ADVISING"],
 about:["WHO WE ARE","Local roots. <em>Lasting impact.</em>","Pace University SBDC has helped New York City entrepreneurs build and grow since 1986.","A NEW YORK CITY PARTNER"],
 stories:["REAL RESULTS","From potential <em>to progress.</em>","Explore business-owner milestones—openings, new jobs, access to capital, and the confidence to grow.","CLIENT MOMENTUM / NYC"],
 events:["LEARN & CONNECT","Learn something. <em>Build something.</em>","See the workshops and training opportunities. Details are a November 2, 2026 snapshot: always confirm with the organizer.","FREE TRAINING / UPCOMING"],
 resources:["YOUR TOOLKIT","Better questions. <em>Better decisions.</em>","Reliable guidance and answers to help you move forward with more confidence.","KNOWLEDGE / CONNECTION"],
 contact:["GET CONNECTED","Let's talk about <em>what's next.</em>","Your first step toward confidential, no-cost business advising. Appointments are coordinated by the official NYSBDC intake service.","YOUR BUSINESS / YOUR NEXT MOVE"]
};
const verifiedLogo="https://static.wixstatic.com/media/8f09f9_6f772fba8eba4d78869d1198efd188ed~mv2.png";
const verifiedAccreditation="https://static.wixstatic.com/media/8f09f9_15d5736f9cd347fdb6f0be8a7dac6f33~mv2.png";
const officialInfoLink='<nav class="official-extra-nav" aria-label="Explore all Pace SBDC content"><a href="./team.html">THE TEAM</a><a href="./locations.html">MEETING LOCATIONS</a><a href="./library.html">RESOURCE LIBRARY</a><a href="./media.html">NEWS & REPORTS</a><a href="./partners.html">PARTNERS</a><a href="./spanish.html" lang="es">ESPAÑOL</a></nav>';
function rebrandDocument(html){
 // Source artwork, typography, brand blue & gold respect Pace's original
 // institutional identification. All pages retain prominent nonaffiliation.
 const logo='<img class="official-lockup" src="'+verifiedLogo+'" alt="Pace University Small Business Development Center — Serving Entrepreneurs in Brooklyn and Downtown Manhattan" loading="eager" decoding="async">';
 html=html.replace(/<span class="wordmark-icon"[^>]*>[\s\S]*?<\/span><span class="wordmark-copy">[\s\S]*?<\/span><\/a>/,logo+'</a>');
 html=html.replace("</header>","</header>"+officialInfoLink);
 html=html.replace('href="https://www.pacesbdc.org/espanol"','href="./spanish.html"');
 html=html.replace('<span class="awe-icon"','<span class="awe-icon"'); 
 html=html.replace('<div class="container footer-disclosure">',
 '<div class="container official-accreditation"><a href="https://nysbdc.org/" target="_blank" rel="noopener noreferrer"><img src="'+verifiedAccreditation+'" alt="NYSBDC accreditation and SBA funding acknowledgement" loading="lazy" decoding="async"></a><div><strong>AN OFFICIAL NYSBDC NETWORK PROGRAM</strong><p>Funding support from the Small Business Administration, New York State and Pace University; official disclosures and requirements are on the original organization site.</p></div></div><div class="container footer-disclosure">');
 html=html.replace('</footer>','<nav class="container official-source-links" aria-label="Original Pace SBDC website policies and records"><a href="https://www.pacesbdc.org/privacy-policy" target="_blank" rel="noopener noreferrer">ORIGINAL PRIVACY POLICY</a><a href="https://www.pacesbdc.org/faqs" target="_blank" rel="noopener noreferrer">SERVICE FAQ & GUIDELINES</a><a href="https://www.pacesbdc.org/year-in-review" target="_blank" rel="noopener noreferrer">2021–2025 ANNUAL REPORTS</a><a href="https://www.pacesbdc.org/contact" target="_blank" rel="noopener noreferrer">OFFICIAL CONTACT</a><a href="https://www.pacesbdc.org/counseling-form" target="_blank" rel="noopener noreferrer">ORIGINAL APPOINTMENT INSTRUCTIONS</a></nav><div class="container official-transit"><strong>VISITING THE LOWER MANHATTAN OFFICE</strong><span>Fulton St: A, C, J, Z, 2, 3, 4, 5 &nbsp; / &nbsp; World Trade Center: E &nbsp; / &nbsp; Brooklyn Bridge–City Hall: 6</span></div></footer>');
 return html;
}

const paths=[
 ["#why","./about.html"],["#services","./services.html"],
 ["#impact","./stories.html"],["#events","./events.html"],
 ["#resources","./resources.html"],["#contact","./contact.html"],["#top","./"]
];
function getSection(html,name){
 const start=html.indexOf('<section class="'+name);
 if(start<0)throw new Error("Source section missing: "+name);
 const end=html.indexOf("</section>",start);
 if(end<start)throw new Error("Incomplete source section: "+name);
 return html.slice(start,end+10);
}
function intro(props){
 const p=props;
 return '<section class="inner-hero"><div class="container inner-hero-layout"><div><div class="eyebrow"><span></span>'+
 p[0]+'</div><h1>'+p[1]+'</h1><p>'+p[2]+'</p><a class="inner-back" href="./">BACK TO THE HOMEPAGE <span class="css-arrow" aria-hidden="true"></span></a></div>'+
 '<div class="inner-graphic" aria-hidden="true"><div class="inner-graphic-ring"></div><strong>PACE<br><span>SBDC.</span></strong><small>'+p[3]+'</small></div></div></section>';
}
const contactInfo='<section class="contact-detail section-pad"><div class="container contact-grid"><div><div class="eyebrow"><span></span> THE OFFICIAL REGISTRATION</div><h2>Start the <em>conversation.</em></h2><p>Complete the official NYSBDC intake form. The Pace team can then connect you to an advisor. No visitor information is collected on this independent design concept.</p><a class="button button-dark" href="https://nysbdc.ecenterdirect.com/signup?centerid=31" target="_blank" rel="noopener noreferrer">OPEN OFFICIAL ADVISING INTAKE <span class="css-arrow" aria-hidden="true"></span></a></div><div class="contact-facts"><div><small>EMAIL</small><a href="mailto:sbdc@pace.edu">sbdc@pace.edu</a></div><div><small>PHONE</small><a href="tel:+12126186655">(212) 618-6655</a></div><div><small>ADDRESS</small><strong>1 Pace Plaza, Room W501<br>New York, NY 10038</strong></div><a href="https://www.google.com/maps/search/?api=1&query=1+Pace+Plaza+New+York+NY+10038" target="_blank" rel="noopener noreferrer">GET DIRECTIONS <span class="css-arrow" aria-hidden="true"></span></a></div></div></section>';
export async function buildPaceSbdc(output){
 await mkdir(output,{recursive:true});
 const original=rebrandDocument(await readFile(join(base,"index.html"),"utf8"));
 await cp(join(base,"site.js"),join(output,"site.js"));
 const css=await readFile(join(base,"styles.css"),"utf8");
 await writeFile(join(output,"styles.css"),css);
 const main=original.indexOf('<main id="main">'),foot=original.indexOf('<footer class="footer">');
 if(main<0||foot<main)throw new Error("Missing source page boundaries");
 const header=original.slice(0,main),footer=original.slice(foot);
 for(const name of Object.keys(map)){
   let top=header;
   let bottom=footer;
   for(const pair of paths){
     top=top.replaceAll('href="'+pair[0]+'"','href="'+pair[1]+'"');
     bottom=bottom.replaceAll('href="'+pair[0]+'"','href="'+pair[1]+'"');
   }
   top=top.replace(/<title>[\s\S]*?<\/title>/,'<title>'+info[name][0]+' | Pace SBDC — Independent Redesign</title>');
   const middle='<main id="main">'+intro(info[name])+(name==="contact"?contactInfo:"")+
     map[name].map(section=>getSection(original,section)).join("\n")+inlineEnrichment(name)+'</main>';
   await writeFile(join(output,name+".html"),top+middle+bottom);
 }
 for(const slug of extraSlugs){
   let top=header, bottom=footer;
   for(const pair of paths){
     top=top.replaceAll('href="'+pair[0]+'"','href="'+pair[1]+'"');
     bottom=bottom.replaceAll('href="'+pair[0]+'"','href="'+pair[1]+'"');
   }
   top=top.replace(/<title>[\s\S]*?<\/title>/,'<title>Pace SBDC | '+slug+' — Independent Redesign</title>');
   if(slug==="spanish")top=top.replace('<html lang="en">','<html lang="es">');
   await writeFile(join(output,slug+".html"),top+'<main id="main">'+pageBody(slug)+'</main>'+bottom);
 }
 const homeGuide='<section class="section-pad official-section official-home-guide"><div class="container"><div class="eyebrow"><span></span> ORIGINAL PROGRAM INFORMATION</div><h2>The full Pace SBDC.<br><em>All in one place.</em></h2><p class="source-lead">Explore the center beyond the basics: current staff, neighborhood counseling sites, specialized business guides, annual reports, client successes, partnerships, and Spanish-language assistance.</p><div class="official-card-grid">'+[
 ["Meet the team","Meet the current certified business advisors, coordinator and interns.","team.html"],
 ["Where to get advising","Find Manhattan and Brooklyn neighborhood counseling locations.","locations.html"],
 ["All business resources","Finance, tax, hiring, export, contracting, real estate, marketing and more.","library.html"],
 ["Reports and media","Annual reports, press, newsletters, awards, video and client stories.","media.html"],
 ["Community partnerships","Learn about Pace, NYSBDC and community programs.","partners.html"],
 ["Asistencia en español","Solicite asesoría confidencial y gratuita en español.","spanish.html"]
 ].map(item=>'<a class="official-card home-guide-card" href="./'+item[2]+'"><h3>'+item[0]+'</h3><p>'+item[1]+'</p><span>EXPLORE SECTION <span class="css-arrow" aria-hidden="true"></span></span></a>').join('')+'</div></div></section>';
 await writeFile(join(output,"index.html"),original.replace('</main>',homeGuide+'</main>'));
 console.log("Built public Pace SBDC concept: home + six dedicated pages.");
}

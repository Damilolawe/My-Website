import {mkdir,readFile,writeFile,cp} from "node:fs/promises";
import {join} from "node:path";

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
 const original=await readFile(join(base,"index.html"),"utf8");
 await Promise.all(["site.js","styles.css"].map(file=>cp(join(base,file),join(output,file))));
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
     map[name].map(section=>getSection(original,section)).join("\n")+'</main>';
   await writeFile(join(output,name+".html"),top+middle+bottom);
 }
 await writeFile(join(output,"index.html"),original);
 console.log("Built public Pace SBDC concept: home + six dedicated pages.");
}

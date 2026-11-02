// Verified public information index from pacesbdc.org (reviewed Nov 2, 2026).
// This independent concept paraphrases source information in a fully local
// set of pages. Official operational registration remains on NYSBDC.
const official="https://www.pacesbdc.org/";
const cite=(path,label)=>'<a href="'+official+path+'" target="_blank" rel="noopener noreferrer">'+label+'<span class="css-arrow" aria-hidden="true"></span></a>';
const sectionTitle=(id,eyebrow,title,lead)=>'<div class="eyebrow"><span></span>'+eyebrow+'</div><h2 id="'+id+'">'+title+'</h2><p class="source-lead">'+lead+'</p>';
const external=(label,slug)=>cite(slug,label);
const book='https://nysbdc.ecenterdirect.com/signup?centerid=31';
const cards=(items)=>'<div class="official-card-grid">'+items.map(([title,text,path])=>'<article class="official-card"><h3>'+title+'</h3><p>'+text+'</p>'+cite(path,'VIEW OFFICIAL DETAILS')+'</article>').join("")+'</div>';
const advisor=[
 ["Rawle Brown","Business Advisor"],["Sandra Cely","Business Advisor"],
 ["Greg Callender","Business Advisor"],["Susan Gluck","Business Advisor"],
 ["Eeshani Juthani","Business Advisor"],["Roxanna Astorga","Counseling Coordinator"],
 ["Sanchit Deep Singh","Intern"],["Lily Lin","Intern"]
];
const locations=[
 ["Canarsie","NHS, 1734 Rockaway Parkway; with Canarsie Merchants Association"],
 ["Crown Heights","Assemblymember Brian Cunningham’s office"],
 ["East Williamsburg","Moore Street Market / Graham Avenue BID"],
 ["Flatbush","Assemblymember Rodneyse Bichotte Hermelyn’s office"],
 ["Grand Army Plaza","Brooklyn Public Library Business & Career Center"],
 ["Industry City / Sunset Park","Brooklyn Chamber of Commerce office"],
 ["Midtown Manhattan","NYPL Thomas Yoseloff Business Center"],
 ["Park Slope","The Yard, 157 13th Street; with Park Slope Fifth Avenue BID"],
 ["Prospect Lefferts Gardens","BKLYN Commons, 495 Flatbush Avenue"],
 ["Red Hook","Red Hook Business Alliance office"],
 ["Sunset Park BID","5116A Fifth Avenue, second floor"],
 ["Williamsburg","Grand Street Business Improvement District office"]
];
const serviceTopics=[
 ["Financing and SBA loans","Advisor-led preparation for loans, working capital, equipment, and real estate. Review SBA 7(a), 504, bank, community-lender, crowdfunding, grant, and contract-financing options.","financing"],
 ["Business financial statements","Build projections and understand balance sheets, cash flow, profitability, and lender expectations.","services"],
 ["Marketing, sales, and e-commerce","Discuss sales strategy, social platforms, search visibility, email, websites and online commerce.","marketing-sales"],
 ["Business plans and startup preparation","Clarify a venture's model, financial roadmap, market, and launch risks before committing significant expenses.","business-planning"],
 ["Market research and industry data","Request demographic, competitor, customer-spending, and industry data through the NYSBDC research network.","services"],
 ["Government procurement","Learn where to find city, state, federal and Port Authority work, and how capability statements and contracts fit together.","procurement"],
 ["Operations and staffing","Navigate licenses, suppliers, hiring, personnel management, core accounting and compliance.","services"],
 ["Legal business structures","Understand the differences among common business structures and explore referrals to legal assistance.","business-planning"],
 ["International trade","Research export markets and technical assistance, financing, and international-growth opportunities.","internationaltrade"],
 ["Taxes, bonding and property","Find small business tax guidance, surety bonding programs, and commercial space resources.","tax-planning"]
];
const resourceGroups=[
 {group:"Business planning & operations",items:[
  ["Business Planning","Startup roadmaps, business structures, market research, permits and capabilities statements.","business-planning"],
  ["Business Taxes","Federal, state and NYC tax categories, payroll reporting and filing resources.","tax-planning"],
  ["Hiring & Pace Internships","Recruiting, student internships, Handshake, Career Services, staff obligations.","hiring"],
  ["Employee Training","NYC and NYS business training reimbursements, incentives and grants.","training"],
  ["Real Estate","Lease assistance, finding commercial space, workspaces and industrial options.","realestate"],
  ["COVID-19 Recovery Archive","Historical small-business recovery programs, grants and guidance; verify current eligibility.","coronavirus"]
 ]},
 {group:"Financing & public opportunities",items:[
  ["Financing Options","Lending sources including banks, community development lenders, grants and crowdfunding.","financing"],
  ["SBA Loan Programs","Official center explanations of 7(a) and 504 financing. Verify amounts and rules with SBA.","sbaloans"],
  ["Government Procurement","Government agency purchasing, bid preparation, contracting and certification.","procurement"],
  ["Bonding Assistance","SBA and state surety-bond programs for eligible contract bidders.","bonding"],
  ["International Trade","Export research, technical assistance and financing for international opportunities.","internationaltrade"]
 ]},
 {group:"Marketing & digital growth",items:[
  ["Marketing & Sales","Strategy, online promotion, e-commerce and digital reach.","marketing-sales"],
  ["Lead Generation","Platforms that connect small business owners with qualified prospects.","leadgeneration"],
  ["Social Media Marketing","Audience research, consistent channel engagement and campaign planning.","social-media-marketing"],
  ["Website Planning","A website's goals, navigation, content, design, publication and analytics.","website"],
  ["Email Marketing","Subscriber development, campaigns, personalization and email-performance review.","email-marketing"],
  ["Website Services","Main official overview of advisory services and digital-business support.","services"]
 ]}
];
const mediaLinks=[
 {group:"Center news and media",items:[
  ["Latest Blog","Read official updates, advisor programs, training recaps and announcements.","blog"],
  ["Newsletter Archive","Browse monthly business news, funding opportunities and community programs.","newsletter"],
  ["Press Coverage","Stories about the center, partnerships and national and state recognition.","press"],
  ["Photo Collection","Official photographs from programs, clients and community events.","photos"],
  ["Video and Webinars","Watch the official catalog of past webinars and business stories.","video"],
  ["Social Channels","Find the center's official social accounts and updates.","social"],
  ["SBDC Day","See records and media from 2023–2026 SBDC Day activities.","sbdc-day"]
 ]},
 {group:"Impact and institutional information",items:[
  ["2025 Year in Review","The latest annual report, alongside 2024, 2023, 2022 and 2021 reports.","year-in-review"],
  ["Client Spotlight","Client features and business achievements.","clientfeatures"],
  ["Success Stories & Awards","2026, 2025, 2024 and earlier client award winners; recent success stories.","success-stories"],
  ["Testimonials","Feedback from entrepreneurs and businesses that used Pace SBDC.","testimonials"],
  ["Partner Organizations","The center's network of partner institutions and service organizations.","partners"],
  ["Pace University Connection","Faculty-led training, Lubin student projects, internship opportunities and campus entrepreneurship.","pace"],
  ["Brooklyn Expansion","Learn about the center's 2024 transition into broader Brooklyn service coverage.","welcome-brooklyn"]
 ]}
];
export const extraSlugs=["team","teambio","locations","library","media","partners","spanish"];
const wrap=(slug,heading,sub,content)=>'<section class="official-hero"><div class="container"><div class="eyebrow"><span></span> OFFICIAL INFORMATION / INDEPENDENT REDESIGN</div><h1>'+heading+'</h1><p>'+sub+'</p><div class="official-small">SOURCE INFORMATION REVIEWED NOVEMBER 2, 2026 · INDEPENDENT DESIGN CONCEPT · CONFIRM EVENT DATES AND PROGRAM ELIGIBILITY</div></div></section><section class="section-pad official-section"><div class="container">'+content+'</div></section>';
const locationsCard='<div class="official-card-grid">'+locations.map(([city,address])=>'<article class="official-card"><span class="official-card-mark">LOCATION / NYC</span><h3>'+city+'</h3><p>'+address+'</p></article>').join("")+'</div>';
const locationsText=sectionTitle("outreach","02 / WHERE TO MEET","Neighborhood access,<br><em>business support.</em>","Free one-to-one counseling can be arranged at the Lower Manhattan office, online, or at participating Brooklyn and Manhattan partner sites. Confirm availability when booking.")+
'<div class="official-feature"><strong>MAIN OFFICE</strong><p>One Pace Plaza, Room W501, New York, NY 10038. Take A, C, J, Z, 2, 3, 4, 5 to Fulton Street, E to World Trade Center, or 6 to Brooklyn Bridge.</p><strong>HOW IT WORKS</strong><p>Satellite visits require an appointment; the official intake asks for your preferred meeting location or virtual appointment.</p>'+cite("counseling-form","CONFIRM SERVICE LOCATIONS")+'</div>'+locationsCard+
'<div class="source-callout"><h3>New to Brooklyn?</h3><p>After the City Tech center closed at the end of 2023, the Pace center began serving Brooklyn clients in January 2024, including coordination with the Brooklyn Public Library Business & Career Center.</p>'+cite("welcome-brooklyn","READ THE BROOKLYN EXPANSION")+'</div>';
const staffPortraits={"rawle-brown":"https://static.wixstatic.com/media/8f09f9_b5a093b7ac814fff8dd93fe42f594f23~mv2.jpg","sandra-cely":"https://static.wixstatic.com/media/8f09f9_ef51e467fc1c4975b7b7a5223aca1cd8~mv2.png","greg-callender":"https://static.wixstatic.com/media/8f09f9_f6fe949798384aaf9f5485cad2a3fb53~mv2.png","susan-gluck":"https://static.wixstatic.com/media/8f09f9_ab3214186ced4e0cab3a7b638e957977~mv2.png","eeshani-juthani":"https://static.wixstatic.com/media/8f09f9_5f82a09cbdd34159813238aefe54b05f~mv2.png","roxanna-astorga":"https://static.wixstatic.com/media/8f09f9_86365d72d1824f3aafd1b44163e70e73~mv2.png","sanchit-deep-singh":"https://static.wixstatic.com/media/8f09f9_f7c45c5a19dc4e06ab460abdec5ab114~mv2.jpeg","lily-lin":"https://static.wixstatic.com/media/8f09f9_bfe77c7f7fc34bb9a943b037fd878d88~mv2.jpg"};
const staffPhoto=(name,detailed)=>{const id=name.toLowerCase().replace(/[^a-z0-9]+/g,"-");const src=staffPortraits[id];return src?'<img class="'+(detailed?"biography-photo":"team-headshot")+'" src="'+src+'" alt="Portrait of '+name+'" loading="lazy" decoding="async">':"";};
const teamText=sectionTitle("people","01 / OUR PEOPLE","The people behind<br><em>the guidance.</em>","Meet the advisors, coordinator and interns. Select a person to read their biography within this redesigned website.")+
'<div class="official-card-grid">'+advisor.map(([name,title])=>'<article class="official-card person-card">'+staffPhoto(name,false)+'<span class="official-card-mark">PACE UNIVERSITY SBDC</span><h3>'+name+'</h3><p>'+title+'</p>'+'<a href="./teambio.html#'+name.toLowerCase().replace(/[^a-z0-9]+/g,"-")+'">READ PROFILE <span class="css-arrow" aria-hidden="true"></span></a>'+'</article>').join("")+'</div>'+
'<div class="source-callout"><h3>Regional Director: Andrew Flamm</h3><p>The Pace SBDC also highlights Andrew Flamm’s regional leadership, business-management teaching, and collaborations with faculty, students, and small businesses.</p>'+'<a href="./teambio.html#andrew-flamm">MEET THE DIRECTOR <span class="css-arrow" aria-hidden="true"></span></a>'+'</div>';
const welcome='<div class="source-callout"><h3>Office hours, languages and eligibility</h3><p>Advising is confidential and offered at no cost. You may discuss an existing business or a specific business idea. Remote meetings and Spanish-language advising are available; mention your preference in the official intake.</p>'+cite("faqs","FULL SERVICE FAQ")+'</div>';
const appointmentSteps='<div class="official-steps"><article><strong>01 / CHECK EXISTING ADVISING</strong><p>To preserve continuity, continue with your previous SBDC advisor if you’ve already worked with another center.</p></article><article><strong>02 / SELECT A LOCATION</strong><p>Choose the main office, an available neighborhood site, or a phone/video appointment.</p></article><article><strong>03 / CREATE YOUR ECENTER ACCOUNT</strong><p>Register your email, describe your business, then specify your preferred location and assistance topic. The team will follow up.</p></article></div><p><a class="button button-dark" href="'+book+'" target="_blank" rel="noopener noreferrer">OFFICIAL ECENTER REGISTRATION <span class="css-arrow" aria-hidden="true"></span></a></p>';
const allResources=resourceGroups.map(g=>'<section class="official-directory-group"><h3>'+g.group+'</h3>'+cards(g.items)+'</section>').join("");
const allMedia=mediaLinks.map(g=>'<section class="official-directory-group"><h3>'+g.group+'</h3>'+cards(g.items)+'</section>').join("");
const faqDetails=[
 ["Preparing for a first appointment","Bring specific questions and be ready to discuss your products, services, target customers or industry experience; samples can help."],
 ["Starting before your business exists","A specific venture or industry experience is helpful, but an operating business is not required."],
 ["Spanish-language sessions","State your Spanish-language preference when submitting your inquiry."],
 ["Virtual meeting options","The center offers both telephone and video consultations, as well as eligible in-person meetings."],
 ["The SBDC, SBA and SCORE","SBDCs use certified advisors and the statewide network. SBA is a federal partner; SCORE is another SBA-funded resource staffed by volunteers."],
 ["Service guidelines and privacy","Review the center's published service guidelines and privacy policy; the independent design does not receive or store intake details."]
];
const renderFaq=()=>'<div class="official-faq">'+faqDetails.map(([q,a])=>'<details><summary>'+q+'<span aria-hidden="true">+</span></summary><p>'+a+'</p></details>').join("")+'</div>';

const staffBiographies=[["Andrew Flamm","Director","Leads strategic planning, counseling programs and partnerships. Former senior leader at Empire State Development and an adjunct at Pace Lubin.","aflamm@pace.edu","Leadership · Financing · Partnerships"],["Rawle Brown","Business Advisor","An experienced NYS-certified advisor specializing in business plans, loans and government procurement. His background includes banking and accounting.","rbrown@pace.edu","Planning · Lending · Procurement"],["Sandra Cely","Advanced Certified Business Advisor","Specializes in finance, business planning, capital access and international trade. She holds a Pace Lubin MBA and advises in English and Spanish.","scely@pace.edu","Finance · International Trade · Spanish Advising"],["Greg Callender","Certified Business Advisor","Advises on business models, financial projections and capital strategy. He has a background in corporate restructuring and long-term client advisory relationships.","gcallender@pace.edu","Capital · Forecasting · Strategy"],["Susan Gluck","Business Advisor","Advises on marketing strategy, digital channels and product growth. Her experience includes SiriusXM, and she earned an executive MBA from Pace Lubin.","sgluck2@pace.edu","Digital Marketing · Product Growth"],["Eeshani Juthani","Business Advisor","Supports branding, social media, website design and marketing analytics. She first joined the SBDC as an intern and returned in 2025 as an advisor.","ejuthani@pace.edu","Branding · Digital Marketing · Websites"],["Roxanna Astorga","Counseling Coordinator","Coordinates counseling operations, community programs, outreach and events. She brings extensive experience from Brooklyn SBDC.","rastorga@pace.edu","Operations · Outreach · Programming"],["Sanchit Deep Singh","Intern","Pace Lubin MBA student in corporate finance with experience in financial analysis, operational planning and digital marketing.","","Finance · Operations · Research"],["Lily Lin","Intern","Pace Lubin graduate student in marketing analytics with experience in SEO, paid media, content strategy and performance reporting.","","Analytics · Performance Marketing"]];
const staffBiographyPage=wrap("teambio","The people.<br><em>Behind the progress.</em>","Get to know the advisors, program coordinator, and interns supporting New York entrepreneurs.",sectionTitle("biography-intro","01 / TEAM BIOGRAPHIES","Experience that<br><em>moves you forward.</em>","Profiles summarized from publicly listed Pace SBDC staff biographies.")+'<div class="biography-grid">'+staffBiographies.map(([name,role,description,email,specialties])=>{const id=name.toLowerCase().replace(/[^a-z0-9]+/g,"-");return '<article class="biography" id="'+id+'">'+staffPhoto(name,true)+'<span>'+role+'</span><h3>'+name+'</h3><p>'+description+'</p><small>'+specialties+'</small>'+(email?'<a href="mailto:'+email+'">CONTACT '+name.split(" ")[0].toUpperCase()+' <span class="css-arrow" aria-hidden="true"></span></a>':"")+'</article>';}).join("")+'</div>');
export function pageBody(slug){
 if(slug==="teambio")return staffBiographyPage;
 if(slug==="team")return wrap(slug,"Our people.<br><em>Our purpose.</em>","Meet the advisors and staff supporting New York City entrepreneurs.",teamText+welcome);
 if(slug==="locations")return wrap(slug,"Support in<br><em>your neighborhood.</em>","Choose from the Manhattan office, Brooklyn partner sites or a virtual appointment.",locationsText+appointmentSteps);
 if(slug==="library")return wrap(slug,"Every tool.<br><em>One place.</em>","A navigable index of the center's published services, specialized resource guides, and original links.",sectionTitle("resources-all","01 / RESOURCES","From planning<br><em>to possibility.</em>","Resource topics link directly to their official original content and preserve specialist programs.")+allResources+welcome);
 if(slug==="media")return wrap(slug,"The stories<br><em>behind the impact.</em>","Reports, newsletters, press, photos, webinars, client achievements and awards.",sectionTitle("media-all","01 / NEWS, MEDIA & REPORTS","What we're<br><em>building together.</em>","Explore the center's official archives and client narratives, including annual reports dating back to 2021.")+allMedia);
 if(slug==="partners")return wrap(slug,"One network.<br><em>More possibilities.</em>","Pace University, the SBA, the State of New York and community partners support a network of no-cost assistance.",sectionTitle("collab","01 / COLLABORATION","Rooted in<br><em>community.</em>","The center shares expertise and programs with public-sector and community organizations.")+cards([
 ["Pace University & Lubin School of Business","Faculty expertise, student research, internships, and campus entrepreneurship.","pace"],
 ["Brooklyn Public Library","Advising partnership with the Brooklyn Central Library Business & Career Center.","welcome-brooklyn"],
 ["Brooklyn Chamber of Commerce","Local Brooklyn business counseling connections and outreach.","counseling-form"],
 ["SBA, SUNY and NYSBDC","Government and statewide program backing, resources, and disclosures.","partners"],
 ["Local business organizations","Brooklyn and Manhattan BIDs, community groups, and neighborhood partners.","counseling-form"],
 ["Pace Path & Lubin course partnerships","Community-based marketing, research and experiential learning projects.","pace"]
 ])+cite("partners","FULL OFFICIAL PARTNER ROSTER"));
 if(slug==="spanish")return wrap(slug,"Asesoría<br><em>en español.</em>","Asistencia personalizada y gratuita para los negocios y emprendedores de Nueva York.",
  '<div class="source-callout"><h3>Bienvenido a Pace SBDC.</h3><p>Ofrecemos asesoramiento empresarial gratuito y confidencial en español para comenzar o fortalecer su negocio. Puede solicitar una consulta virtual o presencial.</p><a class="button button-dark" href="https://nysbdc.ecenterdirect.com/signup?centerid=31&_locale=es_MX" target="_blank" rel="noopener noreferrer">SOLICITAR ASESORÍA GRATUITA <span class="css-arrow" aria-hidden="true"></span></a></div>'+
  '<h2>Cómo solicitar una cita</h2><div class="official-steps"><article><strong>01</strong><p>Si ya tiene un asesor de otro centro SBDC, continúe la atención con él.</p></article><article><strong>02</strong><p>Elija una ubicación disponible o una reunión virtual.</p></article><article><strong>03</strong><p>Regístrese en eCenter Direct, indique el tema de consulta y espere el contacto del equipo.</p></article></div>'+cite("contacto","VER INSTRUCCIONES OFICIALES EN ESPAÑOL"));
 throw new Error("Unknown extra Pace content page "+slug);
}
export function inlineEnrichment(name){
 if(name==="about")return '<section class="section-pad official-section"><div class="container">'+teamText+welcome+sectionTitle("pace-university","02 / PACE UNIVERSITY","A classroom connected<br><em>to the city.</em>","Pace faculty teach marketing, finance, law and sustainability. Lubin students support practical client marketing and consumer research; students also connect with employers for internships.")+
  cards([["Harlem Baking Company","Student-recommended positioning, promotion and distribution.","pace"],["Brick Lane Curry","Primary and secondary research and a marketing research plan.","pace"],["Theatre for the New City","Consumer surveys and audience research.","pace"],["Name Glo","Pandemic-era consumer behavior insights and growth recommendations.","pace"],["Bushwick Grind","Customer acquisition and revenue recommendations.","pace"],["Ripple Effect Artists","An example of a client engaging eight Pace student interns.","pace"]])+'</div></section>';
 if(name==="services")return '<section class="section-pad official-section"><div class="container">'+sectionTitle("complete-services","03 / COMPLETE SERVICE OFFERING","The full scope<br><em>of business support.</em>","Ten advising areas identified on the original center website, including legal-structure guidance, operations, startup support and exporting.")+cards(serviceTopics)+'</div></section>';
 if(name==="stories")return '<section class="section-pad official-section"><div class="container">'+sectionTitle("awards","03 / MORE CLIENT RESULTS","Award winners,<br><em>new beginnings.</em>","The official client archive includes award winners from 2018 through 2026, pandemic recovery stories, and broader client spotlights.")+cards([["2026 City Catalyst of the Year","NYSBDC city catalyst recognition and business impact.","success-stories"],["2025 Neighborhood Business of the Year","Statewide recognition of neighborhood business development.","success-stories"],["2024 Millennial Small Business of the Year","An example of new-generation entrepreneurial achievement.","success-stories"],["Small Business Plan Competitions","StartUP and PowerUP! competitions, including 2024 recognition.","success-stories"],["NIH and SBA Innovation Awards","Examples of SBIR/STTR-linked achievements in the client portfolio.","success-stories"],["Testimonials and Client Features","Firsthand feedback, recovery stories and diverse client features.","testimonials"]])+'</div></section>';
 if(name==="events")return '<section class="section-pad official-section"><div class="container">'+sectionTitle("training-programs","03 / TRAINING & LEARNING","More ways<br><em>to learn.</em>","The center offers free workshops, webinars, faculty-led training and networking opportunities in Manhattan, Brooklyn and virtually.")+cards([["Upcoming Events","See the official current training calendar and registration status.","events"],["Past Webinar Recordings","Catch up on topics like legal structures, grants, data visualization and marketing.","video"],["Employee Training Resources","Explore municipal and state programs and incentives for training staff.","training"],["Newsletters","Read current events, opportunities, funding updates and community announcements.","newsletter"]])+'</div></section>';
 if(name==="resources")return '<section class="section-pad official-section"><div class="container">'+sectionTitle("resources-expanded","03 / COMPLETE RESOURCE LIBRARY","Find your<br><em>next answer.</em>","More specialized resources retained from the original site, grouped by topic.")+allResources+renderFaq()+'</div></section>';
 if(name==="contact")return '<section class="section-pad official-section"><div class="container">'+sectionTitle("official-signup","03 / INTAKE PROCESS","A clear path<br><em>to advising.</em>","The original center specifies three important steps and offers many satellite locations.")+appointmentSteps+locationsText+renderFaq()+'</div></section>';
 return "";
}
export const originalDirectory=resourceGroups.flatMap(g=>g.items).concat(mediaLinks.flatMap(g=>g.items));

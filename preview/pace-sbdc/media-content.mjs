// Independent reconstructions of the original SBDC information/news/archives.
// Archived summaries and reports are not represented as real-time information.
export const mediaSlugs=["blog","photos","newsletter","press","video","social","sbdc-day","contacto","espanol","privacy-policy"];
const item=(title,desc,when)=>({title,desc,when});
const articles={
 blog:{
  heading:"News from the community.",sub:"Programs, training and business resources from the center's public updates.",
  entries:[
    item("Free fall advising in Brooklyn and Manhattan","October 2026 events and local advising sessions, including business planning, capital, procurement, certification and marketing programs.","OCTOBER 8, 2026"),
    item("September business advising and training","Fall 2026 sessions across Brooklyn and beyond, neighborhood counseling locations and training opportunities.","SEPTEMBER 3, 2026"),
    item("Sandra Cely at the SBA Lender Ready Forum","The business advisor represented Pace SBDC during an SBA small-business meeting at 26 Federal Plaza.","AUGUST 31, 2026"),
    item("Data visualization for small business owners","An archived webinar featuring Pace marketing professor Vishal Lala with coordinator Roxanna Astorga.","AUGUST 6, 2026"),
    item("Business opportunities and campus partnerships","Updates throughout the archive address loan preparation, partnerships, hiring and neighborhood events.","ARCHIVE")
  ]
 },
 newsletter:{
  heading:"Ideas worth sharing.",sub:"Updates on community advising, grants, workshops and the center's progress.",
  entries:[
    item("June 2026 Newsletter","New outreach points in Canarsie and Prospect Lefferts Gardens; Lubin faculty training; Verizon Digital Ready and SBA funding opportunities; Up Transport's $180,000 financing milestone; July small-business lending panel.","JUNE 2026"),
    item("March 2026 Newsletter","SBDC Day in Albany; 2025 report milestones; Crown Heights expansion; Verizon grant programs and growing local partnerships.","MARCH 2026"),
    item("January 2026 Newsletter","Financing panel connecting more than 200 entrepreneurs with 16 lenders, Moore Street Market advisory sessions, LinkNYC advertising and Bushwick business-tour outreach.","JANUARY 2026"),
    item("Earlier newsletters","Archives also cover business workshops, local retail and service firms, procurement opportunities and community learning.","HISTORICAL ISSUES")
  ]
 },
 press:{
  heading:"Making the headlines.",sub:"Recognition, media coverage and public program achievements.",
  entries:[
    item("2025 SBA Excellence & Innovation Award","The U.S. Small Business Administration's New York district recognized the Pace SBDC for excellence and innovation.","2025"),
    item("Pace Lubin School of Business feature","Winter 2026 coverage of collaborations between faculty, students and the SBDC's local business programs.","WINTER 2026"),
    item("Sunset Park small business workshop","Coverage of a workshop with leaders and entrepreneurs focused on growth strategies and neighborhood business support.","OCTOBER 2024"),
    item("National Small Business Week roundtable","Pace SBDC joined a virtual conversation with Congressman Dan Goldman highlighting business support.","NEWS COVERAGE"),
    item("Brooklyn programming expansion","The center's program growth and expanded regional team for small businesses and new entrepreneurs.","2024"),
    item("2022 SBA Excellence & Innovation Award","An earlier recognition of the center's advising and impact by the SBA New York district.","2022"),
    item("Grow with Google: Partner of the Month","Recognition of business education sessions covering Google's digital business tools.","RECOGNITION"),
    item("Radio and broadcast coverage","Reporting and interviews on business startup planning, financing, COVID recovery, commercial taxes and growth.","ARCHIVE"),
    item("Turner School of Construction Management","Coverage of Pace and Turner supporting women- and minority-owned construction businesses.","ARCHIVE")
  ]
 },
 video:{
  heading:"Watch. Learn. Build.",sub:"Webinar recordings and client stories from the center's learning archive.",
  entries:[
    item("Business development webinars","Recorded sessions addressing funding, cash flow, business structure, contracts, marketing and certifications.","WEBINARS"),
    item("Data visualization for business owners","An archived session exploring how entrepreneurs can understand and communicate data.","EDUCATION"),
    item("Client business features","Owner stories about the journeys, challenges and milestones behind local businesses.","CLIENT STORIES"),
    item("University-led learning","Faculty and community partners have contributed webinars and training on marketing, finance and strategy.","PACE CONNECTION")
  ]
 },
 photos:{
  heading:"The work, in pictures.",sub:"Photo highlights from the center's community, training sessions, award events and client programs.",
  entries:[
    item("Business counseling and outreach","Public events connect local entrepreneurs to trained advisors at community and university locations.","COMMUNITY"),
    item("Entrepreneurship programs","Training workshops, learning sessions and business networking are part of Pace SBDC's programming.","TRAINING"),
    item("Client and partner milestones","The center's recognition and program partners represent businesses across New York City.","IMPACT")
  ]
 },
 "sbdc-day":{
  heading:"A day for small business.",sub:"Annual SBDC Day programs and statewide recognition.",
  entries:[
    item("SBDC Day 2026","Regional Director Andrew Flamm's visit to the state capitol and discussions with elected officials about small business support.","2026"),
    item("SBDC Day 2025","Recognition of the NYSBDC network and its impact on business owners.","2025"),
    item("SBDC Day 2024","Statewide events and program highlights for entrepreneurship services.","2024"),
    item("SBDC Day 2023","Past celebrations and outreach for small business counseling and support.","2023")
  ]
 }
};
const socialLinks=[
 ["Instagram","https://www.instagram.com/pacesbdc/","Photo and video updates, event news and client spotlights."],
 ["LinkedIn","https://www.linkedin.com/company/pace-university-sbdc/","Staff, professional updates and program announcements."],
 ["Facebook","https://www.facebook.com/PaceSBDC","Community updates and shared resources."],
 ["X / Twitter","https://twitter.com/PaceSBDC","Public posts and business-community information."]
];
const mediaSafe=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const portraitImages=[
 "https://static.wixstatic.com/media/8f09f9_a8c21cb3a2534bb6afa80a4a1c9bdca5~mv2.jpg",
 "https://static.wixstatic.com/media/8f09f9_19a92c6edf224396997e2ab7ff619f28~mv2.jpg",
 "https://static.wixstatic.com/media/8f09f9_1069c5a54eb1462da55ef64b4a755ac3~mv2.jpg",
 "https://static.wixstatic.com/media/8f09f9_6510a87e20ab45a2ad459d06d69aa98d~mv2.jpg"
];
const footerCTA='<section class="deep-advice"><h2>Talk with an advisor.</h2><p>Want to put an idea into motion? Free and confidential business counseling is available, and appointments are arranged through the NYSBDC intake system.</p><a class="button button-dark" href="https://nysbdc.ecenterdirect.com/signup?centerid=31" target="_blank" rel="noopener noreferrer">REQUEST FREE ADVISING <span class="css-arrow" aria-hidden="true"></span></a></section>';
function hero(title,sub){
 return '<section class="official-hero deep-hero"><div class="container"><div class="eyebrow"><span></span> PACE UNIVERSITY SBDC / COMMUNITY RESOURCES</div><h1>'+title+'</h1><p>'+sub+'</p><a class="inner-back" href="./media.html">BACK TO MEDIA & REPORTS <span class="css-arrow" aria-hidden="true"></span></a></div></section>';
}
const cards=items=>'<div class="media-article-grid">'+items.map((it,i)=>'<article class="media-article"><span class="media-overline">'+it.when+' / '+String(i+1).padStart(2,"0")+'</span><h2>'+mediaSafe(it.title)+'</h2><p>'+mediaSafe(it.desc)+'</p></article>').join("")+'</div>';
const social=()=>hero("Join the<br>conversation.","Find Pace SBDC's public accounts and follow relevant community updates.")+'<section class="section-pad deep-content"><div class="container"><div class="media-article-grid">'+socialLinks.map(([label,url,description])=>'<a class="media-article media-outbound" href="'+url+'" target="_blank" rel="noopener noreferrer"><span class="media-overline">SOCIAL PROFILE</span><h2>'+label+'</h2><p>'+description+'</p><span>VISIT CHANNEL <span class="css-arrow" aria-hidden="true"></span></span></a>').join("")+'</div>'+footerCTA+'</div></section>';
const privacy=()=>hero("Privacy and<br>your information.","A transparent overview of how the independent design differs from the center's original site.")+'<section class="section-pad deep-content"><div class="container"><div class="deep-section"><div class="deep-section-index">01</div><div><h2>Visitor data on this preview</h2><p>This demonstration is a static website. It does not operate a client-registration form, store individual counseling records, process payments or independently send marketing communications.</p><ul><li>Requesting advising transfers you to NYSBDC eCenter Direct, which has its own privacy and account requirements.</li><li>Social media, maps, external program providers and hosted fonts have their own policies.</li><li>The original center states that it follows Pace University's privacy policy, updated July 22, 2025. Review the relevant university rules before entering information into any official service.</li></ul></div></div><div class="source-callout"><h3>Official university policy</h3><p>Visit the published Pace privacy page for the authoritative university statement.</p><a href="https://careerservices.pace.edu/privacy-policy/" target="_blank" rel="noopener noreferrer">READ PACE UNIVERSITY PRIVACY POLICY <span class="css-arrow" aria-hidden="true"></span></a></div></div></section>';
const spanish=()=>hero("Asistencia<br>en español.","El Pace SBDC ofrece asesoría empresarial gratuita y confidencial a emprendedores en la ciudad de Nueva York.")+'<section class="section-pad deep-content" lang="es"><div class="container"><div class="official-steps"><article><strong>01 / ASEGURE LA CONTINUIDAD</strong><p>Si ya tiene un asesor de otro SBDC, comuníquese directamente con el mismo centro.</p></article><article><strong>02 / ELIJA DÓNDE REUNIRSE</strong><p>Puede seleccionar una sede de Manhattan o Brooklyn o solicitar una consulta virtual.</p></article><article><strong>03 / COMPLETE SU SOLICITUD</strong><p>Cree una cuenta en eCenter Direct e indique el tema y la ubicación preferida.</p></article></div><div class="source-callout"><h3>Contacto</h3><p>Correo electrónico: <a href="mailto:sbdc@pace.edu">sbdc@pace.edu</a>. Teléfono: <a href="tel:+12126186655">(212) 618-6655</a>.</p><a class="button button-dark" href="https://nysbdc.ecenterdirect.com/signup?centerid=31&_locale=es_MX" target="_blank" rel="noopener noreferrer">SOLICITAR ASESORÍA GRATUITA <span class="css-arrow" aria-hidden="true"></span></a></div></div></section>';
const getCards=slug=>{
 const data=articles[slug];
 let photos='';
 if(slug==="photos")photos='<div class="media-photo-grid">'+portraitImages.map((image,i)=>'<figure><img src="'+image+'" alt="Original Pace SBDC website photograph '+(i+1)+'" loading="lazy" decoding="async"><figcaption>Image from the Pace SBDC public website</figcaption></figure>').join("")+'</div>';
 let reports='';
 if(slug==="newsletter")reports='<div class="source-callout"><h3>Read older issues</h3><p>The new site preserves newsletter highlights and publication dates. An email newsletter signup cannot be activated without a configured mailing-list provider and consent form; no dummy form has been added.</p></div>';
 if(slug==="video")reports='<div class="source-callout"><h3>Recorded sessions</h3><p>Programs include current and archived presentations. Video playback would require authorized recording URLs; this concept does not invent video embeds or imply access to unavailable recordings.</p></div>';
 return hero(data.heading,data.sub)+'<section class="section-pad deep-content"><div class="container">'+photos+cards(data.entries)+reports+footerCTA+'</div></section>';
};
export function renderMedia(slug){
 if(slug==="social")return social();
 if(slug==="privacy-policy")return privacy();
 if(slug==="espanol"||slug==="contacto")return spanish();
 if(!articles[slug])throw Error("Unknown media section: "+slug);
 return getCards(slug);
}

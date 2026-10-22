(() => {
  "use strict";
  // These case studies describe concepts and in-development products, not delivered clients.
  const cases = [
    {
      short:"The Spotlight", number:"01", title:"The<br><em>Spotlight.</em>",
      stage:"EXPLORATORY DESIGN CONCEPT",
      summary:"A personal portfolio that feels like a premiere, not a résumé.",
      challenge:"Creative talent needs more than a headshot and a list of credits. Their presence should be as expressive as the work itself.",
      direction:"Oversized editorial type, motion-led storytelling, expressive portrait treatments, confident visual hierarchy, and a focus on the person behind the work.",
      skills:["Art direction","Portfolio architecture","Motion design","Mobile-first UX","Brand personality"],
      note:"Fictional design exploration. The on-page portrait is an original vector illustration; this is not presented as commissioned client work."
    },
    {
      short:"ResidenceOS", number:"02", title:"Residence<br><em>OS.</em>",
      stage:"PRODUCT CONCEPT / IN DEVELOPMENT",
      summary:"An ambitious rethink of the experience of managing residential communities.",
      challenge:"Housing operations involve many moving parts. Administrators need clarity, approachable interfaces, and thoughtful workflows.",
      direction:"A unified product direction with structured views, status visualization, streamlined actions, and interfaces designed to reduce friction.",
      skills:["Product strategy","Dashboard UX","Application engineering","Information architecture","Workflow design"],
      note:"Interface values shown in the mockup are illustrative, not current operational data. Product development is ongoing."
    },
    {
      short:"Cirvo", number:"03", title:"Cirvo<br><em>Social.</em>",
      stage:"MOBILE PRODUCT / IN DEVELOPMENT",
      summary:"A more human way for new students to find their people.",
      challenge:"Starting somewhere new can feel overwhelming. A supportive, enjoyable matching experience can help students form connections.",
      direction:"A friendly visual identity, warm microinteractions, considered compatibility storytelling, and a mobile-first social product concept.",
      skills:["App concept","Interaction design","Mobile UI","User journeys","Frontend engineering"],
      note:"The profiles, names, and match percentages shown in the demo are fictional illustrative content."
    }
  ];
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;
  const modal = document.createElement("div");
  modal.className = "case-modal";
  modal.id = "case-modal";
  modal.hidden = true;
  modal.innerHTML = '<div class="case-backdrop" data-close="true"></div><div class="case-sheet" role="dialog" aria-modal="true" aria-labelledby="case-title" tabindex="-1"><div class="case-sheet-top"><span>AWE / DIGITAL — PROJECT FILE</span><button type="button" class="case-close" aria-label="Close project details">×</button></div><div class="case-details" id="case-details"></div><div class="case-foot"><button type="button" id="case-inquire">MAKE SOMETHING LIKE THIS ↗</button><span aria-hidden="true">✳</span></div></div>';
  document.body.appendChild(modal);
  const sheet = modal.querySelector(".case-sheet");
  const details = modal.querySelector("#case-details");
  let previousFocus = null;
  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    previousFocus?.focus();
  };
  const open = (index) => {
    const c = cases[index];
    if (!c) return;
    previousFocus = document.activeElement;
    details.innerHTML = '<span class="case-stage">PROJECT ' + c.number + ' / ' + c.stage + '</span>' +
      '<h2 id="case-title">' + c.title + '</h2>' +
      '<p class="case-summary">' + c.summary + '</p>' +
      '<div class="case-twin"><div><h3>THE OPPORTUNITY</h3><p>' + c.challenge + '</p></div>' +
      '<div><h3>THE CREATIVE DIRECTION</h3><p>' + c.direction + '</p></div></div>' +
      '<div class="case-capabilities"><span>CAPABILITIES EXPLORED</span><ul>' +
      c.skills.map(skill => '<li>' + skill + '</li>').join("") +
      '</ul></div><p class="case-note">' + c.note + '</p>';
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    sheet.scrollTop = 0;
    modal.querySelector(".case-close").focus();
  };
  cards.forEach((card, index) => {
    card.setAttribute("role","button");
    card.setAttribute("aria-label", "Explore the " + cases[index].short + " case study");
    card.addEventListener("click", () => open(index));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); open(index);
      }
    });
  });
  modal.querySelector(".case-close").addEventListener("click",close);
  modal.querySelector(".case-backdrop").addEventListener("click",close);
  modal.querySelector("#case-inquire").addEventListener("click", () => {
    close();document.querySelector("#contact")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  });
  document.addEventListener("keydown", event => {
    if (modal.hidden) return;
    if (event.key === "Escape") {event.preventDefault();close();return;}
    if (event.key !== "Tab") return;
    const buttons = [...modal.querySelectorAll("button")];
    const first=buttons[0],last=buttons[buttons.length-1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  const hint = document.createElement("div");
  hint.className = "work-interaction-hint";
  hint.innerHTML = '<span>✳</span> CLICK OR TAP ANY PROJECT TO EXPLORE THE CONCEPT';
  document.querySelector(".work-grid")?.after(hint);
})();

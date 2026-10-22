const CATEGORIES = new Set([
  "Student / résumé portfolio",
  "Actor or creative portfolio",
  "Small business website",
  "Custom web project",
  "General inquiry",
]);
export function validateInquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw Error("Enter your project details.");
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const project = typeof input.project === "string" ? input.project.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  if (!name || name.length > 100) throw Error("Enter your name (100 characters maximum).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    throw Error("Enter a valid email address.");
  if (!CATEGORIES.has(project)) throw Error("Choose a valid project type.");
  if (message.length < 10 || message.length > 3000)
    throw Error("Describe your project in 10 to 3,000 characters.");
  return { name, email, project, message };
}

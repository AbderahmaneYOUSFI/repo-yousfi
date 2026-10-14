export type ProfileContact = {
  readonly email?: `${string}@${string}`;
  readonly github?: `https://${string}`;
  readonly linkedin?: `https://${string}`;
  readonly cv?: `/${string}.pdf`;
};

// Add only confirmed personal destinations and an existing PDF from public/.
const contact: ProfileContact = {};

export const profile = {
  name: "Your Name",
  role: "AI-Native Software Engineer",
  intro:
    "I design and build thoughtful digital products with modern web tools, clear systems thinking, and an eye for production quality.",
  metadataDescription:
    "Portfolio for Your Name, an AI-Native Software Engineer building thoughtful digital products.",
  ctas: {
    projects: {
      label: "View Projects",
      href: "#projects",
    },
    contact: {
      label: "Contact",
      href: "#contact",
    },
  },
  projectSummary:
    "Selected project case studies will highlight product thinking, technical decisions, and measurable outcomes.",
  contactSummary:
    "Contact links and a CV download appear here when available.",
  contact,
} as const;

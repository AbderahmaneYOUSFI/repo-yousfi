export type ProfileContact = {
  readonly email?: `${string}@${string}`;
  readonly github?: `https://${string}`;
  readonly linkedin?: `https://${string}`;
  readonly cv?: `/${string}.pdf` | `https://${string}`;
};

// Add only confirmed personal destinations and CV links.
const contact: ProfileContact = {
  email: "yousfi.abderrahmane02@gmail.com",
  github: "https://github.com/AbderahmaneYOUSFI",
  linkedin: "https://linkedin.com/in/abderrahmane02-yousfi",
  cv: "https://drive.google.com/file/d/1SlqpGjUtvP79uAcxwJXQQo4XrqjjrYMl/view?usp=sharing",
};

export const profile = {
  name: "Abderrahmane Yousfi",
  role: "M2 MIAGE · Applied AI & Industrial Engineering",
  intro:
    "Based in Nice, I am a Master 2 MIAGE student in the Applied Artificial Intelligence (IA2) track at Université Côte d’Azur, Sophia Antipolis (2025–present), and a 2025 Industrial Engineering graduate of ENSTA Alger. I combine full-stack development, AI and information systems, with projects spanning ML pipelines, multiplayer microservices and local NLP tools. I am seeking an AI developer internship starting in January 2027.",
  metadataDescription:
    "Abderrahmane Yousfi — M2 MIAGE Applied AI student and Industrial Engineering graduate in Nice. Seeking an AI developer internship from January 2027.",
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
    "Projects spanning multilingual transcription, multiplayer software, energy forecasting, information systems and database internals.",
  contactSummary:
    "I am available for an AI developer internship starting in January 2027. Get in touch by email or connect with me on GitHub and LinkedIn.",
  contact,
} as const;

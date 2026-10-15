import type { CareerPathSlug } from "@/data/career-paths";

export type ProjectLink = Readonly<{
  label: string;
  href: `https://${string}` | `http://${string}`;
}>;

export type Project = Readonly<{
  id: string;
  title: string;
  description: string;
  technologies: readonly string[];
  careerPaths: readonly CareerPathSlug[];
  links: readonly ProjectLink[];
}>;

// CV facts: docs/content/cv-source.tex. Retain unsourced legacy projects.
// Editorial mappings and the MCP naming question: docs/content/content-review.md.
export const projects: readonly Project[] = [
  {
    id: "picoxia",
    title: "PicoxIA transcription/NLP",
    description: "An open-source multilingual dictation and NLP tool supporting 14 languages, with hybrid Whisper/Vosk transcription and local AI enrichment using the qwen2.5 LLM.",
    technologies: ["Python", "Flask", "React", "Whisper", "Vosk", "Ollama", "qwen2.5", "MongoDB"],
    careerPaths: ["ai-data", "software"],
    links: [],
  },
  {
    id: "reactis",
    title: "Reactis GenAI functional testing",
    description: "Generative AI and functional testing. Project details to be confirmed.",
    technologies: [],
    // CV does not verify this project's scope or path memberships.
    careerPaths: [],
    links: [],
  },
  {
    id: "quiz-game",
    title: "Quiz Game",
    description: "A quiz game. Project details to be confirmed.",
    technologies: [],
    // Keep separate from Faraway; relevance awaits supporting details.
    careerPaths: [],
    links: [],
  },
  {
    id: "forecasting",
    title: "Energy consumption forecasting",
    description: "Designed a complete machine learning pipeline covering ETL, modeling and evaluation, with an interactive dashboard for energy consumption forecasting.",
    technologies: ["Python", "ARIMA", "Prophet", "XGBoost", "Streamlit", "ETL"],
    careerPaths: ["ai-data"],
    links: [],
  },
  {
    id: "icosnet",
    title: "ICOSNET process improvement",
    description: "Work during the January–May 2025 information systems internship: BPMN modeling of software development, structured project tracking data and KPI definition to support continuous improvement.",
    technologies: ["BPMN"],
    careerPaths: ["digital"],
    links: [],
  },
  {
    id: "thais-mcp-server",
    title: "MCP Server — Hotel PMS integration",
    description: "Processed and secured data flows through REST APIs to integrate a hotel property management system with Claude Desktop.",
    technologies: ["Node.js", "TypeScript", "JWT", "REST API", "MCP"],
    careerPaths: ["software"],
    links: [],
  },
  {
    id: "faraway",
    title: "Faraway — Multiplayer card game",
    description: "A microservices architecture covering authentication, lobby, game and AI services, with Python bots, real-time WebSocket communication and Docker CI/CD.",
    technologies: ["Angular", "Spring Boot", "FastAPI", "Docker", "WebSocket", "Eureka", "Python"],
    careerPaths: ["software"],
    links: [],
  },
  {
    id: "database-simulation",
    title: "Oracle-style database simulation",
    description: "Implemented database management mechanisms in Python, including buffer management, transactions and ACID properties.",
    technologies: ["Python"],
    careerPaths: ["software"],
    links: [],
  },
];

export function getProjectsForPath(slug: CareerPathSlug): readonly Project[] {
  return projects.filter((project) => project.careerPaths.includes(slug));
}

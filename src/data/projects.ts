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

// Names/topics come from the Feature 003 request. Path assignments are
// provisional editorial choices; technologies and URLs await verification.
export const projects: readonly Project[] = [
  {
    id: "picoxia",
    title: "PicoxIA transcription/NLP",
    description: "Transcription and natural language processing. Project details to be confirmed.",
    technologies: [],
    careerPaths: ["ai-data", "software"],
    links: [],
  },
  {
    id: "reactis",
    title: "Reactis GenAI functional testing",
    description: "Generative AI and functional testing. Project details to be confirmed.",
    technologies: [],
    careerPaths: ["ai-data", "software"],
    links: [],
  },
  {
    id: "quiz-game",
    title: "Quiz Game",
    description: "A quiz game. Project details to be confirmed.",
    technologies: [],
    careerPaths: ["software"],
    links: [],
  },
  {
    id: "forecasting",
    title: "Forecasting",
    description: "A forecasting project. Project details to be confirmed.",
    technologies: [],
    careerPaths: ["ai-data"],
    links: [],
  },
  {
    id: "icosnet",
    title: "ICOSNET process improvement",
    description: "Process improvement. Project details to be confirmed.",
    technologies: [],
    careerPaths: ["digital"],
    links: [],
  },
  {
    id: "thais-mcp-server",
    title: "Thaïs MCP Server",
    description: "An MCP server project. Project details to be confirmed.",
    technologies: [],
    careerPaths: ["software"],
    links: [],
  },
];

export function getProjectsForPath(slug: CareerPathSlug): readonly Project[] {
  return projects.filter((project) => project.careerPaths.includes(slug));
}

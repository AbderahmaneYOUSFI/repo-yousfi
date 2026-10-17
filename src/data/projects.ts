import type { CareerPathSlug } from "@/data/career-paths";

export type ProjectLink = Readonly<{
  label: string;
  href: `https://${string}` | `http://${string}`;
}>;

export type Project = Readonly<{
  id: string;
  published: boolean;
  title: string;
  description: string;
  technologies: readonly string[];
  careerPaths: readonly CareerPathSlug[];
  links: readonly ProjectLink[];
}>;

// Owner-confirmed inventory and CV facts: docs/content/content-review.md.
// Preserve stable IDs; publication requires explicit owner approval.
export const projects: readonly Project[] = [
  {
    id: "picoxia",
    published: true,
    title: "PicoxIA — Multilingual veterinary dictation",
    description: "An open-source veterinary dictation and NLP tool supporting 14 languages, with hybrid Whisper/Vosk transcription and local AI enrichment using Qwen 2.5.",
    technologies: ["React 19", "TypeScript", "Vite", "RSuite", "Python", "Flask", "Vosk", "Whisper", "Ollama", "Qwen 2.5", "MongoDB"],
    careerPaths: ["ai-data", "software"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/picoxia_LLM" }],
  },
  {
    id: "reactis",
    published: true,
    title: "Réactis — Generative AI for Functional Testing",
    description: "Research and benchmarking on generative AI across functional and business testing: requirements, test cases, test data, execution, result judgment, failure analysis and campaign management. Includes a Claude Code agent benchmark.",
    technologies: [],
    careerPaths: ["ai-data", "digital"],
    links: [],
  },
  {
    id: "forecasting",
    published: true,
    title: "Energy Consumption Forecasting",
    description: "A machine learning pipeline covering ETL, modeling and evaluation, with seven-day energy consumption forecasts, model comparison and an interactive Streamlit dashboard.",
    technologies: ["Python", "Pandas", "NumPy", "scikit-learn", "Prophet", "XGBoost", "Statsmodels", "ARIMA", "Streamlit", "Plotly", "ETL"],
    careerPaths: ["ai-data"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/energy_predection_repo" }],
  },
  {
    id: "icosnet",
    published: true,
    title: "Sustainable Software Engineering @ ICOSNET",
    description: "Sustainable Software Engineering (SSE) research and an ICOSNET e-commerce case study: diagnose development processes, compare methodologies and propose Scrum + SSE. Expected impact is evaluated through simulation. Deliverables include a research paper, academic poster and final-year thesis.",
    technologies: ["Lean", "VSM", "Kanban", "Scrum", "LCA", "SDLC sustainability", "BPMN"],
    careerPaths: ["digital"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/SustainableSoftwareEngineering" }],
  },
  {
    id: "thais-mcp-server",
    published: true,
    title: "Thaïs Hotel MCP",
    description: "A secured MCP integration connecting the Thaïs hotel API with Claude Desktop for availability, room types, pricing, reservation workflows and email confirmation.",
    technologies: ["Node.js", "TypeScript", "Express", "MCP SDK", "Axios", "JWT", "Nodemailer", "Zod", "REST API"],
    careerPaths: ["ai-data"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/ModelContextProtocol_Thais_API" }],
  },
  {
    id: "faraway",
    published: true,
    title: "Faraway — Multiplayer card game",
    description: "A physical card game adapted into a multiplayer web application, with authentication, lobby, game and AI microservices, Python bots, real-time WebSockets and Docker CI/CD.",
    technologies: ["Angular", "Spring Boot", "Spring Cloud", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "WebSockets", "JWT", "Google OAuth", "Eureka", "Docker"],
    careerPaths: ["software", "digital"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/faraway_web_game" }, { label: "Live demo", href: "http://89.167.89.79:4200/" }],
  },
  {
    id: "database-simulation",
    published: true,
    title: "Mini-SGBD — Oracle Simulation",
    description: "An educational Python DBMS, also known as FSGDB, exploring disk pages, buffer management, locking, ACID transactions, write-ahead logging (WAL), rollback and REDO/UNDO crash recovery.",
    technologies: ["Python"],
    careerPaths: ["software"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/SGBD_ORACLE_Simulation" }],
  },
  {
    id: "marble-madness",
    published: true,
    title: "Marble Madness",
    description: "A 3D browser physics game with keyboard and mobile controls, levels, scoring and enemies.",
    technologies: ["TypeScript", "Babylon.js", "Havok Physics", "Vite", "Blender", "GLB"],
    careerPaths: ["software"],
    links: [{ label: "GitHub", href: "https://github.com/Tzk91/Marble-Madness" }],
  },
  {
    id: "angular-assignment-management",
    published: true,
    title: "Angular Assignment Management",
    description: "An assignment management application built with Angular 20, RxJS, routing and forms, deployed on Render.",
    technologies: ["Angular 20", "TypeScript", "RxJS", "Render"],
    careerPaths: ["software"],
    links: [{ label: "GitHub", href: "https://github.com/AbderahmaneYOUSFI/assignment_web_app" }, { label: "Live demo", href: "https://angular-25-26-abderahmaneyousfi.onrender.com/" }],
  },
];

export function getProjectsForPath(slug: CareerPathSlug): readonly Project[] {
  return projects.filter((project) => project.careerPaths.includes(slug));
}

// Editorial expansion of the owner-confirmed inventory in projects.ts and
// docs/content/content-review.md. Publication adds no claims of measured impact.
export type ProjectDetail = Readonly<{
  context: string;
  work: readonly string[];
  focus: string;
}>;

const details: Readonly<Record<string, ProjectDetail>> = {
  picoxia: {
    context: "Veterinary dictation brings together speech recognition, multilingual text and local language processing. PicoxIA supports dictation in 14 languages.",
    work: ["Hybrid transcription with Whisper and Vosk.", "Local AI enrichment with Qwen 2.5 through Ollama.", "React and TypeScript interface with a Python/Flask backend and MongoDB storage."],
    focus: "An end-to-end speech and NLP workflow combining multilingual dictation, hybrid transcription and local language-model enrichment with a React interface and Python backend.",
  },
  reactis: {
    context: "Réactis investigates how generative AI can support functional and business testing across a testing campaign.",
    work: ["Research and benchmarking covering requirements, test cases and test data.", "Scope includes test execution, result judgment, failure analysis and campaign management.", "Includes a Claude Code agent benchmark."],
    focus: "A testing-campaign perspective that connects requirements analysis, test design, execution and result analysis with research into generative AI and agent-based benchmarking.",
  },
  forecasting: {
    context: "Energy consumption forecasting connects data preparation, model comparison and an interface for exploring predictions over a seven-day horizon.",
    work: ["ETL, modeling and evaluation in a Python machine learning pipeline.", "Model comparison using ARIMA, Prophet and XGBoost.", "An interactive Streamlit dashboard with Plotly."],
    focus: "An end-to-end forecasting workflow that brings together data preparation, alternative time-series models and an interactive interface for comparing seven-day predictions.",
  },
  icosnet: {
    context: "Sustainable Software Engineering research is paired with an ICOSNET e-commerce case study to examine development processes and sustainability.",
    work: ["Diagnose development processes and compare methodologies.", "Propose Scrum combined with Sustainable Software Engineering and evaluate expected impact through simulation.", "Related deliverables include a research paper, academic poster and final-year thesis."],
    focus: "A research paper, academic poster and final-year thesis connect sustainability concepts with a process-improvement proposal. Simulation is used to evaluate the expected impact of Scrum combined with SSE.",
  },
  "thais-mcp-server": {
    context: "A secured Model Context Protocol integration connects the Thaïs hotel API with Claude Desktop for hotel reservation workflows.",
    work: ["Availability, room types and pricing through the hotel API.", "Reservation workflows and email confirmation.", "Hotel API integration with Node.js, Express, the MCP SDK, Axios, JWT, Nodemailer and Zod."],
    focus: "MCP tools connect conversational requests in Claude Desktop to hotel API operations, with JWT authentication and email confirmation as part of the reservation workflow.",
  },
  faraway: {
    context: "The physical Faraway card game is adapted into a multiplayer web application, connecting game interactions and distributed application services.",
    work: ["Authentication, lobby, game and AI microservices.", "Python bots and real-time communication with WebSockets.", "An Angular and Spring-based stack with Docker CI/CD and PostgreSQL, MongoDB and Redis."],
    focus: "A multiplayer application combining distributed services, real-time game communication, Python bots and container-based delivery. The source code and live application provide two ways to explore the project.",
  },
  "database-simulation": {
    context: "Mini-SGBD, also known as FSGDB, is an educational Python DBMS exploring the internals of database storage and transaction management.",
    work: ["Disk pages, buffer management and locking.", "ACID transactions and write-ahead logging.", "Rollback and REDO/UNDO crash recovery."],
    focus: "An educational implementation of database internals, connecting storage and buffer management with transaction logging and crash recovery. Oracle Simulation is the project name for this Python learning environment.",
  },
  "marble-madness": {
    context: "A 3D browser physics game that supports keyboard and mobile controls.",
    work: ["Levels, scoring and enemies.", "TypeScript, Babylon.js and Havok Physics for browser-based 3D rendering and physics.", "Vite, Blender and GLB for development and 3D assets."],
    focus: "A browser game combining 3D rendering, a physics engine and game assets with keyboard and mobile interaction. Levels, scoring and enemies bring the technical components into a playable game structure.",
  },
  "angular-assignment-management": {
    context: "An assignment management application built with Angular 20, routing and forms.",
    work: ["Angular 20 and TypeScript application using RxJS.", "Routing and form handling for assignment management.", "Application deployed on Render."],
    focus: "An Angular application bringing together reactive programming, routing and forms for assignment management, with a deployment on Render.",
  },
};

export function getProjectDetail(id: string): ProjectDetail {
  return details[id] ?? {
    context: "",
    work: [],
    focus: "",
  };
}

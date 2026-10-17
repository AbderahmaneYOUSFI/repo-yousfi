// Editorial expansion of the owner-confirmed inventory in projects.ts and
// docs/content/content-review.md. Publication adds no claims of measured impact.
export type ProjectDetail = Readonly<{
  context: string;
  work: readonly string[];
  limits: string;
}>;

const details: Readonly<Record<string, ProjectDetail>> = {
  picoxia: {
    context: "Veterinary dictation brings together speech recognition, multilingual text and local language processing. PicoxIA supports dictation in 14 languages.",
    work: ["Hybrid transcription with Whisper and Vosk.", "Local AI enrichment with Qwen 2.5 through Ollama.", "The documented toolset includes React, TypeScript, Python, Flask and MongoDB."],
    limits: "No measured transcription accuracy, latency or clinical outcome has been supplied. The public repository is the available technical reference.",
  },
  reactis: {
    context: "Réactis investigates how generative AI can support functional and business testing across a testing campaign.",
    work: ["Research and benchmarking covering requirements, test cases and test data.", "Scope includes test execution, result judgment, failure analysis and campaign management.", "Includes a Claude Code agent benchmark."],
    limits: "Benchmark outcomes, implementation technologies and individual responsibility boundaries remain to be confirmed. No improvement or completed result is claimed.",
  },
  forecasting: {
    context: "Energy consumption forecasting connects data preparation, model comparison and an interface for exploring predictions over a seven-day horizon.",
    work: ["ETL, modeling and evaluation in a Python machine learning pipeline.", "Model comparison using the documented ARIMA, Prophet and XGBoost toolset.", "An interactive Streamlit dashboard with Plotly."],
    limits: "No model scores, production deployment or measured business impact have been supplied. Forecasting capability is distinct from a verified accuracy claim.",
  },
  icosnet: {
    context: "Sustainable Software Engineering research is paired with an ICOSNET e-commerce case study to examine development processes and sustainability.",
    work: ["Diagnose development processes and compare methodologies.", "Propose Scrum combined with Sustainable Software Engineering and evaluate expected impact through simulation.", "Related deliverables include a research paper, academic poster and final-year thesis."],
    limits: "The expected impact is evaluated through simulation. This does not establish a deployed organizational change or measured production improvement. The ICOSNET internship is described separately in professional experience.",
  },
  "thais-mcp-server": {
    context: "A secured Model Context Protocol integration connects the Thaïs hotel API with Claude Desktop for hotel reservation workflows.",
    work: ["Availability, room types and pricing through the hotel API.", "Reservation workflows and email confirmation.", "Node.js and TypeScript integration with Express, the MCP SDK, Axios, JWT, Nodemailer and Zod."],
    limits: "No live booking demo, operating metrics or deployment URL has been supplied. The available resource is the owner-provided source repository.",
  },
  faraway: {
    context: "The physical Faraway card game is adapted into a multiplayer web application, connecting game interactions and distributed application services.",
    work: ["Authentication, lobby, game and AI microservices.", "Python bots and real-time communication with WebSockets.", "An Angular and Spring-based stack with Docker CI/CD and the documented data services."],
    limits: "No public repository, demo URL, player counts or performance measurements have been supplied. The conceptual illustration is not a verified deployment architecture.",
  },
  "database-simulation": {
    context: "Mini-SGBD, also known as FSGDB, is an educational Python DBMS exploring the internals of database storage and transaction management.",
    work: ["Disk pages, buffer management and locking.", "ACID transactions and write-ahead logging.", "Rollback and REDO/UNDO crash recovery."],
    limits: "Oracle Simulation describes the educational project; it does not imply feature parity with Oracle Database. No benchmark, production deployment or repository URL has been supplied.",
  },
  "marble-madness": {
    context: "A 3D browser physics game that supports keyboard and mobile controls.",
    work: ["Levels, scoring and enemies.", "TypeScript, Babylon.js and Havok Physics in the documented browser toolset.", "Vite, Blender and GLB in the documented development and asset toolset."],
    limits: "No repository, playable demo URL, frame-rate measurement or additional gameplay details have been supplied.",
  },
  "angular-assignment-management": {
    context: "An assignment management application built with Angular 20, routing and forms.",
    work: ["Angular 20 and TypeScript application using RxJS.", "Routing and form handling for assignment management.", "Deployment on Render is confirmed in the project inventory."],
    limits: "The source repository is available. No Render deployment URL, usage metrics, authentication model or additional assignment workflow has been confirmed.",
  },
};

export function getProjectDetail(id: string): ProjectDetail {
  return details[id] ?? {
    context: "The project overview contains the currently confirmed information.",
    work: [],
    limits: "Further implementation details and results have not been supplied.",
  };
}

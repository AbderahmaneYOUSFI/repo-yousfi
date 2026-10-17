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
    focus: "A veterinary dictation tool supporting 14 languages, with hybrid Whisper/Vosk transcription and local Qwen 2.5 enrichment. The application brings speech input, language processing and report storage together in a React and Python workflow.",
  },
  reactis: {
    context: "Réactis investigates how generative AI can support functional and business testing across a testing campaign.",
    work: ["Research and benchmarking covering requirements, test cases and test data.", "Scope includes test execution, result judgment, failure analysis and campaign management.", "Includes a Claude Code agent benchmark."],
    focus: "Research and benchmarking across the functional testing campaign, from requirements and test-case design to execution, failure analysis and campaign management, including a Claude Code agent benchmark.",
  },
  forecasting: {
    context: "Energy consumption forecasting connects data preparation, model comparison and an interface for exploring predictions over a seven-day horizon.",
    work: ["ETL, modeling and evaluation in a Python machine learning pipeline.", "Model comparison using ARIMA, Prophet and XGBoost.", "An interactive Streamlit dashboard with Plotly."],
    focus: "A Python pipeline producing seven-day energy consumption forecasts, comparing ARIMA, Prophet and XGBoost models, and presenting predictions through an interactive Streamlit dashboard with Plotly.",
  },
  icosnet: {
    context: "Sustainable Software Engineering research is paired with an ICOSNET e-commerce case study to examine development processes and sustainability.",
    work: ["Diagnose development processes and compare methodologies.", "Propose Scrum combined with Sustainable Software Engineering and evaluate expected impact through simulation.", "Related deliverables include a research paper, academic poster and final-year thesis."],
    focus: "A research paper, academic poster and final-year thesis, supported by an ICOSNET e-commerce case study and a Scrum + SSE process-improvement proposal. The expected impact of the proposal is evaluated through simulation.",
  },
  "thais-mcp-server": {
    context: "A secured Model Context Protocol integration connects the Thaïs hotel API with Claude Desktop for hotel reservation workflows.",
    work: ["Availability, room types and pricing through the hotel API.", "Reservation workflows and email confirmation.", "Hotel API integration with Node.js, Express, the MCP SDK, Axios, JWT, Nodemailer and Zod."],
    focus: "An MCP integration that enables Claude Desktop to check hotel availability, room types and pricing, create reservations and send confirmation emails through the hotel API, using JWT authentication.",
  },
  faraway: {
    context: "The physical Faraway card game is adapted into a multiplayer web application, connecting game interactions and distributed application services.",
    work: ["Authentication, lobby, game and AI microservices.", "Python bots and real-time communication with WebSockets.", "An Angular and Spring-based stack with Docker CI/CD and PostgreSQL, MongoDB and Redis."],
    focus: "A multiplayer web adaptation of Faraway with authentication, lobbies, real-time WebSocket communication and Python bots. The application combines game and AI microservices with Docker CI/CD, and is available through its live app and source repository.",
  },
  "database-simulation": {
    context: "Mini-SGBD, also known as FSGDB, is an educational Python DBMS exploring the internals of database storage and transaction management.",
    work: ["Disk pages, buffer management and locking.", "ACID transactions and write-ahead logging.", "Rollback and REDO/UNDO crash recovery."],
    focus: "An educational Python DBMS implementing disk pages, buffer management, locking, ACID transactions and write-ahead logging, with rollback and REDO/UNDO crash recovery. The source code makes these database mechanisms available to explore.",
  },
  "marble-madness": {
    context: "A 3D browser physics game that supports keyboard and mobile controls.",
    work: ["Levels, scoring and enemies.", "TypeScript, Babylon.js and Havok Physics for browser-based 3D rendering and physics.", "Vite, Blender and GLB for development and 3D assets."],
    focus: "A 3D browser physics game with keyboard and mobile controls, levels, scoring and enemies. Babylon.js and Havok Physics provide the rendering and physics, with Blender and GLB assets supporting the game world.",
  },
  "angular-assignment-management": {
    context: "An assignment management application built with Angular 20, routing and forms.",
    work: ["Angular 20 and TypeScript application using RxJS.", "Routing and form handling for assignment management.", "Application deployed on Render."],
    focus: "An assignment management application built with Angular 20, TypeScript and RxJS, combining routing and forms. The application is deployed on Render and accessible through its live app.",
  },
};

export function getProjectDetail(id: string): ProjectDetail {
  return details[id] ?? {
    context: "",
    work: [],
    focus: "",
  };
}

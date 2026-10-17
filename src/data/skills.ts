import type { CareerPathSlug } from "@/data/career-paths";

export type Skill = Readonly<{
  id: string;
  name: string;
  context?: string;
  careerPaths: readonly CareerPathSlug[];
}>;

// Groups use the existing card model; no proficiency ratings are inferred.
// Source: docs/content/cv-source.tex. Membership describes editorial relevance.
export const skills: readonly Skill[] = [
  {
    id: "languages",
    name: "Programming languages",
    context: "Python, Java, C/C++, SQL, JavaScript, TypeScript, R.",
    careerPaths: ["ai-data", "software"],
  },
  {
    id: "frameworks",
    name: "Web frameworks & APIs",
    context: "Angular, Spring Boot, Node.js, Express, REST APIs.",
    careerPaths: ["software"],
  },
  {
    id: "data-ai",
    name: "Data & AI",
    context: "MCP, PyTorch, TensorFlow, XGBoost, Scikit-learn, Pandas, NumPy, Streamlit, ETL.",
    careerPaths: ["ai-data"],
  },
  {
    id: "databases",
    name: "Databases",
    context: "MySQL, Oracle, MongoDB, SQLite.",
    careerPaths: ["ai-data", "software"],
  },
  {
    id: "development-tools",
    name: "Development & cloud tools",
    context: "Git, Docker, AWS, Postman.",
    careerPaths: ["software"],
  },
  {
    id: "engineering-tools",
    name: "Engineering & project tools",
    context: "Jira, MATLAB, SAP, MS Project.",
    careerPaths: ["digital"],
  },
  {
    id: "modeling",
    name: "Systems & process modeling",
    context: "UML, BPMN, ArchiMate.",
    careerPaths: ["digital"],
  },
  {
    id: "methods",
    name: "Delivery & continuous improvement",
    context: "Agile/Scrum, Lean, Six Sigma; ISO 9001, ISO 27001, ISO 14001.",
    careerPaths: ["digital"],
  },
  {
    id: "spoken-languages",
    name: "Spoken languages",
    context: "French (C1), English (C1), Arabic (native), as listed in the CV.",
    careerPaths: ["ai-data", "software", "digital"],
  },
  {
    id: "process-certifications",
    name: "Process & delivery certifications",
    context: "Lean Six Sigma Yellow Belt (Process Improvement, Data Analysis); Scrum Foundations (Agile Project Management).",
    careerPaths: ["digital"],
  },
  {
    id: "software-certifications",
    name: "Software & cloud certifications",
    context: "Green Computing & Sustainable Software Engineering\nAWS Academy Cloud Foundations & Cloud Developing.",
    careerPaths: ["software"],
  },
  {
    id: "power-bi",
    name: "Microsoft Power BI",
    context: "Certification in progress.",
    careerPaths: ["ai-data", "digital"],
  },
];

export function getSkillsForPath(slug: CareerPathSlug): readonly Skill[] {
  return skills.filter((skill) => skill.careerPaths.includes(slug));
}

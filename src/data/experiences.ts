import type { CareerPathSlug } from "@/data/career-paths";

export type Experience = Readonly<{
  id: string;
  organization: string;
  role?: string;
  period?: string;
  summary?: string;
  careerPaths: readonly CareerPathSlug[];
}>;

// Source: docs/content/cv-source.tex. Path relevance is editorial, not a job title.
export const experiences: readonly Experience[] = [
  {
    id: "icosnet-2025",
    organization: "ICOSNET SPA",
    role: "Information Systems Management Intern",
    period: "January–May 2025",
    summary:
      "Analyzed and modeled the software development process using BPMN. Structured project tracking data and defined KPIs for performance analysis. Established a continuous improvement approach based on quantitative indicators.",
    careerPaths: ["digital"],
  },
  {
    id: "schneider-electric-2024",
    organization: "Schneider Electric Algeria",
    role: "Quality Analyst Intern",
    period: "March–April 2024",
    summary:
      "Analyzed quality data from ISO 9001 audits and identified areas for improvement. Tracked quality indicators and contributed to continuous improvement.",
    careerPaths: ["digital"],
  },
  {
    id: "schneider-electric-2023",
    organization: "Schneider Electric Algeria",
    role: "Process & Production Intern",
    period: "March–April 2023",
    summary:
      "Analyzed production flows and used data to support performance optimization.",
    careerPaths: ["digital"],
  },
];

export function getExperiencesForPath(slug: CareerPathSlug): readonly Experience[] {
  return experiences.filter((experience) => experience.careerPaths.includes(slug));
}

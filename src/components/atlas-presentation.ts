import type { CareerPathSlug } from "@/data/career-paths";

export type Identity = "home" | "ai" | "software" | "digital";

export const pathIdentity: Record<CareerPathSlug, Exclude<Identity, "home">> = {
  "ai-data": "ai", software: "software", digital: "digital",
};

// Presentation labels only. Facts, publication and memberships come from projects.ts.
export const atlasLabels: Readonly<Record<string, string>> = {
  picoxia: "PicoxIA", reactis: "Réactis", forecasting: "Energy forecasting",
  icosnet: "SSE @ ICOSNET", "thais-mcp-server": "Thaïs Hotel MCP", faraway: "Faraway",
  "database-simulation": "Mini-SGBD / FSGDB", "marble-madness": "Marble Madness",
  "angular-assignment-management": "Angular Assignment Management",
};

export function projectHref(id: string) {
  return `/projects/${encodeURIComponent(id)}`;
}

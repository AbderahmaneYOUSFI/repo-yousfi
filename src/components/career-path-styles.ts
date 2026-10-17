import type { CareerPathAccent } from "@/data/career-paths";

export const careerPathStyles = {
  cyan: "ai", indigo: "software", teal: "digital",
} satisfies Record<CareerPathAccent, string>;

export const careerPathTextStyles = careerPathStyles;

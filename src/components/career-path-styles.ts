import type { CareerPathAccent } from "@/data/career-paths";

export const careerPathStyles = {
  cyan: "border-t-cyan-400/50",
  indigo: "border-t-indigo-400/50",
  teal: "border-t-teal-400/50",
} satisfies Record<CareerPathAccent, string>;

export const careerPathTextStyles = {
  cyan: "text-cyan-300",
  indigo: "text-indigo-300",
  teal: "text-teal-300",
} satisfies Record<CareerPathAccent, string>;

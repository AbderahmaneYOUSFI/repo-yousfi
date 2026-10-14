import type { CareerPathAccent } from "@/data/career-paths";

export const careerPathStyles = {
  cyan: "border-t-cyan-700 dark:border-t-cyan-400",
  indigo: "border-t-indigo-700 dark:border-t-indigo-400",
  teal: "border-t-teal-700 dark:border-t-teal-400",
} satisfies Record<CareerPathAccent, string>;

export const pathLinkFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 dark:focus-visible:outline-zinc-50";

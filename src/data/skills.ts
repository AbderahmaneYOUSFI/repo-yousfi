import type { CareerPathSlug } from "@/data/career-paths";

export type Skill = Readonly<{
  id: string;
  name: string;
  context?: string;
  careerPaths: readonly CareerPathSlug[];
}>;

// Project topics, academic positioning and this repository's dependencies
// do not verify a personal skill inventory. Await confirmed evidence.
export const skills: readonly Skill[] = [];

export function getSkillsForPath(slug: CareerPathSlug): readonly Skill[] {
  return skills.filter((skill) => skill.careerPaths.includes(slug));
}

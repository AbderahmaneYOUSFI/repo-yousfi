import type { CareerPathSlug } from "@/data/career-paths";

export type Experience = Readonly<{
  id: string;
  organization: string;
  role?: string;
  period?: string;
  summary?: string;
  careerPaths: readonly CareerPathSlug[];
}>;

// No professional experience is verified in repository source material.
// ICOSNET is a project topic, not evidence of employment; Schneider Electric
// has no source entry. Add records only after their facts are confirmed.
export const experiences: readonly Experience[] = [];

export function getExperiencesForPath(slug: CareerPathSlug): readonly Experience[] {
  return experiences.filter((experience) => experience.careerPaths.includes(slug));
}

import type { Experience } from "@/data/experiences";

export function ExperienceList({ experiences }: { experiences: readonly Experience[] }) {
  if (experiences.length === 0) {
    return <p className="mt-6 max-w-2xl leading-7 text-muted">Editorial placeholder: professional experience details and career-path relevance await confirmation.</p>;
  }

  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {experiences.map((experience) => (
        <li key={experience.id} className="min-w-0">
          <article className="h-full rounded-xl border border-border bg-surface p-6">
            <h3 className="break-words text-xl font-semibold leading-snug tracking-tight">{experience.organization}</h3>
            {experience.role && <p className="mt-3 break-words font-medium leading-7">{experience.role}</p>}
            {experience.period && <p className="mt-2 text-sm leading-6 text-muted">{experience.period}</p>}
            {experience.summary && <p className="mt-3 break-words leading-7 text-muted">{experience.summary}</p>}
          </article>
        </li>
      ))}
    </ul>
  );
}

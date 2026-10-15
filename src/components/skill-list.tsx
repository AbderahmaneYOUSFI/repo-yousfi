import type { Skill } from "@/data/skills";

export function SkillList({ skills }: { skills: readonly Skill[] }) {
  if (skills.length === 0) {
    return <p className="mt-6 max-w-2xl leading-7 text-muted">No skills listed for this perspective yet.</p>;
  }

  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <li key={skill.id} className="min-w-0 rounded-xl border border-border bg-surface p-6">
          <p className="break-words font-medium leading-7">{skill.name}</p>
          {skill.context && <p className="mt-2 break-words leading-7 text-muted">{skill.context}</p>}
        </li>
      ))}
    </ul>
  );
}

import type { Skill } from "@/data/skills";
const secondary = new Set(["spoken-languages", "process-certifications", "software-certifications", "power-bi"]);

function SkillIcon({ id }: { id: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{id === "languages" ? <path d="m9 7-5 5 5 5m6-10 5 5-5 5m-2-13-2 22" /> : id === "data-ai" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l4 4m6 6 4 4M5 19l4-4m6-6 4-4" /></> : id === "databases" ? <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></> : id === "frameworks" ? <path d="M3 4h18v16H3zM3 9h18m-13 4 3 3-3 3m6-3h4" /> : id === "development-tools" ? <path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10" /> : id === "modeling" ? <path d="M3 3h6v6H3zm12 12h6v6h-6zM6 9v9h9M9 6h9v9" /> : <><path d="M4 5h16M4 12h16M4 19h16" /><circle cx="8" cy="5" r="2" /><circle cx="16" cy="12" r="2" /><circle cx="8" cy="19" r="2" /></>}</svg>;
}

export function SkillList({ skills }: { skills: readonly Skill[] }) {
  if (!skills.length) return <p>No skills listed for this perspective yet.</p>;
  const primary = skills.filter(skill => !secondary.has(skill.id));
  const credentials = skills.filter(skill => secondary.has(skill.id));
  return <>{primary.length ? <div className="skills-grid">{primary.map(skill => <article key={skill.id} className="skill" data-skill={skill.id}><SkillIcon id={skill.id} /><h3>{skill.name}</h3>{skill.context ? <p>{skill.context}</p> : null}</article>)}</div> : null}
    {credentials.length ? <div className="credentials">{credentials.map(skill => <article key={skill.id} className="credential" data-skill={skill.id}><h3>{skill.name}</h3>{skill.context ? <p className={skill.id === "software-certifications" ? "whitespace-pre-line" : undefined}>{skill.context}</p> : null}</article>)}</div> : null}
  </>;
}

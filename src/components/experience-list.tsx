/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the portfolio's native navigation and storage-independent appearance URLs. */
import type { Experience } from "@/data/experiences";

export function ExperienceList({ experiences }: { experiences: readonly Experience[] }) {
  if (!experiences.length) return <div className="experience-context"><h3>Industrial engineering.<br />Information systems.</h3><div><p>My internships cover information systems management at ICOSNET and quality analysis and production processes at Schneider Electric Algeria.</p><p>No internship is currently assigned to this perspective.</p><a className="text-link" href="/paths/digital#experiences">Explore Digital Transformation experience</a><br /><a className="text-link" href="/#experiences">View all professional experience</a></div></div>;
  return <>{experiences.map(experience => <article key={experience.id} className="experience-row" data-experience={experience.id}>
    <div className="experience-year" aria-hidden="true">{experience.period?.match(/\d{4}/)?.[0]}</div><div className="experience-main"><h3>{experience.organization}</h3>{experience.role ? <span className="role">{experience.role}</span> : null}{experience.period ? <p className="experience-period">{experience.period}</p> : null}</div>{experience.summary ? <p>{experience.summary}</p> : null}
  </article>)}</>;
}

import type { Project } from "@/data/projects";
import { careerPathHref, getCareerPath } from "@/data/career-paths";
import { pathIdentity, projectHref } from "./atlas-presentation";
import { ProjectArtwork } from "./project-artwork";

export function ProjectRelationships({ project }: { project: Project }) {
  return <div className="study-paths" aria-label="Career relationships">{project.careerPaths.map(slug => <a key={slug} href={careerPathHref(slug)} className={`relationship ${pathIdentity[slug]}`}>{getCareerPath(slug).name}</a>)}</div>;
}

export function ProjectTechnologies({ project }: { project: Project }) {
  return project.technologies.length ? <ul className="stack" aria-label={`Technologies for ${project.title}`}>{project.technologies.map(technology => <li key={technology}><span>{technology}</span></li>)}</ul> : <p className="caption">Technologies have not been confirmed.</p>;
}

export function ProjectResources({ project }: { project: Project }) {
  return project.links.length ? <ul className="resource-links" aria-label={`Resources for ${project.title}`}>{project.links.map(link => <li key={link.href}><a href={link.href} className="text-link">{link.label} repository</a></li>)}</ul> : <p>No repository or demo link has been supplied for this project.</p>;
}

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  const published = projects.filter(project => project.published);
  if (!published.length) return <p>No projects listed for this path yet.</p>;
  return <>{published.map(project => <article key={project.id} id={project.id} className={`study ${project.id} ${pathIdentity[project.careerPaths[0]]}`} data-publication="published" data-memberships={project.careerPaths.join(" ")}>
    <figure className="study-figure"><div className="art" aria-hidden="true"><ProjectArtwork id={project.id} /></div><figcaption>Conceptual artwork from documented terms / not a verified architecture or product screenshot.</figcaption></figure>
    <div className="study-copy"><div className="study-meta"><ProjectRelationships project={project} /><span className="study-status">Published</span></div><h3><a href={projectHref(project.id)}>{project.title}</a></h3><div><p className="description">{project.description}</p><ProjectTechnologies project={project} /></div>
      <div className="study-actions"><a className="text-link" href={projectHref(project.id)}>Explore project</a><details className="evidence"><summary>Explore engineering notes</summary><div className="detail-body"><p>Documented technologies: {project.technologies.join(", ") || "To be confirmed"}.</p><ProjectResources project={project} /></div></details></div>
    </div>
  </article>)}</>;
}

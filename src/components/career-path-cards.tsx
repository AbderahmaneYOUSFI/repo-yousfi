import { careerPaths, careerPathHref } from "@/data/career-paths";
import { getProjectsForPath } from "@/data/projects";
import { pathIdentity } from "./atlas-presentation";
import { PathSymbol } from "./path-symbol";

export function CareerPathCards() {
  return <section className="perspectives-section wrap" aria-labelledby="perspectives-heading">
    <div className="perspectives-intro"><h2 id="perspectives-heading">Three ways into the work.</h2><p>Complementary disciplines. One engineering profile.</p></div>
    <div className="perspectives">{careerPaths.map(path => <article key={path.slug} className={`perspective ${pathIdentity[path.slug]}`}>
      <PathSymbol identity={pathIdentity[path.slug]} />
      <div className="perspective-body"><h3><a href={careerPathHref(path.slug)}>{path.name}</a></h3><p>{path.description}</p><span className="evidence-label">{getProjectsForPath(path.slug).filter(project => project.published).length} catalogue projects</span><a className="text-link" href={careerPathHref(path.slug)}>Explore this perspective</a></div>
    </article>)}</div>
  </section>;
}

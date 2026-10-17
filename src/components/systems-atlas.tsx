import { careerPaths, type CareerPathSlug } from "@/data/career-paths";
import { projects } from "@/data/projects";
import { atlasLabels, pathIdentity } from "./atlas-presentation";
import { AtlasInteraction, AtlasPathControl, AtlasProjectLink } from "./atlas-interaction";

// Geometry from the approved prototype; relationships always derive from source data.
const placement = ["picoxia", "reactis", "faraway", "forecasting", "thais-mcp-server", "icosnet", "database-simulation", "marble-madness", "angular-assignment-management"];
function position(id: string) {
  const index = placement.indexOf(id);
  return { x: 100 + 200 * (index % 3), y: 210 + 150 * Math.floor(index / 3) };
}

export function SystemsAtlas({ slug }: { slug?: CareerPathSlug }) {
  const published = projects.filter(project => project.published);
  const projectAnchor = (id: string) => `${slug ? "/" : ""}#${encodeURIComponent(id)}`;
  const description = (path: CareerPathSlug) => `${careerPaths.find(entry => entry.slug === path)?.name}: ${published.filter(project => project.careerPaths.includes(path)).map(project => atlasLabels[project.id] ?? project.title).join(", ")}. Other projects remain visible; select another perspective or All projects to open them.`;
  const caption = `All ${published.length} published projects are available. Shared projects appear in each of their perspectives on mobile.`;
  return <AtlasInteraction selected={slug ?? null} caption={caption} descriptions={{ "ai-data": description("ai-data"), software: description("software"), digital: description("digital") }}>
    <div className="atlas-top"><span className="atlas-word">Systems Atlas</span><span>{published.length} projects · {published.length} published</span></div>
    <div className="atlas-toolbar"><p>Choose a perspective, then open a highlighted project.</p><AtlasPathControl path={null} className="atlas-all">All projects</AtlasPathControl></div>
    <div className="atlas-plane atlas-desktop">
      <svg className="atlas-edges" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true"><g className="edge-reveal">
        {careerPaths.map((path, index) => <g key={path.slug} className={`relation ${pathIdentity[path.slug]}`}>
          {published.filter(project => project.careerPaths.includes(path.slug)).map(project => {
            const { x, y } = position(project.id);
            return <path key={project.id} d={`M${100 + index * 200} 110 C${100 + index * 200} ${y - 45} ${x} 130 ${x} ${y - 38}`} data-path={path.slug} data-project={project.id} />;
          })}
        </g>)}
      </g></svg>
      <div role="group" aria-label="Filter atlas projects" className="atlas-desktop-controls">
      {careerPaths.map((path, index) => <AtlasPathControl key={path.slug} path={path.slug} className={`atlas-node perspective-node ${pathIdentity[path.slug]}`} style={{ left: `${(100 + index * 200) / 6}%`, top: "10%" }}>
        <strong>{path.name}</strong><small>{published.filter(project => project.careerPaths.includes(path.slug)).length} projects · published</small>
      </AtlasPathControl>)}
      </div>
      {published.map(project => {
        const { x, y } = position(project.id);
        const memberships = project.careerPaths.map(path => careerPaths.find(entry => entry.slug === path)!.name).join(" + ");
        return <div key={project.id} data-atlas-project={project.id}><AtlasProjectLink projectId={project.id} memberships={project.careerPaths} href={projectAnchor(project.id)} className={`atlas-node atlas-project ${pathIdentity[project.careerPaths[0]]}`} style={{ left: `${x / 6}%`, top: `${y / 6}%` }} label={`${project.title} · Published · ${memberships}`}>
          <span className="membership-marks" aria-hidden="true">{project.careerPaths.map(path => <i key={path} className={pathIdentity[path]} />)}</span>
          <span>{atlasLabels[project.id] ?? project.title}</span><small className="publication">Published</small>
        </AtlasProjectLink></div>;
      })}
    </div>
    <div className="atlas-mobile"><div className="mobile-branches" role="group" aria-label="Filter atlas projects">
      {careerPaths.map(path => <div key={path.slug} className={`mobile-group ${pathIdentity[path.slug]}`}>
        <div className="mobile-path-heading"><AtlasPathControl path={path.slug} className="mobile-perspective">{path.name}</AtlasPathControl><span className="mobile-count">{published.filter(project => project.careerPaths.includes(path.slug)).length} projects · published</span></div>
        <ul className="mobile-projects" aria-label={`${path.name} project memberships`}>
          {published.filter(project => project.careerPaths.includes(path.slug)).map(project => <li key={project.id} className="mobile-association" data-mobile-path={path.slug} data-mobile-project={project.id}>
            <AtlasProjectLink projectId={project.id} memberships={project.careerPaths} href={projectAnchor(project.id)} className="mobile-project" label={`${project.title} · Published · ${project.careerPaths.map(entry => careerPaths.find(path => path.slug === entry)!.name).join(" + ")}`}><span>{atlasLabels[project.id] ?? project.title}</span><small className="publication">Published</small>{project.careerPaths.length > 1 ? <span className="shared-note">Shared: {project.careerPaths.map(entry => careerPaths.find(path => path.slug === entry)!.name).join(" + ")}</span> : null}</AtlasProjectLink>
          </li>)}
        </ul>
      </div>)}
    </div></div>
  </AtlasInteraction>;
}

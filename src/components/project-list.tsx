import type { Project } from "@/data/projects";

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  if (projects.length === 0) {
    return <p className="mt-6 leading-7 text-muted">No projects listed for this path yet.</p>;
  }

  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id} className="min-w-0">
          <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
            <h3 className="break-words text-xl font-semibold leading-snug tracking-tight">{project.title}</h3>
            <p className="mt-3 break-words leading-7 text-muted">{project.description}</p>
            <div className="mt-6">
              <p className="text-xs font-medium text-muted">Technologies</p>
              {project.technologies.length > 0 ? (
                <ul aria-label={`Technologies for ${project.title}`} className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology} className="max-w-full break-words rounded-md border border-border px-2 py-1 font-mono text-xs leading-5 text-muted">{technology}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm leading-6 text-muted">Technologies to be confirmed</p>
              )}
            </div>
            <div className="mt-auto pt-6">
              <div className="border-t border-border pt-3">
                {project.links.length > 0 ? (
                  <ul aria-label={`Links for ${project.title}`} className="flex flex-wrap gap-x-2 gap-y-1">
                    {project.links.map((link) => (
                      <li key={link.href} className="min-w-0 max-w-full">
                        <a href={link.href} aria-label={`${link.label}: ${project.title}`} className="inline-flex min-h-11 max-w-full items-center break-words rounded-md px-3 py-2 text-sm font-medium underline decoration-muted underline-offset-4 transition-colors hover:bg-surface-hover">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex min-h-11 items-center text-sm leading-6 text-muted">Project links to be confirmed</p>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

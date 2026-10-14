import type { Project } from "@/data/projects";

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  if (projects.length === 0) {
    return <p className="mt-6 text-zinc-700 dark:text-zinc-300">No projects listed for this path yet.</p>;
  }

  return (
    <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id} className="min-w-0">
          <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="break-words text-xl font-semibold text-zinc-950 dark:text-zinc-50">{project.title}</h3>
            <p className="mt-3 break-words leading-7 text-zinc-700 dark:text-zinc-300">{project.description}</p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Technologies</p>
              {project.technologies.length > 0 ? (
                <ul aria-label={`Technologies for ${project.title}`} className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology} className="max-w-full break-words rounded-lg bg-zinc-200 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">{technology}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Technologies to be confirmed</p>
              )}
            </div>
            {project.links.length > 0 && (
              <ul aria-label={`Links for ${project.title}`} className="mt-auto flex flex-wrap gap-3 pt-6">
                {project.links.map((link) => (
                  <li key={link.href} className="min-w-0">
                    <a href={link.href} aria-label={`${link.label}: ${project.title}`} className="inline-flex min-h-11 items-center break-words rounded-lg py-2 text-sm font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 dark:focus-visible:outline-zinc-50">{link.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}

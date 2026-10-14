import { careerPaths, careerPathHref } from "@/data/career-paths";
import { careerPathStyles, pathLinkFocus } from "@/components/career-path-styles";

export function CareerPathCards() {
  return (
    <section aria-labelledby="career-paths-heading" className="border-t border-zinc-200 px-6 py-16 dark:border-zinc-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="career-paths-heading" className="text-3xl font-semibold">One profile. Multiple perspectives.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-700 dark:text-zinc-300">Choose a career path to explore the connection between technology, data and business.</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {careerPaths.map((path) => (
            <li key={path.slug} className="min-w-0">
              <a href={careerPathHref(path.slug)} className={`flex h-full flex-col rounded-2xl border border-t-4 border-zinc-200 bg-zinc-50 p-6 transition-colors hover:bg-zinc-100 motion-reduce:transition-none dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${careerPathStyles[path.accent]} ${pathLinkFocus}`}>
                <h3 className="text-xl font-semibold">{path.name}</h3>
                <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">{path.description}</p>
                <span className="mt-auto pt-6 text-sm font-semibold">Explore path <span aria-hidden="true">→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

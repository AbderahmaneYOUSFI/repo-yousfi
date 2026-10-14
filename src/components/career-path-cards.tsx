import { careerPaths, careerPathHref } from "@/data/career-paths";
import { careerPathStyles, careerPathTextStyles } from "@/components/career-path-styles";

export function CareerPathCards() {
  return (
    <section aria-labelledby="career-paths-heading" className="portfolio-section">
      <div className="mx-auto max-w-6xl">
        <h2 id="career-paths-heading" className="section-heading">One profile. Multiple perspectives.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">Choose a career path to explore the connection between technology, data and business.</p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {careerPaths.map((path) => (
            <li key={path.slug} className="min-w-0">
              <a
                href={careerPathHref(path.slug)}
                className={`flex h-full flex-col rounded-xl border border-t-2 border-border bg-surface p-6 transition-colors hover:bg-surface-hover ${careerPathStyles[path.accent]}`}
              >
                <h3 className="text-xl font-semibold leading-snug tracking-tight">{path.name}</h3>
                <p className="mt-3 leading-7 text-muted">{path.description}</p>
                <span className={`mt-auto pt-6 text-sm font-medium ${careerPathTextStyles[path.accent]}`}>
                  Explore path <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

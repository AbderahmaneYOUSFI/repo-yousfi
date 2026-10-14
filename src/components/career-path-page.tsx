/* eslint-disable @next/next/no-html-link-for-pages -- Feature 002 uses native links for full-document navigation without client-side React. */
import type { Metadata } from "next";
import { careerPaths, careerPathHref, getCareerPath, type CareerPathSlug } from "@/data/career-paths";
import { profile } from "@/data/profile";
import { careerPathStyles, pathLinkFocus } from "@/components/career-path-styles";

export function careerPathMetadata(slug: CareerPathSlug): Metadata {
  const path = getCareerPath(slug);
  return { title: `${path.name} | ${profile.name}`, description: path.metadataDescription };
}

export function CareerPathPage({ slug }: { slug: CareerPathSlug }) {
  const path = getCareerPath(slug);

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Career paths" className="mb-12">
          <ul className="flex flex-wrap items-center gap-4">
            <li><a href="/" className={`inline-flex min-h-11 items-center rounded-lg px-3 underline underline-offset-4 ${pathLinkFocus}`}>Home</a></li>
            {careerPaths.map((entry) => (
              <li key={entry.slug}>
                <a href={careerPathHref(entry.slug)} aria-current={entry.slug === slug ? "page" : undefined} className={`inline-flex min-h-11 flex-wrap items-center gap-2 rounded-lg px-3 py-2 underline underline-offset-4 ${entry.slug === slug ? "bg-zinc-100 font-semibold dark:bg-zinc-900" : "text-zinc-700 dark:text-zinc-300"} ${pathLinkFocus}`}>
                  {entry.name}
                  {entry.slug === slug && <span className="text-xs">(Current)</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="path-heading" className={`rounded-2xl border border-t-4 border-zinc-200 p-6 dark:border-zinc-800 sm:p-10 ${careerPathStyles[path.accent]}`}>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{profile.name} · {profile.role}</p>
          <h1 id="path-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{path.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">{path.introduction}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/#projects" className={`inline-flex min-h-12 items-center rounded-full bg-zinc-950 px-6 font-semibold text-white dark:bg-zinc-50 dark:text-zinc-950 ${pathLinkFocus}`}>Projects on the homepage</a>
            <a href="/#contact" className={`inline-flex min-h-12 items-center rounded-full border border-zinc-500 px-6 font-semibold ${pathLinkFocus}`}>Contact</a>
          </div>
        </section>
      </div>
    </main>
  );
}

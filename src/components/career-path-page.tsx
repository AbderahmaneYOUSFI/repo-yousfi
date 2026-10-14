/* eslint-disable @next/next/no-html-link-for-pages -- Native links preserve full-document navigation established in Feature 002. */
import type { Metadata } from "next";
import { careerPaths, careerPathHref, getCareerPath, type CareerPathSlug } from "@/data/career-paths";
import { profile } from "@/data/profile";
import { careerPathStyles, careerPathTextStyles } from "@/components/career-path-styles";
import { ProjectList } from "@/components/project-list";
import { getProjectsForPath } from "@/data/projects";
import { ExperienceList } from "@/components/experience-list";
import { SkillList } from "@/components/skill-list";
import { getExperiencesForPath } from "@/data/experiences";
import { getSkillsForPath } from "@/data/skills";

export function careerPathMetadata(slug: CareerPathSlug): Metadata {
  const path = getCareerPath(slug);
  return { title: `${path.name} | ${profile.name}`, description: path.metadataDescription };
}

export function CareerPathPage({ slug }: { slug: CareerPathSlug }) {
  const path = getCareerPath(slug);

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Career paths" className="mb-12 sm:mb-16">
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <li><a href="/" className="inline-flex min-h-12 items-center rounded-lg px-4 py-3 text-sm text-muted underline underline-offset-4 transition-colors hover:bg-surface-hover hover:text-foreground">Home</a></li>
            {careerPaths.map((entry) => (
              <li key={entry.slug} className="min-w-0">
                <a
                  href={careerPathHref(entry.slug)}
                  aria-current={entry.slug === slug ? "page" : undefined}
                  className={`inline-flex min-h-12 w-full flex-wrap items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-surface-hover sm:w-auto ${entry.slug === slug ? `border-border bg-surface font-semibold ${careerPathTextStyles[entry.accent]}` : "border-transparent text-muted hover:text-foreground"}`}
                >
                  {entry.name}
                  {entry.slug === slug && <span className="text-xs font-normal text-foreground">(Current)</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="path-heading" className={`border-t-2 pt-8 sm:pt-10 ${careerPathStyles[path.accent]}`}>
          <p className="text-sm leading-6 text-muted">{profile.name} · {profile.role}</p>
          <h1 id="path-heading" className="mt-4 break-words text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{path.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{path.introduction}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/#projects" className="button button-primary">Projects on the homepage</a>
            <a href="/#contact" className="button">Contact</a>
          </div>
        </section>
        <section aria-labelledby="path-projects-heading" className="mt-16 border-t border-border py-12 sm:mt-20 sm:py-16">
          <h2 id="path-projects-heading" className="section-heading">Projects</h2>
          <ProjectList projects={getProjectsForPath(slug)} />
        </section>
        <section id="experiences" aria-labelledby="path-experiences-heading" className="border-t border-border py-12 sm:py-16">
          <h2 id="path-experiences-heading" className="section-heading">Experiences</h2>
          <ExperienceList experiences={getExperiencesForPath(slug)} />
        </section>
        <section id="skills" aria-labelledby="path-skills-heading" className="border-t border-border py-12 sm:py-16">
          <h2 id="path-skills-heading" className="section-heading">Skills</h2>
          <SkillList skills={getSkillsForPath(slug)} />
        </section>
      </div>
    </main>
  );
}

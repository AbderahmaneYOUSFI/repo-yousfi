import { Hero } from "@/components/hero";
import { CareerPathCards } from "@/components/career-path-cards";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <CareerPathCards />

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="border-t border-zinc-200 px-6 py-16 dark:border-zinc-800 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50"
          >
            Projects
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {profile.projectSummary}
          </p>
          <ProjectList projects={projects} />
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-zinc-200 px-6 py-16 dark:border-zinc-800 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
            Start a conversation
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50"
          >
            Contact
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {profile.contactSummary}
          </p>
        </div>
      </section>
    </main>
  );
}

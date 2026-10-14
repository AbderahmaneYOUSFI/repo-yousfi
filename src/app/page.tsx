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
        className="portfolio-section"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="section-heading mt-3"
          >
            Projects
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {profile.projectSummary}
          </p>
          <ProjectList projects={projects} />
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="portfolio-section"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">
            Start a conversation
          </p>
          <h2
            id="contact-heading"
            className="section-heading mt-3"
          >
            Contact
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {profile.contactSummary}
          </p>
        </div>
      </section>
    </main>
  );
}

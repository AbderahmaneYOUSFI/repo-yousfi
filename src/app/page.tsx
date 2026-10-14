import { Hero } from "@/components/hero";
import { CareerPathCards } from "@/components/career-path-cards";
import { ProjectList } from "@/components/project-list";
import { ExperienceList } from "@/components/experience-list";
import { SkillList } from "@/components/skill-list";
import { ContactSection } from "@/components/contact-section";
import { experiences } from "@/data/experiences";
import { skills } from "@/data/skills";
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

      <section id="experiences" aria-labelledby="experiences-heading" className="portfolio-section">
        <div className="mx-auto max-w-6xl">
          <h2 id="experiences-heading" className="section-heading">Experiences</h2>
          <ExperienceList experiences={experiences} />
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-heading" className="portfolio-section">
        <div className="mx-auto max-w-6xl">
          <h2 id="skills-heading" className="section-heading">Skills</h2>
          <SkillList skills={skills} />
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

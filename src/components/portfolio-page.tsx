import { careerPaths, careerPathHref, type CareerPathSlug } from "@/data/career-paths";
import { projects, getProjectsForPath } from "@/data/projects";
import { experiences, getExperiencesForPath } from "@/data/experiences";
import { skills, getSkillsForPath } from "@/data/skills";
import { SiteFrame } from "./site-frame";
import { Hero } from "./hero";
import { CareerPathCards } from "./career-path-cards";
import { ProjectList } from "./project-list";
import { ExperienceList } from "./experience-list";
import { EducationSection } from "./education-section";
import { SkillList } from "./skill-list";
import { ContactSection } from "./contact-section";
import { SectionHeading } from "./section-heading";
import { pathIdentity } from "./atlas-presentation";

export function PortfolioPage({ slug }: { slug?: CareerPathSlug }) {
  const selectedProjects = (slug ? getProjectsForPath(slug) : projects).filter(project => project.published);
  const selectedExperiences = slug ? getExperiencesForPath(slug) : experiences;
  const experienceSection = <section id="experiences" className="section experience-band" aria-labelledby="experience-heading"><div className="wrap">
      <SectionHeading id="experience-heading" title={selectedExperiences.length ? <>Professional<br />experience.</> : <>Experience,<br />in context.</>} note={selectedExperiences.length ? "Information systems, quality and production. Three internships, each with a different view of how organizations work." : "Professional experience is kept within its documented career perspective."} />
      <ExperienceList experiences={selectedExperiences} />
    </div></section>;
  return <SiteFrame identity={slug ? pathIdentity[slug] : "home"}>
    <Hero slug={slug} />
    {slug ? <nav className="path-nav wrap" aria-label="Career perspectives">{careerPaths.map(path => <a key={path.slug} href={careerPathHref(path.slug)} className={pathIdentity[path.slug]} aria-current={path.slug === slug ? "page" : undefined}>{path.name}{path.slug === slug ? " (Current)" : ""}</a>)}</nav> : <CareerPathCards />}
    {!slug ? experienceSection : null}
    <section id="projects" className="section work wrap" aria-labelledby="projects-heading">
      <SectionHeading id="projects-heading" title={<>Engineering,<br />made concrete.</>} note="Projects spanning useful software, intelligent systems and organizational processes." />
      <ProjectList projects={selectedProjects} />
    </section>
    {slug ? experienceSection : null}
    <EducationSection />
    <section id="skills" className="section skills-band" aria-labelledby="skills-heading"><div className="wrap">
      <SectionHeading id="skills-heading" title={<>Tools for<br />thoughtful work.</>} kicker="Skills & technologies" note="A selected index of languages, tools and methods. Names and contexts follow the existing portfolio; no proficiency scores are implied." />
      <SkillList skills={slug ? getSkillsForPath(slug) : skills} />
    </div></section>
    <ContactSection />
  </SiteFrame>;
}

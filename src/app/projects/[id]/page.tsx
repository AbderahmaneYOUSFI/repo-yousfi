/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the portfolio's native navigation and storage-independent appearance URLs. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getProjectDetail } from "@/data/project-details";
import { profile } from "@/data/profile";
import { SiteFrame } from "@/components/site-frame";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectRelationships, ProjectTechnologies, ProjectResources } from "@/components/project-list";
import { pathIdentity } from "@/components/atlas-presentation";
import { ContactSection } from "@/components/contact-section";

export function generateStaticParams() {
  return projects.filter(project => project.published).map(project => ({ id: project.id }));
}

function publicProject(id: string) {
  const project = projects.find(project => project.id === id && project.published);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const project = publicProject((await params).id);
  return { title: `${project.title} | ${profile.name}`, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const project = publicProject((await params).id);
  const detail = getProjectDetail(project.id);
  return <SiteFrame identity={pathIdentity[project.careerPaths[0]]}>
    <article className={`project-detail wrap ${pathIdentity[project.careerPaths[0]]}`}>
      <nav className="project-breadcrumb" aria-label="Breadcrumb"><a href="/">Global profile</a><span aria-hidden="true">/</span><a href="/#projects">All projects</a></nav>
      <header className="project-heading"><p className="section-kicker">Engineering project · Published</p><h1>{project.title}</h1><p className="project-overview">{project.description}</p><ProjectRelationships project={project} /></header>
      <div className="project-detail-grid">
        <figure className="study-figure"><div className="art" aria-hidden="true"><ProjectArtwork id={project.id} /></div><figcaption>Conceptual artwork from documented terms / not a verified architecture or product screenshot.</figcaption></figure>
        <section aria-labelledby="context-heading"><h2 id="context-heading">Context &amp; purpose.</h2><p>{detail.context}</p></section>
      </div>
      <div className="project-notes">
        <section aria-labelledby="scope-heading"><h2 id="scope-heading">Documented work.</h2>{detail.work.length ? <ul className="documented-work">{detail.work.map(item => <li key={item}>{item}</li>)}</ul> : <p>Further implementation details have not been supplied.</p>}</section>
        <section aria-labelledby="technology-heading"><h2 id="technology-heading">Technologies.</h2><ProjectTechnologies project={project} /></section>
        <section aria-labelledby="resources-heading"><h2 id="resources-heading">Resources.</h2><ProjectResources project={project} /></section>
        <section aria-labelledby="limits-heading"><h2 id="limits-heading">Results &amp; limitations.</h2><p>{detail.limits}</p></section>
      </div>
      <a href={`/#${project.id}`} className="text-link">Back to the project catalogue</a>
    </article>
    <ContactSection />
  </SiteFrame>;
}

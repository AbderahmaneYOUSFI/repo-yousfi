/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the portfolio's native navigation and storage-independent appearance URLs. */
import { getCareerPath, type CareerPathSlug } from "@/data/career-paths";
import { profile } from "@/data/profile";
import { SystemsAtlas } from "./systems-atlas";

const introductions: Record<CareerPathSlug, string> = {
  "ai-data": "Applied artificial intelligence and data: understanding problems, exploring information and considering how intelligent systems can support useful software.",
  software: "Building thoughtful digital products through clear architecture and considered technical decisions. How software is structured, how it serves people and how it can remain understandable as it evolves.",
  digital: "Connecting industrial engineering and information systems with business processes and technology. Understanding how people and organizations work, and where data and software can support meaningful digital change.",
};

export function Hero({ slug }: { slug?: CareerPathSlug }) {
  const path = slug ? getCareerPath(slug) : undefined;
  return <div className={`hero wrap${path ? " path-hero" : ""}`}>
    <div className="hero-copy">
      <p className="hero-meta">{path ? `${path.name} perspective` : "Nice, France / M2 MIAGE Applied AI"}</p>
      {path ? <><p className="personal-byline"><a href="/">{profile.name}</a></p><h1 className="entry-name">{path.name}.</h1></> :
        <h1 className="entry-name">Abderrahmane<span className="surname">Yousfi.</span></h1>}
      <div className="entry-support">
        {!path ? <p className="hero-statement">Applied AI. Software.<br />Information systems.</p> : null}
        <p className={`hero-intro${path ? " path-intro" : ""}`}>{slug ? introductions[slug] : "An Industrial Engineering graduate exploring how intelligent software connects technology, data and business."}</p>
        <div className="actions"><a className="button primary" href="#projects">{path ? "Explore relevant work" : "Explore my work"}</a>{path ? <a className="text-link" href="/">Global profile</a> : <a className="text-link" href="#contact">Get in touch</a>}</div>
        <p className="availability">{path ? "One profile. A focused perspective." : "Seeking an AI developer internship from January 2027."}</p>
      </div>
    </div>
    <SystemsAtlas slug={slug} />
  </div>;
}

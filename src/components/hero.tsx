/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the portfolio's native navigation and storage-independent appearance URLs. */
import { getCareerPath, type CareerPathSlug } from "@/data/career-paths";
import { profile } from "@/data/profile";
import { SystemsAtlas } from "./systems-atlas";
import { AtlasGlobalProfile, AtlasSelectionProvider, HomeAtlasPresentation } from "./atlas-interaction";
import styles from "./hero.module.css";

const introductions: Record<CareerPathSlug, string> = {
  "ai-data": "Applied artificial intelligence and data: understanding problems, exploring information and considering how intelligent systems can support useful software.",
  software: "Building thoughtful digital products through clear architecture and considered technical decisions. How software is structured, how it serves people and how it can remain understandable as it evolves.",
  digital: "Connecting industrial engineering and information systems with business processes and technology. Understanding how people and organizations work, and where data and software can support meaningful digital change.",
};

function PersonalHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`${styles.hero} px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36`}
    >
      <div className={styles.artwork} aria-hidden="true">
        <svg viewBox="0 0 520 680" fill="none" focusable="false">
          <path
            className={styles.silhouette}
            d="M302 45C426 23 490 128 474 247C461 345 384 369 395 472C407 580 321 654 219 625C115 596 82 507 111 411C139 319 64 275 95 174C121 91 222 60 302 45Z"
          />
          <g className={styles.contour}>
            <path d="M365 87C242 54 161 166 192 274C220 374 341 388 319 497C308 551 270 590 217 610" />
            <path d="M387 103C264 70 183 182 214 290C242 390 363 404 341 513C330 567 292 606 239 626" />
          </g>
          <path
            className={styles.stem}
            d="M109 578C164 479 145 362 104 311C84 372 92 423 140 449"
          />
        </svg>
      </div>
      <div className={`${styles.content} mx-auto w-full max-w-6xl`}>
        <p className={styles.role}>{profile.role}</p>
        <h1
          id="hero-heading"
          className={`${styles.heading} max-w-4xl break-words text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl`}
        >
          {profile.name}
        </h1>
        <p className={styles.intro}>
          {profile.intro}
        </p>
        <div className={styles.actions}>
          <a href={profile.ctas.projects.href} className="button button-primary">
            {profile.ctas.projects.label}
          </a>
          <a href={profile.ctas.contact.href} className="button">
            {profile.ctas.contact.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function CareerHero({ slug }: { slug: CareerPathSlug }) {
  const path = getCareerPath(slug)!;
  return <div className="hero-copy">
    <p className="hero-meta">{path.name} perspective</p>
    <p className="personal-byline"><a href="/">{profile.name}</a></p>
    <h1 className="entry-name">{path.name}.</h1>
    <div className="entry-support">
      <p className="hero-intro path-intro">{introductions[slug]}</p>
      <div className="actions"><a className="button primary" href="#projects">Explore relevant work</a><AtlasGlobalProfile /></div>
      <p className="availability">One profile. A focused perspective.</p>
    </div>
  </div>;
}

export function Hero({ slug }: { slug?: CareerPathSlug }) {
  if (slug) return <div className="hero wrap path-hero">
    <CareerHero slug={slug} />
    <SystemsAtlas slug={slug} />
  </div>;

  return <AtlasSelectionProvider selected={null}>
    <HomeAtlasPresentation personal={<PersonalHero />} perspectives={{
      "ai-data": <CareerHero slug="ai-data" />,
      software: <CareerHero slug="software" />,
      digital: <CareerHero slug="digital" />,
    }} atlasClassName={`wrap ${styles.atlas}`} globalClassName={styles.globalLayout}>
      <SystemsAtlas />
    </HomeAtlasPresentation>
  </AtlasSelectionProvider>;
}

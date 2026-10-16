import { profile } from "@/data/profile";
import styles from "./hero.module.css";

export function Hero() {
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
        <p className="eyebrow mb-6">{profile.role}</p>
        <h1
          id="hero-heading"
          className={`${styles.heading} max-w-4xl break-words text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl`}
        >
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          {profile.intro}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

import { profile } from "@/data/profile";

export function ContactSection() {
  const { email, github, linkedin, cv } = profile.contact;
  const hasContactLinks = Boolean(email || github || linkedin);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="portfolio-section"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Start a conversation</p>
        <h2 id="contact-heading" className="section-heading mt-3">
          Contact &amp; CV
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          {profile.contactSummary}
        </p>
        {(hasContactLinks || cv) && (
          <ul aria-label="Contact and CV links" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {email && (
              <li><a href={`mailto:${email}`} className="button w-full">Email</a></li>
            )}
            {github && (
              <li><a href={github} className="button w-full">GitHub</a></li>
            )}
            {linkedin && (
              <li><a href={linkedin} className="button w-full">LinkedIn</a></li>
            )}
            {cv && (
              <li><a href={cv} download className="button w-full">Download CV (PDF)</a></li>
            )}
          </ul>
        )}
        {!hasContactLinks && (
          <p className="mt-6 leading-7 text-muted">
            Professional contact details have not been confirmed yet.
          </p>
        )}
        {!cv && (
          <p className="mt-4 leading-7 text-muted">CV download is not available yet.</p>
        )}
      </div>
    </section>
  );
}

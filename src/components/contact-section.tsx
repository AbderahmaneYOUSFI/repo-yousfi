import { profile } from "@/data/profile";

export function ContactSection() {
  const { email, github, linkedin, cv } = profile.contact;
  return <section id="contact" className="contact wrap" aria-labelledby="contact-heading"><div className="contact-layout">
    <div><p className="section-kicker">Contact &amp; CV</p><h2 id="contact-heading">Let’s talk<br />engineering.</h2></div>
    <div className="contact-copy"><p>{profile.contactSummary}</p>
      {email ? <a className="email" href={`mailto:${email}`}>{email}</a> : null}
      {github || linkedin ? <ul className="contact-links" aria-label="Professional profiles">{github ? <li><a href={github}>GitHub</a></li> : null}{linkedin ? <li><a href={linkedin}>LinkedIn</a></li> : null}</ul> : null}
      {cv ? <a href={cv} download={cv.startsWith("/") || undefined} className="text-link">{cv.startsWith("/") ? "Download CV (PDF)" : "View CV"}</a> : <p className="cv-note">CV download is not available yet.</p>}
      {!email && !github && !linkedin ? <p>Professional contact details have not been confirmed yet.</p> : null}
    </div>
  </div></section>;
}

import { SectionHeading } from "./section-heading";

// Confirmed in docs/content/cv-source.tex and the approved V2 prototype.
export function EducationSection() {
  return <section id="education" className="section wrap" aria-labelledby="education-heading">
    <SectionHeading id="education-heading" title={<>A foundation<br />across disciplines.</>} kicker="Education" note="Applied AI and Industrial Engineering connect software questions with a wider systems perspective." />
    <div className="education-grid">
      <article className="education-item"><p className="degree-display">MIAGE<br />Applied AI.</p><div className="education-detail"><span className="logo-placeholder" aria-label="Institution logo placeholder">Logo<br />placeholder</span><div><h3>Université Côte d’Azur</h3><p>Master 2 MIAGE / Applied Artificial Intelligence (IA2)</p><p>2025–present / Sophia Antipolis</p></div></div></article>
      <article className="education-item"><p className="degree-display">Industrial<br />Engineering.</p><div className="education-detail"><span className="logo-placeholder" aria-label="Institution logo placeholder">Logo<br />placeholder</span><div><h3>ENSTA Alger</h3><p>State Engineer degree / Industrial Engineering</p><p>Graduated 2025 / Algiers</p></div></div></article>
    </div>
  </section>;
}

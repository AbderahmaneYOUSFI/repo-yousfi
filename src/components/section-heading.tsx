import type { ReactNode } from "react";

export function SectionHeading({ id, title, kicker, note }: {
  id: string; title: ReactNode; kicker?: string; note?: string;
}) {
  return <div className="section-heading">
    <div>{kicker ? <p className="section-kicker">{kicker}</p> : null}<h2 id={id}>{title}</h2></div>
    {note ? <p className="section-note">{note}</p> : null}
  </div>;
}

"use client";

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";
import type { CareerPathSlug } from "@/data/career-paths";
import { pathIdentity } from "./atlas-presentation";
import { readPreference } from "./appearance";

type AtlasSelection = CareerPathSlug | null;
type SelectionContext = {
  selected: AtlasSelection;
  select: (path: AtlasSelection) => void;
};

const AtlasContext = createContext<SelectionContext | null>(null);

function useAtlas() {
  const context = useContext(AtlasContext);
  if (!context) throw new Error("Atlas controls must be inside AtlasInteraction.");
  return context;
}

export function AtlasInteraction({ selected: initialSelection, caption, descriptions, children }: {
  selected: AtlasSelection;
  caption: string;
  descriptions: Record<CareerPathSlug, string>;
  children: ReactNode;
}) {
  const [selected, select] = useState(initialSelection);
  return <AtlasContext value={{ selected, select }}>
    <figure className="atlas" aria-label="Systems Atlas project network"
      data-active={selected ? pathIdentity[selected] : ""} data-selection={selected ?? "all"}>
      {children}
      <figcaption className="atlas-caption" aria-live="polite" aria-atomic="true">
        {selected ? descriptions[selected] : caption}
      </figcaption>
    </figure>
  </AtlasContext>;
}

export function AtlasPathControl({ path, className, style, children }: {
  path: AtlasSelection;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { selected, select } = useAtlas();
  return <button type="button" className={className} style={style}
    aria-pressed={selected === path} data-filter={path ?? "all"}
    onClick={() => select(path)}>
    {children}
    <span className="atlas-selection-mark" aria-hidden="true">
      {selected === path ? "Selected" : "Select"}
    </span>
  </button>;
}

export function AtlasProjectLink({ memberships, href, label, className, style, projectId, children }: {
  memberships: readonly CareerPathSlug[];
  href: string;
  label: string;
  className: string;
  style?: CSSProperties;
  projectId: string;
  children: ReactNode;
}) {
  const { selected } = useAtlas();
  const active = selected === null || memberships.includes(selected);
  const content = <>{children}{active ? <svg className="atlas-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg> : null}</>;
  const props = {
    className,
    style,
    "data-project-id": projectId,
    "data-project-active": active,
    "aria-label": active ? label : `${label} · Outside selected perspective`,
  };

  if (!active) return <span {...props} role="link" aria-disabled="true">{content}</span>;

  return <a {...props} href={href} onClick={event => {
    // Carry the appearance choice when selection creates a new active anchor.
    const target = new URL(href, location.href);
    target.searchParams.set("appearance", readPreference());
    event.currentTarget.href = `${target.pathname}${target.search}${target.hash}`;
  }}>{content}</a>;
}

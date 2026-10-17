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

export function AtlasSelectionProvider({ selected: initialSelection, children }: {
  selected: AtlasSelection;
  children: ReactNode;
}) {
  const [selected, select] = useState(initialSelection);
  return <AtlasContext value={{ selected, select }}>{children}</AtlasContext>;
}

export function HomeAtlasPresentation({ personal, perspectives, atlasClassName, children }: {
  personal: ReactNode;
  perspectives: Record<CareerPathSlug, ReactNode>;
  atlasClassName: string;
  children: ReactNode;
}) {
  const { selected } = useAtlas();
  return <div className={selected ? "hero wrap path-hero" : undefined}
    data-identity={selected ? pathIdentity[selected] : "home"}>
    {selected ? perspectives[selected] : personal}
    <div className={selected ? undefined : atlasClassName} style={{ minWidth: 0 }}>{children}</div>
  </div>;
}

export function AtlasGlobalProfile() {
  const context = useContext(AtlasContext);
  // eslint-disable-next-line @next/next/no-html-link-for-pages -- Preserve the existing native path-page link and appearance propagation; Home resets selection locally.
  return <a className="text-link" href="/" onClick={context ? event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    context.select(null);
  } : undefined}>Global profile</a>;
}

export function AtlasProjectCount({ total, counts }: {
  total: number;
  counts: Record<CareerPathSlug, number>;
}) {
  const { selected } = useAtlas();
  return <span>{selected ? `${counts[selected]} active / ${total} projects` : `${total} projects · ${total} published`}</span>;
}

export function AtlasInteraction({ selected: initialSelection, ...props }: {
  selected: AtlasSelection;
  caption: string;
  descriptions: Record<CareerPathSlug, string>;
  children: ReactNode;
}) {
  const context = useContext(AtlasContext);
  // Standalone path pages own their state; Home supplies one state for hero and atlas.
  if (!context) return <AtlasSelectionProvider selected={initialSelection}><AtlasFigure {...props} /></AtlasSelectionProvider>;
  return <AtlasFigure {...props} />;
}

function AtlasFigure({ caption, descriptions, children }: {
  caption: string;
  descriptions: Record<CareerPathSlug, string>;
  children: ReactNode;
}) {
  const { selected } = useAtlas();
  return <figure className="atlas" aria-label="Systems Atlas project network"
      data-active={selected ? pathIdentity[selected] : ""} data-selection={selected ?? "all"}>
      {children}
      <figcaption className="atlas-caption" aria-live="polite" aria-atomic="true">
        {selected ? descriptions[selected] : caption}
      </figcaption>
    </figure>;
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
  const props = {
    className,
    style,
    "data-project-id": projectId,
    "data-project-active": active,
    "aria-label": active ? label : `${label} · Outside selected perspective`,
  };

  if (!active) return <span {...props} role="link" aria-disabled="true">{children}</span>;

  return <a {...props} href={href} onClick={event => {
    if (href.startsWith("#")) return;
    // Carry the appearance choice when selection creates a new active anchor.
    const target = new URL(href, location.href);
    target.searchParams.set("appearance", readPreference());
    event.currentTarget.href = `${target.pathname}${target.search}${target.hash}`;
  }}>{children}</a>;
}

/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the portfolio's native navigation and storage-independent appearance URLs. */
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { careerPaths, careerPathHref } from "@/data/career-paths";
import { AppearanceControl } from "./appearance-control";
import { MobileMenu } from "./mobile-menu";
import { SectionMotion } from "./section-motion";
import { pathIdentity, type Identity } from "./atlas-presentation";

function NavigationLinks() {
  return <>{[["Work", "projects"], ["Experience", "experiences"], ["Education", "education"], ["Contact", "contact"]].map(([label, anchor]) =>
    <a key={anchor} href={`/#${anchor}`}>{label}</a>)}</>;
}

export function SiteFrame({ identity = "home", children }: { identity?: Identity; children: ReactNode }) {
  return <div data-identity={identity} id="top" className="site-frame">
    <a className="skip" href="#main">Skip to content</a>
    <header className="header wrap">
      <a href="/" className="brand"><svg className="mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 20 7 8m13 12L34 12M20 20l3 15" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="20" cy="20" r="4" fill="currentColor" /><circle cx="7" cy="8" r="3" fill="none" stroke="currentColor" /><circle cx="34" cy="12" r="3" fill="none" stroke="currentColor" /><circle cx="23" cy="35" r="3" fill="none" stroke="currentColor" /></svg>
        <span>{profile.name}<small>Engineering portfolio</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><NavigationLinks /></nav>
      <MobileMenu><NavigationLinks /></MobileMenu>
      <AppearanceControl />
    </header>
    <div className="identity-track" aria-hidden="true"><span /></div>
    <main id="main" tabIndex={-1}>{children}</main>
    <SectionMotion />
    <footer className="footer wrap">
      <div className="footer-top"><p>Nice, France / Engineering portfolio</p><div><a href="/">Global profile</a> &nbsp; / &nbsp; <a href="#top">Back to top</a></div></div>
      <p className="footer-signature">{profile.name}.</p>
      <nav className="footer-identities" aria-label="Career perspectives">{careerPaths.map(path => <a key={path.slug} href={careerPathHref(path.slug)} className={pathIdentity[path.slug]}><i aria-hidden="true" />{path.name}</a>)}</nav>
    </footer>
  </div>;
}

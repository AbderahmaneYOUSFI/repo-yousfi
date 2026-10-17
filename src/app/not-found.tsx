/* eslint-disable @next/next/no-html-link-for-pages -- Preserve the portfolio's native navigation and storage-independent appearance URLs. */
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return <SiteFrame><section className="section wrap not-found" aria-labelledby="not-found-heading">
    <p className="section-kicker">404</p><h1 id="not-found-heading">Page not found.</h1>
    <p>This page is unavailable. Explore the project catalogue or return to the global profile.</p>
    <div className="actions"><a className="button primary" href="/#projects">Explore projects</a><a className="text-link" href="/">Global profile</a></div>
  </section></SiteFrame>;
}

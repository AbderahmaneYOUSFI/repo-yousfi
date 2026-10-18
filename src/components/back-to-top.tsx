"use client";

import { useSyncExternalStore } from "react";
import styles from "./back-to-top.module.css";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isPastThreshold() {
  return window.scrollY > 400;
}

function initiallyHidden() {
  return false;
}

export function BackToTop() {
  const visible = useSyncExternalStore(subscribe, isPastThreshold, initiallyHidden);
  if (!visible) return null;

  return <button type="button" className={styles.control} aria-label="Back to top" onClick={() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Keep keyboard focus on Home when the button disappears near the top.
    document.getElementById("main")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </svg>
  </button>;
}

"use client";

import { useEffect } from "react";

export function SectionMotion() {
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("entered");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll(".section-heading").forEach(element => observer.observe(element));
    const stop = () => { if (motion.matches) observer.disconnect(); };
    motion.addEventListener("change", stop);
    return () => { observer.disconnect(); motion.removeEventListener("change", stop); };
  }, []);
  return null;
}

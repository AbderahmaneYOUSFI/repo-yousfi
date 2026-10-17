"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MobileMenu({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && menu.current && !menu.current.contains(event.target)) menu.current.open = false;
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return <details className="mobile-nav" ref={menu} onBlur={event => {
    if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
  }}>
    <summary ref={trigger}>Menu</summary>
    <nav className="nav-content" aria-label="Mobile navigation" onClick={event => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor || !menu.current) return;
      menu.current.open = false;
      const url = new URL(anchor.href);
      if (url.pathname === location.pathname && url.hash) {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
      }
    }}>{children}<p>One profile. Three perspectives.</p></nav>
  </details>;
}

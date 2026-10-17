"use client";

import { useEffect, useRef } from "react";

import { storageKey, valid, readPreference, apply } from "./appearance";

export function AppearanceControl() {
  const select = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const sync = () => {
      const preference = readPreference();
      if (select.current) select.current.value = preference;
      apply(preference);
    };
    const media = matchMedia("(prefers-color-scheme: dark)");
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return <div className="appearance">
    <label htmlFor="appearance">Appearance</label>
    <select ref={select} id="appearance" name="appearance" defaultValue="system" onChange={event => {
      const preference = event.currentTarget.value;
      if (!valid(preference)) return;
      try { localStorage.setItem(storageKey, preference); } catch { /* URL fallback. */ }
      const current = new URL(location.href);
      current.searchParams.set("appearance", preference);
      history.replaceState(history.state, "", current);
      apply(preference);
    }}>
      <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
    </select>
  </div>;
}

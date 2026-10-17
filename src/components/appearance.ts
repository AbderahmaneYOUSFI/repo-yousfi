export type Appearance = "system" | "light" | "dark";
export const storageKey = "systems-atlas-appearance";
export function valid(value: string | null): value is Appearance {
  return value === "system" || value === "light" || value === "dark";
}

export function readPreference(): Appearance {
  const query = new URLSearchParams(location.search).get("appearance");
  if (valid(query)) return query;
  try {
    const stored = localStorage.getItem(storageKey);
    if (valid(stored)) return stored;
  } catch { /* Private browsing: the URL still preserves the selection. */ }
  return "system";
}

export function apply(preference: Appearance) {
  const dark = preference === "dark" || (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#141519" : "#F6F6F5");
  // Native links carry the explicit preference even if localStorage is blocked.
  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    const target = new URL(href, location.href);
    if (target.origin !== location.origin) return;
    target.searchParams.set("appearance", preference);
    anchor.href = `${target.pathname}${target.search}${target.hash}`;
  });
}

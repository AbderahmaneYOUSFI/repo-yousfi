import type { Identity } from "./atlas-presentation";

export function PathSymbol({ identity }: { identity: Identity }) {
  return <svg className="path-symbol" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {identity === "ai" ? <><path d="M4 20h32M20 4v32" /><circle cx="20" cy="20" r="11" /><path d="m8 8 24 24" /></> :
      identity === "software" ? <path d="m13 8-9 12 9 12m14-24 9 12-9 12M23 4l-6 32" /> :
        <path d="M5 5h11v11H5zm19 19h11v11H24zM16 10h14v14M10 16v14h14" />}
  </svg>;
}

import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background px-6 py-24 text-foreground sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
            {profile.role}
          </p>
          <h1
            id="hero-heading"
            className="text-5xl font-semibold leading-tight text-zinc-950 sm:text-6xl lg:text-7xl dark:text-zinc-50"
          >
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl sm:leading-9 dark:text-zinc-300">
            {profile.intro}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={profile.ctas.projects.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-base font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-50"
            >
              {profile.ctas.projects.label}
            </a>
            <a
              href={profile.ctas.contact.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-zinc-300 px-6 text-base font-semibold text-zinc-950 transition-colors hover:border-zinc-950 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-zinc-50 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-50"
            >
              {profile.ctas.contact.label}
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="space-y-5">
            <div className="h-2 w-20 rounded-full bg-zinc-950 dark:bg-zinc-50" />
            <div className="space-y-3">
              <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="min-h-24 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900" />
              <div className="min-h-24 rounded-2xl bg-zinc-900 p-4 shadow-sm dark:bg-zinc-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

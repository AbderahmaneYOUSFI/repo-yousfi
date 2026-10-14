import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-6">{profile.role}</p>
        <h1
          id="hero-heading"
          className="max-w-4xl break-words text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          {profile.intro}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={profile.ctas.projects.href} className="button button-primary">
            {profile.ctas.projects.label}
          </a>
          <a href={profile.ctas.contact.href} className="button">
            {profile.ctas.contact.label}
          </a>
        </div>
      </div>
    </section>
  );
}

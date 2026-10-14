# Architecture

This document describes the current implementation for future coding agents.

## Stack and runtime

- Next.js App Router in `src/app`, React 19, strict TypeScript and Tailwind CSS 4.
- pnpm is the package manager; `package.json` defines lint, build and development scripts.
- `next.config.ts` configures component caching, partial prefetching and Tailwind's Turbopack integration.
- `src/app/layout.tsx` loads Geist and Geist Mono through `next/font/google`, imports global CSS and derives root metadata from `profile`.
- All current pages and components are Server Components. Static markup and native links require no client state, effects or event handlers.
- No backend, database, CMS, authentication, analytics or automated test framework is configured.

## Routes and composition

- `/`: `src/app/page.tsx` composes `Hero`, `CareerPathCards`, the shared `ProjectList` in `#projects`, `ExperienceList` in `#experiences`, `SkillList` in `#skills`, and the `#contact` section.
- `/paths/ai-data`, `/paths/software`, `/paths/digital`: each static route delegates rendering to `CareerPathPage` with its typed slug and exports path-specific metadata through `careerPathMetadata`.
- `CareerPathPage` renders shared path navigation, an introduction, homepage project/contact actions and projects, experiences and skills filtered for that path.
- Navigation uses native anchors for full-document navigation. The active path has `aria-current="page"`, a visible `(Current)` label, heavier text and a surface/border treatment in addition to its accent.
- Hero actions target the existing homepage anchors. No project detail routes or fabricated external destinations are present.

## Content and data flow

`src/data/profile.ts` exports readonly identity, role, introduction, metadata, CTA targets and section copy. The root layout, Hero, homepage and career path page consume it. Identity and contact content still contain placeholders.

Feature 006 adds `profile.contact`, typed by the readonly `ProfileContact` model: optional email address, HTTPS GitHub/LinkedIn URLs and a root-relative local CV PDF URL. Populate only confirmed personal destinations and an existing PDF in `public/`; URL types alone do not verify ownership or file existence. Contact data currently starts empty because no verified destinations or CV asset are present.

`ContactSection` is a Server Component on the homepage at the preserved `#contact` anchor. It uses native `mailto:` and HTTPS profile anchors and a local CV link with `download`, rendering only populated fields. Missing professional contact details and an unavailable CV have plain availability messages, without fake actions or an empty list. Actions stack on small screens and wrap on larger screens using existing button/focus styles. Hero CTAs and the shared career-path `/#contact` action are preserved.

`src/data/career-paths.ts` defines the typed `CareerPathSlug`, `CareerPathAccent` and readonly `CareerPath` model. The shared `careerPaths` array owns each path's name, description, introduction, accent and metadata description. `careerPathHref` builds route URLs; `getCareerPath` resolves a slug and throws if its definition is missing.

`src/data/projects.ts` defines readonly `Project` and `ProjectLink` models. Each project has an ID, title, description, technologies, career path memberships and links. Link URLs are typed as HTTP or HTTPS. The homepage renders all projects in data order; `getProjectsForPath` filters by membership without changing that order or duplicating facts. Projects can appear in multiple paths.

Project topics are recorded, but details, technologies and links await confirmation; path assignments are provisional editorial choices. `ProjectList` renders semantic list items and articles, technology metadata and available link actions. Empty technologies and links have plain confirmation messages, without fake badges, disabled buttons or invented URLs. An empty filtered list has an explicit message. Action/status footers sit at the bottom of cards within each grid row.

`src/data/experiences.ts` defines readonly `Experience` records with an ID, organization, optional role/period/summary and career-path memberships. `src/data/skills.ts` defines readonly `Skill` records with an ID, name, optional evidence/context and memberships; there are no proficiency ratings. `getExperiencesForPath` and `getSkillsForPath` filter by membership, preserving source order and shared facts. Empty memberships allow homepage-only records until relevance is confirmed.

`ExperienceList` and `SkillList` are shared Server Components. They omit unknown optional fields and show clearly labelled editorial confirmation messages for empty selections. Both datasets currently start empty: repository material does not establish professional experience or a personal skill inventory. ICOSNET is only a project topic, Schneider Electric has no source entry, and academic positioning or repository dependencies must not be converted into skill claims. Add only confirmed facts; do not infer chronology, employment relationships or proficiency.

All content is static and bundled with the app. There is no runtime fetch or persistence layer. Preserve the shared models and verified facts when refining presentation.

## Design conventions (Feature 004)

The current presentation is consistently dark, independent of the operating system theme: quiet charcoal surfaces, off-white text, generous spacing and restrained path accents.

- `src/app/globals.css` defines semantic CSS variables for background, surface, hover surface, border, foreground, muted text and focus. `@theme inline` exposes them as Tailwind color utilities; `color-scheme: dark` aligns browser-rendered controls.
- The body uses the loaded Geist Sans variable. Geist Mono is reserved for technology labels, rather than paragraphs or headings.
- Small shared CSS component classes (`portfolio-section`, `eyebrow`, `section-heading`, `button`, `button-primary`) keep section spacing, typography and CTA treatments consistent. Other styling stays in Tailwind utilities.
- Content containers use `max-w-6xl`; prose uses narrower widths and generous line height. Headings use tight tracking. Mobile layouts stack actions and navigation, with project grids expanding at medium/large widths and path cards at large widths.
- `career-path-styles.ts` maps the typed accents to subtle cyan, indigo and teal top borders and readable accent text. Color supplements named paths and the explicit current-page indicator.
- The Hero is text and actions only; its former decorative skeleton panel has been removed.
- Cards use restrained borders and rounded corners. Project titles and summaries take precedence over subdued technology metadata and link status.

## Accessibility and interaction

- Use semantic landmarks, heading hierarchy and sections labelled with `aria-labelledby`.
- Global `:focus-visible` supplies a consistent two-pixel outline with a four-pixel offset. Do not remove it without an equally visible replacement.
- Buttons and path navigation have at least 48px height; project links have at least 44px height and horizontal padding. Path card links use their entire card as the target.
- Hover feedback uses subtle color changes, without movement or decorative animation.
- A global reduced-motion media query disables transitions and animations and keeps scrolling instant when requested.
- In-page destinations have scroll margin. Long headings and card content wrap; grid items allow shrinking.
- Project links include the project title in their accessible names. Missing-data messages remain readable text, not interactive controls.

## Development and verification

Follow `AGENTS.md`: inspect relevant files, state assumptions, propose a plan before non-trivial changes, keep changes scoped and avoid new dependencies without approval. Prefer Server Components; add `use client` only when actual browser-side React behavior is required.

Feature specs live in `docs/specs/`, the product brief in `docs/product/portfolio-brief.md`, and review records in `docs/agent-evals/`. Keep architecture documentation aligned with the current implementation.

Run from the repository root in Windows PowerShell:

```powershell
pnpm.cmd lint
pnpm.cmd exec tsc --noEmit
pnpm.cmd build
```

Do not claim a gate passed unless executed. No automated test framework is currently configured. Browser review should cover all four routes, narrow and wide viewports, keyboard focus/navigation, active path indicators, text zoom, contrast and reduced-motion preferences.

## Remaining limitations

- Identity, biography and contact details need verification before public release.
- Project details, technologies, evidence links and path assignments need confirmation.
- Experience organizations, roles, periods, responsibilities/results, skill evidence and their career-path memberships need confirmation before populating the new datasets.
- No project detail pages or CV assets are present; contact/CV actions are supported but await verified destinations and a real PDF.
- Bilingual content, advanced visual effects and interactive architecture diagrams remain deferred.
- Starter SVG assets in `public/` are unused; `README.md` still contains starter documentation.

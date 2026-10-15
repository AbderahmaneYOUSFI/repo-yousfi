# Architecture

Current implementation overview; see [document authority](../README.md#documentation) for the roles of requirements and factual references.

## Runtime and routes

Next.js App Router, React, strict TypeScript and Tailwind CSS power the portfolio. All current pages and shared components are Server Components. Content is bundled from `src/data/`; there is no runtime fetching or persistence layer.

| Route | Composition |
| --- | --- |
| `/` | Hero, career-path cards, published projects (`#projects`), experiences (`#experiences`), skills (`#skills`), Contact & CV (`#contact`). |
| `/paths/ai-data` | AI & Data perspective. |
| `/paths/software` | Software Engineering perspective. |
| `/paths/digital` | Digital Transformation perspective. |

The three static path pages delegate to `CareerPathPage` and `careerPathMetadata`. They share navigation, an introduction, homepage project/contact links and filtered project, experience and skill lists. Native anchors provide navigation; the active path uses `aria-current="page"` and a visible `(Current)` label. There are no project detail or About routes.

`src/app/layout.tsx` sets English as the document language, loads Geist Sans and Mono with `next/font/google`, imports global CSS and derives root metadata from the shared profile.

## Shared data and rendering

| Source in `src/data/` | Model and consumers |
| --- | --- |
| `profile.ts` | Shared identity, introduction, metadata, section copy and Hero CTA targets. Readonly `ProfileContact` fields are optional: email address, HTTPS GitHub/LinkedIn URLs and a root-relative PDF URL. |
| `career-paths.ts` | Readonly `CareerPath` records with typed slugs and accents, descriptions, introductions and metadata. `careerPathHref` builds URLs; `getCareerPath` resolves definitions. |
| `projects.ts` | Readonly `Project` records: stable ID, typed `published` boolean, title, description, technologies, memberships and `ProjectLink` records with HTTP(S) URLs. |
| `experiences.ts` | Readonly `Experience` records: ID, organization, optional role/period/summary and memberships. |
| `skills.ts` | Readonly `Skill` records: ID, name, optional context and memberships; no technical proficiency ratings. |

Home passes complete datasets to the shared list renderers in source order. The `getProjectsForPath`, `getExperiencesForPath` and `getSkillsForPath` selectors filter by membership while preserving that order and shared facts. The shared `ProjectList` renderer excludes unpublished records from all public project lists, including Home and career-path selections. Reactis and Quiz Game remain unpublished in `src/data/projects.ts` for future completion. Empty memberships mean homepage-only content when otherwise eligible for publication.

Shared `ProjectList`, `ExperienceList` and `SkillList` components render semantic lists and omit absent optional details. Projects without technologies or links show confirmation text. Empty project and skill selections show plain messages; empty experience selections point visitors to the homepage and Digital Transformation perspective.

The current data contains eight projects, three internships and populated skill groups. Identity and email/GitHub/LinkedIn fields use CV-supplied content. Reactis and Quiz Game retain limited legacy descriptions and no path memberships; all project links remain empty. Project identity and membership questions are tracked in [content review](content/content-review.md).

`ContactSection` renders only populated channels as native anchors, constructing `mailto:` for email and using `download` for a local CV. No PDF exists in `public/`, so the CV action is absent and an availability message is shown. URL types constrain shape, not ownership or file existence.

## Design conventions

- `src/app/globals.css` defines the fixed dark palette through semantic CSS variables and Tailwind theme tokens. The site does not switch to a light theme with OS preferences.
- Geist Sans is the body font; Geist Mono is used for technology labels. Shared `portfolio-section`, `eyebrow`, `section-heading` and button classes cover repeated treatments; other styling uses Tailwind utilities.
- Containers use `max-w-6xl` with narrower prose. Layouts stack on small screens and expand into responsive grids. Cards use restrained borders, rounded corners and wrapping content; project action/status footers align at the bottom within each row.
- `career-path-styles.ts` maps AI & Data to cyan, Software Engineering to indigo and Digital Transformation to teal. Text labels and the current-page indicator supplement color.
- Sections use labelled headings; global `:focus-visible` provides an outline. Buttons/path navigation have 48px minimum height and project links 44px. Hover feedback changes colors; reduced-motion preferences disable transitions and animations.

## Boundaries

No Client Components, backend, database, CMS, authentication or analytics are configured. Contact forms, interactive filters, bilingual content, advanced effects and interactive diagrams are outside the current implementation. Personal claims rely on the owner's self-reported [CV source](content/cv-source.tex); unresolved editorial decisions remain in content review. Development and verification instructions live in [AGENTS.md](../AGENTS.md).

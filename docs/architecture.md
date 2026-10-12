# Architecture

This document describes the current implementation only. It is intended for future coding agents working in this repository.

## Relevant Existing Files

- `AGENTS.md` - agent workflow, coding standards, and verification expectations.
- `package.json` - scripts and dependency versions.
- `pnpm-lock.yaml`, `pnpm-workspace.yaml` - pnpm lockfile and workspace/build policy.
- `tsconfig.json` - strict TypeScript and Next.js compiler configuration.
- `next.config.ts` - Next.js configuration, including component caching, partial prefetching, and Tailwind CSS Turbopack handling.
- `eslint.config.mjs` - Next.js core-web-vitals and TypeScript ESLint configuration.
- `src/app/layout.tsx` - root layout, metadata, font setup, and global CSS import.
- `src/app/page.tsx` - homepage composition.
- `src/app/globals.css` - Tailwind import, theme tokens, color-scheme variables, and global body styles.
- `src/app/favicon.ico` - app favicon.
- `src/components/hero.tsx` - portfolio hero component.
- `src/data/profile.ts` - centralized placeholder portfolio content.
- `docs/specs/001-hero.md` - Feature 001 hero specification.
- `docs/agent-evals/001-hero-review.md` - Feature 001 review and acceptance record.
- `docs/architecture.md` - this file.

## Tech Stack and Runtime Model

- Next.js App Router using `src/app`.
- React 19 with TypeScript.
- Tailwind CSS 4 via `@import "tailwindcss"` in `src/app/globals.css`.
- pnpm 12.11.2 as the configured package manager.
- ESLint 9 with `eslint-config-next` core web vitals and TypeScript presets.
- Next.js font optimization with `Geist` and `Geist_Mono` from `next/font/google`.
- No backend API, database, authentication, CMS, or test framework exists in the current implementation.

The app currently renders a single homepage. `src/app/layout.tsx`, `src/app/page.tsx`, and `src/components/hero.tsx` do not use `"use client"`, React state, effects, browser-only APIs, or event handlers, so they are Server Components under the App Router default.

## Directory Structure and Responsibilities

- `src/app/` contains App Router entry points and global styles.
  - `layout.tsx` defines the HTML shell, font CSS variables, metadata, and body wrapper.
  - `page.tsx` composes the homepage with `Hero`, `#projects`, and `#contact` sections.
  - `globals.css` defines Tailwind setup and global color/font tokens.
- `src/components/` contains reusable UI components. Currently it only contains `Hero`.
- `src/data/` contains static application data. Currently `profile.ts` exports all visible portfolio copy and CTA targets.
- `docs/specs/` contains feature specifications.
- `docs/agent-evals/` contains independent agent review and acceptance records.
- `public/` contains default static SVG assets from the starter project; they are not referenced by the current app code.

## Server vs Client Component Policy

- Prefer Server Components by default, matching `AGENTS.md`.
- Add `"use client"` only for components that require client-side React behavior such as state, effects, event handlers, browser APIs, or interactive libraries.
- Keep data reads from `src/data/profile.ts` in Server Components when possible.
- Do not introduce client components for static layout, links, metadata, or presentational markup.

## Data Flow

`src/data/profile.ts` exports a readonly `profile` object with placeholder identity, role, intro copy, metadata description, CTA labels/hrefs, and temporary section summaries.

Current consumers:

- `src/app/layout.tsx`
  - Imports `profile`.
  - Builds `metadata.title` from `profile.name` and `profile.role`.
  - Uses `profile.metadataDescription` for the page description.
- `src/components/hero.tsx`
  - Imports `profile`.
  - Renders role, name, intro, and both CTA links.
  - CTA destinations are `profile.ctas.projects.href` and `profile.ctas.contact.href`.
- `src/app/page.tsx`
  - Imports `profile`.
  - Renders `Hero`.
  - Provides matching `#projects` and `#contact` sections for the hero CTAs.
  - Uses `profile.projectSummary` and `profile.contactSummary` for temporary section copy.

The profile data is static and bundled with the app. There is no runtime fetch, API layer, environment-variable dependency, or persistence layer.

## Styling and Accessibility Conventions

- Styling is implemented with Tailwind utility classes.
- Global semantic color tokens are defined as CSS variables: `--background` and `--foreground`.
- Dark mode follows `prefers-color-scheme` in `globals.css` and Tailwind `dark:` variants in components.
- Layouts use responsive Tailwind prefixes such as `sm:` and `lg:`.
- The current page uses semantic landmarks and sections: `<main>`, `<section>`, `<h1>`, `<h2>`, and links.
- Sections use `aria-labelledby` with matching heading IDs.
- The decorative hero preview is marked `aria-hidden="true"`.
- CTA links include visible focus outlines via `focus-visible` classes.
- Transitions include `motion-reduce:transition-none` where used.

## Feature Development Workflow

Use the workflow demonstrated by Feature 001 and required by `AGENTS.md`:

1. Spec: define objective, requirements, constraints, acceptance criteria, and out-of-scope items in `docs/specs/`.
2. Plan: inspect relevant files, identify assumptions or missing information, and propose a short plan before non-trivial changes.
3. Implementation: modify only approved files and keep components focused.
4. Verification: run available checks and record exact outcomes.
5. Independent review: use a separate review pass or conversation to inspect the spec, implementation, and working tree.
6. Human approval: a human decides whether findings block the feature or are accepted limitations.

## Quality Gates

Run these from the repository root in Windows PowerShell:

```powershell
pnpm.cmd lint
pnpm.cmd exec tsc --noEmit
pnpm.cmd build
```

Do not claim a gate passed unless it was actually executed. Direct `pnpm` may be blocked by PowerShell execution policy on this machine; use `pnpm.cmd`.

## Known Limitations and Deferred Decisions

- `profile.name`, project copy, and contact copy are placeholders and must be replaced before public release.
- No automated tests are configured.
- No project listing, contact method, CMS, backend API, analytics, deployment configuration, or authentication exists.
- `README.md` still contains the default create-next-app content and references `app/page.tsx` instead of the current `src/app/page.tsx` structure.
- The current visual hero preview is decorative markup, not a real project preview or image asset.
- `public/*.svg` starter assets exist but are not currently used.
- Feature 001 browser checks at 375px and 1440px are recorded as developer-reported in `docs/agent-evals/001-hero-review.md`; this document did not independently re-run browser viewport checks.

# Feature 002 — Career Paths Foundation

## Goal and Scope
Help recruiters explore one shared profile through three English-only perspectives:

| Path | URL | Preliminary accent |
| --- | --- | --- |
| AI & Data | `/paths/ai-data` | Cyan |
| Software Engineering | `/paths/software` | Indigo |
| Digital Transformation | `/paths/digital` | Teal |

Sources: Product Brief, architecture, AGENTS.md and approved Feature 002 decisions.

## Requirements and Approach
- Place three linked cards immediately below the homepage Hero; preserve Hero copy, CTAs and existing sections.
- Keep identity in `src/data/profile.ts`. Define readonly typed path content (slug, name, card description, introduction, accent and metadata description) in `src/data/career-paths.ts`.
- Use three thin static App Router pages and one shared Server Component. Derive URLs and metadata titles from path definitions and the shared profile.
- Each page provides its heading, restrained introduction, Home and path navigation, plus `/#projects` and `/#contact` links. Mark the current path with `aria-current="page"` and a visible text indicator.
- Use normal HTML links without client-side React state. Unknown path URLs must return HTTP 404.
- Share existing typography and light/dark styling, with subtle cyan, indigo and teal accents. Use semantic headings, labelled navigation, visible focus and reduced-motion support.
- Copy describes interests and perspectives grounded in the brief, without invented achievements, metrics, employment or experience.

## Acceptance Criteria
1. Home shows exactly three cards in the table's order immediately after the Hero; each links to its matching URL. Existing Hero CTAs still reach Projects and Contact.
2. All three path URLs return HTTP 200 on direct navigation and refresh, with the correct heading, introduction and shared identity.
3. Each page links to Home and all three paths. Exactly one path link has `aria-current="page"` and a visible current indicator. Projects and Contact links reach the homepage sections.
4. Each path has a distinct title containing its path name and shared profile name, and a distinct non-empty description.
5. `/paths/not-a-career-path` returns HTTP 404, without redirecting to Home or returning a successful error page.
6. Content and navigation work with JavaScript disabled. Keyboard users can reach and activate all links with visible focus.
7. At 375px, 768px and 1440px in light/dark modes, no horizontal overflow, overlap or clipping occurs. Content remains usable at 200% zoom. Normal text contrast is at least 4.5:1; large text and essential non-text UI contrast is at least 3:1. Any transitions respect reduced motion.
8. One typed path source supplies cards and pages; identity stays in `profile.ts`. No new dependencies or client selection state are introduced.
9. Lint, strict TypeScript checking and the production build succeed, with actual results recorded.

## Edge Cases and Out of Scope
Unknown paths use the framework's 404 handling. Missing verified work or contact details must not produce fabricated entries or nonexistent links. Existing placeholder identity remains a separate pre-release content task.

No project cards/filtering, experiences, skill lists, bilingual support, complex animations, copy-link controls, custom social images, tailored CVs, backend services or new test framework.

## Verification Plan
- Review the diff for scope, factual copy, typed data, Server Components and unchanged Hero behavior.
- Run `pnpm.cmd lint`, `pnpm.cmd exec tsc --noEmit` and `pnpm.cmd build`.
- Run the production server; check known and unknown HTTP responses, rendered metadata, direct visits and refreshes.
- Manually check navigation, keyboard focus, no-JavaScript behavior, reduced motion, responsive sizes, zoom and contrast in both color schemes. Record checks actually performed and remaining limitations; no automated test framework is configured.

## Remaining Assumptions
Exact editorial copy and accent shades are implementation choices within these boundaries and remain subject to content/design review. Verify the placeholder identity before public release. No functional decision blocks implementation.

# Feature 006 — Contact & CV

**Status:** Draft for human review; implementation requested alongside this spec.

## User goal
Let recruiters reach verified professional contact channels and download an available CV from the shared profile, including when arriving through a career path.

## Functional requirements and data model
- Keep the homepage `#contact` destination and both existing Hero CTAs. All three career-path pages retain their native `/#contact` action.
- Add readonly optional `email`, `github`, `linkedin` and `cv` fields under `profile.contact`. Email is an address used to construct `mailto:`; profiles use HTTPS URLs; CV references a verified local PDF in `public/` using its root-relative URL.
- Render only populated, verified destinations with native anchors. Use `download` for the local CV; external profiles open in the same tab.
- Repository inspection found no verified personal contact details or CV asset. Start with empty contact data; omit absent actions and show plain messages for unavailable professional contact details and CV. Partially populated data renders only available actions.
- Extract a focused Contact & CV Server Component using the existing homepage section, typography, button and focus styles. Update architecture documentation.

## Non-functional requirements
No client state, dependencies, fetching or design changes. Use a labelled semantic section, descriptive link text, existing visible keyboard focus and 48px action targets. Stack actions on small screens and wrap on larger screens; retain reduced-motion behavior.

## Acceptance criteria
1. Homepage has exactly one `#contact` section labelled by its Contact & CV heading. Existing Hero destinations remain `#projects` and `#contact`.
2. Each career-path page retains a keyboard-accessible Contact link to `/#contact`.
3. With current empty data, no email, social or CV action, empty list, placeholder URL, fake button or broken file link is rendered. Availability messages remain readable without JavaScript.
4. A verified email produces `mailto:<address>`; each supplied professional URL renders under its correct name; a supplied existing PDF produces a Download CV anchor with `download`. Missing individual fields produce no corresponding action.
5. Contact destinations are maintained once in typed profile data. Adding one channel requires no page changes. Do not populate fields until ownership/destination or file availability is confirmed.
6. Layout remains readable at 375px, 768px, 1440px and 200% zoom with visible keyboard focus and wrapping actions.
7. Lint, strict TypeScript checking and production build are executed and actual results reported.

## Edge cases
Treat unavailable channels independently: a CV can appear without social links, and contact links without a CV. Omit an absent CV action and show its availability message. Type constraints describe URL shape, not proof of ownership or file existence; verify real destinations before entering them and remove entries if unavailable.

## Out of scope
Contact forms, backend/email services, external contact research, invented addresses, path-specific CVs, new routes, bilingual content, analytics, dependencies and a test framework.

## Verification plan
Run `pnpm.cmd lint`, `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd build` and `git diff --check`. Inspect generated HTML for the contact heading, empty states, preserved Hero anchors and Contact actions on all paths. Review conditional rendering for partial/populated data. Check responsive layout, keyboard focus and zoom when browser access is available; report checks not performed.

## Open questions
Supply the verified professional email, GitHub and LinkedIn profile URLs, and final CV PDF. Their absence does not block the honest empty-state implementation.

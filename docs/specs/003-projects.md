# Feature 003 — Projects Experience

## Supersession note
The original seed requirements below are retained as history. The later [CV integration review](../content/content-review.md) supersedes the six-card limit (requirement and criterion 1), empty-technology assumption and provisional memberships: the shared source now has eight projects with CV-supported details where available. Projects now have a typed `published` boolean: Reactis and Quiz Game are unpublished records retained in `src/data/projects.ts` for future completion. The shared `ProjectList` renderer excludes unpublished records from all public project lists, including Home and career-path selections; this publication rule also qualifies criterion 2 below. MCP and forecasting identities remain open questions. Project URLs are still absent. Current styling is fixed dark, superseding the light/dark expectations in the requirements, criterion 5 and verification plan. The remaining acceptance criteria still apply.

## Goal
Let visitors discover all projects on Home and relevant projects through career paths, using one consistent factual source.

## Requirements and Data Model
- Define readonly typed project records in `src/data/projects.ts`: stable ID, title, short description, technologies, career-path slugs and optional links (label and HTTP(S) URL).
- One record may belong to multiple paths. Select matching records on the server without duplicating content.
- Seed the six names supplied in the feature request: PicoxIA transcription/NLP, Reactis GenAI functional testing, Quiz Game, Forecasting, ICOSNET process improvement and Thaïs MCP Server. These names are absent from the current Product Brief; the request is their source.
- Use minimal topic descriptions only. Do not infer technologies, personal contributions, metrics, results or URLs. Empty technology lists display “Technologies to be confirmed”; empty link lists render no actions.
- Home's existing Projects section shows all six cards. Each career-path page shows matching cards beneath its introduction.
- Use a shared Server Component list with semantic articles and headings. Match existing responsive light/dark styling, wrapping text and visible keyboard focus. No JavaScript is needed.

## Acceptance Criteria
1. Home renders exactly six project cards once each, in seed order, preserving the Hero, career cards and `#projects`/`#contact` destinations.
2. Each path renders exactly the projects whose path list includes its slug. Multi-path records appear once on each relevant page with identical facts.
3. Every card has its title, short description and either verified technology labels or the explicit placeholder. Only supplied real HTTP(S) URLs produce links; no fake, empty or disabled links appear.
4. Lists use stable IDs, articles and `h3` card headings under an `h2` section heading. Links have descriptive names and visible focus. Content remains server-rendered.
5. Layouts wrap without overflow at 375px, 768px and 1440px, in both color schemes and at 200% zoom. Normal text contrast is at least 4.5:1. No animation is introduced.
6. An empty selection displays “No projects listed for this path yet.” Unknown path URLs still return HTTP 404.
7. Lint, strict TypeScript checking and production build succeed; record actual verification outcomes.

## Assumptions and Open Content Questions
Provisional editorial membership: PicoxIA and Reactis → AI & Data + Software Engineering; Quiz Game and Thaïs → Software Engineering; Forecasting → AI & Data; ICOSNET → Digital Transformation. Membership describes relevance, not verified technology or experience. These mappings need content review.

All technology and link lists start empty. Detailed descriptions, verified stacks, contributions, outcomes and URLs await supplied evidence. There is no functional blocker to the placeholder implementation authorized by the request.

## Edge Cases and Out of Scope
Handle empty selections and absent technologies/links explicitly. Cards without links remain non-interactive articles. Do not build detail pages, interactive filters, bilingual content, animation libraries, a backend, new dependencies or a test framework.

## Verification Plan
- Review seeded facts and provisional membership; compare Home and path selections to the shared data.
- Run `pnpm.cmd lint`, `pnpm.cmd exec tsc --noEmit` and `pnpm.cmd build`.
- Check production responses, card counts, shared multi-path content, absent unsupplied links and unknown-path 404.
- Manually check responsive sizes, light/dark contrast, zoom, keyboard focus and no-JavaScript navigation when a browser is available. Report unavailable checks explicitly; no automated test framework is configured.

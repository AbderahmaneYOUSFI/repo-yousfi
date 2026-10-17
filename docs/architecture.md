# Architecture

Current implementation overview. See [document authority](../README.md#documentation) for the roles of requirements and factual references. [Feature 007](specs/007-systems-atlas-v2.md) defines the Systems Atlas V2 implementation and the owner's nine-project publication decision.

## Routes and rendering

Next.js App Router, React, strict TypeScript and Tailwind CSS. Content is bundled from `src/data/`; there is no runtime content fetch, CMS or database.

| Route | Composition |
| --- | --- |
| `/` | Home Hero and Systems Atlas, three career perspectives, nine published studies, experience, education, skills and contact. |
| `/paths/ai-data` | AI & Data Hero, full atlas, four published studies, contextual experience fallback, education, selected skills and contact. |
| `/paths/software` | Software Hero, full atlas, five published studies, contextual experience fallback, education, selected skills and contact. |
| `/paths/digital` | Digital Hero, full atlas, three published studies, three internships, education, selected skills and contact. |
| `/projects/[id]` | Published project detail: canonical title/description, relationships, conceptual artwork, context, documented work, technologies, resources and limitations. Nine IDs supplied by `generateStaticParams`. |

`PortfolioPage` composes the four entry pages. The static career route modules retain `CareerPathPage` and `careerPathMetadata`. `SiteFrame` supplies shared navigation, skip link, main landmark and footer. Native anchors preserve the existing full-document navigation, standard browser link behavior and appearance URLs. The active perspective uses `aria-current="page"`; path navigation also includes a visible current label.

Unknown or unpublished project IDs are rejected by the narrow `/projects/:path*` proxy before streaming, returning HTTP 404 through the themed not-found page. This is necessary because Cache Components streams an unknown dynamic route shell before page-level `notFound()` can set the status. The detail page independently checks publication. Excluded legacy IDs are not generated and cannot be accessed. Existing `next.config.ts` settings remain unchanged.

## Content and publication

| Source | Responsibility |
| --- | --- |
| `src/data/profile.ts` | Shared identity, metadata, confirmed contact destinations and internship availability. |
| `src/data/career-paths.ts` | Typed slugs, names, summaries, metadata and URL helpers. |
| `src/data/projects.ts` | Sole catalogue source: stable IDs, publication booleans, titles, descriptions, technologies, memberships and owner-supplied HTTP(S) links. |
| `src/data/project-details.ts` | Editorial detail context, documented scope and limits based on confirmed inventory. Does not add achievements, scores, roles, dates or new URLs. |
| `src/data/experiences.ts` | Three internships, assigned only to Digital Transformation. |
| `src/data/skills.ts` | Skill groups and contexts without proficiency ratings. |

All nine current projects are published by explicit owner decision. Public counts are AI 4 / Software 5 / Digital 3 across twelve memberships. PicoxIA spans AI/Software, Faraway Software/Digital, Reactis AI/Digital. Selectors preserve shared source order. Public renderers, static route generation, proxy and MCP retain publication checks for future unpublished entries.

Only the three formerly unpublished booleans changed. Details distinguish scope from verified outcomes: Reactis results and implementation technologies remain unconfirmed; ICOSNET expected impact is evaluated through simulation. Repository links exist for five projects; missing repository/demo URLs are stated without invention. `ContactSection` renders confirmed channels and only offers a PDF download when configured; no CV PDF is currently available.

Education follows the owner-confirmed CV and approved prototype; institution placeholders remain explicitly labelled. Conceptual project artwork is implemented as SVG/typographic React markup and labelled as such. It is not presented as a product screenshot or verified architecture.

## Design system and interactions

`globals.css` ports the approved prototype's layout, spacing, responsive behavior and exact light/dark tokens. Home is Titanium, AI Turquoise, Software Indigo and Digital Emerald. Locally bundled Barlow regular/semibold and Barlow Semi Condensed semibold load with `next/font/local`; licenses reside beside the font files in `src/app/fonts/`. No new dependency or remote font request is needed.

Hero typography and desktop atlas follow the V2 geometry. Between 801 and 1100px the Hero stacks; at 800px and below the atlas becomes three flowing perspective groups. Nine desktop nodes and twelve SVG paths derive from public project data; mobile repeats shared projects in both relevant groups, with explicit shared-membership text. Geometry and short map labels are presentation-only, indexed by stable ID in the atlas components. No personal AY node or owner connector is rendered.

Page content, sections, artwork and data selection stay in Server Components. Client components are limited to:

- `AppearanceControl`: native System/Light/Dark select, OS/storage/history listeners and choice persistence. `appearance.ts` handles preference resolution, theme application, meta color and internal appearance URLs. `appearance-boot.ts` supplies fixed trusted initialization before paint. Only the mutated root theme and theme-color meta suppress expected hydration differences.
- `MobileMenu`: native details/summary disclosure, Escape/outside-pointer/focus-exit dismissal and focus restoration. Its navigation children are server-rendered.
- `AtlasInteraction`: one React selection context shared by desktop/mobile controls and project links. Native buttons expose `aria-pressed`; Home starts globally and career pages start with their own perspective. All projects remain visible. Out-of-path cards render as disabled spans without an href or keyboard stop; active cards are full native links, with mobile arrows and touch/focus feedback. Hover and focus do not change the filter. Memberships come from the source catalogue, not manual maps. A polite atomic caption describes the selected group. Only IDs, real memberships and presentation props cross the project-link client boundary; descriptions and stacks stay server-rendered.
- `SectionMotion`: one observer for the prototype's short section-marker entrance; reduced-motion mode skips it and disconnects an active observer.

Engineering notes use native `details`/`summary`; they need no custom client state. Focus outlines, semantic controls, text labels, touch targets, native select colors, reduced motion and forced-color styles are included. Runtime browser layout/hydration verification remains separate from static markup and pure theme tests.

## Verification

Required checks: `pnpm.cmd lint`, `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd build`. Existing MCP tests (`pnpm.cmd mcp:test`) cover public projections, publication guards, malformed arguments and real stdio transport. Production theme tests run with `node --test scripts/appearance.test.mjs` using the existing TypeScript compiler and Node test runner.

With a production server running, `python scripts/verify-systems-atlas.py http://localhost:3100` verifies thirteen public pages, details, source-fact preservation, exact desktop/mobile memberships, local links/fragments/assets, four true HTTP 404s, exact theme tokens and text contrast. It does not emulate layout or interactive accessibility. See [verification record](verification/systems-atlas-v2.md) for executed results and outstanding visual checks.

The `.design-preview/` HTML/CSS and runtime remain the historical approved visual reference. Its source-catalogue test now reflects the nine-project publication decision while checking that all other source facts match the historical baseline. Its runtime tests still exercise the prototype scripts, not the production React interactions. The prototype generator and static artifact audit describe the old six-publication snapshot; they are not production acceptance checks.

The targeted UX update leaves `.design-preview/` untouched. Career Heroes now
reserve common minimum title/description zones and align their copy to the top;
natural wrapping and content growth remain possible. `scripts/atlas.test.mjs`
renders the real React components for all four selections and shared memberships.
Production HTTP verification checks that disabled atlas cards expose no URL while
all nine detail pages still respond. Committed verification fixtures retain the
historical facts and approved tokens without depending on ignored preview files.

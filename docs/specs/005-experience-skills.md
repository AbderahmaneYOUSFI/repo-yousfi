# Feature 005 — Experiences & Skills

**Status:** Draft for human review; implementation requested alongside this spec.

## Supersession note
The status and initial audit below describe the original feature request. The later [CV integration review](../content/content-review.md) supersedes the empty-data assumptions and related open questions: the source now contains three CV-reported internships (ICOSNET and Schneider Electric) and populated skill groups. All internships are assigned to Digital Transformation. Criterion 3's editorial-confirmation wording is superseded: empty experience selections now direct visitors to that perspective and Home; empty skill selections show a plain availability message. Other acceptance criteria, including the prohibition on fabricated claims and technical proficiency ratings, remain applicable. Memberships are editorial decisions, not additional CV facts.

## User goal
Help visitors find professional experience and skills across one shared profile and its career paths, without unsupported claims.

## Requirements and approach
- Add readonly typed sources in `src/data/experiences.ts` and `src/data/skills.ts`. Follow the existing project membership/filtering pattern; keep facts in one record.
- Experience: stable ID, organization, optional role/period/summary, and readonly career-path slugs. Skill: stable ID, name, optional evidence/context, and readonly career-path slugs. No proficiency field.
- Home shows all records in Experiences (`#experiences`) and Skills (`#skills`) sections after Projects and before Contact. Each path shows records whose memberships include its slug, after Projects.
- Use shared Server Component lists, semantic headings and existing dark tokens, spacing and responsive card styling. Omit absent optional fields. Preserve native navigation, routes, metadata, projects and CTA behavior.
- Only source-supported facts may populate records. Repository audit: ICOSNET is a project topic in Feature 003, not verified employment; Schneider Electric has no source entry. Project topics, academic positioning and the repository stack do not establish personal skill proficiency. Both datasets therefore start empty, with clearly marked editorial messages pending confirmation.

## Acceptance criteria
1. Home and all three existing paths contain one labelled Experiences section and one labelled Skills section, rendered without client JavaScript.
2. Home uses the complete shared datasets. Path selectors preserve data order and include only matching memberships; a multi-path record appears once per matching path with identical facts.
3. Empty datasets/selections show explicit editorial confirmation messages, without implying a lack of real experience or skills. No empty list, fake employer, proficiency rating, date, responsibility, technology, result or link is rendered.
4. Populated lists use stable IDs and readable, wrapping content. Experience articles use `h3` below section `h2`; skills are a semantic list. Missing optional details leave no empty labels or separators.
5. Existing typography and colors remain unchanged. Layouts work at 375px, 768px and 1440px and 200% zoom; existing focus and reduced-motion styles remain in effect.
6. Lint, strict TypeScript checking and production build succeed with actual results reported.

## Edge cases and non-functional requirements
Empty membership means homepage-only until relevance is confirmed. Empty path selections remain visible as editorial messages. Omit unknown dates instead of inferring chronology or current employment; preserve editorial record order. No new dependencies, Client Components or fetching.

## Out of scope
Content research outside the repository, inferred career history, inferred skill claims, redesign, new routes, interactive filters, backend/CMS, bilingual content, proficiency bars and a test framework.

## Verification plan
- Review source evidence, shared data consumers, membership selectors and omission of absent fields.
- Run `pnpm.cmd lint`, `pnpm.cmd exec tsc --noEmit`, `pnpm.cmd build` and `git diff --check`.
- Inspect generated production HTML for the new sections, editorial messages and preserved project counts on all four routes.
- Manually check responsive layout, zoom, keyboard navigation and no-JavaScript rendering; report any checks not performed.

## Open content questions
Confirm organizations and employment relationships (including ICOSNET and Schneider Electric), roles, dates, responsibilities and results before adding them. Supply an evidenced skill inventory and confirm path memberships. These missing facts do not block the explicitly labelled empty-state implementation.

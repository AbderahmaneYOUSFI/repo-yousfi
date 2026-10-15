# Product Brief — One Profile. Multiple Perspectives.

**Status:** Draft v1
**Product:** Personal engineering portfolio
**Primary audience:** Recruiters, hiring managers, technical leads
**Primary objective:** Secure internship or apprenticeship opportunities

This brief records product intent. Its proposed scope and original open decisions are historical planning context; consult [document authority](../../README.md#documentation), [feature specs](../specs/), [architecture](../architecture.md) and [content review](../content/content-review.md) for requirements, implemented scope and unresolved editorial decisions.

## 1. Product Vision

Build a modern, credible, interactive portfolio that presents one engineering profile through three complementary professional perspectives.

**Positioning:** One Profile. Multiple Perspectives.

**Core message:** Building intelligent software. Connecting technology, data and business.

The portfolio should communicate a combination of Industrial Engineering and MIAGE — Applied Artificial Intelligence (IA2) at Université Côte d'Azur, without implying senior-level expertise across every discipline.

## 2. Target Audiences

- AI, machine learning and data recruiters.
- Backend, full-stack and software engineering recruiters.
- Information systems, business process and digital transformation recruiters.

Each audience should quickly discover relevant evidence of skills, projects and experience.

## 3. Product Principles

1. One identity and one source of factual information.
2. Multiple perspectives, not multiple independent websites.
3. Projects and demonstrated work take priority over decorative effects.
4. Accessible, responsive, fast and keyboard-friendly by default.
5. Progressive enhancement: useful content must remain available without unnecessary animation.
6. Every major career path must have a shareable URL.

## 4. Navigation Model

**Home (`/`)**

A shared landing page presenting identity, dual academic background, positioning, three interactive career-path cards and primary actions.

**Career paths**

- `/paths/ai-data`
- `/paths/software`
- `/paths/digital`

Each path provides a tailored introduction and relevant projects, skills and experience.

Users must be able to switch between paths and return to the global profile.

**Other navigation areas**

Projects, Experience, About and Contact remain part of the common portfolio experience. Their final URL structure is to be specified separately.

## 5. Shared Content Model

Projects, experiences and skills should be represented once in structured, typed data.

A project may appear in multiple career paths with different editorial emphasis. The underlying facts, responsibilities, links and outcomes must remain consistent.

Project detail content should cover:

- Problem and context.
- Solution and personal contribution.
- Architecture and technical decisions.
- Results, limitations and lessons learned.
- Available repository, demo or documentation links.

## 6. Visual Direction

Premium, minimal, technical and subtly futuristic.

- Dark base with controlled contrast.
- Modern, highly readable typography.
- Consistent components and layout across paths.
- Restrained path-specific accent colors.
- Subtle hover, focus and navigation feedback.
- Respect reduced-motion preferences.

Proposed accents to validate through design review:

- AI & Data: cyan.
- Software Engineering: indigo.
- Digital Transformation: teal.

## 7. Language and CV

The product aims to support English and French.

The initial implementation may launch in one language, provided the content model does not unnecessarily obstruct future localization.

CV links must only reference existing files. Path-specific CV versions are optional and must not be implied to exist.

## 8. Initial Delivery Scope

**Feature 002 — Career Paths Foundation**

Define and implement path identities, routing, navigation and a shared data model.

**Feature 003 — Projects Experience**

Introduce structured project data, path-aware project selection and accessible project cards.

## 9. Deferred Scope

- Complete bilingual experience.
- Advanced scroll animations and visual effects.
- Detailed interactive architecture diagrams.
- Multiple tailored CV documents.
- CMS, database and backend services.
- Analytics and deployment enhancements.

These may be reconsidered when they support a demonstrated product need.

## 10. Success Criteria

A recruiter should be able to:

1. Understand the candidate's positioning within seconds.
2. Choose a relevant professional perspective.
3. Open a directly shareable career-path URL.
4. Discover credible, relevant projects and contributions.
5. Navigate to CV, GitHub, LinkedIn or contact when valid links are available.
6. Use the site on mobile and with keyboard navigation.

## 11. Open Decisions

- Final identity, biography and verified professional content.
- Confirmed project details and evidence.
- Final navigation and URL structure beyond career paths.
- Language selected for the first release.
- Animation implementation and dependency policy.
- Automated testing framework.
- Availability of project screenshots, diagrams and CV versions.

No open decision should be silently invented by a coding agent.


---
name: feature-spec
description: Create or review testable feature specifications from product requirements and repository architecture. Use before implementing a new feature.
---

# Feature Spec Skill

## Purpose

Transform product requirements into a precise, testable
feature specification.

Do not implement the feature.

## Context

Before writing a specification:

1. Read AGENTS.md.
2. Read docs/architecture.md.
3. Read docs/product/portfolio-brief.md.
4. Inspect relevant existing code and specifications.

## Workflow

1. Identify the user goal.
2. Separate confirmed requirements from assumptions.
3. Identify missing information.
4. Define scope and out-of-scope behavior.
5. Propose a minimal technical approach.
6. Define measurable acceptance criteria.
7. Cover responsive design and accessibility.
8. Consider empty states and edge cases.
9. Define verification methods.
10. Present the specification for human approval.

## Required Output

- Feature title and identifier
- User goal
- Functional requirements
- Non-functional requirements
- Data model, if applicable
- Acceptance criteria
- Edge cases
- Out of scope
- Verification plan
- Open questions

## Rules

- Do not modify application code.
- Do not install dependencies.
- Do not invent facts or achievements.
- Do not silently decide unresolved requirements.
- Do not claim tests passed unless executed.
- Do not commit changes.
- Wait for human approval before finalizing a spec.

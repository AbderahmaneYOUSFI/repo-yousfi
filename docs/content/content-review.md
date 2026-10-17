# CV content integration review

This document tracks unresolved editorial decisions and the rationale for CV integration; see [document authority](../../README.md#documentation). Personal facts come from the owner's self-reported [CV source](cv-source.tex) and the confirmed project inventory supplied on 17 October 2026, without independent verification. The owner's inventory supersedes earlier project identity and membership questions. The website keeps its existing English language, so French roles and contributions are translated without adding outcomes or metrics. No external research was used to infer personal facts.

## Identity and contact

- Public identity: Abderrahmane Yousfi, based in Nice.
- Master 2 MIAGE, Applied Artificial Intelligence (IA2), Université Côte d’Azur, Sophia Antipolis, 2025–present; Industrial Engineering graduate, ENSTA Alger, 2025. The M2/IA2 context comes from the CV profile, while the dates come from its education section.
- AI developer internship availability: January 2027.
- Email, GitHub and LinkedIn destinations are copied exactly from the CV hyperlinks. The GitHub handle spelling differs from the given name spelling; it is deliberately preserved.
- The phone number is excluded from website data. The supplied source remains untouched.
- No verified PDF asset or URL was supplied; `profile.contact.cv` remains absent.

## Projects and path review

The owner has explicitly approved publication of all nine distinct project records (17 October 2026). This supersedes the earlier six-published / three-unpublished policy. The nine retained projects preserve their IDs, URLs, verified descriptions and technologies from commit `1db8329`. These owner-confirmed memberships describe relevance, not additional achievements:

| Project (stable ID) | Status | Career paths | Content boundaries |
| --- | --- | --- | --- |
| PicoxIA (`picoxia`) | Published | AI & Data, Software Engineering | Veterinary dictation, 14 languages, hybrid transcription and local AI enrichment. |
| Energy Consumption Forecasting (`forecasting`) | Published | AI & Data | Existing pipeline identity confirmed; seven-day forecasts and model comparison. |
| Thaïs Hotel MCP (`thais-mcp-server`) | Published | AI & Data | Existing hotel PMS identity confirmed; availability, room types, pricing, reservations and email confirmation. |
| Faraway (`faraway`) | Published | Software Engineering, Digital Transformation | Physical card game adapted into a multiplayer web application. |
| Mini-SGBD — Oracle Simulation (`database-simulation`) | Published | Software Engineering | Educational Python DBMS, retained as one project. |
| Sustainable Software Engineering @ ICOSNET (`icosnet`) | Published | Digital Transformation | One project combining SSE research and its industrial e-commerce case study; expected impact evaluated through simulation, without a proven deployment claim. Paper, poster and thesis are related deliverables. |
| Réactis (`reactis`) | Published | AI & Data, Digital Transformation | Research and benchmarking across functional/business testing, including a Claude Code agent benchmark. No verified improvements, metrics or completed outcomes. |
| Marble Madness (`marble-madness`) | Published | Software Engineering | 3D browser physics game; keyboard/mobile controls, levels, scoring and enemies. |
| Angular Assignment Management (`angular-assignment-management`) | Published | Software Engineering | Angular 20 application deployed on Render; no deployment URL supplied. |

Published counts are AI & Data **4**, Software Engineering **5**, Digital Transformation **3**. The twelve memberships intentionally overlap. All nine projects are available in public lists, project detail routes and MCP details. `getProjectsForPath` selects all memberships; public consumers retain the publication filter for future unpublished entries. Publication of Reactis, Marble Madness and Angular Assignment Management changes only their visibility, not their confirmed facts or outcomes.

Big Data Project (`big-data`), Spring Boot Web Application (`spring-boot-web-application`) and Quiz Game (`quiz-game`) are excluded from the active catalogue by owner instruction. They are not publication candidates in this inventory and must not appear in generated routes or MCP results. Their previous records remain available in Git history.

Five GitHub links are copied exactly from the owner's inventory into `src/data/projects.ts`: PicoxIA, forecasting, Thaïs, SSE/ICOSNET and Angular Assignment Management. Other projects have no supplied repository or demo URLs. No URLs are inferred from titles.

The CV's ICOSNET internship facts remain in `src/data/experiences.ts`: January–May 2025, BPMN process modeling, structured tracking data and KPI definition. The project retains BPMN while presenting the combined research/case-study scope. Internship activities do not establish real-world deployment of the simulated Scrum + SSE proposal.

## Experiences and skills

All three internships are assigned only to Digital Transformation. Data analysis within a process or quality internship is not treated as evidence of an AI/ML or software development role. Dates and contributions follow the CV, with no quantified improvement claims.

Skills are grouped using the existing name/context cards. Group-level path memberships are editorial navigation; they do not imply each tool was used in each project or internship. Spoken-language levels reproduce the CV's explicit C1/native labels; no technical proficiency ratings are added. Certifications have no invented issuers or dates. Power BI remains explicitly in progress.

## Remaining information

- Confirm Réactis findings, implementation stack and personal contributions before adding outcomes.
- Supply missing project repositories/demos and a public CV PDF if desired.
- Publication of all nine current projects is approved. Future unpublished projects still require explicit approval.
- Provide any project dates, personal responsibility boundaries, limitations or measured outcomes before adding them.

This integration supersedes the initial empty-data assumptions in Features 003, 005 and 006; their data boundaries are preserved; Feature 007 defines the current UI and public project routes.

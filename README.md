# AI-Native Portfolio

A Next.js portfolio presenting one profile through AI & Data, Software Engineering and Digital Transformation perspectives.

## Local setup

Use a Node.js environment compatible with the dependencies in `package.json` and pnpm `12.11.2` (the pinned `packageManager`). From the repository root:

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Pages live in `src/app/`, shared components in `src/components/` and portfolio data in `src/data/`.

For a production build, run `pnpm build`, then `pnpm start`. Verification commands and Windows PowerShell alternatives are in [AGENTS.md](AGENTS.md#verification).

## Documentation

- [AGENTS.md](AGENTS.md): repository instructions and verification.
- [Product Brief](docs/product/portfolio-brief.md): product intent and direction, including deferred ideas; not a description of everything currently shipped.
- [Feature specs](docs/specs/): requirements and acceptance criteria. Supersession notes qualify historical assumptions; unqualified criteria remain applicable.
- [Architecture](docs/architecture.md): concise implementation overview. Source code is authoritative for current implemented behavior; differences from requirements remain gaps unless explicitly superseded.
- [CV source](docs/content/cv-source.tex): owner-supplied, self-reported personal facts, not independent verification or a downloadable PDF.
- [Content review](docs/content/content-review.md): unresolved editorial decisions and integration rationale; it does not establish new personal facts.

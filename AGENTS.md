
# AI-Native Portfolio — Agent Instructions

## Project
Production-quality developer portfolio built with:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Architecture Rules
- Prefer Server Components by default.
- Use Client Components only when required.
- Keep components small and focused.
- Follow the existing project structure.
- Avoid unnecessary abstractions.
- Do not add dependencies without approval.

## Agent Workflow
1. Inspect relevant files before acting.
2. Identify assumptions and missing information.
3. Propose a plan before non-trivial changes.
4. Modify only files within the approved scope.
5. Add tests when appropriate.
6. Run available verification commands.
7. Report changes, test results and remaining risks.

## Coding Standards
- Use strict TypeScript.
- Avoid `any`.
- Prefer semantic HTML.
- Ensure responsive layouts.
- Follow accessibility best practices.

## Verification
- pnpm lint
- pnpm exec tsc --noEmit
- pnpm build

Never claim a command passed unless executed.

## Security
- Never expose secrets.
- Never commit credentials.
- Request approval before destructive operations.

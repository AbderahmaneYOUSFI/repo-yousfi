
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
Read global instructions and the current task first, then load only directly relevant source files, specs and factual references. Do not read all documentation by default.

1. Inspect relevant files before acting.
2. Identify assumptions and missing information.
3. Propose a plan before non-trivial changes.
4. Modify only files within the approved scope.
5. Add tests when appropriate and when a test framework or script exists.
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

On Windows PowerShell, if `pnpm.ps1` is blocked by execution policy, use:
- pnpm.cmd lint
- pnpm.cmd exec tsc --noEmit
- pnpm.cmd build

No automated test framework is currently configured. Never claim tests passed unless an actual test command was executed, and never claim a command passed unless executed.

## Security
- Never expose secrets.
- Never commit credentials.
- Request approval before destructive operations.

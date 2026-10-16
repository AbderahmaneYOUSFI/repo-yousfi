# Portfolio design skills

These four project-scoped skills prepare future portfolio work. Installation does
not authorize a redesign. Follow the user's scope and the repository `AGENTS.md`;
skill recommendations never authorize new packages or invented portfolio facts.
The existing `feature-spec` skill is unchanged.

## Sources and installation

Exact upstream commits and SHA-256 hashes of every installed file are recorded in
`sources.lock.json`. Hashes normalize CRLF to LF so verification is portable
across Git line-ending settings. Source URLs below are the official repositories.

| Directory | Official source and source path | Discovered skill name |
| --- | --- | --- |
| `ui-ux-pro-max/` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill — `cli/assets/templates/platforms/codex.json`, `cli/assets/templates/base/`, `cli/assets/data/`, `cli/assets/scripts/` | `ui-ux-pro-max` |
| `frontend-design/` | https://github.com/anthropics/claude-code — `plugins/frontend-design/skills/frontend-design/` | `frontend-design` |
| `react-best-practices/` | https://github.com/vercel-labs/agent-skills — `skills/react-best-practices/` | `vercel-react-best-practices` |
| `web-design-guidelines/` | https://github.com/vercel-labs/agent-skills — `skills/web-design-guidelines/` | `web-design-guidelines` |

The local trusted Codex skill-installer's validation/copy functions were used for
the three static skills against pinned official archives. No remote installer or
package lifecycle scripts were executed.

UI/UX Pro Max was rendered with upstream `cli/src/utils/template.ts`:
`renderSkillFile(await loadPlatformConfig('codex'))`. Its normal full installer
also copies six unrelated sibling skills; that operation was deliberately not
called. Only its complete data directory and five top-level Python scripts were
copied. Upstream development tests and catalog refresh tooling are not required
at runtime and were omitted. The generated icon CSV reference was corrected from
`src/ui-ux-pro-max/data/icons.csv` to this project's installed data path. Upstream
MIT license and dataset provenance/license metadata are included. No CLI package
is installed or needed to use the skill.

Frontend Design's upstream `SKILL.md` references a missing `LICENSE.txt`. The
repository's `LICENSE.md` is included under that referenced filename, unchanged;
it states Anthropic's terms and is not an MIT license grant. No broader license
is inferred. Web Design Guidelines has one wording adaptation: use Codex's
available browsing/fetch tool where upstream names Claude's `WebFetch` tool.
React Best Practices includes all rules and its compiled `AGENTS.md` reference.
Three broken upstream links in that compiled guide were corrected from sibling
paths to `rules/async-defer-await.md`,
`rules/async-cheap-condition-before-await.md`, and
`rules/server-hoist-static-io.md`. Its README describes upstream authoring/build tooling;
that tooling is not needed to consume the skill and has not been installed.
Vendored Markdown trailing whitespace was cleaned, preserving hard breaks with
Markdown backslashes outside code fences. The local `.gitattributes` permits
upstream trailing whitespace only in `ui-ux-pro-max/scripts/design_system.py`:
its whitespace-only lines include string template content, so the script is
retained without changing generated output.

## Responsibilities and invocation

Use the existing `$feature-spec` first when a new feature needs an approved,
testable specification. For a later authorized redesign:

1. `$ui-ux-pro-max`: research UX, palette, typography, responsive behavior and
   semantic light/dark tokens. Use the actual React/Next.js stack explicitly;
   ignore mobile-only guidance for this web portfolio. Treat search output as
   input to one shared design plan, not a second competing design system.
2. `$frontend-design`: lead the distinctive visual direction and implement that
   shared plan. Resolve aesthetic recommendations against the user's brief;
   reuse the agreed tokens in both themes instead of selecting another palette.
3. `$vercel-react-best-practices`: review React/Next.js implementation, server
   boundaries, fetching, bundles and rendering performance. It does not choose
   the portfolio's visual style or authorize dependency additions.
4. `$web-design-guidelines`: perform the final UI/accessibility review with
   concrete file/line findings. Fetch its current external guidelines before
   each review. Report blocked network access rather than claiming a full audit.

Check contrast, focus, interaction states, reduced motion and responsive layouts
in **both** themes during future implementation. No theme implementation or
visual audit was performed as part of installation.

## Runtime and discovery

No application dependencies, global packages or new Python packages are needed.
UI/UX Pro Max requires Python 3 using only the standard library (Python 3.13.6
was available during setup). On Windows, use `python`, for example:

```powershell
python -B .agents/skills/ui-ux-pro-max/scripts/search.py --help
python -B .agents/skills/ui-ux-pro-max/scripts/search.py "keyboard focus" --domain ux
python -B .agents/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack nextjs
```

Searches are local. Persistence flags can write design documents; use them only
within an authorized future task. Web Design Guidelines needs network access to
`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
on each audit. The other static skills need no special tool or service.

All four have `SKILL.md` files with name/description frontmatter under the
project's `.agents/skills/` discovery location. This already-running setup
conversation cannot prove a refreshed Codex skill catalog. They should become
available on the next turn; if not listed, start a new Codex conversation in this
repository (or restart the client) and check for the exact names above. Do not
claim discovery or activation until the client actually lists them.

## Updating

Review new upstream instructions and supporting files before replacing a skill.
Use a pinned commit, retain the documented minimal adaptations, and regenerate
the file hashes in `sources.lock.json`. Do not run the full UI/UX installer over
this directory: it also installs unrelated skills. Never overwrite `feature-spec`.

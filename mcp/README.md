# Local Portfolio MCP

Requires Node.js >=20 and the repository's pnpm version. Uses the official
[`@modelcontextprotocol/server`](https://ts.sdk.modelcontextprotocol.io/v2/) SDK,
pinned to 2.3.1 after checking the npm registry and published APIs.

From the repository root (PowerShell):

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd run mcp:build
pnpm.cmd run mcp:test
node build/mcp/mcp/index.js
```

The final command waits for MCP messages on stdin. Configure clients to launch
`node` directly so package-manager output cannot enter the protocol stream.
`pnpm.cmd run mcp:start` is also available for manual launch. Diagnostics use stderr.
Compiled files are under the existing ignored `build/` directory. Rebuild and
restart after changing source data; no Next.js server is required.

## Tools

- `list_projects`: `{}` or `{"careerPath":"software"}`; returns
  `{projects: [{id, title, careerPaths}]}`. Valid slugs come from `list_career_paths`.
- `get_project`: `{"id":"picoxia"}`; returns
  `{project: {id, title, description, technologies, careerPaths, links}}`.
  IDs must be nonempty lowercase alphanumeric slugs with single internal hyphens.
- `list_career_paths`: `{}`; returns `{careerPaths: [{slug, name}]}`.

Only records with `published === true` are exposed, including when filtering.
DTOs explicitly select public fields from existing data imports. No contact/CV
sources, file tools, network listener or write operations are exposed.

All tool results include `structuredContent` and matching JSON text content.
Tool failures set `isError: true` with `{error: {code, message}}`: `INVALID_ARGUMENTS`,
`NOT_FOUND`, `UNKNOWN_TOOL`, or `INTERNAL_ERROR`. Missing and draft IDs have exactly
the same `NOT_FOUND` response. Unknown properties, null values, invalid slugs and
wrong types are rejected. Omitted arguments mean `{}` for argument-free calls.
Malformed MCP envelopes (for example, a non-object `arguments`) are rejected by
the SDK with JSON-RPC `-32602`, before tool dispatch.

## Local Codex configuration

Add this entry to your user `~/.codex/config.toml`, replacing the path if needed:

```toml
[mcp_servers.portfolio]
command = "node"
args = ['C:\Users\Hp\Documents\VSCode\PORTFOLIO\ai-native-portfolio\build\mcp\mcp\index.js']
```

Use an absolute Node executable path for `command` if Node is absent from Codex's
PATH. Restart the Codex session after configuring; use `codex mcp list` to inspect
the entry. This change only documents configuration; it does not modify your
Codex settings. See the [official OpenAI MCP configuration documentation](https://developers.openai.com/codex/mcp).

Tests use Node's built-in runner, including a real stdio subprocess with an MCP
initialization handshake. No external test framework or MCP client package is needed.

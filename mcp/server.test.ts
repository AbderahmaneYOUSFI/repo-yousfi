import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { test } from "node:test";
import { careerPaths } from "../src/data/career-paths";
import { getProjectsForPath, projects, type Project } from "../src/data/projects";
import { callTool } from "./server";

function data(name: string, args?: unknown) {
  const response = callTool(name, args);
  assert.equal(response.isError, false);
  assert.deepEqual(response.content, [{ type: "text", text: JSON.stringify(response.structuredContent) }]);
  return response.structuredContent;
}

test("confirmed catalogue preserves unique stable ids, publication policy and memberships", () => {
  const publishedIds = ["picoxia", "reactis", "forecasting", "icosnet", "thais-mcp-server", "faraway", "database-simulation", "marble-madness", "angular-assignment-management"];
  assert.equal(projects.length, 9);
  assert.equal(new Set(projects.map((project) => project.id)).size, 9);
  assert.deepEqual(projects.filter((project) => project.published).map((project) => project.id), publishedIds);
  assert.deepEqual(projects.filter((project) => !project.published), []);

  const memberships = {
    "ai-data": ["picoxia", "reactis", "forecasting", "thais-mcp-server"],
    software: ["picoxia", "faraway", "database-simulation", "marble-madness", "angular-assignment-management"],
    digital: ["reactis", "icosnet", "faraway"],
  } as const;
  const publicMemberships = memberships;
  const targetCounts = { "ai-data": 4, software: 5, digital: 3 } as const;
  for (const path of careerPaths) {
    const selected = getProjectsForPath(path.slug);
    assert.equal(selected.length, targetCounts[path.slug]);
    assert.deepEqual(selected.map((project) => project.id), memberships[path.slug]);
    assert.deepEqual(selected.filter((project) => project.published).map((project) => project.id), publicMemberships[path.slug]);
    assert.deepEqual(data("list_projects", { careerPath: path.slug }), {
      projects: publicMemberships[path.slug].map((id) => {
        const project = projects.find((entry) => entry.id === id)!;
        return { id, title: project.title, careerPaths: [...project.careerPaths] };
      }),
    });
  }
  for (const project of projects) {
    assert.equal(new Set(project.careerPaths).size, project.careerPaths.length);
    assert.ok(project.careerPaths.every((slug) => careerPaths.some((path) => path.slug === slug)));
  }
});

test("excluded projects are absent from the active catalogue and MCP", () => {
  const missing = callTool("get_project", { id: "does-not-exist" });
  const listings = [data("list_projects"), ...careerPaths.map((path) => data("list_projects", { careerPath: path.slug }))];
  for (const id of ["big-data", "spring-boot-web-application", "quiz-game"]) {
    assert.ok(projects.every((project) => project.id !== id));
    assert.deepEqual(callTool("get_project", { id }), missing);
    for (const listing of listings) assert.ok(!JSON.stringify(listing).includes(id));
  }
});

test("project links match only owner-supplied repositories", () => {
  const repositories: Readonly<Record<string, string>> = {
    picoxia: "picoxia_LLM",
    forecasting: "energy_predection_repo",
    icosnet: "SustainableSoftwareEngineering",
    "thais-mcp-server": "ModelContextProtocol_Thais_API",
    "angular-assignment-management": "yousfiFirstRepoM1miage2025",
  };
  for (const project of projects) {
    const repository = repositories[project.id];
    assert.deepEqual(project.links, repository ? [{
      label: "GitHub", href: `https://github.com/AbderahmaneYOUSFI/${repository}`,
    }] : []);
  }
});

test("lists only published projects with exact summary fields and valid path filters", () => {
  const expected = projects.filter((project) => project.published === true);
  const summaries = expected.map((project) => ({
    id: project.id, title: project.title, careerPaths: [...project.careerPaths],
  }));
  assert.deepEqual(data("list_projects"), { projects: summaries });
  for (const path of careerPaths) {
    assert.deepEqual(data("list_projects", { careerPath: path.slug }), {
      projects: summaries.filter((project) => project.careerPaths.includes(path.slug)),
    });
  }
});

test("returns explicit public detail and career path DTOs", () => {
  for (const project of projects.filter((entry) => entry.published === true)) {
    assert.deepEqual(data("get_project", { id: project.id }), { project: {
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: [...project.technologies],
      careerPaths: [...project.careerPaths],
      links: project.links.map((link) => ({ label: link.label, href: link.href })),
    } });
  }
  assert.deepEqual(data("list_career_paths"), {
    careerPaths: careerPaths.map((path) => ({ slug: path.slug, name: path.name })),
  });
});

test("missing and unpublished ids return identical structured NOT_FOUND errors", () => {
  const missing = callTool("get_project", { id: "does-not-exist" });
  assert.equal(missing.isError, true);
  assert.deepEqual(missing.structuredContent, { error: { code: "NOT_FOUND", message: "Project not found." } });
  for (const draft of projects.filter((project) => project.published !== true)) {
    assert.deepEqual(callTool("get_project", { id: draft.id }), missing);
  }
});

test("publication check excludes path-matching drafts and truthy non-booleans independently", () => {
  // Runtime-only fixtures: leave the source data and records unchanged.
  const mutable = projects as Project[];
  const before = callTool("list_projects");
  const filteredBefore = callTool("list_projects", { careerPath: "software" });
  const fixture = {
    id: "test-draft", title: "Not public", description: "Not public",
    technologies: [], careerPaths: ["software"], links: [], published: false,
    internalSecret: "must never appear",
  } as const;
  mutable.push(fixture, { ...fixture, id: "test-truthy", published: 1 as unknown as boolean });
  try {
    assert.deepEqual(callTool("list_projects"), before);
    assert.deepEqual(callTool("list_projects", { careerPath: "software" }), filteredBefore);
    for (const id of ["test-draft", "test-truthy"]) {
      assert.deepEqual(callTool("get_project", { id }), callTool("get_project", { id: "missing" }));
    }
  } finally {
    mutable.splice(-2);
  }
});

test("strictly rejects malformed arguments without coercion or property stripping", () => {
  const common = [null, [], "value", 1, true, { unexpected: true }];
  for (const name of ["list_projects", "get_project", "list_career_paths"]) {
    for (const input of common) {
      const response = callTool(name, input);
      assert.equal(response.isError, true);
      assert.equal((response.structuredContent as { error: { code: string } }).error.code, "INVALID_ARGUMENTS");
    }
  }
  for (const careerPath of [null, undefined, 42, true, [], {}, "", "invalid", "Software", " software "]) {
    assert.equal(callTool("list_projects", { careerPath }).isError, true);
  }
  for (const id of [null, undefined, 42, false, [], {}, "", "../picoxia", "Picoxia", " picoxia ", "a\n"]) {
    assert.equal(callTool("get_project", { id }).isError, true);
  }
  assert.equal(callTool("get_project", {}).isError, true);
  assert.equal(callTool("get_project", { id: "picoxia", extra: true }).isError, true);
  assert.equal(callTool("list_projects", { careerPath: "software", extra: true }).isError, true);
  assert.equal(callTool("list_career_paths", { careerPath: "software" }).isError, true);
  assert.deepEqual(callTool("write_project", {}).structuredContent, {
    error: { code: "UNKNOWN_TOOL", message: "Unknown tool." },
  });
});

test("real stdio initialization, discovery, calls, validation and EOF shutdown", { timeout: 15000 }, async (t) => {
  const child = spawn(process.execPath, [join(__dirname, "index.js")], { stdio: "pipe" });
  t.after(() => child.kill());
  let stderr = "";
  child.stderr.setEncoding("utf8").on("data", (chunk: string) => { stderr += chunk; });
  const lines = createInterface({ input: child.stdout });
  const iterator = lines[Symbol.asyncIterator]();
  let id = 0;
  async function request(method: string, params: Record<string, unknown> = {}) {
    const requestId = ++id;
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: requestId, method, params }) + "\n");
    const line = await iterator.next();
    assert.equal(line.done, false, stderr);
    const response = JSON.parse(line.value as string) as {
      jsonrpc: string; id: number; result?: Record<string, unknown>; error?: { code: number };
    };
    assert.equal(response.jsonrpc, "2.0");
    assert.equal(response.id, requestId);
    return response;
  }
  const initialized = await request("initialize", {
    protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "portfolio-test", version: "1.0.0" },
  });
  assert.deepEqual(initialized.result?.capabilities, { tools: {} });
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
  const listed = await request("tools/list");
  const tools = listed.result?.tools as Array<{
    name: string; inputSchema: { additionalProperties: boolean }; annotations: { readOnlyHint: boolean };
  }>;
  assert.deepEqual(tools.map((tool) => tool.name), ["list_projects", "get_project", "list_career_paths"]);
  assert.ok(tools.every((tool) => tool.inputSchema.additionalProperties === false && tool.annotations.readOnlyHint));
  for (const name of ["list_projects", "list_career_paths"]) {
    assert.deepEqual((await request("tools/call", { name, arguments: {} })).result, callTool(name));
  }
  for (const args of [{ id: "picoxia" }, { id: "reactis" }, { id: "missing" }, { id: null }, { id: "picoxia", extra: true }]) {
    assert.deepEqual((await request("tools/call", { name: "get_project", arguments: args })).result, callTool("get_project", args));
  }
  assert.deepEqual((await request("tools/call", {
    name: "list_projects", arguments: { careerPath: "invalid" },
  })).result, callTool("list_projects", { careerPath: "invalid" }));
  // Non-object arguments are invalid MCP envelopes, rejected by the SDK before tool dispatch.
  for (const args of [null, [], "bad", 1]) {
    assert.equal((await request("tools/call", { name: "list_projects", arguments: args })).error?.code, -32602);
  }
  assert.equal((await request("resources/list")).error?.code, -32601);
  assert.equal((await request("prompts/list")).error?.code, -32601);
  const exited = once(child, "exit");
  child.stdin.end();
  assert.deepEqual(await exited, [0, null]);
});

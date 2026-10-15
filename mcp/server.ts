import { Server, type CallToolResult, type Tool } from "@modelcontextprotocol/server";
import { careerPaths } from "../src/data/career-paths";
import { projects } from "../src/data/projects";

const pathSlugs = careerPaths.map((path) => path.slug);
const annotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const tools: Tool[] = [
  {
    name: "list_projects",
    description: "List published project ids, titles and career paths, optionally filtered by careerPath.",
    inputSchema: {
      type: "object",
      properties: { careerPath: { type: "string", enum: pathSlugs } },
      additionalProperties: false,
    },
    annotations,
  },
  {
    name: "get_project",
    description: "Get public details of a published project by stable id.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
      required: ["id"],
      additionalProperties: false,
    },
    annotations,
  },
  {
    name: "list_career_paths",
    description: "List available career path slugs and names.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations,
  },
];

function result(data: NonNullable<CallToolResult["structuredContent"]>, isError = false): CallToolResult {
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
    structuredContent: data,
    isError,
  };
}

function toolError(code: "INVALID_ARGUMENTS" | "NOT_FOUND" | "UNKNOWN_TOOL" | "INTERNAL_ERROR", message: string) {
  return result({ error: { code, message } }, true);
}

// Validate at this boundary even when invoked outside the SDK. Never coerce inputs.
export function callTool(name: string, input: unknown = {}): CallToolResult {
  if (!tools.some((tool) => tool.name === name)) {
    return toolError("UNKNOWN_TOOL", "Unknown tool.");
  }
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return toolError("INVALID_ARGUMENTS", "Expected an object with only the documented properties.");
  }
  const args = input as Record<string, unknown>;
  const allowed = name === "list_projects" ? ["careerPath"] : name === "get_project" ? ["id"] : [];
  if (Object.keys(args).some((key) => !allowed.includes(key))) {
    return toolError("INVALID_ARGUMENTS", "Unknown argument property.");
  }

  if (name === "list_projects") {
    const path = args.careerPath;
    if (Object.hasOwn(args, "careerPath") &&
        (typeof path !== "string" || !pathSlugs.some((slug) => slug === path))) {
      return toolError("INVALID_ARGUMENTS", "careerPath must be an available career path slug.");
    }
    return result({
      projects: projects
        .filter((project) => project.published === true &&
          (path === undefined || project.careerPaths.some((slug) => slug === path)))
        .map((project) => ({ id: project.id, title: project.title, careerPaths: [...project.careerPaths] })),
    });
  }

  if (name === "get_project") {
    if (typeof args.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args.id)) {
      return toolError("INVALID_ARGUMENTS", "id must be a nonempty lowercase slug.");
    }
    const project = projects.find((entry) => entry.published === true && entry.id === args.id);
    if (!project) return toolError("NOT_FOUND", "Project not found.");
    return result({ project: {
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: [...project.technologies],
      careerPaths: [...project.careerPaths],
      links: project.links.map((link) => ({ label: link.label, href: link.href })),
    } });
  }

  return result({ careerPaths: careerPaths.map((path) => ({ slug: path.slug, name: path.name })) });
}

export function createServer(): Server {
  const server = new Server({ name: "portfolio", version: "1.0.0" }, { capabilities: { tools: {} } });
  server.setRequestHandler("tools/list", async () => ({ tools }));
  server.setRequestHandler("tools/call", async (request) => {
    try {
      return callTool(request.params.name, request.params.arguments);
    } catch {
      console.error("Portfolio MCP: tool execution failed.");
      return toolError("INTERNAL_ERROR", "Tool execution failed.");
    }
  });
  server.onerror = () => console.error("Portfolio MCP: protocol error.");
  return server;
}

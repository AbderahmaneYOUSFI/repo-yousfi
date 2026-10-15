import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./server";

const handle = serveStdio(createServer, {
  onerror: () => console.error("Portfolio MCP: stdio error."),
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    void handle.close().catch(() => {
      console.error("Portfolio MCP: shutdown failed.");
      process.exitCode = 1;
    });
  });
}

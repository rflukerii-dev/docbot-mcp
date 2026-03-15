# GitHub Copilot Instructions for docbot-mcp

## Purpose
Provide workspace-specific guidance for Copilot Chat agents to work effectively in this small Node.js MCP server project.

## Project brief
- Node.js (ES modules, `type: module`) MCP server for CSV/JSON/Markdown conversion.
- Two transports: HTTP (`index.js`) and stdio (`index-stdio.js`).
- Minimal scripts (`npm start` for HTTP), no automated tests currently.
- Dependencies: `@modelcontextprotocol/sdk`, `@rflukerii/docbot`, `express`, `zod`.

## Key files
- `index.js` : main server (HTTP + Express on port 3000, MCP tool registration)
- `index-stdio.js` : stdio transport alternative
- `README.md` : most up-to-date usage, architecture and examples
- `package.json` : scripts + dependencies

## Build / test commands
- `npm install`
- `npm start` (starts production-like server on localhost:3000)
- `node index-stdio.js` (stdio transport)

> Note: no test suite exists, implement new tests in a modern style (Jest/Mocha/Node test runner) if requested.

## Architecture notes
- Each POST to `/docbot-mcp` creates a new MCP server via `createServer` and `StreamableHTTPServerTransport`.
- Tools are registered via `server.registerTool()` with Zod schema validation.
- Conversion logic primarily lives in the `@rflukerii/docbot` package and is wrapped by MCP tool handlers.

## Conventions / style
- ES modules (`import` / `export`) throughout.
- Keep payloads as text (`type: 'text'`, `content` array) in MCP responses.
- Avoid mutating shared state; each request new server context.
- For new tool additions, follow the registration pattern in `index.js`.

## Common changes
- Add tool: update `index.js` tool registry + README docs
- Transport behavior: follow patterns for `StreamableHTTPServerTransport` and stdio setup

## Gotchas
- Do not use `require()` (Esm only).
- Express v5 middleware and response flow must match existing behavior.
- Keep `content` as string arrays; avoid mixing objects in response type unless MCP spec supports.

## Example prompts
1. "Add tool `yamlToJson` in `index.js` with schema `yaml: z.string()`, converting YAML text to JSON string output."
2. "Refactor server lifecycle in `index.js` so MCP server instance is reused across requests but still isolates tool execution per request."
3. "Add basic Jest tests for `csvToJson` and `jsonToCsv` using `node index-stdio.js` or direct function exports."

## Next agent customizations
- **agent**: `create-agent docbot-mcp/dev` (focus on tool authoring and transport patches).
- **prompt**: `create-prompt docbot-mcp/add-tool` (guides on how to add tools with converters and Zod schemas).
- **hook**: `create-hook docbot-mcp/on-run-tests` (automate test command from unobtrusive mode).

---

> This file is intended as workspace bootstrap for Copilot Chat. Keep it minimal, precise, and updated when major architecture or dependency changes occur.

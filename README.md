# docbot-mcp

Bidirectional CSV ↔️ JSON ↔️ Markdown transformer exposed as an MCP (Model Context Protocol) server with HTTP transport.

## Overview

**docbot-mcp** is a Model Context Protocol server that provides tools for converting between CSV, JSON, and Markdown formats. It's built on the [Model Context Protocol](https://modelcontextprotocol.io/) and designed for deployment on serverless platforms like AWS App Runner.

## Features

- ✅ **CSV to JSON** — Parse CSV strings into JSON arrays
- ✅ **JSON to CSV** — Serialize JSON arrays to CSV format
- ✅ **CSV to Markdown** — Convert CSV to formatted Markdown tables
- ✅ **JSON to Markdown** — Convert JSON arrays to Markdown tables
- ✅ **HTTP-based** — REST API endpoint for easy integration
- ✅ **Containerized** — Ready for deployment on AWS App Runner, Docker, etc.

## Installation

```bash
npm install
```

### Requirements

- Node.js 16+ (ES modules support)
- Dependencies:
  - `@modelcontextprotocol/sdk` — MCP protocol implementation
  - `@rflukerii/docbot` — Document conversion utilities
  - `express` — HTTP server framework
  - `zod` — Input validation

## Usage

### Starting the Server

```bash
npm start
```

The server starts on `http://localhost:3000` with the MCP endpoint at `/docbot-mcp`.

### Available Tools

All tools accept input as text parameters and return formatted text responses.

#### csvToJson
Converts a CSV string to JSON format.

**Input:** `csv` (string)  
**Output:** JSON array as string

```bash
curl -X POST http://localhost:3000/docbot-mcp \
  -H "Content-Type: application/json" \
  -d '{"tool": "csvToJson", "input": {"csv": "name,age\nAlice,30"}}'
```

#### jsonToCsv
Converts a JSON array to CSV format.

**Input:** `json` (string)  
**Output:** CSV string

```bash
curl -X POST http://localhost:3000/docbot-mcp \
  -H "Content-Type: application/json" \
  -d '{"tool": "jsonToCsv", "input": {"json": "[{\"name\":\"Alice\",\"age\":30}]"}}'
```

#### csvToMarkdown
Converts a CSV string to a Markdown table.

**Input:** `csv` (string)  
**Output:** Markdown table string

#### jsonToMarkdown
Converts a JSON array to a Markdown table.

**Input:** `json` (string)  
**Output:** Markdown table string

## Architecture

### HTTP Transport

The server uses `StreamableHTTPServerTransport` instead of stdio for better compatibility with containerized environments. Each request to `/docbot-mcp` creates a new server instance, processes the MCP request, and returns the result.

```
Express Server (port 3000)
    ↓
POST /docbot-mcp endpoint
    ↓
MCP Server instance (createServer)
    ↓
StreamableHTTPServerTransport
    ↓
Tool execution (csvToJson, jsonToCsv, etc.)
    ↓
Response back to client
```

### File Structure

- `index.js` — Main HTTP server entry point (AWS App Runner compatible)
- `index-stdio.js` — Stdio transport version (for local/stdio-based clients)
- `package.json` — Dependencies and scripts

## Deployment

### AWS App Runner

The server includes a `start` script configured for AWS App Runner:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

**Steps to deploy:**

1. Push code to AWS CodeCommit, GitHub, or BitBucket
2. Create AWS App Runner service
3. Configure source as your repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. App Runner will automatically run the server on port 3000

### Docker

Example Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Development

### Switching Between Transports

- **HTTP (default)**: `node index.js` — For containerized environments
- **Stdio**: `node index-stdio.js` — For direct CLI/stdio clients

### Adding New Tools

Edit `index.js` and use the `server.registerTool()` pattern:

```javascript
server.registerTool(
  'toolName',
  {
    title: 'Display Title',
    description: 'What it does',
    inputSchema: { paramName: z.type() }
  },
  async ({ paramName }) => ({
    content: [{ type: 'text', text: 'result' }]
  })
);
```

## License

MIT

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.
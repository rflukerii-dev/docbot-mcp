#!/usr/bin/env node

// External imports
import { csvToJson, jsonToCsv, jsonToMarkdown, csvToMarkdown } from '@rflukerii/docbot'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import express from 'express';

const app = express();
app.use(express.json());

function createServer() {
  const server = new McpServer({
    name: 'docbot-mcp',
    version: '1.0.0'
  });

  server.registerTool(
    'csvToJson',
    {
      title: 'Convert CSV to JSON',
      description: 'Converts a CSV string to JSON',
      inputSchema: { csv: z.string() }
    },
    async ({ csv }) => ({
      content: [{ type: 'text', text: JSON.stringify(csvToJson(csv)) }]
    })
  );

  server.registerTool(
    'jsonToCsv',
    {
      title: 'Convert JSON to CSV',
      description: 'Converts a JSON string to CSV',
      inputSchema: { json: z.string() }
    },
    async ({ json }) => ({
      content: [{ type: 'text', text: jsonToCsv(JSON.parse(json)) }]
    })
  );

  server.registerTool(
    'csvToMarkdown',
    {
      title: 'Convert CSV to Markdown',
      description: 'Converts a CSV string to Markdown',
      inputSchema: { csv: z.string() }
    },
    async ({ csv }) => ({
      content: [{ type: 'text', text: csvToMarkdown(csv) }]
    })
  );

  server.registerTool(
    'jsonToMarkdown',
    {
      title: 'Convert JSON to Markdown',
      description: 'Converts a JSON string to Markdown',
      inputSchema: { json: z.string() }
    },
    async ({ json }) => ({
      content: [{ type: 'text', text: jsonToMarkdown(JSON.parse(json)) }]
    })
  );

  return server;
}

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.post('/docbot-mcp', async (req, res) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('docbot-mcp running on http://localhost:3000/docbot-mcp');
});
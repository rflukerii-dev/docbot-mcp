# Changelog

All notable changes to this project will be documented in this file.

## [1.0.4] - 2026-03-15
### Changed
- Move sample data into `data/` subfolder for better organization
- Remove exposed App Runner URL from server settings
- Update `.gitignore` with MCP registry ignore rules
- Add `sample_data.csv` fixture under `data/`
- Add script to sync version between package files

## [1.0.3] - 2026-03-14
### Changed
- Update HTTP MCP endpoint from `/mcp` to `/docbot-mcp` for all incoming requests
- Bump `server.json` package/service version to 1.0.3

## [1.0.2] - 2026-03-09
### Added
- Add `mcpName` to package.json for MCP registry registration
- Add `server.json` for MCP registry metadata

## [1.0.1] - 2026-03-07
### Changed
- Migrate from stdio to HTTP transport

## [1.0.0] - 2026-03-05
### Added
- Initial release
- `csvToJson` — converts CSV string to JSON array
- `jsonToCsv` — converts JSON array to CSV string
- `jsonToMarkdown` — converts JSON array to Markdown table
- `csvToMarkdown` — converts CSV string to Markdown table
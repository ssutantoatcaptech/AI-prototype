# Project Guidelines

## Design System

This project uses **Microsoft Fluent 2 Web** as the single source of truth for all UI design.

- **Figma file**: https://www.figma.com/design/mSjELbJg0DugPqSB0JwocX/Microsoft-Fluent-2-Web--MCP-
- **File key**: `mSjELbJg0DugPqSB0JwocX`

### Rules for building UI

- Always reference the Figma design system above when building or modifying any interface component
- Use the Figma MCP tools to inspect components, tokens, and styles from this file before writing code
- Match spacing, typography, colors, and component patterns from Fluent 2 — do not invent custom styles
- When in doubt about a component's appearance or behaviour, look it up in the Figma file first

### How to use Figma MCP

The Figma MCP server is configured at `http://127.0.0.1:3845/mcp`. Use it to:
- Inspect components by name (e.g. Button, Input, Card)
- Extract design tokens (colors, spacing, typography)
- Get accurate implementation details before writing code

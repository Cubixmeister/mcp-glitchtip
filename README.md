# MCP GlitchTip Server

An MCP (Model Context Protocol) server for GlitchTip error monitoring integration. This server allows AI assistants to quickly find and analyze relevant issues from your GlitchTip error monitoring.

## Use Case

When you tell an AI agent "look at GlitchTip, we have an issue with the payment component", the AI can:

1. **Get Issues List**: Fetch all current issues from GlitchTip
2. **Find Relevant Issues**: Match issues by title, error message, or component name
3. **Get Latest Event**: Retrieve the most recent event with full context (stack trace, user data, breadcrumbs)
4. **Analyze & Suggest**: Use the error context to propose solutions

## Features

- **Simple Issue Fetching**: Get list of all issues
- **Latest Event Details**: Get the most recent event for any issue with full context

## Installation

### Using npx (Recommended)

```bash
npx mcp-glitchtip
```

### Manual Installation

```bash
git clone https://github.com/coffebar/mcp-glitchtip.git
cd mcp-glitchtip
npm install
npm run build
```

## Configuration

### Environment Variables

The server requires the following environment variables:

- `GLITCHTIP_SESSION_ID` (required): Your GlitchTip session ID
- `GLITCHTIP_ORGANIZATION` (required): Organization slug
- `GLITCHTIP_BASE_URL` (optional): GlitchTip base URL (defaults to https://app.glitchtip.com)

### Getting Your Session ID

1. Log in to your GlitchTip instance
2. Open browser developer tools (F12)
3. Go to Application/Storage > Cookies
4. Find the `sessionid` cookie value
5. Copy this value for use as `GLITCHTIP_SESSION_ID`

### Claude Desktop Configuration

Add to your `claude_desktop_config.json` or `.mcp.json`:

```json
{
  "mcpServers": {
    "glitchtip": {
      "command": "npx",
      "args": ["-y", "mcp-glitchtip"],
      "env": {
        "GLITCHTIP_SESSION_ID": "your-session-id-here",
        "GLITCHTIP_ORGANIZATION": "your-org-slug",
        "GLITCHTIP_BASE_URL": "https://app.glitchtip.com"
      }
    }
  }
}
```

## Usage

### Available Tools

#### `glitchtip_issues`
Get all issues from GlitchTip.

No parameters required.

#### `glitchtip_latest_event`
Get the latest event for a specific issue.

Parameters:
- `issueId`: The issue ID to get the latest event for

### Available Resources

#### `glitchtip://issues`
All issues from GlitchTip error monitoring.

## Example Usage

```
User: "Look at GlitchTip, we have an issue with the payment component"

AI Agent:
1. Calls glitchtip_issues to get all current issues
2. Finds issues related to "payment" in the title or description
3. Calls glitchtip_latest_event for the relevant issue
4. Analyzes the error context and suggests solutions
```

## Error Handling

The server includes comprehensive error handling for:

- **Connection Errors**: Network issues or invalid URLs
- **Authentication Errors**: Invalid session IDs or expired sessions
- **API Errors**: GlitchTip API responses and rate limiting
- **Validation Errors**: Invalid parameters or missing configuration

## Development

### Setup
```bash
git clone https://github.com/coffebar/mcp-glitchtip.git
cd mcp-glitchtip
npm install
```

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

### Testing with MCP Inspector
```bash
npm run inspector
```

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions:
- GitHub Issues: https://github.com/coffebar/mcp-glitchtip/issues
- Documentation: https://github.com/coffebar/mcp-glitchtip#readme
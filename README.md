# MCP GlitchTip

An MCP (Model Context Protocol) server that integrates GlitchTip error monitoring with AI assistants like Claude. This allows AI to analyze and help resolve errors from your GlitchTip instance.

## What it does

This MCP server enables AI assistants to:

- Fetch and analyze current issues from your GlitchTip instance
- Get detailed error context including stack traces, user data, and breadcrumbs
- Help debug and suggest solutions based on error patterns

### Example Use Case

```
User: "Check GlitchTip for any payment-related errors"

AI Assistant:
- Fetches all unresolved issues from GlitchTip
- Identifies payment component errors
- Analyzes stack traces and error patterns
- Suggests specific fixes based on the error context
```

## Quick Start

### 1. Get Your GlitchTip Credentials

You'll need:

- **Authentication**: Either an API token (recommended) or Session ID Cookie
- **Organization Slug**: Your organization identifier in GlitchTip
- **Base URL** (optional): Your GlitchTip instance URL if self-hosted

#### Authentication Options

**Option 1: API Token (Recommended)**

1. Log in to your GlitchTip instance
2. Go to /profile/auth-tokens
3. Create a new API token with appropriate permissions
4. Copy the token for use as `GLITCHTIP_TOKEN`

**Option 2: Session ID**

1. Log in to your GlitchTip instance
2. Open browser developer tools (F12)
3. Go to Application/Storage > Cookies
4. Find the `sessionid` cookie value
5. Copy this value for use as `GLITCHTIP_SESSION_ID`

### 2. Configure Your Project

Create a `.mcp.json` file in your project root:

```json
{
  "mcpServers": {
    "glitchtip": {
      "command": "npx",
      "args": ["-y", "mcp-glitchtip"],
      "env": {
        "GLITCHTIP_TOKEN": "your-api-token-here",
        "GLITCHTIP_ORGANIZATION": "your-org-slug",
        "GLITCHTIP_BASE_URL": "https://app.glitchtip.com"
      }
    }
  }
}
```

**Note**: Add `.mcp.json` to your `.gitignore` to keep credentials secure:

```bash
echo ".mcp.json" >> .gitignore
```

### 3. Open Your Project in Claude Desktop

When you open your project folder in Claude Desktop, it will automatically detect the `.mcp.json` configuration and connect to your GlitchTip instance.

## Configuration Options

| Environment Variable     | Required | Description                          | Default                     |
| ------------------------ | -------- | ------------------------------------ | --------------------------- |
| `GLITCHTIP_TOKEN`        | Yes*     | Your GlitchTip API token (recommended) | -                           |
| `GLITCHTIP_SESSION_ID`   | Yes*     | Your GlitchTip session cookie        | -                           |
| `GLITCHTIP_ORGANIZATION` | Yes      | Organization slug from GlitchTip URL | -                           |
| `GLITCHTIP_BASE_URL`     | No       | GlitchTip instance URL               | `https://app.glitchtip.com` |

*Either `GLITCHTIP_TOKEN` or `GLITCHTIP_SESSION_ID` is required. If both are provided, `GLITCHTIP_TOKEN` takes priority.

### Self-Hosted GlitchTip

If you're using a self-hosted GlitchTip instance, update the `GLITCHTIP_BASE_URL`:

```json
"GLITCHTIP_BASE_URL": "https://glitchtip.your-domain.com"
```

## Available Tools

### `glitchtip_issues`

Fetches all issues from GlitchTip (unresolved by default).

**Usage**: "Show me all GlitchTip errors"

### `glitchtip_latest_event`

Gets the most recent event for a specific issue with full error context.

**Parameters**:

- `issueId`: The issue ID to get details for

**Usage**: "Get details for GlitchTip issue #123"

## Available Resources

### `glitchtip://issues`

A resource endpoint that provides all current issues in JSON format.

## Example Workflows

### Debugging a Production Error

```
User: "Check GlitchTip for recent 500 errors"

AI: [Fetches issues] I found 3 recent 500 errors:
1. DatabaseConnectionError in /api/users
2. TimeoutError in payment processing
3. ValidationError in checkout flow

User: "Show me details about the payment timeout"

AI: [Gets latest event] The TimeoutError occurs when...
[Provides stack trace analysis and suggested fixes]
```

### Monitoring Error Trends

```
User: "What are the most frequent errors in GlitchTip?"

AI: [Analyzes issue counts] The top errors by frequency are:
1. CORS policy errors (145 occurrences)
2. Missing authentication token (89 occurrences)
3. Rate limit exceeded (67 occurrences)
```

## Development

### Building from Source

```bash
git clone https://github.com/coffebar/mcp-glitchtip.git
cd mcp-glitchtip
npm install
npm run build
```

### Development Mode

```bash
npm run watch  # Auto-rebuild on changes
```

### Testing with MCP Inspector

```bash
npm run inspector
```

Set the required environment variables before running the inspector:

```bash
export GLITCHTIP_TOKEN="your-api-token"
# OR export GLITCHTIP_SESSION_ID="your-session-id"
export GLITCHTIP_ORGANIZATION="your-org"
npm run inspector
```

## Troubleshooting

### Authentication Errors

If you see "Authentication failed. Check your token or session ID":

1. If using a token: Verify it's valid and has appropriate permissions
2. If using a session ID: Your session may have expired - get a new session ID from GlitchTip
3. Verify you're using the correct organization slug
4. Check if your GlitchTip instance requires additional authentication headers

### Connection Errors

If you see "Failed to connect to GlitchTip":

1. Verify your `GLITCHTIP_BASE_URL` is correct
2. Check if you're behind a proxy or firewall
3. Ensure your GlitchTip instance is accessible from your network

### No Issues Found

If the tool returns empty results:

1. Verify there are actually issues in your GlitchTip project
2. Check if your organization slug is correct
3. Ensure your session has permission to view the issues

## Security Notes

- **Never commit `.mcp.json` to version control** - it contains sensitive credentials
- For team usage, each developer should use their own API token or session ID

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/coffebar/mcp-glitchtip/issues)
- **Documentation**: [GitHub README](https://github.com/coffebar/mcp-glitchtip#readme)
- **GlitchTip Docs**: [GlitchTip Documentation](https://glitchtip.com/documentation)
# MCP Server Setup Guide

## Current MCP Servers (Configured Globally in Cursor)

### 1. Sanity CMS
- **Status:** ✅ Active
- **Tools:** Document CRUD, queries, releases, datasets, semantic search
- **Config:** Already configured in Cursor settings

### 2. HubSpot Dev
- **Status:** ✅ Active
- **Tools:** Project management, CLI operations, CMS functions, docs
- **Config:** Already configured in Cursor settings

### 3. TailwindCSS
- **Status:** ✅ Active
- **Tools:** Utilities, colors, config guides, CSS conversion
- **Config:** Already configured in Cursor settings

---

## How to Add Figma MCP Server

### Step 1: Get Figma Access Token

1. Go to: https://www.figma.com/developers/api#access-tokens
2. Click "Get personal access token"
3. Copy the token (starts with `figd_...`)

### Step 2: Add to Cursor Settings

Open Cursor Settings (Cmd+,) and add to `mcpServers`:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "figd_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

### Step 3: Restart Cursor

Close and reopen Cursor to load the new MCP server.

### Step 4: Verify

After restart, you should see Figma MCP tools available like:
- `mcp_figma_get_file`
- `mcp_figma_get_components`
- `mcp_figma_get_styles`

---

## Using Figma MCP

Once configured, you can extract design tokens from your Figma files:

### Get Design Tokens
```typescript
// Get file with styles
const figmaData = await mcp_figma_get_file({
  fileKey: "YOUR_FILE_KEY", // From Figma URL
  includeStyles: true
});

// Extract colors
const colors = figmaData.styles.fills;

// Extract typography
const textStyles = figmaData.styles.text;

// Extract spacing
const spacing = figmaData.styles.effects;
```

### Example: Marion's Design File

If Marion has a Figma file with the design system, you can:

1. Get the file key from URL: `https://www.figma.com/file/ABCD1234/Design-System`
   - File key: `ABCD1234`

2. Extract all design tokens:
```typescript
const design = await mcp_figma_get_file({
  fileKey: "ABCD1234",
  includeStyles: true
});
```

3. Generate Tailwind config from Figma:
```typescript
// Colors from Figma → Tailwind
const colors = {
  primary: design.styles.fills.find(f => f.name === "Primary").color,
  secondary: design.styles.fills.find(f => f.name === "Secondary").color,
};
```

---

## Other Useful MCP Servers

### GitHub (for repository management)
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_TOKEN"
    }
  }
}
```

### Filesystem (access files outside workspace)
```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/Users/j.wild/Documents",
      "/Users/j.wild/Downloads"
    ]
  }
}
```

---

## Benefits of Global MCP Setup

✅ **Available in all projects** - No per-project configuration  
✅ **Consistent tools** - Same capabilities everywhere  
✅ **Easy maintenance** - Update once, works everywhere  
✅ **Secure** - Tokens stored in Cursor settings, not in code  
✅ **Cross-project** - Access Figma/GitHub/etc from any workspace

---

## Security Best Practices

1. **Never commit tokens** to git repositories
2. **Store tokens** in Cursor settings only
3. **Use read-only tokens** when possible
4. **Rotate tokens** regularly
5. **Limit scope** of API tokens to minimum required

---

## Troubleshooting

### MCP Server Not Loading

1. Check Cursor settings syntax (valid JSON)
2. Restart Cursor completely
3. Check terminal for MCP server errors
4. Verify token is valid and not expired

### Token Issues

- **Figma:** Token must start with `figd_`
- **GitHub:** Token must start with `ghp_` or `github_pat_`
- **Expiration:** Check if token has expired

### Command Not Found

If using direct commands instead of `npx`:
```bash
# Install globally first
npm install -g @modelcontextprotocol/server-figma

# Then use command name instead of npx
{
  "command": "mcp-server-figma"
}
```

---

## Next Steps

1. ✅ Get Figma access token
2. ✅ Add Figma MCP to Cursor settings
3. ✅ Restart Cursor
4. ✅ Extract Marion's design tokens from Figma
5. ✅ Generate Tailwind config from Figma styles

---

**Last Updated:** October 30, 2025  
**Project:** 3lectrify Platform  
**Maintained by:** Development Team




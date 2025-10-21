# 3lectrify Platform

Modern multi-site platform built with Next.js 15 + Sanity CMS.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Git

### Installation
```bash
# Install dependencies
pnpm install

# Start all apps in development mode
pnpm dev
```

### Development Servers
- **Next.js (3lectrify)**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 📁 Project Structure

```
3lectrify-platform/
├── apps/
│   ├── 3lectrify/       # 3lectrify website (Next.js 15)
│   ├── studio/          # Sanity Studio (shared CMS)
│   └── heatscope/       # Coming soon
├── packages/
│   ├── ui/              # Shared React components
│   ├── sanity/          # Shared Sanity utilities
│   └── animations/      # Shared GSAP/Lenis code
└── docs/                # Documentation
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5.7
- **Styling**: Tailwind CSS 4, CSS Modules
- **Animation**: GSAP 3.13, Lenis 1.3
- **CMS**: Sanity
- **Monorepo**: Turborepo + pnpm
- **Deployment**: Vercel
- **Version**: 1.0.0

## 📝 Available Commands

```bash
# Development
pnpm dev          # Start all apps
pnpm dev --filter=3lectrify  # Start only Next.js
pnpm dev --filter=studio     # Start only Sanity

# Build
pnpm build        # Build all apps
pnpm lint         # Lint all apps

# Sanity
cd apps/studio
pnpm sanity manage    # Open Sanity dashboard
pnpm sanity deploy    # Deploy Studio
```

## 🔑 Environment Variables

Create `apps/3lectrify/.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="iedths1l"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-token-here"
```

## 📚 Documentation

- [Setup Instructions](/Users/j.wild/Projects/SETUP_INSTRUCTIONS.md)
- [Migration Plan](/Users/j.wild/Projects/MIGRATION_PLAN.md)
- [Tech Stack](/Users/j.wild/Projects/TECH_STACK.md)
- [Quick Start](/Users/j.wild/Projects/QUICK_START.md)

## 🎯 Migration Status

Migrating from HubSpot CMS:
- [x] Monorepo setup
- [x] Sanity Studio initialized
- [x] Next.js app created
- [x] Development environment ready
- [ ] Design system ported
- [ ] Components migrated (0/17)
- [ ] Content migrated
- [ ] Production deployment

## 🤖 Cursor Integration

This project has Cursor MCP integration for Sanity:
- Query Sanity content directly in conversations
- Create and modify schemas with Claude
- Explore content structure

Config location: `.cursor/mcp.json`

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
vercel link

# Deploy
git push origin main  # Auto-deploys to Vercel
```

## 📖 Learn More

- **Next.js**: https://nextjs.org/docs
- **Sanity**: https://www.sanity.io/docs
- **Tailwind**: https://tailwindcss.com/docs
- **GSAP**: https://gsap.com/docs/

## 🐛 Troubleshooting

### Ports in use
```bash
lsof -ti:3000 | xargs kill -9  # Kill Next.js
lsof -ti:3333 | xargs kill -9  # Kill Sanity
```

### Clean install
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Sanity token issues
1. Run `cd apps/studio && pnpm sanity manage`
2. Go to API → Tokens
3. Regenerate token
4. Update `.env.local`

---

## 🚀 Deployment

### Quick Deploy (15 minutes)
```bash
# 1. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/3lectrify-platform.git
git push -u origin main

# 2. Deploy to Vercel
# Go to https://vercel.com/new
# Import from GitHub → Select 3lectrify-platform
# Build Command: pnpm build
# Output Directory: apps/3lectrify/.next

# 3. Add environment variables in Vercel:
# NEXT_PUBLIC_SANITY_PROJECT_ID
# NEXT_PUBLIC_SANITY_DATASET
# SANITY_API_TOKEN
```

### Documentation
- **Quick Start**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 15-minute guide
- **Full Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete manual
- **Setup Status**: [DEPLOYMENT_SETUP_COMPLETE.md](./DEPLOYMENT_SETUP_COMPLETE.md)

### Versioning
- **Current Version**: 1.0.0
- **Strategy**: Semantic Versioning (SemVer)
- **Bump Version**: `npm version [patch|minor|major]`
- **Create Tag**: `git tag -a v1.0.0 -m "Release v1.0.0"`

---

**Project ID**: iedths1l  
**Dataset**: production  
**Version**: 1.0.0  
**Created**: October 2025

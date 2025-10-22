# 🚀 Deployment Guide - 3lectrify Platform

## 📋 Table of Contents

1. [GitHub Setup](#github-setup)
2. [Vercel Deployment](#vercel-deployment)
3. [Environment Variables](#environment-variables)
4. [Versioning Strategy](#versioning-strategy)
5. [Deployment Workflow](#deployment-workflow)
6. [Rollback Procedures](#rollback-procedures)

---

## 🔧 GitHub Setup

### **Step 1: Create GitHub Repository**

1. **Go to GitHub** → https://github.com/new
2. **Repository name:** `3lectrify-platform`
3. **Visibility:** Private (recommended) or Public
4. **DON'T** initialize with README (we already have one)
5. **Click "Create repository"**

### **Step 2: Connect Local Repository**

```bash
cd /Users/j.wild/Projects/3lectrify-platform

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/3lectrify-platform.git

# Verify remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/3lectrify-platform.git (fetch)
# origin  https://github.com/YOUR_USERNAME/3lectrify-platform.git (push)
```

### **Step 3: Initial Commit**

```bash
# Stage all changes
git add .

# Create initial commit
git commit -m "feat: initial project setup with Sanity + Next.js monorepo

- Monorepo structure with Turborepo
- Next.js 15 frontend with App Router
- Sanity Studio CMS
- Design system from Figma
- Components: Hero, FeatureCards, TextImage, SimpleTextImage, Stats, CTA, FeatureShowcase
- Focal point support for images
- Responsive design with mobile-first approach
- TypeScript + Tailwind CSS
- GSAP animations

Version: 1.0.0"

# Push to GitHub
git push -u origin main
```

---

## 🌐 Vercel Deployment

### **Step 1: Install Vercel CLI (Optional but Recommended)**

```bash
# Install globally
npm install -g vercel

# Login
vercel login
```

### **Step 2: Deploy via Vercel Dashboard (Recommended for First Deployment)**

1. **Go to Vercel** → https://vercel.com/new
2. **Click "Import Project"**
3. **Import from GitHub:**
   - Connect GitHub account if not already
   - Search for `3lectrify-platform`
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `pnpm build`
   - **Install Command:** `pnpm install`
   - **Output Directory:** `apps/3lectrify/.next`

5. **Environment Variables** (see below)

6. **Click "Deploy"**

### **Step 3: Configure Vercel Settings**

After first deployment:

1. **Go to Project Settings**
2. **General:**
   - Node.js Version: `20.x`
   - Install Command: `pnpm install`
   - Build Command: `pnpm build`
   - Output Directory: `apps/3lectrify/.next`

3. **Git:**
   - Production Branch: `main`
   - Enable "Automatically deploy to production"
   - Enable "Preview deployments" for all branches

4. **Domains:**
   - Add your custom domain (e.g., `3lectrify.de`)
   - Vercel will provide SSL certificate automatically

---

## 🔐 Environment Variables

### **Required Environment Variables**

Add these in **Vercel Project Settings** → **Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `SANITY_API_TOKEN` | Your Sanity API token (read/write) | Production, Preview, Development |

### **How to Get Sanity Credentials:**

1. **Project ID:**
   ```bash
   # In your project
   cat apps/studio/sanity.config.ts | grep projectId
   ```

2. **API Token:**
   - Go to https://sanity.io/manage
   - Select your project
   - Go to "API" → "Tokens"
   - Click "Add API token"
   - Name: `Vercel Production`
   - Permissions: `Editor` (or `Read + Write`)
   - Copy the token (you can only see it once!)

3. **Add to Vercel:**
   - Project Settings → Environment Variables
   - Add each variable
   - Select environments: Production, Preview, Development
   - Click "Save"

### **Local Development (.env.local)**

Create `.env.local` in `/apps/3lectrify/`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

**Note:** `.env.local` is in `.gitignore` - never commit secrets!

---

## 📦 Versioning Strategy

### **Semantic Versioning (SemVer)**

We use **Semantic Versioning**: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.x.x): Breaking changes, major redesigns
- **MINOR** (x.1.x): New features, new components
- **PATCH** (x.x.1): Bug fixes, small improvements

**Current Version:** `1.0.0`

### **Version Bump Guide**

| Change | Version Example | When to Use |
|--------|----------------|-------------|
| Bug fix | 1.0.0 → 1.0.1 | Fix broken link, typo, style bug |
| New component | 1.0.0 → 1.1.0 | Add new module, new feature |
| Breaking change | 1.0.0 → 2.0.0 | Redesign, architecture change |

### **How to Update Version**

```bash
# Update package.json version
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# Or manually edit package.json
```

### **Git Tags for Releases**

```bash
# After version bump, create a tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0

# Push all tags
git push --tags
```

---

## 🔄 Deployment Workflow

### **Development Workflow**

```bash
# 1. Create feature branch
git checkout -b feature/add-contact-form

# 2. Make changes
# ... code, test, iterate ...

# 3. Commit changes
git add .
git commit -m "feat: add contact form component"

# 4. Push to GitHub
git push origin feature/add-contact-form

# 5. Vercel automatically creates preview deployment
# → Check preview URL in GitHub PR

# 6. Merge to main
# → Vercel automatically deploys to production
```

### **Automatic Deployments**

| Branch | Deployment Type | URL |
|--------|----------------|-----|
| `main` | **Production** | https://3lectrify.vercel.app |
| Feature branches | **Preview** | https://3lectrify-git-feature-xxx.vercel.app |
| Pull Requests | **Preview** | Unique preview URL per PR |

### **Manual Deployment (via CLI)**

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🔙 Rollback Procedures

### **Method 1: Revert via Vercel Dashboard**

1. **Go to Vercel Dashboard**
2. **Select Project** → **Deployments**
3. **Find the last working deployment**
4. **Click "⋮"** → **"Promote to Production"**
5. **Confirm** ✅

**Result:** Instant rollback to previous version (< 1 minute)

### **Method 2: Git Revert**

```bash
# Find the commit to revert
git log --oneline

# Revert the bad commit
git revert <commit-hash>

# Push to GitHub
git push origin main

# Vercel automatically deploys the reverted version
```

### **Method 3: Redeploy Specific Commit**

```bash
# Checkout specific commit
git checkout <good-commit-hash>

# Force push to main (use carefully!)
git push origin HEAD:main --force

# Vercel redeploys
```

---

## 📊 Monitoring & Analytics

### **Vercel Analytics**

1. **Enable in Vercel Dashboard:**
   - Project Settings → Analytics
   - Click "Enable"

2. **Add to Next.js:**
   ```bash
   pnpm add @vercel/analytics
   ```

3. **Update `apps/3lectrify/app/layout.tsx`:**
   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### **Error Monitoring (Optional)**

- **Sentry:** https://sentry.io
- **LogRocket:** https://logrocket.com

---

## 🧪 Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass (`pnpm test`)
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No TypeScript errors (`pnpm lint`)
- [ ] Environment variables set in Vercel
- [ ] Sanity Studio accessible
- [ ] Content published in Sanity
- [ ] Images have focal points set
- [ ] Mobile responsive design tested
- [ ] Browser compatibility checked
- [ ] Performance audit run (Lighthouse)

---

## 🔗 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Sanity Studio:** https://3lectrify.sanity.studio
- **GitHub Repo:** (to be added after setup)
- **Production Site:** (to be added after deployment)

---

## 🆘 Troubleshooting

### **Build Fails on Vercel**

**Check:**
1. Environment variables are set correctly
2. Node version matches (`20.x`)
3. Build command is `pnpm build`
4. Output directory is `apps/3lectrify/.next`

### **Images Not Loading**

**Check:**
1. `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
2. Images are published in Sanity (not just drafts)
3. Sanity dataset is `production`

### **404 on Deployment**

**Check:**
1. Output directory is correct
2. Build completed successfully
3. No errors in deployment logs

---

## ✅ Post-Deployment

After first successful deployment:

1. **Test Production URL**
2. **Add Custom Domain** (if applicable)
3. **Enable Analytics**
4. **Set up Monitoring**
5. **Update Documentation** with production URLs
6. **Notify Team** 🎉

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-21




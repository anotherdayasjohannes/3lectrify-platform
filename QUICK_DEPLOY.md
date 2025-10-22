# ⚡ Quick Deploy - TL;DR

**Get your site live in 15 minutes!**

---

## 🚀 Quick Start

### **1. GitHub (5 minutes)**

```bash
# Create repo on GitHub: https://github.com/new
# Name: 3lectrify-platform

# Connect & push
git remote add origin https://github.com/YOUR_USERNAME/3lectrify-platform.git
git add .
git commit -m "feat: initial deployment v1.0.0"
git push -u origin main
```

### **2. Vercel (5 minutes)**

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select `3lectrify-platform` from GitHub
4. **Framework:** Other
5. **Build Command:** `pnpm build`
6. **Output Directory:** `apps/3lectrify/.next`
7. Click "Deploy"

### **3. Environment Variables (5 minutes)**

In Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = your_api_token
```

Get Sanity token: https://sanity.io/manage → API → Tokens

**Done!** ✅

---

## 🔄 Continuous Deployment

**Automatic** from now on:

- Push to `main` → Deploys to production
- Push to any branch → Creates preview deployment
- Open PR → Preview URL in PR comments

---

## 📦 Versioning

```bash
# Bug fix
npm version patch  # 1.0.0 → 1.0.1

# New feature
npm version minor  # 1.0.0 → 1.1.0

# Breaking change
npm version major  # 1.0.0 → 2.0.0

# Tag & push
git push --tags
```

---

## 🔙 Rollback

**Option 1:** Vercel Dashboard → Deployments → Previous deployment → Promote

**Option 2:**
```bash
git revert HEAD
git push
```

---

## ✅ Checklist

- [ ] GitHub repo created
- [ ] Code pushed to `main`
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] Production URL works
- [ ] Custom domain added (optional)

---

**Full Guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Version:** 1.0.0




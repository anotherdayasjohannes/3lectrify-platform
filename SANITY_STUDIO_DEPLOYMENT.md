# 🚀 Sanity Studio Deployment Guide

How to deploy your Studio with live preview to Sanity's hosted platform.

---

## 📋 What You're Deploying

Your updated Sanity Studio with:
- ✅ Presentation Tool (live preview)
- ✅ Smart URL detection (local vs. production)
- ✅ Custom preview URL resolver

---

## 🏗️ How It Works

The Studio now **automatically detects** where it's running:

```javascript
// When running locally (localhost)
Preview URL: http://localhost:3000

// When deployed on Sanity hosting
Preview URL: https://3lectrify.com
```

No manual configuration needed! 🎉

---

## 🚀 Deploy to Sanity Hosting

### **1. Build and Deploy Studio**

From the `apps/studio` directory:

```bash
cd apps/studio
npm run deploy
```

This will:
1. Build your Studio
2. Upload it to Sanity hosting
3. Give you a URL like: `https://3lectrify.sanity.studio`

---

### **2. Add Token to Vercel**

For preview to work on **production**, add the token to Vercel:

1. **Go to Vercel Dashboard:**
   - Open: https://vercel.com
   - Select your **3lectrify** project

2. **Add Environment Variable:**
   - Go to: **Settings** → **Environment Variables**
   - Click **"Add New"**
   
   **Variable:**
   ```
   Name: SANITY_API_READ_TOKEN
   Value: skqlOoTlLWsCXznDzoGifCBQ2oAB2aHKXf0AUBKiotWxo5w67ErqgXfLF5dcamAPZ90uHIkoBjgwE7U1UrAXVrR9ArMSBC8T1mqpx7iYJuDMDIQ1Bm5vi0FCN9QN1sLkiGtVgSxINQvAJWHYfXnOrJcHn7jJQ6Ei7JfJnEUVTi5mfNWMkp90
   ```
   
   - **Apply to:** All environments (Production, Preview, Development)
   - Click **"Save"**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"Redeploy"** on latest deployment
   - Or push a new commit to trigger deployment

---

## ✅ **Testing Remote Preview**

### **1. Open Hosted Studio**

Visit your deployed Studio:
```
https://3lectrify.sanity.studio
```

### **2. Click "Presentation" Tab**

Should work exactly like locally!

### **3. Make a Change**

Edit any content and watch it update in the preview (now showing your live site: `https://3lectrify.com`)

---

## 🎯 **What You Should See**

### **Local Development (localhost)**

```
┌──────────────────────────────────────────────┐
│  http://localhost:3333 (Studio)              │
├─────────────────┬────────────────────────────┤
│   Editor        │    Preview                 │
│   (Sanity)      │    http://localhost:3000   │
└─────────────────┴────────────────────────────┘
```

### **Production (Deployed)**

```
┌──────────────────────────────────────────────┐
│  https://3lectrify.sanity.studio              │
├─────────────────┬────────────────────────────┤
│   Editor        │    Preview                 │
│   (Sanity)      │    https://3lectrify.com   │
└─────────────────┴────────────────────────────┘
```

---

## 🔧 **Advanced: Custom Preview URL**

If you want to use a **different preview URL** (e.g., staging environment), set this in Sanity Studio settings:

### **Option 1: Environment Variable**

Create `apps/studio/.env` (for build-time):

```bash
SANITY_STUDIO_PREVIEW_URL=https://staging.3lectrify.com
```

### **Option 2: Sanity Dashboard**

1. Go to: https://www.sanity.io/manage
2. Select your project: **3lectrify Platform**
3. Go to **Settings** → **Environment Variables**
4. Add: `SANITY_STUDIO_PREVIEW_URL`
5. Redeploy Studio: `npm run deploy`

---

## 🐛 **Troubleshooting Remote Preview**

### Preview iframe is blank
- ✅ Check Vercel has `SANITY_API_READ_TOKEN` set
- ✅ Redeploy Vercel after adding token
- ✅ Check browser console for CORS errors

### "Invalid secret" error
- ✅ Token must be in Vercel environment variables
- ✅ Token must have **Viewer** permissions in Sanity
- ✅ Try regenerating the token

### Changes not appearing
- ✅ Check if you're editing draft vs. published
- ✅ Clear browser cache
- ✅ Refresh the preview iframe
- ✅ Check Vercel deployment logs for errors

### Preview shows wrong URL
- ✅ Check `SANITY_STUDIO_PREVIEW_URL` if set
- ✅ Redeploy Studio after config changes
- ✅ Clear Studio cache (hard refresh: Cmd+Shift+R)

---

## 📦 **Deployment Checklist**

Before deploying, ensure:

- [ ] **Local preview works** (test first!)
- [ ] **Token is in Vercel** (environment variables)
- [ ] **Studio builds without errors** (`npm run build`)
- [ ] **All changes committed** to Git
- [ ] **Vercel is deployed** with latest code

---

## 🚀 **Quick Deploy Commands**

```bash
# 1. Deploy Studio to Sanity hosting
cd apps/studio
npm run deploy

# 2. Deploy Next.js to Vercel
cd ../3lectrify
git add .
git commit -m "feat: add live preview support"
git push origin main

# Vercel will automatically deploy!
```

---

## 🎉 **After Deployment**

You can now:
- ✅ Edit content from **anywhere** (hosted Studio)
- ✅ Preview changes **instantly** on production
- ✅ Share preview with team members
- ✅ Work on drafts without affecting live site

**No local dev servers needed!** 🎊

---

## 💡 **Pro Tips**

1. **Bookmark your Studio URL** for quick access
2. **Share Studio URL with content editors** (they need Sanity account)
3. **Use Production Preview** to see changes before publishing
4. **Set up staging environment** for testing big changes

---

## 🔐 **Security Notes**

- ✅ Preview token is **server-side only** (never exposed to browser)
- ✅ Draft content **only visible** to authenticated editors
- ✅ Production site always shows **published content**
- ✅ Preview mode is **session-based** (expires automatically)

---

**Ready to deploy?** Run `npm run deploy` from `apps/studio`! 🚀


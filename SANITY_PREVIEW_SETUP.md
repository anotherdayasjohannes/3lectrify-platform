# 🎬 Sanity Live Preview Setup

This guide explains how to use **Sanity Presentation Tool** for live content preview on your Next.js frontend.

---

## 📋 Overview

The Presentation Tool provides a **split-screen view** in Sanity Studio:
- **Left side**: Content editor
- **Right side**: Live preview of your website
- **Changes appear instantly** as you type! ⚡

---

## 🔧 Environment Variables

Add this to your `.env.local` file:

```bash
# Sanity Configuration (Already set)
NEXT_PUBLIC_SANITY_PROJECT_ID=iedths1l
NEXT_PUBLIC_SANITY_DATASET=production

# Preview/Draft Mode Token
# Create a token with "Viewer" permissions at:
# https://www.sanity.io/manage/personal/tokens
SANITY_API_READ_TOKEN=your_read_token_here
```

### Creating a Read Token:

1. Go to: https://www.sanity.io/manage/personal/tokens
2. Click **"Add API token"**
3. Give it a name: `3lectrify Preview Token`
4. Set permissions: **Viewer** (read-only)
5. Click **"Add token"**
6. Copy the token and add it to `.env.local`

**⚠️ Important:** Also add this to your **Vercel Environment Variables** for preview to work on deployed environments!

---

## 🚀 How to Use

### 1. Start Your Development Servers

**Terminal 1 - Next.js Frontend:**
```bash
cd apps/3lectrify
npm run dev
```

**Terminal 2 - Sanity Studio:**
```bash
cd apps/studio
npm run dev
```

### 2. Open Sanity Studio

Visit: http://localhost:3333 (or your configured Studio URL)

### 3. Use Presentation Tool

1. In the top navigation, you'll see a new **"Presentation"** tab
2. Click it to open the split-screen view
3. Select any page or document to edit
4. Make changes → **See them instantly** in the preview! 🎉

### 4. Exit Preview Mode

When viewing the live site in preview mode, visit:
```
http://localhost:3000/api/disable-draft
```

This exits draft mode and shows published content again.

---

## 🏗️ Architecture

### Components:

1. **`/api/draft/route.ts`**
   - Enables Next.js Draft Mode
   - Validates preview requests from Sanity
   - Called by Presentation Tool

2. **`/api/disable-draft/route.ts`**
   - Disables Draft Mode
   - Returns to published content

3. **`packages/sanity/lib/client.ts`**
   - `client` - For published content (uses CDN)
   - `clientWithToken` - For draft content (no CDN)
   - `getClient(isDraftMode)` - Helper to get the right client

4. **`apps/studio/sanity.config.ts`**
   - Configured with `presentationTool`
   - Points to `/api/draft` endpoint

### Data Flow:

```
Sanity Studio (Edit content)
    ↓
Presentation Tool (Click preview)
    ↓
/api/draft?slug=/about (Validate & enable draft mode)
    ↓
Next.js Page (Fetch with clientWithToken)
    ↓
Render draft content in iframe
```

---

## 🔐 Security

- **Preview tokens** have read-only access
- **Draft mode** is session-based (stored in cookies)
- **Validation** happens via `@sanity/preview-url-secret`
- **No public exposure** of unpublished content

---

## 🎨 Customizing Preview URLs

By default, preview URLs follow your slug structure:
- Homepage: `/`
- About page: `/about`
- Contact: `/kontakt`

To customize how Sanity generates preview URLs for specific document types, update `presentationTool` config in `sanity.config.ts`:

```typescript
presentationTool({
  previewUrl: {
    previewMode: {
      enable: '/api/draft',
    },
    // Custom URL resolver
    resolve: (doc) => {
      if (doc._type === 'page') {
        return `/${doc.slug?.current || ''}`;
      }
      if (doc._type === 'legalPage') {
        return `/${doc.slug?.current}`;
      }
      return '/';
    },
  },
}),
```

---

## 🐛 Troubleshooting

### Preview shows published content, not drafts:
- Check `SANITY_API_READ_TOKEN` is set in `.env.local`
- Verify token has **Viewer** permissions
- Restart Next.js dev server after adding env vars

### "Invalid secret" error:
- Ensure `/api/draft/route.ts` exists
- Check `validatePreviewUrl` is imported correctly
- Verify your Sanity project ID matches

### Changes not appearing:
- Check both dev servers are running
- Try refreshing the preview iframe
- Check browser console for errors

### Preview works locally but not on Vercel:
- Add `SANITY_API_READ_TOKEN` to Vercel environment variables
- Redeploy after adding the variable

---

## 🎯 Next Steps

1. ✅ Set up `SANITY_API_READ_TOKEN`
2. ✅ Start both dev servers
3. ✅ Open Presentation Tool in Sanity Studio
4. ✅ Edit content and see live changes!
5. 🎨 Customize preview URLs if needed
6. 🚀 Deploy to production (see below)

---

## 🌐 Using Preview on Remote Sanity Studio

**Good news!** Your Studio is now configured to work both **locally and remotely**!

### **Automatic URL Detection:**
- **Local Studio** (localhost:3333) → Previews **localhost:3000**
- **Deployed Studio** (*.sanity.studio) → Previews **3lectrify.com**

### **To Enable Remote Preview:**

1. **Add Token to Vercel:**
   ```
   Go to: Vercel Dashboard → Settings → Environment Variables
   Add: SANITY_API_READ_TOKEN
   Value: [your token]
   Apply to: All environments
   ```

2. **Deploy Studio:**
   ```bash
   cd apps/studio
   npm run deploy
   ```

3. **Test Remote Preview:**
   - Visit: `https://3lectrify.sanity.studio`
   - Click "Presentation" tab
   - Edit content → See changes on live site!

**📖 Full deployment guide:** See `SANITY_STUDIO_DEPLOYMENT.md`

---

**Happy previewing! 🎉**


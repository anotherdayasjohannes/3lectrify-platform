# 📚 Sanity Studio Deployment Guide

## 🎯 **Why Deploy Studio Separately?**

**Problem:** Right now, your team can only edit content if they:
- Have the codebase locally
- Run `pnpm dev`
- Know how to use terminal/VS Code

**Solution:** Deploy Sanity Studio as a standalone app!

**Result:** Your team visits `studio.3lectrify.com` and edits content like WordPress - **no coding required!**

---

## ✨ **The Beautiful Part:**

### **Content Changes = Instant!**
```
Uli edits content in Studio
   ↓
Clicks "Publish"
   ↓
Changes saved to Sanity Cloud ☁️
   ↓
Your Next.js app fetches new content
   ↓
Site updates automatically! ⚡
```

**NO GitHub push, NO Vercel deployment needed for content!**

Only code changes (new components, styling) need the GitHub/Vercel pipeline.

---

## 🚀 **Deployment Options**

### **Option 1: Deploy to Vercel (Recommended)** ⭐

**Why:** Easiest, free, automatic HTTPS, custom domain support

**Steps:**

#### **1. Prepare Studio for Production**

Your Studio app is already at: `apps/studio/`

**Create `apps/studio/vercel.json`:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": null,
  "outputDirectory": "dist"
}
```

#### **2. Create Production Environment File**

**Create `apps/studio/.env.production`:**
```env
# Your Sanity project IDs (already have these)
SANITY_STUDIO_PROJECT_ID_3LECTRIFY=your-3lectrify-id
SANITY_STUDIO_PROJECT_ID_EFL=your-efl-id-when-ready

# Optional: Enable analytics
SANITY_STUDIO_USE_PREVIEW=false
```

#### **3. Deploy to Vercel**

**Via Vercel Dashboard:**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import `3lectrify-platform` repo
4. **Important:** Set root directory to `apps/studio`
5. Add environment variables from `.env.production`
6. Click "Deploy"

**Via CLI:**
```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps/studio

# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No (create new)
# - Project name: 3lectrify-studio
# - Directory: ./
# - Override settings? No
```

#### **4. Configure Custom Domain (Optional)**

**In Vercel Dashboard:**
1. Go to Project → Settings → Domains
2. Add domain: `studio.3lectrify.com`
3. Update your DNS:
   ```
   Type: CNAME
   Name: studio
   Value: cname.vercel-dns.com
   ```
4. Wait for SSL certificate (automatic)

**Result:** Studio accessible at `studio.3lectrify.com` 🎉

---

### **Option 2: Deploy to Netlify**

**If you prefer Netlify:**

```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps/studio

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Follow prompts
```

---

### **Option 3: Deploy to Sanity's Built-in Hosting**

**Sanity provides free Studio hosting!**

```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps/studio

# Login to Sanity
npx sanity login

# Deploy
npx sanity deploy

# Choose a studio hostname:
# e.g., 3lectrify-studio
```

**Result:** Studio accessible at `3lectrify-studio.sanity.studio` 🎉

**Pros:**
- ✅ Free
- ✅ Easy
- ✅ No Vercel/Netlify needed

**Cons:**
- ⚠️ Can't use custom domain (unless paid plan)
- ⚠️ Less control over deployment

---

## 👥 **Team Access: Inviting Uli**

### **Step 1: Invite User to Sanity Project**

1. Go to https://sanity.io/manage
2. Select your project: "3lectrify"
3. Click "Members" tab
4. Click "Invite members"
5. Enter Uli's email
6. Select role:
   - **Editor** (can edit content, can't change schemas) ⭐ Recommended
   - **Administrator** (full access)
   - **Viewer** (read-only)
7. Click "Send invitation"

**Uli receives email → Clicks link → Creates Sanity account → Done!**

---

### **Step 2: Uli's Workflow**

**For Uli (CCO):**

1. Go to `studio.3lectrify.com` (or your Studio URL)
2. Sign in with Sanity account
3. See all content organized by type:
   - Pages
   - Hero sections
   - Feature cards
   - Text + Image blocks
   - Team members
   - etc.
4. Click "Edit" on any content
5. Make changes
6. Click "Publish"
7. **Changes live in ~5 seconds!** ⚡

**No coding. No GitHub. No Vercel. Just edit & publish!**

---

## 🔐 **Permissions & Roles**

### **Sanity Roles:**

| Role | Can Edit Content | Can Edit Schema | Can Invite Users |
|------|-----------------|-----------------|------------------|
| **Viewer** | ❌ No | ❌ No | ❌ No |
| **Editor** | ✅ Yes | ❌ No | ❌ No |
| **Administrator** | ✅ Yes | ✅ Yes | ✅ Yes |

**Recommendation for Uli:** **Editor** role
- Can edit all content
- Can publish changes
- Can't break the schema (safer!)

---

## 🔄 **The Complete Workflow**

### **For Content Changes (Uli):**
```
1. Uli opens studio.3lectrify.com
2. Edits content (change headline, swap image, etc.)
3. Clicks "Publish"
4. Content instantly updated!
5. Site fetches new content within seconds
6. Done! ✅
```

**Time:** 2 minutes  
**Requires:** Browser only  
**No coding:** ❌  

---

### **For Code Changes (You):**
```
1. You edit component code locally
2. Test at localhost:3000
3. Git commit & push to GitHub
4. Vercel auto-deploys
5. Code changes live
6. Done! ✅
```

**Time:** 5-10 minutes  
**Requires:** Dev setup  
**Coding:** ✅  

---

### **The Separation:**

```
┌─────────────────────────────────────┐
│  CONTENT (Uli's Domain)             │
│  --------------------------------   │
│  • Headlines                        │
│  • Body text                        │
│  • Images                           │
│  • Page structure                   │
│  • Publishing                       │
│                                     │
│  Tool: Sanity Studio               │
│  Changes: Instant!                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  CODE (Your Domain)                 │
│  --------------------------------   │
│  • Components                       │
│  • Styling                          │
│  • Animations                       │
│  • New features                     │
│  • Bug fixes                        │
│                                     │
│  Tool: VS Code + Git                │
│  Changes: Via Vercel deployment     │
└─────────────────────────────────────┘
```

**They don't interfere with each other!** 🎯

---

## 🎨 **Customizing Studio for Your Team**

### **Optional: Add Custom Branding**

**Edit `apps/studio/sanity.config.ts`:**
```typescript
export default defineConfig({
  // ... existing config
  
  // Custom branding
  title: '3lectrify Content Studio',
  
  // Custom logo
  logo: () => (
    <img 
      src="/path-to-logo.svg" 
      alt="3lectrify" 
      style={{ height: '2em' }}
    />
  ),
  
  // Custom theme
  theme: {
    colors: {
      primary: '#your-brand-color',
    }
  }
})
```

---

## 📊 **Content Versioning & History**

### **Sanity Tracks Everything:**

- ✅ Every edit is saved
- ✅ Full revision history
- ✅ Can revert to any previous version
- ✅ See who changed what and when

**How to Use:**
1. In Studio, click any document
2. Click "Review changes" (clock icon)
3. See full history
4. Revert if needed

**This is like Git, but for content!** 🎯

---

## 🚨 **Draft vs. Published**

### **Sanity's Publishing Workflow:**

```
Draft State:
- Uli makes changes
- Saves as draft
- Only visible in Studio
- NOT visible on live site

Published State:
- Uli clicks "Publish"
- Content goes live
- Visible on site immediately
```

**This prevents accidental "half-done" content from going live!**

---

## 🌍 **Multi-Environment Setup (Optional)**

### **For Advanced Teams:**

**Sanity Datasets:**
- `production` - Live site content
- `staging` - Test content before going live
- `development` - Local dev content

**Setup:**
```bash
# Create staging dataset
npx sanity dataset create staging

# Update Studio config to show both
```

**Workflow:**
1. Uli tests content in `staging`
2. You preview at `staging.3lectrify.com`
3. When approved → Copy to `production`
4. Goes live!

---

## ✅ **Deployment Checklist**

### **Before Inviting Uli:**

- [ ] Deploy Studio to production URL
- [ ] Test that you can access it
- [ ] Invite Uli to Sanity project
- [ ] Set Uli's role to "Editor"
- [ ] Create a test page together
- [ ] Verify changes appear on live site
- [ ] Show Uli where documentation is (German guide!)

---

## 🎓 **Training Uli (5 Minutes)**

### **Quick Orientation Call:**

1. **Show Studio Interface**
   - "This is like WordPress, but better"
   - "Everything is organized by type"

2. **Demo Basic Edit**
   - Open a page
   - Change a headline
   - Click "Publish"
   - Refresh live site → Change is there!

3. **Show Key Areas**
   - Pages (main content)
   - Hero sections
   - Components
   - Media library

4. **Explain Draft/Publish**
   - "Save" = Draft (not live)
   - "Publish" = Goes live

5. **Show History**
   - "Don't worry, you can't break anything"
   - "We can always revert"

**That's it!** Uli is ready to edit! 🎉

---

## 🔗 **Useful Links**

- **Sanity Manage:** https://sanity.io/manage
- **Sanity Docs:** https://www.sanity.io/docs
- **Studio Deployment Docs:** https://www.sanity.io/docs/deployment
- **Your Studio (after deploy):** `studio.3lectrify.com`

---

## 💡 **Pro Tips**

### **1. Set Up Webhooks (Optional)**

Get Slack/Email notifications when content is published:
- Go to Sanity Manage → Webhooks
- Add webhook URL
- Get notified on publish

### **2. Preview Changes**

Set up preview mode so Uli can see changes before publishing:
- Next.js draft mode
- Preview URLs in Studio

### **3. Scheduled Publishing (Sanity Plus)**

Content goes live at specific time:
- Upgrade to Sanity Plus ($99/month)
- Schedule publish dates

---

## 🎯 **Recommended Deployment**

**For 3lectrify:**

1. ✅ Deploy Studio to Vercel (free tier)
2. ✅ Use subdomain: `studio.3lectrify.com`
3. ✅ Invite Uli as "Editor"
4. ✅ Give Uli German guide (see next doc!)
5. ✅ 5-minute training call
6. ✅ Done!

**Time to set up:** 30 minutes  
**Time Uli saves:** Forever! ⚡  

---

## 🚀 **Deploy Now?**

**Quick Command:**
```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps/studio

# Option 1: Vercel (via Dashboard) - Recommended
# Go to vercel.com and import project

# Option 2: Sanity Hosting (Fastest)
npx sanity deploy
```

**Then invite Uli and you're done!** 🎉

---

**Questions?** I'm here to help with deployment! 😊


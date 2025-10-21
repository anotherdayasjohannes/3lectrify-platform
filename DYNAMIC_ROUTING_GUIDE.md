# 🎯 Dynamic Routing Guide

## ✅ What Changed

Your platform now has **intelligent, automatic routing**. No more manual file creation for every page!

---

## 🚀 How It Works Now

### For Content Editors (Non-Developers)

**Old Way (Manual) 😓:**
1. Create page in Sanity Studio with slug `neue-seite`
2. Ask developer to create `/app/neue-seite/page.tsx`
3. Wait for deployment
4. Finally see your page live

**New Way (Automatic) ✨:**
1. Create page in Sanity Studio with slug `neue-seite`
2. Publish
3. **Done!** Your page is live at `/neue-seite`

---

## 📂 Project Structure

### Before (Manual Routes)
```
/app
  ├── ihr-vorteil/
  │   └── page.tsx          ❌ Manual file
  ├── ueber-uns/
  │   └── page.tsx          ❌ Manual file
  ├── unser-konzept/
  │   └── page.tsx          ❌ Manual file
  └── [slug]/
      └── page.tsx          ✅ Only for legal pages
```

### After (Smart Dynamic Route)
```
/app
  ├── [slug]/
  │   └── page.tsx          ✅ Handles ALL pages automatically
  ├── page.tsx              ✅ Home page (special case)
  ├── kontakt/
  │   └── page.tsx          ✅ Special page (complex form)
  └── ihr-vorteil/          ⚠️ Can be deleted (optional override)
      └── page.tsx
```

---

## 🔧 How The Smart Route Works

The `/app/[slug]/page.tsx` file automatically:

1. **Fetches the page** by slug from Sanity
2. **Detects the document type:**
   - `page` → Renders content blocks (Hero, Feature Cards, etc.)
   - `legalPage` → Renders Hero Gradient + iframe embed
3. **Returns 404** if page not found

### Example Flow

```
User visits: /unser-konzept
              ↓
[slug]/page.tsx detects slug: "unser-konzept"
              ↓
Fetches from Sanity: *[_type == "page" && slug.current == $slug][0]
              ↓
Finds document with _type: "page"
              ↓
Renders all content blocks (hero, featureShowcase, textImage, cta, etc.)
              ↓
Page displayed!
```

---

## 📋 Supported Content Blocks

The dynamic route supports **all** content blocks:

| Block Type | Component | Description |
|------------|-----------|-------------|
| `hero` | `Hero` | Hero section with optional image |
| `featureCards` | `FeatureCards` | 3-column feature cards |
| `featureShowcase` | `FeatureShowcase` | Split-screen scrollytelling |
| `textImage` | `TextImage` | Text + Image with quotes/stats |
| `simpleTextImage` | `SimpleTextImage` | Simple 2-column text + image |
| `stats` | `Stats` | Statistics display |
| `cta` | `CTA` | Call-to-action section |
| `references` | `ReferencesGrid` or `ReferencesMarquee` | Project references |
| `teamGrid` | `TeamGrid` | Team member grid |

---

## 🎨 Creating New Pages in Sanity Studio

### Step 1: Create Page Document
1. Open Sanity Studio
2. Click **"Create"** → **"Page"**
3. Enter:
   - **Title:** `Unser Konzept`
   - **Slug:** `unser-konzept`
   - **Description:** (optional, for SEO)

### Step 2: Add Content Blocks
1. Click **"Add Content Block"**
2. Choose block type (e.g., `Hero`, `Feature Showcase`, `CTA`)
3. Fill in content
4. Repeat for all sections

### Step 3: Publish
1. Click **"Publish"**
2. Your page is live at `/unser-konzept`

---

## 🧹 Optional: Clean Up Manual Routes

You can now **safely delete** these folders:
- `/app/ihr-vorteil/` *(content will load from dynamic route)*
- `/app/ueber-uns/` *(content will load from dynamic route)*
- `/app/unser-konzept/` *(content will load from dynamic route)*

**Keep these:**
- `/app/page.tsx` *(home page)*
- `/app/kontakt/page.tsx` *(special complex form)*
- `/app/[slug]/page.tsx` *(the smart dynamic route)*

---

## 🔍 SEO & Metadata

The dynamic route automatically generates SEO metadata:

```typescript
{
  title: page.title,                    // From Sanity
  description: page.description || '',  // From Sanity
}
```

Example output:
```html
<head>
  <title>Unser Konzept</title>
  <meta name="description" content="Das 3-Säulen-Prinzip..." />
</head>
```

---

## 🎯 Special Cases

### Home Page (`/`)
- Location: `/app/page.tsx`
- Why special: Root route, custom logic

### Kontakt Page (`/kontakt`)
- Location: `/app/kontakt/page.tsx`
- Why special: Complex HubSpot form integration

### Legal Pages (`/impressum`, `/agb`, `/datenschutz`)
- Location: `/app/[slug]/page.tsx` (same dynamic route!)
- Document type: `legalPage` (instead of `page`)
- Renders: Hero Gradient + iframe embed

---

## 🚦 Route Priority (Next.js)

Next.js checks routes in this order:

1. **Exact match:** `/kontakt/page.tsx` *(if exists)*
2. **Dynamic route:** `/[slug]/page.tsx` *(catches everything else)*
3. **Not found:** Returns 404

This means:
- `/kontakt` → Uses `/app/kontakt/page.tsx` (exact match)
- `/unser-konzept` → Uses `/app/[slug]/page.tsx` (dynamic)
- `/random-page` → 404 (not in Sanity)

---

## ✅ Benefits

### For Content Editors
- ✅ Create pages without developer help
- ✅ Immediate preview in Sanity Studio
- ✅ Publish = Live (no code deployment)

### For Developers
- ✅ One file handles all pages
- ✅ No repetitive route files
- ✅ Easy to maintain
- ✅ Type-safe with TypeScript

### For SEO
- ✅ Automatic metadata generation
- ✅ Clean URLs
- ✅ Fast page loads (Next.js optimization)

---

## 🛠️ Troubleshooting

### Page shows 404
**Check:**
1. Page is published in Sanity Studio
2. Slug matches URL (e.g., `unser-konzept` → `/unser-konzept`)
3. Page has `_type: "page"` (not `legalPage`)

### Content not updating
**Solution:**
1. Hard refresh browser (Cmd+Shift+R)
2. Check Sanity Studio for latest publish timestamp
3. Clear Next.js cache: `rm -rf .next`

### Wrong component renders
**Check:**
1. Block `_type` matches component switch case
2. Block has required fields (e.g., `hero` needs `headline`)

---

## 📚 Related Files

| File | Purpose |
|------|---------|
| `/apps/3lectrify/app/[slug]/page.tsx` | Smart dynamic route (all pages) |
| `/packages/sanity/queries/pages.ts` | GROQ query for content pages |
| `/packages/sanity/queries/legalPages.ts` | GROQ query for legal pages |
| `/apps/studio/schemaTypes/documents/page.ts` | Sanity schema for content pages |
| `/apps/studio/schemaTypes/documents/legalPage.ts` | Sanity schema for legal pages |

---

## 🎉 Summary

**You now have a professional, industry-standard headless CMS setup!**

- ✅ Content editors create pages in Sanity Studio
- ✅ Pages go live automatically (no developer needed)
- ✅ One smart route handles everything
- ✅ Scalable to hundreds/thousands of pages
- ✅ Full SEO support

**Next time you create a page, just publish in Sanity Studio. That's it! 🚀**


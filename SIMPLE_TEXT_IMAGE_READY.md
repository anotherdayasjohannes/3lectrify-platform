# ✅ Simple Text + Image Component - READY!

## 🎯 What Was Created

A **simpler, focused version** of Text + Image for centered, single-column content.

---

## 📊 Component Features

### **Layout:**
- **Max width:** 645px (centered)
- **Single column:** Text above, image below
- **Vertical stack** (not side-by-side)

### **Content:**
- Optional H2 headline
- Rich text body
- Image (aspect ratio 215:143)
- Background variant (light/dark)

### **Animations:**
- Text fades in from bottom (30px)
- Image follows with 40px offset
- Staggered timing for smooth reveal

---

## ✅ Files Created/Updated

### **1. Component**
- `/packages/ui/components/SimpleTextImage.tsx` ✅

### **2. Export**
- `/packages/ui/index.ts` ✅

### **3. Sanity Schema**
- `/apps/studio/schemaTypes/objects/simpleTextImage.ts` ✅
- `/apps/studio/schemaTypes/index.ts` ✅
- `/apps/studio/schemaTypes/documents/page.ts` ✅

---

## 🚧 Still TODO (Next Steps)

### **1. Update GROQ Query**
Add simpleTextImage to `/packages/sanity/queries/pages.ts`:

```groq
_type == "simpleTextImage" => {
  headline,
  body,
  image {
    asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  variant
}
```

### **2. Update Page Components**
Add to `/apps/3lectrify/app/page.tsx` and `/ihr-vorteil/page.tsx`:

```typescript
// Interface
interface SanityBlock {
  // ... existing properties ...
  // Add for simpleTextImage:
  variant?: 'light' | 'dark';
}

// Rendering
case 'simpleTextImage':
  return (
    <SimpleTextImage
      key={index}
      headline={block.headline}
      body={block.body}
      image={block.image?.asset ? {
        url: block.image.asset.url,
        alt: block.image.alt || '',
        width: block.image.asset.metadata?.dimensions?.width || 645,
        height: block.image.asset.metadata?.dimensions?.height || 429,
      } : undefined}
      variant={block.variant}
    />
  );
```

### **3. Restart Sanity Studio**
```bash
# In /apps/studio directory
pnpm dev
```

---

## 🎨 Usage in Sanity Studio

1. Open Sanity Studio
2. Edit any page
3. Click "+ Add item" in Page Content
4. Select **"Simple Text + Image"**
5. Fill in:
   - Headline (optional)
   - Body text (rich text)
   - Image
   - Background variant (light/dark)

---

## 🆚 vs. Regular Text + Image

| Feature | Text + Image | Simple Text + Image |
|---------|--------------|---------------------|
| **Layout** | 2-column (1290px) | 1-column (645px) |
| **Arrangement** | Side-by-side | Vertical stack |
| **Width** | Full content wrapper | Narrow, centered |
| **Features** | Quotes, Stats, Bullets | Just text + image |
| **Use Case** | Complex content | Focused, simple content |

---

## ✅ Ready for Implementation!

The component is created and schemas are registered. Complete the GROQ query and page component updates above to make it fully functional!


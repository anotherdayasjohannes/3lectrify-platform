# 📸 Focal Points & Image Hotspots Guide

## ✅ Setup Complete!

**All image fields now support focal points (hotspots) and cropping!**

---

## 🎯 What Are Focal Points?

Focal points (hotspots) tell the system which part of an image is most important. When images are:
- **Cropped** for different aspect ratios
- **Resized** for different screen sizes
- **Displayed** in various layouts

...the focal point ensures the important part stays visible and centered.

---

## 🔧 What Was Updated

### **1. Sanity Schemas** ✅
All image fields already had `hotspot: true` enabled:
- ✅ Hero images
- ✅ Feature card icons
- ✅ Text + Image photos
- ✅ Simple Text + Image photos
- ✅ Quote icons
- ✅ Feature showcase icons
- ✅ Site logo

### **2. GROQ Queries** ✅
Updated all queries to fetch `hotspot` and `crop` data:
- ✅ `/packages/sanity/queries/pages.ts`
- ✅ `/packages/sanity/queries/siteSettings.ts`

### **3. Image Utilities** ✅ NEW!
Created helper functions in `/packages/sanity/lib/imageUtils.ts`:
- `urlForImage()` - Sanity image URL builder with hotspot/crop
- `getFocalPoint()` - Convert hotspot to CSS object-position
- `getImageProps()` - Get optimized image props for Next.js Image

### **4. Package Dependencies** ✅
Added `@sanity/image-url` to `/packages/sanity/package.json`

---

## 📚 How to Use in Sanity Studio

### **Setting a Focal Point:**

1. **Open any page** in Sanity Studio
2. **Add/Edit a content block** with an image (Hero, Text+Image, etc.)
3. **Upload or select an image**
4. **Click "Edit hotspot"** (pencil icon on image)
5. **Click on the image** where the focal point should be
6. **Drag the circle** to adjust the focal point
7. **Adjust the crop handles** (optional) to define visible area
8. **Click "Close"** to save

### **What You'll See:**
- **Blue circle** = Focal point (stays centered when image is cropped)
- **Crop handles** = Edges of the visible area
- **Grid overlay** = Helps you align focal point to specific features

---

## 💻 How to Use in Components

### **Option 1: Using Image URL Builder (Recommended)**

```typescript
import { urlForImage } from '@3lectrify/sanity';

// In your component:
const imageUrl = urlForImage(block.image)
  .width(800)
  .height(600)
  .quality(90)
  .auto('format')
  .url();

<Image
  src={imageUrl}
  alt={block.image.alt}
  width={800}
  height={600}
/>
```

**Benefits:**
- ✅ Hotspot/crop applied automatically
- ✅ Optimized image delivery
- ✅ WebP format when supported
- ✅ Quality control

---

### **Option 2: Using Helper Function**

```typescript
import { getImageProps } from '@3lectrify/sanity';

// In your component:
const imageProps = getImageProps(block.image, 800, 600, 90);

if (imageProps) {
  <Image
    src={imageProps.src}
    alt={block.image.alt}
    width={800}
    height={600}
    style={imageProps.style} // Applies focal point
  />
}
```

---

### **Option 3: Manual Focal Point CSS**

```typescript
import { getFocalPoint } from '@3lectrify/sanity';

// In your component:
const focalPoint = getFocalPoint(block.image?.hotspot);

<Image
  src={block.image.asset.url}
  alt={block.image.alt}
  width={800}
  height={600}
  style={{ objectPosition: focalPoint }} // e.g., "65% 30%"
  className="object-cover"
/>
```

---

## 🎨 Example: Hero Component with Focal Point

**Before (no focal point):**
```typescript
<Image
  src={heroImage.asset.url}
  alt={heroImage.alt}
  width={1920}
  height={1080}
  className="object-cover"
/>
```

**After (with focal point):**
```typescript
import { urlForImage } from '@3lectrify/sanity';

const imageUrl = urlForImage(heroImage)
  .width(1920)
  .height(1080)
  .quality(90)
  .auto('format')
  .url();

<Image
  src={imageUrl}
  alt={heroImage.alt}
  width={1920}
  height={1080}
  className="object-cover"
/>
```

**Result:**
- ✅ Focal point respected in all crops
- ✅ WebP format for faster loading
- ✅ Optimized quality
- ✅ Responsive image URLs

---

## 📦 TypeScript Interface

```typescript
interface SanityImageSource {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  hotspot?: {
    x: number;        // 0-1 (0 = left, 1 = right)
    y: number;        // 0-1 (0 = top, 1 = bottom)
    height: number;   // Focal area height
    width: number;    // Focal area width
  };
  crop?: {
    top: number;      // 0-1
    bottom: number;   // 0-1
    left: number;     // 0-1
    right: number;    // 0-1
  };
  alt?: string;
}
```

---

## 🚀 Next Steps

### **For Existing Components:**
Components can continue using `block.image.asset.url` as before - focal points are **optional** and **backward compatible**.

### **To Enable Focal Points:**
Update components one-by-one to use `urlForImage()` or `getImageProps()` for automatic focal point support.

### **Priority Components to Update:**
1. **Hero** - Large images benefit most from focal points
2. **TextImage** - Side-by-side layouts need proper crops
3. **SimpleTextImage** - Centered images
4. **FeatureCards** - Icon positioning

---

## 🎯 Benefits

### **For Content Editors:**
- ✅ Control which part of image stays visible
- ✅ No need to pre-crop images manually
- ✅ One image works for all breakpoints
- ✅ Visual editor in Sanity Studio

### **For Developers:**
- ✅ Automatic image optimization
- ✅ WebP format support
- ✅ Quality control
- ✅ Responsive image URLs
- ✅ TypeScript support

### **For Users:**
- ✅ Faster page loads (WebP)
- ✅ Better mobile experience
- ✅ Images always look great
- ✅ No cut-off faces or important content

---

## 🔗 Resources

- [Sanity Image URLs Docs](https://www.sanity.io/docs/image-urls)
- [Sanity Hotspot & Crop](https://www.sanity.io/docs/image-type#hotspot-3e1ae9e1f58a)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## ✅ Status

**All modules with images now support focal points!** 🎉

You can start setting focal points in Sanity Studio right away. The data is already being fetched and stored - components can be updated gradually to use it.



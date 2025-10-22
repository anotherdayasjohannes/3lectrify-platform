# 🎬 Hero Parallax Effects - Complete!

## ✨ What's New

The Hero component now supports **3 stunning parallax effects** using multiple perspectives of the same building!

Content editors can choose between:
1. **Mouse Tracking (Interactive)** 👆
2. **Auto-Rotate (Cinematic)** 🎞️
3. **Layered Depth (Scroll)** 🌊

---

## 🎯 How It Works in Sanity Studio

### Step 1: Enable Parallax

When editing a Hero section in Sanity Studio:

1. Toggle **"Enable Parallax Effect"** = **ON**
2. Two new fields appear:
   - **Parallax Images (3 Perspectives)**
   - **Parallax Effect Type**

### Step 2: Upload 3 Images

**Add exactly 3 images in this order:**

| Order | Perspective | Description |
|-------|-------------|-------------|
| 1st   | **Left**    | Building from the left angle |
| 2nd   | **Center**  | Building from center (main view) |
| 3rd   | **Right**   | Building from the right angle |

⚠️ **Important:** Upload in the exact order: Left → Center → Right

### Step 3: Choose Effect Type

Select one of these effects:

#### 🖱️ **Option 1: Mouse Tracking (Interactive)**
```
User moves mouse left → See left perspective
User moves mouse center → See center perspective
User moves mouse right → See right perspective
```

**Best for:**
- Hero sections above the fold
- Interactive landing pages
- Showcasing 3D depth
- Engaging users immediately

**Effect:**
- Smooth crossfade between images
- Responds to mouse position (desktop)
- Splits viewport into 3 zones (left/center/right)
- 0.6s transition duration

---

#### 🎞️ **Option 2: Auto-Rotate (Cinematic)**
```
Image 1 (4s) → crossfade → Image 2 (4s) → crossfade → Image 3 (4s) → repeat
```

**Best for:**
- Passive viewing experience
- Mobile-friendly (no mouse needed)
- Elegant, cinematic feel
- Showcasing all angles automatically

**Effect:**
- Automatic rotation every 4 seconds
- 1.5s smooth crossfade
- Loops through all 3 perspectives
- No user interaction required

---

#### 🌊 **Option 3: Layered Depth (Scroll)**
```
All 3 images visible at once
Each layer moves at different speed when scrolling
Creates depth/parallax effect
```

**Best for:**
- Creating 3D depth illusion
- Modern, immersive feel
- Scroll-driven storytelling
- Premium, high-end aesthetics

**Effect:**
- All 3 images visible simultaneously
- Layer 1 (back): 30% scroll speed
- Layer 2 (middle): 50% scroll speed
- Layer 3 (front): 70% scroll speed
- Creates sense of depth as you scroll

---

## 🧑‍💻 Technical Implementation

### Schema Changes

**File:** `apps/studio/schemaTypes/objects/hero.ts`

Added fields:
- `enableParallax` (boolean) - Toggle parallax on/off
- `parallaxImages` (array of 3 images) - The 3 perspectives
- `parallaxEffect` (string) - Effect type: 'mouse' | 'autoRotate' | 'layered'

### Component Architecture

**File:** `packages/ui/components/Hero.tsx`

#### Mouse Tracking Implementation
```typescript
// Maps mouse X position to image index
normalizedX = mouseX / containerWidth; // 0 to 1

if (normalizedX < 0.33) → Show Left (index 0)
else if (normalizedX > 0.66) → Show Right (index 2)
else → Show Center (index 1)

// Smooth GSAP crossfade
gsap.to(image, { opacity: 1, duration: 0.6 });
```

#### Auto-Rotate Implementation
```typescript
// Interval-based rotation
setInterval(() => {
  nextIndex = (currentIndex + 1) % 3;
  gsap.to(images, { opacity: ... });
}, 4000);
```

#### Layered Depth Implementation
```typescript
// ScrollTrigger for parallax
images.forEach((img, index) => {
  const speed = [0.3, 0.5, 0.7][index];
  gsap.to(img, {
    y: () => window.scrollY * speed,
    scrollTrigger: { scrub: true }
  });
});
```

### GROQ Query Changes

**File:** `packages/sanity/queries/pages.ts`

Added to hero query:
```groq
enableParallax,
parallaxImages[] {
  asset-> { url, metadata { dimensions } },
  hotspot, crop, alt, perspective
},
parallaxEffect
```

### Page Integration

**File:** `apps/3lectrify/app/page.tsx`

Added props to Hero component:
```typescript
<Hero
  {...existingProps}
  enableParallax={block.enableParallax}
  parallaxImages={block.parallaxImages?.map(...)}
  parallaxEffect={block.parallaxEffect}
/>
```

---

## 🎨 UX Design Decisions

### Why These 3 Effects?

1. **Mouse Tracking** - Gamification, instant engagement
2. **Auto-Rotate** - Accessibility, mobile-first
3. **Layered Depth** - Premium feel, modern aesthetics

### Graceful Degradation

- If `enableParallax = false` → Standard single image
- If `parallaxImages.length !== 3` → Fallback to heroImage
- If no images → Text-only hero (existing behavior)

### Performance Optimizations

- Only center image has `priority` (Next.js preload)
- GSAP animations are GPU-accelerated
- ScrollTrigger cleanup on unmount
- Event listeners cleaned up properly

---

## 🧪 Testing Checklist

### Sanity Studio
- [ ] "Enable Parallax" toggle shows/hides fields
- [ ] Can upload exactly 3 images
- [ ] Validation prevents 2 or 4 images
- [ ] Perspective labels are clear

### Frontend - Mouse Tracking
- [ ] Mouse left → Left image
- [ ] Mouse center → Center image
- [ ] Mouse right → Right image
- [ ] Smooth crossfade (0.6s)
- [ ] Perspective label shows current view

### Frontend - Auto-Rotate
- [ ] Starts with center image
- [ ] Rotates every 4 seconds
- [ ] Smooth 1.5s crossfade
- [ ] Loops continuously

### Frontend - Layered Depth
- [ ] All 3 images visible
- [ ] Different scroll speeds
- [ ] No content jump
- [ ] Smooth parallax effect

### Edge Cases
- [ ] Works with "above" image position
- [ ] Works with "side" image position
- [ ] Graceful fallback if only 1-2 images
- [ ] Mobile behavior (touch, no mouse)

---

## 📊 Comparison Table

| Feature | Mouse Tracking | Auto-Rotate | Layered Depth |
|---------|----------------|-------------|---------------|
| **Interaction** | Active | Passive | Passive |
| **Mobile** | ⚠️ Fallback needed | ✅ Perfect | ✅ Perfect |
| **Accessibility** | ⚠️ Keyboard needed | ✅ No action | ✅ No action |
| **Engagement** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Performance** | ⚡ Excellent | ⚡ Excellent | ⚡ Good |
| **Wow Factor** | 🔥🔥🔥 | 🔥🔥 | 🔥🔥🔥🔥 |

---

## 🚀 What's Next?

### Potential Enhancements

1. **Mobile Touch Support for Mouse Effect**
   - Add touch/drag gestures
   - Swipe left/right to change perspective

2. **Hotspot Support for Parallax**
   - Currently uses first image's hotspot
   - Could have different focal points per perspective

3. **Custom Timing Controls**
   - Let editors set auto-rotate speed
   - Adjust scroll parallax intensity

4. **Transition Effects**
   - Add slide, scale, or blur transitions
   - More creative crossfade options

5. **Analytics**
   - Track which perspectives get viewed most
   - Measure interaction time

---

## 🎓 Usage Examples

### Example 1: Interactive Building Tour
```
Effect: Mouse Tracking
Use Case: Real estate, architecture showcase
Why: Users "look around" the building naturally
```

### Example 2: Project Before/During/After
```
Effect: Auto-Rotate
Use Case: Construction progress, transformations
Images: Before (Left), During (Center), After (Right)
Why: Tells a story without interaction
```

### Example 3: Hero with Depth
```
Effect: Layered Depth
Use Case: Premium landing pages
Why: Creates modern, immersive feel
```

---

## 🔧 Debugging

### Image Not Changing?
- Check: Are there exactly 3 images?
- Check: Is `enableParallax` true?
- Check: Is effect type selected?

### Performance Issues?
- Check: Are images optimized? (< 200KB each)
- Check: Are dimensions reasonable? (< 2000px)
- Try: Reduce image quality in Sanity

### Layout Broken?
- Check: Image position ('above' or 'side')
- Check: Container ref is attached
- Try: Clear browser cache

---

## 📚 Related Documentation

- `STACKED_EXPLAINER_COMPLETE.md` - Card animation examples
- `✨_SPLITTEXT_READY.md` - Text reveal animations
- `⚡_CUSTOM_EASINGS_READY.md` - Custom easing curves

---

## 🎉 Ready to Use!

1. Go to Sanity Studio
2. Edit Hero section on `/home`
3. Toggle "Enable Parallax Effect"
4. Upload your 3 building images
5. Choose an effect type
6. **Publish and watch the magic!** ✨

---

**Built with:**
- GSAP 3.13 for smooth animations
- Next.js Image optimization
- ScrollTrigger for scroll effects
- TypeScript for type safety

**Result:** World-class, interactive hero sections! 🚀


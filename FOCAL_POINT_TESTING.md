# 🧪 Focal Point Testing Guide

## 🎯 How to Test Focal Points

### **Method 1: Browser Console Script (Recommended)**

This automated script checks all images on a page and tells you which ones have focal points applied.

#### **Steps:**

1. **Open your site in the browser**
   - Go to `http://localhost:3000` (or your dev URL)
   - Navigate to a page with images (Home, Ihr Vorteil, etc.)

2. **Open DevTools**
   - Mac: `Cmd + Option + I`
   - Windows/Linux: `F12` or `Ctrl + Shift + I`

3. **Go to Console tab**

4. **Run the diagnostic script**
   - Open `/FOCAL_POINT_DIAGNOSTIC.js`
   - Copy the entire script
   - Paste into the browser console
   - Press `Enter`

#### **What You'll See:**

```
🎯 FOCAL POINT DIAGNOSTIC REPORT
═══════════════════════════════════════

📊 Found 8 total images on page
🖼️  Found 3 Next.js Image components

📈 SUMMARY
─────────────────────────────────────
✅ Images WITH focal point: 3
❌ Images WITHOUT focal point: 0

📋 DETAILED RESULTS
─────────────────────────────────────

✅ Image #1
   Component: Hero
   Alt text: Expert in Energy Buildings
   Dimensions: 1920×1080
   Object Fit: cover
   Object Position: 65% 30%  ← FOCAL POINT!
   Source: /_next/image?url=https://cdn.sanity.io/...

✅ Image #2
   Component: TextImage
   Alt text: Solar panels installation
   Dimensions: 1200×800
   Object Fit: cover
   Object Position: 75% 45%  ← FOCAL POINT!
   Source: /_next/image?url=https://cdn.sanity.io/...

🎯 BY COMPONENT TYPE
─────────────────────────────────────
✅ Hero: 1/1 (100%)
✅ TextImage: 2/2 (100%)
```

#### **Visual Highlighting:**

After running the diagnostic, you can **visually highlight** images in the browser:

```javascript
highlightFocalPoints()
```

- **Green border** = Focal point applied ✅
- **Red border** = No focal point ❌
- **Label shows** the exact focal point position

**Remove highlights:**
```javascript
clearHighlights()
```

---

### **Method 2: Manual Inspection**

#### **In Browser DevTools:**

1. **Right-click an image** → **Inspect**
2. **Look at Styles panel**
3. **Find `object-position`** property
4. **Check the value:**
   - ✅ `65% 30%` = Focal point applied!
   - ❌ `center center` or `50% 50%` = Not applied

#### **Example:**

```css
img {
  object-fit: cover;
  object-position: 65% 30%; ← This is the focal point!
}
```

---

### **Method 3: Sanity Studio Comparison**

#### **Compare Sanity → Frontend:**

1. **Open Sanity Studio**
2. **Edit a page** (e.g., Home)
3. **Find an image** (e.g., Hero image)
4. **Click "Edit hotspot"**
5. **Note the focal point position** (e.g., circle is on the left side)
6. **Save**
7. **Refresh the frontend**
8. **Run the diagnostic script**
9. **Verify** the `objectPosition` matches the hotspot location

#### **How to Match:**

| Hotspot Position | Expected objectPosition |
|------------------|-------------------------|
| **Center** | `50% 50%` or `center` |
| **Left side** | `20-40% 50%` |
| **Right side** | `60-80% 50%` |
| **Top** | `50% 20-40%` |
| **Bottom** | `50% 60-80%` |
| **Top-left** | `20-40% 20-40%` |
| **Bottom-right** | `60-80% 60-80%` |

---

## 🧪 Test Scenarios

### **Test 1: Hero Image**

**Setup:**
1. Go to Sanity Studio
2. Edit Home page Hero image
3. Set focal point to **far left** (20% 50%)
4. Save

**Test:**
1. Refresh frontend
2. Run diagnostic script
3. **Expected:** `objectPosition: 20% 50%` (or close)

---

### **Test 2: TextImage**

**Setup:**
1. Go to Sanity Studio
2. Edit "Ihr Vorteil" page
3. Find TextImage section
4. Set focal point to **far right** (80% 50%)
5. Save

**Test:**
1. Refresh frontend
2. Run diagnostic script
3. **Expected:** `objectPosition: 80% 50%` (or close)

---

### **Test 3: Responsive Behavior**

**Setup:**
1. Set a focal point on an image (e.g., Hero)
2. Save in Sanity Studio

**Test:**
1. Open frontend in browser
2. Run diagnostic script → note the focal point
3. **Resize browser** to mobile width (375px)
4. Run diagnostic script again
5. **Expected:** Same focal point value (should persist across breakpoints)

---

### **Test 4: Multiple Images**

**Setup:**
1. Go to a page with multiple images (e.g., Home)
2. Set **different** focal points for each image
3. Save

**Test:**
1. Refresh frontend
2. Run diagnostic script
3. **Expected:** Each image shows its unique focal point

---

## ✅ What Good Results Look Like

### **Console Output:**

```
✅ Images WITH focal point: 5
❌ Images WITHOUT focal point: 0

🎯 BY COMPONENT TYPE
✅ Hero: 1/1 (100%)
✅ TextImage: 3/3 (100%)
✅ SimpleTextImage: 1/1 (100%)
```

### **Visual Inspection:**

- All images have **green borders** (when using `highlightFocalPoints()`)
- All images show **specific percentages** (not just `center` or `50% 50%`)
- Focal points **match** what was set in Sanity Studio

---

## ❌ Troubleshooting

### **Problem: All images show `center center`**

**Cause:** Focal points not being passed from page to component

**Fix:**
1. Check `/apps/3lectrify/app/page.tsx`
2. Verify `hotspot: block.image.hotspot` is passed
3. Check TypeScript interface includes `hotspot`

---

### **Problem: Some images have focal points, some don't**

**Cause:** Inconsistent implementation across components

**Fix:**
1. Run diagnostic script to see which components are missing
2. Check those specific component files
3. Verify they use `getFocalPoint(image.hotspot)`

---

### **Problem: Focal point seems wrong**

**Cause:** Possible caching or data sync issue

**Fix:**
1. Hard refresh browser (`Cmd+Shift+R` or `Ctrl+Shift+R`)
2. Clear Sanity Studio cache
3. Re-save the image in Sanity Studio
4. Check GROQ query includes `hotspot` field

---

## 📊 Expected Results by Component

| Component | Should Have Focal Point? |
|-----------|-------------------------|
| **Hero** (large images) | ✅ YES - Critical |
| **TextImage** (photos) | ✅ YES - Critical |
| **SimpleTextImage** (photos) | ✅ YES - Critical |
| **FeatureCards** (icons) | ⚠️ Optional - Usually centered |
| **FeatureShowcase** (icons) | ⚠️ Optional - Usually centered |
| **Header** (logo) | ⚠️ Optional - Usually centered |

---

## 🎯 Quick Checklist

- [ ] Diagnostic script runs without errors
- [ ] All Hero images show focal points
- [ ] All TextImage photos show focal points
- [ ] All SimpleTextImage photos show focal points
- [ ] Focal points match Sanity Studio settings
- [ ] Focal points persist on mobile/tablet
- [ ] Visual highlighting shows all green borders
- [ ] No images show `center center` or `50% 50%` (unless intentionally centered)

---

## ✅ Success Criteria

**✓ PASS** if:
- Diagnostic shows 100% focal points on Hero/TextImage/SimpleTextImage
- Focal points change when updated in Sanity Studio
- Focal points work across all screen sizes
- No red borders when using visual highlighting

**✗ FAIL** if:
- Images still show `center center`
- Focal points don't match Sanity settings
- Some components missing focal points
- Red borders in visual highlighting

---

## 🚀 Ready to Test!

1. Open `/FOCAL_POINT_DIAGNOSTIC.js`
2. Copy the script
3. Paste into browser console
4. Run `highlightFocalPoints()` for visual check
5. Verify all images have green borders!

**If everything shows green ✅ = SUCCESS!** 🎉



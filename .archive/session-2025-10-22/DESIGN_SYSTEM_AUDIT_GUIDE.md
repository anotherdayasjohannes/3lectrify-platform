# Design System Audit Script - User Guide

**Script:** `DESIGN_SYSTEM_AUDIT_SCRIPT.js`  
**Purpose:** Comprehensive verification of Figma-aligned design system implementation  
**Date:** 2025-10-21

---

## 🎯 What It Checks

### **1. Layout & Structure**
- ✅ Content wrapper max-width (1440px)
- ✅ Content wrapper padding (50px)
- ✅ Grid layouts (2-column Text+Image, Feature Cards)
- ✅ Section spacing and gaps

### **2. Typography**
- ✅ Font sizes (H1: 48px, H2: 36px, H3: 24px, Body: 18px)
- ✅ Line heights (H1: 58px, H2: 46px, H3: 34px, Body: 24px)
- ✅ Font weights (H1/H2: 300 light, H3/Body: 400 normal)
- ✅ Letter spacing (0.48px, 0.36px, 0.24px, 0.18px)

### **3. Spacing**
- ✅ Padding values (sections, cards, containers)
- ✅ Gaps (grid, flex)
- ✅ Margins (sections, elements)

### **4. Components**
- ✅ Header (position, height, navigation)
- ✅ Hero section (background, typography, layout)
- ✅ Feature Cards (grid, padding, border-radius)
- ✅ Text + Image (2-column grid, image size, text width)
- ✅ Footer (layout, newsletter, legal links, LinkedIn icon)
- ✅ Gradient Spacer (height, background)

### **5. Colors**
- ✅ Brand colors (Green, Orange, Blue, Curry)
- ✅ Neutral colors (Light Grey, Mid Grey, Dark Grey)
- ✅ Background colors

### **6. Responsive**
- ✅ Current viewport and active breakpoint
- ✅ Mobile (< 768px)
- ✅ Tablet (768-1024px)
- ✅ Desktop (>= 1024px)

---

## 📋 How To Use

### **1. Open Your Browser**
Navigate to the page you want to audit:
- `http://localhost:3000/` (Homepage)
- `http://localhost:3000/ihr-vorteil` (Ihr Vorteil page)
- Any other page

### **2. Open Developer Console**
- **Chrome/Edge:** `Cmd + Option + J` (Mac) or `Ctrl + Shift + J` (Windows)
- **Firefox:** `Cmd + Option + K` (Mac) or `Ctrl + Shift + K` (Windows)
- **Safari:** `Cmd + Option + C` (Mac)

### **3. Copy & Paste Script**
1. Open the file: `/Users/j.wild/Projects/3lectrify-platform/DESIGN_SYSTEM_AUDIT_SCRIPT.js`
2. Copy the entire contents (Cmd + A, Cmd + C)
3. Paste into the browser console (Cmd + V)
4. Press Enter

### **4. Read The Results**
The script will output a comprehensive report with:
- ✅ Green checkmarks: Values match Figma specs
- ❌ Red X marks: Values don't match (shows expected vs actual)
- ⚠️ Yellow warnings: Element not found or not applicable

---

## 📊 Example Output

```
=== 3LECTRIFY DESIGN SYSTEM AUDIT ===
Figma-Aligned Design System Verification
Page: /ihr-vorteil
Viewport: 1728x958

📦 CONTENT WRAPPER
  ✅ Max Width: 1440px (expected: 1440px)
  ✅ Padding Left: 50px (expected: 50px)
  ✅ Padding Right: 50px (expected: 50px)

🖼️ TEXT + IMAGE SECTION
  Grid Layout:
    Display: grid
    Grid Template Columns: 645px 645px
    2-Column Layout: ✅ Yes (645px 645px)
  ✅ Gap: 50px (expected: 50px)
  Image:
    Width: 645px ✅
    Height: 430px ✅
  Text:
    Width: 645px ✅
  H2:
    ✅ Font Size: 36px (expected: 36px)
    ✅ Line Height: 46px (expected: 46px)
  Layout:
    Elements: ✅ Side-by-side

=== AUDIT COMPLETE ===
```

---

## 🔍 What To Look For

### **✅ All Green (Perfect!)**
Everything matches Figma specifications perfectly.

### **❌ Red Marks (Needs Attention)**
Values don't match expected Figma values:
- Check the "Difference" line for how far off it is
- Small differences (< 2px) are within tolerance
- Large differences need investigation

### **⚠️ Warnings (Context-Dependent)**
- Element not found: Normal if not on that page
- Not applicable: Feature not used on this page

---

## 🧪 Testing Checklist

Run the audit on these key pages:

- [ ] **Homepage** (`/`)
  - Hero section
  - Feature Cards
  - Footer

- [ ] **Ihr Vorteil** (`/ihr-vorteil`)
  - Hero section
  - Text + Image 2-column
  - Footer

- [ ] **Multiple Viewports**
  - Desktop (1440px+)
  - Tablet (768-1024px)
  - Mobile (< 768px)

---

## 🛠️ Common Issues & Solutions

### **Issue: Grid Template Columns shows "1340px" instead of "645px 645px"**
**Solution:** Check mobile-first responsive classes. Should be:
```tsx
grid-cols-1 md:grid-cols-text-image
```

### **Issue: Font sizes slightly off (e.g., 47.5px instead of 48px)**
**Reason:** Browser rounding or zoom level.
**Solution:** If difference < 2px, it's acceptable.

### **Issue: Padding doesn't match**
**Check:**
1. Is `.content-wrapper` being used?
2. Are there conflicting CSS rules?
3. Is the element inside the correct container?

### **Issue: Colors look different**
**Check:**
1. Browser color profile
2. CSS color values (hex vs rgb)
3. Opacity settings

---

## 📈 Interpreting Results

### **Tolerance Levels:**
- **±0-1px:** ✅ Perfect (browser rounding)
- **±2-5px:** ⚠️ Acceptable (minor deviation)
- **±6-10px:** ❌ Needs review
- **±10px+:** ❌ Incorrect implementation

### **Priority Levels:**
1. **Critical:** Layout structure (grids, widths, positioning)
2. **High:** Typography (font sizes, line heights)
3. **Medium:** Spacing (padding, gaps, margins)
4. **Low:** Minor variations (< 2px differences)

---

## 🔄 Continuous Testing

### **When to Run:**
- ✅ After making design changes
- ✅ Before committing code
- ✅ After Tailwind config updates
- ✅ When adding new components
- ✅ During responsive testing

### **Best Practices:**
1. **Run on multiple pages** to ensure consistency
2. **Test at different viewport sizes**
3. **Compare results across browsers**
4. **Document any intentional deviations**

---

## 📝 Creating Reports

### **For Bug Reports:**
```
Run the audit script and copy the console output.
Include:
- Page URL
- Viewport size
- Browser & version
- All ❌ red marks with differences
```

### **For Design Reviews:**
```
Run audit on all key pages.
Summarize:
- Total checks: X
- Passed: Y (✅)
- Failed: Z (❌)
- List of critical issues
```

---

## 🎯 Success Criteria

### **Production-Ready:**
- ✅ All critical layouts correct (grids, widths)
- ✅ Typography matches within 1px
- ✅ Spacing matches within 2px
- ✅ All colors correct
- ✅ Responsive behavior correct

### **Good Enough for Development:**
- ✅ Major layouts correct
- ⚠️ Minor typography deviations acceptable
- ⚠️ Some spacing variations OK (< 5px)
- ✅ Core functionality works

---

## 🚀 Advanced Usage

### **Save Results to File:**
```javascript
// Run the audit, then:
const results = console.log; // Capture output
// Copy and paste into a text file
```

### **Compare Before/After:**
1. Run audit before changes → Save results
2. Make changes
3. Run audit after changes → Save results
4. Compare the two outputs

### **Automate Testing:**
Consider integrating with:
- Playwright/Cypress for automated checks
- Visual regression testing tools
- CI/CD pipeline checks

---

## 📚 Related Documentation

- **Design System:** `DESIGN_SYSTEM.md`
- **Figma Alignment:** `TAILWIND_PROPER_GRID_CONFIG.md`
- **Layout Debugging:** `DEBUG_TEXT_IMAGE_LAYOUT.js`
- **Tech Stack:** `TECH_STACK.md`

---

**The audit script is your design system quality gate! 🎯**




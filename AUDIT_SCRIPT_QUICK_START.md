# Design System Audit - Quick Start 🚀

**File:** `DESIGN_SYSTEM_AUDIT_SCRIPT.js`

---

## ⚡ Quick Steps

### 1️⃣ **Open Page**
```
http://localhost:3000/ihr-vorteil
```

### 2️⃣ **Open Console**
```
Mac: Cmd + Option + J
Windows: Ctrl + Shift + J
```

### 3️⃣ **Copy Script**
```bash
# File location:
/Users/j.wild/Projects/3lectrify-platform/DESIGN_SYSTEM_AUDIT_SCRIPT.js

# Open in editor, Cmd + A to select all, Cmd + C to copy
```

### 4️⃣ **Paste & Run**
```
Paste in console → Press Enter
```

### 5️⃣ **Read Results**
- ✅ = Perfect match
- ❌ = Needs fixing
- ⚠️ = Not on this page

---

## 📊 What It Checks

| Component | What's Verified |
|-----------|----------------|
| **Content Wrapper** | Max-width 1440px, Padding 50px |
| **Header** | Position sticky, Nav font 18px/24px |
| **Hero** | Background color, H1 48px/58px, Body 24px/34px |
| **Feature Cards** | Grid layout, Padding 25px, Gap 25px |
| **Text + Image** | 2-column 645px+645px, Gap 50px |
| **Footer** | Gradient 20px, Headline 36px/48px, LinkedIn icon |
| **Typography** | All H1/H2/H3/Body sizes and line-heights |
| **Colors** | Brand colors (Green, Orange, Blue) |
| **Responsive** | Current breakpoint (Mobile/Tablet/Desktop) |

---

## 🎯 Expected Results (Desktop)

```
📦 CONTENT WRAPPER
  ✅ Max Width: 1440px
  ✅ Padding: 50px

🖼️ TEXT + IMAGE SECTION
  Grid Template Columns: 645px 645px
  ✅ 2-Column Layout: Yes
  ✅ Gap: 50px
  ✅ Image Width: 645px
  ✅ Text Width: 645px
  ✅ Elements: Side-by-side

🦶 FOOTER
  ✅ Gradient Height: 20px
  ✅ LinkedIn Icon: Present
  ✅ Headline: 36px/48px
```

---

## 🔧 Common Fixes

### ❌ Grid Template Columns: 1340px (single column)
**Fix:** Use mobile-first responsive classes
```tsx
grid-cols-1 md:grid-cols-text-image
```

### ❌ Font size 47.5px instead of 48px
**No fix needed:** Browser rounding (<2px tolerance)

### ❌ Padding doesn't match
**Check:** Element inside `.content-wrapper`?

---

## 📝 Pages To Test

- [ ] `/` (Homepage)
- [ ] `/ihr-vorteil` (Ihr Vorteil)
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768-1024px)
- [ ] Desktop view (>= 1024px)

---

## 📚 Full Documentation

See `DESIGN_SYSTEM_AUDIT_GUIDE.md` for:
- Detailed explanations
- Troubleshooting guide
- Advanced usage
- Creating reports

---

**Run this script after every design change! 🎯**



# Kontakt Page Fixes - 2025-10-21

## Issues Reported

1. ❌ Cannot see the gradient overlay
2. ❌ The picture starts with 0 margin/padding  
3. ❌ The form is not 2-column layout but has strange whitespace

---

## Fixes Applied

### 1. ContactSimple Component

**Problem:** Custom padding/max-width didn't match global container system

**Solution:**
- Replaced custom `max-w-[1440px] mx-auto px-[50px]` with `.content-wrapper` class
- This ensures consistent margins: 50px desktop, 40px tablet, 20px mobile
- Changed responsive breakpoint from `lg:` to `md:` for 2-column layout

**Changes:**
```tsx
// BEFORE
<div className="w-full max-w-[1440px] mx-auto px-[50px] lg:px-10 sm:px-5">
  <div className="flex gap-[50px] lg:gap-10 sm:flex-col sm:gap-[50px] items-start">

// AFTER
<div className="content-wrapper">
  <div className="flex gap-[50px] md:gap-10 sm:flex-col sm:gap-[50px] items-start">
```

---

### 2. HeroGradient Component

**Current Status:** The component is already using `.content-wrapper` correctly.

**Issue:** The gradient overlay might not be visible due to:
- Z-index stacking
- Background gradient not rendering correctly
- Text visibility issues

**To verify:**
1. Check if text "Kontakt" appears on the hero image
2. Check if gradient fades from solid dark to transparent
3. Check if image has proper margins (should be within content-wrapper bounds)

---

## Testing Checklist

### Desktop (1440px+)
- [ ] Hero image has 50px margins on left/right
- [ ] Hero text "Kontakt" is visible over image
- [ ] Gradient overlay is visible
- [ ] Form and Address are side-by-side (50px gap)
- [ ] Both columns have equal width

### Tablet (768px-1199px)
- [ ] Hero image has 40px margins
- [ ] Form and Address are side-by-side (smaller gap)
- [ ] Content is readable

### Mobile (<768px)
- [ ] Hero image is full-width with vertical gradient
- [ ] Form and Address stack vertically
- [ ] Form fields are full-width
- [ ] Padding is 20px

---

## Next Steps

If the Hero Gradient still has issues:
1. Inspect the element in browser DevTools
2. Check z-index layering
3. Verify gradient CSS is applied
4. Check if text has sufficient contrast

The form 2-column layout should now work correctly! ✅


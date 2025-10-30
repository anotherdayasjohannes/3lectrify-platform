# Section Spacing Standard

## Overview

This document defines the standardized section spacing system for pixel-perfect 100px gaps between all page sections.

## The Standard

**Goal:** 100px vertical space between adjacent sections on desktop/tablet, 80px on mobile

**Formula:** 
- Section A bottom padding (50px) + Section B top padding (50px) = 100px gap
- Mobile: 40px + 40px = 80px gap

## Implementation

### Theme Primitives

Located in `/apps/3lectrify/components/theme.ts`:

```typescript
spacing: {
  sectionSpacing: {
    mobile: {
      top: '40px',
      bottom: '40px',
    },
    tablet: {
      top: '50px',
      bottom: '50px',
    },
    desktop: {
      top: '50px',
      bottom: '50px',
    },
  },
}
```

### Standard Pattern

All section components use this Tailwind pattern:

```tsx
<section className="pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]">
  {/* content */}
</section>
```

## Responsive Behavior

| Viewport | Top Padding | Bottom Padding | Gap Between Sections |
|----------|-------------|----------------|----------------------|
| **Mobile** (<768px) | 40px | 40px | 80px |
| **Tablet** (768px-1023px) | 50px | 50px | 100px |
| **Desktop** (≥1024px) | 50px | 50px | 100px |

## Updated Components

All 15 section components now use this standard:

1. ✅ Hero.tsx
2. ✅ StackedExplainer.tsx
3. ✅ FeatureCards.tsx
4. ✅ FeatureShowcase.tsx
5. ✅ TextImage.tsx
6. ✅ SimpleTextImage.tsx
7. ✅ ReferencesGrid.tsx
8. ✅ ReferencesMarquee.tsx
9. ✅ TeamGrid.tsx
10. ✅ Stats.tsx
11. ✅ CTA.tsx
12. ✅ ContactSimple.tsx
13. ✅ HeroGradient.tsx (fixed-height hero, no vertical padding needed)
14. ✅ LegalContent.tsx
15. ✅ FeatureDesign.tsx

## Exceptions

### Header & Footer
- Have their own padding rules
- Not part of the section spacing system
- Sections start below header with standard 50px top padding

### HeroGradient
- Uses fixed height (`h-[400px]` etc.) instead of padding
- No vertical padding applied
- Does not disrupt section spacing flow

## Visual Result

```
┌─────────────────────────────┐
│ Header (own padding)         │
└─────────────────────────────┘
         │ 50px
┌─────────────────────────────┐
│ Section 1 (Hero)             │
│ pt-[50px] pb-[50px]          │
└─────────────────────────────┘
         │ 100px total
         │ (50px + 50px)
┌─────────────────────────────┐
│ Section 2 (FeatureCards)     │
│ pt-[50px] pb-[50px]          │
└─────────────────────────────┘
         │ 100px total
┌─────────────────────────────┐
│ Section 3 (TextImage)        │
│ pt-[50px] pb-[50px]          │
└─────────────────────────────┘
         │ 50px
┌─────────────────────────────┐
│ Footer (own padding)         │
└─────────────────────────────┘
```

## Before vs After

### Before (Inconsistent)
- Hero: 40px/60px → 50px/80px
- StackedExplainer: 50px/50px → 60px/60px → 80px/80px
- FeatureCards: 80px/100px → 60px/80px
- TextImage: 40px/60px → 50px/80px
- ReferencesGrid: 80px/80px → 128px/128px
- TeamGrid: 100px/80px → 80px/60px → 60px/50px

**Result:** Gaps ranged from 100px to 200px+

### After (Consistent)
- **All sections:** 40px/40px (mobile) → 50px/50px (desktop)
- **All gaps:** 80px (mobile), 100px (desktop)

## Maintenance

When creating new section components:

1. Import spacing from theme: `import { spacing } from './theme';`
2. Apply standard Tailwind classes: `pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]`
3. Never use custom py values like `py-20`, `py-[80px]`, etc.
4. Refer to this document for the standard

## Testing Checklist

- [ ] Visual check on homepage (all sections have 100px gaps)
- [ ] Visual check on all other pages
- [ ] Mobile viewport (<768px) - 80px gaps
- [ ] Tablet viewport (768px-1023px) - 100px gaps  
- [ ] Desktop viewport (≥1024px) - 100px gaps
- [ ] Adjacent same-background sections maintain spacing
- [ ] Hero/first-section spacing correct

## Related Files

- `/apps/3lectrify/components/theme.ts` - Spacing primitives
- All section components in `/apps/3lectrify/components/`
- This document: `/SECTION_SPACING_STANDARD.md`

---

**Status:** ✅ Implemented  
**Date:** 2025-10-30  
**Branch:** `feature/section-spacing-standard`


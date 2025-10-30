# Current Implementation vs Figma Design Audit

**Purpose:** Identify discrepancies between current code and Marion's Figma specifications  
**Date:** 2025-10-30  
**Status:** Sprint 0.5 - Pre-Component Refactoring  
**Auditor:** Development Team

---

## Executive Summary

**Overall Status:** 🟡 **Partially Aligned**

- ✅ **Font Family:** Lato is correctly loaded and configured
- ✅ **Some Typography:** H1 (48px), body text (18px), numbers (36px) match Figma
- ⚠️ **Some Discrepancies:** H2 size differs in some components, card titles too large
- ❌ **Inconsistent Application:** Hard-coded values throughout codebase

**Key Finding:** While some components match Figma specs, the lack of a design system means inconsistencies exist across the codebase.

---

## Typography Audit

### H1 - Main Headlines

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| Hero.tsx | 48px / 300 weight | 48px / 300 | ✅ Match | Correct! |
| Tailwind config | 48px / 58px line-height | 48px / 58px | ✅ Match | Already defined |

**Verdict:** ✅ **H1 is correctly implemented**

---

### H2 - Section Headlines

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| Tailwind config | 36px / 46px | 36px / 46px | ✅ Match | Correct definition |
| FeatureCards.tsx (line 136) | 40px / 300 | 36px / 300 | ⚠️ **Mismatch** | **Too large by 4px** |
| StackedExplainer.tsx (line 148) | 40px / 300 | 36px / 300 | ⚠️ **Mismatch** | **Too large by 4px** |
| Hero.tsx | 40px / 300 | 36px / 300 | ⚠️ **Mismatch** | **Too large by 4px** (if H2 used) |
| Footer.tsx (line 90) | 32px / 300 | 36px / 300 | ⚠️ **Mismatch** | **Too small by 4px** |
| TeamGrid.tsx (line 229) | 36px / 300 | 36px / 300 | ✅ Match | Correct! |
| ContactSimple.tsx (line 154) | 36px / 300 | 36px / 300 | ✅ Match | Correct! |

**Verdict:** ⚠️ **H2 is inconsistently applied**
- 3 components use 40px (should be 36px)
- 1 component uses 32px (should be 36px)
- 2 components correct at 36px

---

### H3 - Card Titles

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| FeatureCards.tsx (line 171) | 24px / 400 | 20px / 400 | ⚠️ **Mismatch** | **Too large by 4px** |
| StackedExplainer.tsx (line 225) | 32px / 300 | 20px / 400 | ❌ **Major mismatch** | **Wrong size AND weight** |
| TeamGrid.tsx (line 393) | 18px / 400 | 20px / 400 | ⚠️ **Mismatch** | **Too small by 2px** |

**Verdict:** ❌ **H3 needs significant fixes**
- FeatureCards: 4px too large
- StackedExplainer: 12px too large + wrong weight (300 vs 400)
- TeamGrid: 2px too small

---

### Body Text - Copy Lato Reg 18

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| Tailwind config | 18px / 26px / 400 | 18px / 26px / 400 | ✅ Match | Perfect! |
| FeatureCards.tsx (line 144, 175) | 18px / 400 | 18px / 400 | ✅ Match | Correct! |
| TextImage.tsx (line 192) | 18px / 400 | 18px / 400 | ✅ Match | Correct! |
| SimpleTextImage.tsx (line 102) | 18px / 400 | 18px / 400 | ✅ Match | Correct! |
| StackedExplainer.tsx (line 232) | 18px / 400 | 18px / 400 | ✅ Match | Correct! |

**Verdict:** ✅ **Body text correctly implemented site-wide!**

---

### Small Body Text - Copy small Lato Reg 16

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| Footer.tsx (line 96, 109, 125) | 16px / 400 | 16px / 400 | ✅ Match | Correct! |
| ContactSimple.tsx (line 184) | 16px / 400 | 16px / 400 | ✅ Match | Correct! |
| Footer links (line 217, 235) | 14px / 400 | 16px / 400 | ⚠️ **Mismatch** | **Too small by 2px** |

**Verdict:** 🟡 **Mostly correct, minor footer issue**

---

### Intro Text - Intro Lato Light 24

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| Hero.tsx (body-hero) | 24px / 34px / 300 | 24px / 34px / 300 | ✅ Match | Perfect! |
| CTA.tsx (line 47) | 24px / 300 | 24px / 300 | ✅ Match | Correct! |

**Verdict:** ✅ **Intro text matches Figma!**

---

### Quote Text - Quote Lato Light 28 italic

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| TextImage.tsx (line 174) | 24px / 300 / italic | 28px / 300 / italic | ⚠️ **Mismatch** | **Too small by 4px** |

**Verdict:** ⚠️ **Quote text needs 4px increase**

---

### Numbers - Numbers Lato Reg 36

| Component | Current | Figma Spec | Status | Notes |
|-----------|---------|------------|--------|-------|
| Stats.tsx (line 86) | 36px / 400 | 36px / 400 | ✅ Match | Perfect! |

**Verdict:** ✅ **Statistics match Figma!**

---

## Color Audit

### Background Colors

| Usage | Current | Figma Spec | Status |
|-------|---------|------------|--------|
| Main background | `#293645` | `#293645` (deepBlue) | ✅ Match |
| Card backgrounds | `#3C5067` | `#3C5067` (darkBlue) | ✅ Match |
| FeatureCards (after Marion fix) | `#3C5067` | `#3C5067` | ✅ Match |
| StackedExplainer cards | `#1C242E` | Not in Figma | ⚠️ Custom color |

**Verdict:** ✅ **Primary backgrounds match Figma**

### Accent Colors

| Usage | Current | Figma Spec | Status |
|-------|---------|------------|--------|
| Primary accent (buttons, icons) | `#88C0B1` | `#88C0B1` (middleGreen) | ✅ Match |
| Light accent (hover) | `#C5E0D7` | `#C5E0D7` (lightGreen) | ✅ Match |
| Orange accent | `#D04227` | `#D04227` | ✅ Match |

**Verdict:** ✅ **Accent colors match Figma perfectly**

---

## Priority Fixes

### 🔴 High Priority (Visual Impact)

1. **H2 in 3 components (40px → 36px)**
   - FeatureCards.tsx line 136
   - StackedExplainer.tsx line 148
   - Hero.tsx (if H2 used)
   - **Impact:** Headlines too large, inconsistent spacing

2. **H3 in StackedExplainer (32px/300 → 20px/400)**
   - StackedExplainer.tsx line 225
   - **Impact:** Card titles too large, wrong weight

3. **H3 in FeatureCards (24px → 20px)**
   - FeatureCards.tsx line 171
   - **Impact:** Card titles too large

### 🟡 Medium Priority

4. **Quote text (24px → 28px)**
   - TextImage.tsx line 174
   - **Impact:** Quotes too small, subtle difference

5. **Footer H2 (32px → 36px)**
   - Footer.tsx line 90
   - **Impact:** Footer headline too small

6. **TeamGrid names (18px → 20px)**
   - TeamGrid.tsx line 393
   - **Impact:** Team member names slightly too small

### 🟢 Low Priority

7. **Footer links (14px → 16px)**
   - Footer.tsx lines 217, 235
   - **Impact:** Small links slightly too small

---

## Fix Strategy

### Phase 1: Create Design System Components (Sprint 1)
1. Create `Heading` component with exact Figma specs
2. Create `BodyText` component with variants
3. Create `IntroText` component
4. Create `Quote` component with 28px size
5. Create `StatNumber` component

### Phase 2: Migrate Components (Sprint 1-2)
1. Replace all hard-coded H2 (40px) with `<Heading variant="h2">` (36px)
2. Replace all hard-coded H3 (24px, 32px) with `<Heading variant="h3">` (20px)
3. Replace quote text with `<Quote>` component (28px)
4. Update Footer headline and links

### Phase 3: Verify (Sprint 1-2)
1. Visual comparison: Screenshot vs Figma
2. Get Marion's approval
3. Document any intentional deviations

---

## Estimated Impact

### Lines of Code to Change

**Hard-coded font sizes found:**
- Approximately 35+ instances of `text-[XXpx]` across 18 components
- Most will be replaced with component imports

**Estimated Changes:**
- **Sprint 1:** 10-15 files updated
- **Lines changed:** ~50-80 lines (replacing classes with components)
- **Testing:** All 8 pages need visual verification

### Visual Changes Users Will Notice

**Noticeable:**
- ⚠️ H2 headlines slightly smaller (40px → 36px) - **4px difference**
- ⚠️ FeatureCard titles smaller (24px → 20px) - **4px difference**
- ⚠️ StackedExplainer titles much smaller (32px → 20px) - **12px difference!**

**Subtle:**
- Quote text slightly larger (24px → 28px) - **4px difference**
- Footer headline slightly larger (32px → 36px) - **4px difference**

**Recommendation:** 
- Show Marion a before/after comparison for StackedExplainer (12px change is significant)
- Get approval before deploying to production

---

## Success Criteria

✅ **All typography matches Figma exactly**  
✅ **No hard-coded font sizes (all use components)**  
✅ **All colors reference theme.ts**  
✅ **Marion approves visual comparison**  
✅ **Consistent design system across all pages**

---

## Related Documents

- **Design Tokens:** `packages/ui/theme.ts`
- **Component Mapping:** `docs/FIGMA_TO_COMPONENTS.md`
- **Implementation Plan:** `component-architecture-refactoring.plan.md`

---

**Last Updated:** 2025-10-30  
**Next Review:** After Sprint 1 (component creation)  
**Maintained By:** Development Team


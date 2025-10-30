# Marion's Feedback Implementation Checklist

**Date:** 2025-10-29
**Source:** markup.io export (12 feedback items)
**Status:** 🔄 In Progress

---

## ✅ Implementation Strategy

**Approach:** Global → Components → Page-specific → Bugs → Discussion
**Why:** Changes cascade from globals down, ensuring nothing is missed

---

## 🌍 GLOBAL CHANGES

### 1. Typography - Body Text 18px Regular
**Marion's Feedback:** #1, #12 - "Ich hatte im Design die Copy jetzt generell auf 18 px/regular gesetzt. Bitte überall anpassen."

**Files to Update:**
- [ ] `apps/3lectrify/app/globals.css` or `tailwind.config.ts`
  - Base body text: `font-size: 18px` (currently 16px?)
  - Font weight: `font-weight: 400` (regular, not 300/light)

**CSS Classes to Check:**
- [ ] `.text-base` → should be 18px
- [ ] `.prose` classes → body text 18px
- [ ] All `font-light` → change to `font-normal`

**Components Affected:**
- All text content across all pages
- Automatically cascades

**Verification:**
- [ ] Homepage body text = 18px regular
- [ ] /ihr-vorteil body text = 18px regular
- [ ] /unser-konzept body text = 18px regular
- [ ] Footer text = 18px regular

---

### 2. Typography - Remove All Font-Light
**Marion's Feedback:** #7, #12 - "Typo regular" / "Bitte regular statt light"

**Files to Update:**
- [ ] Search codebase for `font-light` class
- [ ] Replace all `font-light` with `font-normal` or remove

**Command to find:**
```bash
grep -r "font-light" apps/3lectrify --include="*.tsx" --include="*.ts"
```

**Expected Locations:**
- FeatureCards component
- TextImage component
- Footer component
- Any custom text components

**Verification:**
- [ ] No `font-light` remains in any component
- [ ] All body text uses `font-normal` (400 weight)

---

## 🧩 COMPONENT CHANGES

### 3. FeatureCards - Remove Outline
**Marion's Feedback:** #11 - "Haben die Boxen eine Outline? Die würde ich löschen."

**File:** `packages/ui/components/FeatureCards.tsx`

**Change:**
- [ ] Remove `border` or `outline` class from card wrapper
- [ ] Check for `ring-*` classes (Tailwind)
- [ ] Verify no CSS `outline` property

**Code Location:**
```tsx
// Find the card wrapper div, look for:
className="... border border-gray-300 ..." // Remove this
className="... ring-1 ring-gray-200 ..." // Or this
```

**Verification:**
- [ ] Cards have no visible border/outline
- [ ] Spotlight effect still works
- [ ] Hover state looks clean

---

### 4. FeatureCards - Styling Update (BG, Glow, Text)
**Marion's Feedback:** #6 - "Könntest du den BG mal auf dark blue #3C5067 und den Schein auf weiss? Und die Typo vom Fliesstext regular."

**File:** `packages/ui/components/FeatureCards.tsx`

**Changes:**
- [ ] **Background:** Change to `#3C5067` (dark blue)
  ```tsx
  // Replace current bg with:
  className="bg-[#3C5067]"
  ```

- [ ] **Glow/Spotlight:** Change to white
  ```tsx
  // In spotlight effect (likely gradient or box-shadow):
  background: 'radial-gradient(circle at ..., rgba(255,255,255,0.2), transparent)'
  // or
  box-shadow: '0 0 20px rgba(255,255,255,0.3)'
  ```

- [ ] **Text:** Ensure `font-normal` not `font-light`

**Verification:**
- [ ] Card background = #3C5067
- [ ] Spotlight/glow is white
- [ ] Text is regular weight
- [ ] Text is readable on dark background (check contrast)

---

### 5. FeatureCards - Fix Scale Animation
**Marion's Feedback:** #6 - "Geht es, dass die nicht größer werden als ihre finale Größe, die werden so bisschen größer und dann wieder kleiner."

**File:** `packages/ui/components/FeatureCards.tsx`

**Issue:** Cards scale beyond 100% then scale back down (overshoot)

**Current Animation (likely):**
```tsx
// GSAP timeline probably has:
.to(card, { scale: 1.05 }) // Overshoots
.to(card, { scale: 1 })     // Scales back
```

**Fix:**
```tsx
// Change to:
.to(card, { scale: 1, ease: "power2.out" }) // Direct to final size
// Remove any scale > 1
```

**Verification:**
- [ ] Cards animate to final size without overshooting
- [ ] Animation feels smooth (not abrupt)
- [ ] Hover state still works

---

### 6. Buttons - White Hover Color
**Marion's Feedback:** #10 - "Als Hover Farbe bitte mal weiss testen."

**Files to Check:**
- [ ] `packages/ui/components/Button.tsx` (if exists)
- [ ] CTA component
- [ ] Any button component

**Change:**
```tsx
// Current hover (probably):
hover:bg-primary-600

// Test with:
hover:bg-white hover:text-gray-900
```

**Verification:**
- [ ] Button hover = white background
- [ ] Text color adjusts for contrast
- [ ] Looks good on all page backgrounds

---

### 7. Text Animations - Long Text Flow
**Marion's Feedback:** #2 - "Die Animation finde ich gut für Headline, für Text mit mehr als 1-2 Zeilen zu viel. Das dauert zu lange. Dann eher die Fliesstext-Animation verwenden."

**Issue:** Word-by-word (SplitText) animation too slow for body paragraphs

**File:** Look for components using SplitText on body text
- [ ] `/ihr-vorteil` page components
- [ ] Any TextImage or section components

**Change:**
```tsx
// If text > 2 lines:
// REMOVE: SplitText word-by-word animation
// USE: Simple fade-in or slide-up for entire paragraph

// Example:
// OLD: gsap.to(words, { opacity: 1, stagger: 0.05 })
// NEW: gsap.to(paragraph, { opacity: 1, y: 0, duration: 0.8 })
```

**Rule:**
- Headlines: Keep SplitText word-by-word ✅
- Body text (>2 lines): Use flow animation (fade/slide) ✅

**Verification:**
- [ ] Headlines animate word-by-word
- [ ] Body paragraphs fade/slide in as whole blocks
- [ ] Animation timing feels natural

---

## 📄 PAGE-SPECIFIC CHANGES

### 8. Paragraph Spacing & Line Breaks
**Marion's Feedback:** #1 - "Bei Fliesstexten immer entweder eine Leerzeile einfügen > richtiger Absatz, oder den Zeilenumbruch rausnehmen."

**Issue:** Inconsistent paragraph spacing (single line breaks vs proper paragraphs)

**Files:** Sanity content + rendering
- [ ] Check Sanity Studio portable text rendering
- [ ] `packages/sanity` - PortableText component

**Change:**
```tsx
// Ensure PortableText renders:
// - Double line break = new paragraph with margin
// - Single line break = remove or render as <br />

// In Sanity Studio: Educate editors on proper paragraph breaks
```

**Verification:**
- [ ] Paragraphs have proper spacing (1 line visual)
- [ ] No awkward single line breaks mid-paragraph
- [ ] Consistent across all pages

---

### 9. Headline to Body Spacing
**Marion's Feedback:** #3, #4 - "Hier den Abstand zum Fliesstext vergrößern. Visuell 1 Zeile."

**Location:** /ihr-vorteil page (likely all pages)

**Files:**
- [ ] Section components with headline + body pattern
- [ ] `packages/ui/components/TextImage.tsx` or similar

**Change:**
```tsx
// Increase margin between headline and body:
<h2 className="mb-6">Headline</h2> // Increase from mb-4
<p className="...">Body text</p>
```

**Verification:**
- [ ] Visual spacing = 1 line height (~24-32px)
- [ ] Consistent across all headline/body combinations
- [ ] Looks balanced

---

### 10. Left-Align Element
**Marion's Feedback:** #5 - "Kannst du das hier links bündig setzen zum Text oberhalb?"

**Location:** /unser-konzept page

**File:** Needs identification (screenshot #5)

**Change:**
```tsx
// Likely a centered element that should be left-aligned:
className="mx-auto" // Remove
className="text-center" // Change to text-left
```

**TODO:** Identify specific element from screenshot

**Verification:**
- [ ] Element aligns left with text above
- [ ] Layout looks balanced

---

## 🐛 BUG FIXES

### 11. Stacked Cards Jump Bug
**Marion's Feedback:** #8 - "Wenn der Block oben „einrastet" hüpft der Textblock nach unten."

**Location:** /unser-konzept page - StackedExplainer component

**File:** `packages/ui/components/StackedExplainer.tsx`

**Issue:** When top card "snaps" into sticky position, text below jumps

**Likely Cause:**
- Sticky positioning changes layout flow
- Missing `min-height` on container
- Transform causing reflow

**Investigation:**
```tsx
// Check for:
position: sticky
transform: translateY()
// These can cause layout shifts
```

**Fix Options:**
1. Reserve space for sticky element
2. Use `will-change: transform`
3. Adjust sticky positioning offset

**Verification:**
- [ ] Cards stack smoothly without text jump
- [ ] Layout remains stable during scroll
- [ ] No layout shift (CLS score)

---

## 💬 NEEDS DISCUSSION

### 12. Team Cards Animation Distance
**Marion's Feedback:** #9 - "Lass uns da mal sprechen. Diese Karten legen einen ziemlich langen Weg zurück. Ich glaube das sollten wir anders machen."

**Location:** Homepage - TeamGrid component

**File:** `packages/ui/components/TeamGrid.tsx`

**Current:** Cards fly in from far right with 360° rotation

**Marion's Concern:** Animation travel distance too long

**Action Required:**
- [ ] Schedule discussion with Marion
- [ ] Show current animation options
- [ ] Get specific direction on preferred animation

**Options to Present:**
1. Reduce travel distance (from 200% to 50%?)
2. Change entry direction (from bottom instead?)
3. Remove rotation, keep slide?
4. Simpler fade-in animation?

**Status:** 🗣️ **Blocked - Waiting for Marion's input**

---

## 🧪 TESTING CHECKLIST

### Local Testing (Dev Server)
- [ ] `pnpm dev` - Start 3lectrify dev server
- [ ] Test on http://localhost:3000
- [ ] Check all pages:
  - [ ] Homepage (/)
  - [ ] /ihr-vorteil
  - [ ] /unser-konzept
  - [ ] /ueber-uns
  - [ ] /kontakt

### Visual Verification
- [ ] Typography: 18px regular everywhere
- [ ] FeatureCards: Dark blue bg, white glow, no outline
- [ ] Buttons: White hover works
- [ ] Animations: Smooth, no jumps
- [ ] Spacing: Headlines to body = 1 line visual

### Cross-Browser Testing
- [ ] Chrome (primary)
- [ ] Safari (Mac)
- [ ] Firefox (optional)

### Performance
- [ ] No console errors
- [ ] Animations smooth (60fps)
- [ ] No layout shifts

---

## 🚀 DEPLOYMENT

### Pre-Deploy Checklist
- [ ] All changes tested locally
- [ ] Git commit with clear message
- [ ] Screenshots of before/after (for Marion)

### Deployment
```bash
cd /Users/j.wild/Projects/3lectrify-platform

# Commit changes
git add -A
git commit -m "feat: Implement Marion's feedback (typography, components, animations)

- Global: Body text 18px regular
- FeatureCards: Dark blue BG (#3C5067), white glow, no outline
- FeatureCards: Fix scale animation (no overshoot)
- Buttons: White hover color
- Text animations: Long text uses flow animation
- Spacing: Headlines to body (1 line visual)
- Bug fix: Stacked cards jump

Refs: markup.io feedback #1-12"

# Push to production
git push origin main
```

### Post-Deploy Verification
- [ ] Visit production URL
- [ ] Verify all changes live
- [ ] No broken elements
- [ ] Share with Marion for approval

---

## 📊 PROGRESS TRACKER

**Total Items:** 12
**Completed:** 0
**In Progress:** 0
**Blocked:** 1 (#9 - needs discussion)

### By Category:
- **Global:** 0/2
- **Components:** 0/5
- **Page-specific:** 0/3
- **Bugs:** 0/1
- **Discussion:** 0/1

---

## 📝 NOTES

### Questions for Marion:
1. Team cards animation (#9) - What alternative do you prefer?
2. White button hover - Should this apply to all buttons or just primary?
3. Feature cards dark blue - Does this affect readability? Need white text?

### Technical Decisions:
- Typography changes global = affects all pages automatically ✅
- Component changes = affects all instances across site ✅
- Page-specific = need to identify exact elements

---

**Last Updated:** 2025-10-29
**Next Update:** After implementing global changes

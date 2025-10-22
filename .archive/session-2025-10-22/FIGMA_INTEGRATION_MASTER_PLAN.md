# 🎨 Figma Integration Master Plan
## Critical Milestone: Design System Alignment

**Status:** Analysis Complete → Implementation Ready  
**Source:** Anima Export from Figma (WIP folder)  
**Goal:** Pixel-perfect design system matching Figma specs  
**Priority:** CRITICAL - This is the foundation for all pages

---

## 📊 **Analysis Summary**

### ✅ **What We Found in Figma Export:**

#### **1. Design Tokens (CSS Variables)**
```css
/* From /WIP/tailwind.css - FIGMA SOURCE OF TRUTH */
--variable-collection-dark-blue: rgba(60, 80, 103, 1);        /* #3c5067 */
--variable-collection-middle-green: rgba(136, 192, 177, 1);   /* #88c0b1 */
--variable-collection-light-green: rgba(197, 224, 215, 1);    /* #c5e0d7 */
--variable-collection-white: rgba(255, 255, 255, 1);
--variable-collection-light-grey: rgba(194, 194, 194, 1);     /* #c2c2c2 */
--variable-collection-dark-grey: rgba(51, 51, 51, 1);         /* #333333 */
--variable-collection-middle-grey: rgba(102, 102, 102, 1);    /* #666666 */

/* Additional colors */
--variable-collection-orange: rgba(208, 66, 39, 1);
--variable-collection-beige: rgba(222, 163, 99, 1);
--variable-collection-curry: rgba(234, 178, 87, 1);
--variable-collection-yellow-light: rgba(245, 204, 126, 1);
--variable-collection-puder: rgba(253, 232, 214, 1);
```

#### **2. Spacing Pattern (EXACT Figma Values)**
```typescript
// Navigation
padding: px-[50px] py-2.5
height: h-20 (80px)
gap: gap-[30px]

// Sections
padding: pt-[50px] pb-20 px-[50px]
       = pt-[50px] pb-[80px] px-[50px]
gap: gap-[25px], gap-[50px], gap-[15px], gap-2.5 (10px)

// Typography
H1: text-5xl (48px) / leading-[58px] / tracking-[0.48px]
H2: text-4xl (36px) / leading-[46px] / tracking-[0.36px]
Body Large: text-2xl (24px) / leading-[34px] / tracking-[0.24px]
Body Regular: text-lg (18px) / leading-6 (24px) / tracking-[0.18px]
Body Small: text-base (16px) / leading-[26px] / tracking-[0.16px]
```

#### **3. Component Architecture**
```
Projekte Page Structure:
├── NavigationSection (Header)
├── IntroductionSection (Hero variant)
├── ProjectShowcaseSection (Text+Image with Stats)
├── ProjectGallerySection (Image+Text reversed)
├── AdditionalReferencesSection (Grid)
├── CallToActionSection (CTA card)
└── FooterSection
```

#### **4. Typography System**
```css
/* Font: Lato (already installed ✅) */
H1: font-light text-5xl leading-[58px] tracking-[0.48px]
H2: font-light text-4xl leading-[46px] tracking-[0.36px]
H3: font-light text-[28px] tracking-[0.28px]
Body Large: font-light text-2xl leading-[34px] tracking-[0.24px]
Body Regular: font-normal text-lg leading-6 tracking-[0.18px]
Body Small: font-normal text-base leading-[26px] tracking-[0.16px]
```

---

## 🎯 **The Problem**

### **Current State (Homepage):**
- ✅ Colors are correct
- ❌ **Spacing is off** - Using custom utilities (`gap-large`, `py-[50px]`)
- ❌ **Typography sizing slightly off** - Not exact Figma values
- ❌ **Line heights wrong** - Leading values don't match
- ❌ **Letter spacing missing** - No tracking values
- ❌ **Padding inconsistent** - Not using Figma's `px-[50px]` pattern

### **Root Cause:**
We created a **custom design system** before seeing the **Figma export**.  
The Figma export has **exact pixel values** that we must match.

---

## 🚀 **The Solution: 3-Phase Implementation**

### **Phase 1: Design System Realignment** ⚡
**Priority:** CRITICAL  
**Time:** 2-3 hours  
**Goal:** Make our design system match Figma exactly

#### **Step 1.1: Update globals.css**
Replace our custom system with Figma's exact values:

```css
@theme {
  /* Exact Figma Colors */
  --color-dark-blue: #3c5067;              /* was: --color-brand-blue-dark */
  --color-middle-green: #88c0b1;           /* was: --color-brand-green-mid */
  --color-light-green: #c5e0d7;            /* was: --color-brand-green-light */
  --color-white: #ffffff;
  --color-light-grey: #c2c2c2;
  --color-middle-grey: #666666;
  --color-dark-grey: #333333;

  /* Exact Figma Spacing - NO custom names */
  /* Just use Tailwind arbitrary values: px-[50px], gap-[25px], etc. */
}
```

#### **Step 1.2: Remove Custom Utilities**
**Delete these from `@layer utilities`:**
- ❌ `.gap-large`, `.gap-medium`, etc.
- ❌ `.mb-large`, `.p-standard`, etc.
- ❌ Custom typography classes

**Use Figma's exact Tailwind:**
- ✅ `px-[50px]`, `py-2.5`, `gap-[30px]`
- ✅ `text-5xl`, `leading-[58px]`, `tracking-[0.48px]`

#### **Step 1.3: Typography Classes**
Keep ONLY these utility classes (matching Figma):

```css
@layer utilities {
  .text-h1 {
    font-size: 48px;
    line-height: 58px;
    letter-spacing: 0.48px;
    font-weight: 300;
  }
  
  .text-h2 {
    font-size: 36px;
    line-height: 46px;
    letter-spacing: 0.36px;
    font-weight: 300;
  }
  
  .text-body-large {
    font-size: 24px;
    line-height: 34px;
    letter-spacing: 0.24px;
    font-weight: 300;
  }
  
  .text-body-regular {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.18px;
    font-weight: 400;
  }
}
```

---

### **Phase 2: Component Migration** 🔄
**Priority:** HIGH  
**Time:** 4-6 hours  
**Goal:** Port Figma components to our Next.js structure

#### **Step 2.1: Header (NavigationSection)**
**File:** `packages/ui/components/Header.tsx`

**Figma Specs:**
```tsx
- Height: h-20 (80px)
- Padding: px-[50px] py-2.5
- Background: bg-[#3c5067]
- Logo: w-[162px] h-10
- Nav gap: gap-[30px]
- Active indicator: h-0.5 (2px) bg-middle-green
```

**Sanity Schema:**
```typescript
// apps/studio/schemaTypes/objects/navigation.ts
{
  name: 'navigationItem',
  fields: [
    { name: 'label', type: 'string' },
    { name: 'url', type: 'string' },
    { name: 'isButton', type: 'boolean' }
  ]
}
```

#### **Step 2.2: Footer (FooterSection)**
**File:** `packages/ui/components/Footer.tsx`

**Figma Specs:**
```tsx
- Padding: pt-[30px] pb-[50px] px-[60px]
- Background: bg-[#293645]
- Gap: gap-[100px] (columns), gap-[15px] (links)
- Newsletter input: h-9, border-light-green
```

#### **Step 2.3: Hero Variants**
**Update:** `packages/ui/components/Hero.tsx`

**Figma Pattern (IntroductionSection):**
```tsx
- Padding: pt-[50px] pb-20 px-[50px]
- Max width: w-[900px]
- Gap: gap-[25px]
- H1: text-5xl leading-[58px] tracking-[0.48px]
- Body: text-2xl leading-[34px] tracking-[0.24px]
```

#### **Step 2.4: Text+Image Section (ProjectShowcaseSection)**
**New File:** `packages/ui/components/TextImage.tsx`

**Figma Specs:**
```tsx
- Layout: flex gap-[50px]
- Image: w-[645px] h-[430px] rounded-[20px]
- Text: flex-1 (flexible)
- Gap: gap-10 (40px) between elements
- Stats cards: gap-[25px], px-[30px] py-[15px]
```

#### **Step 2.5: CTA Section (CallToActionSection)**
**New File:** `packages/ui/components/CtaSection.tsx`

**Figma Specs:**
```tsx
- Container: w-[900px] bg-dark-blue rounded-[10px]
- Padding: pt-10 pb-[50px] px-[50px]
- Button: bg-light-green, pl-[15px] pr-2.5
```

---

### **Phase 3: Page Implementation** 🏗️
**Priority:** HIGH  
**Time:** 3-4 hours  
**Goal:** Build pages using new components

#### **Step 3.1: Fix Homepage**
Update `apps/3lectrify/app/page.tsx`:
- Use exact Figma spacing
- Apply correct typography
- Match padding/gaps

#### **Step 3.2: Create Projekte Page**
**New File:** `apps/3lectrify/app/projekte/page.tsx`

Use Figma structure:
```tsx
<Header />
<HeroIntro />
<TextImageShowcase />
<TextImageGallery />
<ReferencesGrid />
<CtaSection />
<Footer />
```

#### **Step 3.3: Create Sanity Schemas**
**Priority order:**
1. Navigation (for Header)
2. SiteSettings (global config)
3. TextImage (high-usage component)
4. CtaSection
5. Stats cards
6. Footer content

---

## 📋 **Implementation Checklist**

### **Phase 1: Design System (Must Do First!)**
- [ ] **1.1** Backup current `globals.css`
- [ ] **1.2** Update color variables to match Figma
- [ ] **1.3** Remove custom spacing utilities
- [ ] **1.4** Update typography utilities with exact values
- [ ] **1.5** Test on homepage
- [ ] **1.6** Verify with Figma screenshot comparison

### **Phase 2: Core Components**
- [ ] **2.1** Create `Header.tsx` from NavigationSection
- [ ] **2.2** Create `Footer.tsx` from FooterSection  
- [ ] **2.3** Update `Hero.tsx` with Figma spacing
- [ ] **2.4** Create `TextImage.tsx` component
- [ ] **2.5** Create `CtaSection.tsx` component
- [ ] **2.6** Create `StatCard.tsx` component

### **Phase 3: Sanity Integration**
- [ ] **3.1** Navigation schema
- [ ] **3.2** SiteSettings schema
- [ ] **3.3** TextImage schema
- [ ] **3.4** CtaSection schema
- [ ] **3.5** Footer schema

### **Phase 4: Pages**
- [ ] **4.1** Fix homepage styling
- [ ] **4.2** Create Projekte page
- [ ] **4.3** Add Header/Footer to layout
- [ ] **4.4** Test responsive behavior

---

## 🎨 **Design Token Comparison**

| Token | Current (Ours) | Figma | Action |
|-------|---------------|-------|--------|
| **Colors** | ✅ Match | ✅ Match | Keep |
| **Spacing** | ❌ Custom names | ✅ Exact px | **Fix** |
| **Typography** | ⚠️ Close | ✅ Exact | **Fix** |
| **Line Height** | ❌ Wrong | ✅ Exact | **Fix** |
| **Tracking** | ❌ Missing | ✅ Present | **Add** |
| **Padding** | ❌ Inconsistent | ✅ `px-[50px]` | **Fix** |

---

## 🚦 **Success Criteria**

### **Phase 1 Complete When:**
- ✅ Homepage matches Figma spacing exactly
- ✅ Typography sizes/line-heights match
- ✅ Letter spacing applied
- ✅ Screenshot comparison shows <5px difference

### **Phase 2 Complete When:**
- ✅ Header component pixel-perfect
- ✅ Footer component complete
- ✅ All sections componentized
- ✅ Components work with Sanity

### **Phase 3 Complete When:**
- ✅ Projekte page matches Figma
- ✅ Homepage updated and correct
- ✅ All pages use same design system
- ✅ Responsive works on mobile/tablet/desktop

---

## 💡 **Key Insights from Figma Export**

### **1. Spacing Philosophy**
Figma uses **exact pixel values**, not a scale:
- ✅ `px-[50px]`, `gap-[30px]`, `gap-[25px]`
- ❌ NOT `gap-large`, `gap-medium`

### **2. Typography Philosophy**
Every text element has **3 values**:
1. Font size (`text-5xl`)
2. Line height (`leading-[58px]`)
3. Letter spacing (`tracking-[0.48px]`)

### **3. Color Usage**
- **Dark Blue (#3c5067):** Navigation, cards
- **Middle Green (#88c0b1):** Accents, active states
- **Light Green (#c5e0d7):** Buttons, borders
- **White:** Text on dark backgrounds

### **4. Layout Pattern**
All sections follow:
```tsx
<section className="pt-[50px] pb-20 px-[50px]">
  <container className="max-w-[900px] OR flex gap-[50px]">
    {/* content */}
  </container>
</section>
```

---

## 🎯 **Next Steps (In Order)**

### **Immediate (Today):**
1. ✅ Analyze Figma export (DONE)
2. 🔄 **Update `globals.css` with exact Figma values**
3. 🔄 **Fix homepage Hero component**
4. 🔄 **Update FeatureCards spacing**
5. ✅ **Screenshot comparison test**

### **Next Session:**
1. Create Header component
2. Create Footer component
3. Update layout.tsx to include Header/Footer
4. Create Sanity navigation schema

### **Following Session:**
1. Create TextImage component
2. Create CtaSection component
3. Build Projekte page
4. Test all responsive breakpoints

---

## 📦 **Files to Modify**

### **High Priority:**
1. `apps/3lectrify/app/globals.css` - **Critical**
2. `packages/ui/components/Hero.tsx` - Fix spacing
3. `packages/ui/components/FeatureCards.tsx` - Fix spacing

### **New Files to Create:**
1. `packages/ui/components/Header.tsx`
2. `packages/ui/components/Footer.tsx`
3. `packages/ui/components/TextImage.tsx`
4. `packages/ui/components/CtaSection.tsx`
5. `packages/ui/components/StatCard.tsx`
6. `apps/3lectrify/app/projekte/page.tsx`

### **Sanity Schemas:**
1. `apps/studio/schemaTypes/objects/navigation.ts`
2. `apps/studio/schemaTypes/objects/siteSettings.ts`
3. `apps/studio/schemaTypes/objects/textImage.ts`
4. `apps/studio/schemaTypes/objects/ctaSection.ts`

---

## ✅ **Ready to Execute**

**Status:** Plan Complete → Implementation Ready  
**First Task:** Update `globals.css` with Figma design system  
**Estimated Time:** 2-3 hours to Phase 1 complete  
**Expected Result:** Pixel-perfect homepage matching Figma

---

**This is the foundation. Once Phase 1 is complete, all other pages will be easy!** 🚀





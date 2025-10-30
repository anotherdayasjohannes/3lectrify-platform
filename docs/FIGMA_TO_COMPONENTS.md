# Figma to Component Mapping Guide

**Purpose:** This document maps Marion's Figma text styles to React components  
**Source:** Figma Textstyles export (AnimaPackage-Html-fngAW)  
**Date:** 2025-10-30  
**Status:** Sprint 0.5 - Design Token Extraction

---

## Typography Mapping

All typography components reference the design tokens in `packages/ui/theme.ts`.

### Complete Mapping Table

| Figma Text Style | Component | Variant | Props | Example Usage |
|------------------|-----------|---------|-------|---------------|
| **H1 Lato Light 48** | `<Heading>` | `variant="h1"` | `color?: 'white' \| 'dark' \| 'grey'` | `<Heading variant="h1">Main Title</Heading>` |
| **H2 Lato Light 36** | `<Heading>` | `variant="h2"` (default) | `color?: 'white' \| 'dark' \| 'grey'` | `<Heading variant="h2">Section Title</Heading>` |
| **H3 Lato Reg 20** | `<Heading>` | `variant="h3"` | `color?: 'white' \| 'dark' \| 'grey'` | `<Heading variant="h3">Card Title</Heading>` |
| **Copy Lato Reg 18** | `<BodyText>` | (default) | `color?: 'white' \| 'dark' \| 'grey'` | `<BodyText>Paragraph text</BodyText>` |
| **Copy small Lato Reg 16** | `<BodyText>` | `variant="small"` | `color?: 'white' \| 'dark' \| 'grey'` | `<BodyText variant="small">Small text</BodyText>` |
| **Intro Lato Light 24** | `<IntroText>` | - | `color?: 'white' \| 'dark'` | `<IntroText>Lead paragraph</IntroText>` |
| **Quote Lato Light 28 italic** | `<Quote>` | - | `text, author?, icon?` | `<Quote text="..." author="..." />` |
| **Numbers Lato Reg 36** | `<StatNumber>` | - | `value, color?` | `<StatNumber value="42" color="#88C0B1" />` |

---

## Detailed Component Specifications

### 1. Heading Component

**Figma Styles:** H1, H2, H3

**File:** `packages/ui/components/primitives/Heading.tsx`

**Props:**
```typescript
interface HeadingProps {
  variant?: 'h1' | 'h2' | 'h3';
  color?: 'white' | 'dark' | 'grey';
  children: ReactNode;
  className?: string;
}
```

**Usage Examples:**

```tsx
// Hero headline (H1)
<Heading variant="h1" color="white">
  Wir elektrifizieren die Zukunft
</Heading>

// Section headline (H2) - default variant
<Heading color="white">
  Ihr Vorteil als Investor
</Heading>

// Card title (H3)
<Heading variant="h3" color="white">
  Schnelle Umsetzung
</Heading>
```

**Current Usage in Components:**
- Hero.tsx (H1)
- FeatureCards.tsx (H2 for section, H3 for cards)
- TextImage.tsx (H2)
- CTA.tsx (H2)
- StackedExplainer.tsx (H2, H3)
- TeamGrid.tsx (H2, H3)
- Footer.tsx (H2)
- ContactSimple.tsx (H2)

---

### 2. BodyText Component

**Figma Styles:** Copy Lato Reg 18, Copy small Lato Reg 16

**File:** `packages/ui/components/primitives/BodyText.tsx`

**Props:**
```typescript
interface BodyTextProps {
  variant?: 'regular' | 'small';
  color?: 'white' | 'dark' | 'grey';
  children: ReactNode;
  className?: string;
}
```

**Usage Examples:**

```tsx
// Regular body text (18px) - default
<BodyText color="white">
  Dies ist ein Absatz mit normalem Fließtext.
</BodyText>

// Small body text (16px)
<BodyText variant="small" color="grey">
  Kleingedrucktes oder Metadaten.
</BodyText>
```

**Current Usage in Components:**
- All sections with body text
- Footer (small variant)
- Card descriptions
- Form labels (small variant)

---

### 3. IntroText Component

**Figma Style:** Intro Lato Light 24

**File:** `packages/ui/components/primitives/IntroText.tsx`

**Props:**
```typescript
interface IntroTextProps {
  color?: 'white' | 'dark';
  children: ReactNode;
  className?: string;
}
```

**Usage Examples:**

```tsx
// Section introduction / lead paragraph
<IntroText color="white">
  Unser Antrieb ist es, die Immobilienbranche zu transformieren.
</IntroText>

// Hero subtext
<IntroText>
  Nachhaltige, elektrifizierte Zukunft gestalten.
</IntroText>
```

**Current Usage:**
- Hero.tsx (subtext currently 24px, matches Figma!)
- Section introductions
- CTA descriptions (currently 24px, matches!)

---

### 4. StatNumber Component

**Figma Style:** Numbers Lato Reg 36

**File:** `packages/ui/components/primitives/StatNumber.tsx`

**Props:**
```typescript
interface StatNumberProps {
  value: string | number;
  color?: string; // Custom accent color
  className?: string;
}
```

**Usage Examples:**

```tsx
// Statistics with accent color
<StatNumber value="100%" color="#88C0B1" />
<StatNumber value="42" color="#EAB257" />
<StatNumber value="24/7" />

// In Stats component
<StatNumber 
  value={stat.value} 
  color={accentColors[stat.accentColor]} 
/>
```

**Current Usage:**
- Stats.tsx (currently 36px/400, matches Figma!)

---

### 5. Quote Component (Planned)

**Figma Style:** Quote Lato Light 28 italic

**File:** `packages/ui/components/composites/Quote.tsx` (to be created)

**Props:**
```typescript
interface QuoteProps {
  text: string;
  author?: string;
  icon?: {
    url: string;
    alt: string;
  };
  variant?: 'light' | 'dark';
}
```

**Usage Examples:**

```tsx
// Quote block with icon and author
<Quote 
  text="3lectrify hat unsere Erwartungen übertroffen."
  author="Max Mustermann, CEO"
  icon={{ url: "/quote-icon.svg", alt: "Quote" }}
  variant="light"
/>
```

**Current Usage:**
- TextImage.tsx (quote block currently 24px, **needs update to 28px!**)

---

## Color Usage Guide

Colors are defined in `packages/ui/theme.ts` and should be referenced via the `colors` export.

### Primary Colors

| Color Name | Hex | Usage |
|------------|-----|-------|
| `colors.middleGreen` | `#88C0B1` | Primary brand color, buttons, highlights |
| `colors.lightGreen` | `#C5E0D7` | Button hover, light accents |
| `colors.orange` | `#D04227` | CTAs, important highlights, errors |

### Background Colors

| Color Name | Hex | Usage |
|------------|-----|-------|
| `colors.deepBlue` | `#293645` | Main page background |
| `colors.darkBlue` | `#3C5067` | Card backgrounds, elevated surfaces |
| `colors.white` | `#FFFFFF` | Light backgrounds |

### Text Colors

| Color Name | Hex | Usage |
|------------|-----|-------|
| `colors.white` | `#FFFFFF` | Text on dark backgrounds |
| `colors.darkGrey` | `#333333` | Text on light backgrounds |
| `colors.lightGrey` | `#C2C2C2` | Secondary text, muted content |
| `colors.middleGrey` | `#666666` | Tertiary text, disabled states |

---

## Migration Examples

### Before (Hard-coded classes):

```tsx
<h2 className="text-[40px] leading-[50px] tracking-[0.4px] font-light text-white">
  Ihr Vorteil als Investor
</h2>
```

### After (Using Figma-based component):

```tsx
<Heading variant="h2" color="white">
  Ihr Vorteil als Investor
</Heading>
```

**Benefits:**
- ✅ Matches Figma exactly (36px, not 40px)
- ✅ One source of truth (theme.ts)
- ✅ Type-safe props
- ✅ Easy to update globally

---

## Responsive Typography

Components automatically handle responsive typography via Tailwind's responsive classes in `className` prop:

```tsx
<Heading 
  variant="h1" 
  className="md:text-[40px] md:leading-[50px] sm:text-[36px] sm:leading-[46px]"
>
  Responsive Headline
</Heading>
```

Alternatively, custom responsive variants can be added to the component implementation.

---

## Current Implementation Status

### ✅ Completed (Sprint 0.5)
- [x] Design tokens extracted to `theme.ts`
- [x] Typography mapping documented
- [x] Color palette documented

### 🔄 In Progress (Sprint 1)
- [ ] Create `Heading` component
- [ ] Create `BodyText` component
- [ ] Create `IntroText` component
- [ ] Create `StatNumber` component

### ⏸️ Planned (Sprint 2+)
- [ ] Create `Quote` component
- [ ] Migrate existing components to use new primitives
- [ ] Update Tailwind config to reference theme.ts

---

## Related Documentation

- **Design Tokens:** `packages/ui/theme.ts`
- **Current vs Figma Audit:** `docs/CURRENT_VS_FIGMA_AUDIT.md`
- **Component Library:** `docs/COMPONENT_LIBRARY.md` (to be created)

---

**Last Updated:** 2025-10-30  
**Maintained By:** Development Team + Marion (Design)



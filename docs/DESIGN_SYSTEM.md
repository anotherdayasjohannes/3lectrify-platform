# 3lectrify Design System

Complete design system ported from HubSpot to Tailwind CSS + CSS Custom Properties.

---

## 🎨 Colors

### Brand Colors

```tsx
// Primary Brand
bg-brand-blue-dark      // #3c5067 - Navigation, footer
bg-brand-green-mid      // #88c0b1 - Primary accent
bg-brand-green-light    // #c5e0d7 - Light accent

// Usage in Tailwind:
<div className="bg-brand-blue-dark text-white">...</div>
<button className="bg-brand-green-mid hover:bg-brand-green-light">...</button>
```

### Semantic Colors

```tsx
// CSS Custom Properties (theme-aware)
--bg-page              // Page background (white/dark)
--bg-section           // Section background
--bg-card              // Card background
--text-primary         // Primary text
--text-secondary       // Secondary text
--accent-primary       // Primary accent

// Usage:
<div style={{ backgroundColor: 'var(--bg-page)' }}>...</div>
<p style={{ color: 'var(--text-primary)' }}>...</p>
```

### Full Color Palette

| Color | Tailwind Class | Hex | Usage |
|-------|---------------|-----|-------|
| Blue Dark | `bg-brand-blue-dark` | #3c5067 | Nav, footer, sections |
| Blue Grey | `bg-brand-blue-grey` | #5f8299 | Hover states |
| Green Mid | `bg-brand-green-mid` | #88c0b1 | Primary accent |
| Green Light | `bg-brand-green-light` | #c5e0d7 | Light accent |
| Green Supportive | `bg-brand-green-supportive` | #edf4e5 | Cards, backgrounds |
| Orange | `bg-brand-orange` | #d04227 | Warnings, highlights |
| White | `bg-neutral-white` | #ffffff | Text on dark |
| Dark Grey | `bg-neutral-dark-grey` | #333333 | Body text |
| Mid Grey | `bg-neutral-mid-grey` | #666666 | Secondary text |

---

## 📝 Typography

### Font Sizes

```tsx
// Headings (use Tailwind classes)
text-h1        // 48px - Hero headlines
text-h2        // 36px - Section headings
text-h3        // 28px - Quote/emphasis

// Body text
text-body-large    // 24px - Hero subtext
text-body-regular  // 18px - Standard content (default)
text-body-small    // 16px - Forms, cards
text-body-tiny     // 14px - Legal, footer

// Usage:
<h1 className="text-h1">Hero Headline</h1>
<h2 className="text-h2">Section Title</h2>
<p className="text-body-large">Hero subtext</p>
<p className="text-body-regular">Standard paragraph</p>
<span className="text-body-small">Card text</span>
<small className="text-body-tiny">Footer text</small>
```

### Font Weights

- **300**: Headings, hero text (light)
- **400**: Body text (regular)
- **700**: Emphasis (bold) - use sparingly

```tsx
// Weight classes
font-light    // 300
font-normal   // 400
font-bold     // 700

// Usage:
<h1 className="text-h1 font-light">Light headline</h1>
<p className="text-body-regular font-normal">Body text</p>
```

### Responsive Typography

```tsx
// Tablet (768px - 1023px)
md:text-h1-tablet   // 40px
md:text-h2-tablet   // 32px

// Mobile (< 768px)
sm:text-h1-mobile   // 32px
sm:text-h2-mobile   // 28px

// Usage:
<h1 className="text-h1 md:text-h1-tablet sm:text-h1-mobile">
  Responsive headline
</h1>
```

---

## 📏 Spacing

### Spacing Scale

```tsx
// Tailwind spacing (use with gap, margin, padding)
gap-gap-xlarge     // 100px
gap-gap-large      // 50px
gap-gap-medium     // 40px
gap-gap-standard   // 25px
gap-gap-small      // 15px
gap-gap-tiny       // 10px
gap-gap-micro      // 5px

// Usage:
<div className="flex flex-col gap-gap-large">...</div>
<section className="py-gap-xlarge px-gap-large">...</section>
<div className="mb-gap-standard">...</div>
```

### Common Spacing Patterns

```tsx
// Section padding
className="py-[80px] px-[50px]"

// Card spacing
className="p-gap-standard"

// Grid gaps
className="grid gap-gap-medium"

// Stack spacing
className="space-y-gap-small"
```

---

## 🎯 Layout

### Container Widths

```tsx
// Max widths
max-w-content-text   // 900px - Text content
max-w-content-page   // 1440px - Page width

// Usage:
<div className="max-w-content-page mx-auto">...</div>
<article className="max-w-content-text">...</article>
```

### Content Wrapper (Recommended)

```tsx
// Use the .content-wrapper class for consistent page padding
<main className="content-wrapper">
  <section>...</section>
</main>

// Or with Tailwind:
<main className="max-w-content-page mx-auto px-[50px] md:px-[40px] sm:px-[20px]">
  <section>...</section>
</main>
```

### Grid Layouts

```tsx
// Feature cards (4 columns)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gap-medium">
  {cards.map(...)}
</div>

// Two column layout
<div className="grid md:grid-cols-2 gap-gap-xlarge">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

## 🔘 Border Radius

```tsx
// Radius scale
rounded-large     // 20px - Cards, images
rounded-medium    // 10px - Buttons, inputs
rounded-small     // 5px - Small elements

// Usage:
<div className="rounded-large overflow-hidden">
  <Image ... />
</div>
<button className="rounded-medium">Click me</button>
```

---

## ⚡ Transitions

```tsx
// Duration
duration-fast     // 200ms - Hover effects
duration-base     // 300ms - Default animations
duration-slow     // 500ms - Complex animations

// Common patterns
className="transition-colors duration-fast"
className="transition-transform duration-base hover:scale-105"
className="transition-opacity duration-slow"

// Usage:
<button className="bg-brand-green-mid hover:bg-brand-green-light transition-colors duration-fast">
  Hover me
</button>
```

---

## 🎭 Dark Theme

### Using Dark Theme

```tsx
// Apply dark theme to any element
<section data-theme="dark">
  <div className="bg-[var(--bg-page)]">
    Dark background (adapts automatically)
  </div>
</section>

// Or use dark theme classes
<section className="bg-dark-bg-page text-white">
  <h1>Dark section</h1>
</section>
```

### Dark Theme Colors

```tsx
// Backgrounds
bg-dark-bg-page          // #293645
bg-dark-bg-section       // #3c5067
bg-dark-bg-card          // #3c5067
bg-dark-gradient-start   // #1c242e
bg-dark-gradient-end     // #293645

// Usage:
<section className="bg-dark-bg-page text-white py-gap-xlarge">
  <h1 className="text-h1">Dark Hero</h1>
</section>
```

---

## 📦 Component Patterns

### Hero Section

```tsx
<section className="bg-dark-bg-page text-white py-[80px]">
  <div className="content-wrapper">
    <h1 className="text-h1 mb-gap-standard">
      Headline
    </h1>
    <p className="text-body-large max-w-content-text">
      Subtext
    </p>
  </div>
</section>
```

### Feature Cards

```tsx
<section className="py-gap-xlarge">
  <div className="content-wrapper">
    <h2 className="text-h2 text-center mb-gap-large">Section Title</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gap-medium">
      {cards.map(card => (
        <div key={card.id} className="bg-bg-section p-gap-standard rounded-large">
          <h3 className="text-body-large mb-gap-small">{card.title}</h3>
          <p className="text-body-regular text-text-secondary">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Buttons

```tsx
// Primary button
<button className="
  bg-brand-green-mid
  hover:bg-brand-green-light
  text-white
  px-gap-standard
  py-gap-small
  rounded-medium
  transition-colors
  duration-fast
">
  Click Me
</button>

// Secondary button
<button className="
  bg-transparent
  border-2
  border-brand-green-mid
  text-brand-green-mid
  hover:bg-brand-green-mid
  hover:text-white
  px-gap-standard
  py-gap-small
  rounded-medium
  transition-all
  duration-fast
">
  Secondary
</button>
```

---

## 🎯 Best Practices

### Do's

✅ Use semantic CSS custom properties for theme-aware colors:
```tsx
style={{ backgroundColor: 'var(--bg-page)' }}
```

✅ Use Tailwind classes for spacing and layout:
```tsx
className="grid gap-gap-large p-gap-medium"
```

✅ Use design system font sizes:
```tsx
className="text-h2 text-body-large"
```

✅ Follow responsive patterns:
```tsx
className="px-[50px] md:px-[40px] sm:px-[20px]"
```

### Don'ts

❌ Don't use arbitrary values for brand colors:
```tsx
// Bad
className="bg-[#88c0b1]"

// Good
className="bg-brand-green-mid"
```

❌ Don't use inconsistent spacing:
```tsx
// Bad
className="gap-[37px]"

// Good
className="gap-gap-medium"
```

❌ Don't hardcode dark theme colors:
```tsx
// Bad
className="bg-[#293645]"

// Good
className="bg-dark-bg-page"
// Or
style={{ backgroundColor: 'var(--bg-page)' }}
```

---

## 🚀 Quick Reference

### Most Common Classes

```tsx
// Containers
className="content-wrapper"
className="max-w-content-page mx-auto"

// Sections
className="py-gap-xlarge px-gap-large"

// Typography
className="text-h1 font-light"
className="text-body-regular text-text-primary"

// Spacing
className="mb-gap-large"
className="gap-gap-medium"

// Colors
className="bg-brand-blue-dark text-white"
className="bg-brand-green-mid"

// Dark sections
<section data-theme="dark">
  or
className="bg-dark-bg-page"
```

---

## 📚 Migration Guide

### From HubSpot CSS to Tailwind

| HubSpot CSS | Tailwind/CSS Variable |
|-------------|----------------------|
| `var(--brand-blue-dark)` | `bg-brand-blue-dark` |
| `var(--font-h1-size)` | `text-h1` |
| `var(--space-gap-large)` | `gap-gap-large` |
| `var(--radius-large)` | `rounded-large` |
| `var(--transition-base)` | `duration-base` |

### Example Migration

```css
/* HubSpot CSS */
.my-component {
  background-color: var(--brand-blue-dark);
  font-size: var(--font-h2-size);
  padding: var(--space-gap-large);
  border-radius: var(--radius-large);
  transition: all var(--transition-base);
}
```

```tsx
/* Next.js + Tailwind */
<div className="
  bg-brand-blue-dark
  text-h2
  p-gap-large
  rounded-large
  transition-all
  duration-base
">
  Content
</div>
```

---

## 🎨 Figma Integration

All values are derived from the Figma design (Projekte + Über uns pages):
- Typography sizes match Figma exactly
- Colors extracted from Figma color styles
- Spacing follows Figma layout grid
- Components match Figma frames

**Source of Truth**: Figma designs
**Implementation**: Tailwind CSS + CSS Custom Properties
**Validation**: Visual regression testing against HubSpot

---

## 📞 Need Help?

- **Design System File**: `apps/3lectrify/tailwind.config.ts`
- **Global CSS**: `apps/3lectrify/app/globals.css`
- **HubSpot Reference**: `/Users/j.wild/Projects/3lectrify-hubspot/3lectrify_2025_clean/css/base/design-system-unified.css`

When in doubt, refer to the HubSpot CSS or ask Claude with MCP access!

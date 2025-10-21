# 🚀 Figma to Next.js + Sanity Migration Plan

**Project:** 3lectrify Platform  
**From:** HubSpot CMS + Figma Design  
**To:** Next.js 15 + Sanity + Tailwind v4

---

## ✅ **Phase 1: Foundation (COMPLETED)**

### Design System ✅
- [x] Ported brand colors from Figma/HubSpot
- [x] Typography scale configured
- [x] Spacing system defined
- [x] Tailwind v4 configured correctly with `@layer utilities`
- [x] Created test components (Hero, FeatureCards)

### Infrastructure ✅
- [x] Monorepo setup (Turborepo + pnpm)
- [x] Sanity Studio initialized
- [x] Next.js App Router configured
- [x] MCP servers connected (Sanity, Tailwind)
- [x] Initial Sanity schemas (page, hero, featureCards)

---

## 🎯 **Phase 2: Core Layout Components (NEXT)**

### 2.1 Layout Structure
**Priority:** HIGH  
**Estimated Time:** 2-3 hours

#### Components to Create:
1. **RootLayout** (already exists, needs enhancement)
   - Add dark/light theme support
   - Global navigation context
   - Smooth scroll setup (Lenis)

2. **Header Component** (`packages/ui/components/Header.tsx`)
   ```tsx
   - Logo
   - Main navigation
   - Mobile menu (hamburger)
   - Theme toggle (if needed)
   - Sticky behavior
   ```

3. **Footer Component** (`packages/ui/components/Footer.tsx`)
   ```tsx
   - Company info
   - Links (Impressum, Datenschutz, AGB, etc.)
   - Social links
   - Copyright
   ```

4. **Navigation Component** (`packages/ui/components/Navigation.tsx`)
   ```tsx
   - Desktop menu
   - Mobile menu with animations
   - Active link highlighting
   ```

#### Sanity Schemas Needed:
- `navigation.ts` - Navigation menu structure
- `siteSettings.ts` - Global site configuration
- `footer.ts` - Footer content

**HubSpot Reference Files:**
- `/templates/partials/header.html`
- `/templates/partials/footer.html`
- `/templates/layouts/base.html`

---

## 📦 **Phase 3: Content Components (Priority Order)**

### 3.1 Hero Variants
**Priority:** HIGH  
**Status:** Hero component exists, needs variants

#### Components:
1. ✅ `Hero.tsx` - Basic hero (done)
2. `HeroGradient.tsx` - Gradient background variant
3. `HeroDark.tsx` - Full-width dark theme variant

#### Sanity Schema:
```typescript
// Extend hero.ts with variants
{
  name: 'variant',
  type: 'string',
  options: {
    list: ['default', 'gradient', 'dark']
  }
}
```

**HubSpot Reference:**
- `/modules/hero-dark.module/`
- `/modules/hero-gradient.module/`

---

### 3.2 Feature Cards ✅
**Status:** DONE
- Basic implementation complete
- Has GSAP animations
- Responsive grid layout

---

### 3.3 Text + Image Sections
**Priority:** HIGH  
**Estimated Time:** 3-4 hours

#### Components:
1. `TextImage.tsx` - Standard text/image layout
   - Left/right image positioning
   - Dark/light theme variants
   - Responsive behavior

2. `SimpleTextImage.tsx` - Simplified version

#### Sanity Schema:
```typescript
// objects/textImage.ts
{
  name: 'textImage',
  fields: [
    { name: 'headline', type: 'string' },
    { name: 'text', type: 'array', of: [{type: 'block'}] },
    { name: 'image', type: 'image' },
    { name: 'imagePosition', type: 'string', options: {list: ['left', 'right']} },
    { name: 'theme', type: 'string', options: {list: ['light', 'dark']} }
  ]
}
```

**HubSpot Reference:**
- `/modules/text-image.module/`
- `/modules/simple-text-image.module/`

---

### 3.4 Team Grid
**Priority:** MEDIUM  
**Estimated Time:** 2-3 hours

#### Component:
`TeamGrid.tsx` - Team member cards with hover effects

#### Sanity Schema:
```typescript
// objects/teamMember.ts
{
  name: 'teamMember',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'bio', type: 'text' },
    { name: 'linkedin', type: 'url' }
  ]
}

// objects/teamGrid.ts
{
  name: 'teamGrid',
  fields: [
    { name: 'headline', type: 'string' },
    { name: 'members', type: 'array', of: [{type: 'teamMember'}] }
  ]
}
```

**HubSpot Reference:**
- `/modules/team-grid-pro.module/`

---

### 3.5 Accordion Section
**Priority:** MEDIUM  
**Estimated Time:** 2 hours

#### Component:
`Accordion.tsx` - Collapsible FAQ/content sections

#### Sanity Schema:
```typescript
// objects/accordion.ts
{
  name: 'accordion',
  fields: [
    { name: 'headline', type: 'string' },
    { name: 'items', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'array', of: [{type: 'block'}] }
      ]
    }]}
  ]
}
```

**HubSpot Reference:**
- `/modules/accordion-3-lane.module/`

---

### 3.6 Contact Form
**Priority:** HIGH  
**Estimated Time:** 3-4 hours

#### Component:
`ContactForm.tsx` - Form with validation and submission

#### Tech Stack:
- `react-hook-form` (already installed)
- `zod` validation (already installed)
- Server Action for submission

#### Sanity Schema:
```typescript
// objects/contactForm.ts
{
  name: 'contactForm',
  fields: [
    { name: 'headline', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'submitButtonText', type: 'string' }
  ]
}
```

**HubSpot Reference:**
- `/modules/contact-form.module/`
- `/modules/contact-two-column.module/`

---

### 3.7 CTA Section
**Priority:** MEDIUM  
**Estimated Time:** 1-2 hours

#### Component:
`CtaSection.tsx` - Call-to-action banner

**HubSpot Reference:**
- `/modules/cta-section.module/`

---

### 3.8 References & Case Studies
**Priority:** LOW  
**Estimated Time:** 3-4 hours

#### Components:
1. `ReferencesGrid.tsx` - Logo grid of references
2. `CaseStudy.tsx` - Detailed case study layout

**HubSpot Reference:**
- `/modules/references-grid.module/`
- `/modules/reference-case-study.module/`

---

## 🎨 **Phase 4: Animations & Interactions**

### 4.1 Scroll Animations
**Priority:** MEDIUM  
**Estimated Time:** 2-3 hours

#### Setup:
1. Initialize Lenis smooth scroll in root layout
2. Create GSAP ScrollTrigger utilities
3. Add fade-in/slide-in animations to components

#### Package Location:
`packages/animations/`

```typescript
// animations/scrollAnimations.ts
export function fadeInOnScroll(element, options) { ... }
export function slideInOnScroll(element, options) { ... }
```

---

### 4.2 Hover Effects
**Priority:** LOW  
**Estimated Time:** 1-2 hours

- Card hover effects (already partially done)
- Button hover states
- Image parallax on scroll

---

## 🗂️ **Phase 5: Content Migration**

### 5.1 Create Static Pages
**Priority:** HIGH  
**Estimated Time:** 2-3 hours

#### Pages to Create:
1. `/about` (Über uns)
2. `/contact` (Kontakt)
3. `/impressum`
4. `/datenschutz` (Privacy)
5. `/agb` (Terms)

#### Implementation:
```tsx
// app/about/page.tsx
export default async function AboutPage() {
  const page = await client.fetch(pageQuery, { slug: 'about' });
  return <PageRenderer content={page.content} />;
}
```

---

### 5.2 Populate Sanity Content
**Priority:** MEDIUM  
**Estimated Time:** 3-4 hours

1. Create pages in Sanity Studio
2. Add content blocks for each section
3. Upload images
4. Configure SEO metadata

---

## 📱 **Phase 6: Responsive Testing**

### 6.1 Breakpoint Testing
**Priority:** HIGH  
**Estimated Time:** 2-3 hours

#### Test at:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1440px, 1920px

#### Components to Test:
- [ ] Header/Navigation
- [ ] Hero sections
- [ ] Text/Image layouts
- [ ] Team grid
- [ ] Feature cards
- [ ] Footer

---

### 6.2 Cross-Browser Testing
**Priority:** MEDIUM  

Test in:
- Chrome
- Safari
- Firefox
- Mobile Safari
- Mobile Chrome

---

## 🎯 **Phase 7: SEO & Performance**

### 7.1 SEO Schema
**Priority:** HIGH  
**Estimated Time:** 2 hours

#### Create:
```typescript
// schemas/objects/seo.ts
{
  name: 'seo',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'ogImage', type: 'image' },
    { name: 'keywords', type: 'array', of: [{type: 'string'}] }
  ]
}
```

Add to all document types.

---

### 7.2 Image Optimization
**Priority:** MEDIUM  
**Estimated Time:** 1-2 hours

- Configure Sanity image CDN
- Use Next.js Image component
- Implement blur placeholders
- WebP format

---

### 7.3 Performance Audit
**Priority:** MEDIUM  

- Lighthouse scores
- Core Web Vitals
- Bundle size optimization

---

## 🌍 **Phase 8: Multilingual (Optional)**

### 8.1 German/English Support
**Priority:** LOW (if needed)  
**Estimated Time:** 4-5 hours

Use:
- `next-intl` package
- Sanity document translations
- URL structure: `/de/`, `/en/`

---

## 📊 **Implementation Timeline**

### Week 1: Core Structure
- ✅ Day 1-2: Design system setup (DONE)
- 🎯 Day 3-4: Layout components (Header, Footer)
- 🎯 Day 5: Navigation + mobile menu

### Week 2: Content Components
- Day 1-2: Text/Image sections
- Day 3: Team grid + Accordion
- Day 4-5: Contact form

### Week 3: Polish & Testing
- Day 1-2: Animations
- Day 3: Content migration
- Day 4-5: Responsive testing + fixes

### Week 4: Launch Prep
- Day 1-2: SEO optimization
- Day 3: Performance tuning
- Day 4-5: Final testing + deployment

---

## 🛠️ **Development Workflow**

### For Each Component:

1. **Study HubSpot version** - Check fields.json and module.html
2. **Design Sanity schema** - Model the content structure
3. **Build React component** - Create in `packages/ui/`
4. **Add to page renderer** - Wire up in Next.js page
5. **Test responsive** - All breakpoints
6. **Add animations** - GSAP scroll effects if needed
7. **Create sample content** - Add to Sanity Studio

---

## 📁 **File Structure**

```
3lectrify-platform/
├── apps/
│   ├── 3lectrify/          # Next.js app
│   │   ├── app/
│   │   │   ├── page.tsx    # Homepage
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   └── lib/
│   └── studio/             # Sanity Studio
│       └── schemaTypes/
│           ├── documents/  # page, post, etc.
│           └── objects/    # hero, textImage, etc.
└── packages/
    ├── ui/                 # React components
    │   ├── components/
    │   │   ├── Hero.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── TextImage.tsx
    │   │   └── ...
    │   └── index.ts
    ├── animations/         # GSAP utilities
    └── sanity/            # Sanity client & queries
        ├── lib/
        └── queries/
```

---

## 🎯 **Next Immediate Steps**

1. **Create Header component** with logo and navigation
2. **Create Footer component** with links
3. **Create Navigation schema** in Sanity
4. **Add siteSettings schema** for global config
5. **Port TextImage component** (high priority, used everywhere)

---

## 📝 **Notes**

- **Design Source:** Figma designs are the source of truth for spacing, colors, typography
- **Content Source:** HubSpot modules provide content structure and fields
- **Animation Reference:** Check HubSpot `.js` files for animation patterns
- **Mobile First:** Build mobile layout first, then tablet, then desktop

---

**Ready to start Phase 2!** 🚀




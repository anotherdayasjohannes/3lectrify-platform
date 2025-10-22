# Phase 2: Header & Footer Implementation Plan
## Based on Figma Export Analysis

---

## 📋 Components to Create

### **1. Header/Navigation Component**

**From Figma:** `NavigationSection.tsx`

**Features:**
- Logo (162px × 40px)
- Navigation menu (5 items)
- Active state indicator (green underline)
- Sticky header (h-20 = 80px)
- Dark blue background (#3c5067 - brand-blue-dark)

**Adaptations Needed:**
- Replace `variable-collection-*` classes with actual values
- Use Next.js `Link` instead of `<a>`
- Make navigation items dynamic from Sanity
- Add responsive mobile menu

### **2. Footer Component**

**From Figma:** `FooterSection.tsx`

**Features:**
- Newsletter subscription form
- Navigation links (repeated)
- Footer legal links (Impressum, Datenschutz)
- Copyright text
- Dark background (#293645)
- Two-column layout

**Adaptations Needed:**
- Replace Figma color variables
- Hook up newsletter form
- Make links dynamic from Sanity
- Add proper form validation

---

## 🎨 Design System Mapping

### **Navigation Colors:**

```typescript
// Figma → Our Design System
bg-variable-collection-dark-blue     → bg-[#3c5067]  // brand-blue-dark
text-variable-collection-middle-green → text-[#88c0b1] // brand-green-mid
text-collection-1-white-duplicate    → text-white
```

### **Footer Colors:**

```typescript
bg-[#293645]                          → bg-[#293645]  // dark-bg-page (already correct!)
text-variable-collection-white        → text-white
text-variable-collection-light-green  → text-[#c5e0d7] // brand-green-light
border-variable-collection-light-grey → border-[#c2c2c2] // neutral-light-grey
```

### **Typography (Already Correct):**

```typescript
text-lg tracking-[0.18px] leading-6   → 18px nav links ✓
text-4xl tracking-[0.36px]            → 36px footer heading ✓
text-base tracking-[0.16px]           → 16px body text ✓
text-sm tracking-[0.14px]             → 14px small text ✓
```

---

## 📁 File Structure

```
packages/ui/components/
├── Header.tsx          ← New (adapted from NavigationSection)
├── Footer.tsx          ← New (adapted from FooterSection)
├── Hero.tsx            ← Existing ✓
└── FeatureCards.tsx    ← Existing ✓

apps/studio/schemaTypes/
├── documents/
│   └── siteSettings.ts ← New (navigation, footer config)
└── objects/
    ├── navigationItem.ts ← New
    └── socialLink.ts     ← New (optional)
```

---

## 🔧 Implementation Steps

### **Step 1: Create Sanity Schemas**

1. **`siteSettings.ts`** - Single document for global site settings
   - Logo image
   - Navigation items array
   - Footer text
   - Social media links
   - Newsletter settings

2. **`navigationItem.ts`** - Reusable nav item object
   - Label
   - URL/slug
   - External link boolean
   - Order/position

### **Step 2: Create Header Component**

1. Copy NavigationSection → Header.tsx
2. Replace Figma variables with actual colors
3. Use Next.js `Link` component
4. Add mobile menu (hamburger)
5. Make responsive
6. Fetch navigation from Sanity

### **Step 3: Create Footer Component**

1. Copy FooterSection → Footer.tsx
2. Replace Figma variables
3. Hook up newsletter form
4. Add form validation (zod)
5. Fetch footer content from Sanity

### **Step 4: Integrate into Layout**

1. Update `apps/3lectrify/app/layout.tsx`
2. Add Header and Footer
3. Ensure proper spacing
4. Test with/without content

---

## 🎯 Technical Details

### **Header Sticky Behavior:**

```typescript
// Option 1: Always sticky
<Header className="sticky top-0 z-50" />

// Option 2: Sticky after scroll (with animation)
<Header className="sticky top-0 z-50 transition-all duration-300" />
```

### **Mobile Menu Strategy:**

```typescript
// Use `useState` for mobile menu toggle
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Hamburger icon (only visible on mobile)
<button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
  {/* Icon */}
</button>

// Mobile menu (slide in from side or dropdown)
<nav className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
  {/* Mobile nav items */}
</nav>
```

### **Newsletter Form:**

```typescript
// Use react-hook-form + zod for validation
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Bitte gültige E-Mail-Adresse eingeben'),
});

// Submit to API route or third-party service
const handleSubmit = async (data) => {
  await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
```

---

## ⚠️ Important Considerations

### **1. Figma Variable Classes**

The Figma export uses custom Tailwind classes like:
- `variable-collection-dark-blue`
- `variable-collection-middle-green`

**These don't exist in our Tailwind config!** We need to replace them with actual hex values.

### **2. Font Family Syntax**

Figma exports use: `[font-family:'Lato',Helvetica]`

**This is incorrect Tailwind syntax!** We should use: `font-lato` (from our config)

### **3. Image Paths**

Figma uses: `src="/img/logo.png"`

**We need to:**
- Add images to `apps/3lectrify/public/` folder
- Or use Sanity assets
- Update paths accordingly

### **4. Links vs Next.js Link**

Figma uses: `<a href="#">`

**We should use:**
```typescript
import Link from 'next/link';
<Link href="/projekte">Projekte</Link>
```

---

## 📊 Priority Order

1. **HIGH:** Create Sanity schemas (needed for content)
2. **HIGH:** Create Header component (visible on all pages)
3. **HIGH:** Create Footer component (complete layout)
4. **MEDIUM:** Add mobile responsiveness
5. **MEDIUM:** Newsletter form functionality
6. **LOW:** Animations and transitions

---

## ✅ Success Criteria

- [ ] Header appears on all pages
- [ ] Footer appears on all pages
- [ ] Navigation items from Sanity
- [ ] Active page indicator works
- [ ] Mobile menu functions
- [ ] Newsletter form validates
- [ ] All links work
- [ ] Matches Figma design
- [ ] Responsive on all breakpoints

---

**Ready to implement!** 🚀




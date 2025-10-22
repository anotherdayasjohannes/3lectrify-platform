# 🏗️ Energy Flat Living (EFL) Migration Plan

## 📋 **Executive Summary**

**Goal:** Migrate [energyflatliving.com](https://energyflatliving.com/) to your Next.js 15 + Sanity CMS platform

**Strategy:** Reuse 85% of existing 3lectrify components, add 3-4 EFL-specific components

**Timeline:** 2-3 days

**Effort:** ~20 hours (vs. 200+ from scratch)

**Status:** 📅 Planned for after 3lectrify demo

---

## ✅ **Why This Makes Sense**

### **Component Reusability:**
- Hero → ✅ 90% reusable (add perspective switcher)
- FeatureCards → ✅ 100% reusable
- TextImage → ✅ 100% reusable
- Stats → ✅ 100% reusable
- TeamGrid → ✅ 100% reusable
- CTA → ✅ 100% reusable
- Footer → ✅ 95% reusable (minor text changes)

### **What You Need to Build:**
1. FAQ Accordion component (~4 hours)
2. Perspective Switcher (Kommune/Arbeitgeber) (~2 hours)
3. Project Showcase with enhanced stats (~2 hours)
4. SDG Graphics layout (~1 hour)

**Total new work:** ~9 hours

---

## 🎯 **Phase 1: Project Setup (4 hours)**

### **Step 1: Create New Sanity Project (30 min)**

1. Go to [sanity.io](https://sanity.io)
2. Create new project: **"Energy Flat Living"**
3. Copy the new `projectId`
4. Create dataset: `production`

**Save these:**
```
EFL_PROJECT_ID=your-new-project-id
EFL_DATASET=production
```

---

### **Step 2: Add EFL App to Monorepo (1 hour)**

```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps

# Copy 3lectrify app as starting point
cp -r 3lectrify energy-flat-living

# Navigate to new app
cd energy-flat-living

# Update package.json
```

**Edit `apps/energy-flat-living/package.json`:**
```json
{
  "name": "energy-flat-living",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    // ... rest same
  }
}
```

**Create `apps/energy-flat-living/.env.local`:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-efl-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

### **Step 3: Configure Multi-Project Studio (1 hour)**

**Edit `apps/studio/sanity.config.ts`:**
```typescript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Import schemas for both projects
import {schemaTypes as threelectrifySchemas} from './schemaTypes/3lectrify'
import {schemaTypes as eflSchemas} from './schemaTypes/efl'

export default defineConfig([
  // 3lectrify Project
  {
    name: '3lectrify',
    title: '3lectrify',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_3LECTRIFY!,
    dataset: 'production',
    basePath: '/3lectrify',
    plugins: [structureTool(), visionTool()],
    schema: {
      types: threelectrifySchemas,
    },
  },
  // Energy Flat Living Project
  {
    name: 'energy-flat-living',
    title: 'Energy Flat Living',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_EFL!,
    dataset: 'production',
    basePath: '/efl',
    plugins: [structureTool(), visionTool()],
    schema: {
      types: eflSchemas,
    },
  },
])
```

**Update `apps/studio/.env`:**
```env
SANITY_STUDIO_PROJECT_ID_3LECTRIFY=existing-3lectrify-id
SANITY_STUDIO_PROJECT_ID_EFL=new-efl-project-id
```

---

### **Step 4: Organize Schemas (1 hour)**

**Create schema structure:**
```bash
cd apps/studio/schemaTypes

# Organize existing schemas
mkdir 3lectrify
mv documents/* 3lectrify/documents/
mv objects/* 3lectrify/objects/

# Create EFL schemas (copy from 3lectrify, then modify)
mkdir -p efl/documents efl/objects
```

**Create `apps/studio/schemaTypes/3lectrify/index.ts`:**
```typescript
// Import all 3lectrify schemas
import page from './documents/page'
import hero from './objects/hero'
// ... all existing imports

export const schemaTypes = [page, hero, /* ... all schemas */]
```

**Create `apps/studio/schemaTypes/efl/index.ts`:**
```typescript
// Start with copies of 3lectrify schemas
// We'll modify them in Phase 2
import page from './documents/page'
import hero from './objects/hero'
// ... copy all needed schemas

export const schemaTypes = [page, hero, /* ... */]
```

---

### **Step 5: Update Root Package Scripts (30 min)**

**Edit `package.json` at root:**
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "dev:3lectrify": "turbo run dev --filter=3lectrify",
    "dev:efl": "turbo run dev --filter=energy-flat-living",
    "dev:studio": "turbo run dev --filter=studio",
    "build": "turbo run build",
    "build:3lectrify": "turbo run build --filter=3lectrify",
    "build:efl": "turbo run build --filter=energy-flat-living"
  }
}
```

---

## 🎨 **Phase 2: EFL-Specific Components (9 hours)**

### **Component 1: FAQ Accordion (4 hours)**

**Create `packages/ui/components/FAQ.tsx`:**
```typescript
'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

interface FAQProps {
  headline?: string;
  items: FAQItem[];
}

export function FAQ({ headline, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (openIndex === index) {
      // Close
      gsap.to(`#faq-answer-${index}`, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      setOpenIndex(null);
    } else {
      // Close previous
      if (openIndex !== null) {
        gsap.to(`#faq-answer-${openIndex}`, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      // Open new
      gsap.fromTo(
        `#faq-answer-${index}`,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-white py-[80px] px-[50px] md:py-[60px] md:px-[40px] sm:py-[50px] sm:px-[20px]">
      <div className="content-wrapper max-w-[900px]">
        {headline && (
          <h2 className="text-[40px] leading-[50px] font-light text-[#293645] mb-[40px] md:text-[36px] md:leading-[46px]">
            {headline}
          </h2>
        )}

        <div className="space-y-[20px]">
          {items.map((item, index) => (
            <div
              key={item._key}
              className="border-b border-gray-200 pb-[20px]"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left flex items-start justify-between gap-[20px] cursor-pointer group"
              >
                <h3 className="text-[20px] leading-[28px] font-normal text-[#293645] group-hover:text-[#10b981] transition-colors">
                  {item.question}
                </h3>
                <span
                  className={`text-[24px] transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <p className="text-[16px] leading-[24px] text-gray-600 mt-[15px]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Create Sanity schema `apps/studio/schemaTypes/efl/objects/faq.ts`:**
```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
    }),
  ],
})
```

---

### **Component 2: Perspective Switcher (2 hours)**

**Extend Hero component for EFL:**

**Create `packages/ui/components/HeroWithPerspective.tsx`:**
```typescript
'use client';

import { useState } from 'react';
import { Hero, type HeroProps } from './Hero';

interface Perspective {
  id: string;
  label: string;
  headline: string;
  subtext: any[]; // PortableTextBlock[]
}

interface HeroWithPerspectiveProps extends Omit<HeroProps, 'headline' | 'subtext'> {
  sectionHeadline?: string;
  perspectives: Perspective[];
}

export function HeroWithPerspective({
  sectionHeadline,
  perspectives,
  ...heroProps
}: HeroWithPerspectiveProps) {
  const [activePerspective, setActivePerspective] = useState(perspectives[0]?.id || '');

  const active = perspectives.find((p) => p.id === activePerspective) || perspectives[0];

  return (
    <section className="bg-[#293645]">
      {/* Perspective Switcher */}
      <div className="content-wrapper pt-[40px]">
        {sectionHeadline && (
          <p className="text-[16px] text-white/80 mb-[15px]">{sectionHeadline}</p>
        )}
        <div className="flex gap-[20px]">
          {perspectives.map((perspective) => (
            <button
              key={perspective.id}
              onClick={() => setActivePerspective(perspective.id)}
              className={`
                px-[30px] py-[15px] rounded-[10px] text-[18px] transition-all
                ${
                  activePerspective === perspective.id
                    ? 'bg-[#10b981] text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }
              `}
            >
              {perspective.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Content (changes based on perspective) */}
      <Hero
        {...heroProps}
        headline={active.headline}
        subtext={active.subtext}
      />
    </section>
  );
}
```

**Create Sanity schema:**
```typescript
// apps/studio/schemaTypes/efl/objects/heroWithPerspective.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroWithPerspective',
  title: 'Hero with Perspective Switcher',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeadline',
      title: 'Section Headline',
      type: 'string',
      description: 'e.g., "Wählen Sie Ihre Perspektive"',
    }),
    defineField({
      name: 'perspectives',
      title: 'Perspectives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', type: 'string', title: 'ID'},
            {name: 'label', type: 'string', title: 'Button Label'},
            {name: 'headline', type: 'string', title: 'Headline'},
            {name: 'subtext', type: 'array', of: [{type: 'block'}], title: 'Subtext'},
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
    // ... rest of hero fields (image, parallax, etc.)
  ],
})
```

---

### **Component 3: Project Showcase (2 hours)**

Extend `TextImage` with enhanced stats and project-specific layout.

**Or create dedicated `ProjectShowcase.tsx`:**
```typescript
// Similar to TextImage but with:
// - Larger image area
// - Prominent quote
// - 4-column stats grid
// - Reference link

// Reuse most of TextImage.tsx structure
// Add project-specific styling
```

---

### **Component 4: SDG Graphics (1 hour)**

Simple image grid component:

```typescript
export function SDGSection({ headline, images }: SDGSectionProps) {
  return (
    <section className="bg-white py-[80px]">
      <div className="content-wrapper text-center">
        {headline && <h2>{headline}</h2>}
        <div className="grid grid-cols-4 gap-[20px] mt-[40px]">
          {images.map((img) => (
            <Image key={img._key} src={img.url} alt={img.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 🎨 **Phase 3: Styling & Branding (2 hours)**

### **Step 1: EFL Tailwind Config**

**Create `apps/energy-flat-living/tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // EFL Brand Colors
        primary: '#10b981',      // Green
        secondary: '#059669',    // Dark green
        accent: '#34d399',       // Light green
        dark: '#1f2937',         // Dark gray
        light: '#f9fafb',        // Light gray
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### **Step 2: Update Component Colors**

Most components already use Tailwind classes, so just update the config!

For hardcoded colors, use find & replace:
```
#293645 → bg-dark (or keep, it's neutral)
Add green accents where appropriate
```

---

## 📝 **Phase 4: Content Migration (4 hours)**

### **EFL Pages Structure:**

1. **Homepage** (`/`)
   - HeroWithPerspective (Kommune/Arbeitgeber switcher)
   - Problem/Solution section (TextImage x2)
   - 3-Step Process (FeatureCards)
   - Heating comparison (TextImage)
   - Benefits (FeatureCards)
   - Team (TeamGrid)
   - Aschersleben Project (ProjectShowcase)
   - SDG Section
   - Example calculation (TextImage)
   - FAQ
   - CTA
   - Footer

2. **Legal Pages** (use existing setup)
   - Impressum
   - Datenschutz

### **Content Population:**

**Copy content from energyflatliving.com:**
- Headlines → Sanity text fields
- Body text → Portable Text
- Images → Upload to Sanity
- Stats → Stats component data
- Team members → TeamGrid data
- FAQ items → FAQ component data

**Tools to help:**
```bash
# Use browser dev tools to inspect content
# Copy/paste into Sanity Studio
# Or write a migration script if needed
```

---

## 🚀 **Phase 5: Testing & Deployment (2 hours)**

### **Local Testing:**
```bash
# Start EFL dev server
pnpm dev:efl

# Start Studio (both projects)
pnpm dev:studio

# Access:
# EFL: http://localhost:3001
# Studio 3lectrify: http://localhost:3333/3lectrify
# Studio EFL: http://localhost:3333/efl
```

### **Vercel Deployment:**

1. Create new Vercel project for EFL
2. Link to `apps/energy-flat-living`
3. Add environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=efl-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Deploy!

**Result:** Two separate deployments:
- `3lectrify.vercel.app`
- `energy-flat-living.vercel.app`

---

## 📊 **Time & Effort Breakdown**

| Phase | Tasks | Time |
|-------|-------|------|
| **Phase 1: Setup** | Sanity project, monorepo, Studio config | 4 hours |
| **Phase 2: Components** | FAQ, Perspective, Project, SDG | 9 hours |
| **Phase 3: Styling** | Tailwind config, color updates | 2 hours |
| **Phase 4: Content** | Migrate from existing site | 4 hours |
| **Phase 5: Testing** | QA, deploy, polish | 2 hours |
| **Total** | | **21 hours** |

**Realistic timeline:** 2-3 days

---

## ✅ **Pre-Migration Checklist**

Before starting migration:

- [ ] 3lectrify demo complete & successful ✅
- [ ] All 3lectrify bugs fixed ✅
- [ ] Current system stable ✅
- [ ] Documentation up to date ✅
- [ ] Git committed & pushed ✅
- [ ] Energy for a new feature 😊

---

## 🎯 **Success Criteria**

Migration is successful when:

- [ ] EFL runs on `localhost:3001`
- [ ] Studio manages both projects
- [ ] All pages render correctly
- [ ] Content editable in Sanity
- [ ] FAQ accordion works smoothly
- [ ] Perspective switcher functional
- [ ] Green branding applied
- [ ] Deployed to Vercel
- [ ] No TypeScript errors
- [ ] Mobile responsive

---

## 💡 **Smart Shortcuts**

### **Don't Rebuild Everything:**
1. Copy entire page structure from 3lectrify
2. Just swap content in Sanity
3. 80% done in 1 hour!

### **Use What Works:**
1. Same animations
2. Same layouts
3. Same component patterns
4. Just different colors & content

### **Iterate Fast:**
1. Start with homepage only
2. Get it perfect
3. Then do other pages

---

## 🔍 **Potential Challenges**

| Challenge | Solution |
|-----------|----------|
| Color scheme conflicts | Separate Tailwind configs per app |
| Schema conflicts | Separate schema folders (3lectrify/ & efl/) |
| Content structure differences | Adjust schemas as needed |
| Different domains | Vercel handles this automatically |
| Studio switching projects | Built-in basePath in config |

---

## 📚 **Reference Links**

- **EFL Website:** https://energyflatliving.com/
- **Sanity Multi-Project:** https://www.sanity.io/docs/workspaces
- **Turborepo Filtering:** https://turbo.build/repo/docs/core-concepts/monorepos/filtering
- **Your Component Docs:** See root folder .md files

---

## 🎊 **Benefits After Migration**

### **Technical:**
- Proven system scales to multiple sites ✅
- Component library pays massive dividends ✅
- Maintenance becomes easier (fix once, works everywhere) ✅

### **Business:**
- Two production sites in portfolio ✅
- Demonstrates platform capability ✅
- Potential for more migrations ✅

### **Development:**
- Faster future projects ✅
- Reusable patterns established ✅
- Clear migration process documented ✅

---

## 🚀 **When You're Ready to Start**

### **Day 1 Morning:**
```bash
# 1. Create Sanity project (30 min)
# 2. Setup monorepo structure (1 hour)
# 3. Configure Studio (1 hour)
# 4. Test basic setup (30 min)

# By lunch: EFL app running with 3lectrify components!
```

### **Day 1 Afternoon:**
```bash
# 5. Build FAQ component (4 hours)
# 6. Test FAQ locally

# By EOD: FAQ working perfectly!
```

### **Day 2 Morning:**
```bash
# 7. Build Perspective Switcher (2 hours)
# 8. Apply EFL styling (2 hours)

# By lunch: EFL looking like EFL!
```

### **Day 2 Afternoon:**
```bash
# 9. Migrate content (4 hours)

# By EOD: Full homepage populated!
```

### **Day 3:**
```bash
# 10. Polish, test, deploy (2-4 hours)

# By lunch: EFL LIVE! 🎉
```

---

## 📞 **Questions to Answer Before Starting**

1. **Do you have access to EFL content?**
   - If not, need to scrape or manually copy

2. **Is EFL Git branch up to date?**
   - If yes, reference it
   - If no, use live site as source

3. **Do you need custom domain?**
   - Vercel supports this easily

4. **Who manages EFL content?**
   - Same team as 3lectrify?
   - Different editors → separate project makes sense

---

## 🎯 **Final Recommendation**

**Start with Phase 1 (Setup) first.**

If setup goes smoothly (4 hours), you'll know the migration is feasible.

If setup is problematic, you can pause without wasting time on components.

**Best approach:** Timebox each phase. If it takes longer than estimated, pause and reassess.

---

## 🎉 **You've Got This!**

**Remember:**
- You've already built 85% of what you need ✅
- The hard problems are solved ✅
- This is just applying existing work to new content ✅

**This migration will prove your system is:**
- Scalable 🚀
- Reusable ♻️
- Production-ready 💯
- Worth the investment 💰

---

**Saved for tomorrow!** 📅

**Status:** 📋 Planned & Documented  
**Next:** After 3lectrify demo success 🎬  
**Confidence:** High! 💪  

---

*Created: October 22, 2025*  
*Ready to execute: After demo day*  
*Estimated completion: 2-3 days*


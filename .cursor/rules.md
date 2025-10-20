# 3lectrify Platform - Cursor Rules

## Project Context
- **Monorepo** with multiple Next.js apps + Sanity Studio
- **Migration** from HubSpot CMS to Next.js + Sanity
- **Multi-site** setup (3lectrify, heatscope.com, future sites)
- **TypeScript strict mode** everywhere

## Tech Stack
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript 5.7
- **Styling**: Tailwind CSS 4 + CSS Modules (for complex components)
- **Animation**: GSAP 3.13 + Lenis 1.3 (same as HubSpot)
- **CMS**: Sanity (Content Lake + Studio)
- **Forms**: Zod + React Hook Form
- **Monorepo**: Turborepo + pnpm

## Project Structure
```
3lectrify-platform/
├── apps/
│   ├── 3lectrify/       # 3lectrify website (Next.js)
│   ├── heatscope/       # Heatscope website (future)
│   └── studio/          # Sanity Studio (shared CMS)
├── packages/
│   ├── ui/              # Shared React components
│   ├── sanity/          # Shared Sanity utilities
│   └── animations/      # Shared GSAP/Lenis code
```

## Coding Standards

### TypeScript
- Use TypeScript for all files
- Enable strict mode
- Define types for all props and function parameters
- Generate Sanity types with `sanity-codegen`

### React Patterns
- **Prefer Server Components** by default
- Use `'use client'` only when needed (animations, interactivity, hooks)
- Server Components for data fetching
- Client Components for animations, forms, interactivity

### Styling
- **Tailwind CSS** for layout, spacing, colors, utilities
- **CSS Modules** for complex component styles (e.g., animations with fallbacks)
- Follow existing design system tokens from HubSpot (`design-system-unified.css`)
- BEM naming convention in CSS Modules if needed

### Animation Patterns
- Port existing GSAP animations from HubSpot codebase
- Use Lenis for smooth scrolling (same implementation as HubSpot)
- Implement graceful degradation (CSS fallbacks)
- No editor detection needed (no HubSpot editor mode!)

## File Organization

### Shared Code
- **Shared UI components** → `packages/ui/components/`
- **Shared Sanity queries** → `packages/sanity/queries/`
- **Shared utilities** → `packages/[domain]/`

### App-Specific Code
- **App components** → `apps/[app-name]/components/`
- **App utilities** → `apps/[app-name]/lib/`
- **App styles** → `apps/[app-name]/styles/`

## Sanity Patterns

### Data Fetching
- Use GROQ queries from `packages/sanity/queries/`
- Fetch in Server Components
- Use `next-sanity` for data fetching
- Generate TypeScript types with `sanity-codegen`

### Content Modeling
- Document types → `apps/studio/schemas/documents/`
- Object types → `apps/studio/schemas/objects/`
- Reusable objects for module-like content (hero, feature cards, etc.)

### Example Query Pattern
```typescript
// packages/sanity/queries/pages.ts
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    content[] {
      _type,
      // ... fields
    }
  }
`;

// apps/3lectrify/app/[slug]/page.tsx (Server Component)
import { client } from '@3lectrify/sanity';
import { pageQuery } from '@3lectrify/sanity/queries';

export default async function Page({ params }) {
  const page = await client.fetch(pageQuery, { slug: params.slug });
  return <PageBuilder content={page.content} />;
}
```

## Migration Context

### HubSpot → Next.js Mapping
- **HubL templates** → JSX Server Components
- **17 HubSpot modules** → React components in `packages/ui/`
- **Module fields** → Sanity schemas in `apps/studio/schemas/objects/`
- **Design system CSS** → Tailwind config + CSS modules

### Animation Migration
- GSAP code ports 1:1 (works identically in Next.js)
- Lenis smooth scroll works identically
- No editor detection needed (remove that code!)
- Better performance (no HubSpot constraints)

### Key HubSpot Modules to Port
1. `hero-dark.module` → `Hero.tsx`
2. `feature-cards.module` → `FeatureCards.tsx`
3. `team-grid-pro.module` → `TeamGrid.tsx`
4. `kontakt-simple.module` → `ContactForm.tsx`
5. `text-image.module` → `TextImage.tsx`
6. ... (15 more modules)

## Performance Guidelines
- Use Next.js Image component for all images
- Implement lazy loading for below-fold content
- Split code with dynamic imports where appropriate
- Target Lighthouse scores: 95+ for all metrics

## Accessibility
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA)

## When in Doubt
- **Check HubSpot codebase** at `/Users/j.wild/Projects/3lectrify-hubspot/3lectrify_2025_clean/`
- **Use MCP to query Sanity** (ask about schemas, content)
- **Ask before major architectural decisions**
- **Reference migration docs** in `/Users/j.wild/Projects/MIGRATION_PLAN.md`

## Common Tasks

### Creating a New Component
```tsx
// packages/ui/components/FeatureCards.tsx
'use client'; // Only if needs interactivity

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function FeatureCards({ cards }) {
  useGSAP(() => {
    gsap.from('.card', {
      opacity: 0,
      y: 50,
      stagger: 0.15
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-8">
      {cards.map((card) => (
        <div key={card._id} className="card">
          {/* ... */}
        </div>
      ))}
    </div>
  );
}
```

### Creating a Sanity Schema
```typescript
// apps/studio/schemas/objects/featureCards.ts
export default {
  name: 'featureCards',
  type: 'object',
  title: 'Feature Cards',
  fields: [
    {
      name: 'cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text' },
          { name: 'icon', type: 'image' }
        ]
      }],
      validation: Rule => Rule.max(4)
    }
  ]
}
```

## Git Workflow
- Commit often, small commits
- Use conventional commits (feat:, fix:, docs:, etc.)
- Push to `main` for now (set up branches later)
- Vercel auto-deploys on push

## Resources
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **GSAP Docs**: https://gsap.com/docs/
- **Migration Plan**: `/Users/j.wild/Projects/MIGRATION_PLAN.md`
- **Tech Stack**: `/Users/j.wild/Projects/TECH_STACK.md`

---

**Remember**: You have access to the Sanity MCP server - use it to query schemas, create content, and explore the CMS directly through conversations!

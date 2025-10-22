# ✅ Cursor + GSAP Setup Complete!

Your 3LECTRIFY platform is now configured with AI coding rules and GSAP documentation integration for world-class animations! 🚀

---

## 📁 What Was Created

### 1. Root `.cursorrules` 
**Location**: `/3lectrify-platform/.cursorrules`

**Contains**:
- ✅ GSAP documentation reference (https://gsap.com/llms.txt)
- ✅ React + GSAP best practices (useGSAP, NOT useEffect)
- ✅ ScrollTrigger patterns (pinning, scrubbing, stagger)
- ✅ Timeline patterns (sequential, parallel)
- ✅ Lenis integration examples
- ✅ Accessibility rules (prefers-reduced-motion)
- ✅ Performance optimization tips
- ✅ TypeScript patterns
- ✅ Monorepo workflow commands
- ✅ Code review checklist
- ✅ Common pitfalls to avoid

**Key Rules**:
- Always use `useGSAP` hook (never `useEffect`)
- Always set `once: true` on entrance animations
- Always provide default visibility (`opacity: 1`)
- Always respect `prefers-reduced-motion`
- Always scope animations (`{ scope: containerRef }`)

### 2. Animations Package `.cursorrules`
**Location**: `/packages/animations/.cursorrules`

**Contains**:
- ✅ Package-specific rules for shared animation utilities
- ✅ Hook patterns (`useScrollAnimation`, `useFadeIn`, `useStagger`)
- ✅ Preset configurations (`fadeInUp`, `scaleIn`, `slideInRight`)
- ✅ Utility functions (`createStagger`, `killAllAnimations`)
- ✅ Lenis utilities (`initLenis`, `scrollToElement`)
- ✅ Accessibility helpers (`shouldReduceMotion`)
- ✅ Testing guidelines
- ✅ Public API structure

**Purpose**: Guide development of reusable animation primitives.

---

## 🔧 Manual Setup Required (5 minutes)

### Step 1: Add GSAP to Cursor Workspace Docs

1. **Open Cursor Settings**
   - Mac: `Cmd + ,`
   - Windows/Linux: `Ctrl + ,`

2. **Navigate to Features > Docs**
   - In the sidebar: Settings → Features → Docs

3. **Add GSAP Documentation**
   - Click "Add URL" or "+" button
   - **Name**: `GSAP Documentation`
   - **URL**: `https://gsap.com/llms.txt`
   - Click "Add" or "Save"

4. **Verify Installation**
   - You should see "GSAP Documentation" in your Docs list
   - Status should show as "Active" or "Indexed"

### Step 2: (Optional) Add Additional Documentation

**Lenis Smooth Scroll**:
- **Name**: `Lenis Smooth Scroll`
- **URL**: `https://raw.githubusercontent.com/studio-freight/lenis/main/README.md`

**Next.js 15 App Router**:
- **Name**: `Next.js 15`
- **URL**: `https://nextjs.org/docs`

**React 19**:
- **Name**: `React 19`
- **URL**: `https://react.dev`

---

## 🎯 How to Use This Setup

### Example 1: Basic Animation Request
**You type**:
```
"Create a fade-in animation for the hero section"
```

**Cursor will automatically**:
- Use `useGSAP` hook (not `useEffect`)
- Add proper `scope` parameter
- Include `once: true` for scroll trigger
- Set default `opacity: 1` on elements
- Add development markers
- Follow easing conventions

**Generated code** (automatic):
```tsx
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  gsap.from('.hero', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 75%',
      once: true,
      markers: process.env.NODE_ENV === 'development'
    }
  });
}, { scope: containerRef });

return (
  <div ref={containerRef} className="hero" style={{ opacity: 1 }}>
    {/* Content */}
  </div>
);
```

### Example 2: With @Docs Reference
**You type**:
```
"@GSAP Documentation Create a scroll-triggered timeline for the features section with stagger"
```

**Cursor will**:
- Reference official GSAP docs for best practices
- Use proper Timeline syntax
- Apply stagger configuration
- Follow ScrollTrigger best practices

**Generated code**:
```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 75%',
      once: true,
      markers: process.env.NODE_ENV === 'development'
    }
  });

  tl.from('.feature-title', { 
      opacity: 0, 
      y: 30, 
      duration: 0.6 
    })
    .from('.feature-card', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.3');
}, { scope: containerRef });
```

### Example 3: Package-Specific Request
**You type** (while in `packages/animations/`):
```
"Create a reusable useParallax hook following our guidelines"
```

**Cursor will**:
- Follow package-specific `.cursorrules`
- Use proper TypeScript generics
- Include accessibility checks
- Export from `index.ts`
- Add JSDoc comments

**Generated code**:
```tsx
// packages/animations/src/hooks/useParallax.ts
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shouldReduceMotion } from '../utils/accessibility';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

/**
 * Creates a parallax scroll effect on an element.
 * Respects prefers-reduced-motion for accessibility.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const { speed = 0.5, direction = 'up' } = options;
  const ref = useRef<T>(null);

  useGSAP(() => {
    if (!ref.current || shouldReduceMotion()) return;

    const yValue = direction === 'up' ? -100 : 100;

    gsap.to(ref.current, {
      y: `${yValue * speed}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        markers: process.env.NODE_ENV === 'development'
      }
    });
  }, { scope: ref });

  return ref;
}

// Don't forget to export from index.ts!
```

### Example 4: Fix Animation Issues
**You type**:
```
"The FeatureCards animation is re-triggering on scroll. Fix it."
```

**Cursor will**:
- Identify missing `once: true`
- Add it to ScrollTrigger
- Ensure proper cleanup

**Fix applied**:
```tsx
scrollTrigger: {
  trigger: containerRef.current,
  start: 'top 75%',
  once: true, // ← ADDED
  markers: process.env.NODE_ENV === 'development'
}
```

---

## 🧪 Test Your Setup

### Test 1: Basic Animation
1. Open any component file in `packages/ui/`
2. Type: `"Add a fade-in animation to this component"`
3. Check that Cursor uses `useGSAP` (not `useEffect`)

### Test 2: @Docs Reference
1. Open any file
2. Type: `"@GSAP Documentation How do I create a scroll-triggered timeline?"`
3. Verify Cursor provides GSAP-specific answer with examples

### Test 3: Package Rules
1. Navigate to `packages/animations/src/`
2. Type: `"Create a new animation hook"`
3. Check that it follows package structure (TypeScript, generics, accessibility)

---

## 📚 Quick Reference Commands

### Query GSAP Docs
```
"@GSAP Documentation [your question]"
```

### Create Animation
```
"Create a [type] animation for [element] using [technique]"

Examples:
- "Create a stagger animation for cards using ScrollTrigger"
- "Create a parallax effect for the hero image"
- "Create a timeline sequence for the intro text"
```

### Fix Animation Issues
```
"Fix: [describe issue]"

Examples:
- "Fix: Cards not animating on scroll"
- "Fix: Animation re-triggering multiple times"
- "Fix: Layout jumping during pin"
```

### Accessibility
```
"Make this animation respect prefers-reduced-motion"
"Add accessibility fallback for this animation"
```

---

## 🎓 Learning Resources

### Study These Sites (Awwwards Winners)
1. **Apple** - https://www.apple.com/
   - Product reveals, smooth scroll, timeline sequences
2. **Awwwards GSAP Showcase** - https://www.awwwards.com/websites/gsap/
   - Best-in-class GSAP animations
3. **Codrops** - https://tympanus.net/codrops/
   - Creative animation tutorials
4. **Lenis Demo** - https://lenis.studiofreight.com/
   - Smooth scroll examples

### Official Documentation
- **GSAP Docs**: https://gsap.com/docs/v3/
- **ScrollTrigger**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Ease Visualizer**: https://gsap.com/docs/v3/Eases/
- **CodePen Demos**: https://codepen.io/GreenSock

---

## 🏆 Animation Principles

### Our Standards
1. **Subtle > Flashy**: Enhance, don't distract
2. **Fast > Slow**: 0.3-0.8s sweet spot
3. **Purposeful**: Every animation tells the story
4. **Consistent**: Reuse easings and durations
5. **Accessible**: Never exclude users

### GSAP Best Practices
✅ Always use `useGSAP` hook  
✅ Add `once: true` to entrance animations  
✅ Set explicit default visibility  
✅ Respect `prefers-reduced-motion`  
✅ Use `{ scope: containerRef }` for cleanup  
✅ Add dev markers: `markers: process.env.NODE_ENV === 'development'`  
✅ Test on mobile (reduce complexity)  

❌ Never use `useEffect` for GSAP  
❌ Never forget cleanup  
❌ Never animate width/height (use scale)  
❌ Never use permanent `will-change`  
❌ Never ignore accessibility  

---

## 🎯 Next Steps

### For Development
1. **Test the setup** with a simple animation request
2. **Study the examples** in `.cursorrules` files
3. **Build reusable hooks** in `packages/animations/`
4. **Create presets** for common animations
5. **Document your patterns** in component comments

### For Production
1. **Performance audit**: Check 60fps on animations
2. **Accessibility test**: Verify `prefers-reduced-motion`
3. **Mobile optimization**: Reduce complexity on small screens
4. **Cross-browser test**: Safari, Firefox, Chrome
5. **Measure impact**: Core Web Vitals, user engagement

---

## 🚀 You're Ready!

Your platform is now configured for world-class animations with AI assistance!

**What you get**:
- ✅ GSAP documentation integrated with Cursor
- ✅ Comprehensive coding rules for animations
- ✅ Package-specific guidelines for shared utilities
- ✅ Accessibility-first approach
- ✅ Performance optimization patterns
- ✅ TypeScript best practices
- ✅ React 19 + GSAP integration

**Start creating**:
```
"Create a stunning hero animation with scroll-triggered reveal"
```

Let Cursor guide you with GSAP best practices! 🎨✨

---

## 📝 Need Help?

**Common Issues**:

1. **Cursor not following rules**:
   - Check that `.cursorrules` files exist
   - Restart Cursor IDE
   - Verify file syntax (no JSON errors)

2. **@Docs not working**:
   - Verify URL was added in Settings > Features > Docs
   - Check "Status" shows "Indexed" or "Active"
   - Try reindexing docs

3. **Animations not working**:
   - Check GSAP is installed: `pnpm list gsap`
   - Verify `useGSAP` is imported from `@gsap/react`
   - Check browser console for errors

**Quick Fixes**:
```bash
# Reinstall GSAP
pnpm --filter 3lectrify add gsap @gsap/react

# Rebuild packages
pnpm --filter @3lectrify/animations build

# Restart dev server
pnpm dev
```

---

**Happy animating!** 🎬✨

Let's create something that feels like magic. 🪄


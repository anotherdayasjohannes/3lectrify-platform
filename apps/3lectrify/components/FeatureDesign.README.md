# FeatureDesign Component

A production-ready, Framer-inspired scroll-reveal component with GSAP animations for the 3lectrify platform.

## 🎯 Features

- ✅ Scroll-triggered reveal animations
- ✅ Floating cursor with tooltip
- ✅ Team avatar display with stagger animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ TypeScript support
- ✅ Customizable content and styling
- ✅ Performance optimized with GSAP
- ✅ Backdrop blur and glassmorphism effects

## 📦 Files Created

```
apps/3lectrify/
├── components/
│   └── FeatureDesign.tsx          # Main component
├── hooks/
│   └── useScrollReveal.ts         # Reusable animation hooks
├── types/
│   └── feature.ts                 # TypeScript definitions
└── app/
    └── demo/
        └── feature-design/
            └── page.tsx           # Demo page
```

## 🚀 Quick Start

### 1. View the Demo

```bash
cd /Users/j.wild/Projects/3lectrify-platform
pnpm dev
```

Then visit: **http://localhost:3000/demo/feature-design**

### 2. Use in Your Page

```tsx
import FeatureDesign from '@/components/FeatureDesign';

export default function MyPage() {
  return (
    <FeatureDesign
      title="Design Tools"
      description="Create stunning interfaces"
      avatars={[
        { id: '1', name: 'Alex', imageUrl: '/avatars/1.png' },
        { id: '2', name: 'Maya', imageUrl: '/avatars/2.png' },
      ]}
    />
  );
}
```

### 3. Use the Animation Hooks

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';

function MyComponent() {
  const ref = useScrollReveal({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
    scrub: 1,
  });

  return <div ref={ref}>Animated content</div>;
}
```

## ⚙️ Props

### FeatureDesign

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Design"` | Main heading text |
| `description` | `string` | - | Description paragraph |
| `imageUrl` | `string` | - | Optional mockup image URL |
| `avatars` | `Avatar[]` | `[]` | Team member avatars |

### Avatar Type

```ts
interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
}
```

## 🎨 Customization

### Change Animation Speed

Edit the `duration` values in `FeatureDesign.tsx`:

```tsx
gsap.fromTo(card, from, {
  ...to,
  duration: 1.2,  // Change this (default: 1.2s)
  ease: 'power3.out',
});
```

### Adjust Scroll Trigger Points

Modify the `start` and `end` values:

```tsx
scrollTrigger: {
  trigger: section,
  start: 'top 75%',  // When to start (default: 75% from top)
  end: 'top 25%',    // When to end (default: 25% from top)
  scrub: 1,          // Smooth scrubbing (0-1 or true/false)
}
```

### Change Colors

Update Tailwind classes:

```tsx
// Card background
className="bg-neutral-950/80"  // Change to your color

// Border color
className="border border-white/10"  // Adjust opacity

// Cursor tooltip
className="bg-blue-500"  // Change to your brand color
```

## 🎬 Animation Timeline

1. **Card appears** (0-1.2s)
   - Fades in from 25% opacity
   - Slides in from right (50px)
   - Scales from 95% to 100%

2. **Avatars stagger** (triggered at 60% scroll)
   - Each avatar appears with 0.1s delay
   - Bounce-in effect

3. **Cursor floats** (continuous)
   - Up/down motion (2s cycle)
   - Hue rotation (8s cycle)

4. **Tooltip pulses** (continuous)
   - Scale 1.0 → 1.05 (1.5s cycle)

## 🔧 Advanced Usage

### Multiple Sections

```tsx
<>
  <FeatureDesign title="Design" ... />
  <FeatureDesign title="Prototype" ... />
  <FeatureDesign title="Collaborate" ... />
</>
```

### Custom Hook for Parallax

```tsx
import { useParallax } from '@/hooks/useScrollReveal';

function ParallaxImage() {
  const ref = useParallax(0.5); // Speed multiplier

  return <img ref={ref} src="/bg.jpg" alt="Background" />;
}
```

### Stagger Children

```tsx
import { useStaggerReveal } from '@/hooks/useScrollReveal';

function FeatureGrid() {
  const ref = useStaggerReveal('.feature-item', {
    stagger: 0.2,
    from: { opacity: 0, y: 50 },
  });

  return (
    <div ref={ref}>
      <div className="feature-item">Item 1</div>
      <div className="feature-item">Item 2</div>
      <div className="feature-item">Item 3</div>
    </div>
  );
}
```

## 🐛 Debugging

Enable ScrollTrigger markers to see trigger points:

```tsx
scrollTrigger: {
  ...
  markers: true,  // Add this line
}
```

## 📱 Responsive Behavior

- **Mobile (<768px)**: Smaller card, simplified cursor
- **Tablet (768-1024px)**: Medium card, full features
- **Desktop (>1024px)**: Full size, all animations

## 🚧 TODOs / Future Enhancements

- [ ] Add placeholder image support
- [ ] Create variants (light/dark theme)
- [ ] Add accessibility features (reduced motion)
- [ ] Create Storybook stories
- [ ] Add unit tests with Jest/RTL
- [ ] Optimize for SSR/SSG

## 📚 References

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)

## 💡 Tips

1. **Performance**: Use `will-change` CSS property for animated elements
2. **Cleanup**: Always cleanup GSAP contexts to prevent memory leaks
3. **Testing**: Test on mobile devices for smooth 60fps animations
4. **Images**: Use Next.js Image component for optimized loading

## 🤝 Contributing

To modify this component:

1. Edit `components/FeatureDesign.tsx`
2. Test changes at `/demo/feature-design`
3. Update this README if adding new features
4. Ensure TypeScript types are updated

---

Built with ❤️ for the 3lectrify Platform

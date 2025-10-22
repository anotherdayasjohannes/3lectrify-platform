# 🎬 Feature Showcase: Split-Screen Storytelling

## ✨ What Changed?

The Feature Showcase has been **completely redesigned** to use an **Apple-style split-screen layout** for maximum storytelling impact.

---

## 📐 Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│                 Unser 3-Säulen-Prinzip                    │
│              (Section Header + Intro)                      │
├─────────────────────────┬──────────────────────────────────┤
│  LEFT: Scrollable Nav   │   RIGHT: Sticky Content Card     │
│                         │                                  │
│  🔵 01 [ACTIVE]        │   ┌──────────────────────────┐  │
│  Solarbasierte...       │   │ 🔴🟡🟢            01   │  │
│  Maximale Rendite...    │   │                          │  │
│  ─────────             │   │  [Icon]                  │  │
│                         │   │                          │  │
│  ⚪ 02                 │   │  Solarbasierte...        │  │
│  Elektrifizierung...    │   │  Maximale Rendite...     │  │
│                         │   │                          │  │
│  ⚪ 03                 │   │  [Full Description]      │  │
│  Pauschalmiet...        │   │                          │  │
│                         │   │                          │  │
│  [Scroll down...]       │   │  🟢 Live    3lectrify   │  │
│                         │   └──────────────────────────┘  │
│                         │   ↑ This card STAYS STICKY      │
│                         │     and morphs as you scroll!   │
└─────────────────────────┴──────────────────────────────────┘
```

---

## 🎯 How It Works

### **1. Left Side - Chapter Navigation**
- **3 clickable navigation items** (one per feature)
- Spaced **200px apart** for comfortable scrolling
- **Active state:** Bright + scaled up + gradient indicator stripe
- **Inactive state:** Dimmed (40% opacity)
- Shows: Number badge, title, and heading only

### **2. Right Side - Sticky Content Card**
- **Sticks at `top: 20px`** on desktop (scrolls normally on mobile)
- **Shows ONLY the active feature's full content**
- Content **morphs smoothly** (700ms transitions) when you scroll past nav items
- Includes: Icon, title, heading, full description, traffic lights, live indicator

### **3. Scroll-Driven Storytelling**
- As you scroll down the left side, the ScrollTrigger detects which nav item is in the viewport center
- The `activeIndex` state updates
- The right card's content **automatically changes** to match the active feature
- Smooth 700ms transitions for all text, icons, and badges

---

## 🎨 Visual Features

### **Left Navigation Items:**
- **Number Badge:** Blue glow when active, subtle border when inactive
- **Gradient Indicator:** Vertical stripe (blue → purple → pink) on left edge when active
- **Scale Effect:** Slightly larger (105%) when active
- **Fade In:** Items fade in from the left as you scroll

### **Right Sticky Card:**
- **Traffic Lights:** Red/yellow/green dots with glow effects
- **Number Badge:** Top-right corner, synced with active feature
- **Grid Background:** Subtle 32px grid pattern
- **Floating Icon:** Continuous up/down animation
- **Gradient Glow:** Blue/purple/pink overlay
- **Live Indicator:** Pulsing green dot + "3lectrify" branding

---

## 📱 Responsive Behavior

### **Desktop (≥ 1024px):**
- **2-column grid:** Left nav + Right sticky card
- Card sticks to viewport as you scroll

### **Mobile (< 1024px):**
- **1-column stack:** Navigation on top, card below
- Card scrolls normally (not sticky)
- Navigation items spaced **150px apart** (was 200px)

---

## 🎬 Animation Details

### **Navigation Item Reveal:**
- Fade in from **left (-50px)** as you enter viewport
- **Scrubbed animation** (1:1 with scroll)
- Trigger: `start: 'top 80%'`, `end: 'top 60%'`

### **Active State Tracking:**
- ScrollTrigger monitors when nav items are in **viewport center**
- Updates `activeIndex` state
- Trigger: `start: 'top center'`, `end: 'bottom center'`

### **Icon Float:**
- Continuous **-10px up/down** motion
- **2s duration**, infinite loop, sine easing

### **Content Transitions:**
- All text content: **700ms duration**
- Icon, title, heading, description all transition smoothly
- Uses CSS `transition-all duration-700`

---

## 🚀 Key Advantages Over Old Design

| Old 3-Column Grid | New Split-Screen |
|-------------------|------------------|
| Static cards | Interactive storytelling |
| All visible at once | Progressive reveal |
| No clear focus | Active state highlighting |
| Generic layout | Apple/Framer aesthetic |
| No scroll interaction | Scroll-driven content switching |

---

## 🔧 Technical Implementation

- **Component:** `/packages/ui/components/FeatureShowcase.tsx`
- **GSAP + ScrollTrigger:** For scroll-driven animations
- **React State:** `activeIndex` controls which feature is shown on the right
- **CSS Grid:** 2-column layout with `lg:grid-cols-2`
- **Sticky Positioning:** `lg:sticky lg:top-20` on right card
- **Tailwind Transitions:** `transition-all duration-700` for smooth morphing

---

## ✅ Ready to Test

1. **Hard refresh** your browser: `Cmd + Shift + R` (Mac)
2. Navigate to the **Home** page
3. **Scroll slowly** through the "Unser 3-Säulen-Prinzip" section
4. Watch the right card **morph** as you scroll past each nav item!

---

**This is now a proper scroll-driven storytelling experience! 🎬✨**




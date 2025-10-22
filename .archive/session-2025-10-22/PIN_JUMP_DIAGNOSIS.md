# 🔍 FeatureCards Pin Jump Diagnosis

## How to Use the Diagnostic Script

1. **Open the page:**
   - Go to `http://localhost:3000/unser-konzept`

2. **Open browser console:**
   - Press `F12` or `Cmd+Option+I` (Mac)
   - Go to the "Console" tab

3. **Copy and paste the script:**
   - Open `DEBUG_PIN_JUMP.js` in this folder
   - Copy the entire contents
   - Paste into the console and press Enter

4. **Scroll to the FeatureCards section:**
   - Scroll slowly down the page
   - The script will monitor the headline position every frame
   - Any jump > 0.5px will be logged with details

---

## What the Script Monitors

### Position Tracking:
- **Headline Y position** (every frame)
- **Section position** (relative/fixed)
- **Transform values**
- **Margin values**
- **Font metrics** (size, line-height)

### Events Logged:
- ⚠️ **JUMP DETECTED** - Any position shift > 0.5px
- 🎯 **ScrollTrigger toggled** - When pin activates/deactivates
- ▶️ **ScrollTrigger ENTERED** - Exact moment pin starts

---

## Interpreting Results

### Expected Output (No Jump):
```
📹 Monitoring position changes...
✅ ScrollTrigger found, monitoring events...
▶️ ScrollTrigger 0 ENTERED (pin starting)
  Headline Y on pin start: 130.00 px
```

### Problem Output (Jump Detected):
```
⚠️ JUMP DETECTED! 2.34px shift
Frame: 487
Previous Y: 130.00 px
Current Y: 127.66 px
Shift: -2.34 px

📊 Style Changes:
  sectionPosition: relative → fixed
  sectionTop: auto → 0px
  headlineMarginTop: 0px → 2px

📐 Current State:
  Section position: fixed
  Section top: 0px
  Headline y position: 127.66 px
```

---

## Common Causes of Pin Jump

### 1. **Margin Collapsing** ✅ (Should be fixed with `overflow-hidden`)
- Child margins collapse through parent in normal flow
- Fixed with `overflow: hidden` (creates BFC)

### 2. **Transform/Translate Issues**
- GSAP might be applying transforms
- Check if `transform: translate()` is changing

### 3. **Box-Sizing Issues**
- `border-box` vs `content-box` differences
- Check if padding is included differently

### 4. **Font Rendering**
- Sub-pixel font rendering changes
- Line-height calculation differences

### 5. **Fractional Pixels**
- Browser rounding differences
- `position: relative` vs `position: fixed` rendering

### 6. **Will-Change Optimization**
- Adding `will-change: transform` can help
- Forces layer creation before pin

---

## Potential Fixes to Try

### Fix 1: Force GPU Layer (Most Likely)
```tsx
<section
  style={{ 
    willChange: 'transform',
    transform: 'translateZ(0)',
    // ... existing styles
  }}
>
```

### Fix 2: Round Padding Values
```tsx
// Instead of pt-[80px], use exact computed value
style={{ paddingTop: '80px' }}
```

### Fix 3: Force Specific Line-Height
```tsx
<h2 style={{ lineHeight: '50px' }}> // Force exact value
```

### Fix 4: Add Hardware Acceleration
```tsx
<section
  style={{ 
    backfaceVisibility: 'hidden',
    perspective: 1000,
    // ... existing styles
  }}
>
```

---

## Next Steps

1. **Run the diagnostic script**
2. **Scroll slowly** to the FeatureCards section
3. **Look for the "JUMP DETECTED" message**
4. **Note which styles changed** when the jump occurred
5. **Report back the logged values**

Then we can apply the precise fix based on the actual cause! 🎯


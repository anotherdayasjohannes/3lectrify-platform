# 🚀 Quick Start: Add StackedExplainer to /unser-konzept

## ⏱️ 5-Minute Setup for Tomorrow's Demo

### **Step 1: Start Studio (30 seconds)**
```bash
cd /Users/j.wild/Projects/3lectrify-platform
pnpm --filter studio dev
```

Open: http://localhost:3333

---

### **Step 2: Open Page (10 seconds)**
1. Navigate to **"Pages"** in left sidebar
2. Find **"Unser Konzept"** page
3. Click to open

---

### **Step 3: Add StackedExplainer (30 seconds)**
1. Scroll to **"Page Content"** section
2. Click **"+ Add content"**
3. Select **"Stacked Explainer"** from list

---

### **Step 4: Configure Section (1 minute)**

**Section Headline:**
```
Der Energetische Kompass®
```

**Section Introduction:**
```
Unser bewährtes 3-Säulen-Modell für profitable All-Electric Buildings macht aus Ihrer Immobilie ein zukunftssicheres Investment.
```

---

### **Step 5: Add Card 1 (1 minute)**

Click **"+ Add item"** in Cards array:

- **Step Number:** `1`
- **Card Title:** `GRUNDLAGE`
- **Card Heading:** `Solarbasierte Eigenenergieversorgung`
- **Card Description:**
  ```
  Die Basis jedes All-Electric Buildings ist eine optimal dimensionierte PV-Anlage mit intelligentem Energiemanagement.
  
  • Maximale Eigennutzung durch intelligente Laststeuerung
  • Reduzierung der Netzabhängigkeit
  • Optimierte Anlagenauslegung für höchste Effizienz
  ```

**Icon:** (Optional - upload or skip for now)
**Background Image:** (Optional - skip for now)

---

### **Step 6: Add Card 2 (1 minute)**

Click **"+ Add item"** again:

- **Step Number:** `2`
- **Card Title:** `AUFBAU`
- **Card Heading:** `Elektrifizierung der TGA`
- **Card Description:**
  ```
  Moderne Gebäudetechnik setzt auf elektrische Systeme statt fossiler Brennstoffe.
  
  • Wärmepumpen statt Gasheizungen
  • Elektrische Kühlung und Lüftung
  • Intelligente Gebäudeautomation
  ```

---

### **Step 7: Add Card 3 (1 minute)**

Click **"+ Add item"** one more time:

- **Step Number:** `3`
- **Card Title:** `MONETARISIERUNG`
- **Card Heading:** `Pauschalmietmodell`
- **Card Description:**
  ```
  Das rechtssichere Finanzierungsmodell schafft Win-Win-Situationen für alle Beteiligten.
  
  • Planbare Nebenkosten für Mieter
  • Attraktive Rendite für Investoren
  • Vollwartung inklusive
  ```

---

### **Step 8: Position Component (30 seconds)**

In the "Page Content" array:
1. **Drag & drop** the StackedExplainer to the right position
2. Suggested: After the Hero, before TextImage sections

---

### **Step 9: Publish (10 seconds)**

1. Click **"Publish"** button (top right)
2. Confirm publish

---

### **Step 10: Test (1 minute)**

Open development server:
```bash
# In a new terminal
cd /Users/j.wild/Projects/3lectrify-platform
pnpm --filter 3lectrify dev
```

Open: http://localhost:3000/unser-konzept

**Scroll slowly** to see the stacked cards animation!

---

## 🎬 Demo Checklist

Before showing to Art Director:

- [ ] All 3 cards added with content
- [ ] Cards are in correct order (1, 2, 3)
- [ ] Text is readable (not too long)
- [ ] Scroll animation works smoothly
- [ ] Test on mobile (responsive design)
- [ ] Check in development mode (see GSAP markers)
- [ ] Check in production mode (no markers)

---

## 🎯 Quick Demo Script

**1. Show Current Version (if still using FeatureShowcase)**
> "This is the current layout - everything visible at once."

**2. Show New Version**
> "Now watch this..." 
> *Scroll slowly*
> "Each card gets your full attention, one at a time."

**3. Highlight Key Points**
> "Sequential storytelling - perfect for process explanations."
> "Works beautifully on mobile."
> "Smooth GSAP animation - no janky CSS."

**4. Show CMS Control**
> "And the best part - content editors can change everything without a developer."

---

## 🐛 If Something Goes Wrong

### **Cards Not Showing?**
```bash
# Restart Next.js dev server
cd apps/3lectrify
pnpm dev
```

### **Animation Not Working?**
1. Check browser console for errors
2. Clear cache (Cmd+Shift+R)
3. Check GSAP is installed:
   ```bash
   pnpm list gsap
   ```

### **Sanity Studio Not Loading?**
```bash
# Restart Studio
cd apps/studio
pnpm dev
```

### **Changes Not Reflecting?**
1. Click **"Publish"** in Sanity (not just save)
2. Refresh Next.js page (Cmd+R)
3. Check correct page is open (`/unser-konzept`)

---

## 📸 Screenshots to Take

For presentation/documentation:
1. Sanity Studio - Adding new card
2. Desktop view - All 3 cards
3. Mobile view - Single card
4. GSAP markers (development mode)
5. Smooth scroll animation (video)

---

## ⏭️ After Demo

### **If Art Director Approves:**
1. Add icons to cards (upload in Sanity)
2. Add background images (optional)
3. Fine-tune text content
4. Deploy to production

### **If Art Director Wants Changes:**
1. Easy to adjust in Sanity (no code changes)
2. Can change colors in component file
3. Can adjust animation speed (change `scrub` value)

---

## 🎉 You're Ready!

**Component:** ✅ Built  
**Schema:** ✅ Ready  
**Queries:** ✅ Working  
**Rendering:** ✅ Implemented  
**Documentation:** ✅ Complete  

**Time to add content:** ~5 minutes  
**Time to demo:** ~2 minutes  

---

**Let's make tomorrow's presentation unforgettable!** 🚀



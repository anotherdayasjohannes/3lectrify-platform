# 🚀 References Grid - Quick Start (5 Minutes)

**Your sophisticated References component is ready!** Follow these steps to see it in action.

---

## ⚡ Quick Setup

### **1. Restart Sanity Studio** (1 min)

```bash
cd /Users/j.wild/Projects/3lectrify-platform
pnpm --filter @3lectrify/studio dev
```

Open: http://localhost:3333

---

### **2. Create 3 Reference Projects** (2 min)

**In Sanity Studio:**

1. Click **"Reference Project"** → **"Create new"**

2. **Mihla** (Featured):
   ```
   Name: Mihla
   Location: Thüringen
   Units: 450
   Year: 2023
   Type: Residential
   Featured: ✅
   Image: [Upload]
   Alt: "Energieautarkes Wohnprojekt Mihla"
   ```
   Click **"Publish"**

3. **Lübben**:
   ```
   Name: Lübben
   Location: Brandenburg
   Units: 380
   Year: 2022
   Type: Residential
   Featured: ❌
   Image: [Upload]
   ```
   Click **"Publish"**

4. **Unna**:
   ```
   Name: Unna
   Location: Nordrhein-Westfalen
   Units: 320
   Year: 2023
   Type: Mixed Use
   Featured: ❌
   Image: [Upload]
   ```
   Click **"Publish"**

---

### **3. Add to Home Page** (1 min)

1. Go to **"Pages"** → **"Home"**
2. Scroll to **"Page Content"**
3. Click **"+ Add item"** → **"References Grid"**
4. Select all 3 references (Mihla, Lübben, Unna)
5. Leave defaults:
   - Display Variant: **Bento Grid**
   - Theme: **Dark**
   - Show Stats: **✅**
6. Click **"Publish"**

---

### **4. Start Frontend** (1 min)

```bash
# New terminal
cd /Users/j.wild/Projects/3lectrify-platform
pnpm --filter @3lectrify/app dev
```

Open: http://localhost:3000

---

## 🎯 What You'll See

### **Visual Effects:**
- 🧲 Magnetic hover (cards follow mouse)
- 📜 Staggered scroll reveal
- ✨ Spotlight cursor effect
- 🌊 Parallax images
- 📊 Animated stats (1.400+, 15+, 100%)

### **Layout:**
- 📐 Bento grid (asymmetric)
- 🏆 Mihla appears larger (featured)
- 📱 Fully responsive

---

## 🎨 Features

### **Two Variants:**

1. **Bento Grid** (Default)
   - 3-8 projects
   - Asymmetric layout
   - Magnetic hover
   - Parallax images
   
2. **Marquee**
   - 10+ projects
   - Infinite scroll
   - Pause on hover
   - Clean & minimal

Switch variants in Sanity Studio!

---

## ⚙️ Configuration Options

**All configurable in Sanity Studio (no code):**

- ✅ Custom headline & description
- ✅ Select which projects to show
- ✅ Mark projects as "Featured" (larger cards)
- ✅ Switch between Grid and Marquee
- ✅ Toggle Dark/Light theme
- ✅ Show/hide statistics footer

---

## 🔥 Pro Tips

### **Image Tips:**
- Use 16:9 aspect ratio (1920×1080)
- Professional project photos
- Set hotspot/focal point in Sanity
- < 500KB file size

### **Content Tips:**
- Keep names short: "Mihla" not "Mihla - Energieautarkes Wohnprojekt"
- Use city/region for location: "Thüringen"
- Feature your best 1-2 projects
- Use completion year

### **Animation Tips:**
- Hover over cards to see magnetic effect
- Scroll slowly to see parallax
- Watch stats count up on first view

---

## 🐛 Not Working?

### **References not showing?**
```bash
# Restart both servers
pnpm --filter @3lectrify/studio dev
pnpm --filter @3lectrify/app dev
```

### **Images not loading?**
- Check if images are uploaded in Sanity
- Verify references are **published** (not draft)

### **Animations broken?**
- Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Win)
- Check browser console for errors (F12)

---

## 📚 Full Documentation

For customization, troubleshooting, and advanced features:

👉 **`REFERENCES_GRID_INTEGRATION_COMPLETE.md`**

---

## 🚀 Deploy to Production

When ready:

```bash
git add .
git commit -m "feat: add References Grid component"
git push
```

Vercel will auto-deploy! 🎉

---

## ✅ Checklist

- [ ] Sanity Studio running (http://localhost:3333)
- [ ] Created 3 reference projects
- [ ] Added References Grid to home page
- [ ] Frontend running (http://localhost:3000)
- [ ] Tested hover effects
- [ ] Checked mobile view
- [ ] Ready to deploy!

---

**That's it! You're done!** 🎉

Enjoy your sophisticated, animated References Grid component! 🚀




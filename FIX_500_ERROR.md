# 🔧 Fix: 500 Internal Server Error

**Issue:** `GET http://localhost:3000/ 500 (Internal Server Error)`  
**Cause:** Most likely the "home" page doesn't exist in Sanity (or is unpublished)

---

## ✅ **Quick Fix (5 minutes)**

### **Step 1: Open Sanity Studio**

**In your browser, go to:**
👉 **http://localhost:3333**

(Should open automatically - I just started it for you!)

---

### **Step 2: Check if "Home" Page Exists**

1. In Sanity Studio, click **"Pages"** in the left sidebar
2. Look for a page titled **"Home"**

**If you see it:**
- ✅ Make sure it's **PUBLISHED** (not draft)
- ✅ Check that the slug is **"home"** (not "Home" or anything else)

**If you DON'T see it:**
- ❌ You need to create it → Go to Step 3

---

### **Step 3: Create Home Page**

1. Click **"Pages"** → **"Create new"**
2. Fill in:
   ```
   Title: Home
   Slug: home (should auto-generate)
   Description: Homepage of 3lectrify platform
   ```

3. Add some content blocks:
   - Click **"+ Add item"** in **"Page Content"**
   - Add a **Hero** block:
     ```
     Headline: Willkommen bei 3lectrify
     Subtext: Your energy-independent future starts here
     ```
   - Optionally add more blocks (Feature Cards, CTA, etc.)

4. **Click "Publish"** (top right, green button)

---

### **Step 4: Refresh Your Browser**

Go back to **http://localhost:3000** and refresh (Cmd+R / Ctrl+R)

**The 500 error should be gone!** ✅

---

## 🔍 **Still Getting 500 Error?**

### **Check Your Terminal Output**

Look at the terminal where you ran `pnpm dev`. You should see detailed error messages. Common errors:

#### **Error 1: "Page not found" or "null is not an object"**
```
TypeError: Cannot read properties of null
```
**Fix:** The page exists but has no content or is unpublished.
- Open the page in Sanity Studio
- Make sure it's **published** (not draft)
- Add at least one content block

---

#### **Error 2: "Invalid type" or "Schema error"**
```
Error: Invalid type name: "reference" is a reserved name
```
**Fix:** Schema error (already fixed in code, but Sanity Studio might not have restarted)
- Kill Sanity Studio (Ctrl+C in terminal)
- Restart: `pnpm --filter 3lectrify-platform dev`
- Hard refresh browser: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Win)

---

#### **Error 3: "Cannot find module" or "Module not found"**
```
Error: Cannot find module '@3lectrify/ui'
```
**Fix:** Dependencies not installed or workspace issue
```bash
cd /Users/j.wild/Projects/3lectrify-platform
pnpm install
pnpm --filter 3lectrify dev
```

---

#### **Error 4: Network/Fetch Error**
```
Failed to fetch from Sanity
```
**Fix:** Check environment variables
```bash
cat apps/3lectrify/.env.local
```

Should show:
```
NEXT_PUBLIC_SANITY_PROJECT_ID="iedths1l"
NEXT_PUBLIC_SANITY_DATASET="production"
```

---

## 🐛 **Advanced Debugging**

### **See Detailed Error in Browser**

1. Open browser DevTools: **F12** (or right-click → Inspect)
2. Go to **Console** tab
3. Refresh page
4. Look for red error messages
5. Copy error and share with me

### **See Detailed Error in Terminal**

The terminal running `pnpm --filter 3lectrify dev` shows:
- Stack traces
- Line numbers
- Exact error messages

**Copy the full error and share it!**

---

## 🎯 **Common Scenarios**

### **Scenario 1: Fresh Install, No Pages**
**Symptoms:** 500 error on all pages  
**Fix:** Create pages in Sanity Studio
- Home page (slug: "home")
- Ihr Vorteil page (slug: "ihr-vorteil")

### **Scenario 2: Schema Changed, Studio Not Restarted**
**Symptoms:** 500 error after adding Reference component  
**Fix:** Restart Sanity Studio
```bash
# Kill current Studio
# Then restart:
pnpm --filter 3lectrify-platform dev
```

### **Scenario 3: Cache Issues**
**Symptoms:** Random 500 errors after updates  
**Fix:** Clear Next.js cache
```bash
rm -rf apps/3lectrify/.next
pnpm --filter 3lectrify dev
```

---

## ✅ **Checklist**

- [ ] Sanity Studio running (http://localhost:3333)
- [ ] Next.js dev server running (http://localhost:3000)
- [ ] Home page exists in Sanity
- [ ] Home page is PUBLISHED (not draft)
- [ ] Home page has slug "home"
- [ ] Home page has at least one content block
- [ ] Browser refreshed
- [ ] No errors in terminal
- [ ] No errors in browser console

---

## 🆘 **Still Broken?**

**Share this info:**
1. **Exact error from terminal** (where dev server is running)
2. **Error from browser console** (F12 → Console tab)
3. **Screenshot** of Sanity Studio showing your pages
4. **What you've tried** from this guide

I'll pinpoint the exact issue and fix it! 🎯

---

## 💡 **Pro Tip**

**Always check two places for errors:**
1. **Terminal:** Server-side errors (data fetching, API calls)
2. **Browser Console:** Client-side errors (React, JavaScript)

Together, they tell the full story! 📖



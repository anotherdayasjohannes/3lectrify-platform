# 🔍 Debug: Internal Server Error

## Quick Diagnostic Checklist

### ✅ Step 1: Check Environment Variables

**In terminal:**
```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps/3lectrify
cat .env.local
```

**Should show:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=iedths1l
NEXT_PUBLIC_SANITY_DATASET=production
```

**If missing:** Create `.env.local` file with above content.

---

### ✅ Step 2: Check Dev Server Logs

**Look for errors in terminal where you ran `pnpm dev`**

Common errors:
- `Error: Cannot find module...` → Missing dependency
- `TypeError: Cannot read property...` → Data fetching issue
- `SyntaxError: Unexpected token...` → Code syntax error

---

### ✅ Step 3: Check Browser Console

1. Open browser (Chrome/Firefox)
2. Press **F12** (DevTools)
3. Go to **Console** tab
4. Look for red errors

Common errors:
- `Failed to fetch` → API/Network issue
- `Hydration error` → Server/Client mismatch (usually harmless)
- `TypeError` → JavaScript runtime error

---

### ✅ Step 4: Test Sanity Connection

**Create test file:** `apps/3lectrify/test-sanity.js`
```javascript
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'iedths1l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

client.fetch('*[_type == "page"][0]')
  .then(page => {
    console.log('✅ Sanity connected!');
    console.log('Page:', page?.title);
  })
  .catch(err => {
    console.error('❌ Sanity error:', err.message);
  });
```

**Run:**
```bash
cd /Users/j.wild/Projects/3lectrify-platform/apps/3lectrify
node test-sanity.js
```

---

### ✅ Step 5: Check Specific Pages

**Homepage:**
```bash
curl http://localhost:3000
```

**Ihr Vorteil:**
```bash
curl http://localhost:3000/ihr-vorteil
```

If these return HTML → Server is working  
If these error → Server issue

---

### ✅ Step 6: Restart Everything

**Kill all processes:**
```bash
# Press Ctrl+C in all terminal windows
```

**Fresh start:**
```bash
# Terminal 1: Sanity Studio
cd /Users/j.wild/Projects/3lectrify-platform
pnpm --filter @3lectrify/studio dev

# Terminal 2: Next.js App
cd /Users/j.wild/Projects/3lectrify-platform
pnpm --filter @3lectrify/app dev
```

---

### ✅ Step 7: Check for Port Conflicts

**See what's using ports:**
```bash
lsof -i :3000  # Next.js
lsof -i :3333  # Sanity Studio
```

**Kill if needed:**
```bash
kill -9 [PID]
```

---

## 🚨 Most Common Issues & Fixes

### **Issue 1: Missing Environment Variables**
**Error:** "Cannot connect to Sanity" or "Invalid project ID"  
**Fix:** Create/check `.env.local` file

### **Issue 2: Page Not Found in Sanity**
**Error:** "Page not found" or "null is not an object"  
**Fix:** Create pages in Sanity Studio with correct slugs

### **Issue 3: Schema Errors**
**Error:** "Invalid schema" or "Type not found"  
**Fix:** Restart Sanity Studio after schema changes

### **Issue 4: Dependency Issues**
**Error:** "Cannot find module..."  
**Fix:** Run `pnpm install` again

### **Issue 5: Stale Cache**
**Error:** Random errors after updates  
**Fix:** Clear Next.js cache:
```bash
rm -rf apps/3lectrify/.next
pnpm --filter @3lectrify/app dev
```

---

## 📊 Quick Health Check

Run all checks:
```bash
# 1. Check env vars
cat apps/3lectrify/.env.local

# 2. Check Sanity connection
node apps/3lectrify/test-sanity.js

# 3. Clear cache
rm -rf apps/3lectrify/.next

# 4. Rebuild
pnpm build

# 5. Start dev
pnpm --filter @3lectrify/app dev
```

---

## 🆘 Still Broken?

**Share these details:**
1. **Exact error message** (from browser console or terminal)
2. **Which page** you're trying to access
3. **Environment:** Local dev or production?
4. **Recent changes:** What did you change before the error?

---

## 💡 Pro Tip

**Use browser DevTools Network tab:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Look for **red/failed requests**
5. Click on failed request to see error details

This shows exactly which API call is failing! 🎯


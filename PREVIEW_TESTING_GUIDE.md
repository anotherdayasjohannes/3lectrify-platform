# 🧪 Sanity Preview Testing Guide

Quick guide to test your new live preview setup!

---

## ✅ Prerequisites Checklist

Before testing, ensure you have:

- [ ] **Created a Sanity Read Token**
  - Go to: https://www.sanity.io/manage/personal/tokens
  - Create token with "Viewer" permissions
  - Name it: `3lectrify Preview Token`

- [ ] **Added token to `.env.local`**
  ```bash
  SANITY_API_READ_TOKEN=your_token_here
  ```

- [ ] **Restarted your dev servers** after adding the token

---

## 🚀 Testing Steps

### 1. Start Both Dev Servers

**Terminal 1 - Next.js Frontend:**
```bash
cd apps/3lectrify
npm run dev
```
✅ Should be running on: http://localhost:3000

**Terminal 2 - Sanity Studio:**
```bash
cd apps/studio
npm run dev
```
✅ Should be running on: http://localhost:3333

---

### 2. Test Manual Draft Mode (Optional)

Before testing in Studio, verify draft mode works:

1. Visit: http://localhost:3000/api/draft?slug=home
2. You should be redirected to the homepage
3. **Look for the purple banner** at the bottom:
   ```
   🎬 Preview Mode Active • Viewing draft content • Exit Preview
   ```
4. Click **"Exit Preview"** to disable draft mode

✅ **Success Criteria:** Purple banner appears and disappears correctly

---

### 3. Open Sanity Studio

1. Open: http://localhost:3333
2. You should see the main Studio interface
3. In the top navigation, look for the **"Presentation"** tab (new!)

✅ **Success Criteria:** Presentation tab is visible in navigation

---

### 4. Open Presentation Tool

1. Click the **"Presentation"** tab
2. You should see a **split-screen view**:
   - **Left side:** Sanity content editor
   - **Right side:** Your website preview (iframe)

✅ **Success Criteria:** Split-screen opens with your site in the preview pane

---

### 5. Test Live Preview on Home Page

1. In Presentation Tool, navigate to your **"Home"** page document
2. Make a change to any text field (e.g., change a headline)
3. **Don't save yet!** Just type...
4. Watch the right side - **changes should appear instantly!** ⚡

✅ **Success Criteria:** Changes appear in real-time as you type

---

### 6. Test on Different Page Types

Try the same test with:
- [ ] **Regular page** (e.g., `/ihr-vorteil`)
- [ ] **Legal page** (e.g., `/impressum`)
- [ ] **Dynamic content** (add/remove a card, change an image)

✅ **Success Criteria:** All page types preview correctly

---

### 7. Test Draft vs. Published Content

1. Make a change to a page in Presentation Tool
2. **Don't publish it**
3. In a **new browser window** (not in the iframe), visit the page normally
4. You should see the **old (published)** content
5. In the **preview iframe**, you should see the **new (draft)** content

✅ **Success Criteria:** Draft content only visible in preview, not on live site

---

### 8. Test Exit Preview

1. While in Presentation preview, notice the purple **"Preview Mode Active"** banner
2. Click **"Exit Preview"** in the banner
3. You should be redirected to the homepage
4. Banner should disappear
5. Now you're viewing **published content only**

✅ **Success Criteria:** Exit preview works and banner disappears

---

## 🐛 Common Issues & Fixes

### Issue: "Invalid secret" error
**Fix:**
- Ensure `SANITY_API_READ_TOKEN` is in `.env.local`
- Restart Next.js dev server
- Check token has **Viewer** permissions in Sanity

### Issue: Preview shows published content, not drafts
**Fix:**
- Check `SANITY_API_READ_TOKEN` is correctly set
- Try regenerating the token
- Clear browser cookies and try again

### Issue: Presentation tab not visible
**Fix:**
- Check `apps/studio/sanity.config.ts` has `presentationTool` imported
- Restart Sanity Studio dev server
- Clear browser cache

### Issue: Changes not appearing in preview
**Fix:**
- Check both dev servers are running
- Refresh the preview iframe
- Check browser console for errors
- Verify the page exists in Sanity

### Issue: Purple banner always visible
**Fix:**
- Visit: http://localhost:3000/api/disable-draft
- Clear browser cookies for localhost
- Start a new browser session

---

## 📋 Test Checklist

Run through this checklist to verify everything works:

- [ ] Both dev servers start without errors
- [ ] Presentation tab appears in Studio
- [ ] Split-screen preview loads
- [ ] Text changes appear instantly in preview
- [ ] Draft content NOT visible on normal site
- [ ] Published content visible on normal site
- [ ] Purple draft banner appears in preview
- [ ] Exit preview button works
- [ ] Different page types preview correctly
- [ ] Images update in preview
- [ ] No console errors in browser

---

## 🎯 Next Steps After Testing

Once all tests pass:

1. ✅ **Create Read Token for Production**
   - Create a separate token for Vercel production environment

2. ✅ **Add Token to Vercel**
   - Go to Vercel project settings
   - Add `SANITY_API_READ_TOKEN` environment variable
   - Redeploy

3. ✅ **Test on Vercel Preview**
   - Open a Vercel preview deployment
   - Test preview from Sanity Studio using preview URL

4. ✅ **Share with Team**
   - Show content editors the Presentation Tool
   - Document your content preview workflow

---

## 💡 Pro Tips

- **Use Presentation Tool for all content editing** - it's much faster than constantly publishing/checking
- **Preview URLs can be customized** - see `SANITY_PREVIEW_SETUP.md` for details
- **Multiple editors can preview simultaneously** - each gets their own draft session
- **Draft content is private** - only people with access to your Sanity project can see drafts

---

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check terminal output for server errors
3. Review `SANITY_PREVIEW_SETUP.md` for detailed setup instructions
4. Verify all environment variables are set correctly

**Happy previewing! 🎉**


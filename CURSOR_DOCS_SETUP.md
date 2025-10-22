# 🔧 Cursor Workspace Docs Setup Guide

## Where to Find the Docs Feature in Cursor

The location varies slightly depending on your Cursor version. Try these options:

---

## **Option 1: Cursor Tab (Most Common)**

1. **Open Cursor Settings** (`Cmd + ,`)
2. **Click the "Cursor" tab** at the top (not "User" or "Workspace")
3. **Look for one of these**:
   - "Cursor Tab" section
   - "AI" or "Chat" section
   - "Documentation" or "Docs" section
4. **Find**: "Include Documentation" or "Add Documentation URLs"

---

## **Option 2: Search Settings**

1. **Open Settings** (`Cmd + ,`)
2. **In the search bar**, type: `docs` or `documentation`
3. **Look for**:
   - "Cursor: Documentation URLs"
   - "Cursor: Include Documentation"
   - "Workspace Docs"

---

## **Option 3: Settings JSON (Direct Method)**

If you can't find the UI option, you can add it directly to settings:

1. **Open Command Palette** (`Cmd + Shift + P`)
2. Type: `Preferences: Open User Settings (JSON)`
3. **Add this to your settings.json**:

```json
{
  "cursor.chat.documentationUrls": [
    {
      "name": "GSAP Documentation",
      "url": "https://gsap.com/llms.txt"
    },
    {
      "name": "Lenis Smooth Scroll",
      "url": "https://raw.githubusercontent.com/studio-freight/lenis/main/README.md"
    }
  ]
}
```

---

## **Option 4: Use @Web Instead**

If documentation URLs aren't available in your Cursor version, you can use the `@Web` feature:

**Instead of**:
```
"@GSAP Documentation How do I create a timeline?"
```

**Use**:
```
"@Web https://gsap.com/docs/v3/GSAP/Timeline How do I create a timeline?"
```

**Or simply**:
```
"@Web GSAP timeline animation"
```

---

## **Option 5: .cursorrules is Enough!**

**Good news**: You don't actually *need* to add the docs URL manually!

The `.cursorrules` files I created already contain:
- ✅ All GSAP best practices
- ✅ Complete code examples
- ✅ ScrollTrigger patterns
- ✅ Timeline examples
- ✅ Lenis integration
- ✅ Accessibility rules

**Cursor will automatically follow these rules** when you ask for animations!

---

## **Test if It's Working**

Open any component file and ask:

```
"Create a scroll-triggered stagger animation for cards"
```

**Cursor should**:
- ✅ Use `useGSAP` (not `useEffect`)
- ✅ Add `{ scope: containerRef }`
- ✅ Include `once: true`
- ✅ Set default `opacity: 1`
- ✅ Add development markers

**If it does this, your setup is working perfectly!** ✨

---

## **Alternative: Use the Rules Directly**

Since you have comprehensive `.cursorrules` files, you can reference them directly:

```
"Following our .cursorrules, create a fade-in animation"
```

Or even simpler:
```
"Create a GSAP animation for the hero section"
```

Cursor will automatically check `.cursorrules` and follow the patterns!

---

## **What Version of Cursor Do You Have?**

Check your Cursor version:
- **Menu Bar** → About Cursor
- Or: `Cmd + Shift + P` → type "About"

**Documentation URLs might be called**:
- **Cursor 0.40+**: "Cursor Tab" → "Documentation"
- **Cursor 0.38-0.39**: "Features" → "Docs"
- **Cursor 0.35-0.37**: Settings JSON only

---

## **Bottom Line: You're Already Set Up!** ✅

The `.cursorrules` files are the most important part, and those are already in place!

**You can start using it now**:
1. Open any component
2. Ask for an animation
3. Watch Cursor follow the rules automatically

**The external docs URL is just a bonus** - not required! 🎉

---

## **Quick Test**

Try this right now in any file:

```
"Add a scroll-triggered fade-in animation to this component following our animation rules"
```

If Cursor uses `useGSAP` and includes proper ScrollTrigger setup, **you're good to go!** ✨

---

**Need help?** Let me know which Cursor version you have and I can provide exact instructions!


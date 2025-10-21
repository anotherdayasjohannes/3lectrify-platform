# 🎯 HubSpot to Next.js/Sanity Migration Status

## ✅ Completed Components

| HubSpot Module | New Component | Status | Notes |
|---------------|---------------|--------|-------|
| `hero-dark.module` | `Hero` | ✅ Complete | Dark background, subtext support |
| `hero-gradient.module` | `Hero` | ✅ Complete | Same as hero-dark |
| `feature-cards.module` | `FeatureCards` | ✅ Complete | 3-column card grid |
| `accordion-3-lane.module` | `FeatureShowcase` | ✅ Complete | Split-screen scroll storytelling |
| `text-image.module` | `TextImage` | ✅ Complete | 2-column layout with bullets |
| `simple-text-image.module` | `SimpleTextImage` | ✅ Complete | 1-column centered layout |
| `cta-section.module` | `CTA` | ✅ Complete | Call-to-action card |
| (Stats - custom) | `Stats` | ✅ Complete | Metric display cards |

---

## 🚧 Pages Using Modules

### **Home Page (`home.html`)**
- ✅ Hero Dark
- ✅ Text + Image (Ihr Vorteil section)
- ✅ 3-Lane Accordion → FeatureShowcase
- ⚠️ Raw HTML (unknown content)

### **Über Uns Page (`ueber-uns.html`)**
- ✅ Hero Dark
- ❌ **Mission Quote** - Not migrated
- ❌ **Team Grid** - Not migrated
- ⚠️ Raw HTML (unknown content)

### **Kontakt Page (`kontakt.html`)**
- ⚠️ Raw HTML blocks (likely contact form)

### **Other Pages**
- `agb.html` - Legal (probably just text)
- `datenschutz.html` - Privacy (probably just text)
- `impressum.html` - Imprint (probably just text)
- `widerrufsbelehrung.html` - Cancellation policy (probably just text)
- `page.html` - Generic template

---

## ❌ Missing Components (Priority Order)

### **🔥 High Priority - Used on Main Pages**

1. **Mission Quote Module**
   - **Used on:** Über Uns
   - **Purpose:** Display company mission/vision
   - **Complexity:** Low (text + styling)

2. **Team Grid Module**
   - **Used on:** Über Uns
   - **Purpose:** Display team members
   - **Complexity:** Medium (person cards with photos)

3. **Contact Form Module**
   - **Used on:** Kontakt
   - **Purpose:** Lead capture
   - **Complexity:** Medium (form validation, submission)

---

### **📦 Lower Priority - Less Common**

4. **Concept Module**
   - **Status:** Unknown usage
   - **Complexity:** Unknown

5. **Contact Two Column Module**
   - **Status:** Unknown usage
   - **Complexity:** Low

6. **Kontakt Simple Module**
   - **Status:** Unknown usage
   - **Complexity:** Low

7. **Reference Case Study Module**
   - **Status:** Unknown usage
   - **Complexity:** Medium

8. **References Grid Module**
   - **Status:** Unknown usage
   - **Complexity:** Medium

---

## 🎯 Recommended Next Steps

### **Option 1: Complete Über Uns Page** (Recommended)
1. Create `MissionQuote` component
2. Create `TeamGrid` component
3. Build `/ueber-uns` page in Next.js
4. Populate with Sanity content

**Why?** These are unique, visible sections that complete a main page.

### **Option 2: Complete Kontakt Page**
1. Analyze raw HTML in `kontakt.html`
2. Create `ContactForm` component (with form handling)
3. Build `/kontakt` page in Next.js

**Why?** Important conversion page, but forms require backend integration.

### **Option 3: Legal Pages**
1. Create simple content pages
2. Probably just rich text from Sanity

**Why?** Required pages, but low complexity.

---

## 📊 Migration Progress

- **Components Migrated:** 8/16 (50%)
- **Pages Complete:** 2/6 (Home + Ihr Vorteil)
- **Pages In Progress:** 4 (Über Uns, Kontakt, Legal pages)

---

## 🚀 What Would You Like to Tackle First?

**My recommendation:** Start with **Über Uns** components (Mission Quote + Team Grid) since:
- ✅ They're actively used
- ✅ Relatively simple to build
- ✅ Complete a full customer-facing page
- ✅ No backend complexity (unlike contact forms)

Would you like to start with these?


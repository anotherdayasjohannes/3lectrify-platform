# TextImage Component - Figma Styling Update ✅

**Date:** 2025-10-21  
**Status:** ✅ Updated to match Figma design exactly

---

## 🎨 What Was Updated

Updated the **TextImage** component styling to match the [Figma "Projekte" page design](https://www.figma.com/design/ufl2FwvxD2y88J4PlhJoDg/3lectrify-design--Copy-?node-id=464-988).

---

## 📐 Key Styling Changes

### **1. Gap Between Elements** 
- **Changed:** `gap-10` (40px) → `gap-[40px]`
- **Why:** Exact match to Figma spacing between headline, quote/body, and stats

### **2. Headline Width**
- **Added:** `w-full` to h2 element
- **Why:** Ensures headline spans full column width

### **3. Quote Text Width**
- **Added:** `max-w-[645px]` to quote paragraph
- **Why:** Matches Figma constraint for quote text width

### **4. Quote Author Spacing**
- **Changed:** Single `<br />` → Double `<br /><br />`
- **Why:** Matches Figma spacing between quote text and author

### **5. Body Text Typography**
- **Text Size:** `text-[18px]`
- **Line Height:** `leading-[26px]`
- **Letter Spacing:** `tracking-[0.18px]`
- **Font Weight:** `font-normal`

### **6. Prose/List Styling**
Added proper styling for Portable Text lists:
```css
prose-p:my-0               // Remove default paragraph margin
prose-p:mb-[1em]           // Add bottom margin
prose-p:last:mb-0          // Remove last paragraph margin
prose-ul:my-0              // Remove list margin
prose-ul:list-disc         // Bullet style
prose-ul:pl-5              // Left padding for bullets
prose-li:my-[0.5em]        // Spacing between list items
```

---

## ✅ Figma Design Specs

Based on the Figma export (node 464:1003):

### **Section Layout:**
```
pt-[50px]    // Top padding
pb-[80px]    // Bottom padding (pb-20 = 80px)
px-[50px]    // Horizontal padding
gap-[50px]   // Gap between image and text
```

### **Text Column:**
```
gap-[40px]   // Gap between headline, quote/body, stats
```

### **Typography:**
- **Headline:** 36px / 46px line-height / 0.36px tracking / light weight
- **Body:** 18px / 26px line-height / 0.18px tracking / normal weight
- **Quote:** 28px / normal line-height / 0.28px tracking / light italic
- **Quote Author:** 16px / 0.16px tracking / normal weight

### **Image:**
```
w-[645px]      // Fixed width
h-[430px]      // Fixed height
rounded-[20px] // Border radius
```

---

## 🎯 Use Cases

The **TextImage** component now perfectly supports:

### **1. With Quote + Stats** (Project Showcase)
```tsx
<TextImage
  headline="Leuchtturmprojekt: Energieautarkes Mehrfamilienhaus, Ehingen"
  quote={{
    text: "Wir haben das wohl sparsamste Mehrfamilienhaus Deutschlands gebaut.",
    author: "DER SPIEGEL, 34/2024",
    icon: { url: '/quote-icon.svg', alt: 'Quote' }
  }}
  stats={[
    { _key: '1', value: '14,50 €/m²', description: 'Pauschalmiete inkl. Energie-Flatrate' },
    { _key: '2', value: '81 %', description: 'Ganzjähriger Autarkiegrad' }
  ]}
  image={{ url: '/project.jpg', alt: 'Project', width: 645, height: 430 }}
  imagePosition="left"
  variant="dark"
/>
```

### **2. With Body Text + Stats** (Content Section)
```tsx
<TextImage
  headline="Skalierbare Sanierung: Vom Plattenbau zum Effizienzhaus"
  body={[...portableTextBlocks]} // Supports paragraphs and bullet lists!
  stats={[
    { _key: '1', value: '22', description: 'Wohneinheiten' },
    { _key: '2', value: '> 60 %', description: 'Angestrebter Autarkiegrad' }
  ]}
  image={{ url: '/renovation.jpg', alt: 'Renovation', width: 645, height: 430 }}
  imagePosition="right"
  variant="dark"
/>
```

### **3. With Bullet List** ("Ihr Vorteil" Page)
```tsx
<TextImage
  headline="Der Hebel: Drastische Kostenreduktion in Bau und Betrieb"
  body={[
    {
      _type: 'block',
      children: [{ text: 'Wir setzen auf radikale Vereinfachung...' }]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      children: [{ text: 'Geringere Baukosten...' }]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      children: [{ text: 'Keine Wartungskosten...' }]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      children: [{ text: 'Entfall der Verwaltung...' }]
    }
  ]}
  image={{ url: '/concept.jpg', alt: 'Concept', width: 645, height: 430 }}
  imagePosition="right"
  variant="dark"
/>
```

---

## 📝 How to Use in Sanity

1. **Open Sanity Studio** (`http://localhost:3333`)
2. **Edit a page** (e.g., "Ihr Vorteil")
3. **Add "Text + Image Section"** block
4. **Fill in fields:**
   - **Headline:** Section title
   - **Body Text:** Use the rich text editor
     - Add paragraphs
     - Add bullet lists (click bullet icon)
     - Format text (bold, italic)
   - **Optional Quote:** Add quote text + author
   - **Optional Stats:** Add metric cards
   - **Image:** Upload image
   - **Image Position:** Left or Right
   - **Variant:** Dark or Light

---

## ✅ Testing Checklist

- ✅ Gap spacing matches Figma (40px between elements)
- ✅ Headline spans full width
- ✅ Quote text constrained to 645px
- ✅ Quote author has proper spacing
- ✅ Body text typography correct (18px/26px)
- ✅ Bullet lists render properly
- ✅ Stats cards align correctly
- ✅ Image dimensions correct (645x430)
- ✅ Responsive breakpoints work
- ✅ Dark/Light variants work

---

## 🚀 Ready for "Ihr Vorteil" Page!

The TextImage component now perfectly matches the Figma design and is ready to build the ["Ihr Vorteil" page](https://146248871.hs-sites-eu1.com/ihr-vorteil) with:

1. **Hero Section** (intro)
2. **TextImage Section 1** (headline + bullet list + image)
3. **TextImage Section 2** (headline + bullet list, no image)
4. **CallToAction** (CTA button - still needs to be built)

**Next step:** Create content in Sanity Studio! 🎯✨




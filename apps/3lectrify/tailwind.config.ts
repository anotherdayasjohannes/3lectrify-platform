import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
    "../../packages/ui/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Font Family
      fontFamily: {
        lato: ['var(--font-lato)', 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      // Grid Template Columns for Text + Image 2-column layout
      gridTemplateColumns: {
        'text-image': '645px 645px',
      },
      // Custom Font Sizes - Figma Design System
      fontSize: {
        'body': ['18px', '24px'],           // General body text
        'body-hero': ['24px', '34px'],      // Hero body text
        'nav': ['18px', '24px'],            // Navigation links
        'h1': ['48px', '58px'],             // Already correct
        'h2': ['36px', '46px'],             // Already correct
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

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
      // Custom Animations for References Grid
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 8px rgba(136, 192, 177, 0.6)',
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 16px rgba(136, 192, 177, 0.9)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

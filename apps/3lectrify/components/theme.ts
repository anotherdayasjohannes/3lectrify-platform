/**
 * 3lectrify Design System - Design Tokens
 * 
 * Extracted from Marion's Figma design system
 * Source: Figma Textstyles export (AnimaPackage-Html-fngAW)
 * Date: 2025-10-30
 * 
 * This file serves as the single source of truth for typography, colors, and spacing.
 * All components should reference these tokens instead of hard-coding values.
 * 
 * @see docs/FIGMA_TO_COMPONENTS.md for component mapping
 */

/**
 * Typography Scale (Desktop/Legacy)
 * 
 * 8 text styles defined in Figma, mapped to exact specifications:
 * - Font family: Lato (already loaded via Next.js in layout.tsx)
 * - Weights: 300 (Light), 400 (Regular)
 * - All sizes, line heights, and letter spacing match Figma exactly
 * 
 * @deprecated Use responsiveTypography for new components
 */
export const typography = {
  /**
   * Figma: "H1 Lato Light 48"
   * Usage: Main page headlines, hero titles
   * Example: Homepage hero, landing page titles
   */
  h1: {
    fontSize: '48px',
    fontWeight: 300,
    lineHeight: '58px',
    letterSpacing: '0.48px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Figma: "H2 Lato Light 36"
   * Usage: Section headlines
   * Example: "Ihr Vorteil", "Unser Konzept" section titles
   */
  h2: {
    fontSize: '36px',
    fontWeight: 300,
    lineHeight: '46px',
    letterSpacing: '0.36px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Figma: "H3 Lato Reg 20"
   * Usage: Card titles, subsection headlines
   * Example: Feature card titles, team member names
   */
  h3: {
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '34px',
    letterSpacing: '0.2px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Figma: "Copy Lato Reg 18"
   * Usage: Default body text (most common)
   * Example: Paragraphs, descriptions, general content
   */
  body: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '0.18px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Figma: "Copy small Lato Reg 16"
   * Usage: Small body text, captions, labels
   * Example: Footer text, form labels, metadata
   */
  bodySmall: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '0.16px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Figma: "Intro Lato Light 24"
   * Usage: Intro paragraphs, lead text
   * Example: Section introductions, hero subtext
   */
  intro: {
    fontSize: '24px',
    fontWeight: 300,
    lineHeight: '34px',
    letterSpacing: '0.24px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Figma: "Quote Lato Light 28 italic"
   * Usage: Pull quotes, testimonials
   * Example: Quote blocks in TextImage component
   */
  quote: {
    fontSize: '28px',
    fontWeight: 300,
    lineHeight: 'normal',
    letterSpacing: '0.28px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    fontStyle: 'italic',
  },
  
  /**
   * Figma: "Numbers Lato Reg 36"
   * Usage: Statistics, large numbers
   * Example: Stats component values
   */
  numbers: {
    fontSize: '36px',
    fontWeight: 400,
    lineHeight: '46px',
    letterSpacing: '0.36px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Caption text (14px)
   * Usage: Very small text, badges, metadata, micro-copy
   * Example: Card badges, labels, timestamps
   */
  caption: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.14px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Caption text bold variant
   * Usage: Bold badges, emphasized small text
   * Example: "15 Einheiten" badge, CTA micro-copy
   */
  captionBold: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    letterSpacing: '0.14px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Card title (28px)
   * Usage: Bento grid card titles, medium-sized headlines
   * Example: Reference card project names
   */
  cardTitle: {
    fontSize: '28px',
    fontWeight: 300,
    lineHeight: '36px',
    letterSpacing: '0.28px',
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
} as const;

/**
 * Responsive Typography Scale (Mobile-First)
 * 
 * Progressive enhancement from mobile to tablet to desktop
 * Components should use these for optimal mobile UX
 * 
 * Usage Example:
 * ```tsx
 * <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[50px] lg:text-[48px] lg:leading-[58px]">
 * ```
 */
export const responsiveTypography = {
  /**
   * H1 - Main Page Headlines
   * Mobile → Tablet → Desktop progressive enhancement
   */
  h1: {
    mobile: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '0.32px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    tablet: {
      fontSize: '40px',
      lineHeight: '50px',
      letterSpacing: '0.4px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '48px',
      lineHeight: '58px',
      letterSpacing: '0.48px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * H2 - Section Headlines
   * Mobile → Tablet → Desktop progressive enhancement
   */
  h2: {
    mobile: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0.24px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    tablet: {
      fontSize: '32px',
      lineHeight: '42px',
      letterSpacing: '0.32px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '36px',
      lineHeight: '46px',
      letterSpacing: '0.36px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * H3 - Card Titles, Subsection Headlines
   * Mobile → Desktop progressive enhancement
   */
  h3: {
    mobile: {
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '0.18px',
      fontWeight: 400,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '20px',
      lineHeight: '34px',
      letterSpacing: '0.2px',
      fontWeight: 400,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * Body - Default Body Text
   * Mobile → Desktop progressive enhancement
   */
  body: {
    mobile: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.16px',
      fontWeight: 400,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0.18px',
      fontWeight: 400,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * Body Small - Small Body Text, Labels
   * Remains consistent across all viewports
   */
  bodySmall: {
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.14px',
    fontWeight: 400,
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Intro - Lead Text, Section Introductions
   * Mobile → Desktop progressive enhancement
   */
  intro: {
    mobile: {
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '0.18px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '24px',
      lineHeight: '34px',
      letterSpacing: '0.24px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * Quote - Pull Quotes, Testimonials
   * Mobile → Desktop progressive enhancement
   */
  quote: {
    mobile: {
      fontSize: '20px',
      lineHeight: '30px',
      letterSpacing: '0.2px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
      fontStyle: 'italic',
    },
    desktop: {
      fontSize: '28px',
      lineHeight: 'normal',
      letterSpacing: '0.28px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
      fontStyle: 'italic',
    },
  },
  
  /**
   * Numbers - Statistics, Large Numbers
   * Mobile → Desktop progressive enhancement
   */
  numbers: {
    mobile: {
      fontSize: '28px',
      lineHeight: '38px',
      letterSpacing: '0.28px',
      fontWeight: 400,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '36px',
      lineHeight: '46px',
      letterSpacing: '0.36px',
      fontWeight: 400,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * Card Title - Bento Grid Cards, Medium Headlines
   * Mobile → Desktop progressive enhancement
   */
  cardTitle: {
    mobile: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0.2px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
    desktop: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '0.28px',
      fontWeight: 300,
      fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
    },
  },
  
  /**
   * Caption - Very Small Text, Badges, Metadata
   * Remains consistent across all viewports
   */
  caption: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.14px',
    fontWeight: 400,
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
  
  /**
   * Caption Bold - Bold Badges, Emphasized Small Text
   * Remains consistent across all viewports
   */
  captionBold: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.14px',
    fontWeight: 700,
    fontFamily: 'var(--font-lato), Lato, Helvetica, sans-serif',
  },
} as const;

/**
 * Color Palette
 * 
 * 18 colors defined in Figma design system
 * Organized by category: Accents, Blues, Neutrals, Warm Accents, Background Tints
 */
export const colors = {
  // ===== Primary Accents =====
  
  /**
   * Orange accent
   * Usage: CTAs, important highlights, error states
   * Hex: #D04227
   */
  orange: '#D04227',
  
  /**
   * Green accent
   * Usage: Secondary accents
   * Hex: #78B5A1
   */
  green: '#78B5A1',
  
  /**
   * Middle Green (Primary accent - most used)
   * Usage: Primary brand color, buttons, highlights
   * Hex: #88C0B1
   * Example: Button backgrounds, icon colors, accent elements
   */
  middleGreen: '#88C0B1',
  
  /**
   * Light Green (Secondary accent)
   * Usage: Button hover states, light accents
   * Hex: #C5E0D7
   * Example: Button hover, light backgrounds
   */
  lightGreen: '#C5E0D7',
  
  // ===== Blues =====
  
  /**
   * Deep Blue (Main background)
   * Usage: Primary page background
   * Hex: #293645
   * Example: Body background, dark sections
   */
  deepBlue: '#293645',
  
  /**
   * Dark Blue (Card background)
   * Usage: Card backgrounds, elevated surfaces
   * Hex: #3C5067
   * Example: Feature cards, CTA cards, elevated sections
   */
  darkBlue: '#3C5067',
  
  /**
   * Blue Grey
   * Usage: Borders, dividers, subtle elements
   * Hex: #5F8299
   */
  blueGrey: '#5F8299',
  
  /**
   * Light Blue
   * Usage: Light backgrounds, tints
   * Hex: #CDE6EE
   */
  lightBlue: '#CDE6EE',
  
  // ===== Neutrals =====
  
  /**
   * White
   * Usage: Text on dark backgrounds, cards on light backgrounds
   * Hex: #FFFFFF
   */
  white: '#FFFFFF',
  
  /**
   * Light Grey
   * Usage: Secondary text, muted content
   * Hex: #C2C2C2
   */
  lightGrey: '#C2C2C2',
  
  /**
   * Middle Grey
   * Usage: Tertiary text, disabled states
   * Hex: #666666
   */
  middleGrey: '#666666',
  
  /**
   * Dark Grey
   * Usage: Text on light backgrounds
   * Hex: #333333
   */
  darkGrey: '#333333',
  
  // ===== Warm Accents =====
  
  /**
   * Curry
   * Usage: Warm accent color, highlights
   * Hex: #EAB257
   */
  curry: '#EAB257',
  
  /**
   * Beige
   * Usage: Warm backgrounds, subtle highlights
   * Hex: #DEA363
   */
  beige: '#DEA363',
  
  /**
   * Yellow Light
   * Usage: Light warm accents
   * Hex: #F5CC7E
   */
  yellowLight: '#F5CC7E',
  
  /**
   * Puder
   * Usage: Very light warm backgrounds
   * Hex: #FDE8D6
   */
  puder: '#FDE8D6',
  
  // ===== Background Tints =====
  
  /**
   * Background Green (25% opacity)
   * Usage: Subtle green background overlays
   * RGBA: rgba(197, 224, 215, 0.25)
   */
  backgroundGreen: 'rgba(197, 224, 215, 0.25)',
  
  /**
   * Background Blue (25% opacity)
   * Usage: Subtle blue background overlays
   * RGBA: rgba(205, 230, 238, 0.25)
   */
  backgroundBlue: 'rgba(205, 230, 238, 0.25)',
} as const;

/**
 * Spacing Scale
 * 
 * Standardized spacing values derived from current implementation
 * and Marion's feedback on spacing requirements
 */
export const spacing = {
  /**
   * Section vertical spacing (NEW STANDARD)
   * Ensures consistent 100px gaps between sections
   * Formula: 50px bottom (section A) + 50px top (section B) = 100px gap
   * 
   * Mobile: 40px + 40px = 80px between sections
   * Tablet/Desktop: 50px + 50px = 100px between sections
   * 
   * Usage: Apply to ALL section components (Hero, FeatureCards, TextImage, etc.)
   * Header/Footer have their own padding rules and are excluded
   */
  sectionSpacing: {
    mobile: {
      top: '40px',
      bottom: '40px',
    },
    tablet: {
      top: '50px',
      bottom: '50px',
    },
    desktop: {
      top: '50px',
      bottom: '50px',
    },
  },
  
  /**
   * @deprecated Use sectionSpacing instead
   * Legacy section padding - kept for reference during migration
   */
  section: {
    paddingTop: '80px',
    paddingBottom: '100px',
  },
  
  /**
   * Headline to body text spacing
   * Visual: ~1.2 line heights
   * Used between headlines and following body text
   */
  headlineToBody: '32px',
  
  /**
   * Paragraph margin (between paragraphs)
   * Equals 1 line height (26px for 18px text)
   */
  paragraphMargin: '26px',
  
  /**
   * Card gap (grid spacing)
   * Space between cards in grids
   */
  cardGap: '30px',
  
  /**
   * Content wrapper max-width
   * Centers content with max-width constraint
   */
  contentMaxWidth: '1165px',
} as const;

/**
 * Responsive Spacing (Mobile-First)
 * 
 * Progressive enhancement for gaps, padding, and margins
 * Components should use Tailwind classes with these values
 */
export const responsiveSpacing = {
  /**
   * Container padding (horizontal)
   * Mobile → Tablet → Desktop
   */
  container: {
    mobile: '20px',     // px-5
    tablet: '40px',     // md:px-10
    desktop: '50px',    // lg:px-[50px]
  },
  
  /**
   * Gap between elements (flex/grid)
   * Mobile → Tablet → Desktop
   */
  gap: {
    mobile: '20px',     // gap-5
    tablet: '25px',     // md:gap-6
    desktop: '30px',    // lg:gap-[30px]
  },
  
  /**
   * Section content gap (headline to content)
   * Mobile → Tablet → Desktop
   */
  sectionContent: {
    mobile: '24px',     // gap-6
    tablet: '32px',     // md:gap-8
    desktop: '40px',    // lg:gap-10
  },
  
  /**
   * Card internal padding
   * Mobile → Tablet → Desktop
   */
  cardPadding: {
    mobile: '20px',     // p-5
    tablet: '25px',     // md:p-6
    desktop: '30px',    // lg:p-[30px]
  },
} as const;

/**
 * SECTION SPACING STANDARDS
 * 
 * All section components should follow this pattern:
 * 
 * <section className="pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]">
 *   <div className="content-wrapper">
 *     
 *     {header && (
 *       <div className="mb-8 md:mb-10 lg:mb-[50px]">
 *         <h2 className="mb-6 md:mb-8">Headline</h2>
 *         <p>Description</p>
 *       </div>
 *     )}
 *     
 *     <div className={ctaExists ? 'mb-8 md:mb-10 lg:mb-[50px]' : ''}>
 *       Main Content
 *     </div>
 *     
 *     {cta && (
 *       <div>CTA Content</div>
 *     )}
 *     
 *   </div>
 * </section>
 * 
 * SPACING RULES:
 * - Single content-wrapper per section
 * - Header to Content: mb-8 md:mb-10 lg:mb-[50px]
 * - Content to CTA: mb-8 md:mb-10 lg:mb-[50px] (conditional)
 * - Headline to Description: mb-6 md:mb-8
 */
export const sectionSpacing = {
  /**
   * Spacing between major section elements (header → content, content → cta)
   * Mobile: 32px (8 * 4) → Tablet: 40px (10 * 4) → Desktop: 50px (12.5 * 4)
   * Tailwind: mb-8 md:mb-10 lg:mb-[50px]
   */
  betweenElements: {
    mobile: '32px',
    tablet: '40px', 
    desktop: '50px',
  },
  
  /**
   * Spacing for section header when followed by description
   * Mobile: 24px (6 * 4) → Tablet: 32px (8 * 4)
   * Tailwind: mb-6 md:mb-8
   */
  headerToDescription: {
    mobile: '24px',
    tablet: '32px',
  },
} as const;

/**
 * Interaction & Touch Targets (Mobile-First)
 * 
 * Ensures accessibility standards for mobile devices
 * iOS: 44pt minimum, Android: 48dp minimum
 * Using 44px as baseline for cross-platform compatibility
 */
export const interaction = {
  /**
   * Minimum touch target size
   * iOS Human Interface Guidelines: 44pt
   * Android Material Design: 48dp
   * Using 44px for consistency
   */
  minTouchTarget: '44px',
  
  /**
   * Button heights
   * Mobile: 44px minimum for touch
   * Desktop: Can be slightly smaller (40px)
   */
  buttonHeight: {
    mobile: '44px',    // h-11
    desktop: '40px',   // md:h-10
  },
  
  /**
   * Input heights
   * Same as buttons for visual consistency
   */
  inputHeight: {
    mobile: '44px',    // h-11
    desktop: '40px',   // md:h-10
  },
  
  /**
   * Touch target spacing
   * Minimum space between interactive elements
   * WCAG 2.1 Level AAA: 8px minimum
   */
  minSpacing: '8px',
  
  /**
   * Comfortable touch target spacing
   * Recommended for better UX
   */
  comfortableSpacing: '12px',
} as const;

/**
 * Icon Sizes
 * 
 * Standardized icon dimensions for consistent visual hierarchy
 */
export const iconSizes = {
  /**
   * Small icons
   * Usage: Inline icons, bullet points
   */
  small: {
    width: '24px',
    height: '24px',
  },
  
  /**
   * Medium icons
   * Usage: Card icons, feature icons
   */
  medium: {
    width: '48px',
    height: '48px',
  },
  
  /**
   * Large icons
   * Usage: Main feature cards, stacked explainer cards
   * Matches Figma: 80x80px
   */
  large: {
    width: '80px',
    height: '80px',
  },
} as const;

/**
 * Card Styling
 * 
 * Reusable card style primitives matching Figma design
 */
export const cardStyles = {
  /**
   * Border radius for cards
   * Matches Figma rounded corners
   */
  borderRadius: {
    default: '20px',
    large: '24px',
  },
  
  /**
   * Card shadows
   * Elevated card appearance
   */
  shadow: {
    default: '0px 15px 60px 0px rgba(0, 0, 0, 0.3)',
    hover: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  },
  
  /**
   * Card padding
   * Interior spacing for card content
   */
  padding: {
    default: {
      mobile: '25px',
      tablet: '30px',
      desktop: '35px 30px',
    },
    large: {
      mobile: '30px',
      tablet: '35px',
      desktop: '40px 30px',
    },
  },
} as const;

/**
 * Animations & Transitions
 * 
 * Reusable animation primitives for consistent interactions
 */
export const animations = {
  /**
   * Standard easing function
   * Smooth, natural motion
   */
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'ease-in-out',
  },
  
  /**
   * Transition durations
   */
  duration: {
    fast: '150ms',
    default: '300ms',
    slow: '500ms',
  },
  
  /**
   * Card hover effects
   * Matches FeatureCards component
   */
  cardHover: {
    translateY: '-8px',
    scale: 1.02,
  },
  
  /**
   * Icon hover effects
   */
  iconHover: {
    scale: 1.1,
  },
} as const;

/**
 * Responsive Breakpoints
 * 
 * Matches Tailwind's default breakpoints
 * Used for responsive typography and spacing adjustments
 */
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
} as const;

/**
 * Type Definitions
 * 
 * Export types for TypeScript autocomplete and type safety
 */
export type TypographyVariant = keyof typeof typography;
export type ColorKey = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
export type IconSize = keyof typeof iconSizes;
export type CardStyleKey = keyof typeof cardStyles;
export type AnimationKey = keyof typeof animations;

/**
 * Helper function to get typography styles as CSS-in-JS object
 * 
 * @example
 * const styles = getTypographyStyles('h2');
 * // Returns: { fontSize: '36px', fontWeight: 300, ... }
 */
export function getTypographyStyles(variant: TypographyVariant) {
  return typography[variant];
}

/**
 * Helper function to get color value
 * 
 * @example
 * const bgColor = getColor('deepBlue');
 * // Returns: '#293645'
 */
export function getColor(colorKey: ColorKey) {
  return colors[colorKey];
}

/**
 * Helper function to apply typography to a style object
 * Useful for inline styles or CSS-in-JS
 * 
 * @example
 * <h2 style={applyTypography('h2', { color: colors.white })}>
 *   Headline
 * </h2>
 */
export function applyTypography(
  variant: TypographyVariant,
  additionalStyles?: React.CSSProperties
): React.CSSProperties {
  return {
    ...typography[variant],
    ...additionalStyles,
  };
}


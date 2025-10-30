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
 * Typography Scale
 * 
 * 8 text styles defined in Figma, mapped to exact specifications:
 * - Font family: Lato (already loaded via Next.js in layout.tsx)
 * - Weights: 300 (Light), 400 (Regular)
 * - All sizes, line heights, and letter spacing match Figma exactly
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
   * Section padding (vertical)
   * Top: 80px, Bottom: 100px on desktop
   * Reduces on mobile via Tailwind responsive classes
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


import { type CSSProperties } from 'react';
import { typography, colors, type TypographyVariant } from '../../theme';

/**
 * Heading Component - Figma Design System
 * 
 * Renders semantic headings (h1-h3) with exact Figma specifications from Marion's design system.
 * All typography values are sourced from theme.ts, ensuring consistency across the application.
 * 
 * @example
 * ```tsx
 * // Hero headline (H1 - 48px Light)
 * <Heading variant="h1">
 *   Wir elektrifizieren die Zukunft
 * </Heading>
 * 
 * // Section headline (H2 - 36px Light) - default
 * <Heading>
 *   Ihr Vorteil als Investor
 * </Heading>
 * 
 * // Card title (H3 - 20px Regular)
 * <Heading variant="h3" color="white">
 *   Schnelle Umsetzung
 * </Heading>
 * 
 * // With custom className for responsive adjustments
 * <Heading 
 *   variant="h2" 
 *   className="md:text-[32px] md:leading-[42px]"
 * >
 *   Responsive Headline
 * </Heading>
 * ```
 * 
 * @see theme.ts for typography specifications
 * @see docs/FIGMA_TO_COMPONENTS.md for complete usage guide
 */

export type HeadingVariant = 'h1' | 'h2' | 'h3';
export type HeadingColor = 'white' | 'dark' | 'grey';

export interface HeadingProps {
  /**
   * Heading level and size variant
   * - h1: 48px / 300 weight (Hero headlines)
   * - h2: 36px / 300 weight (Section headlines) - DEFAULT
   * - h3: 20px / 400 weight (Card titles, subsections)
   * 
   * @default 'h2'
   */
  variant?: HeadingVariant;
  
  /**
   * Text color variant
   * - white: #FFFFFF (default, for dark backgrounds)
   * - dark: #333333 (for light backgrounds)
   * - grey: #C2C2C2 (muted/secondary headings)
   * 
   * @default 'white'
   */
  color?: HeadingColor;
  
  /**
   * Heading text content
   */
  children?: any;
  
  /**
   * Additional CSS classes for customization
   * Useful for responsive overrides or layout-specific adjustments
   * 
   * @example className="mb-8 md:mb-6"
   */
  className?: string;
  
  /**
   * Additional inline styles
   * Use sparingly - prefer className or theme tokens
   */
  style?: CSSProperties;
}

/**
 * Color mapping from string keys to hex values
 */
const colorMap: Record<HeadingColor, string> = {
  white: colors.white,
  dark: colors.darkGrey,
  grey: colors.lightGrey,
};

/**
 * Heading Component Implementation
 */
export function Heading({
  variant = 'h2',
  color = 'white',
  children,
  className = '',
  style = {},
}: HeadingProps) {
  // Get typography specs from theme for the selected variant
  const typo = typography[variant as TypographyVariant];
  
  // Select the appropriate HTML element
  const Component = variant;
  
  // Construct inline styles from Figma design tokens
  const inlineStyles: CSSProperties = {
    fontSize: typo.fontSize,
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
    fontFamily: typo.fontFamily,
    color: colorMap[color],
    margin: 0, // Reset default margins for consistency
    ...style, // Allow custom style overrides
  };
  
  return (
    <Component 
      style={inlineStyles}
      className={className}
    >
      {children}
    </Component>
  );
}

/**
 * Type guard to check if a string is a valid HeadingVariant
 * @internal
 */
export function isHeadingVariant(value: string): value is HeadingVariant {
  return ['h1', 'h2', 'h3'].includes(value);
}

/**
 * Helper to get Heading styles as a CSS-in-JS object
 * Useful for applying heading styles to non-heading elements
 * 
 * @example
 * ```tsx
 * <div style={getHeadingStyles('h2', 'white')}>
 *   Styled like an H2 but semantically a div
 * </div>
 * ```
 */
export function getHeadingStyles(
  variant: HeadingVariant = 'h2',
  color: HeadingColor = 'white'
): CSSProperties {
  const typo = typography[variant as TypographyVariant];
  
  return {
    fontSize: typo.fontSize,
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
    fontFamily: typo.fontFamily,
    color: colorMap[color],
    margin: 0,
  };
}


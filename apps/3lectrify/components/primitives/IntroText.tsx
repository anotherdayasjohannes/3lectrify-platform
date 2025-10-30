import { type CSSProperties, type ElementType } from 'react';
import { typography, colors } from '../theme';

/**
 * IntroText Component - Figma Design System
 * 
 * Renders intro/lead paragraphs with Figma specification: 24px Light (weight 300).
 * Used for section introductions, hero subtext, and lead paragraphs that need emphasis.
 * 
 * This is distinct from regular body text (18px) - it's larger and lighter for introductory content.
 * 
 * @example
 * ```tsx
 * // Section introduction
 * <IntroText>
 *   Unser Antrieb ist es, die Immobilienbranche zu transformieren 
 *   und eine nachhaltige, elektrifizierte Zukunft zu gestalten.
 * </IntroText>
 * 
 * // Hero subtext
 * <IntroText color="white">
 *   Nachhaltige Lösungen für die Elektrifizierung von Immobilien.
 * </IntroText>
 * 
 * // Dark background variant
 * <IntroText color="dark">
 *   Lead paragraph on light background.
 * </IntroText>
 * ```
 * 
 * @see theme.ts for typography specifications
 * @see docs/FIGMA_TO_COMPONENTS.md for complete usage guide
 */

export type IntroTextColor = 'white' | 'dark';
export type IntroTextElement = 'p' | 'div';

export interface IntroTextProps {
  /**
   * Text color variant
   * - white: #FFFFFF (for dark backgrounds) - DEFAULT
   * - dark: #333333 (for light backgrounds)
   * 
   * @default 'white'
   */
  color?: IntroTextColor;
  
  /**
   * HTML element to render as
   * - p: Paragraph (default, semantic)
   * - div: Div (for flexibility)
   * 
   * @default 'p'
   */
  as?: IntroTextElement;
  
  /**
   * Text content
   */
  children?: any;
  
  /**
   * Additional CSS classes
   * @example className="max-w-3xl mx-auto"
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: CSSProperties;
}

/**
 * Color mapping from string keys to hex values
 */
const colorMap: Record<IntroTextColor, string> = {
  white: colors.white,
  dark: colors.darkGrey,
};

/**
 * IntroText Component Implementation
 */
export function IntroText({
  color = 'white',
  as = 'p',
  children,
  className = '',
  style = {},
}: IntroTextProps) {
  // Get Figma spec for intro text (24px / 300 weight)
  const typo = typography.intro;
  
  // Select HTML element
  const Component = as as ElementType;
  
  // Construct inline styles from Figma design tokens
  const inlineStyles: CSSProperties = {
    fontSize: typo.fontSize,
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
    fontFamily: typo.fontFamily,
    color: colorMap[color],
    margin: 0, // Reset default margins
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
 * Helper to get IntroText styles as a CSS-in-JS object
 * 
 * @example
 * ```tsx
 * <div style={getIntroTextStyles('dark')}>
 *   Styled like intro text
 * </div>
 * ```
 */
export function getIntroTextStyles(
  color: IntroTextColor = 'white'
): CSSProperties {
  const typo = typography.intro;
  
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


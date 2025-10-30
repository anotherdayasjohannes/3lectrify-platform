import React, { type CSSProperties, type ElementType } from 'react';
import { typography, colors } from '../../theme';

/**
 * BodyText Component - Figma Design System
 * 
 * Renders body text (paragraphs) with exact Figma specifications from Marion's design system.
 * Supports two size variants: regular (18px) and small (16px), both with 400 weight.
 * 
 * @example
 * ```tsx
 * // Regular body text (18px) - default
 * <BodyText>
 *   Dies ist ein Absatz mit normalem Fließtext. Perfect für längere 
 *   Textabschnitte und Beschreibungen.
 * </BodyText>
 * 
 * // Small body text (16px)
 * <BodyText variant="small" color="grey">
 *   Kleingedrucktes, Metadaten oder Footer-Text.
 * </BodyText>
 * 
 * // As a div instead of p
 * <BodyText as="div">
 *   Body text rendered as div for layout flexibility.
 * </BodyText>
 * 
 * // With custom spacing
 * <BodyText className="mb-6">
 *   Paragraph with custom margin.
 * </BodyText>
 * ```
 * 
 * @see theme.ts for typography specifications
 * @see docs/FIGMA_TO_COMPONENTS.md for complete usage guide
 */

export type BodyTextVariant = 'regular' | 'small';
export type BodyTextColor = 'white' | 'dark' | 'grey';
export type BodyTextElement = 'p' | 'div' | 'span';

export interface BodyTextProps {
  /**
   * Size variant
   * - regular: 18px / 400 weight (Default body text) - DEFAULT
   * - small: 16px / 400 weight (Small text, captions, labels)
   * 
   * @default 'regular'
   */
  variant?: BodyTextVariant;
  
  /**
   * Text color variant
   * - white: #FFFFFF (default, for dark backgrounds)
   * - dark: #333333 (for light backgrounds)
   * - grey: #C2C2C2 (muted/secondary text)
   * 
   * @default 'white'
   */
  color?: BodyTextColor;
  
  /**
   * HTML element to render as
   * - p: Paragraph (default, semantic)
   * - div: Div (for flexibility)
   * - span: Inline span (for inline text)
   * 
   * @default 'p'
   */
  as?: BodyTextElement;
  
  /**
   * Text content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   * @example className="mb-4 max-w-2xl"
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
const colorMap: Record<BodyTextColor, string> = {
  white: colors.white,
  dark: colors.darkGrey,
  grey: colors.lightGrey,
};

/**
 * BodyText Component Implementation
 */
export function BodyText({
  variant = 'regular',
  color = 'white',
  as = 'p',
  children,
  className = '',
  style = {},
}: BodyTextProps) {
  // Select typography spec based on variant
  const typo = variant === 'small' ? typography.bodySmall : typography.body;
  
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
 * Helper to get BodyText styles as a CSS-in-JS object
 * Useful for applying body text styles to other elements
 * 
 * @example
 * ```tsx
 * <label style={getBodyTextStyles('small', 'dark')}>
 *   Form Label
 * </label>
 * ```
 */
export function getBodyTextStyles(
  variant: BodyTextVariant = 'regular',
  color: BodyTextColor = 'white'
): CSSProperties {
  const typo = variant === 'small' ? typography.bodySmall : typography.body;
  
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


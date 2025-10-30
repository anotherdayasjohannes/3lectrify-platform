import { type CSSProperties } from 'react';
import { typography, colors } from '../../theme';

/**
 * StatNumber Component - Figma Design System
 * 
 * Renders large numbers/statistics with Figma specification: 36px Regular (weight 400).
 * Typically used in Stats components to display metrics, percentages, or key numbers.
 * 
 * Supports custom accent colors for visual emphasis (green, orange, curry, etc.)
 * 
 * @example
 * ```tsx
 * // Stat with default green accent
 * <StatNumber value="100%" />
 * 
 * // Stat with custom orange accent
 * <StatNumber 
 *   value="42" 
 *   color={colors.orange}
 * />
 * 
 * // Stat with curry accent (warm yellow)
 * <StatNumber 
 *   value="24/7" 
 *   color={colors.curry}
 * />
 * 
 * // Dynamic from data
 * <StatNumber 
 *   value={stat.value} 
 *   color={accentColors[stat.accentColor]}
 * />
 * ```
 * 
 * @see theme.ts for typography specifications and color palette
 * @see docs/FIGMA_TO_COMPONENTS.md for complete usage guide
 */

export interface StatNumberProps {
  /**
   * The numeric value to display
   * Can be string or number - will be converted to string
   * 
   * @example "100%" | "42" | "24/7" | 1000
   */
  value: string | number;
  
  /**
   * Accent color for the number
   * Use colors from theme.ts for consistency
   * 
   * Available accent colors:
   * - colors.middleGreen (default) - #88C0B1
   * - colors.orange - #D04227
   * - colors.curry - #EAB257
   * - colors.blue - #3C5067
   * - Or any custom color value
   * 
   * @default colors.middleGreen
   */
  color?: string;
  
  /**
   * Additional CSS classes
   * @example className="mb-2"
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: CSSProperties;
}

/**
 * StatNumber Component Implementation
 */
export function StatNumber({
  value,
  color = colors.middleGreen,
  className = '',
  style = {},
}: StatNumberProps) {
  // Get Figma spec for numbers (36px / 400 weight)
  const typo = typography.numbers;
  
  // Construct inline styles from Figma design tokens
  const inlineStyles: CSSProperties = {
    fontSize: typo.fontSize,
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
    fontFamily: typo.fontFamily,
    color: color,
    margin: 0, // Reset default margins
    ...style, // Allow custom style overrides
  };
  
  return (
    <div 
      style={inlineStyles}
      className={className}
    >
      {value}
    </div>
  );
}

/**
 * Helper to get StatNumber styles as a CSS-in-JS object
 * 
 * @example
 * ```tsx
 * <span style={getStatNumberStyles(colors.orange)}>
 *   100%
 * </span>
 * ```
 */
export function getStatNumberStyles(
  color: string = colors.middleGreen
): CSSProperties {
  const typo = typography.numbers;
  
  return {
    fontSize: typo.fontSize,
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
    fontFamily: typo.fontFamily,
    color: color,
    margin: 0,
  };
}

/**
 * Preset color configurations for common stat types
 * Use these for consistent color application across stats
 */
export const statColorPresets = {
  primary: colors.middleGreen,   // #88C0B1 - Main brand color
  success: colors.green,          // #78B5A1 - Success/positive
  warning: colors.curry,          // #EAB257 - Warning/attention
  danger: colors.orange,          // #D04227 - Error/critical
  info: colors.darkBlue,          // #3C5067 - Information
  neutral: colors.lightGrey,      // #C2C2C2 - Neutral/muted
} as const;


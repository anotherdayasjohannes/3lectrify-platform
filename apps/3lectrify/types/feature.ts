/**
 * Feature module types for 3lectrify platform
 */

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  role?: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  category?: string;
}

export interface FeatureSection {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features: FeatureCard[];
  layout?: 'grid' | 'carousel' | 'stack';
}

export interface ScrollAnimationConfig {
  trigger: string;
  start: string;
  end: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface TooltipConfig {
  text: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  color?: string;
  visible: boolean;
}

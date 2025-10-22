/**
 * 3lectrify Custom Easing Curves
 * 
 * These custom curves define the brand's animation personality:
 * - Electric & Dynamic
 * - Professional & Polished
 * - Smooth & Responsive
 * 
 * Built with GSAP CustomEase (now FREE!)
 */

import { gsap } from 'gsap';

// Try to import CustomEase
let CustomEase: any = null;
try {
  // @ts-ignore
  const module = require('gsap/CustomEase');
  CustomEase = module.CustomEase;
  if (typeof window !== 'undefined' && CustomEase) {
    gsap.registerPlugin(CustomEase);
  }
} catch (e) {
  console.log('CustomEase not available, using standard easings');
}

/**
 * Initialize 3lectrify custom easing curves
 * Call this once during app initialization
 */
export function init3lectrifyEasings() {
  if (!CustomEase) {
    console.log('Using fallback easings (CustomEase not available)');
    return false;
  }

  try {
    // ⚡ ELECTRIC FAST OUT
    // Perfect for: Text reveals, content appearing
    // Personality: Energetic start, smooth landing (like electricity flowing)
    CustomEase.create('3lectrifyFastOut', '0.25, 0.1, 0.25, 1');

    // 🎯 SNAPPY
    // Perfect for: Button clicks, toggles, UI interactions
    // Personality: Immediate response, crisp finish (like flipping a switch)
    CustomEase.create('3lectrifySnappy', '0.4, 0.0, 0.2, 1');

    // 🌊 SMOOTH
    // Perfect for: Scrolling, large movements, transitions
    // Personality: Silky smooth, professional (like a well-tuned machine)
    CustomEase.create('3lectrifySmooth', '0.65, 0.0, 0.35, 1');

    // 💫 ELASTIC OUT
    // Perfect for: Playful moments, attention-grabbing
    // Personality: Bouncy, energetic (like a spring)
    CustomEase.create('3lectrifyElastic', '0.68, -0.55, 0.265, 1.55');

    // 🎬 CINEMATIC
    // Perfect for: Hero animations, showcase moments
    // Personality: Dramatic, polished (like a movie fade-in)
    CustomEase.create('3lectrifyCinematic', '0.16, 1, 0.3, 1');

    console.log('✨ 3lectrify custom easings initialized!');
    return true;
  } catch (error) {
    console.error('Failed to initialize custom easings:', error);
    return false;
  }
}

/**
 * 3lectrify Easing Presets
 * Use these consistent curves across your entire site
 */
export const EASINGS = {
  // Primary brand easings (use CustomEase if available)
  fastOut: CustomEase ? '3lectrifyFastOut' : 'power3.out',
  snappy: CustomEase ? '3lectrifySnappy' : 'power2.out',
  smooth: CustomEase ? '3lectrifySmooth' : 'power2.inOut',
  elastic: CustomEase ? '3lectrifyElastic' : 'back.out(1.7)',
  cinematic: CustomEase ? '3lectrifyCinematic' : 'power4.out',

  // Context-specific recommendations
  text: CustomEase ? '3lectrifyFastOut' : 'power3.out',        // Text reveals
  scroll: CustomEase ? '3lectrifySmooth' : 'power2.out',       // Scroll animations
  button: CustomEase ? '3lectrifySnappy' : 'power2.out',       // Interactive elements
  hero: CustomEase ? '3lectrifyCinematic' : 'power4.out',      // Hero sections
  card: CustomEase ? '3lectrifyFastOut' : 'power2.out',        // Card reveals
  image: CustomEase ? '3lectrifySmooth' : 'power2.out',        // Image transitions
  
  // Utility easings (standard GSAP)
  linear: 'none',
  easeIn: 'power2.in',
  easeOut: 'power2.out',
  easeInOut: 'power2.inOut',
} as const;

/**
 * Animation Duration Presets
 * Consistent timing across your site
 */
export const DURATIONS = {
  instant: 0.15,    // Quick UI feedback
  fast: 0.3,        // Button hovers, small movements
  normal: 0.5,      // Standard animations
  slow: 0.8,        // Text reveals, larger movements
  cinematic: 1.2,   // Hero moments, showcase
} as const;

/**
 * Stagger Presets
 * Consistent spacing for sequenced animations
 */
export const STAGGERS = {
  tight: 0.03,      // Character reveals
  normal: 0.05,     // Word reveals
  relaxed: 0.08,    // Hero headlines
  cards: 0.1,       // Card grids
  sections: 0.15,   // Major sections
} as const;

/**
 * Distance Presets (for slide animations)
 * Consistent movement distances
 */
export const DISTANCES = {
  micro: 5,         // Subtle shifts
  small: 10,        // Small text
  normal: 15,       // Body text
  large: 30,        // Headlines
  huge: 50,         // Hero elements
} as const;

/**
 * Helper: Get recommended animation config for common use cases
 */
export function getAnimationConfig(type: 'text' | 'hero' | 'scroll' | 'button' | 'card' | 'image') {
  const configs = {
    text: {
      ease: EASINGS.text,
      duration: DURATIONS.normal,
      stagger: STAGGERS.normal,
      yDistance: DISTANCES.normal,
    },
    hero: {
      ease: EASINGS.hero,
      duration: DURATIONS.cinematic,
      stagger: STAGGERS.relaxed,
      yDistance: DISTANCES.large,
    },
    scroll: {
      ease: EASINGS.scroll,
      duration: DURATIONS.slow,
      stagger: STAGGERS.normal,
      yDistance: DISTANCES.normal,
    },
    button: {
      ease: EASINGS.button,
      duration: DURATIONS.fast,
    },
    card: {
      ease: EASINGS.card,
      duration: DURATIONS.normal,
      stagger: STAGGERS.cards,
      yDistance: DISTANCES.normal,
    },
    image: {
      ease: EASINGS.image,
      duration: DURATIONS.slow,
    },
  };

  return configs[type];
}

/**
 * Check if CustomEase is available
 */
export function hasCustomEase(): boolean {
  return CustomEase !== null;
}


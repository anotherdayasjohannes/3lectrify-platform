// Shared animation hooks and utilities
export { useTextReveal } from './hooks/useTextReveal';
export type { TextRevealOptions } from './hooks/useTextReveal';
export { useScrollTextReveal } from './hooks/useScrollTextReveal';
export type { ScrollTextRevealOptions } from './hooks/useScrollTextReveal';

// Custom easing curves and presets
export {
  init3lectrifyEasings,
  EASINGS,
  DURATIONS,
  STAGGERS,
  DISTANCES,
  getAnimationConfig,
  hasCustomEase,
} from './easings/custom';

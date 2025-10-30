// ===== Design System =====
// Theme tokens (typography, colors, spacing)
export * from './theme';

// ===== Primitives (Atomic Components) =====
export { Heading, getHeadingStyles, isHeadingVariant } from './primitives/Heading';
export type { HeadingProps, HeadingVariant, HeadingColor } from './primitives/Heading';

export { BodyText, getBodyTextStyles } from './primitives/BodyText';
export type { BodyTextProps, BodyTextVariant, BodyTextColor, BodyTextElement } from './primitives/BodyText';

export { IntroText, getIntroTextStyles } from './primitives/IntroText';
export type { IntroTextProps, IntroTextColor, IntroTextElement } from './primitives/IntroText';

export { StatNumber, getStatNumberStyles, statColorPresets } from './primitives/StatNumber';
export type { StatNumberProps } from './primitives/StatNumber';

// ===== Shared UI Components =====
export { Button } from './Button';
export { Hero } from './Hero';
export { FeatureCards } from './FeatureCards';
export { FeatureShowcase } from './FeatureShowcase';
export { Header } from './Header';
export { Footer } from './Footer';
export { Stats } from './Stats';
export { TextImage } from './TextImage';
export { SimpleTextImage } from './SimpleTextImage';
export { CTA } from './CTA';
export { default as ReferencesGrid } from './ReferencesGrid';
export { default as ReferencesMarquee } from './ReferencesMarquee';
export { TeamGrid } from './TeamGrid';
export { HeroGradient } from './HeroGradient';
export { LegalContent } from './LegalContent';
export { ContactSimple } from './ContactSimple';
export { GradientSpacer } from './GradientSpacer';
export { StackedExplainer } from './StackedExplainer';
export { LottieAnimation } from './LottieAnimation';
export { LottieAnimationWrapper } from './LottieAnimationWrapper';
export { VideoAnimation } from './VideoAnimation';
export { H1Animator } from './H1Animator';



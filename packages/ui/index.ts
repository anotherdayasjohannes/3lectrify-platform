// ===== Design System =====
// Theme tokens (typography, colors, spacing)
export * from './theme';

// ===== Primitives (Atomic Components) =====
export { Heading, getHeadingStyles, isHeadingVariant } from './components/primitives/Heading';
export type { HeadingProps, HeadingVariant, HeadingColor } from './components/primitives/Heading';

export { BodyText, getBodyTextStyles } from './components/primitives/BodyText';
export type { BodyTextProps, BodyTextVariant, BodyTextColor, BodyTextElement } from './components/primitives/BodyText';

export { IntroText, getIntroTextStyles } from './components/primitives/IntroText';
export type { IntroTextProps, IntroTextColor, IntroTextElement } from './components/primitives/IntroText';

export { StatNumber, getStatNumberStyles, statColorPresets } from './components/primitives/StatNumber';
export type { StatNumberProps } from './components/primitives/StatNumber';

// ===== Shared UI Components =====
export { Button } from './components/Button';
export { Hero } from './components/Hero';
export { FeatureCards } from './components/FeatureCards';
export { FeatureShowcase } from './components/FeatureShowcase';
export { Header } from './components/Header';
export { Footer } from './components/Footer';
export { Stats } from './components/Stats';
export { TextImage } from './components/TextImage';
export { SimpleTextImage } from './components/SimpleTextImage';
export { CTA } from './components/CTA';
export { default as ReferencesGrid } from './components/ReferencesGrid';
export { default as ReferencesMarquee } from './components/ReferencesMarquee';
export { TeamGrid } from './components/TeamGrid';
export { HeroGradient } from './components/HeroGradient';
export { LegalContent } from './components/LegalContent';
export { ContactSimple } from './components/ContactSimple';
export { GradientSpacer } from './components/GradientSpacer';
export { StackedExplainer } from './components/StackedExplainer';

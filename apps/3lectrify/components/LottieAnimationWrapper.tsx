import { LottieAnimation } from './LottieAnimation';

interface LottieAnimationWrapperProps {
  headline?: string;
  description?: string;
  animationUrl: string;
  loop?: boolean;
  speed?: number;
  maxWidth?: string;
  variant?: 'light' | 'dark';
}

export async function LottieAnimationWrapper({
  headline,
  description,
  animationUrl,
  loop = true,
  speed = 1,
  maxWidth = '800px',
  variant = 'dark',
}: LottieAnimationWrapperProps) {
  // Server-side fetch of the Lottie JSON data
  try {
    const res = await fetch(animationUrl, {
      cache: 'force-cache', // Cache the animation data
    });

    if (!res.ok) {
      throw new Error(`Failed to load animation: ${res.status}`);
    }

    const animationData = await res.json();

    return (
      <LottieAnimation
        headline={headline}
        description={description}
        animationData={animationData}
        loop={loop}
        speed={speed}
        maxWidth={maxWidth}
        variant={variant}
      />
    );
  } catch (err) {
    console.error('Error loading Lottie animation:', err);
    return (
      <section className="py-[50px] text-center text-red-500">
        <p>Failed to load animation</p>
      </section>
    );
  }
}


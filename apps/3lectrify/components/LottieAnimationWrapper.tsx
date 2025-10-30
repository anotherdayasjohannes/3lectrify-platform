'use client';

import { useEffect, useState } from 'react';
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

export function LottieAnimationWrapper({
  headline,
  description,
  animationUrl,
  loop = true,
  speed = 1,
  maxWidth = '800px',
  variant = 'dark',
}: LottieAnimationWrapperProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(animationUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load animation');
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error('Error loading Lottie animation:', err);
        setError('Failed to load animation');
      });
  }, [animationUrl]);

  if (error) {
    return (
      <section className="py-[50px] text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  if (!animationData) {
    return (
      <section className="py-[50px] text-center">
        <p className="text-white">Loading animation...</p>
      </section>
    );
  }

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
}


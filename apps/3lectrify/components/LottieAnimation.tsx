'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { typography } from './theme';

interface LottieAnimationProps {
  headline?: string;
  description?: string;
  animationData: object; // Lottie JSON data
  loop?: boolean;
  speed?: number;
  maxWidth?: string; // e.g., "800px" or "100%"
  variant?: 'light' | 'dark';
}

export function LottieAnimation({
  headline,
  description,
  animationData,
  loop = true,
  speed = 1,
  maxWidth = '800px',
  variant = 'dark',
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const bgColor = variant === 'dark' ? 'bg-[#293645]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger when 80% of the animation is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !hasPlayed) {
            lottieRef.current?.play();
            setHasPlayed(true);
            
            // If loop is false, stop observing after first play
            if (!loop) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.8, // Trigger when 80% visible
        rootMargin: '0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasPlayed, loop]);

  return (
    <section
      className={`${bgColor} ${textColor} pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]`}
    >
      <div className="content-wrapper">
        <div className="flex flex-col items-center gap-[40px] w-full">
          {/* Headline */}
          {headline && (
            <h2 
              className={`${textColor} text-center w-full`}
              style={typography.h2}
            >
              {headline}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p 
              className={`${textColor} text-center max-w-[800px]`}
              style={typography.body}
            >
              {description}
            </p>
          )}

          {/* Lottie Animation */}
          <div 
            ref={containerRef}
            className="w-full flex justify-center"
            style={{ maxWidth }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={loop}
              autoplay={false} // We control play via Intersection Observer
              speed={speed}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


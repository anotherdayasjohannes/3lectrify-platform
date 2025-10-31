'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { typography } from './theme';

interface VideoAnimationProps {
  headline?: string;
  description?: string;
  videoUrl: string;
  posterUrl?: string;
  posterAlt?: string;
  loop?: boolean;
  muted?: boolean;
  maxWidth?: string;
  variant?: 'light' | 'dark';
}

export function VideoAnimation({
  headline,
  description,
  videoUrl,
  posterUrl,
  posterAlt = '',
  loop = true,
  muted = true,
  maxWidth = '800px',
  variant = 'dark',
}: VideoAnimationProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const bgColor = variant === 'dark' ? 'bg-[#293645]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Load and play when 80% of the video is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            if (!isLoaded) {
              setIsLoaded(true);
            }
            
            if (!hasPlayed && videoRef.current) {
              videoRef.current.play().catch((err) => {
                console.warn('Video autoplay failed:', err);
              });
              setHasPlayed(true);
              
              // If loop is false, stop observing after first play
              if (!loop) {
                observer.unobserve(entry.target);
              }
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
  }, [hasPlayed, loop, isLoaded]);

  return (
    <section
      className={`${bgColor} ${textColor} pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]`}
    >
      <div className="content-wrapper">
        {/* Mobile-first gap: gap-6 → md:gap-8 → lg:gap-[40px] */}
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-[40px] w-full">
          {/* Headline - Responsive */}
          {headline && (
            <h2 className={`${textColor} text-center w-full text-[24px] leading-[32px] tracking-[0.24px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-light`}>
              {headline}
            </h2>
          )}

          {/* Description - Responsive */}
          {description && (
            <p className={`${textColor} text-center max-w-[800px] text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] font-normal`}>
              {description}
            </p>
          )}

          {/* Video Container */}
          <div 
            ref={containerRef}
            className="w-full flex justify-center rounded-[20px] overflow-hidden"
            style={{ maxWidth }}
          >
            {/* Poster Image - Shows until video loads */}
            {posterUrl && !isLoaded && (
              <div className="relative w-full aspect-video">
                <Image
                  src={posterUrl}
                  alt={posterAlt}
                  fill
                  className="object-cover"
                  sizes={`(max-width: 768px) 100vw, ${maxWidth}`}
                  priority={false}
                />
              </div>
            )}

            {/* Video Element - Lazy loaded */}
            {isLoaded && (
              <video
                ref={videoRef}
                className="w-full h-auto"
                loop={loop}
                muted={muted}
                playsInline
                preload="metadata"
                poster={posterUrl}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



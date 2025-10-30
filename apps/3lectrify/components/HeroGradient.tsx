'use client';

import { typography } from './theme';

interface HeroGradientProps {
  headline: string;
  subheadline?: string;
  backgroundImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    hotspot?: {
      x: number;
      y: number;
    };
  };
  gradientDirection?: 'left' | 'right';
  sectionHeight?: 'small' | 'medium' | 'large';
}

export function HeroGradient({
  headline,
  subheadline,
  backgroundImage,
  gradientDirection = 'left',
  sectionHeight = 'medium',
}: HeroGradientProps) {
  const getFocalPoint = (hotspot?: { x: number; y: number }) => {
    if (!hotspot) return 'center';
    return `${(hotspot.x * 100).toFixed(0)}% ${(hotspot.y * 100).toFixed(0)}%`;
  };

  // Height variants
  const heightClasses = {
    small: 'h-[300px]',
    medium: 'h-[400px]',
    large: 'h-[500px]',
  };

  // Tablet heights
  const tabletHeights = {
    small: 'md:h-[250px]',
    medium: 'md:h-[350px]',
    large: 'md:h-[450px]',
  };

  // Gradient CSS - using Figma exact values
  const gradientStyle =
    gradientDirection === 'left'
      ? 'linear-gradient(90deg, #1C242E 38.94%, rgba(28, 36, 46, 0.496063) 82.21%, rgba(28, 36, 46, 0) 100%)'
      : 'linear-gradient(270deg, #1C242E 38.94%, rgba(28, 36, 46, 0.496063) 82.21%, rgba(28, 36, 46, 0) 100%)';

  return (
    <section
      className="relative w-full overflow-hidden bg-[#1C242E] pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]"
    >
      {/* Centered container using content-wrapper */}
      <div className="content-wrapper">
        {/* Fixed-width image container with rounded right corners */}
        <div className="relative w-full max-w-[1390px] h-[400px] mx-auto overflow-hidden rounded-br-[20px] rounded-tr-[20px]">
          {/* Background Image - positioned absolutely within container */}
          {backgroundImage?.url && (
            <div className="absolute left-[191px] top-[-361px] w-[1680px] h-[1121px]">
              <img
                src={backgroundImage.url}
                alt={backgroundImage.alt || ''}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ objectPosition: getFocalPoint(backgroundImage.hotspot) }}
                loading="eager"
              />
            </div>
          )}

          {/* Gradient Overlay - Figma exact dimensions: 842px */}
          <div
            className={`relative h-full flex items-end pr-0 py-[50px] z-[2] w-[842px] max-sm:w-full max-sm:p-[30px] gradient-overlay ${
              gradientDirection === 'left' ? 'gradient-left' : 'gradient-right'
            }`}
          >
            {/* Text Content */}
            <div className="flex flex-col gap-[25px] w-full">
              <h1 
                className="text-white m-0"
                style={typography.h1}
              >
                {headline}
              </h1>

              {subheadline && (
                <p 
                  className="text-white m-0"
                  style={typography.intro}
                >
                  {subheadline}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for gradient and mobile overlay */}
      <style jsx>{`
        /* Desktop gradient - only on screens 768px+ */
        @media (min-width: 768px) {
          .gradient-left {
            background: ${gradientStyle};
          }
          .gradient-right {
            background: ${gradientStyle};
          }
        }

        /* Mobile-only vertical gradient overlay */
        @media (max-width: 767px) {
          section::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              180deg,
              transparent 0%,
              rgba(28, 36, 46, 0.8) 40%,
              rgba(28, 36, 46, 1) 80%,
              rgba(28, 36, 46, 1) 100%
            );
            z-index: 1;
            pointer-events: none;
          }

          .gradient-overlay {
            background: none !important;
          }
        }
      `}</style>
    </section>
  );
}

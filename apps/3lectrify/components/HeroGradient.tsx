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
        {/* Responsive height container with rounded corners */}
        <div className="relative w-full max-w-[1390px] h-[300px] sm:h-[350px] md:h-[400px] mx-auto overflow-hidden rounded-[20px] md:rounded-br-[20px] md:rounded-tr-[20px] md:rounded-bl-none md:rounded-tl-none">
          {/* Background Image - responsive positioning */}
          {backgroundImage?.url && (
            <div className="absolute inset-0 w-full h-full md:left-[191px] md:top-[-361px] md:w-[1680px] md:h-[1121px]">
              <img
                src={backgroundImage.url}
                alt={backgroundImage.alt || ''}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  objectPosition: getFocalPoint(backgroundImage.hotspot) 
                }}
                loading="eager"
              />
            </div>
          )}

          {/* Gradient Overlay - Full width mobile, constrained desktop */}
          <div
            className={`relative h-full flex items-end px-0 py-6 sm:py-8 md:pr-0 md:py-[50px] z-[2] w-full md:w-[842px] gradient-overlay ${
              gradientDirection === 'left' ? 'gradient-left' : 'gradient-right'
            }`}
          >
            {/* Text Content - Responsive typography */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-[25px] w-full">
              <h1 
                className="text-white m-0 text-[28px] leading-[36px] tracking-[0.28px] md:text-[40px] md:leading-[50px] md:tracking-[0.4px] lg:text-[48px] lg:leading-[58px] lg:tracking-[0.48px] font-light"
              >
                {headline}
              </h1>

              {subheadline && (
                <p 
                  className="text-white m-0 text-[16px] leading-[24px] tracking-[0.16px] md:text-[20px] md:leading-[30px] md:tracking-[0.2px] lg:text-[24px] lg:leading-[34px] lg:tracking-[0.24px] font-light"
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
        /* Mobile: Bottom-to-top vertical gradient */
        @media (max-width: 767px) {
          .gradient-overlay {
            background: linear-gradient(
              180deg,
              rgba(28, 36, 46, 0) 0%,
              rgba(28, 36, 46, 0.7) 50%,
              rgba(28, 36, 46, 1) 100%
            ) !important;
          }
        }

        /* Desktop: Horizontal gradient */
        @media (min-width: 768px) {
          .gradient-left {
            background: ${gradientStyle};
          }
          .gradient-right {
            background: ${gradientStyle};
          }
        }
      `}</style>
    </section>
  );
}

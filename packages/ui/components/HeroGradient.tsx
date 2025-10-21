'use client';

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
  const heightClasses = {
    small: 'h-[300px] md:h-[250px]',
    medium: 'h-[400px] md:h-[350px]',
    large: 'h-[500px] md:h-[450px]',
  };

  const getFocalPoint = (hotspot?: { x: number; y: number }) => {
    if (!hotspot) return 'center';
    return `${(hotspot.x * 100).toFixed(0)}% ${(hotspot.y * 100).toFixed(0)}%`;
  };

  // Gradient background based on direction
  const gradientStyle =
    gradientDirection === 'left'
      ? {
          background:
            'linear-gradient(90deg, rgba(41, 54, 69, 1) 0%, rgba(41, 54, 69, 1) 39%, rgba(41, 54, 69, 0.5) 82%, transparent 100%)',
        }
      : {
          background:
            'linear-gradient(270deg, rgba(41, 54, 69, 1) 0%, rgba(41, 54, 69, 1) 39%, rgba(41, 54, 69, 0.5) 82%, transparent 100%)',
        };

  return (
    <section
      className={`relative overflow-hidden bg-[#293645] ${heightClasses[sectionHeight]} sm:h-auto sm:min-h-[300px] w-full`}
    >
      {/* Background Image */}
      {backgroundImage?.url && (
        <img
          src={backgroundImage.url}
          alt={backgroundImage.alt || ''}
          className={`absolute top-0 ${
            gradientDirection === 'left' ? 'right-0' : 'left-0'
          } w-[1114px] md:w-[70%] sm:w-full sm:relative sm:h-[300px] h-full object-cover z-[1] sm:right-auto sm:left-auto`}
          style={{ objectPosition: getFocalPoint(backgroundImage.hotspot) }}
          loading="eager"
        />
      )}

      {/* Gradient Overlay with Content */}
      <div
        className={`hero-gradient-overlay absolute top-0 ${
          gradientDirection === 'left' ? 'left-[50px]' : 'right-[50px]'
        } md:${
          gradientDirection === 'left' ? 'left-[40px]' : 'right-[40px]'
        } w-[851px] md:w-[60%] sm:w-full sm:relative sm:left-0 sm:right-0 h-full flex items-end py-[50px] px-0 md:py-10 md:px-0 sm:py-[30px] sm:px-5 z-[2]`}
        style={gradientStyle}
      >
        <div className="flex flex-col gap-4 max-w-[700px] sm:max-w-full w-full">
          {/* Headline */}
          <h1 className="text-[48px] leading-[58px] md:text-[40px] md:leading-[50px] sm:text-[32px] sm:leading-[40px] font-light tracking-[0.48px] text-white m-0">
            {headline}
          </h1>

          {/* Optional Subheadline */}
          {subheadline && (
            <p className="text-[24px] leading-[34px] md:text-[20px] md:leading-[30px] sm:text-[18px] sm:leading-[26px] font-light tracking-[0.24px] text-white m-0">
              {subheadline}
            </p>
          )}
        </div>
      </div>

      {/* Mobile Gradient Override via CSS */}
      <style>{`
        @media (max-width: 767px) {
          .hero-gradient-overlay {
            background: linear-gradient(
              180deg,
              transparent 0%,
              rgba(41, 54, 69, 0.8) 40%,
              rgba(41, 54, 69, 1) 80%,
              rgba(41, 54, 69, 1) 100%
            ) !important;
          }
        }
      `}</style>
    </section>
  );
}

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

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#293645] ${heightClasses[sectionHeight]} ${tabletHeights[sectionHeight]} sm:h-auto sm:min-h-[300px]`}
    >
      {/* Background Image - Absolute positioned, fixed width */}
      {backgroundImage?.url && (
        <img
          src={backgroundImage.url}
          alt={backgroundImage.alt || ''}
          className={`absolute top-0 ${
            gradientDirection === 'left' ? 'right-0' : 'left-0'
          } w-[1114px] h-full object-cover z-[1] md:w-[70%] sm:w-full sm:relative sm:h-[300px] sm:right-auto sm:left-auto`}
          style={{ objectPosition: getFocalPoint(backgroundImage.hotspot) }}
          loading="eager"
        />
      )}

      {/* Gradient Overlay - Absolute positioned with fixed left/right offset */}
      <div
        className={`absolute top-0 ${
          gradientDirection === 'left' ? 'left-[50px]' : 'right-[50px]'
        } ${
          gradientDirection === 'left' ? 'md:left-[40px]' : 'md:right-[40px]'
        } w-[851px] md:w-[60%] h-full flex items-end py-[50px] md:py-10 z-[2] max-sm:relative max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:py-[30px]`}
        style={{
          background:
            typeof window !== 'undefined' && window.innerWidth < 768
              ? 'none'
              : gradientDirection === 'left'
              ? 'linear-gradient(90deg, rgba(41, 54, 69, 1) 0%, rgba(41, 54, 69, 1) 39%, rgba(41, 54, 69, 0.5) 82%, transparent 100%)'
              : 'linear-gradient(270deg, rgba(41, 54, 69, 1) 0%, rgba(41, 54, 69, 1) 39%, rgba(41, 54, 69, 0.5) 82%, transparent 100%)',
        }}
      >
        {/* Text Content */}
        <div className="flex flex-col gap-4 max-w-[700px] w-full sm:max-w-full">
          <h1 className="text-[48px] leading-[58px] font-light tracking-[0.48px] text-white m-0 md:text-[40px] md:leading-[50px] sm:text-[32px] sm:leading-[40px]">
            {headline}
          </h1>

          {subheadline && (
            <p className="text-[24px] leading-[34px] font-light tracking-[0.24px] text-white m-0 md:text-[20px] md:leading-[30px] sm:text-[18px] sm:leading-[26px]">
              {subheadline}
            </p>
          )}
        </div>
      </div>

      {/* Mobile-only vertical gradient overlay */}
      <style jsx>{`
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
              rgba(41, 54, 69, 0.8) 40%,
              rgba(41, 54, 69, 1) 80%,
              rgba(41, 54, 69, 1) 100%
            );
            z-index: 1;
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  );
}

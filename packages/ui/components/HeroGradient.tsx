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

  // Height classes
  const heightClasses = {
    small: 'h-[300px]',
    medium: 'h-[400px]',
    large: 'h-[500px]',
  };

  // Gradient classes based on direction (Figma: 38.942% → 82.212%)
  const gradientClasses =
    gradientDirection === 'left'
      ? 'bg-gradient-to-r from-[#293645] from-[38.942%] via-[rgba(41,54,69,0.5)] via-[82.212%] to-transparent'
      : 'bg-gradient-to-l from-[#293645] from-[38.942%] via-[rgba(41,54,69,0.5)] via-[82.212%] to-transparent';

  // Image positioning based on direction
  const imagePositionClasses =
    gradientDirection === 'left' ? 'right-0' : 'left-0';

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#293645] ${heightClasses[sectionHeight]} md:h-[350px] sm:h-auto sm:min-h-[300px]`}
    >
      {/* Background Image */}
      {backgroundImage?.url && (
        <img
          src={backgroundImage.url}
          alt={backgroundImage.alt || ''}
          className={`absolute top-0 ${imagePositionClasses} w-[1114px] h-full object-cover z-[1] md:w-[70%] sm:w-full sm:relative sm:h-[300px] sm:right-auto sm:left-auto`}
          style={{ objectPosition: getFocalPoint(backgroundImage.hotspot) }}
          loading="eager"
        />
      )}

      {/* Content Wrapper - Global Container */}
      <div className="content-wrapper relative h-full z-[2]">
        {/* Gradient Overlay */}
        <div
          className={`
            ${gradientClasses}
            flex items-end
            h-full
            w-[851px]
            py-[50px]
            md:w-[60%] md:py-10
            sm:w-full sm:py-[30px] sm:bg-none
          `}
        >
          {/* Text Content */}
          <div className="flex flex-col gap-4 max-w-[700px] w-full sm:max-w-full">
            {/* Headline */}
            <h1 className="text-[48px] leading-[58px] font-light tracking-[0.48px] text-white m-0 md:text-[40px] md:leading-[50px] sm:text-[32px] sm:leading-[40px]">
              {headline}
            </h1>

            {/* Optional Subheadline */}
            {subheadline && (
              <p className="text-[24px] leading-[34px] font-light tracking-[0.24px] text-white m-0 md:text-[20px] md:leading-[30px] sm:text-[18px] sm:leading-[26px]">
                {subheadline}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only gradient overlay */}
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
          
          .content-wrapper {
            z-index: 2;
          }
        }
      `}</style>
    </section>
  );
}

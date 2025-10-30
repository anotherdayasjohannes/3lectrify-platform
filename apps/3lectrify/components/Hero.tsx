'use client';

import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { spacing, colors } from './theme';

interface HeroImageData {
  url: string;
  alt: string;
  width: number;
  height: number;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  perspective?: string;
}

interface HeroProps {
  headline?: string;
  subtext?: PortableTextBlock[]; // Portable Text from Sanity
  showImage?: boolean;
  heroImage?: HeroImageData;
  imagePosition?: 'above' | 'side';
  enableParallax?: boolean;
  parallaxImages?: HeroImageData[];
  parallaxEffect?: 'mouse' | 'autoRotate' | 'layered';
}

export function Hero({
  headline,
  subtext,
  showImage = false,
  heroImage,
  imagePosition = 'above',
  enableParallax = false,
  parallaxImages,
  parallaxEffect = 'mouse',
}: HeroProps) {
  const isSideLayout = showImage && heroImage && imagePosition === 'side';

  // Use parallax images if enabled, otherwise fallback to single heroImage
  // Note: Parallax effects removed - just displays center image from parallax set
  const displayImage = enableParallax && parallaxImages && parallaxImages.length === 3
    ? parallaxImages[1] // Center image
    : heroImage;

  // Render image (simplified - no animations)
  const renderImage = () => {
    if (!showImage || !displayImage) return null;

    return (
      <div className="w-full mb-[25px] rounded-[20px] overflow-hidden">
        <Image
          src={displayImage.url}
          alt={displayImage.alt || ''}
          width={displayImage.width}
          height={displayImage.height}
          priority
          className="w-full h-[700px] min-h-[500px] object-cover md:h-[600px] sm:h-[500px]"
          style={{ objectPosition: getFocalPoint(displayImage.hotspot) }}
          sizes="(max-width: 767px) 100vw, (max-width: 1440px) 90vw, 1440px"
        />
      </div>
    );
  };

  return (
    <section 
      className="text-white pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]"
      style={{
        backgroundColor: colors.deepBlue,
      }}
    >
      <div className="content-wrapper">
        {/* Image Above Layout */}
        {showImage && imagePosition === 'above' && renderImage()}

        {/* Container for side-by-side or text-only */}
        <div className={`
          flex flex-col
          ${isSideLayout ? 'lg:flex-row lg:gap-[50px] lg:items-center' : ''}
          gap-[25px]
        `}>
          {/* Image Side Layout */}
          {showImage && imagePosition === 'side' && (
            <div className="rounded-[20px] overflow-hidden max-h-[600px] lg:mb-0 lg:w-[645px] lg:h-[430px]">
              {renderImage()}
            </div>
          )}

          {/* Text Content */}
          <div className="max-w-[900px] w-full flex flex-col gap-[32px]">
            {headline && (
              <h1 className="text-[40px] leading-[50px] tracking-[0.48px] font-light text-white m-0 lg:text-[48px] lg:leading-[58px]"
              >
                {headline}
              </h1>
            )}
            {subtext && (
              <div className="text-body-hero font-normal tracking-[0.24px] text-white"
              >
                <PortableText 
                  value={subtext}
                  components={{
                    block: {
                      normal: ({children}) => (
                        <p className="text-body-hero font-normal tracking-[0.24px] text-white mb-[34px] last:mb-0">
                          {children}
                        </p>
                      )
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

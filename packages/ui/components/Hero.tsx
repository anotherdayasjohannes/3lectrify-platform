'use client';

import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { useTextReveal } from '@3lectrify/animations';

interface HeroProps {
  headline?: string;
  subtext?: PortableTextBlock[]; // Portable Text from Sanity
  showImage?: boolean;
  heroImage?: {
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
  };
  imagePosition?: 'above' | 'side';
}

export function Hero({
  headline,
  subtext,
  showImage = false,
  heroImage,
  imagePosition = 'above',
}: HeroProps) {
  const isSideLayout = showImage && heroImage && imagePosition === 'side';

  // ✨ GSAP SplitText animations
  const headlineRef = useTextReveal({ 
    split: 'words', 
    stagger: 0.08, 
    duration: 0.6,
    yDistance: 30,
    delay: 0.3
  });
  
  const subtextRef = useTextReveal({ 
    split: 'words', 
    stagger: 0.05, 
    duration: 0.5,
    yDistance: 20,
    delay: 0.8  // Start after headline
  });

  return (
    <section className="bg-[#293645] text-white pt-10 pb-[60px] lg:pt-[50px] lg:pb-20">
      <div className="content-wrapper">
        {/* Image Above Layout */}
        {showImage && heroImage && imagePosition === 'above' && (
          <div className="w-full mb-[25px] rounded-[20px] overflow-hidden">
            <Image
              src={heroImage.url}
              alt={heroImage.alt || ''}
              width={heroImage.width}
              height={heroImage.height}
              priority
              className="w-full h-auto max-h-[500px] object-cover md:max-h-[400px] sm:max-h-[300px]"
              style={{ objectPosition: getFocalPoint(heroImage.hotspot) }}
              sizes="(max-width: 767px) 100vw, (max-width: 1440px) 90vw, 1440px"
            />
          </div>
        )}

        {/* Container for side-by-side or text-only */}
               <div className={`
                flex flex-col
                ${isSideLayout ? 'lg:flex-row lg:gap-[50px] lg:items-center' : ''}
                gap-[25px]
              `}>
          {/* Image Side Layout */}
          {showImage && heroImage && imagePosition === 'side' && (
                   <div className="rounded-[20px] overflow-hidden max-h-[600px] lg:mb-0 lg:w-[645px] lg:h-[430px]">
              <Image
                src={heroImage.url}
                alt={heroImage.alt || ''}
                width={heroImage.width}
                height={heroImage.height}
                priority
                className="w-full h-auto max-h-[600px] object-cover sm:max-h-[300px]"
                style={{ objectPosition: getFocalPoint(heroImage.hotspot) }}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 45vw, 600px"
              />
            </div>
          )}

          {/* Text Content */}
          <div className="max-w-[900px] w-full flex flex-col gap-[25px]">
            {headline && (
              <h1 
                ref={headlineRef as any}
                className="text-[40px] leading-[50px] tracking-[0.48px] font-light text-white m-0 lg:text-[48px] lg:leading-[58px]"
              >
                {headline}
              </h1>
            )}
          {subtext && (
            <div 
              ref={subtextRef as any}
              className="text-body-hero font-light tracking-[0.24px] text-white"
            >
              <PortableText 
                value={subtext}
                components={{
                  block: {
                    normal: ({children}) => (
                      <p className="text-body-hero font-light tracking-[0.24px] text-white mb-[1em] last:mb-0">
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

'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { useTextReveal } from '@3lectrify/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(1); // Start with center (index 1)

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

  // Use parallax images if enabled, otherwise fallback to single heroImage
  const useParallax = enableParallax && parallaxImages && parallaxImages.length === 3;
  const displayImages = useParallax ? parallaxImages : (heroImage ? [heroImage] : []);

  // 🎨 Effect 1: Mouse Tracking Parallax
  useEffect(() => {
    if (!useParallax || parallaxEffect !== 'mouse' || !parallaxContainerRef.current) return;

    const container = parallaxContainerRef.current;
    const images = container.querySelectorAll('[data-parallax-image]');

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const normalizedX = x / rect.width; // 0 to 1

      // Map mouse position to image index (0 = left, 0.5 = center, 1 = right)
      let targetIndex = 1; // Default center
      if (normalizedX < 0.33) {
        targetIndex = 0; // Left
      } else if (normalizedX > 0.66) {
        targetIndex = 2; // Right
      }

      // Smoothly crossfade to target image
      images.forEach((img, index) => {
        gsap.to(img, {
          opacity: index === targetIndex ? 1 : 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      setActiveImageIndex(targetIndex);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [useParallax, parallaxEffect]);

  // 🎬 Effect 2: Auto-Rotate Parallax
  useEffect(() => {
    if (!useParallax || parallaxEffect !== 'autoRotate' || !parallaxContainerRef.current) return;

    const container = parallaxContainerRef.current;
    const images = container.querySelectorAll('[data-parallax-image]');
    let currentIndex = 1; // Start with center

    const rotateImages = () => {
      const nextIndex = (currentIndex + 1) % 3;

      images.forEach((img, index) => {
        gsap.to(img, {
          opacity: index === nextIndex ? 1 : 0,
          duration: 1.5,
          ease: 'power2.inOut',
        });
      });

      currentIndex = nextIndex;
      setActiveImageIndex(currentIndex);
    };

    // Start rotation after 3 seconds, then repeat every 4 seconds
    const timer = setInterval(rotateImages, 4000);
    return () => clearInterval(timer);
  }, [useParallax, parallaxEffect]);

  // 🌊 Effect 3: Layered Depth Parallax (Scroll-based)
  useEffect(() => {
    if (!useParallax || parallaxEffect !== 'layered' || !parallaxContainerRef.current) return;

    const container = parallaxContainerRef.current;
    const images = container.querySelectorAll('[data-parallax-image]');

    // All images visible with different scroll speeds
    gsap.set(images, { opacity: 1 });

    images.forEach((img, index) => {
      const speed = [0.3, 0.5, 0.7][index]; // Different speeds for each layer
      gsap.to(img, {
        y: () => window.scrollY * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [useParallax, parallaxEffect]);

  // Render parallax or single image
  const renderImage = () => {
    if (!showImage || displayImages.length === 0) return null;

    if (useParallax) {
      return (
        <div 
          ref={parallaxContainerRef}
          className="relative w-full mb-[25px] rounded-[20px] overflow-hidden"
          style={{ minHeight: imagePosition === 'above' ? '500px' : '430px' }}
        >
          {displayImages.map((img, index) => (
            <div
              key={index}
              data-parallax-image
              className="absolute inset-0 transition-opacity duration-600"
              style={{
                opacity: parallaxEffect === 'layered' ? 1 : (index === activeImageIndex ? 1 : 0),
                zIndex: parallaxEffect === 'layered' ? index + 1 : (index === activeImageIndex ? 2 : 1),
              }}
            >
              <Image
                src={img.url}
                alt={img.alt || `${img.perspective} perspective` || ''}
                width={img.width}
                height={img.height}
                priority={index === 1} // Preload center image
                className="w-full h-full object-cover"
                style={{ objectPosition: getFocalPoint(img.hotspot) }}
                sizes="(max-width: 767px) 100vw, (max-width: 1440px) 90vw, 1440px"
              />
            </div>
          ))}
          
          {/* Perspective indicator (optional, for debugging) */}
          {parallaxEffect === 'mouse' && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {displayImages[activeImageIndex]?.perspective || 'Center'}
            </div>
          )}
        </div>
      );
    }

    // Single image (no parallax)
    return (
      <div className="w-full mb-[25px] rounded-[20px] overflow-hidden">
        <Image
          src={displayImages[0].url}
          alt={displayImages[0].alt || ''}
          width={displayImages[0].width}
          height={displayImages[0].height}
          priority
          className="w-full h-auto max-h-[500px] object-cover md:max-h-[400px] sm:max-h-[300px]"
          style={{ objectPosition: getFocalPoint(displayImages[0].hotspot) }}
          sizes="(max-width: 767px) 100vw, (max-width: 1440px) 90vw, 1440px"
        />
      </div>
    );
  };

  return (
    <section className="bg-[#293645] text-white pt-10 pb-[60px] lg:pt-[50px] lg:pb-20">
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
                className="text-body-hero font-normal tracking-[0.24px] text-white"
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

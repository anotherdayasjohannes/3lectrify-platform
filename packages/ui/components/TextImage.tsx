'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { Stats } from './Stats';
import { useScrollTextReveal } from '@3lectrify/animations';

gsap.registerPlugin(ScrollTrigger);

interface TextImageProps {
  headline?: string;
  body?: PortableTextBlock[];
  quote?: {
    text: string;
    author?: string;
    icon?: {
      url: string;
      alt: string;
    };
  };
  stats?: Array<{
    _key: string;
    value: string;
    description: string;
    accentColor?: 'green' | 'orange' | 'blue' | 'curry';
  }>;
  image?: {
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
  imagePosition?: 'left' | 'right';
  variant?: 'light' | 'dark';
  fullWidth?: boolean;
}

export function TextImage({
  headline,
  body,
  quote,
  stats,
  image,
  imagePosition = 'left',
  variant = 'dark',
  fullWidth = false,
}: TextImageProps) {
  const containerRef = useRef<HTMLElement>(null);

  // ✨ Scroll-triggered text reveal for headline
  const headlineRef = useScrollTextReveal({
    stagger: 0.05,
    duration: 0.4,
    yDistance: 15,
    triggerStart: 'top 85%',
  });

  useGSAP(
    () => {
      const imageEl = containerRef.current?.querySelector('[data-image]');
      const textEl = containerRef.current?.querySelector('[data-text]');

      if (!imageEl && !textEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      if (imageEl) {
        tl.from(imageEl, {
          opacity: 0,
          x: imagePosition === 'left' ? -50 : 50,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      if (textEl) {
        tl.from(
          textEl,
          {
            opacity: 0,
            x: imagePosition === 'left' ? 50 : -50,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      }
    },
    { scope: containerRef }
  );

  const bgColor = variant === 'dark' ? 'bg-[#293645]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';
  const quoteTextColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';

  const contentWrapper = fullWidth ? 'w-full' : 'content-wrapper';

  return (
    <section
      ref={containerRef}
      className={`${bgColor} ${textColor} pt-10 pb-[60px] lg:pt-[50px] lg:pb-20`}
    >
      <div className={contentWrapper}>
        <div
          className="grid grid-cols-1 gap-[30px] sm:gap-[40px] md:grid-cols-text-image md:gap-[50px] items-start"
        >
          {/* Image */}
          {image && (
            <figure
              data-image
              className={`w-full h-[430px] rounded-[20px] overflow-hidden md:h-auto md:aspect-[1.5] ${
                imagePosition === 'right' ? 'order-2' : 'order-1'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                style={{ objectPosition: getFocalPoint(image.hotspot) }}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 645px"
              />
            </figure>
          )}

          {/* Text Content */}
          <article
            data-text
            className={`flex flex-col items-start justify-center gap-[40px] w-full ${
              imagePosition === 'right' ? 'order-1' : 'order-2'
            }`}
          >
            {headline && (
              <h2 
                ref={headlineRef as any}
                className="text-[32px] leading-[40px] tracking-[0.36px] font-light w-full lg:text-[36px] lg:leading-[46px]"
              >
                {headline}
              </h2>
            )}

            {/* Quote Block */}
            {quote && (
              <blockquote className="flex flex-col items-start gap-[15px] w-full">
                {quote.icon?.url && (
                  <Image
                    src={quote.icon.url}
                    alt={quote.icon.alt || 'Quote'}
                    width={40}
                    height={35}
                    className="w-10 h-[35px]"
                    aria-hidden="true"
                  />
                )}

                <p
                     className={`font-light italic text-[24px] tracking-[0.28px] leading-normal ${quoteTextColor} max-w-[645px] lg:text-[28px]`}
                >
                  {quote.text}
                  {quote.author && (
                    <>
                      <br />
                      <br />
                      <span className="text-[16px] tracking-[0.16px] not-italic font-normal">
                        {quote.author}
                      </span>
                    </>
                  )}
                </p>
              </blockquote>
            )}

            {/* Body Text */}
            {body && (
              <div className="text-[18px] leading-[26px] tracking-[0.18px] font-normal w-full prose prose-invert prose-p:my-0 prose-p:mb-[1em] prose-p:last:mb-0 prose-ul:my-0 prose-ul:list-none prose-ul:pl-0 prose-ul:flex prose-ul:flex-col prose-ul:gap-[15px] prose-li:flex prose-li:gap-[12px] prose-li:items-start prose-li:leading-[22px] prose-li:before:content-[''] prose-li:before:flex-shrink-0 prose-li:before:w-[22px] prose-li:before:h-[22px] prose-li:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNOSAxNi4xN0w0LjgzIDEybC0xLjQyIDEuNDFMOSAxOSAyMSA3bC0xLjQxLTEuNDF6IiBmaWxsPSIjODhDMEIxIi8+Cjwvc3ZnPgo=')] prose-li:before:bg-no-repeat prose-li:before:bg-center prose-li:before:bg-contain md:text-[16px] sm:text-[16px]">
                <PortableText value={body} />
              </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <Stats stats={stats} layout="horizontal" variant={variant} embedded />
            )}
          </article>
        </div>
      </div>
    </section>
  );
}


'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';

gsap.registerPlugin(ScrollTrigger);

interface SimpleTextImageProps {
  headline?: string;
  body?: PortableTextBlock[];
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
  variant?: 'light' | 'dark';
}

export function SimpleTextImage({
  headline,
  body,
  image,
  variant = 'dark',
}: SimpleTextImageProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const contentEl = containerRef.current?.querySelector('[data-content]');
      const imageEl = containerRef.current?.querySelector('[data-image]');

      if (!contentEl && !imageEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      if (contentEl) {
        tl.from(contentEl, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      if (imageEl) {
        tl.from(
          imageEl,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }
    },
    { scope: containerRef }
  );

  const bgColor = variant === 'dark' ? 'bg-[#293645]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';

  return (
    <section
      ref={containerRef}
      className={`${bgColor} ${textColor} py-[50px] lg:py-20`}
    >
      <div className="content-wrapper">
        <div className="max-w-[645px] flex flex-col items-start gap-[50px] md:gap-10 sm:gap-[30px]">
          
          {/* Text Content */}
          {(headline || body) && (
            <article
              data-content
              className="flex flex-col items-start gap-[32px] sm:gap-[32px] w-full"
            >
              {headline && (
                <h2 className="text-h2 font-light m-0 text-left w-full">
                  {headline}
                </h2>
              )}

              {body && (
                <div className="text-[18px] leading-[26px] tracking-[0.18px] font-normal text-left w-full prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0 md:text-[16px] md:leading-[24px] sm:text-[16px] sm:leading-[24px]">
                  <PortableText value={body} />
                </div>
              )}
            </article>
          )}

          {/* Image */}
          {image && (
            <figure
              data-image
              className="w-full aspect-[215/143] rounded-[20px] overflow-hidden bg-[#D9D9D9]"
            >
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                style={{ objectPosition: getFocalPoint(image.hotspot) }}
                sizes="(max-width: 767px) 100vw, 645px"
              />
            </figure>
          )}

        </div>
      </div>
    </section>
  );
}


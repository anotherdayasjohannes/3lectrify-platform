'use client';

import React from 'react';
import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { typography, colors, spacing, iconSizes, cardStyles, animations } from './theme';

interface ExplainerCard {
  _key: string;
  number: string;
  title: string;
  heading: string;
  description?: PortableTextBlock[];
  icon?: {
    url: string;
    alt?: string;
  };
}

interface StackedExplainerProps {
  sectionHeadline?: string;
  sectionIntro?: PortableTextBlock[];
  cards: ExplainerCard[];
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
}

export function StackedExplainer({ 
  sectionHeadline, 
  sectionIntro, 
  cards,
  ctaText,
  ctaButtonLabel,
  ctaButtonLink,
}: StackedExplainerProps) {

  return (
    <section 
      className="relative w-full pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]"
      style={{ backgroundColor: colors.deepBlue }}
    >
      {/* Section Header - Mobile-first typography */}
      {(sectionHeadline || sectionIntro) && (
        <div className="content-wrapper mb-8 md:mb-10 lg:mb-[50px]">
          {sectionHeadline && (
            <h2 
              className="text-[24px] leading-[32px] tracking-[0.24px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-light mb-6 md:mb-[32px] text-white"
            >
              {sectionHeadline}
            </h2>
          )}
          {sectionIntro && (
            <div 
              className="max-w-[900px] text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] font-normal prose prose-invert prose-p:my-0 prose-p:mb-5 md:prose-p:mb-[26px] prose-p:last:mb-0 text-white"
            >
              <PortableText value={sectionIntro} />
            </div>
          )}
        </div>
      )}

      {/* Cards Grid - Mobile-first: 1 col → sm: 2 cols → lg: 3 cols */}
      <div className="content-wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-[30px]">
          {cards.map((card) => (
            <article
              key={card._key}
              className="relative overflow-hidden transition-all p-6 sm:p-[30px] md:p-[35px_30px]"
              style={{
                backgroundColor: colors.darkBlue,
                borderRadius: cardStyles.borderRadius.large,
                boxShadow: cardStyles.shadow.default,
                transitionDuration: animations.duration.default,
                transitionTimingFunction: animations.easing.default,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateY(${animations.cardHover.translateY})`;
                e.currentTarget.style.boxShadow = cardStyles.shadow.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = cardStyles.shadow.default;
              }}
            >
              {/* Top Row: Number (left) and Icon (right) - Mobile-first sizing */}
              <div className="flex items-center justify-between mb-2 md:mb-[10px]">
                {/* Number - Responsive sizing */}
                {card.number && (
                  <p 
                    className="shrink-0 text-[28px] leading-[38px] tracking-[0.28px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-normal"
                    style={{ color: colors.middleGreen }}
                  >
                    {card.number}
                  </p>
                )}

                {/* Icon - Mobile-first sizing */}
                {card.icon && (
                  <div 
                    className="shrink-0 transition-transform w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px]"
                    style={{
                      transitionDuration: animations.duration.default,
                      transitionTimingFunction: animations.easing.default,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(${animations.iconHover.scale})`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Image
                      src={card.icon.url}
                      alt={card.icon.alt || ''}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Card Content - Mobile-first spacing */}
              <div className="flex flex-col gap-2 md:gap-[10px]">
                {/* Main Heading - Responsive typography */}
                {card.heading && (
                  <h3 
                    className="text-[18px] leading-[26px] tracking-[0.18px] md:text-[20px] md:leading-[34px] md:tracking-[0.2px] font-normal text-white"
                  >
                    {card.heading}
                  </h3>
                )}

                {/* Description - Mobile-first typography */}
                {card.description && (
                  <div 
                    className="text-[14px] leading-[22px] tracking-[0.14px] md:text-[16px] md:leading-[26px] md:tracking-[0.16px] font-normal prose prose-invert prose-p:my-0 prose-p:mb-4 md:prose-p:mb-[26px] prose-p:last:mb-0 text-white"
                  >
                    <PortableText value={card.description} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Optional CTA Section - Mobile-first */}
      {(ctaText || ctaButtonLabel) && (
        <div className="content-wrapper mt-8 md:mt-10 lg:mt-[50px]">
          <div className="flex flex-col items-start gap-5 md:gap-6 lg:gap-[25px]">
            {/* CTA Text - Responsive typography */}
            {ctaText && (
              <div>
                <p 
                  className="text-[18px] leading-[26px] tracking-[0.18px] md:text-[20px] md:leading-[34px] md:tracking-[0.2px] font-normal text-white"
                >
                  {ctaText}
                </p>
              </div>
            )}

            {/* CTA Button - 44px touch target */}
            {ctaButtonLabel && (
              <a
                href={ctaButtonLink || '#'}
                className="inline-flex items-center justify-center gap-[10px] px-5 py-[10px] min-h-[44px] md:min-h-[40px] rounded-[5px] transition-all touch-manipulation text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] font-normal"
                style={{
                  backgroundColor: colors.lightGreen,
                  color: colors.darkGrey,
                  textDecoration: 'none',
                  transitionDuration: animations.duration.default,
                  transitionTimingFunction: animations.easing.default,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>{ctaButtonLabel}</span>
                {/* Arrow Icon SVG */}
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform"
                  style={{
                    transitionDuration: animations.duration.default,
                  }}
                >
                  <path 
                    d="M7.5 5L12.5 10L7.5 15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

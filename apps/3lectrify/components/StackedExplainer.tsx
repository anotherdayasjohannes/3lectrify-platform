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
      className="relative w-full py-[50px] md:py-[60px] lg:py-[80px]"
      style={{ backgroundColor: colors.deepBlue }}
    >
      {/* Section Header */}
      {(sectionHeadline || sectionIntro) && (
        <div className="content-wrapper mb-[40px] md:mb-[50px]">
          {sectionHeadline && (
            <h2 
              className="mb-[25px] md:mb-[32px]"
              style={{
                ...typography.h2,
                color: colors.white,
              }}
            >
              {sectionHeadline}
            </h2>
          )}
          {sectionIntro && (
            <div 
              className="max-w-[900px] prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0"
              style={{
                ...typography.body,
                color: colors.white,
              }}
            >
              <PortableText value={sectionIntro} />
            </div>
          )}
        </div>
      )}

      {/* Cards Grid - Horizontal 3-column layout */}
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[25px] lg:gap-[30px]">
          {cards.map((card) => (
            <article
              key={card._key}
              className="relative overflow-hidden transition-all"
              style={{
                backgroundColor: colors.darkBlue,
                borderRadius: cardStyles.borderRadius.large,
                boxShadow: cardStyles.shadow.default,
                padding: '35px 30px',
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
              {/* Top Row: Number (left) and Icon (right) */}
              <div className="flex items-center justify-between mb-[10px]">
                {/* Number */}
                {card.number && (
                  <p 
                    className="shrink-0"
                    style={{
                      ...typography.numbers,
                      color: colors.middleGreen,
                    }}
                  >
                    {card.number}
                  </p>
                )}

                {/* Icon */}
                {card.icon && (
                  <div 
                    className="shrink-0 transition-transform"
                    style={{
                      width: iconSizes.large.width,
                      height: iconSizes.large.height,
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

              {/* Card Content */}
              <div className="flex flex-col gap-[10px]">
                {/* Main Heading */}
                {card.heading && (
                  <h3 
                    style={{
                      ...typography.h3,
                      color: colors.white,
                    }}
                  >
                    {card.heading}
                  </h3>
                )}

                {/* Description */}
                {card.description && (
                  <div 
                    className="prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0"
                    style={{
                      ...typography.bodySmall,
                      color: colors.white,
                    }}
                  >
                    <PortableText value={card.description} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Optional CTA Section */}
      {(ctaText || ctaButtonLabel) && (
        <div className="content-wrapper mt-[40px] md:mt-[50px]">
          <div className="flex flex-col items-start gap-[25px]">
            {/* CTA Text */}
            {ctaText && (
              <div>
                <p 
                  style={{
                    ...typography.h3,
                    color: colors.white,
                  }}
                >
                  {ctaText}
                </p>
              </div>
            )}

            {/* CTA Button */}
            {ctaButtonLabel && (
              <a
                href={ctaButtonLink || '#'}
                className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[10px] rounded-[5px] transition-all"
                style={{
                  backgroundColor: colors.lightGreen,
                  color: colors.darkGrey,
                  ...typography.body,
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

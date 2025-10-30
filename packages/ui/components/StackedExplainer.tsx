'use client';

import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';

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
  backgroundImage?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

interface StackedExplainerProps {
  sectionHeadline?: string;
  sectionIntro?: PortableTextBlock[];
  cards: ExplainerCard[];
}

export function StackedExplainer({ 
  sectionHeadline, 
  sectionIntro, 
  cards 
}: StackedExplainerProps) {

  return (
    <section className="relative w-full bg-[#293645] py-[80px] md:py-[60px]"
    >
      {/* Section Header */}
      {(sectionHeadline || sectionIntro) && (
        <div className="content-wrapper mb-[60px] md:mb-[40px]">
          {sectionHeadline && (
            <h2 className="text-[40px] leading-[50px] tracking-[0.4px] font-light text-white mb-[32px] md:text-[36px] md:leading-[46px]"
            >
              {sectionHeadline}
            </h2>
          )}
          {sectionIntro && (
            <div className="text-[18px] leading-[26px] tracking-[0.18px] font-normal text-white max-w-[900px] prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0">
              <PortableText value={sectionIntro} />
            </div>
          )}
        </div>
      )}

      {/* Cards Container */}
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[25px]">
          {cards.map((card) => (
            <div
              key={card._key}
              className="flex items-center justify-center p-[2rem] md:p-[1.5rem] sm:p-[1rem]"
            >
            {/* Card Content */}
            <div className="relative w-full max-w-[800px] h-[450px] md:h-[400px] sm:h-[350px] rounded-[24px] overflow-hidden bg-[#1C242E] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              {/* Background Image (if provided) */}
              {card.backgroundImage && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.backgroundImage.url}
                    alt={card.backgroundImage.alt || ''}
                    fill
                    className="object-cover opacity-40"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.7)]" />
                </div>
              )}

              {/* Text Content */}
              <div className="relative z-10 p-[2.5rem] md:p-[2rem] sm:p-[1.5rem] h-full flex flex-col justify-center">
                {/* Icon */}
                {card.icon && (
                  <div className="mb-[1.5rem] w-[48px] h-[48px] md:w-[40px] md:h-[40px]">
                    <Image
                      src={card.icon.url}
                      alt={card.icon.alt || ''}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Number Badge */}
                {card.number && (
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-14 md:h-14 rounded-full mb-3 border-[3px] bg-[#88C0B1] border-[#88C0B1] text-[#1C242E]">
                    <span className="font-black text-3xl md:text-2xl">
                      {card.number}
                    </span>
                  </div>
                )}

                {/* Title (small text above heading) */}
                {card.title && (
                  <p className="text-xs uppercase tracking-[0.2em] mb-1.5 font-bold text-[#88C0B1]">
                    {card.title}
                  </p>
                )}

                {/* Main Heading */}
                {card.heading && (
                  <h3 className="text-[32px] leading-[40px] md:text-[28px] md:leading-[36px] sm:text-[24px] sm:leading-[32px] font-light text-white mb-[1rem] tracking-[0.36px]">
                    {card.heading}
                  </h3>
                )}

                {/* Description */}
                {card.description && (
                  <div className="text-[18px] leading-[26px] md:text-[16px] md:leading-[24px] font-normal text-white/90 prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0 prose-ul:my-0 prose-ul:list-none prose-ul:pl-0 prose-ul:flex prose-ul:flex-col prose-ul:gap-[15px] prose-li:flex prose-li:gap-[12px] prose-li:items-start prose-li:leading-[22px] prose-li:before:content-[''] prose-li:before:flex-shrink-0 prose-li:before:w-[22px] prose-li:before:h-[22px] prose-li:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNOSAxNi4xN0w0LjgzIDEybC0xLjQyIDEuNDFMOSAxOSAyMSA3bC0xLjQxLTEuNDF6IiBmaWxsPSIjODhDMEIxIi8+Cjwvc3ZnPgo=')] prose-li:before:bg-no-repeat prose-li:before:bg-center prose-li:before:bg-contain">
                    <PortableText value={card.description} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Spacing */}
      <div className="h-[80px] md:h-[60px]" />
    </section>
  );
}


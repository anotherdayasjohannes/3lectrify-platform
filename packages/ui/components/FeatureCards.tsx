'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  _key: string;
  icon?: {
    url: string;
    alt: string;
  };
  title: string;
  description?: string;
}

interface FeatureCardsProps {
  sectionHeadline?: string;
  sectionDescription?: string;
  cards: Card[];
}

export function FeatureCards({
  sectionHeadline,
  sectionDescription,
  cards,
}: FeatureCardsProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cardElements = containerRef.current?.querySelectorAll('[data-card]');
      if (!cardElements || cardElements.length === 0) return;

      gsap.from(cardElements, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-[60px] bg-white lg:py-20"
    >
      <div className="content-wrapper">
        {sectionHeadline && (
               <h2 className="text-[32px] leading-[40px] tracking-[0.36px] font-light text-center mb-[15px] text-[#333333] lg:text-[36px] lg:leading-[46px]">
            {sectionHeadline}
          </h2>
        )}
        {sectionDescription && (
          <p className="text-[18px] leading-[24px] tracking-[0.18px] font-normal text-center mb-[50px] text-[#666666] max-w-[800px] mx-auto sm:text-[16px] sm:leading-[26px] sm:mb-[40px]">
            {sectionDescription}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] mt-[50px] md:gap-[25px] sm:gap-[25px]">
          {cards.map((card) => (
            <div
              key={card._key}
              data-card
              className="p-[25px] rounded-[10px] bg-[#f4f4f5] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] md:p-[25px] sm:p-[25px]"
            >
              {card.icon && (
                <div className="w-20 h-20 mb-[15px] flex items-center justify-center sm:w-[60px] sm:h-[60px]">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || ''}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
                     <h3 className="text-[20px] leading-[28px] tracking-[0.24px] font-normal mb-[15px] text-[#333333] lg:text-[24px] lg:leading-[34px]">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-[16px] leading-[26px] tracking-[0.16px] font-light m-0 text-[#666666] sm:text-[15px] sm:leading-[22px]">
                  {card.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

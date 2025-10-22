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
          once: true, // Animation plays only once, prevents cards from staying hidden
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-[80px] pb-[100px] bg-[#293645] md:py-[60px] md:pb-[80px]"
    >
      <div className="content-wrapper">
        {sectionHeadline && (
          <h2 className="text-[40px] leading-[50px] tracking-[0.4px] font-light text-left mb-[20px] text-white md:text-[32px] md:leading-[42px] md:mb-[15px]">
            {sectionHeadline}
          </h2>
        )}
        {sectionDescription && (
          <p className="text-[18px] leading-[30px] tracking-[0.18px] font-light text-left mb-[60px] text-white max-w-[800px] md:text-[16px] md:leading-[26px] md:mb-[40px]">
            {sectionDescription}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] md:gap-[25px] max-md:gap-[20px]">
          {cards.map((card) => (
            <article
              key={card._key}
              data-card
              className="bg-[#1C242E] rounded-[20px] p-[40px_30px] text-left transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:p-[35px_25px]"
            >
              {card.icon && (
                <div className="w-[100px] h-[100px] mb-[25px] flex items-center justify-center bg-gradient-to-br from-[#88C0B1] to-[#6BA896] rounded-full p-[20px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 md:w-[80px] md:h-[80px] md:mb-[20px]">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || ''}
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px] object-contain md:w-[50px] md:h-[50px]"
                  />
                </div>
              )}
              <h3 className="text-[24px] leading-[32px] tracking-[0.24px] font-normal text-left mb-[15px] text-white md:text-[20px] md:leading-[28px]">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-[16px] leading-[26px] tracking-[0.16px] font-light m-0 text-white text-left">
                  {card.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

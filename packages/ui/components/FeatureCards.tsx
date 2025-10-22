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

      // "The Spotlight" - Sequential focus animation with scroll pinning
      // Each card gets its moment: fade in → spotlight (scale + glow) → settle
      // The page "pauses" while the animation plays - Apple-style storytelling!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 15%', // Pin when section header is nicely positioned
          end: '+=50%', // Pin for 50vh worth of scroll - enough for full animation
          pin: true, // 🎬 THE MAGIC - freeze the page!
          pinSpacing: true, // Prevents next section from sliding underneath
          anticipatePin: 1, // Smoother pin start
          once: true, // Animation plays once
          markers: process.env.NODE_ENV === 'development',
          scrub: false // Time-based animation (not scroll-scrubbed)
        }
      });

      cardElements.forEach((card, index) => {
        // Calculate stagger timing - much slower for comfortable reading
        const delay = index * 0.8; // Increased from 0.5s to 0.8s - more breathing room

        // Step 1: Fade in with slight scale - gentle entrance
        tl.from(card, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.7, // Increased from 0.6s - more gradual
          ease: 'power2.out'
        }, delay);

        // Step 2: Spotlight moment - scale up + subtle glow effect
        tl.to(card, {
          scale: 1.05,
          boxShadow: '0 20px 60px rgba(136, 192, 177, 0.3)',
          duration: 0.6, // Increased from 0.5s - longer spotlight
          ease: 'power2.inOut'
        }, delay + 0.6); // Adjusted timing

        // Step 3: Settle into final position
        tl.to(card, {
          scale: 1,
          boxShadow: '0 0 0 rgba(136, 192, 177, 0)',
          duration: 0.5, // Increased from 0.4s - gentle settle
          ease: 'power2.out'
        }, delay + 1.2); // Adjusted timing
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-[80px] pb-[100px] bg-[#293645] md:py-[60px] md:pb-[80px]"
      style={{ zIndex: 100, backgroundColor: '#293645' }}
    >
      <div className="content-wrapper">
        {/* Section Header - Left Aligned */}
        <div className="mb-[60px] md:mb-[40px]">
          {sectionHeadline && (
            <h2 className="text-[40px] leading-[50px] tracking-[0.4px] font-light mb-[20px] text-white text-left md:text-[32px] md:leading-[42px] md:mb-[15px]">
              {sectionHeadline}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-[18px] leading-[30px] tracking-[0.18px] font-light text-white text-left max-w-[800px] md:text-[16px] md:leading-[26px]">
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Cards Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] md:gap-[25px] max-md:gap-[20px] justify-items-center">
          {cards.map((card) => (
            <article
              key={card._key}
              data-card
              className="bg-[#1C242E] rounded-[20px] p-[40px_30px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:p-[35px_25px] w-full"
              style={{ opacity: 1 }}
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
              <h3 className="text-[24px] leading-[32px] tracking-[0.24px] font-normal mb-[15px] text-white text-left md:text-[20px] md:leading-[28px]">
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

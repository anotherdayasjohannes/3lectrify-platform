'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { useScrollTextReveal } from '@3lectrify/animations';

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ✨ Scroll-triggered text reveal for headline
  const headlineRef = useScrollTextReveal({
    stagger: 0.05,
    duration: 0.4,
    yDistance: 15,
    triggerStart: 'top 85%',
  });

  // Check for reduced motion preference
  const shouldReduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useGSAP(
    () => {
      const cardElements = cardsRef.current.filter(Boolean);
      
      if (!cardElements.length || shouldReduceMotion) {
        // Graceful degradation: Set final states immediately
        cardElements.forEach((card, index) => {
          if (card) {
            const xOffset = (index - (cardElements.length - 1) / 2) * 150; // Cascade horizontally even without animation
            gsap.set(card, { 
              opacity: 1, 
              scale: 1,
              x: xOffset,
              rotation: 0
            });
          }
        });
        return;
      }

      // 🎬 THE SHOWCASE: Cards fly in and stack with rotation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', // Pin when section reaches top of viewport
          end: '+=500%', // ⏱️ Much longer duration (was 300%) - gives time to read each card
          pin: true, // 🎯 Freeze the page
          pinSpacing: true, // Maintain flow
          scrub: 1.5, // ⏱️ Slightly slower scrub for more control (was 1)
          anticipatePin: 1,
          invalidateOnRefresh: true, // 🔄 Force recalculate on every refresh - prevents layout jumps
          markers: process.env.NODE_ENV === 'development',
          onRefresh: (self) => {
            // Ensure pin-spacer has correct background
            const pinSpacer = self.pin?.parentElement;
            if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
              pinSpacer.style.backgroundColor = '#293645';
            }
          }
        }
      });

      // Set initial states: Cards off-screen to the right
      cardElements.forEach((card, index) => {
        gsap.set(card, {
          x: 1000, // Start off-screen right
          opacity: 0, // Start invisible
          scale: 0.8,
          rotation: 0
        });
      });

      // Animate cards flying in and stacking with rotation + horizontal offset
      cardElements.forEach((card, index) => {
        const rotation = (index - Math.floor(cardElements.length / 2)) * 3; // -3°, 0°, +3° etc.
        // 🎯 Horizontal cascade: Cards arranged left-to-right (01, 02, 03)
        // Formula centers them: Card 01 left, Card 02 center, Card 03 right
        const xOffset = (index - (cardElements.length - 1) / 2) * 150;
        
        // Set opacity to 1 immediately when card starts animating
        tl.set(card, { opacity: 1 }, index * 0.8);
        
        // Then animate the fly-in (without opacity change)
        tl.to(card, {
          x: xOffset, // 🎯 Horizontal offset so numbers are visible side-by-side!
          scale: 1,
          rotation: rotation, // Each card slightly angled
          duration: 1.2, // ⏱️ Slower fly-in
          ease: 'power2.out'
        }, index * 0.8); // ⏱️ Longer stagger between cards
      });

      // Add brief pause at the end before unpinning
      tl.to({}, { duration: 0.5 }); // ⏱️ Brief pause to see all cards stacked, then continue
    },
    { scope: containerRef } // Auto cleanup!
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#293645]"
      style={{ zIndex: 10, minHeight: '100vh' }}
    >
      {/* Fixed Headline - Stays visible during animation */}
      {(sectionHeadline || sectionIntro) && (
        <div className="content-wrapper pt-[100px] pb-[30px] md:pt-[80px] md:pb-[20px]">
          {sectionHeadline && (
            <h2
              ref={headlineRef as any}
              className="text-[40px] leading-[50px] tracking-[0.4px] font-light text-white mb-[32px] md:text-[36px] md:leading-[46px]"
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

      {/* Cards Container - Centered vertically in viewport */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 'calc(100vh - 250px)' }}>
        {cards.map((card, index) => (
          <div
            key={card._key}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="absolute w-full h-full flex items-center justify-center p-[2rem] md:p-[1.5rem] sm:p-[1rem]"
            style={{ 
              zIndex: index + 1, // Stack order: later cards on top
              opacity: 1 // ✅ Explicit default for graceful degradation
            }}
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


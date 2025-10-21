'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  _key: string;
  number: string;
  title: string;
  heading: string;
  description?: any; // Portable Text
  icon?: {
    url: string;
    alt: string;
  };
}

interface FeatureShowcaseProps {
  sectionHeadline?: string;
  sectionIntro?: any; // Portable Text
  features: FeatureItem[];
}

export function FeatureShowcase({
  sectionHeadline,
  sectionIntro,
  features = [],
}: FeatureShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const section = sectionRef.current;
    if (!section) return;

    // Create a GSAP context for cleanup
    const ctx = gsap.context(() => {
      // PIN THE ENTIRE SECTION - Page stops scrolling, scroll drives animations
      const totalFeatures = features.length;
      const scrollDistance = totalFeatures * 100; // Each feature gets 100vh of scroll

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}%`,
        pin: true,
        scrub: true,
        // markers: true, // Uncomment to debug
        onUpdate: (self) => {
          // Calculate which feature should be active based on scroll progress
          const progress = self.progress;
          
          // Divide scroll into equal thirds for 3 features
          let newIndex = 0;
          if (progress < 0.33) {
            newIndex = 0;
          } else if (progress < 0.66) {
            newIndex = 1;
          } else {
            newIndex = 2;
          }
          
          setActiveIndex(newIndex);
        },
      });

      // Floating icon animation (continuous)
      const cardIcon = section.querySelector('.feature-icon');
      if (cardIcon) {
        gsap.to(cardIcon, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, section);

    return () => {
      ctx.revert(); // Cleanup all animations
    };
  }, [isLoaded, features.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-[50px] lg:py-20 overflow-hidden bg-[#293645]"
      style={{ willChange: 'transform' }}
    >
      <div className="content-wrapper relative z-10 h-full flex flex-col">
        {/* Section Header */}
        {(sectionHeadline || sectionIntro) && (
          <div className="text-center mb-[40px] lg:mb-[60px] max-w-[1200px] mx-auto">
            {sectionHeadline && (
              <h2 className="text-h1 font-light text-white mb-6">
                {sectionHeadline}
              </h2>
            )}
            {sectionIntro && (
              <div className="text-[20px] leading-[1.6] font-light text-white">
                <PortableText value={sectionIntro} />
              </div>
            )}
          </div>
        )}

        {/* SPLIT SCREEN STORYTELLING LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] max-w-[1440px] mx-auto items-start flex-1">
          
          {/* LEFT SIDE - Compact with Horizontal Inactive Items */}
          <div className="space-y-[24px] pr-[50px]">
            {features.map((feature, index) => (
                <div
                  key={`nav-${feature._key}`}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`
                    relative cursor-pointer transition-all duration-700
                    ${activeIndex === index ? 'opacity-100' : 'opacity-25 hover:opacity-50'}
                  `}
                  style={activeIndex === index ? { filter: 'none' } : {}}
                >
                  {/* Connecting Line to Right Side - centered on badge */}
                  {activeIndex === index && (
                    <div className="absolute -right-[50px] w-[50px] h-[3px] bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-700"
                         style={{ top: '64px' }} /* Center of 96px badge + 16px padding */ />
                  )}

                  {/* ACTIVE - Vertical Expanded Layout */}
                  {activeIndex === index && (
                    <div className="py-4 min-h-[180px]">
                      {/* Number Badge */}
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 transition-all duration-700 border-[3px] bg-blue-500 border-blue-400 text-white shadow-[0_0_50px_rgba(59,130,246,1)]">
                        <span className="font-black text-5xl">{feature.number}</span>
                      </div>

                      {/* Title */}
                      <div className="text-sm uppercase tracking-[0.2em] mb-4 font-bold text-blue-300 transition-all duration-700">
                        {feature.title}
                      </div>

                      {/* Heading */}
                      <h3 className="text-4xl leading-tight text-white font-normal transition-all duration-700">
                        {feature.heading}
                      </h3>

                    </div>
                  )}

                  {/* INACTIVE - Horizontal Compact Layout */}
                  {activeIndex !== index && (
                    <div className="flex items-center gap-4 py-2 min-h-[56px] transition-all duration-700">
                      {/* Number Badge - Small */}
                      <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-700 border-2 bg-transparent border-white/15 text-white/30">
                        <span className="font-light text-xl">{feature.number}</span>
                      </div>

                      {/* Text on Right */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <div className="text-xs uppercase tracking-wider text-white/25 mb-1">
                          {feature.title}
                        </div>
                        
                        {/* Heading - Truncated */}
                        <h4 className="text-lg leading-tight text-white/30 font-light truncate">
                          {feature.heading}
                        </h4>
                      </div>

                      {/* Subtle connecting line for inactive */}
                      <div className="absolute -right-[50px] top-6 w-[50px] h-[1px] bg-white/5 transition-all duration-700" />
                    </div>
                  )}
                </div>
            ))}
          </div>

          {/* RIGHT SIDE - Content Display (Plain, No Card) */}
          <div className="relative h-full pl-[50px] border-l-2 border-blue-400/30">
            {/* Content - Moves to align with connecting line */}
            <div 
              className="relative min-h-[400px] transition-all duration-700"
              style={{
                paddingTop: activeIndex === 0 ? '16px' : activeIndex === 1 ? '96px' : '176px'
              }}
            >
              {/* Icon */}
              {features[activeIndex]?.icon && (
                <div className="feature-icon mb-8 transition-all duration-700">
                  <Image
                    src={features[activeIndex].icon.url}
                    alt={features[activeIndex].icon.alt || ''}
                    width={56}
                    height={56}
                    className="object-contain transition-all duration-700"
                  />
                </div>
              )}

              {/* Title */}
              <div className="text-blue-300/80 text-sm uppercase tracking-[0.2em] mb-6 font-medium transition-all duration-700">
                {features[activeIndex]?.title}
              </div>

              {/* Description - NO DUPLICATE HEADING */}
              {features[activeIndex]?.description && (
                <div className="text-white/80 text-lg leading-relaxed transition-all duration-700 prose prose-invert prose-lg max-w-none [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-white/80">
                  <PortableText value={features[activeIndex].description} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  _key: string;
  number: string;
  title: string;
  heading: string;
  description?: PortableTextBlock[];
  icon?: {
    url: string;
    alt: string;
  };
}

interface FeatureShowcaseProps {
  sectionHeadline?: string;
  sectionIntro?: PortableTextBlock[];
  features: FeatureItem[];
}

export function FeatureShowcase({
  sectionHeadline,
  sectionIntro,
  features = [],
}: FeatureShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Animate each heading item as scroll progresses
      headingsRef.current.forEach((heading, index) => {
        if (!heading) return;

        // Create a ScrollTrigger for each heading
        ScrollTrigger.create({
          trigger: heading,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            setActiveIndex(index);
            // Animate content change
            gsap.fromTo(
              content,
              { opacity: 0.3, x: 20 },
              { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
            );
          },
          onEnterBack: () => {
            setActiveIndex(index);
            gsap.fromTo(
              content,
              { opacity: 0.3, x: -20 },
              { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
            );
          },
          // markers: true, // Uncomment to debug
        });

        // Fade in heading on scroll
        gsap.fromTo(
          heading,
          {
            opacity: 0.3,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });

      // Section header animation
      const header = section.querySelector('.section-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: header,
              start: 'top 80%',
            },
          }
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, [features.length]);

  const activeFeature = features[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#293645] py-20"
    >
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="content-wrapper relative z-10">
        {/* Section Header */}
        {(sectionHeadline || sectionIntro) && (
          <div className="section-header text-center mb-20 max-w-[1200px] mx-auto">
            {sectionHeadline && (
              <h2 className="text-5xl font-light text-white mb-6">
                {sectionHeadline}
              </h2>
            )}
            {sectionIntro && (
              <div className="text-xl text-white/70">
                <PortableText value={sectionIntro} />
              </div>
            )}
          </div>
        )}

        {/* Split Screen Layout */}
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Scrollable Headings List */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature._key}
                ref={(el) => {
                  headingsRef.current[index] = el;
                }}
                className={`
                  transition-all duration-500 cursor-pointer group
                  ${activeIndex === index ? 'scale-105' : 'scale-100 opacity-60 hover:opacity-80'}
                `}
              >
                {/* Number Badge */}
                <div className={`
                  inline-block text-sm font-medium px-4 py-2 rounded-full mb-4
                  transition-all duration-300
                  ${activeIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/60 group-hover:bg-white/20'
                  }
                `}>
                  {feature.number || `0${index + 1}`}
                </div>

                {/* Title */}
                <h3 className={`
                  text-2xl lg:text-3xl font-light mb-3
                  transition-colors duration-300
                  ${activeIndex === index ? 'text-white' : 'text-white/70'}
                `}>
                  {feature.title}
                </h3>

                {/* Heading */}
                <h4 className={`
                  text-3xl lg:text-4xl font-light
                  transition-colors duration-300
                  ${activeIndex === index ? 'text-white' : 'text-white/50'}
                `}>
                  {feature.heading}
                </h4>

                {/* Active Indicator */}
                {activeIndex === index && (
                  <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Sticky Content Area */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div
              ref={contentRef}
              className="bg-[#3c5067]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Top Bar */}
              <div className="border-b border-white/8 bg-[#3c5067]/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-sm text-white/60 font-medium px-3 py-1 bg-white/5 rounded-full">
                    {activeFeature?.number || '01'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                {/* Icon */}
                {activeFeature?.icon && (
                  <div className="mb-8 flex items-center justify-center">
                    <div className="w-24 h-24 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                      <Image
                        src={activeFeature.icon.url}
                        alt={activeFeature.icon.alt || ''}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-light text-white/90 mb-4">
                  {activeFeature?.title}
                </h3>

                {/* Heading */}
                <h4 className="text-4xl lg:text-5xl font-light text-white mb-8">
                  {activeFeature?.heading}
                </h4>

                {/* Description */}
                {activeFeature?.description && (
                  <div className="text-lg text-white/80 prose prose-invert prose-p:mb-4">
                    <PortableText value={activeFeature.description} />
                  </div>
                )}

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px',
                    }}
                  />
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-white/8 bg-[#3c5067]/50 px-6 py-3">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                  <span>3lectrify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

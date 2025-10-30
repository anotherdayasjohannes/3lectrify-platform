'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  // 🎬 ACCORDION STORYTELLING - One step at a time, pure GSAP!
  useGSAP(
    () => {
      if (!sectionRef.current || features.length === 0) return;

      const section = sectionRef.current;
      
      // Get all feature elements
      const leftFeatures = gsap.utils.toArray<HTMLElement>('[data-feature-left]');
      const featureHeadings = gsap.utils.toArray<HTMLElement>('[data-feature-heading]');
      const featureBadges = gsap.utils.toArray<HTMLElement>('[data-feature-badge]');
      const rightContents = gsap.utils.toArray<HTMLElement>('[data-feature-right]');
      const connectingLines = gsap.utils.toArray<HTMLElement>('[data-connecting-line]');
      const icons = gsap.utils.toArray<HTMLElement>('[data-feature-icon]');

      if (leftFeatures.length === 0) return;

      // Calculate scroll distance: 100vh per feature
      const scrollDistance = features.length * 100;

      // 🎯 MASTER TIMELINE - Accordion collapse/expand with scroll!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}%`,
          pin: true, // 🎬 Page freezes during storytelling
          scrub: 1, // Smooth 1s lag for buttery scrolling
          pinSpacing: true,
          anticipatePin: 1,
          markers: process.env.NODE_ENV === 'development',
          onRefresh: (self) => {
            // Set pin-spacer background to match section
            const pinSpacer = self.pin?.parentElement;
            if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
              pinSpacer.style.backgroundColor = '#293645';
            }
          }
        }
      });

      // 🎭 SET INITIAL STATES
      leftFeatures.forEach((feature, i) => {
        if (i === 0) {
          // Step 1: EXPANDED initially
          gsap.set(feature, { 
            height: 'auto',
            opacity: 1,
          });
        } else {
          // Steps 2-3: COLLAPSED initially
          gsap.set(feature, { 
            height: '72px', // Collapsed height (badge + small title)
            opacity: 0.4,
          });
        }
      });

      // Headings: Only first visible
      featureHeadings.forEach((heading, i) => {
        if (i === 0) {
          gsap.set(heading, { opacity: 1, height: 'auto' });
        } else {
          gsap.set(heading, { opacity: 0, height: 0 });
        }
      });

      // Badges: First large, others small
      featureBadges.forEach((badge, i) => {
        if (i === 0) {
          gsap.set(badge, { 
            scale: 1,
            boxShadow: '0 0 50px rgba(59, 130, 246, 1)'
          });
        } else {
          gsap.set(badge, { 
            scale: 0.5,
            boxShadow: '0 0 0 rgba(59, 130, 246, 0)'
          });
        }
      });

      // Right content: Only first visible
      rightContents.forEach((content, i) => {
        if (i === 0) {
          gsap.set(content, { opacity: 1, x: 0, filter: 'blur(0px)' });
        } else {
          gsap.set(content, { opacity: 0, x: 50, filter: 'blur(4px)' });
        }
      });

      // Connecting lines: Only first visible
      connectingLines.forEach((line, i) => {
        gsap.set(line, { 
          scaleX: i === 0 ? 1 : 0,
          opacity: i === 0 ? 1 : 0,
        });
      });

      // 🎬 ACCORDION ANIMATIONS - Sequential collapse/expand!
      features.forEach((feature, index) => {
        const progress = index / features.length; // 0, 0.33, 0.66
        const nextProgress = (index + 1) / features.length; // 0.33, 0.66, 1.0
        const transitionStart = (progress + nextProgress) / 2; // Transition midpoint

        // Skip last transition (no next feature)
        if (index === features.length - 1) return;

        const currentLeft = leftFeatures[index];
        const currentHeading = featureHeadings[index];
        const currentBadge = featureBadges[index];
        const currentRight = rightContents[index];
        const currentLine = connectingLines[index];
        
        const nextLeft = leftFeatures[index + 1];
        const nextHeading = featureHeadings[index + 1];
        const nextBadge = featureBadges[index + 1];
        const nextRight = rightContents[index + 1];
        const nextLine = connectingLines[index + 1];

        // 📤 COLLAPSE CURRENT FEATURE
        // Height shrinks, heading fades out, badge scales down
        tl.to(currentLeft, {
          height: '72px', // Shrink to collapsed size
          opacity: 0.4,
          duration: 0.4,
          ease: 'power2.out'
        }, transitionStart)
        .to(currentHeading, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: 'power2.out'
        }, transitionStart)
        .to(currentBadge, {
          scale: 0.5, // Shrink badge
          boxShadow: '0 0 0 rgba(59, 130, 246, 0)', // Remove glow
          duration: 0.3,
          ease: 'power2.out'
        }, transitionStart)
        .to(currentRight, {
          opacity: 0,
          x: -50,
          filter: 'blur(4px)',
          duration: 0.3,
          ease: 'power2.out'
        }, transitionStart)
        .to(currentLine, {
          scaleX: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        }, transitionStart);

        // 📥 EXPAND NEXT FEATURE
        // Height grows, heading fades in, badge scales up
        tl.to(nextLeft, {
          height: 'auto', // Grow to full size
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, transitionStart + 0.15)
        .to(nextHeading, {
          opacity: 1,
          height: 'auto',
          duration: 0.4,
          ease: 'power2.out'
        }, transitionStart + 0.2)
        .to(nextBadge, {
          scale: 1, // Grow badge
          boxShadow: '0 0 50px rgba(59, 130, 246, 1)', // Add glow
          duration: 0.4,
          ease: 'power2.out'
        }, transitionStart + 0.15)
        .to(nextRight, {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power2.out'
        }, transitionStart + 0.15)
        .to(nextLine, {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          transformOrigin: 'left center'
        }, transitionStart + 0.15);

        // 🎯 SPOTLIGHT PULSE - Brief glow when feature becomes active
        tl.to(nextBadge, {
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.8)',
          duration: 0.2,
          ease: 'power2.out'
        }, transitionStart + 0.3)
        .to(nextBadge, {
          boxShadow: '0 0 50px rgba(59, 130, 246, 1)',
          duration: 0.3,
          ease: 'power2.out'
        }, transitionStart + 0.5);
      });

      // 🎪 FLOATING ICON ANIMATIONS - Run continuously
      icons.forEach((icon) => {
        gsap.to(icon, {
          y: -10,
          duration: 2 + Math.random(), // Slight variation
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: sectionRef, dependencies: [features.length] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-[50px] lg:py-20 overflow-hidden bg-[#293645]"
      style={{ willChange: 'transform', backgroundColor: '#293645' }}
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

        {/* 🎬 ACCORDION SPLIT SCREEN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] max-w-[1440px] mx-auto items-start flex-1">
          
          {/* LEFT SIDE - Accordion Steps (Collapse/Expand) */}
          <div className="space-y-[16px] pr-[50px]">
            {features.map((feature, index) => (
              <div
                key={`nav-${feature._key}`}
                data-feature-left
                className="relative overflow-hidden transition-all duration-300"
                style={{ willChange: 'height' }}
              >
                {/* 🔗 CONNECTING LINE - Animated */}
                <div 
                  data-connecting-line
                  className="absolute -right-[50px] w-[50px] h-[3px] bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                  style={{ 
                    top: '40px', // Center of badge
                    transformOrigin: 'left center'
                  }} 
                />

                {/* Number Badge - Animated size + glow */}
                <div 
                  data-feature-badge
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 border-[3px] bg-blue-500 border-blue-400 text-white"
                  style={{ willChange: 'transform, box-shadow' }}
                >
                  <span className="font-black text-4xl">{feature.number}</span>
                </div>

                {/* Title - Always visible (small) */}
                <div className="text-xs uppercase tracking-[0.2em] mb-2 font-bold text-blue-300">
                  {feature.title}
                </div>

                {/* Heading - Collapses/Expands */}
                <div 
                  data-feature-heading
                  className="overflow-hidden"
                  style={{ willChange: 'height, opacity' }}
                >
                  <h3 className="text-3xl leading-tight text-white font-normal">
                    {feature.heading}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Content Display (Stacked, GSAP controls visibility) */}
          <div className="relative h-full pl-[50px] border-l-2 border-blue-400/30">
            {features.map((feature, index) => (
              <div
                key={`content-${feature._key}`}
                data-feature-right
                className="absolute top-0 left-0 pl-[50px] min-h-[400px]"
                style={{
                  paddingTop: '16px',
                  willChange: 'opacity, transform, filter'
                }}
              >
                {/* Icon - Floating Animation */}
                {feature.icon && (
                  <div 
                    data-feature-icon
                    className="mb-8"
                  >
                    <Image
                      src={feature.icon.url}
                      alt={feature.icon.alt || ''}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                <div className="text-blue-300/80 text-sm uppercase tracking-[0.2em] mb-6 font-medium">
                  {feature.title}
                </div>

                {/* Description */}
                {feature.description && (
                  <div className="text-white/80 text-lg leading-relaxed prose prose-invert prose-lg max-w-none [&_p]:mb-[26px] [&_p]:last:mb-0 [&_p]:text-white/80">
                    <PortableText value={feature.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

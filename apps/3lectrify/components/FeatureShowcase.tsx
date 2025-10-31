'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px] bg-[#293645]">
      <div className="content-wrapper">
        {/* Section Header - Mobile-first */}
        {(sectionHeadline || sectionIntro) && (
          <div className="text-center mb-8 md:mb-10 lg:mb-[60px] max-w-[1200px] mx-auto">
            {sectionHeadline && (
              <h2 className="text-[28px] leading-[36px] tracking-[0.28px] md:text-[36px] md:leading-[46px] md:tracking-[0.36px] lg:text-[48px] lg:leading-[58px] lg:tracking-[0.48px] font-light text-white mb-4 md:mb-6">
                {sectionHeadline}
              </h2>
            )}
            {sectionIntro && (
              <div className="text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[28px] md:tracking-[0.18px] lg:text-[20px] lg:leading-[30px] lg:tracking-[0.2px] font-light text-white">
                <PortableText value={sectionIntro} />
              </div>
            )}
          </div>
        )}

        {/* Split Screen Layout - Mobile-first: stack → side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-[50px] max-w-[1440px] mx-auto">
          
          {/* LEFT SIDE - Feature Navigation */}
          <div className="space-y-3 md:space-y-4">
            {features.map((feature, index) => (
              <button
                key={`nav-${feature._key}`}
                onClick={() => setActiveIndex(index)}
                className={`relative w-full text-left p-4 md:p-5 lg:p-6 rounded-lg transition-all cursor-pointer touch-manipulation ${
                  activeIndex === index
                    ? 'bg-blue-500/20 border-2 border-blue-400'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Number Badge - Responsive size */}
                  <div 
                    className={`flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 transition-all ${
                      activeIndex === index
                        ? 'bg-blue-500 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                        : 'bg-blue-500/50 border-blue-400/50'
                    }`}
                  >
                    <span className="font-black text-lg md:text-xl lg:text-2xl text-white">{feature.number}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title - Responsive */}
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1 md:mb-2 font-bold text-blue-300">
                      {feature.title}
                    </div>

                    {/* Heading - Responsive */}
                    <h3 className="text-[18px] leading-[26px] md:text-[20px] md:leading-[28px] lg:text-2xl lg:leading-tight text-white font-normal">
                      {feature.heading}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT SIDE - Active Feature Content - Mobile-first padding */}
          <div className="relative pl-0 lg:pl-[50px] pt-6 lg:pt-0 border-t-2 lg:border-t-0 lg:border-l-2 border-blue-400/30">
            {features[activeIndex] && (
              <div className="transition-opacity duration-300">
                {/* Icon - Responsive size */}
                {features[activeIndex].icon && (
                  <div className="mb-5 md:mb-6 lg:mb-8">
                    <Image
                      src={features[activeIndex].icon.url}
                      alt={features[activeIndex].icon.alt || ''}
                      width={56}
                      height={56}
                      className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                    />
                  </div>
                )}

                {/* Title - Responsive */}
                <div className="text-blue-300/80 text-xs md:text-sm uppercase tracking-[0.2em] mb-4 md:mb-5 lg:mb-6 font-medium">
                  {features[activeIndex].title}
                </div>

                {/* Description - Responsive */}
                {features[activeIndex].description && (
                  <div className="text-white/80 text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] lg:text-lg lg:leading-relaxed prose prose-invert max-w-none [&_p]:mb-5 md:[&_p]:mb-[26px] [&_p]:last:mb-0 [&_p]:text-white/80">
                    <PortableText value={features[activeIndex].description} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

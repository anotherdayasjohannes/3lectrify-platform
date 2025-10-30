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
    <section className="relative py-[50px] lg:py-20 bg-[#293645]">
      <div className="content-wrapper">
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

        {/* Split Screen Layout - Click-based Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] max-w-[1440px] mx-auto">
          
          {/* LEFT SIDE - Feature Navigation */}
          <div className="space-y-[16px]">
            {features.map((feature, index) => (
              <button
                key={`nav-${feature._key}`}
                onClick={() => setActiveIndex(index)}
                className={`relative w-full text-left p-6 rounded-lg transition-all cursor-pointer ${
                  activeIndex === index
                    ? 'bg-blue-500/20 border-2 border-blue-400'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div 
                    className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all ${
                      activeIndex === index
                        ? 'bg-blue-500 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]'
                        : 'bg-blue-500/50 border-blue-400/50'
                    }`}
                  >
                    <span className="font-black text-2xl text-white">{feature.number}</span>
                  </div>

                  <div className="flex-1">
                    {/* Title */}
                    <div className="text-xs uppercase tracking-[0.2em] mb-2 font-bold text-blue-300">
                      {feature.title}
                    </div>

                    {/* Heading */}
                    <h3 className="text-2xl leading-tight text-white font-normal">
                      {feature.heading}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT SIDE - Active Feature Content */}
          <div className="relative pl-[50px] border-l-2 border-blue-400/30">
            {features[activeIndex] && (
              <div className="transition-opacity duration-300">
                {/* Icon */}
                {features[activeIndex].icon && (
                  <div className="mb-8">
                    <Image
                      src={features[activeIndex].icon.url}
                      alt={features[activeIndex].icon.alt || ''}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                <div className="text-blue-300/80 text-sm uppercase tracking-[0.2em] mb-6 font-medium">
                  {features[activeIndex].title}
                </div>

                {/* Description */}
                {features[activeIndex].description && (
                  <div className="text-white/80 text-lg leading-relaxed prose prose-invert prose-lg max-w-none [&_p]:mb-[26px] [&_p]:last:mb-0 [&_p]:text-white/80">
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

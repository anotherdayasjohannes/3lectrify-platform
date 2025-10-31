'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { typography } from './theme';

interface Reference {
  id: string;
  name: string;
  location: string;
  image: string;
  units: number;
  year: string;
}

interface ReferencesMarqueeProps {
  references: Reference[];
  speed?: 'slow' | 'normal' | 'fast';
  headline?: string;
  subtext?: string;
}

export default function ReferencesMarquee({ 
  references, 
  speed = 'normal',
  headline = 'Unsere Projekte im Überblick',
  subtext = 'Eine Auswahl unserer erfolgreich realisierten Referenzen'
}: ReferencesMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const speedMap = {
    slow: 60,
    normal: 40,
    fast: 25,
  };

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const firstChild = marquee.children[0] as HTMLElement;
    const scrollWidth = firstChild.scrollWidth;

    // GSAP infinite scroll
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' },
    });

    tl.to(marquee, {
      x: -scrollWidth,
      duration: speedMap[speed],
    });

    // Pause on hover
    marquee.addEventListener('mouseenter', () => tl.pause());
    marquee.addEventListener('mouseleave', () => tl.play());

    return () => {
      tl.kill();
    };
  }, [speed, speedMap]);

  // Double the references for seamless loop
  const doubledReferences = [...references, ...references];

  return (
    <section className="pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px] overflow-hidden bg-[#293645]">
      <div className="content-wrapper">
        {/* Header - Mobile-first */}
        {(headline || subtext) && (
          <div className="mb-8 md:mb-10 lg:mb-[50px]">
            {headline && (
              <h2 className="text-white mb-4 md:mb-5 lg:mb-[20px] text-[24px] leading-[32px] tracking-[0.24px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-light">
                {headline}
              </h2>
            )}
            {subtext && (
              <p className="text-white text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] font-normal">
                {subtext}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        {/* Gradient Overlays - Responsive width */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-[#293645] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-[#293645] to-transparent z-10 pointer-events-none" />

        {/* Marquee Container - Responsive gap */}
        <div ref={marqueeRef} className="flex gap-4 md:gap-5 lg:gap-[25px]">
          {doubledReferences.map((reference, index) => (
            <MarqueeCard key={`${reference.id}-${index}`} reference={reference} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeCard({ reference }: { reference: Reference }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] group cursor-pointer">
      <div className="relative h-[200px] sm:h-[220px] md:h-[240px] rounded-[20px] overflow-hidden">
        {/* Image */}
        <Image
          src={reference.image}
          alt={reference.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content - Mobile-first padding */}
        <div className="absolute inset-0 p-4 md:p-5 lg:p-[25px] flex flex-col justify-end z-10">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            {/* Responsive title: 16px mobile → 20px desktop */}
            <h3 className="text-white mb-2 md:mb-[10px] text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[28px] md:tracking-[0.18px] lg:text-[20px] lg:leading-[30px] lg:tracking-[0.2px] font-normal">
              {reference.name}
            </h3>
            {/* Responsive metadata: 13px mobile → 16px desktop */}
            <div className="flex items-center gap-2 md:gap-[10px] text-white/80 text-[13px] leading-[20px] tracking-[0.13px] md:text-[14px] md:leading-[22px] md:tracking-[0.14px] lg:text-[16px] lg:leading-[26px] lg:tracking-[0.16px] font-normal">
              <span>{reference.location}</span>
              <span className="w-1 h-1 rounded-full bg-[#88C0B1]" />
              <span>{reference.units} Einheiten</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#88C0B1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}


'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap';

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
}

export default function ReferencesMarquee({ 
  references, 
  speed = 'normal' 
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
    <section className="py-[80px] overflow-hidden bg-[#293645] md:py-[60px]">
      <div className="content-wrapper mb-[50px] text-center md:mb-[40px]">
        <h2 className="text-[40px] leading-[50px] font-light text-white mb-[20px] tracking-[0.4px] md:text-[32px] md:leading-[42px]">
          Unsere Projekte im Überblick
        </h2>
        <p className="text-[18px] leading-[30px] text-white/70 font-light tracking-[0.18px]">
          Eine Auswahl unserer erfolgreich realisierten Referenzen
        </p>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#293645] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#293645] to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <div ref={marqueeRef} className="flex gap-[25px]">
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
    <div className="flex-shrink-0 w-[320px] group cursor-pointer">
      <div className="relative h-[240px] rounded-[20px] overflow-hidden">
        {/* Image */}
        <Image
          src={reference.image}
          alt={reference.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="320px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-[25px] flex flex-col justify-end z-10">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <h3 className="text-[24px] leading-[32px] font-normal text-white mb-[10px] tracking-[0.24px]">
              {reference.name}
            </h3>
            <div className="flex items-center gap-[10px] text-[18px] leading-[26px] text-white/80 font-light">
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


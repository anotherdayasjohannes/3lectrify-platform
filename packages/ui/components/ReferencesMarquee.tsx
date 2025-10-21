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
    <section className="py-gap-xlarge overflow-hidden bg-dark-bg-page">
      <div className="mb-gap-large text-center">
        <h2 className="text-h2 font-light text-white mb-gap-small">
          Unsere Projekte im Überblick
        </h2>
        <p className="text-body-regular text-white/70">
          Eine Auswahl unserer erfolgreich realisierten Referenzen
        </p>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-bg-page to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-bg-page to-transparent z-10" />

        {/* Marquee Container */}
        <div ref={marqueeRef} className="flex gap-gap-medium">
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
      <div className="relative h-[240px] rounded-large overflow-hidden">
        {/* Image */}
        <Image
          src={reference.image}
          alt={reference.name}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-110"
          sizes="320px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-gap-standard flex flex-col justify-end z-10">
          <div className="transform transition-transform duration-base group-hover:translate-y-[-4px]">
            <h3 className="text-body-large font-light text-white mb-gap-tiny">
              {reference.name}
            </h3>
            <div className="flex items-center gap-gap-small text-body-small text-white/70">
              <span>{reference.location}</span>
              <span className="w-1 h-1 rounded-full bg-brand-green-mid" />
              <span>{reference.units} Einheiten</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-green-mid/10 opacity-0 group-hover:opacity-100 transition-opacity duration-base" />
      </div>
    </div>
  );
}


'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCard {
  _key: string;
  value: string;
  description: string;
  accentColor?: 'green' | 'orange' | 'blue' | 'curry';
}

interface StatsProps {
  stats: StatCard[];
  layout?: 'horizontal' | 'grid';
  variant?: 'light' | 'dark';
  embedded?: boolean; // NEW: When true, skips section wrapper (for use in TextImage)
}

const accentColorMap = {
  green: '#88c0b1',
  orange: '#d04227',
  blue: '#3c5067',
  curry: '#eab257',
};

export function Stats({
  stats,
  layout = 'horizontal',
  variant = 'dark',
  embedded = false,
}: StatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const statElements = containerRef.current?.querySelectorAll('[data-stat]');
      if (!statElements || statElements.length === 0) return;

      gsap.from(statElements, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  const bgColor = variant === 'dark' ? 'bg-[#3c5067]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-[#c2c2c2]' : 'text-[#666666]';

  // Stats container (reusable)
  const statsContainer = (
    <div
      ref={containerRef}
      className={`flex items-start gap-[25px] w-full ${
        layout === 'grid' ? 'flex-wrap' : 'flex-nowrap overflow-x-auto'
      }`}
    >
      {stats.map((stat) => {
        const color = stat.accentColor
          ? accentColorMap[stat.accentColor]
          : accentColorMap.green;

        return (
          <div
            key={stat._key}
            data-stat
            className={`inline-flex flex-col items-center gap-2.5 px-[30px] py-[15px] ${bgColor} rounded-[10px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] ${
              layout === 'grid' ? 'flex-1 min-w-[200px]' : 'flex-[0_0_auto]'
            }`}
            style={{ opacity: 1 }}
          >
            <div
              className="font-normal text-[36px] tracking-[0.36px] leading-[46px] whitespace-nowrap"
              style={{ color }}
            >
              {stat.value}
            </div>

            <div
              className={`font-normal text-[16px] text-center tracking-[0.16px] leading-[26px] whitespace-nowrap ${textColor}`}
            >
              {stat.description}
            </div>
          </div>
        );
      })}
    </div>
  );

  // If embedded (in TextImage), return without section wrapper
  if (embedded) {
    return statsContainer;
  }

  // If standalone, wrap in section with padding + content-wrapper
  return (
    <section className="w-full py-[80px] max-md:py-[60px] max-sm:py-[40px]">
      <div className="content-wrapper">
        {statsContainer}
      </div>
    </section>
  );
}




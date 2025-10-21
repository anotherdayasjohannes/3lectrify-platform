'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Reference {
  id: string;
  name: string;
  location: string;
  image: string;
  units: number;
  year: string;
  type: 'residential' | 'commercial' | 'mixed';
  featured?: boolean;
}

interface ReferencesGridProps {
  references: Reference[];
  theme?: 'light' | 'dark';
}

export default function ReferencesGrid({ 
  references, 
  theme = 'dark' 
}: ReferencesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal animation on scroll
      gsap.fromTo(
        '.reference-card',
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on images
      gsap.to('.reference-image', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme={theme}
      className={`
        py-gap-xlarge
        ${theme === 'dark' ? 'bg-dark-bg-page' : 'bg-[var(--bg-page)]'}
      `}
    >
      <div className="content-wrapper">
        {/* Section Header */}
        <div className="text-center mb-gap-large">
          <h2 className="text-h2 font-light text-white mb-gap-small">
            Tausendfach bewährt.
          </h2>
          <p className="text-body-large text-white/70 max-w-content-text mx-auto">
            Über 1.400 energieautarke Wohneinheiten erfolgreich realisiert
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-gap-medium auto-rows-[250px]"
        >
          {references.map((reference, index) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              index={index}
            />
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-gap-large grid grid-cols-1 md:grid-cols-3 gap-gap-medium text-center">
          <StatCard number="1.400+" label="Wohneinheiten" />
          <StatCard number="15+" label="Städte" />
          <StatCard number="100%" label="Zufriedenheit" />
        </div>
      </div>
    </section>
  );
}

function ReferenceCard({ 
  reference, 
  index 
}: { 
  reference: Reference; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Magnetic hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        x: x * 0.08,
        y: y * 0.08,
        rotationY: x * 0.015,
        rotationX: -y * 0.015,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Update cursor position for spotlight effect
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Dynamic grid placement for Bento layout
  const gridClass = getGridClass(index, reference.featured);

  return (
    <div
      ref={cardRef}
      className={`
        reference-card
        ${gridClass}
        relative
        overflow-hidden
        rounded-large
        cursor-pointer
        group
        [transform-style:preserve-3d]
        [perspective:1000px]
      `}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="reference-image relative w-full h-[120%] -translate-y-[10%]">
          <Image
            src={reference.image}
            alt={reference.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Spotlight Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-fast"
          style={{
            background: `radial-gradient(circle 200px at ${cursorPos.x}px ${cursorPos.y}px, rgba(136, 192, 177, 0.15), transparent 70%)`,
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-gap-standard flex flex-col justify-end z-10">
        {/* Animated Stats Badge */}
        <div 
          className="
            mb-gap-small 
            opacity-0 
            group-hover:opacity-100 
            transform 
            translate-y-4 
            group-hover:translate-y-0
            transition-all 
            duration-base
          "
        >
          <div className="inline-flex items-center gap-gap-tiny bg-brand-green-mid/20 backdrop-blur-sm px-gap-small py-gap-tiny rounded-medium border border-brand-green-mid/30">
            <div className="w-2 h-2 rounded-full bg-brand-green-mid animate-pulse" />
            <span className="text-body-small text-white font-bold">
              {reference.units} Einheiten
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-h3 font-light text-white mb-gap-tiny transform transition-transform duration-base group-hover:translate-x-2">
          {reference.name}
        </h3>

        {/* Location & Year */}
        <div className="flex items-center gap-gap-small text-body-small text-white/70">
          <span>{reference.location}</span>
          <span className="w-1 h-1 rounded-full bg-brand-green-mid" />
          <span>{reference.year}</span>
        </div>

        {/* Hover CTA */}
        <div 
          className="
            mt-gap-small 
            opacity-0 
            group-hover:opacity-100
            transform 
            translate-y-4 
            group-hover:translate-y-0
            transition-all 
            duration-base 
            delay-75
          "
        >
          <div className="inline-flex items-center gap-gap-tiny text-brand-green-mid text-body-small font-bold">
            <span>Projekt ansehen</span>
            <svg 
              className="w-4 h-4 transform transition-transform duration-fast group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Glassmorphism Overlay on Hover */}
      <div className="absolute inset-0 bg-brand-blue-dark/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-slow" />
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          // Animate count
          const target = parseInt(number.replace(/\D/g, ''));
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          setHasAnimated(true);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, [number, hasAnimated]);

  return (
    <div
      ref={statRef}
      className="p-gap-standard bg-dark-bg-section/50 backdrop-blur-sm rounded-large border border-brand-green-mid/20"
    >
      <div className="text-h2 font-light text-brand-green-mid mb-gap-tiny">
        {count}
        {number.includes('+') && '+'}
        {number.includes('%') && '%'}
      </div>
      <div className="text-body-regular text-white/70">{label}</div>
    </div>
  );
}

// Helper function for dynamic Bento grid layout
function getGridClass(index: number, featured?: boolean): string {
  // Featured card (Mihla) - Large
  if (featured || index === 0) {
    return 'col-span-full md:col-span-4 lg:col-span-5 row-span-2';
  }

  // Alternating sizes for visual interest
  const patterns = [
    'col-span-full md:col-span-2 lg:col-span-4 row-span-1',
    'col-span-full md:col-span-2 lg:col-span-3 row-span-1',
    'col-span-full md:col-span-3 lg:col-span-7 row-span-2',
    'col-span-full md:col-span-3 lg:col-span-5 row-span-1',
  ];

  return patterns[(index - 1) % patterns.length];
}


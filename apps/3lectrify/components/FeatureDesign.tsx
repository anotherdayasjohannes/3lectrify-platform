'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureDesignProps {
  title?: string;
  description?: string;
  avatars?: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export default function FeatureDesign({
  title = 'Design',
  description = 'Create stunning interfaces with our visual design tools',
  avatars = [
    { id: '1', name: 'Designer 1', imageUrl: '/images/avatar-1.png' },
    { id: '2', name: 'Designer 2', imageUrl: '/images/avatar-2.png' },
    { id: '3', name: 'Designer 3', imageUrl: '/images/avatar-3.png' },
  ],
}: FeatureDesignProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const section = sectionRef.current;
    const card = cardRef.current;
    const cursor = cursorRef.current;
    const pill = pillRef.current;

    if (!section || !card || !cursor || !pill) return;

    // Create a GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Main card slide-in + fade-in animation
      gsap.fromTo(
        card,
        {
          opacity: 0.25,
          x: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
        }
      );

      // Cursor animation - floating effect
      gsap.to(cursor, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Cursor hue rotation for rainbow effect
      gsap.to(cursor, {
        filter: 'hue-rotate(360deg)',
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

      // Pill tooltip pulse animation
      gsap.to(pill, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Stagger animation for avatars
      gsap.fromTo(
        '.avatar-item',
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 60%',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert(); // Cleanup all animations
    };
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      id="feat-design"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px] overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black pointer-events-none" />

      {/* Radial gradient spotlight - Responsive size */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main content card */}
      <div
        ref={cardRef}
        className="relative max-w-4xl w-full bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Top Bar - Mobile-first */}
        <div className="border-b border-white/8 bg-neutral-950/50 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left side - traffic lights */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Center - title - Responsive */}
            <div className="flex-1 flex justify-center">
              <span className="text-xs md:text-sm text-white/60 font-medium truncate px-2">
                {title}
              </span>
            </div>

            {/* Right side - team avatars - Responsive */}
            <div className="flex -space-x-1 md:-space-x-2">
              {avatars.slice(0, 3).map((avatar, index) => (
                <div
                  key={avatar.id}
                  className="avatar-item w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-neutral-800 ring-1 md:ring-2 ring-neutral-900 overflow-hidden relative"
                  style={{ zIndex: avatars.length - index }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] md:text-xs font-bold">
                    {avatar.name.charAt(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area - Mobile-first padding */}
        <div className="relative p-5 md:p-6 lg:p-8">
          {/* Grid background - Responsive grid size */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10">
            {/* Responsive heading: 20px mobile → 24px tablet → 32px desktop */}
            <h3 className="text-[20px] leading-[28px] md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
              {title}
            </h3>
            {/* Responsive description: 14px mobile → 16px tablet → 18px desktop */}
            <p className="text-white/60 text-[14px] leading-[22px] md:text-base md:leading-[24px] lg:text-lg lg:leading-[28px] mb-6 md:mb-8 max-w-2xl">
              {description}
            </p>

            {/* Feature mockup placeholder - Responsive height */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-lg md:rounded-xl p-4 md:p-6 h-48 md:h-56 lg:h-64 flex items-center justify-center">
              <div className="text-center">
                {/* Responsive icon: 48px mobile → 64px desktop */}
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4 bg-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <p className="text-white/40 text-xs md:text-sm">
                  Replace with your design mockup
                </p>
              </div>
            </div>
          </div>

          {/* Animated cursor - Hide on mobile, show on desktop */}
          <div
            ref={cursorRef}
            className="hidden lg:block absolute top-32 right-20 pointer-events-none"
            style={{ willChange: 'transform, filter' }}
          >
            {/* Cursor pointer SVG */}
            <svg
              width="24"
              height="28"
              viewBox="0 0 16 24"
              className="fill-white drop-shadow-lg"
            >
              <path d="M0 0 L0 18 L6 12 L10 20 L12 19 L8 11 L16 10 Z" />
            </svg>

            {/* Tooltip pill */}
            <div
              ref={pillRef}
              className="absolute top-8 left-8 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap"
              style={{ willChange: 'transform' }}
            >
              ✨ {title}
            </div>
          </div>
        </div>

        {/* Bottom bar with stats - Mobile-first */}
        <div className="border-t border-white/8 bg-neutral-950/50 px-4 py-2 md:px-6 md:py-3">
          <div className="flex items-center justify-between text-[10px] md:text-xs text-white/40 gap-2">
            <span className="truncate">Last edited 2 min ago</span>
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <span className="hidden sm:flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Auto-save on
              </span>
              <span className="whitespace-nowrap">{avatars.length} collaborators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

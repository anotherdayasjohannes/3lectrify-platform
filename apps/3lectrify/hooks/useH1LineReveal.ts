'use client';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useRef } from 'react';

// Register SplitText plugin
gsap.registerPlugin(SplitText);

interface LineRevealOptions {
  stagger?: number;
  duration?: number;
  yDistance?: number;
  delay?: number;
  ease?: string;
}

/**
 * React 19 + Next.js 15 compatible hook for H1 line animations
 * Uses GSAP SplitText to split headlines into lines and animate them
 * Handles nested HTML tags and emojis automatically
 */
export function useH1LineReveal(options: LineRevealOptions = {}) {
  const {
    stagger = 0.12,
    duration = 0.8,
    yDistance = 40,
    delay = 0.2,
    ease = '3lectrifyCinematic'
  } = options;

  const elementRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Split text into lines (preserves nested HTML + emojis)
    const split = new SplitText(elementRef.current, {
      type: 'lines',
      linesClass: 'line-wrapper'
    });

    // Setup Intersection Observer for viewport trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate lines in sequence
            gsap.from(split.lines, {
              opacity: 0,
              y: yDistance,
              duration,
              stagger,
              delay,
              ease,
              onComplete: () => {
                // Clean up SplitText wrappers after animation
                split.revert();
              }
            });
            
            // Only animate once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px'
      }
    );

    observer.observe(elementRef.current);

    // useGSAP automatically handles cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, { scope: elementRef });

  return elementRef;
}


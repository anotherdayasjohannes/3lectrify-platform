'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

/**
 * Custom hook for scroll-triggered reveal animations
 *
 * @example
 * ```tsx
 * const ref = useScrollReveal({
 *   from: { opacity: 0, x: 50 },
 *   to: { opacity: 1, x: 0 },
 *   scrub: 1,
 * });
 *
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T>(null);

  const {
    start = 'top 75%',
    end = 'top 25%',
    scrub = 1,
    markers = false,
    once = false,
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(element, from, {
        ...to,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          markers,
          once,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [start, end, scrub, markers, once, from, to]);

  return elementRef;
}

/**
 * Custom hook for stagger animations on child elements
 */
export function useStaggerReveal<T extends HTMLElement>(
  selector: string,
  options: {
    stagger?: number;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    start?: string;
  } = {}
) {
  const containerRef = useRef<T>(null);

  const {
    stagger = 0.1,
    from = { opacity: 0, y: 20 },
    to = { opacity: 1, y: 0 },
    start = 'top 75%',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        from,
        {
          ...to,
          stagger,
          scrollTrigger: {
            trigger: container,
            start,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [selector, stagger, from, to, start]);

  return containerRef;
}

/**
 * Custom hook for parallax scroll effects
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.5,
  options: { start?: string; end?: string } = {}
) {
  const elementRef = useRef<T>(null);

  const { start = 'top bottom', end = 'bottom top' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: (i, target) => {
          return -ScrollTrigger.maxScroll(window) * speed;
        },
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed, start, end]);

  return elementRef;
}

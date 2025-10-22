'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASINGS } from '../easings/custom';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Try to import SplitText, but provide fallback
let SplitText: any = null;
try {
  // @ts-ignore - SplitText might not be available
  const module = require('gsap/SplitText');
  SplitText = module.SplitText;
  if (typeof window !== 'undefined' && SplitText) {
    gsap.registerPlugin(SplitText);
  }
} catch (e) {
  // SplitText not available, will use custom splitting
}

/**
 * Custom word splitting (fallback when SplitText not available)
 */
function customSplitWords(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || '';
  const words = text.split(/\s+/).filter(word => word.length > 0);
  
  // Clear element
  element.innerHTML = '';
  
  // Create spans for each word
  const wordElements: HTMLElement[] = [];
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'pre-wrap';
    element.appendChild(span);
    
    // Add space after word (except last)
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
    
    wordElements.push(span);
  });
  
  return wordElements;
}

export interface ScrollTextRevealOptions {
  /**
   * Split by 'words', 'chars', or 'lines'
   * @default 'words'
   */
  split?: 'words' | 'chars' | 'lines';
  
  /**
   * Delay between each element (stagger)
   * @default 0.05
   */
  stagger?: number;
  
  /**
   * Animation duration for each element
   * @default 0.4
   */
  duration?: number;
  
  /**
   * Distance to animate from (y-axis)
   * @default 15
   */
  yDistance?: number;
  
  /**
   * Easing function
   * Uses 3lectrifyFastOut if available, falls back to power2.out
   * @default '3lectrifyFastOut' or 'power2.out'
   */
  ease?: string;
  
  /**
   * ScrollTrigger start position
   * @default 'top 80%'
   */
  triggerStart?: string;
  
  /**
   * Trigger animation only once
   * @default true
   */
  once?: boolean;
  
  /**
   * Add markers for debugging
   * @default false
   */
  markers?: boolean;
}

/**
 * Custom hook for scroll-triggered GSAP SplitText animations
 * Creates subtle word-by-word reveals when scrolling into view
 * Perfect for section headlines!
 * 
 * @example
 * ```tsx
 * const headlineRef = useScrollTextReveal({ stagger: 0.05, yDistance: 15 });
 * return <h2 ref={headlineRef}>Your Section Headline</h2>;
 * ```
 */
export function useScrollTextReveal(options: ScrollTextRevealOptions = {}) {
  const {
    split = 'words',
    stagger = 0.05,
    duration = 0.4,
    yDistance = 15,
    ease = EASINGS.text, // ✨ Uses 3lectrifyFastOut if available
    triggerStart = 'top 80%',
    once = true,
    markers = false,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const splitTextRef = useRef<any>(null);
  const originalContentRef = useRef<string>('');
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Store original content for cleanup
    originalContentRef.current = elementRef.current.innerHTML;

    // Check for reduced motion preference
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (shouldReduceMotion) {
      // Skip animation, just show text
      return;
    }

    let elements: HTMLElement[] = [];

    // Use SplitText if available, otherwise use custom splitting
    if (SplitText && split === 'words') {
      splitTextRef.current = new SplitText(elementRef.current, {
        type: split,
        linesClass: 'split-line',
      });
      elements = splitTextRef.current.words || [];
    } else {
      // Custom fallback for word splitting
      if (split === 'words') {
        elements = customSplitWords(elementRef.current);
      } else {
        console.warn(`Custom splitting only supports 'words'. Falling back to 'words'.`);
        elements = customSplitWords(elementRef.current);
      }
    }

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: yDistance,
      willChange: 'transform, opacity',
    });

    // Create scroll-triggered animation
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: elementRef.current,
      start: triggerStart,
      once: once,
      markers: markers,
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease,
          onComplete: () => {
            // Clean up will-change after animation
            gsap.set(elements, { willChange: 'auto' });
          }
        });
      },
      // If not "once", animate out when leaving
      ...(once ? {} : {
        onLeave: () => {
          gsap.to(elements, {
            opacity: 0,
            y: yDistance,
            duration: duration * 0.5,
            stagger: stagger * 0.5,
            ease: 'power2.in',
          });
        },
        onEnterBack: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease,
          });
        },
      }),
    });

    // Cleanup
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (splitTextRef.current && splitTextRef.current.revert) {
        splitTextRef.current.revert();
      } else if (elementRef.current && originalContentRef.current) {
        // Restore original HTML for custom split
        elementRef.current.innerHTML = originalContentRef.current;
      }
    };
  }, [split, stagger, duration, yDistance, ease, triggerStart, once, markers]);

  return elementRef;
}


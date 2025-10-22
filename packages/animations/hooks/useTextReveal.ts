'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
  console.log('Using custom text splitting (SplitText plugin not available)');
}

export interface TextRevealOptions {
  /**
   * Split by 'words', 'chars', or 'lines'
   * @default 'words'
   */
  split?: 'words' | 'chars' | 'lines';
  
  /**
   * Delay between each element (stagger)
   * @default 0.08
   */
  stagger?: number;
  
  /**
   * Animation duration for each element
   * @default 0.6
   */
  duration?: number;
  
  /**
   * Distance to animate from (y-axis)
   * @default 30
   */
  yDistance?: number;
  
  /**
   * Easing function
   * @default 'power3.out'
   */
  ease?: string;
  
  /**
   * Delay before animation starts
   * @default 0.2
   */
  delay?: number;
  
  /**
   * Trigger animation only once
   * @default true
   */
  once?: boolean;
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

/**
 * Custom hook for GSAP SplitText animations
 * Creates stunning word-by-word or character-by-character reveals
 * 
 * @example
 * ```tsx
 * const textRef = useTextReveal({ split: 'words', stagger: 0.1 });
 * return <h1 ref={textRef}>Your Amazing Headline</h1>;
 * ```
 */
export function useTextReveal(options: TextRevealOptions = {}) {
  const {
    split = 'words',
    stagger = 0.08,
    duration = 0.6,
    yDistance = 30,
    ease = 'power3.out',
    delay = 0.2,
    once = true,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const splitTextRef = useRef<any>(null);
  const originalContentRef = useRef<string>('');

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

    // Animate in
    const tl = gsap.timeline({ delay });
    
    tl.to(elements, {
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

    // Cleanup
    return () => {
      if (splitTextRef.current && splitTextRef.current.revert) {
        splitTextRef.current.revert();
      } else if (elementRef.current && originalContentRef.current) {
        // Restore original HTML for custom split
        elementRef.current.innerHTML = originalContentRef.current;
      }
      tl.kill();
    };
  }, [split, stagger, duration, yDistance, ease, delay, once]);

  return elementRef;
}


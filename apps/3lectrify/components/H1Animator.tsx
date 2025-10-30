'use client';

import { useEffect, useRef } from 'react';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Global H1 animator component for Next.js 15 + React 19
 * Finds all H1 elements and applies line-by-line reveal animations
 * Handles nested HTML tags and emojis automatically
 */
export function H1Animator() {
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Prevent double animation in React strict mode
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Wait for DOM to be ready
    const animateH1s = () => {
      const h1Elements = document.querySelectorAll('h1');
      
      h1Elements.forEach((h1) => {
        // Skip if already animated
        if (h1.getAttribute('data-animated') === 'true') return;
        h1.setAttribute('data-animated', 'true');

        // Split into lines (automatically handles nested HTML + emojis)
        const split = new SplitText(h1, {
          type: 'lines',
          linesClass: 'line-wrapper'
        });

        // Animate with ScrollTrigger
        gsap.from(split.lines, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: '3lectrifyCinematic',
          scrollTrigger: {
            trigger: h1,
            start: 'top 80%',
            once: true,
            onComplete: () => {
              // Clean up SplitText wrappers after animation
              split.revert();
            }
          }
        });
      });
    };

    // Animate immediately
    animateH1s();

    // Re-animate when navigation changes (for dynamic content)
    const observer = new MutationObserver(() => {
      animateH1s();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // This component renders nothing (just side effects)
  return null;
}


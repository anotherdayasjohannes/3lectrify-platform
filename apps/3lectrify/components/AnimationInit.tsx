'use client';

import { useEffect } from 'react';
import { init3lectrifyEasings } from '@3lectrify/animations';

/**
 * Initialize 3lectrify custom easing curves
 * Must run once during app initialization
 */
export function AnimationInit() {
  useEffect(() => {
    // Initialize custom easings on client-side
    const hasCustom = init3lectrifyEasings();
    
    if (hasCustom) {
      console.log('✨ 3lectrify animations: CustomEase loaded!');
    } else {
      console.log('⚡ 3lectrify animations: Using fallback easings');
    }
  }, []);

  return null; // This component doesn't render anything
}


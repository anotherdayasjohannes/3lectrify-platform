import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

/**
 * Sanity Image URL Builder
 * Handles image transformations, hotspot, and crop
 */
const builder = imageUrlBuilder(client);

export interface SanityImageSource {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/**
 * Get optimized image URL from Sanity with hotspot/crop applied
 * @param source - Sanity image object with asset, hotspot, and crop
 * @returns Image URL builder instance
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get focal point CSS object-position from Sanity hotspot
 * Use this for Next.js Image components when you want manual control
 * @param hotspot - Sanity hotspot data
 * @returns CSS object-position string (e.g., "50% 50%")
 */
export function getFocalPoint(hotspot?: {
  x: number;
  y: number;
  height: number;
  width: number;
}): string {
  if (!hotspot) return 'center';
  
  // Sanity hotspot: x and y are 0-1 values (0 = left/top, 1 = right/bottom)
  const x = Math.round(hotspot.x * 100);
  const y = Math.round(hotspot.y * 100);
  
  return `${x}% ${y}%`;
}

/**
 * Helper to get image props for Next.js Image component
 * Includes optimized URL with hotspot/crop applied
 */
export function getImageProps(
  source: SanityImageSource,
  width?: number,
  height?: number,
  quality: number = 90
) {
  if (!source?.asset) {
    return null;
  }

  const urlBuilder = urlForImage(source);
  
  // Apply dimensions if provided
  if (width) urlBuilder.width(width);
  if (height) urlBuilder.height(height);
  
  // Apply quality
  urlBuilder.quality(quality);
  
  // Auto format (WebP when supported)
  urlBuilder.auto('format');
  
  return {
    src: urlBuilder.url(),
    // Focal point as fallback for CSS
    style: source.hotspot ? { objectPosition: getFocalPoint(source.hotspot) } : undefined,
  };
}


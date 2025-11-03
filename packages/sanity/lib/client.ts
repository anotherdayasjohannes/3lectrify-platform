import { createClient } from 'next-sanity';

/**
 * Standard Sanity client for published content
 * Uses CDN in production for better performance
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Client with read token for draft content
 * Used during preview/draft mode to fetch unpublished content
 */
export const clientWithToken = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Never use CDN for draft content
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts', // Fetch draft content
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
});

/**
 * Get the appropriate client based on draft mode
 * @param isDraftMode - Whether Next.js draft mode is enabled
 */
export function getClient(isDraftMode = false) {
  return isDraftMode ? clientWithToken : client;
}

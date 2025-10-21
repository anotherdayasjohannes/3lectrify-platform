// Sanity client and utilities
export { client } from './lib/client';

// Image utilities
export { urlForImage, getFocalPoint, getImageProps } from './lib/imageUtils';
export type { SanityImageSource } from './lib/imageUtils';

// Queries
export { pageQuery, allPagesQuery } from './queries/pages';
export { siteSettingsQuery } from './queries/siteSettings';
export { getAllReferences, getReferenceById, getFeaturedReferences } from './queries/references';
export { legalPageQuery, allLegalPagesQuery } from './queries/legalPages';

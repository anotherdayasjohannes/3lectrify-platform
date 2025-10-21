import { client } from '../lib/client';

/**
 * Fetch all reference projects
 * Ordered by featured first, then by year (newest first)
 */
export async function getAllReferences() {
  return client.fetch(
    `*[_type == "referenceProject"] | order(featured desc, year desc) {
      _id,
      name,
      location,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "imageMetadata": image.asset->metadata {
        dimensions {
          width,
          height
        }
      },
      hotspot,
      crop,
      units,
      year,
      type,
      featured,
      description,
      link
    }`
  );
}

/**
 * Fetch a specific reference by ID
 */
export async function getReferenceById(id: string) {
  return client.fetch(
    `*[_type == "referenceProject" && _id == $id][0] {
      _id,
      name,
      location,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "imageMetadata": image.asset->metadata {
        dimensions {
          width,
          height
        }
      },
      hotspot,
      crop,
      units,
      year,
      type,
      featured,
      description,
      link
    }`,
    { id }
  );
}

/**
 * Fetch featured references only
 */
export async function getFeaturedReferences() {
  return client.fetch(
    `*[_type == "referenceProject" && featured == true] | order(year desc) {
      _id,
      name,
      location,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "imageMetadata": image.asset->metadata {
        dimensions {
          width,
          height
        }
      },
      hotspot,
      crop,
      units,
      year,
      type,
      featured,
      description,
      link
    }`
  );
}


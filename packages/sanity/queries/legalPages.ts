import { groq } from 'next-sanity';

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description,
    heroHeadline,
    heroSubheadline,
    heroBackgroundImage {
      asset-> {
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      hotspot,
      crop,
      alt
    },
    gradientDirection,
    heroHeight,
    iframeUrl
  }
`;

export const allLegalPagesQuery = groq`
  *[_type == "legalPage"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;




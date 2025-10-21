import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    logo {
      asset-> {
        url
      },
      hotspot,
      crop,
      alt
    },
    navigation[] {
      label,
      href,
      isExternal,
      order
    } | order(order asc),
    footerHeadline,
    footerNewsletter,
    footerNavigation[] {
      label,
      href,
      isExternal,
      order
    } | order(order asc),
    legalLinks[] {
      label,
      href,
      isExternal
    },
    copyrightText
  }
`;


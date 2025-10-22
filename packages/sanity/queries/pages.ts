import { groq } from 'next-sanity';

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    description,
    content[] {
      _type,
      _type == "hero" => {
        headline,
        subtext,
        showImage,
        heroImage {
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
        imagePosition,
        enableParallax,
        parallaxImages[] {
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
          alt,
          perspective
        },
        parallaxEffect
      },
      _type == "heroGradient" => {
        headline,
        subheadline,
        backgroundImage {
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
        sectionHeight
      },
      _type == "featureCards" => {
        sectionHeadline,
        sectionDescription,
        cards[] {
          _key,
          icon {
            asset-> {
              url
            },
            hotspot,
            crop,
            alt
          },
          title,
          description
        }
      },
      _type == "textImage" => {
        headline,
        body,
        quote {
          text,
          author,
          icon {
            asset-> {
              url
            },
            hotspot,
            crop,
            alt
          }
        },
        stats[] {
          _key,
          value,
          description,
          accentColor
        },
        image {
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
        imagePosition,
        variant,
        fullWidth
      },
      _type == "simpleTextImage" => {
        headline,
        body,
        image {
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
        variant
      },
      _type == "stats" => {
        stats[] {
          _key,
          value,
          description,
          accentColor
        },
        layout,
        variant
      },
      _type == "cta" => {
        headline,
        description,
        buttonText,
        buttonLink,
        openInNewTab
      },
      _type == "featureShowcase" => {
        sectionHeadline,
        sectionIntro,
        features[] {
          _key,
          number,
          title,
          heading,
          description,
          icon {
            asset-> {
              url
            },
            hotspot,
            crop,
            alt
          }
        }
      },
      _type == "stackedExplainer" => {
        sectionHeadline,
        sectionIntro,
        cards[] {
          _key,
          number,
          title,
          heading,
          description,
          icon {
            asset-> {
              url
            },
            hotspot,
            crop,
            alt
          },
          backgroundImage {
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
          }
        }
      },
      _type == "references" => {
        headline,
        description,
        selectedReferences[]-> {
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
        },
        variant,
        theme,
        showStats
      },
      _type == "teamGrid" => {
        heading,
        introText,
        teamMembers[]-> {
          _id,
          name,
          title,
          "photo": {
            "url": photo.asset->url,
            "alt": photo.alt,
            "width": photo.asset->metadata.dimensions.width,
            "height": photo.asset->metadata.dimensions.height,
            "hotspot": photo.hotspot
          },
          bio,
          linkedinUrl,
          email
        }
      },
      _type == "contactSimple" => {
        headline,
        subheadline,
        formHeadline,
        labels {
          firstname,
          lastname,
          company,
          email,
          phone,
          message,
          button,
          privacy,
          privacyLink
        },
        address {
          headline,
          companyName,
          addressLine2,
          street,
          postalCode,
          city,
          email,
          phone,
          mapsLinkText
        },
        successMessage
      }
    },
    publishedAt
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt
  }
`;

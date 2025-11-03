import { getClient, pageQuery } from '@3lectrify/sanity';
import { Hero, FeatureCards, FeatureShowcase, StackedExplainer, TextImage, SimpleTextImage, Stats, CTA, ReferencesGrid, ReferencesMarquee, TeamGrid, LottieAnimationWrapper, VideoAnimation } from '@/components';
import { draftMode } from 'next/headers';
import type { PortableTextBlock } from '@portabletext/react';

// Revalidate this page every hour (3600 seconds) as a fallback
// Primary updates come from webhook-based on-demand revalidation
export const revalidate = 3600;

interface SanityBlock {
  _type: string;
  headline?: string;
  heading?: string;
  subtext?: PortableTextBlock[];
  body?: PortableTextBlock[];
  showImage?: boolean;
  heroImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
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
    alt?: string;
  };
  image?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
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
    alt?: string;
  };
  imagePosition?: 'above' | 'side' | 'left' | 'right';
  enableParallax?: boolean;
  parallaxImages?: Array<{
    asset?: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
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
    alt?: string;
    perspective?: string;
  }>;
  parallaxEffect?: 'mouse' | 'autoRotate' | 'layered';
  sectionHeadline?: string;
  sectionDescription?: string;
  cards?: Array<{
    _key: string;
    icon?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    title: string;
    description?: string | PortableTextBlock[];
    // StackedExplainer additional fields (optional for FeatureCards)
    number?: string;
    heading?: string;
    backgroundImage?: {
      asset?: {
        url: string;
        metadata?: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
      alt?: string;
    };
  }>;
  quote?: {
    text: string;
    author?: string;
    icon?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
  };
  stats?: Array<{
    _key: string;
    value: string;
    description: string;
    accentColor?: 'green' | 'orange' | 'blue' | 'curry';
  }>;
  layout?: 'horizontal' | 'grid';
  variant?: 'light' | 'dark';
  fullWidth?: boolean;
  description?: string | PortableTextBlock[];
  buttonText?: string;
  buttonLink?: string;
  openInNewTab?: boolean;
  sectionIntro?: PortableTextBlock[];
  // StackedExplainer CTA fields
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
  features?: Array<{
    _key: string;
    number: string;
    title: string;
    heading: string;
    description?: PortableTextBlock[];
    icon?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
  }>;
  selectedReferences?: Array<{
    _id: string;
    name: string;
    location: string;
    image: string;
    imageAlt?: string;
    imageMetadata?: {
      dimensions: {
        width: number;
        height: number;
      };
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
    units: number;
    year: string;
    type: 'residential' | 'commercial' | 'mixed';
    featured?: boolean;
    description?: string;
    link?: string;
  }>;
  theme?: 'light' | 'dark';
  showStats?: boolean;
  // Team Grid
  teamMembers?: Array<{
    _id: string;
    name: string;
    title: string;
    photo: {
      url: string;
      alt: string;
      width: number;
      height: number;
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
    };
    bio?: string;
    linkedinUrl?: string;
    email?: string;
  }>;
  introText?: PortableTextBlock[];
  // Lottie Animation fields
  animationFile?: {
    asset?: {
      url: string;
    };
  };
  speed?: number;
  // Video Animation fields
  videoFile?: {
    asset?: {
      url: string;
    };
  };
  posterImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    hotspot?: {
      x: number;
      y: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    alt?: string;
  };
  loop?: boolean;
  muted?: boolean;
  maxWidth?: string;
}

async function getHomePage() {
  const { isEnabled: isDraftMode } = await draftMode();
  const client = getClient(isDraftMode);
  const page = await client.fetch(pageQuery, { slug: 'home' });
  return page;
}

export default async function HomePage() {
  const page = await getHomePage();

  if (!page) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p>Create a page with slug &quot;home&quot; in Sanity Studio</p>
      </div>
    );
  }

  return (
    <main>
      {page.content?.map((block: SanityBlock, index: number) => {
        switch (block._type) {
          case 'hero':
            return (
              <Hero
                key={index}
                headline={block.headline}
                subtext={block.subtext}
                showImage={block.showImage}
                heroImage={
                  block.showImage && block.heroImage?.asset
                    ? {
                        url: block.heroImage.asset.url,
                        alt: block.heroImage.alt || '',
                        width: block.heroImage.asset.metadata?.dimensions.width || 1200,
                        height: block.heroImage.asset.metadata?.dimensions.height || 630,
                        hotspot: block.heroImage.hotspot,
                      }
                    : undefined
                }
                imagePosition={block.imagePosition as 'above' | 'side'}
                enableParallax={block.enableParallax}
                parallaxImages={
                  block.enableParallax && block.parallaxImages
                    ? block.parallaxImages.map((img) => ({
                        url: img.asset?.url || '',
                        alt: img.alt || '',
                        width: img.asset?.metadata?.dimensions.width || 1200,
                        height: img.asset?.metadata?.dimensions.height || 630,
                        hotspot: img.hotspot,
                        perspective: img.perspective || 'Center',
                      }))
                    : undefined
                }
                parallaxEffect={block.parallaxEffect}
              />
            );

          case 'featureCards':
            return (
              <FeatureCards
                key={index}
                sectionHeadline={block.sectionHeadline}
                sectionDescription={block.sectionDescription}
                cards={
                  block.cards?.map((card) => ({
                    _key: card._key,
                    icon: card.icon?.asset
                      ? {
                          url: card.icon.asset.url,
                          alt: card.icon.alt || '',
                        }
                      : undefined,
                    title: card.title,
                    description: typeof card.description === 'string' ? card.description : undefined,
                  })) || []
                }
              />
            );

          case 'textImage':
            return (
              <TextImage
                key={index}
                headline={block.headline}
                body={block.body}
                quote={
                  block.quote
                    ? {
                        text: block.quote.text,
                        author: block.quote.author,
                        icon: block.quote.icon?.asset
                          ? {
                              url: block.quote.icon.asset.url,
                              alt: block.quote.icon.alt || 'Quote',
                            }
                          : undefined,
                      }
                    : undefined
                }
                stats={block.stats}
                image={
                  block.image?.asset
                    ? {
                        url: block.image.asset.url,
                        alt: block.image.alt || '',
                        width: block.image.asset.metadata?.dimensions.width || 1200,
                        height: block.image.asset.metadata?.dimensions.height || 630,
                        hotspot: block.image.hotspot,
                      }
                    : undefined
                }
                imagePosition={block.imagePosition as 'left' | 'right'}
                variant={block.variant}
                fullWidth={block.fullWidth}
              />
            );

          case 'simpleTextImage':
            return (
              <SimpleTextImage
                key={index}
                headline={block.headline}
                body={block.body}
                image={
                  block.image?.asset
                    ? {
                        url: block.image.asset.url,
                        alt: block.image.alt || '',
                        width: block.image.asset.metadata?.dimensions.width || 645,
                        height: block.image.asset.metadata?.dimensions.height || 429,
                        hotspot: block.image.hotspot,
                      }
                    : undefined
                }
                variant={block.variant}
              />
            );

          case 'stats':
            return (
              <Stats
                key={index}
                stats={block.stats || []}
                layout={block.layout}
                variant={block.variant}
              />
            );

          case 'cta':
          return (
            <CTA
              key={index}
              headline={block.headline}
              description={block.description}
              buttonText={block.buttonText || ''}
              buttonLink={block.buttonLink || ''}
              openInNewTab={block.openInNewTab}
            />
          );

          case 'featureShowcase':
            return (
              <FeatureShowcase
                key={index}
                sectionHeadline={block.sectionHeadline}
                sectionIntro={block.sectionIntro}
                features={
                  block.features?.map((feature) => ({
                    _key: feature._key,
                    number: feature.number,
                    title: feature.title,
                    heading: feature.heading,
                    description: feature.description,
                    icon: feature.icon?.asset
                      ? {
                          url: feature.icon.asset.url,
                          alt: feature.icon.alt || '',
                        }
                      : undefined,
                  })) || []
                }
              />
            );

          case 'stackedExplainer':
            return (
              <StackedExplainer
                key={index}
                sectionHeadline={block.sectionHeadline}
                sectionIntro={block.sectionIntro}
                cards={
                  block.cards?.map((card) => ({
                    _key: card._key,
                    number: card.number || '',
                    title: card.title,
                    heading: card.heading || '',
                    description: Array.isArray(card.description) ? card.description : undefined,
                    icon: card.icon?.asset
                      ? {
                          url: card.icon.asset.url,
                          alt: card.icon.alt || '',
                        }
                      : undefined,
                    backgroundImage: card.backgroundImage?.asset
                      ? {
                          url: card.backgroundImage.asset.url,
                          alt: card.backgroundImage.alt || '',
                          width: card.backgroundImage.asset.metadata?.dimensions.width || 1200,
                          height: card.backgroundImage.asset.metadata?.dimensions.height || 800,
                        }
                      : undefined,
                  })) || []
                }
                ctaText={block.ctaText}
                ctaButtonLabel={block.ctaButtonLabel}
                ctaButtonLink={block.ctaButtonLink}
              />
            );

          case 'references':
            const references = block.selectedReferences?.map((ref) => ({
              id: ref._id,
              name: ref.name,
              location: ref.location,
              image: ref.image,
              units: ref.units,
              year: ref.year,
              type: ref.type,
              featured: ref.featured,
            })) || [];

            if ((block.variant as 'grid' | 'marquee') === 'marquee') {
              return (
                <ReferencesMarquee
                  key={index}
                  references={references}
                  speed="normal"
                  headline={block.headline}
                  subtext={typeof block.description === 'string' ? block.description : undefined}
                />
              );
            }

            return (
              <ReferencesGrid
                key={index}
                references={references}
                theme={block.theme || 'dark'}
                headline={block.headline}
                subtext={typeof block.description === 'string' ? block.description : undefined}
              />
            );

          case 'teamGrid':
            return (
              <TeamGrid
                key={index}
                heading={block.heading}
                introText={block.introText}
                teamMembers={block.teamMembers || []}
              />
            );

          case 'lottieAnimation':
            // Fetch the animation JSON data
            const animationUrl = block.animationFile?.asset?.url;
            if (!animationUrl) return null;

            return (
              <LottieAnimationWrapper
                key={index}
                headline={block.headline}
                description={typeof block.description === 'string' ? block.description : undefined}
                animationUrl={animationUrl}
                loop={block.loop !== false}
                speed={block.speed || 1}
                maxWidth={block.maxWidth || '800px'}
                variant={(block.variant as 'light' | 'dark') || 'dark'}
              />
            );

          case 'videoAnimation':
            const videoUrl = block.videoFile?.asset?.url;
            if (!videoUrl) return null;

            return (
              <VideoAnimation
                key={index}
                headline={block.headline}
                description={typeof block.description === 'string' ? block.description : undefined}
                videoUrl={videoUrl}
                posterUrl={block.posterImage?.asset?.url}
                posterAlt={block.posterImage?.alt || ''}
                loop={block.loop !== false}
                muted={block.muted !== false}
                maxWidth={block.maxWidth || '800px'}
                variant={(block.variant as 'light' | 'dark') || 'dark'}
              />
            );

          default:
            return null;
        }
      })}
    </main>
  );
}


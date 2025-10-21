import { client, pageQuery } from '@3lectrify/sanity';
import { Hero, FeatureCards, TextImage, SimpleTextImage, Stats, CTA, ReferencesGrid, ReferencesMarquee, TeamGrid } from '@3lectrify/ui';
import type { PortableTextBlock } from '@portabletext/react';

interface SanityBlock {
  _type: string;
  headline?: string;
  subtext?: PortableTextBlock[];
  showImage?: boolean;
  heroImage?: {
    asset: {
      url: string;
      metadata: {
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
    alt: string;
  };
  imagePosition?: 'left' | 'right' | 'above' | 'side';
  sectionHeadline?: string;
  sectionDescription?: string;
  cards?: Array<{
    _key: string;
    icon?: {
      asset: {
        url: string;
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
      alt: string;
    };
    title: string;
    description: string;
  }>;
  body?: PortableTextBlock[];
  quote?: {
    text: string;
    author: string;
    role?: string;
    icon?: {
      asset: {
        url: string;
      };
      alt: string;
    };
  };
  stats?: Array<{
    _key: string;
    value: string;
    label: string;
  }>;
  description?: any; // PortableText content
  buttonText?: string;
  buttonLink?: string;
  openInNewTab?: boolean;
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
      };
    };
    bio?: string;
    linkedinUrl?: string;
    email?: string;
  }>;
  introText?: PortableTextBlock[];
  image?: {
    asset: {
      url: string;
      metadata: {
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
    alt: string;
  };
  variant?: 'light' | 'dark';
}

async function getUeberUnsPage() {
  const page = await client.fetch(pageQuery, { slug: 'ueber-uns' });
  return page;
}

export default async function UeberUnsPage() {
  const page = await getUeberUnsPage();

  if (!page) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p>Create a page with slug &quot;ueber-uns&quot; in Sanity Studio</p>
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
                    icon: card.icon?.asset
                      ? {
                          url: card.icon.asset.url,
                          alt: card.icon.alt || '',
                        }
                      : undefined,
                    title: card.title,
                    description: card.description,
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
                quote={block.quote}
                image={
                  block.image?.asset
                    ? {
                        url: block.image.asset.url,
                        alt: block.image.alt || '',
                        width: block.image.asset.metadata?.dimensions.width || 645,
                        height: block.image.asset.metadata?.dimensions.height || 430,
                        hotspot: block.image.hotspot,
                      }
                    : undefined
                }
                imagePosition={block.imagePosition as 'left' | 'right'}
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
                        height: block.image.asset.metadata?.dimensions.height || 430,
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
                theme={block.theme}
              />
            );

          case 'cta':
          return (
            <CTA
              key={index}
              headline={block.headline}
              description={block.description}
              buttonText={block.buttonText || 'Mehr erfahren'}
              buttonLink={block.buttonLink || '#'}
              openInNewTab={block.openInNewTab}
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
                />
              );
            }

            return (
              <ReferencesGrid
                key={index}
                references={references}
                theme={block.theme || 'dark'}
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

          default:
            return null;
        }
      })}
    </main>
  );
}


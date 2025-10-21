import { client, pageQuery } from '@3lectrify/sanity';
import { Hero, FeatureCards, TextImage, SimpleTextImage, Stats, CTA } from '@3lectrify/ui';
import type { PortableTextBlock } from '@portabletext/react';

interface SanityBlock {
  _type: string;
  headline?: string;
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
    description?: string;
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
  description?: PortableTextBlock[];
  buttonText?: string;
  buttonLink?: string;
  openInNewTab?: boolean;
}

async function getIhrVorteilPage() {
  const page = await client.fetch(pageQuery, { slug: 'ihr-vorteil' });
  return page;
}

export async function generateMetadata() {
  const page = await getIhrVorteilPage();
  
  return {
    title: page?.title || 'Ihr Vorteil als Investor | 3lectrify',
    description: page?.description || 'Entdecken Sie die Vorteile von All-Electric Buildings für Ihre Immobilieninvestition.',
  };
}

export default async function IhrVorteilPage() {
  const page = await getIhrVorteilPage();

  if (!page) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p>Create a page with slug &quot;ihr-vorteil&quot; in Sanity Studio</p>
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
                imagePosition={block.imagePosition}
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

          default:
            return null;
        }
      })}
    </main>
  );
}


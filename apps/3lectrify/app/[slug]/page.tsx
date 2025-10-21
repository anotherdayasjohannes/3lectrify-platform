import { client, pageQuery, legalPageQuery, allPagesQuery, allLegalPagesQuery } from '@3lectrify/sanity';
import { 
  Hero, 
  HeroGradient, 
  FeatureCards, 
  FeatureShowcase,
  TextImage, 
  SimpleTextImage, 
  Stats, 
  CTA, 
  ReferencesGrid, 
  ReferencesMarquee, 
  TeamGrid,
  LegalContent 
} from '@3lectrify/ui';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/react';

// Types for Legal Pages
interface LegalPageData {
  _id: string;
  _type: 'legalPage';
  title: string;
  description?: string;
  heroHeadline: string;
  heroSubheadline?: string;
  heroBackgroundImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    hotspot?: { x: number; y: number; };
    crop?: { top: number; bottom: number; left: number; right: number; };
    alt?: string;
  };
  gradientDirection: 'left' | 'right';
  heroHeight: 'small' | 'medium' | 'large';
  iframeUrl: string;
}

// Types for Content Pages
interface ContentPageData {
  _id: string;
  _type: 'page';
  title: string;
  description?: string;
  content?: SanityBlock[];
}

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
  // FeatureShowcase specific
  title?: string;
  sectionIntro?: PortableTextBlock[];
  features?: Array<{
    _key: string;
    icon?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    number?: string;
    title: string;
    heading: string;
    description?: string;
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
      };
      alt?: string;
    };
  }>;
}

type PageData = LegalPageData | ContentPageData | null;

// Unified function to get any page by slug
async function getPage(slug: string): Promise<PageData> {
  // Try fetching as a content page first
  const contentPage = await client.fetch<ContentPageData | null>(pageQuery, { slug });
  if (contentPage) return contentPage;

  // If not found, try fetching as a legal page
  const legalPage = await client.fetch<LegalPageData | null>(legalPageQuery, { slug });
  if (legalPage) return legalPage;

  return null;
}

// Generate static params for all pages (content + legal)
export async function generateStaticParams() {
  const contentPages = await client.fetch<Array<{ slug: string }>>(allPagesQuery);
  const legalPages = await client.fetch<Array<{ slug: string }>>(allLegalPagesQuery);
  
  return [
    ...contentPages.map((page) => ({ slug: page.slug })),
    ...legalPages.map((page) => ({ slug: page.slug })),
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.title,
    description: page.description || `${page.title} - 3lectrify`,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  // Render Legal Page
  if (page._type === 'legalPage') {
    return (
      <main>
        <HeroGradient
          headline={page.heroHeadline}
          subheadline={page.heroSubheadline}
          backgroundImage={
            page.heroBackgroundImage?.asset
              ? {
                  url: page.heroBackgroundImage.asset.url,
                  alt: page.heroBackgroundImage.alt || '',
                  width: page.heroBackgroundImage.asset.metadata?.dimensions.width,
                  height: page.heroBackgroundImage.asset.metadata?.dimensions.height,
                  hotspot: page.heroBackgroundImage.hotspot,
                }
              : undefined
          }
          gradientDirection={page.gradientDirection}
          sectionHeight={page.heroHeight}
        />
        <LegalContent iframeUrl={page.iframeUrl} />
      </main>
    );
  }

  // Render Content Page
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

          case 'featureShowcase':
            return (
              <FeatureShowcase
                key={index}
                sectionHeadline={block.sectionHeadline}
                sectionIntro={block.sectionIntro}
                features={
                  block.features?.map((feature) => ({
                    _key: feature._key,
                    icon: feature.icon?.asset
                      ? {
                          url: feature.icon.asset.url,
                          alt: feature.icon.alt || '',
                        }
                      : undefined,
                    number: feature.number,
                    title: feature.title,
                    heading: feature.heading,
                    description: feature.description,
                    image: feature.image?.asset
                      ? {
                          url: feature.image.asset.url,
                          alt: feature.image.alt || '',
                          width: feature.image.asset.metadata?.dimensions.width || 1200,
                          height: feature.image.asset.metadata?.dimensions.height || 630,
                          hotspot: feature.image.hotspot,
                        }
                      : undefined,
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
                headline={block.sectionHeadline}
                subtext={block.sectionDescription}
              />
            );

          case 'teamGrid':
            return (
              <TeamGrid
                key={index}
                heading={block.headline}
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


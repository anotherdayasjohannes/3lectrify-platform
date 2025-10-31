import { client, pageQuery, legalPageQuery, allPagesQuery, allLegalPagesQuery } from '@3lectrify/sanity';
import { 
  Hero, 
  HeroGradient, 
  FeatureCards, 
  FeatureShowcase,
  StackedExplainer,
  TextImage, 
  SimpleTextImage, 
  Stats, 
  CTA, 
  ReferencesGrid, 
  ReferencesMarquee, 
  TeamGrid,
  LegalContent,
  LottieAnimationWrapper,
  VideoAnimation,
  ContactSimple
} from '@/components';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/react';

// Revalidate this page every hour (3600 seconds) as a fallback
// Primary updates come from webhook-based on-demand revalidation
export const revalidate = 3600;

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
  // FeatureCards simple cards
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
        height: number;
        width: number;
      };
    };
    bio?: string;
    linkedinUrl?: string;
    email?: string;
  }>;
  heading?: string; // TeamGrid specific
  introText?: PortableTextBlock[];
  // FeatureShowcase specific
  title?: string;
  sectionIntro?: PortableTextBlock[];
  // StackedExplainer CTA fields
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
  features?: Array<{
    _key: string;
    icon?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    number: string;
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
  // HeroGradient fields
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
    hotspot?: {
      x: number;
      y: number;
    };
    alt?: string;
  };
  gradientDirection?: 'left' | 'right';
  sectionHeight?: 'small' | 'medium' | 'large';
  // ContactSimple fields
  subheadline?: string;
  formHeadline?: string;
  labels?: {
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    button: string;
    privacy: string;
    privacyLink: string;
  };
  address?: {
    headline: string;
    companyName: string;
    addressLine2?: string;
    street: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    mapsLinkText: string;
  };
  successMessage?: string;
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

          case 'heroGradient':
            return (
              <HeroGradient
                key={index}
                headline={block.headline || ''}
                subheadline={block.subheadline}
                backgroundImage={
                  block.backgroundImage?.asset
                    ? {
                        url: block.backgroundImage.asset.url,
                        alt: block.backgroundImage.alt || '',
                        width: block.backgroundImage.asset.metadata?.dimensions.width,
                        height: block.backgroundImage.asset.metadata?.dimensions.height,
                        hotspot: block.backgroundImage.hotspot,
                      }
                    : undefined
                }
                gradientDirection={block.gradientDirection}
                sectionHeight={block.sectionHeight}
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
                headline={block.sectionHeadline}
                subtext={block.sectionDescription}
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

          case 'contactSimple':
            return (
              <ContactSimple
                key={index}
                headline={block.headline}
                subheadline={block.subheadline}
                formHeadline={block.formHeadline}
                labels={
                  block.labels || {
                    firstname: 'Vorname',
                    lastname: 'Nachname',
                    company: 'Unternehmen (optional)',
                    email: 'E-Mail',
                    phone: 'Telefon (optional)',
                    message: 'Nachricht',
                    button: 'Anfrage senden',
                    privacy: 'Ich habe die Datenschutzerklärung gelesen und akzeptiere diese.',
                    privacyLink: '/datenschutz',
                  }
                }
                address={
                  block.address || {
                    headline: 'Adresse',
                    companyName: '3lectrify',
                    street: 'Kramergasse 32',
                    postalCode: '82054',
                    city: 'Sauerlach',
                    email: 'kontakt@3lectrify.com',
                    phone: '+49 8104 64709-299',
                    mapsLinkText: 'In Google Maps öffnen',
                  }
                }
                successMessage={block.successMessage}
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


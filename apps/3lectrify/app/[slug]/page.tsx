import { client, legalPageQuery, allLegalPagesQuery } from '@3lectrify/sanity';
import { HeroGradient, LegalContent } from '@3lectrify/ui';
import { notFound } from 'next/navigation';

interface LegalPageData {
  _id: string;
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

async function getLegalPage(slug: string) {
  const page = await client.fetch<LegalPageData>(legalPageQuery, { slug });
  return page;
}

// Generate static params for all legal pages
export async function generateStaticParams() {
  const pages = await client.fetch<Array<{ slug: string }>>(allLegalPagesQuery);
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  
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

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    notFound();
  }

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
        height={page.heroHeight}
      />
      <LegalContent iframeUrl={page.iframeUrl} />
    </main>
  );
}

